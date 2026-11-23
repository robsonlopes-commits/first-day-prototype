import { useEffect } from 'react';
import ProductLegacy from '../ProductLegacy.jsx';
import { TODDLER_TLC_STARTER_PACK_PAGE as BASE } from '../../data/pdp/toddlerTlcStarterPack.js';
import { OvStrains, OvLifestyle } from '../../sections/explorations/sesame/Stickers.jsx';
import { OvDesigned, OvNutritionMulti } from '../../sections/explorations/sesame/StickersMulti.jsx';
import { OvBMulti, OvBProbiotic, OvBSugar, OvBCompare } from '../../sections/explorations/sesame/StickersBundle.jsx';
import { LOGO, useSofiaInIframes } from '../../sections/explorations/sesame/ss.jsx';
import StreetScroll from '../../sections/explorations/sesame/StreetScroll.jsx';
import Seam from '../../sections/explorations/sesame/Seam.jsx';
import { SignBadge, CountBubble, Wholesome, MeetTheGang, celebrate } from '../../sections/explorations/sesame/Sections.jsx';
import Waves from '../../components/Waves.jsx';
import TempHero from '../../sections/TempHero.jsx';
import Benefits from '../../sections/Benefits.jsx';
import { TEMP_HERO_HOME, BENEFITS_HOME } from '../../data/sharedSections.js';
import SesameFx from '../../sections/explorations/sesame/Fx.jsx';
import '../../sections/explorations/sesame/sesame.css';

// EXPLORATION (not a production page): /explorations/sesame-toddlers-bundle  ("Sesame Street Toddlers' Starter Pack"). THIS file is the Sesame Street EDITION; the page starts as the original
// (SesameToddlersBundle.jsx) and loads this one when the shopper picks it in "Choose The Edition". It follows what was learned on the Probiotic and the Multi pages: the Sesame Workshop license guidelines
// (characters only say catchphrases or generic phrases, nothing about the product, no character on a call to action, grounded stickers, Meet The Gang to scale, legal notice), the street scene under
// the buy box, the Limited Edition strip, no Count section.
// A DUPLICATE of /products/toddler-tlc-starter-pack (the legacy PDP, src/data/pdp/toddlerTlcStarterPack.js: The Multi with Big Bird + the Pre + Post Probiotic with Elmo) made a Sesame
// Street edition with the playbook of the skill `sesame-streetize` (the recipe of the Toddlers' Probiotic page, legacy template). Header and footer untouched, the words of the sections
// are the live ones. Every picture slot stays a FILE (live, or generated before: ss-lifestyle, ssm-nutrition, ssm-banner; the duo of the two Sesame bottles is composited with the real
// cutouts), the SVGs sit on top as stickers or live in the new sections. Copy of headings, lines and stats is invented, pending the owner's review.
const SKY = '#d6efff'; const SUN = '#fff1a8'; const MINT = '#d4f5df'; const ROSE = '#ffe0ec'; const PEACH = '#ffe2bf';
const INK = '#1f3a70'; const PALE = '#f2fbff';

const byId = (id) => BASE.SECTIONS.find((s) => s.id === id);
// the colors of an image-with-text section and its flat waves; in a row only the top wave is drawn (extra = { bottom_waves: false })
const tint = (id, color, above, below, overlay, image, extra = {}) => {
  const s = byId(id);
  return {
    ...s,
    ...(overlay ? { overlay } : {}),
    settings: {
      ...s.settings, ...(image ? { image } : {}), enable_background_color_section: true, background_color_section: color, background_color: color, use_custom_colors: true, colors_text: INK, enable_box_shadow: false,
      top_waves: true, wavesTopBackgroundColor: above, bottom_waves: true, wavesBottomBackgroundColor: below, modern_waves: true, ...extra,
    },
  };
};
const head = (sec, heading) => ({
  ...sec,
  settings: 'heading' in sec.settings ? { ...sec.settings, heading } : sec.settings,
  blocks: (sec.blocks || []).map((b) => (b.type === 'heading' ? { ...b, settings: { ...b.settings, heading } } : b)),
});
const custom = (id, render) => ({ id, type: 'custom', render });

// the words on the wall of the street scene (invented for this page, pending owner review): no character speaks here, the logo stands alone above them
const STREET_COPY = {
  title: 'Happy Growers And Tummies ', hl: 'Start At Home', desc: 'Daily nutrition plus gut support for toddlers, in yummy gummies.',
  text: 'Our Starter Pack pairs The Multi, with 10 essential vitamins and 21 organic superfoods, and the 3 in 1 Pre + Post Probiotic to support growth, immunity and digestion,* with no junk and nothing fake. Because every little grower deserves a strong start.',
  cta: 'Start The Adventure',
};
const STREET_PICS = { inside: '/assets/custom/ssp-house-inside.webp', insideM: '/assets/custom/ssp-house-inside-mobile.webp', alt: 'A family on a sofa at home, the toddler holds The Multi and a parent holds the Pre + Post Probiotic' };
// Sesame Workshop guidelines: a character only says his catchphrases or generic phrases true to him, never a word about the product (same lines as the Probiotic and Multi pages)
const GANG = [
  ['elmo-wave', 'Elmo', 'Elmo loves hugs and sunny days!'],
  ['bigbird', 'Big Bird', 'Hello, neighbor! Let’s grow big and strong together!'],
  ['grover-3', 'Grover', 'Hello! It is I, Grover! Be brave, be super!'],
  ['abby', 'Abby', 'Wow! Every day is a little bit magical!'],
  ['count-1', 'The Count', 'Count the days! One, two, three! Ah ah ah!'],
  ['cookie-eat', 'Cookie Monster', 'Me love cookies! Om nom nom!'],
];

