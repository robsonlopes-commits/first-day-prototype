import { useEffect, useState } from 'react';
import Img from '../components/Img.jsx';
import { settingImg } from '../lib/settingsImg.js';
import { extImg } from '../lib/assets.js';
import { HOME_VIDEO } from '../data/home.js';
import css from './homepageVideoSectionCss.js';

// sections/homepage-video-section.liquid (+ snippet homepage-video-section.css.liquid): text + thumbnail that opens a video modal. Props = { id, settings } (HOME_VIDEO).
const embedUrl = (url) => {
  if (!url) return null;
  const l = url.toLowerCase();
  if (l.includes('youtube.com/watch')) { const v = url.split('v=')[1]?.split('&')[0]; if (v) return { iframe: `https://www.youtube.com/embed/${v}?autoplay=1&rel=0` }; }
  else if (l.includes('youtu.be/')) { const v = url.split('.be/')[1]?.split('&')[0]; if (v) return { iframe: `https://www.youtube.com/embed/${v}?autoplay=1&rel=0` }; }
  if (l.includes('vimeo.com')) { const v = url.split('.com/')[1]?.split('/')[0]; if (v) return { iframe: `https://player.vimeo.com/video/${v}?autoplay=1` }; }
  if (l.includes('.mp4')) return { mp4: extImg(url) };
  return null;
};

export default function HomepageVideoSection({ id = HOME_VIDEO.id, settings: s = HOME_VIDEO.settings }) {
  const sid = id;
  const [open, setOpen] = useState(false);
  const embed = embedUrl(s.video_url);
  const show = () => { if (embed) { setOpen(true); document.body.style.overflow = 'hidden'; } };
  const hide = () => { setOpen(false); document.body.style.overflow = ''; };
  useEffect(() => {
    if (!open) return undefined;
    const on = (e) => { if (e.key === 'Escape') hide(); };
    document.addEventListener('keydown', on);
    return () => { document.removeEventListener('keydown', on); document.body.style.overflow = ''; };
  }, [open]);
  const key = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(); } };

  return (
    <div id={`shopify-section-${sid}`} className="shopify-section section">
      <style>{css(s, sid)}</style>
      {s.mobile_top_waves && <div className={`homepage-video-section__mobile-waves-${sid}`} />}
      <section className={`homepage-video-section-${sid}`} data-section-id={sid}>
        <div className={`homepage-video-section__container-${sid}`}>
          <div className={`homepage-video-section__content-${sid}`}>
            <div className={`homepage-video-section__text-${sid}`}>
              {s.title && <h2 className={`homepage-video-section__title-${sid}`} dangerouslySetInnerHTML={{ __html: s.title }} />}
              {s.description && <p className={`homepage-video-section__description-${sid}`}>{s.description}</p>}
            </div>
            {s.button_text && (
              <button type="button" className={`homepage-video-section__button-${sid}`} data-video-trigger aria-label={s.button_text} onClick={show}>
                <span className={`homepage-video-section__button-icon-${sid}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7L8 5z" /></svg>
                </span>
                <span>{s.button_text}</span>
              </button>
            )}
          </div>

          <div className={`homepage-video-section__video-wrapper-${sid}`} data-video-trigger role="button" tabIndex={0} aria-label="Play video" onClick={show} onKeyDown={key}>
            {s.video_thumbnail
              ? <Img className={`homepage-video-section__video-thumbnail-${sid}`} src={settingImg(s.video_thumbnail)} alt="Video thumbnail" loading="lazy" />
              : <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} />}
            <div className={`homepage-video-section__video-overlay-${sid}`} />
            <button type="button" className={`homepage-video-section__play-button-${sid}`} aria-label="Play video">
              <span className={`homepage-video-section__play-icon-${sid}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7L8 5z" /></svg>
              </span>
            </button>
          </div>
        </div>

        <div className={`homepage-video-section__modal-${sid}${open ? ' is-open' : ''}`} data-video-modal role="dialog" aria-modal="true" aria-label="Video player" onClick={(e) => { if (e.target === e.currentTarget) hide(); }}>
          <div className={`homepage-video-section__modal-content-${sid}`} data-video-container>
            {open && embed?.mp4 && <video src={embed.mp4} controls autoPlay playsInline />}
            {open && embed?.iframe && <iframe src={embed.iframe} title="Video player" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />}
            <button type="button" className={`homepage-video-section__modal-close-${sid}`} data-modal-close aria-label="Close video" onClick={hide}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
