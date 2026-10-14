import { shopImg, extImg } from './assets.js';
// Section settings store images as shopify://shop_images/<name>. Resolve to a local asset URL (undefined when empty).
export const settingImg = (v) => {
  if (!v) return undefined;
  if (v.startsWith('shopify://shop_images/')) return shopImg(v.slice('shopify://shop_images/'.length));
  if (v.startsWith('/') || v.startsWith('http')) return v.startsWith('http') ? extImg(v) : v;
  return v;
};
