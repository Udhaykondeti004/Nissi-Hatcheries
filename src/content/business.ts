/**
 * Business details: the single source of truth for name, contact and registration.
 * Edit here and every page, the footer and the search-engine data update together.
 * Anything marked `null` is unknown/unconfirmed and is hidden on the site rather than guessed.
 */
export const business = {
  name: 'Nissi Hatcheries',
  /** Other names the business is known by (CAA record, signboard, business card). */
  alternateNames: ['M/s. Nissi Hatcheries', 'Nissi Hatchery', 'NISSI Hatchery'],
  tagline: 'Quality Shrimp Seed. Built on Trust.',
  shortDescription:
    'CAA-registered shrimp hatchery at Ponnada, U. Kothapalli Mandal, Kakinada District, Andhra Pradesh, producing SPF L. vannamei post-larvae for coastal shrimp farmers.',

  phones: [
    { display: '+91 70137 89979', e164: '+917013789979' },
  ],
  /** Number that receives WhatsApp enquiries (digits only, with country code). Confirmed by the business. */
  whatsapp: '917013789979',
  /** Business email: not yet provided. Leave null to hide it. */
  email: null as string | null,

  /** Public website address (free Cloudflare subdomain). Update if a custom domain is added. */
  siteUrl: 'https://nissi-hatcheries.pages.dev',
} as const;

export type Business = typeof business;
