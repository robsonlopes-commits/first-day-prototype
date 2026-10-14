import { useEffect, useRef, useState } from 'react';
import './TempSubnav.css';

// sections/temp-subnav.liquid ("Persona pills"): sticky pill nav that jumps to in-page anchors, scroll-spy active state.
// Props = section settings (camelCase subset actually used by templates) + blocks: [{ label, icon, targetId, linkUrl, isDefaultActive }].
const hexAlpha = (hex, a) => {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
  if (!m) return hex;
  const n = parseInt(m[1], 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};
const handleize = (s) => String(s || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export default function TempSubnav({ id = 'temp_subnav', settings: s, blocks = [] }) {
  const ref = useRef(null);
  const [active, setActive] = useState(() => blocks.findIndex((b) => b.settings.is_default_active));
  const [stuck, setStuck] = useState(false);
  const scrollRaf = useRef(0);

  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    // layout/theme.liquid's header-height-sync: keep --header-height in step with the real header (fallback for sticky offset).
    const syncHeader = () => {
      const h = document.querySelector('#shopify-section-header .header-wrapper, #shopify-section-header');
      const visible = h && !document.querySelector('.mobile-navbar.header-scroll--hidden') ? h.getBoundingClientRect().height : 0;
      if (h) document.documentElement.style.setProperty('--header-height', `${Math.round(visible)}px`);
    };
    syncHeader();
    window.addEventListener('resize', syncHeader);

    // scroll-spy: IntersectionObserver with rootMargin -30% / -50%
    const targets = blocks
      .map((b, i) => ({ i, el: b.settings.link_url ? null : document.getElementById(handleize(b.settings.target_id)) }))
      .filter((t) => t.el);
    const spy = new IntersectionObserver(
      (entries) => {
        let best = null;
        entries.forEach((e) => { if (e.isIntersecting && (!best || e.intersectionRatio > best.intersectionRatio)) best = e; });
        if (!best) return;
        const m = targets.find((t) => t.el === best.target);
        if (m) setActive(m.i);
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
    );
    targets.forEach((t) => spy.observe(t.el));
    // sticky shadow
    const sentinel = root.querySelector('.persona-pills__sentinel');
    const stick = new IntersectionObserver(([e]) => setStuck(!e.isIntersecting), { threshold: 0 });
    if (sentinel) stick.observe(sentinel);
    return () => {
      window.removeEventListener('resize', syncHeader);
      spy.disconnect();
      stick.disconnect();
      cancelAnimationFrame(scrollRaf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // header-scroll hide on mobile toggles --header-height: re-sync via a MutationObserver on the navbar class
  useEffect(() => {
    const nav = document.querySelector('.mobile-navbar');
    if (!nav) return undefined;
    const mo = new MutationObserver(() => {
      const hidden = nav.classList.contains('header-scroll--hidden');
      const h = document.querySelector('#shopify-section-header .header-wrapper, #shopify-section-header');
      if (h) document.documentElement.style.setProperty('--header-height', hidden ? '0px' : `${Math.round(h.getBoundingClientRect().height)}px`);
    });
    mo.observe(nav, { attributes: true, attributeFilter: ['class'] });
    return () => mo.disconnect();
  }, []);

  const jump = (e, b) => {
    const target = document.getElementById(handleize(b.settings.target_id));
    if (!target) return;
    e.preventDefault();
    cancelAnimationFrame(scrollRaf.current);
    const mobile = window.matchMedia('(max-width: 749px)').matches;
    const offset = mobile ? s.jump_offset_mobile : s.jump_offset_desktop;
    const dest = Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset);
    window.history.replaceState(null, '', `#${handleize(b.settings.target_id)}`);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { window.scrollTo(0, dest); return; }
    const start = window.scrollY, dist = dest - start, t0 = performance.now();
    const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
    const cancel = () => { cancelAnimationFrame(scrollRaf.current); window.removeEventListener('wheel', cancel); window.removeEventListener('touchmove', cancel); };
    window.addEventListener('wheel', cancel, { passive: true });
    window.addEventListener('touchmove', cancel, { passive: true });
    const step = (now) => {
      const t = Math.min(1, (now - t0) / 300);
      window.scrollTo(0, start + dist * ease(t));
      if (t < 1) scrollRaf.current = requestAnimationFrame(step); else cancel();
    };
    scrollRaf.current = requestAnimationFrame(step);
  };

  const showHeading = s.show_heading && s.heading;
  const cls = [
    'persona-pills', `persona-pills--container-${s.container}`, `persona-pills--align-${s.alignment}`, `persona-pills--heading-${s.heading_position}`,
    `persona-pills--mobile-${s.mobile_behavior}`, `persona-pills--style-${s.pill_style}`, `persona-pills--active-${s.active_style}`, `persona-pills--size-${s.pill_size}`,
    s.sticky && 'persona-pills--sticky', s.show_divider && 'persona-pills--divided', stuck && 'persona-pills--stuck',
  ].filter(Boolean).join(' ');
  const font = (f) => `${f}, sans-serif`;
  const vars = {
    '--pp-bg': s.bg_color, '--pp-heading-color': s.heading_color,
    '--pp-heading-font': font(s.heading_font_family), '--pp-heading-font-style': s.heading_italic ? 'italic' : 'normal', '--pp-heading-font-weight': s.heading_font_weight,
    '--pp-heading-size-d': `${s.heading_font_size_desktop}px`, '--pp-heading-size-m': `${s.heading_font_size_mobile}px`,
    '--pp-pill-font': font(s.pill_font_family), '--pp-pill-font-weight': s.pill_font_weight, '--pp-pill-letter-spacing': `${s.pill_letter_spacing / 100}em`,
    '--pp-pill-size-d': `${s.pill_font_size_desktop}px`, '--pp-pill-size-m': `${s.pill_font_size_mobile}px`,
    '--pp-pill-bg': s.pill_bg_color, '--pp-pill-border': s.pill_border_color, '--pp-pill-text': s.pill_text_color,
    '--pp-pill-hover-bg': s.pill_hover_bg_color, '--pp-pill-hover-border': s.pill_hover_border_color, '--pp-pill-hover-text': s.pill_hover_text_color,
    '--pp-pill-active-bg': s.pill_active_bg_color, '--pp-pill-active-border': s.pill_active_border_color, '--pp-pill-active-text': s.pill_active_text_color,
    '--pp-pill-active-tint': hexAlpha(s.pill_active_bg_color, 0.1), '--pp-pill-active-shadow': hexAlpha(s.pill_active_bg_color, 0.18),
    '--pp-divider-color': s.divider_color, '--pp-divider-width': `${s.divider_width}px`, '--pp-divider-style': s.divider_style,
    '--pp-pad-top-d': `${s.pad_top_d}px`, '--pp-pad-right-d': `${s.pad_right_d}px`, '--pp-pad-bottom-d': `${s.pad_bottom_d}px`, '--pp-pad-left-d': `${s.pad_left_d}px`,
    '--pp-pad-top-m': `${s.pad_top_m}px`, '--pp-pad-right-m': `${s.pad_right_m}px`, '--pp-pad-bottom-m': `${s.pad_bottom_m}px`, '--pp-pad-left-m': `${s.pad_left_m}px`,
    '--pp-pill-pad-x': `${s.pill_padding_x}px`, '--pp-pill-pad-y': `${s.pill_padding_y}px`, '--pp-pill-radius': `${s.pill_radius}px`, '--pp-pill-border-width': `${s.pill_border_width}px`,
    '--pp-icon-size': `${s.icon_size / 10}em`, '--pp-icon-gap': `${s.gap_icon_label}px`, '--pp-gap': `${s.gap_pills}px`, '--pp-gap-mobile': `${s.gap_pills_mobile}px`, '--pp-gap-heading': `${s.gap_heading_pills}px`,
  };
  const stickyCss = s.sticky ? `
#shopify-section-${id} { position: sticky; inset-block-start: var(--header-height, ${s.sticky_offset_desktop}px); z-index: 99; transition: inset-block-start 0.2s cubic-bezier(0.2, 0.8, 0.2, 1); }
@media screen and (max-width: 749px) { #shopify-section-${id} { inset-block-start: var(--header-height, ${s.sticky_offset_mobile}px); } }
body:has(.mobile-navbar.header-scroll--hidden) #shopify-section-${id} { inset-block-start: 0; z-index: 101; }` : '';

  return (
    <div id={`shopify-section-${id}`} className="shopify-section shopify-section--persona-pills">
      {stickyCss && <style>{stickyCss}</style>}
      <persona-pills ref={ref} id={`PersonaPills-${id}`} class={cls} data-sticky={String(!!s.sticky)} style={vars}>
        {s.sticky && <div className="persona-pills__sentinel" aria-hidden="true" />}
        <div className="persona-pills__inner">
          <nav className="persona-pills__nav" aria-label={s.aria_label || 'Shop by audience'}>
            {showHeading && <p id={`PersonaPillsHeading-${id}`} className="persona-pills__heading">{s.heading}</p>}
            <ul className="persona-pills__list" role="list" aria-labelledby={showHeading ? `PersonaPillsHeading-${id}` : undefined}>
              {blocks.map((b, i) => {
                const bs = b.settings;
                const isAnchor = !bs.link_url;
                const target = handleize(bs.target_id);
                const on = i === active;
                const custom = bs.use_custom_colors ? {
                  '--pp-pill-bg': bs.custom_bg_color, '--pp-pill-border': bs.custom_border_color, '--pp-pill-text': bs.custom_text_color,
                  '--pp-pill-hover-bg': hexAlpha(bs.custom_active_bg_color, 0.1), '--pp-pill-hover-border': bs.custom_active_bg_color, '--pp-pill-hover-text': bs.custom_active_bg_color,
                  '--pp-pill-active-bg': bs.custom_active_bg_color, '--pp-pill-active-border': bs.custom_active_bg_color, '--pp-pill-active-text': bs.custom_active_text_color,
                  '--pp-pill-active-tint': hexAlpha(bs.custom_active_bg_color, 0.1), '--pp-pill-active-shadow': hexAlpha(bs.custom_active_bg_color, 0.18),
                } : undefined;
                return (
                  <li key={b.id} className="persona-pills__item">
                    <a
                      className={`persona-pills__pill${on ? ' persona-pills__pill--active' : ''}`}
                      href={isAnchor ? `#${target}` : bs.link_url}
                      data-target={isAnchor ? target : undefined}
                      aria-current={on ? 'location' : undefined}
                      style={custom}
                      onClick={isAnchor ? (e) => jump(e, b) : undefined}
                    >
                      {bs.icon && <span className="persona-pills__icon" aria-hidden="true">{bs.icon}</span>}
                      <span className="persona-pills__label">{bs.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </persona-pills>
    </div>
  );
}
