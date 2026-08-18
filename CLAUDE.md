# Potbelly Audio, design system and implementation

**Last rebuilt:** 2026-08-18 (v2)
**Status:** built and validated, awaiting client review. Not committed, not deployed.

---

## Read this before changing anything

The July 2026 build (v1) was rejected by the client. It positioned Potbelly as a Japanese and Korean
anime dubbing agency. She runs a Mumbai localisation house working across Indian and international
languages, and she said so in her own words on her old site and again in her 2026-08-18 brief.

**The rule that came out of it: the client's own words outrank market research on positioning.**
Research informs keywords, structure, objections and proof. It never decides who the business is.

Everything visible on this site traces to one of three sources: her verbatim brief, the archive of
her old site, or a named public source recorded in the claims register. Nothing else ships.

| Document | What it owns |
|---|---|
| `docs/client-brief-2026-08-18.md` | Her verbatim content direction. The content spine. Do not edit |
| `docs/copy-v2.md` | Every visible word, CTA payloads, FAQ, meta, alt text |
| `docs/art-direction-v2.md` | Palette, type, signature elements, audited contrast ratios |
| `docs/claims-register.md` | Every claim: sourced, pending, or withheld |
| `docs/redesign-decisions.md` | The index, the IA, what is deliberately absent |
| `docs/research-v2.md` | Competitors, buyer criteria, keyword map |
| `docs/rebuild-v2-plan.md` | Roles, the six resolved debates, phases, risks |
| `docs/client-questions-2026-08-18.md` | What the owner still has to answer |

---

## Architecture

```
/                    one page, her section order, every section anchored
  #top #what-we-do #who-we-work-with #new-market #languages
  #work #why-potbelly #lets-talk #refer #about #contact
/work/index.html     the full archive, seven projects, click-to-load players
/faq/index.html      ten questions, FAQPage schema
/404.html            root-absolute paths

/about/ /services/ /portfolio/ /contact/   retired, noindex stubs pending real 301s
/archive/                                  the pre-2026 builder site, disallowed in robots
/css/main.css        one stylesheet
/js/main.js          one script, progressive enhancement only
/fonts/              Bricolage Grotesque 400/600/700, Manrope 400/600, woff2 latin
/imgs/               logo, favicons, OG card, seven work posters
/docs/               internal, stripped from the deploy by the workflow
/tools/              contrast audit, stripped from the deploy
```

**Path portability:** home uses `css/...`, inner pages use `../css/...`, `404.html` uses
root-absolute `/css/...`. Canonical, OG, sitemap and JSON-LD `@id` stay absolute on
`https://www.potbellyaudio.com/`. Verified with 0 failed requests at the `/potbellyaudio.com/`
subpath.

**The docs are not published.** `.github/workflows/deploy.yml` deletes `docs/`, `.claude/` and
`tools/` before uploading the Pages artifact, because the claims register and the client questions
are internal. `robots.txt` also disallows `/docs/`, which is a second belt, not the trousers.

---

## The WhatsApp switch, the one thing most likely to need changing

`js/main.js` opens with `WHATSAPP_NUMBER`. It is currently empty, because no real number has been
supplied. While empty:

- every WhatsApp CTA stays as the prefilled `mailto:` fallback already written into the HTML
- the floating button does not render

Set the number (digits only, full international form, for example `919876543210`) and every
`[data-wa]` link becomes a `wa.me` link with its prefilled message, and the floating button appears
on every page. Each prefilled message names the section it came from.

House rule: a real WhatsApp-enabled number only. Never a landline, never an invented one.

---

## Design system

Palette derived by sampling the real logo: the gold sits at hue 47, not the hue 30 to 33 tan that
v1 assumed. Full token table and the audited ratio table are in `docs/art-direction-v2.md`.

