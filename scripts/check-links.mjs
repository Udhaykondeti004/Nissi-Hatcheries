// Checks every internal link, image and srcset entry in the built site resolves to a real file.
// Usage: npm run build && npm run check-links   (optionally: node scripts/check-links.mjs https://live-url to check a deployed site)
import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const dist = path.resolve(import.meta.dirname, '../dist');
const base = process.argv[2];

const htmlFiles = (await readdir(dist)).filter((f) => f.endsWith('.html'));
const refs = new Map();
for (const f of htmlFiles) {
  const html = await readFile(path.join(dist, f), 'utf8');
  const found = [
    ...[...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((m) => m[1]),
    ...[...html.matchAll(/srcSet="([^"]+)"/gi)].flatMap((m) => m[1].split(',').map((s) => s.trim().split(' ')[0])),
  ];
  for (const r of found) if (r.startsWith('/') && !r.startsWith('//')) refs.set(r.split('#')[0], f);
}

function resolveLocal(url) {
  const clean = decodeURIComponent(url.split('?')[0]);
  if (clean === '/') return path.join(dist, 'index.html');
  const direct = path.join(dist, clean);
  if (existsSync(direct) && !clean.endsWith('/')) return direct;
  if (existsSync(direct + '.html')) return direct + '.html';
  return null;
}

let bad = 0;
for (const [url, from] of refs) {
  if (base) {
    const res = await fetch(base.replace(/\/$/, '') + url, { method: 'GET', redirect: 'manual' });
    if (res.status !== 200) { bad++; console.log(`✗ ${res.status} ${url} (in ${from})`); }
  } else if (!resolveLocal(url)) {
    bad++;
    console.log(`✗ missing ${url} (in ${from})`);
  }
}
console.log(`${refs.size} internal references checked across ${htmlFiles.length} pages: ${bad ? `${bad} broken` : 'all OK'}`);
process.exit(bad ? 1 : 0);
