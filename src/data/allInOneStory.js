import { shopImg } from '../lib/assets.js';
import { TEMPLATE as QUIZ_T } from './bundleQuizTemplate.js';
import { SCIENCE as QUIZ_SCIENCE, TIMELINE as QUIZ_TIMELINE } from './bundleQuiz.js';
import { BRAND_NARRATIVE_PDP_NEW } from './pdpNewNarrative.js';
import { TWO_UP_ROOT_CAUSES, TWO_UP_FORMULA } from './pdpNewTwoUp.js';
import { COLLAPSIBLE_PDP_NEW } from './pdpNewBottom.js';
import { getProduct } from './products.js';
import { TRUST_PDP_NEW, TEMP_HERO_HOME } from './sharedSections.js';

// Storytelling content of the All-in-1 Bundle landing page (/explorations/all-in-1-bundle).
// Every section below is an EXISTING production section; this file only builds the { id, settings, blocks } it takes.
//   whyFour   PdpV2TwoUp           (new PDP two up, image left)
//   fourJobs  FdBrandNarrative     (new PDP "Why First Day" points, bottle in the icon disc)
//   science   TempScienceModule    (kids landing / bundle quiz science tabs, one tab per product)
//   timeline  TimelineSection      (kids landing / bundle quiz "What you can expect")
//   faq       CollapsibleContent   (new PDP FAQ)
//   closing   TempHero             (the Home final CTA with new copy per audience)
// Claims are taken from production copy only (product descriptions, kids landing, bundle quiz, new PDP). Audience changes (Kids = picky eaters,
// Teens = busy schedule) go through the demo id, not through duplicated sections.
const ACCENT = '#476ded';
const sh = (name) => (name ? shopImg(name) : '');
const BUY_BOX = '#product-purchase-content';

/* ---------- 2. why one gummy is not enough: PdpV2TwoUp ---------- */
const WHY = {
  kids: {
    image: sh('kde-facts.webp'), alt: "An infographic stating 93% of kids don't eat enough fruits or vegetables.",
    heading: "93% Of Kids Don't Eat Enough Fruits Or Vegetables. [One Gummy Cannot Cover Every Gap.]",
    body: '<p>Picky plates can mean gaps in nutrition. Gut, focus and sleep matter too.</p><p>The All-in-1 Bundle puts four gummies in one daily routine. You cover all four together.</p>',
  },
  teens: {
    image: '/assets/custom/aio-teens-facts.jpg', alt: 'An infographic of what the Teens multivitamin delivers: more folate than 3 cups of spinach, more vitamin B1 than 6 cups of broccoli, more vitamin D than 240 mushrooms and more vitamin B12 than 1 and three quarter cups of milk.',
    heading: "92% Of Kids Don't Get Enough Vitamin D3. [One Gummy Cannot Cover Every Gap.]",
    body: '<p>Bones, brain and mood are all being built at once. Gut, focus and sleep need support too.</p><p>The All-in-1 Bundle puts four gummies in one daily routine. You cover all four together.</p>',
  },
};
WHY.toddlers = {
  image: '/assets/custom/aio-toddlers-facts.jpg', alt: 'An infographic of what the Toddlers multivitamin is made of: 10 nutrients, 21 organic superfoods, real strawberry and orange flavor, and free from the top 9 allergens.',
  heading: "Over 50% Of Toddlers Don't Get Enough Choline. [One Gummy Cannot Cover Every Gap.]",
  body: '<p>Brain, growth and gut all need support at the same time. The multivitamin covers nutrition and the probiotic covers the gut.</p><p>The 2-in-1 Bundle puts both gummies in one daily routine. You cover both together.</p>',
};
export function whyFourProps(demoId) {
  const w = WHY[demoId] || WHY.kids;
  const base = TWO_UP_ROOT_CAUSES;
  return {
    id: 'aio_why_four', type: base.type, blocks: [],
    settings: {
      ...base.settings, anchor_id: 'why-four', image: w.image, image_alt: w.alt, heading: w.heading, body: w.body, badge_text: '💡 Did You Know?', section_bg_color: '#ffffff',
      media_width_desktop: 520, media_height_desktop: 520, media_aspect_mobile: '1 / 1', media_height_mobile: 360, card_padding_mobile: 16,
      heading_accent_color: ACCENT, badge_bg_color: '#e4f5ff', badge_font_color: '#486ced', cta_text: 'Build My Routine', fd_button: true, cta_url: BUY_BOX,
    },
  };
}

