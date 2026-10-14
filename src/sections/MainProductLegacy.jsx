import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SiteLink from '../layout/SiteLink.jsx';
import { useCart } from '../layout/CartContext.jsx';
import AccordionTab from '../components/AccordionTab.jsx';
import { openIngredients } from '../components/IngredientsPopup.jsx';
import { JudgeMePreviewBadge } from './JudgeMeReviewWidget.jsx';
import { ACCORDION_ICONS } from './mainProductLegacyIcons.js';
import quantWidgetHtml from '../data/frontrowQuant4202.html?raw';
import {
  PDP_PRODUCT, DEMOGRAPHIC_TABS, BENEFIT_INTRO_HTML, BENEFIT_ACCORDION_STYLE, BUY_BOX, TRUST_BADGES, MAIN_ACCORDIONS, money, priceSummary,
} from '../data/pdpLegacy.js';
import '../styles/theme/fd-button.css';
import '../styles/theme/fd-tabs-v3.css';
import '../styles/theme/fd-price.css';
import '../styles/theme/fd-badge.css';
import '../styles/theme/fd-icon.css';
import '../styles/theme/fd-form-elements.css';
import '../styles/theme/PBFCM-PDP-styles.css';
import '../styles/theme/fd-pdp-sticky-atc.css';
import './mainProductLegacy.css';

// sections/main-product.liquid for templates/product.unified-default.json (legacy PDP).
// Blocks rendered (in order): pdp_vanity, Judge.me preview badge, see_ingredients, pdp_demographic_tabs, FrontRow badge (custom_liquid),
// benefit_accordion_stats, product_purchase_content (+ 2 buy_box_frequency_option), savings_display, usp row (custom_liquid),
// 3 collapsible_tab, product_crosslinks, plus the gallery (PBFCM-PDP-product-gallery) and the sticky ATC (fd-pdp-sticky-atc, mobile A/B).
// Disabled blocks (title, custom_liquid x3, spacing x2, description, judge.me reviews snippet) are not rendered; the Judge.me
// "all reviews text" block is hidden by the template's custom_css.

