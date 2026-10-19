import { customImg, shopImg, extImg } from '../lib/assets.js';
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
    headline: 'Picky Eaters Need All The Support They Can Get. [Meet The All-in-1 Bundle.]',
    description: '<p>Picky eating is hard on everyone at the table. You offer the broccoli. They push the plate away. You stay calm and try again tomorrow.</p><p>It can feel like a phase. Sometimes it is a nutrient gap, and the plate is only part of the story. Our four hero gummies give you one simple daily routine for nutrition, gut, focus and sleep.</p>',
    alt: 'A young child pushes away a plate of broccoli and rice while a parent sits patiently beside them.',
  },
  teens: {
    headline: 'A Growing Teen Needs More Than One Vitamin. [Give Them All The Support They Can Get In One Bundle.]',
    description: '<p>Every parent notices when their teen looks smaller than their friends, even if nobody says it out loud. Growth plates are open during the teen years, creating the areas where new bone is formed, but they do not stay open forever.</p><p>Vitamin D3 and Vitamin K2 work together to support bone development.* Our four hero gummies give your teen one simple daily routine for nutrition, gut, focus and sleep.</p>',
    alt: '',
  },
  toddlers: {
    headline: 'Meltdowns, Late Words, Picky Plates. [Your Toddler Needs All The Support They Can Get.]',
    description: '<p>The meltdown out of nowhere. The words that are slow to come. The plate with only three foods on it. Every parent of a toddler has been told it is just a phase.</p><p>Sometimes there is a nutrient gap behind it. Our two hero gummies give your toddler one simple daily routine for nutrition and gut health, made for ages 2 to 3.</p>',
    alt: 'A father kneels on the kitchen floor and comforts his crying toddler daughter.',
  },
};
// Teens opens with the same video as the Teens Behind the Science landing page (a young soccer player smaller than his teammates, the bones, the gummy).
// Kids and Toddlers use AI video tests (Veo 3.1 Lite, no audio, problem then cause then solution, public/assets/custom/aio-<demo>-hero.mp4)
const HERO_VIDEO = { teens: LANDING.tdk.hero.video };
const HERO_LOCAL_VIDEO = { kids: '/assets/custom/aio-kids-hero.mp4', toddlers: '/assets/custom/aio-toddlers-hero.mp4' };
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
      headline: h.headline, description: h.description, cta_text: 'Meet Our Holistic Solution', fd_button: true, cta_url: BUY_BOX_SECTION,
      stars_text: LANDING.kde.hero.starsText, // production: "4.8 stars from 12,322+ reviewers"
      hero_image: img(demo.id, 'hero'), hero_image_mobile: img(demo.id, 'hero'), hero_image_alt: h.alt, mobile_image_full_width: true,
      headline_font_family: "'sofia-pro', sans-serif", headline_font_weight: 500, headline_font_size_desktop: 40, headline_font_size_mobile: 30,
      cta_font_weight: 400, hero_image_max_width_desktop: 520, padding_top_desktop: 40, padding_bottom_desktop: 40, above_the_fold: true,
    },
    blocks,
    video: HERO_LOCAL_VIDEO[demo.id] || (HERO_VIDEO[demo.id] ? extImg(HERO_VIDEO[demo.id]) : undefined),
    mobileVideo: HERO_LOCAL_VIDEO[demo.id] || (HERO_VIDEO[demo.id] ? extImg(HERO_VIDEO[demo.id]) : undefined),
  };
}

