import { useEffect, useRef } from 'react';
import Img from '../components/Img.jsx';
import { settingImg } from '../lib/settingsImg.js';
import { extImg } from '../lib/assets.js';
import { HOME_PROBLEM } from '../data/home.js';
import css from './homepageProblemSectionCss.js';
import impactsCss from './homepageProblemImpactsCss.js';

// sections/homepage-problem-section.liquid (+ snippets homepage-problem-section.css.liquid, homepage-problem-impacts.liquid).
// Props = { id, settings, blocks } (HOME_PROBLEM in src/data/home.js). Desktop: 3 columns with the video in the middle; mobile: video + scrolling cards + impact tags.
const WAVE_PATH = 'M402.114 82.2445C323.643 72.3612 261.786 68.6667 209.353 68.6667C134.549 68.6667 78.8789 76.1765 21.338 83.9477C18.2594 84.362 15.1623 84.7854 12.0488 85.211C8.05809 85.7565 4.0404 86.3057 0 86.8443V43.3857V30.5345V0.000160217H1512V43.3857V86.5C1413.65 99.0118 1351.75 106.705 1157.53 82.2445C1079.05 72.3612 1017.2 68.6667 964.765 68.6667C889.962 68.6667 834.291 76.1765 776.753 83.9477C773.675 84.362 770.574 84.7853 767.463 85.2108C763.473 85.7564 759.455 86.3057 755.416 86.8443V86.8376C657.065 99.3494 596.339 106.705 402.114 82.2445Z';
const Wave = ({ fill }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="99" viewBox="0 0 1512 99" preserveAspectRatio="none" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d={WAVE_PATH} fill={fill} />
  </svg>
);

// theme.autoplayVideos: play when in view, pause when out of view (muted loop)
function AutoplayVideo({ src }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return undefined;
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) v.play().catch(() => v.setAttribute('controls', ''));
      else v.pause();
    }));
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return <video-section data-type="mp4"><video ref={ref} src={src} loop muted playsInline preload="metadata" /></video-section>;
}

export default function HomepageProblemSection({ id = HOME_PROBLEM.id, settings: s = HOME_PROBLEM.settings, blocks = HOME_PROBLEM.blocks }) {
  const sid = id;
  const problems = blocks.filter((b) => b.type === 'problem_item');
  const impacts = blocks.filter((b) => b.type === 'impact_item');
  const videoSrc = s.video_url && s.video_url.toLowerCase().includes('.mp4') ? extImg(s.video_url) : null;

  const item = (b) => (
    <div key={b.id} className={`homepage-problem-section__item-${sid} homepage-problem-section__desktop-only-${sid}`}>
      {b.settings.icon && <div className={`homepage-problem-section__item-icon-${sid}`}><Img src={settingImg(b.settings.icon)} alt="" loading="lazy" /></div>}
      <div className={`homepage-problem-section__item-content-${sid}`}>
        {b.settings.title && <h3 className={`homepage-problem-section__item-title-${sid}`}>{b.settings.title}</h3>}
        {b.settings.description && <p className={`homepage-problem-section__item-description-${sid}`}>{b.settings.description}</p>}
      </div>
    </div>
  );
  // the theme splits by position in the full block list (first two left, the rest right)
  const left = problems.slice(0, 2).filter((b) => b.settings.show_on_desktop);
  const right = problems.slice(2).filter((b) => b.settings.show_on_desktop);

  return (
    <div id={`shopify-section-${sid}`} className="shopify-section section">
      <style>{css(s, sid)}</style>
      <style>{impactsCss(s, sid)}</style>
      <div className={`homepage-problem-section__waves-top-${sid}`}><Wave fill={s.background_color} /></div>

      <section className={`homepage-problem-section-${sid}`} data-section-id={sid}>
        <div className={`homepage-problem-section__container-${sid}`}>
          <div className={`homepage-problem-section__grid-${sid}`}>
            <div className={`homepage-problem-section__column-${sid} homepage-problem-section__column-${sid}--left`}>{left.map(item)}</div>

            <div className={`homepage-problem-section__video-wrapper-${sid}`}>
              {(s.title_line_1 || s.title_line_2) && (
                <div className={`homepage-problem-section__title-overlay-${sid}`}>
                  <h2 className={`homepage-problem-section__title-${sid}`}>
                    {s.title_line_1 && <span className={`homepage-problem-section__title-line-${sid}`}>{s.title_line_1}</span>}
                    {s.title_line_2 && <span className={`homepage-problem-section__title-highlight-${sid}`}>{s.title_line_2}</span>}
                  </h2>
                </div>
              )}
              <div className={`homepage-problem-section__video-${sid}`}>
                {videoSrc ? <AutoplayVideo src={videoSrc} /> : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 5V19L19 12L8 5Z" fill="white" /></svg>
                  </div>
                )}
              </div>
            </div>

            <div className={`homepage-problem-section__column-${sid} homepage-problem-section__column-${sid}--right`}>{right.map(item)}</div>
          </div>

          <div className={`homepage-problem-section__cards-${sid}`}>
            {problems.filter((b) => b.settings.show_on_mobile).map((b) => (
              <div key={b.id} className={`homepage-problem-section__card-${sid} homepage-problem-section__mobile-only-${sid}`}>
                {b.settings.icon && <div className={`homepage-problem-section__card-icon-${sid}`}><Img src={settingImg(b.settings.icon)} alt="" loading="lazy" /></div>}
                <div className={`homepage-problem-section__card-content-${sid}`}>
                  {b.settings.title && <h4 className={`homepage-problem-section__card-title-${sid}`}>{b.settings.title}</h4>}
                  {b.settings.description && <p className={`homepage-problem-section__card-description-${sid}`}>{b.settings.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`homepage-problem-impacts-${sid}`}>
          <div className={`homepage-problem-impacts__container-${sid}`}>
            {(s.impacts_title_line_1 || s.impacts_title_line_2) && (
              <h3 className={`homepage-problem-impacts__title-${sid}`}>
                {s.impacts_title_line_1 && <span className={`homepage-problem-impacts__title-line-${sid}`}>{s.impacts_title_line_1}</span>}
                {s.impacts_title_line_2 && <span className={`homepage-problem-impacts__title-highlight-${sid}`}>{s.impacts_title_line_2}</span>}
              </h3>
            )}
            <div className={`homepage-problem-impacts__tags-${sid}`}>
              {impacts.map((b) => (
                <div key={b.id} className={`homepage-problem-impacts__tag-${sid}`}>
                  {b.settings.icon && <span className={`homepage-problem-impacts__tag-icon-${sid}`}><Img src={settingImg(b.settings.icon)} alt="" loading="lazy" /></span>}
                  {b.settings.label && <span className={`homepage-problem-impacts__tag-label-${sid}`}>{b.settings.label}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className={`homepage-problem-section__waves-${sid}`}><Wave fill={s.background_color} /></div>
    </div>
  );
}
