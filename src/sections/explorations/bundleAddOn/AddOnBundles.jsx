import { useState } from 'react';
import { PLUS_SVG, MINUS_SVG, Raw } from '../../FdBuildBox.jsx';
import { customImg } from '../../../lib/assets.js';
import { BUNDLES, MULTI, bundleItems, bundlePrice } from '../../../data/bundleAddOn.js';

// The "stacks" section of the add-on modal: add-ons grouped as bundles, shown BEFORE the individual items. Three ways of showing the same bundles,
// switchable while exploring (?bundles=a|b|c):
//   a  Cards       photo stack, name, benefit, what is inside, price and saving
//   b  Pack tiles  2 x 2 tiles (photo and name open the info modal) and a detail panel of the chosen stack ("What's inside" with a line per product), as in the quiz v2 results
//   c  Cards that open   the same card without the two line text, plus a "What's inside" toggle that opens every product (photo, benefit, price) in place
// Every layout uses what the individual items use: the global bundle builder quantity stepper (round blue buttons) and an info icon that opens the
// info modal of the stack. The modal owns the quantities: a stack sets the quantity of its items, so the steppers of the items below always agree.
const money = (n) => `$${n.toFixed(2)}`;
const infoIcon = customImg('addon/icon-info.svg');

function Stack({ items, size = 48 }) {
  const imgs = [MULTI.image, ...items.map((it) => it.image)];
  const many = imgs.length > 3; // four photos: a bit smaller and more overlapped so the text keeps its room
  // The Multi is in every stack, so what tells the stacks apart are the add-ons: they sit in front and fully visible, the Multi peeks out from behind on the left
  return (
    <span className="aob-stack" style={{ '--aob-size': `${many ? Math.round(size * 0.88) : size}px`, '--aob-overlap': many ? 0.34 : 0.3 }} aria-hidden="true">
      {imgs.map((src, i) => <img key={i} src={src} alt="" style={{ zIndex: i }} />)}
    </span>
  );
}

const Badge = ({ text }) => <span className="fd-build-box-popup__card-badge aob-badge" style={{ '--fd-bb-card-badge-solid': '#ffb511', '--fd-bb-card-badge-fg': '#906300' }}>{text}</span>;
const PriceBlock = ({ b }) => { const p = bundlePrice(b); return <span className="aob-price"><b>+{money(p.now)}</b><s>{money(p.was)}</s></span>; };
const Includes = ({ b }) => <span className="aob-includes">Multi + {bundleItems(b).map((it) => it.title.replace(/^Kids'? /, '')).join(' + ')}</span>;

// the same markup as the stepper of the individual items
function Stepper({ b, qty, onInc, onDec }) {
  return (
    <div className="fd-build-box-popup__stepper aom-qty aob-qty" role="group" aria-label={`${b.name} quantity`}>
      <button type="button" className="fd-build-box-popup__step" aria-label={`Decrease ${b.name}`} disabled={qty === 0} onClick={(e) => { e.stopPropagation(); onDec(b.id); }}><Raw html={MINUS_SVG} style={{ display: 'contents' }} /></button>
      <span className="fd-build-box-popup__qty" aria-live="polite">{qty}</span>
      <button type="button" className="fd-build-box-popup__step" aria-label={`Increase ${b.name}`} onClick={(e) => { e.stopPropagation(); onInc(b.id); }}><Raw html={PLUS_SVG} style={{ display: 'contents' }} /></button>
    </div>
  );
}
const InfoBtn = ({ b, onInfo }) => (
  <button type="button" className="aob-info" aria-label={`Details: ${b.name}`} onClick={(e) => { e.stopPropagation(); onInfo(b); }}><img src={infoIcon} alt="" width="16" height="16" /></button>
);
const InsideList = ({ b, onItemInfo }) => (
  <ul className="aob-inside">
    <li><img src={MULTI.image} alt="" /><span><b>{MULTI.title}</b><em>In your cart</em></span></li>
    {bundleItems(b).map((it) => (
      <li key={it.id} className="aob-open" onClick={() => onItemInfo(it)}>
        <img src={it.image} alt="" />
        <span><b><button type="button" className="aob-name-btn" onClick={(e) => { e.stopPropagation(); onItemInfo(it); }}>{it.title}</button><button type="button" className="aob-info aob-info--item" aria-label={`Product details: ${it.title}`} onClick={(e) => { e.stopPropagation(); onItemInfo(it); }}><img src={infoIcon} alt="" width="16" height="16" /></button></b><em>{it.desc}</em></span>
        <s>{money(it.was)}</s><strong>{money(it.now)}</strong>
      </li>
    ))}
  </ul>
);

/* ---------- A / C: cards (C adds the toggle that opens what is inside) ---------- */
function Row({ b, qty, onInc, onDec, onInfo, pitch = true, children }) {
  const p = bundlePrice(b);
  return (
    <article className={`aob-row${qty > 0 ? ' is-active' : ''}${pitch ? '' : ' aob-row--short'}`}>
      <div className="aob-row__main">
        <span className="aob-open aob-row__media" onClick={() => onInfo(b)}><Stack items={bundleItems(b)} /></span>
        <span className="aob-row__body aob-open" onClick={() => onInfo(b)}>
          <span className="aob-row__name"><button type="button" className="aob-name-btn" onClick={(e) => { e.stopPropagation(); onInfo(b); }}>{b.name}</button><InfoBtn b={b} onInfo={onInfo} /></span>
          <Includes b={b} />
        </span>
        {pitch && <p className="aob-row__pitch aob-open" onClick={() => onInfo(b)}>{b.pitch}</p>}
        <span className="aob-row__side"><PriceBlock b={b} /><span className="aob-save">Save {money(p.was - p.now)}</span></span>
        <Stepper b={b} qty={qty} onInc={onInc} onDec={onDec} />
      </div>
      {children}
      {b.badge && <Badge text={b.badge} />}
    </article>
  );
}

function VariantA({ qtyOf, ...h }) {
  return <div className="aob-list">{BUNDLES.map((b) => <Row key={b.id} b={b} qty={qtyOf(b.id)} {...h} />)}</div>;
}

function VariantC({ qtyOf, onItemInfo, ...h }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="aob-list">
      {BUNDLES.map((b) => {
        const isOpen = open === b.id;
        return (
          <Row key={b.id} b={b} qty={qtyOf(b.id)} pitch={false} {...h}>
            <button type="button" className={`aob-toggle${isOpen ? ' is-open' : ''}`} aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : b.id)}>What&apos;s Inside<i aria-hidden="true" /></button>
            <div className={`aob-acc__panel${isOpen ? ' is-open' : ''}`} aria-hidden={!isOpen}>
              <div className="aob-acc__inner">
                <p className="aob-detail__body">{b.body}</p>
                <InsideList b={b} onItemInfo={onItemInfo} />
              </div>
            </div>
          </Row>
        );
      })}
    </div>
  );
}

