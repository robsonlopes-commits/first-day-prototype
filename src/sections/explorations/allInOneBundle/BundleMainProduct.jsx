import { useMemo } from 'react';
import Img from '../../../components/Img.jsx';
import { JudgeMePreviewBadge } from '../../JudgeMeReviewWidget.jsx';
import { Gallery, CheckBenefit, RadioCheck, CartIcon } from '../../MainProductV2.jsx';
import { BENEFIT_ACCORDION, PURCHASE, SAVINGS_DISPLAY, USP_IMAGES } from '../../../data/pdpNew.js';
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
const BAS = BENEFIT_ACCORDION.settings;
const BAS_VARS = {
  '--bas-bg': BAS.background_color, '--bas-text': BAS.text_color, '--bas-muted': BAS.body_text_color, '--bas-border': BAS.border_color, '--bas-card-bg': BAS.card_background_color,
  '--bas-icon-bg': '#f2fbff', '--bas-icon-color': BAS.icon_color, '--bas-percent-bg': BAS.percent_background_color, '--bas-percent-color': ACCENT,
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
        <span className="vanity-demo-2"> {demo.possessive} All-in-1 Bundle </span>
        <span className="vanity-title">{before}<span className="vanity-title-highlight">{highlight}</span>{after}</span>
      </h1>
    </div>
  );
}

