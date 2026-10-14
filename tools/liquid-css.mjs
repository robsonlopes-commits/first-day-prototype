// Usage: node tools/liquid-css.mjs <in.css.liquid> <out.css>
// Converts a theme CSS snippet to plain CSS: drops {% comment %}, resolves
// {{ settings.x }} from the exported settings, drops template.suffix-only blocks.
import fs from 'node:fs';
const [, , inFile, outFile] = process.argv;
const settingsRaw = fs.readFileSync(new URL('../reference/theme/config/settings_data.json', import.meta.url), 'utf8').replace(/^\s*\/\*[\s\S]*?\*\//, '');
const settings = JSON.parse(settingsRaw).current;
let css = fs.readFileSync(inFile, 'utf8');
css = css.replace(/\{%-?\s*comment\s*-?%\}[\s\S]*?\{%-?\s*endcomment\s*-?%\}/g, '');
css = css.replace(/\{%-?\s*if\s+template\.suffix[^%]*%\}[\s\S]*?\{%-?\s*endif\s*-?%\}/g, '');
css = css.replace(/\{\{-?\s*settings\.([a-z_0-9]+)\s*-?\}\}/g, (_, k) => settings[k] ?? '');
css = css.replace(/<\/?style[^>]*>/g, '');
css = css.replace(/\{%-?\s*(style|endstyle)\s*-?%\}/g, '');
// browsers ignore a stray top-level '}' but PostCSS refuses it
css = css.replace(/(About-Page=+\*\/\s*)\}/, '$1');
const left = css.match(/\{%[\s\S]*?%\}|\{\{[\s\S]*?\}\}/g);
if (left) console.warn(inFile, 'unresolved liquid:', [...new Set(left)].slice(0, 5));
fs.writeFileSync(outFile, css);
