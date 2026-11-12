import { useEffect } from 'react';
import ProductLegacy from '../ProductLegacy.jsx';
import { TODDLERS_PROBIOTIC_PAGE as BASE } from '../../data/pdp/toddlersProbiotic.js';
import { OvWhy, OvLifestyle, OvKitchen, OvBath, OvEssentials, OvBerries, OvBoy, OvCompare, OvStrains, OvFruity } from '../../sections/explorations/sesame/Stickers.jsx';
import { BOTTLE_SQ, LOGO } from '../../sections/explorations/sesame/ss.jsx';
import { SignBadge, CountBubble, Wholesome, CountSection, MeetTheGang, celebrate } from '../../sections/explorations/sesame/Sections.jsx';
import Waves from '../../components/Waves.jsx';
import TempHero from '../../sections/TempHero.jsx';
import Benefits from '../../sections/Benefits.jsx';
import { TEMP_HERO_HOME, BENEFITS_HOME } from '../../data/sharedSections.js';
import SesameFx from '../../sections/explorations/sesame/Fx.jsx';
import '../../sections/explorations/sesame/sesame.css';

// EXPLORATION (not a production page): /explorations/sesame-toddlers-probiotic  ("Sesame Street Toddlers' Probiotic")
// A DUPLICATE of /products/toddlers-3-in-1-probiotic (the legacy PDP, src/data/pdp/toddlersProbiotic.js) made fully Sesame Street. The header and the footer are the real ones and
// are not touched. The words of the page are the live words. What changed: the colors, the shapes, the motion, some new sections (Real Wholesome as 8 friends, The Count Counts It,
// Meet The Gang, a closing) and the pictures. RULE OF THE OWNER (2026-11-10): in the Shopify theme a picture or video slot is an image field, not HTML. So every picture slot here
// is a FILE: the real image of the live page, or an image generated with the image API from the live image and the Sesame bottle (public/assets/custom/ss-*.jpg, mockups). The library
// SVGs only sit ON TOP of those files as stickers (Stickers.jsx), or live in the new sections. A montage of SVGs never replaces a picture.
const SKY = '#d6efff'; const SUN = '#fff1a8'; const MINT = '#d4f5df'; const LILAC = '#e8dcfa'; const ROSE = '#ffe0ec'; const PEACH = '#ffe2bf';
const INK = '#1f3a70';

const byId = (id) => BASE.SECTIONS.find((s) => s.id === id);
// the colors of an image-with-text section and its waves (the wave on top is the color of the section above). Two image sections in a row would draw the wave twice (the bottom
// wave of one and the top wave of the next), so in a row only the top wave is drawn (extra = { bottom_waves: false }).
const tint = (id, color, above, below, overlay, image, extra = {}) => {
  const s = byId(id);
  return {
    ...s,
    ...(overlay ? { overlay } : {}),
    settings: {
      ...s.settings, ...(image ? { image: image } : {}), enable_background_color_section: true, background_color_section: color, background_color: color, use_custom_colors: true, colors_text: INK, enable_box_shadow: false,
      top_waves: true, wavesTopBackgroundColor: above, bottom_waves: true, wavesBottomBackgroundColor: below, modern_waves: true, ...extra,
    },
  };
};
// the headings of this page (marketing only, in a Sesame Street voice: a question to the reader, a gentle helper, counting). The words of the sections are the live ones.
const head = (sec, heading) => ({
  ...sec,
  settings: 'heading' in sec.settings ? { ...sec.settings, heading } : sec.settings,
  blocks: (sec.blocks || []).map((b) => (b.type === 'heading' ? { ...b, settings: { ...b.settings, heading } } : b)),
});
const custom = (id, render) => ({ id, type: 'custom', render });

const SECTIONS = [
  head(tint('image_with_text_6Q3NK6', SKY, '#ffffff', 'transparent', <OvKitchen />, '/assets/custom/ss-kitchen.jpg'), 'Potty Time Feeling Stuck? Me Know A Helper!'),
  custom('ss-wholesome', () => <Wholesome />),
  custom('ss-wave-join', () => <div className="ss-wave-join"><Waves position="top" color="#f2fbff" containerBackground="transparent" modern /></div>),
  head({ ...byId('c321e181-639c-4980-9b70-3f399c6c3e96'), settings: { ...byId('c321e181-639c-4980-9b70-3f399c6c3e96').settings, background_color: '#ffffff', colors_text: '#00ab4e' } }, 'Big Bird Wonders: What Is Going On In That Little Tummy?'),
  custom('ss-count', () => <CountSection />),
  head(tint('05081b91-f5a2-42de-8aa2-42cac5756c94', MINT, '#f2fbff', LILAC, <OvBath />, '/assets/custom/ss-bath.jpg', { bottom_waves: false }), 'Easy Does It, Rubber Duckie! Softer Potty Time'),
  head(tint('2e1dde27-b7de-463d-b1e5-6b4fddf0520f', LILAC, MINT, ROSE, <OvEssentials />, '/assets/custom/ss-essentials.jpg', { bottom_waves: false }), 'One, Two, Three Helpers In One Gummy'),
  head(tint('9bb086b7-8e0b-4a49-8b79-f40e6c083942', ROSE, LILAC, SKY, <OvBerries />, '/assets/custom/ss-berries.jpg', { bottom_waves: false }), 'Every Day Counts, Ah Ah Ah!'),
  head(tint('image_with_text_iUBfca', SKY, ROSE, SUN, <OvBoy />, '/assets/custom/ss-boy.jpg', { bottom_waves: false }), 'Filling In The Gaps, One Sunny Day At A Time'),
  head(tint('image_with_text_yraceP', SUN, SKY, '#f2fbff', <OvCompare />, '/assets/custom/ss-compare.jpg'), 'Oscar Looked For Junk And Found None'),
  head(byId('f2ccb107-33fa-4ce5-9679-3345884e6e32'), 'Meet The Grown Ups Behind The Science'),
  custom('ss-gang', () => <MeetTheGang />),
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
].filter(Boolean);

