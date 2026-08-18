# Potbelly Audio rebuild v2: master prompt

**How to use this file:** open a fresh Claude Code session in
`/Users/chetan/Downloads/jeevitha/potbellyaudio.com` and paste everything below the line. It is
self-contained. It assumes no memory of the July 2026 build.

---

You are rebuilding the Potbelly Audio website. A previous rebuild (July 2026) shipped with the wrong
positioning and the client has told us it does not match her expectations. She has since sent a full
content direction. Your job is to rebuild the site around her direction, to the ProPage house
standard, without repeating the mistake that caused this.

## 1. Read these first, in this order

1. `docs/client-brief-2026-08-18.md` - her verbatim content direction. **This is the content spine
   and the source of truth for positioning, section order, capabilities, audiences and voice.**
2. `docs/rebuild-v2-plan.md` - the roles, the debates and the decisions already taken. Do not
   relitigate the decisions in section 3 of that file. If you believe one is wrong, say so in your
   report and proceed with it.
3. `/Users/chetan/Downloads/jeevitha/_rebuild-kit/RESEARCH-STRATEGY.md` - research and art direction.
4. `/Users/chetan/Downloads/jeevitha/_rebuild-kit/REBUILD-PROMPT.md` - the build standard, which is
   the definition of done.
5. `archive/index-old.html` - the only source of verified historical business facts.
6. Load the `site-rebuild` skill, and `refactoring-ui` for any CSS or visual work.

Directional reference, for register only: `/Users/chetan/Downloads/jeevitha/aurallabsound.com`.
The client pointed at it to communicate "one scroll, dark, work-forward, contact by message".
**Do not copy its palette, type, layout or components.** Two ProPage sites must never read as one
template. Aural Lab is near-black with Playfair Display and Quicksand, a poster lightbox and a
filter sidebar. Potbelly is warm dark with a grotesk pairing, a work grid, language chips and a
level-meter rule.

## 2. The correction that matters most

The July build positioned Potbelly as "Tokyo, Seoul & Mumbai's Trusted Audio Partner", a Japanese
and Korean anime dubbing specialist. Her brief contains no Japan, no Korea and no anime. Her old
site describes the business, in her own words, as "exclusively an Audio Agency specialized in
localizing any kind of content in Indian and international languages". The evidence was on disk and
research overrode it.

**Rule for this build: the client's own words outrank market research on positioning. Research
informs keywords, structure, objections and proof. It never decides who the business is.**

Delete every trace of the Japan and Korea framing: headlines, meta descriptions, keywords, schema
`areaServed`, FAQ entries, image alt text and the old decisions doc.

## 3. Non-negotiables

House invariants, from the kit, in full force:

- Hand-built static HTML5. One `css/main.css`, one `js/main.js`. No framework, no build step, no CDN.
  The site must work with JavaScript disabled.
- Self-hosted woff2 fonts, latin subset, from Fontsource jsDelivr. `font-display: swap`, preload the
  two critical weights.
- Directory URLs, path-portable relative links (home `css/...`, inner `../css/...`, `404.html`
  root-absolute). Canonical, OG, sitemap and JSON-LD `@id` stay absolute on `https://www.potbellyaudio.com/`.
- WCAG 2.1 AA, audited by computation, never by eye. `node tools/contrast-audit.mjs` must print
  `RESULT: PASS`. `.sr-only` keeps `opacity: 0`.
- Real logo as an `<img>` in header and footer. Favicons extracted from the logo emblem with
  `tools/make-favicons.mjs`. Never hand-draw an icon, never synthesise a wordmark.
- Valid schema.org JSON-LD. FAQ answer text must match the visible answer text exactly.
- **No em dashes and no en dashes anywhere.** Her draft contains some. Convert them to commas,
  colons or parentheses during the copy pass.
- Photos first. Never present stock as her work, her studios or her team.
- Do not commit and do not push. The owner approves go-live.

Specific to this build:

