// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : src/app/projects/hi-partner/page.js
// Description : Hi Partner project detail page.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ExternalLink, Star, Smartphone, Globe, MapPin, Mic, Users, Zap, ShieldCheck, Download } from 'lucide-react';

export const metadata = {
  title: 'Hi Partner — Hyperlocal Services App | R Kiran Kumar Projects',
  description: 'Hi Partner is a voice-first hyperlocal services platform by ChronoSpark Solutions connecting skilled workers with customers across Andhra Pradesh. Built with Flutter & Node.js.',
  alternates: { canonical: 'https://rkirankumar.com/projects/hi-partner' },
  openGraph: {
    type: 'website',
    url: 'https://rkirankumar.com/projects/hi-partner',
    title: 'Hi Partner — Hyperlocal Services App | R Kiran Kumar',
    description: 'Voice-first platform connecting skilled workers with customers. Built with Flutter & Node.js.',
    images: [{ url: '/assets/project-hipartner.png', width: 512, height: 512, alt: 'Hi Partner App Icon' }],
    siteName: 'R Kiran Kumar — Developer Portfolio',
    locale: 'en_IN',
  },
};

const features = [
  { icon: Mic, title: 'Voice-First Search', desc: 'Speak in Telugu, Tamil, Hindi, or English to find workers nearby — no typing needed.', color: '#00abcd' },
  { icon: MapPin, title: 'Satellite Map View', desc: 'High-resolution satellite view helps rural users identify landmarks and drop precise pins.', color: '#FF5500' },
  { icon: Users, title: 'Verified Workers', desc: 'Electricians, plumbers, carpenters, painters, AC repair, cooks and more — all verified.', color: '#7c3aed' },
  { icon: Zap, title: 'Instant Connections', desc: 'Workers and customers connect directly with zero platform commission — 100% earnings kept.', color: '#f59e0b' },
  { icon: ShieldCheck, title: 'Trust & Safety', desc: 'Google & Play Store ratings, background-checked partners, and secure in-app experience.', color: '#10b981' },
  { icon: Globe, title: 'Multi-Language', desc: 'Supports Telugu, Tamil, Kannada, Malayalam, Hindi and English across the full UI.', color: '#00abcd' },
];

const techStack = [
  { name: 'Flutter', tag: 'Mobile' }, { name: 'Dart', tag: 'Language' },
  { name: 'Node.js', tag: 'Backend' }, { name: 'PostgreSQL', tag: 'Database' },
  { name: 'Google Maps', tag: 'Maps' }, { name: 'Firebase', tag: 'Auth' },
  { name: 'Next.js', tag: 'Web' }, { name: 'Docker', tag: 'DevOps' },
];

const reviews = [
  { name: 'Ramesh K.', role: 'Electrician Partner', location: 'Vijayawada, AP', rating: 5, text: 'The Telugu voice search changed my livelihood. I do not have to type in English. Customers from 5 km away find me directly. Best part is zero platform fee.' },
  { name: 'Sunitha Rao', role: 'Homeowner', location: 'Hyderabad, AP', rating: 5, text: 'Our kitchen pipe burst on a Sunday morning. Pressed the microphone and said "plumber near me" in Telugu. Within 12 minutes, a verified plumber was at our door.' },
  { name: 'Venkatesh Murthy', role: 'Carpenter Partner', location: 'Guntur, AP', rating: 5, text: 'The satellite map view is genius. When clients drop a pin, I can see their house roof and nearby shop — I never get lost on rural roads. Truly built for our people.' },
];

const workerCategories = [
  { emoji: '⚡', label: 'Electrician' }, { emoji: '🔧', label: 'Plumber' },
  { emoji: '🪚', label: 'Carpenter' }, { emoji: '🎨', label: 'Painter' },
  { emoji: '❄️', label: 'AC Repair' }, { emoji: '🍳', label: 'Cook' },
  { emoji: '🧹', label: 'Cleaner' }, { emoji: '🚖', label: 'Driver' },
];

