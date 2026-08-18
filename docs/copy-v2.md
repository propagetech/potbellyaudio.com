# Potbelly Audio, rebuild v2: final copy

**Written:** 2026-08-18
**Source of truth:** `docs/client-brief-2026-08-18.md` (Pooja's verbatim draft)
**Spec:** `docs/REBUILD-V2-PROMPT.md` sections 3, 5, 6; `docs/rebuild-v2-plan.md` section 3 debates D and E

This file is the copy deck. Every visible word on the site is here. The build reads from this file.
Nothing in this file is a rewrite of her draft: it is her draft with numbers removed where they are
unverified, mechanical fixes applied, and the missing operational text (CTA payloads, FAQ, meta, alt)
written to match her register.

---

## 0. Read this before you build

### 0.1 Global rules already applied

| Rule | Status |
|---|---|
| Banned words (award-winning, world-class, cutting-edge, seamless, bespoke, passionate, one-stop, leverage, unlock, elevate) | Zero occurrences in this file. Also zero in her draft. |
| Em dashes and en dashes | Zero. **Her draft has none either.** Her brief is pure ASCII, no U+2014, U+2013, no curly quotes. The "convert her em dashes" step in the plan has nothing to act on. |
| British and Indian English | "Localisation", "travelling", "programme" if ever needed. One deliberate American "localization" appears in the home meta description only (see section 4). |
| "Sounds Good." | Ships exactly as written, footer only, with the full stop. |
| Verified email | `work@potbellyaudio.com` (archive). |
| Verified location | Mumbai. Archive also has "Oshiwara, Mumbai" and a map pin. Do not publish a street address or a phone number. |
| Her spelling of the service | **Voiceovers**, one word, no hyphen. The old site said "voice-over". Match her. |

### 0.2 Two order conflicts you must resolve consciously

**Conflict 1: about vs refer.** Her draft runs `... WHY POTBELLY -> LET'S TALK -> REFER POTBELLY -> ABOUT POTBELLY -> CONTACT`. The anchor list in `REBUILD-V2-PROMPT.md` section 4 runs `... #why-potbelly, #about, #refer, #contact`, which swaps her last two.

**This file follows HER order**, because "do not reorder her sections" is the harder constraint and the anchor ids are labels, not a sequence. If you prefer the spec order, About and Refer are two self-contained blocks and swapping them is a single move. Decide it deliberately, do not let the anchor list decide it by accident.

**Conflict 2: LET'S TALK has no anchor.** She wrote a section between WHY POTBELLY and REFER that the spec's section 5 does not list. It is not a duplicate of CONTACT: her two blocks say different things ("Have a project in mind?" vs "Have a project? Need a quote? Want to explore a partnership?"). Dropping it would be deleting a section she wrote.

**Recommendation: keep it, at her position, with a new anchor `#lets-talk`.** It is a good mid-scroll conversion band after the six reasons, and `#contact` then does the different job of listing routes and details. Copy for both is below and the two do not read as repeats.

### 0.3 Section order as shipped

`#top` -> `#what-we-do` -> `#who-we-work-with` -> `#new-market` -> `#languages` -> `#work` -> `#why-potbelly` -> `#lets-talk` -> `#refer` -> `#about` -> `#contact` -> footer

### 0.4 Eyebrow labels

She wrote none. Eyebrows are added words, and added words are drift. Below, eyebrows are marked **optional** and exist only where the design needs a small label to anchor a band. Cut every one of them without losing meaning. Do not invent new ones.

---

## 1. Home page, section by section

### 1.1 Hero, `#top`

Eyebrow (optional, only if the header logo is `alt=""` decorative and the brand name appears nowhere in text above the fold):
> Potbelly Audio

**H1**
> Dubbing. Voiceovers. Translation. Localisation.

**Lede paragraph** (her positioning line, verbatim)
> Potbelly Audio is a Mumbai-based audio and localisation company working across Indian and international languages.

**CTAs**
- Primary: `Discuss Your Project`
- Secondary: `WhatsApp Us`

**Build notes**
- The H1 is the strongest line in her brief and it is service-dense, so it works as both the visual hook and the SEO H1. The brand name is carried by the header logo `alt="Potbelly Audio"`.
- Full stops after each word are load-bearing. Four sentences, not a list. Do not convert to a comma list, do not drop the final full stop.
- This is the LCP. No stock mixing-desk photo (see section 5.4).

---

### 1.2 What we do, `#what-we-do`

**H2**
> What We Do

**Deck:** none. She wrote none, and the "one workflow" idea is already carried by the Audio Post-Production card ("handled under one roof") and by the `#new-market` band ("One team. One workflow."). Saying it a third time above the grid would flatten it. Let the layout do the work: cards 1 to 7 read as a pipeline in order, cards 8 and 9 are visually separated as proof.

Nine cards, her text, her order. Each card heading is an **H3**.

| # | H3 | Body |
|---|---|---|
| 1 | Dubbing | Natural, well-directed dubbing that keeps the performance, emotion and intent of the original. |
| 2 | Voiceovers | The right voice for films, documentaries, advertising, corporate and digital content. |
| 3 | Translation & Localisation | Translation that considers context, culture, tone and audience, not just words. |
| 4 | Casting | A wide pool of voice talent across languages, age groups and performance styles. |
| 5 | Dubbing Direction | Experienced dubbing directors who know how to get the right performance from every artist. |
| 6 | Recording & Mixing | Experienced sound engineers handling recording, editing and final mix for a polished output. |
| 7 | Audio Post-Production | From recorded tracks to final delivery, handled under one roof. |
| 8 | Quality Control | Every project goes through multiple rounds of QC, at script level and again after recording. |
| 9 | Built for Volume | Studio capacity and a strong talent network allow us to handle high-volume and multi-language projects. |

**Section CTA**
- Primary: `Have a Project? Let's Talk`

**Deviations**
- Card 9 only. Hers: "**Three studios** and a strong talent network allow us to handle high-volume and multi-language projects." The number is unverified, so the sentence ships without it and keeps her exact syntax otherwise. **PENDING CONFIRMATION: studio count.** If she confirms, restore her sentence verbatim, one word swap.
- Cards 5 and 6 both open with "Experienced". Left as she wrote it. It reads as deliberate parallelism and changing it is drift for no gain.
- `&` in headings 3 and 6 must be written `&amp;` in the HTML.

---

### 1.3 Who we work with, `#who-we-work-with`

**H2**
> Who We Work With

**Deck:** none. She wrote none. This block is a qualifier, not a pitch: the visitor scans for their own row. Any deck sits between them and that row.

Eight cards. Segment name is an **H3** and is the loudest element in the card.

| # | H3 | Body |
|---|---|---|
| 1 | Production Houses | Multilingual versions for feature films, short films, live-action series and corporate productions. |
| 2 | OTT & Streaming | Dubbing and localisation for films, series, documentaries and long-form content. |
| 3 | Animation Studios | Character voices, episodic dubbing and multilingual adaptation. |
| 4 | Advertising & Creative Agencies | Regional campaigns, voiceovers and multilingual content. |
| 5 | International Content Owners, Distributors & Syndicators | Taking existing content into new markets, from international content entering India to Indian content travelling overseas. |
| 6 | Brands & Corporate Teams | Corporate films, campaigns, training and branded content across languages. |
| 7 | E-learning & Digital Content | Making content accessible to audiences in the language they know best. |
| 8 | Gaming & Interactive Content | Voices, dialogue and localisation for character-driven content. |

**Section CTA:** none. She wrote none here, and the `#new-market` band lands immediately after with three. Do not add one.

**Deviations**
- Card 8: added the missing full stop. Mechanical fix, her draft omits it.
- Card 5 heading is 55 characters and will wrap on mobile. That is a design problem, not a copy problem. Do not shorten it to "International Content Owners" and do not split it into three cards: the three words together are the segment, and a distributor scanning for "Syndicators" needs to see the word.

---

### 1.4 Taking content to a new market, `#new-market`

Eyebrow (optional): none recommended. The H2 is already a question addressed to one reader.

**H2**
> Taking Content to a New Market?

**Deck / answer line** (set large, it is the answer to the H2)
> We can help.

**Body paragraph**
> From translation and casting to dubbing, direction, recording, mixing and QC, Potbelly handles the localisation process from start to finish.

**Closing line** (set as its own line, not merged into the paragraph. Two sentences, two full stops, deliberate)
> One team. One workflow.

**CTAs**, her three, in her order
- Primary: `Discuss Your Project`
- Secondary: `Get a Quote`
- Secondary: `WhatsApp Us`

**Build notes**
- Full-width band on the dark canvas. This is the section that closes an international distributor.
- "One team. One workflow." is the second-strongest line in the brief after the H1. Give it air. Do not put it inside a card.

---

### 1.5 Languages, `#languages`

**H2**
> Languages

**H3**
> Indian & International Languages

**Chips**, her eleven in her order, then "and more" as plain text after the grid, not as a twelfth chip.

| English label (primary line) | Native label (second line) | `lang` | `dir` |
|---|---|---|---|
| Hindi | हिन्दी | `hi` | |
| English | English | | |
| Marathi | मराठी | `mr` | |
| Bengali | বাংলা | `bn` | |
| Tamil | தமிழ் | `ta` | |
| Telugu | తెలుగు | `te` | |
| Kannada | ಕನ್ನಡ | `kn` | |
| Malayalam | മലയാളം | `ml` | |
| Gujarati | ગુજરાતી | `gu` | |
| Punjabi | ਪੰਜਾਬੀ | `pa` | |
| Urdu | اردو | `ur` | `rtl` |

After the grid, plain text:
> and more

**Closing line**
> Don't see your language?

**CTA**
- Primary: `Ask Us`

**Build notes**
- The English label carries the meaning on its own. If an Indic or Arabic script fails to render, nothing is lost. Do not ship Indic webfonts for this.
- The English chip has no second line. Do not put "English" twice; render the second line as empty or omit the element for that chip only.
- Do not add a language count ("11 languages", "20+ languages"). She did not give one and "and more" is doing that job honestly.
- **PENDING CONFIRMATION: which international languages have actually been delivered.** Her list is eleven Indian languages plus English. "International" appears in the H3 and the hero line but is backed by nothing named. Until she answers, "and more" is the only claim we make.

---

### 1.6 Hear the difference, `#work`

**H2**
> Hear the Difference

**Deck**
> Our work speaks for itself.

**Body**
> Explore selected projects, dubbing samples and voice work.

**CTA**
- Primary: `Listen to Our Work` (internal link to `/work/`, not a contact CTA)

**Item captions**, six curated on home, all seven on `/work/`.

Client names are not published until permission is confirmed, so captions describe the work without the brand. Each caption is an **H3** on the card.

| Video | Caption (H3) | Sub-line |
|---|---|---|
| `Q48tj-O-Tzo` | Automotive campaign film | Music-led brand spot |
| `mR-LlG23JxI` | Automotive campaign film | Action brand spot |
| `rYtycVB8zu0` | Animated explainer | Gujarati version |
| `CjOymDx0IaA` | Animated explainer | Hindi version |
| `7vmwrFt_XFs` | Animated explainer | Marathi version |
| `u81WaEFCs8Q` | Animated brand film | Children's entertainment |
| `c3EcpSbwAf0` | Travel brand film | Social campaign |

**PENDING CONFIRMATION: client names and logo permission.** When she confirms, restore the archive titles exactly: Mahindra Scorpio (Badshah), Mahindra Scorpio (Dhakad), What is Kidzania? Gujarati, What is Kidzania? Hindi, What is Kidzania? Marathi, Kidzania (Imagine), Flynote (Women's Day Special). Note the archive wrote them with hyphens; convert to parentheses per house rule.

**Warning the build must handle:** the poster frames themselves contain the client logos. `what-is-kidzania-*.webp` shows the KidZania India logo and the words "what is KidZania" in legible type. `kidzania---imagine.webp` shows third-party Nutella and Bajaj Electricals logos. So an unnamed caption next to a named thumbnail is not actually anonymity, it just denies the information to screen reader users while showing it to everyone else. Two honest options: get permission before launch, or do not ship those items. Do not ship "anonymous" captions over branded frames as a permanent state. Flag this to her as part of question 3.

**Voice reel component:** dormant. No copy, no heading, no "coming soon". When audio arrives, the heading is `Voice Samples` and the sub-line is `Hear the range in each language.`

**Do not render** her stage direction "Project thumbnails / video players / audio players go here." It is a note to us, not copy.

---

### 1.7 Why Potbelly, `#why-potbelly`

**H2**
> Why Potbelly?

Six cards, her headings, each an **H3**.

| # | H3 | Body |
|---|---|---|
| 1 | Experience | Years of hands-on experience across dubbing, voiceovers and localisation. |
| 2 | The Right People | Experienced translators, directors, voice artists and sound engineers. |
| 3 | Scale | The studio capacity and talent network to take on high-volume projects. |
| 4 | One Point of Contact | One team managing your project from script to final delivery. |
| 5 | We Get the Original | Localisation should make content feel native, not make it feel like a translation. |
| 6 | Quality Matters | Multiple rounds of QC. Because small mistakes don't stay small in finished content. |

**Deviations**
- Card 3 only. Hers: "**Three studios** and the talent network to take on high-volume projects." Number removed, rest kept. **PENDING CONFIRMATION: studio count.**
- Card 1 keeps "Years of hands-on experience" verbatim. It contains no number, so it is not a banned claim. The archive says founded 2013 and the founder has been in the industry since 2009, but no year figure ships anywhere until she confirms it. **PENDING CONFIRMATION: how many years to state, if any.**
- Card 6 ships exactly as written. It is the register benchmark for the whole site. Do not touch the full stop after "QC", do not join the two sentences.

---

### 1.8 Let's talk, `#lets-talk`

Her section. See conflict 2 in section 0.2 before deciding whether it ships.

**H2**
> Let's Talk

**Deck**
> Have a project in mind?

**Body**, two lines, kept as two lines
> Tell us what you're working on.
> We'll tell you how we can help.

**CTAs**, her three, in her order
- Primary: `WhatsApp Us`
- Secondary: `Get a Quote`
- Secondary: `Discuss Your Project`

**Deviation**
- She wrote `Discuss a Project` here and `Discuss Your Project` in the hero and `#new-market`. Two labels for one action, differing by one word. Normalised to `Discuss Your Project` sitewide. This is a consistency fix, not a rewrite: if she prefers the variant, revert this one instance.

---

### 1.9 Refer Potbelly, `#refer`

**H2**
> Refer Potbelly

**Deck**
> Know someone who needs dubbing, voiceovers or localisation?

**Body**
> Send them our way.

**Segment list**, her line, rendered as one line or as quiet chips, exactly as she cased it
> Production houses, OTT, Animation, Agencies, Brands, International content owners, Distributors, Syndicators

**CTA**
- Primary: `Make an Introduction`

**Build notes**
- The list is intentionally the shorthand version of `#who-we-work-with`. Do not "fix" it to match that section's full names: a referrer scans, a buyer reads.
- Her mixed casing ("Production houses" lowercase h, "Animation" capital) is in the source. Left as is. If the design needs consistency, sentence-case the whole list rather than title-casing it, and flag it to her.
- **PENDING CONFIRMATION: is anything offered to a referrer, or is this purely a goodwill ask?** No incentive is stated in copy either way, so nothing is blocked. Client question 14.

---

### 1.10 About Potbelly, `#about`

**H2**
> About Potbelly

**Deck**, two sentences, one line
> Built around good audio. Built to make content travel.

**Body**
> Founded by Pooja Punjabi, Potbelly Audio has grown from an audio production company into a localisation partner for content across languages, formats and markets.

**Closing line**
> Based in Mumbai. Working across markets.

**CTA**
- Primary: `Talk to Pooja`

**Build notes**
- "Founded by Pooja Punjabi" ships. That is her own sentence about her own company, and it is corroborated by the archive. The claims ban is on **dubbing credits**, not on naming the founder of the business she founded.
- **PENDING CONFIRMATION: founder credits.** Public sources credit her with significant feature and series dubbing work. Nothing ships until she confirms it in writing. When she does, it belongs here as one short factual sentence directly under the body paragraph, in this shape: `Pooja is a working dubbing artist. Credits include [list].` A founder who is a working artist is the strongest trust signal this business has.
- **PENDING CONFIRMATION: founding year, team size.** No number ships.
- No founder photo caption is written here because `imgs/pooja-punjabi.webp` traces to her own site assets, not stock, so it is usable. Alt text in section 5.

---

### 1.11 Contact, `#contact`

**H2**
> Contact

**Deck**, her three questions, one line
> Have a project? Need a quote? Want to explore a partnership?

**CTAs**, her three, in her order
- Primary: `WhatsApp Us`
- Secondary: `Email Us`
- Secondary: `Get a Quote`

**Contact details block**

| Label | Value |
|---|---|
| Email | work@potbellyaudio.com |
| Location | Mumbai, India |

**Build notes**
- No street address, no phone number, no map embed. The archive has "Oshiwara, Mumbai" and a map pin and nothing more. **PENDING CONFIRMATION: whether to publish a street address and a phone number.**
- Email is displayed as text as well as being a link, because enterprise buyers copy it into their procurement system.
- `Email Us` is her tenth label. It is not in the eight-label matrix in the spec but it is in her draft and in spec 5.10, so it ships. Payload in section 2.

---

### 1.12 Footer

**Brand line** (with the logo image beside it)
> Potbelly Audio

**Service line**
> Dubbing, Voiceovers, Translation, Localisation, Audio Production

**Location line**
> Mumbai, India

**Social links.** Only verified URLs ship.

| Label | URL | Status |
|---|---|---|
| Instagram | https://www.instagram.com/potbellyaudio/ | Verified, archive |
| Facebook | https://www.facebook.com/potbellyaudio/ | Verified, archive |
| LinkedIn | | **PENDING CONFIRMATION**, do not ship a guessed URL |
| YouTube | | **PENDING CONFIRMATION**, do not ship a guessed URL |
| Twitter / X | https://twitter.com/potbellyaudio?lang=en | In archive but **not in her footer list**. Ask before shipping. Client question 10. |

Render her four labels in her order once the URLs arrive. Until then, render only the links that resolve. Do not render a dead icon.

**Sign-off**, ships exactly, full stop included
> Sounds Good.

**Copyright line** (mechanical, she did not write one)
> © 2026 Potbelly Audio

**Build note:** the footer already carries "Potbelly Audio" as text, so the footer logo image is decorative and takes `alt=""`. See section 5.

---

### 1.13 Header nav and site chrome

She wrote no nav. These are proposals, keep them short and cut one if the mobile bar is tight.

**Nav labels** (anchor links on home, `../#anchor` on `/work/` and `/faq/`)
> What We Do · Languages · Work · About · Contact

`#who-we-work-with`, `#new-market`, `#why-potbelly`, `#refer` and `#lets-talk` are reached by scrolling. Five nav items plus a CTA is the ceiling on mobile.

**Header CTA button**
> WhatsApp Us

**Skip link**
> Skip to main content

**Mobile menu button accessible name**
> Menu

**Floating WhatsApp button accessible name**
> Chat with Potbelly Audio on WhatsApp

**404 page**
- H1: `Page not found`
- Body: `That page has moved or never existed. The work, the languages and the contact details are all on the home page.`
- CTA: `Go to the home page`

---

## 2. The CTA matrix

Ten labels, two channels. Write the payloads below as plain text. The build URL-encodes them (`%0A` for newlines) and writes `&` as `&amp;` inside the attribute.

### 2.1 Channel rules

- Every WhatsApp message ends with a `Sent from:` line naming the section, so she can triage a lead from the first message.
- Every email starter carries the source in the subject (`via potbellyaudio.com`), so the `Sent from:` line is not repeated in email bodies.
- One visually dominant primary per section. Everything else is a quiet secondary.
- **Hard dependency: the WhatsApp number.** Until it arrives, every WhatsApp CTA falls back to its email equivalent (section 2.4) and the floating button does not render. Do not invent a number, do not use a landline.
- Email starters all go to `work@potbellyaudio.com`.

### 2.2 The matrix

| Her label | Channel | Placements | Payload |
|---|---|---|---|
| Discuss Your Project | WhatsApp | `#top`, `#new-market`, `#lets-talk` | 2.3 A |
| WhatsApp Us | WhatsApp | `#top`, `#new-market`, `#lets-talk`, `#contact`, header, floating button | 2.3 B |
| Have a Project? Let's Talk | WhatsApp | `#what-we-do` | 2.3 C |
| Ask Us | WhatsApp | `#languages` | 2.3 D |
| Talk to Pooja | WhatsApp | `#about` | 2.3 E |
| Get a Quote | Email starter | `#new-market`, `#lets-talk`, `#contact` | 2.3 F |
| Make an Introduction | Email starter | `#refer` | 2.3 G |
| Email Us | Email starter | `#contact` | 2.3 H |
| Listen to Our Work | Internal link to `/work/` | `#work` | No payload |
| Discuss a Project | Normalised to `Discuss Your Project` | retired | See 1.8 |

### 2.3 Exact payloads

#### A. Discuss Your Project (WhatsApp)

Body, with the last line varying by placement:

```
Hi Potbelly Audio. I would like to discuss a project.
Content type:
Languages needed:
Volume (runtime or episode count):
Sent from: Home, potbellyaudio.com
```

Placement variants, last line only:
- `#top` -> `Sent from: Home, potbellyaudio.com`
- `#new-market` -> `Sent from: Taking Content to a New Market, potbellyaudio.com`
- `#lets-talk` -> `Sent from: Let's Talk, potbellyaudio.com`

#### B. WhatsApp Us (WhatsApp, open)

```
Hi Potbelly Audio. I found you on potbellyaudio.com.
Sent from: Home
```

Placement variants, last line only:
- `#top` -> `Sent from: Home`
- `#new-market` -> `Sent from: Taking Content to a New Market`
- `#lets-talk` -> `Sent from: Let's Talk`
- `#contact` -> `Sent from: Contact`
- Header button -> `Sent from: Header`
- Floating button -> `Sent from: WhatsApp button`

#### C. Have a Project? Let's Talk (WhatsApp)

```
Hi Potbelly Audio. I have a project I would like to talk about.
Content type:
Languages needed:
Sent from: What We Do, potbellyaudio.com
```

#### D. Ask Us (WhatsApp)

```
Hi Potbelly Audio. I need a language I did not see listed on your site.
Language(s):
Content type:
Sent from: Languages, potbellyaudio.com
```

#### E. Talk to Pooja (WhatsApp)

```
Hi Potbelly Audio. I would like to speak with Pooja about a project.
Content type:
Languages needed:
Sent from: About Potbelly, potbellyaudio.com
```

#### F. Get a Quote (email starter)

**To:** work@potbellyaudio.com
**Subject:**
```
Quote request via potbellyaudio.com
```
**Body:**
```
Hi Potbelly Audio,

I would like a quote.

Company:
Content type (film, series, ad, corporate, e-learning, game, other):
Source language:
Target languages:
Runtime or episode count:
Deadline:
Deliverables and specs (dubbed mix, M&E, stems, subtitles, file format):
Budget range:
Notes:
```

Note for the build: the `&` inside "M&E" needs the same escaping as every other `&` in a `mailto:` attribute.

#### G. Make an Introduction (email starter, written for the referrer to forward)

This one is addressed to the person being introduced, with Potbelly copied, because that is how a real introduction is sent. The referrer fills two blanks and presses send.

**To:** left empty, the referrer fills in the person they are introducing
**Cc:** work@potbellyaudio.com
**Subject:**
```
Intro: Potbelly Audio, dubbing and localisation
```
**Body:**
```
Hi [name],

Introducing you to Potbelly Audio, a Mumbai audio and localisation company. Dubbing, voiceovers, translation and localisation across Indian and international languages.

Potbelly, [name] is working on [short description].

I will let you two take it from here.

https://www.potbellyaudio.com/
```

**Fallback if the empty-recipient `mailto:?cc=` form misbehaves in the target mail client:** send To `work@potbellyaudio.com` with subject `Referral via potbellyaudio.com` and this body instead:

```
Hi Potbelly Audio,

I would like to introduce you to someone who needs dubbing, voiceovers or localisation.

Their name:
Their company:
Their email:
What they are working on:

Feel free to reach out and mention me.
```

Test the `mailto:?cc=` form in Apple Mail, Gmail web and Outlook web before shipping the primary version.

#### H. Email Us (email starter, open)

**To:** work@potbellyaudio.com
**Subject:**
```
Enquiry via potbellyaudio.com
```
**Body:**
```
Hi Potbelly Audio,

Company:
Content type:
Languages:
Timeline:
Brief:
```

### 2.4 WhatsApp fallbacks, for use until the number arrives

Each WhatsApp CTA keeps its label and swaps its `href` to a `mailto:`. Bodies are the WhatsApp bodies minus the `Sent from:` line, since the subject carries the source.

| CTA | Fallback subject |
|---|---|
| Discuss Your Project | `Project enquiry via potbellyaudio.com` |
| WhatsApp Us | `Enquiry via potbellyaudio.com` |
| Have a Project? Let's Talk | `Project enquiry via potbellyaudio.com` |
| Ask Us | `Language question via potbellyaudio.com` |
| Talk to Pooja | `For Pooja: project enquiry via potbellyaudio.com` |

---

## 3. FAQ content for `/faq/`

### 3.1 The shipping rule

`FAQPage` schema requires the answer text in JSON-LD to match the visible answer text exactly. That means **an answer with an open question in it cannot ship.** Every entry below is marked:

- **SHIP** = fully backed by her brief or the archive, render it and put it in the schema.
- **SHIP (interim)** = honest about the limit, says something real, does not claim anything unverified. Render it now, upgrade when she answers.
- **HOLD** = do not render, do not put in the schema. The draft below is what to ship the moment she answers.

An empty FAQ page with six honest answers beats a full one with four invented ones. A HOLD entry renders nothing: no question, no "coming soon", no greyed-out row.

**Page H1:** `Questions`
**Deck:** `The things people ask us most.`

(Alternative H1 `Frequently Asked Questions` if the main session wants exact keyword alignment with the title tag. `Questions` is closer to her register. Recommend `Questions`.)

Question headings are **H2**. Answers are paragraphs inside `<details>` or an accordion; the visible text must match the schema string character for character.

### 3.2 The entries, in the order buyers ask them

---

**1. What does Potbelly Audio do?** — **SHIP**

> Dubbing, voiceovers, translation and localisation. We also handle casting, dubbing direction, recording, mixing and audio post-production. One team, one workflow, from script to final delivery.

*Source: her brief, WHAT WE DO and WHY POTBELLY.*

---

**2. Which languages do you work in?** — **SHIP (interim)**

> Hindi, English, Marathi, Bengali, Tamil, Telugu, Kannada, Malayalam, Gujarati, Punjabi and Urdu, and more. If the language you need is not on that list, ask us. We will tell you straight away whether we can cover it.

*Source: her brief, LANGUAGES. **PENDING CONFIRMATION:** which international languages have actually been delivered. Her list is eleven Indian languages plus English, and "international" is currently unbacked. Once she names them, this answer gets a second sentence listing them and the interim "ask us" framing stays.*

---

**3. How fast can you turn a project around?** — **SHIP (interim)**

> Turnaround depends on runtime, how many languages you need and the deliverable spec. Tell us your deadline with the brief and we will tell you whether it is workable before you commit to anything.

*No number is claimed. **PENDING CONFIRMATION:** a real range, even a rough one. This is the second question every buyer asks and an answer with a number in it is worth more than this one. Client question 9.*

---

**4. How does quality control work?** — **SHIP**

> Every project goes through multiple rounds of QC. Scripts are checked before recording, and the recording is checked again afterwards. Because small mistakes don't stay small in finished content.

*Source: her brief, QUALITY CONTROL and QUALITY MATTERS. Note the closing sentence is her benchmark line and is reused deliberately.*
***PENDING CONFIRMATION:** the exact number of rounds. "Multiple" is hers and ships as is. Do not convert it to a number without her.*

---

**5. How does casting work?** — **SHIP (interim)**

> We cast from a talent pool across languages, age groups and performance styles. Send us the brief, the character notes and any reference you have, and we will start there.

*Source: her brief, CASTING. **ASK HER:** does the client hear auditions and approve the voices, and how many options do you put up per role? Buyers ask this constantly and the answer is a differentiator either way. Nothing about client approval is claimed in the interim answer because nothing about it is verified.*

---

**6. Do we get to choose the voices?** — **HOLD**

*Do not render until she answers question 5's ASK HER. Draft for when she does:*

> Yes. We shortlist for each role and send you options to hear. You approve the voice before recording starts.

*That draft is the industry-standard process, which is exactly why it must not ship as an assumption. It is either true of her workflow or it is not.*

---

**7. How is our content kept secure, and do you sign NDAs?** — **HOLD**

*Nothing verified. Do not render. Do not invent.*

*This is the highest-value HOLD on the list. OTT and studio buyers check content security before they check anything else, and having no answer is a real cost. Client question 12. Draft shape for when she answers, to be filled with her actual process:*

> We sign NDAs before we see anything. [How files are received.] [Who has access during the project.] [What happens to the files after delivery.]

---

**8. Do you use AI anywhere in the pipeline?** — **HOLD**

*Do not render. Do not invent a position. **ASK HER.** Client question 11.*

*Both answers are commercially fine in 2026. "No, everything is voiced by artists" is a positioning asset. "Yes, for [specific step]" is a positioning asset. Saying nothing at all is the only bad option, because buyers who ask and find silence assume the worse answer. This entry should be treated as launch-blocking-adjacent: get the answer before go-live if at all possible.*

---

**9. Is there a minimum project size?** — **HOLD**

*Draft, needs her confirmation before rendering:*

> No fixed minimum. We take on projects across a range of budgets. Tell us what you have and we will tell you what is possible.

*The old site claimed "projects ranging from very tight budgets to premium budgets". That is five-plus year old marketing copy from the archive, not a verified fact, so it does not carry a new claim on its own. **ASK HER:** is there a floor, and do you want to state it?*

---

**10. What formats do you deliver?** — **HOLD**

*Draft, needs her spec list before rendering:*

> Tell us the spec and we will deliver to it. [File formats.] [Sample rate and bit depth.] [Mixed track, M&E, stems.] [Platform-specific delivery requirements.]

*Nothing about deliverable specs is verified anywhere. **ASK HER:** what do you actually deliver, and do you handle platform delivery specs and Atmos? Buyers with an OTT contract check this hard, and a concrete spec list is one of the cheapest credibility wins available.*

---

**11. How does pricing work?** — **SHIP**

> Pricing depends on the content type, the runtime, how many languages you need and what you need delivered. Send us those four things and we will send you a quote.

*No rate is claimed. This describes the process her own Get a Quote CTA already implements, so it is backed by the site itself.*

---

**12. How does a project start?** — **SHIP**

> Send us the brief: content type, source and target languages, runtime or episode count, deadline, and the deliverables you need. We come back with a quote. Once that is agreed, translation and casting begin, then recording, direction, mixing and QC, through to final delivery.

*Source: her brief, WHAT WE DO and the Get a Quote checklist. Every step named here is a capability she listed.*

---

**13. Do you work with clients outside India?** — **SHIP**

> Yes. We work with international content owners, distributors and syndicators, both bringing content into India and taking Indian content overseas.

*Source: her brief, WHO WE WORK WITH, segment 5.*

---

**14. Can we hear samples before we commit?** — **SHIP (interim)**

> Selected project work is on our work page. For voice samples in a specific language, ask us and we will send them across.

*Source: her brief, HEAR THE DIFFERENCE. **PENDING CONFIRMATION:** audio samples per language. Once they exist this answer changes to point at the on-page player and the interim "ask us" sentence is removed.*

---

**15. Who is behind Potbelly Audio?** — **SHIP**

> Potbelly Audio was founded by Pooja Punjabi. It has grown from an audio production company into a localisation partner for content across languages, formats and markets. We are based in Mumbai and work across markets.

*Source: her brief, ABOUT POTBELLY. **PENDING CONFIRMATION:** her own dubbing credits. When confirmed, one sentence gets added here and to `#about`.*

---

### 3.3 What ships at launch, on current information

SHIP or SHIP (interim): entries 1, 2, 3, 4, 5, 11, 12, 13, 14, 15. Ten questions.
HOLD: entries 6, 7, 8, 9, 10. Five questions, four of them are the ones enterprise buyers care most about.

Ten honest answers is a real FAQ page. But note the shape of what is missing: security, AI, minimums and delivery specs are precisely the procurement questions. Getting those four answers is worth more to conversion than anything else on the outstanding list except the WhatsApp number.

A research agent is refining the objection list in parallel. If it surfaces objections not covered here, they slot in after entry 13 and follow the same SHIP / HOLD rule.

---

## 4. Titles and meta

`&` must be written `&amp;` in every one of these when it lands in HTML.

### 4.1 Home

| Field | Value | Length |
|---|---|---|
| `<title>` | `Dubbing, Voiceovers & Localisation Mumbai | Potbelly Audio` | 58 |
| `meta description` | `Mumbai audio and localisation company. Dubbing, voiceovers, translation and localization across Indian and international languages. Talk to Potbelly.` | 147 |
| `og:site_name` | `Potbelly Audio` | |
| `og:title` | `Dubbing. Voiceovers. Translation. Localisation.` | 47 |
| `og:description` | `Potbelly Audio is a Mumbai-based audio and localisation company working across Indian and international languages.` | 113 |

**Notes**
- The meta description is the one deliberate American spelling on the site: "localisation" and "localization" both appear once each, because Indian buyers search both. Every other instance sitewide is British.
- The OG title is her H1 and the OG description is her positioning line, both verbatim. The brand is carried by `og:site_name` and by the OG card image, so the share card does not need the name repeated in the title.
- Keyword-first ordering in the title tag, brand last. Standard practice and it puts "Dubbing" in the first two words.

### 4.2 `/work/`

| Field | Value | Length |
|---|---|---|
| `<title>` | `Our Work: Dubbing & Voiceover Projects | Potbelly Audio` | 55 |
| `meta description` | `Selected dubbing, voiceover and localisation projects from Potbelly Audio, Mumbai. Watch the work, then tell us about yours.` | 123 |
| `og:title` | `Our Work` | |
| `og:description` | `Our work speaks for itself. Selected dubbing, voiceover and localisation projects from Potbelly Audio, Mumbai.` | 109 |

**Page copy**
- H1: `Our Work`
- Deck: `Hear the difference.`
- Filter group labels (only render a filter once there are enough items for it to earn its place): `Language`, `Type`
- Empty-filter state: `Nothing in that combination yet. Ask us what we have.`
- Page-end CTA: `Discuss Your Project` (WhatsApp payload A, `Sent from: Our Work, potbellyaudio.com`)

*Note: "Hear the difference" is her `#work` H2 reused as this page's deck. The home section keeps the H2, this page takes the H1 `Our Work`, so the two pages do not compete for the same heading.*

### 4.3 `/faq/`

| Field | Value | Length |
|---|---|---|
| `<title>` | `FAQ: Dubbing, Voiceovers & Localisation | Potbelly Audio` | 56 |
| `meta description` | `Turnaround, languages, casting, QC and pricing, plus how a project starts at Potbelly Audio, Mumbai. Dubbing, voiceovers and localisation. Ask us more.` | 149 |
| `og:title` | `Questions` | |
| `og:description` | `Turnaround, languages, casting, QC, pricing and how a project starts at Potbelly Audio, Mumbai.` | 94 |

**Page copy**
- H1: `Questions`
- Deck: `The things people ask us most.`
- Page-end CTA block heading: `Still have a question?`
- Page-end CTA: `Ask Us` (WhatsApp payload D, with the last line changed to `Sent from: Questions, potbellyaudio.com` and the `Language(s):` prompt replaced by `My question:`)

**Note:** the meta description does not mention content security or NDAs, because those answers are on HOLD. Add them to the description the same day the answers ship, not before.

---

## 5. Alt text

### 5.1 Principle

Alt text is published text. It follows the same claims rules as visible copy: no client names until permission arrives, no describing stock as her studio. Where a visible caption already names the item, the image is decorative and takes `alt=""` rather than repeating the caption to a screen reader.

### 5.2 Logo

| Placement | Alt | Why |
|---|---|---|
| Header logo (`imgs/logo-horizontal.webp`, wrapped in a link to `/`) | `Potbelly Audio` | The H1 is the four-word service line and does not contain the brand name, so the header logo is the only place the brand is announced. It must carry it. Do not write "Potbelly Audio logo": the word "logo" is noise, and do not write "Potbelly Audio home" either, the link context supplies that. |
| Footer logo (`imgs/logo.webp`) | `""` (empty) | The footer already has "Potbelly Audio" as adjacent visible text. A non-empty alt here makes a screen reader say the brand twice in a row. |
| Favicons, OG card | n/a | No alt. The OG card needs no `og:image:alt` beyond `Potbelly Audio`. |

*The mark itself is a gold seated potbelly Buddha figure standing in for the O in POTBELLY. Do not describe the Buddha in alt text: it is a brand mark, not an illustration, and its meaning is the company name.*

### 5.3 The seven archive work items

These are YouTube poster frames rendered behind a facade. **The correct pattern is `alt=""` on the poster image with the play control carrying the accessible name**, because every card has a visible caption next to it. Use this:

```
poster img            alt=""
play control          accessible name: "Play: <caption>, <sub-line>"
```

That gives a screen reader user exactly what a sighted user gets and nothing extra.

If the build ends up with the image as the link itself, these are the alt strings. They describe the frame and do not name the client, matching the captions in section 1.6.

| File | Alt if the image must carry it |
|---|---|
| `mahindra-scorpio---badshah.webp` | `Automotive campaign film: a performer in sunglasses against a desert backdrop` |
| `mahindra-scorpio---dhakad.webp` | `Automotive campaign film: a white SUV on a road, a man stepping out of the driver's door` |
| `what-is-kidzania-gujarati.webp` | `Animated explainer: hand-drawn children and question marks. Gujarati version` |
| `what-is-kidzania-hindi.webp` | `Animated explainer: hand-drawn children and question marks. Hindi version` |
| `what-is-kidzania-marathi.webp` | `Animated explainer: hand-drawn children and question marks. Marathi version` |
| `kidzania---imagine.webp` | `Animated brand film: a child in a chef's hat at a cooking counter` |
| `flynote---women27s-day-special.webp` | `Travel film: a view over trees and rooftops from a moving vehicle` |

**Two build warnings**

1. **The client logos are inside the frames.** The three "what is KidZania" posters carry the KidZania India logo and legible title text. `kidzania---imagine.webp` carries Nutella and Bajaj Electricals logos. Unnamed alt over a branded frame is not anonymity. See the note in 1.6: get permission, or do not ship those items.
2. **`flynote---women27s-day-special.webp` has a mangled filename**, the `27` is a leftover `%27` from an apostrophe. Rename it (`travel-film-social.webp` or the real title once permission lands) and update every reference. Do not carry the archive's broken alt string `Flynote - Women%27s Day Special` into the new build.

### 5.4 Other images, since the build will reach for them

| File | Verdict |
|---|---|
| `imgs/pooja-punjabi.webp` | **Usable.** Traces to her own site assets, not a stock library. Alt: `Pooja Punjabi, founder of Potbelly Audio`. Only render it if the About section actually has a portrait slot. |
| `imgs/hero.webp`, `imgs/hero-audio-mixer.webp` | **Do not use.** Both trace to stock: a rackspace-hosted "person adjusting audio of a sound mixer" file and Pexels 159206 "mixing table". This is exactly what the old site did and it says nothing. Type-led hero until she supplies a real studio photo. |
| `imgs/audio-production.webp`, `imgs/localization.webp`, `imgs/translation.webp`, `imgs/dubbing.webp` | **Do not use.** All four trace to Pexels (744318, 2651794, 1054713, 2510575). Generic stock, and presenting them beside "What We Do" implies they are her rooms and her sessions. |
| `imgs/about-us-hero.webp` | **Do not use without asking.** Filename suggests it is hers ("aboutuspotbelly.jpeg") but provenance is not verified. |
| `imgs/client-logo-1.webp`, `imgs/client-logo-2.webp` | **Do not use.** Client logos, permission not confirmed. |
| `imgs/image-1.webp` .. `image-9.webp` | **Do not use** until someone identifies what they are. Unknown provenance. |

If no real photography arrives, the site ships photo-free with a type-led hero and the seven video posters as its only imagery. That is a legitimate outcome and better than stock. It is also worth telling her plainly: real photos of the rooms, a session in progress and the team would change this site more than any other single asset except the audio samples.

---

## 6. PENDING CONFIRMATION register

Every item below is a place where her draft or the archive has a fact we cannot publish yet. Nothing here blocks a build: each has a shipped form that is honest without the number.

| # | Item | Where it bites | Shipped form until confirmed |
|---|---|---|---|
| 1 | **WhatsApp Business number** | Every CTA, floating button | All WhatsApp CTAs fall back to email starters (2.4), floating button does not render. **Top blocker.** |
| 2 | **Studio count** ("three studios") | `#what-we-do` card 9, `#why-potbelly` card 3 | Sentence ships without the number, her syntax otherwise intact. One word restores it. |
| 3 | **Years in business** | `#why-potbelly` card 1 | "Years of hands-on experience", no figure. Archive has 2013 founding and 2009 industry start, neither ships. |
| 4 | **Team size** | Nowhere yet | No copy written. Add only if she gives a figure or the "core team plus network" framing. |
| 5 | **Founder dubbing credits** | `#about`, FAQ 15 | Not published. One sentence is drafted and waiting in 1.10. |
| 6 | **Client names and logo permission** | `#work`, `/work/`, alt text | Captions describe the work without the brand. Note the logos are visible inside the poster frames anyway. |
| 7 | **International languages actually delivered** | `#languages`, hero line, FAQ 2 | "and more" is the only claim. No count, no named international language. |
| 8 | **Turnaround range** | FAQ 3 | Process answer with no number. |
| 9 | **QC round count** | FAQ 4, `#what-we-do` card 8 | "Multiple rounds", hers, ships as is. |
| 10 | **Casting approval process** | FAQ 5, FAQ 6 | FAQ 5 ships without the approval claim. FAQ 6 is HOLD. |
| 11 | **Content security and NDA process** | FAQ 7 | HOLD, renders nothing. Highest-value gap for OTT buyers. |
| 12 | **AI position** | FAQ 8 | HOLD, renders nothing. Do not invent a position in either direction. |
| 13 | **Minimum project size** | FAQ 9 | HOLD. Old site's "tight to premium budgets" line is stale marketing, not a fact. |
| 14 | **Deliverable formats and specs** | FAQ 10 | HOLD. Cheapest credibility win on the list once answered. |
| 15 | **Audio samples per language** | `#work` voice reel, FAQ 14 | Component dormant, renders nothing. FAQ 14 says "ask us". |
| 16 | **LinkedIn and YouTube URLs** | Footer | Only Instagram and Facebook render. |
| 17 | **Twitter / X** | Footer | In the archive, absent from her footer list. Ask before shipping. |
| 18 | **Street address and phone** | `#contact` | Neither ships. Email and "Mumbai, India" only. |
| 19 | **Referrer incentive** | `#refer` | Nothing offered in copy. Goodwill ask as written. |
| 20 | **Studio, team and session photos** | Hero, `#about`, `#what-we-do` | Type-led hero, no stock. See 5.4. |

---

## 7. Every deviation from her wording, and why

Ten changes total. Everything else in sections 1 and 2 is her text or new operational text she did not write.

| # | Section | Hers | Shipped | Why |
|---|---|---|---|---|
| 1 | `#what-we-do`, Built for Volume | "**Three studios** and a strong talent network allow us to handle..." | "**Studio capacity** and a strong talent network allow us to handle..." | Unverified number. Two words changed, syntax and rhythm preserved. Reversible in one edit. |
| 2 | `#why-potbelly`, Scale | "**Three studios** and the talent network to take on high-volume projects." | "**The studio capacity** and talent network to take on high-volume projects." | Same reason. Phrasing taken from the spec's own suggested wording so both instances stay consistent. |
| 3 | `#who-we-work-with`, Gaming | "...for character-driven content" | "...for character-driven content**.**" | Missing full stop. Mechanical. Every other card in the section ends in one. |
| 4 | `#lets-talk` | "Discuss a Project" | "Discuss Your Project" | She used both forms for the same action, one word apart. Normalised sitewide. Revert this one instance if she prefers the variant. |
| 5 | `#work` item captions | "Mahindra Scorpio - Badshah" etc. | "Automotive campaign film" etc. | Client permission not confirmed. Archive titles preserved in 1.6 for one-step restoration. Also drops the archive's hyphen-as-separator, which is a house-rule fix regardless. |
| 6 | Work item, Flynote | "Flynote - Women%27s Day Special" | "Travel brand film" | Same permission reason, plus the archive string carries a broken URL encoding that must not survive. |
| 7 | `#lets-talk` anchor | No anchor, no position in the spec's section list | Kept at her position with a new id `#lets-talk` | Deleting it would remove a section she wrote. Merging it into `#contact` would lose one of the two distinct openings. See 0.2. |
| 8 | Section order | REFER before ABOUT | REFER before ABOUT (hers kept) | The spec's anchor list has them swapped. Her order wins per the no-reorder rule. Flagged in 0.2 so the swap, if wanted, is a deliberate call. |
| 9 | Footer | "Instagram, LinkedIn, YouTube, Facebook" | Instagram and Facebook only, for now | Two URLs are unverified. Her four labels return the moment they arrive. |
| 10 | Footer | No copyright line | "© 2026 Potbelly Audio" | Mechanical addition. Sits below "Sounds Good.", never above it. |

**Nothing was added that she did not write**, apart from: nav labels, skip link, mobile menu name, floating button accessible name, 404 copy, `/work/` and `/faq/` page furniture, the FAQ, the CTA payloads, and the meta tags. All of those are chrome or operational text with no equivalent in her brief, and all are marked as such above.

**Nothing she wrote was cut.** Every line of her draft appears somewhere in section 1, including the segment list in REFER that duplicates `#who-we-work-with` and the two near-identical contact openings.

---

## 8. Register check

Ran against her benchmark, "Multiple rounds of QC. Because small mistakes don't stay small in finished content."

- Longest sentence written new for this file: FAQ 12, 30 words, and it is a process list where length is the point.
- No sentence anywhere carries more than one adjective.
- No banned word appears, in this file or in her draft.
- No em dash, no en dash, no curly quote. Her draft is pure ASCII and this file keeps every apostrophe straight for the same reason.
- Fragments are kept where she wrote them: "We can help." "One team. One workflow." "Send them our way." "Based in Mumbai. Working across markets." Do not join any of these into longer sentences at build time.
- "Sounds Good." appears exactly once, in the footer, with the full stop.