// the headings (marketing only; a rewrite with a play on the show, not a prefix; the claim words are kept). The two bottles are a pair: Big Bird and Elmo are on the labels.
const SECTIONS = [
  custom('ss-street', () => <StreetScroll wide copy={STREET_COPY} pictures={STREET_PICS} />), // right under the buy box: the street scene that moves with the scroll and zooms into a window (StreetScroll.jsx)
  custom('ss-street-seam', () => <Seam from={MINT} to="transparent" flip className="ss-seam--up" />), // the mint wave of the next section lies over the end of the picture of the inside
  head(tint('05081b91-f5a2-42de-8aa2-42cac5756c94', MINT, MINT, 'transparent', <OvBMulti />, '/assets/custom/ssm-banner.jpg'), 'Count Them Up, Neighbor! 21 Organic Superfoods Are Inside'),
  custom('ss-wholesome', () => <Wholesome friends={false} />),
  custom('ss-wave-join', () => <div className="ss-wave-join"><Waves position="top" color={PALE} containerBackground="transparent" modern /></div>),
  head(tint('2e1dde27-b7de-463d-b1e5-6b4fddf0520f', ROSE, PALE, SKY, <OvBProbiotic />, '/assets/custom/ss-lifestyle.jpg', { bottom_waves: false }), 'Hello, Happy Tummy! Pre, Post And Probiotic Are Inside'),
  head(tint('9bb086b7-8e0b-4a49-8b79-f40e6c083942', SKY, ROSE, SUN, <OvBSugar />, null, { bottom_waves: false }), 'Sunny Days Need Less Sugar, Up To 75% Less Than Others'),
  head(tint('image_with_text_yraceP', SUN, SKY, PALE, <OvBCompare />, null), 'Smooth, Fruity, Sweet And Natural, So Nothing To Grouch About'),
  head(byId('f2ccb107-33fa-4ce5-9679-3345884e6e32'), 'Meet The Grown Ups Behind The Science'),
  custom('ss-gang', () => <MeetTheGang scaled gang={GANG} />),
  head(tint('1668ba59-402b-43aa-82e4-477c210704cd', PEACH, '#86cf84', '#ffffff'), 'Count On A Money Back Guarantee For 45 Days'),
  head(byId('cbd9ad2b-f52f-4a45-9c26-7fd50e23bd41'), 'Got Questions, Neighbor? We Have Answers'),
  byId('a8247693-0650-4484-b63d-895932af11d6'),
  custom('ss-closing', () => (
    <div className="ss-cta">
      <TempHero id="ss-closing" settings={CLOSING} />
      <img className="ss-cta__logo" src={LOGO} alt="Sesame Street" draggable="false" />
      <Benefits {...BENEFITS_HOME} />
    </div>
  )),
  byId('1686676858452369a6'),
  custom('ss-legal', () => <p className="ss-legal">Sesame Street® and associated characters, trademarks and design elements are owned and licensed by Sesame Workshop. © 2026 Sesame Workshop. All Rights Reserved.</p>),
].filter(Boolean);

// the gallery: the live slides (files). First = the two Sesame bottles of the owner side by side (real cutouts on the flat #e7f4fe), the nutrition slide is the Sesame one made for the Multi
// page, three live infographics get a sticker, the rest are the live ones.
const MEDIA = BASE.main.PDP_PRODUCT.media.map((m, i) => {
  if (i === 0) return { ...m, src: '/assets/sesame/bottle-sesame-duo-square.jpg', alt: "First Day Toddlers' Starter Pack, Sesame Street edition: The Multi with Big Bird and the Pre + Post Probiotic with Elmo.", width: 1600, height: 1600 };
  if (i === 2) return { ...m, src: '/assets/custom/ssm-nutrition.jpg', width: 1080, height: 1080, overlay: <OvNutritionMulti /> };
  if (i === 3) return { ...m, overlay: <OvDesigned /> };
  if (i === 6) return { ...m, overlay: <OvStrains /> };
  return m;
});

// the closing CTA is the hero banner of the Home (TempHero + the Benefits marquee, the original assets, the image is NOT changed): one button, our words, the Sesame Street logo on top
const CLOSING = {
  ...TEMP_HERO_HOME.settings, anchor_id: '', heading_tag: 'h2', aria_label: 'Order the Sesame Street edition',
  heading: 'A Happy<br>Growing <span>Journey Starts Here</span>', subheading: 'Hello, neighbor!',
  button_text: 'Order Today', button_aria: 'Order Today', button_link: '#top', secondary_text: '', padding_desktop: 120, padding_mobile: 84,
};

const main = {
  ...BASE.main,
  PDP_PRODUCT: { ...BASE.main.PDP_PRODUCT, media: MEDIA, vanityTitle: 'Gummy Multivitamins & Probiotic For Happy Growers And [Improved Immunity & Behavior]' },
  SLOT_INFO_TOP: <SignBadge limited />,
  SLOT_QTY_HEADER: ({ qty }) => <CountBubble qty={qty} unit="pack" />,
  onAddToCart: celebrate,
};
const PAGE = { ...BASE, main, SECTIONS };

export default function SesameToddlersBundleStyled({ editionPicker }) {
  useSofiaInIframes();
  useEffect(() => { document.body.classList.add('sesame-street'); return () => document.body.classList.remove('sesame-street'); }, []);
  return (
    <div className="ss-page ss-page--bundle">
      <ProductLegacy page={editionPicker ? { ...PAGE, main: { ...PAGE.main, SLOT_AFTER_QTY: editionPicker } } : PAGE} />
      <SesameFx />
    </div>
  );
}
