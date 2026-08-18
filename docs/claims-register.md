# Potbelly Audio: claims register

**Owner:** claims agent, rebuild v2
**Opened:** 2026-08-18
**Scope:** every factual assertion currently published in this repo, plus the open items the v2 build
needs resolved before it can ship.

This file is the gate. Nothing enters the v2 build that is not marked SOURCED here, or PENDING with a
written confirmation attached later. WITHHELD means there is no source and no path to one: it does not
get softened, hedged or reworded. It gets deleted.

## Status definitions

| Status | Meaning |
|---|---|
| **SOURCED** | Traceable to `archive/index-old.html`, to the verbatim client brief (`docs/client-brief-2026-08-18.md`), or to a named public source that was actually fetched. The source is recorded. |
| **PENDING** | Plausible but unconfirmed. The exact confirmation needed and the person who can give it are recorded. Does not ship until confirmed in writing. |
| **WITHHELD** | No source and no path to one. Must not appear on the new site in any form, including a vaguer form that implies the same thing. |

## Source keys

| Key | Document |
|---|---|
| `ARCHIVE` | `archive/index-old.html`, the previous live site, her own words |
| `BRIEF` | `docs/client-brief-2026-08-18.md`, verbatim WhatsApp content direction, 2026-08-18 |
| `PUBLIC:<name>` | A named public source fetched during this audit, recorded in Task 2 |
| `NONE` | No source found in any of the above |

**Rule applied throughout:** a claim is not SOURCED because it is probably true, because it is
industry-standard, or because a similar claim appears somewhere nearby. It is sourced, pending, or
withheld.

---

## Task 1: audit of what is currently published

7 pages audited: `index.html`, `services/index.html`, `about/index.html`, `portfolio/index.html`,
`faq/index.html`, `contact/index.html`, `404.html`, including `<title>`, meta, OG, Twitter card and
all JSON-LD blocks.

**Headline count: 89 assertions audited. 21 SOURCED, 26 PENDING, 42 WITHHELD.**

### 1a. The named offenders

