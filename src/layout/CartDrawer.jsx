import { useEffect, useMemo, useRef, useState } from 'react';
import Img from '../components/Img.jsx';
import SiteLink from './SiteLink.jsx';
import { useCart } from './CartContext.jsx';
import { themeAsset } from '../lib/assets.js';
import { CART_CODE, GUARANTEE_TEXT, SUBSCRIBE_EXTRA_PCT, CHECKOUT_PLUS_FEE_CENTS, GIFT, upsellPool, upsellTabs } from '../data/cart.js';
import lockSvg from './svg/gwp-lock.svg?raw';
import checkSvg from './svg/gwp-check.svg?raw';
import '../styles/ui-kit.css';
import './styles/fd-tabs-v3.css';
import './styles/cart-minicart.css';
import '../styles/theme/fd-ab-cart-drawer.css';
import './styles/gift-progress.css';
import './styles/cart-drawer.css';

// Cart drawer = sections/cart-drawer.liquid (cart-drawer-group.json) + the line/upsell markup that
// fd-cart-minicart-rendering.js / fd-cart-minicart-upsells.js build at runtime (A/B "ab-cart-drawer" variant).
const money = (cents) => `$${(cents / 100).toFixed(2)}`;

const MinusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" className="icon icon-minus" fill="none" viewBox="0 0 10 2">
    <path fillRule="evenodd" clipRule="evenodd" d="M.5 1C.5.7.7.5 1 .5h8a.5.5 0 110 1H1A.5.5 0 01.5 1z" fill="currentColor" />
  </svg>
);
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" className="icon icon-plus" fill="none" viewBox="0 0 10 10">
    <path fillRule="evenodd" clipRule="evenodd" d="M1 4.51a.5.5 0 000 1h3.5l.01 3.5a.5.5 0 001-.01V5.5l3.5-.01a.5.5 0 00-.01-1H5.5L5.49.99a.5.5 0 00-1 .01v3.5l-3.5.01H1z" fill="currentColor" />
  </svg>
);
const RemoveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" className="icon icon-remove" fill="none" viewBox="0 0 16 16">
    <path d="M14 3h-3.53a3.07 3.07 0 00-.6-1.65C9.44.82 8.8.5 8 .5s-1.44.32-1.87.85A3.06 3.06 0 005.53 3H2a.5.5 0 000 1h1.25v10c0 .28.22.5.5.5h8.5a.5.5 0 00.5-.5V4H14a.5.5 0 000-1zM6.91 1.98c.23-.29.58-.48 1.09-.48s.85.19 1.09.48c.2.24.3.6.36 1.02h-2.9c.05-.42.17-.78.36-1.02zm4.84 11.52h-7.5V4h7.5v9.5z" fill="currentColor" />
    <path d="M6.55 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5zM9.45 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5z" fill="currentColor" />
  </svg>
);

