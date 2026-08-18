# Potbelly Audio, rebuild v2: roles, decisions and plan

**Date:** 2026-08-18
**Trigger:** the July 2026 rebuild does not match the client's expectations. She sent a full content
direction on 2026-08-18 (captured verbatim in [client-brief-2026-08-18.md](client-brief-2026-08-18.md)).
**Directional reference (not to be copied):** `/Users/chetan/Downloads/jeevitha/aurallabsound.com`
**Status:** plan approved for execution pending the answers in
[client-questions-2026-08-18.md](client-questions-2026-08-18.md).

---

## 0. The one-paragraph verdict

We built her a Japan and Korea anime dubbing agency. She runs a Mumbai localisation house that
takes content across Indian and international languages for production houses, OTT, animation,
agencies, brands and international rights holders. That is not a styling disagreement, it is a
positioning error at the root of the site, and it is why nothing above it lands. Rebuild v2 keeps
the engine (hand-built static, one CSS, one JS, self-hosted fonts, WCAG AA audited, schema) and
replaces the strategy, the information architecture, the art direction and every line of copy. The
new site is a single-page scroll in her section order, with two supporting pages that earn their
keep, work you can actually listen to as the centrepiece, and WhatsApp as the primary channel.

---

## 1. What went wrong, precisely

Diagnosis before prescription. The July build was competent and off-target, and the failure is
traceable to one step: Phase 0 research invented a market instead of reading the business.

| Dimension | July 2026 build | Her direction | Verdict |
|---|---|---|---|
| Positioning | "Tokyo, Seoul & Mumbai's Trusted Audio Partner" | "Mumbai-based audio and localisation company working across Indian and international languages" | Wrong at the root |
| Market | Japan and Korea primary, India secondary | India first, international as reach. Japan and Korea appear zero times | Wrong |
| Languages | Japanese and Korean primary | Hindi, English, Marathi, Bengali, Tamil, Telugu, Kannada, Malayalam, Gujarati, Punjabi, Urdu, and more | Wrong emphasis |
| Content types | anime, K-drama, OTT | films, series, documentaries, ads, corporate, e-learning, gaming, animation | Too narrow |
| Architecture | 6 pages behind a nav | 11 sections in one scroll | Restructure |
| Capabilities | 4 services | 9, including Casting, Dubbing Direction, QC and Built for Volume | Under-specified |
| Audience | 3 geographies | 8 named buyer segments | Missing |
| Contact | mailto starters only | WhatsApp first, plus quote and email, plus a floating button | Missing the channel she wants |
| Proof | 2 client logos, stock service photos | "Hear the difference", players, samples | Missing the centrepiece |
| Referral | none | a dedicated section | Missing |
| Tone | agency-generic | plain, declarative, "Sounds Good." | Rewrite |
| Founder | "an artist's ear", generic | Pooja Punjabi, a working dubbing artist with public feature credits | Best asset, unused |

Two things also need calling out because they are risk, not taste:

- **Unverified claims shipped.** The current OG description says "Award-winning". No award is on
  record anywhere in the archive or in public sources. Also on the live pages: "Founded in 2013",
  "13+ years", Japanese and Korean cultural expertise, and a "trusted by Tokyo and Seoul" framing.
  These must be removed or verified before v2 ships. House rule: only verifiable facts ship.
- **The site is down right now.** `https://www.potbellyaudio.com/` and the apex both return
  HTTP 522 through Cloudflare (checked 2026-08-18, origin unreachable behind a proxied record).
  Whatever the client has been looking at, the public has been getting an error page. This is
  independent of the redesign and needs fixing regardless.

**Root cause for the retro:** the Phase 0 research treated a plausible growth story (East Asian
content is a hot localisation market) as if it were the client's business. The archive of her old
site said, in her own words, "exclusively an Audio Agency specialized in localizing any kind of
content in Indian and international languages". The evidence was on disk and was overridden by
research. Fix for v2: **the client's own words outrank market research on positioning; research
informs keywords, structure, objections and proof, never the identity of the business.**

