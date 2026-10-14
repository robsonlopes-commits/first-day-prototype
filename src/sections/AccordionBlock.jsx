import Img from '../components/Img.jsx';
import AccordionTab from '../components/AccordionTab.jsx';
import { settingImg } from '../lib/settingsImg.js';
import customCss from '../lib/customCss.js';
import css from './accordionBlockCss.js';
import '../styles/theme/component-accordion.css';

// sections/accordion-block.liquid. Props = { id, settings, blocks } as in the template JSON; metafield-driven values
// (heading, subheading, image, and the repeater blocks: icon / heading / teaser / content) are already resolved by the caller.
// blocks: [{ id, settings: { icon, heading, teaser, content, learn_more_text, learn_more_url } }]; blocks[].iconPos / settings.image_pos = object-position.
const WIDTHS = [165, 360, 535, 750, 1100, 1500];
const hl = (text) => (text || '').split('[').map((part, i) => {
  if (i === 0) return part;
  const close = part.indexOf(']');
  return close === -1 ? `[${part}` : `<span class="accordion-block__highlight">${part.slice(0, close)}</span>${part.slice(close + 1)}`;
}).join('');
const H = ({ html, tag: Tag, className }) => <Tag className={className} dangerouslySetInnerHTML={{ __html: hl(html) }} />;

