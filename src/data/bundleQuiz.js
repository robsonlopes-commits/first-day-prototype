// Content for page.lp-bundle-v3 (/pages/bundle-quiz). Layout + section settings come from src/data/bundleQuizTemplate.js (generated from
// reference/theme/templates/page.lp-bundle-v3.json); everything the template reads from product/page metafields, metaobjects or the
// Judge.me app is captured here from https://firstday.com/pages/bundle-quiz (14 Oct 2026). Image values are file names in the shop
// CDN "files" folder (shopImg) unless noted.

// ---- standalone-product: the "custom-bundle-1" product -------------------------------------------------------------------
const GALLERY = [
  ['2cb864e3-3d79-4330-a399-56bd93d78aae.png', ''],
  ['fa8db815cf106d47a832b64bef0c78beb778b0a0.png', ''],
  ['0fd459772147e948ade55694b22086a0f35aeb8c.png', ''],
  ['c4a52e4012513a60cddebca55cffdd5fb007cfb8.png', ''],
  ['kdbf_2_-_Lifestyle_Image_-_Kids_Brain_Support_result.webp', 'bottle on table'],
  ['kdbf_9_-3_Features_-_Kids_Brain_Support_result.webp', 'brain fuel'],
  ['kdbf_5_-_Benefits_-_Kids_Brain_Support_result.webp', 'helps attention'],
  ['kdbf_6_-_Nutrition_-_Kids_Brain_Support_result.webp', 'mental clarity'],
  ['kdbf_4_-_Gummies_Nutrients_-_Kids_Brain_Support_result.webp', 'supports memory'],
  ['kids-magnesium-bottle-2-gummies.jpg', 'A cylindrical container of First Day Kids Nighttime Reset Magnesium gummies, shown on a light lavender background with two red star-shaped gummies placed to the left.'],
  ['4_-_Gummies_Nutrients_-_Kids_Magnesium.png', ''],
  ['kcm_3_-_Benefits_-_Kids_Magnesium_result.webp', 'peaceful sleep with kids magnesium'],
  ['kcm_5_-_Benefits_-_Kids_Magnesium_result.webp', 'kids bedtimes struggles'],
  ['kcm_8_-_Why_First_Day__-_Kids_Magnesium_result.webp', 'best kids sleep support'],
  ['ktb_2_-_Lifestyle_Image_-_Kids_Tribiotics_result.webp', "A cylindrical First Day Kids Pre + Post Probiotic container is centered on a white background, surrounded by colorful children's accessories including a yellow polka-dot toothbrush, a teal turtle toy, a purple hairbrush, and a white pump bottle."],
  ['ktb_5_-_Benefits_-_Kids_Tribiotics_result.webp', 'digestion support'],
  ['ktb_4_-_Gummies_Nutrients_-_Kids_Tribiotics_result.webp', 'probiotics for kids'],
  ['ktb_6_-_Nutrition_-_Kids_Tribiotics_result.webp', '3 strains'],
  ['ktb_7_-_Benefits_-_Kids_Tribiotics_result.webp', "Promotional graphic for gut health gummies with text reading 'Gut Health Never Tasted So Good' and four benefit callouts with icons, plus a hand holding two yellow gummies at the bottom on a light blue background."],
  ['ingredients-kde.webp', "A supplement facts label for Kids' Multivitamin gummies."],
  ['ingredients-kdbf.webp', 'ingredients label'],
  ['ingredients-kcm.webp', 'magnesium ingredients'],
  ['ingredients-ktb.webp', 'supplement label'],
];

export const BUNDLE_PRODUCT = {
  handle: 'custom-bundle-1',
  title: 'Custom Bundle',
  price: 88, // 1 Starter Pack
  rating: 4.72,
  reviewsBadge: '11524 reviews',
  vanity: 'Build Your Personlized Bundle To [Unlock Up To 52% off + 4 FREE Gifts!]',
  gallery: GALLERY,
  // product.metafields.custom.benefit_accordian
  intro: "<p>Personalized daily gummy bundles to start your family's day with an edge. Including nutrients shown to support mood, focus, reduce sick days, and sleep through the night to be ready for whatever the day brings.</p>",
  benefits: [
    { icon: 'Untitled_design_6_c5d8fdab-5f5c-4e08-80e0-45b7de988e78.png', heading: 'Reduce Sick Days', percent: '95%', text: "<p>of parents say First Day vitamins support their child's overall health &amp; immunity.† <br>\n<br>\n<strong>Did You Know: A</strong> study from the U.S. Department of Education showed that students who were regularly absent due to reasons like sick days were much less likely to read at grade level.</p>" },
    { icon: 'Group_1_2a81b8f9-d0db-4ade-8584-5c9e3134e0ae.png', heading: 'Enhance Focus & Performance', percent: '86%', text: '<p>said it was effective in supporting overall school performance or structured learning.</p>' },
    { icon: 'Group_1_1.png', heading: 'Balance Energy & Get Well-Rested', percent: '90%', text: '<p>agree that First Day is better than other sleep support solutions they have tried.</p>' },
  ],
};

// ---- build box: gifts (metaobjects referenced by the build_box_deal blocks' `gifts` lists) -----------------------------------
// label / price / image as rendered in the deal gift JSON; `handle` is the gift product (for the info modal, unused here).
export const GIFTS = {
  'reusable-bottle': { label: 'Reusable Bottle', price: '$5', image: 'gift-reusable-bottle-fitted-smaller.png', handle: 'refillable-bottle' },
  'digital-meal-planner': { label: 'Weekly Meal Planner + Recipes', price: '$10', image: 'gift-meal-planner-cutout.png', handle: 'place-holder-item' },
  'travel-pod-gift': { label: 'Exclusive Travel Pod', price: '$10', image: 'gift-travel-pod-cutout.png', handle: 'gift-1-delete-after' },
  'hydration-sticks-gift': { label: '10pk Hydration Drink Mix', price: '$25', image: 'gift-hydration-cutout.png', handle: 'rapid-hydration-electrolyte-support-gift' },
  'apple-watch-chance': { label: 'Apple Chance', price: null, image: 'Apple-Watch-SE-3-hero-250909_big.jpg.large.jpg', handle: '' },
};