/* ---------- 3. four jobs: FdBrandNarrative (bottle in the icon disc) ---------- */
export function fourJobsProps(demo) {
  const base = BRAND_NARRATIVE_PDP_NEW;
  // Kids: one line of mechanism per product (a fact and what it does), the other audiences keep the product blurb
  const KIDS_JOB = {
    multi: "Up to 40% of kids can't convert folic acid. We use active methylfolate.",
    gut: 'The gut digests food and takes in nutrients. We support it with pre, pro and postbiotics.',
    focus: 'The brain uses choline to make acetylcholine, a messenger for attention and memory.',
    sleep: 'Magnesium helps calm the nervous system, with no melatonin hormones, for restful sleep.',
  };
  const TEENS_JOB = {
    multi: 'Vitamin D3 and Vitamin K2 work together to support bone development.*',
    gut: 'A growing teen has to absorb what they eat. We support the gut with pre, pro and postbiotics.',
    focus: 'A brain still maturing uses choline to make acetylcholine, a messenger for attention and memory.',
    sleep: 'The teen body clock shifts later. Magnesium helps calm the nervous system, with no melatonin hormones.',
  };
  const TODDLERS_JOB = {
    multi: 'Choline and B vitamins support brain and nervous system development.*',
    gut: 'Potty problems are often a gut issue. We support it with pre, pro and postbiotics.',
  };
  const JOB = { kids: KIDS_JOB, teens: TEENS_JOB, toddlers: TODDLERS_JOB }[demo.id];
  const point = (it, i) => ({
    id: `aio_job_${it.key}`, type: 'fd-narrative-point',
    settings: { column: i < Math.ceil(demo.items.length / 2) ? 'left' : 'right', icon: 'none', icon_image: it.image, custom_icon_color: '', title: it.label, body: `<p><strong>${it.title}.</strong> ${JOB ? JOB[it.key] : it.blurb}</p>` },
  });
  return {
    id: 'aio_four_jobs',
    settings: {
      ...base.settings, anchor_id: 'four-jobs', heading: `${demo.countWord} Jobs. [One Daily Routine.]`, image: '', show_image_mobile: false,
      heading_highlight_color: ACCENT, icon_disc: 112, icon_glyph_size: 140, column_width: 440, point_body_font_size_desktop: 16, point_body_font_weight: 400, icon_disc_bg: '#f2fbff', icon_color: ACCENT, show_cta_desktop: false, cta_text: '', cta_url: BUY_BOX,
    },
    blocks: demo.items.map(point),
  };
}

