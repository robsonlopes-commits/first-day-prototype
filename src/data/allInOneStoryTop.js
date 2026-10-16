import { customImg, shopImg } from '../lib/assets.js';
import { TEMPLATE as LANDING_T } from './landingTemplate.js';
import { TEMPLATE as QUIZ_T } from './bundleQuizTemplate.js';
import { TWO_UP_ROOT_CAUSES } from './pdpNewTwoUp.js';
import { LANDING } from './landing.js';

// EMOTIONAL STORYTELLING above the buy box of /explorations/all-in-1-bundle (new, added on top: nothing below the buy box changed).
// Modeled on the Behind the Science landing page (src/pages/LandingBTS.jsx): hero with headline / description / CTA / image and a creator quote
// (TempReploHero), Clinicians' Choice band (FrontrowBrandBand), then image + copy story blocks (PdpV2TwoUp, the new PDP two up), an accordion with
// icons (AccordionBlock, "Why we are the top multivitamin") and a closing note (PdpV2TwoUp). Everything is an EXISTING production section;
// this file only builds the { id, settings, blocks } each one takes, keyed by demo (kids / teens).
// Kids = picky eaters. Teens = busy schedule.
// IMAGES: every photo (public/assets/custom/aio-<demo>-<slot>.jpg) is an AI generated MOCKUP (Gemini, prompts in public/assets/custom/PROMPTS.md).
// CLAIMS: only production copy (kids Behind the Science page, product pages, bundle quiz, new PDP, founder note). New copy has no dashes, colons or semicolons.
const ACCENT = '#476ded';
const PURPLE = '#776CB1'; // --color-accent-purple
const BUY_BOX_SECTION = '#shopify-section-all-in-1-bundle-main';
const img = (demoId, slot) => customImg(`aio-${demoId}-${slot}.jpg`);

/* ---------- 1. hero: TempReploHero (BTS landing hero, creator quote block on Kids) ---------- */
const HERO = {
  kids: {
    headline: 'Dinner Should Not Feel Like A Negotiation. [You Are Not Doing It Wrong.]',
    description: '<p>Picky eating is hard on everyone at the table. You offer the broccoli. They push the plate away. You stay calm and try again tomorrow.</p><p>Picky eating is still the top reason parents choose First Day. Our four hero gummies give you one simple daily routine for nutrition, gut, focus and sleep.</p>',
    alt: 'A young child pushes away a plate of broccoli and rice while a parent sits patiently beside them.',
  },
  teens: {
    headline: 'Busy Days Move Fast. [You Are Not Doing It Wrong.]',
    description: '<p>Early alarms, long practices and late homework fill their day. Meals get skipped and sleep gets short. You cannot be at the table every time.</p><p>Our four hero gummies give your teen one simple daily routine for nutrition, gut, focus and sleep.</p>',
    alt: 'A teen heads out the door in the morning while a parent hands over a lunch bag.',
  },
};
const heroSec = LANDING_T.temp_replo_hero_RkYkXc;
export function heroProps(demo) {
  const h = HERO[demo.id] || HERO.kids;
  const kids = demo.id === 'kids';
  const quote = LANDING.kde.hero.creator; // production creator quote of the kids Behind the Science hero (Dr. Adam Smith), kids only
  const blocks = kids
    ? heroSec.blocks.filter((b) => b.type === 'temp-testimonial').map((b) => ({
      ...b, settings: { ...b.settings, avatar: shopImg(quote.avatar), name: quote.name, quote: quote.quote },
    }))
    : [];
  return {
    id: 'aio_story_hero',
    settings: {
      ...heroSec.settings, custom_css: heroSec.custom_css || [],
      headline: h.headline, description: h.description, cta_text: 'Meet Our All-in-1 Solution', fd_button: true, cta_url: BUY_BOX_SECTION,
      stars_text: LANDING.kde.hero.starsText, // production: "4.8 stars from 12,322+ reviewers"
      hero_image: img(demo.id, 'hero'), hero_image_mobile: img(demo.id, 'hero'), hero_image_alt: h.alt, mobile_image_full_width: true,
      headline_font_family: "'sofia-pro', sans-serif", headline_font_weight: 500, headline_font_size_desktop: 40, headline_font_size_mobile: 30,
      cta_font_weight: 400, hero_image_max_width_desktop: 520, padding_top_desktop: 40, padding_bottom_desktop: 40, above_the_fold: true,
    },
    blocks,
  };
}

