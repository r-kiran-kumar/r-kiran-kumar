// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : page.js
// Description : Page component for the gallery route.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

import Link from 'next/link';
import { ArrowLeft, ImageIcon, Sparkles } from 'lucide-react';
import { dbQuery } from '@/lib/db';
import GalleryClient from './GalleryClient';

export const metadata = {
  title: 'Gallery | R Kiran Kumar — Developer in Kuppam, Andhra Pradesh',
  description: 'Visual gallery of R Kiran Kumar — office setups, tech events, engineering workshops, UI design work and more from Kuppam, Chittoor District, Andhra Pradesh.',
  alternates: { canonical: 'https://rkirankumar.com/gallery' },
  openGraph: {
    type: 'website',
    url: 'https://rkirankumar.com/gallery',
    title: 'Gallery | R Kiran Kumar — Developer in Kuppam',
    description: 'Office, events, UI design work and more from R Kiran Kumar, Full Stack Developer in Kuppam, Andhra Pradesh.',
    images: [{ url: '/assets/og-image.webp', width: 1200, height: 630, alt: 'R Kiran Kumar — Gallery' }],
    siteName: 'R Kiran Kumar — Developer Portfolio',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@rkirankumar',
    creator: '@rkirankumar',
    title: 'Gallery | R Kiran Kumar',
    description: 'Visual gallery — office, events, UI design work from Kuppam, Andhra Pradesh.',
    images: ['/assets/og-image.webp'],
  },
};

export default async function GalleryPage() {
  let images = [];
  try {
    images = await dbQuery('SELECT * FROM gallery ORDER BY sort_order ASC, created_at DESC');
  } catch {
    images = [
      { id: 'gal-1', title: 'ChronoSpark Office Kuppam', description: 'Team meeting at the Kuppam headquarters.', image_url: '/assets/gallery-office.webp', alt_text: 'ChronoSpark office meeting Kuppam', category: 'office' },
      { id: 'gal-2', title: 'Engineering College Workshop', description: 'Delivering a full-stack web development seminar.', image_url: '/assets/gallery-workshop.webp', alt_text: 'Web development workshop', category: 'events' },
      { id: 'gal-3', title: 'UI Design Prototype', description: 'Figma presentation for a client web app.', image_url: '/assets/gallery-design.webp', alt_text: 'Figma UI design prototype', category: 'design' },
    ];
  }

  // ─── JSON-LD Schema ───────────────────────────────────────────────────────
  const imageGallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": "https://rkirankumar.com/gallery#gallery",
    "name": "R Kiran Kumar — Visual Gallery",
    "description": "Photos and visuals from the workspace, workshops, engineering events, and UI design sessions of R Kiran Kumar in Kuppam, Andhra Pradesh.",
    "url": "https://rkirankumar.com/gallery",
    "author": { "@type": "Person", "@id": "https://rkirankumar.com/#person" },
    "inLanguage": "en-IN",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://rkirankumar.com/" },
        { "@type": "ListItem", "position": 2, "name": "Gallery", "item": "https://rkirankumar.com/gallery" }
      ]
    },
    "image": images.map((img) => ({
      "@type": "ImageObject",
      "url": img.image_url?.startsWith('http') ? img.image_url : `https://rkirankumar.com${img.image_url}`,
      "name": img.title,
      "description": img.description || img.alt_text,
      "caption": img.alt_text || img.title
    }))
  };

  /* category counts for header stats */
  const cats = [...new Set(images.map(i => i.category).filter(Boolean))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGallerySchema) }} />

      {/* ── Hero Header ──────────────────────────────────────── */}
      <div className="relative pt-12 pb-14 mb-2">
        {/* Back link */}
        <Link href="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold mb-10 transition-colors hover:text-primary"
          style={{ color: 'var(--foreground-muted)' }}>
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Decorative glow blob */}
        <div
          className="absolute top-0 right-0 w-72 h-72 rounded-full blur-[120px] opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)' }}
        />

        {/* Content row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
          <div className="max-w-xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest mb-5"
                 style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
              <Sparkles className="w-3.5 h-3.5" />
              Visual Journal
            </div>

            <h1 className="text-5xl sm:text-6xl font-black leading-tight" style={{ color: 'var(--foreground)' }}>
              Behind the{' '}
              <span style={{
                background: 'linear-gradient(135deg, var(--primary) 0%, #007c9d 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Scenes
              </span>
            </h1>

            <p className="mt-4 text-base leading-relaxed max-w-md" style={{ color: 'var(--foreground-muted)' }}>
              Moments from the workspace, workshops, design sessions, and beyond — all from Kuppam, AP.
            </p>
          </div>

          {/* Stats panel */}
          <div className="flex items-center gap-6 shrink-0">
            <div className="text-center">
              <div className="text-4xl font-black" style={{ color: 'var(--primary)' }}>{images.length}</div>
              <div className="text-xs font-semibold mt-1" style={{ color: 'var(--foreground-muted)' }}>Photos &amp; Videos</div>
            </div>
            <div className="w-px h-12 self-center" style={{ background: 'var(--card-border)' }} />
            <div className="text-center">
              <div className="text-4xl font-black" style={{ color: 'var(--foreground)' }}>{cats.length}</div>
              <div className="text-xs font-semibold mt-1" style={{ color: 'var(--foreground-muted)' }}>Categories</div>
            </div>
          </div>
        </div>

        {/* Divider line */}
        <div className="mt-12 h-px w-full" style={{ background: 'var(--card-border)' }} />
      </div>

      {/* ── Gallery Client ──────────────────────────────────── */}
      <GalleryClient initialItems={images} />

      {/* Bottom spacing */}
      <div className="pb-20" />
    </div>
  );
}