/* ---------- 4. science: TempScienceModule, one tab per product ---------- */
const sciT = QUIZ_T.temp_science_module_wWLDWj;
const SCI_LABEL = ['Daily Multivitamin', '3-in-1 Pre+ Post+ Probiotic', 'Daily Brain Support', 'Calming Magnesium'];
const KIDS_TAB = { multi: 0, gut: 3, focus: 1, sleep: 2 }; // index in the bundle quiz science tabs (multi, brain, magnesium, probiotic)
export const TEENS_SCIENCE = {
  multi: {
    desc: '<p>During the teen years growth plates are open, creating the areas where new bone is formed, but they do not stay open forever. That makes nutrition during this window especially important.</p>',
    list: '<p>🦴 <strong>Vitamin D3</strong> helps the body absorb calcium for growing bones*</p><p>🧬 <strong>Vitamin K2</strong> works with D3 to support bone development*</p><p>⚡ <strong>B vitamins</strong> help the body turn food into growth-fueling energy*</p><p>🫐 <strong>Organic fruit and veggie blend</strong> plus 12 key nutrients, with no fake sugars, no artificial colors and no fillers</p>',
  },
  gut: {
    desc: '<p>A growing body is only as good as what it absorbs. The gut is where the body digests food and takes in nutrients, and it is where immune health and skin health connect back to what teens eat.</p>',
    list: '<p>🛡️ <strong>Clinically studied pre, post and probiotics</strong> for digestive, immune and skin health*</p>',
  },
  focus: {
    desc: '<p>The prefrontal cortex, which handles planning and focus, keeps maturing until the mid 20s, and the brain is one of the hungriest organs in the body. It uses choline to make acetylcholine, a messenger for attention and memory.</p>',
    list: '<p>🎯 <strong>Cognizin®</strong> for focus and memory*</p><p>🧠 <strong>Sunflower Phosphatidylserine</strong> for brain cell communication*</p><p>💡 <strong>Vitamin B3</strong> for energy production in the brain*</p>',
  },
  sleep: {
    desc: '<p>The teen body clock shifts later, and ultra-processed foods are one of the things that crowd out magnesium, which helps calm the nervous system. A teen can be exhausted and still unable to switch off.</p>',
    list: '<p>🌙 <strong>Calming ingredients</strong> to wind down before bed*</p><p>🚫 <strong>No melatonin hormones</strong></p>',
  },
};
export const TODDLERS_SCIENCE = {
  multi: {
    desc: '<p>During the toddler years the brain, the bones and the immune system are all being built at once, and a picky plate does not always deliver what they need.</p>',
    list: '<p>🧠 <strong>Choline and B vitamins</strong> for brain and nervous system development*</p><p>🦴 <strong>Vitamin D3 and K2</strong> work together to support bone development*</p><p>🧬 <strong>Methylfolate</strong>, the active form of folate</p><p>🍓 <strong>21 organic superfoods</strong> in real strawberry and orange flavor</p>',
  },
  gut: {
    desc: "<p>Potty problems aren't just a training issue, they're often a gut issue. A healthy gut supports digestion, immunity, behavior and confidence.</p>",
    list: '<p>🥝 <strong>Livaux® prebiotic</strong> from whole fruit golden kiwi helps improve gut transit and fecal bulking*</p><p>🦠 <strong>Bacillus coagulans SNZ 1969® probiotic</strong> helps aid overall immune health*</p><p>🔥 <strong>Heat-treated postbiotic</strong> helps maintain a healthy immune response*</p>',
  },
};
const SCIENCE_BY_DEMO = { teens: TEENS_SCIENCE, toddlers: TODDLERS_SCIENCE };
export function scienceProps(demo) {
  const proto = sciT.blocks[0].settings;
  const kids = demo.id === 'kids';
  const blocks = demo.items.map((it, i) => {
    const kt = kids ? QUIZ_SCIENCE.tabs[KIDS_TAB[it.key]] : null;
    const gallery = getProduct(it.handle).images;
    return {
      id: `tab-${i}`,
      settings: {
        ...proto, tab_label: SCI_LABEL[i], content_title: 'How This Helps*',
        content_description: kids ? kt.desc : SCIENCE_BY_DEMO[demo.id][it.key].desc,
        benefits_list: kids ? kt.list : SCIENCE_BY_DEMO[demo.id][it.key].list,
        panel_image: kids ? sh(kt.image.file) : (gallery[1] || it.image), panel_image_alt: kids ? kt.image.alt : it.pdpTitle, panel_image_pos: kids ? kt.image.pos : '50% 50%', panel_video: '',
      },
    };
  });
  return { id: sciT.id, settings: { ...sciT.settings, custom_css: sciT.custom_css || [], heading: `<span class="science-tabs__heading-line">Solving Common Problems</span><span class="science-tabs__heading-highlight">From ${demo.items.length} Different Angles</span>`, section_bg: '#ffffff' }, blocks };
}

