import Img from '../components/Img.jsx';
import { settingImg } from '../lib/settingsImg.js';
import css from './timelineSectionCss.js';

// sections/timeline-section.liquid ("Expectation timeline", class kids-timeline). Props = { id, settings, blocks } as in the template JSON,
// metafield values resolved: settings.heading_line_1/2, blocks[].settings = { image, image_alt, image_pos, badge_label, title, description }.
const strip = (h) => (h || '').replace(/<[^>]*>/g, '').trim();

export default function TimelineSection({ id, settings: s, blocks = [] }) {
  const sectionId = `KidsTimeline-${id}`;
  const l1 = strip(s.heading_line_1);
  const l2 = strip(s.heading_line_2);
  const hasHeading = !!(l1 || l2);
  const items = blocks.filter((b) => b.settings.image || (b.settings.badge_label || '').trim() || strip(b.settings.title) || strip(b.settings.description));
  if (!hasHeading && !items.length) return null;
  const Tag = s.heading_tag || 'h2';
  return (
    <div id={`shopify-section-${id}`} className="shopify-section section-kids-timeline">
      <style>{css(s, sectionId, { visible_blocks_count: items.length, block_count: Math.max(1, items.length) })}</style>
      <div id={sectionId} className="kids-timeline" role="region" aria-label={s.accessibility_label || undefined} aria-labelledby={!s.accessibility_label && hasHeading ? `${sectionId}-heading` : undefined}>
        <div className="kids-timeline__inner">
          {hasHeading && (
            <div className="kids-timeline__heading-wrap">
              <Tag id={`${sectionId}-heading`} className="kids-timeline__heading">
                {l1 && <span className="kids-timeline__heading-line kids-timeline__heading-line--primary">{s.heading_line_1}</span>}
                {l2 && <span className="kids-timeline__heading-line kids-timeline__heading-line--secondary">{s.heading_line_2}</span>}
              </Tag>
            </div>
          )}
          {items.length > 0 && (
            <ol className="kids-timeline__list" role="list">
              {items.map((b) => {
                const t = b.settings;
                const hasImg = !!t.image;
                return (
                  <li key={b.id} className="kids-timeline__item">
                    <span className="kids-timeline__marker" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M5.75 12.35l4.05 4.05 8.45-8.8" /></svg></span>
                    <div className={`kids-timeline__step ${hasImg ? 'kids-timeline__step--has-image' : 'kids-timeline__step--no-image'}`}>
                      {hasImg && (
                        <div className="kids-timeline__media">
                          <Img src={settingImg(t.image)} alt={t.image_alt || strip(t.title)} sizes={`(min-width: 750px) ${s.image_size_desktop}px, ${s.image_size_mobile}px`} className="kids-timeline__image" loading="lazy" style={t.image_pos ? { objectPosition: t.image_pos } : undefined} />
                        </div>
                      )}
                      {t.badge_label ? (
                        <div className="kids-timeline__badge">
                          {s.show_badge_icon && (
                            <svg className="kids-timeline__badge-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                              <path d="M7 2.75v3.5M17 2.75v3.5M4.75 9.25h14.5" />
                              <rect x="4.25" y="4.75" width="15.5" height="15.5" rx="2.25" />
                              <path d="M8.25 13h.01M12 13h.01M15.75 13h.01M8.25 16.25h.01M12 16.25h.01M15.75 16.25h.01" />
                            </svg>
                          )}
                          <span>{t.badge_label}</span>
                        </div>
                      ) : hasImg ? <span className="kids-timeline__badge-spacer" aria-hidden="true" /> : null}
                      {(strip(t.title) || strip(t.description)) && (
                        <article className="kids-timeline__card">
                          {strip(t.title) && <h3 className="kids-timeline__title">{t.title}</h3>}
                          {strip(t.description) && <div className="kids-timeline__description" dangerouslySetInnerHTML={{ __html: t.description }} />}
                        </article>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}