---

## 2. The role roster

Twenty-two roles, each with a mandate, a position on this brief, and something it owns in the plan.
Roles are how we split thinking, not how we split headcount; several collapse into one agent or one
pass in section 7.

### Strategy and content

| # | Role | Mandate | Its read on this brief | Owns |
|---|---|---|---|---|
| 1 | Client Partner | Hold her intent, resolve ambiguity, never let the build outrun her approvals | She gave us a scroll and a voice, not a wishlist. Most "decisions" here are already made, we just have to notice | The questions list, the approval gates |
| 2 | Brand Voice and Copy Chief | Match her register, refine without flattening | Short declarative sentences, no adjective stacking. "Sounds Good." stays | Every visible word |
| 3 | Localisation Domain Analyst | Know the actual craft: casting, direction, lip sync, M&E, QC rounds, deliverable specs | Her nine capabilities are a real workflow, not a service menu. Show it as a pipeline | Capability accuracy, workflow section |
| 4 | Competitive Intelligence | Scan the real competitive set and find the gap | Mumbai set is Sound & Vision, Subhash, Famous, Raghani, Vaibhav; national set is DUBnSUB, Cosmic, VerboLabs, Mayflower; enterprise set is Iyuno, VSI, ZOO, Keywords | The differentiation angle |
| 5 | Buyer and Persona Researcher | Turn 8 segments into what each needs to see | An OTT localisation manager and a brand marketing lead need different proof on the same page | Segment cards, objection list |
| 6 | SEO and Keyword Strategist | Rank for real intent | A one-pager narrows the ranking surface. Argue for it early, then live with the decision and mitigate | Keyword to section map, titles, schema |
| 7 | Conversion Strategist | One primary action, minimum friction | Eight distinct CTA labels in her draft, two actual channels. Consolidate destinations, keep her language | CTA taxonomy, enquiry starters |
| 8 | Fact and Claims Officer | Nothing unverifiable ships | "Three studios", "years of experience", the founder's credits, client logos: all need a source or a confirmation | The claims register |
| 9 | Copy Standards Editor | House invariants in text | British spelling ("localisation"), no em or en dashes, consistent capitalisation | The final read-through |

### Design

| # | Role | Mandate | Its read on this brief | Owns |
|---|---|---|---|---|
| 10 | Information Architect | Section order, URLs, anchors, nav | Her order is the IA. The only real question is what earns a URL of its own | The IA decision, anchor scheme, redirects |
| 11 | Art Director | A face that is hers and not a sibling's | Studio brand, warm gold logo. Dark control room, not the black minimalism of Aural Lab | Register, palette, signature element |
| 12 | Type Director | Pairing by register, self-hosted | Must differ from Fraunces plus Poppins (current) and from Playfair plus Quicksand (Aural Lab) | The pairing, the scale, Indic script fallbacks |
| 13 | Design Systems Engineer | Tokens, components, spacing rhythm | Two-surface system (dark canvas, light relief) doubles the contrast work. Token it properly | `css/main.css`, the token table |
| 14 | Motion and Interaction | Restraint, and `prefers-reduced-motion` | An audio brand invites gimmicks. Motion should serve the play affordance and nothing else | Transitions, scroll behaviour, player states |

### Build

