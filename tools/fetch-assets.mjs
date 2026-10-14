// Usage: npm run assets:fetch
// Scans src/ for every image/video the prototype references from First Day's public CDNs and
// downloads the ones missing from public/assets/ (so they are committed and deployed with the site).
// Same URL mapping as vite.config.js and vercel.json.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const SHOP = 'https://cdn.shopify.com/s/files/1/0028/0533/4131/files/';
const REPLO = 'https://assets.replocdn.com/projects/43d7f533-5ca6-450f-a904-9ecebbb301d8/';
const EXT = /\.(png|jpe?g|webp|gif|svg|avif|mp4|webm)$/i;

const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) walk(p);
    else if (/\.(jsx?|html|css)$/.test(f.name)) files.push(p);
  }
})(path.join(ROOT, 'src'));

const wanted = new Map(); // local path under public/ -> remote url
const add = (local, remote) => wanted.set(local, remote);
const dec = (s) => { try { return decodeURIComponent(s); } catch { return s; } };

for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  for (const m of s.matchAll(/shopify:\/\/shop_images\/([^"'`\s)\\]+)/g)) add(`assets/shop/${dec(m[1])}`, SHOP + m[1]);
  for (const m of s.matchAll(/\/assets\/shop\/([^"'`\s)\\]+)/g)) add(`assets/shop/${dec(m[1])}`, SHOP + m[1]);
  for (const m of s.matchAll(/\/assets\/replo\/([^"'`\s)\\]+)/g)) add(`assets/replo/${dec(m[1])}`, REPLO + m[1]);
  for (const m of s.matchAll(/reploImg\(\s*['"`]([^'"`]+)['"`]/g)) add(`assets/replo/${m[1]}`, REPLO + encodeURI(m[1]));
  for (const m of s.matchAll(/shopImg\(\s*['"`]([^'"`]+)['"`]/g)) add(`assets/shop/${m[1]}`, SHOP + encodeURI(m[1]));
  for (const m of s.matchAll(/extImg\(\s*['"`]([^'"`?]+)/g)) add(`assets/ext/${m[1].replace(/^https?:\/\//, '')}`, 'https://' + encodeURI(m[1].replace(/^https?:\/\//, '')));
  for (const m of s.matchAll(/\/assets\/ext\/([^"'`\s)?\\]+)/g)) add(`assets/ext/${dec(m[1])}`, 'https://' + m[1]);
  // bare file names (e.g. rows in src/data/products.js passed to shopImg(name) through a variable)
  if (/src\/data\//.test(f)) for (const m of s.matchAll(/['"]([\w%. -]+\.(?:png|jpe?g|webp|gif|svg|avif))['"]/g)) add(`assets/shop/${m[1]}`, SHOP + encodeURI(m[1]));
}

const missing = [...wanted].filter(([l]) => !fs.existsSync(path.join(ROOT, 'public', l)) && EXT.test(l));
console.log(`${wanted.size} referenced, ${missing.length} missing locally`);

let ok = 0; const failed = [];
async function get([local, remote]) {
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(remote, { headers: { 'user-agent': 'Mozilla/5.0' } });
      if (r.ok) {
        const dest = path.join(ROOT, 'public', local);
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.writeFileSync(dest, Buffer.from(await r.arrayBuffer()));
        ok++;
        return;
      }
      if (r.status === 404) break;
    } catch {}
    await new Promise((r) => setTimeout(r, 800));
  }
  failed.push(local);
}
const queue = [...missing];
await Promise.all(Array.from({ length: 6 }, async () => { while (queue.length) await get(queue.shift()); }));
console.log(`downloaded ${ok}`);
if (failed.length) console.log(`not found / failed (${failed.length}) - often just names that are not images on the CDN:\n` + failed.slice(0, 40).join('\n'));