/* ------------------------------------------------------------------ gallery (snippets/PBFCM-PDP-product-gallery.liquid) */
const ArrowIcon = ({ dir }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d={dir === 'prev' ? 'M15 18L9 12L15 6' : 'M9 18L15 12L9 6'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Gallery({ media }) {
  const [active, setActive] = useState(0);
  const [distributed, setDistributed] = useState(false);
  const rowRef = useRef(null);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const drag = useRef(null);
  const last = media.length - 1;

  const go = (i) => setActive(Math.min(Math.max(i, 0), last));

  // updateTrackAlignment(): thumbnails centered when they all fit, otherwise scrollable between the arrows
  useLayoutEffect(() => {
    const measure = () => {
      const row = rowRef.current; const track = trackRef.current;
      if (!row || !track) return;
      const arrows = [...row.querySelectorAll('.PBFCM-PDP-product-gallery__arrow')].reduce((n, a) => n + a.offsetWidth, 0);
      setDistributed(track.scrollWidth <= row.clientWidth - arrows + 1);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [media.length]);

  // scrollToThumbnail()
  useEffect(() => {
    const c = containerRef.current; const t = trackRef.current?.children[active];
    if (!c || !t) return;
    if (t.offsetLeft < c.scrollLeft) c.scrollLeft = t.offsetLeft;
    else if (t.offsetLeft + t.offsetWidth > c.scrollLeft + c.clientWidth) c.scrollLeft = t.offsetLeft + t.offsetWidth - c.clientWidth;
  }, [active]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(active - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(active + 1); }
  };
  const onPointerDown = (e) => { drag.current = { x: e.clientX, y: e.clientY }; };
  const onPointerUp = (e) => {
    const d = drag.current; drag.current = null;
    if (!d) return;
    const dx = e.clientX - d.x; const dy = e.clientY - d.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(active + (dx < 0 ? 1 : -1));
  };

  return (
    <div className="PBFCM-PDP-product-gallery PBFCM-PDP-product-gallery--slider" data-component="product-gallery" onKeyDown={onKeyDown}>
      <div className="PBFCM-PDP-product-gallery__main swiper is-navigable swiper-initialized swiper-horizontal swiper-pointer-events is-slider-ready" id="PBFCM-main-swiper" role="region" aria-label="Product image gallery" tabIndex={0}
        onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={() => { drag.current = null; }}>
        <div className="swiper-wrapper" aria-live="polite" style={{ cursor: 'grab', transform: `translate3d(calc(${-active} * (100% + 16px)), 0px, 0px)`, transitionDuration: '320ms' }}>
          {media.map((m, i) => (
            <div key={m.src} className={`swiper-slide PBFCM-PDP-product-gallery__main-slide${i === active ? ' swiper-slide-active' : ''}`} style={{ marginRight: 16 }} role="group" aria-label={`${i + 1} / ${media.length}`}>
              <img src={m.src} alt={m.alt} className="PBFCM-PDP-product-gallery__main-image" id={i === 0 ? 'PBFCM-main-image' : undefined} width={m.width} height={m.height} draggable="false" loading={i < 2 ? 'eager' : 'lazy'} />
            </div>
          ))}
        </div>
      </div>
      <div className="PBFCM-PDP-product-gallery__thumbnails" ref={rowRef}>
        <button type="button" className={`PBFCM-PDP-product-gallery__arrow PBFCM-PDP-product-gallery__arrow--prev${active === 0 ? ' is-disabled' : ''}`} id="PBFCM-thumb-prev" aria-label="Previous image" disabled={active === 0} aria-disabled={active === 0} onClick={() => go(active - 1)}><ArrowIcon dir="prev" /></button>
        <div className={`PBFCM-PDP-product-gallery__thumbnail-container${distributed ? '' : ' is-scrollable'}`} ref={containerRef}>
          <div className="PBFCM-PDP-product-gallery__thumbnail-track" id="PBFCM-thumb-track" ref={trackRef}>
            {media.map((m, i) => (
              <button key={m.src} type="button" className={`PBFCM-PDP-product-gallery__thumbnail${i === active ? ' PBFCM-PDP-product-gallery__thumbnail--active' : ' '}`} data-image-index={i} aria-label={`View image ${i + 1}`} onClick={() => go(i)}>
                <img src={m.src} alt={m.alt} className="PBFCM-PDP-product-gallery__thumbnail-image" width="88" height="88" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
        <button type="button" className={`PBFCM-PDP-product-gallery__arrow PBFCM-PDP-product-gallery__arrow--next${active === last ? ' is-disabled' : ''}`} id="PBFCM-thumb-next" aria-label="Next image" disabled={active === last} aria-disabled={active === last} onClick={() => go(active + 1)}><ArrowIcon dir="next" /></button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ FrontRowMD "Clinicians' Choice" (iframe in production; same document here) */
function FrontrowQuantWidget() {
  const [height, setHeight] = useState(92);
  const measure = (e) => {
    const body = e.target.contentDocument?.body;
    if (body) setHeight(Math.min(Math.max(body.scrollHeight, 0), 200));
  };
  return (
    <iframe className="iframe-frontrow" id="iframe-frontrow-quant" frameBorder="0" scrolling="no" srcDoc={quantWidgetHtml} title="Clinicians' Choice on FrontrowMD"
      style={{ height, display: 'block' }} onLoad={(e) => { measure(e); const t = e.target; setTimeout(() => measure({ target: t }), 800); }} />
  );
}

/* ------------------------------------------------------------------ buy box */
function FrequencyOption({ opt, selected, onSelect }) {
  const isOtp = opt.kind === 'otp';
  return (
    <div className={`PBFCM-PDP-frequency-selector__option PBFCM-PDP-frequency-selector__option--${selected ? 'selected' : 'collapsed'}`} id={`PBFCM-frequency-${opt.id}`}
      data-frequency={isOtp ? 'onetime' : 'monthly'} data-frequency-id={opt.id} data-option-kind={opt.kind} data-selling-plan={opt.sellingPlanId || ''} onClick={onSelect}>
      <div className="PBFCM-PDP-frequency-selector__top">
        <div className="PBFCM-PDP-frequency-selector__left">
          <div className="PBFCM-PDP-frequency-selector__radio-container">
            <input type="radio" name="PBFCM-frequency" id={`PBFCM-radio-${opt.id}`} value={opt.id} className="PBFCM-PDP-frequency-selector__radio" checked={selected} onChange={onSelect} />
          </div>
          <div className="PBFCM-PDP-frequency-selector__label-row">
            <label htmlFor={`PBFCM-radio-${opt.id}`} className="PBFCM-PDP-frequency-selector__label"> {opt.label} </label>
          </div>
        </div>
        <div className="PBFCM-PDP-frequency-selector__price-box">
          <div className="PBFCM-PDP-frequency-selector__price-row">
            <div className="PBFCM-PDP-frequency-selector__price-compare"> ${opt.compare} </div>
            <span className="PBFCM-PDP-frequency-selector__price-final" style={isOtp ? { color: '#2c3d50' } : undefined}> {money(opt.price)}</span>
          </div>
        </div>
      </div>
      {isOtp && <span className="PBFCM-PDP-frequency-selector__price-note PBFCM-PDP-frequency-selector__price-note--below-per-day">with code <span data-fd-offer-code="" data-fd-offer-code-kind="otp">{opt.code}</span></span>}
      <div className={`PBFCM-PDP-frequency-selector__expandable${selected ? '' : ' PBFCM-PDP-frequency-selector__expandable--hidden'}${isOtp ? ' PBFCM-PDP-frequency-selector__expandable--otp' : ''}`}>
        <div className={`PBFCM-PDP-frequency-selector__benefits PBFCM-PDP-frequency-selector__benefits--richtext${isOtp ? ' PBFCM-PDP-frequency-selector__benefits--richtext-otp' : ''}`}>
          <ul>{opt.benefits.map((b) => <li key={b}>{b}</li>)}</ul>
        </div>
        {opt.badge && <div className="PBFCM-PDP-frequency-selector__badge PBFCM-PDP-frequency-selector__badge--negative" style={{ backgroundColor: '#2c3e50' }}><p className="PBFCM-PDP-frequency-selector__badge-text">{opt.badge}</p></div>}
      </div>
    </div>
  );
}

function FrequencySelector({ kind, setKind }) {
  return (
    <div className="PBFCM-PDP-frequency-selector PBFCM-PDP-frequency-selector--configurable" data-component="PBFCM-PDP-frequency-selector" data-configurable="true">
      <div className="PBFCM-PDP-quantity-selector__header PBFCM-PDP-frequency-selector__header">
        <div className="PBFCM-PDP-quantity-selector__title-row"><h2 className="PBFCM-PDP-frequency-selector__title">{BUY_BOX.frequencyTitle}</h2></div>
      </div>
      <div className="PBFCM-PDP-frequency-selector__container" role="radiogroup" aria-label="Select delivery frequency">
        {BUY_BOX.options.map((o) => <FrequencyOption key={o.id} opt={o} selected={o.kind === kind} onSelect={() => setKind(o.kind)} />)}
      </div>
    </div>
  );
}

function QuantitySelector({ kind, qty, setQty }) {
  const opt = BUY_BOX.options.find((o) => o.kind === kind);
  const sum = priceSummary(kind, qty);
  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); setQty(Math.min(qty + 1, BUY_BOX.maxQuantity)); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); setQty(Math.max(qty - 1, 1)); }
  };
  return (
    <div className="PBFCM-PDP-quantity-selector" data-component="PBFCM-PDP-quantity-selector">
      <div className="PBFCM-PDP-quantity-selector__header">
        <h2 className="PBFCM-PDP-quantity-selector__title">{BUY_BOX.quantityTitle}</h2>
        <div className="PBFCM-PDP-quantity-selector__servings-badge"><p className="PBFCM-PDP-quantity-selector__servings-text">{PDP_PRODUCT.servingsPerBottle}</p></div>
      </div>
      <div className="PBFCM-PDP-quantity-selector__grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }} role="radiogroup" aria-label="Select quantity">
        {Array.from({ length: BUY_BOX.maxQuantity }, (_, i) => i + 1).map((q) => {
          const selected = q === qty;
          return (
            <div key={q} className={`PBFCM-PDP-quantity-selector__item ${selected ? 'PBFCM-PDP-quantity-selector__item--selected' : ''}`} id={`PBFCM-quantity-${q}`} data-quantity={q}
              onClick={() => setQty(q)} onKeyDown={onKeyDown} role="radio" aria-checked={selected} aria-label={`${q} ${q === 1 ? 'Bottle' : 'Bottles'}`} tabIndex={selected ? 0 : -1}>
              <div className="PBFCM-PDP-quantity-selector__item-content">
                <p className="PBFCM-PDP-quantity-selector__item-label">{q}{' '}{q === 1 ? 'Bottle' : 'Bottles'}</p>
                <div className={`PBFCM-PDP-quantity-selector__savings-badge ${selected ? 'PBFCM-PDP-quantity-selector__savings-badge--selected' : ''}`} style={selected ? { backgroundColor: 'var(--PBFCM-color-savings-badge)' } : undefined}>
                  <p className="PBFCM-PDP-quantity-selector__savings-text">Save {sum.tileSave(q)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <input type="hidden" id="PBFCM-selected-quantity" value={qty} aria-hidden="true" readOnly />
    </div>
  );
}

const CartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="PBFCM-PDP-cart-summary__button-icon" aria-hidden="true">
    <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ------------------------------------------------------------------ sticky ATC (snippets/fd-pdp-sticky-atc.liquid + assets/fd-pdp-sticky-atc.js; mobile A/B, off unless ?fd_sticky_atc=v1|v2) */
function StickyAtc({ variant, selection, now, was, save, added, onAdd, getTargets }) {
  const [hidden, setHidden] = useState(true);
  const barRef = useRef(null);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 749px)');
    const inView = new Set();
    const update = () => setHidden(!mq.matches || inView.size > 0);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => (en.isIntersecting ? inView.add(en.target) : inView.delete(en.target)));
      update();
    }, { threshold: 0 });
    getTargets().forEach((el) => io.observe(el));
    mq.addEventListener('change', update);
    document.documentElement.classList.add('fd-sticky-atc-on');
    return () => { io.disconnect(); mq.removeEventListener('change', update); document.documentElement.classList.remove('fd-sticky-atc-on'); document.documentElement.style.removeProperty('--fd-sticky-atc-height'); };
  }, []);
  useEffect(() => {
    const el = barRef.current; if (!el) return undefined;
    const set = () => document.documentElement.style.setProperty('--fd-sticky-atc-height', `${el.offsetHeight}px`);
    set();
    const ro = new ResizeObserver(set); ro.observe(el);
    return () => ro.disconnect();
  }, [variant]);
  const toBox = (focus) => {
    const heading = document.querySelector('#product-purchase-content .PBFCM-PDP-frequency-selector__title');
    const hb = document.querySelector('.header-wrapper-container')?.getBoundingClientRect().bottom || 0;
    if (heading) window.scrollTo({ top: Math.max(0, heading.getBoundingClientRect().top + window.scrollY - Math.max(0, hb) - 12), behavior: 'smooth' });
  };
  return (
    <fd-pdp-sticky-atc ref={barRef} class="fd-sticky-atc" data-product-handle={PDP_PRODUCT.handle} data-active="" data-state={hidden ? 'hidden' : 'visible'} data-variant={variant} inert={hidden ? '' : undefined}>
      {variant === 'v1' ? (
        <div className="fd-sticky-atc__bar fd-sticky-atc__bar--v1" data-fd-sticky-bar="v1" role="region" aria-label="Your selection">
          <button type="button" className="fd-sticky-atc__edit" onClick={() => toBox('quantity')}>
            <span className="fd-sticky-atc__selection"><span>{selection}</span> · <span className="fd-sticky-atc__edit-label">Edit</span></span>
            <span className="fd-sticky-atc__prices">
              <span className="fd-sticky-atc__now">{now}</span>
              {was && <s className="fd-sticky-atc__was"><span className="visually-hidden">was </span><span>{was}</span></s>}
            </span>
            {save && <span className="fd-sticky-atc__save">{save}</span>}
          </button>
          <button type="button" className="fd-sticky-atc__btn fd-sticky-atc__btn--add" data-added={added ? '' : undefined} onClick={onAdd}>
            <svg className="fd-sticky-atc__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={added ? 2.4 : 2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
              {added ? <path d="M5 12.5l4.5 4.5L19 7.5" /> : <><path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h9.2a1 1 0 0 0 1-.8L20 8H6.2" /><circle cx="9" cy="20" r="1.3" /><circle cx="17" cy="20" r="1.3" /></>}
            </svg>
            <span>{added ? 'Added' : 'Add To Cart'}</span>
          </button>
        </div>
      ) : (
        <div className="fd-sticky-atc__bar fd-sticky-atc__bar--v2" data-fd-sticky-bar="v2">
          <button type="button" className="fd-sticky-atc__btn fd-sticky-atc__btn--cta" onClick={() => toBox('frequency')}> Choose Your Package </button>
        </div>
      )}
    </fd-pdp-sticky-atc>
  );
}

/* ------------------------------------------------------------------ main product */
export default function MainProductLegacy() {
  const cart = useCart();
  const [params] = useSearchParams();
  const stickyVariant = ['v1', 'v2'].includes((params.get('fd_sticky_atc') || '').toLowerCase()) ? params.get('fd_sticky_atc').toLowerCase() : '';
  const [kind, setKind] = useState('subscription');
  const [qty, setQty] = useState(BUY_BOX.defaultQuantity);
  const [added, setAdded] = useState(false);
  const addedTimer = useRef(null);
  const sum = useMemo(() => priceSummary(kind, qty), [kind, qty]);
  const opt = BUY_BOX.options.find((o) => o.kind === kind);

  const addToCart = () => {
    const item = { handle: PDP_PRODUCT.handle, title: PDP_PRODUCT.title, image: PDP_PRODUCT.media[1].src, price: 3900 };
    for (let i = 0; i < qty; i += 1) cart?.addLine?.(item, kind === 'subscription');
    cart?.openCart?.();
    setAdded(true);
    clearTimeout(addedTimer.current);
    addedTimer.current = setTimeout(() => setAdded(false), 2500);
  };
  useEffect(() => () => clearTimeout(addedTimer.current), []);

  const vanityParts = PDP_PRODUCT.vanityTitle.split('[').map((p) => (p.includes(']') ? p.split(']') : [null, p]));

  return (
    <section id="shopify-section-main" className="shopify-section section">
      <section className="section--padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="page-width product grid grid--1-col grid--2-col-tablet">
          <div className="grid__item product__media-wrapper"><Gallery media={PDP_PRODUCT.media} /></div>
          <div className="product__info-wrapper grid__item">
            <div id="ProductInfo-main" className="product__info-container product__info-container--sticky">
              {/* pdp_vanity */}
              <div className="pdp-vanity">
                <h1>
                  <span className="vanity-demo-2"> {PDP_PRODUCT.title} </span>
                  <span className="vanity-title">
                    {vanityParts.map(([hl, rest], i) => (hl != null ? <span key={i}><span className="vanity-title-highlight">{hl}</span>{rest}</span> : <span key={i}>{rest}</span>))}
                  </span>
                </h1>
              </div>
              {/* judge.me preview badge */}
              <JudgeMePreviewBadge rating={PDP_PRODUCT.rating} count={PDP_PRODUCT.reviewCount} />
              {/* see_ingredients */}
              <div className="product__see-ingredients">
                <div className="fd-ingredients-host" style={{ display: 'contents' }}>
                  <a href="#see-ingredients" className="fd-see-ingredients fd-see-ingredients--pdp" role="button" aria-haspopup="dialog" aria-controls="fd-ingredients-popup"
                    onClick={(e) => { e.preventDefault(); openIngredients({ title: PDP_PRODUCT.ingredients.title, image: PDP_PRODUCT.ingredients.image, html: PDP_PRODUCT.ingredients.html }); }}> See Ingredients </a>
                </div>
              </div>
              {/* pdp_demographic_tabs */}
              <div className="pdp-demo-tabs">
                <div className="pdp-demo-tabs__list fd-tabs-v3 fd-tabs-v3--medium" role="tablist" aria-label="Shop by family member">
                  <span className="pdp-demo-tabs__item fd-tabs-v3__item fd-tabs-v3__item--active is-active" role="tab" aria-selected="true" aria-current="page"><span className="pdp-demo-tabs__title">{DEMOGRAPHIC_TABS.current.label}</span></span>
                  {DEMOGRAPHIC_TABS.others.map((t) => (
                    <SiteLink key={t.url} href={t.url} className="pdp-demo-tabs__item fd-tabs-v3__item" role="tab" aria-selected="false"><span className="pdp-demo-tabs__title">{t.label}</span></SiteLink>
                  ))}
                </div>
                <div className="pdp-demo-tabs__banner"><span className="pdp-demo-tabs__banner-age" dangerouslySetInnerHTML={{ __html: DEMOGRAPHIC_TABS.current.ageLine }} /></div>
              </div>
              {/* custom_liquid: fd-frontrow-badge */}
              <div className="product__custom-liquid">
                <div className="fd-frontrow-badge" id="frontrow-badge"><FrontrowQuantWidget /></div>
              </div>
              {/* benefit_accordion_stats */}
              <div className="pdp-benefit-accordion-stats" style={BENEFIT_ACCORDION_STYLE}>
                <div className="pdp-benefit-accordion-stats__intro rte" dangerouslySetInnerHTML={{ __html: BENEFIT_INTRO_HTML }} />
                <div className="pdp-benefit-accordion-stats__items" />
              </div>
              {/* product_purchase_content */}
              <div id="product-purchase-content" className="product-purchase-content">
                <FrequencySelector kind={kind} setKind={setKind} />
                <QuantitySelector kind={kind} qty={qty} setQty={setQty} />
                <div className="PBFCM-PDP-cart-summary" data-component="PBFCM-PDP-cart-summary" role="region" aria-label="Cart summary and checkout">
                  <div className="PBFCM-PDP-cart-summary__breakdown PBFCM-PDP-cart-summary__breakdown--hide-rows PBFCM-PDP-cart-summary__breakdown--relocated" aria-label="Price breakdown" />
                </div>
              </div>
              {/* savings_display (move_cart_summary + gift_line_only): CTA mount, Subtotal row, rows mount */}
              <div className="fd-savings-display-attach fd-savings-display-attach--cta" id="savings-display-cta-main" style={{ paddingLeft: 0, paddingRight: 0 }}>
                <button type="button" className="PBFCM-PDP-cart-summary__button fd-btn fd-btn--large fd-btn--primary fd-btn-shape--pill" id="PBFCM-add-to-cart-btn" onClick={addToCart}
                  aria-label={sum.giftUnlocked ? BUY_BOX.giftButtonText : BUY_BOX.buttonText}>
                  <CartIcon />
                  <strong className="PBFCM-PDP-cart-summary__button-text">{sum.giftUnlocked ? BUY_BOX.giftButtonText : BUY_BOX.buttonText}</strong>
                </button>
                <div id="PBFCM-otp-after-atc-mount" className="PBFCM-PDP-otp-after-atc-mount" />
              </div>
              <div className="fd-savings-display js-savings-display-main" id="savings-display-main" style={{ '--fd-savings-success': '#078942', '--fd-savings-scale': '1.0', paddingLeft: 10, paddingRight: 10 }} role="region" aria-label="Order savings summary">
                <div className="fd-savings-display__row">
                  <span className="fd-savings-display__label">{BUY_BOX.subtotalLabel}</span>
                  <span className="fd-savings-display__prices">
                    {sum.saving > 0 && <span className="fd-savings-display__savings" role="status">{BUY_BOX.savingsTemplate.replace('{amount}', money(sum.saving))}</span>}
                    {sum.saving > 0 && <span className="fd-savings-display__compare"><span className="sr-only">Original price </span><span aria-hidden="true">{money(sum.compare)}</span></span>}
                    <span className="fd-savings-display__final"><span className="sr-only">Sale price </span><span aria-hidden="true">{money(sum.final)}</span></span>
                  </span>
                </div>
              </div>
              <div className="fd-savings-display-attach fd-savings-display-attach--rows" id="savings-display-rows-main" style={{ '--fd-attach-gap': '16px', paddingLeft: 0, paddingRight: 0 }}>
                <div className="PBFCM-PDP-cart-summary_container_breakdown PBFCM-PDP-cart-summary_container_breakdown--gift-only">
                  <div id="PBFCM-breakdown-gift-line" aria-label="Free gift" aria-live="polite" data-active={sum.giftUnlocked ? 'true' : 'false'} style={sum.giftUnlocked ? undefined : { display: 'none' }}>
                    {sum.giftUnlocked && (
                      <div className="PBFCM-PDP-cart-summary__line PBFCM-PDP-cart-summary__line--gift">
                        <span className="PBFCM-PDP-cart-summary__line-label">{BUY_BOX.gift.title}</span>
                        <div className="PBFCM-PDP-cart-summary__line-price">
                          <span className="PBFCM-PDP-cart-summary__line-compare"><span className="sr-only">Original price {money(BUY_BOX.gift.compare)}, strikethrough</span><span aria-hidden="true">{money(BUY_BOX.gift.compare)}</span></span>
                          <span className="PBFCM-PDP-cart-summary__line-final" style={{ color: '#078942' }}><span className="sr-only">Now FREE</span><span aria-hidden="true">FREE</span></span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div id="PBFCM-otp-below-summary-mount" className="PBFCM-PDP-otp-below-summary-mount" />
              </div>
              {/* custom_liquid: usp row */}
              <div className="product__custom-liquid">
                <div className="usprow">{TRUST_BADGES.map((b) => <div className="usp" key={b.alt}><img src={b.src.replace('https://cdn.shopify.com/s/files/1/0028/0533/4131/files/', '/assets/shop/')} alt={b.alt} /></div>)}</div>
              </div>
              {/* collapsible_tab x3 */}
              {MAIN_ACCORDIONS.map((a) => (
                <AccordionTab key={a.heading} className="product__accordion accordion"
                  summary={<>
                    <span className="summary__title">
                      <svg className="icon icon-accordion" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" dangerouslySetInnerHTML={{ __html: ACCORDION_ICONS[a.icon] }} />
                      <span className="accordion__title"> {a.heading} </span>
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" className="icon icon-caret" fill="none" viewBox="0 0 24 15"><path fillRule="evenodd" clipRule="evenodd" d="M12 15c-.3 0-.6-.1-.8-.4l-11-13C-.2 1.2-.1.5.3.2c.4-.4 1.1-.3 1.4.1L12 12.5 22.2.4c.4-.4 1-.5 1.4-.1.4.4.5 1 .1 1.4l-11 13c-.1.2-.4.3-.7.3z" fill="currentColor" /></svg>
                  </>}
                  contentHtml={a.html || `<img src="${a.image.src}" alt="${a.image.alt}" width="${a.image.width}" height="${a.image.height}">`} />
              ))}
              {/* product_crosslinks */}
              <div className="crosslinks-container">
                <div className="crosslinks-header"><span className="crosslinks-header__age" dangerouslySetInnerHTML={{ __html: DEMOGRAPHIC_TABS.crosslinkAge }} /></div>
                <div className="crosslinks-cards">
                  {DEMOGRAPHIC_TABS.others.map((t) => (
                    <SiteLink key={t.url} href={t.url} className="crosslinks-card">
                      <div className="crosslinks-card__content"><span className="crosslinks-card__title">{t.label}</span><span className="crosslinks-card__subtitle">{t.sublabel}</span></div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M11.3588 14.3463L10.8203 13.7878L14.2274 10.3807H4.29468V9.61152H14.2274L10.8203 6.20443L11.3588 5.65381L15.7051 10.0001L11.3588 14.3463Z" fill="#2C3D50" /></svg>
                    </SiteLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {stickyVariant && (
        <StickyAtc variant={stickyVariant} selection={`${qty} ${qty === 1 ? 'Bottle' : 'Bottles'} · ${opt.label}`} now={money(sum.final)} was={sum.saving > 0 ? money(sum.compare) : ''} save={sum.saving > 0 ? `Save ${money(sum.saving)}` : ''}
          added={added} onAdd={addToCart} getTargets={() => ['product-purchase-content', 'PBFCM-add-to-cart-btn'].map((id) => document.getElementById(id)).filter(Boolean)} />
      )}
    </section>
  );
}
