'use client';

import { useState, useEffect } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import AdminLoading from '@/components/admin/AdminLoading';
import SaveButton from '@/components/admin/SaveButton';
import { adminFetch } from '@/lib/admin-fetch';
import { useAdminData } from '@/hooks/useAdminData';
import GooglePreview from '@/components/admin/GooglePreview';
import SocialPreview from '@/components/admin/SocialPreview';
import CollapsibleSection from '@/components/admin/CollapsibleSection';
import StatusBadge from '@/components/admin/StatusBadge';
import { siteSettings } from '@/lib/data';

function charColor(len: number, greenMin: number, greenMax: number) {
  if (len >= greenMin && len <= greenMax) return 'text-green-400';
  if (len > greenMax) return 'text-red-400';
  return 'text-white/30';
}

function keywordCountColor(count: number) {
  if (count >= 5 && count <= 10) return 'green' as const;
  if (count >= 1) return 'yellow' as const;
  return 'red' as const;
}

export default function AdminSEOPage() {
  const [googleSiteName, setGoogleSiteName] = useState(siteSettings.google_site_name);
  const [siteName, setSiteName] = useState(siteSettings.site_name);
  const [title, setTitle] = useState(siteSettings.seo_title);
  const [description, setDescription] = useState(siteSettings.seo_description);
  const [keywords, setKeywords] = useState(siteSettings.seo_keywords);
  const [ogImageUrl, setOgImageUrl] = useState(siteSettings.seo_og_image_url);
  const [llmsContent, setLlmsContent] = useState(siteSettings.llms_content);
  const [llmsFullContent, setLlmsFullContent] = useState('');
  const [llmsFullLoading, setLlmsFullLoading] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { loading, error } = useAdminData<any>('/api/admin/seo', (data) => {
    if (data.google_site_name != null) setGoogleSiteName(data.google_site_name);
    setSiteName(data.site_name);
    setTitle(data.seo_title);
    setDescription(data.seo_description);
    setKeywords(data.seo_keywords);
    setOgImageUrl(data.seo_og_image_url);
    if (data.llms_content != null) setLlmsContent(data.llms_content);
  });

  useEffect(() => {
    fetch('/llms-full.txt')
      .then(res => res.ok ? res.text() : '')
      .then(text => setLlmsFullContent(text))
      .catch(() => {})
      .finally(() => setLlmsFullLoading(false));
  }, []);

  const keywordCount = keywords
    .split(',')
    .filter((k) => k.trim().length > 0).length;

  const handleSave = async () => {
    const res = await adminFetch('/api/admin/seo', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        google_site_name: googleSiteName,
        site_name: siteName,
        seo_title: title,
        seo_description: description,
        seo_keywords: keywords,
        seo_og_image_url: ogImageUrl,
        llms_content: llmsContent,
      }),
    });
    if (!res.ok) throw new Error('Save failed');
  };

  if (loading) return <AdminLoading />;

  return (
    <AdminShell>
      {error && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm rounded-md px-4 py-3 mb-6">
          Could not load data from database. Showing default content.
        </div>
      )}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-light text-white">SEO &amp; AIO Dashboard</h2>
          <p className="text-sm text-white/40 mt-1">
            Search engine optimization, social sharing, and AI discoverability
          </p>
        </div>

        {/* Section 1: Global Meta Tags */}
        <CollapsibleSection
          title="Global Meta Tags"
          subtitle="Title, description, keywords, and OG image"
          defaultOpen
        >
          <div className="space-y-5">
            <div>
              <label className="block text-xs tracking-[0.2em] text-white/40 uppercase mb-2">Google Site Name</label>
              <input type="text" value={googleSiteName} onChange={(e) => setGoogleSiteName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#6C63FF] transition-colors" />
              <p className="mt-1 text-xs text-white/30">Shown above the URL in Google search results.</p>
            </div>
            <div>
              <label className="block text-xs tracking-[0.2em] text-white/40 uppercase mb-2">Site Name</label>
              <input type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#6C63FF] transition-colors" />
              <p className="mt-1 text-xs text-white/30">Used in browser tab, social cards, and structured data</p>
            </div>
            <div>
              <label className="block text-xs tracking-[0.2em] text-white/40 uppercase mb-2">Default Meta Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#6C63FF] transition-colors" />
              <p className={`mt-1 text-xs ${charColor(title.length, 50, 60)}`}>
                {title.length}/60 characters{title.length >= 50 && title.length <= 60 && ' — ideal length'}
              </p>
            </div>
            <div>
              <label className="block text-xs tracking-[0.2em] text-white/40 uppercase mb-2">Default Meta Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#6C63FF] transition-colors resize-none" />
              <p className={`mt-1 text-xs ${charColor(description.length, 150, 160)}`}>
                {description.length}/160 characters{description.length >= 150 && description.length <= 160 && ' — ideal length'}
              </p>
            </div>
            <div>
              <label className="block text-xs tracking-[0.2em] text-white/40 uppercase mb-2">Keywords</label>
              <textarea value={keywords} onChange={(e) => setKeywords(e.target.value)} rows={2} placeholder="keyword one, keyword two" className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#6C63FF] transition-colors resize-none" />
              <p className="mt-1 text-xs text-white/30 flex items-center gap-2">
                Comma-separated
                <StatusBadge color={keywordCountColor(keywordCount)} label={`${keywordCount} keyword${keywordCount !== 1 ? 's' : ''} (target 5–10)`} />
              </p>
            </div>
            <div>
              <label className="block text-xs tracking-[0.2em] text-white/40 uppercase mb-2">OG Image URL</label>
              <input type="text" value={ogImageUrl} onChange={(e) => setOgImageUrl(e.target.value)} placeholder="/og-image.png" className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#6C63FF] transition-colors" />
              {ogImageUrl && (
                <div className="mt-2 rounded-md overflow-hidden border border-white/10 inline-block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ogImageUrl} alt="OG image thumbnail" className="h-20 w-auto object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                </div>
              )}
            </div>
            <SaveButton onClick={handleSave} label="Save SEO Settings" />
          </div>
        </CollapsibleSection>

        {/* Section 2: Search & Social Previews */}
        <CollapsibleSection title="Search & Social Previews" subtitle="Live preview — updates as you type above" defaultOpen>
          <div className="space-y-8">
            <GooglePreview title={title} description={description} url="https://s77.ai" />
            <SocialPreview title={title} description={description} url="https://s77.ai" imageUrl={ogImageUrl} siteName={siteName} />
          </div>
        </CollapsibleSection>

        {/* Section 3: Technical SEO */}
        <CollapsibleSection title="Technical SEO" subtitle="Robots, sitemap, canonicals, and structured data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white text-sm font-medium">robots.txt</h4>
                <StatusBadge color="green" label="Active" />
              </div>
              <p className="text-xs text-white/40 leading-relaxed">
                /admin blocked. AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) allowed.
              </p>
              <a href="/robots.txt" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-xs text-[#6C63FF] hover:underline">
                View robots.txt
              </a>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white text-sm font-medium">Sitemap</h4>
                <StatusBadge color="green" label="Active" />
              </div>
              <p className="text-xs text-white/40 leading-relaxed">Auto-generated. Includes homepage and llms.txt.</p>
              <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-xs text-[#6C63FF] hover:underline">
                View sitemap.xml
              </a>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white text-sm font-medium">Canonical URLs</h4>
                <StatusBadge color="green" label="Active" />
              </div>
              <p className="text-xs text-white/40 leading-relaxed">Homepage canonical set to https://s77.ai.</p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white text-sm font-medium">JSON-LD Structured Data</h4>
                <StatusBadge color="green" label="3 Schemas" />
              </div>
              <p className="text-xs text-white/40 leading-relaxed">Organization, WebSite, and Service schemas.</p>
            </div>
          </div>
        </CollapsibleSection>

        {/* Section 4: AIO */}
        <CollapsibleSection title="AIO — AI Optimization" subtitle="AI crawler access, llms.txt, and content crawlability">
          <div className="space-y-6">
            <div>
              <h4 className="text-white text-sm font-medium mb-3">AI Crawler Access</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-white/40 uppercase tracking-wider">
                      <th className="pb-2 pr-4">Crawler</th>
                      <th className="pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'].map((bot) => (
                      <tr key={bot}>
                        <td className="py-2 pr-4 text-white">{bot}</td>
                        <td className="py-2"><StatusBadge color="green" label="Allowed" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <h4 className="text-white text-sm font-medium">llms.txt</h4>
                <StatusBadge color="green" label="Active" />
              </div>
              <textarea
                value={llmsContent}
                onChange={(e) => setLlmsContent(e.target.value)}
                rows={12}
                className="w-full bg-white/[0.03] border border-white/10 rounded-md p-4 text-xs text-white/60 font-mono leading-relaxed focus:outline-none focus:border-[#6C63FF] transition-colors resize-y"
              />
              <div className="flex items-center justify-between mt-2">
                <a href="/llms.txt" target="_blank" rel="noopener noreferrer" className="text-xs text-[#6C63FF] hover:underline">
                  View live llms.txt
                </a>
                <p className="text-xs text-white/30">Saved with SEO settings above</p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <h4 className="text-white text-sm font-medium">llms-full.txt</h4>
                <StatusBadge color="green" label="Auto-generated" />
              </div>
              <p className="text-xs text-white/30 mb-2">Complete AI-optimized content — auto-generated from all site data. Not editable.</p>
              {llmsFullLoading ? (
                <div className="flex items-center justify-center h-32 bg-white/[0.03] border border-white/10 rounded-md">
                  <div className="animate-spin w-5 h-5 border-2 border-[#6C63FF] border-t-transparent rounded-full" />
                </div>
              ) : (
                <textarea readOnly value={llmsFullContent} rows={20} className="w-full bg-white/[0.03] border border-white/10 rounded-md p-4 text-xs text-white/60 font-mono leading-relaxed resize-y cursor-default focus:outline-none" />
              )}
              <a href="/llms-full.txt" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-xs text-[#6C63FF] hover:underline">
                View live llms-full.txt
              </a>
            </div>

            <div>
              <h4 className="text-white text-sm font-medium mb-2">Content Crawlability</h4>
              <div className="bg-white/[0.03] border border-white/10 rounded-md p-4 flex items-start gap-3">
                <StatusBadge color="green" label="" />
                <p className="text-xs text-white/60 leading-relaxed">
                  All text content renders in raw HTML via SSR/SSG. AI crawlers can read 100% of page content without executing JavaScript.
                </p>
              </div>
            </div>
          </div>
        </CollapsibleSection>
      </div>
    </AdminShell>
  );
}
