// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : page.js
// Description : Page component for the home route.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

import Link from 'next/link';
import Image from 'next/image';
import { dbQuery } from '@/lib/db';
import DisciplinesEditor from './components/DisciplinesEditor';
import { ArrowRight, Calendar, Sparkles, Brain, MapPin, ExternalLink, GitBranch } from 'lucide-react';

const Github = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export const revalidate = 0;

// ─── Homepage Metadata ────────────────────────────────────────────────────────
export const metadata = {
  title: "R Kiran Kumar | Full Stack Developer & Founder of ChronoSpark Solutions, Kuppam",
  description: "R Kiran Kumar (RKK) — Full Stack & Multi-Disciplinary Developer in Kuppam, Chittoor District, Andhra Pradesh. Founder of ChronoSpark Solutions. 5+ years experience in Web (React/Next.js), Backend (Node.js, Python, PHP, SQL), Mobile (Flutter/Dart) & UI/UX. RK Developer. RK Software Engineer.",
  keywords: [
    "R Kiran Kumar", "RKiran Kumar", "RK Kiran Kumar", "RKK", "RK", "rkirankumar", "rkirankumar.com",
    "Kiran Kumar", "Kiran", "RK Developer", "RK Software Engineer",
    "Full Stack Developer Kuppam", "Web Developer Kuppam", "Software Engineer Kuppam",
    "ChronoSpark Solutions", "developer Kuppam", "developer Santhipuram",
    "developer Ramakuppam", "developer Gudupalli", "web developer Chittoor",
    "IT company Kuppam", "software company Kuppam", "Flutter developer India",
    "React developer India", "Node.js developer", "full stack developer India"
  ],
  alternates: { canonical: "https://rkirankumar.com" },
  openGraph: {
    type: "profile",
    url: "https://rkirankumar.com/",
    title: "R Kiran Kumar | Full Stack Developer & Founder of ChronoSpark Solutions, Kuppam AP",
    description: "R Kiran Kumar (RKK, RK Developer) — Full Stack Developer, Founder of ChronoSpark Solutions. Based in Kuppam, Andhra Pradesh. Web, Backend, Mobile & UI/UX. 5+ years experience.",
    images: [{ url: "/assets/og-image.webp", width: 1200, height: 630, alt: "R Kiran Kumar — Full Stack Developer & Founder of ChronoSpark Solutions, Kuppam, Andhra Pradesh" }],
    siteName: "R Kiran Kumar — Developer Portfolio",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    site: "@rkirankumar",
    creator: "@rkirankumar",
    title: "R Kiran Kumar | Full Stack Developer & Founder of ChronoSpark Solutions",
    description: "R Kiran Kumar (RKK) — Full Stack Developer in Kuppam, AP. Web, Backend, Mobile & UI/UX. 5+ years. Serving India & global clients.",
    images: ["/assets/og-image.webp"],
  },
};

import TechMarquee from './components/TechMarquee';

// ─── VS Code token helpers ─────────────────────────────────────────────────────
const K = (t) => <span className="font-semibold text-[#00abcd]">{t}</span>;
const F = (t) => <span className="text-amber-600 dark:text-amber-300">{t}</span>;
const C = (t) => <span className="text-sky-600 dark:text-[#4FC1FF]">{t}</span>;
const S = (t) => <span className="text-rose-600 dark:text-[#CE9178]">{t}</span>;
const N = (t) => <span className="text-emerald-600 dark:text-[#b5cea8]">{t}</span>;
const CM = (t) => <span className="italic text-slate-400 dark:text-[#6A9955]">{t}</span>;
const P = (t) => <span className="text-blue-600 dark:text-[#9CDCFE]">{t}</span>;
const D = (t) => <span className="font-semibold text-[#FF5500]">{t}</span>;