/* ---------- 3. a day, four moments: heading (TimelineSection, heading only) + four PdpV2TwoUp story blocks ---------- */
const DAY_HEADING = {
  kids: ['If You Have A Picky Eater At Home,', 'This Is Probably Your Routine'],
  teens: ['If You Have A Busy Teen At Home,', 'This Is Probably Your Routine'],
};
const tlT = QUIZ_T.timeline_section_xei4R8;
export function dayHeadingProps(demo) {
  const [l1, l2] = DAY_HEADING[demo.id] || DAY_HEADING.kids;
  return {
    id: 'aio_day_heading',
    settings: {
      ...tlT.settings, heading_line_1: l1, heading_line_2: l2, accessibility_label: l1, background_color: '#ffffff', heading_alignment: 'center',
      padding_top_desktop: 80, padding_bottom_desktop: 16, padding_top_mobile: 48, padding_bottom_mobile: 8, heading_gap_desktop: 0, heading_gap_mobile: 0,
    },
    blocks: [],
  };
}

// slot order = the four products (nutrition, focus, gut, sleep as the day goes by): morning=multi, school=focus, dinner=gut, bedtime=sleep
const DAY_ORDER = [
  { slot: 'morning', role: 'multi', side: 'left' },
  { slot: 'school', role: 'focus', side: 'right' },
  { slot: 'dinner', role: 'gut', side: 'left' },
  { slot: 'bedtime', role: 'sleep', side: 'right' },
];
const HIGHLIGHT = { multi: 'Nutrition with the ', focus: 'Focus with the ', gut: 'Gut support with the ', sleep: 'Sleep support with the ' };
const DAY = {
  kids: [
    { badge: '☀️ Morning', heading: 'Breakfast Gets [Pushed Away]', alt: 'A young child in pajamas turns away from a bowl of oatmeal while a parent sits beside them.',
      body: '<p>The oatmeal sits untouched and the clock keeps moving. You wonder what they will eat today.</p><p>Our Kids\' Multivitamin has 21 organic superfoods and 9 nutrients most kids lack. It supplies what they need during important years of growth.*</p>' },
    { badge: '📚 School Day', heading: 'Homework Takes [Forever]', alt: 'A girl rests her chin on her hand and looks away from her homework while her mother points at the notebook.',
      body: '<p>Your child starts homework and instantly gets distracted. Simple tasks take forever. It\'s like their brain just won\'t stay put.</p><p>Daily Focus Brain Support has Cognizin®, sunflower Phosphatidylserine and Vitamin B3. It is daily brain nutrition for focus, memory and learning.*</p>' },
    { badge: '🍽️ Dinner', heading: 'Some Nights The Plate [Comes Back Full]', alt: 'A family of three at the dinner table while the child pokes at a small portion of pasta.',
      body: '<p>You cook. You coax. You try again tomorrow. That is love, not failure.</p><p>Our 3-in-1 Pre+ Post+ Probiotic is designed to promote gut health, support oral health, fortify immunity and improve overall wellness.*</p>' },
    { badge: '🌙 Bedtime', heading: 'Bedtime Turns Into A [Battle]', alt: 'A mother reads a picture book to a sleepy child tucked into bed.',
      body: '<p>Every parent knows the one more story and the one more glass of water. The night drags on and everyone ends up tired.</p><p>Our Nighttime Reset Magnesium is made with calming ingredients and has no melatonin hormones. It supports restful sleep and calm.*</p>' },
  ],
  teens: [
    { badge: '☀️ Morning', heading: 'Breakfast Gets [Skipped]', alt: 'A teen rushes through the kitchen with a backpack while breakfast waits on the counter.',
      body: '<p>The alarm goes late and the door closes fast. Breakfast stays on the counter.</p><p>Vitamin A and Vitamin B9 support cell growth and development, helping to fill in nutritional gaps when teens skip meals.* Our Teens\' Multivitamin brings an organic fruit and veggie blend plus 12 key nutrients.</p>' },
    { badge: '📚 School Day', heading: 'Motivation Runs [Low]', alt: 'A tired teen rests his head on his hand while studying at a laptop.',
      body: '<p>Homework piles up after a long day. Staying on track is hard.</p><p>Daily Focus Brain Support has Cognizin® for focus and memory, sunflower Phosphatidylserine for brain cell communication and Vitamin B3 for energy production in the brain.*</p>' },
    { badge: '🍽️ Dinner', heading: 'Dinner Comes [Late]', alt: 'A family at the dinner table in the evening with a teen in a sports jersey.',
      body: '<p>Practice runs long and dinner is whenever it happens.</p><p>Our Teens\' Probiotic+ has clinically studied pre, post and probiotics for digestive, immune and skin health.*</p>' },
    { badge: '🌙 Night', heading: 'Up All Night, [Tired All Day]', alt: 'A teen lies awake in bed at night.',
      body: '<p>Your teen is tired but cannot switch off.</p><p>Our Nighttime Reset Magnesium helps teens wind down before bed and sleep better at night. It has no melatonin hormones.</p>' },
  ],
};
const twoUpBase = TWO_UP_ROOT_CAUSES.settings;
const twoUpLook = {
  ...twoUpBase, container_max_width_desktop: 1200, wave_top: false, wave_bottom: false, section_bg_color: '#ffffff',
  heading_accent_color: PURPLE, badge_bg_color: 'rgba(119, 108, 177, 0.10)', badge_font_color: PURPLE, cta_url: BUY_BOX_SECTION,
  media_width_desktop: 400, media_height_desktop: 400, media_aspect_mobile: '4 / 5', media_height_mobile: 500, media_radius: 12,
  card_padding_desktop: 40, card_gap_desktop: 56, content_gap_desktop: 20,
};
export function dayChapters(demo) {
  const copy = DAY[demo.id] || DAY.kids;
  return DAY_ORDER.map((d, i) => {
    const c = copy[i];
    const it = demo.items.find((x) => x.key === d.role);
    return {
      id: `aio_day_${demo.id}_${d.slot}`, type: 'pdp-v2-two-up', custom_css: [],
      blocks: [{
        id: `hl-${d.slot}`, type: 'highlight',
        settings: { icon: it.image, icon_size: 64, font_family: "'sofia-pro', sans-serif", font_size_desktop: 16, font_size_mobile: 16, font_weight: 600, font_color: '#2c3d50', text: `${HIGHLIGHT[d.role]}${it.title}`, eyebrow: 'Our Solution', cta_text: 'Learn More', cta_url: BUY_BOX_SECTION },
      }],
      settings: {
        ...twoUpLook, anchor_id: '', media_position: d.side, image: img(demo.id, d.slot), image_alt: c.alt, image_before: img(demo.id, `${d.slot}-before`),
        badge_text: c.badge, heading: c.heading, body: c.body, cta_text: '', highlights_margin_top: 8,
        padding_top_desktop: 16, padding_bottom_desktop: 16, padding_top_mobile: 8, padding_bottom_mobile: 8,
        // mobile: each moment is its own contained card (hairline border, 16px radius, side gutters) and the 4:5 photo is cropped to 16:11
        // (the crop focus per photo is in bundle.css so the First Day bottle is never cut off)
        padding_left_mobile: 16, padding_right_mobile: 16,
        card_bg_color_mobile: '#ffffff', card_border_color_mobile: 'rgba(0, 0, 0, 0.1)', card_border_width: 1, card_radius: 16, card_padding_mobile: 16,
        // the before/after slider needs the whole scene (the faces carry the story), so the photo keeps its 4:5 frame on mobile
        media_aspect_mobile: '4 / 5',
      },
    };
  });
}

