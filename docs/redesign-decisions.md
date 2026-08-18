# Redesign decisions: Potbelly Audio

**Last rewritten:** 2026-08-18 (v2)
**Status:** built, validated, awaiting client review and the answers in
[client-questions-2026-08-18.md](client-questions-2026-08-18.md).

> **This file was rewritten, not amended.** The previous version documented a Japan and Korea
> anime dubbing strategy that the client had never claimed. It was the root cause of the v1
> rebuild being rejected, and keeping it would have kept the error alive in the repo. The
> superseded version is in git history.

---

## 1. What the business is

Potbelly Audio is a Mumbai audio and localisation company working across Indian and international
languages. Dubbing, voiceovers, translation and localisation, plus casting, dubbing direction,
recording and mixing, audio post-production and QC. Founded by Pooja Punjabi.

Buyers: production houses, OTT and streaming, animation studios, advertising and creative agencies,
international content owners and distributors and syndicators, brands and corporate teams,
e-learning and digital content, gaming and interactive content.

**Source:** the client's own content direction, [client-brief-2026-08-18.md](client-brief-2026-08-18.md),
corroborated by `archive/index-old.html` ("exclusively an Audio Agency specialized in localizing any
kind of content in Indian and international languages").

**The rule that governs this file:** the client's own words outrank market research on positioning.
Research informs keywords, structure, objections and proof, and never decides who the business is.

There is no Japan strategy, no Korea strategy and no anime positioning. None of it appears in her
brief or in the archive.

---

## 2. Where each decision lives

This file is the index. The detail lives in the documents that own it, so nothing is stated twice
and nothing can drift.

| Decision area | Owning document |
|---|---|
| The client's verbatim direction, the content spine | [client-brief-2026-08-18.md](client-brief-2026-08-18.md) |
| Roles, the six resolved debates, phases, risks | [rebuild-v2-plan.md](rebuild-v2-plan.md) |
| The build spec, section by section | [REBUILD-V2-PROMPT.md](REBUILD-V2-PROMPT.md) |
| Competitors, buyer criteria, keyword map, objections | [research-v2.md](research-v2.md) |
| Every published claim, sourced, pending or withheld | [claims-register.md](claims-register.md) |
| Palette, type, signature elements, contrast ratios | [art-direction-v2.md](art-direction-v2.md) |
| Every visible word, CTA payloads, FAQ, meta, alt | [copy-v2.md](copy-v2.md) |
| What the owner still has to answer | [client-questions-2026-08-18.md](client-questions-2026-08-18.md) |

---

## 3. Information architecture, as built

```
/          one page, her section order
             #top #what-we-do #who-we-work-with #new-market #languages
             #work #why-potbelly #lets-talk #refer #about #contact
/work/     the full archive, seven projects, click-to-load players
/faq/      ten questions, FAQPage schema
/404.html  root-absolute paths
```

Retired: `/services/`, `/about/`, `/portfolio/`, `/contact/`. Each is now a `noindex` stub with a
canonical to its destination and a meta refresh, because GitHub Pages cannot serve a real 301.
**These become real 301 redirects at go-live**, which is the main argument for moving hosting to
Cloudflare Pages (see the `golive` skill). `/faq/` kept its URL.

Rationale for one page rather than a tree, including the case against it, is
[rebuild-v2-plan.md](rebuild-v2-plan.md) section 3, debate A.

---

## 4. Keyword to section map

In [research-v2.md](research-v2.md) section C. Both "localisation" and "localization" appear, once
each in the home meta description and body, because Indian buyers search both. Every other instance
sitewide is British, matching her spelling.

---

## 5. What is deliberately absent

Recorded here so a future session does not "fix" these by adding them back.

| Absent | Why |
|---|---|
| A phone number | None exists in the archive. The WhatsApp number has not arrived |
| A street address | The archive has "Oshiwara, Mumbai" and nothing more. Mumbai is what ships |
| Any turnaround figure | Published unsourced on the old site. Withheld until she gives a real one |
| "Three studios", any year count, any team size | Unverified. The sentences ship without the numbers |
| The founder's dubbing credits | Public sources support them. Not published until she confirms in writing |
| Client logos | Permission unconfirmed. The work items carry her own published video titles instead |
| Stock photography | Every stock image in `imgs/` traces to Pexels or a stock CDN. The hero is type-led instead |
| A language count | She wrote "and more". No number is invented |
| Any AI dubbing position | Not her answer to give on her behalf. It is question 11 |
| Content security and NDA claims | Unverified. The FAQ holds those entries rather than guessing |
| A floating WhatsApp button | Renders only when a real number is set. See section 6 |

---

## 6. The WhatsApp switch

`js/main.js` opens with one constant, `WHATSAPP_NUMBER`. While it is empty:

- every WhatsApp CTA stays as the prefilled `mailto:` fallback written into the HTML, so the site
  works fully with JavaScript off
- the floating button does not render at all, rather than rendering broken

Set a real WhatsApp-enabled number there and every `[data-wa]` link becomes a `wa.me` link carrying
its prefilled message, and the floating button appears on every page. Each message names the section
it came from, so she can triage a lead from the first line.

---

## 7. Validation, 2026-08-18

| Check | Result |
|---|---|
| `node tools/contrast-audit.mjs` | **PASS**, 700 text elements across 8 pages, 0 AA failures |
| `linkcheck.py` | **OK**, all local assets, links and anchors resolve |
| JSON-LD | Parses on all three pages. FAQ schema text matches visible text exactly, 10 for 10 |
| Em and en dashes | None |
| One `<h1>` per page, alt on every image | Confirmed |
| GitHub Pages subpath | 0 failed asset requests at `/potbellyaudio.com/` |
| JavaScript disabled | Renders fully. 17 CTAs all carry a real href, all 6 facades link to YouTube |
| Responsive, 360 to 1440 | No overflow, no sub-24px targets, no sub-12px text |
| External requests on load | **None.** YouTube is contacted only after a click, via youtube-nocookie |

Two real bugs were caught by the audits and fixed: `.nav a` (0-1-1) was overriding `.btn-primary`
(0-1-0) and rendering the header button at 1.52:1, and `height: 100%` on the work thumbnails could
not resolve against an `aspect-ratio` parent, so the cards rendered at the source 4:3 with YouTube's
letterbox bars visible.
