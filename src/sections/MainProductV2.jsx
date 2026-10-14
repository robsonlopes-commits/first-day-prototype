import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Img from '../components/Img.jsx';
import { openIngredients } from '../components/IngredientsPopup.jsx';
import { getIngredients } from '../data/ingredients.js';
import { useCart } from '../layout/CartContext.jsx';
import FrontrowBadge from './FrontrowBadge.jsx';
import { JudgeMePreviewBadge } from './JudgeMeReviewWidget.jsx';
import {
  SECTION_ID, PRODUCT, DEMOGRAPHIC_TABS, BENEFIT_ACCORDION, PURCHASE, SAVINGS_DISPLAY, USP_IMAGES, COLLAPSIBLE_TABS, CROSSLINKS,
} from '../data/pdpNew.js';
import '../styles/theme/fd-tabs-v3.css';
import '../styles/theme/fd-button.css';
import '../styles/theme/PBFCM-PDP-styles.css';
import './mainProductV2.css';

// sections/main-product.liquid as configured in templates/product.uniified-default-v2.json (22 blocks, 16 enabled).
// Separate implementation from the legacy PDP on purpose. Behaviour re-implemented from PBFCM-PDP-controller.js (frequency/quantity/
// breakdown), PBFCM-PDP-product-gallery.liquid (Swiper gallery) and savings-display.liquid.
const money = (n) => `$${n.toFixed(2)}`;
const PRODUCT_TITLE = PRODUCT.title;

