// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : page.js
// Description : Page component for the about route.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CheckCircle, GraduationCap, MapPin, Award, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';
import { 
  SiHtml5, SiCss, SiJavascript, SiReact, SiNextdotjs, SiTailwindcss, SiBootstrap, SiJquery,
  SiNodedotjs, SiExpress, SiMysql, SiPostgresql, SiMongodb, SiPython, SiFastapi, SiPhp, SiLaravel,
  SiFigma, SiFlutter, SiDart, SiDocker, SiGraphql, SiOpenapiinitiative,
  SiJsonwebtokens, SiPostman
} from 'react-icons/si';
import { DiPhotoshop, DiIllustrator } from 'react-icons/di';

const SkillIconsMap = {
  'HTML5 & Semantic HTML': <SiHtml5 className="w-3.5 h-3.5 text-[#E34F26]" />,
  'CSS3 & CSS Grid': <SiCss className="w-3.5 h-3.5 text-[#1572B6]" />,
  'JavaScript (ES6+)': <SiJavascript className="w-3.5 h-3.5 text-[#F7DF1E] bg-black p-px rounded-sm" />,
  'React.js': <SiReact className="w-3.5 h-3.5 text-[#61DAFB]" />,
  'Next.js App Router': <SiNextdotjs className="w-3.5 h-3.5 text-slate-800 dark:text-white" />,
  'Tailwind CSS (v4)': <SiTailwindcss className="w-3.5 h-3.5 text-[#06B6D4]" />,
  'Bootstrap': <SiBootstrap className="w-3.5 h-3.5 text-[#7952B3]" />,
  'jQuery': <SiJquery className="w-3.5 h-3.5 text-[#0769AD]" />,
  'Node.js & Express': <SiNodedotjs className="w-3.5 h-3.5 text-[#339933]" />,
  'MySQL / Relational Schemas': <SiMysql className="w-3.5 h-3.5 text-[#4479A1]" />,
  'PostgreSQL': <SiPostgresql className="w-3.5 h-3.5 text-[#4169E1]" />,
  'MongoDB': <SiMongodb className="w-3.5 h-3.5 text-[#47A248]" />,
  'Python & FastAPI': <SiPython className="w-3.5 h-3.5 text-[#3776AB]" />,
  'PHP & Laravel': <SiLaravel className="w-3.5 h-3.5 text-[#FF2D20]" />,
  'Figma Prototyping': <SiFigma className="w-3.5 h-3.5 text-[#F24E1E]" />,
  'Adobe Photoshop': <DiPhotoshop className="w-3.5 h-3.5 text-[#31A8FF]" />,
  'Adobe Illustrator': <DiIllustrator className="w-3.5 h-3.5 text-[#FF9A00]" />,
  'Flutter Framework': <SiFlutter className="w-3.5 h-3.5 text-[#02569B]" />,
  'Dart Programming': <SiDart className="w-3.5 h-3.5 text-[#0175C2]" />,
  'Docker': <SiDocker className="w-3.5 h-3.5 text-[#2496ED]" />,
  'GraphQL': <SiGraphql className="w-3.5 h-3.5 text-[#E10098]" />,
  'RESTful API Engineering': <SiOpenapiinitiative className="w-3.5 h-3.5 text-[#6BA539]" />,
  'JSON Web Tokens (JWT)': <SiJsonwebtokens className="w-3.5 h-3.5 text-slate-800 dark:text-white" />,
  'REST API Integrations': <SiPostman className="w-3.5 h-3.5 text-[#FF6C37]" />
};

