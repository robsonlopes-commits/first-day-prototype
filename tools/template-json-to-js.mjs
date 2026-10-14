// Usage: node tools/template-json-to-js.mjs <templates/x.json> <out.js> <header comment>
// Converts a Shopify template JSON into { sectionKey: { id, type, settings, blocks: [{ id, type, name, disabled, settings }], custom_css, ... } } + ORDER
// (the same shape as src/data/landingTemplate.js).
import fs from 'node:fs';
const [, , inFile, outFile, ...rest] = process.argv;
const raw = fs.readFileSync(inFile, 'utf8').replace(/^\/\*[\s\S]*?\*\//, '');
const t = JSON.parse(raw);
const out = {};
for (const key of t.order) {
  const s = t.sections[key];
  const { blocks, block_order, ...others } = s;
  const sec = { id: key, ...others };
  if (blocks) {
    const order = block_order || Object.keys(blocks);
    sec.blocks = order.map((bid) => ({ id: bid, ...blocks[bid] }));
  }
  out[key] = sec;
}
const header = `// Generated from ${inFile.replace(/^.*reference\//, 'reference/')} (section settings + blocks as in the template JSON) by tools/template-json-to-js.mjs.\n// ${rest.join(' ')}\n`;
fs.writeFileSync(outFile, `${header}export const TEMPLATE = ${JSON.stringify(out, null, 1)};\nexport const ORDER = ${JSON.stringify(t.order)};\n`);
console.log('wrote', outFile, t.order.length, 'sections');
