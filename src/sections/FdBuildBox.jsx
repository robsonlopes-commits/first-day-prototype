import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Img from '../components/Img.jsx';
import FdInfoModal from '../components/FdInfoModal.jsx';
import { shopImg, themeAsset } from '../lib/assets.js';
import { BADGE_STYLE, INFO_MODAL_IMAGES } from '../data/bundleQuiz.js';
import '../styles/theme/fd-build-box.css';
import '../styles/theme/fd-badge.css';
import '../styles/theme/fd-button.css';

// snippets/fd-build-box-qty.liquid + snippets/fd-build-box-popup.liquid + assets/fd-build-box.js, as React.
// The theme keeps one shared "group" store (window.__FDBuildBoxGroups) between the pack picker (build_box_qty + build_box_deal blocks) and the
// popup (build_box_popup block); here useBuildBox() holds the same state ({ dealId, subscribe, qty{variantId: n} } + popup UI state) and
// StandaloneProduct hands it to <BuildBoxQty/> and <BuildBoxPopup/>. Markup / class names are the theme's so assets/fd-build-box.css applies as is.
// Cart: the popup's "Add To Cart" adds the chosen bottles to the mock cart and opens the drawer (useCart); no checkout flows.
const LOCK_SVG = '<svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true"><path d="M9 33C8.175 33 7.46875 32.7063 6.88125 32.1188C6.29375 31.5313 6 30.825 6 30V15C6 14.175 6.29375 13.4688 6.88125 12.8813C7.46875 12.2938 8.175 12 9 12H10.5V9C10.5 6.925 11.2313 5.15625 12.6938 3.69375C14.1563 2.23125 15.925 1.5 18 1.5C20.075 1.5 21.8438 2.23125 23.3063 3.69375C24.7688 5.15625 25.5 6.925 25.5 9V12H27C27.825 12 28.5313 12.2938 29.1188 12.8813C29.7063 13.4688 30 14.175 30 15V30C30 30.825 29.7063 31.5313 29.1188 32.1188C28.5313 32.7063 27.825 33 27 33H9ZM20.1188 24.6188C20.7063 24.0313 21 23.325 21 22.5C21 21.675 20.7063 20.9688 20.1188 20.3813C19.5313 19.7938 18.825 19.5 18 19.5C17.175 19.5 16.4688 19.7938 15.8813 20.3813C15.2938 20.9688 15 21.675 15 22.5C15 23.325 15.2938 24.0313 15.8813 24.6188C16.4688 25.2063 17.175 25.5 18 25.5C18.825 25.5 19.5313 25.2063 20.1188 24.6188ZM13.5 12H22.5V9C22.5 7.75 22.0625 6.6875 21.1875 5.8125C20.3125 4.9375 19.25 4.5 18 4.5C16.75 4.5 15.6875 4.9375 14.8125 5.8125C13.9375 6.6875 13.5 7.75 13.5 9V12Z" fill="#2C3D50"/></svg>';
const CHECK_SVG = '<svg class="fd-build-box__check-icon" width="24" height="24" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="#fff"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM14.3652 5.95378C14.1224 5.95214 13.8885 6.04511 13.7126 6.21256C13.7037 6.22126 13.696 6.23061 13.6882 6.24023L9.34733 11.7708L6.73014 9.15527C6.64432 9.06316 6.54078 8.98841 6.42578 8.93717C6.31099 8.88605 6.18684 8.85971 6.0612 8.85742C5.93552 8.8552 5.80994 8.87715 5.69336 8.92415C5.57662 8.9713 5.46988 9.04184 5.38086 9.13086C5.29184 9.21988 5.2213 9.32662 5.17415 9.44336C5.12715 9.55994 5.1052 9.68552 5.10742 9.8112C5.10971 9.93684 5.13605 10.061 5.18717 10.1758C5.23841 10.2908 5.31316 10.3943 5.40527 10.4801L8.71256 13.7874C8.80169 13.8766 8.90818 13.947 9.02506 13.9941C9.14185 14.0412 9.26701 14.0648 9.3929 14.0625C9.5186 14.0602 9.64267 14.0323 9.75749 13.9811C9.8723 13.9298 9.9762 13.8551 10.0618 13.763L15.0505 7.52441C15.2144 7.3453 15.3026 7.1096 15.2962 6.86686C15.2898 6.62399 15.1896 6.39258 15.0163 6.22233C14.8427 6.05205 14.6083 5.95562 14.3652 5.95378Z" fill="#078942"/></svg>';
const PLUS_SVG = '<svg class="fd-build-box-popup__add-icon" width="14" height="14" viewBox="0 0 11.4389 11.4389" fill="none" aria-hidden="true"><path d="M5.71973 0.25C6.04805 0.250146 6.31445 0.516373 6.31445 0.844727V5.125H10.5947C10.923 5.12526 11.1885 5.39144 11.1885 5.71973C11.1883 6.04784 10.9229 6.3142 10.5947 6.31445H6.31445V10.5947C6.31418 10.9228 6.04791 11.1883 5.71973 11.1885C5.39142 11.1885 5.12528 10.9229 5.125 10.5947V6.31445H0.844727C0.516351 6.31445 0.250166 6.04799 0.25 5.71973L0.261719 5.59961C0.317136 5.32858 0.557311 5.125 0.844727 5.125H5.125V0.844727C5.125 0.516283 5.39128 0.25 5.71973 0.25Z" fill="currentColor" stroke="currentColor" stroke-width="0.5" stroke-linecap="round"/></svg>';
const MINUS_SVG = '<svg class="fd-build-box-popup__step-icon" width="14" height="14" viewBox="0 0 11.4389 1.68933" fill="none" aria-hidden="true"><path d="M10.5947 0.25C10.923 0.250258 11.1885 0.516442 11.1885 0.844727C11.1884 1.17293 10.923 1.4392 10.5947 1.43945H0.844727C0.516282 1.43945 0.250054 1.17309 0.25 0.844727C0.25 0.516283 0.516283 0.25 0.844727 0.25H10.5947Z" fill="currentColor" stroke="currentColor" stroke-width="0.5" stroke-linecap="round"/></svg>';
const INFO_SVG = '<svg class="fd-build-box-popup__card-info-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="8" fill="#2C3D50"/><circle cx="8" cy="5.1" r="1.05" fill="#fff"/><rect x="7.15" y="7.05" width="1.7" height="5.2" rx="0.85" fill="#fff"/></svg>';
const Raw = ({ html, as: Tag = 'span', ...rest }) => <Tag {...rest} dangerouslySetInnerHTML={{ __html: html }} />;

