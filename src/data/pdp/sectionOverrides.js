// Helpers for the legacy PDP pages of the other products (see toddlersProbiotic.js, toddlerTlcStarterPack.js): the sections under the main one are the
// Kids' Magnesium entries of src/data/pdpLegacySections.js with only the metafield-driven values replaced (image, alt, headings, texts).

// overrides: { [sectionId]: (section) => section }. `drop` = ids of sections the live page does not render for that product.
export const overrideSections = (sections, drop, overrides) => sections.filter((s) => !drop.includes(s.id)).map((s) => (overrides[s.id] ? overrides[s.id](s) : s));

const setBlock = (sec, type, settings) => {
  let done = false;
  return sec.blocks.map((b) => {
    if (done || b.type !== type) return b;
    done = true;
    return { ...b, settings: { ...b.settings, ...settings } };
  });
};

// image-with-text: image = file name in the shop files, alt = image alt text of the live page; heading / text are optional (kept when omitted); settings = extra section settings to override
export const imageWithText = ({ image, alt = '', heading, text, settings = {}, imageRatio }) => (sec) => ({
  ...sec,
  ...(imageRatio ? { imageRatio } : {}), // width / height of the image file when it is not square (the theme reads it from the file metadata)
  settings: { ...sec.settings, image: `shopify://shop_images/${image}`, image_alt: alt, ...settings },
  blocks: setBlock({ blocks: heading === undefined ? sec.blocks : setBlock(sec, 'heading', { heading }) }, 'text', text === undefined ? {} : { text }),
});

// rich-text: heading + text blocks
export const richText = ({ heading, text }) => (sec) => ({
  ...sec,
  blocks: setBlock({ blocks: setBlock(sec, 'heading', { heading }) }, 'text', { text }),
});

// 45 day money-back guarantee image-with-text: identical on every product, but the live page has a newer image (without the offset frame) than the Kids' Magnesium replica
export const guaranteeSection = imageWithText({
  image: 'fd-parent-trust-collage-97.jpg', alt: "97% of customer prefer First Day over other vitamin brands they've tried. Based on study of 264 customers.",
  settings: { enable_box_shadow: false },
});

// FAQ collapsible-content: product specific heading + first row ("What are the ingredients?")
export const faqSection = ({ heading, ingredientsHtml }) => (sec) => ({
  ...sec,
  settings: { ...sec.settings, heading },
  blocks: sec.blocks.map((b, i) => (i === 0 ? { ...b, settings: { ...b.settings, row_content: `<div class="metafield-rich_text_field">${ingredientsHtml}</div>` } } : b)),
});

// "What Sets First Day Apart" image-with-text of the Toddlers pages
export const toddlersComparison = imageWithText({
  image: 'Usvs.Them.jpg', alt: "Product comparison chart for 'first day' with checkmarks and crosses on a blue background", heading: 'What Sets First Day Apart',
  text: '<div class="metafield-rich_text_field"><p>Over 1 million families have made the switch to First Day, and it is easy to see why when competitors take so many shortcuts.</p></div>',
});
