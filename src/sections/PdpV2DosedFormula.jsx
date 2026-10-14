import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Img from '../components/Img.jsx';
import { settingImg } from '../lib/settingsImg.js';
import '../styles/theme/pdp-v2-dosed-formula.css';
import { DOSED_FORMULA_PDP_NEW } from '../data/pdpNewDosed.js';

// sections/pdp-v2-dosed-formula.liquid + assets/pdp-v2-dosed-formula.{css,js}.
// Props: { id, settings, blocks } as in the template JSON. The ingredient cards come from the product metafield
// custom.product_ingredient_detailed_list (mocked in src/data/pdpNewDosed.js as `cards`), the trust marquee items are the blocks.
// Template custom_css for this section: `.pdv-df__dose-zone-label {text-transform: capitalize;}`.
const CUSTOM_CSS = '.pdv-df__dose-zone-label {text-transform: capitalize;}';

const WAVE_PATH = 'M1512 384.5C1413.65 397.012 1351.75 404.704 1157.53 380.244C1079.06 370.361 1017.2 366.667 964.766 366.667C889.963 366.667 834.291 374.176 776.753 381.947C773.674 382.361 770.574 382.785 767.463 383.211C763.473 383.756 759.455 384.306 755.416 384.845V384.838C657.065 397.35 596.339 404.704 402.114 380.244C323.643 370.361 261.786 366.667 209.353 366.667C134.549 366.667 78.8788 374.176 21.3379 381.947C18.2593 382.362 15.1623 382.785 12.0488 383.211C8.05808 383.756 4.04039 384.306 0 384.845V11.9247C98.3455 -0.587059 160.25 -8.27977 354.474 16.1806C432.945 26.0639 494.8 29.7577 547.234 29.7577C622.037 29.7577 677.709 22.2487 735.247 14.4775C738.326 14.0632 741.426 13.6393 744.537 13.2138C748.527 12.6683 752.545 12.1186 756.584 11.58V11.5868C854.935 -0.924946 915.661 -8.27977 1109.89 16.1806C1188.36 26.0639 1250.21 29.7577 1302.65 29.7577C1377.45 29.7577 1433.12 22.2487 1490.66 14.4775C1493.74 14.0631 1496.84 13.6394 1499.95 13.2138C1503.94 12.6683 1507.96 12.1186 1512 11.58V384.5Z';

// snippets/wave-svg.liquid / fd-wave-svg.liquid (the top wave uses fd-wave-svg; unused here since wave_top is off)
function WaveSvg({ fill }) {
  return (
    <svg className="wave-svg" width="1512" height="397" viewBox="0 0 1512 397" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d={WAVE_PATH} fill={fill || 'currentColor'} />
    </svg>
  );
}

const perPageFor = (w) => (w <= 749 ? 1 : w <= 989 ? 2 : 4);

// snippets/fd-demographic-forms.liquid: only the demographic words used here
const demographic = (text, d = { plural: 'kids', singular: 'kid' }) => (text || '').replace('{demo_plural}', d.plural).replace('{demo_singular}', d.singular);

