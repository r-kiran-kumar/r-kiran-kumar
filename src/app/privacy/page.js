// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : page.js
// Description : Page component for the privacy route.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

import Link from 'next/link';
import { ArrowLeft, Shield, Eye, Database, Lock, Globe } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | R Kiran Kumar — Full Stack Developer, Kuppam',
  description: 'Read the Privacy Policy of R Kiran Kumar and ChronoSpark Solutions. Explains how we collect, process, and protect data under India\'s DPDPA 2023 and GDPR.',
  keywords: ['privacy policy', 'data protection', 'DPDPA 2023', 'GDPR', 'R Kiran Kumar', 'ChronoSpark Solutions'],
  alternates: { canonical: 'https://rkirankumar.com/privacy' },
  openGraph: {
    type: 'website',
    url: 'https://rkirankumar.com/privacy',
    title: 'Privacy Policy | R Kiran Kumar',
    description: 'Read the Privacy Policy of R Kiran Kumar and ChronoSpark Solutions — data handling, cookie usage, DPDPA 2023 and GDPR compliance.',
    images: [{ url: '/assets/og-image.webp', width: 1200, height: 630, alt: 'R Kiran Kumar — Privacy Policy' }],
    siteName: 'R Kiran Kumar — Developer Portfolio',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary',
    site: '@rkirankumar',
    creator: '@rkirankumar',
    title: 'Privacy Policy | R Kiran Kumar',
    description: 'Privacy Policy of R Kiran Kumar and ChronoSpark Solutions, Kuppam AP.',
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Back Link */}
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-primary transition-colors gap-1.5">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="space-y-8">
        <div>
          <span className="text-xs font-bold text-primary tracking-widest uppercase">Legal</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight mt-2">Privacy Policy</h1>
          <p className="text-slate-500 text-sm mt-1">Last Updated: July 4, 2026</p>
        </div>

        <div className="prose prose-slate max-w-none text-slate-600 font-light text-base leading-relaxed space-y-6">
          <p>
            This Privacy Policy describes how <strong>R Kiran Kumar</strong> (referred to as “I”, “me”, “my”, “Developer”) and my agency <strong>ChronoSpark Solutions</strong> (“we”, “us”, or “our”) collect, use, process, and protect your data when you visit this website (<strong>rkirankumar.com</strong>) or engage us for software development, database design, mobile apps, or technical services.
          </p>

          <h2 className="text-xl font-bold text-slate-800 pt-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span>1. Information We Collect</span>
          </h2>
          <p>
            We collect information that you voluntarily provide to us when you fill in forms, submit enquiries, send emails, or communicate with us directly:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Personal Contact Information:</strong> Name, email address, phone number, and physical/business location.</li>
            <li><strong>Service Enquiries:</strong> Project plans, requirements, technical specifications, and general messages.</li>
            <li><strong>Analytical Tracking:</strong> Device ID, IP address, geographical location (country/city derived from IP), operating system, browser type, and navigation paths.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-800 pt-4 flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" />
            <span>2. How We Use Your Information</span>
          </h2>
          <p>
            We use the collected information for various lawful purposes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To respond to your contact requests, schedule consultations, and quote project budgets.</li>
            <li>To track site analytics (unique visitors, page views, session durations) to optimize website performance and responsiveness.</li>
            <li>To detect and prevent unauthorized access or hacking attempts to protect the integrity of our software and client databases.</li>
            <li>To comply with applicable tax, legal, and financial laws in Andhra Pradesh, India.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-800 pt-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            <span>3. Data Storage & Retention</span>
          </h2>
          <p>
            We retain personal data only for as long as necessary. Project enquiries are retained for up to 2 years, while financial and tax records for active software contracts are kept for 7 years per Indian tax guidelines. Visitor logs are stored temporarily and anonymized within 26 months.
          </p>

          <h2 className="text-xl font-bold text-slate-800 pt-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            <span>4. Security Protocols</span>
          </h2>
          <p>
            We enforce reasonable security practices to protect personal information from unauthorized access. Our site uses SSL/TLS encryption. Databases are secured behind strict connection pools with JWT token validation. However, no transmission over the internet is completely secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-xl font-bold text-slate-800 pt-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            <span>5. International Compliance</span>
          </h2>
          <p>
            We are based in Kuppam, Andhra Pradesh, India. Our data processing aligns with the <strong>Digital Personal Data Protection Act, 2023 (DPDPA)</strong>. For international visitors, we respect GDPR and CCPA guidelines regarding access, correction, erasure, and consent withdrawal.
          </p>

          <h2 className="text-xl font-bold text-slate-800 pt-4">6. Contact & Grievance</h2>
          <p>
            If you have questions, would like to request erasure of your data, or withdraw consent, please contact:
          </p>
          <p className="font-semibold text-slate-800">
            R Kiran Kumar / Grievance Officer<br />
            Email: <a href="mailto:kirankumar.3219.rkk@gmail.com" className="text-primary hover:underline">kirankumar.3219.rkk@gmail.com</a><br />
            Phone/WhatsApp: +91-81848-92304<br />
            Kuppam, Andhra Pradesh, India — 517425
          </p>
        </div>
      </div>
    </div>
  );
}
