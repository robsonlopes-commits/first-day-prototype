# QA checklist and scripts (run in the Browser pane on the dev server)

Reset the viewport to desktop afterwards. Use `document.documentElement.style.scrollBehavior='auto'` before `scrollTo`. Test desktop (1440 wide) and mobile (375 wide); iframes and third party widgets load late, wait 2 seconds.

## Always
1. **Fonts**: list `getComputedStyle(e).fontFamily` of every element with text, in `document` and in each `iframe` (`contentDocument`); everything must start with `sofia-pro` (a few `visually-hidden` spans can be ignored but were forced too). No Gelica, Fredoka, Lora, Open Sans, Arial, Helvetica.
2. **Shadows**: walk `.ss-page *` and `::before/::after`, `boxShadow` must be `none` (count 0); no `drop-shadow` filter in the CSS.
3. **Heading weight**: every h1 to h6, `.accordion__title`, `.summary__title`, Judge.me titles computed `700`.
4. **Widows**: for each `h2`, group the word rects by `top`; the last line must have 2 or more words (`®` counts as a false positive).
5. **CTAs in title case**: list buttons and links of action (`button, a.button, a[class*=btn], .fd-btn, .jm-button`); the text shown (apply `text-transform`) must be Title Case.
6. **Section rhythm**: for each section measure the top of the first content element and the gap under the last; they must equal `--ss-pad` (75px) except the tuned ones.
7. **Wave seams**: zoom on each wave junction (no 1px line, the wave color equals the section color, no white strip between colored sections).
8. **Stickers**: open every bubble (`classList.add('is-on')`) and check it is inside the picture rect; characters not covering the bottle label or legal text.
9. **Pictures**: every `img` of a picture slot is a file (no HTML montage); 16px radius; no white border around the gallery frame.
10. **Bottle images**: lid and label crops at full size, ratio taller than wide, size against the reference object (see `firstday-imagegen`).
11. **Mobile at 375**: no horizontal scroll, counter on its own row, stats 2x2, Gang wraps, lamp hidden, closing hero shows the picture under the text if changed.
12. **Console**: no errors; `npx vite build` passes.

## Added after the second page
13. **Every seam, both viewports**, scroll with `window.scrollTo({top, behavior:'instant'})`; list `.ss-seam` positions and view each. Neighbor colors must differ; no white sliver; special bands checked.
14. **Full width stickers in px** (hero): open the bubble (`.click()` on the sticker button), confirm it does not cover a face, label or button at 1024 and 375.
15. **Headings are rewrites** (cover the interjection test), "Ah ah ah" only from the Count, no widows, numerals with hyphens joined (U+2060).
16. **Computed value of every override** (specificity vs section ids).

## After every CSS edit
A missing `}` or a dangling selector (a rule whose block was deleted by a bad replace) silently swallows the next rule or media query: the phone styles of Meet The Gang stopped applying at 630px that way. Check at 375, 630 and 1024 wide, and read the computed styles when a rule does not apply. A missing `}` breaks the whole stylesheet: run `npx vite build` and read the line of the error. When appending with a shell chain, check each command ran (a failed `sed` earlier in a `&&` chain silently skipped the appended CSS once).

## Do not forget
- The mascot Elmo and the confetti are fixed layers: they appear in screenshots and are not bugs.
- Judge.me, FrontrowMD, cart drawer are third party or shared: fix with scoped CSS (`.ss-page`, `body.sesame-street`), never edit the shared component.
