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
 * Everything else on this page -- the console rail, the level meter, the cue
 * accordion -- shares nothing with either file.
 */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var mqPhone = window.matchMedia('(max-width: 640px)');
  var mqRail = window.matchMedia('(max-width: 1080px)');

  var BAR_H = 60;            // mobile top bar, for anchor landing
  var COVER_LEAD = 0.5;      // veil starts when the next sheet crosses this much of the viewport
  var COVER_MAX = 0.62;      // how dark a fully covered sheet goes

  /* ---- Hero level meter ------------------------------------------------ */
  /* Bottom-anchored bars, peaks lit in accent. Inserted by script so the
     markup stays free of 64 empty spans. */
  var levels = document.getElementById('levels');
  if (levels) {
    var BARS = 64;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < BARS; i++) {
      // Two summed sines so the shape reads as signal, not a sawtooth.
      var amp = Math.min(1, 0.22 + 0.5 * Math.abs(Math.sin(i * 0.31)) + 0.26 * Math.abs(Math.sin(i * 0.11)));
      var bar = document.createElement('span');
      bar.style.height = (amp * 100).toFixed(1) + '%';
      if (amp > 0.86) bar.style.background = 'var(--accent)';
      bar.style.opacity = (0.35 + 0.6 * amp).toFixed(2);
      if (!reduceMotion.matches) {
        bar.style.animation = 'pbLevel ' + (1.1 + (i % 7) * 0.13).toFixed(2) +
          's ease-in-out ' + (i * 0.028).toFixed(2) + 's infinite alternate';
      }
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

  /* ---- Sheet stacking -------------------------------------------------- */
  var acts = Array.prototype.slice.call(document.querySelectorAll('main > .act'));
  var flowTop = [];

  /* A pinned sheet reports its pinned position, not its position in the
     document, so anchor scrolling to one lands in the wrong place once it is
     above the viewport. Rather than reconstruct the flow by summing heights,
     drop the whole stack back to static, read it, and pin it again. Sticky
     reserves its normal flow space, so this measures true and does not move
     the scroll position. */
  function layout() {
    acts.forEach(function (act) {
      act.style.position = 'static';
      act.style.top = '';
    });

    var scrolled = window.scrollY;
    flowTop = acts.map(function (act) {
      return Math.round(act.getBoundingClientRect().top + scrolled);
    });

    var vh = window.innerHeight;
    var last = acts.length - 1;

    acts.forEach(function (act, idx) {
      // The final sheet scrolls away normally so the footer can follow it, and
      // reduced motion drops the whole stack. Both cases stay `relative` rather
      // than `static`: .inner is a positioned box, so a static sheet would let
      // its own content paint over the sheet before it while its background
      // stayed underneath, and the two would show through each other.
      if (reduceMotion.matches || idx === last) {
        act.style.position = 'relative';
        return;
      }
      act.style.position = 'sticky';
      act.style.top = Math.min(0, vh - act.offsetHeight) + 'px';
    });
  }

  /* Re-pin after a sheet changes height, without moving what the reader is
     looking at. A sheet is pinned by its bottom edge, so growing one drags its
     top -- and everything printed on it -- upward by the height it gained.
     Capture where the sheet sits, re-pin, then scroll to the position that puts
     it back: a pinned sheet ignores scrolling, so the net effect is that it
     gains runway rather than lurching out from under a thumb. */
  function relayoutHolding(act) {
    var idx = acts.indexOf(act);
    if (idx < 0) { layout(); return; }

    var before = act.getBoundingClientRect().top;
    layout();
    var drift = act.getBoundingClientRect().top - before;
    if (!drift) return;                       // an unpinned sheet does not lurch

    // Scroll to the position that renders the sheet exactly where it was. The
    // sheet covering it moves down by what this one gained, which is the point:
    // a taller section needs the runway, and the row under the thumb is what
    // has to stay still.
    var y = Math.round(window.scrollY);
    var want = Math.max(0, Math.round(flowTop[idx] - before));
    if (want !== y) window.scrollTo({ top: want, behavior: 'auto' });
  }

  layout();
  window.addEventListener('load', layout);
  window.addEventListener('resize', layout, { passive: true });
  // Coconat changes line counts once it lands, which changes every height.
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);

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
      el: act,
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

  var ticking = false;

  function onScroll() {
    ticking = false;
    var vh = window.innerHeight;

    if (barProgress) {
      var span = document.documentElement.scrollHeight - vh;
      var pct = span > 0 ? Math.min(1, Math.max(0, window.scrollY / span)) : 0;
      barProgress.style.transform = 'scaleX(' + pct.toFixed(4) + ')';
    }

    // Veil: ramps up while the next sheet is crossing this one, clears once
    // this sheet is off screen entirely.
    if (!reduceMotion.matches) {
      var lead = vh * COVER_LEAD;
      for (var i = 0; i < acts.length - 1; i++) {
        var act = acts[i];
        var rect = act.getBoundingClientRect();
        var onScreen = rect.bottom > 0 && rect.top < vh;
        var nextTop = acts[i + 1].getBoundingClientRect().top;
        var ramp = Math.min(1, Math.max(0, (lead - nextTop) / lead));
        act.style.setProperty('--veil', (onScreen ? ramp * COVER_MAX : 0).toFixed(3));
      }
    }

    // Live section = the last one whose top has passed 45% of the viewport.
    var mark = vh * 0.45;
    var live = null;
    spied.forEach(function (entry) {
      if (entry.el.getBoundingClientRect().top <= mark) live = entry;
    });

    chans.forEach(function (chan) {
      chan.classList.remove('is-live', 'is-past');
      chan.removeAttribute('aria-current');
    });
    if (live) {
      if (live.chan) {
        live.chan.classList.add('is-live');
        live.chan.setAttribute('aria-current', 'true');
      } else if (live.lit) {
        live.lit.classList.add('is-past');
      }
    }

    if (barNow) barNow.textContent = live ? live.label : 'Potbelly Audio';
    if (railNow) railNow.textContent = live ? live.read : 'Top';
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  /* ---- In-page anchors ------------------------------------------------- */
  function anchorY(id) {
    if (id === 'top') return 0;
    var el = document.getElementById(id);
    if (!el) return null;
    var offset = mqRail.matches ? BAR_H : 0;
    var act = el.closest('main > .act');
    var idx = acts.indexOf(act);
    if (idx < 0) return Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset);
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

  /* ---- Phone: cue rows collapse ---------------------------------------- */
  var cues = Array.prototype.slice.call(document.querySelectorAll('.cue'));

  function toggleCue(cue) {
    var open = cue.classList.toggle('is-open');
    cue.setAttribute('aria-expanded', open ? 'true' : 'false');
    // The note takes 350ms to open, so wait for the height before re-pinning.
    var act = cue.closest('main > .act');
    setTimeout(function () { relayoutHolding(act); }, 400);
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
    layout();
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
    if (viewerClose) viewerClose.focus();
  }

  function closeViewer() {
    if (!viewer || !viewerFrame || !viewer.classList.contains('is-open')) return;
    viewer.classList.remove('is-open');
    viewerFrame.src = '';
    if (lastFocus) { lastFocus.focus(); lastFocus = null; }
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
