export interface SiteSettings {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  email: string;
  address: string;
  phone: string;
  parent_company_name: string;
  parent_company_url: string;
  sister_company_name: string;
  sister_company_url: string;
  google_site_name: string;
  site_name: string;
  seo_title: string;
  seo_description: string;
  seo_og_image_url: string;
  seo_keywords: string;
  llms_content: string;
  updated_at: string;
}

export interface HeroSection {
  id: string;
  headline: string;
  subtitle: string;
  updated_at: string;
}

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  sort_order: number;
  updated_at: string;
}

export interface Ultra77Section {
  id: string;
  tagline: string;
  status: string;
  description: string;
  updated_at: string;
}
