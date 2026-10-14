import Waves from '../components/Waves.jsx';
import Img from '../components/Img.jsx';
import { settingImg } from '../lib/settingsImg.js';
import customCssFor from '../lib/customCss.js';
import '../styles/theme/section-multicolumn.css';
import '../styles/theme/component-slider.css';
import multicolumnCss from './multicolumnCss.js';

// sections/multicolumn.liquid. Props = template JSON section { id, settings, blocks, customCss }.
// `imageRatios` (optional, per block id) = image aspect ratios (w/h) for image_ratio 'adapt'; the tallest one sets the box (theme: highest_ratio).
const WIDTHS = { quarter: '25%', third: '33%', half: '50%', 'two-thirds': '66%', 'three-quarters': '75%' };

export default function Multicolumn({ id, settings: s, blocks = [], customCss = [], imageRatio = 1 }) {
  const cols = blocks.filter((b) => b.type === 'column');
  const wrapperWidth = WIDTHS[s.image_width];
  const Heading = s.heading_tag || 'h2';
  return (
    <section id={`shopify-section-${id}`} className="shopify-section section">
      <style>{multicolumnCss(s, id)}{customCssFor(id, customCss)}</style>
      {s.anchor_id && <div id={s.anchor_id} className="fd-jump-anchor" />}
      {s.top_waves && <Waves position="top" color={s.background_color} containerBackground={s.wavesTopBackgroundColor} />}
      <div style={{ ...(s.enable_bacground_color ? { backgroundColor: s.colors_background } : {}), paddingTop: s.top_waves ? 40 : 0, paddingBottom: s.bottom_waves ? 40 : 0 }}>
        <div className={`section--padding${s.show_divider ? ' section--divider' : ''}`}>
          <div className="multicolumn page-width">
            <div className={`title-wrapper${!s.heading ? ' title-wrapper--no-heading' : ''} ${s.text_alignment} mobile-${s.mobile_text_alignment} ${s.heading_alignment}`}>
              <Heading className={`title ${s.heading_size}`}>{s.heading}</Heading>
            </div>
            <slider-component class={`slider-mobile-gutter ${s.text_alignment} mobile-${s.mobile_text_alignment}`}>
              <ul id={`Slider-${id}`} className={`multicolumn-list grid grid--2-col${s.columns_mobile === '1' ? ' grid--1-col-mobile' : ''} grid--${s.columns_desktop}-col-desktop${s.swipe_on_mobile && cols.length > 1 ? ' slider slider--mobile' : ''}`} role="list">
                {cols.map((b, i) => {
                  const bs = b.settings;
                  return (
                    <li key={b.id} id={`Slide-${id}-${i + 1}`} className={`multicolumn-list__item grid__item${s.swipe_on_mobile ? ' slider__slide' : ''} ${s.text_alignment}`}>
                      <div className="multicolumn-card">
                        {bs.image && (
                          <use-animate style={{ background: 'transparent', ...(s.image_width !== 'full' ? { width: wrapperWidth, flexShrink: 0 } : {}) }} data-animate="zoom-fade" class={`media-wrapper multicolumn-card__image-wrapper multicolumn-card__image-wrapper--${s.image_width}-width${s.image_width !== 'full' ? ' multicolumn-card-spacing' : ''}`}>
                            <div className={`image-animate media media--${s.image_ratio}`} style={s.image_ratio === 'adapt' ? { '--image-ratio-percent': `${(1 / imageRatio) * 100}%` } : undefined}>
                              <Img src={settingImg(bs.image)} alt={`${bs.title || ''}${bs.subtitle || ''}`} className="multicolumn-card__image" loading="lazy" />
                            </div>
                            {bs.button_link && <a href={bs.button_link} className="full-unstyled-link" aria-label={bs.button_link_discernible_text}>&nbsp;</a>}
                          </use-animate>
                        )}
                        {(bs.title || bs.subtitle || bs.text || bs.button_label) && (
                          <div className="multicolumn-card__info">
                            {bs.title && <p className={`multicolumn-card__title ${bs.title_size}`}>{bs.title}</p>}
                            {bs.subtitle && <p className="multicolumn-card__subtitle">{bs.subtitle}</p>}
                            <div className="rte typeset" dangerouslySetInnerHTML={{ __html: bs.text }} />
                            {bs.button_label && (bs.button_style_secondary
                              ? <a className="button button--cta" href={bs.button_link || undefined}><span className="label">{bs.button_label}</span></a>
                              : <a className="button button--tertiary" href={bs.button_link || undefined}>{bs.button_label}</a>)}
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </slider-component>
          </div>
        </div>
      </div>
      {s.bottom_waves && <Waves position="bottom" color={s.background_color} containerBackground={s.wavesBottomBackgroundColor} />}
    </section>
  );
}