/* ---------- icons ---------- */
const ICONS = {
  apple: 'M10.6616 1.84311C11.4997 0.994336 12.5829 0.555929 13.3364 0.406304C13.4671 0.380359 13.6027 0.407635 13.7132 0.48208C13.8237 0.556525 13.8999 0.671982 13.9249 0.802834C14.2685 2.59987 13.7042 3.90202 12.8265 4.77303C11.9732 5.61989 10.8528 6.03394 10.0739 6.16284C9.94237 6.1846 9.80763 6.15297 9.69957 6.07495C9.59151 5.99694 9.51906 5.87901 9.49832 5.74735C9.22227 3.99494 9.8034 2.71219 10.6616 1.84311ZM10.4322 5.05051C10.9838 4.87866 11.6201 4.56143 12.1221 4.06324C12.6862 3.5034 13.1028 2.69625 13.0153 1.52987C12.4847 1.71504 11.8688 2.04373 11.3731 2.54573C10.8104 3.1156 10.3882 3.92035 10.4322 5.05051Z M6.74466 1.36403C6.82081 1.09859 7.09771 0.945143 7.36315 1.02129C8.4313 1.32771 10.4241 2.68991 10.4999 5.68393C10.5069 5.95998 10.2888 6.18943 10.0127 6.19643C9.73668 6.20342 9.50723 5.9853 9.50024 5.70925C9.43732 3.22559 7.81131 2.19019 7.0874 1.98252C6.82196 1.90637 6.66851 1.62947 6.74466 1.36403Z M5.7976 5.51618C5.08273 5.80325 4.40428 6.33518 3.91474 6.94951C3.01446 8.0793 2.53613 9.47907 2.53613 11.1986C2.53613 14.3276 4.3809 16.9669 7.07997 18.0835C7.41131 18.2206 7.75875 18.2099 8.22329 18.1348C8.32226 18.1188 8.42919 18.0991 8.54253 18.0782C8.92684 18.0074 9.38491 17.923 9.85684 17.923C10.3302 17.923 10.8107 18.007 11.2255 18.0795C11.3576 18.1026 11.4831 18.1246 11.5995 18.1422C12.1188 18.2211 12.517 18.2314 12.872 18.0838C15.6049 16.9478 17.4589 14.3 17.4639 11.2113C17.3883 9.75258 17.1668 8.70553 16.7428 7.88888C16.3278 7.08972 15.6964 6.46856 14.717 5.90109C13.9224 5.57109 13.3583 5.45194 12.9406 5.4387C12.5294 5.42567 12.2379 5.51434 11.9817 5.63936C11.8475 5.70489 11.72 5.78185 11.5797 5.86982C11.5575 5.8837 11.5348 5.89804 11.5115 5.91271C11.3938 5.98697 11.2627 6.06966 11.1279 6.14411C10.7884 6.3316 10.3877 6.48938 9.85684 6.48938C9.22764 6.48938 8.83995 6.29877 8.52175 6.04985C8.44189 5.98738 8.34486 5.90226 8.26392 5.83126C8.22148 5.79404 8.18347 5.76069 8.15468 5.73653C8.04777 5.64681 7.94466 5.57121 7.8199 5.50793C7.21536 5.2013 6.5101 5.23007 5.7976 5.51618ZM5.42495 4.58821C6.32089 4.22843 7.33981 4.14315 8.27225 4.61609C8.4901 4.72659 8.65843 4.8538 8.79753 4.97054C8.86924 5.03072 8.92077 5.07647 8.96623 5.11683C9.02365 5.16781 9.07139 5.2102 9.13788 5.26221C9.30136 5.39009 9.47644 5.48938 9.85684 5.48938C10.1679 5.48938 10.4012 5.4031 10.6445 5.26872C10.7515 5.20961 10.8536 5.14531 10.9708 5.07145C10.9959 5.05563 11.0217 5.03937 11.0484 5.02262C11.1936 4.93153 11.3585 4.83076 11.5431 4.74067C11.9247 4.55444 12.3768 4.42033 12.9722 4.4392C13.556 4.4577 14.2527 4.62242 15.1322 4.99079L15.1611 5.00288L15.1882 5.01846C16.3065 5.66113 17.1032 6.41295 17.6303 7.42805C18.1508 8.43058 18.3851 9.64589 18.4633 11.173L18.4639 11.1858V11.1986C18.4639 14.7063 16.3566 17.7183 13.2559 19.0072C12.6339 19.2658 12.0024 19.2149 11.4494 19.1309C11.2863 19.1061 11.1317 19.0792 10.9824 19.0532C10.5912 18.9849 10.2359 18.923 9.85684 18.923C9.48487 18.923 9.15235 18.984 8.78723 19.0509C8.65765 19.0747 8.52396 19.0992 8.38294 19.122C7.87454 19.2042 7.29552 19.2549 6.69769 19.0075C3.6271 17.7372 1.53613 14.7348 1.53613 11.1986C1.53613 9.28002 2.07513 7.65346 3.13268 6.32632C3.71714 5.59286 4.53139 4.94704 5.42495 4.58821Z',
  clipboard: 'M6.31104 9.13574C6.31104 8.99767 6.42296 8.88574 6.56104 8.88574H13.7464C13.8844 8.88574 13.9964 8.99767 13.9964 9.13574C13.9964 9.27381 13.8844 9.38574 13.7464 9.38574H6.56104C6.42296 9.38574 6.31104 9.27381 6.31104 9.13574Z M6.31104 14.0544C6.31104 13.9164 6.42296 13.8044 6.56104 13.8044H13.439C13.577 13.8044 13.689 13.9164 13.689 14.0544C13.689 14.1925 13.577 14.3044 13.439 14.3044H6.56104C6.42296 14.3044 6.31104 14.1925 6.31104 14.0544Z M6.92587 11.5952C6.92587 11.4571 7.0378 11.3452 7.17587 11.3452H12.8241C12.9622 11.3452 13.0741 11.4571 13.0741 11.5952C13.0741 11.7333 12.9622 11.8452 12.8241 11.8452H7.17587C7.0378 11.8452 6.92587 11.7333 6.92587 11.5952Z M5.19623 1.77832C5.19623 0.949892 5.8678 0.27832 6.69623 0.27832H13.3038C14.1322 0.27832 14.8038 0.949893 14.8038 1.77832V3.46728C14.8038 4.29571 14.1322 4.96728 13.3038 4.96728H6.69623C5.8678 4.96728 5.19623 4.29571 5.19623 3.46728V1.77832ZM6.69623 1.27832C6.42009 1.27832 6.19623 1.50218 6.19623 1.77832V3.46728C6.19623 3.74342 6.42009 3.96728 6.69623 3.96728H13.3038C13.5799 3.96728 13.8038 3.74342 13.8038 3.46728V1.77832C13.8038 1.50218 13.5799 1.27832 13.3038 1.27832H6.69623Z M3.73691 2.50806V18.7232H16.2631V2.50806H14.4981V1.50806H16.2631C16.8154 1.50806 17.2631 1.95577 17.2631 2.50806V18.7232C17.2631 19.2755 16.8154 19.7232 16.2631 19.7232H3.73691C3.18462 19.7232 2.73691 19.2755 2.73691 18.7232V2.50806C2.73691 1.95577 3.18462 1.50806 3.73691 1.50806H5.75974V2.50806L3.73691 2.50806Z',
  return: 'M11.571 1.05882C11.571 0.750194 11.8198 0.5 12.1266 0.5H13.4572C17.0692 0.5 20 3.45304 20 7.08924C20 10.7255 17.0692 13.6785 13.4572 13.6785L1.89992 13.7105L1.30855 13.1197L1.89992 12.5484L13.4572 12.5608C16.4541 12.5608 18.8889 10.1096 18.8889 7.08924C18.8889 4.06891 16.4541 1.61765 13.4572 1.61765H12.1266C11.8198 1.61765 11.571 1.36745 11.571 1.05882Z M6.00311 7.00677C6.22317 6.7917 6.57489 6.79679 6.78871 7.01815C7.00252 7.2395 6.99746 7.59329 6.7774 7.80836L6.00311 7.00677ZM1.30855 13.1197L6.73968 18.5463C6.9565 18.7647 6.95627 19.1185 6.73917 19.3366C6.52207 19.5547 6.17031 19.5544 5.9535 19.3361L0.162462 13.5034C0.0572388 13.3974 -0.00128425 13.2533 2.13868e-05 13.1036C0.00132703 12.9538 0.0623521 12.8108 0.169407 12.7067C0.3269 12.5535 1.78474 11.1291 3.20439 9.74186L6.00311 7.00677L6.7774 7.80836L3.97862 10.5435C2.95441 11.5444 1.8705 12.5709 1.30855 13.1197Z',
};
const AccordionIcon = ({ name }) => (
  <svg className="icon icon-accordion" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
    {ICONS[name].split(' M').map((d, i) => <path key={i} d={(i ? 'M' : '') + d} />)}
  </svg>
);
const Caret = () => (
  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" className="icon icon-caret" fill="none" viewBox="0 0 24 15">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 15c-.3 0-.6-.1-.8-.4l-11-13C-.2 1.2-.1.5.3.2c.4-.4 1.1-.3 1.4.1L12 12.5 22.2.4c.4-.4 1-.5 1.4-.1.4.4.5 1 .1 1.4l-11 13c-.1.2-.4.3-.7.3z" fill="currentColor" />
  </svg>
);
const CheckBenefit = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M9.99996 1.66663C14.6023 1.66663 18.3333 5.39759 18.3333 9.99996C18.3333 14.6023 14.6023 18.3333 9.99996 18.3333C5.39759 18.3333 1.66663 14.6023 1.66663 9.99996C1.66663 5.39759 5.39759 1.66663 9.99996 1.66663ZM13.6377 6.62811C13.4353 6.62674 13.2403 6.70422 13.0938 6.84376C13.0864 6.85101 13.0799 6.8588 13.0734 6.86682L9.45607 11.4757L7.27508 9.29602C7.20356 9.21926 7.11728 9.15697 7.02144 9.11427C6.92578 9.07167 6.82232 9.04972 6.71762 9.04781C6.61289 9.04596 6.50824 9.06425 6.41109 9.10342C6.31381 9.14271 6.22486 9.20149 6.15068 9.27568C6.07649 9.34986 6.01771 9.43881 5.97842 9.53609C5.93925 9.63324 5.92096 9.73789 5.92281 9.84262C5.92472 9.94732 5.94667 10.0508 5.98927 10.1464C6.03197 10.2423 6.09426 10.3286 6.17102 10.4001L8.9271 13.1562C9.00137 13.2304 9.09011 13.2891 9.18751 13.3284C9.28484 13.3676 9.38913 13.3873 9.49405 13.3854C9.5988 13.3834 9.70219 13.3602 9.79787 13.3176C9.89355 13.2748 9.98012 13.2126 10.0515 13.1358L14.2087 7.93697C14.3453 7.78771 14.4188 7.59129 14.4135 7.38901C14.4081 7.18662 14.3246 6.99378 14.1802 6.8519C14.0356 6.71 13.8403 6.62964 13.6377 6.62811Z" fill="#078942" />
  </svg>
);
const RadioCheck = ({ id, hidden }) => (
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="16" height="16" viewBox="0 0 256 256" id={id} style={hidden ? { display: 'none' } : undefined}>
    <g style={{ stroke: 'none', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'none', fillRule: 'nonzero', opacity: 1 }} transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
      <circle cx="45" cy="45" r="45" style={{ stroke: 'none', strokeWidth: 1, fill: '#486ced', fillRule: 'nonzero', opacity: 1 }} transform="matrix(1 0 0 1 0 0)" />
      <path d="M 38.478 64.5 c -0.01 0 -0.02 0 -0.029 0 c -1.3 -0.009 -2.533 -0.579 -3.381 -1.563 L 21.59 47.284 c -1.622 -1.883 -1.41 -4.725 0.474 -6.347 c 1.884 -1.621 4.725 -1.409 6.347 0.474 l 10.112 11.744 L 61.629 27.02 c 1.645 -1.862 4.489 -2.037 6.352 -0.391 c 1.862 1.646 2.037 4.49 0.391 6.352 l -26.521 30 C 40.995 63.947 39.767 64.5 38.478 64.5 z" style={{ stroke: 'none', strokeWidth: 1, fill: 'rgb(255,255,255)', fillRule: 'nonzero', opacity: 1 }} transform="matrix(1 0 0 1 0 0)" strokeLinecap="round" />
    </g>
  </svg>
);
const CartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="PBFCM-PDP-cart-summary__button-icon" aria-hidden="true">
    <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------- gallery (PBFCM-PDP-product-gallery: Swiper main slider + thumbnail strip) ---------- */