export default function AccordionBlock({ id, settings: s, blocks = [] }) {
  const hasImage = !!s.image;
  const src = settingImg(s.image);
  const mobileSrc = settingImg(s.image_mobile) || src;
  const imgStyle = s.image_pos ? { objectPosition: s.image_pos } : undefined;
  // optional per-image overrides (page.lp-bundle-v3: desktop image from the template, mobile image from a metafield): image_alt, image_mobile_alt, image_mobile_pos
  const mobileImgStyle = s.image_mobile_pos ? { objectPosition: s.image_mobile_pos } : imgStyle;
  const heading = (s.heading || s.subheading) && (
    <>
      {s.heading && <H tag="h2" className={`title ${s.heading_size} title-font-size`} html={s.heading} />}
      {s.subheading && <H tag="p" className="accordion-block__subheading" html={s.subheading} />}
    </>
  );
  const items = blocks.filter((b) => !b.disabled);
  if (!s.heading && !s.subheading && !items.length) return null;

  const header = (b) => (
    <div className="accordion-block__header">
      {b.settings.icon && (
        <div className="accordion-block__icon-badge">
          <Img src={settingImg(b.settings.icon)} alt={b.settings.icon_alt || ''} width="72" height="72" loading="lazy" style={b.settings.icon_pos ? { objectPosition: b.settings.icon_pos } : undefined} />
        </div>
      )}
      <div className="accordion-block__header-text">
        <H tag="h3" className="accordion-block__title" html={b.settings.heading} />
        {b.settings.teaser ? <H tag="p" className="accordion-block__teaser" html={b.settings.teaser} /> : null}
      </div>
    </div>
  );
  const chevron = (
    <span className="accordion-block__chevron-pill">
      <svg className="accordion-block__chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
    </span>
  );

  return (
    <div id={`shopify-section-${id}`} className="shopify-section section">
      <style>{css(s, id)}</style>
      <style>{customCss(id, s.custom_css)}</style>
      <div className={`section--padding accordion-block${s.heading_position === 'above_blocks' ? ' accordion-block--heading-inline' : ''}`}>
        <div className="page-width">
          {heading && <div className="accordion-block__heading-wrapper accordion-block__heading--top">{heading}</div>}
          <div className="accordion-block__container">
            <div className={`accordion-block__grid${hasImage ? ' accordion-block__grid--has-image' : ' accordion-block__grid--no-image'}${s.layout === 'text_first' ? ' accordion-block__grid--reverse' : ''}`}>
              {hasImage && (
                <div className="accordion-block__media">
                  <div className={`accordion-block__image-wrapper media--${s.image_ratio}`}>
                    {s.image_mobile === '' ? (
                      <Img src={src} alt={s.image_alt || ''} width="1500" height={s.image_h || 1500} loading="lazy" className="accordion-block__image" style={imgStyle} />
                    ) : (
                      <>
                        <Img src={mobileSrc} alt={s.image_mobile_alt ?? s.image_alt ?? ''} width="1500" height={s.image_h || 1500} loading="lazy" className="accordion-block__image medium-hide large-up-hide" style={mobileImgStyle} />
                        <Img src={src} alt={s.image_alt || ''} width="1500" height={s.image_h || 1500} loading="lazy" className="accordion-block__image small-hide" style={imgStyle} />
                      </>
                    )}
                  </div>
                </div>
              )}
              <div className="accordion-block__content">
                {heading && <div className="accordion-block__heading accordion-block__heading--inline">{heading}</div>}
                {items.length > 0 && (
                  <div className="accordion-block__items">
                    {items.map((b, i) => {
                      const hasLearn = b.settings.learn_more_text && b.settings.learn_more_url;
                      const body = (b.settings.content || '').replace(/<[^>]*>/g, '').trim();
                      if (!body && !hasLearn) {
                        return (
                          <div key={b.id} className="accordion-block__accordion accordion-block__accordion--static">
                            <div className="accordion-block__summary accordion-block__summary--static">{header(b)}</div>
                          </div>
                        );
                      }
                      const content = (b.settings.content || '').replace(/\[/g, '<span class="accordion-block__highlight">').replace(/\]/g, '</span>');
                      return (
                        <AccordionTab key={b.id} className="accordion-block__accordion" defaultOpen={s.open_first_accordion && i === 0}
                          summaryClassName="accordion-block__summary" summary={<>{header(b)}{chevron}</>}>
                          <div className="accordion-block__body rte">
                            <div dangerouslySetInnerHTML={{ __html: `<div class="metafield-rich_text_field">${content}</div>` }} />
                            {hasLearn && <a href={b.settings.learn_more_url} className="accordion-block__learn-more">{b.settings.learn_more_text} &rarr;</a>}
                          </div>
                        </AccordionTab>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            {(s.button_label || s.guarantee_text) && (
              <div className="accordion-block__cta-block">
                {s.button_label && (
                  <div className="accordion-block__cta">
                    <a href={s.button_link || '#'} className="button button--primary accordion-block__button" dangerouslySetInnerHTML={{ __html: hl(s.button_label) }} />
                  </div>
                )}
                {s.guarantee_text && (
                  <div className="accordion-block__guarantee">
                    <span className="accordion-block__guarantee-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M24.3204 7.78518V20.2149C24.3204 20.7161 24.1474 21.1398 23.8013 21.4859C23.4552 21.832 23.0316 22.0051 22.5305 22.0051H5.46916C4.96807 22.0051 4.54448 21.832 4.19837 21.4859C3.85225 21.1398 3.6792 20.7161 3.6792 20.2149V7.78518C3.6792 7.28391 3.85225 6.86021 4.19837 6.5141C4.54448 6.16799 4.96807 5.99493 5.46916 5.99493H22.5305C23.0316 5.99493 23.4552 6.16799 23.8013 6.5141C24.1474 6.86021 24.3204 7.28391 24.3204 7.78518ZM4.75632 10.3653H23.2433V7.78985C23.2433 7.61038 23.1686 7.44578 23.019 7.29606C22.8695 7.14653 22.705 7.07177 22.5255 7.07177H5.47412C5.29464 7.07177 5.13014 7.14653 4.98062 7.29606C4.83109 7.44578 4.75632 7.61038 4.75632 7.78985V10.3653ZM4.75632 13.004V20.2102C4.75632 20.3897 4.83109 20.5543 4.98062 20.704C5.13014 20.8535 5.29464 20.9283 5.47412 20.9283H22.5255C22.705 20.9283 22.8695 20.8535 23.019 20.704C23.1686 20.5543 23.2433 20.3897 23.2433 20.2102V13.004H4.75632Z" fill="#078942" />
                      </svg>
                    </span>
                    <span className="accordion-block__guarantee-text" dangerouslySetInnerHTML={{ __html: hl(s.guarantee_text) }} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