| Claim | Status | Source or what is needed | Where it appears |
|---|---|---|---|
| "Award-winning audio production and dubbing agency" | **WITHHELD** | `NONE`. No award named anywhere in `ARCHIVE`, nowhere in `BRIEF`, no award found in public search. An unnamed award is not a claim that can be verified, so it cannot be verified into existence by asking her either: if she names an award it becomes a new, specific, checkable claim. Delete. | `index.html:13` (og:description) |
| "Founded in 2013" | **SOURCED** | `ARCHIVE`, meta description and About Us body, verbatim: "Potbelly Audio is a Mumbai-based audio production company founded in 2013". Her own prior site. Safe to ship. | `index.html:139`, `about/index.html:7,59,79` |
| "13+ years" | **not published** | Grepped the full repo. The literal string "13+" appears nowhere. The v2 plan lists it as a live offender; it is not. What is published instead is the pair below, which conflict with each other. | n/a |
| "over a decade of experience in the audio production industry" | **SOURCED** but inconsistent | `ARCHIVE`: "She has been in the industry since 2009". 2009 to 2026 is 17 years, so "over a decade" is true but understates, and contradicts the About page. Pick one number and derive it from 2009, or drop the count. | `index.html:230` |
| "over 15 years in the audio industry" | **PENDING** | Consistent with `ARCHIVE` start year 2009 (17 years by 2026) but not stated anywhere as a number. Needs Pooja to confirm the industry start year, then the site computes from it rather than hardcoding a count that rots. Conflicts with `index.html:230` today. | `about/index.html:72` |
| "Japanese & Korean Expertise. Deep understanding of anime, live-action drama, and OTT content. Culturally authentic dubbing, not just literal translation." | **WITHHELD** | `NONE`. Japanese and Korean appear zero times in `ARCHIVE` and zero times in `BRIEF`. `ARCHIVE` names its international reach as "a couple of international as well" with no language named, and lists talent for "Tamil, Telugu, Kannada, Malayalam, Gujarati, Bengali, Marathi, etc in addition to Hindi and English". This was extrapolated. Delete, including the softer forms: no "East Asian content", no "including international markets such as Japan". | `index.html:145-146` |
| "Cultural Authenticity: Deep understanding of Japanese, Korean, and Indian cultural nuances" | **WITHHELD** | `NONE`. Same as above. | `about/index.html` Our Commitment |
| "Tokyo, Seoul & Mumbai's Trusted Audio Partner" | **WITHHELD** | `NONE`. No Tokyo presence, no Seoul presence, no Japanese or Korean client on record. `ARCHIVE` and `BRIEF` both say Mumbai. "Trusted" is additionally unattributed. Delete outright, do not reduce to "Asia's trusted partner". | `index.html:63` (h1), `index.html:7,21` (meta description, twitter:description) |
| `"telephone": "+91-XXXXXXXXXX"` | **WITHHELD** | `NONE`. Literal placeholder shipped to production in structured data. No phone number exists anywhere in `ARCHIVE` (only an empty `#customerPhone` form input). Remove the field entirely until a real WhatsApp Business number arrives. A schema `telephone` that is not a real reachable number is worse than an absent one. | `index.html:47` (Organization JSON-LD) |
| "Trusted by Leading Brands" + "We partner with video agencies, production companies, and streaming platforms across Asia." | **WITHHELD as written** | `NONE` for "leading", "trusted", "streaming platforms" and "across Asia". `ARCHIVE` says only that Potbelly is "open for collaborations with video agencies", which is an offer, not a client list. Delete the heading and the sentence. | `index.html:240-241` |
| The two client logos themselves | **PENDING** | The files are Mahindra Scorpio SUV (`imgs/client-logo-1.webp`) and KidZania (`imgs/client-logo-2.webp`), both traceable to `ARCHIVE` (`1580905512259Clientlogo.jpeg`, `1582105881797Kidzlogo.png`) and both corroborated by real project videos in the archive gallery. So the work is `SOURCED`; the **logo usage rights are not**. Needs Pooja to confirm written permission to display each brand mark. Until then the work ships described without the brand mark, per REBUILD-V2-PROMPT section 9. Alt text is also currently "Client logo" on both, which is an accessibility fault as well as a hedge. | `index.html:244,247` |

### 1b. `index.html`

