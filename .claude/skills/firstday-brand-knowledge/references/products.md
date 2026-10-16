# First Day products (live site, crawled 16 Oct 2026)

Prices are list prices. Subscribe and save is about 40% off, one-time about 30% off with the seasonal code. Every gummy product is vegan, non GMO, free of the top 9 allergens, no fake sugars, no artificial colors, no fillers. URL pattern `/products/<handle>`. In this repo the data is in `src/data/products.js`, `pdpNew.js`, `pdpLegacy.js`.

## Template rule used in this prototype
Every multivitamin links to the NEW PDP (`uniified-default-v2`), every other product to the LEGACY PDP (`unified-default`).

## Multivitamins ("The No Junk™ Multi")
Common: 2 gummies a day, 30 servings per bottle (Kids pouch pages say 30), blend of 21 organic superfoods (apple, kale, broccoli, spinach, carrot, parsley, beet, green cabbage, raspberry, blueberry, strawberry, tomato, aronia berry, chlorella, maca, moringa, reishi, cordyceps, lion's mane, turmeric, ginger), organic tapioca syrup and cane sugar, pectin, citric acid, natural flavors, juice colors. Folate as methylfolate, "up to 75% less sugar".

| Product | Handle | Price | Ages | Headline | Notes |
|---|---|---|---|---|---|
| The No Junk Toddlers' Multi | `the-no-junk-toddlers-multivitamin` | $39 | 2 to 3 | Yummy Gummies For Supported Growth & Development | 10 nutrients + 21 superfoods, includes choline for brain development, strawberry and orange. LP: `trmv-behind-the-science-lp`. |
| The No Junk Kids' Multi | `kids-enrichment-vitamin` | $39 | 4 to 12 | Daily Gummies For Improved Mood & Behavior | 9 nutrients on the LP (10 in new deck) + 21 superfoods. 5,112 reviews. Support for mood, behavior and picky eating. |
| The No Junk Teens' Multi | `teens-kickstart-vitamin` | $39 | 13 to 17 | Daily Gummies For Improved Motivation & Mood | organic fruit and veggie blend plus 12 key nutrients, orange. 1,489 reviews. Top traffic PDP. |
| The No Junk Women's Multi | `womens-supercharge-vitamin` | $39 | 18+ | To Support Beauty & Daytime Energy | fatigue and exhaustion angle, biotin, C, E, orange. 2,419 reviews. |
| The No Junk Men's Multi | `mens-provisions-vitamin` | $39 | 18+ | For Supported Strength & Vitality | organic superfood blend plus 13 key nutrients, natural orange. 333 reviews. |

Customer survey stats on the PDPs (†): Kids multi 95% of parents say it supports overall health and immunity, 83% mood and behavior and motivation for school, 82% bedtime routines and sleep quality. Teens 98% overall health and nutrition. Women (after 90 days) 99% overall health, 85% daytime energy, 94% fewer illnesses such as colds. Kids probiotic, brain, magnesium PDPs carry similar percentages.

## 3-in-1 Pre+ Post+ Probiotic ("tribiotic"), $49, 25 to 30 servings
- Livaux® (prebiotic from whole fruit golden kiwi powder), Bacillus coagulans SNZ 1969® (probiotic, survives stomach, oral health and immunity), a heat treated postbiotic (Lactobacillus paracasei MCC1849 in Kids, Bifidobacterium lactis in Toddlers).
- Kids (`kids-belly-biotic`, ages 4 to 12): gut health, oral health, immunity, overall wellness ("Whoa, Belly!").
- Toddlers (`toddlers-3-in-1-probiotic`, 2 to 3): "Gentle 3-in-1 gummy for softer, easier to pass stools", angle "potty problems are often a gut issue".
- Teens (`teens-gut-sustainer`, 13+): digestive, immune and skin health.
- Women (`womens-good-gut`, 18+): "The world's first 3-in-1 tribiotic" for digestive, immune and feminine (vaginal) health and less bloating.
- Men (`mens-gut-guardian`, 18+): "The world's first men's 3-in-1 tribiotic": digestion, strength, power, athletic performance, recovery.

## Daily Focus Brain Support, $49, 30 servings
Cognizin® (citicoline), sunflower phosphatidylserine, vitamin B3. Kids (`kids-daily-focus`, peach): focus, memory, learning, hyperactivity support, brain energy; teens (`teens-daily-focus`, apple): focus, memory, mental stamina; women (`womens-daily-focus`, peach) and men (`mens-daily-focus`, apple): add sustained release caffeine for calm steady energy and "fighting brain fog". Teens PDP stats: 86% of parents saw improved performance at school, 85% improved memory and recall, 86% improved focus and attention (†). Few reviews yet (about 48).

## Nighttime Reset Magnesium, $39, 30 servings, melatonin free
Chelated magnesium citrate with calming ingredients (L-theanine/Suntheanine®, Zembrin® in the women's blog). Kids (`kids-calming-magnesium`, strawberry, a kiwi limited edition existed), teens (passion fruit guava), women (strawberry), men (`mens-calming-magnesium`, strawberry). Angles: bedtime battles, wind down, calmer moods, mind and muscle relaxation, "only $0.78 per sleepy night".

## Other products
- **Rapid Hydration Electrolyte Support** (`rapid-hydration-electrolyte-support`, $25): sodium, potassium, magnesium, vitamin C, cane sugar, no artificial sweeteners, flavors or colors. Also the free gift on orders over $75.
- **Refill pouches** for every product (multis $39, others $49), bundles and starter packs: Kids' Ready For School Bundle, Teens' Ready For School Bundle ($88), Dream Team Starter Packs ($78: kids, teens, women, men), Wellness, Power-Up and Defense starter packs ($88), Calm Kids Welcome Offer ($78), Kids' Welcome Kit. Gifts: Jetsetter Travel Pod, eye mask, travel jar, Clean Towels blemish control wipes, Healthy Eating Meal Planner, reflection tote bag.
- Discontinued: Kids Enrichment (old).
- The 90 plus items in the product JSON include many internal "Test" and "Online Exclusive" duplicates: ignore them for content.