/* ---------- B: pack tiles + detail panel ---------- */
function VariantB({ qtyOf, onInc, onDec, onInfo, onItemInfo }) {
  // the tile opens the info modal, a stack is only chosen (and highlighted) with the stepper; the panel below shows the chosen stack
  const sel = BUNDLES.find((b) => qtyOf(b.id) > 0);
  return (
    <div className="aob-packs">
      <div className="aob-tiles">
        {BUNDLES.map((b) => {
          const p = bundlePrice(b);
          const qty = qtyOf(b.id);
          return (
            <article key={b.id} className={`aob-tile aob-open${qty > 0 ? ' is-active' : ''}`} onClick={() => onInfo(b)}>
              {b.badge && <Badge text={b.badge} />}
              <InfoBtn b={b} onInfo={onInfo} />
              <Stack items={bundleItems(b)} size={bundleItems(b).length > 2 ? 40 : 44} />
              <span className="aob-tile__name"><button type="button" className="aob-name-btn" onClick={(e) => { e.stopPropagation(); onInfo(b); }}>{b.name}</button></span>
              <span className="aob-tile__price">+{money(p.now)}</span>
              <span className="aob-save">Save {money(p.was - p.now)}</span>
              <Stepper b={b} qty={qty} onInc={onInc} onDec={onDec} />
            </article>
          );
        })}
      </div>
      <div className={`aob-detail${sel ? '' : ' is-empty'}`}>
        {sel ? (
          <>
            <div className="aob-detail__head"><h3><button type="button" className="aob-name-btn" onClick={() => onInfo(sel)}>{sel.name}</button><InfoBtn b={sel} onInfo={onInfo} /></h3><PriceBlock b={sel} /></div>
            <p className="aob-detail__body aob-open" onClick={() => onInfo(sel)}>{sel.body}</p>
            <ul className="aob-chips" aria-label="Supports">{sel.supports.map((s) => <li key={s}>{s}</li>)}</ul>
            <p className="aob-detail__label">What&apos;s Inside</p>
            <InsideList b={sel} onItemInfo={onItemInfo} />
          </>
        ) : <p className="aob-detail__hint">Add a stack to see what is inside.</p>}
      </div>
    </div>
  );
}

export default function AddOnBundles({ variant = 'a', ...props }) {
  const V = { a: VariantA, b: VariantB, c: VariantC }[variant] || VariantA;
  return <V {...props} />;
}
