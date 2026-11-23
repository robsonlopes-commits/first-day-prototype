import { useEffect, useRef, useState } from 'react';
import ModernWave from '../../../components/ModernWave.jsx';
import { LOGO } from './ss.jsx';
import './parkV2.css';

// EXPLORATION Sesame Street (v2 of the probiotic page): the PARK scene section (right under the buy box). A full width, full height scene made from the owner's Park.svg, drawn as separate raster
// layers (public/assets/sesame/park/, cut from the SVG by z order, art never redrawn). The scroll drives one camera (P from 0 to 1 over a tall runway with a sticky one screen stage):
//   phase A (0 to A_END): the camera pans across the park, the characters hop, the foreground slides faster than the background (parallax); clouds, butterfly, ladybug, caterpillar, flower,
//                          the ball and Abby's sparkles keep moving on their own (CSS, whatever the scroll does)
//   phase B (A_END to B_END): the camera tilts up and zooms into the sky (the sky is extended far above the scene, with more clouds), until the screen is only sky
//   phase C (B_END to C_END): the photo of the family in a park (AI generated mockup, which has a blue sky too) fades in, zoomed into its own sky
//   phase D (C_END to D_END): the photo zooms OUT and reveals the family on the bench; then the text comes in.
// The scene is 958 x 327 units (the viewBox of Park.svg). Every layer is sized and moved in real pixels each frame (no big scaled compositor layers).
// Sesame Workshop guidelines: no character speaks or touches the product here, characters keep their size ratio, are not flipped and stay right side up.
const BASE = '/assets/sesame/park/';
const PHOTO = { src: '/assets/custom/ss-park-inside.webp', sky: '#74abd7', zoom: 2.4, pos: '100% 50%' };
const PHOTO_M = { src: '/assets/custom/ss-park-inside-mobile-v2.webp', sky: '#5c9fd2', zoom: 2.6 };
const isPhone = () => window.matchMedia('(max-width: 749px)').matches;
const SCENE = { w: 958, h: 327 };
const RUNWAY = 6.4; // screen heights of scroll
const A_END = 0.3; const B_END = 0.5; const C_END = 0.58; const D_END = 0.82; // the phases (see above)
const CX_START = 150; // phone: where the camera looks at the start of the pan (clamped to the scene)
const CX_START_D = 560; const CX_PAN_END_D = 330; // on desktop the camera starts further right (Elmo, the bridge and the lamp) and 'walks' left to the rest of the gang
const CX_PAN_END_M = 410; // on a phone the pan goes a little further right, so that all of Elmo is on screen before the camera tilts up to the sky
const TILT_ZOOM = 1.4; // how much closer the camera gets while it tilts up into the sky

