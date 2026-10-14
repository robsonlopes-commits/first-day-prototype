import usePageClass from '../lib/usePageClass.js';
import { TEMPLATE as T } from '../data/bundleQuizTemplate.js';
import { BUNDLE_PRODUCT, GIFTS, BUNDLE_CATALOG, INFO_MODAL_PRODUCTS, SCIENCE, TIMELINE, ACCORDION_1, ACCORDION_2, ALL_REVIEWS } from '../data/bundleQuiz.js';
import FrontrowBrandBand from '../sections/FrontrowBrandBand.jsx';
import StandaloneProduct from '../sections/StandaloneProduct.jsx';
import TempScienceModule from '../sections/TempScienceModule.jsx';
import TimelineSection from '../sections/TimelineSection.jsx';
import AccordionBlock from '../sections/AccordionBlock.jsx';
import HomepageTrustSection from '../sections/HomepageTrustSection.jsx';
import PbfcmComparisonTable from '../sections/PbfcmComparisonTable.jsx';
import Apps from '../sections/Apps.jsx';

// page.lp-bundle-v3 (templates/page.lp-bundle-v3.json): /pages/bundle-quiz. Sections in template order; settings/blocks come from
// src/data/bundleQuizTemplate.js (generated), the metafield-driven content from src/data/bundleQuiz.js.
// Not mounted (they render with zero height on the live page): fd-countdown-bar and main-page (disabled in the template), temp-replo-hero
// (its content is a page metafield / ?angle= personalisation: empty by default), temp-benefits-split (empty page metafield),
// frontrowmd-clinicians-reviews (no product_id) and faq (empty page metafield).
const sh = (name) => (name ? `shopify://shop_images/${name}` : '');
const withCss = (sec, extra = {}) => ({ ...sec.settings, custom_css: sec.custom_css || [], ...extra });

function accordionProps(sec, c) {
  return {
    id: sec.id,
    settings: withCss(sec, {
      heading: c.heading, subheading: c.sub || '',
      ...(c.image ? { image: sh(c.image) } : {}),
      image_mobile: sh(c.imageMobile || c.image),
      image_pos: c.imgPos, image_alt: c.imgAlt, image_mobile_pos: c.imageMobilePos, image_mobile_alt: c.imageMobileAlt, image_h: 1500,
    }),
    blocks: c.items.map((it, i) => ({
      id: `${sec.id}-${i}`,
      settings: { icon: sh(it.icon), icon_alt: it.alt || '', icon_pos: it.pos, heading: it.title, content: it.body },
    })),
  };
}

export default function BundleQuiz() {
  usePageClass('template-page lp-bundle-v3');
  const spSec = T.standalone_product;
  const sciSec = T.temp_science_module_wWLDWj;
  const tabProto = sciSec.blocks[0].settings;
  const tlSec = T.timeline_section_xei4R8;
  const trustSec = T.homepage_trust_section_iTcHJQ;
  const cmpSec = T.pbfcm_comparison_table_NTeG66;
  const appsSec = T['17879326565d1f9488'];

  const product = {
    ...BUNDLE_PRODUCT, gifts: GIFTS, catalog: BUNDLE_CATALOG, infoProducts: INFO_MODAL_PRODUCTS,
    mainImage: BUNDLE_PRODUCT.gallery[0][0], allReviewsText: { count: ALL_REVIEWS.count },
  };

  return (
    <>
      <StandaloneProduct id={spSec.id} settings={withCss(spSec)} blocks={spSec.blocks} product={product} templateSuffix="lp-bundle-v3" />
      <FrontrowBrandBand id={T.custom_liquid_V3FUrH.id} paddingTop={T.custom_liquid_V3FUrH.settings.padding_top} paddingBottom={T.custom_liquid_V3FUrH.settings.padding_bottom} />
      <TempScienceModule id={sciSec.id}
        settings={withCss(sciSec, { heading: SCIENCE.heading })}
        blocks={SCIENCE.tabs.map((t, i) => ({
          id: `tab-${i}`,
          settings: { ...tabProto, tab_label: t.label, content_title: t.title, content_description: t.desc, benefits_list: t.list, panel_image: sh(t.image.file), panel_image_alt: t.image.alt, panel_image_pos: t.image.pos, panel_video: '' },
        }))} />
      <TimelineSection id={tlSec.id}
        settings={{ ...tlSec.settings, heading_line_1: TIMELINE.heading_line_1, heading_line_2: TIMELINE.heading_line_2, accessibility_label: TIMELINE.heading_line_1 }}
        blocks={TIMELINE.items.map((it, i) => ({ id: `m-${i}`, settings: { image: sh(it.image), image_alt: it.title, image_pos: it.pos, badge_label: it.badge, title: it.title, description: it.body } }))} />
      <AccordionBlock {...accordionProps(T.accordion_block_HznRip, ACCORDION_1)} />
      {/* the theme prints the heading setting as is (a newline is just whitespace there) */}
      <HomepageTrustSection id={trustSec.id} settings={{ ...trustSec.settings, heading: trustSec.settings.heading.replace(/\n/g, '') }} blocks={trustSec.blocks} />
      <AccordionBlock {...accordionProps(T.accordion_block_HhfaTG, ACCORDION_2)} />
      <PbfcmComparisonTable id={cmpSec.id} settings={withCss(cmpSec)} blocks={cmpSec.blocks} />
      <Apps id={appsSec.id} settings={appsSec.settings} customCss={[]} allReviews={{ id: appsSec.blocks[0].id, data: ALL_REVIEWS }} />
    </>
  );
}
