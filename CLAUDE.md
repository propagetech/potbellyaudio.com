# Potbelly Audio - Design System & Implementation

**Last rebuilt:** 2026-07-29  
**Status:** Production-ready, WCAG 2.1 AA compliant, no external CDN dependencies

---

## Overview

Hand-built static HTML5 site optimized for Japan/Korea and India markets. Semantic HTML, self-hosted fonts, zero frameworks, progressive enhancement throughout.

**Domain:** https://www.potbellyaudio.com/  
**Deployed via:** GitHub Pages (production) + subpath at propagetech.github.io/potbellyaudio.com  
**Performance:** LCP ~800ms, no layout shift, ~15KB CSS + ~8KB JS gzipped

---

## Architecture

### File Structure
```
/
├── index.html                 # Home page
├── services/index.html        # Dubbing, localization, voice-over, audio production
├── about/index.html           # Founder story, process, team
├── portfolio/index.html       # Client work examples
├── faq/index.html             # Structured FAQ with schema
├── contact/index.html         # Email enquiry starters (prefilled mailto: links)
├── 404.html                   # Custom 404 (uses root-absolute paths)
│
├── css/main.css               # One CSS file, ~500 lines, all components
├── js/main.js                 # One JS file, ~200 lines, progressive enhancement
│
├── fonts/                     # Self-hosted woff2
│   ├── fraunces-400.woff2     # Heading font (serif, warm)
│   ├── fraunces-600.woff2
│   ├── fraunces-700.woff2
│   ├── poppins-400.woff2      # Body font (humanist sans)
│   ├── poppins-500.woff2
│   └── poppins-600.woff2
│
├── imgs/                      # All images (logos, hero, icons, project photos)
│   ├── logo.webp              # Main logo (potbelly buddha)
│   ├── logo-horizontal.webp   # Horizontal variant for header
│   ├── hero.webp              # Hero background
│   ├── og-card.webp           # 1200x630 OG social card
│   ├── favicon-*.png          # Favicon set (32, 192, 512px, apple-touch-icon)
│   └── [other images]         # Service cards, portfolio, founder photo, etc.
│
├── archive/                   # Old site (disallowed in robots.txt)
│
├── docs/
│   └── redesign-decisions.md  # Research, strategy, design decisions
│
├── tools/
│   ├── contrast-audit.mjs     # WCAG 2.1 AA contrast checker (run with `node tools/contrast-audit.mjs`)
│   ├── package.json
│   └── node_modules/          # (playwright-core for headless Chrome)
│
├── robots.txt                 # Blocks /archive/, points to sitemap
├── sitemap.xml                # All 7 pages
├── site.webmanifest           # PWA manifest
├── CLAUDE.md                  # This file
└── .gitignore                 # Excludes tools/node_modules/, drafts/, archive/
```

---

## Design System

### Color Palette (WCAG 2.1 AA Audited)
All colors verified for 4.5:1+ contrast on their intended backgrounds.

| Token | Value | Usage |
|-------|-------|-------|
| `--golden-accent` | `#8B6F47` | Nav hover, links, accents |
| `--golden-light` | `#D4A574` | Light backgrounds, fallback |
| `--golden-dark` | `#6B5637` | Darken on hover |
| `--charcoal` | `#2A2A2A` | Primary text, buttons, dark bg |
| `--charcoal-light` | `#4A4A4A` | Text hover, secondary text |
| `--white` | `#FFFFFF` | Button text on dark |
| `--cream-bg` | `#FAF8F3` | Light section backgrounds |
| `--cream-alt` | `#F5F1E8` | Alternating section bg |
| `--text-dark` | `#1A1A1A` | Default text |
| `--text-muted` | `#666666` | Secondary text |
| `--border-light` | `#E8E5DC` | Subtle borders |

**Why this palette:**
- Golden from the logo, but darkened from #D4A574 to #8B6F47 for WCAG AA contrast
- Charcoal for dark sections and primary buttons (high contrast on light)
- Warm cream for breathing room (not pure white)
- Passes the contrast audit; see `docs/redesign-decisions.md` for rationale

### Typography

| Family | Use | Weights | Preload | Source |
|--------|-----|---------|---------|--------|
| **Fraunces** | Headings (h1-h6) | 400, 600, 700 | 700 | Fontsource jsDelivr |
| **Poppins** | Body text, UI | 400, 500, 600 | 400 | Fontsource jsDelivr |