export default function HiPartnerPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://rkirankumar.com/' },
      { '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://rkirankumar.com/projects' },
      { '@type': 'ListItem', position: 3, name: 'Hi Partner', item: 'https://rkirankumar.com/projects/hi-partner' },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in-up">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Back nav */}
      <Link href="/projects" className="inline-flex items-center text-sm font-semibold text-foreground-muted hover:text-primary transition-colors gap-1.5 mb-10">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Projects</span>
      </Link>

      {/* ── HERO ── */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-primary/12 bg-gradient-to-br from-[#f0fbfd] via-[#fff8f5] to-[#f5feff] dark:from-[#041e23] dark:via-[#062a31] dark:to-[#041e23] mb-16">
        <div className="absolute inset-0 pointer-events-none opacity-50" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,171,205,0.08) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute top-[-30px] right-[-30px] w-72 h-72 rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(0,171,205,0.12)' }} />
        <div className="absolute bottom-[-30px] left-[-30px] w-56 h-56 rounded-full blur-[90px] pointer-events-none" style={{ background: 'rgba(255,85,0,0.08)' }} />

        <div className="relative z-10 p-8 sm:p-14 flex flex-col lg:flex-row gap-12 items-center">
          {/* App icon */}
          <div className="shrink-0">
            <div className="relative w-36 h-36 rounded-[2.5rem] overflow-hidden shadow-2xl ring-4 ring-primary/20" style={{ boxShadow: '0 20px 60px rgba(0,171,205,0.25)' }}>
              <Image src="/assets/project-hipartner.png" alt="Hi Partner App Icon" fill sizes="144px" className="object-cover" priority />
            </div>
          </div>

          {/* Text */}
          <div className="flex-1">
            <div className="section-tag mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Mobile App · ChronoSpark Solutions
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-4">Hi Partner</h1>
            <p className="text-foreground-muted text-base font-light leading-relaxed max-w-2xl mb-8">
              A voice-first hyperlocal services platform connecting everyday skilled workers — electricians, plumbers, carpenters, painters — with customers across Andhra Pradesh. Built for rural and low-literacy users with satellite maps, multilingual voice input, and zero commission.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://play.google.com/store/apps/details?id=com.chronosparksolutions.hi_partner" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, #00abcd, #0087a8)', boxShadow: '0 8px 24px rgba(0,171,205,0.30)' }}>
                <Download className="w-4 h-4" /> Get on Play Store
              </a>
              <a href="https://hipartner.online" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm border-2 transition-all duration-300 hover:scale-105"
                style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
                <Globe className="w-4 h-4" /> Visit Website
              </a>
              <a href="https://g.page/r/CTGoQY-EhkTcEB0/review" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm border-2 border-amber-400/60 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-400/5 transition-all duration-300 hover:scale-105">
                <Star className="w-4 h-4 fill-current" /> Review on Google
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section className="mb-16">
        <div className="mb-10">
          <div className="section-tag mb-4"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Key Features</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Built for real India</h2>
          <p className="text-foreground-muted text-sm mt-2 font-light max-w-xl">Every feature is designed for everyday blue-collar workers and rural citizens who may not be formally educated or fluent in typing.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div key={i} className="group bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:translate-y-[-3px] transition-all duration-300 hover:border-primary/30">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 shrink-0" style={{ background: `${feat.color}18` }}>
                  <Icon className="w-5 h-5" style={{ color: feat.color }} />
                </div>
                <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{feat.title}</h3>
                <p className="text-sm text-foreground-muted font-light leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="mb-16">
        <div className="mb-8">
          <div className="section-tag mb-4"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Tech Stack</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Built with</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {techStack.map((t, i) => (
            <div key={i} className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 hover:border-primary/40 transition-colors">
              <span className="text-sm font-bold text-foreground">{t.name}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white" style={{ background: 'var(--primary)' }}>{t.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── WORKER CATEGORIES ── */}
      <section className="mb-16">
        <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-primary/12 p-8 sm:p-12 bg-gradient-to-br from-[#f0fbfd] via-[#fff8f5] to-[#f5feff] dark:from-[#041e23] dark:via-[#062a31] dark:to-[#041e23]">
          <div className="absolute inset-0 pointer-events-none opacity-40" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,171,205,0.08) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
          <div className="relative z-10">
            <div className="section-tag mb-4"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Worker Categories</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Who is on Hi Partner?</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {workerCategories.map((cat, i) => (
                <div key={i} className="bg-white/60 dark:bg-white/5 border border-border rounded-2xl px-5 py-4 flex items-center gap-3 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200">
                  <span className="text-2xl">{cat.emoji}</span>
                  <span className="font-semibold text-foreground text-sm">{cat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="mb-16">
        <div className="mb-10">
          <div className="section-tag mb-4"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> User Reviews</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">What users say</h2>
          <p className="text-foreground-muted text-sm mt-2 font-light">Real feedback from workers and homeowners across Andhra Pradesh.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-primary/30 hover:translate-y-[-3px] transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: r.rating }).map((_, si) => <Star key={si} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-sm text-foreground-muted font-light leading-relaxed italic">&ldquo;{r.text}&rdquo;</p>
              </div>
              <div className="mt-6 pt-4 border-t border-border/60 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white shrink-0" style={{ background: 'linear-gradient(135deg, #00abcd, #FF5500)' }}>
                  {r.name[0]}
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">{r.name}</div>
                  <div className="text-xs text-foreground-muted">{r.role} · {r.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <a href="https://g.page/r/CTGoQY-EhkTcEB0/review" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border-2 border-amber-400/50 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-400/5 transition-all duration-200">
            <Star className="w-4 h-4 fill-current" /> Leave a Google Review
          </a>
        </div>
      </section>

      {/* ── DOWNLOAD CTA ── */}
      <section>
        <div className="relative rounded-3xl overflow-hidden border border-primary/20 p-8 sm:p-12 text-center" style={{ background: 'linear-gradient(135deg, rgba(0,171,205,0.08) 0%, rgba(255,85,0,0.06) 100%)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,171,205,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
          <div className="relative z-10">
            <div className="w-20 h-20 rounded-[1.5rem] overflow-hidden mx-auto mb-6 shadow-2xl ring-4 ring-primary/20" style={{ boxShadow: '0 16px 48px rgba(0,171,205,0.22)' }}>
              <Image src="/assets/project-hipartner.png" alt="Hi Partner" width={80} height={80} className="object-cover" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Try Hi Partner</h2>
            <p className="text-foreground-muted text-sm font-light max-w-md mx-auto mb-8">Available on Android. Download from the Play Store or visit the website to learn more.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://play.google.com/store/apps/details?id=com.chronosparksolutions.hi_partner" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{ background: 'linear-gradient(135deg, #00abcd, #0087a8)', boxShadow: '0 8px 24px rgba(0,171,205,0.30)' }}>
                <Smartphone className="w-5 h-5" /> Download on Play Store
              </a>
              <a href="https://hipartner.online" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-bold text-sm border-2 transition-all duration-300 hover:scale-105"
                style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
                <ExternalLink className="w-5 h-5" /> Visit hipartner.online
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
