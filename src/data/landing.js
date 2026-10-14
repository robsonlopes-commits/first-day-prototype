// Content for page.lp-BTS-master (Behind the Science landing page). The template reads almost all copy from page metafields
// (custom.section_*), so the two audiences (kde = kids, tdk = teens) share one layout and only this data differs.
// Captured from https://firstday.com/pages/kde-behind-the-science-lp and /pages/TDK-behind-the-science-lp. Images are file names in
// shopify://shop_images/ (shopImg); rich-text values are the inner HTML of .metafield-rich_text_field.
import { TRUST_LP, COMPARISON_LP } from './sharedSections.js';

const HERO_VIDEO = 'firstday.com/cdn/shop/videos/c/vp/3f1b449e8ba645119e42b631b2d9a50b/3f1b449e8ba645119e42b631b2d9a50b.HD-720p-4.5Mbps-97240623.mp4';
const AVATAR = 'DoctorAdamSmith.png';

const heroCommon = {
  starsText: '4.8 stars from 12,322+ reviewers',
  cta: 'Unlock Better Nutrition 💪',
  creator: {
    avatar: AVATAR,
    name: 'Dr. Adam Smith',
    quote: '<p>"Vitamin A, included here as beta-carotene from whole-food sources, can be converted by the body to support healthy vision, normal growth, and the mucosal barriers that can help keep kids healthy."</p>',
  },
};

const ACCORDION_2_ITEMS = (audience) => [
  { icon: 'icon-broccoli.avif', pos: '49.121% 56.445%', title: 'Fights Hidden Hunger', body: "<p>80% of children don't eat enough fruits and veggies, contributing to a nutrient deficiency known as hidden hunger. Our gummies fight hidden hunger with essential nutrients critical to development.</p>" },
  { icon: 'old-icon-microscope.avif', pos: '49.121% 49.121%', title: 'Developed Alongside Harvard & Yale Scientists', body: '<p>Our product was crafted with input from leading scientists at Harvard and Yale, combining the latest research with high-quality ingredients to deliver a multivitamin parents can trust.</p>' },
  { icon: 'old-icon-atom-chemistry.avif', pos: '50.684% 51.66%', title: 'Backed by Modern Science', body: '<p>Vitamin B6 supports natural energy regulation, promoting healthier sleep patterns and making it easier for kids to get restful sleep.*</p>' },
  { icon: 'old-icon-stethoscope.avif', pos: '49.121% 49.121%', title: 'Pediatrician-Approved', body: '<p>Recommended by pediatricians, our multivitamin is designed to meet the unique needs of your family ensuring they get the support they need from a trusted source.</p>' },
  { icon: 'Rivo-Icon-Checkmark.svg', alt: 'A blue circle with a white check mark in the center, surrounded by a scalloped edge, resembling a verification badge.', title: 'Clean Label Project® Purity Award', body: '<p>Our products were independently tested by Clean Label Project® for harmful chemicals like heavy metals, pesticides, and plasticizers, exceeding typical industry practices.</p>' },
  { icon: 'icon-list-ingredients-sourcing.avif', pos: '6.152% 70.605%', title: 'Ingredients Sourcing and Dosage', body: '<p>We source each ingredient with care, choosing only the highest quality vitamins and minerals. Our dosage is tailored for teens, providing safe and effective support without risking overuse or unwanted additives.</p>' },
];

