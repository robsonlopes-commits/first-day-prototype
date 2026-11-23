import { useEffect } from 'react';
import usePageClass from '../../lib/usePageClass.js';
import IngredientsPopup from '../../components/IngredientsPopup.jsx';
import MainProductV2 from '../../sections/MainProductV2.jsx';
import FdPdpJumpNav from '../../sections/FdPdpJumpNav.jsx';
import FdBrandNarrative from '../../sections/FdBrandNarrative.jsx';
import FdProblemSigns from '../../sections/FdProblemSigns.jsx';
import PdpV2TwoUp from '../../sections/PdpV2TwoUp.jsx';
import PdpV2DosedFormula from '../../sections/PdpV2DosedFormula.jsx';
import PdpV2QualityCriterias from '../../sections/PdpV2QualityCriterias.jsx';
import HomepageTrustSection from '../../sections/HomepageTrustSection.jsx';
import PdpV2Hero from '../../sections/PdpV2Hero.jsx';
import CollapsibleContent from '../../sections/CollapsibleContent.jsx';
import RichText from '../../sections/RichText.jsx';
import FrontrowmdCliniciansReviews from '../../sections/FrontrowmdCliniciansReviews.jsx';
import Apps from '../../sections/Apps.jsx';
import TempHero from '../../sections/TempHero.jsx';
import CustomLiquid from '../../sections/CustomLiquid.jsx';
import { PdpNewContext } from '../../lib/pdpData.jsx';
import { TODDLERS_MULTI_PAGE as BASE } from '../../data/pdp/toddlersMultivitamin.js';
import { shopImg } from '../../lib/assets.js';
import { SignBadge, CountBubble, MeetTheGang, celebrate } from '../../sections/explorations/sesame/Sections.jsx';
import { Stick, LOGO, useSofiaInIframes } from '../../sections/explorations/sesame/ss.jsx';
import StreetScroll from '../../sections/explorations/sesame/StreetScroll.jsx';
import { OvNutrients, OvDesigned, OvWhyMulti, OvLifestyleMulti, OvNutritionMulti, StBanner, StWords, StMeltdown, StMilestones, StIceberg, StHero } from '../../sections/explorations/sesame/StickersMulti.jsx';
import Seam from '../../sections/explorations/sesame/Seam.jsx';
import SesameFx from '../../sections/explorations/sesame/Fx.jsx';
import '../../sections/explorations/sesame/sesame.css';

// EXPLORATION (not a production page): /explorations/sesame-toddlers-multi  ("Sesame Street Toddlers' Multi"). THIS file is the Sesame Street EDITION; the page starts as the original (SesameToddlersMulti.jsx)
// and loads this one when the shopper picks it in "Choose The Edition". Same rules as the Toddlers' Probiotic edition: Sesame Workshop license guidelines (characters only say catchphrases or
// generic phrases, never a word about the product; no character on a call to action; Meet The Gang to scale; legal notice), the street scene under the buy box, the Limited Edition strip.
// A DUPLICATE of /products/the-no-junk-toddlers-multivitamin (the NEW PDP template, src/data/pdp/toddlersMultivitamin.js, rendered like src/pages/ProductNew.jsx) made a Sesame Street
// edition with the playbook of the skill `sesamestreetize`. Header and footer untouched. Rules: every picture or video slot stays a FILE (the live one, or one generated with the real
// Sesame bottle of this page, Big Bird on the label); the library SVGs only sit on top (stickers, <Stick>) or live in new sections; only Sofia Pro; no shadows; headings with a small
// play on the show; every line of a character tied to the product. The new template already has flat waves and its own rhythm, so only colors and the pieces below change.
const BOTTLE_MULTI_SQ = '/assets/sesame/bottle-multi-square.jpg';

