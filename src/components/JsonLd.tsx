// JSON-LD structured data for S77.AI

import { siteData, pillars } from '@/lib/data';

export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://s77.ai/#organization',
    name: 'S77.AI',
    url: 'https://s77.ai',
    logo: 'https://s77.ai/s77-logo.gif',
    image: 'https://s77.ai/s77-logo.gif',
    description: siteData.description,
    foundingDate: '2024',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '6 St Johns Ln',
      addressLocality: 'New York',
      addressRegion: 'NY',
      postalCode: '10013',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.7237,
      longitude: -74.0059,
    },
    telephone: '+1-646-389-1570',
    email: siteData.email,
    parentOrganization: {
      '@type': 'Organization',
      '@id': 'https://swellny.com/#organization',
      name: 'SWELL',
      legalName: 'SWELL Labs, LLC',
      url: 'https://swellny.com',
    },
    sameAs: [
      'https://swellny.com',
      'https://maxhpprod.com',
    ],
    areaServed: 'Worldwide',
    knowsAbout: [
      'AI Optimization (AIO)',
      'Answer Engine Optimization (AEO)',
      'AI-Enhanced Content Production',
      'AI-Driven Social Strategy',
      'Generative AI for Advertising',
      'AI as VFX',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'S77.AI Services',
      itemListElement: pillars.map((p) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: p.title,
          description: p.subtitle,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebSiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://s77.ai/#website',
    name: 'S77.AI',
    url: 'https://s77.ai',
    inLanguage: 'en-US',
    publisher: { '@id': 'https://s77.ai/#organization' },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ServiceJsonLd() {
  const data = pillars.map((p) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: p.title,
    description: p.description,
    provider: { '@id': 'https://s77.ai/#organization' },
    areaServed: 'Worldwide',
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
