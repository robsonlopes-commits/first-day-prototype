import { shopImg } from '../lib/assets.js';
import { TEMPLATE as QUIZ_T } from './bundleQuizTemplate.js';
import { SCIENCE as QUIZ_SCIENCE, TIMELINE as QUIZ_TIMELINE } from './bundleQuiz.js';
import { PROBLEM_SIGNS_PDP_NEW, BRAND_NARRATIVE_PDP_NEW } from './pdpNewNarrative.js';
import { TWO_UP_ROOT_CAUSES, TWO_UP_FORMULA } from './pdpNewTwoUp.js';
import { COLLAPSIBLE_PDP_NEW } from './pdpNewBottom.js';
import { getProduct } from './products.js';
import { TRUST_PDP_NEW } from './sharedSections.js';

// Storytelling content of the All-in-1 Bundle landing page (/explorations/all-in-1-bundle).
// Every section below is an EXISTING production section; this file only builds the { id, settings, blocks } it takes.
//   problem   FdProblemSigns       (new PDP "3 signs" cards)
//   whyFour   PdpV2TwoUp           (new PDP two up, image left)
//   fourJobs  FdBrandNarrative     (new PDP "Why First Day" points, bottle in the icon disc)
//   science   TempScienceModule    (kids landing / bundle quiz science tabs, one tab per product)
//   timeline  TimelineSection      (kids landing / bundle quiz "What you can expect")
//   faq       CollapsibleContent   (new PDP FAQ)
//   closing   PdpV2TwoUp           (new PDP blue wavy band with white pill)
// Claims are taken from production copy only (product descriptions, kids landing, bundle quiz, new PDP). Audience changes (Kids = picky eaters,
// Teens = busy schedule) go through the demo id, not through duplicated sections.
const ACCENT = '#476ded';
const sh = (name) => (name ? shopImg(name) : '');
const BUY_BOX = '#product-purchase-content';

/* ---------- 1. problem: FdProblemSigns ---------- */
const kidsCard = (i, title) => ({ ...PROBLEM_SIGNS_PDP_NEW.blocks[i], settings: { ...PROBLEM_SIGNS_PDP_NEW.blocks[i].settings, title } });
const SIGN_IMAGES = { teens: 'tdk_2_-_Lifestyle_Image_-_Teens_Multi_result.webp' };
const signCard = (id, image, title, description) => ({ id, type: 'fd-problem-sign-card', settings: { image: sh(image), show_number: true, title, description } });
const SIGNS = {
  kids: {
    heading: '3 Signs Picky Eating May Be [Leaving Gaps.] See Results In Just A Few Weeks.',
    cards: [kidsCard(2, "They Won't Touch Dinner"), kidsCard(0, 'They Constantly Meltdown'), kidsCard(1, 'Their Speech Is Delayed')],
  },
  teens: {
    heading: '3 Signs A Busy Schedule May Be [Leaving Gaps.]',
    cards: [
      signCard('s1', SIGN_IMAGES.teens, 'Meals Get Skipped', '<p>Vitamin A and Vitamin B9 support cell growth and development, helping to fill in nutritional gaps when teens skip meals.*</p>'),
      signCard('s2', 'tdbf_5_-_Benefits_-_Teens_Brain_Support_result.webp', 'Motivation Runs Low', '<p>Vitamin B1 supports brain health and Vitamin B2 supports cognitive function, to help your teen stay on track while they balance school, sports, and everything in between.*</p>'),
      signCard('s3', 'tcm_5_-_Benefits_-_Teens_Magnesium_result.webp', 'Up All Night, Tired All Day', '<p>Our magnesium gummy helps teens wind down before bed and sleep better at night. It has no melatonin hormones.</p>'),
    ],
  },
};
export function problemProps(demoId) {
  const base = PROBLEM_SIGNS_PDP_NEW;
  const s = SIGNS[demoId] || SIGNS.kids;
  return {
    id: base.id,
    settings: {
      ...base.settings, anchor_id: 'warning-signs', heading: s.heading, heading_highlight_color: ACCENT, fact_bg_color: `${ACCENT}12`,
      list_aria_label: 'Signs of gaps in daily nutrition', cta_text: 'Fill The Gaps Today', fd_button: true, cta_url: BUY_BOX,
    },
    blocks: s.cards,
  };
}