// the layers back to front. x y w h: where the picture sits in the scene (units). f: how fast it moves against the camera (1 = like the background, more = closer)
const ABBY = { dx: 10, float: 9, sway: 3 }; // the fairy and her sparkles share this motion
const LAYERS = [
  { key: 'sky', x: -100, y: -420, w: 1158, h: 700, f: 0, sky: true },
  { key: 'skyDeep', x: -100, y: -420, w: 1158, h: 700, f: 0, deep: true }, // a flat sheet of the sky color of the photo: it fades in over the cartoon sky while the camera tilts up, so the sky already has the blue of the photo when the photo comes in
  { key: 'cloud1', x: 58.35, y: 49.2, w: 49.63, h: 18.34, f: 0.9, cloud: { amp: 70, dur: 52, delay: 0 } },
  { key: 'cloud2', x: 135.24, y: 53.68, w: 32.86, h: 10.68, f: 0.9, cloud: { amp: 90, dur: 64, delay: -14 } },
  { key: 'cloud3', x: 321.499, y: 45.011, w: 52.061, h: 19.03, f: 0.9, cloud: { amp: 60, dur: 46, delay: -30 } },
  { key: 'cloud4', x: 482.16, y: 48.011, w: 73.54, h: 24.71, f: 0.9, cloud: { amp: 50, dur: 58, delay: -8 } },
  { key: 'cloud5', x: 785.2, y: 18.721, w: 68.9, h: 25.34, f: 0.9, cloud: { amp: 60, dur: 66, delay: -22 } },
  { key: 'cloud6', x: 898.991, y: 35.691, w: 29.08, h: 11.41, f: 0.9, cloud: { amp: 90, dur: 60, delay: -40 } },
  { key: 'xc1', desk: true, file: 'p-cloud4.webp', x: 250, y: -70, w: 73.54, h: 24.71, f: 0.9, cloud: { amp: 40, dur: 48, delay: -10 } },
  { key: 'xc2', desk: true, file: 'p-cloud5.webp', x: 420, y: -150, w: 75.79, h: 27.87, f: 0.9, cloud: { amp: 48, dur: 55, delay: -19 } },
  { key: 'xc3', desk: true, file: 'p-cloud3.webp', x: 330, y: -215, w: 67.68, h: 24.74, f: 0.9, cloud: { amp: 56, dur: 62, delay: -28 } },
  { key: 'xc4', desk: true, file: 'p-cloud1.webp', x: 470, y: -105, w: 59.56, h: 22.01, f: 0.9, cloud: { amp: 64, dur: 69, delay: -37 } },
  { key: 'xc5', desk: true, file: 'p-cloud6.webp', x: 210, y: -175, w: 46.53, h: 18.26, f: 0.9, cloud: { amp: 72, dur: 76, delay: -46 } },
  { key: 'xc6', desk: true, file: 'p-cloud2.webp', x: 520, y: -190, w: 59.15, h: 19.22, f: 0.9, cloud: { amp: 80, dur: 83, delay: -55 } },
  // the clouds of the phone (xc1 to xc6 are for wide screens): the camera is zoomed in, so the strip of sky it looks at is narrow (x 356 to 464). Four clouds, one per band of height, spread from left to right. Their x is 26 units left of where they show: at f 0.9 the pan pushes them right by (1 - f) times the distance the camera moved
  { key: 'pc1', file: 'p-cloud3.webp', phone: true, x: 335, y: -205, w: 50.8, h: 18.6, f: 0.9, cloud: { amp: 25, dur: 58, delay: -27 } },
  { key: 'pc2', file: 'p-cloud5.webp', phone: true, x: 386, y: -150, w: 53, h: 19.5, f: 0.9, cloud: { amp: 25, dur: 66, delay: -12 } },
  { key: 'pc3', file: 'p-cloud1.webp', phone: true, x: 343, y: -92, w: 53.6, h: 19.8, f: 0.9, cloud: { amp: 25, dur: 54, delay: -6 } },
  { key: 'pc4', file: 'p-cloud4.webp', phone: true, x: 365, y: -40, w: 51.5, h: 17.3, f: 0.9, cloud: { amp: 25, dur: 62, delay: -33 } },
  { key: 'bg', x: 0, y: 8.36, w: 958, h: 318.64, f: 1 },
  { key: 'grover', x: 181.43, y: 138.92, w: 67.531, h: 57.931, move: { dx: 12, hop: 3, n: 3 } },
  { key: 'cookie', x: 81.07, y: 102.52, w: 128.389, h: 121.02, move: { dx: 14, hop: 2.5, n: 2 } },
  { key: 'abby', x: 380.01, y: 40.72, w: 70.142, h: 65.66, move: ABBY },
  { key: 'spStarA', x: 443.601, y: 47.24, w: 6.73, h: 6.84, move: ABBY, tw: { dur: 1.9, delay: 0, spin: true } },
  { key: 'spStarB', x: 433.861, y: 79.941, w: 5.25, h: 5.33, move: ABBY, tw: { dur: 2.4, delay: 0.7, spin: true } },
  { key: 'spStarC', x: 448.04, y: 54.46, w: 4.17, h: 4.22, move: ABBY, tw: { dur: 1.7, delay: 1.2, spin: true } },
  { key: 'spStarD', x: 374.941, y: 96.29, w: 6.37, h: 6.39, move: ABBY, tw: { dur: 2.1, delay: 0.4, spin: true } },
  { key: 'spDotsA', x: 415.121, y: 42.621, w: 29.971, h: 15.85, move: ABBY, tw: { dur: 1.6, delay: 0.3 } },
  { key: 'spDotsB', x: 431.23, y: 83.72, w: 6.831, h: 5.37, move: ABBY, tw: { dur: 2.0, delay: 1.0 } },
  { key: 'spDotsC', x: 379.871, y: 77.95, w: 12.11, h: 9.59, move: ABBY, tw: { dur: 1.8, delay: 0.1 } },
  { key: 'spDotsD', x: 381.111, y: 54.88, w: 18.351, h: 49.459, move: ABBY, tw: { dur: 2.3, delay: 0.8 } },
  { key: 'fg', x: -12.35, y: 199.161, w: 871.141, h: 127.839, f: 1.25 },
  { key: 'flower', x: 297.38, y: 227.77, w: 108.05, h: 94.68, f: 1.25, sway: true },
  { key: 'ladybug', x: 488.911, y: 269.609, w: 22.799, h: 14.371, f: 1.25, crawl: true },
  { key: 'butterfly', x: 184.8, y: 224.6, w: 38.869, h: 36.41, f: 1.25, fly: true },
  { key: 'bigbird', x: 269.45, y: 82.77, w: 71.18, h: 142.88, move: { dx: 6, hop: 2, n: 2 } },
  { key: 'ball', x: 334.202, y: 140.78, w: 43.31, h: 42.631, move: { dx: 12, hop: 3, n: 3 }, bob: true },
  { key: 'caterpillar', x: 284.001, y: 281.31, w: 32.84, h: 18.47, f: 1.25, crawl: true, slow: true },
  { key: 'elmo', x: 398.729, y: 139.8, w: 77.182, h: 84.73, move: { dx: -8, hop: 5, n: 3 }, mScale: 0.9 },
];

