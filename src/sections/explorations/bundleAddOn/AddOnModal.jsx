import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import FdInfoModal from '../../../components/FdInfoModal.jsx';
import GiftProgressV2 from '../../../components/GiftProgressV2.jsx';
import { GIFT } from '../../../data/cart.js';
import { PLUS_SVG, MINUS_SVG, Raw } from '../../FdBuildBox.jsx';
import '../../../layout/styles/fd-tabs-v3.css';
import '../../../styles/theme/fd-button.css';
import { customImg } from '../../../lib/assets.js';
import { TABS, BUNDLES, CORE_IDS, bundleTabs } from '../../../data/bundleAddOn.js';
import AddOnBundles from './AddOnBundles.jsx';
import './addOnModal.css';
import './addOnBundles.css';

// The new add-on modal of the exploration /explorations/bundle-add-on. Built from the Figma file "Internal Drafts", page "Add-on Popup" (node 1793:38):
// desktop = a 500 px modal over a black 75% overlay, mobile (below 750 px) = a full page modal with no side margin (the design annotation says
// "Let's move to a full Page Modal"). Same trigger as the current upsell dialog: the buy box button "Add To Cart & View Gift".
//   subtotalCents  what the shopper is adding from the buy box (drives the free gift progress)
//   onContinue(addons)  "No, Thanks. Continue" (addons = [])  or  "Add To Cart" (addons chosen)
//   onClose()  Escape or a click on the overlay: closes without adding anything
const A = (f) => customImg(`addon/${f}`);
const money = (n) => `$${n.toFixed(2)}`;

function Card({ it, qty, setQty, onInfo }) {
  return (
    <article className={`aom-card${qty > 0 ? ' is-active' : ''}`}>
      <div className="aom-card__row">
        <div className="aom-card__media aom-open" onClick={() => onInfo(it)}>
          <img className="aom-card__img" src={it.image} alt="" loading="lazy" />
          <button type="button" className="aom-card__info" aria-label={`Product details: ${it.title}`} onClick={(e) => { e.stopPropagation(); onInfo(it); }}><img src={A('icon-info.svg')} alt="" width="16" height="16" /></button>
        </div>
        <div className="aom-card__info-col aom-open" onClick={() => onInfo(it)}>
          <p className="aom-card__name"><button type="button" className="aom-card__name-btn" onClick={(e) => { e.stopPropagation(); onInfo(it); }}>{it.title}</button></p>
          <p className="aom-card__desc">{it.desc}</p>
          <p className="aom-card__prices"><s>{money(it.was)}</s><b>{money(it.now)}</b></p>
        </div>
        <div className="fd-build-box-popup__stepper aom-qty" role="group" aria-label={`${it.title} quantity`}>
          <button type="button" className="fd-build-box-popup__step" aria-label={`Decrease ${it.title}`} disabled={qty === 0} onClick={() => setQty(it.id, qty - 1)}><Raw html={MINUS_SVG} style={{ display: 'contents' }} /></button>
          <span className="fd-build-box-popup__qty" aria-live="polite">{qty}</span>
          <button type="button" className="fd-build-box-popup__step" aria-label={`Increase ${it.title}`} onClick={() => setQty(it.id, qty + 1)}><Raw html={PLUS_SVG} style={{ display: 'contents' }} /></button>
        </div>
      </div>
      {it.badge && <span className="fd-build-box-popup__card-badge aom-card__badge" style={{ '--fd-bb-card-badge-solid': it.badge.solid, '--fd-bb-card-badge-fg': it.badge.fg }}>{it.badge.text}</span>}
    </article>
  );
}

