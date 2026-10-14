// Section "custom_css" entries of the template JSON are plain rules scoped by Shopify to the section.
// Reproduced with CSS nesting under #shopify-section-<id>.
export default function customCss(id, rules = []) {
  return rules.map((r) => `#shopify-section-${id} { ${r} }`).join('\n');
}