const kde = {
  hero: {
    ...heroCommon,
    headline: 'The [Science-Backed Vitamin] for Growing Kids Who Don\'t Get Enough Nutrients.',
    description: '<p>The only bio-matched multivitamin&nbsp;formulated specifically for kids&nbsp;with <span class="v1-hero-description-highlight">9 nutrients &amp; 21 superfoods</span> to support growing bones, behavior, and immunity.</p>',
    image: 'kde-multi-benefits.jpg',
    mobileImage: 'kde-multi-benefits.jpg',
    mobileImageFullWidth: true,
  },
  accordion1: {
    heading: 'Target 6 Symptoms of Nutrient Deficiencies with Just 2 Daily Gummies',
    image: 'kde-83_-improved-mood-behavior.avif', imgPos: '49.121% 32.422%', imgW: 1500, imgH: 1050,
    items: [
      { icon: '5_ff67ff98-ed7a-4682-b249-303fa10d0235.png', title: 'Stunted Growth', body: '<p>Vitamin D3 and Vitamin K2 work together to support bone development, while essential nutrients like B vitamins help the body turn food into growth-fueling energy.</p>' },
      { icon: 'icon-stress-moody.webp', alt: 'Stressed Face Icon', pos: '49.121% 52.148%', title: 'Stress & Mood Swings', body: '<p>With Vitamin B6 for mood regulation and Vitamin B12 for energy balance, these gummies help support emotional stability.*</p>' },
      { icon: 'icon-pencil.png', pos: '2.93% 95.605%', title: 'Difficulty Concentrating', body: '<p>With Vitamin B2 for focus support and Vitamin B1 for brain health, these gummies help kids stay focused and attentive, supporting cognitive function and clarity.*</p>' },
      { icon: 'icon-ice-cream.png', pos: '49.121% 50%', title: 'Sugar Cravings', body: '<p>Vitamin C and Vitamin B6 contribute to balanced energy levels, which can help reduce the body’s cravings for quick energy sources like sugar.*</p>' },
      { icon: 'icon-moon.avif', pos: '37.012% 18.164%', title: 'Poor Sleep Habits', body: '<p>Vitamin D3 and Magnesium work together to encourage restful sleep, so kids wake up refreshed and ready to conquer their goals.*</p>' },
      { icon: 'icon-broccoli.avif', pos: '49.121% 56.445%', title: 'Picky Eating', body: '<p>Vitamin A and Vitamin B9 support cell growth and development, helping to fill in nutritional gaps that teens may have when they only want junk food or continue to skip meals.*</p>' },
    ],
  },
  accordion2: {
    heading: "Why We Are the Top Kids' Multivitamin",
    image: 'kids-multi-holding-kde.avif', imgPos: '0.684% 0.879%', imgW: 1500, imgH: 1500,
    items: ACCORDION_2_ITEMS('kde'),
  },
};

const tdk = {
  hero: {
    ...heroCommon,
    headline: "The [Science-Backed Vitamin] for Growing Teenagers Who Don't Get Enough Nutrients.",
    description: '<p>The only bio-matched multivitamin&nbsp;formulated specifically for teenagers&nbsp;with <span class="v1-hero-description-highlight">12 nutrients &amp; 21 superfoods</span> to support growing bones, mood regulation, and immunity.</p>',
    video: HERO_VIDEO,
    mobileVideo: HERO_VIDEO,
    mobileImageFullWidth: true,
  },
  accordion1: {
    heading: 'Most Kids Are \n[Missing Key Nutrients]. Get Help in Just 2 Gummies.',
    image: 'wheel-teens-multi-tdk.avif', imgPos: '50.293% 48.926%', imgW: 1500, imgH: 1500,
    items: [
      { icon: '5_ff67ff98-ed7a-4682-b249-303fa10d0235.png', title: 'Stunted Growth', body: '<p>Vitamin D3 and Vitamin K2 work together to support bone development, while essential nutrients like B vitamins help the body turn food into growth-fueling energy.</p>' },
      { icon: 'icon-stress-moody.webp', alt: 'Stressed Face Icon', pos: '49.121% 52.148%', title: 'Stress & Mood Swings', body: '<p>With Vitamin B6 for mood regulation and Vitamin B12 for energy balance, these gummies help support emotional stability.*</p>' },
      { icon: 'icon-pencil.png', pos: '2.93% 95.605%', title: 'Lack of Motivation', body: '<p>Packed with Vitamin B1 for brain health and Vitamin B2 for cognitive support - to help your teen stay on track while they balance school, sports, and everything in between.*</p>' },
      { icon: 'icon-bad-skin.avif', alt: 'Skin with Pimple Icon.', pos: '50% 47.754%', title: 'Bad Skin', body: '<p>Vitamin A and Vitamin E support skin health, helping teens maintain a clear and balanced complexion.</p>' },
      { icon: 'icon-immunity.avif', pos: '50.098% 47.656%', title: 'Weakened Immunity', body: '<p>With immune-supporting Vitamin C and D3, plus key B vitamins that help keep their systems running smoothly. Our formula helps build a strong foundation to tackle whatever the day throws at them.</p>' },
      { icon: 'icon-moon.avif', pos: '37.012% 18.164%', title: 'Poor Sleep Habits', body: '<p>Vitamin D3 and Magnesium work together to encourage restful sleep, so kids wake up refreshed and ready to conquer their goals.*</p>' },
      { icon: 'icon-broccoli.avif', pos: '49.121% 56.445%', title: 'Picky Eating', body: '<p>Vitamin A and Vitamin B9 support cell growth and development, helping to fill in nutritional gaps that teens may have when they only want junk food or continue to skip meals.*</p>' },
    ],
  },
  accordion2: {
    heading: "Raising the Bar on Your Child's Nutrition",
    image: 'teens-multi-holding-tdk.avif', imgPos: '50% 48.926%', imgW: 1500, imgH: 1500,
    items: ACCORDION_2_ITEMS('tdk'),
  },
};