/* ---------- pure helpers (fd-build-box.js) ---------- */
const money = (cents) => `$${((Number(cents) || 0) / 100).toFixed(2).replace(/\.00$/, '')}`;
const discountedCents = (list, pct) => Math.round(((Number(list) || 0) * (100 - (Number(pct) || 0))) / 100);
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const ordinal = (n) => { const v = n % 100; if (v >= 11 && v <= 13) return `${n}th`; return `${n}${['th', 'st', 'nd', 'rd'][n % 10] || 'th'}`; };
const promoDate = () => { const d = new Date(); return `${MONTHS[d.getMonth()]} ${ordinal(d.getDate())}`; };
// "{date}" (the template stores it as &lcub;date&rcub;) -> "Oct 14th"
const fillDate = (s) => (s || '').replace(/&lcub;date&rcub;|\{date\}/gi, promoDate());
const currentTier = (tiers, qty) => tiers.reduce((f, t) => (t.qty <= qty && (!f || t.qty > f.qty) ? t : f), null);
const tierPercentFor = (tiers, qty, sub) => { const t = currentTier(tiers, qty); if (!t) return 0; const p = sub ? t.percent : t.otpPercent; return Number.isFinite(p) ? p : 0; };
const nextTierFor = (tiers, qty, sub) => {
  const now = tierPercentFor(tiers, qty, sub);
  const t = tiers.find((x) => { const p = sub ? x.percent : x.otpPercent; return x.qty > qty && Number.isFinite(p) && p > now; });
  return t ? { qty: t.qty, percent: sub ? t.percent : t.otpPercent } : null;
};
const earnedGiftTier = (dealCounts, filled) => dealCounts.reduce((e, c) => (c <= filled && c > e ? c : e), 0);
const giftPriceText = (g) => { const raw = g.price != null && g.price !== '' ? String(g.price).trim() : ''; if (!raw) return ''; return raw.startsWith('$') ? raw : `$${raw}`; };
const giftName = (g) => g.displayName || g.label || 'Gift';

/* ---------- state: the shared group store + popup UI ---------- */
// blocks: the section's active blocks; returns null when the section has no build_box_qty block.
export function useBuildBox({ blocks, product, cart }) {
  const qtyBlock = blocks.find((b) => b.type === 'build_box_qty');
  const popupBlock = blocks.find((b) => b.type === 'build_box_popup');
  const group = qtyBlock ? (qtyBlock.settings.group_id || qtyBlock.id).trim() : '';

  const model = useMemo(() => {
    if (!qtyBlock) return null;
    const baseRaw = String(qtyBlock.settings.list_price || '').replace(/[$,]/g, '').trim();
    const base = baseRaw ? Math.round(parseFloat(baseRaw) * 100) : 0;
    const deals = blocks.filter((b) => b.type === 'build_box_deal' && (b.settings.group_id || '').trim() === group).map((b) => {
      const s = b.settings;
      const count = s.count || 1;
      const hasTier = s.tier_discount_percent !== '' && s.tier_discount_percent != null && base > 0;
      const otpPct = s.otp_discount_percent !== '' && s.otp_discount_percent != null ? Number(s.otp_discount_percent) : null;
      let otpCents = Math.round(parseFloat(String(s.otp_price || '0').replace(/[$,]/g, '')) * 100) || 0;
      if (otpPct != null && base > 0) otpCents = Math.round(((100 - otpPct) * base) / 100) * count;
      return {
        id: b.id, count, name: s.name || `${count} Pack`, label: s.label, active: !!s.active, unit: hasTier ? `$${(Math.round(((100 - s.tier_discount_percent) * base) / 100) / 100).toFixed(2)} / each` : (s.unit_price || '').trim(),
        tier: hasTier ? Number(s.tier_discount_percent) : null, otp: otpPct, otpCents, gifts: (s.gifts || []).map((k) => product.gifts[k]).filter(Boolean),
      };
    });
    const dealCounts = [...new Set(deals.map((d) => d.count))].sort((a, b) => a - b);
    const maxPack = dealCounts.length ? dealCounts[dealCounts.length - 1] : 0;
    const maxDeal = deals.find((d) => d.count === maxPack);
    const tiers = deals.filter((d) => d.tier != null).map((d) => ({ qty: d.count, percent: d.tier, otpPercent: d.otp, label: d.name })).sort((a, b) => a.qty - b.qty);
    const defaultDeal = (deals.find((d) => d.active) || deals[0] || {}).id;
    const pop = popupBlock ? popupBlock.settings : null;
    const drawer = !!(pop && pop.summary_drawer && tiers.length);
    const flat = {};
    product.catalog.forEach((c) => c.products.forEach((p) => { flat[p.variantId] = p; }));
    return { deals, dealCounts, maxPack, maxDeal, tiers, defaultDeal, drawer, base, flat, pop };
  }, [blocks, qtyBlock, popupBlock, group, product]);

  const [st, setSt] = useState({ dealId: null, subscribe: true, qty: {} });
  const [ui, setUi] = useState({ open: false, drawerOpen: false, sheetOpen: false, packTarget: 0, activeCat: null, info: null, submitting: false });
  if (!model) return null;

  const dealId = st.dealId || model.defaultDeal;
  const deal = model.deals.find((d) => d.id === dealId) || model.deals[0];
  const count = deal ? deal.count : 1;
  const giftsSource = (model.maxDeal && model.maxDeal.gifts.length ? model.maxDeal : deal) || { gifts: [] };
  const gifts = giftsSource.gifts;
  const filled = Object.values(st.qty).reduce((t, n) => t + (Number(n) || 0), 0);

  const api = {
    model, group, st, ui, deal, dealId, count, gifts, filled, cart, product, qtyBlock, popupBlock,
    subscribe: st.subscribe !== false,
    selectDeal: (id) => setSt((s) => ({ ...s, dealId: id })),
    setSubscribe: (on) => setSt((s) => ({ ...s, subscribe: !!on })),
    openPopup: () => setUi((u) => ({ ...u, open: true, packTarget: count, drawerOpen: false })),
    closePopup: () => setUi((u) => ({ ...u, open: false, sheetOpen: false })),
    setUi: (patch) => setUi((u) => ({ ...u, ...patch })),
    setQty: (variantId, next) => setSt((s) => {
      const qty = { ...s.qty };
      const n = Math.max(0, next | 0);
      if (n <= 0) delete qty[variantId]; else qty[variantId] = n;
      // upgradeDealIfNeeded(): grow the selected pack when the box outgrows it
      const total = Object.values(qty).reduce((t, v) => t + (Number(v) || 0), 0);
      const cur = model.deals.find((d) => d.id === (s.dealId || model.defaultDeal));
      let dealId2 = s.dealId;
      if (cur && total > cur.count) {
        const target = Math.min(total, model.maxPack || total);
        let best = null; let bestCount = Infinity; let maxBtn = null; let maxC = 0;
        model.deals.forEach((d) => {
          if (!d.active) return;
          if (d.count > maxC) { maxC = d.count; maxBtn = d; }
          if (d.count >= target && d.count < bestCount) { best = d; bestCount = d.count; }
        });
        const pick = best || maxBtn;
        if (pick) dealId2 = pick.id;
      }
      return { ...s, qty, dealId: dealId2 };
    }),
    clearQty: () => setSt((s) => ({ ...s, qty: {} })),
  };
  return api;
}

