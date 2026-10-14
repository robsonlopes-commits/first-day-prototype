// Theme settings store links as shopify://pages/x | collections/x | products/x. Map to prototype routes.
export const settingLink = (v) => (v ? v.replace(/^shopify:\/\//, '/') : '#');
