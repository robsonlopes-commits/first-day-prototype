import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Img from '../components/Img.jsx';
import { settingImg } from '../lib/settingsImg.js';
import { TRUST_HOME } from '../data/sharedSections.js';
import trustCss from './homepageTrustSectionCss.js';

// sections/homepage-trust-section.liquid (+ snippet homepage-trust-section.css.liquid and the inline carousel script).
// Props: { id, settings, blocks } exactly as in the template JSON (see src/data/sharedSections.js: TRUST_HOME / TRUST_LP / TRUST_PDP_NEW).
const MIN_CLONES = 3;
const DESKTOP_INITIAL_OFFSET = 140;
const MOBILE_CENTER = 2;
const STAT_MS = 1400;

const itemStyle = (b, extra) => {
  const st = { ...extra };
  if (b.settings.background_color) st.backgroundColor = b.settings.background_color;
  if (b.settings.text_color) st['--trust-text-color'] = b.settings.text_color;
  return Object.keys(st).length ? st : undefined;
};

function VideoItem({ b, cls, sid }) {
  const [playing, setPlaying] = useState(false);
  const url = b.settings.video_url;
  const play = () => url && setPlaying(true);
  return (
    <div className={`${cls} ${cls}--video${playing ? ' is-playing' : ''}`} data-video-trigger role="button" tabIndex={0} aria-label="Play video" style={itemStyle(b)}
      onClick={play} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); play(); } }}>
      {b.settings.thumbnail ? <Img src={settingImg(b.settings.thumbnail)} alt="Video thumbnail" loading="lazy" /> : <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} />}
      <div className={`homepage-trust-section__video-overlay-${sid}`}>
        <button type="button" className={`homepage-trust-section__play-button-${sid}`} aria-label="Play video">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7L8 5z" /></svg>
        </button>
      </div>
      {playing && <video src={url} controls autoPlay playsInline />}
    </div>
  );
}

