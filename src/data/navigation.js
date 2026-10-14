import { shopImg } from '../lib/assets.js';

// Navigation content captured from firstday.com (header-group.json blocks + the nav-* / footer-*-upd link lists).

export const announcement = {
  text: 'Fall Savings',
  badge: 'view sale offers',
  url: '/pages/sale',
};

// Header "Shop" mega menu (nav_family blocks) + their link lists (nav-toddlers, nav-kids, ...).
const p = (title, description, file, handle, isNew = false) => ({
  title,
  description,
  image: shopImg(file),
  url: `/products/${handle}`,
  isNew,
});

export const navFamilies = [
  {
    id: 'nav_family_toddlers', title: 'Toddlers', subtitle: '(2-4)', icon: 'toddler', url: '/pages/shop-by-age#toddlers',
    image: shopImg('image_3_a1e577a2-5d72-419b-b421-e5963d23f2ba.png'),
    products: [
      p("Toddlers' Multivitamin", 'Helps fill missing nutrients in young children.', 'toddlers-multi.png', 'the-no-junk-toddlers-multivitamin'),
      p("Toddlers' Probiotic+", 'For softer, easier to pass stools.', 'toddlers-prob.png', 'toddlers-3-in-1-probiotic'),
    ],
  },
  {
    id: 'nav_family_kids', title: 'Kids', subtitle: '(4-12)', icon: 'kid', url: '/pages/shop-by-age#kids', openByDefault: true,
    image: shopImg('1_8bf00870-4a86-4b43-ac13-a81e3af3674c.png'),
    products: [
      p("Kids' Multivitamin", 'Support for mood, behavior & picky eating.', 'kids-multi.png', 'kids-enrichment-vitamin'),
      p("Kids' Probiotic+", 'To support immunity, digestion, and oral health.', 'kids-prob_4b7651d5-86e6-4eb3-8d96-e6d26e57c0e4.png', 'kids-belly-biotic'),
      p("Kids' Magnesium", 'Melatonin-free support for relaxation & sleep.', 'kids-mag.png', 'kids-calming-magnesium'),
      p("Kids' Brain Support", 'Support for focus, learning, and behavior.', 'kids-brain.png', 'kids-daily-focus'),
      p("Kids' Starter Pack", 'Daily nutrition plus support for digestion, gut health & immunity.', 'Rebrand_Broad_Images_19.png', 'kids-tlc-starter-pack'),
      p("Kids' Day/Night Pack", 'Day and night support for growing kids. Ages 4-12.', '5_cebacdbb-14a7-4093-a961-4e3c973f118d.png', 'kids-dream-team-starter-pack'),
    ],
  },
  {
    id: 'nav_family_teens', title: 'Teens', subtitle: '(13-17)', icon: 'teen', url: '/pages/shop-by-age#teens',
    image: shopImg('2_af42135b-345a-456c-b655-8900f191cce4.png'),
    products: [
      p("Teens' Multivitamin", 'Support for motivation, energy & immunity.', 'teens-multi.png', 'teens-kickstart-vitamin'),
      p("Teens' Probiotic+", 'To support immunity, digestion, and skin health.', 'teens-prob.png', 'teens-gut-sustainer'),
      p("Teens' Magnesium", 'Melatonin-free support for relaxation & sleep.', 'teens-mag.png', 'teens-calming-magnesium'),
      p("Teens' Brain Support", 'Support for focus, learning, and memory recall.', 'teens-brain.png', 'teens-daily-focus'),
      p("Teens' Starter Pack", 'Supplements nutrition while also supporting skin health & immunity.', 'Rebrand_Broad_Images_20.png', 'teens-defense-starter-pack'),
      p("Teens' Day/Night Pack", 'Nutritional support for motivated days and calm nights. Ages 13+', '3_fc031422-e4a6-434a-bd2a-9b1ab2653b34.png', 'teens-dream-team-starter-pack'),
    ],
  },
  {
    id: 'nav_family_women', title: 'Women', subtitle: '(18+)', icon: 'woman', url: '/pages/shop-by-age#womens',
    image: shopImg('3_54b04dbc-9e14-4418-9eb6-8e732f30b949.png'),
    products: [
      p("Women's Multivitamin", 'Support for energy, skin & hair health.', 'woman-multi.png', 'womens-supercharge-vitamin'),
      p("Women's Probiotic+", 'To support immunity, digestion, and bloating.', 'woman-prob.png', 'womens-good-gut'),
      p("Women's Magnesium", 'Melatonin-free support for relaxation & sleep.', 'woman-mag.png', 'womens-calming-magnesium'),
      p("Women's Brain Support", 'Helps provide focus and calm mental energy.', 'woman-brain.png', 'womens-daily-focus'),
      p("Women's Starter Pack", 'Helps combat exhaustion while promoting gut health, immunity and vaginal health.', 'Rebrand_Broad_Images_21.png', 'womens-wellness-starter-pack'),
      p("Women's Day/Night Pack", 'Helps fight daytime exhaustion and nighttime stress. Ages 18+', '4_3d18595a-f37d-4ac7-99a3-6952d7f2e84c.png', 'womens-dream-team-starter-pack'),
    ],
  },
  {
    id: 'nav_family_men', title: 'Men', subtitle: '(18+)', icon: 'man', url: '/pages/shop-by-age#mens',
    image: shopImg('4_4d8f7961-2fb0-45d8-be49-d676c39e5549.png'),
    products: [
      p("Men's Multivitamin", 'Power-packed nutrition for men.', 'men-multi.png', 'mens-provisions-vitamin'),
      p("Men's Probiotic+", 'To support immunity, digestion, and recovery.', 'men-prob.png', 'mens-gut-guardian'),
      p("Men's Magnesium", 'Melatonin-free support for relaxation & sleep.', 'men-mag.png', 'mens-calming-magnesium'),
      p("Men's Brain Support", 'Bolsters focus, memory and mental clarity.', 'men-brain.png', 'mens-daily-focus'),
      p("Men's Starter Pack", 'Perform your best with enhanced nutrition & muscle strength.', 'Rebrand_Broad_Images_22.png', 'mens-power-up-starter-pack'),
      p("Men's Dream Team Starter Pack", 'Nutrition to help make it through the workday, and wind down afterwards. Ages 18+', 'Untitled_design_45.png', 'mens-dream-team-starter-pack'),
    ],
  },
];

