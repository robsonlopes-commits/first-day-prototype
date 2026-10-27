import { customImg, shopImg } from '../lib/assets.js';
import { TEMPLATE as QUIZ_T } from './bundleQuizTemplate.js';
import { SCIENCE as QUIZ_SCIENCE, TIMELINE as QUIZ_TIMELINE } from './bundleQuiz.js';
import { getProduct } from './products.js';
import { getDemo } from './allInOneBundle.js';
import { heroProps as aioHero } from './allInOneStoryTop.js';
import { whyFourProps as aioWhy, timelineProps as aioTimeline, faqProps as aioFaq, closingProps as aioClosing, trustProps as aioTrust, TEENS_SCIENCE, TODDLERS_SCIENCE } from './allInOneStory.js';
import { TIERS } from './familyBox.js';

// Content of the whole page of the Family Box Builder exploration (/explorations/family-box-builder), written for a FAMILY (kids, toddlers, teens, mom, dad)
// instead of one audience. Every block is an EXISTING production section (same as the All-in-1 Bundle page); this file takes their Kids props and
// overrides the copy and the images. Angle: everyone at the table has different needs, so every person gets the formula made for their age, in one box
// that gets cheaper with every bottle. Facts come from published First Day pages (see the firstday-brand-knowledge skill): hidden hunger over 2 billion
// people (UNICEF), "most vitamins give a 4 year old a 17 year old dose" (new PDP), up to 40% of people cannot convert folic acid, choline, magnesium.
// New copy has no dashes, colons or semicolons. IMAGES: public/assets/custom/family-*.jpg, generated with Gemini on 2026-10-27 with the All-in-1 recipe (1K, close candid scenes,
// real bottles as references, label print fixed per bottle with tools/label-patch.sh), see PROMPTS.md.
const kids = () => getDemo('kids');
const BOX = '#family-box';
const img = (name) => customImg(name);

/* ---------- 1. hero ---------- */
export function familyHeroProps() {
  const h = aioHero(kids());
  return {
    ...h, video: undefined, mobileVideo: undefined, blocks: [], // no creator quote block and no video: the hero is a family photo
    settings: {
      ...h.settings,
      headline: 'Picky Kids. Busy Teens. Tired Parents. [Build One Box For The Whole Family.]',
      description: '<p>The little one pushes the broccoli away. The teen is up late and hungry again. You are running on coffee and skipped your own vitamins. Everyone at the table needs something different, and nobody gets the same plate.</p><p>Hidden hunger is a lack of nutrients, not a lack of food, and over 2 billion people worldwide live with it. Build one box with the right gummy for every age, and save more with every bottle you add.</p>',
      cta_text: 'Build My Family Box', cta_url: BOX,
      hero_image: img('family-hero.jpg'), hero_image_mobile: img('family-hero.jpg'),
      hero_image_alt: 'A family at the kitchen table in the morning, a tired mother pouring juice, a father with a coffee, a sleepy teen and a young boy pushing away his broccoli.',
    },
  };
}

/* ---------- 2. why one product is not enough: PdpV2TwoUp ---------- */
// The photo: the family of five of different ages (toddler, kid, teen, mom, dad), each one with their OWN bottle (to be generated, tools/family-images.sh).
export function familyWhyProps() {
  const w = aioWhy('kids');
  return {
    ...w,
    settings: {
      ...w.settings,
      image: img('family-why.jpg'),
      image_alt: 'A family of five of different ages in the kitchen, each one with their own First Day bottle.',
      heading: 'A Toddler, A Teen And A Parent Cannot Share One Vitamin. [Every Age Needs Its Own Formula.]',
      body: '<p>Most vitamins give a 4 year old a 17 year old dose. Each gummy in the box is made for its age, with nutrients and doses matched to it.</p><p>Add a gummy for each person and the whole box gets cheaper with every bottle.</p>',
      cta_text: 'Build My Family Box', cta_url: BOX,
    },
  };
}

