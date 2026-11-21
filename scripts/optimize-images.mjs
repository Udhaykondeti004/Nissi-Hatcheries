// Converts original photos into responsive WebP files and writes a manifest the site reads.
//   assets-src/photos/*  -> public/img/<name>-<width>.webp   (hatchery photos kept in the repo)
//   public/uploads/*     -> public/img/uploads/<name>-<width>.webp  (photos published from the Google Form)
// Runs before every dev start and build, so Cloudflare Pages regenerates everything on deploy.
import sharp from 'sharp';
import { readdir, mkdir, writeFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const WIDTHS = [480, 960, 1600];
const IMG_EXT = /\.(jpe?g|png|webp|avif|tiff?)$/i;

const sources = [
  { dir: path.join(root, 'assets-src/photos'), out: path.join(root, 'public/img'), prefix: '' },
  { dir: path.join(root, 'public/uploads'), out: path.join(root, 'public/img/uploads'), prefix: 'uploads/' },
];

const manifest = {};

for (const { dir, out, prefix } of sources) {
  if (!existsSync(dir)) continue;
  await mkdir(out, { recursive: true });
  const files = (await readdir(dir)).filter((f) => IMG_EXT.test(f)).sort();
  for (const file of files) {
    const src = path.join(dir, file);
    const name = file.replace(IMG_EXT, '').toLowerCase().replace(/[^a-z0-9-]+/g, '-');
    const srcStat = await stat(src);
    const meta = await sharp(src).rotate().metadata();
    // EXIF orientation 5-8 swaps width/height
    const swap = meta.orientation && meta.orientation >= 5;
    const w0 = swap ? meta.height : meta.width;
    const h0 = swap ? meta.width : meta.height;
    const widths = WIDTHS.filter((w) => w < w0).concat(w0 <= WIDTHS.at(-1) ? [w0] : []);
    const variants = [];
    for (const w of [...new Set(widths)]) {
      const target = path.join(out, `${name}-${w}.webp`);
      const fresh = existsSync(target) && (await stat(target)).mtimeMs >= srcStat.mtimeMs;
      if (!fresh) {
        await sharp(src).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: 74, effort: 5 }).toFile(target);
      }
      variants.push({ w, src: `/img/${prefix}${name}-${w}.webp` });
    }
    manifest[`${prefix}${name}`] = { width: w0, height: h0, variants };
  }
}

await writeFile(path.join(root, 'src/data/image-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(`images: ${Object.keys(manifest).length} sources optimised`);
