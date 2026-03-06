import Hero from '@/components/Hero';
import WhatWeDo from '@/components/WhatWeDo';
import Ultra77Teaser from '@/components/Ultra77Teaser';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { OrganizationJsonLd, WebSiteJsonLd, ServiceJsonLd } from '@/components/JsonLd';
import { getSiteSettings, getHero, getServices, getUltra77 } from '@/lib/api';

export default async function Home() {
  const [settings, hero, services, ultra77] = await Promise.all([
    getSiteSettings(),
    getHero(),
    getServices(),
    getUltra77(),
  ]);

  return (
    <>
      <OrganizationJsonLd settings={settings} services={services} />
      <WebSiteJsonLd settings={settings} />
      <ServiceJsonLd services={services} />
      <main>
        <Hero headline={hero.headline} subtitle={hero.subtitle} />
        <WhatWeDo services={services} />
        <Ultra77Teaser data={ultra77} />
        <Contact settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