function renderItem(b, sid, cardBackground, key, extraProps = {}) {
  const cls = `homepage-trust-section__item-${sid}`;
  const s = b.settings;
  switch (b.type) {
    case 'image':
      return (
        <div key={key} {...extraProps} className={`${cls} ${cls}--image${s.has_overlay ? ' has-overlay' : ''}`} style={itemStyle(b)}>
          {s.image ? <Img src={settingImg(s.image)} alt="Trust item" loading="lazy" /> : <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #e4f5ff 0%, #cce8f9 100%)' }} />}
        </div>
      );
    case 'image_quote':
      return (
        <div key={key} {...extraProps} className={`${cls} ${cls}--expert`} style={itemStyle(b, { backgroundColor: s.background_color || cardBackground })}>
          {s.image && <div className={`homepage-trust-section__expert-image-${sid}`}><Img src={settingImg(s.image)} alt={s.name || 'Expert photo'} loading="lazy" /></div>}
          {s.quote && <p className={`homepage-trust-section__expert-quote-${sid}`}>"{s.quote}"</p>}
          <div className={`homepage-trust-section__expert-info-${sid}`}>
            {s.name && <p className={`homepage-trust-section__expert-name-${sid}`}>{s.name}</p>}
            {s.credentials && <p className={`homepage-trust-section__expert-credentials-${sid}`}>{s.credentials}</p>}
          </div>
        </div>
      );
    case 'video':
      return <VideoItem key={key} b={b} cls={cls} sid={sid} />;
    case 'quote_only':
      return (
        <div key={key} {...extraProps} className={`${cls} ${cls}--media variant-${s.variant}`} style={itemStyle(b)}>
          {s.quote && <p className={`homepage-trust-section__media-quote-${sid}`}>"{s.quote}"</p>}
          <div className={`homepage-trust-section__media-footer-${sid}`}>
            <p className={`homepage-trust-section__media-label-${sid}`}>As seen on</p>
            {s.logo && <div className={`homepage-trust-section__media-logo-${sid}`}><Img src={settingImg(s.logo)} alt="Media logo" loading="lazy" /></div>}
          </div>
        </div>
      );
    case 'media_split': {
      const image = s.image && <div className={`homepage-trust-section__media-split-image-${sid}`}><Img src={settingImg(s.image)} alt="Featured image" loading="lazy" /></div>;
      return (
        <div key={key} {...extraProps} className={`${cls} ${cls}--media-split`}>
          {s.image_position === 'top' && image}
          <div className={`homepage-trust-section__media-split-quote-${sid}`} style={itemStyle(b)}>
            {s.quote && <div className={`homepage-trust-section__media-split-text-${sid}`} dangerouslySetInnerHTML={{ __html: s.quote }} />}
          </div>
          {s.image_position === 'bottom' && image}
        </div>
      );
    }
    default:
      return null;
  }
}

export default function HomepageTrustSection({ id = TRUST_HOME.id, settings = TRUST_HOME.settings, blocks = TRUST_HOME.blocks }) {
  const s = settings;
  const sid = id;
  const items = useMemo(() => blocks.filter((b) => b.type !== 'stat'), [blocks]);
  const stats = useMemo(() => blocks.filter((b) => b.type === 'stat'), [blocks]);
  const n = items.length;
  const heading = (s.heading || '').replace(/\n/g, '<br>').replace('[', `<span class="homepage-trust-section__title-accent-${sid}">`).replace(']', '</span>');
  const showCallout = s.show_callout && s.callout_text;

  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(() => typeof window === 'undefined' || window.innerWidth > 749);
  const [clones, setClones] = useState(MIN_CLONES);
  const [activeDot, setActiveDot] = useState(0);
  const [order, setOrder] = useState(() => items.map((_, i) => i)); // mobile DOM rotation
  const st = useRef({ idx: 0, animating: false, cardW: 0, gap: 16, base: 0 });

  useEffect(() => {
    const on = () => setIsDesktop(window.innerWidth > 749);
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);

  // ----- desktop: infinite carousel with clones (translate by offsetLeft of the target card) -----
  const translate = (x) => { trackRef.current.style.transform = `translateX(${-x}px)`; };
  const setPosition = useCallback((index, animate = true, initialOffset = 0) => {
    const track = trackRef.current;
    const target = track?.children[index];
    if (!target) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (animate && !reduce) { track.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'; st.current.animating = true; } else track.style.transition = 'none';
    st.current.idx = index;
    translate(target.offsetLeft - initialOffset);
    setActiveDot((((index - clones) % n) + n) % n);
  }, [clones, n]);

  useLayoutEffect(() => {
    if (!isDesktop || !trackRef.current || n < 2) return undefined;
    const track = trackRef.current;
    const first = track.children[clones];
    const gap = parseFloat(getComputedStyle(track).columnGap || '16') || 16;
    const want = Math.min(n, Math.max(MIN_CLONES, Math.ceil(viewportRef.current.clientWidth / ((first?.offsetWidth || 1) + gap)) + 1));
    if (want !== clones) { setClones(want); return undefined; }
    const onEnd = () => {
      st.current.animating = false;
      const { idx } = st.current;
      if (idx < clones) setPosition(idx + n, false);
      else if (idx >= clones + n) setPosition(idx - n, false);
    };
    track.addEventListener('transitionend', onEnd);
    const raf = requestAnimationFrame(() => setPosition(clones, false, DESKTOP_INITIAL_OFFSET));
    return () => { track.removeEventListener('transitionend', onEnd); cancelAnimationFrame(raf); track.style.transition = ''; track.style.transform = ''; };
  }, [isDesktop, clones, n, setPosition]);

  const navigate = (dir) => { if (!st.current.animating) setPosition(st.current.idx + dir, true); };
  const goDot = (i) => { if (!st.current.animating) setPosition(clones + i, true); };

  // ----- mobile: DOM rotation carousel (centre card = index 2) -----
  const center = useCallback(() => {
    const track = trackRef.current;
    const vp = viewportRef.current;
    const card = track?.children[MOBILE_CENTER] || track?.children[0];
    if (!card) return;
    st.current.cardW = card.offsetWidth;
    st.current.gap = parseFloat(getComputedStyle(track).gap || '16') || 16;
    st.current.base = card.offsetLeft - (vp.clientWidth - st.current.cardW) / 2;
    track.style.transition = 'none';
    translate(st.current.base);
  }, []);

  useLayoutEffect(() => { if (!isDesktop) center(); }, [isDesktop, order, center]);

  const animateTo = (dir) => {
    const track = trackRef.current;
    if (st.current.animating || !track || n < 2) return;
    st.current.animating = true;
    track.style.transition = 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    translate(st.current.base + dir * (st.current.cardW + st.current.gap));
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      st.current.animating = false;
      setOrder((o) => (dir > 0 ? [...o.slice(1), o[0]] : [o[o.length - 1], ...o.slice(0, -1)]));
    };
    track.addEventListener('transitionend', finish, { once: true });
    setTimeout(finish, 400);
  };
  const goToMobile = (target) => {
    if (st.current.animating) return;
    const cur = order[MOBILE_CENTER] ?? order[0];
    let delta = target - cur;
    if (!delta) return;
    if (delta > n / 2) delta -= n;
    if (delta < -n / 2) delta += n;
    const dir = delta > 0 ? 1 : -1;
    const steps = Math.abs(delta) - 1;
    if (steps > 0) {
      setOrder((o) => { let r = o; for (let i = 0; i < steps; i++) r = dir > 0 ? [...r.slice(1), r[0]] : [r[r.length - 1], ...r.slice(0, -1)]; return r; });
      requestAnimationFrame(() => requestAnimationFrame(() => animateTo(dir)));
    } else animateTo(dir);
  };

  useEffect(() => {
    const vp = viewportRef.current;
    if (isDesktop || !vp) return undefined;
    let drag = null;
    const start = (e) => { if (st.current.animating) return; drag = { x: e.touches[0].clientX, y: e.touches[0].clientY, t: Date.now(), dx: 0 }; trackRef.current.style.transition = 'none'; };
    const move = (e) => {
      if (!drag) return;
      const dx = drag.x - e.touches[0].clientX; const dy = drag.y - e.touches[0].clientY;
      if (Math.abs(dx) > Math.abs(dy)) { e.preventDefault(); drag.dx = dx; translate(st.current.base + dx); }
    };
    const end = (e) => {
      if (!drag) return;
      const dx = drag.x - e.changedTouches[0].clientX; const v = dx / (Date.now() - drag.t);
      drag = null;
      if (Math.abs(dx) > st.current.cardW * 0.25 || Math.abs(v) > 0.3) animateTo(dx > 0 ? 1 : -1);
      else { trackRef.current.style.transition = 'transform 0.25s ease-out'; translate(st.current.base); }
    };
    vp.addEventListener('touchstart', start, { passive: true });
    vp.addEventListener('touchmove', move, { passive: false });
    vp.addEventListener('touchend', end, { passive: true });
    vp.style.touchAction = 'pan-y pinch-zoom';
    return () => { vp.removeEventListener('touchstart', start); vp.removeEventListener('touchmove', move); vp.removeEventListener('touchend', end); vp.style.touchAction = ''; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktop, n]);

  // ----- stats count-up on scroll into view -----
  const [statsRun, setStatsRun] = useState(false);
  const statsRef = useRef(null);
  useEffect(() => {
    const el = statsRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setStatsRun(true); return undefined; }
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { setStatsRun(true); io.disconnect(); } }, { threshold: 0.35, rootMargin: '0px 0px -8% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // track children
  let trackChildren;
  if (isDesktop && n > 1) {
    const idxs = [];
    for (let i = 0; i < clones; i++) idxs.push({ i: (n - clones + i + n) % n, clone: 'prepend' });
    items.forEach((_, i) => idxs.push({ i }));
    for (let i = 0; i < clones; i++) idxs.push({ i: i % n, clone: 'append' });
    trackChildren = idxs.map((o, k) => renderItem(items[o.i], sid, s.card_background, `${o.clone || 'o'}-${k}`, o.clone ? { 'aria-hidden': 'true', 'data-clone': o.clone } : {}));
  } else if (!isDesktop) {
    trackChildren = order.map((i) => renderItem(items[i], sid, s.card_background, `m-${i}`, { 'data-trust-index': i }));
  } else trackChildren = items.map((b, i) => renderItem(b, sid, s.card_background, `o-${i}`));
  const mobileActive = order[MOBILE_CENTER] ?? order[0] ?? 0;

  return (
    <div id={`shopify-section-${sid}`} className="shopify-section">
      <style>{trustCss(s, sid)}</style>
      {s.anchor_id ? <div id={s.anchor_id} className="fd-jump-anchor" /> : null}
      <section className={`homepage-trust-section-${sid}`} data-section-id={sid} ref={sectionRef}>
        <div className={`homepage-trust-section__container-${sid}`}>
          <h2 className={`homepage-trust-section__title-${sid}`} dangerouslySetInnerHTML={{ __html: heading }} />

          <div className={`homepage-trust-section__carousel-${sid}`}>
            <div className={`homepage-trust-section__carousel-viewport-${sid}`} ref={viewportRef} data-carousel-viewport>
              <div className={`homepage-trust-section__carousel-track-${sid}`} ref={trackRef} data-carousel-track>{trackChildren}</div>
            </div>

            {s.show_navigation && (
              <div className={`homepage-trust-section__carousel-controls-${sid} homepage-trust-section__desktop-only-${sid}`}>
                <button type="button" className={`homepage-trust-section__carousel-btn-${sid}`} onClick={() => navigate(-1)} aria-label="Previous items">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></svg>
                </button>
                <div className={`homepage-trust-section__carousel-dots-${sid}`} data-carousel-dots>
                  {isDesktop && n > 1 && items.map((_, i) => (
                    <button key={i} type="button" className={`homepage-trust-section__carousel-dot-${sid}${i === activeDot ? ' is-active' : ''}`} aria-label={`Go to item ${i + 1}`} onClick={() => goDot(i)} />
                  ))}
                </div>
                <button type="button" className={`homepage-trust-section__carousel-btn-${sid}`} onClick={() => navigate(1)} aria-label="Next items">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" /></svg>
                </button>
              </div>
            )}

            {s.show_navigation_mobile && (
              <div className={`homepage-trust-section__carousel-dots-mobile-${sid} homepage-trust-section__mobile-only-${sid}`} data-carousel-dots-mobile role="group" aria-label="Slide indicators">
                {!isDesktop && items.map((_, i) => (
                  <button key={i} type="button" className={`homepage-trust-section__carousel-dot-${sid}${i === mobileActive ? ' is-active' : ''}`} aria-current={i === mobileActive ? 'true' : 'false'} aria-label={`Go to item ${i + 1}`} onClick={() => goToMobile(i)} />
                ))}
              </div>
            )}

            {showCallout && <div className={`homepage-trust-section__callout-${sid}`}><p className={`homepage-trust-section__callout-text-${sid}`}>{s.callout_text}</p></div>}
          </div>

          {s.show_statistics && stats.length > 0 && (
            <div className={`homepage-trust-section__stats-${sid}`} ref={statsRef} style={{ '--trust-stat-accent': s.stat_accent_color, '--trust-stat-desc-color': s.stat_desc_color }}>
              {stats.map((b) => {
                const st2 = b.settings;
                const desc = [st2.description_line_1, st2.description_line_2].filter(Boolean).join(' ');
                const raw = (st2.percentage || '').trim();
                const suffix = raw.includes('%') ? '%' : '';
                const target = parseFloat(raw.replace('%', '').replace(/,/g, '').trim());
                const css = {};
                if (st2.background_color) css.background = st2.background_color;
                if (st2.text_color) { css['--trust-stat-accent'] = st2.text_color; css['--trust-stat-desc-color'] = st2.text_color; }
                return (
                  <div key={b.id} className={`homepage-trust-section__stat-card-${sid}`} style={css}>
                    {raw && (
                      <div className={`homepage-trust-section__stat-row-${sid}`}>
                        <span className={`homepage-trust-section__stat-arrow-${sid}`} aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" focusable="false"><path d="M17.2122 10.3687L16.542 11.015L12.4535 6.92645V18.8457H11.5305V6.92645L7.442 11.015L6.78125 10.3687L11.9967 5.1532L17.2122 10.3687Z" fill="currentColor" /></svg>
                        </span>
                        <span className={`homepage-trust-section__stat-value-${sid}`} data-stat-count aria-label={raw}>
                          <StatNumber target={target} suffix={suffix} run={statsRun} />
                        </span>
                      </div>
                    )}
                    {desc && <p className={`homepage-trust-section__stat-desc-${sid}`}>{desc}</p>}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function StatNumber({ target, suffix, run }) {
  const [text, setText] = useState(`0${suffix}`);
  useEffect(() => {
    if (!run) return undefined;
    const fmt = (v) => String(Math.round(v)) + suffix;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setText(fmt(target)); return undefined; }
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - t0) / STAT_MS);
      setText(fmt(target * (1 - (1 - t) ** 3)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line
  }, [run, target, suffix]);
  return text;
}