// ---- founder hero (last temp-replo-hero) ----
const FOUNDER_DESC = "<p>Did you know 1 in 3 Families have a nutrient deficiency? I created First Day&nbsp;to address the massive concerns with todays diet and it's negative effects on our families.</p><ul><li>The Average Person Consumes <span class=\"v1-hero-description-highlight\">52 Credit Cards’</span> Worth Of <span class=\"v1-hero-description-highlight\">Microplastics</span> Every Year. </li><li> <span class=\"v1-hero-description-highlight\">Artificial Food Additives</span> Are Found In <span class=\"v1-hero-description-highlight\">59%</span> Of Foods Today</li><li>Fresh Fruits &amp; Veggies Have <span class=\"v1-hero-description-highlight\">Lost Up To 73%</span> Of Their <span class=\"v1-hero-description-highlight\">Nutrients</span></li></ul><p>After learning about the massive amounts of sugar that were in typical kids multivitamins I reached out to 2 of the top researchers at Harvard and Yale. I explained my story to them, how I wanted to revolutionize the vitamin industry. After consulting with these experts to help us carefully formulate our vitamins, we are now a best selling multivitamin nationwide.</p><p>That's why we’re so confident First Day will help you get the results you want. If within the first 45 days you find yourself not completely satisfied, we’ll give you your money back - no questions asked.</p>";
kde.founder = { headline: 'From our Founder', description: FOUNDER_DESC, cta: 'Try Now', image: 'founder-alice.png' };
tdk.founder = { headline: 'From our Founder', description: FOUNDER_DESC, cta: 'Try Now', video: HERO_VIDEO, mobileVideo: HERO_VIDEO };

