import { shopImg } from '../lib/assets.js';

// Mock cart data for the cart drawer (prices in cents). Product facts captured from firstday.com.
export const CART_CODE = 'PRIMEDEAL';
export const GUARANTEE_TEXT = '45-day money-back guarantee*';
export const SUBSCRIBE_EXTRA_PCT = 30; // "Subscribe & Save an EXTRA 30%" (upsell cards)
export const CHECKOUT_PLUS_FEE_CENTS = 167; // "Checkout+ 100% Satisfaction Guarantee • $1.67"

// Gift with purchase (theme settings minicart_gift_* + fd-cart-gwp-config fallback tier).
export const GIFT = {
  threshold: 7500, // cents of sale total
  value: 25,
  title: 'Rapid Hydration Electrolyte Support',
  description: 'How it works: Ignition is built around hydration that actually lands—giving your body the minerals it needs to absorb water, hold onto it, and feel steady and refreshed.'.slice(0, 120),
  image: shopImg('hydration-10-pack.png'),
};

// Upsell pool = cart-drawer-group.json ab_upsell_products (first 24). category: kids / teens / parents.
const u = (handle, title, file, price, rating, reviews, blurb) => ({
  handle,
  title,
  image: shopImg(file),
  price,
  rating,
  reviews,
  blurb,
  category: /teen/i.test(title) ? 'teens' : /kid/i.test(title) ? 'kids' : 'parents',
});

export const upsellPool = [
  u("kids-enrichment-vitamin", "The \"No Junk\"™ Kids’ Multi", "kids-multi.png", 3900, 4.73, 5106, "Support for mood, behavior & picky eating."),
  u("kids-calming-magnesium", "Kids’ Nighttime Reset Magnesium", "kids-mag.png", 3900, 4.71, 339, "Melatonin-free support for relaxation & sleep."),
  u("kids-daily-focus", "Kids' Daily Focus Brain Support", "kids-brain.png", 4900, 4.38, 48, "Support for focus, learning, and behavior."),
  u("kids-belly-biotic", "First Day - Kids' 3-in-1 Pre+ Post+ Probiotic", "kids-prob_4b7651d5-86e6-4eb3-8d96-e6d26e57c0e4.png", 4900, 4.78, 251, "To support immunity, digestion, and oral health."),
  u("kids-tlc-starter-pack", "Kids' TLC Starter Pack", "Rebrand_Broad_Images_19.png", 8800, 4.78, 251, "Daily nutrition plus support for digestion, gut health & immunity."),
  u("kids-dream-team-starter-pack", "Kids' Dream Team Starter Pack", "5_cebacdbb-14a7-4093-a961-4e3c973f118d.png", 7800, 4.71, 339, "Day and night support for growing kids. Ages 4-12."),
  u("teens-kickstart-vitamin", "The \"No Junk\"™ Teens’ Multi", "teens-multi.png", 3900, 4.63, 1485, "Support for motivation, energy & immunity."),
  u("teens-gut-sustainer", "First Day - Teens' 3-in-1 Pre+ Post+ Probiotic", "teens-prob.png", 4900, 4.76, 103, "To support immunity, digestion, and skin health."),
  u("teens-calming-magnesium", "Teens’ Nighttime Reset Magnesium", "teens-mag.png", 3900, 4.41, 148, "Melatonin-free support for relaxation & sleep."),
  u("teens-daily-focus", "Teens' Daily Focus Brain Support", "teens-brain.png", 4900, 4.38, 48, "Support for focus, learning, and memory recall."),
  u("teens-defense-starter-pack", "Teens' Defense Starter Pack", "Rebrand_Broad_Images_20.png", 8800, 4.63, 1485, "Supplements nutrition while also supporting skin health & immunity."),
  u("teens-dream-team-starter-pack", "Teens' Dream Team Starter Pack", "3_fc031422-e4a6-434a-bd2a-9b1ab2653b34.png", 7800, 4.63, 1485, "Nutritional support for motivated days and calm nights. Ages 13+"),
  u("womens-supercharge-vitamin", "The \"No Junk\"™ Women’s Multi", "woman-multi.png", 3900, 4.84, 2419, "Support for energy, skin & hair health."),
  u("womens-good-gut", "First Day - Women's 3-in-1 Pre+ Post+ Probiotic", "woman-prob.png", 4900, 4.87, 219, "To support immunity, digestion, and bloating."),
  u("womens-calming-magnesium", "Women’s Nighttime Reset Magnesium", "woman-mag.png", 3900, 4.86, 451, "Melatonin-free support for relaxation & sleep."),
  u("womens-daily-focus", "Women's Daily Focus Brain Support", "woman-brain.png", 4900, 4.38, 48, "Helps provide focus and calm mental energy."),
  u("womens-wellness-starter-pack", "Women's Wellness Starter Pack", "Rebrand_Broad_Images_21.png", 8800, 4.87, 219, "Helps combat exhaustion while promoting gut health, immunity and vaginal health."),
  u("womens-dream-team-starter-pack", "Women's Dream Team Starter Pack", "4_3d18595a-f37d-4ac7-99a3-6952d7f2e84c.png", 7800, 4.86, 451, "Helps fight daytime exhaustion and nighttime stress. Ages 18+"),
  u("mens-provisions-vitamin", "The \"No Junk\"™ Men’s Multi", "men-multi.png", 3900, 4.9, 333, "Power-packed nutrition for men."),
  u("mens-gut-guardian", "Men's 3-in-1 Pre+ Post+ Probiotic", "men-prob.png", 4900, 4.93, 42, "To support immunity, digestion, and recovery."),
  u("mens-daily-focus", "Men's Daily Focus Brain Support", "men-brain.png", 4900, 4.38, 48, "Bolsters focus, memory and mental clarity."),
  u("mens-calming-magnesium", "Men’s Nighttime Reset Magnesium", "men-mag.png", 3900, 4.95, 19, "Melatonin-free support for relaxation & sleep."),
  u("mens-power-up-starter-pack", "Men's Power-Up Starter Pack", "Rebrand_Broad_Images_22.png", 8800, 4.93, 42, "Perform your best with enhanced nutrition & muscle strength."),
  u("mens-dream-team-starter-pack", "Men's Dream Team Starter Pack", "Untitled_design_45.png", 7800, 4.95, 19, "Nutrition to help make it through the workday, and wind down afterwards. Ages 18+"),
];
export const upsellTabs = [
  { id: 'kids', label: 'For Kids' },
  { id: 'teens', label: 'For Teens' },
  { id: 'parents', label: 'For Parents' },
];

const byHandle = (h) => upsellPool.find((p) => p.handle === h);
// Line items: subscription price = 40% off ($49.00 -> $29.40, the screenshot line).
const line = (handle, qty = 1) => {
  const p = byHandle(handle);
  return { key: `${handle}:sub`, handle, title: p.title, image: p.image, qty, compare: p.price, price: Math.round(p.price * 0.6), delivery: 'Delivered Monthly' };
};

export const SCENARIOS = {
  progress: () => [line('kids-belly-biotic')], // $29.40 -> "$45.60 away from a FREE $25 GIFT!"
  unlocked: () => [line('kids-belly-biotic'), line('kids-enrichment-vitamin', 2)], // $29.40 + $46.80 = $76.20 -> gift unlocked
  empty: () => [],
};
