// Props for <PbfcmProductCarousel /> taken from the template JSON (templates/index.hp01-v2.json, templates/page.bfcm-categories.json).
import { HOME_CAROUSEL_TABS, SALE_CAROUSELS } from './collections.js';

// Home: alternative view, tab filter (collection "all", tabs from product metafields), 40%/30% coupon -> DEFAULT_DISCOUNT.
export const HOME_PRODUCT_CAROUSEL = {
  id: 'pbfcm_product_carousel_piA7ei',
  alternativeView: true,
  useShortName: true,
  title: "Shop For Your **Family's Health**",
  titleSize: 36,
  titleColor: '#2c3d50',
  titleSpacing: 36,
  enableTabFilter: true,
  tabs: HOME_CAROUSEL_TABS,
  imageSource: 'homeImage',
  containerWidth: 1320,
  wullView: true,
  desktopSidePadding: 64,
  mobileSidePadding: 16,
  imageRatio: 'square',
  borderColor: '#e5e5e5',
  backgroundColor: '#ffffff',
  paddingTop: 36,
  paddingBottom: 8,
  paddingBottomMobile: 6,
  enableShopAllBanner: false,
  shopAllText: 'Choose from over 18 products for the entire family',
  mobileBoxText: '',
  shopAllButtonText: 'See All Products',
  shopAllButtonLink: '/pages/sale',
};

const saleBase = {
  alternativeView: false, useShortName: true, titleSize: 30, titleColor: '#2c3d50', titleSpacing: 16, enableTabFilter: false,
  imageSource: 'saleImage', containerWidth: 1400, wullView: false, imageRatio: 'portrait', borderColor: '#d7effa', borderRadius: 12,
  buttonColor: '#078942', backgroundColor: 'rgba(0,0,0,0)', paddingTop: 20, paddingBottom: 20, paddingBottomMobile: 12,
  mobileBoxText: 'Choose from over **18 products** for the entire family.',
};
const NEW = { showBadge: true, badgeText: 'New!' };

// /pages/sale, in page order (use as <PbfcmProductCarousel key={c.id} {...c} />)
export const SALE_PRODUCT_CAROUSELS = [
  { ...saleBase, id: 'bfcm_product_carousel_1', anchorId: 'starterpacks', title: 'Save More with Starter Bundles', paddingTop: 16, blocks: SALE_CAROUSELS.starterpacks },
  { ...saleBase, id: 'bfcm_product_carousel_2', anchorId: 'vitamins', title: 'No Junk™ Multivitamins', blocks: SALE_CAROUSELS.vitamins.map((h) => (h === 'the-no-junk-toddlers-multivitamin' ? { handle: h, ...NEW } : h)) },
  { ...saleBase, id: 'pbfcm_product_carousel_DHnxMd', anchorId: 'magnesium', title: '🌙 Nighttime Reset Magnesium', blocks: SALE_CAROUSELS.magnesium },
  { ...saleBase, id: 'pbfcm_product_carousel_GWxXL8', anchorId: 'brain', title: '🧠 Brain Focus Support', blocks: SALE_CAROUSELS.brain.map((h) => ({ handle: h, ...NEW })) },
  { ...saleBase, id: 'bfcm_product_carousel_3', anchorId: 'probiotics', title: '3-In-1 Pre+ Post+ Probiotics', blocks: SALE_CAROUSELS.probiotics },
];