- **British and Indian English.** She writes "Localisation". Match her everywhere in visible copy.
  The American spelling may appear once in the meta description and once naturally in body copy,
  because Indian buyers search both.
- **Her voice.** Short declarative sentences. No adjective stacking, no "award-winning", no
  "world-class", no "cutting-edge". The benchmark line is hers: "Multiple rounds of QC. Because
  small mistakes don't stay small in finished content." "Sounds Good." is the footer sign-off and
  ships exactly as written.
- **Nothing unverifiable ships.** Maintain a claims register in `docs/redesign-decisions.md`: every
  factual assertion gets a source (the archive, a public source, or her written confirmation) or it
  does not appear. The current site's "Award-winning" claim has no source and must not survive.

## 4. Architecture

```
/                    one page, her section order, every section anchored and landmarked
/work/               the full work archive, playable
/faq/                buyer objections, FAQPage schema
/404.html            styled, root-absolute paths
```

Everything else from her brief is an anchor on the home page. Do not create a page tree. Do not
create per-service pages: that decision is deferred to Phase 2 with real Search Console data.

Home anchors, in her order, all lowercase kebab ids:
`#top`, `#what-we-do`, `#who-we-work-with`, `#new-market`, `#languages`, `#work`, `#why-potbelly`,
`#lets-talk`, `#refer`, `#about`, `#contact`.

**Corrected 2026-08-18.** An earlier version of this list dropped her LET'S TALK section and put
About before Refer. Her order is WHY POTBELLY, LET'S TALK, REFER POTBELLY, ABOUT POTBELLY, CONTACT.
Her order wins. `docs/copy-v2.md` sections 0.2 and 0.3 carry the same correction.

Header nav on the home page is anchor links, not page links, and it must degrade correctly on
`/work/` and `/faq/` (where the same labels point back at `../#anchor`). Keep the header, footer and
floating button byte-identical across all pages except `aria-current` and the depth of asset paths.

Retired URLs that are already indexed and must be handled at go-live: `/services/`, `/about/`,
`/portfolio/`, `/contact/`. Each 301s to its home anchor. `/faq/` keeps its URL.

## 5. Section-by-section specification

For every section: her copy is the spine, refined not rewritten. Diff your output against
`docs/client-brief-2026-08-18.md` when you finish each one.

### 5.1 Hero, `#top`

- H1 carries the company and the promise. Her four-word line "Dubbing. Voiceovers. Translation.
  Localisation." is the strongest thing in the brief. Use it as the H1 or immediately under it, not
  buried.
- The positioning line ships close to verbatim: "Potbelly Audio is a Mumbai-based audio and
  localisation company working across Indian and international languages."
- Two CTAs: `Discuss Your Project` (primary) and `WhatsApp Us` (secondary).
- No stock hero photo of a generic mixing desk. Either a real studio photo when she supplies one, or
  a type-led hero on the dark canvas with the level-meter motif. A stock desk is what the old site
  did and it says nothing.
- This is the LCP. Whatever is here gets preloaded and sized.

### 5.2 What we do, `#what-we-do`

Nine capabilities, her text, her order: Dubbing, Voiceovers, Translation & Localisation, Casting,
Dubbing Direction, Recording & Mixing, Audio Post-Production, Quality Control, Built for Volume.

Present them as **one workflow, not nine unrelated services**. Her point is that the whole chain
happens under one roof, and the last two cards (QC, Built for Volume) are capability proof, not
services. A three-column grid where the first seven read as pipeline stages and the last two are
visually distinct as proof works. Section CTA: `Have a Project? Let's Talk`.

Concept icons, if used, come from The Noun Project per the kit procedure (CC BY 3.0 or public
domain, one family, self-hosted, recoloured to brand tokens). Do not add decorative illustrations.

### 5.3 Who we work with, `#who-we-work-with`

