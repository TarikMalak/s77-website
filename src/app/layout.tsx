import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'S77.AI | AI Division of SWELL — AIO, AEO & AI-Enhanced Production',
  description:
    "S77.AI is SWELL's dedicated AI division, building proprietary tools for AI Optimization (AIO), Answer Engine Optimization (AEO), AI-enhanced content production, and AI-driven social strategy for fashion, beauty, luxury, and lifestyle brands.",
  metadataBase: new URL('https://s77.ai'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'S77.AI | AI Division of SWELL',
    description:
      "Proprietary AI tools for AIO, AEO, content production, and social strategy. A division of SWELL Labs, LLC.",
    url: 'https://s77.ai',
    siteName: 'S77.AI',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'S77.AI — Intelligence Built In',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@swellny',
    creator: '@swellny',
    title: 'S77.AI | AI Division of SWELL',
    description:
      "Proprietary AI tools for AIO, AEO, content production, and social strategy.",
  },
  robots: { index: true, follow: true },
  other: {
    'theme-color': '#6C63FF',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="llms-txt" href="/llms.txt" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