// ---- build box popup catalog (product.metafields.custom.bundle -> categories) --------------------------------------------------
// [handle, productId, variantId, title, variantTitle, description, price(cents), image, quizOutcome?]
const P = (handle, productId, variantId, title, variantTitle, description, price, image) => ({ handle, productId, variantId, title, variantTitle, description, price, image });
export const BUNDLE_CATALOG = [
  { key: 'kids', label: 'Kids', ages: '(Ages 4 - 12)', products: [
    P('kids-enrichment-vitamin', 4526304198754, 32050881855586, "Kids' Multivitamin", '1 Bottle', 'Support for mood, behavior & picky eating.', 3900, '2.webp'),
    P('kids-calming-magnesium', 7394315763810, 42115495034978, "Kids' Magnesium", '1 Bottle', 'Melatonin-free support for relaxation & sleep.', 3900, '1_19d423ed-4f0d-496c-9a77-d89110e2a119.png'),
    P('kids-daily-focus', 7399087800418, 42108469674082, "Kids' Brain Support", '', 'Support for focus, learning, and behavior.', 4900, 'Kids_Brain_Support.png'),
    P('kids-belly-biotic', 7751925956706, 43144412725346, "Kids' Probiotic+", '1 Bottle', 'To support immunity, digestion, and oral health.', 4900, '4.webp'),
  ] },
  { key: 'toddlers', label: 'Toddlers', ages: '(Ages 2 - 3)', products: [
    P('the-no-junk-toddlers-multivitamin', 7331745267810, 41869557334114, "Toddlers' Multivitamin", '1 Bottle', 'Helps fill missing nutrients in young children.', 3900, 'toddlers-multi-flat.png'),
    P('toddlers-3-in-1-probiotic', 7481027985506, 42380460294242, "Toddlers' Probiotic+", '', 'For softer, easier to pass stools.', 4900, '38486cd4-dbb4-448b-9d5e-4515a8fd95ac.png'),
  ] },
  { key: 'teens', label: 'Teens', ages: '(Ages 13 - 17)', products: [
    P('teens-kickstart-vitamin', 6610526765154, 39463608516706, "Teens' Multivitamin", '1 Bottle', 'Support for motivation, energy & immunity.', 3900, '3.webp'),
    P('teens-calming-magnesium', 7394319663202, 42085221564514, "Teens' Magnesium", '', 'Melatonin-free support for relaxation & sleep.', 3900, 'teens-magnesium-flat.png'),
    P('teens-daily-focus', 7399087865954, 42108470362210, "Teens' Brain Support", '', 'Support for focus, learning, and memory recall.', 4900, 'Teens_Brain_Support.png'),
    P('teens-gut-sustainer', 7752145338466, 43146391027810, "Teens' Probiotic+", '1 Bottle', 'To support immunity, digestion, and skin health.', 4900, '5.webp'),
  ] },
  { key: 'women', label: 'Women', ages: '(Ages 18+)', products: [
    P('womens-supercharge-vitamin', 4538633814114, 39271491731554, "Women's Multivitamin", '1 Bottle', 'Support for energy, skin & hair health.', 3900, 'womens-multi-flat.png'),
    P('womens-calming-magnesium', 7394320089186, 42115495297122, "Women's Magnesium", '1 Bottle', 'Melatonin-free support for relaxation & sleep.', 3900, 'Magnesium_1_1f242593-10ef-4e3c-b945-f922d11c82ea.png'),
    P('womens-daily-focus', 7399088029794, 42108470984802, "Women's Brain Support", '', 'Helps provide focus and calm mental energy. ', 4900, 'Womens_Brain_Support.png'),
    P('womens-good-gut', 7752145207394, 43146388832354, "Women's Probiotic+", '1 Bottle', 'To support immunity, digestion, and bloating.', 4900, 'womens-probiotic-flat.png'),
  ] },
  { key: 'men', label: 'Men', ages: '(Ages 18+)', products: [
    P('mens-provisions-vitamin', 6610494062690, 39463537737826, "Men's Multivitamin", '1 Bottle', 'Power-packed nutrition for men. ', 3900, 'mens-multi-flat.png'),
    P('mens-calming-magnesium', 7394320351330, 42085226938466, "Men's Magnesium", '', 'Melatonin-free support for relaxation & sleep.', 3900, '3_77f0ab1f-46e0-43bc-aba5-c682b06b32ee.png'),
    P('mens-daily-focus', 7399088062562, 42108471017570, "Men's Brain Support", '', 'Bolsters focus, memory and mental clarity.', 4900, 'BrainSupportShoot_Mens-Brain_69.jpg'),
    P('mens-gut-guardian', 7338819780706, 41898190766178, "Men's Probiotic+", '1 Bottle', 'To support immunity, digestion, and recovery.', 4900, 'mens-probiotic-flat.png'),
  ] },
];

// badge_best_seller_products (block setting, product handles) -> "Best Seller" green badge on the card
export const BADGE_STYLE = { 'Best Seller': { bg: '#64daa1', fg: '#117c49' }, 'New!': { bg: '#64daa1', fg: '#117c49' }, 'Back In Stock': { bg: '#ffb511', fg: '#906300' } };

