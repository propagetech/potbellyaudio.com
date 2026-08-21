/* Potbelly Audio -- alternate build (/1.html).
 *
 * Deliberately shares no algorithm with js/main.js. That file is the
 * sticky-sheet-stacking routine ported from merakifilms.in: sections pinned
 * with position:sticky, the covered one scaled down and dimmed through a
 * --cover custom property, plus a flowTops table to repair anchor scrolling
 * afterwards. None of that is here.
 *
 * What is here instead: normal document flow, a console rail that follows the
 * reader, and reveals that wipe in from the left.
 */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var mqPhone = window.matchMedia('(max-width: 640px)');

  /* ---- Hero level meter ------------------------------------------------ */
  /* Bottom-anchored bars, peaks lit in accent. Bars are inserted by script so
     the markup stays free of 64 empty spans. */
  var levels = document.getElementById('levels');
  if (levels) {
    var BARS = 64;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < BARS; i++) {
      // Two summed sines so the shape reads as signal rather than a sawtooth.
      var amp = 0.22 + 0.5 * Math.abs(Math.sin(i * 0.31)) + 0.26 * Math.abs(Math.sin(i * 0.11));
      amp = Math.min(1, amp);
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
  /* Left wipe, staggered per direct child of .inner. */
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

  /* ---- Console rail: scroll spy + mobile progress ---------------------- */
  var chans = Array.prototype.slice.call(document.querySelectorAll('.chan'));
  var barNow = document.getElementById('bar-now');
  var barProgress = document.getElementById('bar-progress');

  var spied = chans.map(function (chan) {
    var id = chan.getAttribute('href').slice(1);
    return { chan: chan, el: document.getElementById(id), label: chan.lastElementChild.textContent };
  }).filter(function (entry) { return entry.el; });

  var ticking = false;

  function onScroll() {
    ticking = false;

    if (barProgress) {
      var span = document.documentElement.scrollHeight - window.innerHeight;
      var pct = span > 0 ? Math.min(1, Math.max(0, window.scrollY / span)) : 0;
      barProgress.style.transform = 'scaleX(' + pct.toFixed(4) + ')';
    }

    // Live channel = the last one whose top has passed 45% of the viewport.
    var mark = window.innerHeight * 0.45;
    var live = null;
    spied.forEach(function (entry) {
      if (entry.el.getBoundingClientRect().top <= mark) live = entry;
    });

    chans.forEach(function (chan) { chan.classList.remove('is-live'); });
    if (live) {
      live.chan.classList.add('is-live');
      if (barNow) barNow.textContent = live.label;
    } else if (barNow) {
      barNow.textContent = 'Potbelly Audio';
    }
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  /* ---- Phone: cue rows collapse ---------------------------------------- */
  var cues = Array.prototype.slice.call(document.querySelectorAll('.cue'));

  function toggleCue(cue) {
    var open = cue.classList.toggle('is-open');
    cue.setAttribute('aria-expanded', open ? 'true' : 'false');
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