/* ---------- 3. science: one tab per person ---------- */
const sciT = QUIZ_T.temp_science_module_wWLDWj;
const WOMEN = {
  desc: "<p>Between work, school runs and everyone else's needs, a mom's own nutrition is the first thing to slip. The Women's Multi is scientifically designed to help combat fatigue and exhaustion, with the nutrients the body needs to stay energized.*</p>",
  list: '<p>⚡ <strong>Nutrients for daytime energy</strong> to help combat fatigue and exhaustion*</p><p>✨ <strong>Biotin, Vitamin C and Vitamin E</strong> to support beauty*</p><p>🫐 <strong>Organic superfood blend</strong> with no fake sugars, no artificial colors and no fillers</p>',
};
const MEN = {
  desc: "<p>A busy dad runs on commutes, coffee and whatever is left on the kids' plates. The Men's Multi is a unique organic superfood blend plus 13 key nutrients, made for supported strength and vitality.*</p>",
  list: '<p>💪 <strong>13 key nutrients</strong> for supported strength and vitality*</p><p>🫐 <strong>Unique organic superfood blend</strong> for the modern lifestyle*</p><p>🚫 <strong>No fake sugars, no artificial colors and no fillers</strong></p>',
};
// The picture of each tab is a PHOTO of a real person in an everyday moment with that person's product (owner rule for this block), not an infographic.
// Kids, Toddlers and Teens use the approved photos of the All-in-1 page (copied to family-science-<tab>.jpg). Moms and Dads were generated with Gemini (2026-10-27).
const PHOTO_READY = ['kids', 'toddlers', 'teens', 'moms', 'dads'];
const PHOTO = {
  kids: { alt: "A young boy at the breakfast table with his Kids' Multivitamin bottle and a bowl of oatmeal.", pos: '50% 50%' },
  toddlers: { alt: "A toddler in a high chair at the table with her Toddlers' Multivitamin beside a plate of food.", pos: '50% 50%' },
  teens: { alt: "A teenager in the morning kitchen with her Teens' Multivitamin before school.", pos: '50% 50%' },
  moms: { alt: "A mother at the kitchen counter in the morning with her Women's Multivitamin and a cup of coffee.", pos: '50% 50%' },
  dads: { alt: "A father at the kitchen counter in the morning with his Men's Multivitamin and a packed gym bag.", pos: '50% 50%' },
};
export function familyScienceProps() {
  const proto = sciT.blocks[0].settings;
  const kt = QUIZ_SCIENCE.tabs[0]; // the Kids' multivitamin tab of the kids landing (its text)
  const tabs = [
    { key: 'kids', label: 'Kids', desc: kt.desc, list: kt.list },
    { key: 'toddlers', label: 'Toddlers', ...TODDLERS_SCIENCE.multi, handle: 'the-no-junk-toddlers-multivitamin' },
    { key: 'teens', label: 'Teens', ...TEENS_SCIENCE.multi, handle: 'teens-kickstart-vitamin' },
    { key: 'moms', label: 'Moms', ...WOMEN, handle: 'womens-supercharge-vitamin' },
    { key: 'dads', label: 'Dads', ...MEN, handle: 'mens-provisions-vitamin' },
  ];
  return {
    id: sciT.id,
    settings: {
      ...sciT.settings, custom_css: sciT.custom_css || [],
      heading: '<span class="science-tabs__heading-line">Every Age Needs Different Support</span><span class="science-tabs__heading-highlight">So Every Person Gets Their Own Box</span>',
      section_bg: '#ffffff',
    },
    blocks: tabs.map((t, i) => {
      const photo = PHOTO_READY.includes(t.key);
      return {
        id: `tab-${i}`,
        settings: {
          ...proto, tab_label: t.label, content_title: 'How This Helps*', content_description: t.desc, benefits_list: t.list,
          panel_image: photo ? img(`family-science-${t.key}.jpg`) : getProduct(t.handle).images[1],
          panel_image_alt: photo ? PHOTO[t.key].alt : `${t.label} multivitamin`, panel_image_pos: photo ? PHOTO[t.key].pos : '50% 50%', panel_video: '',
        },
      };
    }),
  };
}

