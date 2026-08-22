/* Potbelly Audio -- alternate build (/1.html).
 *
 * Sheet stacking is here because the client asked for it: they liked the
 * scroll on merakifilms.in and want each section to pin while the next slides
 * over it. The pattern stays; the code does not. js/main.js is that routine
 * ported from their site more or less verbatim, down to the comment wording
 * and the magic numbers. This is written from scratch:
 *
 *   - flow positions are recovered by dropping every act back to static and
 *     measuring, rather than by accumulating heights and margins by hand
 *   - the covered sheet is not scaled down; it holds its size and takes a
 *     shadow from the sheet covering it (see .act::after and the box-shadow
 *     in css/v1.css)
 *   - different cover ramp, different thresholds, no --cover property
 *
 * ---- Why the scroll handler never touches the DOM for measurements -------
 *
 * The stutter this build had was not the effect, it was the bookkeeping. The
 * old handler read getBoundingClientRect() twice per act and wrote --veil in
 * between, on every frame. Each write invalidates style, so each following
 * read forces a synchronous layout of an eleven-layer sticky stack roughly
 * 12,000px tall: measured at ~2.9ms of forced reflow per frame on a desktop,
 * i.e. a guaranteed dropped frame on a phone, plus a second pass of eleven
 * more reads for the scroll spy and a full rewrite of every channel class and
 * both readouts whether or not anything had changed.
 *
 * So: measure once, then derive everything from window.scrollY with closed-
 * form arithmetic. A sticky act's viewport top is exactly
 *
 *     max(natural, min(stuck, limit))
 *
 * where natural is its flow position relative to the scroll, stuck is its pin
 * offset, and limit is the containing block's bottom constraint. That is the
 * whole geometry -- no rect reads, no forced layout, and writes are gated on
 * having actually changed. The frame does reads first, writes second, always.
 *
 * Everything else on this page -- the console rail, the level meter, the cue
 * accordion -- shares nothing with either file.
 */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var mqPhone = window.matchMedia('(max-width: 640px)');
  var mqRail = window.matchMedia('(max-width: 1080px)');
  var mqCoarse = window.matchMedia('(hover: none)');

  var BAR_H = 60;            // mobile top bar, for anchor landing
  var COVER_LEAD = 0.5;      // veil starts when the next sheet crosses this much of the viewport
  var COVER_MAX = 0.62;      // how dark a fully covered sheet goes
  var LIVE_MARK = 0.45;      // a sheet is "on screen" once its top passes this much of the viewport
  var BAR_DRIFT = 140;       // viewport height change to write off as a mobile address bar
  var LAYER_EDGE = 90;       // slack around the ramp, so the scrim's layer exists before it moves

  /* A URL opened on a #hash gets scrolled there by the browser natively,
     before any of the sheet-stacking below has turned the acts into a sticky
     stack. That native jump reads the plain, un-stacked layout, so it is
     wrong the moment the stack applies, and landOnHash() further down then
     has to correct it -- which reads as a visible snap-then-snap-again.
     Pull the hash out of the URL immediately, before the browser gets a
     chance to act on it, and hand it to landOnHash() once layout is ready
     instead. One jump, not two. */
  var pendingHash = location.hash;
  if (pendingHash && pendingHash !== '#') {
    history.replaceState(null, '', location.pathname + location.search);
  }

  /* ---- Hero level meter ------------------------------------------------ */
  /* Bottom-anchored bars, peaks lit in accent. Inserted by script so the
     markup stays free of 64 empty spans.
     Only the per-bar numbers come from here, as custom properties: the
     animation itself is declared in the stylesheet. An inline `animation`
     shorthand would carry animation-play-state: running with it, and inline
     beats any selector, so .levels.is-idle could never park the bars. */
  var levels = document.getElementById('levels');
  if (levels) {
    var BARS = 64;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < BARS; i++) {
      // Two summed sines so the shape reads as signal, not a sawtooth.
      var amp = Math.min(1, 0.22 + 0.5 * Math.abs(Math.sin(i * 0.31)) + 0.26 * Math.abs(Math.sin(i * 0.11)));
      var bar = document.createElement('span');
      bar.style.height = (amp * 100).toFixed(1) + '%';
      bar.style.opacity = (0.35 + 0.6 * amp).toFixed(2);
      bar.style.setProperty('--dur', (1.1 + (i % 7) * 0.13).toFixed(2) + 's');
      bar.style.setProperty('--lag', (i * 0.028).toFixed(2) + 's');
      if (amp > 0.86) bar.classList.add('is-peak');
      frag.appendChild(bar);
    }
    levels.appendChild(frag);
  }

  /* ---- Reveals --------------------------------------------------------- */
  /* Left wipe, staggered per direct child of .inner. Opacity and transform
     only, so nothing here changes the measured heights the stack depends on. */
  if (!reduceMotion.matches && 'IntersectionObserver' in window) {
    var targets = [];
    document.querySelectorAll('.act > .inner').forEach(function (inner) {
      Array.prototype.forEach.call(inner.children, function (kid) {
        kid.classList.add('rv');
        targets.push(kid);
      });
    });

    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var siblings = Array.prototype.slice.call(el.parentElement.children);
        el.style.animationDelay = (siblings.indexOf(el) * 0.1) + 's';
        el.classList.add('is-in');
        revealIO.unobserve(el);
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -8% 0px' });

    targets.forEach(function (el) {
      // Anything already on screen at load should not wait for a scroll.
      if (el.getBoundingClientRect().top < window.innerHeight * 0.95) {
        el.classList.add('is-in');
        return;
      }
      revealIO.observe(el);
    });
  }

  /* ---- Geometry -------------------------------------------------------- */
  var main = document.getElementById('main');
  var acts = Array.prototype.slice.call(document.querySelectorAll('main > .act'));
  var n = acts.length;

  var vw = 0, vh = 0;        // viewport, as of the last measure()
  var flowTop = [];          // each act's top in document flow
  var actH = [];             // each act's height
  var pinTop = [];           // the sticky top offset assigned to it
  var pinned = [];           // false for the last act and for reduced motion
  var mainEnd = 0;           // main's flow bottom: the sticky containing block
  var maxScroll = 0;
  var levelsEnd = -1;        // the hero meter's bottom edge, relative to the hero's top
  var measured = false;      // false until we have a real viewport to measure in
  var measuring = false;     // reentrancy guard for the ResizeObserver

  /* A pinned sheet reports its pinned position, not its position in the
     document, so anchor scrolling to one lands in the wrong place once it is
     above the viewport. Rather than reconstruct the flow by summing heights,
     drop the whole stack back to static, read it, and pin it again. Sticky
     reserves its normal flow space, so this measures true and does not move
     the scroll position.

     This is the only function on the page that reads layout, and it runs on
     load, on fonts, on a real resize and after a deliberate height change --
     never on scroll. */
  function measure() {
    /* A page laid out before it has a viewport -- a background tab, a
       prerender, an in-app webview that has not sized yet -- reports height 0.
       min(0, 0 - height) is then -height for every act, which silently means
       "nothing ever pins" for the rest of the session. Bail and wait for the
       resize that gives us a real one. */
    var h = window.innerHeight || document.documentElement.clientHeight || 0;
    var w = window.innerWidth || document.documentElement.clientWidth || 0;
    if (!h || !w) { measured = false; return; }

    measuring = true;
    vh = h;
    vw = w;

    for (var i = 0; i < n; i++) {
      acts[i].style.position = 'static';
      acts[i].style.top = '';
    }

    var scrolled = window.scrollY;
    for (i = 0; i < n; i++) {
      var rect = acts[i].getBoundingClientRect();
      flowTop[i] = Math.round(rect.top + scrolled);
      actH[i] = Math.round(rect.height);
    }
    mainEnd = main ? Math.round(main.getBoundingClientRect().bottom + scrolled)
                   : flowTop[n - 1] + actH[n - 1];

    /* Where the level meter's bottom edge sits inside the hero. Sixty-four
       infinite animations are sixty-four layers the compositor keeps ticking
       for the life of the page, and an IntersectionObserver cannot switch them
       off: the hero is a pinned sheet, so it never actually leaves the
       viewport -- it just gets covered. frame() parks them off this number
       instead, the moment the sheet above has crossed the meter. */
    levelsEnd = levels ? Math.round(levels.getBoundingClientRect().bottom + scrolled) - flowTop[0] : -1;
    maxScroll = Math.max(0, document.documentElement.scrollHeight - vh);

    var last = n - 1;
    for (i = 0; i < n; i++) {
      // The final sheet scrolls away normally so the footer can follow it, and
      // reduced motion drops the whole stack. Both cases stay `relative` rather
      // than `static`: .inner is a positioned box, so a static sheet would let
      // its own content paint over the sheet before it while its background
      // stayed underneath, and the two would show through each other.
      if (reduceMotion.matches || i === last) {
        pinned[i] = false;
        pinTop[i] = 0;
        acts[i].style.position = 'relative';
        continue;
      }
      pinned[i] = true;
      pinTop[i] = Math.min(0, vh - actH[i]);
      acts[i].style.position = 'sticky';
      acts[i].style.top = pinTop[i] + 'px';
    }

    /* Reduced motion drops the stack, so any scrim left over from before the
       preference changed has to come off with it. */
    if (reduceMotion.matches) {
      for (i = 0; i < n; i++) {
        lastVeil[i] = 0;
        lastMoving[i] = false;
        acts[i].style.removeProperty('--veil');
        acts[i].classList.remove('is-veiled');
      }
    }

    measured = true;
    measuring = false;
  }

  /* Where act `idx` actually renders, for a given scroll offset, without
     asking the browser. `natural` is its flow position; a sticky act cannot
     move above that. `stuck` is the pin offset. `limit` is the sticky
     containing block's floor: main's bottom edge, which is what releases the
     whole stack over the last screen of the page. */
  function topAt(idx, y) {
    var natural = flowTop[idx] - y;
    if (!pinned[idx]) return natural;
    var limit = (mainEnd - y) - actH[idx];
    return Math.max(natural, Math.min(pinTop[idx], limit));
  }

  /* Re-pin after a sheet changes height, without moving what the reader is
     looking at. A sheet is pinned by its bottom edge, so growing one drags its
     top -- and everything printed on it -- upward by the height it gained.
     Capture where the sheet sits, re-pin, then scroll to the position that puts
     it back: a pinned sheet ignores scrolling, so the net effect is that it
     gains runway rather than lurching out from under a thumb. */
  function relayoutHolding(act) {
    var idx = acts.indexOf(act);
    if (idx < 0 || !measured) { measure(); frame(); return; }

    var before = topAt(idx, window.scrollY);
    measure();
    var y = Math.round(window.scrollY);
    if (Math.round(topAt(idx, y)) === Math.round(before)) { frame(); return; }

    // Scroll to the position that renders the sheet exactly where it was. The
    // sheet covering it moves down by what this one gained, which is the point:
    // a taller section needs the runway, and the row under the thumb is what
    // has to stay still.
    var want = Math.max(0, Math.min(maxScroll, Math.round(flowTop[idx] - before)));
    if (want !== y) window.scrollTo({ top: want, behavior: 'auto' });
    frame();
  }

  /* ---- Console rail: scroll spy, veil, mobile progress ------------------ */
  var chans = Array.prototype.slice.call(document.querySelectorAll('.chan'));
  var barNow = document.getElementById('bar-now');
  var railNow = document.getElementById('rail-now');
  var barProgress = document.getElementById('bar-progress');

  /* Spy on every act, not just the six that have a rail channel. Chain,
     clients, why and contact have no channel of their own, and the rail is a
     curated six by design, so the nav alone can never say where the reader is.

     Two signals come out of this, and they are deliberately not the same one:

       chan  the act's own channel, if it has one. Lit in accent. This is the
             only thing that ever means "you are here".
       lit   the nearest channel at or above the act. Shown in copper as a
             passed marker when the live act has no channel of its own, so the
             list still places the reader without claiming the wrong section.

     The readout carries the actual position in both cases. Before it existed
     the carried channel was the only signal on desktop, and it named a section
     that was not on screen for about a third of the page. */
  var chanFor = {};
  chans.forEach(function (chan) { chanFor[chan.getAttribute('href').slice(1)] = chan; });

  var carry = null;
  var spied = acts.map(function (act) {
    var chan = chanFor[act.id] || null;
    if (chan) carry = chan;
    var label = act.getAttribute('data-nav') || 'Potbelly Audio';
    return {
      chan: chan,
      lit: carry,
      label: label,
      /* The readout takes a different value than the mobile bar in exactly one
         place: above the first channel there is nothing to name but the top of
         the page, the wordmark sits directly above this line already, and
         "Potbelly Audio" is the only label long enough to wrap the readout onto
         a second line -- which would shift the channel list every time the
         reader left the hero. The bar keeps the full name; it has the width. */
      read: carry ? label : 'Top'
    };
  });

  // Last written values. Every write below is gated on one of these changing,
  // so a scroll that does not cross a threshold costs nothing but arithmetic.
  var lastVeil = [];
  var lastMoving = [];
  var lastLive = -2;
  var lastPct = -1;
  var metersIdle = false;

  function frame() {
    if (!measured) return;
    var y = window.scrollY;
    var i;

    if (barProgress) {
      var pct = maxScroll > 0 ? Math.min(1, Math.max(0, y / maxScroll)) : 0;
      pct = Math.round(pct * 1000) / 1000;
      if (pct !== lastPct) {
        lastPct = pct;
        barProgress.style.transform = 'scaleX(' + pct + ')';
      }
    }

    /* Veil: ramps up while the next sheet is crossing this one, clears once
       this sheet is off screen entirely.

       `is-veiled` marks the sheets whose scrim is *moving*, not the ones that
       have a scrim: a covered sheet sits at COVER_MAX for the rest of the page
       and a sheet nothing has reached sits at 0, and a static opacity has
       nothing to promote. The window is the ramp itself, widened by LAYER_EDGE
       so the layer exists before the first frame that changes, which is the
       one that would otherwise repaint. Two or three sheets hold a layer at a
       time instead of all eleven holding one for the life of the page. */
    if (!reduceMotion.matches) {
      var lead = vh * COVER_LEAD;
      for (i = 0; i < n - 1; i++) {
        var top = topAt(i, y);
        var nextTop = topAt(i + 1, y);
        var v = 0;
        if (top + actH[i] > 0 && top < vh) {
          var ramp = (lead - nextTop) / lead;
          v = ramp > 0 ? (ramp > 1 ? COVER_MAX : ramp * COVER_MAX) : 0;
        }
        v = Math.round(v * 1000) / 1000;
        var changed = v !== lastVeil[i];
        if (changed) {
          lastVeil[i] = v;
          acts[i].style.setProperty('--veil', v);
        }

        /* Promoted while the scrim is in its ramp -- which is only true while
           the sheet above is still travelling, so `nextTop > pinTop[i + 1]`:
           once that sheet parks, this one's scrim is a fixed COVER_MAX for the
           rest of the page and there is nothing left to promote. `changed`
           covers the one-off transitions at either end, so the invariant
           "anything whose scrim moves is promoted" holds without keeping a
           layer alive for it. */
        var moving = v > 0 &&
          (changed || (nextTop < lead + LAYER_EDGE && nextTop > pinTop[i + 1] + 1));
        if (moving !== lastMoving[i]) {
          lastMoving[i] = moving;
          acts[i].classList.toggle('is-veiled', moving);
        }
      }
    }

    if (levels && levelsEnd >= 0 && n > 1) {
      var covered = topAt(1, y) <= topAt(0, y) + levelsEnd;
      if (covered !== metersIdle) {
        metersIdle = covered;
        levels.classList.toggle('is-idle', covered);
      }
    }

    // Live section = the last one whose top has passed 45% of the viewport.
    var mark = vh * LIVE_MARK;
    var live = -1;
    for (i = 0; i < n; i++) {
      if (topAt(i, y) <= mark) live = i; else break;
    }
    if (live === lastLive) return;
    lastLive = live;

    chans.forEach(function (chan) {
      chan.classList.remove('is-live', 'is-past');
      chan.removeAttribute('aria-current');
    });

    var entry = live >= 0 ? spied[live] : null;
    if (entry) {
      if (entry.chan) {
        entry.chan.classList.add('is-live');
        entry.chan.setAttribute('aria-current', 'true');
      } else if (entry.lit) {
        entry.lit.classList.add('is-past');
      }
    }
    if (barNow) barNow.textContent = entry ? entry.label : 'Potbelly Audio';
    if (railNow) railNow.textContent = entry ? entry.read : 'Top';
  }

  var queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { queued = false; frame(); });
  }

  window.addEventListener('scroll', schedule, { passive: true });

  /* A resize is expensive -- it re-measures the whole stack -- and on a phone
     it is mostly noise: scrolling shows and hides the address bar, which fires
     resize with a changed height and an unchanged width. Re-pinning on that
     moves every sheet mid-gesture, which is the jump this used to do on
     mobile. Width changes always count; height changes only when they are too
     large to be browser chrome, or when the device has a real pointer. */
  var seenW = 0, seenH = 0;
  var resizeTimer = 0;
  function onResize() {
    var w = window.innerWidth, h = window.innerHeight;
    if (!w || !h) return;
    if (w === seenW && Math.abs(h - seenH) < BAR_DRIFT && mqCoarse.matches) return;
    seenW = w;
    seenH = h;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { measure(); frame(); }, 100);
  }
  window.addEventListener('resize', onResize, { passive: true });
  window.addEventListener('orientationchange', function () {
    seenW = 0;
    onResize();
  });

  function remeasure() { measure(); frame(); }

  seenW = window.innerWidth;
  seenH = window.innerHeight;
  measure();
  frame();
  window.addEventListener('load', remeasure);
  // Coconat changes line counts once it lands, which changes every height.
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(remeasure);

  /* Anything that changes a sheet's height without going through a handler
     here -- a late image, a font swap we did not catch, a browser reflowing a
     wrapped headline -- used to leave the pin offsets stale until the next
     resize. measure() cannot change main's height (sticky reserves its flow
     space), so watching it cannot feed back on itself. */
  if ('ResizeObserver' in window && main) {
    var ro = new ResizeObserver(function () {
      if (measuring) return;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(remeasure, 100);
    });
    ro.observe(main);
  }

  /* ---- In-page anchors ------------------------------------------------- */
  function anchorY(id) {
    if (id === 'top') return 0;
    var el = document.getElementById(id);
    if (!el) return null;
    var offset = mqRail.matches ? BAR_H : 0;
    var act = el.closest('main > .act');
    var idx = acts.indexOf(act);
    if (idx < 0 || !measured) {
      return Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset);
    }
    // Anchor targets on this page are the sections themselves, so the sheet's
    // own flow position is the landing point.
    return Math.max(0, flowTop[idx] - offset);
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (href === '#' || href === '#main') return;
      var y = anchorY(href.slice(1));
      if (y === null) return;
      e.preventDefault();
      window.scrollTo({ top: y, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    });
  });

  /* A URL opened with a #hash never goes through the click handler above --
     the browser would otherwise land on it natively before this script has
     turned the acts into a sticky stack, reading the id's plain in-flow
     position. The hash was already pulled out of the URL above so that jump
     never fires; land on the same spot anchorY() would give a click instead,
     every time the flow positions get recomputed (measure() already runs at
     each of these points), then put the hash back without re-triggering a
     native scroll. */
  function landOnHash(hash) {
    hash = hash || pendingHash;
    if (!hash || hash === '#') return;
    var y = anchorY(hash.slice(1));
    if (y === null) return;
    window.scrollTo({ top: y, behavior: 'auto' });
    if (location.hash !== hash) history.replaceState(null, '', hash);
  }

  landOnHash();
  window.addEventListener('load', function () { landOnHash(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { landOnHash(); });
  window.addEventListener('hashchange', function () {
    var hash = location.hash;
    if (hash && hash !== '#') history.replaceState(null, '', location.pathname + location.search);
    landOnHash(hash);
  });

  /* ---- Phone: cue rows collapse ---------------------------------------- */
  var cues = Array.prototype.slice.call(document.querySelectorAll('.cue'));

  function toggleCue(cue) {
    var open = cue.classList.toggle('is-open');
    cue.setAttribute('aria-expanded', open ? 'true' : 'false');

    /* The note animates its max-height, so the sheet is not its final height
       until that transition ends. Waiting on the transition rather than on a
       hardcoded 400ms means the re-pin lands on the real height even if the
       duration in the stylesheet changes; the timer is only the fallback for
       a transition that never fires. */
    var act = cue.closest('main > .act');
    var note = cue.querySelector('.cue__note');
    var fallback = setTimeout(function () { done(); }, 600);
    function done(e) {
      if (e && e.propertyName !== 'max-height') return;
      clearTimeout(fallback);
      if (note) note.removeEventListener('transitionend', done);
      relayoutHolding(act);
    }
    if (note) note.addEventListener('transitionend', done);
  }

  function syncCueRoles() {
    cues.forEach(function (cue) {
      if (mqPhone.matches) {
        cue.setAttribute('role', 'button');
        cue.setAttribute('tabindex', '0');
        cue.setAttribute('aria-expanded', cue.classList.contains('is-open') ? 'true' : 'false');
      } else {
        cue.removeAttribute('role');
        cue.removeAttribute('tabindex');
        cue.removeAttribute('aria-expanded');
        cue.classList.remove('is-open');
      }
    });
    remeasure();
  }

  cues.forEach(function (cue) {
    cue.addEventListener('click', function (e) {
      if (!mqPhone.matches || e.target.closest('a')) return;
      toggleCue(cue);
    });
    cue.addEventListener('keydown', function (e) {
      if (!mqPhone.matches) return;
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      toggleCue(cue);
    });
  });

  syncCueRoles();
  mqPhone.addEventListener('change', syncCueRoles);
  reduceMotion.addEventListener('change', remeasure);

  /* ---- Work filter ----------------------------------------------------- */
  var filters = Array.prototype.slice.call(document.querySelectorAll('.filter'));
  var reels = Array.prototype.slice.call(document.querySelectorAll('.reel'));
  var reelsEmpty = document.querySelector('.reels__empty');

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var want = btn.getAttribute('data-filter');
      var shown = 0;

      filters.forEach(function (other) {
        var on = other === btn;
        other.classList.toggle('is-live', on);
        other.setAttribute('aria-pressed', on ? 'true' : 'false');
      });

      reels.forEach(function (reel) {
        var match = want === 'all' || reel.getAttribute('data-category') === want;
        reel.classList.toggle('is-out', !match);
        if (match) shown++;
      });

      if (reelsEmpty) reelsEmpty.hidden = shown > 0;
      relayoutHolding(btn.closest('main > .act'));   // the grid just reflowed
    });
  });

  /* ---- Video viewer ---------------------------------------------------- */
  var viewer = document.querySelector('.viewer');
  var viewerFrame = document.querySelector('.viewer__frame');
  var viewerClose = document.querySelector('.viewer__close');
  var lastFocus = null;

  function openViewer(id, trigger) {
    if (!viewer || !viewerFrame) return;
    lastFocus = trigger || null;
    viewerFrame.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1';
    viewer.classList.add('is-open');
    // The overlay is fixed and already covers the trigger, so moving focus
    // into it must not scroll the page out from under the reader.
    if (viewerClose) viewerClose.focus({ preventScroll: true });
  }

  function closeViewer() {
    if (!viewer || !viewerFrame || !viewer.classList.contains('is-open')) return;
    viewer.classList.remove('is-open');
    viewerFrame.src = '';
    if (lastFocus) { lastFocus.focus({ preventScroll: true }); lastFocus = null; }
  }

  document.querySelectorAll('[data-youtube-id]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      openViewer(el.getAttribute('data-youtube-id'), el);
    });
  });

  if (viewerClose) viewerClose.addEventListener('click', closeViewer);
  if (viewer) {
    viewer.addEventListener('click', function (e) {
      if (e.target === viewer) closeViewer();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeViewer();
  });
})();