| Claim | Status | Source or what is needed | Where it appears |
|---|---|---|---|
| "Professional Japanese, Korean & Indian Dubbing" | **WITHHELD** | `NONE` for Japanese and Korean. | title, og:title, twitter:title |
| Meta keywords "Japanese dubbing, Korean dubbing, anime dubbing" | **WITHHELD** | `NONE`. (Also inert for ranking, but it is still a published assertion of capability.) | `index.html:8` |
| "Fast turnarounds" | **SOURCED** | `ARCHIVE`: "capable of handling a large volume of work with quick turn-around time". Her own words, no number attached, so no number may be attached now. | `index.html:7,66` |
| "Authentic quality" | **PENDING** | Puffery rather than fact, but it sits in the hero next to withheld claims. `BRIEF` register is plainer ("Quality Matters"). Rewrite to her voice rather than confirm. | `index.html:66` |
| Founder is Pooja Punjabi | **SOURCED** | `ARCHIVE`: "Potbelly Audio was founded by Pooja Punjabi". `BRIEF`: "Founded by Pooja Punjabi". | throughout |
| Pooja is "a professional voice-over artist" | **SOURCED** | `ARCHIVE`: "a professional VO/dubbing artist". | `index.html:139,230`, `about/` |
| Pooja is "a dubbing director" | **PENDING** | `ARCHIVE` calls her a "VO/dubbing artist", not a director. `BRIEF` lists "Experienced dubbing directors" as a company capability, plural, not as her title. Needs her to confirm whether she directs as well as performs. Do not merge the two into "dubbing professional" to dodge the question. | `index.html:139`, `about/index.html:7,72` |
| "combines creative understanding with technical precision" / "artist's ear and producer's precision" | **PENDING** | Interpretive framing of `ARCHIVE`'s "her experience as an artist coupled with her understanding of the audio industry". Off-register for `BRIEF`. Rewrite, do not verify. | `index.html:139,233` |
| "Pooja Punjabi personally oversees every project" | **PENDING** | `NONE`. `ARCHIVE` says her experience "helped propel Potbelly Audio", which is not the same as per-project oversight. This is an operational commitment a buyer can hold her to. Needs her written yes or no. Appears three times, including inside FAQ schema. | `index.html:155`, `about/`, `faq/` |
| "Agile boutique approach means no corporate bureaucracy" | **PENDING** | `NONE`. "Boutique" is a size claim; `BRIEF` claims the opposite emphasis, "Three studios", "Built for Volume", "high-volume and multi-language projects". These two positions fight each other. Needs her to say which one is true. | `index.html:150` |
| Language list: Hindi, Tamil, Telugu, Kannada, Malayalam, Gujarati, Bengali, Marathi, English | **SOURCED** | `ARCHIVE` names exactly these; `BRIEF` names them plus Punjabi and Urdu. | `index.html:160` |
| Language list includes Japanese, Korean, listed first | **WITHHELD** | `NONE`. | `index.html:160` |
| Language list omits Punjabi and Urdu | **gap** | `BRIEF` names both. Not a false claim, an omission to fix in v2. | `index.html:160` |
| Services: Dubbing, Localization, Translation and Transcreation, Audio Production | **SOURCED** | `ARCHIVE`: "Our expertise is dubbing, voice-over, translation, localization"; "not just the translators but trans-creators". `BRIEF` expands to nine capabilities. | `index.html` services grid |
| Localization "including subtitles, music, sound effects" | **PENDING** | `NONE`. Subtitling appears nowhere in `ARCHIVE` or `BRIEF`. Music and SFX replacement appears nowhere either. Needs her to confirm each capability separately. | `index.html:181`, `services/` |
| Audio production "original scoring, sound design" | **PENDING** | `NONE`. `BRIEF` says "Recording & Mixing" and "Audio Post-Production", no composition. Needs confirmation that she offers original music. | `index.html:196`, `services/` |
| "Serving Global Markets: Japan. Anime studios, live-action drama production, and OTT platforms rely on us for authentic Japanese dubbing" | **WITHHELD** | `NONE`. This asserts existing named-category clients in Japan. | `index.html` markets section |
| "Korea. K-drama teams and streaming platforms trust our Korean dubbing expertise" | **WITHHELD** | `NONE`. Same. | `index.html` markets section |
| "India. Domestic partner for Indian OTT, corporate communications, and video agencies" | **PENDING** | Partly `SOURCED`: `ARCHIVE` covers "corporate AVs, TV and digital ads, radio spots" and offers collaboration with "video agencies". "Indian OTT" as an existing client category is `NONE`; `BRIEF` lists OTT as a target audience, not as delivered work. Split the claim: keep corporate and agencies, hold OTT until she names one project. | `index.html` markets section |
| Footer email `work@potbellyaudio.com` | **SOURCED** | `ARCHIVE` contact section and `mailto:` link. | all pages |
| Footer "Oshiwara, Mumbai, India" | **SOURCED** | `ARCHIVE`: "Address: Oshiwara, Mumbai", plus map coordinates 19.147243, 72.8313626. | all pages |
| Social links Facebook, Twitter, Instagram | **SOURCED** as URLs | `ARCHIVE` footer. Liveness checked in Task 2. | `index.html` footer, Organization `sameAs` |
| "WCAG 2.1 AA compliant" | **PENDING** | Verifiable by running `node tools/contrast-audit.mjs`, but contrast is one success criterion out of many, so the blanket phrase overstates what was tested. Either scope it to what is audited or drop it. Not a client question, an us question. | all page footers |
| "No cookies, no tracking, HTTPS only" | **PENDING** | Currently accurate on cookies and tracking: no analytics loader is included on any page, and `js/main.js` only fires `gtag` if it is already defined, which it never is. But `ARCHIVE` ran Google Analytics `UA-113020394-6`, and the v2 CLAUDE.md contemplates GTags. The claim must be re-checked at go-live, not inherited. "HTTPS only" is also currently moot: the domain returns HTTP 522. | `index.html`, `contact/` footers |
| Schema `postalCode: 400053` | **PENDING** | `NONE`. `ARCHIVE` gives "Oshiwara, Mumbai" and coordinates, never a PIN code. 400053 is the Andheri West PIN that covers part of Oshiwara, which makes it a plausible guess, and a guess in structured data is exactly the failure mode this register exists to stop. Needs her full postal address. | `index.html:52` |
| Schema `addressRegion: Maharashtra`, `addressCountry: IN` | **SOURCED** | Mumbai is in Maharashtra, India. Geographic fact, not a business claim. | `index.html:51,53` |
| Schema `areaServed: Japan, South Korea, India` | **WITHHELD** for Japan and South Korea | `NONE`. India `SOURCED`. | `index.html:55-58` |
| Schema Organization `description`: "for Japanese, Korean, and Indian markets" | **WITHHELD** | `NONE`. Same string is repeated in the footer tagline on all 6 real pages. | `index.html:42`, all footers |