// "What's inside": benefit_accordion_stats rows. icon circle = the bottle, tile = discount inside the bundle, text = product blurb + price line + Add.
function WhatsInside({ demo, monthly, onAddItem }) {
  const pct = monthly ? BUNDLE_DISCOUNT_MONTHLY : BUNDLE_DISCOUNT_ONETIME;
  return (
    <div className="pdp-benefit-accordion-stats aio-inside" style={BAS_VARS}>
      <div className="PBFCM-PDP-quantity-selector__header"><h2 className="PBFCM-PDP-quantity-selector__title">{"What's Inside"}</h2></div>
      <div className="pdp-benefit-accordion-stats__items">
        {demo.items.map((it, i) => {
          const inBundle = monthly ? it.inBundleMonthly : it.inBundleOneTime;
          return (
            <details key={`${demo.id}-${it.key}`} className="pdp-benefit-accordion-stats__item" open={i === 0 || undefined}>
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
                <div className="pdp-benefit-accordion-stats__percent"><span className="aio-pct">{pct}%</span><span className="aio-pct-label">off in bundle</span></div>
                <div className="pdp-benefit-accordion-stats__copy">
                  <div className="metafield-rich_text_field" dangerouslySetInnerHTML={{ __html: it.description }} />
                  <p className="aio-price-line">
                    On its own <s>{money(it.base)}</s> <strong>{money(it.individual)}</strong>
                    <span aria-hidden="true"> · </span>
                    <span className="aio-price-line__bundle">{money(inBundle)} in the bundle</span>
                  </p>
                  <button type="button" className="fd-btn fd-btn--small fd-btn--secondary fd-btn-shape--pill aio-add-one" onClick={() => onAddItem(it)} aria-label={`Add ${it.title} on its own for ${money(it.individual)}`}>
                    <span className="fd-btn-text">Add {it.title} For {money(it.individual)}</span>
                  </button>
                </div>
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}

// product_purchase_content (frequency selector) + savings_display, with the bundle prices. Markup as in PurchaseContent of MainProductV2.
function Purchase({ demo, frequency, onFrequencyChange, onAddBundle }) {
  const P = PURCHASE;
  const sd = SAVINGS_DISPLAY;
  const monthly = frequency === 'monthly';
  const { base, monthly: monthlyPrice, oneTime } = demo.totals;
  const sale = monthly ? monthlyPrice : oneTime;
  const giftUnlocked = base >= P.gift.threshold;
  const compare = base + (giftUnlocked ? P.gift.value : 0); // as production: the free gift counts in the struck total
  const saving = compare - sale;
  const onSale = saving > 0.004;
  const setFreq = (f) => onFrequencyChange(f);
  return (
    <>
      <div id="product-purchase-content" className="product-purchase-content">
        <div className="PBFCM-PDP-frequency-selector" style={{ '--PBFCM-color-freq-selected-bg': '#E4F5FF' }}>
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
                </div>
              </div>
              <div className={`PBFCM-PDP-frequency-selector__benefits PBFCM-PDP-frequency-selector__benefits--positive${monthly ? '' : ' PBFCM-PDP-frequency-selector__benefits--hidden'}`} id="PBFCM-monthly-benefits">
                {P.monthlyBenefits.map((b) => (<div key={b} className="PBFCM-PDP-frequency-selector__benefit"><CheckBenefit /><p className="PBFCM-PDP-frequency-selector__benefit-text">{b}</p></div>))}
              </div>
              <div className="PBFCM-PDP-frequency-selector__badge" style={{ backgroundColor: ACCENT }}><p className="PBFCM-PDP-frequency-selector__badge-text" dangerouslySetInnerHTML={{ __html: P.freqBadge }} /></div>
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
                <div className="PBFCM-PDP-frequency-selector__price-box otppricebox">
                  <div className="PBFCM-PDP-frequency-selector__price-row">
                    <span className="PBFCM-PDP-frequency-selector__price-final" style={{ color: '#2c3e50' }}><span className="sr-only">Sale price {money(oneTime)}</span><span aria-hidden="true">{money(oneTime)}</span></span>
                  </div>
                  <span className="PBFCM-PDP-frequency-selector__price-note">{BUNDLE_DISCOUNT_ONETIME}% off the {money(base)} total</span>
                </div>
              </div>
              <div className={`PBFCM-PDP-frequency-selector__benefits PBFCM-PDP-frequency-selector__benefits--${monthly ? 'hidden' : 'negative'}`} id="PBFCM-onetime-benefits">
                {P.onetimeBenefits.map((b) => (<div key={b} className="PBFCM-PDP-frequency-selector__benefit"><CheckBenefit /><p className="PBFCM-PDP-frequency-selector__benefit-text">{b}</p></div>))}
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
      <div className="fd-savings-display-attach fd-savings-display-attach--rows" style={{ '--fd-attach-gap': '16px', paddingLeft: 0, paddingRight: 0 }}>
        <div className="PBFCM-PDP-cart-summary_container_breakdown PBFCM-PDP-cart-summary_container_breakdown--gift-only">
          {giftUnlocked && (
            <div id="PBFCM-breakdown-gift-line" aria-label="Free gift" aria-live="polite">
              <div className="PBFCM-PDP-cart-summary__line PBFCM-PDP-cart-summary__line--gift">
                <span className="PBFCM-PDP-cart-summary__line-label">{P.gift.title}</span>
                <div className="PBFCM-PDP-cart-summary__line-price">
                  <span className="PBFCM-PDP-cart-summary__line-compare"><span className="sr-only">Original price {money(P.gift.value)}, strikethrough</span><span aria-hidden="true">{money(P.gift.value)}</span></span>
                  <span className="PBFCM-PDP-cart-summary__line-final" style={{ color: P.successColor }}><span className="sr-only">Now FREE</span><span aria-hidden="true">{P.gift.salePrice}</span></span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function BundleMainProduct({ demo, demoId, onDemoChange, frequency, onFrequencyChange, onAddBundle, onAddItem }) {
  const monthly = frequency === 'monthly';
  // first slide: the four bottles lined up, then each bottle on its own
  const images = useMemo(() => [
    { key: `${demo.id}-all`, group: demo.items.map((it) => ({ src: it.image, alt: it.pdpTitle })) },
    ...demo.items.map((it) => ({ src: it.image, alt: `${it.pdpTitle} bottle` })),
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
                  {USP_IMAGES.map((u) => (<div key={u.alt} className="usp"><Img src={u.src} alt={u.alt} /></div>))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
