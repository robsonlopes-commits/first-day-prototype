import { TRUST_PDP_NEW, TEMP_HERO_PDP_NEW } from '../sharedSections.js';
import { JUMP_NAV_PDP_NEW, BRAND_NARRATIVE_PDP_NEW, PROBLEM_SIGNS_PDP_NEW } from '../pdpNewNarrative.js';
import { TWO_UP_DOSAGE, TWO_UP_ROOT_CAUSES, TWO_UP_FORMULA, QUALITY_CRITERIAS_PDP_NEW, PDP_V2_HERO_PDP_NEW } from '../pdpNewTwoUp.js';
import { DOSED_FORMULA_PDP_NEW } from '../pdpNewDosed.js';
import { COLLAPSIBLE_PDP_NEW, RICH_TEXT_PDP_NEW_FAQ, RICH_TEXT_PDP_NEW_LEGAL, FRONTROWMD_PDP_NEW, APPS_PDP_NEW } from '../pdpNewBottom.js';
import { CUSTOM_LIQUID_PDP_NEW } from '../pdpNew.js';
import { PDP_LEGACY_SECTIONS } from '../pdpLegacySections.js';
import { PDP_LEGACY_FRONTROW } from '../pdpLegacyFrontrow.js';
import { KIDS_PDP_NEW, KIDS_PDP_LEGACY } from '../../lib/pdpData.jsx';

// What each PDP template shows, by section: the DEFAULT is the product the template was first built for. A page of another product is
// { ...KIDS_NEW_PAGE, ...its own sections } (new PDP) or { ...KIDS_LEGACY_PAGE, ...its own data } (legacy PDP), see src/data/pdp/*.js.

// New PDP (product.uniified-default-v2), default = Kids' Multi (/products/kids-enrichment-vitamin). main = what the main section reads (src/lib/pdpData.jsx).
export const KIDS_NEW_PAGE = {
  main: KIDS_PDP_NEW, JUMP_NAV: JUMP_NAV_PDP_NEW, BRAND_NARRATIVE: BRAND_NARRATIVE_PDP_NEW, PROBLEM_SIGNS: PROBLEM_SIGNS_PDP_NEW,
  TWO_UP_DOSAGE, TWO_UP_ROOT_CAUSES, TWO_UP_FORMULA, DOSED_FORMULA: DOSED_FORMULA_PDP_NEW, QUALITY_CRITERIAS: QUALITY_CRITERIAS_PDP_NEW, TRUST: TRUST_PDP_NEW,
  PDP_V2_HERO: PDP_V2_HERO_PDP_NEW, COLLAPSIBLE: COLLAPSIBLE_PDP_NEW, RICH_TEXT_FAQ: RICH_TEXT_PDP_NEW_FAQ, FRONTROWMD: FRONTROWMD_PDP_NEW, APPS: APPS_PDP_NEW,
  TEMP_HERO: TEMP_HERO_PDP_NEW, CUSTOM_LIQUID: CUSTOM_LIQUID_PDP_NEW, RICH_TEXT_LEGAL: RICH_TEXT_PDP_NEW_LEGAL,
};

// Legacy PDP (product.unified-default), default = Kids' Magnesium (/products/kids-calming-magnesium). SECTIONS = the sections under the main one, in order.
export const KIDS_LEGACY_PAGE = { main: KIDS_PDP_LEGACY, SECTIONS: PDP_LEGACY_SECTIONS, FRONTROW: PDP_LEGACY_FRONTROW };
