import { useCallback, useEffect, useRef, useState } from 'react';
import '../styles/theme/fd-pdp-jump-nav.css';

// sections/fd-pdp-jump-nav.liquid + assets/fd-pdp-jump-nav.js (sticky tabs, scroll spy, smooth scroll).
// Props: { id, settings, blocks } as in the template JSON (see src/data/pdpNewNarrative.js: JUMP_NAV_PDP_NEW).
// Block type 'link': settings { title, key }. key is handleized; targets are the `.fd-jump-anchor` hooks (id = key).
const handle = (k) => String(k || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

// layout/theme.liquid header-height-sync: keeps --header-height / --header-height-1 in step with .header-wrapper-container.
function useHeaderHeightSync() {
  useEffect(() => {
    let raf = 0;
    const update = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const header = document.querySelector('.header-wrapper-container');
        const hidden = document.querySelector('.mobile-navbar.header-scroll--hidden');
        const h = header && getComputedStyle(header).display !== 'none' ? header.offsetHeight : 0;
        const root = document.documentElement.style;
        root.setProperty('--header-height', `${h}px`);
        root.setProperty('--header-height-1', `${Math.max(h - 1, 0)}px`);
        root.setProperty('--fd-jn-header-hidden', hidden ? '1' : '0');
      });
    };
    update();
    const header = document.querySelector('.header-wrapper-container');
    const ro = typeof ResizeObserver !== 'undefined' && header ? new ResizeObserver(update) : null;
    if (ro) ro.observe(header);
    const mo = new MutationObserver(update);
    if (header) mo.observe(header, { attributes: true, attributeFilter: ['style', 'class'], childList: true, subtree: true });
    window.addEventListener('resize', update);
    const t = setTimeout(update, 400);
    return () => { if (ro) ro.disconnect(); mo.disconnect(); window.removeEventListener('resize', update); clearTimeout(t); cancelAnimationFrame(raf); };
  }, []);
}