| # | Role | Mandate | Its read on this brief | Owns |
|---|---|---|---|---|
| 15 | Front-end Engineer | Semantic static HTML, JS-off proof | One page means long DOM. Section landmarks and heading order matter more than usual | `index.html`, `js/main.js` |
| 16 | Media Engineer | Video and audio proof without third-party bloat | Seven real YouTube projects exist. Facade pattern, no YouTube JS until a click | The work engine, players, posters |
| 17 | Schema and Technical SEO | Valid JSON-LD, correct entity graph | One-pager needs `Organization` plus `Service` `ItemList` plus `VideoObject` per work item plus `FAQPage` | All JSON-LD, sitemap, canonicals |
| 18 | Accessibility Auditor | WCAG 2.1 AA, audited not eyeballed | Media and a floating button are the two risk areas: captions, focus order, and never covering a control | The contrast audit, keyboard pass |
| 19 | Performance Engineer | Fast on an Indian mobile connection | A media-heavy one-pager is the LCP risk. Facades, lazy loading, no CDN | LCP budget, image pipeline |
| 20 | QA and Responsive | Five viewports, real states | Language chips, player grids and the floating button are where 360px breaks | The QA pass, the bug list |

### Operations

| # | Role | Mandate | Its read on this brief | Owns |
|---|---|---|---|---|
| 21 | Go-live and Infra | Get it served, correctly, with redirects | The 522 has to be solved anyway. Cloudflare Pages gives us real 301s that GitHub Pages cannot | DNS, hosting, redirects, analytics |
| 22 | Red Team | Argue the opposite of whatever we just decided | One-pagers cap SEO. WhatsApp-only loses enterprise buyers. Dropping Japan and Korea may throw away real work | Every decision below survived it |

---

## 3. Where the roles disagreed, and what we decided

These are the six arguments worth recording. Each has a decision, a reason, and a reversal cost.

### Debate A: one page, or a page tree?

- **SEO Strategist:** a single page can hold one primary intent. "Dubbing studio in Mumbai",
  "voice over agency Mumbai", "OTT localisation India", "e-learning voice over India" and
  "game localisation India" are distinct commercial intents that want distinct pages. Collapsing
  to one URL forfeits most of that surface.
- **Client Partner and IA:** she wrote a scroll. Eleven sections, each ending in a CTA. Handing
  her a six-page tree again after she asked for this is how we got here.
- **Conversion:** for relationship-led B2B where the buyer arrives by referral, LinkedIn or a direct
  intro, one scroll converts better than a tree. She has a whole section devoted to referrals, which
  tells you how her pipeline actually works.
- **Red Team:** if organic search is a real acquisition channel, a one-pager is a strategy tax.
  Nobody has checked whether she gets any search traffic at all.

**Decision: a one-page home in her exact section order, plus exactly two supporting URLs.**
`/work/` (the full work archive, because "Listen to Our Work" needs a destination that a home
section cannot hold) and `/faq/` (objection handling, and the `FAQPage` schema surface). Everything
else is an anchor on the home page. Service landing pages are a **Phase 2 decision, taken with real
Search Console data after go-live**, not a guess now. Reversal cost: low, sections are already
anchored and can be promoted to pages with their content intact.

### Debate B: does Japan and Korea survive anywhere?

- **Red Team:** the July research came from somewhere. If she has genuine Japanese or Korean work,
  deleting it destroys real differentiation.
- **Fact Officer:** nothing in the archive, nothing in her brief, nothing in public sources supports
  it. It appears to have been extrapolated.

**Decision: remove Japan and Korea from positioning, headlines, meta, schema `areaServed` and copy.**
Ask her once whether any East Asian language work is real. If yes it becomes a line item in the
languages section, never the brand. Reversal cost: trivial.

### Debate C: dark like the reference, or keep the warm cream?

- **Art Director:** she pointed at Aural Lab, which is near-black, cinematic and work-forward. The
  register is right: a studio sells the room, and dark surfaces make video thumbnails and waveforms
  sing. But her logo is a warm gold potbelly figure and her voice is friendly, so pure black fights
  the brand, and a straight copy would make two ProPage sites look like one template.
- **Accessibility:** a two-surface system doubles the contrast matrix. Every token needs an on-dark
  and an on-light value, audited, not assumed.