// product info modal (FDInfoModal: /products/<handle>.js): title, description (HTML). Images come from src/data/products.js (catalog gallery).
export const INFO_MODAL_PRODUCTS = {
  'kids-enrichment-vitamin': { title: 'The "No Junk"™ Kids’ Multi', description: '<p>Give your kids the nutrition they need to fight the effects of Hidden Hunger - with 21 organic superfoods &amp; just 2 delicious gummies a day!<br><br>Contains no fake sugars, no artificial colors, and no fillers. That’s why we call it the “No Junk”™ Multi!</p>' },
  'kids-calming-magnesium': { title: 'Kids’ Nighttime Reset Magnesium', description: '<p>Tired of bedtime battles? Meet the magnesium gummy that’s giving kids restful sleep, calmer moods, and mind and body relaxation. Made with calming ingredients and no melatonin hormones in a delicious strawberry flavor.</p>' },
  'kids-daily-focus': { title: "Kids' Daily Focus Brain Support", description: '<p>Daily brain nutrition for children ages 4+. Supports focus, memory, learning, hyperactivity support, and brain energy with Cognizin™, sunflower Phosphatidylserine, and Vitamin B3 — in a peach gummy kids love.</p>' },
  'kids-belly-biotic': { title: "First Day - Kids' 3-in-1 Pre+ Post+ Probiotic", description: '<p>A unique 3-in-1 pre, post, and probiotic designed to promote gut health, support oral health, fortify immunity and improve overall wellness. 25 day supply of kiwi-flavored gummies for kids ages 4+.</p>' },
  'the-no-junk-toddlers-multivitamin': { title: 'The "No Junk"™ Toddlers\' Multi', description: '<p>Worried about your toddler’s eating habits? Meet the toddler multivitamin that’s giving little ones a nutrition boost! Made with 10 nutrients and a blend of 21 organic superfoods in a formula designed just for 2 &amp; 3 year olds.<br><br>Contains no fake sugars, no artificial colors, and no fillers. That’s why we call it the “No Junk”™ Multi!</p>' },
  'toddlers-3-in-1-probiotic': { title: "Toddlers' 3-in-1 Pre+ Post+ Probiotic", description: '<p>Potty problems aren’t just a training issue, they’re often a gut issue. Helping your toddler’s gut grow healthy, strong, and balanced is one of the best things you can do for their digestion, behavior, immunity, and confidence.</p>' },
  'teens-kickstart-vitamin': { title: 'The "No Junk"™ Teens’ Multi', description: '<p>Designed by experts to support daily development for teens ages 13+. A unique organic fruit and veggie blend, plus 12 key nutrients. 30 day supply.<br><br>Contains no fake sugars, no artificial colors, and no fillers. That’s why we call it the “No Junk”™ Multi!</p>' },
  'teens-calming-magnesium': { title: 'Teens’ Nighttime Reset Magnesium', description: '<p>Is your teen up all night and tired all day? Meet the magnesium gummy that’s helping teens wind down before bed, sleep better at night, feel calmer at school, and stay energized throughout the day. Made with calming ingredients and no melatonin hormones in a delicious passion fruit guava flavor.</p>' },
  'teens-daily-focus': { title: "Teens' Daily Focus Brain Support", description: '<p>Scientist-formulated brain nutrition for teens ages 13–18. Supports focus, memory, mental stamina &amp; hyperactivity support with Cognizin™, sunflower Phosphatidylserine, and Vitamin B3 in a delicious apple-flavored gummy.</p>' },
  'teens-gut-sustainer': { title: "First Day - Teens' 3-in-1 Pre+ Post+ Probiotic", description: '<p>Teen’s tribiotic gummy designed with clinically studied pre+ post+ and probiotics for digestive, immune, and skin health. 30 day supply of tropical-flavored gummies for ages 13+.</p>' },
  'womens-supercharge-vitamin': { title: 'The "No Junk"™ Women’s Multi', description: '<p>Scientifically designed to help combat fatigue and exhaustion, formulated with the nutrients your body needs to stay energized. 30 day supply for women ages 18 +.<br><br>Contains no fake sugars, no artificial colors, and no fillers. That’s why we call it the “No Junk”™ Multi!</p>' },
  'womens-calming-magnesium': { title: 'Women’s Nighttime Reset Magnesium', description: '<p>Exhausted from endless nights of bad sleep? Meet the magnesium gummy that’s helping women relax before bed, get restorative sleep, and feel more energized during the day. Made with calming ingredients and no melatonin hormones in a delicious strawberry flavor.</p>' },
  'womens-daily-focus': { title: "Women's Daily Focus Brain Support", description: '<p>Daily nootropic gummies for modern women. Supports focus, memory &amp; calm, steady energy with Cognizin™, sunflower Phosphatidylserine, Vitamin B3, and sustained-release caffeine all packed into a delicious peach-flavored gummy.</p>' },
  'womens-good-gut': { title: "First Day - Women's 3-in-1 Pre+ Post+ Probiotic", description: '<p>The World’s first 3-in-1 tribiotic designed to promote digestive, immune, and vaginal health. 30 day supply of kiwi-flavored gummies for women ages 18+.</p>' },
  'mens-provisions-vitamin': { title: 'The "No Junk"™ Men’s Multi', description: '<p>A unique organic superfood blend, plus 13 key nutrients. Perfect for the modern lifestyle. 30 day supply.<br><br>Contains no fake sugars, no artificial colors, and no fillers. That’s why we call it the “No Junk”™ Multi!</p>' },
  'mens-calming-magnesium': { title: 'Men’s Nighttime Reset Magnesium', description: '<p>Feeling drained from tossing and turning all night? Meet the magnesium gummy that’s tackling nighttime restlessness. Supports mind and muscle relaxation, better sleep, and energized mornings. Made with calming ingredients and no melatonin hormones in a delicious strawberry flavor.</p>' },
  'mens-daily-focus': { title: "Men's Daily Focus Brain Support", description: '<p>Daily brain nutrition for adult men, supporting focus, memory &amp; long-lasting energy with Cognizin™, sunflower Phosphatidylserine, Vitamin B3, and sustained-release caffeine all packed into delcious apple-flavored gummies.</p>' },
  'mens-gut-guardian': { title: "Men's 3-in-1 Pre+ Post+ Probiotic", description: '<p>The World’s first Men’s 3-in-1 tribiotic designed with clinically studied Pre+ Post+ and Probiotics. Supports digestion, strength, power, and athletic performance. 30 day supply of tropical-flavored gummies for ages 18+.</p>' },
};

