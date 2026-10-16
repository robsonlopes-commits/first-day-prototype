import { useMemo, useState } from 'react';
import Img from '../../../components/Img.jsx';
import FdInfoModal from '../../../components/FdInfoModal.jsx';
import { customImg } from '../../../lib/assets.js';
import { JudgeMePreviewBadge } from '../../JudgeMeReviewWidget.jsx';
import { Gallery, CheckBenefit, RadioCheck, CartIcon } from '../../MainProductV2.jsx';
import { BENEFIT_ACCORDION, PURCHASE, SAVINGS_DISPLAY } from '../../../data/pdpNew.js';
import { GIFTS } from '../../../data/bundleBuilder.js';
import { DEMOS, BUNDLE_DISCOUNT_MONTHLY, BUNDLE_DISCOUNT_ONETIME, money } from '../../../data/allInOneBundle.js';
import '../../../styles/theme/fd-tabs-v3.css';
import '../../../styles/theme/fd-button.css';
import '../../../styles/theme/PBFCM-PDP-styles.css';
import '../../mainProductV2.css';
import './bundle.css';

// The All-in-1 Bundle buy box. Same markup and classes as the new PDP buy box (MainProductV2.jsx), so it inherits the production CSS:
// gallery, demo tabs, vanity title, benefit accordion rows, frequency selector, add to cart + savings rows, USP row.
// Only the content is new (bundle data) plus a few `aio-` classes in bundle.css for the bundle specific bits.
const ACCENT = '#476DED'; // noon blue: the bundle is not a single product, so it does not borrow one product accent
// Destructive twin of CheckBenefit: red disc with a white X (used for the One-Time "you are missing out" lines).
const XBenefit = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="8.333" fill="var(--color-feedback-error)" />
    <path d="M7 7l6 6M13 7l-6 6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// Trust row under the subtotal: purple line icons and short text on the same #FAFAFA card language as the subtotal (replaces the three badge images).
