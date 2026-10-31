// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : sitemap.js
// Description : sitemap module.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

import { dbQuery } from '@/lib/db';

export const revalidate = 3600; // Cache for 1 hour

export default async function sitemap() {
  const baseUrl = 'https://rkirankumar.com';
  const today = new Date().toISOString();

  // Static core pages
  const staticPaths = [
    {
      url: `${baseUrl}/`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/faqs`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  const dynamicPaths = [];

  // Dynamic Blog posts — each post gets its own URL
  try {
    const blogs = await dbQuery(
      'SELECT slug, updated_at, created_at FROM blogs WHERE is_published = 1 ORDER BY created_at DESC'
    );
    if (blogs && blogs.length) {
      blogs.forEach((b) => {
        dynamicPaths.push({
          url: `${baseUrl}/blog/${b.slug}`,
          lastModified: new Date(b.updated_at || b.created_at || new Date()).toISOString(),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      });
    } else {
      const fallbackSlugs = [
        'building-high-performance-nextjs-apps',
        'why-tailwind-v4-is-a-game-changer',
        'silent-shift-ai-making-humans-question-worth',
        'overcoming-fear-of-black-box-ai-anxiety',
        'ai-crisis-human-confidence-reclaiming-creativity',
        'rise-autonomous-agents-coping-cognitive-displacement',
        'why-we-fear-what-we-build-superintelligence',
        'nextjs-16-building-lightning-fast-platforms',
        'tailwind-css-v4-css-first-utility-architectures'
      ];
      fallbackSlugs.forEach((slug) => {
        dynamicPaths.push({
          url: `${baseUrl}/blog/${slug}`,
          lastModified: today,
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      });
    }
  } catch (err) {
    console.warn('[Sitemap] Could not load blogs from DB:', err.message);
    // Fallback to known blog slugs
    const fallbackSlugs = [
      'building-high-performance-nextjs-apps',
      'why-tailwind-v4-is-a-game-changer',
      'silent-shift-ai-making-humans-question-worth',
      'overcoming-fear-of-black-box-ai-anxiety',
      'ai-crisis-human-confidence-reclaiming-creativity',
      'rise-autonomous-agents-coping-cognitive-displacement',
      'why-we-fear-what-we-build-superintelligence',
      'nextjs-16-building-lightning-fast-platforms',
      'tailwind-css-v4-css-first-utility-architectures'
    ];
    fallbackSlugs.forEach((slug) => {
      dynamicPaths.push({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: today,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  }

  return [...staticPaths, ...dynamicPaths];
}
