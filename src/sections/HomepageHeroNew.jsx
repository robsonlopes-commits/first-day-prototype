import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Img from '../components/Img.jsx';
import SiteLink from '../layout/SiteLink.jsx';
import { settingImg } from '../lib/settingsImg.js';
import { settingLink } from '../lib/settingsLink.js';
import { HOME_HERO_NEW } from '../data/home.js';
import css from './homepageHeroNewCss.js';
import partnersCss from './partnersLogoBarCss.js';

// sections/homepage-hero-new.liquid (+ snippets homepage-hero-new.css.liquid, partners-logo-bar and the inline text-flip script).
// Props = { id, settings, blocks } as in the template JSON (HOME_HERO_NEW in src/data/home.js).
const stripP = (html) => (html || '').replace(/<p>/g, '').replace(/<\/p>/g, '');
const MOBILE_ACTIVE = [2, 3, 4];

function PartnersLogoBar({ sid, bg, block, altWidth }) {
  const logos = Array.from({ length: 10 }, (_, i) => block.settings[`logo_${i + 1}`]).filter(Boolean);
  return (
    <>
      <style>{partnersCss({}, sid, { background_color: bg, show_border: true, logo_height: 28, alt_width: altWidth })}</style>
      <div className={`partners-logo-bar-${sid}`}>
        <div className={`partners-logo-bar__container-${sid}`}>
          <div className={`partners-logo-bar__logos-${sid}`}>
            {logos.map((l, i) => (
              <div key={i} className={`partners-logo-bar__logo-${sid}`}><Img src={settingImg(l)} alt="Partner logo" loading="lazy" /></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default function HomepageHeroNew({ id = HOME_HERO_NEW.id, settings: s = HOME_HERO_NEW.settings, blocks = HOME_HERO_NEW.blocks }) {
  const sid = id;
  const texts = blocks.filter((b) => b.type === 'animated_text');
  const columns = blocks.filter((b) => b.type === 'image_column');
  const partners = blocks.find((b) => b.type === 'partner_logos');
  const duration = (parseFloat(s.animation_duration) || 3) * 1000;

  const [cur, setCur] = useState(0);
  const [exiting, setExiting] = useState(-1);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 750px)').matches);
  const wrapperRef = useRef(null);
  const widths = useRef([]);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 750px)');
    const on = () => setIsMobile(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  // measure each word the way the theme script does, then keep --text-flip-width in sync with the active word
  const applyWidth = (i) => { if (widths.current[i] && wrapperRef.current) wrapperRef.current.style.setProperty('--text-flip-width', `${widths.current[i]}px`); };
  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return undefined;
    const measure = () => {
      Array.from(wrapper.children).forEach((el, i) => {
        el.style.position = 'relative'; el.style.opacity = '1'; el.style.transform = 'none';
        widths.current[i] = el.offsetWidth;
        el.style.position = ''; el.style.opacity = ''; el.style.transform = '';
      });
      applyWidth(cur);
    };
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [texts.length]);
  useLayoutEffect(() => { applyWidth(cur); }, [cur]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (texts.length <= 1) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let t;
    const iv = setInterval(() => {
      setCur((c) => {
        if (!reduce) { setExiting(c); clearTimeout(t); t = setTimeout(() => setExiting(-1), 450); }
        return (c + 1) % texts.length;
      });
    }, duration);
    return () => { clearInterval(iv); clearTimeout(t); };
  }, [texts.length, duration]);

  const prefix = stripP(s.title_prefix);
  const prefixMobile = stripP(s.title_prefix_mobile) || prefix;
  const rating = s.show_rating && s.rating_text;

  return (
    <div id={`shopify-section-${sid}`} className="shopify-section homepage-hero-new-section">
      <style>{css(s, sid)}</style>
      <section className={`homepage-hero-new-${sid}`} data-section-id={sid}>
        <div className={`homepage-hero-new__container-${sid}`}>
          <div className={`homepage-hero-new__grid-${sid}`}>
            <div className={`homepage-hero-new__content-${sid}`}>
              <h1 className={`homepage-hero-new__title-${sid}`}>
                {prefix && <span className={`homepage-hero-new__title-prefix-${sid} homepage-hero-new__title-prefix--desktop-${sid}`} dangerouslySetInnerHTML={{ __html: prefix }} />}
                {prefixMobile && <span className={`homepage-hero-new__title-prefix-${sid} homepage-hero-new__title-prefix--mobile-${sid}`} dangerouslySetInnerHTML={{ __html: prefixMobile }} />}
                {/* the Liquid source has a line break here, which renders as a space before the highlight box */}
                {' '}
                {texts.length > 0 && (
                  <span className={`text-flip-${sid}`} aria-live="polite" data-text-flip data-duration={s.animation_duration}>
                    <span className={`text-flip__wrapper-${sid}`} ref={wrapperRef}>
                      {texts.map((b, i) => (
                        <div key={b.id} className={`text-flip__item-${sid}${i === cur ? ' is-active' : ''}${i === exiting ? ' is-exiting' : ''}`} data-text-flip-item>{b.settings.text}</div>
                      ))}
                    </span>
                  </span>
                )}
              </h1>

              {s.description && <p className={`homepage-hero-new__description-${sid}`}>{s.description}</p>}

              <div className={`homepage-hero-new__cta-container-${sid}`}>
                {s.button_text && <SiteLink href={settingLink(s.button_link)} className={`homepage-hero-new__cta-${sid}`}>{s.button_text}</SiteLink>}
                {rating && (
                  <div className={`homepage-hero-new__rating-${sid}`}>
                    <span className={`homepage-hero-new__rating-stars-${sid}`}>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                      ))}
                    </span>
                    <span>{s.rating_text}</span>
                  </div>
                )}
              </div>
            </div>

            <div className={`homepage-hero-new__images-wrapper-${sid}`}>
              <div className={`homepage-hero-new__images-${sid}`} data-parallax-container>
                <div className={`homepage-hero-new__image-grid-${sid}`}>
                  {[1, 2, 3, 4].map((n) => {
                    const col = columns.find((b) => b.settings.column_position === String(n));
                    const imgs = col ? Array.from({ length: 10 }, (_, i) => col.settings[`image_${i + 1}`]).filter(Boolean) : [];
                    const all = [...imgs.map((src, i) => ({ src, dup: false, k: i })), ...imgs.map((src, i) => ({ src, dup: true, k: i }))];
                    return (
                      <div key={n} className={`homepage-hero-new__image-column-${sid} homepage-hero-new__image-column-${sid}--${n}`} data-parallax-column={n === 2 || n === 4 ? 'down' : 'up'}>
                        {all.map((o, idx) => (
                          <div key={`${o.dup ? 'd' : 'o'}${o.k}`} className={`homepage-hero-new__image-item-${sid}${isMobile && MOBILE_ACTIVE.includes(idx) ? ' is-active-mobile' : ''}`} aria-hidden={o.dup ? 'true' : undefined}>
                            <Img src={settingImg(o.src)} alt={o.dup ? '' : 'Family photo'} loading={!o.dup && o.k < 4 ? 'eager' : 'lazy'} />
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {s.show_partners && partners && <PartnersLogoBar sid={sid} bg={s.background_color} block={partners} altWidth={s.partners_alt_width} />}
      </section>
    </div>
  );
}
