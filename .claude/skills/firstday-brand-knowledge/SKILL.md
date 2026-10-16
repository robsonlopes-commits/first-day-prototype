---
name: firstday-brand-knowledge
description: Stable knowledge base about First Day (the company, founder story, mission, the product line, ingredients, offers, proof, the science narratives behind hidden hunger and bioavailability, compliance guardrails, how to write copy like the live landing pages). Use whenever you write or judge copy, name a benefit, pick a claim, build an exploration page, generate an image that shows packaging or a claim, or need a fact about a product, price, ingredient or age range. For what is new or being tested right now, use the `firstday-whats-new` skill.
---

# First Day brand knowledge (stable base)

Source: firstday.com (live site crawled 16 Oct 2026: Learn pages, the 90 blog articles, product pages and product JSON) plus the repo data in `src/data`. When a fact matters for a customer-facing claim, re-check it on the live page first: this skill is a snapshot. Anything new, unproven or under test lives in `firstday-whats-new`, not here.

Detail files (read only what you need):
- `references/products.md` — every current product: handle, price, ages, flavor, actives, headline claims.
- `references/science-and-claims.md` — the science stories (hidden hunger, vanishing nutrients, over-supplementation, MTHFR, bioavailability, magnesium, tribiotics, heavy metals), the stats the site already uses, and which claim wording is approved.
- `references/learn-library.md` — map of the Learn pages and all blog articles by topic, with URLs.

## The company in one minute
- **First Day** makes gummy supplements for the whole family: Toddlers (2 to 3), Kids (4 to 12), Teens (13 to 17), Women (18+), Men (18+). Tagline family: "Real Wholesome® Nutrition", "Good health starts at day one", "Live every day like it's your First Day".
- **Founder:** Alice (Alice Li), whose story is the brand origin: her grandparents lived through scarcity in the 1950s ("the body doesn't forget hard times"), so she started First Day so no family passes nutritional trauma to the next generation. First Day is "an homage to families", to parents who give everything to their children at the expense of themselves.
- **Belief system (About Us):** healthy habits are passed down; easy does it (parents have endless to do lists and picky eaters, so habits must be delicious, nutritious and easy); good habits start young; modern solutions for modern problems (food systems and lifestyles changed, so the health crises changed, so the science must too).
- **Core enemy narrative:** "Hidden Health Crises": vanishing nutrients (hidden hunger), ultra-processed foods (mineral depletion, magnesium), microplastics, heavy metals and pesticides, and over-supplementation by other vitamin brands. Message: "These are not parenting failures, they are system failures."
- **Proof:** 4.8 stars from 12,322+ reviewers on landing pages (4.7/5 from 11,529 reviews on PDP widgets), "over 1,000,000 families", "6,646 gummies sold every 24h", "#1 fastest growing Teens & Kids vitamin", Clean Label Project® Purity Award and certification (tests for 150+ contaminants), medical advisory board (Dr. Lei Chen, MD, MHS, Yale; Dr. Ed Giovannucci, MD, MPH, ScD, Harvard), Dr. Adam Smith quotes on the kids LP, 45 day money back guarantee.

## The Essential Eight (Our Ingredients page, "Real Wholesome®")
1. No fillers, fake sugars or fad ingredients with wild claims (up to 80% less sugar than leading brands, no monkfruit; PDPs say "up to 75% less sugar").
2. Vegan, cruelty free, non GMO, free of the top 9 allergens, natural colors and flavors, plant based pectin instead of gelatin.
3. Research backed and clinically tested ingredients (recent randomized controlled trials, human clinicals).
4. Meticulously sourced, highly bioavailable, never above 100% Daily Value (see over-supplementation).
5. Repeatedly tested for potency and purity (every batch tested 3+ times; Clean Label Project).
6. Refillable packaging: subscribers get one refillable bottle then monthly pouches (390,000+ lbs of plastic kept out of landfills).
7. Tested and loved by picky kids and adults ("we cracked the picky eater code").
8. Feel the difference: highest quality sourcing for better absorption and real results.

## Offer and commerce facts (check live before quoting)
- Base prices: multis and magnesium $39; probiotics, Daily Focus brain support $49; Rapid Hydration Electrolyte Support $25 (also the free gift).
- Subscribe monthly: about 40% off ($23.40 and $29.40 at the time of the crawl), "save up to 52%" appears on bundles; one-time purchase about 30% off with the seasonal code (FALLDEALS in Oct 2026: $27.30 and $34.30). Bundle and starter packs ($78 and $88) exist.
- Free gift on orders $75+ (10 servings of the Electrolyte Drink Mix), free shipping on the first order, cancel anytime, skip or pause, 45 day money back guarantee, "you're 87% less likely to build a healthy habit without subscribing".
- Subscription = one stylish refillable bottle on the first order, then eco refill pouches every 30 days.

## Where each fact is allowed to come from
- Product and ingredient facts: the PDP and `references/products.md`.
- Science and statistics: `references/science-and-claims.md` (each stat has its origin page). Do not invent a number.
- Customer percentages carry a dagger (†) and mean "based on a survey of First Day customers".
- Functional claims carry an asterisk (*) and the FDA disclaimer ("These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.").

## Guardrails (always)
- Never diagnose, treat, cure or prevent a disease; never promise a result. Use "supports", "helps", "may". No before/after health transformation imagery in exploration images (mood and routine only).
- Do not name or attack competitors in copy for the real site without the owner's approval (one live advertorial does; see `firstday-whats-new`).
- Claims the owner has not yet approved or that are new live in `firstday-whats-new` marked as pending. If you need a number that is not in these files, ask the owner or read the live page, never guess.
- Known inconsistencies on the live site (flag, do not copy blindly): flavor of the Kids/Teens/Women probiotic ("kiwi" or "tropical" in descriptions, "Natural Golden Peach" in the PDP flavor line); review counts shared between the Kids and Toddlers multi widgets (5,112); the nutrient loss figure is 73% on some pages and 75% on others; the Kids multi is "9 nutrients" on the LP and "10 critical nutrients" in the new deck.

## Copy
Writing copy is its own skill: use `firstday-copy` (emotional, direct response, science backed, coherence rules, no fixed templates), with this skill as the source of facts. The live landing pages as voice reference are in `firstday-copy/references/live-pages-reference.md`. Do not use the tone of the October 2026 presentation (too verbose when tested); its science content is material, see `firstday-whats-new`.
