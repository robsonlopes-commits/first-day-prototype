# Figma MCP workflow, traps and rules (as of 2026-10-19)

## Tools that exist in this session (Figma MCP, official)
Read: `whoami`, `get_metadata` (structure XML, node or page), `get_screenshot` (returns a short-lived PNG URL, download with curl), `get_design_context` (reference code plus screenshot, **load the `figma-design-to-code` guidance first**), `get_variable_defs`, `get_libraries`, `search_design_system` (components, variables, styles of libraries), `get_figma_skill` (reads the official skills as `skill://figma/<name>/SKILL.md`; index at `skill://index.json`).
Write (do not use without owner approval, see Rule 0 of `SKILL.md`): `use_figma` (Plugin API JavaScript, also used for read-only inspection), `create_new_file`, `generate_image`, `upload_assets`, `send_code_to_figma`, `generate_diagram`, Code Connect tools, shader and generative plugin tools.
The official skills worth loading before the matching job: `figma-use` (mandatory before any `use_figma`), `figma-generate-design` (build a screen from the design system), `figma-design-to-code` (before `get_design_context`), `figma-generate-library`, `figma-code-connect`.

## Read-only inspection recipes (all verified on this file)
- List pages: `return figma.root.children.map(p => ({id: p.id, name: p.name, children: p.children.length}))`. (`get_metadata` with no node id lists only the first page.)
- A link's `node-id` can be a page: `await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('4444:15653'))` then read `page.children`. Switch pages **once per call** and reset every call.
- Structure of a frame: map `children` to `{name,type,w,h,layoutMode,padding,itemSpacing,layoutSizingHorizontal/Vertical}`; padding is `paddingTop/Right/Bottom/Left`.
- Variables in use: walk `findAll(() => true)`, collect `node.boundVariables` ids, resolve with `figma.variables.getVariableByIdAsync(id)` (name, `valuesByMode`, collection via `variableCollectionId`). Local-variable APIs return empty for remote library variables, so resolve by bound id.
- Text styles in use: `node.textStyleId` then `figma.getStyleByIdAsync` (name, fontName, fontSize, lineHeight, letterSpacing).
- Component usage: for each INSTANCE `await n.getMainComponentAsync()`; `mc.remote` tells library or local, `mc.parent.type === 'COMPONENT_SET'` gives the set name.
- Visual: `get_screenshot` (max 65536 px, use 2400 to 4800 for tall frames) then `curl -sL -o file.png "<url>"` into the scratchpad (the URL is short-lived, treat it as secret), then Read it; slice tall PNGs with `sips -c <h> <w> --cropOffset <y> <x>`.

## Traps found in this environment
1. **Non-ASCII text breaks the transport.** Returning `characters` or names that contain emoji, non-breaking spaces or curly characters made `use_figma` fail with `Failed to parse SSE message ... Invalid JSON`. Sanitize everything you return: `String(s).replace(/[^\x20-\x7e]/g, '')` and avoid returning node text unless needed. This is the fix that worked (the same scripts succeeded right after sanitizing); the exact offending character was not isolated. The page list with `↳` and emoji names came back fine in a small output.
2. **Huge responses die.** `get_metadata` on a page with thousands of nodes failed at about 440 KB. Read a section or a breakpoint frame instead, or use targeted scripts that return counts and top-N tables.
3. **`figma.mixed` is a Symbol.** Reading `fontSize`, `fontName`, `cornerRadius`, `strokeWeight`, `lineHeight` on mixed nodes returns a symbol; string concatenation throws `cannot convert symbol to string`. Guard with `typeof x === 'number'` or `x && x.style`.
4. **Check the file lists libraries before searching**: `get_libraries` then scope `search_design_system` with `includeLibraryKeys`.
5. `figma.notify`, `loadAllPagesAsync`, `setPluginData`, `createImageAsync` are not supported. Colors are 0 to 1. `await` every promise. Load fonts (`Sofia Pro VAR`, exact style strings such as `Semi Bold`) before writing text, verify with `listAvailableFontsAsync`, never default to Inter.
6. Rate limits: if file access or limits are odd, call `whoami`.

## Rules learned from the official skills and community skills
Sources: Figma's `figma-use` and `figma-generate-design` skills (read through `get_figma_skill`), the open `figma/mcp-server-guide` repo, OpenAI's curated `figma-create-design-system-rules`, and the community plugin `schudarin/chudarin-design-skills` (plan-user-flows, audit-design-system, design-screens, figma-fix-variable-bindings, a pack of recorded Plugin API failures). What we take from them:
- **Search before you build.** Components, variables and styles come from the library; never draw boxes with hex colors when a token exists. Hardcoding is the exception and must be called out.
- **Discover conventions first.** Inspect the file (pages, components, variables) and match naming, sizing and layout of the existing screens before creating anything.
- **Use auto layout for any container with related children**; append the child to its auto-layout parent first and only then set `FILL` or `HUG`; `resize()` before sizing modes; wrapping text needs a fixed width with auto height.
- **Build top-down, section by section** inside a wrapper frame, returning created node ids from every write; never create sections at page level and reparent them later.
- **Read back what you set.** After binding variables or text styles, read the binding back instead of assuming it applied (the community plugin was born from silent failures: a variable that never bound, a component set deleted when its last variant moved).
- **Edit approved work one element at a time**, not the whole screen around it.
- **Componentize repeated elements on the first pass** (build one local component, place instances); icons come from the library or from importing the SVG, never from rotated primitives.
- **One composition screenshot at the end**, one after a visual fix; look for clipped text, overlaps, placeholder text left ("Title", "Lorem Ipsum") and the wrong font family.
- **Plan before drawing.** List the screens, states and breakpoints, and give each flow a section with a one-sentence goal (our `Flow Organizer` card does exactly that).
- **Ask little, remember answers.** At most two questions when context is missing, and write the answers into the repo so they are not asked again (that is what this skill and `owner-feedback-log.md` are for).
- **Audit before repairing**: a read-only report of hardcoded or detached values first; rebinding only with approval (here: only with the owner's explicit approval, Rule 0).
- A Figma file is **representation**, the code is **implementation**: translate intent, not pixels. Keep the two aligned through tokens, as `tokens-and-styles.md` does.

## From a Figma frame to this prototype
1. Load `figma-design-to-code` guidance, then `get_design_context` for the section (not the whole page) and take the screenshot as truth for layout.
2. Replace every raw value in the reference code with the repo token that matches (`tokens-and-styles.md` map); reuse existing production sections (`firstday-design` Rule 0) and the data files pattern.
3. Fonts: `sofia-pro` from the existing Typekit file. Images: generated or from `public/assets`, following `firstday-imagegen`. Copy: `firstday-copy` and the facts of `firstday-brand-knowledge`.
4. Respect the repo-only rules that Figma does not enforce: minimum 12px font, pill only for buttons, 4px chips, no shadows, mobile first at 375, content grid 1200.
5. Compare in the browser at 1440 and 375 against the screenshot before saying done.

## Refreshing this skill
Re-run the read-only recipes on `PDP Narrative` and `Homepage v2` (or on a new page the owner points to): page list, section and frame structure, variable and style tables, component usage, the four breakpoint paddings. Update the dates, mark values that changed, keep a short changelog line below.
- 2026-10-19: first version, from `PDP Narrative` (`4444:15653`) and `Homepage v2` (`812:45`).
