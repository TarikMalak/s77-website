'use client';

import { useState, type ReactNode } from 'react';

export default function CollapsibleSection({
  title,
  subtitle,
  badge,
  defaultOpen = false,
  children,
}: {
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 bg-white/[0.03] hover:bg-white/[0.05] transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div>
            <h3 className="text-white font-medium">{title}</h3>
            {subtitle && (
              <p className="text-xs text-white/40 mt-0.5">{subtitle}</p>
            )}
          </div>
          {badge}
        </div>
        <svg
          className={`w-5 h-5 text-white/40 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-6 py-5 border-t border-white/10">{children}</div>}
    </div>
  );
}
