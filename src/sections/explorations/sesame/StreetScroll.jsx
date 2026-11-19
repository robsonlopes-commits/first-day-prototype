import { useEffect, useRef, useState } from 'react';
import ModernWave from '../../../components/ModernWave.jsx';
import { LOGO } from './ss.jsx';
import './street.css';

// EXPLORATION Sesame Street: the street scene section (right under the buy box). A full width, full height scene made from the owner's street.svg, drawn as separate raster layers
// (public/assets/sesame/street/, cut from the SVG by z order, art never redrawn) that move while the shopper scrolls, and then the camera zooms into the window of the second floor
// until a picture of the inside of the house fills the screen (an AI generated mockup of a family at home for now).
// How it works: the section is a tall runway (RUNWAY of screen heights) with a sticky stage of one screen. The scroll progress P (0 to 1) drives a camera over the scene (cx, cy, zoom):
//   phase A (P 0 to A_END): the camera pans along the street while the characters hop a little towards the house and the layers move at their own speed (parallax)
//   phase B (A_END to 1): the camera zooms into the window; the inside picture is clipped to the glass of the window (so it grows out of it) and fills the screen at the end.
// The scene is 641 x 314 units (the viewBox of street2.svg, 24 units taller than the first street.svg: more sky and the top of the building). Everything below is in those units. Every layer is sized and moved in real pixels each frame (no big scaled
// compositor layers: a 6410 px wide world with will-change left white, unrasterized tiles at the bottom on the first scroll).
// Sesame Workshop guidelines: no character speaks or touches the product here, characters keep their size ratio, are not flipped and stay right side up.
const BASE = '/assets/sesame/street/';
// the picture of the inside: a wide one (the owner's adaptation of an AI generated mockup, plain wall on the left for text, family on the right) and a tall one for phones (empty wall and ceiling on top for the text, family at the bottom).
// It is a fixed cover fit of the screen (css object-position in street.css) seen through the glass of the window: the glass starts on the plain wall and a bit of the sofa and shows the people as it grows. The picture does not slide.
const INSIDE = { src: '/assets/custom/ss-house-inside-v2.webp' };
const INSIDE_M = { src: '/assets/custom/ss-house-inside-mobile-v2.webp' };
const isPhone = () => window.matchMedia('(max-width: 749px)').matches;
const SCENE = { w: 641, h: 314 };
const PANE = { x: 103, y: 97, w: 19, h: 30 }; // the glass of the highlighted window (second floor, the one above the little plant)
const RUNWAY = 5.2; // screen heights of scroll
const A_END = 0.44; // end of the pan (phase A)
const TB_END = 0.86; // end of the zoom (phase B); the rest of the runway keeps the picture and its text still on screen so there is time to read them
const CX_START = 510; const CX_PAN_END = 150; // where the camera looks at the start and at the end of the pan (clamped to the scene)