**Decision: warm dark as the primary canvas (deep espresso charcoal, not black), brand gold as the
accent, with cream "listening room" light sections for the reading-heavy blocks (Who we work with,
Languages, FAQ).** Signature element: a level-meter rule that separates sections, and one consistent
play affordance across every work item. Explicitly not Aural Lab: different palette temperature,
different type, work grid instead of poster lightbox, chips instead of filters.

### Debate D: how many CTAs?

Her draft contains eight distinct labels: Discuss Your Project, WhatsApp Us, Get a Quote, Ask Us,
Talk to Pooja, Make an Introduction, Listen to Our Work, Have a Project? Let's Talk.

- **Conversion:** eight destinations is a maze. One primary action per page is the rule.
- **Client Partner:** her labels are contextual and good. "Ask Us" under languages and "Make an
  Introduction" under referrals are doing different jobs. Do not flatten them into one grey button.

**Decision: two channels, many intents.** Every CTA resolves to either WhatsApp (primary, prefilled
per section) or a prefilled email starter (secondary, with the qualifying checklist for that
intent). Keep her labels verbatim. Visual hierarchy separates them: one solid primary per section,
the rest as quiet secondaries. The prefilled WhatsApp text carries the section name, so she can
tell from the first message which part of the site the lead came from.

### Debate E: WhatsApp first, for enterprise buyers?

- **Red Team:** an OTT localisation manager or an international distributor procures over email with
  an NDA. A WhatsApp-only front door can read as small.
- **Buyer Researcher:** in the Indian media industry WhatsApp is the default professional channel,
  including at the enterprise level. And she asked for it.

**Decision: WhatsApp primary, email always visible and equal in the Contact section, plus a
floating WhatsApp button sitewide.** The quote starter is an email, because a scoped brief with a
checklist belongs in a mail thread. **This is blocked on a real WhatsApp Business number.** House
rule: no `wa.me` link without a real number, no landlines. Until it arrives, build the component and
keep it dormant behind a single config constant.

### Debate F: what proof can we actually publish?

- **Media Engineer:** seven real project videos survive in the archive (Mahindra Scorpio x2,
  Kidzania x4, Flynote). That is a real work section today.
- **Fact Officer:** they are five to six years old, and client logo usage needs permission. Also
  the strongest asset is not on the site at all: public sources credit Pooja Punjabi as a working
  dubbing artist with feature and series credits. Two independent public sources found, but a
  founder's credit list is exactly the kind of thing that must be confirmed by her before it ships.

**Decision: build the work engine now with the seven verified items, and design the language voice
reel component to stay dormant until she supplies audio.** Never present stock as project work.
Her personal credits get a dedicated, small, accurate block in the About section **only after she
confirms the list in writing.**

---

## 4. The resulting site

### Information architecture

```
/                       one page, her order, every section anchored
   #top                 hero: name, four-word promise, positioning line, 2 CTAs
   #what-we-do          9 capability cards, presented as one workflow
   #who-we-work-with    8 buyer segments, self-identification
   #new-market          the end-to-end band: "One team. One workflow."
   #languages           language chips, Indian and international, "Ask Us"
   #work                "Hear the difference": players, links to /work/
   #why-potbelly        6 reasons
   #lets-talk           the invitation: "Tell us what you're working on"
   #refer               referral ask
   #about               founder, story, "Talk to Pooja"
   #contact             WhatsApp, email, quote
/work/                  full archive: every project, filterable, players
/faq/                   buyer objections, FAQPage schema
/404.html               styled, root-absolute paths
(floating WhatsApp button on every page)
```

Retired URLs that are already indexed and must redirect: `/services/`, `/about/`, `/portfolio/`,
`/contact/`, `/faq/` (the last one keeps its own page, the rest go to their anchors).

### Art direction brief

- **Register:** studio control room, warm. Craft plus capacity, not corporate scale.
- **Palette source:** the real logo. Warm gold accent on a deep espresso charcoal canvas, cream
  light sections for reading, one bright on-dark gold token for accents on dark. Every pair audited.
