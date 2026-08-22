/* Potbelly Audio -- alternate build 2 (/2.html).
 *
 * index.html's markup, /1.html's behaviour. This file is js/v1.js retargeted
 * at the main build's class names (main > section, .row, .work-item, .filter,
 * .lightbox) rather than js/main.js with a new stylesheet bolted on, because
 * js/main.js is merakifilms.in's sticky-stacking routine ported more or less
 * verbatim -- same flowTops table, same Math.min(0, innerHeight - offsetHeight)
 * pin, same transformOrigin '50% 25%', same scale(1 - 0.05 * progress). Reusing
 * it here would carry that exposure into a build made to get away from it, so
 * the mechanic the client asked to keep is re-implemented instead:
 *
 *   - flow positions are recovered by dropping every sheet back to static and
 *     measuring, rather than by accumulating heights and margins by hand
 *   - the covered sheet is not scaled down; it holds its size and takes a
 *     shadow from the sheet covering it (see main > section::after and the
 *     box-shadow in css/v2.css)
 *   - different cover ramp, different thresholds, no --cover property
 *
 * ---- Why the scroll handler never touches the DOM for measurements -------
 *
 * Measure once, then derive everything from window.scrollY with closed-form
 * arithmetic. A sticky sheet's viewport top is exactly
 *
 *     max(natural, min(stuck, limit))
 *
 * where natural is its flow position relative to the scroll, stuck is its pin
 * offset, and limit is the containing block's bottom constraint. That is the
 * whole geometry -- no rect reads on scroll, so no forced layout of a ten-layer
 * sticky stack per frame, and every write is gated on having actually changed.
 */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var mqPhone = window.matchMedia('(max-width: 640px)');
  var mqCoarse = window.matchMedia('(hover: none)');

  var NAV_H = 80;            // sticky nav: 48px logo + 16px top and bottom
  var COVER_LEAD = 0.5;      // veil starts when the next sheet crosses this much of the viewport
  var COVER_MAX = 1;         // a fully covered sheet goes all the way to the scrim colour
  var COVER_DONE = 0.18;     // scrim is complete while the covering sheet is still this far off
  var BAR_DRIFT = 140;       // viewport height change to write off as a mobile address bar
  var LAYER_EDGE = 90;       // slack around the ramp, so the scrim's layer exists before it moves

  /* A URL opened on a #hash gets scrolled there by the browser natively, before
     any of the sheet-stacking below has turned the sections into a sticky
     stack. That native jump reads the plain, un-stacked layout, so it is wrong
     the moment the stack applies, and landOnHash() further down then has to
     correct it -- which reads as a visible snap-then-snap-again. Pull the hash
     out of the URL immediately and hand it to landOnHash() once layout is
     ready instead. One jump, not two. */
  var pendingHash = location.hash;
  if (pendingHash && pendingHash !== '#') {
    history.replaceState(null, '', location.pathname + location.search);
  }

  /* ---- Intro overlay --------------------------------------------------- */
  /* Remove it once the wipe has finished so it cannot intercept anything
     (it is pointer-events: none, but clean DOM is clean DOM). */
  var intro = document.querySelector('.intro');
  if (intro) {
    setTimeout(function () { intro.remove(); }, reduceMotion.matches ? 200 : 3000);
  }

  /* ---- Hero level meter ------------------------------------------------ */
  /* Bottom-anchored bars, peaks lit in accent. Only the per-bar numbers come
     from here, as custom properties: the animation itself is declared in the
     stylesheet. An inline `animation` shorthand would carry
     animation-play-state: running with it, and inline beats any selector, so
     .waveform.is-idle could never park the bars. */
  var wave = document.getElementById('waveform');
  if (wave) {
    var BARS = 120;
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
    wave.appendChild(frag);
  }

  /* ---- Reveals --------------------------------------------------------- */
  /* Left wipe, staggered per direct child of .wrap. Opacity and transform
     only, so nothing here changes the measured heights the stack depends on.
     The hero has no .wrap and runs its own entrance from the stylesheet. */
  if (!reduceMotion.matches && 'IntersectionObserver' in window) {
    var targets = [];
    document.querySelectorAll('main > section > .wrap').forEach(function (inner) {
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
  var sheets = Array.prototype.slice.call(document.querySelectorAll('main > section'));
  var n = sheets.length;

  var vh = 0;                // viewport height, as of the last measure()
  var flowTop = [];          // each sheet's top in document flow
  var sheetH = [];           // each sheet's height
  var pinTop = [];           // the sticky top offset assigned to it
  var pinned = [];           // false for the last sheet and for reduced motion
  var mainEnd = 0;           // main's flow bottom: the sticky containing block
  var maxScroll = 0;
  var waveEnd = -1;          // the hero meter's bottom edge, relative to the hero's top
  var measured = false;      // false until we have a real viewport to measure in
  var measuring = false;     // reentrancy guard for the ResizeObserver

  /* A pinned sheet reports its pinned position, not its position in the
     document, so anchor scrolling to one lands in the wrong place once it is
     above the viewport. Rather than reconstruct the flow by summing heights,
     drop the whole stack back to static, read it, and pin it again. Sticky
     reserves its normal flow space, so this measures true and does not move the
     scroll position.

     This is the only function on the page that reads layout, and it runs on
     load, on fonts, on a real resize and after a deliberate height change --
     never on scroll. */
  function measure() {
    /* A page laid out before it has a viewport -- a background tab, a
       prerender, an in-app webview that has not sized yet -- reports height 0.
       min(0, 0 - height) is then -height for every sheet, which silently means
       "nothing ever pins" for the rest of the session. Bail and wait for the
       resize that gives us a real one. */
    var h = window.innerHeight || document.documentElement.clientHeight || 0;
    var w = window.innerWidth || document.documentElement.clientWidth || 0;
    if (!h || !w) { measured = false; return; }

    measuring = true;
    vh = h;

    for (var i = 0; i < n; i++) {
      sheets[i].style.position = 'static';
      sheets[i].style.top = '';
    }

    var scrolled = window.scrollY;
    for (i = 0; i < n; i++) {
      var rect = sheets[i].getBoundingClientRect();
      flowTop[i] = Math.round(rect.top + scrolled);
      sheetH[i] = Math.round(rect.height);
    }
    mainEnd = main ? Math.round(main.getBoundingClientRect().bottom + scrolled)
                   : flowTop[n - 1] + sheetH[n - 1];

    /* Where the level meter's bottom edge sits inside the hero. A hundred and
       twenty infinite animations are a hundred and twenty layers the compositor
       keeps ticking for the life of the page, and an IntersectionObserver
       cannot switch them off: the hero is a pinned sheet, so it never actually
       leaves the viewport -- it just gets covered. frame() parks them off this
       number instead, the moment the sheet above has crossed the meter. */
    waveEnd = wave ? Math.round(wave.getBoundingClientRect().bottom + scrolled) - flowTop[0] : -1;
    maxScroll = Math.max(0, document.documentElement.scrollHeight - vh);

    var last = n - 1;
    for (i = 0; i < n; i++) {
      // The final sheet scrolls away normally so the footer can follow it, and
      // reduced motion drops the whole stack. Both cases stay `relative` rather
      // than `static`: .wrap is a positioned box, so a static sheet would let
      // its own content paint over the sheet before it while its background
      // stayed underneath, and the two would show through each other.
      if (reduceMotion.matches || i === last) {
        pinned[i] = false;
        pinTop[i] = 0;
        sheets[i].style.position = 'relative';
        continue;
      }
      pinned[i] = true;
      pinTop[i] = Math.min(0, vh - sheetH[i]);
      sheets[i].style.position = 'sticky';
      sheets[i].style.top = pinTop[i] + 'px';
    }

    /* Reduced motion drops the stack, so any scrim left over from before the
       preference changed has to come off with it. */
    if (reduceMotion.matches) {
      for (i = 0; i < n; i++) {
        lastVeil[i] = 0;
        lastMoving[i] = false;
        sheets[i].style.removeProperty('--veil');
        sheets[i].classList.remove('is-veiled');
      }
    }

    measured = true;
    measuring = false;
  }

  /* Where sheet `idx` actually renders, for a given scroll offset, without
     asking the browser. `natural` is its flow position; a sticky sheet cannot
     move above that. `stuck` is the pin offset. `limit` is the sticky
     containing block's floor: main's bottom edge, which is what releases the
     whole stack over the last screen of the page. */
  function topAt(idx, y) {
    var natural = flowTop[idx] - y;
    if (!pinned[idx]) return natural;
    var limit = (mainEnd - y) - sheetH[idx];
    return Math.max(natural, Math.min(pinTop[idx], limit));
  }

  /* Re-pin after a sheet changes height, without moving what the reader is
     looking at. A sheet is pinned by its bottom edge, so growing one drags its
     top -- and everything printed on it -- upward by the height it gained.
     Capture where the sheet sits, re-pin, then scroll to the position that puts
     it back: a pinned sheet ignores scrolling, so the net effect is that it
     gains runway rather than lurching out from under a thumb. */
  function relayoutHolding(sheet) {
    var idx = sheets.indexOf(sheet);
    if (idx < 0 || !measured) { measure(); frame(); return; }

    var before = topAt(idx, window.scrollY);
    measure();
    var y = Math.round(window.scrollY);
    if (Math.round(topAt(idx, y)) === Math.round(before)) { frame(); return; }

    var want = Math.max(0, Math.min(maxScroll, Math.round(flowTop[idx] - before)));
    if (want !== y) window.scrollTo({ top: want, behavior: 'auto' });
    frame();
  }

  /* ---- Frame: the covered-sheet scrim and the parked meter -------------- */

  // Last written values. Every write below is gated on one of these changing,
  // so a scroll that does not cross a threshold costs nothing but arithmetic.
  var lastVeil = [];
  var lastMoving = [];
  var lastHidden = -2;
  var waveIdle = false;

  function frame() {
    if (!measured) return;
    var y = window.scrollY;
    var i;

    /* Veil: ramps up while the next sheet is crossing this one, clears once
       this sheet is off screen entirely.

       `is-veiled` marks the sheets whose scrim is *moving*, not the ones that
       have a scrim: a covered sheet sits at COVER_MAX for the rest of the page
       and a sheet nothing has reached sits at 0, and a static opacity has
       nothing to promote. The window is the ramp itself, widened by LAYER_EDGE
       so the layer exists before the first frame that changes, which is the one
       that would otherwise repaint. */
    if (!reduceMotion.matches) {
      var lead = vh * COVER_LEAD;
      var span = lead - vh * COVER_DONE;
      for (i = 0; i < n - 1; i++) {
        var top = topAt(i, y);
        var nextTop = topAt(i + 1, y);
        var v = 0;
        if (top + sheetH[i] > 0 && top < vh) {
          /* Eased, and finished early. Squaring fixes the front end: a linear
             ramp had the scrim a third of the way in while the covering sheet
             was still most of a screen away, which on a cream sheet reads as a
             flash. COVER_DONE fixes the back end: the last thing left of an
             outgoing sheet is a sliver of its own top edge -- ruler and heading
             space, no content -- and finishing the ramp at the moment of
             contact leaves that sliver only two thirds scrimmed, a light grey
             bar with a hard edge under it. The ramp now completes while the
             covering sheet is still COVER_DONE of a viewport short, so by the
             time only the empty sliver is left it has already gone to the scrim
             colour and reads as shadow. */
          var ramp = (lead - nextTop) / span;
          v = ramp > 0 ? (ramp > 1 ? COVER_MAX : ramp * ramp * COVER_MAX) : 0;
        }
        v = Math.round(v * 1000) / 1000;
        var changed = v !== lastVeil[i];
        if (changed) {
          lastVeil[i] = v;
          sheets[i].style.setProperty('--veil', v);
        }

        /* Promoted while the scrim is in its ramp -- which is only true while
           the sheet above is still travelling, so `nextTop > pinTop[i + 1]`:
           once that sheet parks, this one's scrim is a fixed COVER_MAX for the
           rest of the page and there is nothing left to promote. */
        var moving = v > 0 &&
          (changed || (nextTop < lead + LAYER_EDGE && nextTop > pinTop[i + 1] + 1));
        if (moving !== lastMoving[i]) {
          lastMoving[i] = moving;
          sheets[i].classList.toggle('is-veiled', moving);
        }
      }
    }

    /* Take the buried sheets out of the paint tree.

       A pinned sheet parks with its bottom at the foot of the viewport and
       stays there for the rest of the page, so by the last section every
       sheet is still live: ten mutually overlapping composited layers, each
       carrying a 54px blurred box-shadow and a masked full-sheet wash. Chrome
       loses the paint order under that load and sheets the reader passed long
       ago bleed up through the one on screen. It shows worst at the end of the
       page, where the most layers are stacked, which is why About into Contact
       was the report. index.html never hit it: same stack, but no per-sheet
       shadow and no masked overlay, so it stays under the limit.

       Anything buried is invisible and can be skipped. `visibility: hidden`
       drops the paint without touching layout, which matters because
       measure() still needs real heights.

       The test is the union of the sheets above, not any single one of them.
       Asking one sheet to cover the viewport by itself only works where
       sheets are taller than the window; on a tall window almost none are,
       so most stayed live and the bleed came back. The sheets are contiguous
       -- pinning only ever pushes one down, so no gap opens between them --
       so the union of a run of them is a single interval. */
    /* Only as far down as the stack is responsible for. At the foot of the
       page main's bottom edge sits above the fold and the footer owns the
       strip below it, so requiring the sheets to span the whole viewport
       meant nothing was ever culled exactly where the load is heaviest -- on
       a phone, where the sections are tallest, that was the entire end of the
       page. */
    var need = Math.min(vh, mainEnd - y);
    var lo = Infinity, hi = -Infinity, hideUpTo = -1;
    for (i = n - 1; i >= 0; i--) {
      if (lo <= 0 && hi >= need) { hideUpTo = i; break; }
      var ct = topAt(i, y);
      if (ct < lo) lo = ct;
      if (ct + sheetH[i] > hi) hi = ct + sheetH[i];
    }
    if (hideUpTo !== lastHidden) {
      lastHidden = hideUpTo;
      for (i = 0; i < n; i++) {
        sheets[i].style.visibility = i <= hideUpTo ? 'hidden' : '';
      }
    }
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
     moves every sheet mid-gesture. Width changes always count; height changes
     only when they are too large to be browser chrome, or when the device has a
     real pointer. */
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
     here -- a late thumbnail, a font swap we did not catch, a browser reflowing
     a wrapped headline -- would otherwise leave the pin offsets stale until the
     next resize. measure() cannot change main's height (sticky reserves its
     flow space), so watching it cannot feed back on itself. */
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
    var sheet = el.closest('main > section');
    var idx = sheets.indexOf(sheet);
    if (idx < 0 || !measured) {
      return Math.max(0, el.getBoundingClientRect().top + window.scrollY - NAV_H);
    }
    // Every anchor target on this page is a section, so the sheet's own flow
    // position is the landing point, less the sticky nav.
    return Math.max(0, flowTop[idx] - NAV_H);
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

  /* A URL opened with a #hash never goes through the click handler above. The
     hash was pulled out of the URL at the top of this file so the browser's own
     jump never fires; land on the same spot anchorY() would give a click
     instead, every time the flow positions get recomputed.

     Putting the hash back is deliberately a separate step, and deliberately not
     done until after the load event. The browser makes one more attempt of its
     own to scroll to the fragment as the document finishes loading, and by then
     the sheets are a sticky stack: a pinned sheet's box is nowhere near where
     the reader has to end up, so that attempt lands thousands of pixels away
     and, running after this file's own load handler, wins. Restoring the hash
     immediately is what gives it a fragment to act on. Held back by one frame
     past load, there is nothing for it to find, and the address bar still ends
     up carrying the section the visitor asked for.
     (js/v1.js restores the hash inline and has the same landing bug on
     /1.html: open /1.html#script and it lands near the foot of the page.) */
  function landOnHash(hash) {
    hash = hash || pendingHash;
    if (!hash || hash === '#') return;
    var y = anchorY(hash.slice(1));
    if (y === null) return;
    window.scrollTo({ top: y, behavior: 'auto' });
  }

  function restoreHash() {
    if (!pendingHash || pendingHash === '#') return;
    if (location.hash !== pendingHash) history.replaceState(null, '', pendingHash);
  }

  landOnHash();
  window.addEventListener('load', function () {
    landOnHash();
    requestAnimationFrame(function () { landOnHash(); restoreHash(); });
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { landOnHash(); });
  window.addEventListener('hashchange', function () {
    var hash = location.hash;
    if (!hash || hash === '#') return;
    pendingHash = hash;
    history.replaceState(null, '', location.pathname + location.search);
    landOnHash(hash);
    restoreHash();
  });

  /* ---- Phone: detail rows collapse ------------------------------------- */
  var rows = Array.prototype.slice.call(document.querySelectorAll('.row'));

  function toggleRow(row) {
    var open = row.classList.toggle('is-open');
    row.setAttribute('aria-expanded', open ? 'true' : 'false');

    /* The description animates its max-height, so the sheet is not its final
       height until that transition ends. Waiting on the transition rather than
       on a hardcoded delay means the re-pin lands on the real height even if
       the duration in the stylesheet changes; the timer is only the fallback
       for a transition that never fires. */
    var sheet = row.closest('main > section');
    var text = row.querySelector('.row__text');
    var fallback = setTimeout(function () { done(); }, 600);
    function done(e) {
      if (e && e.propertyName !== 'max-height') return;
      clearTimeout(fallback);
      if (text) text.removeEventListener('transitionend', done);
      relayoutHolding(sheet);
    }
    if (text) text.addEventListener('transitionend', done);
  }

  function syncRowRoles() {
    rows.forEach(function (row) {
      if (mqPhone.matches) {
        row.setAttribute('role', 'button');
        row.setAttribute('tabindex', '0');
        row.setAttribute('aria-expanded', row.classList.contains('is-open') ? 'true' : 'false');
      } else {
        row.removeAttribute('role');
        row.removeAttribute('tabindex');
        row.removeAttribute('aria-expanded');
        row.classList.remove('is-open');
      }
    });
    remeasure();
  }

  rows.forEach(function (row) {
    row.addEventListener('click', function (e) {
      if (!mqPhone.matches || e.target.closest('a')) return;
      toggleRow(row);
    });
    row.addEventListener('keydown', function (e) {
      if (!mqPhone.matches) return;
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      toggleRow(row);
    });
  });

  syncRowRoles();
  mqPhone.addEventListener('change', syncRowRoles);
  reduceMotion.addEventListener('change', remeasure);

  /* ---- Work filter ----------------------------------------------------- */
  var filters = Array.prototype.slice.call(document.querySelectorAll('.filter'));
  var items = Array.prototype.slice.call(document.querySelectorAll('.work-item'));
  var workEmpty = document.querySelector('.work__empty');

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var want = btn.getAttribute('data-filter');
      var shown = 0;

      filters.forEach(function (other) {
        var on = other === btn;
        other.classList.toggle('is-active', on);
        other.setAttribute('aria-pressed', on ? 'true' : 'false');
      });

      items.forEach(function (item) {
        var match = want === 'all' || item.getAttribute('data-category') === want;
        item.classList.toggle('is-hidden', !match);
        if (match) shown++;
      });

      if (workEmpty) workEmpty.hidden = shown > 0;
      relayoutHolding(btn.closest('main > section'));   // the grid just reflowed
    });
  });

  /* ---- Video lightbox -------------------------------------------------- */
  var lightbox = document.querySelector('.lightbox');
  var lightboxFrame = document.querySelector('.lightbox__frame');
  var lightboxClose = document.querySelector('.lightbox__close');
  var lastFocus = null;

  function openLightbox(id, trigger) {
    if (!lightbox || !lightboxFrame) return;
    lastFocus = trigger || null;
    lightboxFrame.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1';
    lightbox.classList.add('is-open');
    // The overlay is fixed and already covers the trigger, so moving focus into
    // it must not scroll the page out from under the reader.
    if (lightboxClose) lightboxClose.focus({ preventScroll: true });
  }

  function closeLightbox() {
    if (!lightbox || !lightboxFrame || !lightbox.classList.contains('is-open')) return;
    lightbox.classList.remove('is-open');
    lightboxFrame.src = '';
    if (lastFocus) { lastFocus.focus({ preventScroll: true }); lastFocus = null; }
  }

  document.querySelectorAll('[data-youtube-id]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      openLightbox(el.getAttribute('data-youtube-id'), el);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });
})();
