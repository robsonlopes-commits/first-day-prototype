# Tokens and text styles (as of 2026-10-19)

All variables live in **one remote collection named `Styles`, single mode (`Mode 1`)**, published by the library `Design System - First Day`. Every variable has the scope `ALL_SCOPES` (they pollute every picker). There is no light/dark mode and no desktop/mobile mode: responsive type is solved with **separate text styles** per device.

## Variables actually used on the PDP and the Homepage
**Colors**
| Variable | Value | Used for |
|---|---|---|
| `color/brand-primary/noon-blue` | `#476DED` | primary buttons, links, accent words, blue bands |
| `color/brand-primary/late-noon-blue` | `#5368C2` | hover and deeper brand blue |
| `color/surface/white` | `#FFFFFF` | frames, cards |
| `color/surface/morning-blue` | `#F2FBFF` | page canvas, soft sections |
| `color/surface/late-morning-blue` | `#E4F5FF` | chips, soft cards, highlighted rows |
| `color/text/on-light-surface-1` | `#2C3D50` | headings and body (by far the most used) |
| `color/text/on-light-surface-2` | `#737373` | secondary text, struck prices |
| `color/text/on-dark-surface` | `#FFFFFF` | text on blue or navy |
| `color/helper/outline` | `#D7EFFA` | the 1px card and divider stroke |
| `color/helper/black-5`, `black-10`, `black-75` | black at 5%, 10%, 75% | hairlines, overlay (75%) |
| `color/feedback/success`, `error` | `#078942`, `#D24343` | savings, errors |
| `color/segment/kids`, `men`, `toddlers` | `#FFB511`, `#5368C2`, `#00847C` | audience accents (the men color is also the notification bar) |
| `color/product/multi`, `magnesium` | `#64DAA1`, `#776CB1` | product accents (tribiotic and brain colors exist in the repo kit) |

**Spacing** (FLOAT): `spacing/tiny` 4, `nano` 8, `xxxs` 12, `xxs` 16, `xs` 20, `sm` 24, `md` 32, `lg` 40. Also in the library, not seen bound on these pages: `xl`, `xxl`, `xxxl`, `huge`, `giant` (this repo's kit uses 48, 56, 64, 72, 80 for them).
**Radius**: `radius/none` 0, `extra-small` 4, `small` 8, `medium`, `large`, `extra-large` (values not read), `full` 1000.
**Border width**: `border/thin` 2, `border/heavy` 8 (used on the homepage for outlines and rings).

## Text styles (library, type TEXT)
Naming: `Paragraph/<Regular|Semibold|Bold>/<XS|SM|MD|LG|XL>/<Desktop|Mobile>`. Font `Sofia Pro VAR`, **line height 140%**, letter spacing 0.
| Size | Desktop | Mobile |
|---|---|---|
| XS | 14 | 12 |
| SM | 16 | 14 |
| MD | 18 | 16 |
| LG | (20 in the repo scale) | 18 |
| XL | (22 in the repo scale) | (20) |
Read directly: Regular XS desktop 14 and mobile 12, Regular SM 16 and 14, Regular MD mobile 16, Regular LG mobile 18, Bold MD desktop 18, Semibold XS 14 and 12, Semibold SM 16 and 14, Semibold MD desktop 18. The sizes in parentheses come from the repo kit, not from a read of the style.
Most used on the pages: `Paragraph/Regular/XS/Desktop` (24 uses), `Semibold/XS/Desktop` (18), `Regular/SM/Desktop` (31 on the homepage), `Bold/MD/Desktop` (12 on the homepage).

## Headings and display text have no style: typed by hand
What the pages really use (read on the Homepage v2):
| Role | Desktop | Mobile |
|---|---|---|
| Hero display | **52px Black, line height 130%** | **29px Black, 130%** |
| Section title | **32 to 38px Semi Bold, line height 140%** (34px and lh 130% in some blocks), the highlighted part is bold in a second color (mixed styles inside one text node) | **26 to 28px Semi Bold, 140%** (24 and 22 also appear) |
| Body (unstyled) | Light 16/150% (most common), Light 14/150%, Bold 14/150%, Black 18/150% | same sizes minus 2 |
Title pattern: first line plain dark navy, second line the highlight in a brand color and bolder. This matches the title pattern of the prototype pages.

## Strokes, radius, effects
- Card stroke: **1px `color/helper/outline`** (30 uses) on frames with radius **8**. Radius counts on the PDP desktop: 8 (72), 4 (23), 12 (4), full (13). Hairline black strokes appear on a few controls.
- **Shadows: practically none** (one drop shadow with blur 0, one layer blur and one background blur in the whole desktop frame). Do not add shadows.
- Chips and badges: radius 4 (`extra-small`). Cards: 8. Large framing or breakpoint frame: 12. Buttons and tabs: `radius/full`.

## Map to this repo (`src/styles/ui-kit.css`)
The prototype kit was rebuilt from the same sources, so the names line up:
| Figma variable | Repo CSS token |
|---|---|
| `color/brand-primary/noon-blue` | `--color-brand-noon-blue` |
| `color/brand-primary/late-noon-blue` | `--color-brand-late-noon-blue` |
| `color/surface/white`, `morning-blue`, `late-morning-blue` | `--color-surface-white`, `-morning-blue`, `-late-morning-blue` |
| `color/text/on-light-surface-1`, `-2`, `on-dark-surface` | `--color-text-on-light-1`, `-2`, `--color-text-on-dark` |
| `color/helper/outline`, `black-5`, `black-10`, `black-75` | `--color-helper-outline`, `--color-helper-black-5`, `-10`, `-75` |
| `color/feedback/success`, `error` | `--color-feedback-success`, `--color-feedback-error` |
| `color/segment/kids` | `--color-segment-kids` |
| `color/product/multi`, `magnesium` | `--color-product-multi`, `--color-product-magnesium` |
| `spacing/tiny ... lg` | `--spacing-tiny` 4, `-nano` 8, `-xxxs` 12, `-xxs` 16, `-xs` 20, `-sm` 24, `-md` 32, `-lg` 40 |
| `radius/extra-small`, `small`, `full` | `--radius-sm` 4, `--radius-md` 8, `--radius-pill` (buttons) |
| `Paragraph/<w>/<size>/Desktop|Mobile` | `--font-para-<size>-desk` and `-mob` (same pairs: xs 14/12, sm 16/14, md 18/16, lg 20/18, xl 22/20) |
| hand-typed titles 38/52 desktop, 32/29 mobile | `--font-title-xxl` (38 desk, 32 mob), `--font-title-xxxl` (52 desk, 40 mob) |
The repo's own rules win over a Figma value when they differ (the owner fixed the minimum font size at 12px, pill shape only for buttons, 4px chips, no shadows, title pattern navy plus purple bold, content grid 1200 with 16px gutters). Say so when a Figma frame conflicts with `firstday-design`.