// ---------- the gallery: the live slides (files). 0 = the Sesame bottle of the owner, 1 and 2 get a sticker, 5, 7 and 8 are generated ----------
const IM = BASE.main.PRODUCT.images;
const IMAGES = IM.map((im, i) => {
  if (i === 0) return { ...im, src: BOTTLE_MULTI_SQ, alt: 'First Day Toddlers The Multi, Sesame Street edition, with Big Bird on the label.' };
  if (i === 1) return { ...im, overlay: <OvNutrients /> };
  if (i === 2) return { ...im, overlay: <OvDesigned /> };
  if (i === 5) return { ...im, src: '/assets/custom/ssm-why.jpg', overlay: <OvWhyMulti /> };
  if (i === 7) return { ...im, src: '/assets/custom/ssm-nutrition.jpg', overlay: <OvNutritionMulti /> };
  if (i === 8) return { ...im, src: '/assets/custom/ssm-lifestyle.jpg', overlay: <OvLifestyleMulti /> };
  return im;
});

const main = {
  ...BASE.main,
  PRODUCT: { ...BASE.main.PRODUCT, images: IMAGES, cartImage: BOTTLE_MULTI_SQ, vanityTitle: 'Yummy Gummies For Happy Growers And [Supported Growth & Development]' },
  SLOT_INFO_TOP: <SignBadge limited />,
  SLOT_QTY_HEADER: ({ qty }) => <CountBubble qty={qty} unit="bottle" />, // "Four bottles! Ah ah ah!" (as on the Probiotic page: the owner asked for the word, the guidelines would rather have only "Four!", check with Sesame at approval)
  onAddToCart: celebrate,
};

// the headings of the page (marketing only; a play on the show; the claim words are kept)
const set = (sec, settings) => ({ ...sec, settings: { ...sec.settings, ...settings } });
const BRAND = set(BASE.BRAND_NARRATIVE, { image: '/assets/custom/ssm-banner.jpg', heading: 'Our Neighbors Made Us The [#1 Fastest Growing] Teens & Kids Vitamin' });
const PAD = { padding_top_desktop: 75, padding_bottom_desktop: 75, padding_top_mobile: 48, padding_bottom_mobile: 48 }; // --ss-pad, the vertical rhythm of the page
const NOWAVE = { wave_top: false, wave_bottom: false }; // the tall theme waves are replaced by <Seam> (the flat modern wave) between the sections
const BLUE = '#486ced';
const SKY = '#d6efff'; const MINT = '#d4f5df'; const LILAC = '#e8dcfa'; const SUN = '#fff1a8';
const SIGNS = set(BASE.PROBLEM_SIGNS, { section_bg_color: SKY, wave_color: SKY, ...NOWAVE, ...PAD, heading: 'Can You Spot 3 Signs Your Toddler Could Be Off Track Developmentally? [See Results In Just A Few Weeks.]' });
const DOSAGE = set(BASE.TWO_UP_DOSAGE, { section_bg_color: '#ffffff', card_bg_color_mobile: '#ffffff', card_border_color_desktop: '#d7effa', card_border_color_mobile: '#ffffff', ...PAD, heading: 'Same Or Different? Most Vitamins Give A 2-\u2060Year-\u2060Old And A 17-\u2060Year-\u2060Old The Same Dose. [It’s Not Just Lazy, It’s Dangerous.]' });
const ROOT = set(BASE.TWO_UP_ROOT_CAUSES, { section_bg_color: LILAC, card_bg_color_mobile: LILAC, card_border_color_mobile: LILAC, ...PAD, heading: 'Symptoms Are Just [The Tip Of The Iceberg]. Let’s Peek Underneath, Neighbor!' });
const FORMULA = set(BASE.TWO_UP_FORMULA, { ...NOWAVE, ...PAD, heading: "Count The Gaps, Neighbor! 93 Out Of 100 Toddlers Don't Get Enough Nutrients. [So We Invented A New Formula That Addresses Their Biggest Gaps.]" });
const DOSED = set(BASE.DOSED_FORMULA, { wave_color: MINT, wave_bottom: false, padding_top_desktop: 75, padding_top_mobile: 48, title: 'One Powerful Formula, Ten Essential Vitamins, Twenty One Superfoods! [Dosed Specifically For Toddlers]' });
const QUALITY = { ...BASE.QUALITY_CRITERIAS, settings: { ...BASE.QUALITY_CRITERIAS.settings, section_bg_color: MINT, ...PAD }, blocks: BASE.QUALITY_CRITERIAS.blocks.map((b) => ({ ...b, settings: { ...b.settings, advantage_image: '/assets/sesame/bottle-sesame-toddlers-multi-wrap.png' } })) };
const TRUST = set(BASE.TRUST, { heading: 'Trusted By <strong>Experts</strong> And <strong>Neighbors</strong> Like You' });
const FAQ = set(BASE.RICH_TEXT_FAQ, { heading: 'Got Questions, Neighbor? We Have Answers' });
const HERO_BLOCKS = BASE.PDP_V2_HERO.blocks.map((b) => (b.id === 'fd_rich_text_JKPXDk'
  ? { ...b, settings: { ...b.settings, content: '<p>ABCs Take Focus. The Gaps Unaddressed In Early Years Become The <strong>Grades That Slip In School</strong></p>' } } : b));
