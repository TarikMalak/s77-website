import { isSupabaseConfigured, getSupabaseAdmin } from './supabase';
import type { SiteSettings, HeroSection, Service, Ultra77Section } from './types';
import * as seed from './data';

export async function getSiteSettings(): Promise<SiteSettings> {
  if (isSupabaseConfigured) {
    try {
      const { data } = await getSupabaseAdmin()
        .from('s77_site_settings')
        .select('*')
        .limit(1)
        .single();
      if (data) return data as SiteSettings;
    } catch { /* fallback */ }
  }
  return seed.siteSettings;
}

export async function getHero(): Promise<HeroSection> {
  if (isSupabaseConfigured) {
    try {
      const { data } = await getSupabaseAdmin()
        .from('s77_hero')
        .select('*')
        .limit(1)
        .single();
      if (data) return data as HeroSection;
    } catch { /* fallback */ }
  }
  return seed.heroSection;
}

export async function getServices(): Promise<Service[]> {
  if (isSupabaseConfigured) {
    try {
      const { data } = await getSupabaseAdmin()
        .from('s77_services')
        .select('*')
        .order('sort_order', { ascending: true });
      if (data?.length) return data as Service[];
    } catch { /* fallback */ }
  }
  return seed.services;
}

export async function getUltra77(): Promise<Ultra77Section> {
  if (isSupabaseConfigured) {
    try {
      const { data } = await getSupabaseAdmin()
        .from('s77_ultra77')
        .select('*')
        .limit(1)
        .single();
      if (data) return data as Ultra77Section;
    } catch { /* fallback */ }
  }
  return seed.ultra77Section;
}