// ---- page-metafield content of the other sections ------------------------------------------------------------------------------
// temp-science-module (page.metafields.custom.section_science_tabs): tabs { label, title, desc, list (HTML), image { file, alt, pos } }
export const SCIENCE = {
  heading: '<p>Solving Common Problems From 4 Different Angles</p>',
  tabs: [
    { label: 'Daily Multivitamin', title: 'How This Helps*', image: { file: 'kde-multi-with-benefits.jpg', alt: '', pos: '26.66% 32.422%' },
      desc: '<p>Missing nutrients and Hidden Hunger can cause behavior outbursts, picky eating, and unsteady mood. Give your kids the nutrition they need to fight the effects of Hidden Hunger - with 21 organic superfoods &amp; just 2 delicious gummies a day!</p>',
      list: '<p>🫐 <strong>21 organic superfoods</strong>&nbsp;— delivers whole-food nutrients that support healthy brain development*</p><p>🍎 <strong>9 nutrients most kids lack</strong>&nbsp;— supplying kids with what they need during important years of growth*</p><p>🧠 <strong>Methylfolate (not folic acid)&nbsp;</strong>— the bioavailable form that supports neurotransmitter production regardless of genetic variation*</p><p>⚡ <strong>Vitamin B6</strong>&nbsp;— plays a direct role in how the brain produces serotonin and dopamine*</p>' },
    { label: 'Daily Brain Support', title: 'How This Helps*', image: { file: 'kdbf_2_-_Lifestyle_Image_-_Kids_Brain_Support_result.webp', alt: 'bottle on table', pos: '50% 36.23%' },
      desc: '<p>Daily brain nutrition for children for focus, memory, learning, hyperactivity support, and brain energy with Cognizin™, sunflower Phosphatidylserine, and Vitamin B3.</p>',
      list: '<p>🎯<strong>Cognizin® Citicoline</strong> - Supports focus, memory and attention in children.<br>\n<br>\n🧠 <strong>Phosphatidylserine (PS) - </strong>Supports brain cell communication, learning, and memory.<br>\n<br>\n💡<strong>Vitamin B3 (Niacinamide) </strong>- Supports energy production in the brain and metabolic balance.</p>' },
    { label: 'Calming Magnesium', title: 'How This Helps*', image: { file: 'kcm-sales-hero-spotlight-clean-label.png', alt: "A cylindrical container of First Day Kids Nighttime Reset Magnesium dietary supplement stands centered among purple clouds under a starry night sky. The label is light blue with yellow accents and reads 'first day' and 'Nighttime Reset Magnesium.", pos: '4.4352% 20.6739%' },
      desc: '<p>Tired of bedtime battles? Meet the magnesium gummy that’s giving kids restful sleep, calmer moods, and mind and body relaxation. Made with calming ingredients and no melatonin hormones.</p>',
      list: '<p>🌙 <strong>Chelated Magnesium - </strong>A highly absorbable form of magnesium that supports restful sleep and calm without interfering with the body’s natural processes.*</p><p>🪷 <strong>Suntheanine® - </strong>A patented, clinically studied form of L-theanine that helps reduce stress and promote relaxation — without drowsiness or dependency.*</p>' },
    { label: '3-in-1 Pre+ Post+ Probiotic', title: 'How This Helps*', image: { file: 'ktb_2_-_Lifestyle_Image_-_Kids_Tribiotics_result.webp', alt: "A cylindrical First Day Kids Pre + Post Probiotic container is centered on a white background, surrounded by colorful children's accessories including a yellow polka-dot toothbrush, a teal turtle toy, a purple hairbrush, and a white pump bottle.", pos: '50% 50%' },
      desc: '<p>A unique 3-in-1 pre, post, and probiotic designed to promote gut health, support oral health, fortify immunity and improve overall wellness.</p>',
      list: '<p>⛨ <strong>Livaux® (Prebiotic)</strong> - Supports gut health, regular digestion, and a healthy microbiome.<br>\n<br>\n🦷 <strong>Bacillus coagulans SNZ 1969® (Probiotic)</strong> - Survives stomach acid to support gut microbiome, immunity, and oral health.<br>\n<br>\n🛡️ <strong>Heat-treated Lactobacillus paracasei MCC1849 (Postbiotic) </strong>- Helps maintain a healthy immune response and gut balance.</p>' },
  ],
};

// timeline-section (page.metafields.custom.timeline)
export const TIMELINE = {
  heading_line_1: 'What You Can Expect',
  heading_line_2: 'Noticeable Benefits Over Time',
  items: [
    { image: 'kids-multi-lifestyle.jpg', pos: '', badge: '7 Days', title: 'Stronger Daily Nutrition', body: '<p><span class="metafield-multi_line_text_field">Supports essential nutrients for growth, energy, and everyday wellness—helping kids feel their best from the start.</span></p>' },
    { image: '12_046620e6-093c-446a-a7bc-ee7495aba799.png', pos: '41.504% 15.625%', badge: '30 Days', title: 'Steadier Mood', body: '<p><span class="metafield-multi_line_text_field">With added nutrients such as B12 and B6, kids have their energy levels balanced, making them more comfortable and on track every day.</span></p>' },
    { image: 'kde-verggies-fruits.jpg', pos: '50.488% 49.121%', badge: '60 Days', title: 'Healthier Eating Habits', body: '<p><span class="metafield-multi_line_text_field">When your child feels better after having their nutrition gaps filled, they start to make healthier eating choices.</span></p>' },
  ],
};

// accordion-block x2 (page.metafields.custom.section_2_bts_2_accordtion / section_bts_3_accodtion)
export const ACCORDION_1 = {
  heading: 'Target The Most Common Symptoms Plaguing Modern Families',
  image: 'kde-bts-growth-hero.png', imgAlt: "A hand holds a canister of first day Kids The Multi supplement against a blue background with marketing text and an illustration of a joint. The image includes Clinicians' Choice and Verified by frontrowMD badges.", imgPos: '',
  items: [
    { icon: '5_ff67ff98-ed7a-4682-b249-303fa10d0235.png', title: 'Stunted Growth', body: '<p>Vitamin D3 and Vitamin K2 work together to support bone development, while essential nutrients like B vitamins help the body turn food into growth-fueling energy.</p>' },
    { icon: 'f0bda30c-5ea4-4918-96d6-e6cf8b192766.png', pos: '50.098% 69.434%', title: 'Difficulty Staying Focused', body: '<p>Your child starts homework and instantly gets distracted. Simple tasks take forever. It’s like their brain just <em>won’t stay put</em>.</p>' },
    { icon: 'icon-stress-moody.webp', alt: 'Stressed Face Icon', pos: '49.121% 52.148%', title: 'Stress & Mood Swings', body: '<p>With Vitamin B6 for mood regulation and Vitamin B12 for energy balance, these gummies help support emotional stability.*</p>' },
    { icon: 'icon-pencil.png', pos: '2.93% 95.605%', title: 'Lack of Motivation', body: '<p>Packed with Vitamin B1 for brain health and Vitamin B2 for cognitive support - to help your teen stay on track while they balance school, sports, and everything in between.*</p>' },
    { icon: 'icon-moon.avif', pos: '37.012% 18.164%', title: 'Trouble Sleeping', body: '<p>Vitamin D3 helps regulate melatonin, the hormone that controls sleep cycles. Combined with B6, it supports calmer bedtimes and better rest for growing toddlers.*</p>' },
    { icon: 'icon-immunity.avif', pos: '50.098% 47.656%', title: 'Weakened Immunity', body: '<p>With immune-supporting Vitamin C and D3, plus key B vitamins that help keep their systems running smoothly. Our formula helps build a strong foundation to tackle whatever the day throws at them.</p>' },
  ],
};
export const ACCORDION_2 = {
  heading: 'Why We Are the Top Multivitamin',
  // desktop image = the template's own setting (mdp_9_-_Nutrition_-_Men_s_Multi_result.webp); the mobile image comes from the page metafield
  image: null, imgAlt: 'mens multivitamin nutrition', imgPos: '50% 51.66%',
  imageMobile: 'kids-multi-holding-kde.avif', imageMobileAlt: '', imageMobilePos: '0.684% 0.879%',
  items: [
    { icon: 'icon-broccoli.avif', pos: '49.121% 56.445%', title: 'Fights Hidden Hunger', body: "<p>80% of children don't eat enough fruits and veggies, contributing to a nutrient deficiency known as hidden hunger. Our gummies fight hidden hunger with essential nutrients critical to development.</p>" },
    { icon: 'old-icon-microscope.avif', pos: '49.121% 49.121%', title: 'Developed Alongside Harvard & Yale Scientists', body: '<p>Our product was crafted with input from leading scientists at Harvard and Yale, combining the latest research with high-quality ingredients to deliver a multivitamin parents can trust.</p>' },
    { icon: 'old-icon-atom-chemistry.avif', pos: '50.684% 51.66%', title: 'Backed by Modern Science', body: '<p>Vitamin B6 supports natural energy regulation, promoting healthier sleep patterns and making it easier for kids to get restful sleep.*</p>' },
    { icon: 'old-icon-stethoscope.avif', pos: '49.121% 49.121%', title: 'Pediatrician-Approved', body: '<p>Recommended by pediatricians, our multivitamin is designed to meet the unique needs of your family ensuring they get the support they need from a trusted source.</p>' },
    { icon: 'Rivo-Icon-Checkmark.svg', alt: 'A blue circle with a white check mark in the center, surrounded by a scalloped edge, resembling a verification badge.', title: 'Clean Label Project® Purity Award', body: '<p>Our products were independently tested by Clean Label Project® for harmful chemicals like heavy metals, pesticides, and plasticizers, exceeding typical industry practices.</p>' },
    { icon: 'icon-list-ingredients-sourcing.avif', pos: '6.152% 70.605%', title: 'Ingredients Sourcing and Dosage', body: '<p>We source each ingredient with care, choosing only the highest quality vitamins and minerals. Our dosage is tailored for teens, providing safe and effective support without risking overuse or unwanted additives.</p>' },
  ],
};