export default function AddOnModal({ open, subtotalCents = 0, onContinue, onClose }) {
  const [tab, setTab] = useState('teens');
  const [qty, setQtyState] = useState({});
  const [info, setInfo] = useState(null);
  const [bundleInfo, setBundleInfo] = useState(null);
  const [giftInfo, setGiftInfo] = useState(false);
  // exploration switch: three layouts for the bundles section (?bundles=a|b|c)
  const [variant, setVariant] = useState(() => (new URLSearchParams(window.location.search).get('bundles') || 'a'));
  const pickVariant = (v) => { setVariant(v); const u = new URL(window.location.href); u.searchParams.set('bundles', v); window.history.replaceState(null, '', u); };
  const bodyRef = useRef(null);
  const primaryRef = useRef(null);

  const all = useMemo(() => TABS.flatMap((t) => t.items), []);
  const setQty = (id, n) => setQtyState((q) => ({ ...q, [id]: Math.max(0, Math.min(9, n)) }));
  const chosen = all.filter((it) => (qty[it.id] || 0) > 0).map((it) => ({ ...it, qty: qty[it.id] }));
  const addOnTotal = chosen.reduce((t, it) => t + it.now * it.qty, 0);
  const totalCents = subtotalCents + Math.round(addOnTotal * 100); // the cart gift progress counts cents
  // a stack is active when exactly its items are chosen among the stack products; picking it sets those items to 1 and the others to 0, picking it again clears them
  const coreOn = CORE_IDS.filter((id) => (qty[id] || 0) > 0);
  const active = (BUNDLES.find((b) => b.items.length === coreOn.length && b.items.every((id) => coreOn.includes(id))) || {}).id || null;
  // a stack has a quantity like any item: its items go up and down together. Another stack replaces the current one (the items below stay in step)
  const bundleQty = (id) => (id === active ? Math.min(...BUNDLES.find((b) => b.id === id).items.map((c) => qty[c] || 0)) : 0);
  const incBundle = (id) => {
    const b = BUNDLES.find((x) => x.id === id);
    setQtyState((q) => { const n = { ...q }; CORE_IDS.forEach((c) => { n[c] = b.items.includes(c) ? (id === active ? Math.min(9, (q[c] || 0) + 1) : 1) : 0; }); return n; });
  };
  const decBundle = (id) => {
    if (id !== active) return;
    const b = BUNDLES.find((x) => x.id === id);
    setQtyState((q) => { const n = { ...q }; b.items.forEach((c) => { n[c] = Math.max(0, (q[c] || 0) - 1); }); return n; });
  };
  const items = (TABS.find((t) => t.id === tab) || TABS[0]).items;

  useEffect(() => { if (open) { setQtyState({}); setTab('teens'); } }, [open]);
  useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = 0; }, [tab]);
  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape' && !info && !giftInfo && !bundleInfo) onClose(); };
    window.addEventListener('keydown', onKey);
    const t = setTimeout(() => primaryRef.current && primaryRef.current.focus({ preventScroll: true }), 50);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); clearTimeout(t); };
  }, [open, info, giftInfo, bundleInfo, onClose]);

  if (!open) return null;
  return createPortal(
    <div className="aom" role="presentation">
      <div className="aom__overlay" onClick={onClose} />
      <section className="aom__dialog" role="dialog" aria-modal="true" aria-labelledby="aom-title">
        <div className="aom__body" ref={bodyRef}>
          <h2 className="aom__title" id="aom-title">
            <span className="aom__title--desk">⚡️ Maximize Your Savings with These Deals ⚡</span>
            <span className="aom__title--mob">Maximize Your Savings with These Deals ⚡</span>
          </h2>

          {/* gift progress v2 (the cart keeps v1): starts collapsed, the arrow reveals the gift card */}
          <div className="aom-gwp"><GiftProgressV2 total={totalCents} threshold={GIFT.threshold} giftValue={GIFT.value} onMoreInfo={() => setGiftInfo(true)} /></div>

          <section className="aom-bundles" aria-label="Stacks">
            <h3 className="aom-h">Complete The Routine<small>Add a stack to your Kids&apos; Multivitamin and save.</small></h3>
            <AddOnBundles variant={variant} qtyOf={bundleQty} onInc={incBundle} onDec={decBundle} onInfo={setBundleInfo} onItemInfo={setInfo} />
          </section>

          <h3 className="aom-h aom-divider">Or Shop For The Family</h3>

          <div className="fd-tabs-v3 fd-tabs-v3--small aom-tabs" role="tablist" aria-label="Shop add-ons by audience">
            {TABS.map((t) => (
              <button key={t.id} type="button" role="tab" aria-selected={t.id === tab} className={`fd-tabs-v3__item${t.id === tab ? ' fd-tabs-v3__item--active' : ''}`} onClick={() => setTab(t.id)}>{t.label}</button>
            ))}
          </div>

          {items.map((it) => <Card key={it.id} it={it} qty={qty[it.id] || 0} setQty={setQty} onInfo={setInfo} />)}
        </div>

        <footer className="aom__cta">
          <button type="button" className="fd-btn fd-btn--large fd-btn--primary fd-btn-shape--pill aom__primary" ref={primaryRef} onClick={() => onContinue(chosen)}>
            <span className="fd-btn-text">Add To Cart</span><img src={A('icon-arrow.svg')} alt="" width="24" height="24" />
          </button>
          <button type="button" className="fd-btn fd-btn--medium fd-btn--ghost fd-btn-shape--pill aom__secondary" onClick={() => onContinue([])}>
            <span className="fd-btn-text">No, Thanks. Continue</span>
          </button>
        </footer>
      </section>

      <div className="aom-proto" role="group" aria-label="Prototype: bundle layout">Bundle layout{['a', 'b', 'c'].map((v) => <button key={v} type="button" className={variant === v ? 'is-on' : ''} onClick={() => pickVariant(v)}>{v.toUpperCase()}</button>)}</div>
      <FdInfoModal motion="up" open={!!info} onClose={() => setInfo(null)}
        product={info ? { title: info.title, description: info.infoHtml, images: [info.image] } : null}
        offer={info ? { price: Math.round(info.now * 100), compare: Math.round(info.was * 100) } : null}
        onAdd={() => { if (info) { setQty(info.id, (qty[info.id] || 0) + 1); } setInfo(null); }} addLabel="Add to my order" />
      <FdInfoModal motion="up" open={!!bundleInfo} onClose={() => setBundleInfo(null)} defaultTab={1}
        tabs={bundleInfo ? bundleTabs(bundleInfo) : null}
        footer={bundleInfo ? { label: `Add ${bundleInfo.name} to my order`, onClick: () => incBundle(bundleInfo.id) } : null} />
      <FdInfoModal motion="up" open={giftInfo} onClose={() => setGiftInfo(false)} product={{ title: GIFT.title, description: `<p>${GIFT.description}</p>`, images: [GIFT.image] }} offer={{ price: 0, compare: GIFT.value * 100 }} />
    </div>,
    document.body,
  );
}