const src = (l) => `${BASE}${l.file || `p-${l.key}.webp`}`;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - ((-2 * t + 2) ** 3) / 2); // in out cubic
const hop = (amp, n, p) => -amp * Math.abs(Math.sin(Math.PI * n * p)); // n whole hops, back on the ground at p = 1

// the content on the left of the photo (over the top of it on a phone). Words of the owner's brief (2026-11-19), invented, pending owner review.
// No character speaks here and the logo sits alone above the words (Sesame Workshop guidelines: the logo never goes next to a character line that sounds like an endorsement).
const goTop = (e) => { e.preventDefault(); (document.getElementById('top') || document.body).scrollIntoView({ behavior: 'smooth' }); };
const Copy = ({ innerRef, still }) => (
  <div ref={innerRef} className={`ss-park__copy${still ? ' is-still' : ''}`}>
    <img className="ss-park__logo" src={LOGO} alt="Sesame Street" draggable="false" />
    <h2 className="ss-park__title">Happy Tummies <span className="ss-park__hl">Start At Home</span></h2>
    <p className="ss-park__desc">Gentle gut support for toddlers, in one yummy daily gummy.</p>
    <p className="ss-park__text">Our 3 in 1 pre, post and probiotic helps support softer, easier to pass stools,* with no junk and nothing fake. Because potty time should feel a little more like a good day.</p>
    <a className="ss-park__cta" href="#top" onClick={goTop}>Start The Adventure</a>
  </div>
);

