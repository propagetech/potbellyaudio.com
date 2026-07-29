/* Potbelly Audio - Main JavaScript
   Progressive enhancement: works with JS off, enhances with JS on
   Mobile menu, form handling, analytics events */

(function() {
  'use strict';

  // DOM Ready check
  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  // Mobile menu toggle
  function initMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      const isOpen = nav.classList.contains('active');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu on link click
    const links = nav.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('active')) {
        nav.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Highlight current page in nav
  function setCurrentNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '/' && href === './')) {
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  // Smooth scroll for anchor links (progressive enhancement)
  function initAnchorLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href !== '#') {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            target.focus();
          }
        }
      });
    });
  }

  // Preload critical images
  function preloadCriticalImages() {
    const criticalImages = document.querySelectorAll('img[data-critical="true"]');
    criticalImages.forEach(img => {
      const preload = document.createElement('link');
      preload.rel = 'preload';
      preload.as = 'image';
      preload.href = img.src;
      preload.imagesrcset = img.srcset;
      preload.imagesizes = img.sizes;
      document.head.appendChild(preload);
    });
  }

  // Form enhancement: validate email enquiry links
  function initEnquiryLinks() {
    const enquiryLinks = document.querySelectorAll('a[href^="mailto:"]');
    enquiryLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // Check if mailto link is valid before opening
        const href = link.getAttribute('href');
        if (!href.includes('@')) {
          e.preventDefault();
          console.warn('Invalid email link:', href);
        }
      });
    });
  }

  // Track external links
  function trackExternalLinks() {
    const links = document.querySelectorAll('a[href^="http"]');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (!href.includes(window.location.hostname)) {
        link.setAttribute('rel', 'noopener noreferrer');
        link.setAttribute('target', '_blank');

        // Analytics event (if gtag available)
        link.addEventListener('click', () => {
          if (typeof gtag !== 'undefined') {
            gtag('event', 'external_link_click', {
              destination_url: href
            });
          }
        });
      }
    });
  }

  // Lazy load images
  function initLazyLoad() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            // Add animation class when visible
            if (img.classList.contains('animate')) {
              img.classList.add('visible');
            }
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src], img.animate').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  // CTA button analytics
  function trackCTAClicks() {
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-primary-dark');
    ctaButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (typeof gtag !== 'undefined') {
          gtag('event', 'cta_click', {
            cta_text: btn.textContent.trim(),
            cta_location: document.querySelector('section').id || 'unknown'
          });
        }
      });
    });
  }

  // Initialize all features on DOM ready
  ready(() => {
    initMenu();
    setCurrentNav();
    initAnchorLinks();
    preloadCriticalImages();
    initEnquiryLinks();
    trackExternalLinks();
    initLazyLoad();
    trackCTAClicks();
  });

  // Expose global namespace for third-party integrations
  window.PotbellyAudio = {
    version: '1.0.0',
    ready: ready
  };

})();
