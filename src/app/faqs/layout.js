// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : layout.js
// Description : Layout for the faqs route.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

export const metadata = {
  title: "Frequently Asked Questions (FAQs) | R Kiran Kumar — Full Stack Developer, Kuppam",
  description: "Get answers to common questions about engaging R Kiran Kumar and ChronoSpark Solutions for full stack web development, Flutter mobile apps, database designs, and custom IT services in Kuppam, Andhra Pradesh.",
  alternates: { canonical: "https://rkirankumar.com/faqs" },
  openGraph: {
    type: "website",
    url: "https://rkirankumar.com/faqs",
    title: "Frequently Asked Questions (FAQs) | R Kiran Kumar — Full Stack Developer, Kuppam AP",
    description: "Get answers to questions about hiring R Kiran Kumar, software development services, project timelines, pricing, and custom IT solutions in Kuppam.",
    images: [{ url: "/assets/og-image.webp", width: 1200, height: 630, alt: "FAQs — R Kiran Kumar" }],
    siteName: "R Kiran Kumar — Developer Portfolio",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    site: "@rkirankumar",
    creator: "@rkirankumar",
    title: "FAQs | R Kiran Kumar — Full Stack Developer",
    description: "Questions and answers about IT software development and Flutter services in Kuppam, AP.",
    images: ["/assets/og-image.webp"],
  },
};

export default function FAQsLayout({ children }) {
  return children;
}
