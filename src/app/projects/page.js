// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : page.js
// Description : Page component for the projects route.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

import { dbQuery } from '@/lib/db';
import ProjectsClient from './ProjectsClient';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const revalidate = 0; // Dynamic server page

export const metadata = {
  title: "Projects | R Kiran Kumar — Full Stack Developer Portfolio, Kuppam",
  description: "Browse software and web applications created by R Kiran Kumar (RKK). Corporate landing platforms, warehousing backend APIs, Flutter mobile apps, and React/Next.js web applications by a Full Stack Developer in Kuppam, Andhra Pradesh.",
  alternates: { canonical: "https://rkirankumar.com/projects" },
  openGraph: {
    type: "website",
    url: "https://rkirankumar.com/projects",
    title: "Projects | R Kiran Kumar — Full Stack Developer Portfolio",
    description: "Software projects by R Kiran Kumar — web apps, backend APIs, Flutter mobile apps. Full Stack Developer in Kuppam, AP.",
    images: [{ url: "/assets/og-image.webp", width: 1200, height: 630, alt: "R Kiran Kumar — Projects Portfolio" }],
    siteName: "R Kiran Kumar — Developer Portfolio",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    site: "@rkirankumar",
    creator: "@rkirankumar",
    title: "Projects by R Kiran Kumar | Full Stack Developer",
    description: "Web apps, APIs, Flutter mobile apps by R Kiran Kumar, Full Stack Developer in Kuppam, Andhra Pradesh.",
    images: ["/assets/og-image.webp"],
  },
};

export default async function ProjectsPage() {
  let projects = [];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://rkirankumar.com/" },
      { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://rkirankumar.com/projects" }
    ]
  };

  try {
    projects = await dbQuery('SELECT * FROM projects WHERE is_published = 1 ORDER BY sort_order');
  } catch (error) {
    console.warn('[Database Projects Warning] Fallback data used:', error.message);
    projects = [
      {
        id: 'proj-1',
        title: 'ChronoSpark Solutions Website',
        description: 'A premium next.js corporate workspace with Google Review syncing and full applicant tracking systems.',
        category: 'web',
        image_url: '/assets/project-chronospark.webp',
        live_url: 'https://chronosparksolutions.com',
        github_url: 'https://github.com/r-kiran-kumar'
      },
      {
        id: 'proj-2',
        title: 'Hi Partner',
        description: 'Voice-first hyperlocal services platform connecting skilled workers with customers across Andhra Pradesh. Built with Flutter & Node.js.',
        category: 'mobile',
        image_url: '/assets/project-hipartner.png',
        live_url: 'https://hipartner.online',
        github_url: null
      },
      {
        id: 'proj-3',
        title: 'Kuppam Agri-Track',
        description: 'Flutter mobile application for farmers in Gudupalli and Santhipuram to list crops and check wholesale prices.',
        category: 'mobile',
        image_url: '/assets/project-kuppamapp.webp',
        live_url: null,
        github_url: 'https://github.com/r-kiran-kumar'
      }
    ];
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in-up">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Page Header */}
      <div className="mb-14">
        <Link href="/" className="inline-flex items-center text-sm font-semibold text-foreground-muted hover:text-primary transition-colors gap-1.5 mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Light gradient hero header card */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-primary/12 p-8 sm:p-12 bg-gradient-to-br from-[#f0fbfd] via-[#fff8f5] to-[#f5feff] dark:from-[#041e23] dark:via-[#062a31] dark:to-[#041e23]">
          {/* Subtle dot grid */}
          <div className="absolute inset-0 pointer-events-none opacity-50" style={{
            backgroundImage: 'radial-gradient(circle, rgba(0,171,205,0.08) 1px, transparent 1px)',
            backgroundSize: '28px 28px'
          }} />
          {/* Teal glow blob */}
          <div className="absolute top-[-20px] right-[-20px] w-48 h-48 rounded-full blur-[70px] pointer-events-none" style={{ background: 'rgba(0,171,205,0.10)' }} />

          <div className="relative z-10">
            <div className="section-tag mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              My Portfolio
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">Projects &amp; Products</h1>
            <p className="text-foreground-muted text-sm mt-2 max-w-xl font-light leading-relaxed">
              A selective collection of applications spanning web, backend APIs, mobile frameworks, and visual interface systems — built for clients in Kuppam and beyond.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Projects Component */}
      <ProjectsClient initialProjects={projects} />
    </div>
  );
}
