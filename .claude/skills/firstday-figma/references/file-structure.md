# File structure and organization (as of 2026-10-19)

File: **Ideation - Brainstorming** (`figma.com/design/TY8jU8cHSr6NL2BoAV73CL`). It is the team's working file for quick fixes and ideation, not the design system itself.

## Pages: separators, parents and children
The page list is a visual table of contents built only with page names:
- A page named only `----` (or `---`, `-----`) is a **separator**. It has no content and divides groups.
- A page with a plain name and **no content** is a **group title**: `Homepage`, `Global`, `Content Blocks`, `PDP`, `Target`, `BFCM 2025`, `Minicart`, `Blog`, `Prototypes`, `Apps`, `Assets`, `Config`. Two use an emoji: `🤖 AI Playground`, `🅿️ Parking Lot`. The cover is `⬜️ Cover`.
- Real work lives in **child pages**, named with four spaces then an arrow: `    ↳ PDP Narrative`, `    ↳ Homepage v2`. Keep that exact prefix (four spaces and `↳ `) when you refer to or create a page.
- Order inside a group: newest or most important first; versions are in the name (`Homepage v2`, `Navigation v3`, `Buy Box | Multi-Tier`, `Screen Sizes | Final`).
- Unfinished work goes to the group `🅿️ Parking Lot` with the prefix `[DRAFT]` (`[DRAFT] Homepage v2`, `[DRAFT] WIP PDP Narrative`).
- Groups seen: Homepage (Homepage Changes, Homepage v2, Broad Hero v2 - Guidelines, Homepage Condensed Problem Section), Global (Navigation v3, Quiz, Search, Hamburger Menu v2, Navbar v2, Appbar Notifications, Subscription Modal, KDE Top Page ...), Content Blocks (Science Tabs, Benefits, Scientists), PDP (Buy Box variants, PDP Narrative, Tiered Benefits, 3-Steps-Cart, Price Per Day, Kids/Teens/Toddlers Switch, Unification Master Template, AOV A/B Tests ...), campaigns (BFCM 2025), Minicart, Blog, Prototypes (`[Desk]` and `[Mob]` prefixes), Apps (`[Desk] Stay.ai | Rivo Section`), Assets (Product Images), Config.
- `Config` holds **local building blocks of the pages** as components (Moving Images / Desktop and Mobile, Highlight Text, Hero Text Desktop, Line Marquee Desktop) with variant properties like `step=1`, `Position=1`, `Text=Kid`.

## Inside a page: one SECTION per flow
Each flow is one Figma **Section** (white fill) named like the work (`Homepage v2`, `Screen Sizes | Final`, `WIP - Content`, `Assets`). The PDP page has three: `Screen Sizes | Final` (the deliverable), `WIP - Content` (copy variants per audience) and `Assets` (images per audience). Inside a screen section, always the same layout (coordinates in px, section padding 100):

| Piece | What it is |
|---|---|
| Left card | Instance **`Flow Organizer`** `Type=Flow Start` (393 wide, full height, dark navy): the flow title and **one sentence** saying the goal (example: "Ideation for a new version of the homepage following the narrative of problem awareness.") |
| Column labels | Instances **`Flow Organizer`** `Type=Screen Title` at y=100, text `Desktop`, `Smaller Screen (1024px)`, `Mobile`, `Smaller Mob (320px)` |
| Breakpoint frames | At y=192 under their label, left to right: **Large Desktop 1512**, **Small Desktop 1024**, **Mobile 393**, **Small Mobile 320**. Names used: `Large Desktop`, `Small Desktop (1024px)`, `Mobile`, `Small Mobile`, or `Desktop` / `v2 Mobile` on the homepage |
| Notes | Instances **`Design Notes - Tooltip`** `Position=Right`, **yellow `#FFB511`**, placed beside the frame they talk about, one short imperative sentence each: "Hide the animation", "Decrease video size and spacing", "Break down pricing info", "Remove fruits image and reduce spacing/padding", "We need to setup a background color. When the screen is smaller than 1280px we fallback to the color" |