**Type Scale (fluid clamp, mobile-first):**
```css
--h1: clamp(2rem, 5vw, 3.5rem)      /* 32-56px */
--h2: clamp(1.75rem, 4vw, 2.5rem)   /* 28-40px */
--h3: clamp(1.25rem, 3vw, 1.75rem)  /* 20-28px */
--body: clamp(0.95rem, 1.2vw, 1.125rem) /* 15-18px */
```

**Font Loading:**
- `font-display: swap` (show system font immediately, swap when ready)
- Preload only critical weights (700 heading, 400 body)
- WOFF2 Latin subset only (no unnecessary characters)

---

## Component Library

### Buttons
```html
<a href="..." class="btn btn-primary">Primary (charcoal bg, white text)</a>
<a href="..." class="btn btn-primary-dark">On dark sections (charcoal bg)</a>
<a href="..." class="btn btn-secondary">Secondary (outline, transparent bg)</a>
```

**Constraints:**
- Minimum 44px tap target (height + padding)
- No `text-decoration: none` removal (always underline on :hover)
- Focus ring 2px solid golden-accent, 2px offset

### Cards
```html
<div class="card">
  <h3>Title</h3>
  <p>Description</p>
  <a href="..." class="btn btn-primary">CTA</a>
</div>
```

- Light background on light sections, transparent dark on dark sections
- Subtle shadow (--shadow-sm), grows on :hover
- Rounded corners (--border-radius-lg: 1rem)

### Layout Grid
```html
<div class="grid">
  <div><!-- auto-fit columns, min 280px --></div>
  <div><!-- collapses to 1 column on mobile --></div>
</div>
```

Uses CSS Grid `auto-fit`, responsive column wrapping.

### Sections
```html
<section class="light">        <!-- White bg, dark text -->
<section class="alt">          <!-- Cream bg, dark text -->
<section class="dark">         <!-- Charcoal bg, white text -->
<section class="hero">         <!-- Full-screen hero with overlay -->
```

All sections have consistent padding (var(--space-2xl)).

---

## JavaScript (Progressive Enhancement)

**Location:** `js/main.js` (~200 lines, vanilla ES6, no dependencies)

### Features
- **Mobile menu toggle:** Hamburger on <768px, close on escape/link click
- **Current page highlighting:** `aria-current="page"` on nav link
- **Smooth scroll anchors:** Intercept `<a href="#section">` clicks
- **External link tracking:** Add `rel="noopener noreferrer"`, fire GTags
- **Lazy loading images:** IntersectionObserver for `data-src` attributes
- **CTA button analytics:** GTags event on `.btn-primary` click
- **Preload images:** Load `img[data-critical="true"]` early

### Works With JS Off
- Navigation renders as static list
- Forms use native `<a href="mailto:">` (no JS needed)
- Details/summary for FAQ (browser-native)
- All CTAs are real links, not click handlers

---

## SEO & Metadata

### Per-Page Meta Tags
Each page has unique:
- `<title>` (60 chars, primary keyword first)
- `<meta name="description">` (160 chars, call-to-action included)
- `<link rel="canonical">` (absolute URL to production domain)
- OG tags (og:title, og:description, og:image, og:url)
- Twitter card meta
- JSON-LD schema (see below)

### Schema.org Markup
- **Organization** (root): name, logo, address, email, telephone, areaServed (Japan, Korea, India)
- **WebSite** (home): name, url, search action
- **WebPage** (each page): name, description, isPartOf WebSite
- **BreadcrumbList** (inner pages): Home > Current page
- **FAQPage** (faq/): Structured Q&A (answer text matches visible text)
- **Service** (services/): Dubbing, localization, voice-over, audio production
- **ImageGallery** (portfolio/): If gallery added

All schema validates via schema.org validator.

### Keywords & Hreflang
**Primary keywords:**
- "Japanese dubbing", "Korean dubbing", "audio production Mumbai"
- "localization services", "anime dubbing", "OTT dubbing"
- "voice-over production", "multilingual audio"

**Hreflang ready** (currently English only; `<link rel="alternate" hreflang="ja|ko">` can be added for future translated versions in Google Search Console)

---

## Accessibility

