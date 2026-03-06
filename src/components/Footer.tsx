import type { SiteSettings } from '@/lib/types';

export default function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-bg-dark py-8">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-3 px-6 md:flex-row md:justify-between md:px-12">
        <img src="/s77-logo.svg" alt="S77.AI" className="h-6 w-auto" />

        <p className="text-xs font-light text-text-muted">
          &copy; {year} {settings.parent_company_name}. All rights reserved.
          {' '}
          <a
            href={settings.parent_company_url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-text-white"
          >
            swellny.com
          </a>
          {' | '}
          <a
            href={settings.sister_company_url}
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
