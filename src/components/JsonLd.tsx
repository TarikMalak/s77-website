import type { SiteSettings, Service } from '@/lib/types';

export function OrganizationJsonLd({ settings, services }: { settings: SiteSettings; services: Service[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://s77.ai/#organization',
    name: settings.name,
    url: settings.url,
    logo: 'https://s77.ai/s77-logo.svg',
    image: 'https://s77.ai/s77-logo.svg',
    description: settings.description,
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
    email: settings.email,
    parentOrganization: {
      '@type': 'Organization',
      '@id': 'https://swellny.com/#organization',
      name: 'SWELL',
      legalName: settings.parent_company_name,
      url: settings.parent_company_url,
    },
    sameAs: [
      settings.parent_company_url,
      settings.sister_company_url,
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
      name: `${settings.name} Services`,
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.subtitle,
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

export function WebSiteJsonLd({ settings }: { settings: SiteSettings }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://s77.ai/#website',
    name: settings.site_name,
    url: settings.url,
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

export function ServiceJsonLd({ services }: { services: Service[] }) {
  const data = services.map((s) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.title,
    description: s.description,
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