function Dose({ s }) {
  const ref = useRef(null);
  const [inview, setInview] = useState(false);
  const animate = !!s.dose_animate;
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches || typeof IntersectionObserver === 'undefined') { setInview(true); return undefined; }
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { setInview(true); io.disconnect(); } }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [animate]);

  const label = demographic(s.dose_label_center);
  const parts = label.split(' For ');
  return (
    <div className={`pdv-df__dose${inview ? ' is-inview' : ''}`} ref={ref} data-pdv-dose data-animate={animate ? 'true' : 'false'} role="img" aria-label={s.dose_aria_label}>
      <div className="pdv-df__dose-stage">
        <span className="pdv-df__dose-cap pdv-df__dose-cap--left">{s.dose_label_left}</span>
        <span className="pdv-df__dose-cap pdv-df__dose-cap--right">{s.dose_label_right}</span>
        <div className="pdv-df__dose-ideal" aria-hidden="true"><div className="pdv-df__dose-zone" data-pdv-zone /></div>
        <div className="pdv-df__dose-bar" aria-hidden="true">
          <div className="pdv-df__dose-ticks">{Array.from({ length: 8 }, (_, i) => <span key={i} />)}</div>
        </div>
        <span className="pdv-df__dose-edge pdv-df__dose-edge--start" aria-hidden="true" />
        <span className="pdv-df__dose-edge pdv-df__dose-edge--end" aria-hidden="true" />
        {s.dose_label_center ? (
          <span className="pdv-df__dose-zone-label">{parts.length > 1 ? <>{parts[0]}<br />For {parts[1]}</> : label}</span>
        ) : null}
        <div className="pdv-df__dose-bottom">
          <span className="pdv-df__dose-mark pdv-df__dose-mark--0">{s.dose_mark_1}</span>
          <span className="pdv-df__dose-mark pdv-df__dose-mark--10">{s.dose_mark_2}</span>
          <span className={`pdv-df__dose-mark pdv-df__dose-mark--ideal${s.dose_mark_3_optimal ? ' is-optimal' : ''}`}>{s.dose_mark_3}</span>
          <span className="pdv-df__dose-mark pdv-df__dose-mark--30">{s.dose_mark_4}</span>
          <span className="pdv-df__dose-mark pdv-df__dose-mark--40">{s.dose_mark_5}</span>
        </div>
      </div>
    </div>
  );
}

function Cards({ cards }) {
  const trackRef = useRef(null);
  const [width, setWidth] = useState(() => (typeof window === 'undefined' ? 1440 : window.innerWidth));
  const [page, setPage] = useState(0);
  const perPage = perPageFor(width);
  const mobile = width <= 749;
  const pages = Math.max(1, Math.ceil(cards.length / perPage));
  const cur = Math.min(page, pages - 1);

  useEffect(() => {
    let t;
    const on = () => { clearTimeout(t); t = setTimeout(() => setWidth(window.innerWidth), 120); };
    window.addEventListener('resize', on);
    return () => { clearTimeout(t); window.removeEventListener('resize', on); };
  }, []);

  // translate by whole pages (card width + gap), same maths as the theme script; mobile is a native snap scroller
  const apply = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    if (mobile) { track.style.transform = ''; return; }
    const gap = parseFloat(getComputedStyle(track).gap) || 16;
    const cardW = track.children[0]?.getBoundingClientRect().width || 0;
    track.style.transform = `translateX(-${cur * perPage * (cardW + gap)}px)`;
  }, [cur, perPage, mobile]);
  useLayoutEffect(() => { apply(); }, [apply, width]);

  if (!cards.length) return null;
  const showNav = pages > 1 && !mobile;
  return (
    <div className="pdv-df__cards-wrap">
      <div className="pdv-df__cards-viewport" data-pdv-cards-viewport>
        <div className="pdv-df__cards-track" ref={trackRef} data-pdv-cards-track>
          {cards.map((c, i) => (
            <article className="pdv-df__card" data-pdv-card key={i}>
              <div className="pdv-df__card-head">
                {c.image ? <div className="pdv-df__card-thumb"><Img src={settingImg(c.image)} alt={c.name || ''} loading="lazy" width="48" height="48" /></div> : null}
                {c.name ? <h3 className="pdv-df__card-title">{c.name}</h3> : null}
              </div>
              {c.body ? <div className="pdv-df__card-body" dangerouslySetInnerHTML={{ __html: c.body }} /> : null}
            </article>
          ))}
        </div>
      </div>
      <div className="pdv-df__controls">
        <button type="button" className="pdv-df__nav" aria-label="Previous ingredients" hidden={!showNav} disabled={cur <= 0} onClick={() => setPage(Math.max(0, cur - 1))}>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div className="pdv-df__dots" role="tablist" aria-label="Ingredient pages" hidden={!showNav}>
          {showNav && Array.from({ length: pages }, (_, i) => (
            <button key={i} type="button" className={`pdv-df__dot${i === cur ? ' is-active' : ''}`} aria-label={`Go to page ${i + 1}`} aria-current={i === cur ? 'true' : 'false'} onClick={() => setPage(i)} />
          ))}
        </div>
        <button type="button" className="pdv-df__nav" aria-label="Next ingredients" hidden={!showNav} disabled={cur >= pages - 1} onClick={() => setPage(Math.min(pages - 1, cur + 1))}>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
  );
}

