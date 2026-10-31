// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : page.js
// Description : Page component for the contact route.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

import Link from 'next/link';
import ContactForm from './ContactForm';
import { ArrowLeft, Mail, Phone, MapPin, MessageSquare, Star } from 'lucide-react';

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

export const metadata = {
  title: "Contact R Kiran Kumar | Full Stack Developer in Kuppam, Andhra Pradesh",
  description: "Get in touch with R Kiran Kumar (RKK) in Kuppam, Andhra Pradesh. Send project requirements for web applications, MySQL databases, Flutter mobile apps, or React/Next.js development. Call +91-81848-92304 or email kirankumar.3219.rkk@gmail.com.",
  alternates: { canonical: "https://rkirankumar.com/contact" },
  openGraph: {
    type: "website",
    url: "https://rkirankumar.com/contact",
    title: "Contact R Kiran Kumar | Full Stack Developer, Kuppam AP",
    description: "Contact R Kiran Kumar for web development, mobile apps, backend APIs or IT support in Kuppam, Andhra Pradesh. Available via email, phone, WhatsApp, LinkedIn & GitHub.",
    images: [{ url: "/assets/og-image.webp", width: 1200, height: 630, alt: "Contact R Kiran Kumar — Full Stack Developer" }],
    siteName: "R Kiran Kumar — Developer Portfolio",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    site: "@rkirankumar",
    creator: "@rkirankumar",
    title: "Contact R Kiran Kumar | Full Stack Developer, Kuppam",
    description: "Contact R Kiran Kumar for web apps, APIs, Flutter mobile apps. Email, phone, WhatsApp, LinkedIn.",
    images: ["/assets/og-image.webp"],
  },
};

export default function ContactPage() {
  const contacts = [
    {
      label: 'Email Me',
      value: 'kirankumar.3219.rkk@gmail.com',
      href: 'mailto:kirankumar.3219.rkk@gmail.com',
      icon: Mail
    },
    {
      label: 'Call / WhatsApp',
      value: '+91-81848-92304',
      href: 'tel:+918184892304',
      icon: Phone
    },
    {
      label: 'Location',
      value: 'Kuppam, Andhra Pradesh, India',
      href: 'https://maps.google.com/?q=Kuppam,Andhra+Pradesh',
      icon: MapPin
    },
    {
      label: 'LinkedIn Profile',
      value: 'linkedin.com/in/r-kiran-kumar-rkk',
      href: 'https://www.linkedin.com/in/r-kiran-kumar-rkk/',
      icon: Linkedin
    },
    {
      label: 'GitHub Profile',
      value: 'github.com/r-kiran-kumar',
      href: 'https://github.com/r-kiran-kumar/',
      icon: Github
    }
  ];

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": "https://rkirankumar.com/contact#contactpage",
    "name": "Contact R Kiran Kumar",
    "description": "Contact R Kiran Kumar for web development, mobile apps, backend APIs and IT solutions in Kuppam, Andhra Pradesh.",
    "url": "https://rkirankumar.com/contact",
    "inLanguage": "en-IN",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://rkirankumar.com/" },
        { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://rkirankumar.com/contact" }
      ]
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }} />
      {/* Navigation & Title */}
      <div className="space-y-6 mb-12">
        <Link href="/" className="inline-flex items-center text-sm font-semibold text-foreground-muted hover:text-primary transition-colors gap-1.5">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <div>
          <span className="text-xs font-bold text-primary tracking-widest uppercase">Get in touch</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mt-1">Let’s build something together.</h1>
          <p className="text-foreground-muted text-sm mt-1 max-w-xl font-light">
            Have a project description, an application idea, or want to discuss warehousing systems? Fill in the details or contact me directly.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column - Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

        {/* Right Column - Information */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              <span>Contact Coordinates</span>
            </h3>

            <div className="space-y-4">
              {contacts.map((contact, idx) => {
                const Icon = contact.icon;
                return (
                  <div key={idx} className="flex items-start space-x-3.5 group">
                    <div className="w-9 h-9 rounded-lg bg-primary-light flex items-center justify-center text-primary shrink-0 border border-primary/10">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-foreground-muted uppercase tracking-wider">{contact.label}</span>
                      <a
                        href={contact.href}
                        target={contact.href.startsWith('http') ? '_blank' : undefined}
                        rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-sm font-semibold text-foreground hover:text-primary transition-colors mt-0.5 inline-block"
                      >
                        {contact.value}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Business Hours / Local Review Callout */}
          <div className="bg-background-alt border border-border rounded-3xl p-6 md:p-8 space-y-4">
            <h3 className="text-sm font-bold text-foreground">Local Business Reviews</h3>
            <p className="text-foreground-muted text-xs font-light leading-relaxed">
              If you have worked with me or ChronoSpark Solutions in Kuppam, Santhipuram, Gudupalli, or remote development, please share your experience on Google Maps!
            </p>
            <a
              href="https://search.google.com/local/writereview?placeid=ChIJN6TS3ci_rTsRA4CZvqzwPkg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs font-bold text-primary hover:text-primary-accent gap-1.5"
            >
              <span>Write a Google Review</span>
              <Star className="w-3.5 h-3.5 fill-current" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
