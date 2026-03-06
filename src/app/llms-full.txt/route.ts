import { NextResponse } from 'next/server';
import { getSiteSettings, getHero, getServices, getUltra77 } from '@/lib/api';

export const revalidate = 3600;

export async function GET() {
  const [settings, hero, services, ultra77] = await Promise.all([
    getSiteSettings(),
    getHero(),
    getServices(),
    getUltra77(),
  ]);

  const today = new Date().toISOString().slice(0, 10);
  const sections: string[] = [];

  // Header
  sections.push(`# ${settings.name} — Full Content Reference
> ${settings.tagline}
> Last updated: ${today}
> Summary version: https://s77.ai/llms.txt

${settings.description}`);

  // Entity Identity
  sections.push(`## Entity Identity
- Legal entity: ${settings.parent_company_name} (DBA "SWELL")
- ${settings.name} is the AI division of SWELL
- Not to be confused with: other companies using "S77" or "77" branding
- Parent company: ${settings.parent_company_name} (${settings.parent_company_url})
- Sister company: ${settings.sister_company_name} (${settings.sister_company_url})`);

  // Hero
  sections.push(`## Tagline
${hero.headline}

${hero.subtitle}`);

  // Services
  sections.push(`## Services`);
  for (const s of services) {
    sections.push(`### ${s.sort_order}. ${s.title}
**${s.subtitle}**

${s.description}`);
  }

  // Ultra77
  sections.push(`## Ultra77 — ${ultra77.tagline}
Status: ${ultra77.status}

${ultra77.description}`);

  // Key Facts
  sections.push(`## Key Facts
- **Parent company**: ${settings.parent_company_name} (${settings.parent_company_url})
- **Sister company**: ${settings.sister_company_name} (${settings.sister_company_url})
- **Location**: ${settings.address}
- **Contact**: ${settings.email}
- **Phone**: ${settings.phone}
- **Founded by**: Tarik Malak
- **Specialty**: AI Optimization, AI-enhanced content production, AI social strategy`);

  // Links
  sections.push(`## Links
- Website: https://s77.ai
- Parent: ${settings.parent_company_url}
- Sister: ${settings.sister_company_url}
- Summary (llms.txt): https://s77.ai/llms.txt`);

  const content = sections.join('\n\n');

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
