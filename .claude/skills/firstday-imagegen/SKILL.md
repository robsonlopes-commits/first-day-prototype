---
name: firstday-imagegen
description: Generate raster images (lifestyle scenes, children and families, products, backgrounds, text inside images when needed) for the First Day prototype pages with the Gemini API (Nano Banana). Use when a page needs an image that does not exist yet. These are exploration mockups to evaluate concepts before investing in real photo shoots.
---

# First Day image generation

Script: `npm run image -- --prompt "..." --out <name> [--ref <png> ...] [--aspect 16:9] [--size 1K] [--model lite|pro] [--dry-run]`
Default model `gemini-nano-banana-2.1` (the docs recommend it for new projects, same 1K price as Lite). `--model lite` is the cheapest but is not built for reference images. Output goes to `public/assets/custom/<name>.jpg` (the API only returns JPEG), the prompt is logged in `public/assets/custom/PROMPTS.md`, and the page uses it with `customImg('<name>.jpg')` from `src/lib/assets.js`.

## Setup (once, done by the human)
Key in `.env.local` as `GEMINI_API_KEY=...` (gitignored; the repo is public). Never print, read back or commit the key. If the script says the key is missing, stop and tell the user.

## Cost discipline (paid API, org cost rules apply)
- Show the estimated cost per image (the script prints it). The owner pre-approved generating as many images as a task needs (a few cents each); keep a running count and report the total.
- Draft at 1K. Prefer 1K for everything (hero images at 16:9 1K are enough for the prototype); use 2K only when a large full-bleed hero looks soft.
- Re-use existing images when they fit: check `public/assets/shop`, `public/assets/custom`, and the production pages before generating.

## Purpose and what is allowed
The owner uses AI images to explore concepts visually BEFORE paying for real photo shoots. They are mockups: realistic enough to judge emotion, composition and fit. The owner explicitly approved all of the following, no further permission needed:
- Children and families in everyday moments, including children eating or holding gummies, vitamins and supplements.
- AI-generated product images (bottles, packaging, products in hands, on tables, in lunchboxes). For packaging accuracy, pass the real product cutouts from `public/assets/shop` (for example `kids-multi.png`, `kids-prob_4b7651d5-86e6-4eb3-8d96-e6d26e57c0e4.png`, `kids-brain.png`, `kids-mag.png`, and the `teens-`, `woman-`, `men-` equivalents) with `--ref` and ask the model to keep the label exactly. Perfect fidelity is not required for a mockup, but check that it looks like First Day.
- Text inside the image when it is needed (a note, a sign, a label, an infographic headline). Keep it short and spelled correctly; check the result carefully.
- Any scene that serves the story: kitchens, school, bedtime, sports, offices, outdoors.

## Guardrails that still apply
- Dignified, everyday, fully clothed, diverse people; no real person's likeness or celebrity; nothing sexual, violent, frightening or humiliating; no distress beyond mild everyday frustration.
- Do not generate regulated health claim imagery (before/after transformations, medical or disease claims, doctors vouching, fake certifications or awards). If a concept needs one, flag it to the owner instead.
- Every AI image is a MOCKUP: say so in the final summary, keep the prompt in `PROMPTS.md`, and never present it as real photography. Replacing it with real photography is the expected next step.
- If the API refuses a prompt, rephrase to a safer everyday scene. Never try to bypass a refusal.
- Inspect every result with the Read tool: reject warped faces or hands, uncanny teeth, wrong or garbled text, and anything off-brand.

## Prompt recipe
Start from this base and add the scene: "Clean bright editorial photo, soft natural window light, airy white and light blue palette with accents of noon blue (#476DED), shallow depth of field, uncluttered. Add 'plenty of empty space for text' for backgrounds, and state explicitly when you do want people, products or text in the image." State the use ("hero background, 16:9, empty left third") and the aspect ratio with `--aspect` (1:1, 4:5, 16:9, 9:16).
When using references: "Use the attached product exactly as is. Do not change its label, shape or colors. Place it in ..." (the model may still alter details, so inspect the result and retry if the label drifts too far).

## After generating
1. Open the image and check it: no garbled text, no extra labels, no faces, on brand (bright, clean, white/blue). Reject and retry with a fixed prompt if not.
2. Wire it with `customImg(...)` following the `firstday-design` skill (white page, sofia-pro, no shadows).
3. Keep files reasonable: prefer 1K, and if a JPG is larger than about 1.5 MB, tell the human (repo size, page speed).
4. Note the generated asset in the summary so the human knows it is AI-generated.
