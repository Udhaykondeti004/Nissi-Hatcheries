/**
 * Seed prices come from the admin's Google Form.
 *
 * Form answers → Google Sheet → a "Website" tab (formulas pick the latest answers that used the
 * correct admin code) → File › Share › Publish to web › "Website" tab as CSV. Paste that CSV link
 * below. The site reads it when a page opens and shows the price text exactly as typed,
 * e.g. "5 paisa per seed" or "₹320 per 1,000 seeds".
 *
 * Setup steps: docs/PRICE-FORM-SETUP.md
 */
export const priceSheet = {
  /** Published CSV link of the Sheet's "Website" tab. null = not set up yet. */
  csvUrl: null as string | null,
};

/** Shown when no price is set, before the sheet loads, or if Google cannot be reached and nothing is cached. */
export const noPriceText = 'Contact us for the latest rates';
