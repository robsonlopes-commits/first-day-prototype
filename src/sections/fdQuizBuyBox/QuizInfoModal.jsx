import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Img from '../../components/Img.jsx';
import { config, shownFor, packOffer } from './quizLogic.js';
import { PRODUCT_INFO } from '../../data/bundleBuilder.js';
import '../../components/fdInfoModal.css';

// MODAL state of the quiz: window.FDInfoModal (snippets/info-modal.liquid), slide-in drawer on desktop / bottom sheet on mobile.
//   request = { type: 'pack', bundle: handle, contents }  -> opened by the (i) button on a pack card: product tabs + "Choose the 2 Pack" footer
//            { type: 'product', handle }                    -> opened by "Learn more" in "Meet the products": single product, no tabs, no footer
// States: open/close slide, "Loading…" first paint, gallery (arrows, dots, thumbs), tab switch. Product data = PRODUCT_INFO (the /products/<handle>.js payload).
const usd = (cents) => `$${(cents / 100).toFixed(2)}`;
const fill = (tpl, map) => Object.entries(map).reduce((t, [k, v]) => t.replace(`{${k}}`, v), tpl);

function Gallery({ images, title }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const goTo = (i) => { const t = trackRef.current; const slide = t && t.children[i]; if (slide) t.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' }); };
  const multi = images.length > 1;
  return (
    <>
      <div className="fd-info-modal__gallery">
        <div className="fd-info-modal__track" ref={trackRef} onScroll={(e) => setActive(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}>
          {images.map((src, i) => <figure className="fd-info-modal__slide" key={src + i}><Img src={src} alt={title} loading="lazy" /></figure>)}
        </div>
        {multi && <>
          <button type="button" className="fd-info-modal__nav fd-info-modal__nav--prev" aria-label="Previous" onClick={() => goTo(Math.max(0, active - 1))}>‹</button>
          <button type="button" className="fd-info-modal__nav fd-info-modal__nav--next" aria-label="Next" onClick={() => goTo(Math.min(images.length - 1, active + 1))}>›</button>
          <div className="fd-info-modal__dots">{images.map((_, i) => <button key={i} type="button" className="fd-info-modal__dot" aria-current={i === active} aria-label={`Slide ${i + 1}`} onClick={() => goTo(i)} />)}</div>
        </>}
      </div>
      {multi && <div className="fd-info-modal__thumbs">{images.map((src, i) => <button key={src + i} type="button" className="fd-info-modal__thumb" aria-current={i === active} onClick={() => goTo(i)}><Img src={src} alt="" loading="lazy" /></button>)}</div>}
    </>
  );
}

function ModalProduct({ handle, title, offer }) {
  const info = PRODUCT_INFO[handle];
  const priceCents = offer && offer.price > 0 ? offer.price : info.price;
  const compareCents = offer && offer.price > 0 ? offer.compare : info.compare;
  return (
    <div className="fd-info-modal__product">
      <Gallery images={info.images} title={title} />
      <div className="fd-info-modal__body">
        <h3 className="fd-info-modal__title">{title}</h3>
        <div className="fd-info-modal__price">
          <span className="fd-info-modal__price-current">{usd(priceCents)}</span>
          {compareCents > priceCents && <span className="fd-info-modal__price-compare"><s>{usd(compareCents)}</s></span>}
          {offer && offer.plan && <span className="fd-info-modal__price-plan">{offer.plan}</span>}
        </div>
        <div className="fd-info-modal__description rte" dangerouslySetInnerHTML={{ __html: info.description }} />
      </div>
    </div>
  );
}

export default function QuizInfoModal({ s, request, onClose, onChoose }) {
  const [state, setState] = useState('closed'); // 'closed' | 'open' (drives the slide transition)
  const [mounted, setMounted] = useState(null); // last request, kept while the closing transition runs
  const [activeHandle, setActiveHandle] = useState('');
  const [loading, setLoading] = useState(false);
  const closeRef = useRef(null);
  const seen = useRef({});

  useEffect(() => {
    if (request) {
      setMounted(request);
      setActiveHandle(request.type === 'pack' ? shownFor(config.bundles.find((b) => b.handle === request.bundle), request.contents)[0]?.handle : request.handle);
      const raf = requestAnimationFrame(() => setState('open'));
      return () => cancelAnimationFrame(raf);
    }
    setState('closed');
    const t = setTimeout(() => setMounted(null), 350);
    return () => clearTimeout(t);
  }, [request]);

  useEffect(() => { // "Loading…" while a product payload is fetched the first time (cached afterwards, like FDInfoModal)
    if (!mounted || !activeHandle || seen.current[activeHandle]) { setLoading(false); return undefined; }
    setLoading(true);
    const t = setTimeout(() => { seen.current[activeHandle] = true; setLoading(false); }, 450);
    return () => clearTimeout(t);
  }, [mounted, activeHandle]);

  useEffect(() => {
    if (state !== 'open') return undefined;
    document.body.classList.add('fd-info-modal-open');
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => { document.body.classList.remove('fd-info-modal-open'); document.removeEventListener('keydown', onKey); };
  }, [state, onClose]);

  if (!mounted) return null;
  const isPack = mounted.type === 'pack';
  const bundle = isPack ? config.bundles.find((b) => b.handle === mounted.bundle) : null;
  const shown = isPack ? shownFor(bundle, mounted.contents) : [];
  const offer = isPack ? packOffer(bundle, shown, s) : null;
  const product = config.catalog.find((p) => p.handle === activeHandle);
  const hasTabs = isPack && shown.length > 1;
  const footerLabel = isPack ? fill(s.choose_pack_label, { pack: bundle.title }) : '';

  return createPortal(
    <div id="fd-info-modal" role="dialog" aria-modal="true" aria-hidden={state !== 'open'} data-state={state} className={`${hasTabs ? 'has-tabs ' : ''}${isPack ? 'has-footer' : ''}`.trim()} aria-label={product ? `${product.title} information` : undefined}>
      <div className="fd-info-modal__overlay" onClick={onClose} tabIndex={-1} />
      <div className="fd-info-modal__panel" role="document">
        <span className="fd-info-modal__grabber" aria-hidden="true" />
        <div className="fd-info-modal__head">
          {hasTabs && (
            <div className="fd-info-modal__tabs" role="tablist">
              {shown.map((p) => (
                <button key={p.handle} type="button" className="fd-info-modal__tab" role="tab" aria-selected={p.handle === activeHandle} tabIndex={p.handle === activeHandle ? 0 : -1} onClick={() => setActiveHandle(p.handle)}><span>{p.tabLabel}</span></button>
              ))}
            </div>
          )}
          <button type="button" className="fd-info-modal__close" aria-label="Close" ref={closeRef} onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
        </div>
        <div className="fd-info-modal__content">
          {loading || !product ? <div className="fd-info-modal__loading">Loading…</div> : <ModalProduct key={activeHandle} handle={activeHandle} title={product.title} offer={offer} />}
        </div>
        {isPack && (
          <div className="fd-info-modal__footer">
            <button type="button" className="fd-info-modal__choose" onClick={() => onChoose(bundle.handle)}>{footerLabel}</button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
