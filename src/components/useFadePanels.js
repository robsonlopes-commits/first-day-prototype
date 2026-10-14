import { useRef, useState } from 'react';

// Tab panels that cross-fade while the viewport height animates (pbfcm-carousel-extended.js / pbfcm-comparison-table-extended.js).
// Immediate switch below 600px, like the theme scripts. Class names: is-active, is-fading-in, is-fading-out, is-transitioning, is-measuring.
export default function useFadePanels(firstKey) {
  const [active, setActive] = useState(firstKey);
  const [trans, setTrans] = useState({ leaving: null, fadingIn: null, on: false, height: null });
  const viewportRef = useRef(null);
  const panelRefs = useRef({});
  const busy = useRef(false);

  const activate = (key) => {
    if (!key || key === active) return;
    const vp = viewportRef.current;
    if (busy.current) return;
    if (!vp || window.matchMedia('(max-width: 599px)').matches) { setActive(key); return; }
    busy.current = true;
    const next = panelRefs.current[key];
    const curH = vp.offsetHeight;
    const wasHidden = next.hidden;
    next.hidden = false; next.classList.add('is-measuring');
    const nextH = next.offsetHeight;
    next.classList.remove('is-measuring'); next.hidden = wasHidden;
    setTrans({ leaving: active, fadingIn: key, on: true, height: curH });
    setActive(key);
    requestAnimationFrame(() => requestAnimationFrame(() => setTrans((t) => ({ ...t, fadingIn: null, height: nextH }))));
    setTimeout(() => { setTrans({ leaving: null, fadingIn: null, on: false, height: null }); busy.current = false; }, 400);
  };

  return {
    active, activate, transitioning: trans.on,
    viewportProps: (cls) => ({ ref: viewportRef, className: `${cls}${trans.on ? ' is-transitioning' : ''}`, style: trans.height != null ? { height: trans.height } : undefined }),
    panelProps: (key, cls) => {
      const isActive = key === active;
      const leaving = trans.leaving === key;
      return {
        ref: (el) => { panelRefs.current[key] = el; },
        className: `${cls}${isActive ? ' is-active' : ''}${trans.fadingIn === key ? ' is-fading-in' : ''}${leaving ? ' is-fading-out' : ''}`,
        role: 'tabpanel', hidden: !isActive && !leaving, 'aria-hidden': !isActive,
      };
    },
  };
}
