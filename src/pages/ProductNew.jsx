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
import { TRUST_PDP_NEW, TEMP_HERO_PDP_NEW } from '../data/sharedSections.js';
import { JUMP_NAV_PDP_NEW, BRAND_NARRATIVE_PDP_NEW, PROBLEM_SIGNS_PDP_NEW } from '../data/pdpNewNarrative.js';
import { TWO_UP_DOSAGE, TWO_UP_ROOT_CAUSES, TWO_UP_FORMULA, QUALITY_CRITERIAS_PDP_NEW, PDP_V2_HERO_PDP_NEW } from '../data/pdpNewTwoUp.js';
import { DOSED_FORMULA_PDP_NEW } from '../data/pdpNewDosed.js';
import { COLLAPSIBLE_PDP_NEW, RICH_TEXT_PDP_NEW_FAQ, RICH_TEXT_PDP_NEW_LEGAL, FRONTROWMD_PDP_NEW, APPS_PDP_NEW } from '../data/pdpNewBottom.js';
import { CUSTOM_LIQUID_PDP_NEW } from '../data/pdpNew.js';

// templates/product.uniified-default-v2.json (production body class has the "uniified" typo). Sections in template order.
export default function ProductNew() {
  usePageClass('template-product uniified-default-v2');
  return (
    <>
      <MainProductV2 />
      <FdPdpJumpNav {...JUMP_NAV_PDP_NEW} />
      <FdBrandNarrative {...BRAND_NARRATIVE_PDP_NEW} />
      <FdProblemSigns {...PROBLEM_SIGNS_PDP_NEW} />
      <PdpV2TwoUp {...TWO_UP_DOSAGE} />
      <PdpV2TwoUp {...TWO_UP_ROOT_CAUSES} />
      <PdpV2TwoUp {...TWO_UP_FORMULA} />
      <PdpV2DosedFormula {...DOSED_FORMULA_PDP_NEW} />
      <PdpV2QualityCriterias {...QUALITY_CRITERIAS_PDP_NEW} />
      <HomepageTrustSection {...TRUST_PDP_NEW} />
      <PdpV2Hero {...PDP_V2_HERO_PDP_NEW} />
      <CollapsibleContent {...COLLAPSIBLE_PDP_NEW} />
      <RichText {...RICH_TEXT_PDP_NEW_FAQ} />
      <FrontrowmdCliniciansReviews {...FRONTROWMD_PDP_NEW} />
      <Apps {...APPS_PDP_NEW} />
      <TempHero {...TEMP_HERO_PDP_NEW} />
      <CustomLiquid {...CUSTOM_LIQUID_PDP_NEW} />
      <RichText {...RICH_TEXT_PDP_NEW_LEGAL} />
      <IngredientsPopup />
    </>
  );
}
