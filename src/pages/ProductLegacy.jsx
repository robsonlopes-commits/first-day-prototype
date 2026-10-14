import usePageClass from '../lib/usePageClass.js';
import IngredientsPopup from '../components/IngredientsPopup.jsx';
import MainProductLegacy from '../sections/MainProductLegacy.jsx';
import ImageWithText from '../sections/ImageWithText.jsx';
import EssentialEight from '../sections/EssentialEight.jsx';
import RichText from '../sections/RichText.jsx';
import ReviewCards from '../sections/ReviewCards.jsx';
import Multicolumn from '../sections/Multicolumn.jsx';
import CollapsibleContent from '../sections/CollapsibleContent.jsx';
import FrontrowmdCliniciansReviews from '../sections/FrontrowmdCliniciansReviews.jsx';
import Apps from '../sections/Apps.jsx';
import CustomLiquid from '../sections/CustomLiquid.jsx';
import { PDP_LEGACY_SECTIONS } from '../data/pdpLegacySections.js';
import { PDP_LEGACY_FRONTROW } from '../data/pdpLegacyFrontrow.js';
import { JUDGEME, PDP_PRODUCT } from '../data/pdpLegacy.js';

// templates/product.unified-default.json: main-product + the enabled sections below it (disabled ones are not rendered).
// Per-section aspect ratios of lazy "adapt" images (theme reads image.aspect_ratio from the file metadata).
const IMAGE_RATIO = { image_with_text_6Q3NK6: 1, '1668ba59-402b-43aa-82e4-477c210704cd': 1 };

const renderSection = (sec) => {
  const props = { id: sec.id, settings: sec.settings, blocks: sec.blocks };
  const key = sec.id;
  switch (sec.type) {
    case 'image-with-text': return <ImageWithText key={key} {...props} customCss={sec.customCss} imageAspectRatio={IMAGE_RATIO[sec.id] || 1} />;
    case 'essential-eight': return <EssentialEight key={key} {...props} />;
    case 'rich-text': return <RichText key={key} {...props} custom_css={sec.customCss} />;
    case 'review-cards': return <ReviewCards key={key} {...props} customCss={sec.customCss} />;
    case 'multicolumn': return <Multicolumn key={key} {...props} customCss={sec.customCss} />;
    case 'collapsible-content': return <CollapsibleContent key={key} {...props} />;
    case 'frontrowmd-clinicians-reviews': return <FrontrowmdCliniciansReviews key={sec.id} id={sec.id} settings={sec.settings} widget={PDP_LEGACY_FRONTROW} />;
    case 'apps': return <Apps key={sec.id} id={sec.id} settings={sec.settings} customCss={sec.customCss} reviews={JUDGEME} productTitle={PDP_PRODUCT.title} />;
    case 'custom-liquid': return <CustomLiquid key={sec.id} id={sec.id} settings={sec.settings} customCss={sec.customCss} />;
    default: return null;
  }
};

export default function ProductLegacy() {
  usePageClass('template-product unified-default');
  return (
    <>
      <MainProductLegacy />
      {PDP_LEGACY_SECTIONS.map(renderSection)}
      <IngredientsPopup />
    </>
  );
}
