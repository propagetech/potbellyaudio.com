# Art direction v2, locked

**Date:** 2026-08-18
**Status:** palette locked by computation, type verified on Fontsource. Ready for the build.
Rationale and the debate behind it: [rebuild-v2-plan.md](rebuild-v2-plan.md) section 3, debate C.

---

## 1. Register

Studio control room, warm. Craft plus capacity, not corporate scale. The site should feel like the
room the work is made in, and it should feel like it belongs to a person, because it does.

**Explicitly not `aurallabsound.com`.** That site is near-black, Playfair Display and Quicksand, a
poster lightbox and a filter sidebar. The client cited it to communicate "one scroll, dark,
work-forward, contact by message", not to ask for a copy. Ours diverges on temperature (warm
espresso, not black), type (grotesk pairing, not serif plus rounded sans), and structure (work grid
and language chips, not posters and filters).

---

## 2. Palette, derived from the real logo

The logo was measured, not eyeballed. Sampling every non-transparent pixel in `imgs/logo.webp`:

- black and white dominate (the figure and the field)
- the gold family sits at **hue 47deg, saturation 41%, lightness 48%**, mean `#9F8D50`, with
  highlights up to `#FFF1AC`

That is an **olive brass**, not a tan. Worth noting because both earlier palettes got the hue wrong:
the current site's `#D4A574` and `#8B6F47` sit at hue 30 to 33, which is a browner, sweeter gold
than the logo actually uses. Every accent in v2 is built on hue 42 to 47.

### Tokens

Two surfaces. Dark is the primary canvas, cream is relief for the reading-heavy sections
(Who we work with, Languages, FAQ).

| Token | Value | Role |
|---|---|---|
| `--canvas` | `#14120F` | Primary dark ground, warm espresso |
| `--surface` | `#1F1C19` | Cards and raised blocks on dark |
| `--surface-2` | `#2D2924` | Inputs, chips, hover states on dark |
| `--on-dark` | `#F3F1EC` | Body and headings on dark |
| `--on-dark-mut` | `#C5BFB5` | Secondary text on dark |
| `--accent-dark` | `#E4C358` | Accent, links, focus, primary button fill on dark |
| `--rule-dark` | `#403930` | Hairlines on dark |
| `--cream` | `#F8F7F1` | Light section ground |
| `--cream-2` | `#F1EDE4` | Alternate light ground, sunk blocks |
| `--ink` | `#221C16` | Text on cream, dark button fill |
| `--ink-mut` | `#655C53` | Secondary text on cream |
| `--accent-lite` | `#805D0A` | Links and focus on cream (the accent darkened to carry text) |
| `--rule-lite` | `#E3DED3` | Hairlines on cream |

The accent exists in two values because a bright brass cannot carry text on cream and a dark brass
disappears on espresso. Colour belongs to the component, not the container: on-dark components take
`--accent-dark`, on-light components take `--accent-lite`, and no rule may let one reach the other
surface through the cascade.

### Audited ratios

Computed, not estimated. Every pair meets or beats its WCAG 2.1 AA target.

| Pair | Ratio | Min |
|---|---|---|
| Body text on dark canvas | 16.56 | 4.5 |
| Muted text on dark canvas | 10.23 | 4.5 |
| Muted text on dark surface | 9.28 | 4.5 |
| Accent link on dark canvas | 10.90 | 4.5 |
| Accent link on dark surface | 9.89 | 4.5 |
| Heading on dark surface | 15.02 | 4.5 |
| Primary button label on accent fill | 10.90 | 4.5 |
| Focus ring on dark canvas | 10.90 | 3.0 |
| Ink on cream | 15.71 | 4.5 |
| Muted ink on cream | 6.10 | 4.5 |
| Muted ink on cream-2 | 5.60 | 4.5 |
| Accent link on cream | 5.61 | 4.5 |
| Accent link on cream-2 | 5.15 | 4.5 |
| White label on ink button | 16.86 | 4.5 |
| Focus ring on cream | 5.61 | 3.0 |

This is the desk check. It does not replace `node tools/contrast-audit.mjs`, which audits the real
DOM and catches what the cascade does to these values in practice.

---

## 3. Type

Verified available on Fontsource jsDelivr with a latin subset at weights 400, 600 and 700
(checked 2026-08-18, all returned 200).

| Role | Family | Weights | Why |
|---|---|---|---|
| Display and headings | **Bricolage Grotesque** | 400, 600, 700 | Contemporary grotesk with actual character in the letterforms. Carries the warmth of the brand without going soft, and reads as made rather than picked |
| Body and UI | **Manrope** | 400, 600 | Quiet, even colour at small sizes, wide enough for dense capability cards |

Rejected: Fraunces plus Poppins (the current site, and the reason nothing feels new), Playfair
Display plus Quicksand (Aural Lab, sibling clash), Inter and Space Grotesk (the house default
answer, no point of view).