/* ---------- 5. what to expect: TimelineSection ---------- */
const tlT = QUIZ_T.timeline_section_xei4R8;
const OTHER_TIMELINE = (who) => [
  { title: 'Stronger Daily Nutrition', badge: '7 Days', body: 'Fills in the gaps that skipped meals and picky plates leave, with nutrients for growth, energy and everyday wellness, from the start.' },
  { title: 'Steadier Mood', badge: '30 Days', body: `With added nutrients such as B12 and B6, ${who} have their energy levels balanced, making each day more comfortable and on track.` },
  { title: 'Healthier Eating Habits', badge: '60 Days', body: `When nutrition gaps are filled and ${who} feel better, they start to make healthier eating choices.` },
];
const TL_IMAGES = {
  kids: [QUIZ_TIMELINE.items[0].image, QUIZ_TIMELINE.items[1].image, QUIZ_TIMELINE.items[2].image],
  teens: ['aio-teens-timeline-1.jpg', 'aio-teens-timeline-2.jpg', 'aio-teens-timeline-3.jpg'], // custom images (public/assets/custom)
  toddlers: ['aio-toddlers-timeline-1.jpg', 'aio-toddlers-timeline-2.jpg', 'aio-toddlers-timeline-3.jpg'],
};
export function timelineProps(demo) {
  const kids = demo.id === 'kids';
  const items = kids
    ? QUIZ_TIMELINE.items.map((it) => ({ title: it.title, badge: it.badge, body: it.body.replace(/<[^>]+>/g, '') }))
    : OTHER_TIMELINE(demo.id === 'toddlers' ? 'toddlers' : 'teens');
  const pos = kids ? ['', QUIZ_TIMELINE.items[1].pos, QUIZ_TIMELINE.items[2].pos] : ['', '', ''];
  return {
    id: tlT.id,
    settings: { ...tlT.settings, heading_line_1: QUIZ_TIMELINE.heading_line_1, heading_line_2: QUIZ_TIMELINE.heading_line_2, accessibility_label: QUIZ_TIMELINE.heading_line_1, background_color: '#ffffff' },
    blocks: items.map((it, i) => ({
      id: `m-${i}`,
      settings: { image: kids ? sh(TL_IMAGES[demo.id][i]) : `/assets/custom/${TL_IMAGES[demo.id][i]}`, image_alt: it.title, image_pos: pos[i], badge_label: it.badge, title: it.title, description: `<p>${it.body}</p>` },
    })),
  };
}

