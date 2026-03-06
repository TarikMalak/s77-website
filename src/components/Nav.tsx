'use client';

import { useState, useEffect } from 'react';

const links = [
  { label: 'What We Do', href: '#what-we-do' },
  { label: 'Ultra77', href: '#ultra77' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-bg-dark/80 backdrop-blur-md' : ''
      }`}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4 md:px-12">
        <a href="#" className="transition-opacity hover:opacity-70">
          <img src="/s77-logo.svg" alt="S77.AI" className="h-4 w-auto md:h-5" />
        </a>
        <ul className="flex items-center gap-6 md:gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-xs font-medium uppercase tracking-[0.15em] text-text-muted transition-colors hover:text-text-white md:text-sm"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