/* ---------- gift progress (snippets/PBFCM-minicart-gift-progress, tiered "ab" layout, single tier) ---------- */
/* v1: the cart keeps this one. The v2 (src/components/GiftProgressV2.jsx) is used by the add-on modal of the Bundle Add-on exploration. */
export function GiftProgressV1({ total }) {
  const unlocked = total >= GIFT.threshold;
  const [expanded, setExpanded] = useState(false);
  useEffect(() => { if (unlocked) setExpanded(true); }, [unlocked]);
  const fill = Math.min(1, total / GIFT.threshold);
  return (
    <div
      className={`threshold-toggle PBFCM-minicart-gift-progress is-single-tier${unlocked ? ' is-all-unlocked' : ''}${expanded ? ' is-ab-expanded' : ''}`}
      data-component="PBFCM-minicart-gift-progress"
    >
      <div className="PBFCM-minicart-gift-progress__ab">
        <div className="PBFCM-minicart-gift-progress__ab-wrap">
          <div className="PBFCM-minicart-gift-progress__ab-header">
            <div className="PBFCM-minicart-gift-progress__ab-headline">
              <img className="PBFCM-minicart-gift-progress__ab-headline-icon" src={themeAsset('icon-gwp-discount-fill.svg')} alt="" width="24" height="24" aria-hidden="true" />
              <span className="PBFCM-minicart-gift-progress__ab-headline-text">
                {unlocked ? '🎉 Gift Unlocked' : <><strong>{money(GIFT.threshold - total)}</strong> away from a FREE ${GIFT.value} GIFT!</>}
              </span>
            </div>
            <button type="button" className="PBFCM-minicart-gift-progress__ab-toggle" aria-expanded={expanded} aria-label="Toggle gift details" onClick={() => setExpanded((e) => !e)}>
              <img src={themeAsset('icon-gwp-collapse.svg')} alt="" width="20" height="20" aria-hidden="true" />
            </button>
          </div>
          <div className="PBFCM-minicart-gift-progress__ab-details">
            <div className="PBFCM-minicart-gift-progress__ab-gifts-track">
              <button type="button" className="PBFCM-minicart-gift-progress__ab-gift-card" data-info-modal-open>
                <div className="PBFCM-minicart-gift-progress__ab-gift-media" aria-hidden="true">
                  <Img src={GIFT.image} alt="" loading="lazy" width="60" height="60" />
                </div>
                <div className="PBFCM-minicart-gift-progress__ab-gift-text">
                  <span className="title">{GIFT.title}</span>
                  <span className="light"> {GIFT.description}</span>
                </div>
                <span className="PBFCM-minicart-gift-progress__ab-gift-info" aria-hidden="true">
                  <img src={themeAsset('icon-gwp-info-fill.svg')} alt="" width="20" height="20" />
                </span>
              </button>
            </div>
          </div>
          <div className="PBFCM-minicart-gift-progress__ab-progress" role="group" aria-label="Gift progress">
            <div className="PBFCM-minicart-gift-progress__ab-bar">
              <div className="PBFCM-minicart-gift-progress__ab-fill" style={{ width: `${fill * 100}%` }} />
            </div>
            <div className="PBFCM-minicart-gift-progress__ab-tiers">
              <div className="PBFCM-minicart-gift-progress__ab-tier">
                <div
                  className={`PBFCM-minicart-gift-progress__ab-tier-dot${unlocked ? ' is-reached' : ''}`}
                  dangerouslySetInnerHTML={{ __html: unlocked ? checkSvg : lockSvg }}
                />
                <button type="button" className="PBFCM-minicart-gift-progress__ab-tier-label is-clickable" aria-label={`More info about ${GIFT.title}`}>
                  <span className="PBFCM-minicart-gift-progress__ab-tier-label-part">Free Gift</span>
                  <span className="PBFCM-minicart-gift-progress__ab-tier-label-sep" aria-hidden="true">|</span>
                  <span className="PBFCM-minicart-gift-progress__ab-tier-label-part">${GIFT.threshold / 100}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- reviews badge (Judge.me preview badge look; Judge.me itself is mocked) ---------- */
const STAR = 'M8 .8l2.2 4.6 5 .7-3.6 3.5.9 5L8 12.2 3.5 14.6l.9-5L.8 6.1l5-.7z';
function Stars({ rating, reviews }) {
  const frac = rating - Math.floor(rating);
  const full = Math.floor(rating) + (frac >= 0.75 ? 1 : 0);
  const half = frac >= 0.25 && frac < 0.75;
  return (
    <div className="jdgm-widget jdgm-preview-badge" role="img" aria-label={`Product rating: ${rating} out of 5 stars`}>
      <div className="jdgm-prev-badge" data-average-rating={rating} data-number-of-reviews={reviews}>
        <span className="jdgm-prev-badge__stars">
          {[0, 1, 2, 3, 4].map((i) => {
            const kind = i < full ? 'on' : i === full && half ? 'half' : 'off';
            return (
              <svg key={i} className={`jdgm-star jdgm--${kind}`} viewBox="0 0 16 16" aria-hidden="true">
                <defs><clipPath id={`jdgm-half-${i}`}><rect x="0" y="0" width="8" height="16" /></clipPath></defs>
                {kind === 'half' && <path d={STAR} fill="#ffb511" clipPath={`url(#jdgm-half-${i})`} />}
                <path d={STAR} fill={kind === 'on' ? '#ffb511' : 'none'} stroke="#ffb511" strokeWidth="1" strokeLinejoin="round" />
              </svg>
            );
          })}
        </span>
        <span className="jdgm-prev-badge__text">{reviews} reviews</span>
      </div>
    </div>
  );
}

/* ---------- shared pieces ---------- */
function Qty({ line, onChange, readOnly }) {
  if (readOnly) return null;
  const atMin = line.qty <= 1;
  return (
    <div className={`firstday-cart__flyout-item-quantity${atMin ? ' is-at-min' : ''}`} role="group" aria-label={`Quantity controls for ${line.title}`} data-min-qty="1">
      <button type="button" className={`quantity-btn minus${atMin ? ' is-at-min' : ''}`} aria-label={`Decrease quantity of ${line.title}`} disabled={atMin} onClick={() => onChange(-1)}>
        <span aria-hidden="true"><MinusIcon /></span>
      </button>
      <input type="number" value={line.qty} min="1" className="quantity-input" readOnly aria-label={`Quantity for ${line.title}`} />
      <button type="button" className="quantity-btn plus" aria-label={`Increase quantity of ${line.title}`} onClick={() => onChange(1)}>
        <span aria-hidden="true"><PlusIcon /></span>
      </button>
    </div>
  );
}

function Price({ compare, price, free }) {
  return (
    <div className="firstday-cart__flyout-item-price is-bfcm" role="group" aria-label="Price information">
      <div>
        {compare > price && <span className="firstday-money compare-at" name="compare-at-price">{money(compare)}</span>}{' '}
        <span className="firstday-money subscription-price" name="sale-price">{free ? 'FREE' : money(price)}</span>
      </div>
      <div aria-live="polite">with <strong>{CART_CODE}</strong> code applied</div>
    </div>
  );
}

// ab-cart-drawer renders the controls twice (details / base) and lets CSS pick one.
function LineItem({ line, onQty, onRemove, gift }) {
  const controls = (cls) => (
    <div className={`mini-cart-product-price-and-controls ${cls}`}>
      <Qty line={line} onChange={onQty} readOnly={gift} />
      <Price compare={line.compare * line.qty} price={line.price * line.qty} free={gift} />
    </div>
  );
  const info = (cls) =>
    line.delivery ? (
      <div className={`mini-cart-subscription-info ${cls}`} role="status" aria-label={`Subscription details for ${line.title}`}>
        <p className="subscription-delivery-text">{line.delivery}</p>
      </div>
    ) : null;
  return (
    <article className={`firstday-cart__flyout-item product-${line.handle} ${gift ? 'is-gwp' : 'is-subscription'}`} role="listitem">
      <div className="mini-cart-product-container">
        <div className="mini-cart-product-content">
          <div className="firstday-cart__flyout-item-media">
            {gift ? (
              <div className="firstday-cart__flyout-item-media-inner is-gift">
                <Img src={line.image} alt={`Product image: ${line.title}`} loading="lazy" />
              </div>
            ) : (
              <a href="#" onClick={(e) => e.preventDefault()}>
                <Img src={line.image} alt={`Product image: ${line.title}`} loading="lazy" />
              </a>
            )}
          </div>
          <div className="firstday-cart__flyout-item-details">
            <div className="mini-cart-product-title-row">
              {gift ? (
                <span className="firstday-cart__flyout-item-product-title is-gift">{line.title}</span>
              ) : (
                <a href="#" className="firstday-cart__flyout-item-product-title" onClick={(e) => e.preventDefault()}>{line.title}</a>
              )}
              {!gift && (
                <button type="button" className="quantity-btn icon-remove" aria-label={`Remove ${line.title} from cart`} onClick={onRemove}>
                  <span aria-hidden="true"><RemoveIcon /></span>
                </button>
              )}
            </div>
            {info('ab-cart-drawer__details-subscription-info')}
            {controls('ab-cart-drawer__details-price-and-controls')}
          </div>
        </div>
        {controls('ab-cart-drawer__base-price-and-controls')}
        {info('ab-cart-drawer__base-subscription-info')}
        <div className="mini-cart-product-footer" />
      </div>
    </article>
  );
}

// bare = empty-cart starter-pack card (no blurb / reviews); pct/extra = subscription discount and the "EXTRA x%" label
function UpsellCard({ product, onAdd, bare = false, pct = 30, extra = SUBSCRIBE_EXTRA_PCT }) {
  const [subscribed, setSubscribed] = useState(true);
  const id = `upsell-subscribe-${product.handle}`;
  const price = (
    <div className="firstday-cart__flyout-item-price is-bfcm">
      <div>
        {subscribed && <span className="firstday-money base-price compare-at igPrice">{money(product.price)}</span>}{' '}
        <span className="firstday-money subscription-price igPrice">{money(subscribed ? Math.round(product.price * (1 - pct / 100)) : product.price)}</span>
      </div>
    </div>
  );
  const qty = (cls) => (
    <div className={`mini-cart-product-price-and-controls ${cls}`}>
      <div className="firstday-cart__flyout-item-quantity" role="group" aria-label={`Quantity for ${product.title}`}>
        <button type="button" className="quantity-btn minus" aria-label="Decrease quantity"><span aria-hidden="true"><MinusIcon /></span></button>
        <input type="number" value="1" min="1" className="quantity-input" readOnly />
        <button type="button" className="quantity-btn plus" aria-label="Increase quantity"><span aria-hidden="true"><PlusIcon /></span></button>
      </div>
      {price}
    </div>
  );
  return (
    <article className={`firstday-cart__flyout-item product-${product.handle}`} data-category={product.category} aria-label={product.title}>
      <div className="mini-cart-product-container">
        <div className="mini-cart-product-content">
          <div className="firstday-cart__flyout-item-media">
            <a href={`/products/${product.handle}`} onClick={(e) => e.preventDefault()} aria-label={`View ${product.title} product page`}>
              <Img src={product.image} alt={`Product image: ${product.title}`} loading="lazy" />
            </a>
          </div>
          <div className="firstday-cart__flyout-item-details">
            <div className="mini-cart-product-title-row">
              <a href={`/products/${product.handle}`} className="firstday-cart__flyout-item-product-title" onClick={(e) => e.preventDefault()}>{product.title}</a>
            </div>
            {!bare && <div className="product-blurb">{product.blurb}</div>}
            {!bare && <Stars rating={product.rating} reviews={product.reviews} />}
            {qty('ab-cart-drawer__details-price-and-controls')}
          </div>
        </div>
        {qty('ab-cart-drawer__base-price-and-controls')}
        <div className="mini-cart-product-footer">
          <div className="upsell-subscribe-container">
            <div className="upsell-subscribe-option">
              <input type="checkbox" id={id} className="upsell-subscribe-checkbox" checked={subscribed} onChange={(e) => setSubscribed(e.target.checked)} />
              <label htmlFor={id}>Subscribe &amp; Save{extra ? ` an EXTRA ${extra}%` : ''}</label>
            </div>
          </div>
          <button
            type="button"
            className="firstday-button firstday-cart__checkout-button block new-mini-cart-checkout-button firstday_secundary_minicart_button"
            aria-label={`Add ${product.title} to cart`}
            onClick={() => onAdd(product, subscribed)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

/* ---------- Checkout+ (SavedBy third-party widget, recreated from the production screenshots) ---------- */
const CheckoutPlusMark = () => (
  <svg className="fd-cplus__mark" width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <path d="M4 12V9a5 5 0 015-5h3M20 4h3a5 5 0 015 5v3M28 20v3a5 5 0 01-5 5h-3M12 28H9a5 5 0 01-5-5v-3" stroke="#2fa6e6" strokeWidth="2.6" strokeLinecap="round" />
    <path d="M13 12v-2M19 12v-2M13 22v-2M19 22v-2" stroke="#2fa6e6" strokeWidth="2.6" strokeLinecap="round" />
  </svg>
);

function CheckoutBlock({ disabled }) {
  if (disabled) {
    // empty cart: no Checkout+ widget, the theme's own SECURE CHECKOUT button (cart-drawer.liquid)
    return (
      <button type="button" id="checkoutButton" className="firstday-button firstday-cart__checkout-button block new-mini-cart-checkout-button" disabled aria-describedby="secure-checkout" style={{ opacity: 0.6 }}>
        <span style={{ pointerEvents: 'none' }}>
          <svg className="firstday-button-icon prefix" aria-hidden="true" focusable="false" viewBox="0 0 448 512" style={{ display: 'inline-block', width: '0.875em', height: '1em', verticalAlign: '-0.125em', fill: 'currentColor', overflow: 'visible' }}>
            <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
          </svg>{' '}
          <b>SECURE CHECKOUT</b>
        </span>
      </button>
    );
  }
  return (
    <div className="sb__checkout-container">
      <div className="fd-cplus__protection">
          <CheckoutPlusMark />
          <span className="fd-cplus__protection-text"><span className="fd-cplus__protection-title">Checkout+</span> 100% Satisfaction Guarantee • {money(CHECKOUT_PLUS_FEE_CENTS)}</span>
          <button type="button" className="fd-cplus__help" aria-label="Learn more about Checkout+">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <circle cx="10" cy="10" r="8.4" stroke="currentColor" strokeWidth="1.2" />
              <path d="M7.9 7.8a2.2 2.2 0 114 .9c-.5.6-1.4.9-1.7 1.6-.1.2-.1.4-.1.7M10.1 13.2v.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      <button type="submit" id="checkoutButton" className="fd-cplus__button new-mini-cart-checkout-button" onClick={(e) => e.preventDefault()}>
        <svg className="fd-cplus__lock" viewBox="0 0 448 512" aria-hidden="true">
          <path fill="currentColor" d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
        </svg>
        <b>CHECKOUT+</b>
      </button>
      <button type="button" className="fd-cplus__skip">Continue without 100% Satisfaction Guarantee</button>
    </div>
  );
}

/* ---------- prototype-only scenario switch (not storefront UI) ---------- */
const SCENARIO_LABELS = { progress: 'Gift progress', unlocked: 'Gift unlocked', empty: 'Empty cart' };
function PrototypeToggle() {
  const { scenario, setScenario } = useCart();
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="proto-cart-toggle" data-expanded={expanded}>
      <button type="button" className="proto-cart-toggle__chip" onClick={() => setExpanded((e) => !e)} aria-expanded={expanded}>
        prototype · cart state
      </button>
      {expanded && (
        <div className="proto-cart-toggle__options" role="radiogroup" aria-label="Prototype cart state">
          {Object.entries(SCENARIO_LABELS).map(([key, label]) => (
            <button key={key} type="button" role="radio" aria-checked={scenario === key} className={scenario === key ? 'is-on' : ''} onClick={() => setScenario(key)}>{label}</button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- drawer ---------- */
export default function CartDrawer() {
  const { open, closeCart, scenario, lines, count, total, compareTotal, giftUnlocked, changeQty, removeLine, addLine } = useCart();
  const [tab, setTab] = useState('kids');
  const drawerRef = useRef(null);
  const returnFocus = useRef(null);
  const empty = lines.length === 0;

  // open/close side effects: body scroll lock, Escape, focus (fd-cart-minicart-core.js)
  useEffect(() => {
    if (!open) return undefined;
    returnFocus.current = document.activeElement;
    document.body.classList.add('hidden-overflow');
    const t = setTimeout(() => (document.getElementById('checkoutButton') || drawerRef.current?.querySelector('.js-menu__close'))?.focus(), 100);
    const onKey = (e) => e.key === 'Escape' && closeCart();
    document.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      document.body.classList.remove('hidden-overflow');
      document.removeEventListener('keydown', onKey);
      returnFocus.current?.focus?.();
    };
  }, [open, closeCart]);

  const inCart = new Set(lines.map((l) => l.handle));
  const recs = useMemo(() => upsellPool.filter((p) => p.category === tab && !inCart.has(p.handle)).slice(0, 10), [tab, lines]); // eslint-disable-line react-hooks/exhaustive-deps
  const starterPacks = useMemo(
    () => ['kids-tlc-starter-pack', 'teens-defense-starter-pack', 'womens-wellness-starter-pack', 'kids-dream-team-starter-pack'].map((h) => upsellPool.find((p) => p.handle === h)),
    []
  );
  const gift = { key: 'gift', handle: 'rapid-hydration-electrolyte-support-gift', title: `${GIFT.title} - Gift`, image: GIFT.image, qty: 1, compare: GIFT.value * 100, price: 0, delivery: '' };

  return (
    <div id="shopify-section-cart-drawer" className="shopify-section shopify-section--cart-drawer">
    <div
      className={`js-menu__context${open ? ' js-menu__expanded' : ''}`}
      role="presentation"
      aria-hidden={!open}
      {...(open ? {} : { inert: '' })}
      onClick={(e) => e.target === e.currentTarget && closeCart()}
    >
      <aside
        id="main-nav"
        ref={drawerRef}
        className={`js-menu js-menu--right ab-cart-drawer${open ? ' js-menu__expanded' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="SmartCart_title"
        tabIndex={-1}
      >
        <a href="#checkoutButton" className="skip-to-checkout visually-hidden focusable">Skip to checkout</a>
        <div className="firstday-cart__flyout">
          <div className="firstday-cart__flyout-header">
            <div className="firstday-cart__flyout-heading">
              <h2 id="SmartCart_title" className="firstday-cart__flyout-title">Your Cart ({count})</h2>
              <span className="firstday-cart__flyout-guarantee">{GUARANTEE_TEXT}</span>
            </div>
            <button type="button" className="firstday-cart__flyout-close js-menu__close" aria-label="Close shopping cart" onClick={closeCart}>
              <svg aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.99976 6L17.9998 18" stroke="#0F120A" />
                <path d="M18.0002 6L6.00022 18" stroke="#0F120A" />
              </svg>
            </button>
            <section aria-labelledby="upsell-heading" className="upsell-ui-container">
              <h3 id="upsell-heading" className="visually-hidden">Subscription Benefits</h3>
            </section>
          </div>

          <div className="firstday-cart__flyout-body">
            <div className={`firstday-cart__flyout-content${empty ? '' : ' has-items'}`}>
              <GiftProgressV1 key={scenario} total={total} />

              {empty && (
                <div className="firstday-cart__flyout-placeholder-container">
                  <div className="firstday-cart__flyout-empty-cart empty-cart-message-container">
                    <h4 className="ql-align-center">Your cart is empty!</h4>
                    <p className="ql-align-center">Start with our bestsellers below, or shop all products.</p>
                    <p className="ql-align-center"><SiteLink href="/pages/sale" onClick={closeCart}>Shop Now</SiteLink></p>
                  </div>
                </div>
              )}

              <div className="firstday-cart__flyout-empty-starter-packs" id="mini_cart_empty_starter_packs_wrap" hidden={!empty}>
                <div className="upsell-list mini_cart_empty_starter_packs" id="mini_cart_empty_starter_packs">
                  {empty && starterPacks.map((p) => <UpsellCard key={p.handle} product={p} onAdd={addLine} bare pct={40} extra={10} />)}
                </div>
              </div>

              <div className="goods-list" id="mini_cart_form" role="list">
                {lines.map((l) => (
                  <LineItem key={l.key} line={l} onQty={(d) => changeQty(l.key, d)} onRemove={() => removeLine(l.key)} />
                ))}
                {!empty && giftUnlocked && <LineItem line={gift} gift />}
              </div>

              <div className="firstday-cart__flyout-recommendations">
                  <div className="firstday-upsell-widget-container" style={{ width: '100%' }}>
                    <div id="firstday-widget-15957" className="firstday-widget widget-type-cart widget-display-embed is-visible widget-layout-list">
                      <div className="firstday-widget-container widget-display-embed is-visible">
                        <div className="firstday-widget-content">
                          <h4 className="primary-title mini-cart-upsell-message homepage firstday-cart__flyout-recommendations-title">Add-On to Create a Family Health Ritual</h4>
                          <div className="firstday-cart__flyout-recommendations__tabs fd-tabs-v3 fd-tabs-v3--small" role="tablist">
                            {upsellTabs.map((t) => (
                              <button
                                key={t.id}
                                type="button"
                                role="tab"
                                aria-selected={tab === t.id}
                                className={`fd-tabs-v3__item${tab === t.id ? ' fd-tabs-v3__item--active' : ''}`}
                                data-upsell-category={t.id}
                                onClick={() => setTab(t.id)}
                              >
                                {t.label}
                              </button>
                            ))}
                          </div>
                          <div className="upsell-list mini_cart_upsell" id="mini_cart_upsell">
                            {recs.map((p) => <UpsellCard key={p.handle} product={p} onAdd={addLine} />)}
                          </div>
                          <p className="firstday-cart__flyout-recommendations__empty" hidden={recs.length > 0}>You added all recommendations!</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>

          <div className="firstday-cart__flyout-footer">
            <div className="firstday-cart__flyout-subtotal original-price" role="group" aria-labelledby="cartTotalLabel">
              <div className="firstday-cart__flyout-subtotal-label">
                <span className="total-item-count" id="cartTotalLabel">
                  {empty ? 'Total:' : compareTotal > total ? <>Total with <strong>{CART_CODE}</strong> code applied</> : 'Total:'}
                </span>
              </div>
              <div className="firstday-cart__flyout-subtotal-amount" aria-live="polite" aria-atomic="true">
                {empty ? (
                  <del className="mini-cart-original-price firstday-money no-strikethrough" id="cartTotalPrice"><span aria-hidden="true">$0.00</span></del>
                ) : (
                  <>
                    {compareTotal > total && (
                      <del className="mini-cart-original-price firstday-money" id="cartTotalPrice">
                        <span className="sr-only">Original price {money(compareTotal)}, strikethrough</span>
                        <span aria-hidden="true">{money(compareTotal)}</span>
                      </del>
                    )}
                    <span className="mini-cart-price firstday-money sale" id="label-subscription-price">
                      <span className="sr-only">Sale price {money(total)}</span>
                      <span aria-hidden="true">{money(total)}</span>
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="firstday-cart__flyout-actions" style={{ marginTop: 15 }}>
              <CheckoutBlock disabled={empty} />
            </div>
          </div>
        </div>
      </aside>
      {open && <PrototypeToggle />}
    </div>
    </div>
  );
}
