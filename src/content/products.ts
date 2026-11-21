/**
 * Shrimp seed varieties. Prices are NOT kept here: they come from the admin's Google Form
 * (see src/content/prices.ts).
 * Spec values set to null render as "Confirm on enquiry".
 */
export type SpeciesId = 'vannamei' | 'tiger';

export interface Product {
  id: SpeciesId;
  name: string;
  commonName: string;
  scientificName: string;
  summary: string;
  description: string[];
  highlights: string[];
  specs: { label: string; value: string | null }[];
}

export const products: Record<SpeciesId, Product> = {
  vannamei: {
    id: 'vannamei',
    name: 'Vannamei Shrimp Seed',
    commonName: 'Pacific white shrimp',
    scientificName: 'Litopenaeus vannamei',
    summary:
      'SPF L. vannamei post-larvae reared at our CAA-registered nauplii rearing hatchery in Ponnada.',
    description: [
      'Vannamei is the most widely farmed shrimp on the Andhra Pradesh coast. It adapts well to a range of salinities, tolerates higher stocking densities and reaches market size quickly, which makes it the first choice for most coastal farmers.',
      'Nissi Hatcheries is registered with the Coastal Aquaculture Authority to rear Specific Pathogen Free (SPF) L. vannamei. Nauplii are reared through the larval stages to post-larvae in our covered, tile-lined rearing tanks, with filtered seawater and continuous aeration.',
    ],
    highlights: [
      'SPF L. vannamei – CAA-registered species',
      'Reared in covered, tile-lined tanks',
      'Slow-sand-filtered water and blower aeration',
    ],
    specs: [
      { label: 'Species', value: 'Litopenaeus vannamei (SPF)' },
      { label: 'Life stage supplied', value: 'Post-larvae (PL)' },
      { label: 'PL stage / size', value: null },
      { label: 'Minimum order', value: null },
      { label: 'Packing', value: null },
    ],
  },
  tiger: {
    id: 'tiger',
    name: 'Tiger Shrimp Seed',
    commonName: 'Black tiger shrimp',
    scientificName: 'Penaeus monodon',
    summary:
      'Black tiger shrimp seed for farmers growing India’s native, larger-sized shrimp.',
    description: [
      'The black tiger shrimp is native to Indian coastal waters. It grows to a larger size than vannamei and commands a premium at harvest, which keeps it a valued crop for experienced farmers and for lower-density culture.',
      'Tiger shrimp seed is supplied as post-larvae. Please contact us for current availability, stage and batch details before planning your stocking.',
    ],
    highlights: [
      'Native Indian species, larger harvest size',
      'Premium market value',
      'Availability and batch details on enquiry',
    ],
    specs: [
      { label: 'Species', value: 'Penaeus monodon' },
      { label: 'Life stage supplied', value: 'Post-larvae (PL)' },
      { label: 'PL stage / size', value: null },
      { label: 'Minimum order', value: null },
      { label: 'Packing', value: null },
    ],
  },
};

export const productOrder: SpeciesId[] = ['vannamei', 'tiger'];