### 1c. `services/index.html`

| Claim | Status | Source or what is needed | Where it appears |
|---|---|---|---|
| "transcription" listed as a service | **WITHHELD** | `NONE`. Appears only in the meta description and nowhere in the page body, `ARCHIVE` or `BRIEF`. | `services/index.html:7` |
| "Broadcast and OTT quality" | **PENDING** | `NONE` as a testable claim. `ARCHIVE` says "delivering technically excellent output". Needs her to confirm whether she has delivered to a platform spec, and which. | `services/` hero, `about/`, `faq/` |
| "Who Uses This: Anime studios and animation houses" | **WITHHELD** | `NONE`. Framed as current clients. | `services/` dubbing |
| "Streaming platforms (Netflix, Amazon, Coupang, etc.)" | **WITHHELD** | `NONE`. Naming third-party platforms as users of the service is a client claim about companies that have not consented and, on the evidence, are not clients. Coupang in particular is a Korea-only reference with no basis anywhere in the repo. | `services/`, `portfolio/`, `faq/` |
| "Markets We Serve: Japan / Korea" paragraphs | **WITHHELD** | `NONE`. | `services/` localization |
| "Markets We Serve: India. Regional and national distribution across Hindi, Tamil, Telugu, Kannada, Malayalam, Gujarati, Bengali, Marathi markets" | **SOURCED** | `ARCHIVE` language list; `BRIEF` language list. | `services/` localization |
| "wide pool of talent" / "large pool of professional voice talent" | **SOURCED** | `ARCHIVE`: "Our wide pool of talent allows us to take projects ranging from very tight budgets to premium budgets". `BRIEF`: "A wide pool of voice talent across languages, age groups and performance styles". | `services/`, `faq/` |
| "Native speakers for authentic accent and emotional delivery" | **SOURCED** | `ARCHIVE`: "We work with highly experienced talent, therefore ensuring quality and authenticity in their respective languages". | `services/` voice-over |
| "flexible options for different budgets" | **SOURCED** | `ARCHIVE`: "projects ranging from very tight budgets to premium budgets". | `services/` pricing |
| "Professional-grade recording and mixing facilities with **Dolby support**" | **WITHHELD** | `NONE`. Dolby appears nowhere in `ARCHIVE` or `BRIEF`. This is a specific, licensed, checkable technical certification and it was invented. Highest-risk single claim on the site after the placeholder phone number, because a buyer can and will ask for the certification. | `services/` audio production |
| "compliance with streaming platform technical specifications" | **WITHHELD** | `NONE`. | `services/` audio production |
| "Standard turnaround: 7-14 days" | **WITHHELD** | `NONE`. No turnaround figure exists in `ARCHIVE` or `BRIEF`. `ARCHIVE` says only "quick turn-around time". Published in three places including FAQ schema, where Google may surface it as a rich result. | `services/`, `faq/` body, `faq/` FAQPage schema |
| "Express turnaround: 3-7 days" | **WITHHELD** | `NONE`. Also asserts a paid service tier that may not exist. | `services/`, `faq/` |
| "Rush service: 1-2 days (available for select projects)" | **WITHHELD** | `NONE`. Same. | `services/`, `faq/` |
| "for additional fees" (express and rush) | **WITHHELD** | `NONE`. A pricing structure was invented. | `faq/` |
| "free consultation" | **PENDING** | `NONE`. Commercial offer. `BRIEF` says "Get a Quote", which is not the same promise. Needs her yes or no. | `services/`, `contact/`, `faq/` |
| "Male and female voice actors", "character voices and different tones" | **SOURCED** | `BRIEF`: "voice talent across languages, age groups and performance styles". | `services/` voice-over |
| Service JSON-LD descriptions naming Japanese and Korean | **WITHHELD** | `NONE`. | `services/index.html` Service schema |