const ICON_PROPS = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round' };
const TRUST = [
  { strong: '45-Day', label: 'Money Back Guarantee', icon: <svg {...ICON_PROPS}><path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z" /><path d="M8.8 12.2l2.2 2.2 4.2-4.4" /></svg> },
  { strong: '1,000,000+', label: 'Happy Families', icon: <svg {...ICON_PROPS}><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.4A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /></svg> },
  { strong: 'Secure', label: 'Checkout', icon: <svg {...ICON_PROPS}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg> },
];

const PURPLE = '#776CB1'; // --color-accent-purple: second accent (selected pills, info notes, percent tiles)
const BAS = BENEFIT_ACCORDION.settings;
const BAS_VARS = {
  '--bas-bg': BAS.background_color, '--bas-text': BAS.text_color, '--bas-muted': BAS.body_text_color, '--bas-border': BAS.border_color, '--bas-card-bg': BAS.card_background_color,
  '--bas-icon-bg': '#f2fbff', '--bas-icon-color': BAS.icon_color, '--bas-percent-bg': 'rgba(119, 108, 177, 0.10)', '--bas-percent-color': PURPLE,
  '--bas-radius': `${BAS.corner_radius}px`, '--bas-font-size': `${BAS.body_font_size}px`, '--bas-heading-size': `${BAS.heading_font_size}px`, '--bas-percent-size': '28px',
};

// Audience switcher: pdp-demo-tabs + fd-tabs-v3 exactly like DemographicTabs in MainProductV2, with buttons instead of links (no reload).
export function DemoTabs({ demoId, onChange, className = '' }) {
  const demo = DEMOS.find((d) => d.id === demoId) || DEMOS[0];
  return (
    <div className={`pdp-demo-tabs ${className}`.trim()}>
      <div className="pdp-demo-tabs__list fd-tabs-v3 fd-tabs-v3--medium" role="tablist" aria-label="Shop the bundle by audience">
        {DEMOS.map((d) => {
          const active = d.id === demo.id;
          return (
            <button key={d.id} type="button" role="tab" aria-selected={active} className={`pdp-demo-tabs__item fd-tabs-v3__item${active ? ' fd-tabs-v3__item--active is-active' : ''}`} onClick={() => onChange(d.id)}>
              <span className="pdp-demo-tabs__title">{d.label}</span>
            </button>
          );
        })}
      </div>
      <div className="pdp-demo-tabs__banner"><span className="pdp-demo-tabs__banner-age">{demo.banner.prefix}<strong>{demo.banner.ages}</strong> </span></div>
    </div>
  );
}


function Vanity({ demo }) {
  const [before, rest = ''] = demo.vanity.split('[');
  const [highlight, after = ''] = rest.split(']');
  return (
    <div className="pdp-vanity">
      <h1>
        <span className="vanity-demo-2"> {demo.possessive} {demo.bundleName} </span>
        <span className="vanity-title">{before}<span className="vanity-title-highlight">{highlight}</span>{after}</span>
      </h1>
    </div>
  );
}

// "What's inside": benefit_accordion_stats rows. icon circle = the bottle, tile = discount inside the bundle, text = product blurb + price line + Add.
function WhatsInside({ demo, monthly, onAddItem }) {
  return (
    <div className="pdp-benefit-accordion-stats aio-inside" style={BAS_VARS}>
      <div className="PBFCM-PDP-quantity-selector__header"><h2 className="PBFCM-PDP-quantity-selector__title">{"What's Inside"}</h2></div>
      <div className="pdp-benefit-accordion-stats__items">
        {demo.items.map((it, i) => {
          const inBundle = monthly ? it.inBundleMonthly : it.inBundleOneTime;
          return (
            <details key={`${demo.id}-${it.key}`} id={`aio-inside-${it.key}`} className="pdp-benefit-accordion-stats__item">
              <summary className="pdp-benefit-accordion-stats__summary">
                <span className="pdp-benefit-accordion-stats__summary-left">
                  <span className="pdp-benefit-accordion-stats__icon"><Img src={it.image} alt="" loading="lazy" /></span>
                  <span className="pdp-benefit-accordion-stats__heading"><span className="aio-role">{it.label}</span> {it.title}</span>
                </span>
                <span className="pdp-benefit-accordion-stats__caret" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false"><path d="M6 9L12 15L18 9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </summary>
              <div className="pdp-benefit-accordion-stats__content">
                <div className="pdp-benefit-accordion-stats__copy">
                  <div className="metafield-rich_text_field" dangerouslySetInnerHTML={{ __html: it.description }} />
                  <div className="aio-compare-prices" role="group" aria-label="Price on its own versus in the bundle">
                    <div className="aio-compare-prices__tile">
                      <span className="aio-compare-prices__label">On its own</span>
                      <span className="aio-compare-prices__price"><s>{money(it.base)}</s> {money(it.individual)}</span>
                    </div>
                    <div className="aio-compare-prices__tile aio-compare-prices__tile--bundle">
                      <span className="aio-compare-prices__label">In the bundle</span>
                      <span className="aio-compare-prices__price">{money(inBundle)}</span>
                      <span className="aio-compare-prices__save">Save {money(it.individual - inBundle)}</span>
                    </div>
                  </div>
                  <button type="button" className="fd-btn fd-btn--small fd-btn--secondary fd-btn-shape--pill aio-add-one" onClick={() => onAddItem(it)} aria-label={`Add ${it.title} on its own for ${money(it.individual)}`}>
                    <span className="fd-btn-text">Add Individually</span>
                  </button>
                </div>
              </div>
            </details>
          );
        })}
        {/* fifth row: the four free gifts, shown only when it is opened */}
        <details id="aio-inside-gifts" className="pdp-benefit-accordion-stats__item">
          <summary className="pdp-benefit-accordion-stats__summary">
            <span className="pdp-benefit-accordion-stats__summary-left">
              <span className="aio-sparkle-wrap" aria-hidden="true">
                <span className="pdp-benefit-accordion-stats__icon aio-gift-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3.5" y="8.5" width="17" height="4" rx="1" /><path d="M5 12.5V20h14v-7.5M12 8.5V20" /><path d="M12 8.5C12 8.5 10.5 5 8.2 5.2 6.4 5.4 6.2 8.5 12 8.5zM12 8.5c0 0 1.5-3.5 3.8-3.3 1.8.2 2 3.3-3.8 3.3z" /></svg>
                </span>
                <i className="aio-spark aio-spark--1" /><i className="aio-spark aio-spark--2" /><i className="aio-spark aio-spark--3" /><i className="aio-spark aio-spark--4" /><i className="aio-spark aio-spark--5" />
              </span>
              <span className="pdp-benefit-accordion-stats__heading"><span className="aio-role">Free</span> 4 Gifts With Your Bundle</span>
            </span>
            <span className="pdp-benefit-accordion-stats__caret" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false"><path d="M6 9L12 15L18 9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </summary>
          <div className="pdp-benefit-accordion-stats__content">
            <div className="pdp-benefit-accordion-stats__copy"><BundleGifts /></div>
          </div>
        </details>
      </div>
    </div>
  );
}

// product_purchase_content (frequency selector) + savings_display, with the bundle prices. Markup as in PurchaseContent of MainProductV2.
// The four free gifts of the bundle builder (tracked shipping, reusable bottle, travel pod, hydration mix), as the content of the fifth What's Inside collapse (closed by default).
// Data: GIFTS in src/data/bundleBuilder.js.
// Copy of the gift info modal: short, from published First Day wording (the hydration mix from its product description, the bottle from the
// subscription benefits, shipping from the first order offer). The travel pod has no published description: placeholder wording, confirm with the owner.
const GIFT_INFO = {
  'free-shipping': '<p>Your order ships with tracking, on us, so you can follow it to your door.</p>',
  'reusable-bottle': '<p>A stylish refillable bottle for your gummies. Fill it from the eco-friendly refill pouches that come every 30 days with your subscription.</p>',
  'travel-pod-gift': '<p>An exclusive First Day travel pod, made for taking your gummies with you.</p>',
  'hydration-sticks-gift': '<p>A smarter way to hydrate for the whole family. It replenishes electrolytes like sodium, potassium and magnesium lost in sweat, with vitamin C for immune and recovery support. No artificial sweeteners, flavors or colors. 10 servings.</p>',
};
const priceCents = (g) => Math.round(parseFloat(String(g.price).replace('$', '')) * 100) || 0;
const InfoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" /><path d="M9 8v4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="9" cy="5.4" r="1" fill="currentColor" /></svg>
);