export const metadata = {
  title: "About R Kiran Kumar | Full Stack Developer & Founder of ChronoSpark Solutions, Kuppam",
  description: "R Kiran Kumar (RKK) — Full Stack & Multi-Disciplinary Developer in Kuppam, Andhra Pradesh. Founder of ChronoSpark Solutions. 5+ years shipping responsive web apps, backend APIs, Flutter mobile apps, and UI/UX design. Based in Kuppam, serving Chittoor, AP & India.",
  alternates: { canonical: "https://rkirankumar.com/about" },
  openGraph: {
    type: "profile",
    url: "https://rkirankumar.com/about",
    title: "About R Kiran Kumar | Full Stack Developer & Founder of ChronoSpark Solutions",
    description: "Learn about R Kiran Kumar (RKK) — Full Stack Developer based in Kuppam, AP. 5+ years experience in Web, Backend, Mobile & UI/UX. Founder of ChronoSpark Solutions.",
    images: [{ url: "/assets/og-image.webp", width: 1200, height: 630, alt: "R Kiran Kumar — About Page" }],
    siteName: "R Kiran Kumar — Developer Portfolio",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    site: "@rkirankumar",
    creator: "@rkirankumar",
    title: "About R Kiran Kumar | Full Stack Developer, Kuppam AP",
    description: "R Kiran Kumar — Founder of ChronoSpark Solutions, Full Stack Developer. 5+ years of web, backend, mobile & UI/UX development.",
    images: ["/assets/og-image.webp"],
  },
};