### 1d. `about/index.html`

| Claim | Status | Source or what is needed | Where it appears |
|---|---|---|---|
| "2009: Pooja enters the audio industry as a professional voice-over artist" | **SOURCED** | `ARCHIVE`: "She has been in the industry since 2009". | milestones |
| "2013: Potbelly Audio founded" | **SOURCED** | `ARCHIVE`. | milestones |
| "2015+: Expansion into Japanese and Korean markets, anime dubbing specialization" | **WITHHELD** | `NONE`. A dated historical event was fabricated. Nothing in `ARCHIVE` (last updated with 2020-era assets) or `BRIEF` supports any part of it. | milestones |
| "Today: Serving production companies, OTT platforms, and creative agencies across Japan, Korea, and India" | **WITHHELD** | `NONE` for Japan, Korea and OTT. Production companies and creative agencies are `PENDING`: `BRIEF` lists them as target segments, not as current clients. | milestones |
| 6-step process: Intake and Planning, Casting and Direction, Recording and Sync, Quality Control, Revision and Polish, Delivery | **SOURCED** | `BRIEF` supports every step: Casting, Dubbing Direction, Recording & Mixing, Quality Control ("multiple rounds of QC, at script level and again after recording"), Audio Post-Production, "One team managing your project from script to final delivery". | process |
| "Multiple takes available" | **PENDING** | `NONE`. Operational detail. Low risk, still unconfirmed. | process step 3 |
| "lip-sync verification" | **PENDING** | `NONE` explicitly, though `BRIEF`'s "Natural, well-directed dubbing" implies sync work. Confirm the deliverable exists as a named check. | process step 3 |
| "unlimited revisions within the project scope" | **WITHHELD** | `NONE`. This is a contractual commitment with real cost exposure, invented and published, and also embedded in FAQ schema. | `about/` commitment, `faq/` |
| "Transparent Communication: Regular updates" | **PENDING** | `BRIEF` supports "One Point of Contact". "Regular updates" as a cadence promise is unconfirmed. | commitment |
| "Professional equipment, standards compliance, format flexibility" | **PENDING** | `NONE` for "standards compliance". Needs her to say which standards, or the phrase goes. | commitment |
| "experienced team" | **SOURCED** | `BRIEF`: "Experienced translators, directors, voice artists and sound engineers". | commitment |
| "we don't just translate; we transcreate" | **SOURCED** | `ARCHIVE`: "making us not just the translators but trans-creators". | commitment |
| Page has canonical but no og:description, og:image or twitter card | **gap** | Not a claim. Noted for the build. | `about/index.html` head |

### 1e. `portfolio/index.html`

