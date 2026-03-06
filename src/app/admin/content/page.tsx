'use client';

import { useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import AdminLoading from '@/components/admin/AdminLoading';
import SaveButton from '@/components/admin/SaveButton';
import CollapsibleSection from '@/components/admin/CollapsibleSection';
import { adminFetch } from '@/lib/admin-fetch';
import { useAdminData } from '@/hooks/useAdminData';
import { inputClass } from '@/lib/admin-styles';
import { heroSection, services as seedServices, ultra77Section } from '@/lib/data';
import type { Service } from '@/lib/types';

export default function AdminContentPage() {
  // Hero state
  const [headline, setHeadline] = useState(heroSection.headline);
  const [subtitle, setSubtitle] = useState(heroSection.subtitle);

  // Services state
  const [servicesList, setServicesList] = useState<Service[]>(seedServices);

  // Ultra77 state
  const [u77Tagline, setU77Tagline] = useState(ultra77Section.tagline);
  const [u77Status, setU77Status] = useState(ultra77Section.status);
  const [u77Desc, setU77Desc] = useState(ultra77Section.description);

  // Load hero from DB
  const { loading: heroLoading } = useAdminData<{ headline: string; subtitle: string }>(
    '/api/admin/hero',
    (data) => {
      setHeadline(data.headline);
      setSubtitle(data.subtitle);
    },
  );

  // Load services from DB
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { loading: servicesLoading } = useAdminData<any>(
    '/api/admin/services',
    (data) => {
      if (data.section && data.services) {
        setServicesList(data.services);
      }
    },
  );

  // Load ultra77 from DB
  const { loading: ultra77Loading } = useAdminData<{ tagline: string; status: string; description: string }>(
    '/api/admin/ultra77',
    (data) => {
      setU77Tagline(data.tagline);
      setU77Status(data.status);
      setU77Desc(data.description);
    },
  );

  const loading = heroLoading || servicesLoading || ultra77Loading;

  const updateService = (index: number, field: keyof Service, value: string) => {
    setServicesList((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)),
    );
  };

  const handleSaveHero = async () => {
    const res = await adminFetch('/api/admin/hero', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ headline, subtitle }),
    });
    if (!res.ok) throw new Error('Save failed');
  };

  const handleSaveServices = async () => {
    const res = await adminFetch('/api/admin/services', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ services: servicesList }),
    });
    if (!res.ok) throw new Error('Save failed');
  };

  const handleSaveUltra77 = async () => {
    const res = await adminFetch('/api/admin/ultra77', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tagline: u77Tagline, status: u77Status, description: u77Desc }),
    });
    if (!res.ok) throw new Error('Save failed');
  };

  if (loading) return <AdminLoading />;

  return (
    <AdminShell>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-light text-white">Content Editor</h2>
          <p className="text-sm text-white/40 mt-1">Edit all text content on the S77.AI website</p>
        </div>

        {/* Hero Section */}
        <CollapsibleSection title="Hero Section" subtitle="Headline and subtitle" defaultOpen>
          <div className="space-y-4">
            <div>
              <label className="block text-xs tracking-[0.2em] text-white/40 uppercase mb-2">Headline</label>
              <input type="text" value={headline} onChange={(e) => setHeadline(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs tracking-[0.2em] text-white/40 uppercase mb-2">Subtitle</label>
              <textarea value={subtitle} onChange={(e) => setSubtitle(e.target.value)} rows={3} className={`${inputClass} resize-none`} />
            </div>
            <SaveButton onClick={handleSaveHero} label="Save Hero" />
          </div>
        </CollapsibleSection>

        {/* Services / Pillars */}
        <CollapsibleSection title="Services (Pillars)" subtitle="The three core service areas" defaultOpen>
          <div className="space-y-6">
            {servicesList.map((service, i) => (
              <div key={service.id} className="border border-white/5 rounded-lg p-4 space-y-3">
                <p className="text-xs text-white/30 uppercase tracking-wider">Service {i + 1}</p>
                <div>
                  <label className="block text-xs tracking-[0.2em] text-white/40 uppercase mb-1">Title</label>
                  <input type="text" value={service.title} onChange={(e) => updateService(i, 'title', e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.2em] text-white/40 uppercase mb-1">Subtitle</label>
                  <input type="text" value={service.subtitle} onChange={(e) => updateService(i, 'subtitle', e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.2em] text-white/40 uppercase mb-1">Description</label>
                  <textarea value={service.description} onChange={(e) => updateService(i, 'description', e.target.value)} rows={4} className={`${inputClass} resize-none`} />
                </div>
              </div>
            ))}
            <SaveButton onClick={handleSaveServices} label="Save Services" />
          </div>
        </CollapsibleSection>

        {/* Ultra77 */}
        <CollapsibleSection title="Ultra77 Teaser" subtitle="SaaS platform teaser section">
          <div className="space-y-4">
            <div>
              <label className="block text-xs tracking-[0.2em] text-white/40 uppercase mb-2">Tagline</label>
              <input type="text" value={u77Tagline} onChange={(e) => setU77Tagline(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs tracking-[0.2em] text-white/40 uppercase mb-2">Status Label</label>
              <input type="text" value={u77Status} onChange={(e) => setU77Status(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs tracking-[0.2em] text-white/40 uppercase mb-2">Description</label>
              <textarea value={u77Desc} onChange={(e) => setU77Desc(e.target.value)} rows={4} className={`${inputClass} resize-none`} />
            </div>
            <SaveButton onClick={handleSaveUltra77} label="Save Ultra77" />
          </div>
        </CollapsibleSection>
      </div>
    </AdminShell>
  );
}
