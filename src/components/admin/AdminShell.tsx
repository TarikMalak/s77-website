'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getSupabase } from '@/lib/supabase';

const TABS = [
  { label: 'SEO', href: '/admin/seo' },
  { label: 'Content', href: '/admin/content' },
  { label: 'Settings', href: '/admin/settings' },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const supabase = getSupabase();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace('/admin/login');
      } else {
        setAuthenticated(true);
      }
      setChecking(false);
    });
  }, [router]);

  const handleLogout = async () => {
    const supabase = getSupabase();
    await supabase.auth.signOut();
    router.replace('/admin/login');
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-[#111] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#6C63FF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!authenticated) return null;

  return (
    <div className="min-h-screen bg-[#111]">
      <header className="border-b border-white/10 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <Link href="/admin" className="text-white font-medium text-lg">
              S77.AI
            </Link>
            <span className="ml-4 text-sm text-white/40">Content Editor</span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm text-white/40 hover:text-white transition-colors"
            >
              View Site &rarr;
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-white/40 hover:text-red-400 transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>

      <nav className="border-b border-white/10 bg-[#0A0A0A] overflow-x-auto">
        <div className="max-w-6xl mx-auto px-6 flex gap-1">
          {TABS.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`px-4 py-3 text-sm whitespace-nowrap transition-colors rounded-t-md ${
                  isActive
                    ? 'bg-white text-black font-medium'
                    : 'text-white/50 hover:text-white/80'
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