/* ---------- 2. why one gummy is not enough: PdpV2TwoUp ---------- */
const WHY = {
  kids: {
    image: sh('kde-facts.webp'), alt: "An infographic stating 93% of kids don't eat enough fruits or vegetables.",
    heading: "93% Of Kids Don't Eat Enough Fruits Or Vegetables. [One Gummy Cannot Cover Every Gap.]",
    body: '<p>Picky plates can mean gaps in nutrition. Gut, focus and sleep matter too.</p><p>The All-in-1 Bundle puts four gummies in one daily routine. You cover all four together.</p>',
  },
  teens: {
    image: sh('tdk_facts.webp'), alt: 'Teens multivitamin facts infographic.',
    heading: 'Busy Days Ask A Lot. [One Gummy Cannot Do Four Jobs.]',
    body: '<p>School, sports and late nights fill the day. Nutrition, gut, focus and sleep all need support.</p><p>The All-in-1 Bundle puts four gummies in one daily routine. You cover all four together.</p>',
  },
};
export function whyFourProps(demoId) {
  const w = WHY[demoId] || WHY.kids;
  const base = TWO_UP_ROOT_CAUSES;
  return {
    id: 'aio_why_four', type: base.type, blocks: [],
    settings: {
      ...base.settings, anchor_id: 'why-four', image: w.image, image_alt: w.alt, heading: w.heading, body: w.body, badge_text: '💡 Did You Know?', section_bg_color: '#ffffff',
      media_width_desktop: 520, media_height_desktop: 520, media_aspect_mobile: '1 / 1', media_height_mobile: 360,
      heading_accent_color: ACCENT, badge_bg_color: '#e4f5ff', badge_font_color: '#486ced', cta_text: 'Build My Routine', fd_button: true, cta_url: BUY_BOX,
    },
  };
}

/* ---------- 3. four jobs: FdBrandNarrative (bottle in the icon disc) ---------- */
export function fourJobsProps(demo) {
  const base = BRAND_NARRATIVE_PDP_NEW;
  const point = (it, i) => ({
    id: `aio_job_${it.key}`, type: 'fd-narrative-point',
    settings: { column: i < 2 ? 'left' : 'right', icon: 'none', icon_image: it.image, custom_icon_color: '', title: it.label, body: `<p><strong>${it.title}.</strong> ${it.blurb}</p>` },
  });
  return {
    id: 'aio_four_jobs',
    settings: {
      ...base.settings, anchor_id: 'four-jobs', heading: 'Four Jobs. [One Daily Routine.]', image: '', show_image_mobile: false,
      heading_highlight_color: ACCENT, icon_disc: 112, icon_glyph_size: 140, column_width: 440, point_body_font_size_desktop: 16, point_body_font_weight: 400, icon_disc_bg: '#f2fbff', icon_color: ACCENT, show_cta_desktop: true, cta_text: 'Get The Bundle', cta_url: BUY_BOX,
    },
    blocks: demo.items.map(point),
  };
}

/* ---------- 4. science: TempScienceModule, one tab per product ---------- */
const sciT = QUIZ_T.temp_science_module_wWLDWj;
const SCI_LABEL = ['Daily Multivitamin', '3-in-1 Pre+ Post+ Probiotic', 'Daily Brain Support', 'Calming Magnesium'];
const KIDS_TAB = { multi: 0, gut: 3, focus: 1, sleep: 2 }; // index in the bundle quiz science tabs (multi, brain, magnesium, probiotic)
const OTHER_LISTS = {
  teens: {
    multi: '<p>🫐 <strong>Organic fruit and veggie blend</strong> plus 12 key nutrients</p><p>🚫 <strong>No fake sugars, no artificial colors, no fillers</strong></p>',
    gut: '<p>🛡️ <strong>Clinically studied pre, post and probiotics</strong> for digestive, immune and skin health</p>',
    focus: '<p>🎯 <strong>Cognizin</strong> for focus and memory</p><p>🧠 <strong>Sunflower Phosphatidylserine</strong> for brain cell communication</p><p>💡 <strong>Vitamin B3</strong> for energy production in the brain</p>',
    sleep: '<p>🌙 <strong>Calming ingredients</strong> to wind down before bed</p><p>🚫 <strong>No melatonin hormones</strong></p>',
  },
};
export function scienceProps(demo) {
  const proto = sciT.blocks[0].settings;
  const kids = demo.id === 'kids';
  const blocks = demo.items.map((it, i) => {
    const kt = QUIZ_SCIENCE.tabs[KIDS_TAB[it.key]];
    const gallery = getProduct(it.handle).images;
    return {
      id: `tab-${i}`,
      settings: {
        ...proto, tab_label: SCI_LABEL[i], content_title: 'How This Helps*',
        content_description: kids ? kt.desc : it.description,
        benefits_list: kids ? kt.list : OTHER_LISTS[demo.id][it.key],
        panel_image: kids ? sh(kt.image.file) : (gallery[1] || it.image), panel_image_alt: kids ? kt.image.alt : it.pdpTitle, panel_image_pos: kids ? kt.image.pos : '50% 50%', panel_video: '',
      },
    };
  });
  return { id: sciT.id, settings: { ...sciT.settings, custom_css: sciT.custom_css || [], heading: '<p>Solving Common Problems From 4 Different Angles</p>' }, blocks };
}

