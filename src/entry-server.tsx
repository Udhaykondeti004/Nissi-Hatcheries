import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './App';
import { routes, metaFor, seo } from './content/site';
import { business } from './content/business';
import { location } from './content/location';
import { caa } from './content/caa';

export { routes, metaFor, business, seo };

export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}

/** schema.org LocalBusiness data, built only from verified content. */
export function structuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${business.siteUrl}/#business`,
    name: business.name,
    alternateName: business.alternateNames,
    description: business.shortDescription,
    url: business.siteUrl,
    logo: `${business.siteUrl}/icon-512.png`,
    image: `${business.siteUrl}/og-image.jpg`,
    telephone: business.phones.map((p) => p.e164),
    ...(business.email ? { email: business.email } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.structured.streetAddress,
      addressLocality: location.structured.locality,
      addressRegion: location.structured.region,
      postalCode: location.structured.postalCode,
      addressCountry: location.structured.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: location.lat, longitude: location.lng },
    hasMap: location.mapsPlaceUrl,
    areaServed: 'Andhra Pradesh, India',
    knowsAbout: ['Litopenaeus vannamei shrimp seed', 'Penaeus monodon shrimp seed', 'Shrimp hatchery', 'Post-larvae'],
    identifier: { '@type': 'PropertyValue', propertyID: 'CAA Registration Number', value: caa.registrationNumber },
  };
}
