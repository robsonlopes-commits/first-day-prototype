# Libraries and components (as of 2026-10-19)

## Libraries linked to the file (`get_libraries`)
| Library | Source | What it gives | Key (for `includeLibraryKeys`) |
|---|---|---|---|
| **Design System - First Day** | team | Components, the `Styles` variables, the `Paragraph/...` text styles. The one to use for everything | `lk-eb8154ec83638b4145bbf590536cd35aac6281acfbbf591f4eb2c00c5f7cdeacb4458cbe669a0a2a28ef16434f92dfb7d9a2ca3140ef80284cd3941f96a3ba38` |
| **Broad Screens** | team | Complete page templates, for example `PDP / Magnesium / Men / Mobile v1` | `lk-a1478d0edb23db26b76c255a8d355e917869e1bc3b4eef105c86e6d6959850cc5d51275a901e022114975162524d4b66970f1fdc6397e6e1b23279d2d4372e9f` |
Also found by `search_design_system` but **not linked to this file**: `First Day | Component Library` (older, e.g. an old `Header`, `Labels`, `Fill | Shape` shapes) and `First Day | Product Assets Library` (product photos, `WDS Bottle Floating Angle`, `Group Photos | Multis + Gummies`). Treat them as legacy or asset sources; prefer the linked library, and only add one if the owner asks. Community kits (Material 3, iOS, macOS ...) are available to add but are irrelevant here.
Library items are reached by **search**, so the file path in a result (`design_systems/Design System - First Day/components/Button / v2`) is the component's name and library.

## Component families in `Design System - First Day`
Use the newest version of each family (older ones stay for old pages):
- **Header**: `Header / v2 Desktop`, `Header / v2 Mobile` (v1 exists). **Footer**: `Footer / v2 Desktop`, `Footer / v2 Mobile`.
- **Button**: `Button / v2` (newest), `Button / v1`. **Link**, **Quantity Selector**, **Input Text**, **Badge** (component set), **Display**.
- **Tabs**: `Tabs / v3` with `Config / Tabs Item v3`; v2 has Desktop and Mobile variants with `Config / Tab Item Desktop|Mobile`.
- **Product Item**: `Product Item / v3 Desktop`, `v3 Mobile` (also v2 Horizontal, Vertical and Mini, Desktop and Mobile), with `Config / Item Action` and `Config / Quick CTA`.
- **Content blocks**: `Content / v1 / Hero Block`, `Content / v1 / Image Accordion Block`.
- **Annotation helpers (documentation, not UI)**: `Flow Organizer` (`Type=Flow Start` and `Type=Screen Title`), `Design Notes - Tooltip` (`Position=Right`, description "Annotations & Helpers - Use these tooltips for technical breakdowns"), `Decision`.
- **Phone chrome**: `iOS / Browser - Safari`, `iOS / Safari Header Desktop`, `iOS / Keyboard`.
- **Icons**: components named `<Name> <Fill|Outline>`, for example `Star Fill`, `Arrow Right`, `Plus Outline`, `Close Fill`, `Close Outline`, `Chevron Left Outline`, `Chevron Right Outline`, `Chevron Down Outline`, `Caret Down Fill`, `Play Fill`, `Check Fill`, `Check Outline`, `Tag Shopping Fill`, `Cart Outline`, `Menu Outline`, `Mail Fill`, `Visibility Fill`, and social logos (`Facebook`, `Instagram`), plus `Logo`.

## What the pages use most (instance counts)
PDP desktop (60 instances, 58 from the library): `Star Fill` 10, `Arrow Right` 6, `Button / v1` 6, `Button / v2` 5, `Plus Outline` 5, `Close Fill` 4, chevrons, `Logo`, `Header / v2 Desktop`, `Footer / v2 Desktop`, `Badge`, `Input Text`. Homepage desktop: `Button / v2` 12, `Star Fill` 10, `Close Outline` 10, `Config / Tabs Item v3` 9, `Product Item / v3 Desktop` 4, `Config / Item Action` 4, `Tabs / v3` 2. So the page body is mostly **custom frames**, with the library giving header, footer, buttons, tabs, product cards, icons and badges.

## Local components of the file (not in a library)
On the `Config` page: `Moving Images / Desktop` and `/ Mobile`, `Highlight Text` (`Text=Kid|Text2|Text3`), `Hero Text Desktop`, `Line Marquee Desktop` (`Position=1|2`), plus page-level ones like `Ingredients`. They exist because the hero animates (moving images, marquee, highlighted word). A design note on the homepage says "Hide the animation" for the smaller screen: static versions are expected on small breakpoints.

## How to look for a component
1. `search_design_system` with `entity: "component"`, **one intent per query** (`Button`, `Badge`, `Product Item`, `Tabs`), scoped with `includeLibraryKeys` of the First Day library. Do not combine synonyms in one query. A search for `Heading` or `Display` styles returns nothing (no heading styles exist).
2. Prefer a component **set** and pick the variant by property (`Type`, `Position`, size); read its text properties from `componentProperties` of a temporary instance before overriding text.
3. If nothing fits, build a local frame with auto layout and tokens, name it by role, and say it is new.
