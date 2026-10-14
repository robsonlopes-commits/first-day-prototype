import { useState } from 'react';
import Img from '../components/Img.jsx';
import Waves from '../components/Waves.jsx';
import { settingImg } from '../lib/settingsImg.js';
import '../styles/theme/section-image-with-text.css';
import iwtCss from './imageWithTextCss.js';
import customCssFor from '../lib/customCss.js';

// sections/image-with-text.liquid. Props = template JSON section { id, settings, blocks:[{id,type,settings}] }.
// Optional `imageAspectRatio` (w/h) is used until the image reports its natural size (theme: image.aspect_ratio).
const colorObj = (hex) => {
  if (!hex || typeof hex !== 'string') return hex;
  const h = hex.replace('#', '');
  const f = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  return Object.assign(new String(hex), { red: parseInt(f.slice(0, 2), 16), green: parseInt(f.slice(2, 4), 16), blue: parseInt(f.slice(4, 6), 16) });
};
const accent = (str) => String(str).replace(/\[/g, '<span class="iwt-accent">').replace(/\]/g, '</span>');
const esc = (str) => String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function VideoImage({ src, alt, url, children }) {
  const [playing, setPlaying] = useState(false);
  const isYt = url && url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return (
    <div className={`iwt-video-container${playing ? ' is-playing' : ''}`} onClick={(e) => { e.preventDefault(); setPlaying(true); }}>
      {children}
      <button type="button" className="iwt-play-btn" aria-label="Play video"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg></button>
      {playing && (isYt ? <iframe src={`https://www.youtube.com/embed/${isYt[1]}?autoplay=1&rel=0`} allow="autoplay; encrypted-media" allowFullScreen title={alt} /> : <video src={url} controls autoPlay playsInline />)}
    </div>
  );
}

