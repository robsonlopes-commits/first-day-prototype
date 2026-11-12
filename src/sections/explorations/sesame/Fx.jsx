import { useCallback, useEffect, useRef, useState } from 'react';
import { Char, Bubble, PALETTE, PR } from './ss.jsx';

// The things that move on the Sesame Street edition: Elmo (bottom left, tap him), Tango who runs across the page, confetti when something is added to the cart,
// a rain of rubber duckies (tap the Sesame Street sign) and the characters that pop in when a section scrolls into view.
const POSES = ['elmo-wave', 'elmo-hello', 'elmo-cheer', 'elmo-dance', 'elmo-point', 'elmo-think', 'elmo-jump'];
const LINES = ['Hi! Elmo is so happy you are here!', 'Elmo says a happy gut makes a happy tummy!', 'Elmo learned pre, pro and post. Three in one!', 'Two gummies a day. Grown-ups give them!', 'Elmo loves you!', 'Tap the Sesame Street sign. Elmo has a surprise!'];
const reduced = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function useReveal() {
  useEffect(() => {
    const els = () => [...document.querySelectorAll('.ss-reveal:not(.is-in)')];
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { threshold: 0.2 });
    els().forEach((el) => io.observe(el));
    const mo = new MutationObserver(() => els().forEach((el) => io.observe(el)));
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
}

export default function SesameFx({ lines = LINES }) {
  useReveal();
  const [pose, setPose] = useState(0);
  const [line, setLine] = useState(null);
  const [hop, setHop] = useState(0);
  const [tango, setTango] = useState(0); // a key: each change runs Tango across the page once
  const [bursts, setBursts] = useState([]);
  const [rain, setRain] = useState(0);
  const lineTimer = useRef(null);
  const next = useRef(0);

  const say = useCallback((text, ms = 3200) => { setLine(text); clearTimeout(lineTimer.current); lineTimer.current = setTimeout(() => setLine(null), ms); }, []);
  const tap = () => {
    next.current += 1; setPose((next.current) % POSES.length); setHop((h) => h + 1); say(lines[next.current % lines.length]);
    if (next.current % 4 === 0) setTango((k) => k + 1);
  };

  useEffect(() => {
    const onCelebrate = () => {
      setPose(POSES.indexOf('elmo-jump')); setHop((h) => h + 1); say('Yay! Elmo is so happy!', 3600); setTango((k) => k + 1);
      if (!reduced()) setBursts((b) => [...b, Date.now()]);
    };
    const onDucks = () => { setRain((k) => k + 1); say('Rubber duckies! Splish splash!', 3600); setPose(POSES.indexOf('elmo-dance')); };
    window.addEventListener('ss:celebrate', onCelebrate);
    window.addEventListener('ss:ducks', onDucks);
    const t = setTimeout(() => { setTango(1); say('Hi! Tap Elmo to play!', 4200); }, 2200);
    return () => { window.removeEventListener('ss:celebrate', onCelebrate); window.removeEventListener('ss:ducks', onDucks); clearTimeout(t); clearTimeout(lineTimer.current); };
  }, [say]);

  useEffect(() => { if (!bursts.length) return undefined; const t = setTimeout(() => setBursts((b) => b.slice(1)), 3200); return () => clearTimeout(t); }, [bursts]);

  return (
    <div className="ss-fx" aria-hidden="false">
      <div className="ss-mascot">
        {line && <Bubble key={line} tail="left" className="ss-mascot__bubble">{line}</Bubble>}
        <button type="button" className="ss-mascot__btn" onClick={tap} aria-label="Say hello to Elmo">
          <span key={hop} className="ss-mascot__hop"><Char n={POSES[pose]} className="ss-mascot__img" /></span>
        </button>
      </div>
      {tango > 0 && <div key={`t${tango}`} className="ss-tango" aria-hidden="true"><Char n="tango-run" className="ss-tango__img" /></div>}
      {bursts.map((id) => <Confetti key={id} />)}
      {rain > 0 && <DuckRain key={`r${rain}`} />}
    </div>
  );
}

function Confetti() {
  const pieces = Array.from({ length: 46 }, (_, i) => {
    const r = (n) => { const x = Math.sin((i + 1) * 91.7 + n * 17.31) * 10000; return x - Math.floor(x); };
    return { left: `${Math.round(r(1) * 100)}%`, color: PALETTE[i % PALETTE.length], size: 8 + Math.round(r(2) * 12), dur: (1.6 + r(3) * 1.6).toFixed(2), delay: (r(4) * 0.5).toFixed(2), drift: Math.round(r(5) * 160 - 80), shape: i % 3, rot: Math.round(r(6) * 720) };
  });
  return <div className="ss-confetti" aria-hidden="true">{pieces.map((p, i) => <i key={i} className={`ss-confetti__p ss-confetti__p--${p.shape}`} style={{ left: p.left, background: p.color, width: p.size, height: p.shape === 2 ? p.size * 0.45 : p.size, animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s`, '--drift': `${p.drift}px`, '--rot': `${p.rot}deg` }} />)}</div>;
}

function DuckRain() {
  const [gone, setGone] = useState(false);
  useEffect(() => { const t = setTimeout(() => setGone(true), 5200); return () => clearTimeout(t); }, []);
  if (gone) return null;
  const ducks = Array.from({ length: 22 }, (_, i) => {
    const r = (n) => { const x = Math.sin((i + 1) * 53.3 + n * 9.7) * 10000; return x - Math.floor(x); };
    return { left: `${Math.round(r(1) * 96)}%`, size: 46 + Math.round(r(2) * 46), dur: (2.6 + r(3) * 2).toFixed(2), delay: (r(4) * 1.6).toFixed(2), side: i % 2, sway: Math.round(r(5) * 80 - 40) };
  });
  return <div className="ss-ducks" aria-hidden="true">{ducks.map((d, i) => <img key={i} src={PR(d.side ? 'duck-side' : 'duck-front')} alt="" style={{ left: d.left, width: d.size, animationDuration: `${d.dur}s`, animationDelay: `${d.delay}s`, '--sway': `${d.sway}px` }} />)}</div>;
}
