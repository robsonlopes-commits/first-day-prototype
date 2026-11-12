import { useEffect, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
// Helpers of the Sesame Street exploration of the Toddlers' Probiotic page (/explorations/sesame-toddlers-probiotic).
// Every character, prop and the logo is Version B (limited color) art of Sesame Workshop's House Style library, cropped from the artboards with tools/svg-crop.py
// (public/assets/sesame). Nothing here is redrawn or generated. Licensed art: keep it out of the public repo until the owner confirms (see the sesame-street skill).
export const CH = (name) => `/assets/sesame/characters/${name}.svg`;
export const PR = (name) => `/assets/sesame/props/${name}.svg`;
export const BOTTLE = '/assets/sesame/bottle-sesame-toddlers-probiotic.png';
export const BOTTLE_SQ = '/assets/sesame/bottle-sesame-square.jpg'; // the same bottle on a square white canvas, for the gallery
export const LOGO = '/assets/sesame/sesame-street-logo.svg';

// a character or prop image; `pop` = the class that animates it when it scrolls into view (see useReveal in Fx.jsx)
export function Char({ n, prop = false, className = '', style, alt = '', pop }) {
  return <img className={`ss-char ${className}${pop ? ` ss-reveal ss-reveal--${pop}` : ''}`} src={prop ? PR(n) : CH(n)} alt={alt} style={style} draggable="false" />;
}

// a speech bubble (the tail points down-left by default, `tail="right"` to the right)
export function Bubble({ children, tail = 'left', className = '', style }) {
  return <span className={`ss-bubble ss-bubble--${tail} ${className}`} style={style}>{children}</span>;
}

// big colorful digits of the library (props num-0 to num-9), for the Count
export function Digits({ value, className = '' }) {
  return <span className={`ss-digits ${className}`} aria-label={String(value)}>{String(value).split('').map((d, i) => (/\d/.test(d) ? <img key={i} src={PR(`num-${d}`)} alt="" draggable="false" /> : <b key={i}>{d}</b>))}</span>;
}

// round-cornered shapes in the palette of the House Style confetti, drawn with CSS (the library has a confetti artboard, but it is layered: these are plain shapes)
export const PALETTE = ['#ffd400', '#00ab4e', '#e8202f', '#2f8fe0', '#f7941d', '#8a5cc4', '#f0489c'];
export function Sparkles({ count = 12, seed = 1, className = '' }) {
  const items = Array.from({ length: count }, (_, i) => {
    const r = (n) => { const x = Math.sin((i + 1) * 12.9898 * seed + n * 78.233) * 43758.5453; return x - Math.floor(x); };
    return { left: `${Math.round(r(1) * 96)}%`, top: `${Math.round(r(2) * 92)}%`, size: 1.2 + r(3) * 2.4, color: PALETTE[Math.floor(r(4) * PALETTE.length)], shape: Math.floor(r(5) * 3), delay: `${(r(6) * 4).toFixed(1)}s`, rot: Math.round(r(7) * 80 - 40) };
  });
  return <span className={`ss-sparkles ${className}`} aria-hidden="true">{items.map((it, i) => <i key={i} className={`ss-sparkle ss-sparkle--${it.shape}`} style={{ left: it.left, top: it.top, width: `${it.size}cqw`, height: `${it.size * (it.shape === 2 ? 0.45 : 1)}cqw`, background: it.color, animationDelay: it.delay, '--rot': `${it.rot}deg` }} />)}</span>;
}

// A sticker host for sections whose picture is rendered by a shared component: finds the picture element inside the section (`sec` = the section id, `target` = a selector, `at` =
// which match) AFTER it is mounted and renders `children` (a `.ss-ov` layer of stickers) inside it, so the shared section does not need an overlay hook. The picture stays a file
// (or a video) of the theme, the stickers only sit on top of it.
export function Stick({ sec, target, at = 0, parent = false, children }) {
  const [host, setHost] = useState(null);
  const [box, setBox] = useState(null);
  useLayoutEffect(() => {
    let off = 0;
    const find = () => {
      const el0 = document.querySelectorAll(`#${sec} ${target}`)[at];
      const el = el0 && parent ? el0.parentElement : el0; // a <video> cannot hold children: use its wrapper
      if (!el) return;
      if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
      setHost(el);
      if (parent) setBox({ top: el0.offsetTop, left: el0.offsetLeft, width: el0.offsetWidth, height: el0.offsetHeight }); // the layer covers the picture, not the whole card
    };
    find();
    const t = window.setTimeout(find, 600);
    window.addEventListener('resize', find);
    return () => { window.clearTimeout(t); window.removeEventListener('resize', find); off += 1; };
  }, [sec, target, at, parent]);
  return host ? createPortal(<div className="ss-ov" style={box ? { inset: 'auto', ...box } : undefined}>{children}</div>, host) : null;
}

// Owner rule: ONLY Sofia Pro. The Clinicians' Choice widget (FrontrowMD) is a third party iframe with its own fonts (Lora and Open Sans): copy the Sofia Pro @font-face rules of the page
// into it and force them. The widget is replaced on every load, so this runs again every second.
const sofiaFaces = () => {
  const out = [];
  for (const sheet of document.styleSheets) {
    try { for (const r of sheet.cssRules) if (r.type === CSSRule.FONT_FACE_RULE && /sofia-pro/i.test(r.style.getPropertyValue('font-family'))) out.push(r.cssText); } catch { /* cross-origin sheet */ }
  }
  return out.join('\n');
};
const fixIframeFonts = () => document.querySelectorAll('.ss-page iframe').forEach((f) => {
  try {
    const d = f.contentDocument;
    if (!d || !d.head || d.getElementById('ss-fonts')) return;
    const st = d.createElement('style'); st.id = 'ss-fonts';
    st.textContent = `${sofiaFaces()}\n* { font-family: 'sofia-pro', sans-serif !important; }`; d.head.appendChild(st);
  } catch { /* cross-origin iframe: nothing to do */ }
});
export function useSofiaInIframes() {
  useEffect(() => { fixIframeFonts(); const t = window.setInterval(fixIframeFonts, 1000); return () => window.clearInterval(t); }, []);
}
