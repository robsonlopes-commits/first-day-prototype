// Shopify "custom_css" of a section (array of rule strings in the template JSON) is scoped to that section's wrapper.
// Prefixes every selector with #shopify-section-<id>. Handles comma lists; does not handle nested at-rules.
export default function scopeCustomCss(rules = [], id) {
  return (rules || [])
    .map((rule) => {
      const i = rule.indexOf('{');
      if (i < 0) return '';
      const sels = rule.slice(0, i).split(',').map((x) => `#shopify-section-${id} ${x.trim()}`).join(', ');
      return `${sels} ${rule.slice(i)}`;
    })
    .join('\n');
}
