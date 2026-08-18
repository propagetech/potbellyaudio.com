/* ==========================================================================
   Potbelly Audio, rebuild v2
   Progressive enhancement only. Every feature here has a working no-JS state.
   ========================================================================== */

(function () {
  "use strict";

  /* ----------------------------------------------------------------------
     1. WhatsApp number
     ----------------------------------------------------------------------
     THE ONE SWITCH. Put the real WhatsApp Business number here in full
     international form, digits only, no plus and no spaces. Example for an
     Indian number: "919876543210".

     While it is empty:
       - every WhatsApp CTA stays as the prefilled mailto: fallback that is
         written into the HTML, so the site works and nothing is broken
       - the floating WhatsApp button does not render

     The moment a real number is set here:
       - every [data-wa] link becomes a wa.me link carrying its prefilled text
       - the floating button appears on every page

     House rule: a real WhatsApp-enabled number only. A landline does not
     qualify. Do not invent one. See docs/claims-register.md.
  ---------------------------------------------------------------------- */

  var WHATSAPP_NUMBER = "";

  function waHref(text) {
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);
  }

  function upgradeWhatsAppLinks() {
    if (!WHATSAPP_NUMBER) return;

    var links = document.querySelectorAll("[data-wa]");
    Array.prototype.forEach.call(links, function (link) {
      link.setAttribute("href", waHref(link.getAttribute("data-wa")));
      link.setAttribute("rel", "noopener noreferrer");
      link.setAttribute("target", "_blank");
    });

    if (document.querySelector(".wa-float")) return;

    var float = document.createElement("a");
    float.className = "wa-float";
    float.href = waHref(
      "Hi Potbelly Audio. I found you on potbellyaudio.com.\nSent from: WhatsApp button"
    );
    float.target = "_blank";
    float.rel = "noopener noreferrer";
    float.setAttribute("aria-label", "Chat with Potbelly Audio on WhatsApp");
    float.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.02h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 5.83 2.42 8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.16 0-.43.06-.65.31-.22.25-.85.84-.85 2.03 0 1.2.87 2.35.99 2.51.12.16 1.71 2.61 4.15 3.66.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z"/>' +
      "</svg>";
    document.body.appendChild(float);
  }

  /* ----------------------------------------------------------------------
     2. Mobile navigation
     With JS off the nav is a plain list of anchor links, always visible.
  ---------------------------------------------------------------------- */

  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("primary-nav");
    if (!toggle || !nav) return;

    function setOpen(open) {
      nav.setAttribute("data-open", open ? "true" : "false");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    }

    setOpen(false);

    toggle.addEventListener("click", function () {
      setOpen(nav.getAttribute("data-open") !== "true");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.tagName === "A") setOpen(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.getAttribute("data-open") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* ----------------------------------------------------------------------
     3. Video facades
     No YouTube request is made until the visitor asks for one. With JS off
     the facade is a plain link that opens the video on YouTube.
  ---------------------------------------------------------------------- */

  function initFacades() {
    var facades = document.querySelectorAll("[data-yt]");

    Array.prototype.forEach.call(facades, function (facade) {
      facade.addEventListener("click", function (event) {
        event.preventDefault();

        var id = facade.getAttribute("data-yt");
        var title = facade.getAttribute("data-yt-title") || "Video";

        var frame = document.createElement("iframe");
        frame.src =
          "https://www.youtube-nocookie.com/embed/" +
          id +
          "?autoplay=1&rel=0";
        frame.title = title;
        frame.allow =
          "accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture";
        frame.allowFullscreen = true;

        facade.parentNode.replaceChild(frame, facade);
        frame.focus();
      });
    });
  }

  /* ----------------------------------------------------------------------
     4. Current year in the footer
  ---------------------------------------------------------------------- */

  function initYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ----------------------------------------------------------------------
     5. Current section highlighting on the one-page home
     Marks the nav link for the section currently in view. Purely visual.
  ---------------------------------------------------------------------- */

  function initScrollSpy() {
    var links = document.querySelectorAll('#primary-nav a[href^="#"]');
    if (!links.length || !("IntersectionObserver" in window)) return;

    var map = {};
    Array.prototype.forEach.call(links, function (link) {
      var id = link.getAttribute("href").slice(1);
      var section = document.getElementById(id);
      if (section) map[id] = link;
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = map[entry.target.id];
          if (!link) return;
          if (entry.isIntersecting) {
            Array.prototype.forEach.call(links, function (other) {
              other.removeAttribute("aria-current");
            });
            link.setAttribute("aria-current", "true");
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    Object.keys(map).forEach(function (id) {
      observer.observe(document.getElementById(id));
    });
  }

  /* -------------------------------------------------------------------- */

  function init() {
    upgradeWhatsAppLinks();
    initNav();
    initFacades();
    initYear();
    initScrollSpy();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