export default function ParkScroll() {
  const section = useRef(null);
  const stage = useRef(null);
  const photo = useRef(null);
  const photoImg = useRef(null);
  const hint = useRef(null);
  const copy = useRef(null);
  const layerEls = useRef({});
  const [still, setStill] = useState(false); // prefers-reduced-motion: the scene stays still and the photo sits below it

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setStill(mq.matches);
    on(); mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  // the Elmo mascot and the Tango that runs by (fixed at the bottom of the page) are hidden while this section is on screen: the scene already has its own characters
  useEffect(() => () => document.body.classList.remove('ss-in-park'), []); // the class is set by the scroll loop below

  // warm the pictures (decoded) before the shopper gets here, so the scene never pops in while scrolling
  useEffect(() => {
    LAYERS.forEach((l) => { const im = new Image(); im.src = src(l); if (im.decode) im.decode().catch(() => {}); });
    const inner = new Image(); inner.src = (isPhone() ? PHOTO_M : PHOTO).src; if (inner.decode) inner.decode().catch(() => {});
  }, []);

  useEffect(() => {
    const sec = section.current; const st = stage.current;
    if (!sec || !st) return undefined;
    let raf = 0; let vw = 0; let vh = 0;

    const draw = () => {
      raf = 0;
      const r = sec.getBoundingClientRect();
      document.body.classList.toggle('ss-in-park', r.top < vh && r.bottom > 0);
      const runway = Math.max(1, r.height - vh);
      const P = still ? 0 : clamp(-r.top / runway, 0, 1);
      const pa = clamp(P / A_END, 0, 1); // pan progress
      const tB = ease(clamp((P - A_END) / (B_END - A_END), 0, 1)); // tilt up and zoom into the sky

      // the camera: "cover" zoom at rest (the scene fills the screen in both directions), a pan, then up into the sky
      const z0 = Math.max(vw / SCENE.w, vh / SCENE.h);
      const z = z0 * (1 + (TILT_ZOOM - 1) * tB);
      const half0 = vw / (2 * z0);
      const phone = vw < 750;
      const camA = phone ? CX_START : CX_START_D; const camB = phone ? CX_PAN_END_M : CX_PAN_END_D;
      const cxStart = clamp(camA, half0, SCENE.w - half0);
      const cx = clamp(lerp(camA, camB, ease(pa)), half0, SCENE.w - half0);
      const zEnd = z0 * TILT_ZOOM;
      const cy0 = vh / (2 * z0); const cyEnd = -vh / (2 * zEnd) - 14; // at the end the bottom edge of the screen is just above the top of the scene: only sky
      const cy = lerp(cy0, cyEnd, tB);
      const shift = cxStart - cx; // how far the camera moved: the closer layers (f above 1) slide by f - 1 times that
      const tx = vw / 2 - cx * z; const ty = vh / 2 - cy * z;

      // the layers: depth (f) and the little motions of the characters
      LAYERS.forEach((l) => {
        const el = layerEls.current[l.key]; if (!el) return;
        let dx = 0; let dy = 0;
        if (l.f && l.f !== 1) dx = (l.f - 1) * shift;
        if (l.move) {
          const m = l.move;
          dx = m.dx * pa + (m.sway ? m.sway * Math.sin(Math.PI * 3 * pa) : 0);
          dy = m.float ? -m.float * Math.sin(Math.PI * pa) : m.hop ? hop(m.hop, m.n, pa) : 0;
        }
        const k = l.mScale && vw < 750 ? l.mScale : 1; // on a phone only a slice of the park shows: Elmo is a little smaller (anchored at his feet) so that his arm is not cut
        const pw0 = l.w * z; const ph0 = l.h * z; const pw = pw0 * k; const ph = ph0 * k;
        const px = tx + (l.x + dx) * z + (pw0 - pw) / 2; const py = ty + (l.y + dy) * z + (ph0 - ph);
        const seen = !(l.phone && vw >= 750) && !(l.desk && vw < 750) && px < vw + 40 && px + pw > -40 && py < vh + 40 && py + ph > -40; // off screen layers are not drawn
        el.style.visibility = seen ? 'visible' : 'hidden';
        if (!seen) return;
        el.style.width = `${pw}px`; el.style.height = `${ph}px`;
        el.style.transform = `translate(${px}px, ${py}px)`;
        if (l.deep) el.style.opacity = String(clamp((tB - 0.35) / 0.65, 0, 1));
      });

      // the photo: fades in over the sky zoomed into its own sky, then zooms out and reveals the family
      const ph = photo.current;
      if (ph) {
        const M = isPhone() ? PHOTO_M : PHOTO;
        sec.style.setProperty('--ss-park-sky', M.sky);
        const fade = clamp((P - B_END + 0.01) / (C_END - B_END), 0, 1);
        const out = ease(clamp((P - C_END) / (D_END - C_END), 0, 1));
        ph.style.opacity = String(fade);
        ph.style.visibility = fade > 0 ? 'visible' : 'hidden';
        if (photoImg.current) photoImg.current.style.transform = `scale(${lerp(M.zoom, 1, out)})`;
      }
      if (copy.current) { // the text comes in once the photo has zoomed out
        const o = clamp((P - D_END) / 0.06, 0, 1); const c = copy.current;
        c.style.opacity = String(o); c.style.visibility = o > 0 ? 'visible' : 'hidden'; c.style.pointerEvents = o > 0.6 ? 'auto' : 'none'; c.style.setProperty('--ty', `${(1 - o) * 18}px`);
      }
      if (hint.current) hint.current.style.opacity = String(clamp(1 - tB / 0.3, 0, 1)); // on all through the park, gone when we look up
    };
    const schedule = () => { if (!raf) raf = window.requestAnimationFrame(draw); };
    const measure = () => { vw = st.clientWidth; vh = st.clientHeight; draw(); }; // drawn at once (not on the next frame), so the first paint is never an empty stage

    measure();
    const ro = new ResizeObserver(measure); ro.observe(st);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => { ro.disconnect(); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); if (raf) window.cancelAnimationFrame(raf); };
  }, [still]);

  const cls = (l) => `ss-park__layer${l.tw ? ` ss-park__tw${l.tw.spin ? ' is-star' : ''}` : ''}${l.cloud ? ' ss-park__cloud' : ''}${l.deep ? ' ss-park__deep' : ''}`;
  return (
    <section ref={section} className={`ss-park${still ? ' is-still' : ''}`} style={still ? undefined : { '--ss-park-runway': RUNWAY, '--ss-park-sky': PHOTO.sky }} aria-label="A Sesame Street park. Keep scrolling to look up at the sky and find a family on a bench.">
      {/* the flat wave of the Sesame pages where the buy box (white) meets the scene, instead of a straight line. It belongs to the top of the runway, so it scrolls away once the stage sticks */}
      {still ? null : <div className="ss-park__wave" aria-hidden="true"><ModernWave position="bottom" color="#ffffff" containerBackground="transparent" /></div>}
      <div ref={stage} className="ss-park__stage">
        {LAYERS.map((l) => (
          <div key={l.key} ref={(el) => { layerEls.current[l.key] = el; }} className={cls(l)} style={{ visibility: 'hidden', ...(l.tw ? { '--tw-dur': `${l.tw.dur}s`, '--tw-delay': `${l.tw.delay}s` } : {}), ...(l.cloud ? { '--cl-amp': `${l.cloud.amp}%`, '--cl-dur': `${l.cloud.dur}s`, '--cl-delay': `${l.cloud.delay}s` } : {}), ...(l.deep ? { opacity: 0 } : {}) }}>
            {l.deep ? null : l.fly ? <span className="ss-park__fly"><img src={src(l)} alt="" draggable="false" decoding="async" /></span>
              : <img className={`${l.sway ? 'ss-park__sway ' : ''}${l.crawl ? `ss-park__crawl${l.slow ? ' is-slow' : ''} ` : ''}${l.bob ? 'ss-park__bob' : ''}`} src={src(l)} alt="" draggable="false" decoding="async" />}
          </div>
        ))}
        {still ? null : (
          <div ref={photo} className="ss-park__photo">
            <picture><source media="(max-width: 749px)" srcSet={PHOTO_M.src} /><img ref={photoImg} src={PHOTO.src} alt="" draggable="false" decoding="async" /></picture>
          </div>
        )}
        {still ? null : <Copy innerRef={copy} />}
        {still ? null : <div ref={hint} className="ss-park__hint" aria-hidden="true">Scroll<span aria-hidden="true">↓</span></div>}
      </div>
      {still ? <div className="ss-park__still-wrap"><picture><source media="(max-width: 749px)" srcSet={PHOTO_M.src} /><img className="ss-park__still" src={PHOTO.src} alt="A family on a bench in a park, the toddler holds the probiotic bottle" draggable="false" /></picture><Copy still /></div> : null}
    </section>
  );
}