// ---- science tabs (temp-science-module); video = firstday.com/cdn/shop/videos/c/vp/<id>/<id>.<rendition>.mp4, poster = files/preview_images ----
const vp = (id, rendition) => `firstday.com/cdn/shop/videos/c/vp/${id}/${id}.${rendition}.mp4`;
const poster = (id) => `firstday.com/cdn/shop/files/preview_images/${id}.thumbnail.0000000000_small.jpg`;
const V_FOCUS = ['a80235b58deb4ad08c567013e029e0a4', 'HD-720p-4.5Mbps-79391373'];
const V_ENERGY = ['9e9ff2355ccf4cc9b95da1f7f7c943e3', 'HD-720p-2.1Mbps-79391370'];
const V_MOOD = ['cc10ff9ae6804bdf9ff1723916a187ac', 'HD-720p-1.6Mbps-79391372'];
const V_SKIN = ['434e19b2f80f4966a32568ff377de125', 'HD-720p-4.5Mbps-79391371'];
const V_GROWTH = ['e94c265d96bf4f66a0afb362aa497408', 'HD-1080p-4.8Mbps-92681817'];
const tab = (label, v, desc, list, title = 'How This Helps*') => ({ label, title, desc, list, video: vp(...v), poster: poster(v[0]) });
tdk.science = {
  heading: '<p>The Science Behind Our Multivitamin</p>',
  tabs: [
    tab('Focus in Class', V_FOCUS, '<p>Low levels of certain B vitamins can affect brain function and attention. During busy school days, this can make it harder to concentrate, stay sharp, or process new info.</p>', '<p>🧠 <strong>Vitamin B1</strong>&nbsp;supports brain signaling and memory.</p><p>🪄 <strong>Vitamin B2</strong>&nbsp;helps maintain healthy nerve function.</p><p>🧬 <strong>Vitamin B6</strong>&nbsp;plays a role in neurotransmitter production.</p>'),
    tab('Boosted Energy', V_ENERGY, "<p>When key vitamins like B6 or B12 run low, your teen's cells can’t make enough energy — leading to tiredness, brain fog, or feeling “off.” It’s common during growth, late nights, or busy school days.</p>", '<p>⚡️ <strong>Vitamin B6</strong>&nbsp;helps convert food into fuel.</p><p>🩸 <strong>Vitamin B12</strong>&nbsp;supports red blood cells that carry oxygen.</p><p>🍊 <strong>Vitamin C</strong>&nbsp;boosts iron absorption and energy metabolism.</p>'),
    tab('Balanced Moods', V_MOOD, '<p>Vitamin deficiencies can throw off the brain’s natural mood regulators, making teens feel irritable, anxious, or just not like themselves.</p>', '<p>🧠 <strong>Vitamin B6</strong>&nbsp;— supports serotonin and dopamine production</p><p>💭 <strong>Vitamin B12</strong>&nbsp;helps regulate mood and nervous system function</p><p>🌿 <strong>Magnesium</strong>&nbsp;promotes calm and emotional balance</p>'),
    tab('Clear Skin', V_SKIN, '<p>Teen breakouts can be triggered by hormonal changes and nutrient gaps. Especially when skin-supporting vitamins like A and C are running low.</p>', '<p>🍑 <strong>Vitamin A</strong>&nbsp;supports healthy skin cell turnover</p><p>🍊 <strong>Vitamin C</strong>&nbsp;helps with collagen production and healing</p><p>🛡️ <strong>Zinc</strong>&nbsp;fights inflammation and supports clear skin</p>'),
  ],
};
kde.science = {
  heading: '<p>Growth Support</p>',
  tabs: [
    tab('Growth Support', V_GROWTH, '<p><strong>92% of kids don’t get enough vitamin D3</strong> — a nutrient their bodies need to absorb calcium and support growing bones. During adolescent years, growth plates open, creating the areas where new bone is formed. But they don’t stay open forever. That makes proper nutritional support during this window especially important.</p>', '<p>🦴 <strong>Vitamin D3 -</strong> Supports healthy bones during a critical stage of growth*<br>\n<br>\n<strong> </strong>🧬 <strong>Folate (B9 / methylfolate) -</strong> Supports DNA synthesis and cell growth*<br>\n<br>\n🧠 <strong>Vitamin B1 (Thiamine)</strong> – supports development of the nervous system*</p>', 'How This Helps'),
    tab('Behavior', V_FOCUS, "<p>When kids melt down, snap, or can't hold it together it's easy to blame the phase. But the brain needs specific nutrients to regulate emotions. When those run low, kids literally can't manage their reactions.</p>", '<p>🧠 <strong>Methylfolate (not folic acid)&nbsp;</strong>— the bioavailable form that supports neurotransmitter production regardless of genetic variation*</p><p>⚡ <strong>Vitamin B6</strong>&nbsp;— plays a direct role in how the brain produces serotonin and dopamine*</p><p>🫐 <strong>21 organic superfoods</strong>&nbsp;— delivers whole-food nutrients that support healthy brain development*</p>', 'How This Helps'),
    tab('Focus & Attention', V_ENERGY, "<p>A kid who zones out, loses focus mid-sentence, or shuts down when tasks get hard isn't necessarily struggling with attention, they may just be running low on the B vitamins their brain needs to signal, process, and retain information.</p>", '<p>🧠 <strong>Vitamin B1</strong>&nbsp;— supports brain signaling and working memory*</p><p>🪄 <strong>Vitamin B2</strong>&nbsp;— maintains the nerve function kids need to stay sharp through a full school day*</p><p>🧬 <strong>Vitamin B6</strong>&nbsp;— supports the neurotransmitter pathways that drive attention and cognitive clarity*</p>', 'How This Helps'),
    tab('MTHFR Support', V_SKIN, '<p>Up to 40% of kids have the MTHFR gene that prevents them from converting folic acid, the cheap form of folate that almost every other vitamin uses. This means they’re not absorbing a critical nutrient they need for development.</p>', '<p>🧬 <strong>Methylfolate (as L-methylfolate)&nbsp;</strong>— the active form of folate; absorbed and used immediately without conversion, even in kids with MTHFR*</p><p>🧠 Vitamin B12 (as methylcobalamin) — another carefully selected form; supports healthy nerve function and red blood cell development*</p><p>🫐 <strong>21 organic superfoods</strong>&nbsp;— delivers folate and B vitamins in whole-food form, the way the body expects to receive them*</p>', 'How This Helps'),
  ],
};