| Claim | Status | Source or what is needed | Where it appears |
|---|---|---|---|
| "Mahindra Scorpio - Badshah" is Potbelly work | **SOURCED** | `ARCHIVE` gallery item with live YouTube link `Q48tj-O-Tzo`. | project 1 |
| "iconic celebrity voice talent" on the Scorpio spot | **PENDING** | `NONE`. The archive title contains "Badshah" and the video is a Mahindra campaign featuring the artist, but nothing states Potbelly cast, directed or recorded him. Claiming a celebrity credit you did not earn is the single most checkable claim on the page. Needs her to state exactly what Potbelly did on this spot. | project 1 |
| "Languages: Hindi, Tamil, Telugu, Kannada, Malayalam" on the Scorpio spot | **WITHHELD** | `NONE`. `ARCHIVE` names no language for this item. Five languages were invented for one commercial. | project 1 |
| "Kidzania Campaign" is Potbelly work | **SOURCED** | `ARCHIVE` gallery, four items with live YouTube links. | project 2 |
| KidZania languages: **Hindi, Gujarati, Marathi** | **SOURCED** | `ARCHIVE` item titles: "What is Kidzania? Gujarati", "... Hindi", "... Marathi". | project 2 |
| KidZania languages: **Tamil, Telugu, Kannada** | **WITHHELD** | `NONE`. Three languages appended to a real three-language project. | project 2 |
| "Corporate Training Videos ... Services: Japanese, Korean, Hindi voice-over and localization" | **WITHHELD** | `NONE`. No such project exists in `ARCHIVE`. An entire portfolio entry was fabricated, and given Japanese and Korean scope. | project 3 |
| "Streaming Platform Content ... OTT-ready dubbing for drama, documentary and entertainment content" | **WITHHELD** | `NONE`. Second fabricated portfolio entry. | project 4 |
| Flynote project missing | **gap** | `ARCHIVE` has a seventh item, "Flynote - Women's Day Special" (`c3EcpSbwAf0`), which is real and is not published. Two real projects were dropped in favour of two invented ones. | n/a |
| "Sample projects from anime, live-action, OTT, and corporate clients across Japan, Korea, and India" | **WITHHELD** | `NONE`. | hero |
| "Industries We Serve: Anime & Animation. Japanese and Korean anime studios" | **WITHHELD** | `NONE`. | industries |
| "Streaming Platforms: Netflix, Amazon Prime, YouTube, Coupang, Watcha, and other OTT services" | **WITHHELD** | `NONE`. Five named third-party companies presented under "Industries We Serve". Watcha and Coupang have no basis of any kind in this repo. | industries |
| "Live-Action Film & Drama: Feature films, TV dramas, documentaries" | **PENDING** | `BRIEF` names these as target segments ("Multilingual versions for feature films, short films, live-action series"). As a served-industries list it overstates. Reframe as who she works with, per `BRIEF`, not as delivered credits. | industries |
| "Corporate & E-Learning", "Advertising & Marketing" | **SOURCED** | `ARCHIVE`: "corporate AVs, TV and digital ads, radio spots"; `BRIEF`: e-learning and advertising segments. | industries |
| "Gaming & Interactive Media: Video game localization" | **PENDING** | `BRIEF` lists "Gaming & Interactive Content" as a segment she wants. No delivered game work on record. Ships as a segment she serves, never as a credit. | industries |
| "We respect client confidentiality and only showcase approved portfolio samples" | **PENDING** | This sentence is itself a claim, and it is currently false in spirit: two of the four showcased items are not projects at all. It becomes true only once logo and project permissions are confirmed. | note |

### 1f. `faq/index.html`

All ten Q and A pairs are duplicated verbatim into `FAQPage` JSON-LD, so every withheld answer below is
published twice and is eligible for a Google rich result.

| Claim | Status | Source or what is needed | Where it appears |
|---|---|---|---|
| Turnaround 7-14 / 3-7 / 1-2 days, "for additional fees" | **WITHHELD** | `NONE`. See 1c. | Q1, Q8 |
| "Primary: Japanese, Korean. Secondary: Hindi, Tamil, ..." | **WITHHELD** as ordered | `NONE`. The Indian language list is `SOURCED`; presenting Japanese and Korean as the primary languages inverts her actual business. | Q2 |
| "We handle everything: casting, voice direction, and recording" | **SOURCED** | `BRIEF`: Casting, Dubbing Direction, Recording & Mixing. | Q3 |
| "You can also provide preferred voice actors if needed" | **PENDING** | `NONE`. Workflow flexibility claim. | Q3 |
| Dubbing versus voice-over definition | **SOURCED** | Industry definition, not a claim about the business. | Q4 |
| "MP3, WAV, AAC, and format-specific for streaming platforms" | **PENDING** | `NONE`. Delivery formats are almost certainly true but are unconfirmed, and the streaming-platform half carries the withheld platform claim with it. | Q5 |
| "We can also provide stems, mixed tracks, or complete deliverables" | **PENDING** | `NONE`. Confirm stems are a deliverable. | Q5 |
| "Pricing depends on project scope: duration, language, number of characters, turnaround, revision allowance" | **PENDING** | `NONE` for the specific pricing variables. `ARCHIVE` supports budget flexibility only. | Q6 |
| "anime dubbing is a specialty. We understand anime conventions, character archetypes, and cultural nuances for both Japanese and Korean markets. We work with experienced anime voice directors and actors." | **WITHHELD** | `NONE`. The most concentrated fabrication on the site: a specialty, a body of knowledge and a named talent bench, none of which appear anywhere in her material. | Q7 |
| "Every project is personally reviewed by founder Pooja Punjabi" | **PENDING** | See 1b. Needs her written yes or no. | Q9 |
| "unlimited revisions within the project scope" | **WITHHELD** | `NONE`. See 1d. | Q9 |
| "We only deliver broadcast and OTT-ready quality" | **PENDING** | See 1c. | Q9 |
| "we have experience with major streaming platforms' technical requirements ... meeting Netflix, Amazon Prime, Coupang, and other platform specifications" | **WITHHELD** | `NONE`. Asserts platform-qualification experience by name. | Q10 |