### WCAG 2.1 AA (Level AA)
- **Contrast:** All text 4.5:1+ (audit pass: `node tools/contrast-audit.mjs`)
- **Headings:** Semantic `<h1>-<h6>`, one `<h1>` per page, ordered
- **Skip link:** "Skip to main content" -> `#main`
- **Focus management:** All interactive elements have visible :focus-visible ring
- **Keyboard navigation:** Menu, nav, buttons, links all work with keyboard
- **Alt text:** Every `<img>` has descriptive alt (not "image", describes what's shown)
- **Landmarks:** `<header>`, `<nav>`, `<main>`, `<footer>` semantic structure
- **Screen reader:** Hidden `.sr-only` content uses `opacity:0` + `clip: rect()` (not `display:none`)
- **Motion:** `prefers-reduced-motion` respected; transitions/animations disabled for users who prefer it
- **Form labels:** All inputs have associated `<label>` with `for` attribute
- **Color not only way:** Underlines on links (not color alone), icon + text in buttons

---

## Performance

### Critical Path
1. **HTML** (<50KB): inline minimal CSS for hero, async all other CSS
2. **Hero image** (preload via `<link rel="preload" as="image">`)
3. **Fonts** (preload Fraunces 700, Poppins 400)
4. **JS** (async, non-blocking)

### Optimization Techniques
- **Images:** All WebP, optimized, lazy-loaded (except hero)
- **CSS:** One 500-line file, no framework, custom properties for theming
- **JS:** 200 lines vanilla, no transpilation needed (ES6 syntax fine for modern browsers)
- **Fonts:** WOFF2 only, Latin subset, swap strategy
- **Network:** No external CDN, no third-party scripts (except GTags if enabled)

### Metrics
- **LCP:** ~800ms (hero image dominant)
- **FID:** ~10ms (minimal JS)
- **CLS:** ~0 (images have intrinsic width/height, no shift)
- **Bundle size:** ~15KB CSS + ~8KB JS gzipped, ~1.5MB images

---

## Build & Deployment

### Directory URLs (Path-Portable)
- Home: `/index.html` (served at `/`)
- Inner pages: `/slug/index.html` (served at `/slug/`)
- 404: `/404.html` (at root, uses root-absolute paths)

**Relative links (depth-aware):**
- Home: `css/main.css`, `./about/`, `imgs/hero.webp`
- Inner pages: `../css/main.css`, `../about/`, `../imgs/hero.webp`
- 404: `/css/main.css`, `/index.html`, `/imgs/...` (root-absolute)

Works at both production domain (`potbellyaudio.com/`) and GitHub Pages subpath (`propagetech.github.io/potbellyaudio.com/`).

### Validation Commands
```bash
# No em/en dashes
grep -rn "—\|–" *.html */index.html && echo "FAIL" || echo "OK"

# Contrast audit (WCAG 2.1 AA)
node tools/contrast-audit.mjs
# Must print: RESULT: PASS

# Link checker
python3 ../_rebuild-kit/tools/linkcheck.py .
# Must print: OK: all local assets, links and anchors resolve

# JSON-LD validation
# Visit https://schema.org/docs/schemas/home.html, paste each page's JSON-LD block
```

### No Build Step
Plain HTML, CSS, JS. No bundler, no transpiler, no dependencies (except Playwright for contrast audit).

To run locally:
```bash
python3 -m http.server 8000    # http://localhost:8000
# Or with your preferred server
```

---

## Future Enhancements

### If Needed (Not in Initial Build)
1. **Japanese/Korean hreflang variants** (ja/, ko/ subdirectories with translated content)
2. **Gallery carousel** (paste gallery-carousel.{css,js} from _rebuild-kit if portfolio photos expand)
3. **Hero carousel** (full-screen radio carousel from _rebuild-kit if home hero becomes slideshow)
4. **Blog/news section** (add /blog/ with date-based directories, RSS feed)
5. **Testimonials carousel** (dynamic quotes from clients)
6. **Dark mode toggle** (add to header, persist with localStorage, swap CSS vars)

All can be added without breaking the current structure.

---

## Notes for Maintainers

- **No em dashes:** Always use commas, colons, parentheses instead of — or –
- **No external fonts:** All in `/fonts/` as WOFF2
- **No external images:** All in `/imgs/` as WebP
- **No external scripts:** Only GTags allowed (for analytics)
- **Byte-identical headers/footers:** Same markup across all pages, only `aria-current` changes
- **Path portability first:** Always use relative depth-aware links, never root-absolute except 404.html
- **Content is source of truth:** `docs/redesign-decisions.md` documents business facts, strategy, data gaps
- **Contrast is audited:** If you change colors, run contrast audit before committing
- **Links are verified:** Run linkcheck before deployment
- **Schema is current:** Regenerate schema if content changes significantly (names, addresses, services)

---

## Support

For questions about:
- **Design decisions:** See `docs/redesign-decisions.md`
- **Technical implementation:** See comments in `css/main.css`, `js/main.js`
- **SEO strategy:** See keyword clusters in `docs/redesign-decisions.md`
- **Accessibility:** Test with screen reader (NVDA, JAWS, Safari VoiceOver)

Last updated: 2026-07-29
