import usePageClass from '../lib/usePageClass.js';
import { TEMPLATE as T } from '../data/bundleBuilderTemplate.js';
import { COUNTDOWN, QUIZ_SETTINGS, PAGE, REVIEWS } from '../data/bundleBuilder.js';
import FdCountdownBar from '../sections/FdCountdownBar.jsx';
import FdQuizBuyBox from '../sections/FdQuizBuyBox.jsx';
import FrontrowBrandBand from '../sections/FrontrowBrandBand.jsx';
import TimelineSection from '../sections/TimelineSection.jsx';
import AccordionBlock from '../sections/AccordionBlock.jsx';
import TempScienceModule from '../sections/TempScienceModule.jsx';
import HomepageTrustSection from '../sections/HomepageTrustSection.jsx';
import PbfcmComparisonTable from '../sections/PbfcmComparisonTable.jsx';
import JudgeMeAllReviewsMock from '../sections/JudgeMeAllReviewsMock.jsx';
import FaqSection from '../sections/FaqSection.jsx';

// page.lp-bundle-v2 ("Bundle builder v2", /pages/bundle-builder-v2): countdown bar + quiz buy box + the BTS landing sections.
// Section order = templates/page.lp-bundle-v2.json (src/data/bundleBuilderTemplate.js); the template reads most copy from page metafields,
// whose values (captured from the live page) live in PAGE (src/data/bundleBuilder.js).
// Sections that render with ZERO height on the live page (their page metafields are empty) are not mounted, like LandingBTS does:
//   temp-replo-hero (headline metafield empty), temp-benefits-split, frontrowmd-clinicians-reviews (product_id empty), faq (no FAQ blocks; FaqSection renders null).
const sh = (name) => (name ? `shopify://shop_images/${name}` : '');
const withCss = (sec, extra = {}) => ({ ...sec.settings, custom_css: sec.custom_css || [], ...extra });

function accordionProps(sec, c, imageMobile) {
  return {
    id: sec.id,
    settings: { ...withCss(sec), heading: c.heading || sec.settings.heading, subheading: '', image: c.image, image_mobile: imageMobile || c.image },
    blocks: c.items.map((it, i) => ({ id: `${sec.id}-${i}`, settings: { icon: sh(it.icon), icon_alt: it.alt || '', icon_pos: it.pos, heading: it.title, content: it.body } })),
  };
}

export default function BundleBuilderV2() {
  usePageClass('template-page lp-bundle-v2');
  const cd = T.fd_countdown_bar;
  const tl = T.timeline_section_xei4R8;
  const sci = T.temp_science_module_wWLDWj;
  const tabProto = sci.blocks[0].settings;
  const trust = T.homepage_trust_section_iTcHJQ;
  const cmp = T.pbfcm_comparison_table_NTeG66;
  const apps = T['17879326565d1f9488'];
  const faq = T.faq_eTJqpc;
  const cl = T.custom_liquid_V3FUrH;

  return (
    <>
      <FdCountdownBar id={cd.id} settings={{ ...cd.settings, ...COUNTDOWN }} />
      <FdQuizBuyBox id={T.quiz_buy_box.id} settings={QUIZ_SETTINGS} />
      <FrontrowBrandBand id={cl.id} />
      <TimelineSection id={tl.id}
        settings={{ ...tl.settings, heading_line_1: tl.settings.heading_line_1, heading_line_2: tl.settings.heading_line_2, accessibility_label: tl.settings.heading_line_1 }}
        blocks={PAGE.timeline.items.map((it, i) => ({ id: `m-${i}`, settings: { image: sh(it.image), image_alt: it.title, image_pos: it.pos, badge_label: it.badge, title: it.title, description: it.body } }))} />
      <AccordionBlock {...accordionProps(T.accordion_block_HznRip, PAGE.accordion1)} />
      <TempScienceModule id={sci.id} settings={withCss(sci, { heading: PAGE.science.heading })}
        blocks={PAGE.science.tabs.map((t, i) => ({ id: `tab-${i}`, settings: { ...tabProto, tab_label: t.label, content_title: 'How This Helps*', content_description: t.desc, benefits_list: t.list, panel_image: sh(t.image), panel_video: '' } }))} />
      <HomepageTrustSection id={trust.id} settings={trust.settings} blocks={trust.blocks.filter((b) => !b.disabled)} />
      <AccordionBlock {...accordionProps(T.accordion_block_HhfaTG, PAGE.accordion2, PAGE.accordion2.imageMobile)} />
      <PbfcmComparisonTable id={cmp.id} settings={cmp.settings} blocks={cmp.blocks} />
      <div id={`shopify-section-${apps.id}`} className="shopify-section section">
        <style>{`#shopify-section-${apps.id} { --section-padding-top: ${apps.settings.padding_top}px; --section-padding-bottom: ${apps.settings.padding_bottom}px; }`}</style>
        <div className="section--padding">
          <div className="page-width"><JudgeMeAllReviewsMock data={REVIEWS} /></div>
        </div>
      </div>
      <FaqSection id={faq.id} settings={faq.settings} blocks={[]} />
    </>
  );
}