The flow always shows the same design in all four widths, so a reviewer scans a row.

## Anatomy of a breakpoint frame
- Frame fill `color/surface/white`, corner radius 12, clip content on, width exactly 1512, 1024, 393 or 320.
- First child: library instance **`Header / v2 Desktop`** (1512×100: a 36px `Notification Bar` filled `color/segment/men` with white text, then a 64px `Container` with padding 16/32) or **`Header / v2 Mobile`** (393×104). Last: **`Footer / v2 Desktop`** or **`Footer / v2 Mobile`**. Never redraw header or footer.
- Open menus and dropdowns of the header (`Shop Dropdown`, `Learn Dropdown`, `Language Dropdown`, `Hamburger Menu`, `Overlay`) are kept as separate frames **inside or beside** the screen so the flow documents them.
- The body is a vertical stack of **section frames**, one per content block (`Hero`, `Problem`, `Categories`, `Shop All`, `Trust`, `Video`, `Why Us`, `CTA`, `FAQ`, `Highlights Section`). Wave and band blocks are a frame with `itemSpacing -1` so the colored band overlaps its neighbor and no hairline shows.

## Layout numbers per breakpoint (read from the PDP)
| Breakpoint | Content width | Section padding (top/right/bottom/left) | Gap between blocks |
|---|---|---|---|
| 1512 | centered **1280** fixed, side padding 0 (sections `FIXED/HUG`), full-bleed bands 1512 | 40/0/64/0 (hero 40/0/40/0; some 64/0/44/0, 80/0/64/0) | 32 |
| 1024 | full width, **32** side padding | 40/32/64/32 (also 64/32/44/32, 80/32/64/32) | 32 |
| 393 | full width, **16** side padding (20 on "Why Us") | 32 to 52 top, 24 to 40 bottom, e.g. 52/16/32/16, 40/16/40/16 | 32 (24 inside a wrapper, 16 between small items, 20 in FAQ) |
| 320 | same as 393 | same as 393 | same as 393 |

Auto layout in practice (PDP desktop, 348 frames): 291 use auto layout; the sizing pair is mostly `FILL/HUG` (153) then `HUG/HUG` (59) and `FIXED/HUG` (41); fully `FIXED` only for the breakpoint frames and a few media boxes. Common gaps: 12, 16, 10, 4, 8, 32. Common paddings: 24, 12, 16, 32.

## Naming conventions to follow
- Name every frame for its role in the page: `Hero`, `Problem`, `Trust`, `CTA`, `FAQ`, `Why Us`, `Container`, `Content`, `Notification Bar`, `Cart Badge`, `Tag Icon`, `Arrow Icon`.
- Library components keep their library name (`Button / v2`, `Footer / v2 Mobile`).
- Variant property format: `Property=Value` (`Position=Right`, `Type=Screen Title`, `Text=Kid`).
- Separator and group page conventions above; `[Desk]` and `[Mob]` prefixes for per-device prototypes; `[DRAFT]` for parking lot.

## Debt observed: do not copy it
- About a quarter of frames keep default names (`Frame 1991532893`, `Frame 1991532894`) and the name `Shop All` is reused for ten different sections of the PDP (copy-paste from the homepage). Name sections for what they are.
- Headings and most body text are **not** bound to text styles (only 33% of the text on the PDP uses a style): sizes are typed by hand.
- Only 112 spacing properties are bound to variables against hundreds of raw numbers; some off-scale values appear (10, 44, 52, 102, 4.11, 6.86, 10.56, a radius of 1371) and some fills are raw `#ffffff`.
- Three versions of the same component coexist (`Button / v1` and `v2`, `Header v1` and `v2`, `Tabs v1` to `v3`, `Product Item v2` and `v3`): use the **newest** (`v2` header and footer, `Button / v2`, `Tabs / v3`, `Product Item / v3`) unless the page already uses an older one on purpose.
- The `Flow Organizer` default text still contains the placeholder names (`Lorem Ipsum`): always overwrite the title and the sentence.
