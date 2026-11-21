/**
 * Reads the latest published prices and photos.
 * src/data/published.json is written ONLY by the Google Form publishing script
 * (apps-script/Code.gs) after a submission passes validation. If no valid
 * submission has ever been made, every price is null and the site shows
 * "Contact us for the latest rates".
 */
import raw from '../data/published.json';
import type { SpeciesId } from './products';

export type ImageSlot = 'home' | 'gallery' | 'vannamei' | 'tiger';

export interface PublishedPrice {
  rate: number | null;
  unit: string;
}

export interface PublishedImage {
  /** Manifest key, e.g. "uploads/20261121-gallery-1". */
  key: string;
  slot: ImageSlot;
  alt: string;
}

export interface Published {
  publishedAt: string | null;
  validFrom: string | null;
  remarks: string;
  prices: Record<SpeciesId, PublishedPrice>;
  images: PublishedImage[];
}

export const published = raw as Published;

export function formatRate(p: PublishedPrice): string | null {
  if (typeof p.rate !== 'number' || p.rate <= 0) return null;
  const whole = Number.isInteger(p.rate);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(p.rate);
}

export function formatDate(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' });
}

export function imagesFor(slot: ImageSlot): PublishedImage[] {
  return published.images.filter((i) => i.slot === slot);
}