/* ---------- build_box_qty block (+ build_box_deal blocks) ---------- */
function GiftCard({ gift, locked, unlocked, hideImage, hideCheck, showBadge, captionNameOnly }) {
  const price = giftPriceText(gift);
  const cls = `fd-build-box__gift${locked ? ' is-locked' : ''}${unlocked ? ' is-unlocked' : ''}${locked && hideImage ? ' is-lock-only' : ''}`;
  return (
    <div className={cls}>
      <div className="fd-build-box__gift-media">
        {gift.image && !hideImage ? <Img src={shopImg(gift.image)} alt="" width="120" height="120" loading="lazy" /> : null}
        {showBadge && price ? <span className="fd-build-box__gift-badge"><span className="fd-build-box__gift-badge-label">FREE</span><span className="fd-build-box__gift-badge-price">{price}</span></span> : null}
        {locked ? <Raw html={LOCK_SVG} className="fd-build-box__gift-lock" aria-hidden="true" /> : null}
        {unlocked && !hideCheck ? <Raw html={CHECK_SVG} className="fd-build-box__gift-check" aria-hidden="true" /> : null}
      </div>
      <p className="fd-build-box__gift-label">{captionNameOnly ? giftName(gift) : <>{price ? <><strong className="fd-build-box__gift-price">{price}</strong>{' '}</> : null}{giftName(gift)}</>}</p>
    </div>
  );
}