/* ---------- 7. FAQ: CollapsibleContent ---------- */
const FAQ_ROWS = (demo) => {
  const toddlers = demo.id === 'toddlers';
  const what = toddlers
    ? "<p>You get one bottle each of the Toddlers' Multivitamin and the Toddlers' 3-in-1 Pre+ Post+ Probiotic, both made for ages 2 to 3.</p>"
    : '<p>You get one bottle each of the Multivitamin, the 3-in-1 Probiotic, Daily Focus Brain Support and Nighttime Reset Magnesium for the audience you pick.</p>';
  return [
    [`What is in the ${demo.bundleName}?`, what],
    ['Can I buy one product at a time?', '<p>Yes. Open What\'s Inside on this page and add any product on its own. Each product costs less when it is in the bundle.</p>'],
    ['What is the difference between Monthly and One-Time?', '<p>Monthly delivers every month at our best price and you can cancel anytime. One-Time is a single order at a smaller discount.</p>'],
    ['Can I switch between Toddlers, Kids and Teens?', '<p>Yes. Use the tabs at the top of the buy box. The products, photos and prices update right away. Toddlers is for ages 2 to 3, Kids for 4 to 12 and Teens for 13 to 17.</p>'],
    ['Is there a free gift?', '<p>Yes. The bundle comes with four free gifts: tracked shipping, a reusable bottle, an exclusive travel pod and a 10pk hydration drink mix.</p>'],
    ['What does No Junk mean?', '<p>Our gummies have no fake sugars, no artificial colors and no fillers.</p>'],
    ['Is there a guarantee?', '<p>Yes. We offer a 45 day satisfaction guarantee on your first purchase.</p>'],
  ];
};
export function faqProps(demo) {
  const base = COLLAPSIBLE_PDP_NEW;
  return {
    id: 'aio-faq',
    settings: { ...base.settings, anchor_id: 'faq', footer_text: '' }, // same look as the FAQ of the new PDP (light blue rows with a plus)
    blocks: FAQ_ROWS(demo).map(([heading, row_content], i) => ({ id: `aio-faq-${i}`, type: 'collapsible_row', settings: { heading, row_content, page: '' } })),
  };
}
/* ---------- 8. closing: the final CTA of the Home ("Your Family's Health Can't Wait Another Day", TempHero), new copy per audience ---------- */
const CLOSING = {
  kids: {
    heading: "Tomorrow's Dinner<br>Can Feel <span>Different</span>",
    subheading: 'Four gummies. One daily routine. Start the Kids All-in-1 Bundle today.',
    button: "Get The Kids' Bundle",
  },
  toddlers: {
    heading: 'Maybe It Is Not<br>Just <span>A Phase</span>',
    subheading: "Nutrition and gut health in one daily routine. Start the Toddlers' 2-in-1 Bundle today.",
    button: "Get The Toddlers' Bundle",
  },
  teens: {
    heading: 'Their Growth Window<br>Is <span>Open Right Now</span>',
    subheading: 'Nutrition, gut, focus and sleep in one daily routine. Start the Teens All-in-1 Bundle today.',
    button: "Get The Teens' Bundle",
  },
};
export function closingProps(demo) {
  const c = CLOSING[demo.id] || CLOSING.kids;
  return {
    id: 'aio_closing_hero',
    settings: {
      ...TEMP_HERO_HOME.settings, anchor_id: '', heading_tag: 'h2', heading: c.heading, subheading: c.subheading,
      button_text: c.button, button_aria: c.button, button_link: '#shopify-section-all-in-1-bundle-main', secondary_text: '',
      mobile_heading_size: '32px', mobile_subheading_size: '16px', mobile_button_font_size: '16px', // mobile first: bigger type than the Home version
    },
  };
}


/* ---------- 6. proof: HomepageTrustSection (new PDP trust block). The "of kids ask for" stat only fits the Kids demo. ---------- */
export function trustProps(demoId) {
  const base = TRUST_PDP_NEW;
  // the user generated heart collage images (type 'image') are left out of the carousel: only expert quotes, videos, press and parent quotes stay
  const noCollage = base.blocks.filter((b) => b.type !== 'image');
  const kept = demoId === 'kids' ? noCollage : noCollage.filter((b) => !(b.type === 'stat' && /kids/i.test(JSON.stringify(b.settings))));
  // the original Yahoo logo and parent portrait have transparent padding / baked-in rounded corners, so they showed inset and clipped into a blob:
  // cropped copies (circle-only logo, photo-only portrait) sit flush left and fill their circle
  const CROPPED = { 'shopify://shop_images/ugc-4.png': '/assets/custom/aio-trust-ugc-diana.png', 'shopify://shop_images/yahoo-finance_9236f476-f945-44ed-9d3a-3162562687f4.png': '/assets/custom/aio-trust-yahoo-logo.png' };
  const blocks = kept.map((b) => {
    const st = { ...b.settings };
    if (CROPPED[st.image]) st.image = CROPPED[st.image];
    if (CROPPED[st.logo]) st.logo = CROPPED[st.logo];
    return { ...b, settings: st };
  });
  // title in the page pattern: two lines, the second one is the purple bold highlight
  return { ...base, settings: { ...base.settings, heading: 'Trusted By Experts\n[And Families Like Yours]', title_accent_color: '#776CB1' }, blocks };
}
