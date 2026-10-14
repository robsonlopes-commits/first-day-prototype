import { useEffect, useRef, useState } from 'react';
import Img from '../components/Img.jsx';
import { settingImg } from '../lib/settingsImg.js';
import customCss from '../lib/customCss.js';
import css from './tempScienceModuleCss.js';

// sections/temp-science-module.liquid ("Temp: Science Tabs"). Props = { id, settings, blocks } as in the template JSON; the metafield-driven
// values are already resolved: blocks[].settings = { tab_label, content_title, content_description, benefits_heading, benefits_list (HTML),
// panel_image (+ optional panel_image_alt / panel_image_pos = object-position), panel_video (mp4 URL or ext path), panel_poster, video_autoplay/loop/muted/controls }.
const rich = (html) => ({ __html: `<div class="metafield-rich_text_field">${html}</div>` });

// theme: video[data-fd-autoplay] plays while its panel is in view
function PanelVideo({ s, active }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || !s.video_autoplay) return undefined;
    if (!active) { v.pause(); return undefined; }
    if (typeof IntersectionObserver === 'undefined') { v.play().catch(() => {}); return undefined; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, [active, s.video_autoplay]);
  return (
    <video ref={ref} className="science-tabs__video" playsInline loop={s.video_loop} muted={s.video_muted} controls={s.video_controls} preload="none" poster={settingImg(s.panel_poster)} data-fd-autoplay={s.video_autoplay ? '' : undefined}>
      <source src={settingImg(s.panel_video)} type="video/mp4" />
    </video>
  );
}

export default function TempScienceModule({ id, settings: s, blocks = [] }) {
  const tabs = blocks.filter((b) => b.settings.content_title);
  const [active, setActive] = useState(0);
  if (!s.heading) return null;
  const px = (n) => `${n}px`;
  const vars = {
    '--padding-top': px(s.padding_top), '--padding-bottom': px(s.padding_bottom), '--padding-left': px(s.padding_left), '--padding-right': px(s.padding_right),
    '--padding-top-mobile': px(s.padding_top_mobile), '--padding-bottom-mobile': px(s.padding_bottom_mobile), '--padding-left-mobile': px(s.padding_left_mobile), '--padding-right-mobile': px(s.padding_right_mobile),
    '--section-bg': s.section_bg, '--heading-color': s.heading_color, '--container-bg': s.container_bg, '--container-radius': px(s.container_radius), '--container-padding': px(s.container_padding),
    '--tab-bar-border-color': s.tab_bar_border_color, '--tab-bg': s.tab_bg, '--tab-color': s.tab_text_color, '--tab-active-bg': s.tab_active_bg, '--tab-active-color': s.tab_active_text_color,
    '--panel-border-color': s.panel_border_color, '--panel-radius': px(s.panel_radius), '--content-title-color': s.content_title_color, '--content-desc-color': s.content_desc_color,
    '--benefits-heading-color': s.benefits_heading_color, '--benefits-text-color': s.benefits_text_color,
    '--heading-font': `${s.heading_font_family || 'var(--font-heading-family)'}, sans-serif`, '--body-font': `${s.body_font_family || 'var(--font-body-family)'}, sans-serif`,
    '--heading-size': px(s.heading_font_size), '--heading-size-mobile': px(s.heading_font_size_mobile), '--tab-font-size': px(s.tab_font_size), '--tab-font-size-mobile': px(s.tab_font_size_mobile),
    '--content-title-size': px(s.content_title_font_size), '--content-title-size-mobile': px(s.content_title_font_size_mobile), '--content-desc-size': px(s.content_desc_font_size), '--content-desc-size-mobile': px(s.content_desc_font_size_mobile),
    '--benefits-heading-size': px(s.benefits_heading_font_size), '--benefits-heading-size-mobile': px(s.benefits_heading_font_size_mobile), '--benefits-text-size': px(s.benefits_text_font_size),
    '--image-width': px(s.image_width), '--image-height-mobile': px(s.image_height_mobile), '--heading-gap': px(s.heading_gap), '--heading-gap-mobile': px(s.heading_gap_mobile),
    '--tab-padding-v': px(s.tab_padding_vertical), '--tab-padding-h': px(s.tab_padding_horizontal), '--tab-padding-v-mobile': px(s.tab_padding_vertical_mobile), '--tab-padding-h-mobile': px(s.tab_padding_horizontal_mobile),
  };
  return (
    <div id={`shopify-section-${id}`} className="shopify-section science-tabs-section">
      <style>{css(s, id)}</style>
      <style>{customCss(id, s.custom_css)}</style>
      <section className={`science-tabs section-${id}`} style={vars}>
        <div className="science-tabs__wrapper">
          <h2 className="science-tabs__heading" dangerouslySetInnerHTML={{ __html: s.heading }} />
          {tabs.length > 0 && (
            <div className="science-tabs__container">
              <div className="science-tabs__tab-bar" role="tablist">
                {tabs.map((b, i) => (
                  <button key={b.id} className={`science-tabs__tab${i === active ? ' science-tabs__tab--active' : ''}`} role="tab" aria-selected={i === active}
                    aria-controls={`science-panel-${id}-${i + 1}`} data-tab-index={i + 1} type="button" onClick={() => setActive(i)}>
                    {b.settings.tab_icon && <span className="science-tabs__tab-icon"><Img src={settingImg(b.settings.tab_icon)} alt="" loading="lazy" /></span>}
                    <span className="science-tabs__tab-label">{b.settings.tab_label}</span>
                  </button>
                ))}
              </div>
              <div className="science-tabs__panels" data-fd-autoplay-root="">
                {tabs.map((b, i) => {
                  const t = b.settings;
                  return (
                    <div key={b.id} className={`science-tabs__panel${i === active ? ' science-tabs__panel--active' : ''}`} id={`science-panel-${id}-${i + 1}`} role="tabpanel" data-panel-index={i + 1} hidden={i !== active}>
                      {t.panel_video ? <div className="science-tabs__panel-media"><PanelVideo s={t} active={i === active} /></div>
                        : t.panel_image ? <div className="science-tabs__panel-media"><Img className="science-tabs__img" src={settingImg(t.panel_image)} alt={t.panel_image_alt || ''} loading="lazy" style={t.panel_image_pos ? { objectPosition: t.panel_image_pos } : undefined} /></div> : null}
                      <div className="science-tabs__panel-content">
                        <div className="science-tabs__panel-top">
                          {t.content_icon && <span className="science-tabs__content-icon"><Img src={settingImg(t.content_icon)} alt="" loading="lazy" /></span>}
                          <h3 className="science-tabs__content-title">{t.content_title}</h3>
                          {t.content_description && <div className="science-tabs__content-desc" dangerouslySetInnerHTML={rich(t.content_description)} />}
                        </div>
                        {(t.benefits_heading || t.benefits_list) && (
                          <div className="science-tabs__benefits">
                            {t.benefits_heading && <h4 className="science-tabs__benefits-heading">{t.benefits_heading}</h4>}
                            {t.benefits_list && <div className="science-tabs__benefits-list" dangerouslySetInnerHTML={rich(t.benefits_list)} />}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
