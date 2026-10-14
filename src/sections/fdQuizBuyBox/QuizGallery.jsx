import { useCallback, useEffect, useRef, useState } from 'react';
import Img from '../../components/Img.jsx';

// Left column of the quiz (aside.fd-qbb__gallery): snippets/PBFCM-PDP-product-gallery.liquid fed by the section's gallery_image blocks
// (Swiper main slider + thumbnail strip). images = [{ src, alt }]. Local state only (same behaviour as the PDP gallery in StandaloneProduct).
export default function QuizGallery({ images }) {
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState(null);
  const [scrollable, setScrollable] = useState(true);
  const mainRef = useRef(null);
  const trackRef = useRef(null);
  const rowRef = useRef(null);
  const last = images.length - 1;
  const go = useCallback((i) => setIndex(Math.max(0, Math.min(last, i))), [last]);

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
  useEffect(() => {
    const track = trackRef.current; const container = track?.parentElement; const thumb = track?.children[index];
    if (!container || !thumb) return;
    if (thumb.offsetLeft < container.scrollLeft) container.scrollLeft = thumb.offsetLeft;
    else if (thumb.offsetLeft + thumb.offsetWidth > container.scrollLeft + container.clientWidth) container.scrollLeft = thumb.offsetLeft + thumb.offsetWidth - container.clientWidth;
  }, [index]);

  const onDown = (e) => { if (e.pointerType === 'mouse' && e.button !== 0) return; setDrag({ startX: e.clientX, dx: 0 }); };
  const onMove = (e) => { if (drag) setDrag({ ...drag, dx: e.clientX - drag.startX }); };
  const onUp = () => {
    if (!drag) return;
    const w = mainRef.current?.clientWidth || 1;
    if (Math.abs(drag.dx) / w > 0.1) go(index + (drag.dx < 0 ? 1 : -1));
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
            <div key={i} className={`swiper-slide PBFCM-PDP-product-gallery__main-slide${i === index ? ' swiper-slide-active' : ''}`} style={{ marginRight: 16 }} role="group" aria-label={`${i + 1} / ${images.length}`}>
              <Img src={im.src} alt={im.alt} className="PBFCM-PDP-product-gallery__main-image" id={i === 0 ? 'PBFCM-main-image' : undefined} loading={i < 2 ? 'eager' : 'lazy'} draggable="false" />
            </div>
          ))}
        </div>
      </div>
      <div className="PBFCM-PDP-product-gallery__thumbnails" ref={rowRef}>
        <button type="button" className={`PBFCM-PDP-product-gallery__arrow PBFCM-PDP-product-gallery__arrow--prev${atStart ? ' is-disabled' : ''}`} id="PBFCM-thumb-prev" aria-label="Previous image" disabled={atStart} aria-disabled={atStart} onClick={() => go(index - 1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div className={`PBFCM-PDP-product-gallery__thumbnail-container${scrollable ? ' is-scrollable' : ''}`}>
          <div className="PBFCM-PDP-product-gallery__thumbnail-track" id="PBFCM-thumb-track" ref={trackRef}>
            {images.map((im, i) => (
              <button key={i} type="button" className={`PBFCM-PDP-product-gallery__thumbnail${i === index ? ' PBFCM-PDP-product-gallery__thumbnail--active' : ''}`} data-image-index={i} aria-label={`View image ${i + 1}`} onClick={() => go(i)}>
                <Img src={im.src} alt={im.alt} className="PBFCM-PDP-product-gallery__thumbnail-image" loading="lazy" width="88" height="88" />
              </button>
            ))}
          </div>
        </div>
        <button type="button" className={`PBFCM-PDP-product-gallery__arrow PBFCM-PDP-product-gallery__arrow--next${atEnd ? ' is-disabled' : ''}`} id="PBFCM-thumb-next" aria-label="Next image" disabled={atEnd} aria-disabled={atEnd} onClick={() => go(index + 1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
  );
}
