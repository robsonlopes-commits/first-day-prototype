// Generated from the {% stylesheet %} of sections/faq.liquid ("Upgraded FAQ UI").
export default `
/* ─── Upgraded FAQ UI ───
   Enhances the existing .faq structure with configurable look-and-feel.
   All colors, sizes, and shapes drive from CSS variables declared in the
   per-instance <style> block at the top of the section. */

.faq--upgraded {
  max-width: var(--faq-max-width, 1100px);
  margin-inline: auto;
}

.faq--upgraded accordion-tab {
  display: block;
  margin-bottom: var(--faq-item-gap, 12px);
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

/* ── Card style (bordered, rounded) ── */
.faq--card accordion-tab {
  background: var(--faq-item-bg, #FFFFFF);
  border: var(--faq-border-width, 1px) solid var(--faq-item-border, #CCCCCC);
  border-radius: var(--faq-item-radius, 16px);
  overflow: hidden;
}
.faq--card accordion-tab:hover {
  border-color: color-mix(in srgb, var(--faq-primary, #486CED) 50%, var(--faq-item-border, #CCCCCC));
}
.faq--card accordion-tab:has(details[open]) {
  border-color: var(--faq-primary, #486CED);
  box-shadow: 0 6px 20px color-mix(in srgb, var(--faq-primary, #486CED) 12%, transparent);
}

/* ── Divider style (hairline separators, no card chrome) ── */
.faq--divider accordion-tab {
  border-top: var(--faq-border-width, 1px) solid var(--faq-item-border, #CCCCCC);
  border-radius: 0;
  background: transparent;
  margin-bottom: 0;
}
.faq--divider accordion-tab:last-of-type {
  border-bottom: var(--faq-border-width, 1px) solid var(--faq-item-border, #CCCCCC);
}

/* ── Minimal style (no borders, just padding/spacing) ── */
.faq--minimal accordion-tab {
  background: transparent;
  border: 0;
  border-radius: 0;
}

/* ── Summary / question row ── */
.faq accordion-tab details summary {
  padding: var(--faq-item-padding, 18px);
  cursor: pointer;
  font-size: var(--faq-question-size, 18px);
  font-weight: var(--faq-question-weight, 700);
  color: var(--faq-question-color, #2C3E50);
  line-height: 1.4;
  transition: color 0.15s ease;
  list-style: none;
}
.faq--upgraded accordion-tab summary::-webkit-details-marker { display: none; }
.faq--upgraded accordion-tab summary::marker { display: none; content: ''; }
.faq--upgraded accordion-tab summary:focus-visible {
  outline: 2px solid var(--faq-primary, #486CED);
  outline-offset: 2px;
}
.faq--upgraded accordion-tab summary:hover {
  color: var(--faq-primary, #486CED);
}

.faq--upgraded accordion-tab summary > span {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
}
.faq--upgraded .faq-question-text {
  flex: 1;
  min-width: 0;
}

/* ── Icon ── */
.faq--upgraded .faqicon {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--faq-icon-size, 32px);
  height: var(--faq-icon-size, 32px);
  border-radius: 50%;
  background: var(--faq-icon-bg, color-mix(in srgb, var(--faq-primary, #486CED) 10%, transparent));
  color: var(--faq-icon-color, var(--faq-primary, #486CED));
  transition: background 0.2s ease, color 0.2s ease, transform 0.25s ease;
  font-size: 14px;
}
.faq--upgraded accordion-tab details[open] .faqicon {
  background: var(--faq-icon-bg-open, var(--faq-primary, #486CED));
  color: var(--faq-icon-color-open, #fff);
}

/* Icon animations — sweep clockwise (to the right) on open */
.faq--upgraded .faqicon--chevron svg,
.faq--upgraded .faqicon--caret svg,
.faq--upgraded .faqicon--arrow svg {
  transition: transform 0.25s ease;
}
.faq--upgraded accordion-tab details[open] .faqicon--chevron svg,
.faq--upgraded accordion-tab details[open] .faqicon--caret svg {
  transform: rotate(180deg);
}
.faq--upgraded .icon-plus-alt {
  transition: transform 0.25s ease;
  display: inline-block;
}
.faq--upgraded accordion-tab details[open] .icon-plus-alt {
  transform: rotate(45deg);
}

/* Override the base theme's \`.faqicon\` wrapper rotation so only the SVG
   inside spins. Without this, the wrapper rotates 90° on hover and
   composes with the SVG's own rotation (visual rotation = 180° = LEFT).
   Scoped tightly to the same selector the theme uses, so the open-state
   plus rotation (on \`.icon-plus-alt\`) is untouched. */
@media screen and (hover: hover) {
  .faq--upgraded details:not([open]) summary:hover .faqicon {
    transform: none !important;
  }
}

/* Arrow: three-stage counter-clockwise rotation
   - closed:  rotate(90deg)  → points down ↓
   - hover:   rotate(0deg)   → points right →
   - open:    rotate(-90deg) → points up ↑ */
.faq--upgraded .faqicon--arrow svg {
  transform: rotate(90deg);
}
.faq--upgraded accordion-tab summary:hover .faqicon--arrow svg {
  transform: rotate(0deg);
}
.faq--upgraded accordion-tab details[open] .faqicon--arrow svg {
  transform: rotate(-90deg);
}

/* ── Answer content ── */
.faq--upgraded .accordion__content {
  padding: 4px var(--faq-item-padding, 18px) var(--faq-item-padding, 18px);
  font-size: var(--faq-answer-size, 15px);
  line-height: 1.65;
  color: var(--faq-answer-color, #2C3E50);
}
.faq--upgraded .accordion__content > *:first-child { margin-top: 0; }
.faq--upgraded .accordion__content > *:last-child { margin-bottom: 0; }
.faq--upgraded .accordion__content a {
  color: var(--faq-primary, #486CED);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.faq--upgraded .accordion__content ul,
.faq--upgraded .accordion__content ol { padding-inline-start: 1.25rem; }
.faq--upgraded .accordion__content p { margin: 0 0 0.75em; }
.faq--upgraded .accordion__content p:last-child { margin-bottom: 0; }

/* ── Rich-text block (between questions) ── */
.faq--upgraded > p.h3 {
  margin: 1.5rem 0 0.5rem;
  color: var(--faq-question-color, #2C3E50);
}

/* ── Mobile ── */
@media screen and (max-width: 749px) {
  .faq--upgraded accordion-tab summary {
    padding: 14px;
    font-size: calc(var(--faq-question-size, 18px) - 2px);
  }
  .faq--upgraded .accordion__content {
    padding: 2px 14px 14px;
  }
  .faq--upgraded .faqicon {
    width: calc(var(--faq-icon-size, 32px) - 4px);
    height: calc(var(--faq-icon-size, 32px) - 4px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .faq--upgraded *, .faq--upgraded *::before, .faq--upgraded *::after {
    transition-duration: 0.01ms !important;
  }
}
`;