Preload `bricolage-grotesque` 700 and `manrope` 400. `font-display: swap`.

```
--h1:      clamp(2.5rem, 6vw, 4.25rem)     line-height 1.02   tracking -0.025em
--h2:      clamp(1.85rem, 4vw, 2.75rem)    line-height 1.12   tracking -0.018em
--h3:      clamp(1.15rem, 2vw, 1.4rem)     line-height 1.25   tracking -0.008em
--body:    clamp(1rem, 1.1vw, 1.125rem)    line-height 1.6
--eyebrow: 0.72rem  uppercase via text-transform, tracking 0.14em
```

All caps come from `text-transform`, never typed capitals, so screen readers still read words.

### Indic and Urdu scripts

The language chips carry native script as a second line. We are not shipping Indic webfonts, so
those strings use a system fallback stack and every one carries a `lang` attribute (`hi`, `mr`, `bn`,
`ta`, `te`, `kn`, `ml`, `gu`, `pa`, `ur`), with `dir="rtl"` on the Urdu. **The English label must
carry the meaning on its own**, because a system without the script installed will show boxes.
Test at 360 and 1440 in the QA pass.

---

## 4. Signature elements

1. **The level meter.** Derived from studio metering, used as the section divider and as the mark on
   the active nav item, in the footer and beside the eyebrow. Four treatments were rendered and
   compared in a proof pass before choosing (screenshots in the session scratchpad):

   | Variant | Verdict |
   |---|---|
   | A. Stepped bars as a left mark, hairline continuing across | **Chosen.** Reads as a meter that peaks and falls. Still does the divider job |
   | B. Full-width tapering segment field | Rejected. Reads as a loading bar |
   | C. Hairline with an accent tick | Rejected. Generic, could be any brand |
   | D. Stepped bars alone, no line | **Kept as the compact variant** for nav, footer and inline use |

   Implementation: seven bars, widths 5px, gap 3px, heights stepping 7, 11, 16, 22, 16, 11, 7px,
   the first four in `--accent-dark` and the rest in `--rule-dark`, followed by a `flex: 1` hairline.
   Pure CSS, no image, no JavaScript. A and D share the same bar rhythm so they read as one system.
   Decorative, so it carries `aria-hidden="true"`.
2. **Language chips.** English label, native script beneath, on `--surface-2` with a hairline. The
   most direct proof of multilingual capability available to us, and it works before a single asset
   arrives from the client.
3. **One play affordance.** Every work item, video or audio, uses the same play control in
   `--accent-dark`. Consistency here is what makes "Hear the difference" read as a system rather
   than a set of embeds.

---

## 5. Depth and motion

Dark grounds swallow shadows, so elevation comes from surface steps (`--canvas`, `--surface`,
`--surface-2`) plus hairlines, not from drop shadows. Cream sections may use one soft shadow token
for cards, no more.

Motion is restrained: reveal on scroll, the play affordance, hover state on cards. No parallax, no
counters, no ken-burns on the work grid. Everything gated by `prefers-reduced-motion`.

---

## 6. Spacing and shape

```
--space: 0.25 / 0.5 / 0.75 / 1 / 1.5 / 2 / 3 / 4.5 / 7rem   (a 1.5x-ish rhythm, stay on it)
--radius: 4px on chips and buttons, 10px on cards, 0 on the level meter
--measure: 66ch on running text
```

Sections get generous vertical space (`4.5rem` mobile, `7rem` desktop). On a one-page scroll the
space between sections is what tells the reader a new idea has started, so it is not the place to
economise.

---

## 7. Imagery

Photos first, and there are almost none yet. Until the client sends studio and session photography:

- The hero is type-led on the dark canvas with the level meter, not a stock mixing desk. The stock
  desk is what the old site did and it says nothing about her.
- Work thumbnails come from the real project videos.
- No decorative illustrations. No stock photo of a studio that is not hers.

Concept icons, if a capability card genuinely needs one, come from The Noun Project per the kit
procedure: CC BY 3.0 or public domain, one family, self-hosted, recoloured to `--accent-dark` and
`--accent-lite`.

---

## 8. Proof pass, 2026-08-18

The palette, the type pairing and all three signature elements were rendered in headless Chrome at
1440 and 390 before being locked here, rather than being described and hoped for. The direction
holds at both widths. Three fixes carried into the build:

1. **Language chips: drop the second line for English.** "English / English" is noise. The native
   script line only appears where it differs from the English label.
2. **Work thumbnails are letterboxed.** The archive thumbnails carry baked-in black bars top and
   bottom, which read as a broken crop inside a 16:9 card. The media pass regenerates posters from
   the source frames rather than using the archive thumbnails as they are.
3. **The meter needed stepping.** An even segment field reads as a progress bar. Stepped heights
   read as metering. Documented in section 4.

Everything else in the proof (hero type at both widths, capability cards with a top hairline, the
gold play affordance over video, cream section against the espresso canvas) held up and needs no
change.