export function BuildBoxQty({ bb }) {
  const s = bb.qtyBlock.settings;
  const { model, subscribe, deal, count } = bb;
  const maxPack = model.maxPack;
  const showPackPrice = s.show_pack_price !== false;
  const otpLabel = s.otp_label || 'One-Time Purchase';
  const subLabel = s.subscribe_line_1 || 'Subscribe';
  const toggle = () => { bb.setSubscribe(!subscribe); bb.openPopup(); };
  return (
    <div className={`fd-build-box${model.drawer ? ' fd-build-box--summary-drawer' : ''}${subscribe ? '' : ' is-otp'}`} data-fd-build-box data-group={bb.group} data-subscribe={subscribe ? 'true' : 'false'}>
      {s.promo_text ? (
        <div className="fd-build-box__promo">
          <span className="fd-build-box__promo-icon" aria-hidden="true"><img src={themeAsset('fd-build-box-promo-badge.svg')} width="24" height="24" alt="" /></span>
          <Raw as="div" className="fd-build-box__promo-text rte" html={fillDate(s.promo_text)} />
        </div>
      ) : null}
      <div className="fd-build-box__qty">
        {s.qty_heading ? <h3 className="fd-build-box__heading">{s.qty_heading}</h3> : null}
        <div className="fd-build-box__deals" role="radiogroup" aria-label="Pack size">
          {model.deals.map((d) => {
            const selected = d.id === bb.dealId;
            const pct = subscribe ? d.tier : d.otp;
            return (
              <button key={d.id} type="button" className={`fd-build-box__deal${selected ? ' is-selected' : ''}${d.active ? '' : ' is-disabled'}`} data-deal-id={d.id} data-deal-count={d.count}
                disabled={!d.active} aria-disabled={!d.active || undefined} aria-checked={selected} role="radio" onClick={() => d.active && bb.selectDeal(d.id)}>
                <span className="fd-build-box__deal-copy">
                  <span className="fd-build-box__deal-name">{d.name}</span>
                  {d.tier != null ? <span className="fd-build-box__deal-pct" data-deal-pct>{Number.isFinite(pct) && pct > 0 ? `${pct}% OFF` : ' '}</span> : null}
                  {d.unit && showPackPrice ? <span className="fd-build-box__deal-unit">{d.unit}</span> : null}
                </span>
                {d.label ? <span className="fd-build-box__deal-badge">{d.label}</span> : null}
              </button>
            );
          })}
        </div>
      </div>
      <div className="fd-build-box__gifts-panel" data-gifts-panel>
        {s.gifts_heading ? <Raw as="div" className="fd-build-box__gifts-heading rte" html={s.gifts_heading} /> : null}
        <div className="fd-build-box__gifts-grid" data-gifts-grid>
          {bb.gifts.map((g, i) => <GiftCard key={g.label} gift={g} locked={i >= count} unlocked={i < count} hideCheck showBadge captionNameOnly />)}
        </div>
      </div>
      <div className="fd-build-box__cta-block">
        {s.after_gifts_text ? <p className="fd-build-box__after-gifts">{fillDate(s.after_gifts_text)}</p> : null}
        <button type="button" className="fd-build-box__cta" data-open-popup onClick={bb.openPopup}>
          <span data-cta-label>{s.cta_text || 'Build Your Box'}</span>
          <img src={themeAsset('fd-build-box-cta-arrow.svg')} width="32" height="32" alt="" aria-hidden="true" />
        </button>
        <div className="fd-build-box__status">
          <p className="fd-build-box__status-gifts">🎁 <span data-gifts-status>{count}/{maxPack} Free Gifts</span></p>
          <p className="fd-build-box__status-guarantee">
            <img className="fd-build-box__status-atm" src={themeAsset('fd-build-box-atm.svg')} width="20" height="20" alt="" aria-hidden="true" />
            <span>{s.status_guarantee_text || '100% Money Back Guarantee'}</span>
          </p>
        </div>
      </div>
      {s.claim_text ? (
        <div className="fd-build-box__claim">
          <img className="fd-build-box__claim-seal" src={themeAsset('fd-build-box-seal.png')} width="51" height="51" alt="" />
          <Raw as="div" className="fd-build-box__claim-text rte" html={s.claim_text} />
        </div>
      ) : null}
      {(s.benefits_heading || s.benefit_1) ? (
        <div className="fd-build-box__benefits">
          {s.benefits_heading ? <h3 className="fd-build-box__benefits-heading">{s.benefits_heading}</h3> : null}
          <ul className="fd-build-box__benefits-list">
            {[s.benefit_1, s.benefit_2, s.benefit_3].filter(Boolean).map((t) => (
              <li key={t} className="fd-build-box__benefit"><img src={themeAsset('fd-build-box-check-outline.svg')} width="16" height="11" alt="" aria-hidden="true" /><span>{t}</span></li>
            ))}
          </ul>
        </div>
      ) : null}
      {s.show_subscribe_toggle !== false ? (
        <div className="fd-build-box__otp" data-subscribe-row>
          <button type="button" className={`fd-build-box__otp-link${subscribe ? ' is-on' : ''}`} data-subscribe-toggle aria-pressed={!subscribe} aria-label={subscribe ? 'Switch to one-time purchase' : 'Switch to subscription'} onClick={toggle}>
            <span data-otp-copy>{subscribe ? otpLabel : subLabel}</span>
            {showPackPrice ? <span data-otp-price hidden={!subscribe}>{deal && deal.otpCents > 0 ? money(deal.otpCents) : ''}</span> : null}
          </button>
          {s.otp_note ? <p className="fd-build-box__otp-note">{s.otp_note}</p> : null}
        </div>
      ) : null}
    </div>
  );
}

/* ---------- build_box_popup block ---------- */
function CountUp({ end, run }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) { setN(0); return undefined; }
    let raf; const start = performance.now();
    const tick = (now) => { const t = Math.min(1, (now - start) / 1400); setN(Math.round(end * (1 - (1 - t) ** 3))); if (t < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, run]);
  return <strong>{n}</strong>;
}

function ProductCard({ p, qty, badge, price, compact, mediaInfo, onInfo, onAdd, onDec, onInc }) {
  const id = String(p.variantId);
  const handle = compact ? '' : p.handle || '';
  const mediaOnly = !!mediaInfo;
  const Info = handle && !mediaOnly ? 'button' : 'span';
  const boxInfo = handle && mediaOnly;
  const b = !compact && badge ? { text: badge, ...BADGE_STYLE[badge] } : null;
  const mediaEl = p.image && !compact ? (
    <span className="fd-build-box-popup__card-media"><Img src={shopImg(p.image)} alt="" width="72" height="72" loading="lazy" />{handle ? <Raw html={INFO_SVG} style={{ display: 'contents' }} /> : null}</span>
  ) : null;
  return (
    <article className={`fd-build-box-popup__card${compact ? ' fd-build-box-popup__card--row' : ''}${qty > 0 ? ' is-selected' : ''}`} data-product-card data-variant-id={id} data-title={p.title} data-image={p.image || ''} data-variant-title={p.variantTitle || ''}>
      <Info className="fd-build-box-popup__card-info" {...(Info === 'button' ? { type: 'button', 'aria-label': 'Product details', onClick: () => onInfo(p) } : {})}>
        {mediaEl && boxInfo
          ? <button type="button" className="fd-build-box-popup__card-media-btn" data-box-info={id} aria-haspopup="dialog" aria-label={`Product details: ${p.title}`} onClick={() => onInfo(p)}>{mediaEl}</button>
          : mediaEl}
        <span className="fd-build-box-popup__card-body">
          {boxInfo
            ? <button type="button" className="fd-build-box-popup__card-name fd-build-box-popup__card-name-btn" data-box-info={id} aria-haspopup="dialog" onClick={() => onInfo(p)}>{p.title}</button>
            : <span className="fd-build-box-popup__card-name">{p.title}</span>}
          {p.description && !compact ? <span className="fd-build-box-popup__card-desc">{p.description}</span> : null}
          {price && price.list > 0 ? (
            <span className="fd-build-box-popup__card-price">
              {price.final < price.list ? <s className="fd-build-box-popup__card-compare">{money(price.list)}</s> : null}
              <span className="fd-build-box-popup__card-final">{money(price.final)}</span>
            </span>
          ) : null}
        </span>
      </Info>
      {compact ? null : <button type="button" className="fd-build-box-popup__add" data-add data-variant-id={id} onClick={onAdd}>Add <Raw html={PLUS_SVG} style={{ display: 'contents' }} /></button>}
      <div className="fd-build-box-popup__stepper">
        <button type="button" className="fd-build-box-popup__step" data-dec data-variant-id={id} aria-label="Decrease" onClick={onDec}><Raw html={MINUS_SVG} style={{ display: 'contents' }} /></button>
        <span className="fd-build-box-popup__qty">{qty}</span>
        <button type="button" className="fd-build-box-popup__step" data-inc data-variant-id={id} aria-label="Increase" onClick={onInc}><Raw html={PLUS_SVG} style={{ display: 'contents' }} /></button>
      </div>
      {b ? <span className="fd-build-box-popup__card-badge" style={{ '--fd-bb-card-badge-solid': b.bg, '--fd-bb-card-badge-fg': b.fg }}>{b.text}</span> : null}
    </article>
  );
}

