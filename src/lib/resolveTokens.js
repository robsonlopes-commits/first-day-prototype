// Section settings sometimes contain Liquid metaobject tokens that Shopify resolves at render time.
// Mocked with the values the live Sale page shows.
export const COUPON = { code: 'BUNDLEBUILDER', discountPhrase: '52%' };
export const resolveTokens = (str) => (str || '')
  .replace(/\{\{\s*metaobjects\.global_coupon_code\.productioncode\.coupon_code\.value\s*\}\}/g, COUPON.code)
  .replace(/\{\{\s*metaobjects\.global_coupon_code\.productioncode\.consumer_facing_discount_phrase\.value\s*\}\}/g, COUPON.discountPhrase);
