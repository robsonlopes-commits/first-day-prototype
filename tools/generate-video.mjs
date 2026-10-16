// Usage: node tools/generate-video.mjs --prompt "..." --out /path/clip.mp4 [--image first-frame.jpg] [--seconds 4|6|8] [--aspect 16:9|9:16] [--dry-run]
// Owner rule: videos ALWAYS use the cheapest model (Veo 3.1 Lite, 720p) and NO audio. The API always renders an audio track for Veo, so the
// audio is dropped when the clips are assembled (tools/stitch-video.swift, which only copies the video track). The key comes from
// GEMINI_API_KEY (environment or .env.local) and is never printed. Lite clips are 4, 6 or 8 seconds, so longer videos are stitched from clips.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const MODEL = 'veo-3.1-lite-generate-preview';
const USD_PER_SECOND = 0.05; // Veo 3.1 Lite 720p (with audio), from the Gemini API pricing page
const args = process.argv.slice(2);
const get = (k) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : undefined; };
const prompt = get('prompt'), out = get('out'), image = get('image');
const seconds = Number(get('seconds') || 4), aspect = get('aspect') || '16:9', dry = args.includes('--dry-run');
if (!prompt || !out) { console.error('Need --prompt and --out'); process.exit(1); }
if (![4, 6, 8].includes(seconds)) { console.error('--seconds must be 4, 6 or 8'); process.exit(1); }
console.log(`model=${MODEL} 720p ${aspect} ${seconds}s image=${image ? path.basename(image) : 'none'} -> ${out}`);
console.log(`estimated cost: about $${(seconds * USD_PER_SECOND).toFixed(2)}`);
if (dry) { console.log('dry run: nothing sent'); process.exit(0); }

function loadKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  const f = path.join(ROOT, '.env.local');
  if (fs.existsSync(f)) { const m = fs.readFileSync(f, 'utf8').match(/^GEMINI_API_KEY\s*=\s*(.+)$/m); if (m) return m[1].trim().replace(/^["']|["']$/g, ''); }
  return '';
}
const key = loadKey();
if (!key) { console.error('No GEMINI_API_KEY found (see .env.example).'); process.exit(1); }
const H = { 'x-goog-api-key': key, 'Content-Type': 'application/json' };
const base = 'https://generativelanguage.googleapis.com/v1beta';
const instance = { prompt };
if (image) instance.image = { bytesBase64Encoded: fs.readFileSync(image).toString('base64'), mimeType: /png$/i.test(image) ? 'image/png' : 'image/jpeg' };
const res = await fetch(`${base}/models/${MODEL}:predictLongRunning`, { method: 'POST', headers: H, body: JSON.stringify({ instances: [instance], parameters: { aspectRatio: aspect, durationSeconds: seconds, resolution: '720p' } }) });
const t = await res.text();
if (!res.ok) { console.error(`API error ${res.status}: ${t.slice(0, 600)}`); process.exit(1); }
let op = JSON.parse(t);
for (let i = 0; !op.done && i < 90; i++) {
  await new Promise((r) => setTimeout(r, 10000));
  op = await (await fetch(`${base}/${op.name}`, { headers: H })).json();
}
if (!op.done) { console.error('timed out waiting for the video'); process.exit(1); }
if (op.error) { console.error('generation failed:', JSON.stringify(op.error).slice(0, 600)); process.exit(1); }
const r = op.response?.generateVideoResponse || op.response || {};
if (r.raiMediaFilteredCount) { console.error('blocked by safety filters:', JSON.stringify(r.raiMediaFilteredReasons || r).slice(0, 500)); process.exit(1); }
const uri = r.generatedSamples?.[0]?.video?.uri || r.generatedVideos?.[0]?.video?.uri;
if (!uri) { console.error('no video in the response:', JSON.stringify(op).slice(0, 600)); process.exit(1); }
const vr = await fetch(uri, { headers: { 'x-goog-api-key': key }, redirect: 'follow' });
if (!vr.ok) { console.error('download failed', vr.status); process.exit(1); }
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, Buffer.from(await vr.arrayBuffer()));
console.log(`saved ${out}`);
