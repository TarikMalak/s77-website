import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: 'https://s77.ai',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: 'https://s77.ai/#what-we-do',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://s77.ai/#ultra77',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://s77.ai/#contact',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://s77.ai/llms.txt',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: 'https://s77.ai/llms-full.txt',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];
}