// ---- Judge.me "all reviews page" block (apps section). [product, handle, stars, author, date, title, body, pics[], badge] -------
const KIDS_MULTI = 'The "No Junk"™ Kids’ Multi';
const KIDS_MULTI_REFILL = 'The "No Junk"™ Kids’ Multi - Refill Pouch';
const KIWI = 'Kids’ Nighttime Reset Magnesium - Limited Edition Kiwi Flavor';
const KIDS_PROB = "First Day - Kids' 3-in-1 Pre+ Post+ Probiotic";
const TEENS_MULTI = 'The "No Junk"™ Teens’ Multi';
const TEENS_MAG = 'Teens’ Nighttime Reset Magnesium';
const REVIEW_ROWS = [
  [KIWI, 'kids-nighttime-reset-magnesium-limited-edition-kiwi-flavor', 5, 'Joseph Brubaker', '10/13/2026', 'My son said it had a really sweet taste', 'My son said it had a really sweet taste. And so I tried it! We both liked it!', ['magnesium-kiwi-pouch.png']],
  [KIDS_PROB, 'kids-belly-biotic', 5, 'Kayla Martin', '10/12/2026', 'Child enjoys the taste of the gummies & looks', 'Child enjoys the taste of the gummies & looks forward to taking them each day.', ['kids-prob_4b7651d5-86e6-4eb3-8d96-e6d26e57c0e4.png']],
  [KIDS_MULTI_REFILL, 'kids-enrichment-refill-pouch', 5, 'Alyxandrah White', '10/11/2026', 'Has most of what my kids don’t have from food', 'it has a lot ,but not everything , my kids brains and bodies need! it’s low in sugar but has good taste and texture', ['https://review-images.judgeme.com/first-day-life-inc/1791761744__image__original.jpg', '94_972928fc-efd6-4270-b125-5a78c803ff35.png']],
  ["Women's Daily Focus Brain Support", 'womens-daily-focus', 5, 'Anonymous', '10/11/2026', 'Definitely feel a difference', 'Definitely feel a difference. More awake and alert. I do not feel as scatterbrained.', ['woman-brain.png']],
  ["Kids' 3-in-1 Pre+ Post+ Probiotic Pouch Refills", 'kids-belly-biotic-refill-pouch', 5, 'Anonymous', '10/10/2026', 'awesome! great wway to get in my kitchen', 'awesome! great way to get in my kitchen probiotic gut health', ['https://review-images.judgeme.com/first-day-life-inc/1791668544__img_2941__original.jpeg', '98_765ea181-e42d-4a22-95c7-23c62e4129f5.png']],
  [KIWI, 'kids-nighttime-reset-magnesium-limited-edition-kiwi-flavor', 5, 'Lena & Ray', '10/10/2026', 'Best Nights', 'We have tried many different sleep aids, and this one here did wonders for my husband. I know it says kids, however, he is the one who has restless nights. He felt like his mind stopped turning and his body calmed. So I got him the mens adult version. Hoping those work just as well.', ['magnesium-kiwi-pouch.png']],
  [TEENS_MULTI, 'teens-kickstart-vitamin', 5, 'Yvette R', '10/09/2026', 'Tastes great!', 'My sons’ sleep and skin improved. They did not complain about taking these vitamins.', ['teens-multi.png']],
  [KIDS_MULTI_REFILL, 'kids-enrichment-refill-pouch', 5, 'Jessica Terrell', '10/08/2026', 'My son loves them!', 'My son loves them! I really like that they have real folate in them instead of Folic Acid.', ['94_972928fc-efd6-4270-b125-5a78c803ff35.png']],
  [KIWI, 'kids-nighttime-reset-magnesium-limited-edition-kiwi-flavor', 5, 'Krista Lanager', '10/07/2026', "My son gets a full night's rest with this product", "My son gets a full night's rest with this product.", ['magnesium-kiwi-pouch.png']],
  [TEENS_MULTI, 'teens-kickstart-vitamin', 5, 'Anonymous', '10/06/2026', "Almost immediate change in my son's mood, and", "My 16 yr olds mood and temper was getting out of hand. Just asking simple, basic questions would set him off. I saw almost an immediate change for the better in my son's mood, and skin's condition. I had explained to him adding this multi vitamin could help you with your temperment. He must feel the difference himself, because he has willingly added this to his routine.", ['teens-multi.png']],
  [KIDS_MULTI_REFILL, 'kids-enrichment-refill-pouch', 5, 'Angela Sergio', '10/05/2026', 'My kids love these!', 'My kids love these! So easy to get all their vitamins in in one easy step, throw them into their lunch boxes alongside welches fruit snacks and done! I never have to worry about missing a day.', ['94_972928fc-efd6-4270-b125-5a78c803ff35.png']],
  [KIWI, 'kids-nighttime-reset-magnesium-limited-edition-kiwi-flavor', 5, 'Stephanie Armstrong', '10/05/2026', 'Tastes great!  Helps the kiddos with a more', 'Tastes great! Helps the kiddos with a more restful sleep.', ['magnesium-kiwi-pouch.png']],
  [KIDS_PROB, 'kids-belly-biotic', 5, 'Anonymous', '10/05/2026', 'No junk!', 'My kids love them! No junk vitamin that actually taste great!', ['kids-prob_4b7651d5-86e6-4eb3-8d96-e6d26e57c0e4.png']],
  [KIDS_MULTI, 'kids-enrichment-vitamin', 5, 'cynthia jenness', '10/05/2026', 'So far these are great! I have 2 boys gobbling', 'So far these are great! I have 2 boys gobbling them down every morning. Knowing they are getting good stuff in a yummy gummy is worth it!', ['kids-multi.png']],
  [KIDS_MULTI, 'kids-enrichment-vitamin', 5, 'Kay Taylor', '10/04/2026', '', 'I’m really happy with the First Day Kids Vitamins! My kids actually like taking them, which is a huge win because getting kids to take vitamins isn’t always easy. 😅 I also love that I feel good about adding them to our daily routine and helping fill in some of the nutritional gaps, especially on those days when my kids aren’t eating the way I’d like them to.', ['kids-multi.png']],
  [KIDS_MULTI_REFILL, 'kids-enrichment-refill-pouch', 5, 'Amanda E', '10/04/2026', 'My kid happily takes them every morning', 'My kid happily takes them every morning. No fuss! Automatic re-order is such a great feature.', ['94_972928fc-efd6-4270-b125-5a78c803ff35.png']],
  ["First Day - Teens' 3-in-1 Pre+ Post+ Probiotic", 'teens-gut-sustainer', 5, 'Anonymous', '10/03/2026', 'So encouraged!', 'Hopeful we will see more and continual improvements! It’s only been 2 weeks but my daughter has commented on how much better she feels. Her stomach is less irritated and unsettled and she even noticed significantly less discomfort with her cycle this month. So happy for her, thankful for you, and curious what other benefits she will notice overtime.', ['teens-prob.png']],
  [TEENS_MULTI, 'teens-kickstart-vitamin', 5, 'Sherry A', '10/02/2026', 'good stuff', 'since beginning taking these vitamins, my son has been healthier', ['teens-multi.png']],
  [TEENS_MAG, 'teens-calming-magnesium', 5, 'Sherry A', '10/02/2026', 'good stuff', 'As my child takes these more consistently, he is sleeping better and overall happier', ['teens-mag.png']],
  ['The "No Junk"™ Kids’ Multi Gummies', 'kids-enrichment-vitamin-gummy', 5, 'Ryan Niederberger', '10/02/2026', 'These are the first vitamins that my son has', 'These are the first vitamins that my son has asked for every morning. "Dad dont forget my vitamins". I see a difference in his mood and attention span. I am thankful for these, the quality ingredients, the flavor, and the fact that my son loves taking them.', ['gummies-kids-multi-vitamin.png']],
  ["Kids' Daily Focus Brain Support", 'kids-daily-focus', 5, 'Stephanie A Hubbard', '10/01/2026', 'My kids love the', 'My kids love the flavor', ['kids-brain.png']],
  [KIDS_MULTI_REFILL, 'kids-enrichment-refill-pouch', 5, 'Anonymous', '09/30/2026', 'Love this product for my kids!! I know any', 'Love this product for my kids!! I know any nutrition gaps (if any) will be filled! Highly recommend!', ['94_972928fc-efd6-4270-b125-5a78c803ff35.png']],
  ["Kids' 3-in-1 Pre+ Post+ Probiotic Pouch Refills", 'kids-belly-biotic-refill-pouch', 5, 'Anonymous', '09/30/2026', 'Love this product for my kids!! I know the', 'Love this product for my kids!! I know the nutrition gaps (if any) will definitely be filled! Highly recommend!', ['98_765ea181-e42d-4a22-95c7-23c62e4129f5.png']],
  [KIDS_PROB, 'kids-belly-biotic', 5, 'Anonymous', '09/29/2026', 'Delightful gummies', 'This is the first time that we have come across a pre and postbiotic gummy for kids. It does not stick to the teeth and there is no fussing to take them. So far so good. We love them.', ['kids-prob_4b7651d5-86e6-4eb3-8d96-e6d26e57c0e4.png']],
  [TEENS_MAG, 'teens-calming-magnesium', 5, 'Anonymous', '09/29/2026', 'These help my son at night calm down and fall', 'These help my son at night calm down and fall asleep quicker.', ['teens-mag.png']],
];
export const ALL_REVIEWS = {
  average: 4.72, count: 11524, productCount: 10984, shopCount: 540,
  histogram: [[5, 9991, 87], [4, 740, 6], [3, 249, 2], [2, 141, 1], [1, 406, 4]],
  reviews: REVIEW_ROWS.map(([product, handle, rating, author, date, title, body, pics]) => ({ product, handle, rating, author, date, title, body, pics })),
};