// The four free gifts of the bundle builder (tracked shipping, reusable bottle, travel pod, hydration mix) as the content of the fifth
// What's Inside collapse (closed by default). Image, name and the info icon all open the same info modal (the production FdInfoModal).
function BundleGifts() {
  const gifts = Object.values(GIFTS);
  const [info, setInfo] = useState(null);
  const g = info ? GIFTS[info] : null;
  return (
    <div className="aio-gifts" role="group" aria-label="Free gifts included with the bundle">
      <ul className="aio-gifts__list" role="list">
        {gifts.map((it) => (
          <li key={it.handle} className="aio-gifts__item">
            <button type="button" className="aio-gifts__open" onClick={() => setInfo(it.handle)} aria-haspopup="dialog" aria-label={`${it.displayName}, information`}>
              <span className="aio-gifts__thumb"><Img src={it.image} alt="" loading="eager" /></span>
              <span className="aio-gifts__text">
                <span className="aio-gifts__name">{it.displayName}</span>
                <span className="aio-gifts__value">{it.price} value</span>
              </span>
            </button>
            <button type="button" className="aio-gifts__info" onClick={() => setInfo(it.handle)} aria-haspopup="dialog" aria-label={`More about ${it.displayName}`}><InfoIcon /></button>
          </li>
        ))}
      </ul>
      <FdInfoModal
        open={!!info}
        onClose={() => setInfo(null)}
        product={g ? { title: g.displayName, description: GIFT_INFO[g.handle], images: [g.image] } : null}
        offer={g ? { price: 0, compare: priceCents(g) } : null}
      />
    </div>
  );
}

