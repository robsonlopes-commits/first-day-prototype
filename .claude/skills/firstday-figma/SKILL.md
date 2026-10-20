---
name: firstday-figma
description: How the First Day design team works in Figma and how to read it, reuse it and (only when approved) add to it. Covers the file "Ideation - Brainstorming" (page organization, sections, breakpoint frames, Flow Organizer labels and Design Notes), the libraries to link (Design System - First Day, Broad Screens), the variables and text styles that are really used on the new PDP and the new Homepage, auto layout and spacing habits, naming, and the Figma MCP workflow with its traps. Use whenever a task mentions Figma, a Figma link, tokens, text styles, components from the library, translating a design to the prototype, or organizing or writing into a Figma file. The design system is partly outdated: this skill records what the team does in practice and flags what not to copy.
---

# First Day in Figma

Learned on 2026-10-19 by reading the two pages the owner pointed to (`PDP Narrative` and `Homepage v2`, both in the file **Ideation - Brainstorming**, file key `TY8jU8cHSr6NL2BoAV73CL`). The design system is not fully reliable or up to date, so this skill is based on **what the pages actually do**, not on what the library promises. Re-check against the live file before relying on a number: everything here carries the date above.

## Rule 0: Figma is read-only unless the owner says otherwise
The organization forbids editing, deleting or manipulating data on its platforms. For Figma that means:
- Use only read tools (`get_metadata`, `get_screenshot`, `get_design_context`, `get_variable_defs`, `get_libraries`, `search_design_system`) and **read-only** `use_figma` scripts (inspection that returns data and mutates nothing).
- Never rename, move, delete, restyle, rebind or republish anything that exists (nodes, components, variables, styles, pages).
- Writing is allowed only to **create something new** (a new file, or a new page or section clearly named for the work) and only after the owner agreed to that specific creation. Say what you will create, where, and the cost if any. Never touch the pages of the team.
- Never put secrets or personal data into a file. Figma links and node ids are fine to keep in the repo.

## Quick facts (memorize these)
- Fonts: **Sofia Pro VAR** (Light, Regular, Medium, Semi Bold, Bold, Black). Never Inter, never Gelica.
- Breakpoints designed, in this order: **Large Desktop 1512**, **Small Desktop 1024**, **Mobile 393**, **Small Mobile 320**. Mobile first in importance (95% of traffic), but the sheet always shows all four.
- Page canvas color `#F2FBFF` (morning blue). Breakpoint frames are white, radius 12, clip content.
- One variable collection (`Styles`, single mode): colors, spacing, radius, border. Text styles are named `Paragraph/<Weight>/<Size>/<Desktop|Mobile>`; **there are no heading styles**.
- Cards: radius 8, 1px stroke `color/helper/outline` (#D7EFFA), **no shadows**. Chips radius 4. Buttons and pills fully round.
- Auto layout everywhere; children mostly `FILL` wide and `HUG` tall.
- Libraries linked to the file: **Design System - First Day** (components, variables, text styles) and **Broad Screens** (full PDP templates). Always search these before drawing anything.

## What to read next
| Need | File |
|---|---|
| Where things live: pages, sections, frames, Flow Organizer, Design Notes, naming | `references/file-structure.md` |
| Tokens and text styles with values, headings, spacing, radius, strokes, and the map to this repo's CSS tokens | `references/tokens-and-styles.md` |
| Libraries, component families and versions, icons, local Config components | `references/libraries-and-components.md` |
| Tools, read-only scripts, the traps of this MCP, rules learned from the official and community skills, how to turn a frame into the prototype | `references/mcp-workflow.md` |

## Workflow in four moves
1. **Locate.** A link's `node-id` can be a whole **page** (the two links of the owner are pages). List pages with a read-only `use_figma` (the `get_metadata` without a node id shows only the first page). Open the section of the flow, not the page root.
2. **Look before you read.** `get_screenshot` of the section (download the PNG with curl to the scratchpad, then Read it, slice tall images with `sips`). Then read structure and tokens with small, targeted `use_figma` scripts. Huge `get_metadata` calls break the transport.
3. **Reuse.** For anything visual, search the library (`search_design_system`, one intent per query, `includeLibraryKeys` of the First Day library) and use its components, variables and text styles. Match what the page does, and **do not copy the debt** listed in `references/file-structure.md` (generic names, unstyled headings, off-scale spacing).
4. **Translate to the prototype** with the project's own tokens (`src/styles/ui-kit.css`) and the `firstday-design` skill, never with raw values copied from a screenshot. Images and copy follow `firstday-imagegen` and `firstday-copy`.

## Reference to study: how a modal is organized inside the device frames
Page `    ↳ Add-on Popup` of **Ideation - Brainstorming** (node `6490:12674`, `figma.com/design/TY8jU8cHSr6NL2BoAV73CL/Ideation---Brainstorming?node-id=6490-12674`, read 2026-10-20). It shows the pattern to follow for any popup, drawer or modal: the page background is the real page, the modal sits on top, and there are only two frames (`Desktop` and `Mobile`). Details and numbers are in `references/file-structure.md` (section "Modal pages: the Add-on Popup pattern"). The same design also lives in the file Internal Drafts (`ZMjZEkGEfq5vCpfQMjFS8A`, page `↳ Add-on Popup` `1793:38`) and the prototype exploration `/explorations/bundle-add-on` was built from it.

## Where the numbers come from
Every value in the references was read from these nodes (page ids): PDP Narrative `4444:15653` (section `Screen Sizes | Final` `5048:1031`, frames `Large Desktop` `5048:2121`, `Small Desktop (1024px)` `5048:2694`, `Mobile` `5561:16908`, `Small Mobile` `5048:1579`) and Homepage v2 `812:45` (section `1705:19355`, desktop `2439:67369`, mobile `2488:82063`). If you refresh this skill, re-run the scripts described in `references/mcp-workflow.md`, update the date and keep the old values only when they still hold.