function MarqueeItems({ items }) {
  return items.map((b) => (
    <li className="pdv-df__marquee-item" key={b.id}>
      {b.settings.icon ? <span className="pdv-df__marquee-icon" aria-hidden="true"><Img src={settingImg(b.settings.icon)} alt="" loading="lazy" width="28" height="28" /></span> : null}
      <span>{b.settings.text}</span>
    </li>
  ));
}

// assets js initMarquee: clone the source <ul> until marquee width + one cycle is covered, animate by one cycle.
function Marquee({ items }) {
  const marqueeRef = useRef(null);
  const wrapRef = useRef(null);
  const srcRef = useRef(null);
  const [clones, setClones] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const marquee = marqueeRef.current; const wrap = wrapRef.current; const src = srcRef.current;
    if (!marquee || !wrap || !src) return undefined;
    let raf;
    const rebuild = () => {
      const srcW = src.getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(wrap).columnGap) || 0;
      const cycleW = srcW + gap;
      if (!srcW || !cycleW) return;
      const need = marquee.clientWidth + cycleW;
      setClones(Math.max(0, Math.ceil((need - srcW) / cycleW)));
      setCycle(cycleW);
    };
    const queue = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(rebuild); };
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(queue) : null;
    ro?.observe(marquee); ro?.observe(src);
    window.addEventListener('resize', queue);
    document.fonts?.ready?.then(queue);
    queue();
    return () => { cancelAnimationFrame(raf); ro?.disconnect(); window.removeEventListener('resize', queue); };
  }, [items]);

  return (
    <div className="pdv-df__marquee" data-pdv-marquee ref={marqueeRef}>
      <div className={`pdv-df__marquee-wrap${cycle ? ' is-ready' : ''}`} ref={wrapRef} style={cycle ? { '--pdv-df-marquee-cycle': `${cycle}px` } : undefined}>
        <ul className="pdv-df__marquee-track" role="list" ref={srcRef} data-pdv-marquee-source><MarqueeItems items={items} /></ul>
        {Array.from({ length: clones }, (_, i) => (
          <ul className="pdv-df__marquee-track" role="list" aria-hidden="true" key={i} data-pdv-marquee-clone><MarqueeItems items={items} /></ul>
        ))}
      </div>
    </div>
  );
}