function Purchase({ demo, frequency, onFrequencyChange, onAddBundle }) {
  const P = PURCHASE;
  const sd = SAVINGS_DISPLAY;
  const monthly = frequency === 'monthly';
  const { base, monthly: monthlyPrice, oneTime } = demo.totals;
  const sale = monthly ? monthlyPrice : oneTime;
  const compare = base; // the free gift line was removed, so the struck total is the plain list total
  const saving = compare - sale;
  const onSale = saving > 0.004;
  const setFreq = (f) => onFrequencyChange(f);
  return (
    <>
      <div id="product-purchase-content" className="product-purchase-content">
        <div className="PBFCM-PDP-frequency-selector" style={{ '--PBFCM-color-freq-selected-bg': '#FFFFFF' }}>
          <div className="PBFCM-PDP-quantity-selector__header PBFCM-PDP-frequency-selector__header"><h2 className="PBFCM-PDP-frequency-selector__title">{P.frequencyTitle}</h2></div>
          <div className="PBFCM-PDP-frequency-selector__container" role="radiogroup" aria-label="Select delivery frequency">
            <div className={`PBFCM-PDP-frequency-selector__option${monthly ? ' PBFCM-PDP-frequency-selector__option--selected' : ' PBFCM-PDP-frequency-selector__option--dimmed'}`} id="PBFCM-frequency-monthly" onClick={() => setFreq('monthly')} aria-describedby="PBFCM-monthly-benefits">
              <div className="PBFCM-PDP-frequency-selector__top">
                <div className="PBFCM-PDP-frequency-selector__left">
                  <div className="PBFCM-PDP-frequency-selector__radio-container">
                    <RadioCheck id="PBFCM-checkmark-monthly" hidden={!monthly} />
                    <input type="radio" name="PBFCM-frequency" id="PBFCM-radio-monthly" value="monthly" checked={monthly} onChange={() => setFreq('monthly')} className="PBFCM-PDP-frequency-selector__radio" />
                  </div>
                  <div className="PBFCM-PDP-frequency-selector__label-row"><label htmlFor="PBFCM-radio-monthly" className="PBFCM-PDP-frequency-selector__label"> {P.monthlyLabel} </label></div>
                </div>
                <div className="PBFCM-PDP-frequency-selector__price-box">
                  <div className="PBFCM-PDP-frequency-selector__price-row">
                    <div className="PBFCM-PDP-frequency-selector__price-compare"><span className="sr-only">Original price {money(base)}, strikethrough</span><span aria-hidden="true">{money(base)}</span></div>
                    <span className="PBFCM-PDP-frequency-selector__price-final"><span className="sr-only">Sale price {money(monthlyPrice)}</span><span aria-hidden="true">{money(monthlyPrice)}</span></span>
                  </div>
                  <span className="aio-perbottle aio-perbottle--monthly">{money(monthlyPrice / demo.items.length)} per bottle</span>
                </div>
              </div>
              <div className={`PBFCM-PDP-frequency-selector__benefits PBFCM-PDP-frequency-selector__benefits--positive${monthly ? '' : ' PBFCM-PDP-frequency-selector__benefits--hidden'}`} id="PBFCM-monthly-benefits">
                {P.monthlyBenefits.filter((b) => !/gift/i.test(b)).map((b) => (<div key={b} className="PBFCM-PDP-frequency-selector__benefit"><CheckBenefit /><p className="PBFCM-PDP-frequency-selector__benefit-text">{b}</p></div>))}
              </div>
              <div className="PBFCM-PDP-frequency-selector__badge" style={{ backgroundColor: PURPLE }}><p className="PBFCM-PDP-frequency-selector__badge-text" dangerouslySetInnerHTML={{ __html: P.freqBadge }} /></div>
            </div>
            <div className={`PBFCM-PDP-frequency-selector__option${monthly ? '' : ' PBFCM-PDP-frequency-selector__option--selected PBFCM-PDP-frequency-selector__option--onetime-selected'}`} id="PBFCM-frequency-onetime" onClick={() => setFreq('onetime')} aria-describedby="PBFCM-onetime-benefits">
              <div className="PBFCM-PDP-frequency-selector__top">
                <div className="PBFCM-PDP-frequency-selector__left">
                  <div className="PBFCM-PDP-frequency-selector__radio-container">
                    <RadioCheck id="PBFCM-checkmark-onetime" hidden={monthly} />
                    <input type="radio" name="PBFCM-frequency" id="PBFCM-radio-onetime" value="onetime" checked={!monthly} onChange={() => setFreq('onetime')} className="PBFCM-PDP-frequency-selector__radio" />
                  </div>
                  <label htmlFor="PBFCM-radio-onetime" className="PBFCM-PDP-frequency-selector__label"> {P.onetimeLabel} </label>
                </div>
                <div className="PBFCM-PDP-frequency-selector__price-box">
                  <div className="PBFCM-PDP-frequency-selector__price-row">
                    <div className="PBFCM-PDP-frequency-selector__price-compare"><span className="sr-only">Original price {money(base)}, strikethrough</span><span aria-hidden="true">{money(base)}</span></div>
                    <span className="PBFCM-PDP-frequency-selector__price-final"><span className="sr-only">Sale price {money(oneTime)}</span><span aria-hidden="true">{money(oneTime)}</span></span>
                  </div>
                  <span className="aio-perbottle aio-perbottle--onetime">{money(oneTime / demo.items.length)} per bottle</span>
                </div>
              </div>
              <div className={`PBFCM-PDP-frequency-selector__benefits PBFCM-PDP-frequency-selector__benefits--${monthly ? 'hidden' : 'negative'}`} id="PBFCM-onetime-benefits">
                {P.onetimeBenefits.map((b) => (<div key={b} className="PBFCM-PDP-frequency-selector__benefit"><XBenefit /><p className="PBFCM-PDP-frequency-selector__benefit-text">{b}</p></div>))}
              </div>
              <div className={`PBFCM-PDP-frequency-selector__badge PBFCM-PDP-frequency-selector__badge--negative${monthly ? ' PBFCM-PDP-frequency-selector__badge--hidden' : ''}`} id="PBFCM-onetime-badge" style={{ backgroundColor: P.onetimeBadgeColor }}><p className="PBFCM-PDP-frequency-selector__badge-text">{P.onetimeBadge}</p></div>
            </div>
          </div>
        </div>
      </div>

      <div className="fd-savings-display-attach fd-savings-display-attach--cta" style={{ paddingLeft: 0, paddingRight: 0 }}>
        <button type="button" className="PBFCM-PDP-cart-summary__button fd-btn fd-btn--large fd-btn--primary fd-btn-shape--pill" id="PBFCM-add-to-cart-btn" aria-label="Add Bundle To Cart" onClick={onAddBundle}>
          <CartIcon />
          <strong className="PBFCM-PDP-cart-summary__button-text">Add Bundle To Cart</strong>
        </button>
      </div>
      <div className="fd-savings-display" style={{ '--fd-savings-success': sd.successColor, '--fd-savings-scale': sd.fontScale / 100, paddingLeft: sd.paddingHorizontal, paddingRight: sd.paddingHorizontal }} role="region" aria-label="Order savings summary">
        <div className="fd-savings-display__row">
          <span className="fd-savings-display__label">{sd.label}</span>
          <span className="fd-savings-display__prices">
            <span className="fd-savings-display__savings" role="status" hidden={!onSale}>{sd.template.replace('{amount}', money(saving))}</span>
            <span className="fd-savings-display__compare" hidden={!onSale}><span className="sr-only">Original price </span><span aria-hidden="true">{money(compare)}</span></span>
            <span className="fd-savings-display__final"><span className="sr-only">Sale price </span><span aria-hidden="true">{money(sale)}</span></span>
          </span>
        </div>
      </div>
    </>
  );
}