Eight segments, her text: Production Houses, OTT & Streaming, Animation Studios, Advertising &
Creative Agencies, International Content Owners / Distributors / Syndicators, Brands & Corporate
Teams, E-learning & Digital Content, Gaming & Interactive Content.

This is a qualifier: the visitor should find their own row in under five seconds. Light surface,
scannable, no icons competing with the labels. Each card is a self-identification, so the segment
name is the loudest thing in it.

### 5.4 Taking content to a new market, `#new-market`

A full-width band on the dark canvas. Her copy: "From translation and casting to dubbing, direction,
recording, mixing and QC, Potbelly handles the localisation process from start to finish. One team.
One workflow." Three CTAs as she wrote them. This is the section that closes an international
distributor, so it gets weight.

### 5.5 Languages, `#languages`

- Language chips: Hindi, English, Marathi, Bengali, Tamil, Telugu, Kannada, Malayalam, Gujarati,
  Punjabi, Urdu, and more.
- **Signature element:** each chip shows the English name as the primary label and the native script
  as a smaller second line, with a correct `lang` attribute on the native text (`lang="hi"`,
  `lang="mr"`, `lang="bn"`, `lang="ta"`, `lang="te"`, `lang="kn"`, `lang="ml"`, `lang="gu"`,
  `lang="pa"`, `lang="ur"`, and `dir="rtl"` on the Urdu text). Use a system font fallback stack for
  the Indic and Arabic scripts. We are not shipping Indic webfonts, so the English label must carry
  the meaning on its own if a script does not render.
- "Don't see your language?" with an `Ask Us` CTA whose prefilled message asks which language.
- Do not invent a language count and do not list international languages she has not named.

### 5.6 Hear the difference, `#work`

**This is the centre of the page.** Her words: "Our work speaks for itself."

