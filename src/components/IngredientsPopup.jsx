import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import '../styles/theme/fd-ingredients-popup.css';
import { useCart } from '../layout/CartContext.jsx';

// "See Ingredients" drawer (snippets/fd-ingredients-popup.liquid + assets/fd-ingredients-popup.js).
// One instance per page: mount <IngredientsPopup /> anywhere; call openIngredients({title,image,html,price,comparePrice}).
let listener = null;
export const openIngredients = (data) => listener && listener(data);

export default function IngredientsPopup() {
  const [data, setData] = useState(null);
  const [mounted, setMounted] = useState(false); // !hidden
  const [open, setOpen] = useState(false); // .is-open
  const [loading, setLoading] = useState(false);
  const timers = useRef([]);
  const cart = useCart();
  const me = useRef(null);

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));

  useEffect(() => {
    me.current = (d) => {
      timers.current.forEach(clearTimeout);
      setData(d);
      setMounted(true);
      setLoading(true);
      requestAnimationFrame(() => setOpen(true));
      document.body.classList.add('fd-ingredients-popup-open');
      later(() => setLoading(false), 220);
    };
    if (!listener) listener = me.current; // first mounted popup owns the global opener
    return () => { if (listener === me.current) listener = null; timers.current.forEach(clearTimeout); document.body.classList.remove('fd-ingredients-popup-open'); };
  }, []);

  const close = () => {
    setOpen(false);
    document.body.classList.remove('fd-ingredients-popup-open');
    later(() => setMounted(false), 360);
  };

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return createPortal(
    <div className={`fd-ingredients-popup${open ? ' is-open' : ''}${loading ? ' is-loading' : ''}`} id="fd-ingredients-popup" hidden={!mounted} aria-hidden={!open}>
      <div className="fd-ingredients-popup__overlay" onClick={close} tabIndex={-1} />
      <aside className="fd-ingredients-popup__panel" role="dialog" aria-modal="true" aria-labelledby="fd-ingredients-popup-title" tabIndex={-1}>
        <header className="fd-ingredients-popup__header">
          <h2 className="fd-ingredients-popup__title" id="fd-ingredients-popup-title">{data?.title}</h2>
          <button type="button" className="fd-ingredients-popup__close" onClick={close} aria-label="Close ingredients">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false"><path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </header>
        <div className="fd-ingredients-popup__body">
          <div className="fd-ingredients-popup__loader" aria-hidden="true">
            <span className="fd-ingredients-popup__spinner" aria-hidden="true" />
            <span className="visually-hidden">Loading ingredients</span>
          </div>
          <div className="fd-ingredients-popup__content">
            <div className="fd-ingredients-popup__image-wrap" hidden={!data?.image}>
              {data?.image && <img className="fd-ingredients-popup__image" src={data.image} alt={data.title || ''} width="1200" height="1200" decoding="async" />}
            </div>
            <div className="fd-ingredients-popup__text">
              <p className="fd-ingredients-popup__label">Ingredients:</p>
              <div className="fd-ingredients-popup__richtext" dangerouslySetInnerHTML={{ __html: data?.html || '<p>Ingredients information coming soon.</p>' }} />
            </div>
          </div>
        </div>
        <footer className="fd-ingredients-popup__footer">
          <button type="button" className="fd-ingredients-popup__atc" aria-label="Add to cart" onClick={() => { close(); cart?.openCart(); }}>
            <span className="fd-ingredients-popup__atc-main">
              <svg className="fd-ingredients-popup__atc-icon" width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false">
                <path d="M11.7254 23.3241C12.7189 23.3241 13.5249 24.1303 13.5249 25.1236C13.5248 26.117 12.7188 26.9218 11.7254 26.9218C10.7322 26.9216 9.92734 26.1169 9.92725 25.1236C9.92725 24.1304 10.7321 23.3243 11.7254 23.3241ZM24.5067 23.3241C25.5001 23.3241 26.3062 24.1303 26.3062 25.1236C26.3061 26.117 25.5001 26.9218 24.5067 26.9218C23.5135 26.9216 22.7086 26.1169 22.7085 25.1236C22.7085 24.1304 23.5134 23.3244 24.5067 23.3241ZM5.3335 4.00253C5.7089 4.00283 6.62762 3.96695 7.4611 4.15617C8.27684 4.34152 9.32895 4.82523 9.47021 6.06893C9.52214 6.52762 9.68769 7.9815 9.8973 9.82154H26.6694C27.1832 9.82178 27.6 10.2388 27.6004 10.7525V17.97C27.6004 18.9364 26.9056 19.7693 25.9494 19.9348C23.0429 20.4376 20.9734 20.6834 18.9312 20.9231C16.8923 21.1624 14.8812 21.3951 12.0705 21.8736C10.9433 22.0653 9.86122 21.2855 9.72933 20.1288C9.3253 16.585 8.29016 7.50367 8.14469 6.21867C8.10378 5.86206 7.83309 5.6073 7.16553 5.45565C6.51535 5.3081 5.78693 5.3362 5.3335 5.33586V4.00253ZM11.0549 19.9778C11.0977 20.3535 11.4532 20.6263 11.8465 20.5598C14.6939 20.0751 16.7344 19.8384 18.7749 19.5989C20.8119 19.3597 22.8524 19.1173 25.7215 18.621C26.0347 18.5668 26.2671 18.2918 26.2671 17.97V11.1549H10.0496C10.4047 14.2706 10.8285 17.9927 11.0549 19.9778Z" fill="white" />
              </svg>
              <span className="fd-ingredients-popup__atc-label">Add To Cart</span>
            </span>
            <span className="fd-ingredients-popup__atc-divider" aria-hidden="true" />
            <span className="fd-ingredients-popup__atc-prices">
              <span className="fd-ingredients-popup__atc-compare" hidden={!data?.comparePrice}>{data?.comparePrice}</span>
              <span className="fd-ingredients-popup__atc-price">{data?.price}</span>
            </span>
          </button>
        </footer>
      </aside>
    </div>,
    document.body
  );
}
