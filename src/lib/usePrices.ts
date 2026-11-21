import { useEffect, useState } from 'react';
import { priceSheet } from '../content/prices';

export interface Prices {
  vannamei: string | null;
  tiger: string | null;
  updated: string | null;
}

const EMPTY: Prices = { vannamei: null, tiger: null, updated: null };
const CACHE_KEY = 'nissi-prices-v1';
const MAX_LEN = 80;

function clean(v: string | undefined): string | null {
  const t = (v ?? '').replace(/\s+/g, ' ').trim();
  // "-" is how the admin hides a price (the site then shows "Contact us for the latest rates").
  return t && t !== '-' ? t.slice(0, MAX_LEN) : null;
}

/** Minimal CSV parser for the two-column "Website" tab (handles quoted cells). */
export function parseCsv(text: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const line of text.split(/\r?\n/)) {
    const cells: string[] = [];
    let cur = '';
    let quoted = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (quoted) {
        if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++; }
        else if (ch === '"') quoted = false;
        else cur += ch;
      } else if (ch === '"') quoted = true;
      else if (ch === ',') { cells.push(cur); cur = ''; }
      else cur += ch;
    }
    cells.push(cur);
    const key = cells[0]?.trim().toLowerCase();
    if (key) out[key] = cells[1] ?? '';
  }
  return out;
}

function readCache(): Prices | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as Prices) : null;
  } catch {
    return null;
  }
}

function writeCache(p: Prices) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(p));
  } catch {
    /* storage unavailable: fine */
  }
}

// One request per page load, shared by every component that shows a price.
let inflight: Promise<Prices | null> | null = null;
function load(): Promise<Prices | null> {
  if (!priceSheet.csvUrl) return Promise.resolve(null);
  inflight ??= fetch(priceSheet.csvUrl, { cache: 'no-store' })
    .then((r) => (r.ok ? r.text() : Promise.reject(new Error(String(r.status)))))
    .then((text) => {
      const row = parseCsv(text);
      return { vannamei: clean(row.vannamei), tiger: clean(row.tiger), updated: clean(row.updated) };
    })
    .catch(() => null);
  return inflight;
}

/**
 * Latest prices from the published Google Sheet. The server-rendered HTML starts with no prices
 * ("Contact us…"); the browser then shows the last cached prices at once and replaces them with
 * fresh ones. If Google is unreachable the cached prices stay.
 */
export function usePrices(): Prices {
  const [prices, setPrices] = useState<Prices>(EMPTY);
  useEffect(() => {
    let alive = true;
    const cached = readCache();
    if (cached) setPrices(cached);
    load().then((fresh) => {
      if (!alive || !fresh) return;
      setPrices(fresh);
      writeCache(fresh);
    });
    return () => {
      alive = false;
    };
  }, []);
  return prices;
}