// the layers back to front. x y w h: where the picture sits in the scene (units). f: how fast it moves with the camera (1 = like the street, less = farther away, more = closer)
const ABBY = { dx: -16, float: 11, sway: 3 }; // the fairy and her sparkles share this motion
const LAYERS = [
  { key: 'sky', x: 0, y: 0, w: 641, h: 314, f: 1 },
  { key: 'cloud1', x: 439.22, y: 79.401, w: 49.64, h: 18.34, cloud: { amp: 70, dur: 52, delay: 0 } }, // drifts left and right on its own, whatever the scroll does
  { key: 'cloud2', x: 227.558, y: 66.19, w: 32.86, h: 10.68, cloud: { amp: 90, dur: 64, delay: -14 } }, // drifts left and right on its own, whatever the scroll does
  { key: 'cloud3', x: 386.5, y: 59.541, w: 52.06, h: 19.03, cloud: { amp: 60, dur: 46, delay: -30 } }, // drifts left and right on its own, whatever the scroll does
  { key: 'cloud4', x: 547.489, y: 43.98, w: 73.55, h: 24.72, cloud: { amp: 50, dur: 58, delay: -8 } }, // drifts left and right on its own, whatever the scroll does
  { key: 'cloud5', x: 227.94, y: 0, w: 40.0, h: 10.689, cloud: { amp: 80, dur: 70, delay: -40 } }, // drifts left and right on its own, whatever the scroll does
  { key: 'far', x: 0, y: 123.279, w: 641, h: 77.71, f: 0.85 },
  { key: 'street', x: 0, y: 0, w: 641, h: 314, f: 1 },
  { key: 'window', x: 95, y: 87, w: 36, h: 48, f: 1, detail: true }, // the window at 60 px per unit: crossfades in when the camera is close
  { key: 'fgback', x: 148.149, y: 218.85, w: 492.851, h: 95.15, f: 1.12 },
  { key: 'abby', x: 265.679, y: 39.659, w: 99.93, h: 92.059, move: ABBY },
  { key: 'spStarA', x: 356.659, y: 47.63, w: 9.1, h: 9.25, move: ABBY, tw: { dur: 1.9, delay: 0, spin: true } },
  { key: 'spStarB', x: 342.739, y: 94.35, w: 6.98, h: 7.07, move: ABBY, tw: { dur: 2.4, delay: 0.7, spin: true } },
  { key: 'spStarC', x: 362.999, y: 57.93, w: 5.45, h: 5.52, move: ABBY, tw: { dur: 1.7, delay: 1.2, spin: true } },
  { key: 'spStarD', x: 257.31, y: 120.3, w: 8.61, h: 8.6, move: ABBY, tw: { dur: 2.1, delay: 0.4, spin: true } },
  { key: 'spDotsA', x: 283.48, y: 58.509, w: 9.599, h: 15.13, move: ABBY, tw: { dur: 1.6, delay: 0.3 } },
  { key: 'spDotsB', x: 315.97, y: 41.009, w: 13.95, h: 8.05, move: ABBY, tw: { dur: 2.0, delay: 1.0 } },
  { key: 'spDotsC', x: 338.97, y: 59.11, w: 19.29, h: 47.79, move: ABBY, tw: { dur: 1.8, delay: 0.1 } },
  { key: 'spDotsD', x: 264.499, y: 91.49, w: 17.881, h: 41.65, move: ABBY, tw: { dur: 2.3, delay: 0.8 } },
  { key: 'cookie', x: 206.189, y: 113.909, w: 62.95, h: 97.201, move: { dx: -15, hop: 2.5, n: 2 } },
  { key: 'zoe', x: 342.018, y: 112.35, w: 104.311, h: 99.781, move: { dx: -18, hop: 6, n: 4 } },
  { key: 'elmo', x: 436.148, y: 75.81, w: 147.39, h: 136.21, move: { dx: -20, hop: 7, n: 3 }, mScale: 0.88 },
  { key: 'tango', x: 280.499, y: 141.0, w: 64.039, h: 73.459, move: { dx: -16, hop: 4, n: 5 } },
  { key: 'fgfront', file: 's3-fgfront.webp', x: -128.49, y: 199.609, w: 702.18, h: 114.391, f: 1.25 }, // drawn past the left edge of the scene (-128), the parallax slides it to the right and its left end must never show,
  { key: 'butterfly', x: 91.189, y: 224.15, w: 38.87, h: 36.36, f: 1.25, fly: true }, // floats a little on its own (no wing flap, squeezing the flat picture looked like a fake 3D turn)
];

const src = (l) => `${BASE}${l.file || `s2-${l.key}.webp`}`;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - ((-2 * t + 2) ** 3) / 2); // in out cubic
const hop = (amp, n, p) => -amp * Math.abs(Math.sin(Math.PI * n * p)); // n whole hops, back on the ground at p = 1


// the content on the plain wall of the inside picture (left on wide screens, over the top of the picture on a phone). Words of the owner's brief (2026-11-19), invented, pending owner review.
// No character speaks here and the logo sits alone above the words (Sesame Workshop guidelines: the logo never goes next to a character line that sounds like an endorsement).
const goTop = (e) => { e.preventDefault(); (document.getElementById('top') || document.body).scrollIntoView({ behavior: 'smooth' }); };
const Copy = ({ innerRef, still }) => (
  <div ref={innerRef} className={`ss-street__copy${still ? ' is-still' : ''}`}>
    <img className="ss-street__logo" src={LOGO} alt="Sesame Street" draggable="false" />
    <h2 className="ss-street__title">Happy Tummies <span className="ss-street__hl">Start At Home</span></h2>
    <p className="ss-street__desc">Gentle gut support for toddlers, in one yummy daily gummy.</p>
    <p className="ss-street__text">Our 3 in 1 pre, post and probiotic helps support softer, easier to pass stools,* with no junk and nothing fake. Because potty time should feel a little more like a good day.</p>
    <a className="ss-street__cta" href="#top" onClick={goTop}>Start The Adventure</a>
  </div>
);