export default function FdPdpJumpNav({ id = 'fd_pdp_jump_nav', settings: s = {}, blocks = [] }) {
  const links = blocks
    .filter((b) => b.settings.title && handle(b.settings.key))
    .map((b) => ({ id: b.id, title: b.settings.title, key: handle(b.settings.key) }));
  const [active, setActive] = useState(0);
  const [stuck, setStuck] = useState(false);
  const wrapRef = useRef(null);
  const navRef = useRef(null);
  const listRef = useRef(null);
  const lock = useRef(false);
  const raf = useRef(0);
  const activeRef = useRef(0);
  const linkKeys = links.map((l) => l.key).join('|');

  useHeaderHeightSync();

  const headerHeight = () => {
    if (document.querySelector('.mobile-navbar.header-scroll--hidden')) return 0;
    const parsed = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height'));
    if (!Number.isNaN(parsed) && parsed > 0) return parsed;
    const header = document.querySelector('.header-wrapper-container');
    return header ? Math.round(header.getBoundingClientRect().height) : 0;
  };
  const stickyTop = () => { const h = headerHeight(); return h > 0 ? h - 1 : 0; };

  const syncNavHeight = useCallback(() => {
    if (!navRef.current) return;
    document.documentElement.style.setProperty('--fd-jn-height', `${Math.round(navRef.current.getBoundingClientRect().height)}px`);
  }, []);

  const choose = useCallback((i) => {
    activeRef.current = i;
    setActive(i);
  }, []);

  const sync = useCallback(() => {
    const keys = linkKeys ? linkKeys.split('|') : [];
    if (!keys.length || !navRef.current || !wrapRef.current) return;
    setStuck(Math.round(wrapRef.current.getBoundingClientRect().top) <= stickyTop());
    if (lock.current) return;
    const line = stickyTop() + navRef.current.getBoundingClientRect().height + 2;
    let cur = 0;
    keys.forEach((k, i) => {
      const hook = document.getElementById(k);
      if (!hook) return;
      const el = hook.closest('.shopify-section') || hook;
      if (el.getBoundingClientRect().top <= line) cur = i;
    });
    if (cur !== activeRef.current) choose(cur);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkKeys, choose]);

  useEffect(() => {
    const onScroll = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => { raf.current = 0; sync(); });
    };
    const onResize = () => { syncNavHeight(); sync(); };
    syncNavHeight();
    sync();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    const hash = window.location.hash.replace(/^#/, '');
    const keys = linkKeys.split('|');
    if (hash && keys.includes(hash)) choose(keys.indexOf(hash));
    const t = setTimeout(() => { syncNavHeight(); sync(); }, 500);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); cancelAnimationFrame(raf.current); clearTimeout(t); };
  }, [sync, syncNavHeight, choose, linkKeys]);

  // keep the active tab visible in the horizontally scrolling mobile list
  useEffect(() => {
    const list = listRef.current;
    const link = list && list.children[active] && list.children[active].firstElementChild;
    if (!link || list.scrollWidth <= list.clientWidth) return;
    const left = link.offsetLeft;
    const right = left + link.offsetWidth;
    if (left < list.scrollLeft || right > list.scrollLeft + list.clientWidth) list.scrollTo({ left: left - (list.clientWidth - link.offsetWidth) / 2, behavior: 'smooth' });
  }, [active]);

  const onClick = (e, l, i) => {
    const hook = document.getElementById(l.key);
    if (!hook) return;
    e.preventDefault();
    lock.current = true;
    choose(i);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    hook.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    if (window.history.replaceState) window.history.replaceState(null, '', `#${l.key}`);
    let released = false;
    const unlock = () => { if (released) return; released = true; lock.current = false; sync(); };
    if (reduce) { setTimeout(unlock, 50); return; }
    if ('onscrollend' in window) { window.addEventListener('scrollend', unlock, { once: true }); setTimeout(unlock, 1200); } else setTimeout(unlock, 800);
  };

  // {% style %} block of the section (color_modify alpha 0.05 -> hex alpha 0d)
  const style = `
  #shopify-section-${id} {
    --fd-jn-padding-top-desktop: ${s.padding_top_desktop}px;
    --fd-jn-padding-right-desktop: ${s.padding_right_desktop}px;
    --fd-jn-padding-bottom-desktop: ${s.padding_bottom_desktop}px;
    --fd-jn-padding-left-desktop: ${s.padding_left_desktop}px;
    --fd-jn-padding-top-mobile: ${s.padding_top_mobile}px;
    --fd-jn-padding-right-mobile: ${s.padding_right_mobile}px;
    --fd-jn-padding-bottom-mobile: ${s.padding_bottom_mobile}px;
    --fd-jn-padding-left-mobile: ${s.padding_left_mobile}px;
    --fd-jn-bg-color: ${s.bar_bg_color};
    --fd-jn-font-family: ${s.font_family};
    --fd-jn-font-size-desktop: ${s.font_size_desktop}px;
    --fd-jn-font-size-mobile: ${s.font_size_mobile}px;
    --fd-jn-font-weight: ${s.font_weight};
    --fd-jn-line-height: ${s.line_height};
    --fd-jn-item-gap-desktop: ${s.item_gap_desktop}px;
    --fd-jn-active-color: ${s.active_color};
    --fd-jn-inactive-color: ${s.inactive_color};
    background-color: var(--fd-jn-bg-color, var(--color-surface-white, #ffffff));
  }`;

  return (
    <div id={`shopify-section-${id}`} className="shopify-section fd-pdp-jump-nav-section" ref={wrapRef}>
      <style>{style}</style>
      {links.length > 0 && (
        <fd-pdp-jump-nav class={`fd-jn${stuck ? ' is-stuck' : ''}`} ref={navRef}>
          <nav aria-label={s.nav_label}>
            <ul className="fd-jn__list" data-fd-jn-list ref={listRef}>
              {links.map((l, i) => (
                <li className="fd-jn__item" key={l.id}>
                  <a className={`fd-jn__link${i === active ? ' is-active' : ''}`} href={`#${l.key}`} data-fd-jn-link aria-current={i === active ? 'true' : undefined} onClick={(e) => onClick(e, l, i)}>
                    {l.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </fd-pdp-jump-nav>
      )}
    </div>
  );
}
