/** Routes, navigation and per-page search metadata. Used by the app and the prerender step. */
export interface RouteMeta {
  path: string;
  nav: string;
  title: string;
  description: string;
}

export const routes: RouteMeta[] = [
  {
    path: '/',
    nav: 'Home',
    title: 'Nissi Hatcheries | Vannamei & Tiger Shrimp Seed, Ponnada, Kakinada',
    description:
      'Nissi Hatcheries is a CAA-registered shrimp hatchery at Ponnada, U. Kothapalli Mandal, Kakinada District, Andhra Pradesh. Vannamei and tiger shrimp seed for coastal farmers.',
  },
  {
    path: '/about',
    nav: 'About',
    title: 'About Nissi Hatcheries | Shrimp Hatchery in U. Kothapalli, Kakinada',
    description:
      'Inside Nissi Hatcheries: covered post-larvae rearing halls, slow sand filtration, blower aeration and a seawater reservoir at Ponnada, Kakinada District.',
  },
  {
    path: '/shrimp-seed',
    nav: 'Shrimp Seed',
    title: 'Vannamei & Tiger Shrimp Seed | Nissi Hatcheries',
    description:
      'SPF L. vannamei and black tiger (P. monodon) shrimp seed from Nissi Hatcheries, Ponnada, Kakinada. Species details, seed specifications and enquiries.',
  },
  {
    path: '/pricing',
    nav: 'Seed Prices',
    title: 'Shrimp Seed Prices | Vannamei & Tiger | Nissi Hatcheries',
    description:
      'Latest vannamei and tiger shrimp seed rates from Nissi Hatcheries, Kakinada District. Call or WhatsApp for current rates and availability.',
  },
  {
    path: '/caa-approval',
    nav: 'CAA Approval',
    title: 'CAA Registration 56-9(179)/2022 | Nissi Hatcheries',
    description:
      'Nissi Hatcheries is listed by the Coastal Aquaculture Authority as an approved Nauplii Rearing Hatchery for SPF L. vannamei, registration 56-9(179)/2022.',
  },
  {
    path: '/location',
    nav: 'Location',
    title: 'Location & Directions | Nissi Hatcheries, Ponnada, Kakinada',
    description:
      'Find Nissi Hatcheries at Seelamvaripalem, Ponnada Village, U. Kothapalli Mandal, Kakinada District, Andhra Pradesh 533449. Map and Google Maps directions.',
  },
  {
    path: '/contact',
    nav: 'Contact',
    title: 'Contact Nissi Hatcheries | Call or WhatsApp for Shrimp Seed',
    description:
      'Contact Nissi Hatcheries for vannamei and tiger shrimp seed. Call or WhatsApp +91 70137 89979.',
  },
];

export const navRoutes = routes;

export function metaFor(pathname: string): RouteMeta {
  const clean = pathname.replace(/\/+$/, '') || '/';
  return routes.find((r) => r.path === clean) ?? routes[0];
}

/** Search engine settings. Paste the Google Search Console "HTML tag" content value here (not secret). */
export const seo = {
  googleSiteVerification: null as string | null,
};