- **Type:** heading `Sora` or `Bricolage Grotesque`, body `Manrope` or `Inter Tight`. Self-hosted
  woff2 latin from Fontsource. Must not be Fraunces plus Poppins (the current site) or Playfair plus
  Quicksand (Aural Lab). Verify the latin subset exists before committing to a pairing.
- **Signature element:** a level-meter rule between sections, and language chips that carry the
  native script as a second line (with `lang` attributes and a system-font fallback stack, since we
  are not shipping Indic webfonts).
- **Motion:** restrained. Reveal on scroll, the play affordance, nothing else. All gated by
  `prefers-reduced-motion`.
- **Imagery:** photos first. Studio and session photos when she sends them; until then, work
  thumbnails and type carry the page. No stock passed off as her studios.

### Copy rules

Her register, tightened. Short declarative sentences. No adjective stacking, no "award-winning", no
"world-class". British and Indian English ("localisation", "organisation"). No em or en dashes.
"Sounds Good." is the footer sign-off and stays exactly as she wrote it.

---

## 5. Research plan (Phase 0, before any code)

Research informs keywords, structure, objections and proof. It never decides who the business is.
That is the correction from v1 and it is the first line of the research brief.

1. **Competitor scan, 8 to 10 real sites.** Mumbai: Sound & Vision India, Subhash Studios, Famous
   Studios, Raghani Studios, Vaibhav Studios. National: DUBnSUB, Cosmic Sounds, VerboLabs, Mayflower.
   Enterprise benchmark: Iyuno, VSI, ZOO Digital, Keywords Studios. For each capture: positioning
   line, how languages are presented, whether work is playable on the site, trust signals, CTA model,
   whether turnaround or rates are published, and what they all omit.
2. **Buyer evaluation criteria.** What OTT, production and brand buyers actually check: crew roster
   and capacity, comparable technical credits, delivery specs (including Atmos and platform specs),
   lip sync and QC process, security and NDA handling, turnaround, language coverage, and in 2026,
   a stated position on AI dubbing. Each becomes either a proof point, an FAQ entry, or a question
   for her.
3. **Keyword clusters mapped to sections.** Every cluster maps to one anchor or one of the two
   supporting pages, recorded as a `keyword -> section -> where-used` table. Both spellings of
   "localisation" and "localization" appear naturally, because Indian buyers search both.
4. **Discovery channels beyond search.** Vitrina and similar industry marketplaces, Google Business
   Profile, the LinkedIn company page, the YouTube channel. These are real lead sources in this
   vertical and belong in the Phase 2 recommendations, not the site build.
5. **AI dubbing stance.** A live 2026 buyer question. We do not invent her answer, we ask for it.
6. **Reference scan for one-page studio sites** with audio and video proof, to inform the art
   direction without cloning any of them.
7. **Founder credit verification.** At least two independent public sources plus her written
   confirmation before a single credit is published.

Output: a rewritten `docs/redesign-decisions.md` that replaces the Japan and Korea strategy wholesale
and carries the competitor angle, the keyword map, the IA, the art direction brief and the claims
register.

---

## 6. Execution plan

| Phase | What happens | Gate to pass |
|---|---|---|
| 0 | Research and the rewritten decisions doc | Positioning matches her brief, zero invented facts |
| 1 | Copy pass, section by section, in her voice, plus the CTA and message matrix and the FAQ | Diff every section against the verbatim brief |
| 2 | Art direction, tokens, type, contrast locked by computed ratios | Palette locked before components |
| 3 | Build: one-page home, `/work/`, `/faq/`, 404, floating WhatsApp, schema | Works with JS off |
| 4 | Media: YouTube facades, posters, audio player, OG card, favicons from the real logo | No third-party request before a click |
| 5 | QA: contrast audit PASS, linkcheck clean, JSON-LD parses, 5 viewports, keyboard, subpath | All green, no exceptions |
| 6 | Client preview: link, the questions list, and an explicit list of what is dormant | She sees it before anything is public |
| 7 | Go-live: fix the 522, hosting, 301s for the retired URLs, analytics | Old URLs resolve, no 404s |