/* ---------- 3. a day, four moments: heading (TimelineSection, heading only) + four PdpV2TwoUp story blocks ---------- */
const DAY_HEADING = {
  kids: ['If You Have A Picky Eater At Home,', 'This Is Probably Your Routine'],
  teens: ["If You Worry About Your Teen's Growth,", 'You Will Recognize These Moments'],
  toddlers: ['If You Have Ever Been Told It Is Just A Phase,', 'You Will Recognize These Moments'],
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
// Toddlers have two products, so the four moments share them (three about the multi, one about the probiotic) and use their own photo slots
const DAY_ORDER_BY_DEMO = {
  toddlers: [
    { slot: 'meltdown', role: 'multi', side: 'left' },
    { slot: 'words', role: 'multi', side: 'right' },
    { slot: 'potty', role: 'gut', side: 'left' },
    { slot: 'picky', role: 'multi', side: 'right' },
  ],
};
const HIGHLIGHT = { multi: 'Nutrition with the ', focus: 'Focus with the ', gut: 'Gut support with the ', sleep: 'Sleep support with the ' };
const DAY = {
  kids: [
    { badge: '☀️ Morning', heading: 'Breakfast Gets [Pushed Away]', alt: 'A young child in pajamas turns away from a bowl of oatmeal while a parent sits beside them.',
      body: '<p>The oatmeal sits untouched and the clock keeps moving. You wonder what they will eat today.</p><p>Up to 40% of kids can\'t convert folic acid, the form most vitamins use. Our Kids\' Multivitamin uses methylfolate, which is already active, plus 21 organic superfoods for what a picky plate leaves out.*</p>' },
    { badge: '📚 School Day', heading: 'Homework Takes [Forever]', alt: 'A girl rests her chin on her hand and looks away from her homework while her mother points at the notebook.',
      body: '<p>Your child starts homework and instantly gets distracted. Simple tasks take forever. It\'s like their brain just won\'t stay put.</p><p>The brain uses choline to make acetylcholine, a messenger involved in attention, learning and memory. Daily Focus Brain Support has Cognizin® citicoline, sunflower Phosphatidylserine and Vitamin B3 for focus, memory and learning.*</p>' },
    { badge: '🍽️ Dinner', heading: 'Some Nights The Plate [Comes Back Full]', alt: 'A family of three at the dinner table while the child pokes at a small portion of pasta.',
      body: '<p>You cook. You coax. You try again tomorrow. That is love, not failure.</p><p>When the plate comes back full, what little gets eaten has to count. The gut is where the body digests food and takes in nutrients, and our 3-in-1 Pre+ Post+ Probiotic is designed to support gut health, digestion and immunity.*</p>' },
    { badge: '🌙 Bedtime', heading: 'Bedtime Turns Into A [Battle]', alt: 'A mother reads a picture book to a sleepy child tucked into bed.',
      body: '<p>Every parent knows the one more story and the one more glass of water. The night drags on and everyone ends up tired.</p><p>Magnesium helps calm the nervous system, and ultra-processed foods are one of the things that crowd it out of the diet. Our Nighttime Reset Magnesium is made with calming ingredients and has no melatonin hormones, to support restful sleep and calm.*</p>' },
  ],
  teens: [
    { badge: '📏 The Door Frame', heading: 'The Pencil Mark Barely [Moved]', alt: 'A mother marks a pencil line on the kitchen door frame above her teenage son, who stands against it with his head down.',
      body: '<p>You measure them against the door frame again. The mark is barely above last year\'s and their friends keep shooting up. You say nothing, but you worry.</p><p>Growth plates are open during the teen years, creating the areas where new bone is formed, but they do not stay open forever. Vitamin D3 and Vitamin K2 work together to support bone development, while B vitamins help the body turn food into growth-fueling energy.* Our Teens\' Multivitamin adds an organic fruit and veggie blend plus 12 key nutrients.</p>' },
    { badge: '📚 School Day', heading: 'Their Mind Drifts [In Class]', alt: 'A tired teen girl stares out of the classroom window instead of following the lesson while classmates take notes around her.',
      body: '<p>The teacher keeps talking and their mind is somewhere else. They lose the thread halfway through the lesson and have to ask again.</p><p>The prefrontal cortex, which handles planning and focus, keeps maturing until the mid 20s, and the brain uses choline to make acetylcholine, a messenger for attention and memory. Daily Focus Brain Support has Cognizin® citicoline, sunflower Phosphatidylserine and Vitamin B3 for focus and memory.*</p>' },
    { badge: '🍽️ Dinner Table', heading: 'They Eat A Lot, But Does It [All Count]?', alt: 'A teen boy in a sports jersey eats a large plate of fast food at the family dinner table while his parents watch with concern.',
      body: '<p>They go back for seconds and the fridge is empty by Friday. Still you wonder if the food is giving their body what it needs to grow.</p><p>A growing teen has to absorb what they eat. The gut is where the body digests food and takes in nutrients, and our Teens\' 3-in-1 Pre+ Post+ Probiotic has clinically studied pre, post and probiotics for digestive, immune and skin health.*</p>' },
    { badge: '🌙 Late Night', heading: 'They Sleep Less Than [They Need]', alt: 'A teen lies awake in bed at night, restless and unable to sleep.',
      body: '<p>The phone glows past midnight and the alarm goes off at six. You worry that a growing body is running short on rest.</p><p>The teen body clock shifts later, and ultra-processed foods are one of the things that crowd out magnesium, which helps calm the nervous system. Our Nighttime Reset Magnesium helps teens wind down before bed and has no melatonin hormones, to support better sleep.*</p>' },
  ],
  toddlers: [
    { badge: '😤 The Meltdown', heading: 'A Meltdown Out Of [Nowhere]', alt: 'A toddler boy has a tantrum on the kitchen floor while his mother kneels beside him.',
      body: '<p>They were fine a minute ago. Then a small thing goes wrong and the floor is the only place to be. You are told it is just a phase.</p><p>Vitamin B6 is used to make serotonin and dopamine, the messengers that help keep small frustrations from becoming big ones. B vitamins like B6, B12 and folate support emotional regulation and help toddlers navigate big feelings.* Our Toddlers\' Multivitamin has 10 nutrients and 21 organic superfoods, made for ages 2 and 3.</p>' },
    { badge: '🗣️ Finding Words', heading: 'Still Finding [Their Words]', alt: 'A toddler girl sits at a table with a picture book while her father waits patiently for her to speak.',
      body: '<p>You watch other toddlers chatter while yours is still finding words. It is one of the most anxious moments of early parenting.</p><p>Choline and B vitamins support brain and nervous system development, which is key for language and learning, and over 50% of toddlers don\'t get enough choline.* Up to 40% of kids can\'t convert folic acid, so our multi uses methylfolate, which is already active.</p>' },
    { badge: '🚽 Potty Time', heading: 'Potty Training Feels [Stuck]', alt: 'A toddler stands in the bathroom holding his tummy beside a small potty while his mother kneels to comfort him.',
      body: '<p>Every trip to the potty ends in tears and a tummy that will not cooperate. You wonder if it is something you are doing wrong. It is not.</p><p>Potty problems are not just a training issue, they are often a gut issue. Our Toddlers\' 3-in-1 Pre+ Post+ Probiotic is a gentle gummy for softer, easier to pass stools, with a whole fruit golden kiwi prebiotic, a probiotic and a postbiotic.*</p>' },
    { badge: '🍽️ The Plate', heading: 'Only Three Foods [This Week]', alt: 'A toddler girl in a booster seat pushes away a plate of plain pasta while her mother offers a spoonful of vegetables.',
      body: '<p>Pasta, crackers and applesauce again. You offer the broccoli and it goes straight back. It is hard not to worry about what they are missing.</p><p>A vitamin only works if a toddler will eat it. Ours has real strawberry and orange flavor, no fake sugars, no artificial colors and no fillers, plus 21 organic superfoods for what a picky plate leaves out.*</p>' },
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
  return (DAY_ORDER_BY_DEMO[demo.id] || DAY_ORDER).map((d, i) => {
    const c = copy[i];
    const it = demo.items.find((x) => x.key === d.role);
    // the body has two paragraphs: the moment (stays in the card text) and the science of how First Day helps (goes inside the Our Solution box)
    const [moment, ...rest] = c.body.split('</p><p>');
    const body = moment.endsWith('</p>') ? moment : `${moment}</p>`;
    const science = rest.length ? `<p>${rest.join('</p><p>').replace(/^<p>/, '')}` : '';
    return {
      id: `aio_day_${demo.id}_${d.slot}`, type: 'pdp-v2-two-up', custom_css: [],
      blocks: [{
        id: `hl-${d.slot}`, type: 'highlight',
        settings: { icon: it.image, icon_size: 64, font_family: "'sofia-pro', sans-serif", font_size_desktop: 16, font_size_mobile: 16, font_weight: 600, font_color: '#2c3d50', text: `${HIGHLIGHT[d.role]}${it.title}`, eyebrow: 'Our Solution', cta_text: 'Learn More', cta_url: `#aio-inside-${d.role}`, detail: science },
      }],
      settings: {
        ...twoUpLook, anchor_id: '', media_position: d.side, image: img(demo.id, d.slot), image_alt: c.alt, image_before: img(demo.id, `${d.slot}-before`),
        badge_text: c.badge, heading: c.heading, body, cta_text: '', highlights_margin_top: 8,
        padding_top_desktop: 16, padding_bottom_desktop: 16, padding_top_mobile: 8, padding_bottom_mobile: 8,
        // mobile: each moment is its own contained card (hairline border, 16px radius, side gutters) and the 4:5 photo is cropped to 16:11
        // (the crop focus per photo is in bundle.css so the First Day bottle is never cut off)
        padding_left_mobile: 16, padding_right_mobile: 16,
        card_bg_color_mobile: '#ffffff', card_border_color_mobile: 'rgba(0, 0, 0, 0.1)', card_border_width: 1, card_radius: 16, card_padding_mobile: 16,
        // mobile: shorter 16:11 frame (the crop focus per photo is in bundle.css); the before/after slider crops both photos the same way
        media_aspect_mobile: '16 / 11',
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
      item('a7', 'aio-icon-nutrients.jpg', '', "Most Vitamins Aren't Built For A Child",
        cause("Most vitamins use cheap synthetic forms, and up to 40% of kids can't convert folic acid. Many also give a 4 year old a 17 year old dose, scaled down from an adult formula instead of built for a growing body.", 'A vitamin you give every day, and you still wonder if it is doing anything.')),
    ],
  },
  teens: {
    heading: "What Is Happening [Behind Your Teen's Growth]",
    subheading: 'A body building bone, muscle and brain needs more than a rushed plate can give.',
    items: [
      item('a1', 'aio-icon-bones.jpg', '', 'Growth Windows Do Not Stay Open',
        cause('During the teen years growth plates are open, creating the areas where new bone is formed, but they do not stay open forever. That makes nutrition during this window especially important.', 'Friends who seem to shoot up while your teen stays put, and a pencil mark that barely moves.')),
      item('a2', 'aio-icon-nutrients.jpg', '', 'Vitamin D3 Is Often Missing',
        cause('Vitamin D3 helps the body absorb calcium, the mineral bones are built from, and it works together with vitamin K2 to support bone development.* Yet 92% of kids do not get enough D3.', 'Nothing obvious at all, which is why it goes unnoticed.')),
      item('a3', 'aio-icon-food.jpg', '', "Today's Food Has Fewer Nutrients",
        cause(FOOD_WORLD, 'Plates that look full but may not deliver what a growing body needs.')),
      item('a4', 'aio-icon-hidden.jpg', '', 'Eating A Lot Is Not The Same As Absorbing It',
        cause('Hidden hunger is a lack of nutrients, not a lack of food. A teen can eat plenty and still miss the vitamins and minerals a growing body needs. The gut is where the body digests food and takes in nutrients.', 'A big appetite, an empty fridge and still a worry in the back of your mind.')),
      item('a5', 'aio-icon-sleepclock.jpg', '', 'Sleep Rhythms Shift',
        cause(`Natural changes in the circadian rhythm disrupt sleep patterns in the teen years. ${ULTRA}`, 'Tired all day and wired at night.')),
    ],
  },
  toddlers: {
    heading: 'What Is Happening [Behind The Phase]',
    subheading: 'Meltdowns, late words and picky plates can all point back to what a small body is missing.',
    items: [
      item('a1', 'aio-icon-mood.jpg', '', 'Big Feelings Need Nutrients',
        cause('The brain uses vitamin B6 to make serotonin and dopamine, and B vitamins like B12 and folate support emotional regulation. When they run low, small frustrations can turn into big meltdowns.*', 'Meltdowns that come out of nowhere and do not look like just a phase.')),
      item('a2', 'aio-icon-signals.jpg', '', 'A Brain Building Language',
        cause("Choline and B vitamins support brain and nervous system development, which is key for language and learning. Over 50% of toddlers don't get enough choline.*", 'Other toddlers talking while yours is still finding words.')),
      item('a3', 'aio-icon-nutrients.jpg', '', 'Most Vitamins Use A Form They Cannot Use',
        cause("Most vitamins use cheap synthetic forms, and up to 40% of kids can't convert folic acid. Methylfolate is the active form, ready to use.", 'A vitamin you give every day, and you still wonder if it is doing anything.')),
      item('a4', 'aio-icon-bones.jpg', '', 'Growth Needs D3 And K2 Together',
        cause('Vitamin D3 and Vitamin K2 work together to support bone development, while B vitamins help the body turn food into growth-fueling energy.*', 'A checkup where your toddler is trending lower on the growth curve.')),
      item('a5', 'aio-icon-food.jpg', '', "Today's Food Has Fewer Nutrients",
        cause(FOOD_WORLD, 'A plate of vegetables that may no longer deliver what it once did, and a toddler who catches every bug.')),
      item('a6', 'aio-icon-gut.jpg', '', 'The Gut Is Where It Starts',
        cause('The gut is where the body digests food and takes in nutrients. Potty problems are often a gut issue, not just a training issue.', 'Stuck on the potty, tummy aches and a toddler who dreads going.')),
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
