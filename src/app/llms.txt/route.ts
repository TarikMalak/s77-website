import { NextResponse } from 'next/server';
import { isSupabaseConfigured, getSupabaseAdmin } from '@/lib/supabase';
import { siteSettings } from '@/lib/data';

export const revalidate = 3600;

export async function GET() {
  let content = siteSettings.llms_content;

  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseAdmin();
      const { data } = await supabase
        .from('s77_site_settings')
        .select('llms_content')
        .limit(1)
        .single();

      if (data?.llms_content) {
        content = data.llms_content;
      }
    } catch {
      // Fall back to seed data
    }
  }

  // Inject timestamp after the blockquote line and cross-reference to full version
  const today = new Date().toISOString().slice(0, 10);
  const timestampLine = `> Last updated: ${today}`;
  const fullRefLine = `> For complete content, see [Full Version](https://s77.ai/llms-full.txt).`;

  const lines = content.split('\n');
  const bqIndex = lines.findIndex((l: string) => l.startsWith('> '));
  if (bqIndex !== -1) {
    lines.splice(bqIndex + 1, 0, timestampLine, fullRefLine);
    content = lines.join('\n');
  }

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