const OffBadge = ({ pct, strong, light }) => (
  <span className={`fd-badge fd-badge--sm ${light ? 'fd-badge--success-light' : 'fd-badge--success fd-build-box-popup__drawer-badge'}`}>
    {strong ? <><strong>{pct}%</strong>{' '}OFF</> : `${pct}% OFF`}
  </span>
);

export function BuildBoxPopup({ bb }) {
  const { model, ui, st, subscribe, product, cart } = bb;
  const pop = model.pop;
  const tiers = model.tiers;
  const drawerMode = model.drawer;
  const scrollRef = useRef(null);
  const catsRef = useRef(null);
  const productsRef = useRef(null);
  const lockSpy = useRef(false);
  const checkoutRef = useRef(null);
  const [pinned, setPinned] = useState(() => typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(min-width: 990px)').matches : true);
  const badgeHandles = pop.badge_best_seller_products || [];
  const catalog = product.catalog;
  const catKey = ui.activeCat || catalog[0].key;

  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mq = window.matchMedia('(min-width: 990px)');
    const on = () => setPinned(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  // body.fd-build-box-open locks page scroll while the popup is open
  useEffect(() => {
    document.body.classList.toggle('fd-build-box-open', ui.open);
    return () => document.body.classList.remove('fd-build-box-open');
  }, [ui.open]);
  // Escape: sheet -> drawer -> popup (the info modal handles its own Escape first)
  useEffect(() => {
    if (!ui.open) return undefined;
    const onKey = (e) => {
      if (e.key !== 'Escape' || ui.submitting || ui.info) return;
      if (ui.sheetOpen) { bb.setUi({ sheetOpen: false }); return; }
      if (drawerMode && ui.drawerOpen && !pinned) { bb.setUi({ drawerOpen: false }); return; }
      bb.closePopup();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  /* numbers (boxNumbers) */
  const filled = bb.filled;
  const n = useMemo(() => {
    const pct = tierPercentFor(tiers, filled, subscribe);
    const plusPct = tierPercentFor(tiers, filled + 1, subscribe);
    const gifts = bb.gifts;
    const earned = earnedGiftTier(model.dealCounts, filled);
    const plusEarned = earnedGiftTier(model.dealCounts, filled + 1);
    const plusGift = plusEarned > earned && gifts[earned] ? gifts[earned] : null;
    let list = 0; let total = 0; const rows = [];
    Object.keys(st.qty).forEach((id) => {
      const q = Number(st.qty[id]) || 0;
      if (q <= 0) return;
      const prod = model.flat[id];
      const cents = (prod && prod.price) || 0;
      list += cents * q; total += discountedCents(cents, pct) * q;
      if (prod) rows.push({ product: prod, qty: q, list: cents * q, final: discountedCents(cents, pct) * q });
    });
    const plusSaving = filled > 0 ? Math.round(((list + list / filled) * plusPct) / 100) : 0;
    return { filled, pct, plusPct: plusPct > pct ? plusPct : 0, plusGift, next: nextTierFor(tiers, filled, subscribe), earned, gifts, list, total, saving: list - total, plusSaving, rows };
  }, [filled, st.qty, subscribe, tiers, bb.gifts, model]);

  const headHtml = (() => {
    if (n.filled < 1) return 'Add first product to earn gifts';
    if (n.plusPct || n.plusGift) {
      const parts = [];
      if (n.plusPct) parts.push(`<strong class="fd-build-box-popup__drawer-pct">${n.plusPct}% Off</strong>`);
      if (n.plusGift) parts.push(`<strong class="fd-build-box-popup__drawer-gift">Free ${giftName(n.plusGift)}</strong>`);
      return `Add one more product to unlock<br>${parts.join(' + ')}`;
    }
    if (n.next) return `Add ${n.next.qty - n.filled} more products to unlock<br><strong class="fd-build-box-popup__drawer-pct">${n.next.percent}% Off</strong>`;
    return n.pct > 0 ? `You unlocked ${n.pct}% off, the top tier` : '';
  })();

  const nextPct = tiers.length ? tierPercentFor(tiers, filled + 1, subscribe) : null;
  const packTarget = ui.packTarget || bb.count;
  const heroSrc = shopImg(product.mainImage);
  const open = pinned || ui.drawerOpen;
  const ready = filled >= 1;
  const checkoutText = String(pop.checkout_text || 'Shop Now').replace(/\bCheckout\b/g, 'Add');
  const sheetHas = !!(n.plusPct || n.plusGift);

  /* category nav / scroll spy */
  const scrollActiveCatIntoView = (key) => {
    const nav = catsRef.current; const btn = nav && nav.querySelector(`[data-cat-key="${key}"]`);
    if (!nav || !btn) return;
    nav.scrollTo({ left: Math.max(0, btn.offsetLeft - (nav.clientWidth - btn.offsetWidth) / 2), behavior: 'smooth' });
  };
  const syncActive = useCallback(() => {
    if (lockSpy.current) return;
    const scroll = scrollRef.current; const prods = productsRef.current;
    if (!scroll || !prods) return;
    const sections = prods.querySelectorAll('[data-cat-section]');
    if (!sections.length) return;
    const marker = scroll.getBoundingClientRect().top + 24;
    let cur = sections[0].getAttribute('data-cat-section');
    sections.forEach((sec) => { if (sec.getBoundingClientRect().top <= marker) cur = sec.getAttribute('data-cat-section'); });
    if (scroll.scrollTop + scroll.clientHeight >= scroll.scrollHeight - 8) cur = sections[sections.length - 1].getAttribute('data-cat-section');
    if (cur && cur !== catKey) { bb.setUi({ activeCat: cur }); scrollActiveCatIntoView(cur); }
  }, [catKey, bb]);
  const pickCat = (key) => {
    bb.setUi({ activeCat: key });
    scrollActiveCatIntoView(key);
    const scroll = scrollRef.current; const sec = productsRef.current && productsRef.current.querySelector(`[data-cat-section="${key}"]`);
    if (!scroll || !sec) return;
    lockSpy.current = true;
    setTimeout(() => { lockSpy.current = false; syncActive(); }, 700);
    scroll.scrollTo({ top: Math.max(0, sec.getBoundingClientRect().top - scroll.getBoundingClientRect().top + scroll.scrollTop), behavior: 'smooth' });
  };

  /* checkout / sheet */
  const addToCart = () => {
    // mock: add the chosen bottles to the cart drawer (no checkout flow)
    Object.keys(st.qty).forEach((id) => {
      const prod = model.flat[id];
      if (!prod) return;
      cart.addLine({ handle: prod.handle, title: prod.title, image: shopImg(prod.image), price: prod.price }, subscribe);
      const q = Number(st.qty[id]) || 1;
      if (q > 1) cart.changeQty(`${prod.handle}:${subscribe ? 'sub' : 'otp'}`, q - 1);
    });
    bb.clearQty();
    bb.closePopup();
    cart.openCart();
  };
  const submit = (opts) => {
    if (ui.submitting || filled < 1) return;
    if (drawerMode && !(opts && opts.skipSheet) && filled < packTarget && sheetHas) { bb.setUi({ sheetOpen: true }); return; }
    addToCart();
  };
  const closeSheet = (silent) => { bb.setUi({ sheetOpen: false }); if (!silent) setTimeout(() => checkoutRef.current && checkoutRef.current.focus(), 0); };

  const cardProps = (p) => ({ onInfo: () => bb.setUi({ info: p }), onAdd: () => bb.setQty(String(p.variantId), (Number(st.qty[p.variantId]) || 0) > 0 ? Number(st.qty[p.variantId]) : 1), onInc: () => bb.setQty(String(p.variantId), (Number(st.qty[p.variantId]) || 0) + 1), onDec: () => bb.setQty(String(p.variantId), (Number(st.qty[p.variantId]) || 0) - 1) });
  const infoProduct = ui.info;
  const infoMeta = infoProduct ? product.infoProducts[infoProduct.handle] : null;
  const infoImages = infoProduct ? (INFO_MODAL_IMAGES[infoProduct.handle] || [infoProduct.image]).map(shopImg) : [];

  const calloutBox = (html) => (
    <div className="fd-build-box-popup__sheet-callout">
      <img className="fd-build-box-popup__sheet-callout-icon" src={themeAsset('fd-build-box-proof-tag.svg')} width="24" height="24" alt="" aria-hidden="true" />
      <Raw as="p" className="fd-build-box-popup__sheet-callout-text" html={html} />
    </div>
  );

  return (
    <>
      <aside className={`fd-build-box-popup${drawerMode ? ' fd-build-box-popup--drawer' : ''}${ui.open ? ' is-open' : ''}${ui.sheetOpen ? ' is-sheet-open' : ''}`} data-fd-build-box-popup data-group={bb.group} aria-hidden={!ui.open}>
        <button type="button" className="fd-build-box-popup__scrim" data-close-popup aria-label="Close" onClick={() => !ui.submitting && bb.closePopup()} />
        <div className="fd-build-box-popup__panel" role="dialog" aria-modal="true" aria-labelledby="fd-bb-title">
          <div className="fd-build-box-popup__header">
            <button type="button" className="fd-build-box-popup__back" data-close-popup aria-label="Back" onClick={() => !ui.submitting && bb.closePopup()}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M12.5 4.5L7 10L12.5 15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <h2 className="fd-build-box-popup__title" id="fd-bb-title">{drawerMode && packTarget >= 1 ? `Select At Least ${packTarget} ${packTarget === 1 ? 'Bottle' : 'Bottles'}` : pop.popup_title || 'Build Your Box'}</h2>
          </div>
          <div className="fd-build-box-popup__body">
            <aside className="fd-build-box-popup__hero has-image" data-popup-hero>
              <img className="fd-build-box-popup__hero-img" data-popup-hero-img src={heroSrc} alt="" width="756" height="756" loading="lazy" />
              <div className="fd-build-box-popup__hero-collage" data-popup-hero-collage hidden />
            </aside>
            <div className="fd-build-box-popup__main">
              <nav className="fd-build-box-popup__cats" data-cats aria-label="Categories" ref={catsRef}>
                {catalog.map((c) => <button key={c.key} type="button" className={`fd-build-box-popup__cat${c.key === catKey ? ' is-active' : ''}`} data-cat-key={c.key} onClick={(e) => { pickCat(c.key); e.currentTarget.blur(); }}>{c.label}</button>)}
              </nav>
              <div className="fd-build-box-popup__scroll" data-scroll ref={scrollRef} onScroll={syncActive}>
                {(pop.intro_text || pop.social_proof_stat || pop.promo_text) ? (
                  <div className="fd-build-box-popup__intro">
                    {pop.intro_text ? <p className="fd-build-box-popup__intro-text">{pop.intro_text}</p> : null}
                    {pop.social_proof_stat ? (
                      <p className="fd-build-box-popup__proof">
                        <img className="fd-build-box-popup__proof-icon" src={themeAsset('fd-build-box-proof-tag.svg')} width="20" height="20" alt="" aria-hidden="true" />
                        <span className="fd-build-box-popup__proof-text"><CountUp end={parseInt(pop.social_proof_stat, 10)} run={ui.open} />{pop.social_proof_text}</span>
                      </p>
                    ) : null}
                    {pop.promo_text ? (
                      <div className="fd-build-box__promo fd-build-box-popup__promo">
                        <span className="fd-build-box__promo-icon" aria-hidden="true"><img src={themeAsset('fd-build-box-promo-badge.svg')} width="24" height="24" alt="" /></span>
                        <Raw as="div" className="fd-build-box__promo-text rte" html={fillDate(pop.promo_text)} />
                      </div>
                    ) : null}
                  </div>
                ) : null}
                <div className="fd-build-box-popup__products" data-products ref={productsRef}>
                  {catalog.map((c) => (
                    <section key={c.key} className="fd-build-box-popup__cat-section" data-cat-section={c.key}>
                      <h3 className="fd-build-box-popup__cat-title"><span className="fd-build-box-popup__cat-label">{c.label}</span>{c.ages ? <span className="fd-build-box-popup__cat-ages">{c.ages}</span> : null}</h3>
                      {c.products.map((p) => (
                        <ProductCard key={p.variantId} p={p} qty={Number(st.qty[p.variantId]) || 0} badge={badgeHandles.includes(p.handle) ? 'Best Seller' : ''}
                          price={nextPct != null && p.price > 0 ? { list: p.price, final: discountedCents(p.price, nextPct) } : null} mediaInfo={drawerMode} {...cardProps(p)} />
                      ))}
                    </section>
                  ))}
                </div>
                <div className="fd-build-box-popup__gifts-status">
                  {pop.gifts_title ? (
                    <div className="fd-build-box-popup__gifts-banner">
                      <img className="fd-build-box-popup__gifts-icon" src={themeAsset('fd-build-box-gift.svg')} width="20" height="20" alt="" aria-hidden="true" />
                      <Raw as="div" className="fd-build-box-popup__gifts-title rte" html={pop.gifts_title} />
                    </div>
                  ) : null}
                  <div className="fd-build-box-popup__gifts-grid" data-popup-gifts>
                    {bb.gifts.map((g, i) => <GiftCard key={g.label} gift={g} locked={i >= n.earned} unlocked={i < n.earned} />)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {drawerMode ? <button type="button" className="fd-build-box-popup__drawer-scrim" data-drawer-scrim tabIndex={-1} aria-label="Hide box summary" hidden={!open || pinned} onClick={() => bb.setUi({ drawerOpen: false })} /> : null}
          <div className={`fd-build-box-popup__footer${drawerMode && open ? ' is-expanded' : ''}`}>
            <div className="fd-build-box-popup__footer-inner">
              <div className="fd-build-box-popup__footer-left">
                {drawerMode ? (
                  <>
                    <div className="fd-build-box-popup__drawer-head" data-drawer-head onClick={() => !pinned && bb.setUi({ drawerOpen: !ui.drawerOpen })}>
                      <div className="fd-build-box-popup__drawer-lead">
                        <img className="fd-build-box-popup__drawer-icon" src={themeAsset('fd-build-box-discount-fill.svg')} width="32" height="32" alt="" aria-hidden="true" />
                        <Raw as="p" className="fd-build-box-popup__drawer-text" data-drawer-text aria-live="polite" html={headHtml} />
                      </div>
                      <button type="button" className="fd-build-box-popup__back fd-build-box-popup__drawer-toggle" data-drawer-toggle aria-expanded={open} aria-label={open ? 'Hide box summary' : 'Show box summary'}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M9.55904 6.25C9.70481 6.25 9.85059 6.29982 9.94778 6.44927L15.2929 12.9257C15.4873 13.125 15.4387 13.4737 15.2443 13.6231C15.05 13.8224 14.7098 13.7726 14.564 13.5733L9.55904 7.49546L4.60262 13.5235C4.40825 13.7228 4.1167 13.7726 3.92233 13.5733C3.72796 13.3741 3.67937 13.0751 3.87373 12.8759L9.21889 6.39946C9.26748 6.29982 9.41326 6.25 9.55904 6.25Z" fill="currentColor" /></svg>
                      </button>
                    </div>
                    <div className="fd-build-box-popup__drawer-body" id="fd-bb-drawer" data-drawer-body hidden={!open}>
                      <div className="fd-build-box-popup__drawer-items">
                        <div className="fd-build-box-popup__drawer-rows" data-drawer-rows>
                          {open ? n.rows.map((r) => <ProductCard key={r.product.variantId} p={r.product} qty={r.qty} price={{ list: r.list, final: r.final }} compact {...cardProps(r.product)} />) : null}
                        </div>
                        <div className="fd-build-box-popup__gifts-grid fd-build-box-popup__drawer-gifts" data-drawer-gifts hidden={!n.gifts.length}>
                          {open ? n.gifts.map((g, i) => <GiftCard key={g.label} gift={g} locked={i >= n.earned} unlocked={i < n.earned} hideCheck showBadge captionNameOnly />) : null}
                        </div>
                      </div>
                      <div className="fd-build-box-popup__drawer-bottom">
                        <div className="fd-build-box-popup__drawer-callout" data-drawer-callout hidden={!headHtml}>{open && headHtml ? calloutBox(headHtml) : null}</div>
                        <div className="fd-build-box-popup__drawer-totals" data-drawer-totals>
                          {open ? (
                            <>
                              <div className="fd-build-box-popup__drawer-line">
                                <span className="fd-build-box-popup__drawer-label">Current Subtotal:</span>
                                <span className="fd-build-box-popup__drawer-value"><span className="fd-build-box-popup__drawer-amount">{money(n.total)}</span>{n.pct > 0 ? <OffBadge pct={n.pct} light /> : null}</span>
                              </div>
                              {n.plusPct || n.plusGift ? (
                                <div className="fd-build-box-popup__drawer-line">
                                  <span className="fd-build-box-popup__drawer-label is-strong">Add 1 More Product:</span>
                                  <span className="fd-build-box-popup__drawer-value is-plus">{n.plusGift ? <><span>Extra Gift</span>{n.plusPct ? <span>+</span> : null}</> : null}{n.plusPct ? <OffBadge pct={n.plusPct} strong /> : null}</span>
                                </div>
                              ) : null}
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
              <div className="fd-build-box-popup__footer-right">
                <button type="button" className={`fd-build-box-popup__checkout${ready ? ' is-ready' : ''}`} data-checkout disabled={!ready} ref={checkoutRef} aria-busy="false" onClick={() => submit()}>
                  <span className="fd-build-box-popup__checkout-spinner" data-checkout-spinner aria-hidden="true" />
                  <span data-checkout-label>{ready ? checkoutText : pop.add_products_text || 'Add Your First Product'}</span>
                  <img className="fd-build-box-popup__checkout-arrow" data-checkout-arrow src={themeAsset('fd-build-box-cta-arrow.svg')} width="30" height="30" alt="" aria-hidden="true" hidden={!ready} />
                </button>
              </div>
            </div>
          </div>

          {drawerMode ? (
            <div className="fd-build-box-popup__sheet" data-sheet hidden={!ui.sheetOpen}>
              <button type="button" className="fd-build-box-popup__sheet-scrim" data-sheet-close tabIndex={-1} aria-label="Add more items" onClick={() => closeSheet()} />
              <div className="fd-build-box-popup__sheet-panel" role="dialog" aria-modal="true" aria-labelledby="fd-bb-sheet-title">
                <div className="fd-build-box-popup__sheet-grabber" aria-hidden="true"><span className="fd-build-box-popup__sheet-grabber-bar" /></div>
                <div className="fd-build-box-popup__sheet-bar">
                  <p className="fd-build-box-popup__sheet-title" id="fd-bb-sheet-title">Don't miss out!</p>
                  <button type="button" className="fd-build-box-popup__back fd-build-box-popup__sheet-close" data-sheet-close aria-label="Close" onClick={() => closeSheet()}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M14.9928 5.14423C15.1851 4.95192 15.4968 4.95192 15.6891 5.14423C15.8814 5.33654 15.8814 5.64826 15.6891 5.84055L11.113 10.4167L15.6891 14.9928C15.8814 15.1851 15.8814 15.4968 15.6891 15.6891C15.4968 15.8814 15.1851 15.8814 14.9928 15.6891L10.4167 11.113L5.84055 15.6891C5.64826 15.8814 5.33654 15.8814 5.14423 15.6891C4.95192 15.4968 4.95192 15.1851 5.14423 14.9928L9.72035 10.4167L5.14423 5.84055C4.95192 5.64825 4.95192 5.33653 5.14423 5.14423C5.33653 4.95192 5.64825 4.95192 5.84055 5.14423L10.4167 9.72035L14.9928 5.14423Z" fill="currentColor" /></svg>
                  </button>
                </div>
                <div className="fd-build-box-popup__sheet-content" data-sheet-content>
                  {ui.sheetOpen && sheetHas ? (
                    <>
                      {n.plusGift ? (
                        <div className="fd-build-box-popup__sheet-gift">
                          <div className="fd-build-box__gift is-unlocked fd-build-box-popup__sheet-tile"><div className="fd-build-box__gift-media">{n.plusGift.image ? <Img src={shopImg(n.plusGift.image)} alt="" width="120" height="120" loading="lazy" /> : null}</div></div>
                          <div className="fd-build-box-popup__sheet-gift-copy">
                            <p className="fd-build-box-popup__sheet-gift-title">Add 1 More Product To Unlock The <strong>Free {giftName(n.plusGift)}</strong></p>
                            <p className="fd-build-box-popup__sheet-gift-price">{giftPriceText(n.plusGift) ? <s>{giftPriceText(n.plusGift)}</s> : null}<strong>FREE</strong></p>
                          </div>
                        </div>
                      ) : null}
                      {n.plusPct ? calloutBox(`Also with 1 more product you unlock <strong class="fd-build-box-popup__sheet-pct">${n.plusPct}% Off</strong> → That's <strong>${money(n.plusSaving)}</strong> in savings!`) : null}
                      <div className="fd-build-box-popup__sheet-lines">
                        <div className="fd-build-box-popup__drawer-line">
                          <span className="fd-build-box-popup__drawer-label">Current Subtotal:</span>
                          <span className="fd-build-box-popup__drawer-value">{n.pct > 0 ? <OffBadge pct={n.pct} light /> : null}<span className="fd-build-box-popup__drawer-amount">{n.saving > 0 ? `Saving ${money(n.saving)}` : money(n.total)}</span></span>
                        </div>
                        {n.plusPct ? (
                          <div className="fd-build-box-popup__drawer-line">
                            <span className="fd-build-box-popup__drawer-label is-strong">Add 1 More Product:</span>
                            <span className="fd-build-box-popup__drawer-value"><OffBadge pct={n.plusPct} strong /><strong className="fd-build-box-popup__sheet-save">Save {money(n.plusSaving)}</strong></span>
                          </div>
                        ) : null}
                      </div>
                    </>
                  ) : null}
                </div>
                <div className="fd-build-box-popup__sheet-actions">
                  <button type="button" className="fd-btn fd-btn--large fd-btn--primary fd-btn-shape--pill fd-build-box-popup__sheet-btn" data-sheet-close data-sheet-primary onClick={() => closeSheet()}>Add More Items</button>
                  <button type="button" className="fd-btn fd-btn--large fd-btn--secondary fd-btn-shape--pill fd-build-box-popup__sheet-btn" data-sheet-continue onClick={() => { closeSheet(true); submit({ skipSheet: true }); }}>Not now</button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </aside>
      <FdInfoModal
        open={!!infoProduct}
        onClose={() => bb.setUi({ info: null })}
        product={infoProduct ? { title: (infoMeta && infoMeta.title) || infoProduct.title, description: infoMeta && infoMeta.description, images: infoImages } : null}
        offer={infoProduct && nextPct != null ? { price: discountedCents(infoProduct.price, nextPct), compare: infoProduct.price } : { price: infoProduct ? infoProduct.price : 0, compare: 0 }}
        onAdd={() => { if (infoProduct) bb.setQty(String(infoProduct.variantId), (Number(st.qty[infoProduct.variantId]) || 0) + 1); }}
      />
    </>
  );
}