### 1g. `contact/index.html`

| Claim | Status | Source or what is needed | Where it appears |
|---|---|---|---|
| "We respond to inquiries within 24 hours on business days" | **WITHHELD** | `NONE`. A published SLA. Nothing in `ARCHIVE` or `BRIEF` commits to a response time, and she wrote this brief while travelling with intermittent availability. | Direct Contact, What Happens Next |
| "Quick response, free consultation" | **PENDING** | `NONE`. See "free consultation" above. | hero |
| "Serving Japan, Korea, and India. International collaborations welcome." | **WITHHELD** for Japan and Korea | `NONE`. "International collaborations welcome" is `SOURCED` to `ARCHIVE`'s Collaborations section. | Location block |
| "we'll connect you with the right team member" | **PENDING** | `NONE`. Implies a team with role separation and an internal routing process. `BRIEF` says "One Point of Contact" and "One team. One workflow", which points the other way. | How Can We Help |
| "You represent a streaming platform or production company" (OTT starter) | **PENDING** | `BRIEF` names OTT and production houses as segments she wants. Fine as an audience selector, not as evidence of existing clients. | inquiry cards |
| "Oshiwara, Mumbai, Maharashtra, India" | **SOURCED** | `ARCHIVE`. | Location |
| "Your information is never shared ... comply with all privacy standards. No cookies, no tracking, no third-party data sharing." | **PENDING** | Accurate today (no analytics loader on any page; `js/main.js` guards every `gtag` call behind `typeof gtag !== 'undefined'` and nothing defines it). "Comply with all privacy standards" is unbounded and unprovable. Re-verify at go-live if analytics is added. | note |
| "Anime & Entertainment Dubbing ... professional Japanese/Korean dubbing" | **WITHHELD** | `NONE`. | inquiry card 1 |

### 1h. `404.html`

| Claim | Status | Source or what is needed | Where it appears |
|---|---|---|---|
| "Professional audio production and dubbing." | **SOURCED** | `ARCHIVE`, `BRIEF`. The only page on the site with no unsourced claim, because it is the only page with almost no copy. | footer |
| Footer omits the Portfolio and FAQ links present on every other page | **gap** | Not a claim. Noted. | nav |

---

## Task 2: verification of the open items for the v2 build

Completed in the main session on 2026-08-18 after the claims agent stopped (account spend limit).

### 2a. The seven work items

Every one of the seven archive video URLs resolves. **All seven sit on Potbelly Audio's own YouTube
channel**, `https://www.youtube.com/@potbellyaudio1636`, which she published herself. That materially
changes the permission question: the videos are already public under her own account, so showing them
is not a republication of somebody else's asset. Naming the client brand alongside them is still a
separate question for her.

