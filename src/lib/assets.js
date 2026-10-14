// Image helpers. Everything resolves to a local /assets/... URL; the dev server
// downloads the file from the public CDN on first request (see vite.config.js).
//   shopImg('1_b50a27aa-….png')       ← shopify://shop_images/<name> in the theme JSON
//   reploImg('7f14f27e-….png')        ← assets.replocdn.com/projects/43d7…/<name>
//   themeAsset('nav-icon-kid.svg')    ← theme assets/ folder (already copied)
//   extImg('cdn.shopify.com/s/files/1/0868/…/x.png') ← any other public host
export const shopImg = (name) => `/assets/shop/${name}`;
export const reploImg = (name) => `/assets/replo/${name}`;
export const themeAsset = (name) => `/assets/theme/${name}`;
export const extImg = (hostAndPath) => `/assets/ext/${hostAndPath.replace(/^https?:\/\//, '')}`;
