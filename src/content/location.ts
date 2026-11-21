/**
 * Hatchery location. Verified 2026-11-21 against:
 *  - Google Maps listing "Nissi hatcheries" (Plus Code 49FG+F92, Ponnada 533449)
 *  - Business card and hatchery signboard (Seelamvaripalem, Ponnada, PIN 533449)
 *  - CAA approved-hatchery list ("PONNADA, U.Kothapalli, KAKINADA, ANDHRA PRADESH")
 */
export const location = {
  addressLines: [
    'Seelamvaripalem, Ponnada Village',
    'U. Kothapalli Mandal, Mallavaram (Post), Via Chebrolu',
    'Kakinada District, Andhra Pradesh 533449',
  ],
  /** Structured address for search engines. */
  structured: {
    streetAddress: 'Seelamvaripalem, Ponnada Village, Mallavaram (Post), Via Chebrolu',
    locality: 'Ponnada',
    subRegion: 'U. Kothapalli Mandal, Kakinada District',
    region: 'Andhra Pradesh',
    postalCode: '533449',
    country: 'IN',
  },
  /** Note: the business card still says "East Godavari Dist." (the district before the 2022 reorganisation). */
  formerDistrict: 'East Godavari',
  plusCode: '49FG+F92',
  lat: 17.1236288,
  lng: 82.3759052,
  /** Google Maps business listing. */
  mapsPlaceUrl:
    'https://www.google.com/maps/place/Nissi+hatcheries/@17.1236288,82.3759052,17z/data=!4m6!3m5!1s0x3a382d370ff2b8cd:0xe0abe0abd7551817!8m2!3d17.1236288!4d82.3759052',
  mapsCid: '16189280314170087447',
  landmarks: [
    'On NH 516F (the coastal Kakinada–Uppada road)',
    'Near Sri Sattamma Talli Temple, Ponnada',
    'Short distance inland from the Bay of Bengal coast',
  ],
} as const;

const dest = `${location.lat},${location.lng}`;
export const mapLinks = {
  /** Opens the Google Maps listing (works in the Maps app on phones). */
  view: `https://maps.google.com/?cid=${location.mapsCid}`,
  /** Turn-by-turn directions from the visitor's current location. */
  directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(dest)}`,
  /** Free keyless embed, pinned on the verified coordinates. */
  embed: `https://maps.google.com/maps?q=${encodeURIComponent(dest)}&z=15&output=embed`,
};