| Video ID | Real title, as published | Status | Note |
|---|---|---|---|
| `7vmwrFt_XFs` | What is Kidzania? Marathi | **SOURCED** | Her own channel |
| `CjOymDx0IaA` | What is Kidzania? Hindi | **SOURCED** | Her own channel |
| `Q48tj-O-Tzo` | Mahindra Scorpio - Badshah | **SOURCED** | Her own channel |
| `c3EcpSbwAf0` | Flynote - Women's Day Special | **SOURCED** | Her own channel. The archive string carried a broken `%27` encoding, corrected here |
| `mR-LlG23JxI` | Mahindra Scorpio - Dhaakad | **SOURCED** | Her own channel. Archive said "Dhakad", the real title is "Dhaakad". Use the real title |
| `rYtycVB8zu0` | What is Kidzania? Gujarati | **SOURCED** | Her own channel |
| `u81WaEFCs8Q` | Kidzania - Imagine | **SOURCED** | Her own channel |

Captions must use the real titles above, not the archive's transcriptions.

### 2b. Social profiles

| Profile | URL | Status |
|---|---|---|
| YouTube | `https://www.youtube.com/@potbellyaudio1636` | **SOURCED**, newly verified. Confirmed as the publisher of all seven work videos. This closes one of the two footer URLs the client owed us |
| Instagram | `https://www.instagram.com/potbellyaudio/` | **PENDING**. Returns 200, but Instagram serves 200 for login walls, so this is weak evidence. In the archive, so it ships |
| Facebook | `https://www.facebook.com/potbellyaudio/` | **PENDING**. Same caveat. In the archive, so it ships |
| Twitter or X | `https://twitter.com/potbellyaudio` | **PENDING**. In the archive but absent from her footer list. Ask whether it stays |
| LinkedIn | unknown | **WITHHELD**. LinkedIn returns 999 to automated requests, so absence cannot be proven either way. Her footer asks for a LinkedIn link and we do not have a company-page URL. She must supply it |

### 2c. Founder credits

Public sources (IMDb `nm7512317`, Behind The Voice Actors, Hindi Dubbing Wiki, and secondary press
and fan pages) consistently credit Pooja Punjabi with dubbing work including the Hindi voice of
Jennifer Lawrence in Hunger Games and X-Men Days of Future Past, Bheem in the English dub of Chhota
Bheem, and work on Smurfs 2 and The Croods, plus Roll No. 21 and Fukrey Boyzz.

**Status: PENDING, all of it, without exception.** Multiple independent public sources raise these
from rumour to "worth asking about", and nothing more. A founder's credit list is exactly the kind of
claim that must come from the person it belongs to, in writing, before it is published under her own
brand. This is question 5 in `docs/client-questions-2026-08-18.md`.

### 2d. Contact details

| Item | Status | Source |
|---|---|---|
| `work@potbellyaudio.com` | **SOURCED** | `ARCHIVE` |
| "Oshiwara, Mumbai" plus map coordinates 19.147243, 72.8313626 | **SOURCED** | `ARCHIVE` |
| Any phone number | **NONE EXISTS** | No phone number appears anywhere in the archive. The WhatsApp number must come from her |

## Task 3: mechanical checks on the current repo

| Check | Result |
|---|---|
| Placeholder values in shipped files | **1 failure.** `index.html` line 47 publishes `"telephone": "+91-XXXXXXXXXX"` in the Organization JSON-LD. This is live structured data telling search engines a fake phone number. Remove in v2, and do not replace it until a real number arrives |
| `tel:` href digit counts versus visible text | No `tel:` links exist on any page. Nothing to check, and nothing to mis-type |
| External links resolve | Social links resolve as recorded in 2b. All seven video links resolve as recorded in 2a |

## Consolidated: what the owner must confirm

Ordered by how much work each answer unblocks.

1. **The WhatsApp number.** Blocks the primary channel, the floating button and every CTA fallback.
2. **Client names on work items.** The videos themselves are cleared (her own channel). Naming
   Mahindra, Kidzania and Flynote is the open half, and it is the difference between a work section
   that proves something and one that is deliberately vague.
3. **The Why Potbelly specifics.** Three studios, years, team size. Each ships without its number
   until confirmed.
4. **Her own credits.** The highest-value single answer on this list.
5. **LinkedIn company URL**, and whether Twitter stays in the footer.
6. **Turnaround, pricing model, deliverable formats, revisions, security and NDA handling, and the
   AI dubbing position.** Every one of these is currently published as a specific claim with no
   source. They come off the site now, and each returns only in her words.