export default function PdpV2DosedFormula({
  id = DOSED_FORMULA_PDP_NEW.id,
  settings = DOSED_FORMULA_PDP_NEW.settings,
  blocks = DOSED_FORMULA_PDP_NEW.blocks,
  cards = DOSED_FORMULA_PDP_NEW.cards,
}) {
  const s = settings;
  const benefits = blocks.filter((b) => b.type === 'benefit' && b.settings.text);
  const titleParts = (s.title || '').split('[');
  const subtext = (s.subtext || '').replace(/\[/g, '<strong>').replace(/\]/g, '</strong>');
  const v = {
    '--pdv-df-bg': s.section_bg_color,
    '--pdv-df-wave-height': `${s.wave_height}px`,
    '--pdv-df-max-width': `${s.container_max_width}px`,
    '--pdv-df-pt-d': `${s.padding_top_desktop}px`,
    '--pdv-df-pr-d': `${s.padding_right_desktop}px`,
    '--pdv-df-pb-d': `${s.padding_bottom_desktop}px`,
    '--pdv-df-pl-d': `${s.padding_left_desktop}px`,
    '--pdv-df-pt-m': `${s.padding_top_mobile}px`,
    '--pdv-df-pr-m': `${s.padding_right_mobile}px`,
    '--pdv-df-pb-m': `${s.padding_bottom_mobile}px`,
    '--pdv-df-pl-m': `${s.padding_left_mobile}px`,
    '--pdv-df-title-font': s.title_font_family,
    '--pdv-df-title-size-d': `${s.title_font_size_desktop}px`,
    '--pdv-df-title-size-m': `${s.title_font_size_mobile}px`,
    '--pdv-df-title-weight': s.title_font_weight,
    '--pdv-df-title-color': s.title_font_color,
    '--pdv-df-title-accent-weight': s.title_accent_font_weight,
    '--pdv-df-title-accent-color': s.title_accent_color,
    '--pdv-df-title-lh': s.title_line_height,
    '--pdv-df-sub-font': s.subtext_font_family,
    '--pdv-df-sub-size-d': `${s.subtext_font_size_desktop}px`,
    '--pdv-df-sub-size-m': `${s.subtext_font_size_mobile}px`,
    '--pdv-df-sub-weight': s.subtext_font_weight,
    '--pdv-df-sub-color': s.subtext_font_color,
    '--pdv-df-color-low': s.dose_color_low,
    '--pdv-df-color-mid': s.dose_color_mid,
    '--pdv-df-color-high': s.dose_color_high,
    '--pdv-df-stop-1': `${s.dose_stop_1}%`,
    '--pdv-df-stop-2': `${s.dose_stop_2}%`,
    '--pdv-df-stop-3': `${s.dose_stop_3}%`,
    '--pdv-df-stop-4': `${s.dose_stop_4}%`,
    '--pdv-df-zone-start': `${s.dose_zone_start}%`,
    '--pdv-df-zone-width': `${s.dose_zone_width}%`,
    '--pdv-df-wave-color': s.wave_color,
  };

  return (
    <div id={`shopify-section-${id}`} className="shopify-section section-pdv-df">
      <style>{`#shopify-section-${id} { width: 100%; max-width: 100%; background-color: ${s.section_bg_color || '#ffffff'}; overflow-x: clip; }\n${CUSTOM_CSS}`}</style>
      {s.anchor_id ? <div id={s.anchor_id} className="fd-jump-anchor" /> : null}
      <section className="pdv-df" id={`pdv-df-${id}`} data-pdv-df style={v}>
        {s.wave_top ? <div className="pdv-df__wave pdv-df__wave--top"><WaveSvg fill={s.wave_color} /></div> : null}

        <div className="pdv-df__inner">
          <div className="pdv-df__container">
            {s.title || subtext ? (
              <header className="pdv-df__header">
                {s.title ? (
                  <h2 className="pdv-df__title">
                    {titleParts.map((part, i) => {
                      if (part.includes(']')) {
                        const [accent, rest] = part.split(']');
                        return <span key={i}><span className="pdv-df__title-accent">{accent}</span>{rest}</span>;
                      }
                      return part;
                    })}
                  </h2>
                ) : null}
                {subtext ? (
                  // Liquid prints the rich-text metafield inside <p class="pdv-df__subtext">: a block child makes the browser close the <p>
                  // and hoist the <div> out (empty <p> before and after), which is what the live page renders.
                  /^\s*<(div|p)\b/.test(subtext) ? <><p className="pdv-df__subtext" /><div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: subtext }} /><p /></> : <p className="pdv-df__subtext" dangerouslySetInnerHTML={{ __html: subtext }} />
                ) : null}
              </header>
            ) : null}

            {s.show_dose ? <Dose s={s} /> : null}
            <Cards cards={cards} />
          </div>
        </div>

        {benefits.length > 0 ? (
          <div className="pdv-df__wave-zone">
            {s.wave_bottom ? <div className="pdv-df__wave-bg" aria-hidden="true"><WaveSvg fill={s.wave_color} /></div> : null}
            <Marquee items={benefits} />
          </div>
        ) : null}
      </section>
    </div>
  );
}
