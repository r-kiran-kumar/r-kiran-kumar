// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : layout.js
// Description : Layout for the root route.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./components/ThemeProvider";
import { headers } from 'next/headers';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import { dbQuery } from '@/lib/db';
import VisitorTracker from './components/VisitorTracker';
import VisitorCounter from './components/VisitorCounter';
import CookieConsent from './components/CookieConsent';

// ─── Icon Components ───────────────────────────────────────────────────────────
const Github = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const Linkedin = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// ─── Google Fonts via Next.js font optimization ────────────────────────────────
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "500"], display: "swap" });

// ─── Site-wide Metadata (Next.js Metadata API) ─────────────────────────────────
// Individual pages should export their own `metadata` or `generateMetadata()`
// to override these defaults.
export const metadata = {
  metadataBase: new URL("https://rkirankumar.com"),

  title: {
    default: "R Kiran Kumar | Full Stack Developer in Kuppam, Andhra Pradesh",
    template: "%s | R Kiran Kumar",
  },
  description: "R Kiran Kumar — Full Stack & Multi-Disciplinary Developer in Kuppam, Chittoor District, Andhra Pradesh. Founder of ChronoSpark Solutions. 5+ years experience in Web (React/Next.js), Backend (Node.js, Python, PHP, SQL), Mobile Apps (Flutter/Dart) & UI/UX Design. Serving Kuppam, Santhipuram, Ramakuppam, Gudupalli, Chittoor, Andhra Pradesh, India & global clients.",
  keywords: [
    "R Kiran Kumar", "RKiran Kumar", "RK Kiran Kumar", "RKK", "rkirankumar", "rkirankumar.com",
    "Kiran Kumar", "Kiran", "RK Developer", "RK Software Engineer",
    "Full Stack Developer Kuppam", "Web Developer Kuppam", "Software Engineer Kuppam",
    "Flutter Developer Andhra Pradesh", "React Developer India", "Node.js Developer",
    "ChronoSpark Solutions", "developer Santhipuram", "developer Ramakuppam",
    "web developer Chittoor", "IT company Kuppam", "software company Kuppam",
    "full stack developer India", "freelance developer Andhra Pradesh"
  ],
  authors: [{ name: "R Kiran Kumar", url: "https://rkirankumar.com" }],
  creator: "R Kiran Kumar",
  publisher: "R Kiran Kumar",

  // ─── Canonical & Alternates ──────────────────────────────────────────
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "https://rkirankumar.com",
      "en-US": "https://rkirankumar.com",
    },
  },

  // ─── Robots ──────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ─── Icons (handled by Next.js — do NOT duplicate in <head>) ─────────
  icons: {
    icon: [
      { url: "/assets/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/assets/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/assets/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/assets/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
    apple: [{ url: "/assets/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",

  // ─── Open Graph ───────────────────────────────────────────────────────
  openGraph: {
    type: "profile",
    firstName: "Kiran",
    lastName: "Kumar",
    username: "rkirankumar",
    url: "https://rkirankumar.com/",
    siteName: "R Kiran Kumar — Developer Portfolio",
    title: "R Kiran Kumar | Full Stack Developer in Kuppam, Andhra Pradesh",
    description: "Founder of ChronoSpark Solutions & Multi-Disciplinary Developer in Kuppam, Andhra Pradesh. 5+ years experience in Web, Backend (Node.js, Python, PHP), Mobile (Flutter) & UI/UX. Serving India & global clients.",
    images: [
      {
        url: "/assets/og-image.webp",
        width: 1200,
        height: 630,
        alt: "R Kiran Kumar — Full Stack Developer & Founder of ChronoSpark Solutions, Kuppam, Andhra Pradesh",
        type: "image/webp",
      },
      {
        url: "/assets/profile.webp",
        width: 800,
        height: 800,
        alt: "R Kiran Kumar — Profile Photo",
        type: "image/webp",
      },
    ],
    locale: "en_IN",
    countryName: "India",
  },

  // ─── Twitter / X Card ────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: "@rkirankumar",
    creator: "@rkirankumar",
    title: "R Kiran Kumar | Full Stack Developer in Kuppam, Andhra Pradesh",
    description: "Founder of ChronoSpark Solutions & Full Stack Developer in Kuppam, AP. Web, Backend, Mobile & UI/UX — 5+ years experience. Serving India & global clients.",
    images: {
      url: "/assets/og-image.webp",
      alt: "R Kiran Kumar — Developer in Kuppam, Andhra Pradesh",
    },
  },

  // ─── Additional Meta ──────────────────────────────────────────────────
  other: {
    "geo.region": "IN-AP",
    "geo.placename": "Kuppam, Chittoor District, Andhra Pradesh, India",
    "geo.position": "12.7544;78.3437",
    "ICBM": "12.7544, 78.3437",
    "theme-color": "#00ABCD",
    "msapplication-TileColor": "#00ABCD",
    "msapplication-TileImage": "/assets/favicon-96x96.png",
    "msapplication-config": "/browserconfig.xml",
    "format-detection": "telephone=no",
    "rating": "general",
    "revisit-after": "7 days",
    "coverage": "India",
    "distribution": "global",
  },
};

// ─── JSON-LD Schemas ───────────────────────────────────────────────────────────
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://rkirankumar.com/#person",
  "name": "R Kiran Kumar",
  "alternateName": ["Kiran Kumar", "RKK", "RK", "R Kiran", "rkirankumar", "RKiran Kumar", "RK Kiran Kumar", "RK Developer", "RK Software Engineer"],
  "givenName": "Kiran",
  "familyName": "Kumar",
  "honorificPrefix": "R",
  "jobTitle": "Full Stack & Multi-Disciplinary Developer",
  "description": "R Kiran Kumar is a full-stack and multi-disciplinary developer based in Kuppam, Chittoor District, Andhra Pradesh, India. He is the founder of ChronoSpark Solutions, with 5+ years of experience in Web Development, Backend Engineering, Mobile App Development (Flutter/Dart), and UI/UX Design, serving clients from Kuppam, Santhipuram, Ramakuppam, Gudupalli, Chittoor, Andhra Pradesh, India and globally.",
  "url": "https://rkirankumar.com/",
  "image": {
    "@type": "ImageObject",
    "url": "https://rkirankumar.com/assets/profile.webp",
    "width": 800,
    "height": 800,
    "caption": "R Kiran Kumar — Full Stack Developer & Founder of ChronoSpark Solutions"
  },
  "email": "kirankumar.3219.rkk@gmail.com",
  "telephone": "+91-81848-92304",
  "nationality": { "@type": "Country", "name": "India" },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Kuppam",
    "addressLocality": "Kuppam",
    "addressRegion": "Andhra Pradesh",
    "postalCode": "517425",
    "addressCountry": "IN"
  },
  "homeLocation": {
    "@type": "Place",
    "name": "Kuppam, Chittoor District, Andhra Pradesh, India",
    "geo": { "@type": "GeoCoordinates", "latitude": "12.7544", "longitude": "78.3437" }
  },
  "sameAs": [
    "https://www.linkedin.com/in/r-kiran-kumar-rkk/",
    "https://github.com/r-kiran-kumar/",
    "https://rkirankumar.com/",
    "https://chronosparksolutions.com/"
  ],
  "knowsAbout": [
    "Web Development", "Full Stack Development", "JavaScript", "TypeScript", "React", "Next.js",
    "Node.js", "Python", "PHP", "SQL", "MySQL", "Laravel", "WordPress",
    "Flutter", "Dart", "Mobile App Development", "Android Development", "iOS Development",
    "UI/UX Design", "Figma", "Software Engineering", "IT Solutions",
    "Networking", "Technical Support", "Kuppam", "Andhra Pradesh"
  ],
  "hasOccupation": {
    "@type": "Occupation",
    "name": "Full Stack Software Developer",
    "occupationalCategory": "15-1252.00",
    "educationRequirements": "Computer Science Engineering",
    "skills": "Web Development, React, Next.js, Node.js, Python, PHP, SQL, Flutter, Dart, Mobile Apps, UI/UX Design, Laravel, WordPress, Django"
  },
  "worksFor": {
    "@type": "Organization",
    "@id": "https://rkirankumar.com/#chronospark",
    "name": "ChronoSpark Solutions"
  },
  "founder": {
    "@type": "Organization",
    "@id": "https://rkirankumar.com/#chronospark",
    "name": "ChronoSpark Solutions"
  },
  "areaServed": [
    { "@type": "City", "name": "Kuppam" },
    { "@type": "City", "name": "Santhipuram" },
    { "@type": "City", "name": "Ramakuppam" },
    { "@type": "City", "name": "Gudupalli" },
    { "@type": "AdministrativeArea", "name": "Chittoor District" },
    { "@type": "State", "name": "Andhra Pradesh" },
    { "@type": "Country", "name": "India" }
  ]
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "LocalBusiness"],
  "@id": "https://rkirankumar.com/#chronospark",
  "name": "ChronoSpark Solutions",
  "alternateName": ["ChronoSpark", "ChronoSpark Solutions Kuppam"],
  "description": "ChronoSpark Solutions is a technology company based in Kuppam, Andhra Pradesh, India. Founded by R Kiran Kumar, specializing in high-performance web development, backend engineering, mobile app development (Flutter), UI/UX design, and custom IT solutions for Kuppam, Chittoor district, Andhra Pradesh and global clients.",
  "url": "https://chronosparksolutions.com/",
  "logo": {
    "@type": "ImageObject",
    "url": "https://rkirankumar.com/assets/chronosparksolutions-logo.webp",
    "width": 512,
    "height": 512
  },
  "image": "https://rkirankumar.com/assets/chronosparksolutions.webp",
  "telephone": "+91-81848-92304",
  "email": "kirankumar.3219.rkk@gmail.com",
  "foundingDate": "2020",
  "founder": {
    "@type": "Person",
    "@id": "https://rkirankumar.com/#person",
    "name": "R Kiran Kumar"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Kuppam",
    "addressLocality": "Kuppam",
    "addressRegion": "Andhra Pradesh",
    "postalCode": "517425",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 12.8536062,
    "longitude": 78.3652041
  },
  "hasMap": "https://maps.app.goo.gl/QuFYubWBjNPHbenx8",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  },
  "priceRange": "₹₹",
  "currenciesAccepted": "INR, USD",
  "paymentAccepted": "Bank Transfer, UPI, Online Payment",
  "areaServed": [
    { "@type": "City", "name": "Kuppam" },
    { "@type": "AdministrativeArea", "name": "Chittoor District" },
    { "@type": "State", "name": "Andhra Pradesh" },
    { "@type": "Country", "name": "India" }
  ],
  "serviceType": [
    "Web Development", "Full Stack Development", "Backend Development",
    "Flutter Mobile App Development", "UI/UX Design", "React Development",
    "Node.js Development", "Software Consulting", "IT Support", "Networking"
  ],
  "sameAs": [
    "https://chronosparksolutions.com/",
    "https://www.linkedin.com/in/r-kiran-kumar-rkk/",
    "https://github.com/r-kiran-kumar/",
    "https://maps.app.goo.gl/QuFYubWBjNPHbenx8"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Software & Web Development Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Full-Stack Web Development",
          "description": "Crafting premium, high-performance web applications using HTML, CSS, JavaScript, React, Next.js, Laravel, and WordPress."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Backend & API Engineering",
          "description": "Building scalable database schemas (SQL/NoSQL) and custom API integrations in Node.js, Python, PHP, and Laravel."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Mobile Application Development",
          "description": "Developing cross-platform iOS and Android mobile apps using Flutter and Dart."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "UI/UX Architecture & Prototyping",
          "description": "Designing clean, conversion-focused user interfaces and prototypes in Figma."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Technical Support & Networking",
          "description": "IT support, networking setup, and technical consulting for businesses in Kuppam and surrounding areas."
        }
      }
    ]
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://rkirankumar.com/#website",
  "name": "R Kiran Kumar — Developer Portfolio",
  "alternateName": ["rkirankumar.com", "RKiran Kumar Portfolio"],
  "url": "https://rkirankumar.com/",
  "description": "Portfolio of R Kiran Kumar, full stack developer and founder of ChronoSpark Solutions, based in Kuppam, Andhra Pradesh, India.",
  "inLanguage": "en-IN",
  "author": { "@type": "Person", "@id": "https://rkirankumar.com/#person" },
  "publisher": { "@type": "Organization", "@id": "https://rkirankumar.com/#chronospark" },
  "copyrightYear": new Date().getFullYear(),
  "copyrightHolder": { "@type": "Person", "@id": "https://rkirankumar.com/#person" },
  "dateModified": new Date().toISOString(),
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://rkirankumar.com/blog?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