// ---- kids only: expectation timeline + benefits split (the metafields are empty for teens, so the sections render nothing there) ----
kde.timeline = {
  heading_line_1: 'Lifechanging Results You Can Expect', heading_line_2: "From The Kids' Daily Multi",
  items: [
    { image: 'kids-multi-lifestyle.jpg', badge: '7 Days', title: 'Stronger Daily Nutrition', body: '<p><span class="metafield-multi_line_text_field">Supports essential nutrients for growth, energy, and everyday wellness—helping kids feel their best from the start.</span></p>' },
    { image: '12_046620e6-093c-446a-a7bc-ee7495aba799.png', pos: '41.504% 15.625%', badge: '30 Days', title: 'Steadier Mood', body: '<p><span class="metafield-multi_line_text_field">With added nutrients such as B12 and B6, kids have their energy levels balanced, making them more comfortable and on track every day.</span></p>' },
    { image: 'kde-verggies-fruits.jpg', pos: '50.488% 49.121%', badge: '60 Days', title: 'Healthier Eating Habits', body: '<p><span class="metafield-multi_line_text_field">When your child feels better after having their nutrition gaps filled, they start to make healthier eating choices.</span></p>' },
  ],
};
kde.benefits = {
  heading: "Benefits You Don't Want To Miss Out On",
  body: "<p>We've crafted a formula specifically for kids ages 4–12, using carefully selected vitamin forms their bodies <strong>can actually absorb</strong>. No artificial sweeteners, no megadosing, no shortcuts.</p><p>Our ingredients are chosen to close the nutrient gaps that show up in real kids with real diets, the picky eaters, the chicken nuggets every meal, the kids who won't touch a vegetable.</p>",
  button_label: 'Shop Now', button_link: '#standalone-product-section',
  cards: [
    { icon: 'sun-icon.png', pos: '50.098% 49.121%', title: 'Behavior', text: '<p>Methylfolate and Vitamin B6 support the neurotransmitter production that helps kids regulate emotions and reactions.*</p>' },
    { icon: 'focus.svg', title: 'Focus & Attention', text: '<p>Vitamins B1, B2, and B6 support brain signaling, nerve function, and the cognitive pathways needed to stay on task.*</p>' },
    { icon: 'mthfr.avif', pos: '49.121% 48.926%', title: 'MTHFR & Folate Support', text: "<p>First Day uses methylfolate, not folic acid — the bioavailable form that works for all kids, including the 40% whose bodies can't convert folic acid.*</p>" },
  ],
};


