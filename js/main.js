/* Potbelly Audio -- sheet stacking, scroll motion and interaction. */
(function () {
  'use strict';

  var EASE = 'cubic-bezier(0.2,0.7,0.2,1)';
  var NAV_H = 64;
  var COVER_LEAD = 0.35;     // scrim starts when the next sheet crosses this much of the viewport
  var COVER_DONE = 0.18;     // and is complete while that sheet is still this much short
  var COVER_MAX = 1;         // a fully covered sheet goes all the way to the scrim colour
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---- Intro overlay --------------------------------------------------- */
  /* Remove it once the wipe has finished so it cannot intercept anything
     (it is pointer-events: none, but clean DOM is clean DOM). */
  var intro = document.querySelector('.intro');
  if (intro) {
    setTimeout(function () { intro.remove(); }, reduceMotion.matches ? 200 : 3000);
  }

  /* ---- Hero waveform --------------------------------------------------- */
  var wf = document.getElementById('waveform');
  if (wf) {
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 120; i++) {
      var h = 10 + Math.abs(Math.sin(i * 0.42)) * 68 + (i % 9 === 0 ? 22 : 0);
      var bar = document.createElement('span');
      bar.style.height = h + 'px';
      bar.style.opacity = (0.18 + 0.72 * Math.abs(Math.sin(i * 0.23))).toFixed(3);
      bar.style.animation = 'pbwave 1.4s ease-in-out ' + (i * 0.055).toFixed(2) + 's infinite alternate';
      frag.appendChild(bar);
    }
    wf.appendChild(frag);
  }

  /* ---- Section reveals ------------------------------------------------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('main > section'));

  if (!reduceMotion.matches && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        (entry.target._pbKids || []).forEach(function (kid, idx) {
          kid.style.transitionDelay = (idx * 0.12) + 's';
          kid.style.opacity = '1';
          kid.style.transform = 'none';
        });
        io.unobserve(entry.target);
      });
    }, { threshold: 0.1 });

    sections.forEach(function (sec) {
      // Anything already on screen keeps its own entrance animation.
      if (sec.getBoundingClientRect().top <= window.innerHeight * 0.9) return;
      var inner = sec.querySelector(':scope > .wrap');
      if (!inner) return;
      var kids = inner.children.length > 1
        ? Array.prototype.slice.call(inner.children)
        : [inner];
      kids.forEach(function (kid) {
        kid.style.opacity = '0';
        kid.style.transform = 'translateY(40px) scale(0.985)';
        kid.style.transition = 'opacity 0.9s ' + EASE + ', transform 0.9s ' + EASE;
      });
      sec._pbKids = kids;
      io.observe(sec);
    });
  }

  /* ---- Sheet stacking -------------------------------------------------- */
  /* Every sheet except the last pins once it has been read, and the next one
     slides over the top of it. */
  var main = document.querySelector('main');
  var flowTops = [];

  function layout() {
    // Document-order position of each section. Anchor navigation needs this:
    // a pinned sticky section reports its stuck position through
    // getBoundingClientRect and offsetTop, so native anchor scrolling lands in
    // the wrong place once a section is above the viewport.
    var y = main.getBoundingClientRect().top + window.scrollY;
    flowTops = [];
    sections.forEach(function (sec) {
      y += parseFloat(getComputedStyle(sec).marginTop) || 0;
      flowTops.push(y);
      y += sec.offsetHeight;
    });
    sections.forEach(function (sec, idx) {
      if (idx === sections.length - 1) {
        sec.style.position = 'relative';
        sec.style.top = '';
        return;
      }
      sec.style.position = 'sticky';
      sec.style.top = Math.min(0, window.innerHeight - sec.offsetHeight) + 'px';
    });
  }

  layout();
  setTimeout(layout, 700);
  window.addEventListener('load', layout);
  window.addEventListener('resize', layout, { passive: true });

  /* ---- Ghost parallax + covered-sheet depth ---------------------------- */
  var ghosts = Array.prototype.slice.call(document.querySelectorAll('section > .ghost'));
  var ticking = false;

  function onScroll() {
    if (!reduceMotion.matches) {
      ghosts.forEach(function (ghost, gi) {
        var top = ghost.parentElement.getBoundingClientRect().top;
        var dir = gi % 2 === 0 ? -1 : 1;
        ghost.style.transform = 'translate(' + (dir * -top * 0.05).toFixed(1) + 'px, ' +
          (-top * 0.12).toFixed(1) + 'px)';
      });
    }

    var vh = window.innerHeight;
    var lead = vh * COVER_LEAD;
    var span = lead - vh * COVER_DONE;
    for (var i = 0; i < sections.length - 1; i++) {
      var sec = sections[i];
      var rect = sec.getBoundingClientRect();
      var nextTop = sections[i + 1].getBoundingClientRect().top;

      /* Dim only while this sheet is actually being covered, and finish before
         the covering sheet lands rather than at the moment it lands.

         The sheets shorter than the viewport -- five of the ten at 1440x900 --
         pin top-aligned, because the pin offset clamps at min(0, ...). So the
         last thing left of them on screen is a sliver of their own top edge:
         seam and heading space, no content. A ramp that was still only two
         thirds in at the moment of contact left that sliver a light grey bar.
         Squaring holds the scrim back early, where it used to read as a flash
         on the cream sheets; COVER_DONE drives it home before the sliver is
         all that is left, so the sliver goes to shadow instead. */
      var ramp = (lead - nextTop) / span;
      var covering = ramp > 0 ? (ramp > 1 ? 1 : ramp * ramp) : 0;
      var onScreen = rect.bottom > 0 && rect.top < vh;
      var progress = onScreen ? covering : 0;

      /* No scale here. Shrinking a covered sheet moved it off the viewport
         edges -- 5% of 1440px is 72px, so 36px of bare page background down
         each side -- and the sheet visibly detached from the frame instead of
         sitting under the next one. Depth comes from the scrim alone. */
      if (progress > 0 && !reduceMotion.matches) {
        sec.style.setProperty('--cover', (COVER_MAX * progress).toFixed(3));
      } else {
        sec.style.setProperty('--cover', '0');
      }
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ---- In-page anchors ------------------------------------------------- */
  function anchorY(id) {
    if (id === 'top') return 0;
    var el = document.getElementById(id);
    if (!el) return null;
    var sec = el.closest('main > section');
    var idx = sections.indexOf(sec);
    if (idx < 0) {
      return Math.max(0, el.getBoundingClientRect().top + window.scrollY - NAV_H);
    }
    var y = flowTops[idx] + (el.getBoundingClientRect().top - sec.getBoundingClientRect().top);
    return Math.max(0, y - NAV_H);
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

  /* ---- Phone: detail rows collapse ------------------------------------- */
  var mqPhone = window.matchMedia('(max-width: 640px)');
  var rows = Array.prototype.slice.call(document.querySelectorAll('.row'));

  function toggleRow(row) {
    var open = row.classList.toggle('is-open');
    row.setAttribute('aria-expanded', open ? 'true' : 'false');
    setTimeout(layout, 420);
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
      }
    });
  }

  rows.forEach(function (row) {
    row.addEventListener('click', function (e) {
      if (!mqPhone.matches) return;
      if (e.target.closest('a')) return;
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

  /* ---- Work filter ----------------------------------------------------- */
  var filters = document.querySelectorAll('.filter');
  var workItems = document.querySelectorAll('.work-item');
  var workEmpty = document.querySelector('.work__empty');

  if (filters.length && workItems.length) {
    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');
        var visible = 0;
        filters.forEach(function (b) {
          b.classList.toggle('is-active', b === btn);
          b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
        });
        workItems.forEach(function (item) {
          var match = filter === 'all' || item.getAttribute('data-category') === filter;
          item.classList.toggle('is-hidden', !match);
          if (match) visible++;
        });
        if (workEmpty) workEmpty.hidden = visible > 0;
        layout();
      });
    });
  }

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
    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox || !lightboxFrame || !lightbox.classList.contains('is-open')) return;
    lightbox.classList.remove('is-open');
    lightboxFrame.src = '';
    if (lastFocus) { lastFocus.focus(); lastFocus = null; }
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
