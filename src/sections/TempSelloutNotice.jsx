import { useEffect, useRef } from 'react';
import { settingImg } from '../lib/settingsImg.js';
import css from './tempSelloutNoticeCss.js';

// sections/temp-sellout-notice.liquid. Props = { id, settings } as in the template JSON (video_url may be a local /assets path or http URL).
export default function TempSelloutNotice({ id, settings: s }) {
  const month = s.month_text || new Date().toLocaleString('en-US', { month: 'long' });
  const vref = useRef(null);
  // theme: video[data-fd-autoplay] plays while in view
  useEffect(() => {
    const v = vref.current;
    if (!v || !s.enable_autoplay || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, [s.enable_autoplay]);
  const style = {
    '--sas-card-bg': s.card_bg, '--sas-text': s.text_color, '--sas-button-bg': s.button_bg, '--sas-button-text': s.button_text, '--sas-radius': `${s.card_radius}px`,
    '--sas-shadow-y': `${s.shadow_y}px`, '--sas-shadow-blur': `${s.shadow_blur}px`, '--sas-shadow-opacity': s.shadow_opacity / 100, '--sas-max-width': `${s.max_width}px`,
    '--sas-media-ratio': `${s.media_width} / ${s.media_height}`, paddingTop: `${s.padding_top}px`, paddingBottom: `${s.padding_bottom}px`,
  };
  const text = (s.text || '').replace('[month]', month);
  return (
    <div id={`shopify-section-${id}`} className="shopify-section section">
      <style>{css(s, id)}</style>
      <section id={`sellout-alert-section-${id}`} className={`sellout-alert-section color-${s.color_scheme || ''}`} style={style}>
        <div className="page-width">
          <div className="sas-wrap">
            {s.video_url && (
              <div className="sas-media">
                <video ref={vref} className="sas-video" data-fd-autoplay={s.enable_autoplay ? '' : undefined} muted={s.enable_muted} loop={s.enable_loop} playsInline={s.enable_playsinline}
                  preload={s.enable_autoplay ? 'metadata' : s.preload_mode} controls={s.show_controls}>
                  <source src={settingImg(s.video_url)} type="video/mp4" />
                </video>
              </div>
            )}
            <div className="sas-content">
              {text && (
                <div className="sas-text rte" dangerouslySetInnerHTML={{ __html: (s.emoji ? `<span class="sas-emoji">${s.emoji}</span>` : '') + text }} />
              )}
              {s.button_label && <a href={s.button_link || '#ordersection'} className="sas-button">{s.button_label}</a>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