export default function ImageWithText({ id, settings: raw, blocks = [], customCss = [], imageAspectRatio = 1 }) {
  const [ratio, setRatio] = useState(imageAspectRatio);
  const s = { ...raw, colors_background: colorObj(raw.colors_background || '#ffffff'), colors_text: colorObj(raw.colors_text), colors_button_background: colorObj(raw.colors_button_background), colors_button_label: colorObj(raw.colors_button_label) };
  const imgSrc = settingImg(s.image);
  const cssSettings = { ...s, image: imgSrc ? { aspect_ratio: ratio } : s.image, image_mobile: s.image_mobile ? { aspect_ratio: ratio } : undefined };

  let gridClass = 'image-with-text__grid';
  if (s.layout === 'text_first') gridClass += ' image-with-text__grid--reverse';
  if (s.mobile_layout === 'text_first') gridClass += ' image-with-text__grid-mobile--reverse';
  if (s.mobile_layout === 'no_image') gridClass += ' image-with-text__grid-mobile--no-image';
  if (s.mobile_layout === 'overlap') gridClass += ' image-with-text__grid-mobile--overlap';

  const containerPaddingTop = s.top_waves ? '40px' : '0';
  const containerPaddingBottom = s.bottom_waves ? '40px' : '0';
  const bg = s.enable_background_color_section ? { backgroundColor: s.background_color_section } : {};
  const badges = blocks.filter((b) => b.type === 'badge' && (b.settings.badge_label || b.settings.badge_number || b.settings.badge_icon));

  const mwStyle = { background: 'transparent' };
  if (s.enable_box_shadow) { mwStyle.boxShadow = `5px 5px 0px 0px ${s.box_shadow_color}`; mwStyle.border = `${s.border}px solid ${s.box_shadow_color}`; }
  if (s.enable_border_radius) mwStyle.borderRadius = `${s.border_radius}px`;

  const media = imgSrc && (
    <Img src={imgSrc} alt="" className="image-fit" style={{ objectPosition: undefined }} loading="lazy"
      onLoad={(e) => e.target.naturalWidth && setRatio(e.target.naturalWidth / e.target.naturalHeight)} />
  );

  const renderBlock = (b) => {
    const bs = b.settings;
    switch (b.type) {
      case 'heading': { const Tag = bs.heading_tag || 'h2'; return <Tag key={b.id} className={`image-with-text__heading ${bs.heading_size}`} dangerouslySetInnerHTML={{ __html: accent(esc(bs.heading)) }} />; }
      case 'subheading': return <p key={b.id} className={`image-with-text__subheading${bs.secondary_color ? ' image-with-text__subheading--colored' : ''} ${bs.subheading_size}`} dangerouslySetInnerHTML={{ __html: accent(esc(bs.subheading)) }} />;
      case 'text': return <div key={b.id} className={`image-with-text__text${bs.secondary_color ? ' image-with-text__text--colored' : ''} ${bs.text_size} rte`} dangerouslySetInnerHTML={{ __html: accent(bs.text) }} />;
      case 'custom_liquid': return <div key={b.id} className="image-with-text__text rte" dangerouslySetInnerHTML={{ __html: bs.custom_liquid }} />;
      case 'button': return bs.button_label ? (bs.button_style_secondary
        ? <a key={b.id} className={`button button--cta button--${bs.button_size}`} href={bs.button_link || undefined}><span className="label">{bs.button_label}</span></a>
        : <a key={b.id} className={`button button--${bs.button_size}`} href={bs.button_link || undefined}>{bs.button_label}</a>) : null;
      default: return null;
    }
  };
  const iconTiles = blocks.filter((b) => b.type === 'icon_tile');
  const content = [];
  let tilesDone = false;
  blocks.forEach((b) => {
    if (b.type === 'icon_tile') {
      if (!tilesDone) {
        tilesDone = true;
        content.push(<div key="icons" className="iwt-icon-grid">{iconTiles.map((t) => (
          <div key={t.id} className="iwt-icon-tile">
            {t.settings.icon_image && <div className="iwt-icon-bubble"><img src={settingImg(t.settings.icon_image)} alt={t.settings.icon_label || ''} width={s.icon_img_size || 32} height={s.icon_img_size || 32} /></div>}
            {t.settings.icon_label && <span className="iwt-icon-tile__label">{t.settings.icon_label}</span>}
          </div>))}</div>);
      }
    } else content.push(renderBlock(b));
  });

  return (
    <section id={`shopify-section-${id}`} className="shopify-section section">
      <style>{iwtCss(cssSettings, id)}{customCssFor(id, customCss)}</style>
      {s.anchor_id && <div id={s.anchor_id} className="fd-jump-anchor" />}
      {s.top_waves && <Waves position="top" color={s.background_color} containerBackground={s.wavesTopBackgroundColor} />}
      <div style={{ ...bg, paddingTop: containerPaddingTop, paddingBottom: containerPaddingBottom, marginTop: -1 }}>
        <div className={`section--padding${s.show_divider ? ' section--divider' : ''}`}>
          <div className={`image-with-text${s.use_custom_colors ? ' image-with-text--colored' : ' image-with-text--alt'}${s.enlarge_content ? ' image-with-text--enlarge' : ''} page-width${s.full_width ? ' page-width--full-width' : ''}`} style={bg}>
            <div className={`${gridClass} grid grid--gapless grid--1-col grid--2-col-tablet`} style={bg}>
              <div className="grid__item">
                <use-animate data-animate="zoom-fade" class="media-wrapper" style={mwStyle}>
                  <div className={`image-animate media--${s.image_ratio} media-mobile--${s.mobile_image_ratio} ${imgSrc ? 'media' : 'media--placeholder'}${s.image_behavior !== 'none' ? ` animate--${s.image_behavior}` : ''}`} style={{ '--image-ratio-percent': `${(1 / ratio) * 100}%` }}>
                    {imgSrc && (s.video_url ? <VideoImage url={s.video_url}>{media}</VideoImage> : <a href={s.image_link || undefined} role={s.image_link ? undefined : 'link'} aria-disabled={s.image_link ? undefined : 'true'}>{media}</a>)}
                  </div>
                  {badges.length > 0 && (
                    <div className="iwt-badges-overlay">{badges.map((b) => (
                      <div key={b.id} className="iwt-badge">
                        {b.settings.badge_icon && <img src={settingImg(b.settings.badge_icon)} alt={b.settings.badge_label || ''} width="80" height="80" />}
                        {b.settings.badge_number && <span className="iwt-badge__number">{b.settings.badge_number}</span>}
                        {b.settings.badge_label && <span>{b.settings.badge_label}</span>}
                      </div>))}</div>)}
                </use-animate>
              </div>
              <div className="grid__item">
                <div className={`image-with-text__content ${s.text_box_position} ${s.text_alignment} mobile-${s.mobile_text_alignment}`}>{content}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {s.bottom_waves && <Waves position="bottom" color={s.background_color} containerBackground={s.wavesBottomBackgroundColor} />}
    </section>
  );
}
