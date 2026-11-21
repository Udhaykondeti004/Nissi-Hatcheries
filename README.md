# Nissi Hatcheries – official website

Static website for **Nissi Hatcheries**, a CAA-registered shrimp hatchery (Reg. No. 56-9(179)/2022) at
Seelamvaripalem, Ponnada Village, U. Kothapalli Mandal, Kakinada District, Andhra Pradesh 533449.

- **Live:** https://nissi-hatcheries.kondetiudhay.workers.dev
- **Hosting:** Cloudflare Workers static assets (free plan), connected to this GitHub repo. Every push to `main` rebuilds and redeploys automatically.
- **Running cost:** ₹0. No backend, database, paid API or subscription.

## How content is managed

| What | Where | Who changes it |
|---|---|---|
| Seed prices, price remarks, new photos | `src/data/published.json` + `public/uploads/` | **The admin, through the Google Form.** The publishing script commits here automatically. See [`apps-script/SETUP.md`](apps-script/SETUP.md). |
| Business name, phones, WhatsApp number, email | `src/content/business.ts` | Developer (one file) |
| Address, map pin, landmarks | `src/content/location.ts` | Developer |
| CAA registration details | `src/content/caa.ts` | Developer |
| Product descriptions and specifications | `src/content/products.ts` | Developer |
| Page titles and descriptions (SEO), Search Console tag | `src/content/site.ts` | Developer |
| Hatchery photos | `assets-src/photos/` (originals) + `src/content/media.ts` | Developer |

Values set to `null` (email, PL stage, minimum order…) are hidden on the site or shown as "Confirm on enquiry", never guessed.

## Develop

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # optimise images → type-check → build → prerender every page
npm run preview      # serve the production build on http://localhost:4173
npm run check-links  # verify every internal link/image in dist/
```

Requires Node 22 or newer.

## How the build works

1. `scripts/optimize-images.mjs` turns `assets-src/photos/*` and `public/uploads/*` into responsive WebP files in `public/img/`, plus a manifest.
2. Vite builds the React app (React, TypeScript, Tailwind CSS, lucide-react).
3. `scripts/prerender.mjs` renders each route to its own HTML file (`about.html`, …) with its own title, description, canonical URL and LocalBusiness JSON-LD, then writes `404.html`, `sitemap.xml` and `robots.txt`.

## Cloudflare settings (Workers & Pages → nissi-hatcheries → Settings → Build)

| Setting | Value |
|---|---|
| Git repository / branch | `Udhaykondeti004/Nissi-Hatcheries`, `main` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` (uploads `dist/` as static files, as set in `wrangler.jsonc`) |
| Node version | 22 (`.nvmrc`) |

`wrangler.jsonc` must stay in the repo. Without it, Wrangler auto-configures the project and breaks the prerender step.

## Brand assets

- `assets-src/brand/nissi-logo-mark.png` is the spiral-shell mark, extracted from a photo of the business card (`business-card-source.jpg`). Replace it with the original vector or high-res file when available, then run `python3 scripts/make-brand-assets.py` to regenerate the favicons and share image.
- Fonts: Source Sans 3 (body, close to the card's humanist sans) and Source Serif 4 (headings), self-hosted.