// nav_category blocks ("Shop By Category" in the mobile drawer)
export const navCategories = [
  { title: 'Daily Vitamins', image: shopImg('1_c52d747b-af57-4639-94e8-4038088fb078.png'), url: '/pages/sale#vitamins' },
  { title: 'Calming Magnesium', image: shopImg('3_d9e36d9b-37e2-4bb5-8d70-02db79632fb4.png'), url: '/pages/sale#magnesium' },
  { title: '3-in-1 Probiotics', image: shopImg('2_33f81581-0196-41fd-b343-0cc047f3ff86.png'), url: '/pages/sale#probiotics' },
  { title: 'Brain Support', image: shopImg('4_278f00a3-315a-4e4d-bf6f-ba08899d82dd.png'), url: '/pages/sale#brain' },
];

// Learn menu (linklist nav-learn)
export const learnLinks = [
  { title: 'About Us', url: '/pages/about-us' },
  { title: 'Our Ingredients', url: '/pages/our-ingredients' },
  { title: 'Our Science', url: '/pages/our-science' },
  { title: 'Heavy Metals & Pesticides', url: '/pages/heavy-metals-and-pesticides' },
  { title: '2026 Hidden Health Crisis Report', url: '/pages/hidden-hunger' },
  { title: 'Vanishing Nutrients', url: '/pages/vanishing-nutrients' },
  { title: 'Vitamin Overconsumption', url: '/pages/vitamin-overconsumption' },
  { title: 'Blog', url: '/blogs/news' },
  { title: 'Is Your Family Nutrient Deficient?', url: '/pages/is-your-family-nutrient-deficient' },
];

export const shopLink = { title: 'Shop', url: '/pages/sale' };
export const learnLink = { title: 'Learn', url: '/blogs/news' };
export const subscribeLink = { title: 'Subscribe & Save', url: '/pages/sale' };

// Footer (footer-1-upd, footer-2-upd, footer-3-upd)
export const footerColumns = [
  [
    { title: 'Shop', url: '/pages/sale' },
    { title: 'About Us', url: '/pages/about-us' },
    { title: 'Rewards', url: '/pages/loyalty-program#rivo' },
  ],
  [
    { title: 'Reviews', url: '/pages/reviews' },
    { title: 'Account Login', url: 'https://account.firstday.com/orders' },
    { title: 'Blog', url: '/blogs/news' },
    { title: 'Refer A Friend', url: '/pages/refer-a-friend' },
  ],
  [
    { title: 'Careers', url: '/pages/careers' },
    { title: 'FAQ', url: 'https://hifirstday-egrhl1h2ylb.gorgias.help/' },
    { title: 'Contact Us', url: '/pages/contact-us' },
  ],
];

export const footerPolicies = [
  { title: 'Refund policy', url: '/policies/refund-policy' },
  { title: 'Privacy policy', url: '/policies/privacy-policy' },
  { title: 'Terms of service', url: '/policies/terms-of-service' },
  { title: 'Shipping policy', url: '/policies/shipping-policy' },
  { title: 'Cancellation policy', url: '/policies/subscription-policy' },
];

export const footerSocial = {
  facebook: 'https://facebook.com/firstday',
  instagram: 'https://instagram.com/firstday',
  tiktok: '',
};