/* ---------- 5. what to expect: TimelineSection ---------- */
const tlT = QUIZ_T.timeline_section_xei4R8;
const OTHER_TIMELINE = (who) => [
  { title: 'Stronger Daily Nutrition', badge: '7 Days', body: 'Supports essential nutrients for growth, energy, and everyday wellness, to help you feel your best from the start.' },
  { title: 'Steadier Mood', badge: '30 Days', body: `With added nutrients such as B12 and B6, ${who} have energy levels balanced, making each day more comfortable and on track.` },
  { title: 'Healthier Eating Habits', badge: '60 Days', body: `When nutrition gaps are filled and ${who} feel better, they start to make healthier eating choices.` },
];
const TL_IMAGES = {
  kids: [QUIZ_TIMELINE.items[0].image, QUIZ_TIMELINE.items[1].image, QUIZ_TIMELINE.items[2].image],
  teens: ['tdk_2_-_Lifestyle_Image_-_Teens_Multi_result.webp', QUIZ_TIMELINE.items[1].image, QUIZ_TIMELINE.items[2].image],
};
export function timelineProps(demo) {
  const kids = demo.id === 'kids';
  const WHO = { teens: 'teens' };
  const items = kids
    ? QUIZ_TIMELINE.items.map((it) => ({ title: it.title, badge: it.badge, body: it.body.replace(/<[^>]+>/g, '') }))
    : OTHER_TIMELINE(WHO[demo.id]);
  const pos = ['', QUIZ_TIMELINE.items[1].pos, QUIZ_TIMELINE.items[2].pos];
  return {
    id: tlT.id,
    settings: { ...tlT.settings, heading_line_1: QUIZ_TIMELINE.heading_line_1, heading_line_2: QUIZ_TIMELINE.heading_line_2, accessibility_label: QUIZ_TIMELINE.heading_line_1, background_color: '#ffffff' },
    blocks: items.map((it, i) => ({
      id: `m-${i}`,
      settings: { image: sh(TL_IMAGES[demo.id][i]), image_alt: it.title, image_pos: pos[i], badge_label: it.badge, title: it.title, description: `<p>${it.body}</p>` },
    })),
  };
}

/* ---------- 7. FAQ: CollapsibleContent ---------- */
const FAQ_ROWS = [
  ['What is in the All-in-1 Bundle?', '<p>You get one bottle each of the Multivitamin, the 3-in-1 Probiotic, Daily Focus Brain Support and Nighttime Reset Magnesium for the audience you pick.</p>'],
  ['Can I buy one product at a time?', '<p>Yes. Open What\'s Inside on this page and add any product on its own. Each product costs less when it is in the bundle.</p>'],
  ['What is the difference between Monthly and One-Time?', '<p>Monthly delivers every month at our best price and you can cancel anytime. One-Time is a single order at a smaller discount.</p>'],
  ['Can I switch between Kids and Teens?', '<p>Yes. Use the tabs at the top or bottom of the page. The products, photos and prices update right away.</p>'],
  ['Is there a free gift?', '<p>Yes. Orders over $75 come with a free gift.</p>'],
  ['What does No Junk mean?', '<p>Our gummies have no fake sugars, no artificial colors and no fillers.</p>'],
  ['Is there a guarantee?', '<p>Yes. We offer a 45 day satisfaction guarantee on your first purchase.</p>'],
];
export function faqProps() {
  const base = COLLAPSIBLE_PDP_NEW;
  return {
    id: 'aio-faq',
    settings: { ...base.settings, anchor_id: 'faq', heading: 'FAQ', heading_accent_color: ACCENT, row_bg_color: '#ffffff', footer_text: '' },
    blocks: FAQ_ROWS.map(([heading, row_content], i) => ({ id: `aio-faq-${i}`, type: 'collapsible_row', settings: { heading, row_content, page: '' } })),
  };
}

/* ---------- 8. closing: blue wavy band with a white pill (PdpV2TwoUp, same look as the PDP "our formula" band) ---------- */
const CLOSING = {
  kids: ['Picky Eaters Need Support. [Give Them All Four.]', '<p>Four gummies. One daily routine. Start with the bundle today.</p>'],
  teens: ['A Busy Schedule Needs Support. [Give It All Four.]', '<p>Four gummies. One daily routine. Start with the bundle today.</p>'],
};
export function closingProps(demo) {
  const [heading, body] = demo.id === 'kids' ? CLOSING.kids : CLOSING.teens;
  const base = TWO_UP_FORMULA;
  return {
    id: 'aio_closing', type: base.type, blocks: [], custom_css: base.custom_css,
    settings: {
      ...base.settings, anchor_id: 'start-today', video: '', video_poster: '', heading, body, cta_text: 'Add The Bundle', fd_button: true, fd_button_variant: 'reversed', cta_url: BUY_BOX,
      image_alt: '',
    },
  };
}


/* ---------- 6. proof: HomepageTrustSection (new PDP trust block). The "of kids ask for" stat only fits the Kids demo. ---------- */
export function trustProps(demoId) {
  const base = TRUST_PDP_NEW;
  const blocks = demoId === 'kids' ? base.blocks : base.blocks.filter((b) => !(b.type === 'stat' && /kids/i.test(JSON.stringify(b.settings))));
  return { ...base, blocks };
}
