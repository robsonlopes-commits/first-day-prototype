import { useState } from 'react';
import usePageClass from '../../lib/usePageClass.js';
import { useCart } from '../../layout/CartContext.jsx';
import AddOnModal from '../../sections/explorations/bundleAddOn/AddOnModal.jsx';
import { extImg } from '../../lib/assets.js';
import IngredientsPopup from '../../components/IngredientsPopup.jsx';
import { LANDING, TRUST_LP, COMPARISON_LP } from '../../data/landing.js';
import { TEMPLATE } from '../../data/landingTemplate.js';
import { FRONTROWMD_PDP_NEW } from '../../data/pdpNewBottom.js';
import TempReploHero from '../../sections/TempReploHero.jsx';
import FrontrowBrandBand from '../../sections/FrontrowBrandBand.jsx';
import AccordionBlock from '../../sections/AccordionBlock.jsx';
import TempScienceModule from '../../sections/TempScienceModule.jsx';
import StandaloneProduct from '../../sections/StandaloneProduct.jsx';
import TempSelloutNotice from '../../sections/TempSelloutNotice.jsx';
import TimelineSection from '../../sections/TimelineSection.jsx';
import HomepageTrustSection from '../../sections/HomepageTrustSection.jsx';
import TempBenefitsSplit from '../../sections/TempBenefitsSplit.jsx';
import PbfcmComparisonTable from '../../sections/PbfcmComparisonTable.jsx';
import FrontrowmdCliniciansReviews from '../../sections/FrontrowmdCliniciansReviews.jsx';
import Apps from '../../sections/Apps.jsx';

// EXPLORATION (not a production page): /explorations/bundle-add-on
// A DUPLICATE of the kids "Behind the Science" landing (src/pages/LandingBTS.jsx, /pages/kde-behind-the-science-lp) so changes for the exploration
// never touch the production replica. Same layout and sections; the data is a deep copy (LANDING.kde, TEMPLATE, TRUST_LP, COMPARISON_LP), so edit
// `c`, `T` and the section props in THIS file (or override fields right after the clones below). Kids only.
// What this exploration changes: the buy box button "Add To Cart & View Gift" first opens the NEW add-on modal (src/sections/explorations/bundleAddOn,
// designed in Figma "Internal Drafts" > Add-on Popup) and only then the cart. "No, Thanks. Continue" adds just the product, "Add To Cart" adds it
// plus the add-ons the shopper picked.
const sh = (name) => (name ? `shopify://shop_images/${name}` : '');
// deep copies: editing them here does not change the production page
const T = structuredClone(TEMPLATE);
const KIDS = structuredClone(LANDING.kde);
const TRUST = structuredClone(TRUST_LP);
const COMPARISON = structuredClone(COMPARISON_LP);
const withCss = (sec, extra = {}) => ({ ...sec.settings, custom_css: sec.custom_css || [], ...extra });

function accordionProps(sec, c) {
  return {
    id: sec.id,
    settings: { ...withCss(sec), heading: c.heading, subheading: c.sub || '', image: sh(c.image), image_mobile: sh(c.image), image_pos: c.imgPos, image_h: c.imgH },
    blocks: c.items.map((it, i) => ({
      id: `${sec.id}-${i}`,
      settings: { icon: sh(it.icon), icon_alt: it.alt || '', icon_pos: it.pos, heading: it.title, content: it.body },
    })),
  };
}