export default async function RootLayout({ children }) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const isAdmin = pathname.startsWith('/admin') || pathname === '/login';

  // Fetch backlinks from database
  let backlinks = [];
  try {
    backlinks = await dbQuery('SELECT title, url, relationship FROM backlinks ORDER BY sort_order ASC LIMIT 6');
  } catch {
    backlinks = [
      { title: 'Digital Kuppam', url: 'https://digitalkuppam.com', relationship: 'dofollow' },
      { title: 'ChronoSpark Solutions', url: 'https://chronosparksolutions.com', relationship: 'dofollow' },
    ];
  }

  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        {/* Performance: preconnect & dns-prefetch for Google Fonts CDN */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        {/* Theme initialization — must be synchronous to prevent flash */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('rkk-theme');var d=window.matchMedia('(prefers-color-scheme:dark)').matches;if(t==='dark'||(t===null&&d)){document.documentElement.classList.add('dark')}}catch(e){}})()` }} />

        {/* JSON-LD Structured Data — Site-wide schemas */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
      <body className="min-h-full flex flex-col bg-grid-pattern" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
        <ThemeProvider>
          {!pathname.startsWith('/admin') && <VisitorTracker />}
          {!pathname.startsWith('/admin') && <CookieConsent />}
          {!isAdmin && <Navbar />}
          <main className="flex-grow">{children}</main>

          {!isAdmin && (
            <footer className="mt-auto relative overflow-hidden border-t border-slate-200/80 dark:border-primary/12 bg-gradient-to-br from-[#f0fbfd] via-[#fff8f5] to-[#f5feff] dark:from-[#041e23] dark:via-[#062a31] dark:to-[#041e23]">
              {/* Dot grid overlay */}
              <div className="absolute inset-0 bg-dot-grid opacity-30 dark:opacity-40 pointer-events-none" />
              {/* Teal glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 rounded-full blur-[80px] pointer-events-none" style={{ background: 'rgba(0,171,205,0.06)' }} />

              {/* Top gradient bar */}
              <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg, #FF5500 0%, #00abcd 50%, transparent 100%)' }} />

              <div className="relative z-10 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

                  {/* Brand */}
                  <div className="md:col-span-4">
                    <Link href="/" className="flex items-center group w-fit py-1">
                      <div className="hidden dark:block">
                        <Image src="/assets/logo-dark.webp" alt="R Kiran Kumar Logo" width={220} height={36} className="h-8 w-auto object-contain transition-transform group-hover:scale-[1.02]" style={{ height: 'auto' }} />
                      </div>
                      <div className="dark:hidden">
                        <Image src="/assets/logo-light.webp" alt="R Kiran Kumar Logo" width={220} height={36} className="h-8 w-auto object-contain transition-transform group-hover:scale-[1.02]" style={{ height: 'auto' }} />
                      </div>
                    </Link>
                    <p className="mt-3 text-sm max-w-sm leading-relaxed font-light text-foreground-muted dark:text-slate-400">
                      Crafting premium, high-performance web applications, reliable backend systems, and cross-platform mobile experiences from Kuppam, Andhra Pradesh.
                    </p>
                    {/* Live status badge */}
                    <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#22c55e' }}>
                      <span className="live-dot" />
                      Working in Live Projects
                    </div>
                    <div className="mt-4 flex space-x-4">
                      <a href="https://linkedin.com/in/r-kiran-kumar-rkk" target="_blank" rel="noopener noreferrer" aria-label="R Kiran Kumar on LinkedIn" className="transition-all hover:scale-110 hover:text-primary text-slate-400 dark:text-slate-500">
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a href="https://github.com/r-kiran-kumar" target="_blank" rel="noopener noreferrer" aria-label="R Kiran Kumar on GitHub" className="transition-all hover:scale-110 hover:text-primary text-slate-400 dark:text-slate-500">
                        <Github className="w-5 h-5" />
                      </a>
                    </div>
                  </div>

                  {/* Navigation & Resources Subgrid */}
                  <div className="grid grid-cols-2 gap-6 md:col-span-4">
                    {/* Navigation */}
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: '#00abcd' }}>Navigation</h3>
                      <ul className="mt-4 space-y-2.5 text-sm">
                        {[['About Me', '/about'], ['Projects', '/projects'], ['Blog', '/blog'], ['Gallery', '/gallery'], ['FAQs', '/faqs'], ['Contact', '/contact']].map(([label, href]) => (
                          <li key={href}>
                            <Link href={href} className="transition-colors hover:text-primary font-medium text-slate-650 dark:text-slate-400">{label}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Dynamic Backlinks Column */}
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: '#00abcd' }}>Resources</h3>
                      <ul className="mt-4 space-y-2.5 text-sm">
                        {backlinks.map((link, idx) => (
                          <li key={idx}>
                            <a
                              href={link.url}
                              target="_blank"
                              rel={link.relationship === 'dofollow' ? 'noopener noreferrer' : 'noopener noreferrer nofollow'}
                              className="transition-colors hover:text-primary font-medium text-slate-650 dark:text-slate-400"
                            >
                              {link.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Contact */}
                  {/* Contact */}
                  <div className="md:col-span-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: '#00abcd' }}>Contact</h3>
                    <ul className="mt-4 space-y-3 text-sm text-slate-650 dark:text-slate-400">
                      <li className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#FF5500' }} />
                        <span>Kuppam, Andhra Pradesh, India</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 shrink-0" style={{ color: '#00abcd' }} />
                        <a href="mailto:kirankumar.3219.rkk@gmail.com" className="hover:text-primary transition-colors break-all text-xs">kirankumar.3219.rkk@gmail.com</a>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 shrink-0" style={{ color: '#00abcd' }} />
                        <a href="tel:+918184892304" className="hover:text-primary transition-colors">+91-81848-92304</a>
                      </li>
                    </ul>

                    {/* Action Buttons */}
                    <div className="mt-6 flex flex-wrap gap-2.5">
                      {/* Google Review Button */}
                      <a 
                        href="https://search.google.com/local/writereview?placeid=ChIJN6TS3ci_rTsRA4CZvqzwPkg"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 hover:scale-[1.02] border border-slate-300/80 dark:border-slate-700/50 bg-white hover:bg-slate-50 dark:bg-slate-900/60 dark:hover:bg-slate-800/60 hover:border-primary/50 dark:hover:border-primary/50 text-slate-800 dark:text-white cursor-pointer w-fit"
                      >
                        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.22-.67-.35-1.37-.35-2.09z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                          />
                        </svg>
                        <span>Google Review</span>
                      </a>

                      {/* Locate Me Button */}
                      <a 
                        href="https://maps.app.goo.gl/QuFYubWBjNPHbenx8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 hover:scale-[1.02] border border-slate-300/80 dark:border-slate-700/50 bg-white hover:bg-slate-50 dark:bg-slate-900/60 dark:hover:bg-slate-800/60 hover:border-primary/50 dark:hover:border-primary/50 text-slate-800 dark:text-white cursor-pointer w-fit"
                      >
                        <MapPin className="w-3.5 h-3.5 shrink-0 text-logo-orange" />
                        <span>Locate Me</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 flex flex-col md:flex-row justify-between items-center text-xs gap-4 border-t border-slate-200/80 dark:border-white/5 text-slate-400 dark:text-slate-500">
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <span>© {new Date().getFullYear()} R Kiran Kumar. All rights reserved.</span>
                    <span className="hidden sm:inline">•</span>
                    <VisitorCounter />
                  </div>
                  <div className="flex space-x-4">
                    <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
                    <span>•</span>
                    <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
                    <span>•</span>
                    <Link href="/login" className="hover:text-primary transition-colors">Admin Login</Link>
                  </div>
                </div>
              </div>
            </footer>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
