import { useEffect, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import usePageClass from '../../lib/usePageClass.js';
import { extImg } from '../../lib/assets.js';
import IngredientsPopup from '../../components/IngredientsPopup.jsx';
import { LANDING, TRUST_LP, COMPARISON_LP } from '../../data/landing.js';
import { TEMPLATE } from '../../data/landingTemplate.js';
import { TEMP_HERO_HOME, BENEFITS_HOME } from '../../data/sharedSections.js';
import TempReploHero from '../../sections/TempReploHero.jsx';
import TempHero from '../../sections/TempHero.jsx';
import Benefits from '../../sections/Benefits.jsx';
import FrontrowBrandBand from '../../sections/FrontrowBrandBand.jsx';
import AccordionBlock from '../../sections/AccordionBlock.jsx';
import StandaloneProduct from '../../sections/StandaloneProduct.jsx';
import TempSelloutNotice from '../../sections/TempSelloutNotice.jsx';
import TimelineSection from '../../sections/TimelineSection.jsx';
import HomepageTrustSection from '../../sections/HomepageTrustSection.jsx';
import PbfcmComparisonTable from '../../sections/PbfcmComparisonTable.jsx';
import Apps from '../../sections/Apps.jsx';
import Seam from '../../sections/explorations/sesame/Seam.jsx';
import SesameFx from '../../sections/explorations/sesame/Fx.jsx';
import { Stick, LOGO, useSofiaInIframes } from '../../sections/explorations/sesame/ss.jsx';
import { SignBadge, CountBubble, CountSection, MeetTheGang, celebrate, duckRain } from '../../sections/explorations/sesame/Sections.jsx';
import { OvNutrients, OvDesigned, OvWhyMulti, OvLifestyleMulti, OvNutritionMulti } from '../../sections/explorations/sesame/StickersMulti.jsx';
import { StSymptoms, StRaising, StTimelineCount } from '../../sections/explorations/sesame/StickersBts.jsx';
import '../../sections/explorations/sesame/sesame.css';

// EXPLORATION (not a production page): /explorations/sesame-toddlers-bts  ("Sesame Street Toddlers' Multi, Behind the Science")
// A DUPLICATE of /pages/trmv-behind-the-science-lp (src/pages/LandingBTS.jsx, audience trmv) made a Sesame Street edition with the playbook of the skill `sesame-streetize`. Header and footer untouched,
// the words of the sections are the live ones; the marketing headings are rewritten with a play on the show (pending the owner's review). Every picture slot stays a FILE (live, or made before from the
// live picture with the real Sesame bottle: ssb-wheel, ssb-raising, ssm-why, ssm-nutrition, ssm-lifestyle, ssm-banner), the SVGs sit on top as stickers or live in the new sections. The product is the
// Toddlers' Multi (Big Bird on the label), so Big Bird leads.
const SKY = '#d6efff'; const MINT = '#d4f5df'; const LILAC = '#e8dcfa'; const WHITE = '#ffffff'; const NAVY = '#2C3E50'; const CREAM = '#fff4c2'; const PALE = '#f2fbff'; // PALE = the own color of the comparison section
const sh = (name) => (name ? `shopify://shop_images/${name}` : '');
const T = TEMPLATE;
const withCss = (sec, extra = {}) => ({ ...sec.settings, custom_css: sec.custom_css || [], ...extra });
const sid = (id) => `shopify-section-${id}`;

function accordionProps(sec, c, image) {
  return {
    id: sec.id,
    settings: { ...withCss(sec), heading: c.heading, subheading: c.sub || '', image: image || sh(c.image), image_mobile: image || sh(c.image), image_pos: c.imgPos, image_h: c.imgH },
    blocks: c.items.map((it, i) => ({
      id: `${sec.id}-${i}`,
      settings: { icon: it.icon.startsWith('/') ? it.icon : sh(it.icon), icon_alt: it.alt || '', icon_pos: it.pos, heading: it.title, content: it.body },
    })),
  };
}

// the gallery of the buy box: the live slides (files). First = the owner's Sesame bottle on flat #e7f4fe, three are the Sesame pictures made for the Multi page, three live infographics get a sticker
const GALLERY = LANDING.trmv.product.gallery.map(([file, alt], i) => {
  if (i === 0) return ['/assets/sesame/bottle-multi-square.jpg', 'First Day Toddlers The Multi, Sesame Street edition, with Big Bird on the label.'];
  if (i === 1) return [file, alt, <OvNutrients />];
  if (i === 2) return [file, alt, <OvDesigned />];
  if (i === 5) return ['/assets/custom/ssm-why.jpg', alt, <OvWhyMulti />];
  if (i === 7) return ['/assets/custom/ssm-nutrition.jpg', alt, <OvNutritionMulti />];
  if (i === 8) return ['/assets/custom/ssm-lifestyle.jpg', alt, <OvLifestyleMulti />];
  return [file, alt];
});

// the numbers are on the live page: 10 essential vitamins and 21 organic superfoods, 6 symptoms targeted, 2 daily gummies
const STATS = [
  { n: 10, label: 'Essential vitamins' },
  { n: 21, label: 'Organic superfoods' },
  { n: 6, label: 'Symptoms targeted' },
  { n: 2, label: 'Gummies a day' },
];
const GANG = [
  ['elmo-wave', 'Elmo', 'Elmo wants strong, happy growers for everybody!'],
  ['bigbird', 'Big Bird', 'Big Bird is on the bottle! He eats his fruits and veggies too!'],
  ['grover-3', 'Grover', 'Hello! It is I, Grover! Ten vitamins in one gummy!'],
  ['abby', 'Abby', 'Abby thinks 21 organic superfoods are so magic!'],
  ['count-1', 'The Count', 'Two gummies a day! One, two! Ah ah ah!'],
  ['cookie-eat', 'Cookie Monster', 'Me love cookies! Cookies are a sometimes food. Me try new food too!'],
];
const LINES = ['Hi! Elmo is so happy you are here!', 'Elmo says ten vitamins help growers grow!', 'Elmo learned about 21 organic superfoods!', 'Two gummies a day. Grown-ups give them!', 'Elmo loves you!', 'Tap the Sesame Street sign. Elmo has a surprise!'];

// the Sesame Street logo at the top of the hero text column (tap it: the ducks fall, like the sign of the buy box). The hero has no slot for it, so it is inserted as the first child of the
// column after mount; the strip with the words "Sesame Street Edition" was tried under the picture and removed (owner), only the logo stays
function HeroLogo({ sec }) {
  const [hosts, setHosts] = useState([]);
  useLayoutEffect(() => {
    const made = [];
    document.querySelectorAll(`#${sec} .ss-hero-badge`).forEach((d) => d.remove()); // the removed strip, if a hot reload left it in the page
    const mount = () => {
      document.querySelectorAll(`#${sec} .v1-hero-left-content`).forEach((col) => {
        if (col.querySelector(':scope > .ss-hero-logo')) return;
        const d = document.createElement('div'); d.className = 'ss-hero-logo'; col.insertBefore(d, col.firstChild); made.push(d);
      });
      setHosts([...document.querySelectorAll(`#${sec} .ss-hero-logo`)]);
    };
    mount(); const t = window.setTimeout(mount, 600);
    return () => { window.clearTimeout(t); made.forEach((d) => d.remove()); };
  }, [sec]);
  return hosts.map((h, i) => createPortal(
    <button type="button" className="ss-hero-logo__btn" onClick={duckRain} aria-label="Sesame Street edition. Tap for a surprise."><img src={LOGO} alt="" draggable="false" /></button>, h, `l${i}`));
}

// The hero picture is a placeholder for now: the square holds the short script of a video for this page,
// written for this page. Text only; invented, pending the owner's review and the Sesame Workshop approval.
const SCRIPT = [
  ['Video script · about 22s · square 1:1 · no dialogue', null],
  ['The idea', 'A short Sesame Street style video for this page, with no voices: music, soft sound effects and a few on-screen labels. It opens and closes on the Sesame Street sign. In between: an everyday toddler moment every parent knows, a playful cartoon look at the nutrient gaps, the Toddlers\' Multi with Big Bird on the bottle, and a happy ending.'],
  ['1 · The sign · 0 to 2s', 'The Sesame Street sign bounces in over a soft, sunny street. Then the color drains from the picture and the street melts into the next scene.'],
  ['2 · The plate · 2 to 6s', 'A faded, almost black and white kitchen. A toddler (2 to 3) in a yellow shirt, the only color, pushes away a plate of broccoli. A tired parent. Close on the face: a trembling lip, big feelings.'],
  ['3 · Inside the tummy, Sesame style · 6 to 12s', 'Cut to a flat, bright cartoon world, no anatomy. The Count walks in and counts on his fingers while the nutrient gaps pop up as big numbers, with thin labels: CHOLINE, B6, D3 + K2. Calm and playful.'],
  ['4 · The solution · 12 to 14s', 'Back to the real world, full color. A small hand holds the sun shaped gummy next to the bottle. Big Bird (library art on top) peeks in from the corner and waves.'],
  ['5 · Two gummies · 14 to 16s', 'The toddler eats the gummy and giggles. Big numbers 1 and 2 pop in. A soft warm glow in the colors of the show, no magic claims.'],
  ['6 · The happy ending · 16 to 20s', 'The same toddler, now full of energy: laughing at the table, then trying a broccoli floret. Cookie Monster pops in and takes a happy bite of one too.'],
  ['7 · The sign again · 20 to 22s', 'The toddler laughs at the camera and waves. Elmo, Big Bird, the Count and Cookie Monster wave back from the corner. The Sesame Street sign returns in full color with the end card: "Start Healthy Habits Today" and "45 Day Money Back Guarantee**".'],
  ['Rules', 'No dialogue and no voice over. Characters are the library art laid on top, never generated. Only "supports" and asterisks on screen, no medical claims, nothing scary about the body. No theme song. Pending Sesame Workshop approval.'],
];
function HeroScript() {
  const [hosts, setHosts] = useState([]);
  useLayoutEffect(() => {
    const mount = () => {
      const els = [...document.querySelectorAll('.v1-hero-image-placeholder')];
      setHosts(els);
    };
    mount(); const t = window.setTimeout(mount, 600);
    return () => window.clearTimeout(t);
  }, []);
  return hosts.map((h, i) => createPortal(
    <div className="ss-script">
      {SCRIPT.map(([title, body], k) => (body === null ? <h3 key={k}>{title}</h3> : <p key={k}><b>{title}.</b> {body}</p>))}
    </div>, h, `s${i}`));
}

export default function SesameToddlersBts() {
  usePageClass('template-page lp-BTS-master');
  useSofiaInIframes();
  useEffect(() => { document.body.classList.add('sesame-street'); return () => document.body.classList.remove('sesame-street'); }, []);
  const c = LANDING.trmv;
  const P = { ...c.product, gallery: GALLERY, vanity: 'Yummy Gummies For Happy Growers And [Supported Growth & Development]' };

  const heroSec = T.temp_replo_hero_RkYkXc;
  const hero = {
    ...withCss(heroSec),
    headline: "Neighbor, Meet The [Science–Driven Gummy Vitamin] That's Redefining Toddler Nutrition", description: c.hero.description, cta_text: c.hero.cta, stars_text: c.hero.starsText,
    hero_image: '', hero_image_mobile: '', mobile_image_full_width: c.hero.mobileImageFullWidth, // the wheel is out for now: a square with placeholder text takes its place (see .v1-hero-image-placeholder in sesame.css)
  };
  const heroBlocks = heroSec.blocks.map((b) => (b.type === 'temp-testimonial'
    ? { ...b, settings: { ...b.settings, avatar: sh(c.hero.creator.avatar), name: c.hero.creator.name, quote: c.hero.creator.quote } }
    : b));
  const spSec = T.standalone_product_PMRdVC;
  const sellSec = T.temp_sellout_notice_WQzDBM;
  const tlSec = T.timeline_section_N69qEe;
  const lastSec = T.temp_replo_hero_3dPiJD;
  const last = { ...withCss(lastSec), headline: 'From Our Founder, To Our Neighbors', description: c.founder.description, cta_text: c.founder.cta, hero_image: sh(c.founder.image), hero_image_mobile: sh(c.founder.image) };
  const R = c.reviews;
  const reviews = {
    average: parseFloat(R.rating), count: R.count.replace(/ reviews$/, ''), summary: R.summary, highlights: R.highlights,
    reviews: R.items.map((r) => ({ rating: r.stars, name: r.name, date: r.date, title: r.title, body: r.body })),
  };
  // the symptom icons are friends of the library (Version B files); sesame.css frames the head of each one inside the round badge
  const FRIENDS = ['elmo-wave', 'cookie-wave', 'grover-wave', 'bigbird', 'ernie', 'oscar-1'];
  const acc1 = { ...c.accordion1, items: c.accordion1.items.map((it, i) => ({ ...it, icon: `/assets/sesame/characters/${FRIENDS[i]}.svg`, pos: '50% 0%' })), sub: 'Every symptom has a friend. Open a card to meet them!', heading: 'Two Daily Gummies Target Six Symptoms Of Nutrient Deficiencies. Count Them, Neighbor!' };
  const acc2 = { ...c.accordion2, heading: 'Grover Wants To Raise The Bar On Toddler Nutrition' };
  const trust = { ...TRUST_LP, settings: { ...TRUST_LP.settings, heading: 'Doctors And Real Neighbors Share \n[<strong>Life Changing</strong> <strong>Results</strong>]' } };
  const comparison = { ...COMPARISON_LP, settings: { ...COMPARISON_LP.settings, title: 'Oscar Checked Every Multi, So Why Should You Choose First Day?' } };
  const timeline = c.timeline.items.map((it, i) => ({ id: `m-${i}`, settings: { image: i === 0 ? '/assets/custom/ssm-banner.jpg' : sh(it.image), image_alt: it.title, image_pos: i === 0 ? '50% 40%' : it.pos, badge_label: it.badge, title: it.title, description: it.body } }));
  const CLOSING = {
    ...TEMP_HERO_HOME.settings, anchor_id: '', heading_tag: 'h2', aria_label: 'Order the Sesame Street edition',
    heading: 'Big Bird Is Ready For A Happy<br>Growing <span>Journey, Are You?</span>', subheading: 'Everybody on Sesame Street says hello!',
    button_text: 'Order Today', button_aria: 'Order Today', button_link: '#top', secondary_text: '', padding_desktop: 120, padding_mobile: 84,
  };

  return (
    <div className="ss-page ss-page--bts">
      <TempReploHero id={heroSec.id} settings={hero} blocks={heroBlocks} />
      <HeroLogo sec={sid(heroSec.id)} />
      <HeroScript />
      <Seam from={WHITE} to={NAVY} />
      <FrontrowBrandBand id={T.custom_liquid_rkHyT8.id} />
      <Seam from={NAVY} to={WHITE} />
      <AccordionBlock {...accordionProps(T.accordion_block_driBft, acc1, '/assets/custom/ssb-wheel.png')} />
      <Stick sec={sid(T.accordion_block_driBft.id)} target=".accordion-block__image-wrapper"><StSymptoms /></Stick>
      <StandaloneProduct id={spSec.id} settings={withCss(spSec)} blocks={spSec.blocks} product={P}
        ex={{ slotInfoTop: <SignBadge />, slotQtyHeader: ({ qty }) => <CountBubble qty={qty} />, onAddToCart: celebrate }} />
      <TempSelloutNotice id={sellSec.id} settings={sellSec.settings} />
      <Seam from={WHITE} to={SKY} />
      <TimelineSection id={tlSec.id}
        settings={{ ...tlSec.settings, heading_line_1: 'The Count Counts 30, 60 And 90 Days,', heading_line_2: "Here Is What To Expect From The Toddlers' Daily Multi", accessibility_label: 'What to expect from the Toddlers Daily Multi', background_color: SKY }}
        blocks={timeline} />
      <Stick sec={sid(tlSec.id)} target=".kids-timeline__heading-wrap"><StTimelineCount /></Stick>
      <Seam from={SKY} to={CREAM} />
      <CountSection bg={CREAM} stats={STATS} />
      <Seam from={CREAM} to={WHITE} />
      <HomepageTrustSection {...trust} />
      <Seam from={WHITE} to={LILAC} />
      <AccordionBlock {...accordionProps(T.accordion_block_QpghhN, acc2, '/assets/custom/ssb-raising.jpg')} />
      <Stick sec={sid(T.accordion_block_QpghhN.id)} target=".accordion-block__image-wrapper"><StRaising /></Stick>
      <Seam from={LILAC} to={PALE} />
      <PbfcmComparisonTable {...comparison} />
      <Seam from={PALE} to={WHITE} />
      <Apps id={T['1771530273b0a25f6d'].id} settings={T['1771530273b0a25f6d'].settings} customCss={[]} reviews={reviews} productTitle={P.title} />
      <MeetTheGang waveFrom="#ffffff" gang={GANG} />
      <Seam from="#86cf84" to={WHITE} />
      <TempReploHero id={lastSec.id} settings={last} blocks={[]} />
      <Seam from={WHITE} to="transparent" className="ss-seam--up" flip />
      <div className="ss-cta">
        <TempHero id="ss-closing" settings={CLOSING} />
        <img className="ss-cta__logo" src={LOGO} alt="Sesame Street" draggable="false" />
        <Benefits {...BENEFITS_HOME} />
      </div>
      <IngredientsPopup />
      <SesameFx lines={LINES} />
    </div>
  );
}