- Seven verified projects exist in the archive with live YouTube links: Mahindra Scorpio (Badshah),
  Mahindra Scorpio (Dhakad), What is Kidzania (Gujarati), What is Kidzania (Hindi), What is Kidzania
  (Marathi), Kidzania (Imagine), Flynote (Women's Day Special). The thumbnails are already in
  `imgs/`. Verify each link still resolves before shipping it.
- **Facade pattern, mandatory.** Render a poster image plus a play affordance. Load the YouTube
  iframe only on click. No third-party request before the visitor asks for one, which keeps the
  "no third-party tracking" claim true and keeps the LCP clean.
- Build an **audio sample component** for voice reels per language, and keep it dormant until she
  supplies audio files. Dormant means the CSS and JS exist and no empty section renders.
- Home shows a curated six. `Listen to Our Work` goes to `/work/`, which holds everything and is
  filterable by language and content type.
- Client names on work items only once permission is confirmed. Until then, describe the work
  without naming the brand.

### 5.7 Why Potbelly, `#why-potbelly`

Her six reasons, her headings: Experience, The Right People, Scale, One Point of Contact, We Get the
Original, Quality Matters.

Two of these carry unverified specifics. "Three studios" and "years of hands-on experience" go into
the claims register. If she has not confirmed them by build time, ship the reason without the number
("the studio capacity and talent network to take on high-volume projects") and flag it. Never
convert an unconfirmed number into a rounded one.

### 5.8 Let's talk, `#lets-talk`

Her section, and it was missing from the earlier version of this spec. Her copy: "Have a project in
mind? Tell us what you're working on. We'll tell you how we can help." Three CTAs: `WhatsApp Us`,
`Get a Quote`, `Discuss a Project`.

It sits between Why Potbelly and Refer, and it is not a duplicate of `#contact`: this one is the
invitation, `#contact` is the routing. Keep both, and keep them visually different so the page does
not read as if it is asking twice.

### 5.9 Refer Potbelly, `#refer`

Her section, kept. Referral is how her pipeline works. CTA `Make an Introduction`, whose prefilled
message is written for the referrer, not the buyer, and makes the introduction easy to forward.

### 5.10 About, `#about`

Her copy: "Built around good audio. Built to make content travel." Founded by Pooja Punjabi, grown
from an audio production company into a localisation partner. Based in Mumbai. CTA `Talk to Pooja`.

Verified from the archive and usable now: Mumbai based, founded 2013, founder Pooja Punjabi, a
professional voice-over and dubbing artist in the industry since 2009.

Public sources also credit her with significant feature and series dubbing work. **Do not publish
any specific credit until she confirms it in writing.** When confirmed, it belongs here as a short
factual line, because a founder who is a working dubbing artist is the single strongest trust signal
this business has and the July build wasted it.

### 5.11 Contact, `#contact`

Three routes as she listed them: `WhatsApp Us`, `Email Us`, `Get a Quote`. Email
`work@potbellyaudio.com` is verified. Location Mumbai. Do not publish a street address or phone
number unless she confirms one: the archive has "Oshiwara, Mumbai" and a map pin, nothing more.

### 5.12 Footer

Potbelly Audio. "Dubbing, Voiceovers, Translation, Localisation, Audio Production". Mumbai, India.
Social links: Instagram, LinkedIn, YouTube, Facebook. Verify each URL resolves; the archive has
Facebook, Twitter and Instagram only, so LinkedIn and YouTube URLs must come from her. Sign-off:
"Sounds Good."

## 6. The CTA system

Her brief uses eight labels. **Keep every label. Resolve them to two channels.**

| Her label | Channel | Prefilled intent |
|---|---|---|
| Discuss Your Project | WhatsApp | project type, languages, volume |
| WhatsApp Us | WhatsApp | open |
| Have a Project? Let's Talk | WhatsApp | project type |
| Get a Quote | Email starter | the full qualifying checklist |
| Ask Us | WhatsApp | which language |
| Talk to Pooja | WhatsApp | asks for Pooja by name |
| Make an Introduction | Email starter | written for a referrer to forward |
| Listen to Our Work | Internal link to `/work/` | not a contact CTA |

Rules:

- Every WhatsApp link carries a prefilled message naming the section it came from, so she can tell
  from the first message which part of the site produced the lead.
- Email starters are prefilled `mailto:` links per the kit: tailored subject, and a body that is a
  checklist of the qualifying details (content type, source and target languages, runtime or
  episode count, deadline, deliverable spec, budget range). URL-encode subject and body, write `&`
  as `&amp;` in the attribute.
- One visually dominant primary per section. Everything else is a quiet secondary.
- **The WhatsApp number is a hard dependency.** House rule: no `wa.me` link without a real
  WhatsApp-enabled number. If it has not arrived, put the number in one constant at the top of
  `js/main.js` and one place in the HTML, keep every WhatsApp CTA falling back to the email starter,
  hide the floating button, and list this in the report as the top blocker. Do not invent a number
  and do not use a landline.

## 7. The floating WhatsApp button

She asked for this explicitly, so get the details right:

- Fixed bottom right, at least 56px, real `<a href="https://wa.me/...">` so it works with JS off.
- Never overlaps a control. Check it against the audio and video players, the mobile nav when open,
  and the footer CTAs at 360px. Add bottom padding to the last section so it never sits on top of
  the final CTA.
- Accessible name that says what it does ("Chat with Potbelly Audio on WhatsApp"), visible focus
  ring, and it is reachable in a sensible tab order (end of the page, not trapping the top).
- `prefers-reduced-motion` disables any entrance animation. No auto-opening bubble, no tooltip that
  covers content, no notification dot implying an unread message.
- Hidden in print styles. Excluded from the contrast audit only if genuinely hidden, never by
  lowering real text contrast.

## 8. Schema

- `Organization` as the single source of truth (`@id` `https://www.potbellyaudio.com/#organization`):
  name, url, logo, email, `address` with `addressLocality` Mumbai, `sameAs` for the verified socials.
  **Remove** the Japan and Korea `areaServed` and the placeholder `telephone` value. `areaServed`
  becomes India plus international only if that is defensible, otherwise omit it.
- `WebSite` plus `WebPage` on the home page.
- `Service` `ItemList` covering the nine capabilities, described in her words.
- `VideoObject` for each work item that has a real video, with the real thumbnail and URL.
- `FAQPage` on `/faq/`, answer text matching the visible text exactly.
- `BreadcrumbList` on `/work/` and `/faq/`.

## 9. Data gaps: what to do while blocked

Build every blocked component dormant rather than waiting. A dormant component has its CSS and JS in
place and renders nothing (no empty section, no placeholder box, no "coming soon").

| Blocked on | Component | Behaviour until it arrives |
|---|---|---|
| WhatsApp Business number | Floating button, every WhatsApp CTA | Falls back to the email starter, button hidden |
| Audio samples | Voice reel player | Dormant |
| New project assets and permissions | Work grid beyond the seven | Ships with the seven verified items |
| Client logo permission | Named brands on work items | Work described without naming the brand |
| Studio and team photos | Hero, About | Type-led hero, no invented photos |
| "Three studios", team size, years | Why Potbelly numbers | Claim ships without the number, flagged |
| Founder credits | About | Not published until confirmed in writing |
| LinkedIn and YouTube URLs | Footer socials | Only verified links ship |

Record all of these in `docs/redesign-decisions.md` under "needs owner input" so they survive into
the next session.

## 10. Validation, all must pass before you declare done

```bash
grep -rn "—\|–" *.html */index.html css js && echo "FAIL dash" || echo "OK no em/en dash"
python3 -m http.server 8123 &
node tools/contrast-audit.mjs                  # MUST print RESULT: PASS
python3 ../_rebuild-kit/tools/linkcheck.py .   # all assets, links and anchors resolve
```

Plus:

- JSON-LD parses on every page, and the FAQ schema text matches the visible text.
- One `<h1>` per page, ordered headings, every `<img>` has meaningful alt.
- The site renders and every CTA works with JavaScript disabled.
- Subpath check: serve the parent directory, load `/potbellyaudio.com/` in headless Chrome, assert
  zero failed asset requests. This catches root-absolute leaks.
- Every anchor in the header nav resolves, from all three pages.
- Run the `responsive-qa` skill: 360, 390, 768, 1024 and 1440, and specifically check the language
  chips, the work grid, the mobile nav when open, and the floating button.
- No external host appears in any new file except the YouTube URLs behind the click-to-load facade.
- Every work item link returns 200.
- Claims register complete: no assertion without a source or a pending-confirmation flag.

## 11. Deliverables

- `index.html` (the one-page home), `work/index.html`, `faq/index.html`, `404.html`.
- `css/main.css`, `js/main.js`, `fonts/`, curated `imgs/`, favicon and OG set generated from the real
  logo, `robots.txt`, `sitemap.xml`, `site.webmanifest`.
- `docs/redesign-decisions.md`, **rewritten**, not amended. The existing file documents the Japan and
  Korea strategy and is now actively misleading. It must carry: the corrected positioning, the
  competitor angle, the keyword to section map, the IA, the art direction brief, the claims register
  and the needs-owner-input list.
- `CLAUDE.md`, rewritten for the new architecture, including the design-skills section from
  `../_rebuild-kit/snippets/CLAUDE-design-skills.md`.
- The stale `css/main-*.css` and `js/main-*.js` files at the repo root are leftovers from the
  scraped builder site and are already duplicated in `archive/`. Remove them from the root.
- Do not commit. Do not push.

## 12. Report format

Finish with:

1. What was built, section by section, against her brief.
2. Validation results, verbatim (contrast, linkcheck, JSON-LD, responsive, JS-off, subpath).
3. The claims register: what shipped with a source, what shipped flagged, what was withheld.
4. The blocker list, ordered by what unblocks the most work.
5. Anything in her brief you could not honour, and why.