// "Shop Reviews" tab (reviews of the store itself, no product): [stars, author, date, title, body]
const SHOP_ROWS = [
  [5, 'Monique Kiser', '10/13/2026', 'Amazing results', 'I’ve seen such a difference in my child’s mood and behavior. And he’s been o these vitamins for about 5-6 months now'],
  [5, 'Veronica Monarrez', '10/12/2026', '2 year old loves them!', 'My two year old loves these—they’ve been a great addition to our morning routine and make teeth brushing so much easier. She now looks forward to brushing her teeth because she gets the gummies after when before it was a fight!'],
  [5, 'Jessica L Bailey', '10/12/2026', 'Womens Daily Supercharge', 'My daughter takes these with ease! Great vitamins!'],
  [5, 'Alicia Fayman', '10/10/2026', 'Love!', 'I use the Toddler multi+superfoods and I love that my toddler is getting great ingredients in her vitamins!'],
  [5, 'Angela Tripp', '10/09/2026', 'Teen Magnesium', "AMAZING! Helps calm and drift to sleep quickly. However, men's and women's versions do not do the same. I am in my 40's and use the teen version!"],
  [5, 'Alyssa ann Bohol', '10/09/2026', 'Kids, Women, and Men..', 'My family and I really like the vitamins!'],
  [5, 'Cindy Dye', '10/09/2026', 'New user month 1  multi vitamins', 'My 11 year old daughter is finishing up her first full month of the multi vitamins. She says she can tell when she misses a dose. She states they make her feel more focused and energized. Looking forward to next month supply. No complaints from her about taking either.'],
  [5, 'Aryn', '10/08/2026', '', 'My kids loves these vitamins!'],
  [5, 'Kristine morin', '10/07/2026', 'Just getting started', 'My daughter been having a hard time going to school purchased these in hopes it helps with her motivation'],
  [5, 'Jessika Rukavina', '10/07/2026', 'All the good stuff!', "I have 3 kiddos, very picky. All three LOVE these vitamins. It's the one thing I know that gives my babies what they need each day, especially since it's so hard to get my picky eaters to eat the foods they need. Thank you for caring about my kids, and putting the love within the vitamins you create for them! My only complaint is, there aren't enough gummies in a bag! lol. Also kinda wish they weren't so expensive."],
  [5, 'Mellisa Richardson', '10/07/2026', 'Perfectly Formulated', 'I ordered these vitamins for my daughters and myself, and I’m so happy with what we’ve noticed in just ONE month! My nails feel stronger, and I’ve noticed visible hair growth. My 4-year-old daughter has struggled with hair breakage, and I’m seeing noticeable growth in her hair, too. It’s exciting to see these changes in such a short time. Very happy with our experience so far!'],
  [5, 'Stephanie Saffell', '10/06/2026', 'Awesome', 'Nothing short of amazingly awesomeness'],
  [5, 'Stephanie Saffell', '10/06/2026', 'Fabulous', "So, starting with the daily brain focus for my daughter's have been a game changer and the daily women's for me I have noticed a bit more energy throughout my day. It's only just been over a month and I can see the changes. Not only in me, but in my children"],
  [5, 'Miranda Sluys', '10/03/2026', 'Wonderful Products', "I have the kids pre-post probiotic, kids multi, and the brain support. They have been very good for my picky children. Even when the shapes changed my children didn't mind. And they picky."],
  [5, 'Jennifer P.', '10/02/2026', 'Amazzzing Sleep!', 'I’ve been using the Nighttime Reset Magnesium for Women for over a year now and it’s been working great and I can say it’s cured my 25+ years of insomnia. I’m telling you, try it now and know that consistency is key!'],
  [5, 'Ashley Knighten', '10/01/2026', 'Kid Approved!', 'My kids actually enjoy taking these vitamins! They love the taste and never complain when it’s time to take them. As a mom, I love finding something they enjoy that makes getting their daily vitamins a little easier!'],
  [5, 'Genevieve Guilbaud', '10/01/2026', 'satisfied', 'I have no issues with the kids multi vitamins, my son takes them everyday and is super healthy over all . when some children are sick in his class , he is not sick.'],
  [5, 'Anonymous', '10/01/2026', 'Great Gummies', 'My whole family enjoys these vitamin gummies.'],
  [5, 'Jacquie Nelson', '10/01/2026', 'My 14 yr old includes it in her daily routine', 'My 14 daughter is active in sports, busy with school and can hardly find time to sit down for dinner. These vitamins reassure me that she is getting the nutrition she needs to keep running.'],
  [5, 'Kelli Otero', '09/30/2026', 'Exactly what I needed!!', 'This vitamin has been closing the gaps for nutrition, it has upped my immunity so much and they taste delicious'],
  [5, 'Nina Farrell', '09/29/2026', 'First Day Teens Multi', 'My son is an extremely picky eater with ADHD and autism, and finding a vitamin he will actually take consistently has been a huge challenge. This is the first vitamin in years that he genuinely loves because of the flavor, and he has been able to stick with it!\n\nI’m loving them too. I also have an MTHFR variant and specifically look for a vitamin with a form of folate that my body can readily use. I’m so happy we found something that works well for both of us and, most importantly, that my son actually enjoys taking! ❤️'],
  [5, 'Brooklynn Eccles', '09/29/2026', 'Kids Muli Vitiam', 'My 5-year-old has been taking the kids multi vitamin since he was about 2 years old and It has been a game changer on his immune system'],
  [5, 'Amy Melasecca', '09/29/2026', 'Life changing for my kids', 'The brain and focus and daily vitamin packs for both teens and kids have changed my kids lives. My moody teenager no longer is moody. My 8 year old, full of emotions is able to control them better. I recommend these to everyone. Truly life changing in my house. We never skip a day'],
  [5, 'Natalie Schwarz', '09/28/2026', 'Kids love these vitamins!', 'We have tried a ton of different brands of vitamins, and our kids like the taste of these the best. It’s also nice to have such a wide variety of vitamin options for my kids, so we can get all in one place.'],
  [5, 'Rebecca Myers', '09/28/2026', 'multi-vitamins my whole family likes!!!!', 'First Day Gummies are the best tasting gummies I’ve tasted in a long time. They are not gritty, they are smooth, and my whole family will finally take these gummies. The focus and multi- vitamins are so effective. You finally feel like you are getting nutrients. Best part there are no artificial anything in these gummies, especially NO FOOD DYES!!!'],
];
ALL_REVIEWS.shopReviews = SHOP_ROWS.map(([rating, author, date, title, body]) => ({ product: 'First Day Life Inc.', handle: '', rating, author, date, title, body, pics: [], shop: true }));