// ─── Services data ─────────────────────────────────────────────────────────────
const services = [
  {
    title: 'Web Development',
    desc: 'Pixel-perfect, high-performance web applications using React, Next.js, and Tailwind CSS.',
    filename: 'web-app.tsx',
    tag: 'HTML/CSS/JS/React',
    lines: [
      <>{CM('// web-app.tsx — Next.js 15 page')}</>,
      <>{K('import')} {'{ '}{F('Metadata')}{' }'} {K('from')} {S("'next'")}</>,
      <>&nbsp;</>,
      <>{D('@Page')}({'{ '}{P('seo')}: {S('"rank-1"')}, {P('speed')}: {S('"99ms"')}{' }'})</>,
      <>{K('export default function')} {F('HomePage')}() {'{'}</>,
      <>&nbsp;&nbsp;{K('return')} {F('render')}({P('stack')})</>,
      <>{'}'};</>,
    ]
  },
  {
    title: 'Backend & APIs',
    desc: 'Scalable APIs, services, and database schema architectures built in Node.js, Python, and SQL.',
    filename: 'api-server.py',
    tag: 'Node/SQL/Python/PHP',
    lines: [
      <>{CM('# api-server.py — FastAPI route')}</>,
      <>{K('from')} rkk_api {K('import')} {F('Database')}, {F('Router')}</>,
      <>&nbsp;</>,
      <>{P('db')} = {F('Database')}({P('pool')}={N('3')}, {P('engine')}={S('"mysql"')})</>,
      <>&nbsp;</>,
      <>{D('@Router.get')}({S('"/api/v1/data"')})</>,
      <>{K('def')} {F('get_data')}({P('req')}: {C('Request')}):</>,
      <>&nbsp;&nbsp;{K('return')} {P('db')}.{F('query')}({P('optimized')}={K('True')})</>,
    ]
  },
  {
    title: 'Mobile Applications',
    desc: 'Cross-platform native iOS & Android applications using Flutter and Dart from a single codebase.',
    filename: 'main.dart',
    tag: 'Flutter/Dart',
    lines: [
      <>{CM('// main.dart — Flutter entry point')}</>,
      <>{K('import')} {S("'package:flutter/material.dart'")}</>,
      <>&nbsp;</>,
      <>{K('void')} {F('main')}() {K('async')} {'{'}</>,
      <>&nbsp;&nbsp;{C('WidgetsFlutterBinding')}.{F('ensureInitialized')}()</>,
      <>&nbsp;&nbsp;{F('runApp')}({K('const')} {C('RKKApp')}(</>,
      <>&nbsp;&nbsp;&nbsp;&nbsp;{P('targets')}: [{S("'iOS'")}, {S("'Android'")}],</>,
      <>&nbsp;&nbsp;))</>,
      <>{'}'};</>,
    ]
  },
  {
    title: 'UI/UX Architecture',
    desc: 'User interfaces focused on task workflows, designed in Figma, then cleanly engineered.',
    filename: 'design-system.css',
    tag: 'Figma/UX Flows',
    lines: [
      <>{CM('/* design-system.css — RKK Tokens */')}</>,
      <>{P(':root')} {'{'}</>,
      <>&nbsp;&nbsp;{P('--brand-cyan')}: &nbsp;&nbsp;{N('#00abcd')}</>,
      <>&nbsp;&nbsp;{P('--brand-orange')}: {S('#FF5500')}</>,
      <>&nbsp;&nbsp;{P('--font-sans')}: &nbsp;{S("'Space Grotesk'")}</>,
      <>&nbsp;&nbsp;{P('--radius')}: &nbsp;&nbsp;&nbsp;{N('12px')}</>,
      <>{'}'};</>,
      <>&nbsp;</>,
      <>{F('.card')} {'{ '}{P('background')}: {K('var')}({P('--brand-cyan')}) {'}'}</>,
    ]
  }
];