| Token | Value | Role |
|---|---|---|
| `--canvas` | `#14120F` | Primary dark ground |
| `--surface` | `#1F1C19` | Cards, bands |
| `--surface-2` | `#2D2924` | Chips, hovers |
| `--on-dark` | `#F3F1EC` | Text on dark |
| `--on-dark-mut` | `#C5BFB5` | Secondary text on dark |
| `--accent-dark` | `#E4C358` | Accent on dark |
| `--rule-dark` | `#403930` | Hairlines on dark |
| `--cream` | `#F8F7F1` | Light section ground |
| `--cream-2` | `#F1EDE4` | Chips, sunk blocks |
| `--ink` | `#221C16` | Text on cream |
| `--ink-mut` | `#655C53` | Secondary text on cream |
| `--accent-lite` | `#805D0A` | Accent on cream |
| `--rule-lite` | `#E3DED3` | Hairlines on cream |

Two surfaces means every accent has an on-dark and an on-light value. **Colour belongs to the
component, not the container.** The audit already caught one violation here: `.nav a` at 0-1-1 was
overriding `.btn-primary` at 0-1-0 and rendering the header button at 1.52:1. That is why the rule
is now `.nav a:not(.btn)`.

**Type:** Bricolage Grotesque (display) plus Manrope (body), self-hosted woff2 latin from Fontsource.
Not Fraunces plus Poppins (that was v1) and not Playfair plus Quicksand (that is the sibling site
aurallabsound.com).

**Signature elements:** the level meter (stepped bars plus a hairline, `aria-hidden`), the language
chips carrying native script with `lang` attributes and a system font fallback, and one gold play
affordance used on every work item.

---

## Conventions that will bite you

- **No em dashes, no en dashes.** Anywhere.
- **British and Indian English.** She writes "Localisation". One deliberate American "localization"
  sits in the home meta description because Indian buyers search both spellings.
- **"Sounds Good." is her sign-off.** Footer only, with the full stop. Do not reword it.
- **`height: 100%` does not resolve against an `aspect-ratio` parent.** The work thumbnails are
  absolutely positioned for this reason. Change it and the cards revert to the source 4:3 with
  YouTube's letterbox bars showing.
- **No third-party request before a click.** The work items are facades. YouTube is contacted only
  when the visitor asks, and via `youtube-nocookie.com`.
- **No stock photography.** Every stock image left in `imgs/` traces to Pexels or a stock CDN.
  The hero is type-led on purpose. See `docs/copy-v2.md` section 5.4 for the per-file verdicts.
- **`.sr-only` keeps `opacity: 0`**, or the contrast audit flags it.
- Header, footer and nav markup stay byte-identical across pages except `aria-current` and the
  depth of asset paths.

---

## Validation

```bash
grep -rn "—\|–" *.html */index.html css js && echo "FAIL dash" || echo "OK no em/en dash"
python3 -m http.server 8123 &
node tools/contrast-audit.mjs http://localhost:8123    # must print RESULT: PASS
python3 ../_rebuild-kit/tools/linkcheck.py .           # must print OK
```

Plus, before any deploy: JSON-LD parses on all three pages, the FAQ schema text matches the visible
text exactly, the site renders with JavaScript disabled, there is no horizontal overflow at 360 to
1440, and the subpath serves with 0 failed asset requests.

Last full pass, 2026-08-18: all green. Details in `docs/redesign-decisions.md` section 7.

---

## Still outstanding

The four blockers, in order of how much each unblocks, are in
`docs/client-questions-2026-08-18.md`: the WhatsApp number, work assets and client-name permission,
the claims register confirmations (three studios, years, team size, her own dubbing credits), and
the LinkedIn URL.

Go-live also has to fix the HTTP 522 the live domain has been returning, and turn the four retired
URL stubs into real 301s. Use the `golive` skill.

---

## Design skills (house)

Visual polish follows the **`refactoring-ui`** skill (hierarchy, spacing scale, type scale,
HSL/OKLCH ramps, depth, imagery, finishing touches). Load it for any CSS/UI pass.

- Skill: `~/.claude/skills/refactoring-ui/` (also `~/.cursor/skills/refactoring-ui/`)
- Human PDF (do not paste book text here): `/Users/chetan/Downloads/Learning/refactoring-ui_compress 2.pdf`
- Full rebuilds: `site-rebuild` + `../_rebuild-kit/`, ProPage invariants (WCAG AA, real logo,
  photos-first, type-by-register, no em/en dashes) override generic taste.
