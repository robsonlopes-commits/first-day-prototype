// sections/custom-liquid.liquid: renders merchant HTML inside .section--padding > .page-width. Props = { id, settings, customCss } as in the template JSON
// (customCss = the template's custom_css rules, scoped to the section like the theme editor does).
export default function CustomLiquid({ id, settings: s, customCss = [] }) {
  const sid = `shopify-section-${id}`;
  return (
    <div id={sid} className="shopify-section section custom-liquid-outer-container">
      <style>{`#${sid} { --section-padding-top: ${s.padding_top ?? 0}px; --section-padding-bottom: ${s.padding_bottom ?? 0}px; }`}</style>
      {customCss.length > 0 && <style>{customCss.map((r) => `#${sid} ${r}`).join('\n')}</style>}
      {s.anchor_id ? <div id={s.anchor_id} className="fd-jump-anchor" /> : null}
      <div className={`section--padding${s.show_divider ? ' section--divider' : ''}`}>
        <div className={`page-width${s.full_width ? ' page-width--full-width' : ''}`} dangerouslySetInnerHTML={{ __html: s.custom_liquid }} />
      </div>
    </div>
  );
}
