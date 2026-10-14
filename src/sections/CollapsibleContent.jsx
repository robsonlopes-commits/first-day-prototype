import { useRef } from 'react';
import '../styles/theme/component-accordion.css';
import '../styles/theme/section-product-details.css';
import css from './collapsibleContentCss.js';

// sections/collapsible-content.liquid (FAQ). Props: { id, settings, blocks } as in the template JSON.
// Rows keep the theme markup (accordion-tab > details > summary); the open/close animation is a port of the
// AccordionTab custom element in assets/global.js (height animation 400ms ease-out / 250ms ease).
function AccordionTab({ defaultOpen, title, html, children }) {
  const detailsRef = useRef(null);
  const summaryRef = useRef(null);
  const contentRef = useRef(null);
  const st = useRef({ animation: null, closing: false, expanding: false });

  const finish = (open) => {
    const d = detailsRef.current;
    d.open = open;
    st.current = { animation: null, closing: false, expanding: false };
    d.style.height = d.style.overflow = '';
  };
  const marginTop = () => parseInt(getComputedStyle(summaryRef.current).marginTop, 10) || 0;
  const run = (end, duration, easing, open, flag) => {
    const d = detailsRef.current;
    st.current.animation?.cancel();
    const a = d.animate({ height: [`${d.offsetHeight}px`, end] }, { duration, easing });
    st.current.animation = a;
    st.current[flag] = true;
    a.onfinish = () => finish(open);
    a.oncancel = () => { st.current[flag] = false; };
  };
  const shrink = () => {
    st.current.closing = true;
    run(`${summaryRef.current.offsetHeight + marginTop()}px`, 250, 'ease', false, 'closing');
  };
  const expand = () => {
    const end = `${summaryRef.current.offsetHeight + marginTop() + contentRef.current.offsetHeight}px`;
    run(end, 400, 'ease-out', true, 'expanding');
  };
  const open = () => {
    const d = detailsRef.current;
    d.style.height = `${d.offsetHeight}px`;
    d.open = true;
    requestAnimationFrame(expand);
  };
  const onClick = (e) => {
    e.preventDefault();
    detailsRef.current.style.overflow = 'hidden';
    if (st.current.closing || !detailsRef.current.open) open();
    else shrink();
  };

  return (
    <accordion-tab class="accordion">
      <details ref={detailsRef} open={defaultOpen || undefined}>
        <summary ref={summaryRef} onClick={onClick}>
          <span className="summary__title">
            <p className="accordion__title h3">{title}</p>
          </span>
          <span className="icon icon-plus-alt" />
        </summary>
        <div ref={contentRef} className="accordion__content rte typeset" dangerouslySetInnerHTML={{ __html: html }} />
      </details>
    </accordion-tab>
  );
}

export default function CollapsibleContent({ id, settings: s, blocks = [] }) {
  const Heading = s.heading_tag || 'h2';
  const rows = blocks.filter((b) => b.type === 'collapsible_row');
  return (
    <div id={`shopify-section-${id}`} className="shopify-section section">
      <style>{css(s, id)}</style>
      {s.anchor_id ? <div id={s.anchor_id} className="fd-jump-anchor" /> : null}
      <div className={`section--padding${s.show_divider ? ' section--divider' : ''}`}>
        <div className={`page-width${s.narrow ? ' page-width--inner' : ''}`}>
          <div className={`title-wrapper${!s.heading && !s.heading_accent ? ' title-wrapper--no-heading' : ''}`}>
            <Heading className={`title ${s.heading_size} faq-v2__heading`}>
              {s.heading}
              {s.heading_accent ? <>{' '}<span className="faq-v2__heading-accent">{s.heading_accent}</span></> : null}
            </Heading>
          </div>
          {rows.length > 0 && (
            <div className="product-details">
              {rows.map((b, i) => (
                <AccordionTab key={b.id} defaultOpen={s.open_first_collapsible_row && i === 0} title={b.settings.heading || b.settings.page?.title}
                  html={`${b.settings.row_content || ''}${b.settings.page?.content || ''}`} />
              ))}
            </div>
          )}
          {s.footer_text ? <div className="faq-v2__footer" dangerouslySetInnerHTML={{ __html: s.footer_text }} /> : null}
        </div>
      </div>
    </div>
  );
}
