import { getProduct } from '../data/products.js';

// Owner rule: every multivitamin opens the NEW PDP (uniified-default-v2),
// every other product opens the LEGACY PDP (unified-default).
export const NEW_PDP_PATH = '/products/kids-enrichment-vitamin';
export const LEGACY_PDP_PATH = '/products/kids-calming-magnesium';

export function pdpPathForHandle(handle) {
  const p = getProduct(handle);
  const isMulti = p ? p.category === 'multivitamin' : /multi|vitamin/.test(handle);
  return isMulti ? NEW_PDP_PATH : LEGACY_PDP_PATH;
}
