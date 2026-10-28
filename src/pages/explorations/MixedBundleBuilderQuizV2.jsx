import { useState } from 'react';
import usePageClass from '../../lib/usePageClass.js';
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
import QuizBuilder, { BUILDER_TIERS } from '../../sections/explorations/mixedBundleQuiz/QuizBuilder.jsx';
import TempSelloutNotice from '../../sections/TempSelloutNotice.jsx';
import TimelineSection from '../../sections/TimelineSection.jsx';
import HomepageTrustSection from '../../sections/HomepageTrustSection.jsx';
import TempBenefitsSplit from '../../sections/TempBenefitsSplit.jsx';
import PbfcmComparisonTable from '../../sections/PbfcmComparisonTable.jsx';
import FrontrowmdCliniciansReviews from '../../sections/FrontrowmdCliniciansReviews.jsx';
import Apps from '../../sections/Apps.jsx';

// EXPLORATION (not a production page): /explorations/mixed-bundle-builder-quiz-v2  ("Mixed Bundle Builder v2": no quiz)
// A DUPLICATE of v1 (MixedBundleBuilderQuizV1.jsx), itself a duplicate of the kids "Behind the Science" landing (src/pages/LandingBTS.jsx), so the production
// replica is never touched. What v2 changes: there is NO quiz. The buy box is the original one, and its button "Add To Cart & View Gift" opens the bundle builder
// ("Complete Your Family Health Routine", src/sections/explorations/mixedBundleQuiz/QuizBuilder.jsx) with the product of the page already chosen, in the quantity that was added,
// and none of the "we added this because you told us" messages (no recap box, no notes). Closing the builder adds nothing; the builder adds to the cart.
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

export default function MixedBundleBuilderQuizV2() {
  usePageClass('template-page lp-BTS-master');
  const c = KIDS;
  const [builder, setBuilder] = useState(null); // { qty, monthly } while the bundle builder is open
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
      <StandaloneProduct id={spSec.id} settings={withCss(spSec)} blocks={spSec.blocks} product={P} incrementalTiers={BUILDER_TIERS} onBeforeAdd={(p) => setBuilder({ qty: p.qty, monthly: p.monthly })} />
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
      {builder && <QuizBuilder key={JSON.stringify(builder)} answers={builder} onClose={() => setBuilder(null)} />}
    </>
  );
}