// the picture hero sits between two waves laid over it (grass above, white below), so its padding leaves room for them
const HERO = { ...BASE.PDP_V2_HERO, settings: { ...BASE.PDP_V2_HERO.settings, padding_top_desktop: 140, padding_bottom_desktop: 150, padding_top_mobile: 84, padding_bottom_mobile: 96 }, blocks: HERO_BLOCKS };
// the closing CTA is the Home hero of the new pages with the original picture: one button, our words, the Sesame Street logo on top
const CLOSING = set(BASE.TEMP_HERO, {
  heading: 'A Happy<br>Growing <span>Journey Starts Here</span>', subheading: 'Hello, neighbor!',
  button_text: 'Order Today', button_aria: 'Order Today', button_link: '#top', secondary_text: '', padding_desktop: 120, padding_mobile: 84,
});

// the new sections
// Sesame Workshop guidelines: a character only says his catchphrases or generic phrases true to him, never a word about the product (same lines as the Probiotic page)
const GANG = [
  ['elmo-wave', 'Elmo', 'Elmo loves hugs and sunny days!'],
  ['bigbird', 'Big Bird', 'Hello, neighbor! Let’s grow big and strong together!'],
  ['grover-3', 'Grover', 'Hello! It is I, Grover! Be brave, be super!'],
  ['abby', 'Abby', 'Wow! Every day is a little bit magical!'],
  ['count-1', 'The Count', 'Count the days! One, two, three! Ah ah ah!'],
  ['cookie-eat', 'Cookie Monster', 'Me love cookies! Om nom nom!'],
];
// the words on the wall of the street scene (invented for this page, pending owner review): no character speaks here, the logo stands alone above them
const STREET_COPY = {
  title: 'Happy Growers ', hl: 'Start At Home', desc: 'Everyday nutrition for toddlers, in a yummy gummy.',
  text: 'Our toddler multi packs 10 essential vitamins and 21 organic superfoods into two yummy gummies a day to support growth and development,* with no junk and nothing fake. Because every little grower deserves a strong start.',
  cta: 'Start The Adventure',
};
const STREET_PICS = { inside: '/assets/custom/ssm-house-inside.webp', insideM: '/assets/custom/ssm-house-inside-mobile.webp', alt: 'A family on a sofa at home, the toddler holds the Toddlers Multi bottle' };

const sid = (id) => `shopify-section-${id}`;