// the gallery: the live slides (files). The first one is the Sesame bottle of the owner, two are generated (the comparison and the lifestyle one), two live infographics get a sticker, the rest are the live ones.
const MEDIA = BASE.main.PDP_PRODUCT.media.map((m, i) => {
  if (i === 0) return { ...m, src: BOTTLE_SQ, alt: 'First Day Toddlers Pre + Post Probiotic, Sesame Street edition, with Elmo on the label.', width: 1600, height: 1600 };
  if (i === 5) return { ...m, overlay: <OvStrains /> };
  if (i === 6) return { ...m, overlay: <OvFruity /> };
  if (i === 8) return { ...m, src: '/assets/custom/ss-why.jpg', width: 2048, height: 2048, overlay: <OvWhy /> };
  if (i === 10) return { ...m, src: '/assets/custom/ss-lifestyle.jpg', width: 2048, height: 2048, overlay: <OvLifestyle /> };
  return m;
});

// the closing CTA is the hero banner of the Home (TempHero + the Benefits marquee, the original assets, the image is NOT changed): one button, our words, and the Sesame Street
// logo on top of it (.ss-cta in sesame.css)
const CLOSING = {
  ...TEMP_HERO_HOME.settings, anchor_id: '', heading_tag: 'h2', aria_label: 'Order the Sesame Street edition',
  heading: 'Elmo Is Ready For A Happy<br>Tummy <span>Journey, Are You?</span>', subheading: 'Everybody on Sesame Street says hello!',
  button_text: 'Order Today', button_aria: 'Order Today', button_link: '#top', secondary_text: '', padding_desktop: 120, padding_mobile: 84,
};

const main = {
  ...BASE.main,
  PDP_PRODUCT: { ...BASE.main.PDP_PRODUCT, media: MEDIA, vanityTitle: 'Gentle 3-In-1 Tummy Helper For [Softer, Easier-To-Pass Stools]' },
  SLOT_INFO_TOP: <SignBadge />,
  SLOT_QTY_HEADER: ({ qty }) => <CountBubble qty={qty} />,
  onAddToCart: celebrate,
};
const PAGE = { ...BASE, main, SECTIONS };

// The Clinicians' Choice widget is a third-party iframe (FrontrowMD) with its own fonts (Lora and Open Sans). Owner rule: ONLY Sofia Pro on this page, so the page copies its
// Sofia Pro @font-face rules into the iframe and forces them (the widget is replaced on every load, so this is checked again every second).
const sofiaFaces = () => {
  const out = [];
  for (const sheet of document.styleSheets) {
    try { for (const r of sheet.cssRules) if (r.type === CSSRule.FONT_FACE_RULE && /sofia-pro/i.test(r.style.getPropertyValue('font-family'))) out.push(r.cssText); } catch { /* cross-origin sheet */ }
  }
  return out.join('\n');
};
const fixIframeFonts = () => document.querySelectorAll('.ss-page iframe').forEach((f) => {
  try {
    const d = f.contentDocument;
    if (!d || !d.head || d.getElementById('ss-fonts')) return;
    const st = d.createElement('style'); st.id = 'ss-fonts';
    st.textContent = `${sofiaFaces()}\n* { font-family: 'sofia-pro', sans-serif !important; }`; d.head.appendChild(st);
  } catch { /* cross-origin iframe: nothing to do */ }
});

export default function SesameToddlersProbiotic() {
  useEffect(() => { document.body.classList.add('sesame-street'); return () => document.body.classList.remove('sesame-street'); }, []);
  useEffect(() => { fixIframeFonts(); const t = window.setInterval(fixIframeFonts, 1000); return () => window.clearInterval(t); }, []);
  return (
    <div className="ss-page ss-page--probiotic">
      <ProductLegacy page={PAGE} />
      <SesameFx />
    </div>
  );
}