export default function About() {
  // ─── JSON-LD Schemas ───────────────────────────────────────────────────────
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://rkirankumar.com/" },
      { "@type": "ListItem", "position": 2, "name": "About", "item": "https://rkirankumar.com/about" }
    ]
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": "https://rkirankumar.com/about#aboutpage",
    "name": "About R Kiran Kumar",
    "description": "R Kiran Kumar is a Full Stack Developer and founder of ChronoSpark Solutions, based in Kuppam, Andhra Pradesh, India.",
    "url": "https://rkirankumar.com/about",
    "inLanguage": "en-IN",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://rkirankumar.com/" },
        { "@type": "ListItem", "position": 2, "name": "About", "item": "https://rkirankumar.com/about" }
      ]
    },
    "mainEntity": { "@type": "Person", "@id": "https://rkirankumar.com/#person" }
  };

  const stats = [
    { value: '5+', label: 'Years Experience' },
    { value: '4', label: 'Core Disciplines' },
    { value: '2020', label: 'CS Solutions Founded' },
    { value: '< 1s', label: 'Target Loading Speed' },
  ];

  const skillCategories = [
    {
      title: 'Frontend Engineering',
      skills: ['HTML5 & Semantic HTML', 'CSS3 & CSS Grid', 'JavaScript (ES6+)', 'React.js', 'Next.js App Router', 'Tailwind CSS (v4)', 'Bootstrap', 'jQuery', 'Responsive Design Layouts']
    },
    {
      title: 'Backend Systems & DB',
      desc: 'Focused on schema integrity and reliable response times.',
      skills: ['Node.js & Express', 'MySQL / Relational Schemas', 'PostgreSQL', 'MongoDB', 'Python & FastAPI', 'PHP & Laravel', 'RESTful API Engineering', 'Connection Pooling', 'JSON Web Tokens (JWT)']
    },
    {
      title: 'Mobile App Architecture',
      skills: ['Flutter Framework', 'Dart Programming', 'Android Studio Gradle builds', 'iOS Deployment', 'State Management', 'REST API Integrations']
    },
    {
      title: 'UI/UX Design tools',
      skills: ['Figma Prototyping', 'Adobe Photoshop', 'Adobe Illustrator', 'User Workflow Mapping', 'Typography Hierarchy', 'Wireframing', 'Color Theory Schemes']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* JSON-LD Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }} />

      {/* Back Link */}
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm font-semibold text-foreground-muted hover:text-primary transition-colors gap-1.5">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-fade-in-up">
        {/* Left Column - Biography */}
        <div className="lg:col-span-8 space-y-8">
          <div>
            <span className="text-xs font-bold text-primary tracking-widest uppercase">About R Kiran Kumar</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mt-2">
              R Kiran Kumar — Five years of building whatever the project needed.
            </h1>
          </div>

          <div className="prose text-foreground-muted font-light text-base leading-relaxed space-y-6">
            <p>
              I am a developer who never settled into one lane. Over 5+ years, my work has stretched across frontend layouts, backend database connections, mobile applications, and UX prototypes — not as separate tasks, but as parts of a unified approach to software.
            </p>
            <p>
              Currently, I work full-time as a <strong className="text-foreground font-semibold">Full Stack Developer at Digital Kuppam</strong>, while simultaneously driving technology projects and services under <strong className="text-foreground font-semibold">ChronoSpark Solutions</strong>.
            </p>
            <p>
              My ultimate goal is to grow the Kuppam constituency technologically strong. I believe in empowering our local community by building high-performance applications, training upcoming talent, and introducing state-of-the-art tech platforms to local warehouses, institutions, and businesses.
            </p>
          </div>

          {/* Stats Box */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-gradient-to-br from-card to-background-alt border border-border rounded-2xl p-5 text-center shadow-sm hover:shadow-md hover:border-logo-orange/45 hover:-translate-y-0.5 transition-all duration-300">
                <div className="text-3xl font-extrabold text-primary">{stat.value}</div>
                <div className="text-[11px] font-bold text-foreground-muted uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Core Values / Objectives */}
          <div className="bg-primary-light border border-primary/20 rounded-2xl p-6 md:p-8 space-y-4">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span>Engineering Philosophy</span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-foreground-muted">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span><strong className="text-foreground font-bold">Sub-second Loads:</strong> Minimal third-party bloat, optimized assets, and efficient database pools.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span><strong className="text-foreground font-bold">Rich SEO Auditing:</strong> Structured JSON-LD schema, canonical compliance, and fast loading parameters.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span><strong className="text-foreground font-bold">Offline Stability:</strong> Resilient network fallbacks and robust local data storage models.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span><strong className="text-foreground font-bold">Modular Code:</strong> Scalable React modules and type-safe schema constraints.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column - Toolbelt & Info */}
        <div className="lg:col-span-4 space-y-8">
          {/* Quick Info Box */}
          <div className="bg-gradient-to-br from-card to-background-alt border border-border rounded-2xl p-6 shadow-sm space-y-4 hover:shadow-md hover:border-logo-orange/45 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-border">
                <Image
                  src="/assets/profile.webp"
                  alt="R Kiran Kumar — Full Stack Developer & Founder of ChronoSpark Solutions, Kuppam, Andhra Pradesh"
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-foreground leading-none">R Kiran Kumar</h3>
                <span className="text-xs text-primary font-semibold mt-1 inline-block">Full Stack Developer</span>
              </div>
            </div>

            <ul className="text-xs text-foreground-muted space-y-2 border-t border-border pt-4">
              <li className="flex justify-between">
                <span className="font-semibold text-foreground-muted/75">Headquarters</span>
                <span className="text-foreground font-medium">Kuppam, Andhra Pradesh</span>
              </li>
              <li className="flex justify-between">
                <span className="font-semibold text-foreground-muted/75">Founded Agency</span>
                <span className="text-foreground font-medium">ChronoSpark Solutions</span>
              </li>
              <li className="flex justify-between">
                <span className="font-semibold text-foreground-muted/75">Focus Areas</span>
                <span className="text-foreground font-medium">Web, Mobile, DB, UI/UX</span>
              </li>
              <li className="flex justify-between">
                <span className="font-semibold text-foreground-muted/75">Contact Email</span>
                <a href="mailto:kirankumar.3219.rkk@gmail.com" className="text-primary font-semibold hover:underline">kirankumar.3219.rkk@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Skill List accordion style */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-widest flex items-center gap-1.5 px-1">
              <BookOpen className="w-4 h-4 text-primary" />
              <span>Full Toolbelt</span>
            </h3>

            {skillCategories.map((cat, idx) => (
              <div key={idx} className="bg-gradient-to-br from-card to-background-alt border border-border rounded-2xl p-5 shadow-sm space-y-3 hover:shadow-md hover:border-logo-orange/45 transition-all duration-300">
                <h4 className="text-sm font-bold text-foreground border-b border-border pb-2">{cat.title}</h4>
                <div className="flex flex-wrap gap-2.5">
                  {cat.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="inline-flex items-center gap-1.5 text-[10px] font-bold text-foreground bg-badge border border-border/50 pl-1.5 pr-2.5 py-1 rounded-full transition-colors duration-200 hover:bg-primary-light hover:text-primary">
                      {SkillIconsMap[skill] ? (
                        <span className="w-5 h-5 rounded-full bg-[#00abcd]/10 border border-[#00abcd]/20 flex items-center justify-center shrink-0">
                          {SkillIconsMap[skill]}
                        </span>
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 ml-1" />
                      )}
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