function Gallery({ images }) {
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState(null); // { startX, dx }
  const [scrollable, setScrollable] = useState(true);
  const mainRef = useRef(null);
  const trackRef = useRef(null);
  const rowRef = useRef(null);
  const last = images.length - 1;
  const go = useCallback((i) => setIndex(Math.max(0, Math.min(last, i))), [last]);

  // updateTrackAlignment(): scroll the strip when it overflows, distribute the thumbs otherwise
  useEffect(() => {
    const update = () => {
      const row = rowRef.current; const track = trackRef.current;
      if (!row || !track) return;
      const arrows = [...row.querySelectorAll('.PBFCM-PDP-product-gallery__arrow')].reduce((s, a) => s + a.offsetWidth, 0);
      setScrollable(track.scrollWidth > row.clientWidth - arrows + 1);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  // scrollToThumbnail()
  useEffect(() => {
    const track = trackRef.current; const container = track?.parentElement; const thumb = track?.children[index];
    if (!container || !thumb) return;
    if (thumb.offsetLeft < container.scrollLeft) container.scrollLeft = thumb.offsetLeft;
    else if (thumb.offsetLeft + thumb.offsetWidth > container.scrollLeft + container.clientWidth) container.scrollLeft = thumb.offsetLeft + thumb.offsetWidth - container.clientWidth;
  }, [index]);

  const onDown = (e) => { if (e.pointerType === 'mouse' && e.button !== 0) return; setDrag({ startX: e.clientX, dx: 0, id: e.pointerId }); };
  const onMove = (e) => { if (drag) setDrag({ ...drag, dx: e.clientX - drag.startX }); };
  const onUp = () => {
    if (!drag) return;
    const w = mainRef.current?.clientWidth || 1;
    if (Math.abs(drag.dx) > Math.min(10, 1) && Math.abs(drag.dx) / w > 0.1) go(index + (drag.dx < 0 ? 1 : -1));
    setDrag(null);
  };
  const onKey = (e) => { if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1); } if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1); } };
  const dx = drag ? drag.dx : 0;
  const atStart = index <= 0; const atEnd = index >= last;

  return (
    <div className="PBFCM-PDP-product-gallery PBFCM-PDP-product-gallery--slider" data-component="product-gallery" onKeyDown={onKey}>
      <div
        ref={mainRef}
        className={`PBFCM-PDP-product-gallery__main swiper is-navigable swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden is-slider-ready${drag ? ' is-dragging' : ''}`}
        id="PBFCM-main-swiper" tabIndex={0} role="region" aria-label="Product image gallery"
        onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} onPointerLeave={onUp}
      >
        <div className="swiper-wrapper" aria-live="polite" style={{ cursor: 'grab', transitionDuration: drag ? '0ms' : '320ms', transform: `translate3d(calc(${-index * 100}% - ${index * 16}px + ${dx}px), 0, 0)` }}>
          {images.map((im, i) => (
            <div key={im.src} className={`swiper-slide PBFCM-PDP-product-gallery__main-slide${i === index ? ' swiper-slide-active' : ''}`} style={{ marginRight: 16 }} role="group" aria-label={`${i + 1} / ${images.length}`}>
              <Img src={im.src} alt={im.alt} className="PBFCM-PDP-product-gallery__main-image" id={i === 0 ? 'PBFCM-main-image' : undefined} loading={i < 2 ? 'eager' : 'lazy'} draggable="false" />
            </div>
          ))}
        </div>
      </div>
      <div className="PBFCM-PDP-product-gallery__thumbnails" ref={rowRef}>
        <button type="button" className={`PBFCM-PDP-product-gallery__arrow PBFCM-PDP-product-gallery__arrow--prev${atStart ? ' is-disabled' : ''}`} id="PBFCM-thumb-prev" aria-label="Previous image" disabled={atStart} aria-disabled={atStart} onClick={() => go(index - 1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div className={`PBFCM-PDP-product-gallery__thumbnail-container${scrollable ? ' is-scrollable' : ''}`}>
          <div className="PBFCM-PDP-product-gallery__thumbnail-track" id="PBFCM-thumb-track" ref={trackRef}>
            {images.map((im, i) => (
              <button key={im.src} type="button" className={`PBFCM-PDP-product-gallery__thumbnail${i === index ? ' PBFCM-PDP-product-gallery__thumbnail--active' : ''}`} data-image-index={i} aria-label={`View image ${i + 1}`} onClick={() => go(i)}>
                <Img src={im.src} alt={im.alt} className="PBFCM-PDP-product-gallery__thumbnail-image" loading="lazy" width="88" height="88" />
              </button>
            ))}
          </div>
        </div>
        <button type="button" className={`PBFCM-PDP-product-gallery__arrow PBFCM-PDP-product-gallery__arrow--next${atEnd ? ' is-disabled' : ''}`} id="PBFCM-thumb-next" aria-label="Next image" disabled={atEnd} aria-disabled={atEnd} onClick={() => go(index + 1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
  );
}

/* ---------- blocks ---------- */
function Vanity() {
  const parts = PRODUCT.vanityTitle.split('[');
  return (
    <div className="pdp-vanity">
      <h1>
        <span className="vanity-demo-2"> {PRODUCT_TITLE} </span>
        <span className="vanity-title">
          {parts.map((p, i) => (p.includes(']')
            ? <span key={i}><span className="vanity-title-highlight">{p.split(']')[0]}</span>{p.split(']')[1]} </span>
            : <span key={i}>{p}</span>))}
        </span>
      </h1>
    </div>
  );
}

function SeeIngredients() {
  const ing = getIngredients(PRODUCT.handle);
  const open = (e) => {
    e.preventDefault();
    openIngredients({ title: PRODUCT_TITLE, image: ing?.image, html: ing?.html, price: money(PRODUCT.price) });
  };
  return (
    <div className="product__see-ingredients">
      <div className="fd-ingredients-host" style={{ display: 'contents' }}>
        <a href="#see-ingredients" className="fd-see-ingredients fd-see-ingredients--pdp" role="button" aria-haspopup="dialog" aria-controls="fd-ingredients-popup" onClick={open}>See Ingredients</a>
      </div>
    </div>
  );
}

function DemographicTabs() {
  const t = DEMOGRAPHIC_TABS;
  return (
    <div className="pdp-demo-tabs">
      <div className="pdp-demo-tabs__list fd-tabs-v3 fd-tabs-v3--medium" role="tablist" aria-label={t.ariaLabel}>
        {t.items.map((it) => (it.current
          ? <span key={it.label} className="pdp-demo-tabs__item fd-tabs-v3__item fd-tabs-v3__item--active is-active" role="tab" aria-selected="true" aria-current="page"><span className="pdp-demo-tabs__title">{it.label}</span></span>
          : <Link key={it.label} to={it.href} className="pdp-demo-tabs__item fd-tabs-v3__item" role="tab" aria-selected="false"><span className="pdp-demo-tabs__title">{it.label}</span></Link>))}
      </div>
      <div className="pdp-demo-tabs__banner"><span className="pdp-demo-tabs__banner-age">{t.banner.prefix}<strong>{t.banner.ages}</strong> </span></div>
    </div>
  );
}

function BenefitAccordion() {
  const s = BENEFIT_ACCORDION.settings;
  const vars = {
    '--bas-bg': s.background_color, '--bas-text': s.text_color, '--bas-muted': s.body_text_color, '--bas-border': s.border_color, '--bas-card-bg': s.card_background_color,
    '--bas-icon-bg': s.icon_background_color, '--bas-icon-color': s.icon_color, '--bas-percent-bg': s.percent_background_color, '--bas-percent-color': s.percent_color,
    '--bas-radius': `${s.corner_radius}px`, '--bas-font-size': `${s.body_font_size}px`, '--bas-heading-size': `${s.heading_font_size}px`, '--bas-percent-size': `${s.percent_font_size}px`,
  };
  return (
    <div className="pdp-benefit-accordion-stats" style={vars}>
      <div className="pdp-benefit-accordion-stats__intro rte"><div className="metafield-rich_text_field" dangerouslySetInnerHTML={{ __html: BENEFIT_ACCORDION.intro }} /></div>
      <div className="pdp-benefit-accordion-stats__items">
        {BENEFIT_ACCORDION.items.map((it) => (
          <details key={it.heading} className="pdp-benefit-accordion-stats__item" open={it.open || undefined}>
            <summary className="pdp-benefit-accordion-stats__summary">
              <span className="pdp-benefit-accordion-stats__summary-left">
                <span className="pdp-benefit-accordion-stats__icon"><Img src={it.icon} alt={it.heading} width={it.iconW} height={it.iconH} loading="lazy" style={{ objectPosition: '50.0% 51.66%' }} /></span>
                <span className="pdp-benefit-accordion-stats__heading"> {it.heading} </span>
              </span>
              <span className="pdp-benefit-accordion-stats__caret" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false"><path d="M6 9L12 15L18 9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </summary>
            <div className="pdp-benefit-accordion-stats__content">
              <div className="pdp-benefit-accordion-stats__percent"> {it.percent} </div>
              <div className="pdp-benefit-accordion-stats__copy"><div className="metafield-rich_text_field" dangerouslySetInnerHTML={{ __html: it.text }} /></div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

/* ---------- product_purchase_content + savings_display ---------- */
function PurchaseContent() {
  const P = PURCHASE;
  const cart = useCart();
  const [freq, setFreq] = useState('monthly');
  const [qty, setQty] = useState(P.defaultQuantity);
  const monthly = freq === 'monthly';

  // PBFCM-PDP-controller.js: summary = unit price x qty; the free gift counts in the struck-through total once the order reaches the threshold
  const unit = monthly ? P.monthlyPrice : P.otpPrice;
  const sale = unit * qty;
  const giftUnlocked = qty * PRODUCT.price >= P.gift.threshold;
  const compare = qty * PRODUCT.price + (giftUnlocked ? P.gift.value : 0);
  const saving = compare - sale;
  const onSale = saving > 0.004;
  const sd = SAVINGS_DISPLAY;

  const addToCart = () => {
    const line = { handle: PRODUCT.handle, title: PRODUCT_TITLE, image: PRODUCT.images[1].src, price: PRODUCT.price * 100 };
    cart.addLine(line, monthly);
    if (qty > 1) cart.changeQty(`${PRODUCT.handle}:${monthly ? 'sub' : 'otp'}`, qty - 1);
    cart.openCart();
  };
  const onQtyKey = (e) => {
    const k = e.key;
    if (k === 'ArrowRight' || k === 'ArrowDown') { e.preventDefault(); setQty((q) => Math.min(P.maxQuantity, q + 1)); }
    if (k === 'ArrowLeft' || k === 'ArrowUp') { e.preventDefault(); setQty((q) => Math.max(1, q - 1)); }
  };

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
                    <div className="PBFCM-PDP-frequency-selector__price-compare" id="PBFCM-monthly-compare"><span className="sr-only">Original price ${P.monthlyCompare}, strikethrough</span><span aria-hidden="true">${P.monthlyCompare}</span></div>
                    <span className="PBFCM-PDP-frequency-selector__price-final" id="PBFCM-monthly-price"><span className="sr-only">Sale price {money(P.monthlyPrice)}</span><span aria-hidden="true">{money(P.monthlyPrice)}</span></span>
                  </div>
                </div>
              </div>
              <div className={`PBFCM-PDP-frequency-selector__benefits PBFCM-PDP-frequency-selector__benefits--positive${monthly ? '' : ' PBFCM-PDP-frequency-selector__benefits--hidden'}`} id="PBFCM-monthly-benefits">
                {P.monthlyBenefits.map((b) => (<div key={b} className="PBFCM-PDP-frequency-selector__benefit"><CheckBenefit /><p className="PBFCM-PDP-frequency-selector__benefit-text">{b}</p></div>))}
              </div>
              <div className="PBFCM-PDP-frequency-selector__badge" style={{ backgroundColor: P.badgeColor }}><p className="PBFCM-PDP-frequency-selector__badge-text" dangerouslySetInnerHTML={{ __html: P.freqBadge }} /></div>
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
                    <span className="PBFCM-PDP-frequency-selector__price-final" style={{ color: '#2c3e50' }} id="PBFCM-otp-price"><span className="sr-only">Sale price {money(P.otpPrice)}</span><span aria-hidden="true">{money(P.otpPrice)}</span></span>
                  </div>
                  <span className="PBFCM-PDP-frequency-selector__price-note">with code <span>{P.coupon}</span></span>
                </div>
              </div>
              <div className={`PBFCM-PDP-frequency-selector__benefits PBFCM-PDP-frequency-selector__benefits--${monthly ? 'hidden' : 'negative'}`} id="PBFCM-onetime-benefits">
                {P.onetimeBenefits.map((b) => (<div key={b} className="PBFCM-PDP-frequency-selector__benefit"><CheckBenefit /><p className="PBFCM-PDP-frequency-selector__benefit-text">{b}</p></div>))}
              </div>
              <div className={`PBFCM-PDP-frequency-selector__badge PBFCM-PDP-frequency-selector__badge--negative${monthly ? ' PBFCM-PDP-frequency-selector__badge--hidden' : ''}`} id="PBFCM-onetime-badge" style={{ backgroundColor: P.onetimeBadgeColor }}><p className="PBFCM-PDP-frequency-selector__badge-text">{P.onetimeBadge}</p></div>
            </div>
          </div>
        </div>

        <div className="PBFCM-PDP-quantity-selector">
          <div className="PBFCM-PDP-quantity-selector__header">
            <h2 className="PBFCM-PDP-quantity-selector__title">{P.quantityTitle}</h2>
            <div className="PBFCM-PDP-quantity-selector__servings-badge"><p className="PBFCM-PDP-quantity-selector__servings-text">{P.servingsBadge}</p></div>
          </div>
          <div className="PBFCM-PDP-quantity-selector__grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }} role="radiogroup" aria-label="Select quantity">
            {Array.from({ length: P.maxQuantity }, (_, i) => i + 1).map((n) => {
              const sel = n === qty;
              return (
                <div key={n} className={`PBFCM-PDP-quantity-selector__item ${sel ? 'PBFCM-PDP-quantity-selector__item--selected' : ''}`} id={`PBFCM-quantity-${n}`} onClick={() => setQty(n)} onKeyDown={onQtyKey} role="radio" aria-checked={sel} aria-label={`${n} Bottle${n > 1 ? 's' : ''}`} tabIndex={sel ? 0 : -1}>
                  <div className="PBFCM-PDP-quantity-selector__item-content">
                    <p className="PBFCM-PDP-quantity-selector__item-label">{n}&nbsp;{n > 1 ? 'Bottles' : 'Bottle'}</p>
                    <div className={`PBFCM-PDP-quantity-selector__savings-badge ${sel ? 'PBFCM-PDP-quantity-selector__savings-badge--selected' : ''}`} style={sel ? { backgroundColor: 'var(--PBFCM-color-savings-badge)' } : undefined}>
                      <p className="PBFCM-PDP-quantity-selector__savings-text">Save {money(P.savingsPerBottle * n)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* savings_display (move_cart_summary): [cta mount] ATC button, [wrapper] Subtotal row, [rows mount] gift line */}
      <div className="fd-savings-display-attach fd-savings-display-attach--cta" style={{ paddingLeft: 0, paddingRight: 0 }}>
        <button type="button" className="PBFCM-PDP-cart-summary__button fd-btn fd-btn--large fd-btn--primary fd-btn-shape--pill" id="PBFCM-add-to-cart-btn" aria-label={P.buttonText} onClick={addToCart}>
          <CartIcon />
          <strong className="PBFCM-PDP-cart-summary__button-text">{P.buttonText}</strong>
        </button>
        <div id="PBFCM-otp-after-atc-mount" className="PBFCM-PDP-otp-after-atc-mount" />
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
          <div id="PBFCM-breakdown-gift-line" aria-label="Free gift" aria-live="polite" style={giftUnlocked ? undefined : { display: 'none' }}>
            {giftUnlocked && (
              <div className="PBFCM-PDP-cart-summary__line PBFCM-PDP-cart-summary__line--gift">
                <span className="PBFCM-PDP-cart-summary__line-label">{P.gift.title}</span>
                <div className="PBFCM-PDP-cart-summary__line-price">
                  <span className="PBFCM-PDP-cart-summary__line-compare"><span className="sr-only">Original price {money(P.gift.value)}, strikethrough</span><span aria-hidden="true">{money(P.gift.value)}</span></span>
                  <span className="PBFCM-PDP-cart-summary__line-final" style={{ color: P.successColor }}><span className="sr-only">Now FREE</span><span aria-hidden="true">{P.gift.salePrice}</span></span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div id="PBFCM-otp-below-summary-mount" className="PBFCM-PDP-otp-below-summary-mount" />
      </div>
    </>
  );
}

function CollapsibleTab({ tab }) {
  return (
    <accordion-tab class="product__accordion accordion">
      <details>
        <summary>
          <span className="summary__title">
            <AccordionIcon name={tab.icon} />
            <span className="accordion__title"> {tab.heading} </span>
          </span>
          <Caret />
        </summary>
        <div className="accordion__content rte">
          {tab.image
            ? <Img src={tab.image.src} alt={tab.image.alt} width={tab.image.width} height={tab.image.height} loading="lazy" style={{ objectPosition: '50.0% 50.0%' }} />
            : <div className="metafield-rich_text_field" dangerouslySetInnerHTML={{ __html: tab.html }} />}
        </div>
      </details>
    </accordion-tab>
  );
}

const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M11.3588 14.3463L10.8203 13.7878L14.2274 10.3807H4.29468V9.61152H14.2274L10.8203 6.20443L11.3588 5.65381L15.7051 10.0001L11.3588 14.3463Z" fill="#2C3D50" />
  </svg>
);

export default function MainProductV2({ id = SECTION_ID, onReadClinicianReviews }) {
  const jumpToReviews = (e) => {
    e?.preventDefault();
    document.getElementById('frontrow-md-reviews')?.scrollIntoView({ behavior: 'smooth' });
    onReadClinicianReviews?.();
  };
  return (
    <div id={`shopify-section-${id}`} className="shopify-section section">
      <section className="section--padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="page-width product grid grid--1-col grid--2-col-tablet">
          <div className="grid__item product__media-wrapper">
            <Gallery images={PRODUCT.images} />
          </div>
          <div className="product__info-wrapper grid__item">
            <div id={`ProductInfo-${id}`} className="product__info-container product__info-container--sticky">
              <Vanity />
              <JudgeMePreviewBadge rating={PRODUCT.rating} count={PRODUCT.reviewCount} href="#reviews" />
              <SeeIngredients />
              <DemographicTabs />
              <div className="product__custom-liquid"><FrontrowBadge onReadReviews={jumpToReviews} /></div>
              <BenefitAccordion />
              <PurchaseContent />
              <div className="product__custom-liquid">
                <div className="usprow">
                  {USP_IMAGES.map((u) => (<div key={u.alt} className="usp"><Img src={u.src} alt={u.alt} /></div>))}
                </div>
              </div>
              {COLLAPSIBLE_TABS.map((t) => <CollapsibleTab key={t.heading} tab={t} />)}
              <div className="crosslinks-container">
                <div className="crosslinks-header"><span className="crosslinks-header__age">{CROSSLINKS.age.prefix}<b>{CROSSLINKS.age.ages}</b></span></div>
                <div className="crosslinks-cards">
                  {CROSSLINKS.cards.map((c) => (
                    <Link key={c.title} to={c.href} className="crosslinks-card">
                      <div className="crosslinks-card__content"><span className="crosslinks-card__title">{c.title}</span><span className="crosslinks-card__subtitle">{c.subtitle}</span></div>
                      <ArrowRight />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
