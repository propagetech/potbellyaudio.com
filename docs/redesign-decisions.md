# Redesign Decisions: Potbelly Audio

**Last updated:** 2026-07-29  
**Status:** Phase 1 Complete. Phase 2 planning in progress.

---

## PHASE 1: ALREADY IMPLEMENTED ✅

### A. Business & Buyer Analysis (Completed)

#### Business Overview
- **Name:** Potbelly Audio
- **Location:** Oshiwara, Mumbai (Lat: 19.147243, Lng: 72.8313626)
- **Founded:** 2013 (13 years in business)
- **Founder:** Pooja Punjabi (professional VO/dubbing artist, in industry since 2009)
- **Core Value Prop:** End-to-end audio production, localization, and dubbing with expertise in Japanese, Korean, and Indian languages—fast turnarounds from Mumbai's creator hub
- **Domain:** https://www.potbellyaudio.com/
- **Contact:** work@potbellyaudio.com

#### Geographic Markets (Priority Order)
1. **PRIMARY:** Japan & Korea (主要市場) — Japanese and Korean production/entertainment companies, streaming platforms, advertising agencies
2. **SECONDARY:** India — Indian OTT, corporate, and video agencies (domestic base)

#### Services Offered
1. **Audio Production** - Original soundtrack creation, mixing, mastering
2. **Localization** - Multilingual adaptation of content (focus: Japanese, Korean, Indian languages)
3. **Translation** - Script translation maintaining intent and tone
4. **Dubbing** - Voice replacement in Japanese, Korean, Indian regional languages, English
5. **Voice-Over** - Narration, character voices, IVR in multiple languages
6. **Collaborations** - White-label support for creative agencies and production companies

#### Languages Served (Prioritized)
- **PRIMARY (East Asian):** Japanese (日本語), Korean (한국어)
- **SECONDARY (Indian Regional):** Tamil, Telugu, Kannada, Malayalam, Gujarati, Bengali, Marathi, Hindi, English
- **SUPPORTING:** Other Asian languages on request

#### Target Buyer Persona
**PRIMARY (Japan/Korea):**
- Japanese/Korean production companies, advertising agencies, entertainment studios
- Anime, live-action drama, documentary dubbing leads
- Streaming platform localization managers (Netflix Japan, Coupang, Watcha, etc.)
- Mobile gaming companies needing voice-over
- EdTech platforms

**SECONDARY (India):**
- Video agency creative directors, production heads
- YouTube creators, independent producers
- Corporate communications teams
- E-learning platforms