export default function BundleMainProduct({ demo, demoId, onDemoChange, frequency, onFrequencyChange, onAddBundle, onAddItem }) {
  const monthly = frequency === 'monthly';
  // first slide: emotional photo with the four bottles (AI mockup), then one benefit infographic per bottle (AI mockups, same
  // style as the PDP carousel infographics). Files: public/assets/custom/aio-buybox-<demo>.jpg and aio-info-<demo>-<role>.jpg
  const images = useMemo(() => [
    { src: customImg(`aio-buybox-${demo.id}.jpg`), alt: `${demo.label} ${demo.bundleName}: the First Day bottles` },
    ...demo.items.map((it) => ({ src: customImg(`aio-info-${demo.id}-${it.key}.jpg`), alt: `${it.pdpTitle} benefits` })),
  ], [demo]);
  return (
    <div id="shopify-section-all-in-1-bundle-main" className="shopify-section section">
      <section className="section--padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="page-width product grid grid--1-col grid--2-col-tablet">
          <div className="grid__item product__media-wrapper aio-gallery-tile">
            <Gallery key={demo.id} images={images} />
          </div>
          <div className="product__info-wrapper grid__item">
            <div id="ProductInfo-all-in-1-bundle" className="product__info-container product__info-container--sticky">
              <Vanity demo={demo} />
              <JudgeMePreviewBadge rating={demo.rating} count={demo.reviews} href="#reviews" />
              <DemoTabs demoId={demoId} onChange={onDemoChange} />
              <div className="pdp-benefit-accordion-stats aio-intro" style={BAS_VARS}>
                <div className="pdp-benefit-accordion-stats__intro rte"><div className="metafield-rich_text_field" dangerouslySetInnerHTML={{ __html: demo.intro }} /></div>
              </div>
              <WhatsInside demo={demo} monthly={monthly} onAddItem={onAddItem} />
              <Purchase demo={demo} frequency={frequency} onFrequencyChange={onFrequencyChange} onAddBundle={onAddBundle} />
              <div className="product__custom-liquid">
                <div className="usprow">
                  {TRUST.map((t) => (<div key={t.label} className="usp"><span className="usp__icon" aria-hidden="true">{t.icon}</span><span className="usp__label"><strong>{t.strong}</strong> {t.label}</span></div>))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