export default function StreetScroll() {
  const section = useRef(null);
  const stage = useRef(null);
  const inside = useRef(null);
  const hint = useRef(null);
  const copy = useRef(null);
  const insideImg = useRef(null);
  const layerEls = useRef({});
  const [still, setStill] = useState(false); // prefers-reduced-motion: the scene stays still and the inside picture sits below it

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setStill(mq.matches);
    on(); mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  // the Elmo mascot and the Tango that runs by (fixed at the bottom of the page) are hidden while this section is on screen: the scene already has its own characters
  useEffect(() => () => document.body.classList.remove('ss-in-street'), []); // the class is set by the scroll loop below

  // warm the pictures (decoded) before the shopper gets here, so the scene never pops in while scrolling
  useEffect(() => {
    LAYERS.forEach((l) => { const im = new Image(); im.src = src(l); if (im.decode) im.decode().catch(() => {}); });
    const inner = new Image(); inner.src = (isPhone() ? INSIDE_M : INSIDE).src; if (inner.decode) inner.decode().catch(() => {});
  }, []);

  useEffect(() => {
    const sec = section.current; const st = stage.current;
    if (!sec || !st) return undefined;
    let raf = 0; let vw = 0; let vh = 0;

    const draw = () => {
      raf = 0;
      const r = sec.getBoundingClientRect();
      document.body.classList.toggle('ss-in-street', r.top < vh && r.bottom > 0);
      const runway = Math.max(1, r.height - vh);
      const P = still ? 0 : clamp(-r.top / runway, 0, 1);
      const pa = clamp(P / A_END, 0, 1); // pan progress
      const tb = ease(clamp((P - A_END) / (TB_END - A_END), 0, 1)); // zoom progress

      // the camera: "cover" zoom at rest (the scene fills the screen in both directions), then the zoom into the window
      const z0 = Math.max(vw / SCENE.w, vh / SCENE.h);
      const zEnd = Math.max(vh / PANE.h, vw / PANE.w) * 1.03;
      const z = z0 * (zEnd / z0) ** tb;
      const halfW = vw / (2 * z); const halfH = vh / (2 * z);
      const half0 = vw / (2 * z0);
      const cxA = clamp(lerp(CX_START, CX_PAN_END, pa), half0, SCENE.w - half0); // pan at the rest zoom
      const cxEnd = PANE.x + PANE.w / 2;
      const tp = 1 - (1 - tb) ** 2.6; // the camera moves to the window faster than it zooms, so the window is never off screen while we dive
      const cx = clamp(lerp(cxA, cxEnd, tp), halfW, SCENE.w - halfW);
      const cyStart = vh / (2 * z0); // on a screen wider than the scene the picture is cropped top and bottom: keep the TOP (more sky, the top of the building, Abby lower on the screen) and crop the bottom instead. On a tall phone this is the middle, the whole height fits.
      const cy = clamp(lerp(cyStart, PANE.y + PANE.h / 2, tp), halfH, SCENE.h - halfH);
      const cxStart = clamp(CX_START, half0, SCENE.w - half0);
      const shift = cxStart - cx; // how far the camera has moved to the left: parallax layers use it
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
        const k = l.mScale && vw < 750 ? l.mScale : 1; // on a phone only a slice of the street shows: Elmo is a little smaller (anchored at his feet) so that his hand is not cut at the start
        const pw0 = l.w * z; const ph0 = l.h * z; const pw = pw0 * k; const ph = ph0 * k;
        const px = tx + (l.x + dx) * z + (pw0 - pw) / 2; const py = ty + (l.y + dy) * z + (ph0 - ph);
        const seen = px < vw + 40 && px + pw > -40 && py < vh + 40 && py + ph > -40 && !(l.detail && z <= 7); // off screen layers are not drawn (the 60 px per unit crop is only needed up close)
        el.style.visibility = seen ? 'visible' : 'hidden';
        if (!seen) return;
        el.style.width = `${pw}px`; el.style.height = `${ph}px`;
        el.style.transform = `translate(${px}px, ${py}px)`;
      });

      // the inside of the house: clipped to the glass of the window, so it grows out of it, and at the end the glass is bigger than the screen
      const L = Math.max(0, tx + PANE.x * z); const T = Math.max(0, ty + PANE.y * z);
      const R = Math.max(0, vw - (tx + (PANE.x + PANE.w) * z)); const B = Math.max(0, vh - (ty + (PANE.y + PANE.h) * z));
      const ins = inside.current;
      if (ins) {
        const w = clamp((tb - 0.82) / 0.18, 0, 1) ** 2; // over the last of the zoom the glass opens up to the whole screen, so no band of the window art is left above or below the picture (on a phone the glass is wider than the screen before it is taller)
        ins.style.clipPath = `inset(${T * (1 - w)}px ${R * (1 - w)}px ${B * (1 - w)}px ${L * (1 - w)}px)`;
        ins.style.opacity = String(clamp((tb - 0.8) / 0.04, 0, 1)); // the room is only shown when the window is very close (before that the glass keeps its own art); solid, no see through glass
        const img = insideImg.current;
        if (img) img.style.transform = `scale(${1.14 - 0.14 * tb})`; // the picture itself stays put (a fixed cover fit of the screen) and only settles in a little; the glass reveals more of it as it grows
      }
      if (copy.current) { // the text on the plain wall of the picture comes in once the zoom has landed
        const o = clamp((P - TB_END) / 0.06, 0, 1); const c = copy.current; // after the zoom has landed
        c.style.opacity = String(o); c.style.visibility = o > 0 ? 'visible' : 'hidden'; c.style.pointerEvents = o > 0.6 ? 'auto' : 'none'; c.style.setProperty('--ty', `${(1 - o) * 18}px`);
      }
      if (hint.current) hint.current.style.opacity = String(clamp(1 - tb / 0.2, 0, 1)); // on all through the street, gone as we go through the window
    };
    const schedule = () => { if (!raf) raf = window.requestAnimationFrame(draw); };
    const measure = () => { vw = st.clientWidth; vh = st.clientHeight; draw(); }; // drawn at once (not on the next frame), so the first paint is never an empty stage

    measure();
    const ro = new ResizeObserver(measure); ro.observe(st);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => { ro.disconnect(); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); if (raf) window.cancelAnimationFrame(raf); };
  }, [still]);

  return (
    <section ref={section} className={`ss-street${still ? ' is-still' : ''}`} style={still ? undefined : { '--ss-street-runway': RUNWAY }} aria-label="A Sesame Street scene. Keep scrolling to look through a window into the house.">
      {/* the flat wave of the Sesame pages where the buy box (white) meets the scene, instead of a straight line. It belongs to the top of the runway, so it scrolls away once the stage sticks */}
      {still ? null : <div className="ss-street__wave" aria-hidden="true"><ModernWave position="bottom" color="#ffffff" containerBackground="transparent" /></div>}
      <div ref={stage} className="ss-street__stage">
        {LAYERS.map((l) => (
          <div key={l.key} ref={(el) => { layerEls.current[l.key] = el; }} className={`ss-street__layer${l.tw ? ` ss-street__tw${l.tw.spin ? ' is-star' : ''}` : ''}${l.cloud ? ' ss-street__cloud' : ''}`} style={{ visibility: 'hidden', ...(l.tw ? { '--tw-dur': `${l.tw.dur}s`, '--tw-delay': `${l.tw.delay}s` } : {}), ...(l.cloud ? { '--cl-amp': `${l.cloud.amp}%`, '--cl-dur': `${l.cloud.dur}s`, '--cl-delay': `${l.cloud.delay}s` } : {}) }}>
            {l.fly ? <span className="ss-street__fly"><img src={src(l)} alt="" draggable="false" decoding="async" /></span> : <img src={src(l)} alt="" draggable="false" decoding="async" />}
          </div>
        ))}
        {still ? null : (
          <div ref={inside} className="ss-street__inside">
            <picture><source media="(max-width: 749px)" srcSet={INSIDE_M.src} /><img ref={insideImg} src={INSIDE.src} alt="" draggable="false" decoding="async" /></picture>
          </div>
        )}
        {still ? null : <Copy innerRef={copy} />}
        {still ? null : <div ref={hint} className="ss-street__hint" aria-hidden="true">Scroll<span aria-hidden="true">↓</span></div>}
      </div>
      {still ? <div className="ss-street__still-wrap"><picture><source media="(max-width: 749px)" srcSet={INSIDE_M.src} /><img className="ss-street__still" src={INSIDE.src} alt="A family on a sofa at home, the toddler holds the probiotic bottle" draggable="false" /></picture><Copy still /></div> : null}
    </section>
  );
}