/* ---------- 4. what to expect: TimelineSection ---------- */
export function familyTimelineProps() {
  const base = aioTimeline(kids());
  const items = [
    { badge: '7 Days', title: 'Stronger Daily Nutrition', body: 'Everyone at the table starts filling the gaps that skipped meals, picky plates and busy schedules leave, with nutrients matched to their age.' },
    { badge: '30 Days', title: 'Steadier Days For Everyone', body: 'With added nutrients such as B12 and B6, energy levels stay balanced for kids, teens and parents, so mornings and evenings feel more comfortable and on track.' },
    { badge: '60 Days', title: 'Healthier Habits At Home', body: 'When the gaps are filled and everyone feels better, healthier eating choices tend to follow, and the whole family builds a routine that sticks.' },
  ];
  return {
    ...base,
    settings: { ...base.settings, heading_line_1: QUIZ_TIMELINE.heading_line_1, heading_line_2: QUIZ_TIMELINE.heading_line_2 },
    blocks: items.map((it, i) => ({
      id: `m-${i}`,
      settings: { image: img(`family-timeline-${i + 1}.jpg`), image_alt: it.title, image_pos: '', badge_label: it.badge, title: it.title, description: `<p>${it.body}</p>` },
    })),
  };
}

/* ---------- 5. proof: the same trust block (the stat that is only about kids is left out) ---------- */
export const familyTrustProps = () => aioTrust('family');

/* ---------- 6. FAQ ---------- */
const [T1, T2, T3, T4] = TIERS.map((t) => t.pct);
const FAQ_ROWS = [
  ['What is a Family Box?', '<p>It is one order with a box for every person in your family. Add a Kid, a Toddler, a Teen, a Mom or a Dad, then pick the gummies made for their age. Each person gets their own box.</p>'],
  ['How does the discount work?', `<p>The more bottles in your family box, the more you save. One bottle takes ${T1}% off, two take ${T2}%, three take ${T3}% and four or more take ${T4}%. The discount applies to every bottle in the box.</p>`],
  ['Which free gifts do I get?', '<p>Every bottle you add unlocks one free gift. Four bottles unlock all four, a reusable bottle, a weekly meal planner with recipes, an exclusive travel pod and a 10pk hydration drink mix.</p>'],
  ['Can I mix ages and products in one box?', '<p>Yes. Every person has their own box and every bottle counts toward the same discount and the same gifts.</p>'],
  ['Can I add or remove someone later?', '<p>Yes. Add or remove a person any time before you check out. Their box appears or disappears and your discount updates right away.</p>'],
  ['What does No Junk mean?', '<p>Our gummies have no fake sugars, no artificial colors and no fillers.</p>'],
  ['Is there a guarantee?', '<p>Yes. We offer a 45 day satisfaction guarantee on your first purchase.</p>'],
];
export function familyFaqProps() {
  const f = aioFaq(kids());
  return { ...f, blocks: FAQ_ROWS.map(([heading, row_content], i) => ({ id: `fbb-faq-${i}`, type: 'collapsible_row', settings: { heading, row_content, page: '' } })) };
}

/* ---------- 7. closing: the Home final CTA band ---------- */
export function familyClosingProps() {
  const c = aioClosing(kids());
  return {
    ...c,
    settings: {
      ...c.settings,
      heading: 'One Box.<br>The Whole <span>Family</span>',
      subheading: 'The right gummy for every age, and more savings with every bottle. Build your Family Box today.',
      button_text: 'Build My Family Box', button_aria: 'Build My Family Box', button_link: BOX,
    },
  };
}
