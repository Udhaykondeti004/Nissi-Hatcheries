// Renders every route to static HTML after the client build, so each page has its
// own title, description, canonical URL, structured data and full content without JavaScript.
// Also writes 404.html, sitemap.xml and robots.txt.
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const ssr = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href);
const { render, routes, metaFor, business, seo, structuredData } = ssr;

const template = await readFile(path.join(dist, 'index.html'), 'utf8');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const jsonLd = `<script type="application/ld+json">${JSON.stringify(structuredData()).replace(/</g, '\\u003c')}</script>`;
const verification = seo.googleSiteVerification
  ? `<meta name="google-site-verification" content="${esc(seo.googleSiteVerification)}" />`
  : '';

function page(url, meta, { noindex = false } = {}) {
  const canonical = business.siteUrl + (meta.path === '/' ? '/' : meta.path);
  let html = template
    .replaceAll('__SITE_URL__', business.siteUrl)
    .replace(/<title>.*?<\/title>/s, `<title>${esc(meta.title)}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${esc(meta.description)}" />`)
    .replace(/<link rel="canonical"[^>]*>/, noindex ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(meta.title)}" />`)
    .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${esc(meta.description)}" />`)
    .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${canonical}" />`)
    .replace('<!--structured-data-->', jsonLd)
    .replace('<!--search-console-->', verification)
    .replace('<!--app-->', render(url));
  return html;
}

for (const r of routes) {
  // '/about' -> about.html: Cloudflare Pages serves it at /about with no redirect.
  const out = r.path === '/' ? path.join(dist, 'index.html') : path.join(dist, `${r.path.slice(1)}.html`);
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, page(r.path, r));
}

await writeFile(
  path.join(dist, '404.html'),
  page('/__not-found__', { path: '/404', title: 'Page not found | Nissi Hatcheries', description: metaFor('/').description }, { noindex: true }),
);

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((r) => `  <url><loc>${business.siteUrl}${r.path === '/' ? '/' : r.path}</loc><lastmod>${today}</lastmod><priority>${r.path === '/' ? '1.0' : '0.8'}</priority></url>`)
  .join('\n')}
</urlset>
`;
await writeFile(path.join(dist, 'sitemap.xml'), sitemap);
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${business.siteUrl}/sitemap.xml\n`);

await rm(path.join(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`prerendered ${routes.length} routes + 404, sitemap.xml, robots.txt`);
