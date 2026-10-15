---
name: firstday-imagegen
description: Generate raster images (backgrounds, scenes, textures, lifestyle settings) for the First Day prototype pages with the Gemini API (Nano Banana). Use when a page needs a new image that does not exist in production yet. Never for product packaging or faces.
---

# First Day image generation

Script: `npm run image -- --prompt "..." --out <name> [--ref <png> ...] [--aspect 16:9] [--size 1K] [--model lite|pro] [--dry-run]`
Default model `gemini-nano-banana-2.1` (the docs recommend it for new projects, same 1K price as Lite). `--model lite` is the cheapest but is not built for reference images. Output goes to `public/assets/custom/<name>.png`, the prompt is logged in `public/assets/custom/PROMPTS.md`, and the page uses it with `customImg('<name>.png')` from `src/lib/assets.js`.

## Setup (once, done by the human)
Key in `.env.local` as `GEMINI_API_KEY=...` (gitignored; the repo is public). Never print, read back or commit the key. If the script says the key is missing, stop and tell the user.

## Cost discipline (paid API, org cost rules apply)
- Always run once with `--dry-run` first and show the estimated cost.
- Generate ONE draft at 1K, show it, and only then produce finals or variations. Ask before any batch of more than 4 images or any 2K/4K output.
- Re-use existing images when they fit: check `public/assets/shop`, `public/assets/custom`, and the production pages before generating.

## What to generate, what never to generate
- Good: soft backgrounds, kitchen counters and tables, breakfast and lunchbox scenes without people, textures, color fields, props, light and shadow, composition plates where a real product cutout is placed afterwards.
- Never generate the product packaging. The model invents wrong labels and text. Real products come from the cutouts in `public/assets/shop` (for example `kids-multi.png`, `teens-brain.png`) passed with `--ref`, or composited in code on top of a generated scene.
- Never generate faces or children and avoid people. If a page needs people, ask the human to supply real photos (legal and brand review needed for AI-generated people on a health brand).
- No text, logos, labels, claims, numbers or badges inside generated images. Text is HTML.
- No medical imagery or claims (pills, doctors, before/after).

## Prompt recipe
Start from this base and add the scene: "Clean bright editorial photo, soft natural window light, airy white and light blue palette with accents of noon blue (#476DED), shallow depth of field, uncluttered, plenty of empty space for text, no text, no logos, no people, no packaging." State the use ("hero background, 16:9, empty left third") and the aspect ratio with `--aspect` (1:1, 4:5, 16:9, 9:16).
When using references: "Use the attached product exactly as is. Do not change its label, shape or colors. Place it in ..." (the model may still alter details, so inspect the result).

## After generating
1. Open the PNG and check it: no garbled text, no extra labels, no faces, on brand (bright, clean, white/blue). Reject and retry with a fixed prompt if not.
2. Wire it with `customImg(...)` following the `firstday-design` skill (white page, sofia-pro, no shadows).
3. Keep files reasonable: prefer 1K, and if a PNG is larger than about 1.5 MB, tell the human (repo size, page speed).
4. Note the generated asset in the summary so the human knows it is AI-generated.
