import { useEffect, useState } from 'react';
import '../styles/theme/fd-countdown-bar.css';

// sections/fd-countdown-bar.liquid (wraps snippets/temp-countdown-timer.liquid). Props: { id, settings } as in the template JSON.
// The theme counts down to the next local midnight, ticking once a second: same here (always "today ends in ...").
const pad = (n) => String(n).padStart(2, '0');
function untilMidnight() {
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
  const diff = Math.max(0, midnight - now);
  return { h: Math.floor(diff / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) };
}
export const useMidnightCountdown = () => {
  const [t, setT] = useState(untilMidnight);
  useEffect(() => { const i = setInterval(() => setT(untilMidnight()), 1000); return () => clearInterval(i); }, []);
  return t;
};

// snippets/temp-countdown-timer.liquid <style> with the section's default sizes resolved (title 14, subtitle 14, number 14, label 12)
const CSS = `
.countdown-bar { display: flex; padding: 12px var(--spacing-xs, 20px); justify-content: space-between; align-items: center; align-self: stretch; background: var(--color-brand-primary-noon-blue, #476DED); width: 100%; box-sizing: border-box; }
.countdown-bar__text { display: flex; flex-direction: column; gap: 2px; color: #fff; }
.countdown-bar__title { font-size: 14px; font-weight: 700; line-height: 1.3; color: #fff; margin: 0; }
.countdown-bar__subtitle { font-size: 14px; font-weight: 400; line-height: 1.4; color: #fff; margin: 0; }
.countdown-bar__timer { display: flex; gap: 8px; align-items: center; }
.countdown-bar__unit { display: flex; flex-direction: column; align-items: center; justify-content: center; background: #2B3A67; border-radius: 8px; min-width: 64px; padding: 8px 12px; gap: 2px; }
.countdown-bar__number { font-size: 14px; font-weight: 700; line-height: 1.2; color: #fff; }
.countdown-bar__label { font-size: 12px; font-weight: 600; line-height: 1; color: #fff; text-transform: uppercase; letter-spacing: 0.5px; }
@media screen and (max-width: 749px) {
  .countdown-bar { padding: 8px 12px; gap: 8px; flex-wrap: nowrap; }
  .countdown-bar__text { flex: 1; min-width: 0; }
  .countdown-bar__title { font-size: calc(14px * 0.72); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .countdown-bar__subtitle { font-size: calc(14px * 0.79); }
  .countdown-bar__timer { gap: 4px; flex-shrink: 0; }
  .countdown-bar__unit { min-width: 44px; padding: 4px 6px; border-radius: 6px; }
  .countdown-bar__number { font-size: calc(14px * 0.67); }
  .countdown-bar__label { font-size: calc(12px * 0.82); }
}`;

export default function FdCountdownBar({ id, settings: s }) {
  const t = useMidnightCountdown();
  const px = (v, d) => `${v ?? d}px`;
  const vars = {
    '--fd-cb-padding-top-desktop': px(s.padding_top_desktop, 0), '--fd-cb-padding-right-desktop': px(s.padding_right_desktop, 0),
    '--fd-cb-padding-bottom-desktop': px(s.padding_bottom_desktop, 0), '--fd-cb-padding-left-desktop': px(s.padding_left_desktop, 0),
    '--fd-cb-padding-top-mobile': px(s.padding_top_mobile, 0), '--fd-cb-padding-right-mobile': px(s.padding_right_mobile, 0),
    '--fd-cb-padding-bottom-mobile': px(s.padding_bottom_mobile, 0), '--fd-cb-padding-left-mobile': px(s.padding_left_mobile, 0),
    '--fd-cb-bg-color': s.section_bg_color, '--fd-cb-gap': px(s.content_gap_desktop, 32), '--fd-cb-gap-mobile': px(s.content_gap_mobile, 16),
    '--fd-cb-title-font-family': s.title_font_family, '--fd-cb-title-font-size-desktop': px(s.title_font_size_desktop, 14), '--fd-cb-title-font-size-mobile': px(s.title_font_size_mobile, 14),
    '--fd-cb-title-font-weight': s.title_font_weight, '--fd-cb-title-font-color': s.title_font_color,
    '--fd-cb-subtitle-font-family': s.subtitle_font_family, '--fd-cb-subtitle-font-size-desktop': px(s.subtitle_font_size_desktop, 14), '--fd-cb-subtitle-font-size-mobile': px(s.subtitle_font_size_mobile, 14),
    '--fd-cb-subtitle-font-weight': s.subtitle_font_weight, '--fd-cb-subtitle-font-color': s.subtitle_font_color,
    '--fd-cb-unit-bg-color': s.unit_bg_color, '--fd-cb-unit-size': px(s.unit_size, 44), '--fd-cb-number-font-size': px(s.number_font_size, 14), '--fd-cb-label-font-size': px(s.label_font_size, 12),
  };
  return (
    <div id={`shopify-section-${id}`} className="shopify-section fd-countdown-bar-section">
      <style>{CSS}</style>
      <div className="fd-countdown-bar" id={`fd-countdown-bar-${id}`} style={vars}>
        <div className="countdown-bar" id="countdown-bar">
          <div className="countdown-bar__text">
            <p className="countdown-bar__title">{s.title}</p>
            <p className="countdown-bar__subtitle">{s.subtitle}</p>
          </div>
          <div className="countdown-bar__timer" role="timer" aria-label="Time left today">
            <div className="countdown-bar__unit"><span className="countdown-bar__number" id="countdown-hours">{pad(t.h)}</span><span className="countdown-bar__label">HRS</span></div>
            <div className="countdown-bar__unit"><span className="countdown-bar__number" id="countdown-minutes">{pad(t.m)}</span><span className="countdown-bar__label">MIN</span></div>
            <div className="countdown-bar__unit"><span className="countdown-bar__number" id="countdown-seconds">{pad(t.s)}</span><span className="countdown-bar__label">SEC</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