// ---- standalone product (buy box). The product comes from page metafield custom.main_product_for_purchase; the first gallery image is the
// product metafield pdp_override_first_carousel_media. Prices as in the owner's screenshots (30% off monthly, code BUNDLEBUILDER one-time). ----
const INGREDIENTS_HTML = (blend) => `<p>We are thoughtful about the ingredients we select, use REAL organic fruits &amp; vegetables, and keep out long lists of ingredients that can't even be pronounced.</p><p><strong>Organic Superfood Blend:</strong>&nbsp;${blend}</p><p><strong>Other Ingredients:</strong>&nbsp;Tapioca Syrup‡, Cane Sugar‡, Water, Pectin, Citric Acid, Natural Flavors, Superfood Powdered Blend‡&nbsp;(Apple‡, Kale‡, Broccoli‡, Spinach‡, Carrot‡, Parsley‡, Beet‡, Green Cabbage‡, Raspberry‡, Blueberry‡, Strawberry‡, Tomato‡, Aronia Berry‡, Chlorella‡, Maca‡, Moringa‡, Reishi Mushroom‡, Cordyceps Mushroom‡, Lion's Mane Mushroom‡, Turmeric‡, Ginger‡), Carrot and Blackcurrant and Red Bell Pepper Juice for Color.<br> ‡Organic</p><p><strong>Free From The Top 9 Allergens:</strong>&nbsp;We are dairy-free, soy-free, egg-free, gluten-free, peanut-free, tree nut-free, fish-free, shellfish-free, and sesame-free.</p>`;
const BLEND = 'Apple, Kale, Broccoli, Spinach, Carrot, Parsley, Beet, Green Cabbage, Raspberry, Blueberry, Strawberry, Tomato, Aronia Berry, Chlorella, Maca, Moringa, Reishi Mushroom, Cordyceps Mushroom, Lion\'s Mane Mushroom, Turmeric, Ginger';
const SUBSCRIPTION_HTML = "<p>You'll receive a stylish refillable bottle on your first order, then receive our eco-friendly refill pouches every 30 days on a physician-recommended schedule.<br> <br> Plus, you'll receive these benefits:</p><ul><li>Savings every single month.</li><li>Free shipping on your first order.</li><li>Easy management - skip or pause whenever you need.</li><li>VIP access to sales, gifts, early access &amp; more.</li><li>Cancel anytime.</li></ul>";
const productCommon = {
  price: 39, discountPct: 30, coupon: 'BUNDLEBUILDER', savingsPerBottle: 15.6, maxQuantity: 4, defaultQuantity: 2, reviewsAllText: '11524 reviews',
  tabs: [{ label: "Toddlers'", href: '/products/the-no-junk-toddlers-multivitamin' }, { label: "Kids'", href: '/pages/kde-behind-the-science-lp' }, { label: "Teens'", href: '/pages/tdk-behind-the-science-lp' }],
  gift: { handle: 'rapid-hydration-electrolyte-support-gift', title: 'Rapid Hydration Electrolyte Support - Gift', value: 25, threshold: 75 },
  usp: [
    { src: 'image_17.png', alt: 'money back guarantee' }, { src: 'image_18_23f2a83f-a228-4c73-be70-3ac38b5837dd.png', alt: '1 million customers' }, { src: 'image_23.png', alt: 'secure checkout' },
  ],
};
kde.product = {
  ...productCommon, handle: 'kids-enrichment-vitamin', title: 'The "No Junk"™ Kids’ Multi', activeTab: 1, reviewsBadge: '5107 reviews', rating: 4.7,
  vanity: 'Daily Gummies For [Improved Mood & Behavior]',
  intro: "<p><strong>The #1 Fastest Growing Teens &amp; Kids Vitamin! </strong>Give your kids the nutrition they need to fight the effects of Hidden Hunger - with 21 organic superfoods &amp; just 2 delicious gummies a day!</p>",
  benefits: [
    { icon: 'Untitled_design_6_c5d8fdab-5f5c-4e08-80e0-45b7de988e78.png', heading: 'Enhanced Nutrition & Immunity', percent: '95%', text: "<p>of parents say First Day vitamins support their child's overall health &amp; immunity.† </p>" },
    { icon: 'Vector_6.png', heading: 'Boost Mood & Motivation', percent: '83%', text: "<p>of customers say First Day vitamins support their kids' overall mood &amp; behavior, and saw improved motivation for school.† </p>" },
    { icon: 'Group_1_2_c9058c0e-c38b-4b19-b4b5-60cb21c06b06.png', heading: 'Improved Sleep Routines', percent: '82%', text: "<p>said these vitamins are improving their child's overall bedtime routines &amp; sleep quality.† </p>" },
  ],
  gallery: [
    ['KDE-CLEAN-LABEL-FRONT-ROW.jpg', 'The "No Junk"™ Kids’ Multi'], ['kde_3_-_Gummies_Nutrients_-_Kids_Multi_result.webp'], ['ingredients-kde.webp'], ['kde_6_-_Benefits_-_Kids_Multi_result.webp'], ['kde_9_-_Nutrition_-_Kids_Multi_result.webp'],
    ['kde-facts.webp'], ['kde_7_-_Why_First_Day_-_Kids_Multi_result.webp'], ['kde_8_-_Social_Proof_-_Kids_Multi_result.webp'], ['kde_2_-_Lifestyle_Image_-_Kids_Multi_result.webp'], ['10_-_Back_Panel_-_Kids_Multi_result.webp'],
  ],
  ingredientsHtml: `<p>We are thoughtful about the ingredients we select, use REAL organic fruits &amp; vegetables, and keep out long lists of ingredients that can't even be pronounced.<br> <br> <strong>Organic Superfoods Blend:</strong> ${BLEND}.<br> <br> <br> <strong>Other Ingredients:</strong> Tapioca Syrup‡, Cane Sugar‡, Water, Pectin, Citric Acid, Natural Flavors, Superfood Powdered Blend‡ (Apple‡, Kale‡, Broccoli‡, Spinach‡, Carrot‡, Parsley‡, Beet‡, Green Cabbage‡, Raspberry‡, Blueberry‡, Strawberry‡, Tomato‡, Aronia Berry‡, Chlorella‡, Maca‡, Moringa‡, Reishi Mushroom‡, Cordyceps Mushroom‡, Lion's Mane Mushroom‡, Turmeric‡, Ginger‡), Carrot and Blackcurrant and Red Bell Pepper Juice for Color.<br> ‡Organic<br> <br> <strong>Free From The Top 9 Allergens:</strong> We are dairy-free, soy-free, egg-free, gluten-free, peanut-free, tree nut-free, fish-free, shellfish-free, and sesame-free.</p>`,
  factsImage: 'ingredients-kde.webp', factsPos: '50.0% 50.0%', subscriptionHtml: SUBSCRIPTION_HTML,
  crossAge: 'This Product is For Kids Ages <b>4 - 12</b>',
  cross: [{ title: 'Toddlers', subtitle: 'Ages 2 - 3', href: '/products/the-no-junk-toddlers-multivitamin' }, { title: 'Teens', subtitle: 'Ages 13 - 17', href: '/pages/tdk-behind-the-science-lp' }],
};
tdk.product = {
  ...productCommon, handle: 'teens-kickstart-vitamin', title: 'The "No Junk"™ Teens’ Multi', activeTab: 2, reviewsBadge: '1485 reviews', rating: 4.6,
  vanity: 'Daily Gummies For [Improved Motivation & Mood]',
  intro: "<p><strong>The #1 Fastest Growing Teens &amp; Kids Vitamin!</strong> A unique organic fruit and veggie blend, plus 12 key nutrients designed to help improve mood, behavior &amp; immunity.<br>\n<br>\n<strong>Flavor: 🍊 Orange</strong></p>",
  benefits: [
    { icon: 'Untitled_design_4_59d76314-c0d8-4be6-83d3-5fa1ebbee62c.png', heading: 'Improve Overall Health & Nutrition', percent: '98%', text: "<p>of parents say First Day vitamins support their teen's overall health &amp; nutrition.†</p>" },
    { icon: 'Vector_6.png', heading: 'Boost Mood & Motivation', percent: '83%', text: "<p>of customers say First Day vitamins support their teens' overall mood &amp; behavior, and saw improved motivation for school.† </p>" },
    { icon: 'Untitled_design_7_33850f18-3aa5-4e9f-bed6-6e1dab795659.png', heading: 'Promote Clear Skin', percent: '75%', text: '<p>said they saw an improvement to skin health, including reduced acne.† </p>' },
  ],
  gallery: [
    ['PDP-Teens-Multi-TDK-Override-Main.jpg', 'The "No Junk"™ Teens’ Multi'], ['tdk_3_-_Gummies_Nutrients_-_Teens_Multi_result.webp'], ['ingredients-tdk.webp'], ['tdk_6_-_Benefits_-_Teens_Multi_result.webp'], ['tdk_7_-_Why_First_Day_-_Teens_Multi_result.webp'],
    ['tdk_8_-_Social_Proof_result.webp'], ['tdk_9_-_Nutrition_-_Teens_Multi_result.webp'], ['tdk_facts.webp'], ['tdk_2_-_Lifestyle_Image_-_Teens_Multi_result.webp'], ['tdk_10_-_Back_Panel_-_Teens_Multi_result.webp'],
  ],
  ingredientsHtml: INGREDIENTS_HTML(`Organic Superfood Blend: ${BLEND}`),
  factsImage: 'ingredients-tdk.webp', factsPos: '80.176% 59.277%', subscriptionHtml: SUBSCRIPTION_HTML,
  crossAge: 'This Product is For Teens Ages <b>13 - 17</b>',
  cross: [{ title: 'Toddlers', subtitle: 'Ages 2 - 3', href: '/products/the-no-junk-toddlers-multivitamin' }, { title: 'Kids', subtitle: 'Ages 4 - 12', href: '/pages/kde-behind-the-science-lp' }],
};

