(function () {
  'use strict';

  // Theme toggle (light/dark, defaults to the visitor's OS preference)
  var root = document.documentElement;
  var themeToggle = document.getElementById('theme-toggle');
  var darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function systemTheme() {
    return darkMediaQuery.matches ? 'dark' : 'light';
  }

  function currentTheme() {
    return root.getAttribute('data-theme') || systemTheme();
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
  }

  applyTheme(currentTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  darkMediaQuery.addEventListener('change', function (e) {
    var hasOverride;
    try { hasOverride = !!localStorage.getItem('theme'); } catch (err) { hasOverride = false; }
    if (!hasOverride) applyTheme(e.matches ? 'dark' : 'light');
  });

  // Palette preview switcher (client review only)
  // Visit the site with ?preview=theme to show a picker for the
  // three color options under consideration.
  if (new URLSearchParams(window.location.search).get('preview') === 'theme') {
    var palettes = [
      { id: '', label: 'Copper', accent: '#c97a46', bg: '#faf7f0' },
      { id: 'yellow-accent', label: 'Copper + yellow', accent: '#ffcb00', bg: '#faf7f0' },
      { id: 'warm-gold', label: 'Warm gold', accent: '#d4af37', bg: '#faf7f0' },
      { id: 'original', label: 'Original', accent: '#ffcb00', bg: '#ffffff' }
    ];
    var storedPalette;
    try { storedPalette = localStorage.getItem('palette') || ''; } catch (e) { storedPalette = ''; }

    function applyPalette(id) {
      if (id) {
        root.setAttribute('data-palette', id);
      } else {
        root.removeAttribute('data-palette');
      }
    }
    applyPalette(storedPalette);

    var savedPos;
    try { savedPos = JSON.parse(localStorage.getItem('palettePreviewPos') || 'null'); } catch (e) { savedPos = null; }
    var savedCollapsed;
    try { savedCollapsed = localStorage.getItem('palettePreviewCollapsed') === '1'; } catch (e) { savedCollapsed = false; }

    var style = document.createElement('style');
    style.textContent =
      '.palette-preview{position:fixed;bottom:20px;right:20px;z-index:9999;' +
      'background:#fdfbf6;border:1px solid #e3dccb;border-radius:14px;padding:0 18px 16px;' +
      'font-family:Montserrat,Arial,Helvetica,sans-serif;color:#1e1b17;' +
      'box-shadow:0 8px 32px rgba(0,0,0,0.16);}' +
      '.palette-preview.is-collapsed{display:none;}' +
      '.palette-preview__header{display:flex;align-items:center;justify-content:space-between;' +
      'gap:8px;margin:0 -18px 12px;padding:10px 10px 10px 14px;cursor:grab;' +
      'border-bottom:1px solid #e3dccb;touch-action:none;user-select:none;}' +
      '.palette-preview__header:active{cursor:grabbing;}' +
      '.palette-preview__header-label{font-size:11px;font-weight:700;letter-spacing:.06em;' +
      'text-transform:uppercase;color:#6b6255;display:flex;align-items:center;gap:6px;}' +
      '.palette-preview__grip{display:flex;gap:3px;flex:none;}' +
      '.palette-preview__grip span{width:3px;height:3px;border-radius:50%;background:#c9c0ac;}' +
      '.palette-preview__close{flex:none;width:22px;height:22px;border-radius:6px;border:none;' +
      'background:transparent;color:#6b6255;cursor:pointer;display:flex;align-items:center;' +
      'justify-content:center;transition:background .15s ease,color .15s ease;}' +
      '.palette-preview__close:hover{background:#f1ece1;color:#1e1b17;}' +
      '.palette-preview__fab{position:fixed;bottom:20px;right:20px;z-index:9999;width:44px;height:44px;' +
      'border-radius:50%;border:1px solid #e3dccb;background:#fdfbf6;cursor:pointer;' +
      'box-shadow:0 8px 24px rgba(0,0,0,0.2);display:flex;align-items:center;justify-content:center;' +
      'color:#c97a46;transition:transform .15s ease;}' +
      '.palette-preview__fab:hover{transform:scale(1.06);}' +
      '.palette-preview__fab.is-hidden{display:none;}' +
      '.palette-preview__title{font-size:11px;font-weight:700;letter-spacing:.06em;' +
      'text-transform:uppercase;color:#6b6255;margin:0 0 12px;}' +
      '.palette-preview__group{display:flex;gap:18px;}' +
      '.palette-preview__opt{display:flex;flex-direction:column;align-items:center;gap:7px;}' +
      '.palette-preview__swatch{position:relative;width:40px;height:40px;border-radius:999px;' +
      'cursor:pointer;box-shadow:inset 0 0 0 1px rgba(0,0,0,0.08);' +
      'transition:transform .15s ease,box-shadow .15s ease;}' +
      '.palette-preview__swatch:hover{transform:scale(1.06);}' +
      '.palette-preview__opt input{position:absolute;opacity:0;width:1px;height:1px;}' +
      '.palette-preview__opt input:checked ~ .palette-preview__swatch{' +
      'box-shadow:0 0 0 2px #fdfbf6,0 0 0 4px #c97a46;}' +
      '.palette-preview__opt input:focus-visible ~ .palette-preview__swatch{' +
      'box-shadow:0 0 0 2px #fdfbf6,0 0 0 4px #c97a46;}' +
      '.palette-preview__check{position:absolute;inset:0;display:flex;align-items:center;' +
      'justify-content:center;opacity:0;transition:opacity .15s ease;}' +
      '.palette-preview__opt input:checked ~ .palette-preview__swatch .palette-preview__check{opacity:1;}' +
      '.palette-preview__label{font-size:11px;font-weight:600;color:#6b6255;text-align:center;' +
      'max-width:64px;line-height:1.25;}' +
      '.palette-preview__opt input:checked ~ .palette-preview__label{color:#1e1b17;}' +
      '.palette-preview__divider{height:1px;background:#e3dccb;margin:14px 0;}' +
      '.palette-preview__theme{position:relative;display:flex;background:#f1ece1;' +
      'border-radius:10px;padding:3px;gap:2px;}' +
      '.palette-preview__theme-thumb{position:absolute;top:3px;bottom:3px;left:3px;' +
      'width:calc(50% - 2px);border-radius:8px;background:#fdfbf6;' +
      'box-shadow:0 1px 6px rgba(0,0,0,0.12);transition:transform .2s ease;pointer-events:none;}' +
      '.palette-preview__theme-opt{flex:1;position:relative;z-index:1;}' +
      '.palette-preview__theme-opt input{position:absolute;opacity:0;width:100%;height:100%;margin:0;cursor:pointer;}' +
      '.palette-preview__theme-opt span{display:flex;align-items:center;justify-content:center;' +
      'gap:5px;min-height:32px;padding:4px 6px;border-radius:8px;' +
      'font-size:11.5px;line-height:1;font-weight:600;color:#6b6255;cursor:pointer;' +
      'transition:color .18s ease;}' +
      '.palette-preview__theme-opt input:checked + span{color:#1e1b17;}' +
      '.palette-preview__theme-opt input:focus-visible + span{outline:2px solid #c97a46;outline-offset:2px;}' +
      '.palette-preview__theme-opt svg{flex:none;}';
    document.head.appendChild(style);

    var panel = document.createElement('div');
    panel.className = 'palette-preview';

    var header = document.createElement('div');
    header.className = 'palette-preview__header';

    var headerLabel = document.createElement('div');
    headerLabel.className = 'palette-preview__header-label';
    var grip = document.createElement('span');
    grip.className = 'palette-preview__grip';
    grip.innerHTML = '<span></span><span></span><span></span><span></span><span></span><span></span>';
    headerLabel.appendChild(grip);
    headerLabel.appendChild(document.createTextNode('Preview'));
    header.appendChild(headerLabel);

    var closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'palette-preview__close';
    closeBtn.setAttribute('aria-label', 'Hide preview panel');
    closeBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none">' +
      '<path d="M1.5 1.5 10.5 10.5M10.5 1.5 1.5 10.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
    header.appendChild(closeBtn);

    panel.appendChild(header);

    var title = document.createElement('div');
    title.className = 'palette-preview__title';
    title.textContent = 'Palette';
    panel.appendChild(title);

    var group = document.createElement('div');
    group.setAttribute('role', 'radiogroup');
    group.setAttribute('aria-label', 'Preview color palette');
    group.className = 'palette-preview__group';

    palettes.forEach(function (p) {
      var opt = document.createElement('label');
      opt.className = 'palette-preview__opt';

      var input = document.createElement('input');
      input.type = 'radio';
      input.name = 'palette-preview';
      input.value = p.id;
      input.checked = storedPalette === p.id;
      input.addEventListener('change', function () {
        applyPalette(p.id);
        try { localStorage.setItem('palette', p.id); } catch (e) {}
      });

      var swatch = document.createElement('span');
      swatch.className = 'palette-preview__swatch';
      swatch.style.background = 'linear-gradient(135deg, ' + p.accent + ' 0 50%, ' + p.bg + ' 50% 100%)';

      var check = document.createElement('span');
      check.className = 'palette-preview__check';
      check.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none">' +
        '<path d="M3 8.5 6.5 12 13 4.5" stroke="#fff" stroke-width="2.4" ' +
        'stroke-linecap="round" stroke-linejoin="round" ' +
        'style="filter:drop-shadow(0 0 2px rgba(0,0,0,.5))"/></svg>';
      swatch.appendChild(check);

      var labelText = document.createElement('span');
      labelText.className = 'palette-preview__label';
      labelText.textContent = p.label;

      opt.appendChild(input);
      opt.appendChild(swatch);
      opt.appendChild(labelText);
      group.appendChild(opt);
    });

    panel.appendChild(group);

    var divider = document.createElement('div');
    divider.className = 'palette-preview__divider';
    panel.appendChild(divider);

    var themeTitle = document.createElement('div');
    themeTitle.className = 'palette-preview__title';
    themeTitle.style.marginBottom = '8px';
    themeTitle.textContent = 'Theme';
    panel.appendChild(themeTitle);

    var themes = [
      { id: 'light', label: 'Light', icon: '<svg width="13" height="13" viewBox="0 0 16 16" fill="none">' +
          '<circle cx="8" cy="8" r="3.5" stroke="currentColor" stroke-width="1.4"/>' +
          '<path d="M8 1v2M8 13v2M2.6 2.6l1.4 1.4M12 12l1.4 1.4M1 8h2M13 8h2M2.6 13.4 4 12M12 4l1.4-1.4" ' +
          'stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>' },
      { id: 'dark', label: 'Dark', icon: '<svg width="13" height="13" viewBox="0 0 16 16" fill="none">' +
          '<path d="M13.5 9.5A5.5 5.5 0 0 1 6.5 2.5 5.5 5.5 0 1 0 13.5 9.5Z" ' +
          'stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>' }
    ];

    var themeGroup = document.createElement('div');
    themeGroup.setAttribute('role', 'radiogroup');
    themeGroup.setAttribute('aria-label', 'Preview light or dark theme');
    themeGroup.className = 'palette-preview__theme';

    var themeThumb = document.createElement('div');
    themeThumb.className = 'palette-preview__theme-thumb';
    themeGroup.appendChild(themeThumb);

    function moveThemeThumb(index) {
      themeThumb.style.transform = 'translateX(' + (index * 100) + '%)';
    }

    themes.forEach(function (t, index) {
      var opt = document.createElement('label');
      opt.className = 'palette-preview__theme-opt';

      var input = document.createElement('input');
      input.type = 'radio';
      input.name = 'theme-preview';
      input.value = t.id;
      input.checked = currentTheme() === t.id;
      input.addEventListener('change', function () {
        applyTheme(t.id);
        try { localStorage.setItem('theme', t.id); } catch (e) {}
        moveThemeThumb(index);
      });

      var span = document.createElement('span');
      span.innerHTML = t.icon;
      span.appendChild(document.createTextNode(t.label));

      opt.appendChild(input);
      opt.appendChild(span);
      themeGroup.appendChild(opt);

      if (input.checked) moveThemeThumb(index);
    });

    panel.appendChild(themeGroup);
    document.body.appendChild(panel);

    var fab = document.createElement('button');
    fab.type = 'button';
    fab.className = 'palette-preview__fab';
    fab.setAttribute('aria-label', 'Show preview panel');
    fab.innerHTML = '<svg width="18" height="18" viewBox="0 0 16 16" fill="none">' +
      '<circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.4"/>' +
      '<circle cx="6" cy="6.5" r="1" fill="currentColor"/>' +
      '<circle cx="10" cy="6.5" r="1" fill="currentColor"/>' +
      '<circle cx="8" cy="10" r="1" fill="currentColor"/></svg>';
    document.body.appendChild(fab);

    function setCollapsed(collapsed) {
      panel.classList.toggle('is-collapsed', collapsed);
      fab.classList.toggle('is-hidden', !collapsed);
      try { localStorage.setItem('palettePreviewCollapsed', collapsed ? '1' : '0'); } catch (e) {}
    }
    closeBtn.addEventListener('click', function () { setCollapsed(true); });
    fab.addEventListener('click', function () { setCollapsed(false); });
    setCollapsed(savedCollapsed);

    var isMobileViewport = window.innerWidth <= 640;

    if (savedPos && !isMobileViewport) {
      panel.style.left = savedPos.left + 'px';
      panel.style.top = savedPos.top + 'px';
      panel.style.right = 'auto';
      panel.style.bottom = 'auto';
    }

    var dragOffsetX = 0;
    var dragOffsetY = 0;
    var dragging = false;

    header.addEventListener('pointerdown', function (e) {
      if (isMobileViewport) return;
      if (e.target === closeBtn || closeBtn.contains(e.target)) return;
      var rect = panel.getBoundingClientRect();
      dragOffsetX = e.clientX - rect.left;
      dragOffsetY = e.clientY - rect.top;
      dragging = true;
      header.setPointerCapture(e.pointerId);
    });

    header.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var maxLeft = window.innerWidth - panel.offsetWidth;
      var maxTop = window.innerHeight - panel.offsetHeight;
      var left = Math.min(Math.max(0, e.clientX - dragOffsetX), maxLeft);
      var top = Math.min(Math.max(0, e.clientY - dragOffsetY), maxTop);
      panel.style.left = left + 'px';
      panel.style.top = top + 'px';
      panel.style.right = 'auto';
      panel.style.bottom = 'auto';
    });

    function endDrag(e) {
      if (!dragging) return;
      dragging = false;
      try {
        localStorage.setItem('palettePreviewPos', JSON.stringify({
          left: parseFloat(panel.style.left),
          top: parseFloat(panel.style.top)
        }));
      } catch (err) {}
    }
    header.addEventListener('pointerup', endDrag);
    header.addEventListener('pointercancel', endDrag);
  }

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    nav.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Catalog filter (by industry/use case)
  var catalogFilters = document.querySelectorAll('.catalog__filter');
  var catalogItems = document.querySelectorAll('.catalog-item');
  var catalogEmpty = document.querySelector('.catalog__empty');
  if (catalogFilters.length && catalogItems.length) {
    catalogFilters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');
        var visibleCount = 0;
        catalogFilters.forEach(function (b) {
          b.classList.toggle('is-active', b === btn);
          b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
        });
        catalogItems.forEach(function (item) {
          var match = filter === 'all' || item.getAttribute('data-category') === filter;
          item.classList.toggle('is-hidden', !match);
          if (match) visibleCount++;
        });
        if (catalogEmpty) catalogEmpty.hidden = visibleCount > 0;
      });
    });
  }

  // Mobile "reels" scroll hint -- clicking the bouncing arrow jumps to
  // the next snap section instead of just hinting at it.
  var snapSections = Array.prototype.slice.call(document.querySelectorAll('main > section[id]'));
  var siteFooter = document.querySelector('.site-footer');
  var snapTargets = siteFooter ? snapSections.concat(siteFooter) : snapSections;
  snapSections.forEach(function (section, i) {
    var next = snapTargets[i + 1];
    if (!next) return;
    var hint = document.createElement('button');
    hint.type = 'button';
    hint.className = 'scroll-hint';
    hint.setAttribute('aria-label', 'Scroll to next section');
    hint.addEventListener('click', function () {
      next.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    section.appendChild(hint);
  });

  // Video lightbox
  var lightbox = document.querySelector('.lightbox');
  var lightboxFrame = document.querySelector('.lightbox__frame');
  var lightboxClose = document.querySelector('.lightbox__close');

  function openLightbox(youtubeId) {
    if (!lightbox || !lightboxFrame) return;
    lightboxFrame.src = 'https://www.youtube.com/embed/' + youtubeId + '?autoplay=1';
    lightbox.classList.add('is-open');
  }

  function closeLightbox() {
    if (!lightbox || !lightboxFrame) return;
    lightbox.classList.remove('is-open');
    lightboxFrame.src = '';
  }

  document.querySelectorAll('[data-youtube-id]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      openLightbox(el.getAttribute('data-youtube-id'));
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

  // Contact form -- no backend wired up, so route through a
  // prefilled mailto instead of silently failing on submit.
  var form = document.querySelector('.js-contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#name').value.trim();
      var email = form.querySelector('#email').value.trim();
      var phone = form.querySelector('#phone').value.trim();
      var message = form.querySelector('#message').value.trim();
      var subject = encodeURIComponent('Website enquiry from ' + (name || 'website visitor'));
      var bodyLines = [
        'Name: ' + name,
        'Email: ' + email,
        'Phone: ' + (phone || '-'),
        '',
        message
      ];
      var body = encodeURIComponent(bodyLines.join('\n'));
      window.location.href = 'mailto:work@potbellyaudio.com?subject=' + subject + '&body=' + body;
    });
  }
})();
