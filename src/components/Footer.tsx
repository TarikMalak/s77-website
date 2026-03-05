import { siteData } from '@/lib/data';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-bg-dark py-8">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-3 px-6 md:flex-row md:justify-between md:px-12">
        {/* Logo */}
        <img src="/s77-logo.gif" alt="S77.AI" className="h-6 w-auto" />

        {/* Copyright + parent link */}
        <p className="text-xs font-light text-text-muted">
          &copy; {year} {siteData.parentCompany.name}. All rights reserved.
          {' '}
          <a
            href={siteData.parentCompany.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-text-white"
          >
            swellny.com
          </a>
          {' | '}
          <a
            href={siteData.sisterCompany.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-text-white"
          >
            maxhpprod.com
          </a>
        </p>
      </div>
    </footer>
  );
}