/* ---------- 4. behind the plate: AccordionBlock (layout of "Why we are the top multivitamin" on the kids BTS page, content explains the causes) ---------- */
const accT = LANDING_T.accordion_block_QpghhN;
const item = (id, icon, pos, heading, content) => ({ id, settings: { icon: icon.startsWith('aio-icon') ? customImg(icon) : shopImg(icon), icon_alt: '', icon_pos: pos, heading, content } });
// "Behind the plate": the science of what is happening in the world and in the body. Every item has the same two parts
// (what is happening, what you may notice at home) and every statement comes from published First Day pages
// (firstday.com/pages/hidden-hunger, /pages/vanishing-nutrients, /pages/our-science, the blog articles on hidden hunger, teen mood and
// nighttime magnesium, and the kids/teens Behind the Science pages).
const cause = (happening, notice) => `<p><strong>What is happening.</strong> ${happening}</p><p><strong>What you may notice.</strong> ${notice}</p>`;
const FOOD_WORLD = 'Over the last 50 years many fruits and vegetables have lost up to 75% of their nutritional value. Factory farming, depleted soil, excess CO2 and long storage times put yield and shelf life ahead of nutrient density.';
const ULTRA = 'Ultra-processed foods are calorie-dense but nutrient-poor, and they displace critical minerals the body depends on. Magnesium is one of the most affected. It supports nervous system regulation, sleep quality and stress response.';
const PLATE = {
  kids: {
    heading: 'What Is Happening [Behind The Plate]',
    subheading: 'Missing nutrients and Hidden Hunger can cause behavior outbursts, picky eating, and unsteady mood.',
    items: [
      item('a1', 'aio-icon-food.jpg', '', "Today's Food Has Fewer Nutrients",
        cause(FOOD_WORLD, 'A plate of fruits and veggies that may no longer deliver what it once did.')),
      item('a2', 'aio-icon-hidden.jpg', '', 'Hidden Hunger Builds Quietly',
        cause('Hidden hunger is a lack of nutrients, not a lack of food. A child can eat enough and still miss the vitamins and minerals their brain, immune system and growing body need. Over 50% of children globally are affected.', 'Low energy, getting sick often, cranky or worried moods and even full blown tantrums. Hidden hunger could be why.')),
      item('a4', 'aio-icon-mood.jpg', '', 'The Brain Runs Low On Mood Nutrients',
        cause('The brain needs specific nutrients to regulate emotions. Vitamin B6 plays a direct role in how it produces serotonin and dopamine, and methylfolate supports neurotransmitter production. When they run low, kids have a harder time managing their reactions.*', 'Meltdowns, snapping and trouble holding it together. It is easy to blame the phase.')),
      item('a5', 'aio-icon-signals.jpg', '', 'Brain Signals Need B Vitamins',
        cause('Vitamin B1 supports brain signaling, vitamin B2 maintains nerve function and vitamin B6 supports the pathways behind attention. Low levels of these B vitamins can affect how the brain signals, processes and retains information.*', 'Zoning out mid sentence or shutting down when homework gets hard.')),
      item('a6', 'aio-icon-ultra.jpg', '', 'Ultra-Processed Foods Crowd Out Magnesium',
        cause(ULTRA, 'Restlessness, irritability and trouble settling down at bedtime.')),
    ],
  },
  teens: {
    heading: 'What Is Happening [Behind A Busy Day]',
    subheading: 'A growing brain and food that has changed can leave gaps.',
    items: [
      item('a1', 'aio-icon-food.jpg', '', "Today's Food Has Fewer Nutrients",
        cause(FOOD_WORLD, 'Meals that look full but may not deliver the nutrients a growing body needs.')),
      item('a2', 'aio-icon-construction.jpg', '', 'A Brain Still Under Construction',
        cause('The prefrontal cortex, which handles planning, impulse control and emotional regulation, does not fully mature until the mid 20s. Meanwhile the amygdala, the emotional response center, is running the show.', 'Intense reactions, low impulse control and snapping at simple questions.')),
      item('a3', 'aio-icon-fuel.jpg', '', 'A Growing Brain Burns Through Fuel',
        cause('The brain is one of the hungriest organs in the body and during adolescence it rewires faster than at almost any other time. It needs vitamins, minerals, amino acids and healthy fats, but modern diets are high in refined carbs, added sugars and ultra-processed snacks. Skipped meals, caffeine and picky eating make it worse.', 'Feeling irritable, unfocused or wiped out by the end of the day.')),
      item('a4', 'aio-icon-nutrients.jpg', '', 'Key Nutrients Run Low',
        cause('Low levels of vitamin D, B12, folate and magnesium can quietly affect mood, energy and how the brain handles stress. Low levels of certain B vitamins can also affect brain function and attention.*', 'A little more irritable, anxious or tired than they should be, and harder to concentrate in class.')),
      item('a5', 'aio-icon-sleepclock.jpg', '', 'Sleep Rhythms Shift',
        cause(`Natural changes in the circadian rhythm disrupt sleep patterns in the teen years. ${ULTRA}`, 'Tired all day and wired at night.')),
    ],
  },
};
export function plateProps(demo) {
  const p = PLATE[demo.id] || PLATE.kids;
  return {
    id: 'aio_story_plate',
    settings: {
      ...accT.settings, custom_css: accT.custom_css || [], heading_size: 'h2', section_bg_color: '#f2fbff', waves: true, icon_badge_size: 56, icon_size: 52, icon_badge_size_mobile: 48, icon_size_mobile: 44, heading: p.heading, subheading: p.subheading,
      image: img(demo.id, 'plate'), image_mobile: img(demo.id, 'plate'), image_alt: '', image_ratio: 'adapt', image_h: 1500,
      button_label: 'Meet The Solution', guarantee_text: '', fd_button: true, cta_in_content: true, button_link: BUY_BOX_SECTION, open_first_accordion: true,
    },
    blocks: p.items,
  };
}

