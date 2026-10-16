---
name: firstday-whats-new
description: Living, dated snapshot of what First Day is testing and pushing right now: the pages getting the most traffic and how they perform, the angles and arguments in use, new products and offers, and the new scientific concepts from the October 2026 presentation (Bio-Matched, inside and outside the body, the 10 nutrient doses and more). Use when ideating new pages or sections, choosing an angle or argument, writing a claim that goes beyond the stable brand base, or when the owner asks what is new or what is working. For stable company, product and copy-style knowledge use `firstday-brand-knowledge`. Everything here has a date: check it against the live site before relying on it.
---

# First Day, what is new and what is being tested

Snapshot date: **16 Oct 2026**. Sources: the owner's daily top pages report (Fri 16 Oct 2026, day over day), the live site crawled the same day, and the owner's presentation "First Day Copy Sections Examples" (12 slides, Oct 2026). Files:
- `references/top-pages-2026-10-16.md` — the 15 pages with traffic, conversion and what each one is (angle, format, what to learn).
- `references/bio-matched-deck.md` — the scientific content of the presentation, slide by slide, with the status of each claim.
- Refresh procedure below. Update the snapshot date and the tables whenever the owner sends a new report.

## Rules for using this skill
1. **Material, not style.** The presentation's copy was tested and was too verbose, so it did not perform well. Use its science, numbers and concepts as material. Write the words in the style of the live landing pages (`firstday-copy`, with the live landing pages as voice reference).
2. **New and unproven means pending.** Concepts marked PENDING (Bio-Matched as a named method, "first invented by First Day", the doses, the timeline percentages, the before/after family stories, "microplastics cross the blood-brain barrier", "59% of processed foods block magnesium absorption") are not confirmed for production use. In explorations you may use them as ideas; flag them as pending in your summary and never present them as approved claims.
3. **Ask which audience.** Before extending anything to another demo, ask the owner (see `firstday-design`).
4. **Date everything you add.** Add new angles at the top of "Angles in play" with the month.

## The big picture (Oct 2026)
- Traffic is concentrated on the **Teens' Multi PDP** (8,991 sessions, up 68% day over day) and the **Kids Behind the Science landing page** (5,495). Teens traffic is huge but conversion is low (2.7%, bounce 76%); Kids PDP converts better (4.3%) and the Home converts at 4.5%.
- The **Sale page** is the best converter (7.7% conversion, 21.7% add to cart) on modest traffic: shoppers who arrive there already want a deal.
- **Long form or advertorial landers convert worst** right now (3 Red Flags women 0 checkouts, 4 Vitamins I Wish I Never Bought 0, Teens hidden hunger LP 1 checkout from 708 sessions, Toddlers LP 0.6%). Cause is unknown; the common factor is high bounce (74 to 86%).
- The bundle quiz is small but growing (225 sessions, checkouts +400%) and the All-in-1 bundle exploration builds on this idea.

## Angles in play
1. **Hidden hunger as the root cause** (UNICEF, over 50% of teens or kids affected, "an invisible threat", "30 day nutrition challenge"). Used on the Teens hidden hunger LP.
2. **"It is not a phase, it is a nutrient gap"**: mood swings, tantrums, focus gaps, picky eating, trouble sleeping each linked to a specific nutrient (B6, folate, B1/B2, magnesium).
3. **Teen brain under construction** (NEW, blog): the prefrontal cortex matures in the mid 20s, choline is the nutrient parents never heard of (about 90% of Americans fall short), ultra-processed food delivers little choline. Candidate angle for the Teens multi and Teens Daily Focus.
4. **Methylfolate versus folic acid** (up to 40% of kids cannot convert synthetic folic acid, MTHFR). Used on the Kids LP, the Teens hidden hunger LP and the new deck.
5. **Right dose for the right age**: most brands give a 4 year old a 17 year old dose, push B6 past 100% DV, scale adult doses down. First Day doses to the age.
6. **Picky eating and the 21 superfoods**: "nutrients from foods most picky eaters won't touch".
7. **Daily Focus, melatonin free sleep, tribiotics** as the second purchase: brain support (Cognizin, phosphatidylserine), Nighttime Reset Magnesium, 3-in-1 tribiotic (gut, immunity, skin, bloating). The All-in-1 bundle packages these four as one routine.
8. **Women: three red flags** (exhaustion, dull hair skin and nails, frequent illness) and "scientifically designed to combat fatigue".
9. **Parent testimonial vs competitors** (first person advertorial naming EllaOla, Grüns, Mary Ruth's and Hiya). Risky: competitor naming and sweetener claims (Reb M, monk fruit, sugar alcohols) need owner and legal approval before reuse.
10. **Offer mechanics**: monthly subscription as "Guaranteed Lowest Price!", one-time with a seasonal code, free gift over $75 (Electrolyte mix), free shipping first order, 45 day guarantee, "87% less likely to build a healthy habit without subscribing", bundle and starter packs ($78 and $88), quiz offer "52% off limited time".
11. **Scarcity and seasonality**: Fall Savings, "Due to high demand October has a very high risk of selling out", "Order by Oct 15th for guaranteed free gifts" (seen on the sale and in the bundle concept).

## New products and formats
- **Toddlers line** (ages 2 to 3): the Toddlers' Multi with choline and a gentle tribiotic for "softer, easier to pass stools" and the angle "potty problems are often a gut issue"; a Toddlers Behind the Science LP (`trmv-behind-the-science-lp`). The owner plans a Toddlers version of the All-in-1 bundle, built from Kids and Teens once Kids is 100% done.
- **Daily Focus Brain Support** now in four audiences (kids, teens, women, men) with few reviews so far (about 48 each): needs proof and education.
- **Rapid Hydration Electrolyte Support** (new, $25) used as the free gift.
- **Refill pouches and the refillable bottle** as a sustainability proof point (390,000+ lbs plastic kept out of landfills).
- **Starter packs and school bundles**: Ready For School bundles, Dream Team starter packs.
- **Lead magnets**: Healthy Eating Guide (printable planner), 14 Day Reset, 30 Days Unplugged, the nutrient deficiency quiz and its health report.
- **New concept in the deck: Bio-Matched** (see `references/bio-matched-deck.md`): forms and doses matched to age, plus formulating for inside the body (deficiencies) and outside the body (food supply, additives, microplastics, heavy metals).

## What the data suggests (hypotheses, not facts)
- Teens traffic grows fast but bounces: the page promise or the first screen may not match the ad. Test a sharper first screen with the nutrient/behavior link.
- Add to cart is highest where there is a clear offer (Sale 21.7%, Kids PDP 12.9%, Home 10.6%). Bundle and quiz routes are still small.
- Checkout rate falls on pages with low intent. Funnels that reach checkout (Sale 50.8%, Teens PDP 48.6%, Home 53.5%) are PDPs and the sale, not the education LPs.

## Refresh procedure
1. Open the live site in the Browser pane (`mcp__Claude_Browser__navigate https://firstday.com`). `WebFetch` and `curl` get HTTP 429, an in-page `fetch` from a firstday.com tab works.
2. In `javascript_tool`: `await (await fetch('/products.json?limit=250')).json()` for the catalog; `fetch('/pages/<handle>')` and `fetch('/blogs/news?page=N')` for pages and the article list; parse with `DOMParser`, drop `script,style,svg,nav,form`, read `main`/`article` `innerText`, collapse whitespace.
3. Update `references/` and the snapshot date. Do not store personal data or analytics beyond the owner's report.