// first 6 product images of each catalog product (/products/<handle>.js media) shown in the info modal gallery
export const INFO_MODAL_IMAGES = {
  'kids-daily-focus': ['kids-brain.png', 'kdbf_10_-_Social_Proof_-_Kids_Brain_Support_result.webp', 'kdbf_3_-_Benefits_-_Kids_Brain_Support_result.webp', 'kdbf_4_-_Gummies_Nutrients_-_Kids_Brain_Support_result.webp', 'kdbf_5_-_Benefits_-_Kids_Brain_Support_result.webp', 'kdbf_6_-_Nutrition_-_Kids_Brain_Support_result.webp'],
  'kids-enrichment-vitamin': ['kids-multi.png', 'kde_3_-_Gummies_Nutrients_-_Kids_Multi_result.webp', 'ingredients-kde.webp', 'kde_6_-_Benefits_-_Kids_Multi_result.webp', 'kde_9_-_Nutrition_-_Kids_Multi_result.webp', 'kde-facts.webp'],
  'kids-calming-magnesium': ['kids-mag.png', 'kcm_10_-_Benefits_-_Kids_Magnesium_result.webp', 'kcm_3_-_Benefits_-_Kids_Magnesium_result.webp', 'ingredients-kcm.webp', '4_-_Gummies_Nutrients_-_Kids_Magnesium.png', 'kcm_5_-_Benefits_-_Kids_Magnesium_result.webp'],
  'teens-daily-focus': ['teens-brain.png', 'tdbf_3_-_Benefits_-_Teens_Brain_Support_result.webp', 'tdbf_4_-_Gummies_Nutrients_-_Teens_Brain_Support_result.webp', 'ingredients-tdbf.webp', 'tdbf_10_-_Social_Proof_-_Teens_Brain_Support_result.webp', 'tdbf_5_-_Benefits_-_Teens_Brain_Support_result.webp'],
  'teens-kickstart-vitamin': ['teens-multi.png', 'tdk_3_-_Gummies_Nutrients_-_Teens_Multi_result.webp', 'ingredients-tdk.webp', 'tdk_6_-_Benefits_-_Teens_Multi_result.webp', 'tdk_7_-_Why_First_Day_-_Teens_Multi_result.webp', 'tdk_8_-_Social_Proof_result.webp'],
  'womens-supercharge-vitamin': ['woman-multi.png', 'wds_3_-_Gummies_Nutrients_-_Women_s_Multi_result.webp', 'wds-hero-carousel-dont-eat-veggies.webp', 'ingredients-wds.webp', 'wds_6_-_Benefits_-_Women_s_Multi_result.webp', 'wds_7_-_Why_First_Day_-_Women_s_Multi_result.webp'],
  'teens-calming-magnesium': ['teens-mag.png', 'tcm_10_-_Benefits_-_Teens_Magnesium_result.webp', 'tcm_3_-_Benefits_-_Teens_Magnesium_result.webp', 'ingredients-tcm.webp', 'tcm_4_-_Gummies_Nutrients_-_Teens_Magnesium_result.webp', 'tcm_5_-_Benefits_-_Teens_Magnesium_result.webp'],
  'the-no-junk-toddlers-multivitamin': ['toddlers-multi.png', 'trmv_3_-_Gummies_Nutrients_-_Toddlers_Multi_result.webp', 'trmv_4_-_Ingredients_-_Toddlers_Multi_result.webp', 'ingredients-trmv.webp', 'trmv_6_-_Benefits_-_Toddlers_Multi_result.webp', 'trmv_7_-_Why_First_Day_-_Toddlers_Multi_result.webp'],
  'toddlers-3-in-1-probiotic': ['toddlers-prob.png', 'trtb_3_-_Features_-_Toddlers_Tribiotics_result.webp', 'trtb4_-_Gummies_Nutrients_-_Toddlers_Tribiotics_result.webp', 'ingredients-trtb.webp', 'trtb5_-_Benefits_-_Toddlers_Tribiotics_result.webp', 'trtb6_-_Nutrition_-_Toddlers_Tribiotics_result.webp'],
  'kids-belly-biotic': ['kids-prob_4b7651d5-86e6-4eb3-8d96-e6d26e57c0e4.png', 'BenefitsList_1ac4fd90-9bbe-4a5e-b88e-727cdb15937c.jpg', 'Directionswithproduct-in-useimage_67ff7ac4-799e-41fe-bae1-a2d849725a10.jpg', 'Product3corefeatures_102b6f08-3d7d-4408-820f-4001c5b5b1ee.jpg', 'Socialmission_b8ae9fae-4b9c-4432-ac28-98897a4a4876.jpg', 'Testimonials_996fa6cd-824c-40ad-b438-42254f2b420f.jpg'],
  'teens-gut-sustainer': ['teens-prob.png', 'BenefitsList.jpg', 'Directionswithproduct-in-useimage.jpg', 'FD_Rebrand_ProductCarousels_NewLook_859fc0e5-6fcf-4a16-a44f-f1111644d2b5.jpg', 'Product3corefeatures.jpg', 'ProductUVP.jpg'],
  'womens-daily-focus': ['woman-brain.png', 'wdbf_3_-_Benefits_-_Women_s_Brain_Support_result.webp', 'wdbf_4_-_Gummies_Nutrients_-_Women_s_Brain_Support_result.webp', 'ingredients-wdbf.webp', 'wdbf_5_-_Benefits_-_Women_s_Brain_Support_result.webp', 'wdbf_6_-_Nutrition_-_Women_s_Brain_Support_result.webp'],
  'mens-gut-guardian': ['men-prob.png', 'mtb_3_-_Features_-_Men_s_Tribiotics_result.webp', 'mtb_4_-_Gummies_Nutrients_-_Men_s_Tribiotics_result.webp', 'ingredients-mtb.webp', 'mtb_5_-_Benefits_-_Men_s_Tribiotics_result.webp', 'mtb_6_-_Nutrition_-_Men_s_Tribiotics_result.webp'],
  'mens-daily-focus': ['men-brain.png', 'mdbf_3_-_Benefits_-_Men_s_Brain_Support_result.webp', 'mdbf_4_-_Gummies_Nutrients_-_Men_s_Brain_Support_result.webp', 'ingredients-mdbf.webp', 'mdbf_5_-_Benefits_-_Men_s_Brain_Support_result.webp', 'mdbf_6_-_Nutrition_-_Men_s_Brain_Support_result.webp'],
  'womens-good-gut': ['woman-prob.png', 'Benefits_List.jpg', 'Directions_with_product-in-use_image.jpg', 'Product_UVP.jpg', 'Product_3_core_features.jpg', 'Us_vs_them_table.jpg'],
  'mens-calming-magnesium': ['men-mag.png', 'mcm_10_-_Benefits_-_Women_s_Magnesium_result.webp', 'mcm_3_-_Benefits_-_Women_s_Magnesium_result.webp', 'mcm_4_-_Gummies_Nutrients_-_Women_s_Magnesium_result.webp', 'mcm_4_-_Ingredients_-_Men_s_Magnesium_result.webp', 'mcm_5_Product-Focused_Benefits_-_Men_s_Magnesium_result.webp'],
  'womens-calming-magnesium': ['woman-mag.png', 'wcm_10_-_Benefits_-_Women_s_Magnesium_result.webp', 'wcm_3_-_Benefits_-_Women_s_Magnesium_result.webp', 'wcm_4_-_Gummies_Nutrients_-_Women_s_Magnesium_result.webp', 'wcm_5_-_Benefits_-_Women_s_Magnesium_result.webp', 'wcm_6_-_Nutrients_-_Women_s_Magnesium_result.webp'],
  'mens-provisions-vitamin': ['men-multi.png', 'mdp_3_-_Gummies_Nutrients_-_Men_s_Multi_result.webp', 'ingredients-mdp.webp', 'mdp_9_-_Nutrition_-_Men_s_Multi_result.webp', 'mdp_4_-_Ingredients_-_Men_s_Multi_result.webp', 'mdp_6_-_Benefits_-_Men_s_Multi_result.webp'],
};