/* ---------- 5. parent / daily empathy note: PdpV2TwoUp, CTA scrolls to the buy box ---------- */
const EMPATHY = {
  kids: {
    badge: 'A Note To Parents', heading: 'Some Days Food Does Not Go To Plan. [You Still Showed Up.]',
    body: '<p>Picky eating is not a parenting failure. You keep offering new foods and staying patient.</p><p>We will never say a gummy replaces a balanced plate. We built the All-in-1 Bundle to help fill the gaps while you keep trying.</p>',
    alt: 'A mother hugs her daughter while they cook together in a bright kitchen.',
  },
  teens: {
    badge: 'A Note To Parents', heading: 'You Cannot Be There For Every Meal. [You Still Show Up.]',
    body: '<p>Teens grow up fast and their schedules are their own.</p><p>We will never say a gummy replaces a balanced plate. We built the All-in-1 Bundle to help fill the gaps while you keep showing up.</p>',
    alt: 'A mother and her teenage son talk and laugh at the kitchen island.',
  },
};
export function empathyProps(demo) {
  const e = EMPATHY[demo.id] || EMPATHY.kids;
  return {
    id: 'aio_story_empathy', type: 'pdp-v2-two-up', blocks: [], custom_css: [],
    settings: {
      ...twoUpLook, anchor_id: '', media_position: 'right', image: img(demo.id, 'empathy'), image_alt: e.alt, badge_text: e.badge, heading: e.heading, body: e.body,
      cta_text: 'See The Bundle', padding_top_desktop: 24, padding_bottom_desktop: 64, padding_top_mobile: 8, padding_bottom_mobile: 40,
      padding_left_mobile: 16, padding_right_mobile: 16,
      card_bg_color_mobile: '#ffffff', card_border_color_mobile: 'rgba(0, 0, 0, 0.1)', card_border_width: 1, card_radius: 16, card_padding_mobile: 16,
      media_aspect_mobile: '16 / 11',
    },
  };
}

// The 5 image slots per demo (+ plate) as a list, used by the guide and for preloading checks.
export const STORY_TOP_IMAGES = ['hero', 'morning', 'school', 'dinner', 'bedtime', 'plate', 'empathy'];
