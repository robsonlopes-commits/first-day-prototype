import { createElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useFadePanels from '../components/useFadePanels.js';
import IngredientsPopup from '../components/IngredientsPopup.jsx';
import { shopImg } from '../lib/assets.js';
import { getProduct, DEFAULT_DISCOUNT } from '../data/products.js';
import PbfcmProductCard from './PbfcmProductCard.jsx';
import AltProductCard from './AltProductCard.jsx';
import { BASE, WULL, CLASSIC, SHOP_ALL } from './pbfcmCarouselCss.js';
import '../styles/fd-ui-kit.css';
import '../styles/theme/fd-tabs-v3.css';
import '../styles/theme/pbfcm-product-carousel-alt.css';

// sections/pbfcm-product-carousel.liquid. Props = section settings (camelCase). Defaults = the /pages/sale instances.
//   blocks: [{ handle, customImage?, showBadge?, badgeText?, badgeColor?, showDescription?, descriptionText? }] (or plain handles)
//   tabs (alt view / enableTabFilter): [{ key: "kids'", label: "Kids'", handles: [...] }]  -> one panel per tab (pbfcm-carousel-extended)
//   imageSource: 'saleImage' | 'homeImage'  (which catalog image the cards use when no customImage is given)
const ARROW_PREV = <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const ARROW_NEXT = <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const SELECT_ICON = <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 7.5L10 12.5L15 7.5" stroke="#2c3d50" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const SHOP_ALL_ARROW = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M13.6307 17.2154L12.9845 16.5452L17.073 12.4567H5.15375V11.5337H17.073L12.9845 7.44517L13.6307 6.78442L18.8462 11.9999L13.6307 17.2154Z" fill="#2C3D50" /></svg>;

const px = (n) => (typeof n === 'number' ? `${n}px` : n);
const toBlock = (b) => (typeof b === 'string' ? { handle: b } : b);
const imgUrl = (name) => (!name ? undefined : name.startsWith('/') ? name : shopImg(name));

// Scroll/arrows/dots logic from the section's inline script (updateNav, generateDots, scrollPrev/Next).
function useCarouselNav(getTrack, total, deps) {
  const [nav, setNav] = useState({ prevDisabled: true, nextDisabled: false, dots: 0, activeDot: 0 });
  const update = useCallback(() => {
    const track = getTrack();
    if (!track) return;
    const w = window.innerWidth;
    const perPage = w <= 749 ? 1 : w <= 989 ? 3 : 4;
    const amount = track.clientWidth;
    const left = track.scrollLeft;
    const max = track.scrollWidth - track.clientWidth;
    const numDots = Math.ceil(total / perPage);
    const dots = numDots <= 1 ? 0 : numDots;
    let page = left >= max - 5 ? dots - 1 : Math.round(left / (amount || 1));
    page = Math.min(Math.max(page, 0), Math.max(dots - 1, 0));
    setNav((p) => (p.prevDisabled === (left <= 0) && p.nextDisabled === (left >= max - 1) && p.dots === dots && p.activeDot === page ? p : { prevDisabled: left <= 0, nextDisabled: left >= max - 1, dots, activeDot: page }));
  }, [getTrack, total]);

  useEffect(() => {
    const track = getTrack();
    if (!track) return undefined;
    update();
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { track.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update, ...deps]);

  const scrollBy = (dir) => { const t = getTrack(); if (t) t.scrollBy({ left: dir * t.clientWidth, behavior: 'smooth' }); };
  const goTo = (i) => { const t = getTrack(); if (t) t.scrollTo({ left: i * t.clientWidth, behavior: 'smooth' }); };
  return { nav, scrollBy, goTo, hidden: total <= 4 };
}

function renderTitle(title, id, alt) {
  if (!title) return null;
  if (!alt) return <h2 className={`pbfcm-carousel-title-${id}`} id={`carousel-title-${id}`}>{title}</h2>;
  return (
    <h2 className={`pbfcm-carousel-title-${id} pbfcm-carousel__title`} id={`carousel-title-${id}`}>
      {title.split('**').map((seg, i) => (seg ? (i % 2 === 1 ? <span key={i} className="pbfcm-carousel__title-emphasis">{seg}</span> : seg) : null))}
    </h2>
  );
}

export default function PbfcmProductCarousel({
  id = 'pbfcm_product_carousel',
  anchorId = '',
  alternativeView = false,
  useShortName = true,
  title = '',
  titleSize = 30,
  titleColor = '#2c3d50',
  titleSpacing = 16,
  enableTabFilter = false,
  tabs = [],
  blocks = [],
  imageSource = 'saleImage',
  discountPercentage = DEFAULT_DISCOUNT,
  containerWidth = 1400,
  wullView = false,
  desktopSidePadding = 64,
  mobileSidePadding = 16,
  imageRatio = 'portrait',
  cardBgColor = '#ffffff',
  borderColor = '#d7effa',
  borderRadius = 12,
  buttonColor = '#078942',
  atcBgColor = '#ffffff',
  atcBorderColor = '#e5e5e5',
  atcHoverBgColor = '#fafafa',
  atcTextColor = '#2c3d50',
  backgroundColor = 'rgba(0,0,0,0)',
  paddingTop = 20,
  paddingBottom = 20,
  paddingBottomMobile = 12,
  enableShopAllBanner = false,
  shopAllText = 'Choose from over 18 products for the entire family',
  mobileBoxText = '',
  shopAllButtonText = 'See All Products',
  shopAllButtonLink = '/pages/sale',
  shopAllBgColor = '#e4f5ff',
  shopAllImage = '',
}) {
  const alt = alternativeView;
  const useTabs = enableTabFilter && tabs.length > 0;
  const extended = alt && useTabs; // pbfcm-carousel-extended panels
  const classicFilter = !alt && useTabs;

  const toItem = (b, tab) => {
    const block = toBlock(b);
    const product = getProduct(block.handle);
    return product ? { ...block, product, image: imgUrl(block.customImage) || product[imageSource] } : null;
  };
  const panels = useMemo(
    () => (useTabs ? tabs.map((t) => ({ key: t.key, label: t.label, items: t.handles.map((h) => toItem(h)).filter(Boolean) })) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tabs, imageSource, useTabs]
  );
  const flatItems = useMemo(() => blocks.map((b) => toItem(b)).filter(Boolean), [blocks, imageSource]); // eslint-disable-line react-hooks/exhaustive-deps

  const tracks = useRef({});
  const fp = useFadePanels(tabs[0]?.key);
  const activeTab = fp.active;
  const activate = fp.activate;

  const items = classicFilter ? panels.find((p) => p.key === activeTab)?.items || [] : flatItems;
  const activeItems = extended ? panels.find((p) => p.key === activeTab)?.items || [] : items;
  const getTrack = useCallback(() => tracks.current[extended ? activeTab : 'main'], [extended, activeTab]);
  const { nav, scrollBy, goTo, hidden } = useCarouselNav(getTrack, activeItems.length, [activeTab, fp.transitioning]);

  useEffect(() => { const t = getTrack(); if (t) t.scrollLeft = 0; }, [activeTab, getTrack]);

  const sid = id;
  const css = BASE + (wullView ? `\n${WULL}` : '') + (!alt ? `\n${CLASSIC}` : '') + `\n${SHOP_ALL}`;
  const vars = {
    '--pcs-padding-top': px(paddingTop), '--pcs-padding-bottom': px(paddingBottom), '--pcs-padding-bottom-mobile': px(paddingBottomMobile),
    '--pcs-background-color': backgroundColor, '--pcs-container-width': px(containerWidth),
    '--pcs-desktop-side-padding': px(desktopSidePadding), '--pcs-mobile-side-padding': px(mobileSidePadding),
    '--pcs-title-spacing': px(titleSpacing), '--pcs-title-size': px(titleSize), '--pcs-title-color': titleColor,
    '--pcs-shop-all-bg-color': shopAllBgColor,
  };
  const altVars = alt && {
    '--pc-alt-title-color': titleColor, '--pc-alt-title-size': px(titleSize), '--pc-alt-card-bg': cardBgColor, '--pc-alt-border': borderColor,
    '--pc-alt-radius': px(borderRadius), '--pc-alt-sale-color': buttonColor, '--pc-alt-header-gap': px(titleSpacing),
    '--pc-alt-atc-border': atcBorderColor, '--pc-alt-atc-hover-bg': atcHoverBgColor, '--pc-alt-atc-bg': atcBgColor, '--pc-alt-atc-text': atcTextColor,
    '--pc-alt-padding-bottom-mobile': px(paddingBottomMobile),
  };

  const cardProps = { discount: discountPercentage, useShortName };
  const renderCard = (it) => {
    const common = {
      product: it.product, customImage: it.image, showBadge: !!it.showBadge, badgeText: it.badgeText || 'New!',
      showDescription: it.showDescription !== false, descriptionText: it.descriptionText, ...cardProps,
    };
    return alt
      ? <AltProductCard {...common} badgeColor={it.badgeColor} buttonColor={buttonColor} />
      : <PbfcmProductCard {...common} badgeColor={it.badgeColor || '#078942'} cardBgColor={cardBgColor} borderRadius={borderRadius} buttonColor={buttonColor} imageRatio={imageRatio} />;
  };
  const slides = (list) => list.map((it, i) => (
    <div key={it.product.handle + i} className={`pbfcm-carousel-slide-${sid} pbfcm-carousel__slide`} data-product-title={it.product.pdpTitle} aria-label={`Product ${i + 1}: ${it.product.pdpTitle}`}>
      {renderCard(it)}
    </div>
  ));

  const navEl = (
    <div className={`pbfcm-carousel-nav-${sid} pbfcm-carousel__nav${hidden ? ' nav-hidden' : ''}`} aria-label="Carousel navigation">
      <button className={`pbfcm-carousel-arrow-${sid} pbfcm-carousel__arrow pbfcm-carousel-prev-${sid}${nav.prevDisabled ? ' disabled' : ''}`} aria-label="View previous products" onClick={() => scrollBy(-1)}>{ARROW_PREV}</button>
      <div className={`pbfcm-carousel-dots-${sid} pbfcm-carousel__dots`} id={`carousel-dots-${sid}`} aria-label="Carousel page indicators">
        {Array.from({ length: nav.dots }, (_, i) => (
          <div key={i} className={`pbfcm-carousel-dot-${sid} pbfcm-carousel__dot${i === nav.activeDot ? ' active' : ''}`} onClick={() => goTo(i)} />
        ))}
      </div>
      <button className={`pbfcm-carousel-arrow-${sid} pbfcm-carousel__arrow pbfcm-carousel-next-${sid}${nav.nextDisabled ? ' disabled' : ''}`} aria-label="View next products" onClick={() => scrollBy(1)}>{ARROW_NEXT}</button>
    </div>
  );

  const tabButtons = (extra = '') => panels.map((p) => {
    const active = p.key === activeTab;
    return (
      <button key={p.key} type="button" role="tab"
        className={`pbfcm-carousel-tab-${sid} pbfcm-carousel__tab fd-tabs-v3__item${active ? ' fd-tabs-v3__item--active' : ''}${extra}`}
        data-tab={p.key} aria-selected={active} aria-label={`Filter products by ${p.label}`} onClick={() => activate(p.key)}>{p.label}</button>
    );
  });

  const mobileBox = alt && mobileBoxText && (
    <div className="pbfcm-carousel__mobile-box">
      <Link to={shopAllButtonLink} className="pbfcm-carousel__mobile-box-link" aria-label={`${shopAllButtonText} — ${mobileBoxText.replace(/\*\*/g, '')}`}>
        <p className="pbfcm-carousel__mobile-box-text">
          {mobileBoxText.split('**').map((seg, i) => (seg ? (i % 2 === 1 ? <span key={i} className="pbfcm-carousel__mobile-box-emphasis">{seg}</span> : seg) : null))}
        </p>
        <span className="pbfcm-carousel__mobile-box-button">{shopAllButtonText}</span>
      </Link>
    </div>
  );

  const [before, after] = shopAllText.split('18 products');
  const banner = enableShopAllBanner && (
    <div className={`pbfcm-shop-all-banner-wrapper-${sid}${alt ? ' pbfcm-carousel__shop-all-desktop' : ''}`}>
      <Link to={shopAllButtonLink} className={`pbfcm-shop-all-banner-${sid}`} style={{ textDecoration: 'none' }} aria-label={`Shop all products - ${shopAllText}`}>
        {shopAllImage && <div className={`pbfcm-shop-all-image-${sid}`} aria-hidden="true"><img src={shopAllImage} alt="Shop all products" loading="lazy" /></div>}
        {shopAllText && <p className={`pbfcm-shop-all-text-${sid}`}>{after !== undefined ? <>{before}<strong>18 products</strong>{after}</> : shopAllText}</p>}
        <span className={`pbfcm-shop-all-button-${sid}`} aria-hidden="true">{shopAllButtonText}{SHOP_ALL_ARROW}</span>
      </Link>
    </div>
  );

  return (
    <div id={`shopify-section-${sid}`} className="shopify-section" style={vars}>
      <style>{css.replaceAll('__ID__', sid)}</style>
      <div
        className={`pbfcm-carousel-section-${sid}${alt ? ' pbfcm-carousel--alt' : ''}`}
        id={anchorId || sid}
        style={altVars || undefined}
        aria-label={title ? title.replace(/\*\*/g, '') : 'Product carousel'}
      >
        <div className={`pbfcm-carousel-container-${sid}`}>
          {alt ? (
            <div className={`pbfcm-carousel-header-${sid} pbfcm-carousel__header`}>
              {renderTitle(title, sid, true)}
              {useTabs && !extended && (
                <div className={`pbfcm-carousel-tabs-${sid} pbfcm-carousel__tabs fd-tabs-v3 fd-tabs-v3--medium`} role="tablist" aria-label="Product category filters">{tabButtons()}</div>
              )}
            </div>
          ) : (
            <div className={`pbfcm-carousel-header-${sid}`}>
              <div className={`pbfcm-carousel-left-${sid}`}>
                {renderTitle(title, sid, false)}
                {useTabs && (
                  <>
                    <div className={`pbfcm-carousel-divider-${sid}`} />
                    <div className={`pbfcm-carousel-tabs-${sid}`} aria-label="Product category filters">
                      {panels.map((p) => (
                        <button key={p.key} className={`pbfcm-carousel-tab-${sid}${p.key === activeTab ? ' active' : ''}`} data-tab={p.key} aria-label={`Filter products by ${p.label}`} onClick={() => activate(p.key)}>{p.label}</button>
                      ))}
                    </div>
                  </>
                )}
              </div>
              {useTabs && (
                <div className={`pbfcm-carousel-select-wrapper-${sid}`}>
                  <select className={`pbfcm-carousel-select-${sid}`} value={activeTab} onChange={(e) => activate(e.target.value)} aria-label="Filter products by category">
                    {panels.map((p) => <option key={p.key} value={p.key}>{p.label}</option>)}
                  </select>
                  <div className={`pbfcm-carousel-select-icon-${sid}`}>{SELECT_ICON}</div>
                </div>
              )}
              {navEl}
            </div>
          )}

          {extended ? (
            createElement(
              'pbfcm-carousel-extended',
              { class: `pbfcm-carousel-extended-${sid}` },
              <div className={`pbfcm-carousel-tabs-${sid} pbfcm-carousel__tabs fd-tabs-v3 fd-tabs-v3--medium`} role="tablist" aria-label="Product category filters">{tabButtons()}</div>,
              <div {...fp.viewportProps('pbfcm-carousel__panels-viewport')}>
                {panels.map((p) => (
                  <div key={p.key} {...fp.panelProps(p.key, 'pbfcm-carousel__panel')}>
                    <div className={`pbfcm-carousel-track-${sid} pbfcm-carousel__track`} ref={(el) => { tracks.current[p.key] = el; }} id={`carousel-track-${sid}-${p.key}`} aria-label={`Scrollable product list — ${p.label}`}>
                      <div className={`pbfcm-carousel-slides-${sid} pbfcm-carousel__slides`}>{slides(p.items)}</div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className={`pbfcm-carousel-track-${sid} pbfcm-carousel__track`} ref={(el) => { tracks.current.main = el; }} id={`carousel-track-${sid}`} aria-label="Scrollable product list">
              <div className={`pbfcm-carousel-slides-${sid} pbfcm-carousel__slides`} aria-label={`Product cards - ${items.length} total`}>{slides(items)}</div>
            </div>
          )}

          {alt && navEl}
          {mobileBox}
          {banner}
        </div>
      </div>
      <IngredientsPopup />
    </div>
  );
}
