import usePageClass from '../lib/usePageClass.js';
import IngredientsPopup from '../components/IngredientsPopup.jsx';
import MainProductV2 from '../sections/MainProductV2.jsx';
import FdPdpJumpNav from '../sections/FdPdpJumpNav.jsx';
import FdBrandNarrative from '../sections/FdBrandNarrative.jsx';
import FdProblemSigns from '../sections/FdProblemSigns.jsx';
import PdpV2TwoUp from '../sections/PdpV2TwoUp.jsx';
import PdpV2DosedFormula from '../sections/PdpV2DosedFormula.jsx';
import PdpV2QualityCriterias from '../sections/PdpV2QualityCriterias.jsx';
import HomepageTrustSection from '../sections/HomepageTrustSection.jsx';
import PdpV2Hero from '../sections/PdpV2Hero.jsx';
import CollapsibleContent from '../sections/CollapsibleContent.jsx';
import RichText from '../sections/RichText.jsx';
import FrontrowmdCliniciansReviews from '../sections/FrontrowmdCliniciansReviews.jsx';
import Apps from '../sections/Apps.jsx';
import TempHero from '../sections/TempHero.jsx';
import CustomLiquid from '../sections/CustomLiquid.jsx';
import { PdpNewContext } from '../lib/pdpData.jsx';
import { KIDS_NEW_PAGE } from '../data/pdp/defaults.js';

// templates/product.uniified-default-v2.json (production body class has the "uniified" typo). Sections in template order.
export default function ProductNew({ page = KIDS_NEW_PAGE }) {
  usePageClass('template-product uniified-default-v2');
  return (
    <PdpNewContext.Provider value={page.main}>
      <MainProductV2 />
      <FdPdpJumpNav {...page.JUMP_NAV} />
      <FdBrandNarrative {...page.BRAND_NARRATIVE} />
      <FdProblemSigns {...page.PROBLEM_SIGNS} />
      <PdpV2TwoUp {...page.TWO_UP_DOSAGE} />
      <PdpV2TwoUp {...page.TWO_UP_ROOT_CAUSES} />
      <PdpV2TwoUp {...page.TWO_UP_FORMULA} />
      <PdpV2DosedFormula {...page.DOSED_FORMULA} />
      <PdpV2QualityCriterias {...page.QUALITY_CRITERIAS} />
      <HomepageTrustSection {...page.TRUST} />
      <PdpV2Hero {...page.PDP_V2_HERO} />
      <CollapsibleContent {...page.COLLAPSIBLE} />
      <RichText {...page.RICH_TEXT_FAQ} />
      {page.FRONTROWMD && <FrontrowmdCliniciansReviews {...page.FRONTROWMD} />}
      <Apps {...page.APPS} />
      <TempHero {...page.TEMP_HERO} />
      <CustomLiquid {...page.CUSTOM_LIQUID} />
      <RichText {...page.RICH_TEXT_LEGAL} />
      <IngredientsPopup />
    </PdpNewContext.Provider>
  );
}
