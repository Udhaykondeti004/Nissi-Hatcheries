/**
 * Photo registry. Keys match file names in assets-src/photos (without extension);
 * scripts/optimize-images.mjs turns each into responsive WebP files.
 * All photographs are Nissi Hatcheries' own.
 */
export const photos = {
  hero: { key: 'pl-rearing-hall', alt: 'Covered post-larvae rearing hall at Nissi Hatcheries with rows of tile-lined tanks' },
  tanks: { key: 'rearing-tanks', alt: 'Tile-lined rearing tanks under a shade frame with aeration lines' },
  blower: { key: 'blower-room', alt: 'Blower room with air blowers and distribution pipes supplying aeration to the tanks' },
  filter: { key: 'slow-sand-filter', alt: 'Slow sand filter building used to treat seawater before it reaches the tanks' },
  plSection: { key: 'pl-section-team', alt: 'Hatchery staff at work outside PL Section 1' },
  courtyard: { key: 'hatchery-courtyard', alt: 'Hatchery courtyard with tank sheds, filters and coconut palms' },
  reservoir: { key: 'reservoir-pond', alt: 'Lined seawater reservoir pond within the hatchery boundary' },
  signboard: { key: 'signboard', alt: 'Nissi Hatchery signboard showing the CAA registration number and address' },
  caaListing: { key: 'caa-listing', alt: 'Coastal Aquaculture Authority approved hatchery list showing the Nissi Hatcheries entry' },
} as const;

export type PhotoKey = keyof typeof photos;
