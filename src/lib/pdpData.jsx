import { createContext, useContext } from 'react';
import * as NEW from '../data/pdpNew.js';
import * as LEG from '../data/pdpLegacy.js';

// The data of a PDP main section. The two PDP templates were built for one product each (Kids' Multi on the new PDP, Kids' Magnesium on the legacy PDP), so the
// main sections read their data through these contexts: the default is that Kids product, and a page of another product wraps its sections in a provider
// with its own data (see src/pages/ProductNew.jsx and ProductLegacy.jsx, and src/data/pdp/*).
// New PDP (product.uniified-default-v2): { SECTION_ID, PRODUCT, DEMOGRAPHIC_TABS, BENEFIT_ACCORDION, PURCHASE, SAVINGS_DISPLAY, USP_IMAGES, COLLAPSIBLE_TABS, CROSSLINKS }
export const KIDS_PDP_NEW = {
  SECTION_ID: NEW.SECTION_ID, PRODUCT: NEW.PRODUCT, DEMOGRAPHIC_TABS: NEW.DEMOGRAPHIC_TABS, BENEFIT_ACCORDION: NEW.BENEFIT_ACCORDION, PURCHASE: NEW.PURCHASE,
  SAVINGS_DISPLAY: NEW.SAVINGS_DISPLAY, USP_IMAGES: NEW.USP_IMAGES, COLLAPSIBLE_TABS: NEW.COLLAPSIBLE_TABS, CROSSLINKS: NEW.CROSSLINKS,
};
export const PdpNewContext = createContext(KIDS_PDP_NEW);
export const usePdpNew = () => useContext(PdpNewContext);

// Legacy PDP (product.unified-default): the exports of src/data/pdpLegacy.js
export const KIDS_PDP_LEGACY = { ...LEG };
export const PdpLegacyContext = createContext(KIDS_PDP_LEGACY);
export const usePdpLegacy = () => useContext(PdpLegacyContext);