export default async function Home() {
  let projects = [];
  let blogs = [];

  try {
    projects = await dbQuery('SELECT * FROM projects WHERE is_published = 1 ORDER BY sort_order LIMIT 3');
    blogs = await dbQuery('SELECT * FROM blogs WHERE is_published = 1 ORDER BY created_at DESC LIMIT 4');
  } catch (error) {
    console.warn('[Database Load Warning] Falling back to default data:', error.message);
    projects = [
      { id: 'proj-1', title: 'ChronoSpark Solutions Website', description: 'A premium next.js corporate workspace with Google Review syncing and full applicant tracking systems.', category: 'web', image_url: '/assets/project-chronospark.webp', live_url: 'https://chronosparksolutions.com', github_url: 'https://github.com/r-kiran-kumar' },
      { id: 'proj-2', title: 'Hi Partner', description: 'Voice-first hyperlocal services platform connecting skilled workers with customers across Andhra Pradesh. Built with Flutter & Node.js.', category: 'mobile', image_url: '/assets/project-hipartner.png', live_url: 'https://hipartner.online', github_url: null, detail_url: '/projects/hi-partner' },
      { id: 'proj-3', title: 'Kuppam Agri-Track', description: 'Flutter mobile application for farmers in Gudupalli and Santhipuram to list crops and check wholesale prices.', category: 'mobile', image_url: '/assets/project-kuppamapp.webp', live_url: null, github_url: 'https://github.com/r-kiran-kumar' }
    ];
    blogs = [
      { id: 'blog-1', title: 'Building High Performance Next.js Apps', slug: 'building-high-performance-nextjs-apps', summary: 'Learn how to leverage Next.js App Router, caching, and database pooling to achieve sub-second load times.', cover_image: '/assets/blog-nextjs.webp', created_at: new Date().toISOString() },
      { id: 'blog-2', title: 'Why Tailwind CSS v4 is a Game Changer', slug: 'why-tailwind-v4-is-a-game-changer', summary: 'A deep dive into the performance improvements, native PostCSS config, and modern styling attributes of Tailwind CSS v4.', cover_image: '/assets/blog-tailwind.webp', created_at: new Date().toISOString() },
      { id: 'blog-3', title: 'The Silent Shift: Why AI is Making Humans Question Their Worth', slug: 'silent-shift-ai-making-humans-question-worth', summary: 'An exploration of how advanced AI agents are causing humans to lose confidence in their cognitive abilities and career longevity.', cover_image: '/assets/blog-silent-shift.webp', created_at: new Date().toISOString() },
      { id: 'blog-4', title: 'Overcoming the Fear of the Black Box: Navigating AI Anxiety', slug: 'overcoming-fear-of-black-box-ai-anxiety', summary: 'A practical guide on how to survive and thrive in the era of artificial intelligence without losing self-worth or career direction.', cover_image: '/assets/blog-ai-anxiety.webp', created_at: new Date().toISOString() },
      { id: 'blog-5', title: 'AI and the Crisis of Human Confidence: Can Creativity Be Reclaimed?', slug: 'ai-crisis-human-confidence-reclaiming-creativity', summary: 'Analyzing the psychological impact of generative models on artists, writers, and developers, and how to reclaim human creative agency.', cover_image: '/assets/blog-ai-crisis.webp', created_at: new Date().toISOString() },
      { id: 'blog-6', title: 'The Rise of Autonomous Agents: Coping with the Fear of Cognitive Displacement', slug: 'rise-autonomous-agents-coping-cognitive-displacement', summary: 'How the transition from copilots to fully autonomous agents is shaping public fear and reshaping the future of human intellect.', cover_image: '/assets/blog-autonomous-agents.webp', created_at: new Date().toISOString() },
      { id: 'blog-7', title: 'Why We Fear What We Build: The Myth and Reality of Superintelligence', slug: 'why-we-fear-what-we-build-superintelligence', summary: 'Differentiating between irrational existential dread and the realistic safety concerns surrounding modern Large Language Models and AGI.', cover_image: '/assets/blog-superintelligence.webp', created_at: new Date().toISOString() },
      { id: 'blog-8', title: 'Next.js 16: Building Lightning-Fast Dynamic Web Platforms', slug: 'nextjs-16-building-lightning-fast-platforms', summary: 'A developer\'s guide to the new features in Next.js 16, Turbopack integration, Server Components, and optimized rendering strategies.', cover_image: '/assets/blog-nextjs16.webp', created_at: new Date().toISOString() },
      { id: 'blog-9', title: 'Tailwind CSS v4: The Shift to CSS-First Utility Architectures', slug: 'tailwind-css-v4-css-first-utility-architectures', summary: 'Explaining the PostCSS-free compiler, CSS variables theme integration, and design token optimization in Tailwind\'s latest release.', cover_image: '/assets/blog-tailwind-v4.webp', created_at: new Date().toISOString() }
    ].slice(0, 4);
  }

  const homePageSchema = {
    "@context": "https://schema.org", "@type": "ProfilePage", "@id": "https://rkirankumar.com/#profilepage",
    "name": "R Kiran Kumar — Developer Portfolio", "url": "https://rkirankumar.com/", "inLanguage": "en-IN",
    "mainEntity": { "@type": "Person", "@id": "https://rkirankumar.com/#person" },
    "dateModified": new Date().toISOString(),
    "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://rkirankumar.com/" }] }
  };
  const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage", "@id": "https://rkirankumar.com/#faq",
    "mainEntity": [
      { "@type": "Question", "name": "Who is R Kiran Kumar?", "acceptedAnswer": { "@type": "Answer", "text": "R Kiran Kumar (RKK) is a Full Stack Developer and founder of ChronoSpark Solutions, based in Kuppam, Chittoor District, Andhra Pradesh, India. 5+ years of experience across web, backend, mobile, and UI/UX." } },
      { "@type": "Question", "name": "What services does R Kiran Kumar offer?", "acceptedAnswer": { "@type": "Answer", "text": "Full Stack Web Development (React, Next.js), Backend & API Engineering (Node.js, Python, PHP, MySQL), Mobile App Development (Flutter/Dart), UI/UX Design (Figma), and IT support in Kuppam and globally." } },
      { "@type": "Question", "name": "Where is R Kiran Kumar located?", "acceptedAnswer": { "@type": "Answer", "text": "Kuppam, Chittoor District, Andhra Pradesh, India. Serving local and global clients." } },
    ]
  };

  return (
    <div className="relative overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ═══════════════════════════════════════════════════
          HERO SECTION — Light & Clean
      ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'var(--background)' }}>
        {/* Subtle dot grid — light opacity */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,171,205,0.07) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />

        {/* Soft teal glow top-right */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none" style={{ background: 'rgba(0,171,205,0.10)' }} />
        {/* Soft orange glow bottom-left */}
        <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(255,85,0,0.07)' }} />

        {/* Subtle orange/teal top-left corner accent */}
        <div className="absolute top-0 left-0 w-80 h-1 pointer-events-none" style={{ background: 'linear-gradient(90deg, #FF5500 0%, #00abcd 50%, transparent 100%)' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* ── LEFT: Profile Photo ── */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start gap-5 animate-chrono-slide-left order-first">

              {/* Profile ring + photo */}
              <div className="relative">
                {/* Orbit rings */}
                <div className="absolute -inset-10 rounded-full border border-primary/10 animate-chrono-orbit-slow pointer-events-none" />
                <div className="absolute -inset-18 rounded-full border border-logo-orange/8 animate-chrono-orbit-rev pointer-events-none" />

                {/* Photo */}
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-2xl"
                  style={{ border: '4px solid var(--primary)', boxShadow: '0 0 40px rgba(0,171,205,0.18)' }}>
                  <Image
                    src="/assets/profile.webp"
                    alt="R Kiran Kumar — Full Stack Developer & Founder of ChronoSpark Solutions, Kuppam, Andhra Pradesh"
                    fill
                    sizes="(max-width: 768px) 288px, 320px"
                    className="object-cover"
                    priority
                  />
                </div>

                {/* AI + Code badge */}
                <div className="absolute -bottom-3 -right-4 rounded-2xl px-3 py-2 flex items-center gap-1.5 shadow-lg"
                  style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                  <Brain className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-foreground">AI + Code</span>
                </div>
              </div>

              {/* Mini code terminal card */}
              <div className="w-full max-w-xs rounded-2xl overflow-hidden shadow-xl border transition-colors duration-300 bg-slate-50 dark:bg-[#0d1117] border-slate-200 dark:border-primary/15">
                <div className="flex items-center justify-between px-4 py-2 select-none border-b transition-colors duration-300 bg-slate-200/60 dark:bg-[#323233] border-slate-300/60 dark:border-[#252526]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">rkirankumar.config.js</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="px-4 py-3.5 font-mono text-[10.5px] leading-relaxed space-y-0.5 text-slate-700 dark:text-slate-300">
                  <div><span className="text-slate-300 dark:text-slate-600 select-none mr-2">1</span>{K('const')} <span className="text-slate-800 dark:text-white">developer</span> = {'{'}</div>
                  <div><span className="text-slate-300 dark:text-slate-600 select-none mr-2">2</span>&nbsp;&nbsp;{P('name')}: {S('"R Kiran Kumar"')},</div>
                  <div><span className="text-slate-300 dark:text-slate-600 select-none mr-2">3</span>&nbsp;&nbsp;{P('role')}: {S('"Full Stack Dev"')},</div>
                  <div><span className="text-slate-300 dark:text-slate-600 select-none mr-2">4</span>&nbsp;&nbsp;{P('location')}: {S('"Kuppam, AP"')},</div>
                  <div><span className="text-slate-300 dark:text-slate-600 select-none mr-2">5</span>&nbsp;&nbsp;{P('stack')}: [{S('"Next.js"')}, {S('"Flutter"')}],</div>
                  <div><span className="text-slate-300 dark:text-slate-600 select-none mr-2">6</span>&nbsp;&nbsp;{P('available')}: {K('true')},</div>
                  <div><span className="text-slate-300 dark:text-slate-600 select-none mr-2">7</span>{'}'}</div>
                  <div className="pt-0.5"><span className="text-slate-300 dark:text-slate-600 select-none mr-2">8</span>{CM('// Open to projects!')}</div>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Bio Content ── */}
            <div className="lg:col-span-7 space-y-7 animate-chrono-slide-up">
              {/* Status badges */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold"
                  style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', color: '#16a34a' }}>
                  <span className="live-dot" />
                  Working in Live Projects
                </span>
                <span className="section-tag">
                  <MapPin className="w-3 h-3" />
                  Kuppam, AP, India
                </span>
              </div>

              {/* Headline */}
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.07] tracking-tight text-foreground">
                  Full Stack{' '}
                  <span style={{
                    background: 'linear-gradient(135deg, #00abcd 0%, #0088aa 50%, #FF5500 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    Developer &
                  </span>{' '}
                  Tech Founder
                </h1>
                <p className="text-base sm:text-lg mt-4 leading-relaxed font-light max-w-2xl text-foreground-muted">
                  I am <strong className="text-foreground font-semibold">R Kiran Kumar</strong> — full-time Full Stack Developer at{' '}
                  <strong className="text-primary">Digital Kuppam</strong> and founder of{' '}
                  <strong className="text-logo-orange">ChronoSpark Solutions</strong>. Building modern digital products that scale from Kuppam to the world.
                </p>
              </div>

              {/* Stat Badges */}
              <div className="flex flex-wrap gap-3">
                {[
                  { value: '5+', label: 'Years Experience' },
                  { value: '30+', label: 'Projects Shipped' },
                  { value: '4', label: 'Specializations' },
                  { value: '100%', label: 'Client Satisfaction' },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col px-4 py-2.5 rounded-2xl border text-center transition-all hover:border-primary/30"
                    style={{ background: 'rgba(0,171,205,0.05)', borderColor: 'rgba(0,171,205,0.15)' }}>
                    <span className="font-black text-xl leading-none text-primary">{stat.value}</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest mt-1 text-foreground-muted">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-1">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center font-bold px-7 py-3.5 rounded-xl text-sm gap-2 transition-all duration-200 hover:translate-y-[-2px] cursor-pointer text-white"
                  style={{ background: '#00abcd', boxShadow: '0 6px 20px rgba(0,171,205,0.35)' }}
                >
                  <span>Get in Touch</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center font-bold px-7 py-3.5 rounded-xl text-sm gap-2 transition-all duration-200 hover:translate-y-[-2px] cursor-pointer border border-border text-foreground hover:border-primary/40 hover:text-primary bg-card"
                >
                  <span>View Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Feature bullets */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-foreground-muted pt-1">
                {['AI-assisted workflows', 'SEO-rich Next.js apps', 'MySQL database design', 'Flutter mobile apps'].map((item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <TechMarquee />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 relative">

        {/* INTERACTIVE DISCIPLINES SECTION */}
        <section className="py-16 relative animate-fade-in-up">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-logo-orange/60 via-primary to-transparent" />
          <div className="bg-slate-100/50 dark:bg-slate-900/20 border border-slate-200/60 dark:border-slate-800/40 rounded-[2rem] p-8 sm:p-12 transition-all duration-300">
            <div className="max-w-3xl mb-6">
              <div className="section-tag mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                01 / Disciplines
              </div>
              <h2 className="text-3xl font-bold text-foreground">One developer, four areas of focus</h2>
              <p className="text-foreground-muted text-sm mt-2 max-w-xl font-light leading-relaxed">
                I do not write code in a vacuum. By managing design, web components, database systems, and mobile interfaces together, I keep projects clean and aligned.
              </p>
            </div>
            <DisciplinesEditor />
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="py-20 relative animate-fade-in-up">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-logo-orange/60 to-transparent" />
          <div className="max-w-3xl mb-12">
            <div className="section-tag mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              02 / What I Do
            </div>
            <h2 className="text-3xl font-bold text-foreground">Core Services</h2>
            <p className="text-foreground-muted text-sm mt-2 font-light max-w-xl">
              From pixel-perfect frontends to robust backend systems, I engineer complete digital products across all platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((svc, i) => (
              <div
                key={i}
                className="group flex flex-col overflow-hidden rounded-2xl shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 border"
                style={{ background: 'var(--editor-bg)', borderColor: 'var(--editor-border)' }}
              >
                {/* Mac title bar */}
                <div className="flex items-center justify-between px-3 py-2 select-none shrink-0 border-b"
                  style={{ background: 'var(--editor-header-bg)', borderColor: 'var(--editor-border)' }}>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{svc.filename}</span>
                  <span className="flex items-center gap-1 text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Running
                  </span>
                </div>

                {/* Tab strip */}
                <div className="flex items-center shrink-0 select-none border-b"
                  style={{ background: 'var(--editor-tab-bg)', borderColor: 'var(--editor-border)' }}>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono border-t-2 border-t-[#00abcd] text-slate-700 dark:text-[#d4d4d4]"
                    style={{ background: 'var(--editor-tab-active-bg)' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {svc.filename}
                  </div>
                </div>

                {/* Code body */}
                <div className="flex font-mono text-[10.5px] leading-[1.65] overflow-x-auto overflow-y-hidden flex-grow"
                  style={{ height: '172px', background: 'var(--editor-bg)' }}>
                  <div className="shrink-0 flex flex-col items-end pr-3 pl-3 py-4 select-none text-slate-300 dark:text-[#4f4f4f] border-r"
                    style={{ background: 'var(--editor-gutter-bg)', borderColor: 'var(--editor-border)' }}>
                    {svc.lines.map((_, li) => <div key={li}>{li + 1}</div>)}
                  </div>
                  <div className="py-4 px-4 flex flex-col whitespace-pre dark:text-[#d4d4d4] text-slate-700">
                    {svc.lines.map((line, li) => <div key={li}>{line}</div>)}
                  </div>
                </div>

                {/* Brand status bar */}
                <div className="flex items-center justify-between px-3 py-1.5 text-[9px] font-mono shrink-0 text-white" style={{ background: '#00abcd' }}>
                  <span className="font-bold">{svc.title}</span>
                  <span className="opacity-90 font-semibold">{svc.tag}</span>
                </div>

                {/* Info footer */}
                <div className="p-4 border-t bg-card flex flex-col gap-2" style={{ borderColor: 'var(--editor-border)' }}>
                  <h3 className="text-sm font-extrabold text-foreground group-hover:text-primary transition-colors">{svc.title}</h3>
                  <p className="text-foreground-muted text-xs font-light leading-relaxed">{svc.desc}</p>
                  <span className="w-fit text-[10px] font-semibold text-foreground bg-badge border border-border/50 rounded px-2 py-0.5 mt-auto">
                    {svc.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED PROJECTS — Light Theme */}
        <section className="py-20 relative animate-fade-in-up">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00abcd] via-logo-orange/50 to-transparent" />

          {/* Light gradient wrapper card */}
          <div className="relative rounded-[2rem] overflow-hidden border border-slate-200/80 dark:border-primary/12 bg-gradient-to-br from-[#f0fbfd] via-[#fff8f5] to-[#f5feff] dark:from-[#041e23] dark:via-[#062a31] dark:to-[#041e23]">
            {/* Subtle dot grid on light bg */}
            <div className="absolute inset-0 pointer-events-none opacity-40" style={{
              backgroundImage: 'radial-gradient(circle, rgba(0,171,205,0.08) 1px, transparent 1px)',
              backgroundSize: '28px 28px'
            }} />
            {/* Teal glow blob top-right */}
            <div className="absolute top-[-30px] right-[-30px] w-60 h-60 rounded-full blur-[80px] pointer-events-none" style={{ background: 'rgba(0,171,205,0.08)' }} />

            <div className="relative z-10 p-8 sm:p-12">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-12 gap-4">
                <div>
                  <div className="section-tag mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    03 / Works
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">Featured Projects</h2>
                  <p className="text-foreground-muted text-sm mt-2 font-light max-w-xl">
                    Real-world systems shipped for clients across Kuppam, Andhra Pradesh, and beyond.
                  </p>
                </div>
                <Link href="/projects" className="text-sm font-bold text-primary hover:text-primary-hover flex items-center gap-1.5 transition-colors shrink-0">
                  <span>See all projects</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((proj) => {
                  const detailUrl = proj.id === 'proj-2' || proj.title === 'Hi Partner' ? '/projects/hi-partner' : null;
                  return (
                    <div key={proj.id}
                      className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col group shadow-sm transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] hover:border-primary/30">
                      {/* Image */}
                      <div className="relative h-44 w-full overflow-hidden bg-background-alt">
                        <Image
                          src={proj.image_url || '/assets/project-chronospark.webp'}
                          alt={proj.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%)' }} />
                        <div className="absolute top-3 left-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
                          style={{ background: 'rgba(0,171,205,0.85)', backdropFilter: 'blur(4px)' }}>
                          {proj.category}
                        </div>
                      </div>
                      {/* Content */}
                      <div className="p-5 flex-grow flex flex-col justify-between">
                        <div>
                          <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{proj.title}</h3>
                          <p className="text-xs text-foreground-muted font-light leading-relaxed">{proj.description}</p>
                        </div>
                        <div className="flex gap-4 border-t border-border/50 mt-4 pt-4">
                          {detailUrl && (
                            <Link href={detailUrl}
                              className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-hover transition-colors">
                              <span>View Details</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          )}
                          {!detailUrl && proj.live_url && (
                            <a href={proj.live_url} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-hover transition-colors">
                              <ExternalLink className="w-3 h-3" />
                              Visit Website
                            </a>
                          )}
                          {proj.github_url && (
                            <a href={proj.github_url} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-semibold text-foreground-muted hover:text-foreground transition-colors">
                              <GitBranch className="w-3 h-3" />
                              GitHub Code
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* LATEST BLOGS PREVIEW */}
        <section className="py-20 relative animate-fade-in-up">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-logo-orange/50 via-primary to-transparent" />
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-12 gap-4">
            <div>
              <div className="section-tag mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                04 / Blog
              </div>
              <h2 className="text-3xl font-bold text-foreground">Latest Insights</h2>
              <p className="text-foreground-muted text-sm mt-2 font-light max-w-xl">
                Technical articles on web performance, AI integrations, Flutter mobile apps, and backend engineering.
              </p>
            </div>
            <Link href="/blog" className="text-sm font-bold text-primary hover:text-primary-hover flex items-center gap-1.5 transition-colors shrink-0">
              <span>View all articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {blogs.map((blog) => (
              <article key={blog.id} className="bg-gradient-to-br from-card to-background-alt border border-border rounded-2xl overflow-hidden shadow-sm card-hover flex flex-col justify-between group">
                {/* Cover Image */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-background-alt shrink-0">
                  <Image
                    src={blog.cover_image || '/assets/blog-nextjs.webp'}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                <div className="p-6 md:p-8 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-foreground-muted mb-3">
                      <Calendar className="w-3.5 h-3.5 text-primary/70" />
                      <span>{new Date(blog.created_at).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                      <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h3>
                    <p className="text-foreground-muted text-sm font-light leading-relaxed mb-4">{blog.summary}</p>
                  </div>
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="text-xs font-bold text-primary hover:text-primary-hover flex items-center gap-1 mt-2 transition-all group-hover:translate-x-1 duration-200"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-bold bg-primary text-white hover:bg-primary-hover shadow-lg hover:shadow-primary/20 transition-all duration-300 gap-2 group"
              style={{ color: '#ffffff' }}
            >
              <span>View More Articles</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
