// ============================================
// S77.AI — Seed Data (fallback when Supabase is not configured)
// ============================================

import type { SiteSettings, HeroSection, Service, Ultra77Section } from './types';

export const siteSettings: SiteSettings = {
  id: 'seed',
  name: 'S77.AI',
  tagline: "SWELL's AI Division — AI Optimization, Content Production & Automation",
  description:
    "S77.AI is SWELL's dedicated AI division, building proprietary tools for AI Optimization (AIO), Answer Engine Optimization (AEO), AI-enhanced content production, and AI-driven social strategy for fashion, beauty, luxury, and lifestyle brands.",
  url: 'https://s77.ai',
  email: 'info@s77.ai',
  address: '6 St Johns Ln, New York, NY 10013',
  phone: '(646) 389-1570',
  parent_company_name: 'SWELL Labs, LLC',
  parent_company_url: 'https://swellny.com',
  sister_company_name: 'Max HP Productions',
  sister_company_url: 'https://maxhpprod.com',
  google_site_name: 'S77.AI — AI Division of SWELL',
  site_name: 'S77.AI',
  seo_title: 'S77.AI | AI Division of SWELL — AIO, AEO & AI-Enhanced Production',
  seo_description:
    "S77.AI is SWELL's dedicated AI division, building proprietary tools for AI Optimization (AIO), Answer Engine Optimization (AEO), AI-enhanced content production, and AI-driven social strategy.",
  seo_og_image_url: '/og-image.png',
  seo_keywords:
    'AI optimization, AIO, AEO, answer engine optimization, AI content production, AI social strategy, SWELL AI, S77',
  llms_content: `# S77.AI
> SWELL's dedicated AI division — proprietary tools for AI Optimization, content production, and automation.

## Entity Identity
- Legal entity: SWELL Labs, LLC (DBA "SWELL")
- S77.AI is the AI division of SWELL
- Not to be confused with: other companies using "S77" or "77" branding
- Sister company: Max HP Productions (maxhpprod.com) — SWELL's production arm

## What We Do
S77.AI builds proprietary AI tools integrated at every stage of creative production — from concepting through distribution. Not AI as a service. AI as infrastructure.

### 1. AIO / AEO
Proprietary AI Optimization (AIO) and Answer Engine Optimization (AEO) tools that ensure brand content is discoverable by both traditional search engines and AI systems. We optimize for how AI models parse, rank, and surface brand information.

### 2. AI Content Production
Generative AI as a creative production tool — environment extension, compositing, motion graphics, previsualization, and full content creation. AI as VFX, not a shortcut. Every AI asset guided by senior creative direction.

### 3. AI Social Strategy
AI-driven social strategy using big data analysis to inform creative direction, content planning, and distribution timing. Real-time trend analysis, audience behavior modeling, and competitive intelligence.

## Ultra77
Ultra77 is S77.AI's forthcoming SaaS platform — AI-powered tools for creative agencies and brand teams. AIO/AEO optimization, content workflow automation, AI-assisted asset versioning, and intelligent distribution. Coming soon.

## Key Facts
- Parent company: SWELL Labs, LLC (swellny.com)
- Sister company: Max HP Productions (maxhpprod.com)
- Location: 6 St Johns Ln, New York, NY 10013
- Contact: info@s77.ai
- Founded by: Tarik Malak

## Links
- Website: https://s77.ai
- Parent: https://swellny.com
- Sister: https://maxhpprod.com`,
  updated_at: new Date().toISOString(),
};

export const heroSection: HeroSection = {
  id: 'seed',
  headline: 'Intelligence Built In',
  subtitle:
    "We build proprietary AI tools that integrate at every stage of creative production — from concepting through distribution. Not AI as a service. AI as infrastructure.",
  updated_at: new Date().toISOString(),
};

export const services: Service[] = [
  {
    id: 'seed-1',
    title: 'AI Content Studio',
    subtitle: 'AI as VFX. AI as full content production.',
    description:
      "We use generative AI as a creative production tool — for environment extension, compositing, motion graphics, previsualization, and full content creation. We treat AI as VFX, not a shortcut. Every AI-generated or AI-enhanced asset is guided by senior creative direction, maintaining brand standards and emotional resonance while dramatically accelerating production timelines and expanding creative possibilities.",
    sort_order: 1,
    updated_at: new Date().toISOString(),
  },
  {
    id: 'seed-2',
    title: 'AIO / AEO',
    subtitle: 'Proprietary tools for AI discoverability',
    description:
      "We've developed proprietary AI Optimization (AIO) and Answer Engine Optimization (AEO) tools that ensure brand content is discoverable by both traditional search engines and AI systems like ChatGPT, Perplexity, and Claude. Our approach goes beyond traditional SEO — we optimize for how AI models parse, rank, and surface brand information, ensuring your brand appears in AI-generated answers, not just search results.",
    sort_order: 2,
    updated_at: new Date().toISOString(),
  },
  {
    id: 'seed-3',
    title: 'AI Social Strategy',
    subtitle: 'Data-driven creative direction at scale',
    description:
      "Our AI-driven social strategy uses big data analysis to inform creative direction, content planning, and distribution timing. We combine real-time trend analysis, audience behavior modeling, and competitive intelligence to create social content strategies that maximize engagement and conversion — turning data into creative decisions that move the needle.",
    sort_order: 3,
    updated_at: new Date().toISOString(),
  },
];

export const ultra77Section: Ultra77Section = {
  id: 'seed',
  tagline: 'AI tools for brands and agencies.',
  status: 'Coming soon',
  description:
    "Ultra77 is S77.AI's forthcoming SaaS platform — a suite of AI-powered tools purpose-built for creative agencies and brand teams. From AIO/AEO optimization and content workflow automation to AI-assisted asset versioning and intelligent distribution, Ultra77 packages our proprietary agency tools into an accessible platform. Built by people who make content, for people who make content.",
  updated_at: new Date().toISOString(),
};