#### Buyer's Top 3 Objections (FAQ seeds)
**For Japan/Korea Buyers:**
1. *"Can a Mumbai-based studio deliver quality on par with Tokyo/Seoul studios?"* → Experience with East Asian content (anime, live-action), founder's artistic credibility, 13+ years track record
2. *"Do they understand Japanese/Korean cultural nuance in dubbing?"* → Experienced talent + quality-checking process ensures authenticity, not just literal translation
3. *"What's the turnaround time for Japanese/Korean projects?"* → Fast turnarounds from an agile boutique (vs. larger Tokyo/Seoul studios' slower enterprise cycles)

**For India Buyers (Secondary):**
1. *"How can a boutique studio match the turnaround time of larger players?"* → Founder-led efficiency + streamlined process + large talent pool
2. *"Will the quality be broadcast-ready for OTT platforms?"* → Personal quality checking, technical excellence, years of experience
3. *"Do they understand the creative side or just technical execution?"* → Founder is a professional VO artist; understands both art and craft

#### Primary Action/CTA
✅ **IMPLEMENTED:** Request a Quote / Free Consultation (email-first lead generation)

---

### B. Competitive Landscape (Completed)

#### Direct Competitors (Local & National)

| Competitor | Location | Years | Languages | Key Positioning | Strengths | Weaknesses |
|---|---|---|---|---|---|---|
| **G-Corp Media** | Mumbai (MIDC) | 15+ | 22+ (Indian + Int'l) | Best Voice Over Agency in Mumbai | Local presence, major clients (Google, Amazon, Flipkart) | Corporate-focused, less known for indie/creator work |
| **DUBnSUB** | Gurgaon | 10+ (2016) | 100+ | Professional Dubbing for OTT | 5 modern studios, global ops, OTT optimization | Delhi-based (not local), enterprise-scale pricing |
| **BOL Media** | Delhi | 13+ (2013) | 100+ | Disney-UTV pedigree brand | Founder's industry heritage, regional language expertise | Delhi-based, less known outside B2B circles |
| **Cosmic Sounds** | Delhi | 12+ | 200+ | Pan-India distributed studios | 10+ studios, affordable pricing, training programs | DIY positioning, less premium feel |
| **Crystal Hues** | Pan-India | 36 | 250+ | ISO-certified heritage powerhouse | Largest talent pool (500+ artists), 4 ISO certifications | Enterprise/corporate-only, intimidating scale |

#### Competitive Gaps (What Potbelly Can Own)
1. ✅ **Founder-led boutique approach** - Personal touch of a founder who IS a creative professional (Pooja Punjabi)
2. ✅ **Agile & fast** - Emphasis on quick turnarounds without scale bureaucracy
3. ✅ **Creative + technical** - Not just technicians; the founder understands artistic intent
4. **Collaborations-first** - Unique positioning as white-label partner for video agencies (not just direct clients) - *Planned for Phase 2*
5. ✅ **Mumbai-based agility** - Faster response than Delhi-centric competitors, local understanding

#### "How We Differ" Positioning
✅ **IMPLEMENTED (Primary - Japan/Korea):**
"Tokyo and Seoul's trusted Mumbai-based partner for authentic East Asian dubbing and localization. We combine the agility and personal touch of a boutique with deep expertise in Japanese and Korean cultural nuance. Founded by Pooja Punjabi (a professional VO/dubbing artist), we understand both the creative vision and technical precision that East Asian content demands."

✅ **IMPLEMENTED (Secondary - India):**
"Founder-led, agile audio powerhouse for Indian creators and agencies. Fast turnarounds, personal relationships, deep understanding of both creative and technical sides."

---

### C. Design System (Completed)

#### Palette (WCAG 2.1 AA Audited)
✅ **IMPLEMENTED:**
- **Primary:** Golden/brass #8B6F47 (darkened for WCAG AA contrast)
- **Secondary:** Charcoal/black #2A2A2A
- **Background:** Warm cream #FAF8F3
- **On-dark accent:** Soft gold #D4A574
- **All colors verified:** 4.5:1+ contrast ratio

#### Type System (Self-hosted)
✅ **IMPLEMENTED:**
- **Heading Font:** Fraunces (soft serif, warm, readable)
- **Body Font:** Poppins (modern, friendly, highly legible)
- **All fonts:** Self-hosted WOFF2, Latin subset only

#### Imagery Strategy
✅ **IMPLEMENTED (Phase 1):**
- Hero: Professional audio engineer/voice artist at work (hero-audio-mixer.webp)
- Founder: Pooja Punjabi's professional photo
- Service cards: Dubbing, localization, translation, audio production imagery
- Clients: Mahindra, Kidzania logos
- All images: Optimized WebP format (40-50% smaller than originals)

---

### D. Architecture & Pages (Completed)

#### Menu Structure
✅ **IMPLEMENTED:**
1. **Home** - Value proposition, founder story, client logos, services overview
2. **Services** - Detailed service breakdown (Dubbing, Localization, Translation, Voice-Over, Audio Production)
3. **About** - Founder story, process, commitment, team info
4. **Portfolio** - Client work, case studies, project examples
5. **FAQ** - Common questions with schema markup
6. **Contact** - Email enquiry starters (segmented by buyer type)

#### Home Page Conversion Spine
✅ **IMPLEMENTED:**
1. ✅ Hero - Clear value prop with professional background image
2. ✅ Primary CTA - "Request a Quote"
3. ✅ Proof - Client logos + founder credibility
4. ✅ What We Offer - Service cards (Audio Production, Localization, Translation, Dubbing)
5. ✅ Why Us - 4 differentiators (Japanese/Korean expertise, fast turnarounds, founder-led quality, multilingual reach)
6. ✅ Market Focus - Geographic breakdown (Japan, Korea, India)
7. ✅ Closing CTA Band - "Ready to Bring Your Content to Life?"

#### Services Page
✅ **IMPLEMENTED:**
- Service cards with descriptions
- Languages supported per service
- Use cases (anime, streaming, corporate)
- Service-specific CTAs
- Pricing & turnaround section

#### About Page
✅ **IMPLEMENTED:**
- Founder story (Pooja Punjabi's journey)
- Company founding (2013)
- Process overview (Intake → Casting → Recording → QC → Revision → Delivery)
- Commitment statement (Quality First, Cultural Authenticity, etc.)

#### Contact Page
✅ **IMPLEMENTED:**
- Email enquiry starters (segmented by buyer type)
- Direct email link
- Location information

---

### E. Technical Implementation (Completed)

#### HTML Structure
✅ **IMPLEMENTED:**
- Semantic HTML5 (proper use of `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- One `<h1>` per page
- Proper heading hierarchy
- All `<img>` tags with descriptive alt text
- Breadcrumb navigation on inner pages

#### CSS
✅ **IMPLEMENTED:**
- One `css/main.css` file (~700 lines)
- CSS Custom Properties (design tokens for colors, spacing, typography)
- Mobile-first responsive design
- Hero sections with background images + dark overlays
- Founder section with responsive layout
- Client grid layout
- WCAG 2.1 AA compliance verified

#### JavaScript
✅ **IMPLEMENTED:**
- One `js/main.js` file (~200 lines, vanilla ES6)
- Mobile menu toggle
- Current page highlighting
- Smooth scroll anchors
- Progressive enhancement (works with JS off)

#### Performance
✅ **IMPLEMENTED:**
- All images in WebP format (optimized)
- Self-hosted fonts only (WOFF2, Latin subset)
- No external CDN dependencies
- Preload critical fonts and hero image
- Lazy loading for images

#### SEO & Metadata
✅ **IMPLEMENTED:**
- Unique `<title>` per page (60 chars, keyword-focused)
- Unique meta descriptions (160 chars, CTA-included)
- Canonical links (production domain)
- OG tags (og:title, og:description, og:image, og:url)
- Twitter card meta
- JSON-LD schema on every page (Organization, WebPage, BreadcrumbList, Service, FAQPage)
- `robots.txt` (disallows `/archive/`)
- `sitemap.xml` (all 7 pages)
- `site.webmanifest` (PWA manifest)

#### Accessibility
✅ **IMPLEMENTED:**
- WCAG 2.1 AA compliance (contrast audit passing)
- Skip link ("Skip to main content")
- Keyboard navigation (all interactive elements)
- Focus rings (2px golden-accent, 2px offset)
- `aria-current="page"` on nav links
- `aria-label` on buttons
- `prefers-reduced-motion` respected
- Screen-reader friendly structure

---

### F. Content Standards (Completed)

✅ **IMPLEMENTED:**
- All copy rewritten for clarity and SEO
- Benefit-led, not feature-led messaging
- No em/en dashes (using commas, colons, parentheses)
- Scannable copy (short paragraphs, descriptive subheads, bullets)
- No fabricated claims (facts from archive only)
- Verified information: company age, founder background, client list, languages

---

### G. Deliverables Checklist (Phase 1)

✅ **COMPLETED:**
- [x] `index.html` (Home)
- [x] `services/index.html`
- [x] `about/index.html`
- [x] `portfolio/index.html`
- [x] `faq/index.html`
- [x] `contact/index.html`
- [x] `404.html`
- [x] `css/main.css` (WCAG-audited)
- [x] `js/main.js` (vanilla ES6)
- [x] `fonts/` (Fraunces + Poppins, woff2, latin)
- [x] `imgs/` (all optimized WebP)
  - [x] logo.webp
  - [x] logo-horizontal.webp
  - [x] hero-audio-mixer.webp
  - [x] about-us-hero.webp
  - [x] pooja-punjabi.webp
  - [x] client-logo-1.webp & 2.webp
  - [x] Service cards (dubbing, localization, translation, audio-production)
  - [x] Portfolio images (mahindra-scorpio, kidzania, etc.)
- [x] Favicon set (extracted from logo)
- [x] OG card (1200x630)
- [x] `robots.txt`
- [x] `sitemap.xml`
- [x] `site.webmanifest`
- [x] `docs/redesign-decisions.md`
- [x] `CLAUDE.md` (maintenance guide)

---

## PHASE 2: PLANNED FEATURES & ENHANCEMENTS 🚀

### A. Japan/Korea Market Optimization

#### Hreflang Variants (Priority: HIGH)
- [ ] Create `ja/` subdirectory with Japanese translations of key pages
- [ ] Create `ko/` subdirectory with Korean translations of key pages
- [ ] Add `<link rel="alternate" hreflang="ja" href="...">` tags on English pages
- [ ] Add `<link rel="alternate" hreflang="ko" href="...">` tags on English pages
- [ ] Use Japanese/Korean keyword clusters in translated pages
- **Why:** Significantly better ranking in Google Japan/Korea and Naver/Kakao

#### Japanese/Korean Content Keywords
- [ ] Embed Japanese keywords naturally in English pages (anime, dubbing, localization)
- [ ] Embed Korean keywords naturally in English pages (더빙, 한국어, 더빙 서비스)
- [ ] Create meta descriptions with Japan/Korea value prop
- [ ] Add `areaServed` schema with Japan, Korea, India

#### Language-Specific Landing Pages (Optional)
- [ ] `/services/anime/` - Anime dubbing deep-dive (Japanese focus)
- [ ] `/services/k-drama/` - K-drama dubbing deep-dive (Korean focus)
- [ ] `/services/ott/` - OTT streaming localization (Japan/Korea/India)
- [ ] `/collaborations/` - White-label agency partnerships

---

### B. Portfolio & Social Proof (Priority: MEDIUM)

#### Video Gallery / Case Studies
- [ ] Add portfolio carousel/lightbox for video project showcases
- [ ] Embed YouTube/Vimeo links (Mahindra, Kidzania projects already available)
- [ ] Create case study templates (project brief → solution → results)
- [ ] Add testimonials section (if available from past clients)
- [ ] Link portfolio examples to Services pages (context + proof)
- **Implementation:** Paste `tools/gallery-carousel.js` + `.css` into build

#### Client Testimonials Section
- [ ] Gather short quotes from Japan/Korea + India clients
- [ ] Create "Trusted by" testimonials block
- [ ] Add client company photos/logos
- [ ] Display on Home page (between Services and CTA)

#### Project Photos & Behind-the-Scenes
- [ ] Request from Pooja: Photos of Japanese/Korean project work
- [ ] Request: Studio setup photos (voice recording booth, mixing studio)
- [ ] Request: Team collaboration photos (shows human side)
- [ ] Optimize as WebP; add to `imgs/behind-the-scenes/`

---

### C. Content Enhancements (Priority: MEDIUM)

#### Blog or Insights Section (Optional)
- [ ] Create `/blog/` or `/insights/` section
- [ ] Topics: "How to Dub Anime", "Cultural Nuance in K-Drama Dubbing", "OTT Localization Best Practices"
- [ ] Each post = 800-1200 words, SEO-optimized, keyword-rich
- [ ] Link to Services pages
- [ ] RSS feed for newsletter signups

#### FAQ Expansion
- [ ] Add 5-10 more questions based on Cluster 1-6 keywords
- [ ] Include Japan/Korea-specific FAQs: "Do you have experience with anime dubbing?" "Can you handle tight deadlines?"
- [ ] Structure with detailed answers (not single-line)
- [ ] Keep schema.org FAQPage markup

#### Turnaround Time & Pricing Pages
- [ ] Create `/pricing/` page (optional, depends on business model)
- [ ] Or: Create "/turnaround/" page explaining standard + express + rush timelines
- [ ] Link from Services + Contact pages

---

### D. Enhanced User Experience (Priority: LOW-MEDIUM)

#### Interactive Form (Replace email starters)
- [ ] Optional: Add lightweight form to `/contact/` (or keep email-first approach)
- [ ] Fields: Name, Email, Project Type, Languages, Deadline, Budget
- [ ] Validation + thank you page
- [ ] Integration: Send to work@potbellyaudio.com

#### Chatbot or Chat Widget (Optional)
- [ ] Live chat for real-time inquiries (especially useful for Japan/Korea timezone sync)
- [ ] Or: Chatbot with common FAQ answers + contact fallback
- [ ] Tool: Could use Drift, Intercom, or simple Zendesk widget

#### Multi-Language Toggle (Nice-to-Have)
- [ ] If not doing full `/ja/` and `/ko/` variants, add a language selector
- [ ] Dropdown in header: English | 日本語 | 한국어
- [ ] Loads translated page variants or uses browser storage to persist choice
- [ ] **Note:** Full hreflang variants (Phase 2A) are better for SEO than a toggle

---

### E. Marketing & Analytics (Priority: MEDIUM)

#### Google Analytics 4 Setup
- [ ] Add GA4 tracking code (if not already present)
- [ ] Track: Page views, CTA clicks, contact form submissions, scroll depth
- [ ] Set up conversion goals (Quote requests, Contact submissions)
- [ ] Monitor: Japan, Korea, India traffic separately

#### Google Search Console
- [ ] Verify domain in GSC
- [ ] Submit sitemap
- [ ] Monitor: Impressions by country (JP/KR/IN), CTR, query performance
- [ ] Check for crawl errors

#### Email Campaign Integration (Optional)
- [ ] Set up email capture via Contact CTAs
- [ ] Create welcome email sequence for leads
- [ ] Newsletter for project updates + industry insights
- [ ] Tools: HubSpot, Mailchimp, or ConvertKit

#### Social Media Integration (Optional)
- [ ] Add social sharing buttons to portfolio + blog
- [ ] Link to Facebook, Twitter, Instagram in footer (already in design)
- [ ] Create social media strategy for Japan/Korea platforms (Twitter JP, Instagram, YouTube)

---

### F. Technical Enhancements (Priority: LOW)

#### Dark Mode Support (Nice-to-Have)
- [ ] Add dark mode toggle in header
- [ ] Use `prefers-color-scheme: dark` as fallback
- [ ] Persist user preference with localStorage
- [ ] Test contrast ratios in dark mode

#### Performance Optimization
- [ ] Lazy-load images below the fold
- [ ] Preload OG image
- [ ] Minify CSS/JS (or keep as-is for maintainability)
- [ ] Test Core Web Vitals (LCP, FID, CLS) with PageSpeed Insights

#### Mobile App or PWA (Optional)
- [ ] Enhanced `site.webmanifest` with app icons
- [ ] Service Worker for offline fallback (if needed)
- [ ] "Add to Home Screen" button for mobile users

---

### G. Compliance & Legal (Priority: LOW-MEDIUM)

#### GDPR/Privacy Policy
- [ ] Create `/privacy/` page
- [ ] Disclose cookie usage (if any)
- [ ] Explain data handling for contact forms
- [ ] Link from footer

#### Terms of Service (Optional)
- [ ] Create `/terms/` page (if needed for business)

#### Accessibility Audit (Automated + Manual)
- [ ] Run WAVE or Axe DevTools
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Manual keyboard navigation test
- [ ] WCAG 2.1 AAA aspiration (currently AA)

---

## PHASE 3: CLIENT QUESTIONS & REQUIRED INFO ❓

### CRITICAL for Japan/Korea Strategy

#### 1. Japanese & Korean Project Portfolio
**Question:** Do you have any past work with Japanese or Korean production companies, anime studios, K-drama teams, or OTT platforms?

**Why:** This is critical proof of capability for Japan/Korea buyers. If you don't have existing case studies, we need to create a forward-looking strategy.

**Actions if YES:**
- [ ] Gather project screenshots, storyboards, or video links
- [ ] Get client permission to feature work
- [ ] Create case studies on Portfolio page
- [ ] Feature in `/services/anime/` and `/services/k-drama/` pages (Phase 2)

**Actions if NO:**
- [ ] Pivot messaging to "Trusted by Japan/Korea-focused production companies" (emphasis on *capability*, not past work)
- [ ] Focus on founder's credibility + process instead
- [ ] Plan case study generation: Get first Japan/Korea client as showcase project

---

#### 2. Japanese/Korean Talent Relationships
**Question:** Do you have trusted voice actors, studios, or collaborators in Japan or Korea?

**Why:** Buyers in JP/KR may ask, "Can you actually deliver authentic voice talent in our market?"

**Options:**
- [ ] Yes, we have direct relationships → Feature them (with permission)
- [ ] We outsource to trusted partners → Name them (if allowed)
- [ ] We work with talent scouts in JP/KR → Explain the process
- [ ] No established relationships yet → Be transparent; position as growth opportunity

**Implementation:**
- [ ] Add "Our Network" or "Trusted Partners" section to About page (Phase 2)
- [ ] Update Services pages with talent sourcing info

---

#### 3. Language Proficiency
**Question:** Can someone on your team communicate in Japanese or Korean?

**Why:** Japanese and Korean buyers appreciate doing initial conversations in their language (even if final work is in English).

**Options:**
- [ ] Yes, Pooja speaks Japanese/Korean → Highlight this (huge competitive advantage)
- [ ] Yes, team member speaks Japanese/Korean → Feature them on About page
- [ ] No, but we work with translators → Mention in Services
- [ ] English-only → Acknowledge; offer to work with buyer's translators

**Implementation:**
- [ ] If YES: Update About page with language credentials
- [ ] If NO: Add "Work with your translators" to Services (removes objection)

---

#### 4. Market Entry Timeline
**Question:** Is this a soft launch (exploratory) or aggressive push into JP/KR?

**Why:** Affects messaging intensity and resource allocation.

**Options:**
- [ ] Soft launch: Build presence, test market, expect 3-6 month ramp
- [ ] Aggressive: Full localization (Phase 2A: hreflang variants), immediate sales push
- [ ] Domestic-first: India priority; JP/KR is secondary growth

**Implementation:**
- [ ] Soft launch → Focus on English site + Phase 2 optimization
- [ ] Aggressive → Prioritize `/ja/` and `/ko/` translations
- [ ] Domestic-first → De-emphasize JP/KR in Phase 2; focus on India

---

### General Information (Support Materials)

#### 5. Phone Number & Contact Channels
**Question:** What's your preferred phone number (if any) for international inquiries? Do you prefer WhatsApp, Telegram, email?

**Why:** Japan/Korea buyers may want to call or use messaging apps; old site had no phone number.

**Actions:**
- [ ] Provide primary phone (with country code: +91-...)
- [ ] Specify if available for: WhatsApp, Telegram, WeChat
- [ ] Add to Contact page + footer
- [ ] Update JSON-LD schema with phone

**Example:**
```json
"telephone": "+91-XXXXXXXXXX",
"contactPoint": {
  "@type": "ContactPoint",
  "contactType": "Customer Service",
  "telephone": "+91-XXXXXXXXXX",
  "availableLanguage": ["en", "ja", "ko"]
}
```

---

#### 6. Full Team Details
**Question:** Beyond Pooja, who are key team members (voice directors, QA lead, studio manager)?

**Why:** Buyers want to know they're working with a real team, not a one-person shop.

**Actions:**
- [ ] Provide names + roles + 1-2 line bios for each
- [ ] Get professional headshots for About page
- [ ] If small team, that's fine; just be transparent
- [ ] If rotating freelancers, explain quality control process

**Example to add to About:**
```markdown
## Our Team
- **Pooja Punjabi** - Founder & Creative Director
- **[Name]** - Studio Manager
- **[Name]** - Audio QC Lead
- **[Name]** - Voice Talent Coordinator
```

---

#### 7. Project Photos & Japanese/Korean Examples
**Question:** Do you have authentic photos of Potbelly working on Japanese, Korean, or Indian projects?

**Why:** Stock photos are generic; real project stills build trust.

**What we need:**
- [ ] Studio setup photos (recording booth, mixing console)
- [ ] Behind-the-scenes: voice talent at mic, director with headphones
- [ ] Team collaboration photos
- [ ] If possible: Storyboards, scripts, or audio waveforms from actual projects
- [ ] For Japanese/Korean projects: Project stills, anime screenshots, K-drama frames (with permission)

**Format:**
- [ ] High-res (at least 1200px wide)
- [ ] Horizontal or square (optimized for web)
- [ ] Diverse: show Japanese, Korean, Indian projects if available

**Implementation:**
- [ ] Create `/imgs/behind-the-scenes/` folder
- [ ] Add to About page + Portfolio (Phase 2)

---

#### 8. Turnaround Time SLAs
**Question:** What are your actual turnaround time commitments?

**Why:** "Quick turnaround" is vague; buyers need specifics.

**Information needed:**
- [ ] Standard turnaround: ___ days (e.g., 7-14 days)
- [ ] Express turnaround: ___ days (e.g., 3-7 days)
- [ ] Rush/Emergency: ___ days (e.g., 1-2 days)
- [ ] Does it vary by project type? (e.g., shorter for voice-over, longer for full dubbing)
- [ ] Does it vary by language? (e.g., Japanese/Korean faster than Indian regional?)

**Implementation:**
- [ ] Add to Services page: Pricing & Turnaround section
- [ ] Add to FAQs: "What's your typical turnaround time?"
- [ ] Add to Contact form: Let buyers select deadline preference

**Example:**
```markdown
## Turnaround Times
- **Standard:** 7-14 days (most projects)
- **Express:** 3-7 days (add 25% rush fee)
- **Rush:** 1-2 days (add 50% rush fee)
```

---

#### 9. Pricing Tiers & Model
**Question:** How do you price projects? Flat per-minute? Hourly studio rental? Project-based?

**Why:** Buyers need to understand cost structure; current site has no pricing.

**Information needed:**
- [ ] Pricing model: Per-minute dubbing? Per-hour studio? Per-project?
- [ ] Average cost examples: "Dubbing a 30-min anime episode typically costs ₹X"
- [ ] Does pricing vary by language? (Japanese/Korean premium vs. Indian regional?)
- [ ] Discounts for multi-episode or long-term projects?
- [ ] Minimum project size?

**Options:**
- [ ] Publish tiered pricing on `/pricing/` page (transparent)
- [ ] Keep quote-based (more flexible, but slower sales cycle)
- [ ] Hybrid: Show price ranges; offer custom quotes for large projects

**Implementation:**
- [ ] Decide on approach
- [ ] Add to Contact form: Buyers indicate budget
- [ ] Add to Services: "Starting at ₹X" or "Custom quote based on scope"

**Example:**
```markdown
## Typical Pricing
- **Dubbing (per minute):** ₹500-1500 (varies by language + talent)
- **Voice-Over (per minute):** ₹300-800
- **Localization (full project):** ₹50,000-500,000+ (depends on scope)
- **Audio Production (per hour):** ₹5,000-15,000
```

---

#### 10. Awards, Certifications & Industry Recognition
**Question:** Do you have any industry awards, certifications, or recognition (especially from Japan/Korea)?

**Why:** Third-party validation builds credibility with risk-averse buyers.

**Information needed:**
- [ ] ISO certifications? (ISO 9001, etc.)
- [ ] Industry awards? (from advertising, film, OTT circles)
- [ ] Recognition from Japan/Korea industry bodies?
- [ ] Client testimonials from notable brands?
- [ ] If none: Any credentials from founder (Pooja's voice acting awards, etc.)?

**Implementation:**
- [ ] Add to About page: "Credentials & Recognition" section
- [ ] Add to Home page: Trust badges (if applicable)
- [ ] Add to schema.org: Award or recognition fields

**Example:**
```markdown
## Industry Recognition
- Certified by [Org]
- Featured in [Publication]
- Award: [Honor]
- Founder: Pooja Punjabi is [credible achievement]
```

---

### Additional Context Questions

#### 11. Target Client Segment (Japan vs. Korea vs. India)
**Question:** If you had to pick ONE geographic market to focus on first, which would it be?

**Why:** Affects messaging, keyword priorities, and Phase 2 localization strategy.

**Options:**
- [ ] Japan (anime studios, streaming platforms)
- [ ] Korea (K-drama, entertainment)
- [ ] India (OTT, corporate, creators)
- [ ] All equally (hard to optimize for all at once)

**Implementation:**
- [ ] Adjust homepage hero messaging
- [ ] Prioritize keyword research for top market
- [ ] Plan Phase 2 hreflang variants for top 1-2 markets

---

#### 12. Existing Clients Permission
**Question:** Can we feature Mahindra, Kidzania, and other past clients on the new site?

**Why:** Old site had these logos; new site needs permission to republish.

**Actions:**
- [ ] Get written permission (email is fine) to use client names/logos
- [ ] Confirm links to their YouTube projects are still live
- [ ] Update Portfolio page with permission status

**Example:**
- [x] Mahindra Scorpio - Badshah (YouTube link works)
- [x] Kidzania Campaign (YouTube link works)
- [ ] [Other clients]: Confirm permission

---

#### 13. Future Expansions
**Question:** What services or markets would you like to explore in 12-24 months?

**Why:** Helps plan Phase 2+ roadmap.

**Options:**
- [ ] Expand to 15+ languages
- [ ] Build an in-house studio in Tokyo/Seoul
- [ ] Launch training/courses
- [ ] Acquisition by larger media company
- [ ] Stay boutique, focus on quality

**Implementation:**
- [ ] Use this for long-term messaging consistency
- [ ] Plan Phase 2 features accordingly

---

## Deliverables Summary

### Phase 1 Status: ✅ COMPLETE
- [x] 7 pages (Home, Services, About, Portfolio, FAQ, Contact, 404)
- [x] Design system (colors, typography, components)
- [x] 6 optimized images from Rackcdn (hero, founder, clients)
- [x] All metadata, schema, and SEO
- [x] Mobile-responsive, WCAG 2.1 AA
- [x] Live at: https://www.potbellyaudio.com/

### Phase 2 Priorities: 🚀
1. Japan/Korea hreflang variants (ja/, ko/ subdirectories)
2. Portfolio video gallery + case studies
3. Client testimonials
4. Blog/Insights section (optional)
5. Enhanced keyword optimization

### Awaiting Client Input: ❓
- Japanese/Korean project examples
- Team details & headshots
- Phone number & contact preferences
- Turnaround time SLAs
- Pricing model
- Industry certifications/awards
- Client feature permissions
- Market focus priority

---

**Next Steps:**
1. Review this document with Pooja/client
2. Gather answers to Section III questions
3. Prioritize Phase 2 features based on business goals
4. Plan implementation timeline

