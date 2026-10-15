// Usage: node tools/generate-image.mjs --prompt "..." --out my-image [--ref path.png ...] [--aspect 16:9] [--size 1K] [--model lite] [--dry-run]
// Generates an image with the Gemini API (Nano Banana) and saves it to public/assets/custom/<out>.png.
// The key is read from GEMINI_API_KEY (environment or .env.local). It is never printed or logged.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const MODELS = { default: 'gemini-nano-banana-2.1', lite: 'gemini-3.1-flash-lite-image', pro: 'gemini-3-pro-image' };
// Approx. USD per 1K image (https://ai.google.dev/gemini-api/docs/pricing), for the cost line only.
const COST_1K = { 'gemini-nano-banana-2.1': 0.034, 'gemini-3.1-flash-lite-image': 0.034, 'gemini-3-pro-image': 0.134 };

const args = process.argv.slice(2);
const get = (k) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : undefined; };
const all = (k) => args.flatMap((a, i) => (a === `--${k}` ? [args[i + 1]] : []));
const prompt = get('prompt');
const out = (get('out') || '').replace(/\.png$/i, '');
const refs = all('ref');
const aspect = get('aspect') || '1:1';
const size = get('size') || '1K';
const model = MODELS[get('model') || 'default'] || get('model');
const dry = args.includes('--dry-run');

if (!prompt || !out) { console.error('Need --prompt "..." and --out file-name'); process.exit(1); }

function loadKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  const f = path.join(ROOT, '.env.local');
  if (fs.existsSync(f)) {
    const m = fs.readFileSync(f, 'utf8').match(/^GEMINI_API_KEY\s*=\s*(.+)$/m);
    if (m) return m[1].trim().replace(/^["']|["']$/g, '');
  }
  return '';
}
const mime = (p) => ({ '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp' }[path.extname(p).toLowerCase()] || 'image/png');

const input = [{ type: 'text', text: prompt }];
for (const r of refs) {
  const file = path.isAbsolute(r) ? r : path.join(ROOT, r);
  input.push({ type: 'image', mime_type: mime(file), data: fs.readFileSync(file).toString('base64') });
}
const body = { model, input, response_format: { type: 'image', mime_type: 'image/png', aspect_ratio: aspect, image_size: size } };

const dest = path.join(ROOT, 'public/assets/custom', `${out}.png`);
console.log(`model=${model} aspect=${aspect} size=${size} refs=${refs.length} -> ${path.relative(ROOT, dest)}`);
console.log(`estimated cost for this image: about $${((COST_1K[model] || 0.05) * (size === '2K' ? 1.5 : size === '4K' ? 3.3 : 1)).toFixed(3)}`);
if (dry) { console.log('dry run: nothing sent'); process.exit(0); }

const key = loadKey();
if (!key) { console.error('No GEMINI_API_KEY found. Put it in .env.local (see .env.example).'); process.exit(1); }

const res = await fetch('https://generativelanguage.googleapis.com/v1beta/interactions', {
  method: 'POST',
  headers: { 'x-goog-api-key': key, 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});
const text = await res.text();
if (!res.ok) { console.error(`API error ${res.status}: ${text.slice(0, 800)}`); process.exit(1); }
const json = JSON.parse(text);

// Find the first image block anywhere in the response: { type: "image", data: <base64>, mime_type: "image/..." }
let found = null;
(function walk(n) {
  if (found || !n || typeof n !== 'object') return;
  if (typeof n.data === 'string' && n.data.length > 1000 && /^image\//.test(n.mime_type || '')) { found = n; return; }
  for (const v of Object.values(n)) walk(v);
})(json);
if (!found) { console.error('No image in the response:', text.slice(0, 800)); process.exit(1); }

fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, Buffer.from(found.data, 'base64'));
fs.appendFileSync(path.join(ROOT, 'public/assets/custom/PROMPTS.md'), `\n## ${out}.png\n- model: ${model}, aspect ${aspect}, size ${size}, refs: ${refs.join(', ') || 'none'}\n- prompt: ${prompt}\n`);
console.log(`saved ${path.relative(ROOT, dest)}  ->  use customImg('${out}.png')`);
