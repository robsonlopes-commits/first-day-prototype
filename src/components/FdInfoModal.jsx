import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Img from './Img.jsx';
import './fdInfoModal.css';

// snippets/info-modal.liquid (window.FDInfoModal): reusable product "info" panel, slide-in from the right on desktop / slide-up on mobile.
// The theme fetches /products/<handle>.js on open; here the caller passes the product data:
//   product = { title, description (HTML), images: [url] },  offer = { price, compare } in cents,  onAdd() -> "Add to cart" action.
// Rendered in a portal on <body> (#fd-info-modal) like the theme shell; Escape / overlay / X close it.
const MAX_IMAGES = 6;
const money = (cents) => `$${((Number(cents) || 0) / 100).toFixed(2)}`;

export default function FdInfoModal({ open, onClose, product, offer, onAdd, addLabel = 'Add to cart' }) {
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState('closed');
  const [index, setIndex] = useState(0);
  const last = useRef(null);
  const lastOffer = useRef(null);
  const trackRef = useRef(null);
  const closeRef = useRef(null);
  if (product) { last.current = product; lastOffer.current = offer; }

  useEffect(() => {
    if (open) {
      setMounted(true); setIndex(0);
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setState('open')));
      return () => cancelAnimationFrame(raf);
    }
    setState('closed');
    const t = setTimeout(() => setMounted(false), 320);
    return () => clearTimeout(t);
  }, [open]);
  useEffect(() => {
    document.body.classList.toggle('fd-info-modal-open', open);
    if (open && state === 'open' && closeRef.current) closeRef.current.focus({ preventScroll: true });
    return () => document.body.classList.remove('fd-info-modal-open');
  }, [open, state]);
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); onClose(); } };
    document.addEventListener('keydown', onKey, true);
    return () => document.removeEventListener('keydown', onKey, true);
  }, [open, onClose]);
  useEffect(() => { if (trackRef.current) trackRef.current.scrollLeft = 0; }, [product && product.title]);

  const p = product || last.current;
  if (!mounted || !p) return null;
  const images = (p.images || []).slice(0, MAX_IMAGES);
  const multi = images.length > 1;
  const goTo = (i) => {
    const track = trackRef.current; const slide = track && track.children[i];
    if (slide) track.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' });
  };
  const onScroll = () => { const t = trackRef.current; if (t && t.clientWidth) setIndex(Math.round(t.scrollLeft / t.clientWidth)); };
  const shownOffer = product ? offer : lastOffer.current; // keep the last values while the panel slides out
  const hasCompare = shownOffer && shownOffer.compare && shownOffer.compare > shownOffer.price;

  return createPortal(
    <div id="fd-info-modal" role="dialog" aria-modal="true" aria-hidden={!open} data-state={state} aria-label={`${p.title} information`}>
      <div className="fd-info-modal__overlay" data-fd-info-modal-close tabIndex={-1} onClick={onClose} />
      <div className="fd-info-modal__panel" role="document">
        <span className="fd-info-modal__grabber" aria-hidden="true" />
        <div className="fd-info-modal__head">
          <div className="fd-info-modal__tabs" role="tablist" hidden />
          <button type="button" className="fd-info-modal__close" ref={closeRef} aria-label="Close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
        </div>
        <div className="fd-info-modal__content">
          <div className="fd-info-modal__product">
            <div className="fd-info-modal__gallery">
              <div className="fd-info-modal__track" ref={trackRef} onScroll={onScroll}>
                {images.map((src, i) => <figure key={src} className="fd-info-modal__slide"><Img src={src} alt={p.title} loading={i ? 'lazy' : 'eager'} /></figure>)}
              </div>
              {multi ? (
                <>
                  <button type="button" className="fd-info-modal__nav fd-info-modal__nav--prev" aria-label="Previous" onClick={() => goTo(Math.max(0, index - 1))}>‹</button>
                  <button type="button" className="fd-info-modal__nav fd-info-modal__nav--next" aria-label="Next" onClick={() => goTo(Math.min(images.length - 1, index + 1))}>›</button>
                  <div className="fd-info-modal__dots">
                    {images.map((src, i) => <button key={src} type="button" className="fd-info-modal__dot" aria-label={`Slide ${i + 1}`} aria-current={i === index} onClick={() => goTo(i)} />)}
                  </div>
                </>
              ) : null}
            </div>
            {multi ? (
              <div className="fd-info-modal__thumbs">
                {images.map((src, i) => <button key={src} type="button" className="fd-info-modal__thumb" aria-current={i === index} onClick={() => goTo(i)}><Img src={src} alt="" loading="lazy" /></button>)}
              </div>
            ) : null}
            <div className="fd-info-modal__body">
              <h3 className="fd-info-modal__title">{p.title}</h3>
              {shownOffer ? (
                <div className="fd-info-modal__price">
                  <span className="fd-info-modal__price-current">{money(shownOffer.price)}</span>
                  {hasCompare ? <span className="fd-info-modal__price-compare"><s>{money(shownOffer.compare)}</s></span> : null}
                </div>
              ) : null}
              {p.description ? <div className="fd-info-modal__description rte" dangerouslySetInnerHTML={{ __html: p.description }} /> : null}
              {onAdd ? (
                <div className="fd-info-modal__actions">
                  <button type="button" className="PBFCM-PDP-cart-summary__button fd-info-modal__add" onClick={() => { onAdd(); onClose(); }}>
                    <strong className="PBFCM-PDP-cart-summary__button-text">{addLabel}</strong>
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="fd-info-modal__footer" hidden />
      </div>
    </div>,
    document.body,
  );
}
