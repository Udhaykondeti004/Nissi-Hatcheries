import manifest from '../data/image-manifest.json';

type Entry = { width: number; height: number; variants: { w: number; src: string }[] };
const images = manifest as Record<string, Entry>;

interface Props {
  /** Manifest key: a photo file name (assets-src/photos) without extension. */
  name: string;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
}

/** Responsive WebP image with intrinsic dimensions (no layout shift) and lazy loading by default. */
export function Img({ name, alt, sizes = '100vw', className = '', priority = false }: Props) {
  const entry = images[name];
  if (!entry) return null;
  const srcSet = entry.variants.map((v) => `${v.src} ${v.w}w`).join(', ');
  const fallback = entry.variants.find((v) => v.w >= 960) ?? entry.variants.at(-1)!;
  return (
    <img
      src={fallback.src}
      srcSet={srcSet}
      sizes={sizes}
      width={entry.width}
      height={entry.height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
      className={className}
    />
  );
}

export function hasImage(name: string): boolean {
  return name in images;
}
