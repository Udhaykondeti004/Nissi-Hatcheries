# Nissi Hatcheries – official website

Static website for **Nissi Hatcheries**, a CAA-registered shrimp hatchery (Reg. No. 56-9(179)/2022) at
Seelamvaripalem, Ponnada Village, U. Kothapalli Mandal, Kakinada District, Andhra Pradesh 533449.

- **Live:** https://nissi-hatcheries.pages.dev
- **Hosting:** Cloudflare Pages (free plan), project `nissi-hatcheries`. Deploy with `npm run deploy`. Price changes need no deploy: they are read live from the Google Sheet.
- **Running cost:** ₹0. No backend, database, paid API or subscription.

## How content is managed

| What | Where | Who changes it |
|---|---|---|
| Vannamei and Tiger seed prices | A Google Form → Google Sheet, published as CSV; link set in `src/content/prices.ts` | **The admin, through the Google Form.** The site reads the sheet live; no redeploy needed. See [`docs/PRICE-FORM-SETUP.md`](docs/PRICE-FORM-SETUP.md). |
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

1. `scripts/optimize-images.mjs` turns `assets-src/photos/*` into responsive WebP files in `public/img/`, plus a manifest.
2. Vite builds the React app (React, TypeScript, Tailwind CSS, lucide-react).
3. `scripts/prerender.mjs` renders each route to its own HTML file (`about.html`, …) with its own title, description, canonical URL and LocalBusiness JSON-LD, then writes `404.html`, `sitemap.xml` and `robots.txt`.

## Deploying (Cloudflare Pages, direct upload)

```bash
npx wrangler login     # once per computer: approve in the browser
npm run deploy         # build + upload dist/ to the nissi-hatcheries Pages project
```

- `wrangler.jsonc` holds the Pages project name and output folder.
- The project was created as a classic Pages project (`wrangler pages project create … --force`). Don't recreate it from the dashboard's Workers flow: that makes a Worker with a `*.workers.dev` address instead of `nissi-hatcheries.pages.dev`.
- Pushing to GitHub doesn't deploy by itself. Code changes go live with `npm run deploy`.

## Brand assets

- `assets-src/brand/nissi-logo-mark.png` is the spiral-shell mark, extracted from a photo of the business card (`business-card-source.jpg`). Replace it with the original vector or high-res file when available, then run `python3 scripts/make-brand-assets.py` to regenerate the favicons and share image.
- Fonts: Source Sans 3 (body, close to the card's humanist sans) and Source Serif 4 (headings), self-hosted.