// ---- Judge.me review widget (review_widget_homepage block, mocked) ----
const star5 = (r) => ({ stars: 5, ...r });
kde.reviews = {
  rating: '4.7', count: '5,107 reviews',
  summary: 'Kids\' multivitamin with clean ingredients that customers said "kids love the taste." Many noted improved mood, behavior, and energy after 1-2 weeks. However, some children found the smell and taste unpleasant or difficult to tolerate. Parents appreciate the low sugar and lack of artificial additives, though a few had issues with taste.',
  highlights: ['“Finally, my kids will take their vitamins!!”', "“After a week my 7 year old daughter said, 'I feel less angry.'”", '“Helped my 4 year old within the FIRST WEEK! He started sleeping through the night.”'],
  items: [
    star5({ name: 'Alyxandrah White', date: '10/11/2026', title: 'Has most of what my kids don’t have from food', body: 'it has a lot ,but not everything , my kids brains and bodies need! it’s low in sugar but has good taste and texture' }),
    star5({ name: 'Jessica Terrell', date: '10/08/2026', title: 'My son loves them!', body: 'My son loves them! I really like that they have real folate in them instead of Folic Acid.' }),
    star5({ name: 'Angela Sergio', date: '10/05/2026', title: 'My kids love these!', body: 'My kids love these!  So easy to get all their vitamins in in one easy step, throw them into their lunch boxes alongside welches fruit snacks and done!  I never have to worry about missing a day.' }),
    star5({ name: 'cynthia jenness', date: '10/04/2026', title: 'So far these are great! I have 2 boys gobbling', body: 'So far these are great! I have 2 boys gobbling them down every morning. Knowing they are getting good stuff in a yummy gummy is worth it!' }),
    star5({ name: 'Kay Taylor', date: '10/04/2026', title: '', body: 'I’m really happy with the First Day Kids Vitamins! My kids actually like taking them, which is a huge win because getting kids to take vitamins isn’t always easy. 😅 I also love that I feel good about adding them to our daily routine and helping fill in some of the nutritional gaps, especially on those days when my kids aren’t eating the way I’d like them to.' }),
  ],
};
tdk.reviews = {
  rating: '4.6', count: '1,485 reviews',
  summary: 'Teen multivitamin gummies with clean ingredients that customers say helped with mood, focus, and energy. Many noted improvements in behavior and daily routine. However, taste and smell are divisive - some teens love the flavor while others refuse them. Some reported texture issues with gummies sticking together. Subscription management concerns mentioned by several shoppers.',
  highlights: ["“My son said he's been in a better mood and can't explain why and he's been able to focus”", '“He wakes up happy. Sleeping better. Just all around better! Worth every penny.”', '“My son loves the flavor and takes them daily without having to be reminded.”'],
  items: [
    star5({ name: 'Yvette R', date: '10/09/2026', title: 'Tastes great!', body: 'My sons’ sleep and skin improved. They did not complain about taking these vitamins.' }),
    star5({ name: 'Anonymous', date: '10/06/2026', title: "Almost immediate change in my son's mood, and", body: "My 16 yr olds mood and temper was getting out of hand. Just asking simple, basic questions would set him off. I saw almost an immediate change for the better in my son's mood, and skin's condition. I had explained to him adding this multi vitamin could help you with your temperment. He must feel the difference himself, because he has willingly added this to his routine." }),
    star5({ name: 'Sherry A', date: '10/02/2026', title: 'good stuff', body: 'since beginning taking these vitamins, my son has been healthier' }),
    star5({ name: 'Vdub', date: '09/28/2026', title: 'Easy', body: 'My teen daughter used to take a liquid multi but that was such a hassle. These gummies are so easy to take and they aren’t full of junk.' }),
    star5({ name: 'Anonymous', date: '09/23/2026', title: 'My son loves', body: 'My son loves them!!' }),
  ],
};

// ---- FrontRowMD "clinician reviews" iframe (custom.frontrowmd_clinicians_reviews renders for the kids page only: its product-id mapping matches 'kde' but not 'TDK') ----
kde.clinicianReviews = true;
tdk.clinicianReviews = false;

//@@MORE@@

export const LANDING = { kde, tdk };
export { TRUST_LP, COMPARISON_LP };