export default function SesameToddlersMultiStyled({ editionPicker }) {
  usePageClass('template-product uniified-default-v2');
  useSofiaInIframes();
  // the mint band of the ingredients starts at the middle of the dose cards (flat wave on top, the same mint as the quality section below it): its height is measured, it depends on the width
  useEffect(() => {
    const sec = document.querySelector('.ss-page--multi .pdv-df');
    if (!sec) return undefined;
    const set = () => {
      const cards = sec.querySelector('.pdv-df__cards-wrap'); if (!cards) return;
      const mid = cards.getBoundingClientRect().top + cards.offsetHeight / 2 - sec.getBoundingClientRect().top;
      sec.style.setProperty('--ss-band', `${Math.max(120, sec.offsetHeight - mid + 18)}px`);
    };
    set();
    const ro = new ResizeObserver(set); ro.observe(sec); window.addEventListener('resize', set);
    const t = window.setTimeout(set, 1200);
    return () => { ro.disconnect(); window.removeEventListener('resize', set); window.clearTimeout(t); };
  }, []);
  useEffect(() => { document.body.classList.add('sesame-street'); return () => document.body.classList.remove('sesame-street'); }, []);
  const page = BASE;
  return (
    <div className="ss-page ss-page--multi">
      <PdpNewContext.Provider value={editionPicker ? { ...main, SLOT_AFTER_QTY: editionPicker } : main}>
        <MainProductV2 />
        <StreetScroll wide copy={STREET_COPY} pictures={STREET_PICS} />
        <Seam from="#ffffff" to="transparent" flip className="ss-seam--up" />
        <FdPdpJumpNav {...page.JUMP_NAV} />
        <FdBrandNarrative {...BRAND} />
        <Stick sec={sid(BRAND.id)} target=".fd-bn__media"><StBanner /></Stick>
        <Seam from="#ffffff" to={SKY} />
        <FdProblemSigns {...SIGNS} />
        <Stick sec={sid(SIGNS.id)} target=".fd-psc-card__media" at={0} parent><StWords /></Stick>
        <Stick sec={sid(SIGNS.id)} target=".fd-psc-card__media" at={1} parent><StMeltdown /></Stick>
        <Stick sec={sid(SIGNS.id)} target=".fd-psc-card__media" at={2} parent><StMilestones /></Stick>
        <Seam from={SKY} to="#ffffff" />
        <PdpV2TwoUp {...DOSAGE} />
        <Seam from="#ffffff" to={LILAC} />
        <PdpV2TwoUp {...ROOT} />
        <Stick sec={sid(ROOT.id)} target=".pdp-v2-two-up__media"><StIceberg /></Stick>
        <Seam from={LILAC} to={BLUE} />
        <PdpV2TwoUp {...FORMULA} />
        <Seam from={BLUE} to="#ffffff" />
        <PdpV2DosedFormula {...DOSED} />
        <PdpV2QualityCriterias {...QUALITY} />
        <Seam from={MINT} to="#ffffff" />
        <HomepageTrustSection {...TRUST} />
        <MeetTheGang scaled waveFrom="#ffffff" gang={GANG} />
        <Seam from="#86cf84" to="transparent" className="ss-seam--over" />
        <PdpV2Hero {...HERO} />
        <Stick sec={sid(HERO.id)} target=".pdp-v2-hero__inner, .pdp-v2-hero"><StHero /></Stick>
        <Seam from="#ffffff" to="transparent" className="ss-seam--up" flip />
        <CollapsibleContent {...page.COLLAPSIBLE} />
        <RichText {...FAQ} />
        {page.FRONTROWMD && <FrontrowmdCliniciansReviews {...page.FRONTROWMD} />}
        <Apps {...page.APPS} />
        <div className="ss-cta">
          <TempHero {...CLOSING} />
          <img className="ss-cta__logo" src={LOGO} alt="Sesame Street" draggable="false" />
          <CustomLiquid {...page.CUSTOM_LIQUID} />
        </div>
        <RichText {...page.RICH_TEXT_LEGAL} />
        <p className="ss-legal">Sesame Street® and associated characters, trademarks and design elements are owned and licensed by Sesame Workshop. © 2026 Sesame Workshop. All Rights Reserved.</p>
        <IngredientsPopup />
      </PdpNewContext.Provider>
      <SesameFx />
    </div>
  );
}