Sequencing note: phases 0 and 1 can start now. Phase 4 media and parts of phase 3 are **blocked on
her answers**, specifically the WhatsApp number and the work assets. Build those components dormant
rather than waiting, and flip them on when the assets land.

---

## 7. Skills and agents

### House skills, and where each is loaded

| Skill | Phase | Why |
|---|---|---|
| `site-rebuild` | 0 and 3 | The playbook and the non-negotiable invariants. Loads `_rebuild-kit/RESEARCH-STRATEGY.md` then `REBUILD-PROMPT.md` |
| `refactoring-ui` | 2 and 5 | Hierarchy, spacing, type scale, depth, the polish pass |
| `responsive-qa` | 5 | 360, 390, 768, 1024, 1440, plus interactive states |
| `golive` | 7 | Cloudflare Pages cutover, which also fixes the 522 and gives real 301s |
| `golive-expert-review` | 7 | Vet the cutover before touching live DNS |

No new skill is needed. This project is a standard house rebuild with an unusual IA, and the
invariants already cover it.

### Agents

Defined as project-scoped agents in `.claude/agents/`. Run at most three concurrently (the lesson
from `_rebuild-kit/FINISH-PLAN.md`: a ten-agent fan-out exhausted the session budget mid-run).

| Agent | Phase | Job | Runs concurrently with |
|---|---|---|---|
| `potbelly-research` | 0 | Competitor, buyer and keyword research, writes the research section of the decisions doc | copy, factcheck |
| `potbelly-copy` | 1 | Section-by-section copy in her voice, the CTA matrix, the FAQ | research, factcheck |
| `potbelly-factcheck` | 1 and 5 | The claims register: every factual assertion gets a source, a confirmation request, or deletion | research, copy |
| `potbelly-media` | 4 | Work archive curation, facades, posters, audio components | audit |
| `potbelly-audit` | 5 | Contrast, links, schema, keyboard, five viewports, JS-off, subpath | media |

The **build itself stays in the main session**, not in an agent. One long page with a shared token
system and byte-identical chrome across three pages is exactly the work that fragments badly when
split across parallel writers.

---

## 8. Risks and how each is handled

| Risk | Likelihood | Handling |
|---|---|---|
| WhatsApp number never arrives | Medium | Component built, dormant behind one constant, email carries the funnel meanwhile |
| No new work assets, the work section stays thin | High | Ship with the seven verified archive projects, engine ready for more |
| "Three studios" and similar claims cannot be verified | Medium | Claims register. Unverified claims do not ship, no exceptions |
| Client logo permission not granted | Medium | Names and logos held back, work items described generically until confirmed |
| One-pager underperforms in search | Medium | Anchored sections, two supporting pages, Search Console review at 90 days, promote sections to pages if the data says so |
| SEO loss from retiring five indexed URLs | High if unhandled | 301s to anchors, which is the main argument for moving to Cloudflare Pages |
| Media-heavy page hurts LCP | Medium | Facades, lazy loading, budget checked in phase 5 |
| The 522 persists after cutover | Low | Handled by the `golive` runbook, verified before DNS moves |
| We drift from her voice while "refining" | Medium | Every section diffed against the verbatim brief in phase 1 and again in phase 6 |

---

## 9. Open decisions that are hers, not ours

Full list with context in [client-questions-2026-08-18.md](client-questions-2026-08-18.md). The four
that actually block work:

1. **WhatsApp Business number.** Blocks the primary CTA channel and the floating button.
2. **Work assets and permissions.** Which projects can be shown, with which client names, plus any
   audio samples. Blocks the centrepiece section.
3. **The claims register.** Three studios, team size, years, and her personal credit list.
4. **Any real Japan or Korea work**, one question, to close out the v1 positioning cleanly.
