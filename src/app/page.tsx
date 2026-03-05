import Hero from '@/components/Hero';
import WhatWeDo from '@/components/WhatWeDo';
import Ultra77Teaser from '@/components/Ultra77Teaser';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { OrganizationJsonLd, WebSiteJsonLd, ServiceJsonLd } from '@/components/JsonLd';

export default function Home() {
  return (
    <>
      <OrganizationJsonLd />
      <WebSiteJsonLd />
      <ServiceJsonLd />
      <main>
        <Hero />
        <WhatWeDo />
        <Ultra77Teaser />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