export default function BundleAddOn() {
  usePageClass('template-page lp-BTS-master');
  const c = KIDS;
  const cart = useCart();
  const [pending, setPending] = useState(null); // the buy box add to cart that is waiting on the add-on modal
  const finish = (addons) => {
    if (!pending) return;
    pending.commit({ keepCartClosed: true });
    addons.forEach((it) => {
      const price = Math.round(it.now * 100);
      const key = `addon-${it.id}:${pending.monthly ? 'sub' : 'otp'}`;
      cart.addLine({ handle: it.handle || it.id, title: it.title, image: it.image, price }, pending.monthly, { key, price, compare: Math.round(it.was * 100) });
      if (it.qty > 1) cart.changeQty(key, it.qty - 1);
    });
    setPending(null);
    cart.openCart();
  };
  const P = c.product;

  // hero (top): headline / description / media from the page metafield custom.section_temp_replo_hero
  const heroSec = T.temp_replo_hero_RkYkXc;
  const hero = {
    ...withCss(heroSec),
    headline: c.hero.headline, description: c.hero.description, cta_text: c.hero.cta, stars_text: c.hero.starsText,
    hero_image: sh(c.hero.image), hero_image_mobile: sh(c.hero.mobileImage), mobile_image_full_width: c.hero.mobileImageFullWidth,
  };
  const heroBlocks = heroSec.blocks.map((b) => (b.type === 'temp-testimonial'
    ? { ...b, settings: { ...b.settings, avatar: sh(c.hero.creator.avatar), name: c.hero.creator.name, quote: c.hero.creator.quote } }
    : b));

  // science tabs
  const sciSec = T.temp_science_module_mqM7QH;
  const tabProto = sciSec.blocks[0].settings;
  const sciBlocks = c.science.tabs.map((t, i) => ({
    id: `tab-${i}`,
    settings: { ...tabProto, tab_label: t.label, content_title: t.title, content_description: t.desc, benefits_list: t.list, panel_video: extImg(t.video), panel_poster: extImg(t.poster) },
  }));

  // standalone product
  const spSec = T.standalone_product_PMRdVC;

  // sell-out notice: the video is a cdn.shopify.com file
  const sellSec = T.temp_sellout_notice_WQzDBM;

  // expectation timeline + benefits split (kids only: the teen metafields are empty)
  const tlSec = T.timeline_section_N69qEe;
  const bsSec = T.temp_benefits_split_kngUgC;
  const benefitProto = bsSec.blocks[0].settings;

  // last hero (founder)
  const lastSec = T.temp_replo_hero_3dPiJD;
  const last = { ...withCss(lastSec), headline: c.founder.headline, description: c.founder.description, cta_text: c.founder.cta, hero_image: sh(c.founder.image), hero_image_mobile: sh(c.founder.image) };

  // Judge.me review widget (mock) data
  const R = c.reviews;
  const reviews = {
    average: parseFloat(R.rating), count: R.count.replace(/ reviews$/, ''), summary: R.summary, highlights: R.highlights,
    reviews: R.items.map((r) => ({ rating: r.stars, name: r.name, date: r.date, title: r.title, body: r.body })),
  };

  return (
    <>
      <TempReploHero id={heroSec.id} settings={hero} blocks={heroBlocks} video={c.hero.video && extImg(c.hero.video)} mobileVideo={c.hero.mobileVideo && extImg(c.hero.mobileVideo)} />
      <FrontrowBrandBand id={T.custom_liquid_rkHyT8.id} />
      <AccordionBlock {...accordionProps(T.accordion_block_driBft, c.accordion1)} />
      <TempScienceModule id={sciSec.id} settings={withCss(sciSec, { heading: c.science.heading })} blocks={sciBlocks} />
      <StandaloneProduct id={spSec.id} settings={withCss(spSec)} blocks={spSec.blocks} product={P} onBeforeAdd={setPending} />
      <TempSelloutNotice id={sellSec.id} settings={sellSec.settings} />
      {c.timeline && (
        <TimelineSection id={tlSec.id}
          settings={{ ...tlSec.settings, heading_line_1: c.timeline.heading_line_1, heading_line_2: c.timeline.heading_line_2, accessibility_label: c.timeline.heading_line_1 }}
          blocks={c.timeline.items.map((it, i) => ({ id: `m-${i}`, settings: { image: sh(it.image), image_alt: it.title, image_pos: it.pos, badge_label: it.badge, title: it.title, description: it.body } }))} />
      )}
      <HomepageTrustSection {...TRUST} />
      {c.benefits && (
        <TempBenefitsSplit id={bsSec.id} settings={{ ...bsSec.settings, heading: c.benefits.heading, body: c.benefits.body, button_label: c.benefits.button_label, button_link: c.benefits.button_link }}
          blocks={c.benefits.cards.map((it, i) => ({ id: `b-${i}`, settings: { ...benefitProto, icon: sh(it.icon), icon_pos: it.pos, title: it.title, text: it.text } }))} />
      )}
      <AccordionBlock {...accordionProps(T.accordion_block_QpghhN, c.accordion2)} />
      <PbfcmComparisonTable {...COMPARISON} />
      {c.clinicianReviews && <FrontrowmdCliniciansReviews id={T.frontrowmd_clinicians_reviews_z8btGd.id} settings={{ ...FRONTROWMD_PDP_NEW.settings, ...T.frontrowmd_clinicians_reviews_z8btGd.settings }} />}
      <Apps id={T['1771530273b0a25f6d'].id} settings={T['1771530273b0a25f6d'].settings} customCss={[]} reviews={reviews} productTitle={P.title} />
      <TempReploHero id={lastSec.id} settings={last} blocks={[]} video={c.founder.video && extImg(c.founder.video)} mobileVideo={c.founder.mobileVideo && extImg(c.founder.mobileVideo)} />
      {c.customCss && <div id={`shopify-section-${T.temp_css_XVHj4R.id}`} className="shopify-section"><style>{c.customCss.replace(/<\/style>/g, '')}</style></div>}
      <IngredientsPopup />
      <AddOnModal open={!!pending} subtotalCents={pending ? pending.subtotalCents : 0} onContinue={finish} onClose={() => setPending(null)} />
    </>
  );
}
