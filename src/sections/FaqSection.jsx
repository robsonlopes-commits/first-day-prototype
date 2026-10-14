import AccordionTab from '../components/AccordionTab.jsx';
import faqCss from './faqSectionCss.js';
import '../styles/theme/section-faq.css';

// sections/faq.liquid ("FAQs"). Props: { id, settings, blocks } as in the template JSON, with blocks = [{ type: 'question', settings: { title, text } }].
// On /pages/bundle-builder-v2 the question blocks are a repeater over the page metafield custom.section_faq (empty on the live page),
// so the section renders nothing there. Pass real blocks to see the upgraded card accordion.
const ICONS = {
  chevron: <span className="faqicon faqicon--chevron" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>,
  caret: <span className="faqicon faqicon--caret" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor"><path d="M5 7l5 6 5-6z" /></svg></span>,
  arrow: <span className="faqicon faqicon--arrow" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M5 10h10M11 6l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>,
  none: null,
};

export default function FaqSection({ id, settings: s, blocks = [] }) {
  const items = blocks.filter((b) => !b.disabled && (b.type === 'rich-text' || (b.settings.title && b.settings.text)));
  if (!items.length) return null;
  const sid = `shopify-section-${id}`;
  const Tag = s.heading_tag || 'h2';
  const vars = `#${sid} { --section-padding-top: ${s.padding_top}px; --section-padding-bottom: ${s.padding_bottom}px; --faq-primary: ${s.primary_color}; --faq-item-bg: ${s.item_bg_color}; --faq-item-border: ${s.item_border_color}; --faq-question-color: ${s.question_text_color}; --faq-answer-color: ${s.answer_text_color}; --faq-icon-bg: ${s.icon_bg_color}; --faq-icon-color: ${s.icon_color}; --faq-icon-bg-open: ${s.icon_bg_color_open}; --faq-icon-color-open: ${s.icon_color_open}; --faq-question-size: ${s.question_font_size}px; --faq-answer-size: ${s.answer_font_size}px; --faq-question-weight: ${s.question_weight}; --faq-item-radius: ${s.item_radius}px; --faq-item-gap: ${s.item_gap}px; --faq-border-width: ${s.border_width}px; --faq-item-padding: ${s.item_padding}px; --faq-max-width: ${s.max_width}px; --faq-icon-size: ${s.icon_size}px; }`;
  const body = (
    <div className={`faq faq--upgraded faq--${s.item_style} page-width${s.narrow ? ' page-width--inner' : ''}`}>
      <div className={`title-wrapper${s.heading ? '' : ' title-wrapper--no-heading'} ${s.heading_alignment}`}>
        <Tag className={`title ${s.heading_size}`}>{s.heading}</Tag>
      </div>
      {items.map((b) => b.type === 'rich-text' ? (
        <div key={b.id}><p className="h3">{b.settings.title}</p><div className="rte" dangerouslySetInnerHTML={{ __html: b.settings.text }} /></div>
      ) : (
        <AccordionTab key={b.id}
          summary={<span>{s.icon_style in ICONS ? ICONS[s.icon_style] : <span className="faqicon icon-plus-alt" />}<span className="faq-question-text">{b.settings.title}</span></span>}>
          <div className="accordion__content rte typeset" dangerouslySetInnerHTML={{ __html: b.settings.text }} />
        </AccordionTab>
      ))}
    </div>
  );
  return (
    <div id={sid} className="shopify-section">
      <style>{vars}{faqCss}</style>
      <div className={`section--padding${s.show_divider ? ' section--divider' : ''}`} data-faq-icon={s.icon_style} data-faq-item-style={s.item_style} {...(s.single_open ? { 'data-faq-single-open': '' } : {})}>
        {s.secondary_background ? <div className="faq--colored">{body}</div> : body}
      </div>
    </div>
  );
}
