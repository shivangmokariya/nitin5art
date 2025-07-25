import type { Metadata } from 'next';
import { Inter, Lora, Dancing_Script } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { seedAdmin } from '@/lib/seedAdmin';
import VisitLogger from '@/components/VisitLogger';
import { getSiteSettings } from '@/lib/siteUtils';
import LoaderOverlay from '@/components/LoaderOverlay';
import React from 'react';
import Header from '@/components/Header';

if (typeof window === 'undefined') {
  // Only run on the server
  seedAdmin().catch(console.error);
}

const inter = Inter({ subsets: ['latin'] });
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });
const dancingScript = Dancing_Script({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-dancing-script' });

export const metadata: Metadata = {
  title: {
    default: 'Professional Artist Gallery | Paint Sketch Artwork',
    template: '%s | Professional Artist Gallery'
  },
  description: 'Discover stunning paint sketch artwork by a professional artist. Browse our collection of landscapes, portraits, and abstract pieces. Contact us for inquiries about original artwork.',
  keywords: ['artist', 'paint sketch', 'artwork', 'gallery', 'original art', 'landscape', 'portrait', 'abstract'],
  authors: [{ name: 'Professional Artist' }],
  creator: 'Professional Artist',
  publisher: 'Professional Artist Gallery',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://your-domain.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    title: 'Professional Artist Gallery | Paint Sketch Artwork',
    description: 'Discover stunning paint sketch artwork by a professional artist. Browse our collection of landscapes, portraits, and abstract pieces.',
    siteName: 'Professional Artist Gallery',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Professional Artist Gallery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Artist Gallery | Paint Sketch Artwork',
    description: 'Discover stunning paint sketch artwork by a professional artist.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteSettings = await getSiteSettings();
  const faviconUrl = siteSettings?.faviconUrl || '/favicon.ico';
  return (
    <html lang="en" className={`${lora.variable} ${dancingScript.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-lora">
        <VisitLogger />
        <Header />
        <LoaderOverlay />
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
} 