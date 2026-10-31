// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : robots.js
// Description : robots module.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

export default function robots() {
  return {
    rules: [
      // ─── Default: Allow all search crawlers, block private paths ────────
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/login'],
      },
      // ─── Google Images: Allow access to assets ─────────────────────────
      {
        userAgent: 'Googlebot-Image',
        allow: '/assets/',
      },
      // ─── Social Media Preview Bots: Full access for shared link previews 
      {
        userAgent: ['facebookexternalhit', 'LinkedInBot', 'Twitterbot', 'WhatsApp'],
        allow: '/',
      },
    ],
    sitemap: 'https://rkirankumar.com/sitemap.xml',
  };
}

