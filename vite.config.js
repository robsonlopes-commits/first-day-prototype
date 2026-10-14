import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

// Lazy asset cache: /assets/shop/<file>, /assets/replo/<file>, /assets/ext/<host>/<path>
// are downloaded from the public CDN on first request and stored in public/assets/…
// so the prototype keeps working offline afterwards. Delete the folder to refetch.
const SHOP_FILES = 'https://cdn.shopify.com/s/files/1/0028/0533/4131/files/';
const REPLO = 'https://assets.replocdn.com/projects/43d7f533-5ca6-450f-a904-9ecebbb301d8/';

function assetCache() {
  return {
    name: 'asset-cache',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = decodeURIComponent((req.url || '').split('?')[0]);
        let remote = null;
        if (url.startsWith('/assets/shop/')) remote = SHOP_FILES + encodeURI(url.slice(13));
        else if (url.startsWith('/assets/replo/')) remote = REPLO + encodeURI(url.slice(14));
        else if (url.startsWith('/assets/ext/')) remote = 'https://' + url.slice(12);
        if (!remote) return next();
        const local = path.join(server.config.root, 'public', url);
        if (fs.existsSync(local)) return next();
        try {
          const r = await fetch(remote, { headers: { 'user-agent': 'Mozilla/5.0' } });
          if (!r.ok) { res.statusCode = 404; return res.end('missing ' + remote); }
          fs.mkdirSync(path.dirname(local), { recursive: true });
          fs.writeFileSync(local, Buffer.from(await r.arrayBuffer()));
          next();
        } catch (e) { res.statusCode = 502; res.end(String(e)); }
      });
    },
  };
}

export default defineConfig({ plugins: [react(), assetCache()] });
