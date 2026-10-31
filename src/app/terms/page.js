// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : page.js
// Description : Page component for the terms route.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

import Link from 'next/link';
import { ArrowLeft, CheckCircle, HelpCircle, FileText, Scale } from 'lucide-react';

export const metadata = {
  title: 'Terms & Conditions | R Kiran Kumar — Full Stack Developer, Kuppam',
  description: 'Terms of Service for R Kiran Kumar and ChronoSpark Solutions. Read before engaging our software development, mobile apps, or database services under Indian law.',
  keywords: ['terms of service', 'terms and conditions', 'service agreement', 'R Kiran Kumar', 'ChronoSpark Solutions', 'Kuppam'],
  alternates: { canonical: 'https://rkirankumar.com/terms' },
  openGraph: {
    type: 'website',
    url: 'https://rkirankumar.com/terms',
    title: 'Terms & Conditions | R Kiran Kumar',
    description: 'Terms of Service for R Kiran Kumar and ChronoSpark Solutions — covers software development agreements, usage policies, and Indian law.',
    images: [{ url: '/assets/og-image.webp', width: 1200, height: 630, alt: 'R Kiran Kumar — Terms & Conditions' }],
    siteName: 'R Kiran Kumar — Developer Portfolio',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary',
    site: '@rkirankumar',
    creator: '@rkirankumar',
    title: 'Terms & Conditions | R Kiran Kumar',
    description: 'Terms of Service for R Kiran Kumar and ChronoSpark Solutions, Kuppam AP.',
  },
};

export default function TermsPage() {
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
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight mt-2">Terms & Conditions</h1>
          <p className="text-slate-500 text-sm mt-1">Last Updated: July 4, 2026</p>
        </div>

        <div className="prose prose-slate max-w-none text-slate-600 font-light text-base leading-relaxed space-y-6">
          <p>
            Welcome to the terms of service for <strong>R Kiran Kumar</strong> and <strong>ChronoSpark Solutions</strong> (“we”, “us”, “our”). These Terms govern your use of this portfolio website (<strong>rkirankumar.com</strong>) and our software consulting, development, and support services.
          </p>

          <h2 className="text-xl font-bold text-slate-800 pt-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span>1. Scope of Engagement</span>
          </h2>
          <p>
            We offer full-stack web development (React, Next.js, Laravel, WordPress), backend services (Node.js, Python, Django, MySQL, API design), mobile app development (Flutter), and technical support/networking services in Kuppam and surrounding regions. Exact project scope, milestones, pricing, and deadlines will be defined in a mutually signed project agreement or Statement of Work (SOW).
          </p>

          <h2 className="text-xl font-bold text-slate-800 pt-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <span>2. Payments & Milestone Billing</span>
          </h2>
          <p>
            Our project billing operates on milestones:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>A minimum kickoff deposit of 30-50% is required before starting development work.</li>
            <li>Remaining payments are linked to agreed milestones (e.g., design completion, beta testing, final code handover).</li>
            <li>Invoices are due within 7 days of issuance. Late payments may result in immediate work suspension.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-800 pt-4 flex items-center gap-2">
            <Scale className="w-5 h-5 text-primary" />
            <span>3. Intellectual Property Rights</span>
          </h2>
          <p>
            Upon receiving full payment for completed works, the Client holds all copyright and ownership rights for the custom Deliverables, source code, and design assets developed specifically for that project under Section 17 and 19 of the <strong>Indian Copyright Act, 1957</strong>. Pre-existing code frameworks, boilerplates, or libraries remain our property, but the Client is granted a lifetime royalty-free license to use them.
          </p>

          <h2 className="text-xl font-bold text-slate-800 pt-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary" />
            <span>4. Disclaimers & Warranties</span>
          </h2>
          <p>
            We provide a <strong>30-day post-delivery bug-fixing warranty</strong>. We guarantee our custom code is written to technical specifications. We do not guarantee specific rankings, website conversion rates, or traffic volumes. We are not liable for issues resulting from client modifications, external third-party API changes, or host server downtime.
          </p>

          <h2 className="text-xl font-bold text-slate-800 pt-4">5. Governing Law & Dispute Resolution</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the **Republic of India** (specifically Chittoor District jurisdiction, Andhra Pradesh, India). Any dispute that cannot be resolved amicably through negotiation will be submitted to binding arbitration in Kuppam, AP under the <strong>Arbitration and Conciliation Act, 1996</strong>.
          </p>

          <h2 className="text-xl font-bold text-slate-800 pt-4">6. Legal & Notice Contact</h2>
          <p>
            All formal notices or general questions should be sent to:
          </p>
          <p className="font-semibold text-slate-800">
            R Kiran Kumar / ChronoSpark Solutions<br />
            Email: <a href="mailto:kirankumar.3219.rkk@gmail.com" className="text-primary hover:underline">kirankumar.3219.rkk@gmail.com</a><br />
            Phone: +91-81848-92304<br />
            Address: Kuppam, Chittoor District, Andhra Pradesh, India — 517425
          </p>
        </div>
      </div>
    </div>
  );
}
