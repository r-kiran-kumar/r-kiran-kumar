// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : page.js
// Description : Page component for the blog route.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

import { dbQuery } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, User, ArrowRight, MessageSquare, Rss, BookOpen } from 'lucide-react';

export const revalidate = 0; // Dynamic server component

export const metadata = {
  title: "Blog | Technical Insights by R Kiran Kumar — Full Stack Developer, Kuppam",
  description: "Technical articles by R Kiran Kumar on web performance, Next.js App Router, MySQL database pooling, Flutter mobile development, Tailwind CSS, AI integrations, and full stack engineering. Written from Kuppam, Andhra Pradesh.",
  keywords: [
    "R Kiran Kumar blog", "tech blog Kuppam", "Next.js tutorial", "Flutter guide",
    "full stack developer blog India", "MySQL performance", "React development tips",
    "web development articles", "ChronoSpark Solutions blog"
  ],
  alternates: { canonical: "https://rkirankumar.com/blog" },
  openGraph: {
    type: "website",
    url: "https://rkirankumar.com/blog",
    title: "Blog | Technical Insights by R Kiran Kumar",
    description: "Read technical articles on Next.js, MySQL, Flutter, Python, AI integrations and web development by R Kiran Kumar — Full Stack Developer in Kuppam, AP.",
    images: [{ url: "/assets/og-image.webp", width: 1200, height: 630, alt: "R Kiran Kumar — Technical Blog" }],
    siteName: "R Kiran Kumar — Developer Portfolio",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    site: "@rkirankumar",
    creator: "@rkirankumar",
    title: "Tech Blog | R Kiran Kumar — Full Stack Developer",
    description: "Next.js, MySQL, Flutter, Python, AI dev articles by R Kiran Kumar, Full Stack Developer, Kuppam AP.",
    images: ["/assets/og-image.webp"],
  },
};

export default async function BlogListingPage() {
  let blogs = [];

  try {
    blogs = await dbQuery(`
      SELECT b.*, COUNT(c.id) AS comment_count 
      FROM blogs b
      LEFT JOIN comments c ON b.id = c.blog_id AND c.is_approved = 1
      WHERE b.is_published = 1 
      GROUP BY b.id
      ORDER BY b.created_at DESC
    `);
  } catch (error) {
    console.warn('[Database Blogs Load Warning] Fallback data used:', error.message);
    blogs = [
      {
        id: 'blog-1',
        title: 'Building High Performance Next.js Apps',
        slug: 'building-high-performance-nextjs-apps',
        summary: 'Learn how to leverage Next.js App Router, caching, and database pooling to achieve sub-second load times.',
        cover_image: '/assets/blog-nextjs.webp',
        comment_count: 2,
        created_at: new Date().toISOString()
      },
      {
        id: 'blog-2',
        title: 'Why Tailwind CSS v4 is a Game Changer',
        slug: 'why-tailwind-v4-is-a-game-changer',
        summary: 'A deep dive into the performance improvements, native PostCSS config, and modern styling attributes of Tailwind CSS v4.',
        cover_image: '/assets/blog-tailwind.webp',
        comment_count: 0,
        created_at: new Date().toISOString()
      },
      {
        id: 'blog-3',
        title: 'The Silent Shift: Why AI is Making Humans Question Their Worth',
        slug: 'silent-shift-ai-making-humans-question-worth',
        summary: 'An exploration of how advanced AI agents are causing humans to lose confidence in their cognitive abilities and career longevity.',
        cover_image: '/assets/blog-silent-shift.webp',
        comment_count: 0,
        created_at: new Date().toISOString()
      },
      {
        id: 'blog-4',
        title: 'Overcoming the Fear of the Black Box: Navigating AI Anxiety',
        slug: 'overcoming-fear-of-black-box-ai-anxiety',
        summary: 'A practical guide on how to survive and thrive in the era of artificial intelligence without losing self-worth or career direction.',
        cover_image: '/assets/blog-ai-anxiety.webp',
        comment_count: 0,
        created_at: new Date().toISOString()
      },
      {
        id: 'blog-5',
        title: 'AI and the Crisis of Human Confidence: Can Creativity Be Reclaimed?',
        slug: 'ai-crisis-human-confidence-reclaiming-creativity',
        summary: 'Analyzing the psychological impact of generative models on artists, writers, and developers, and how to reclaim human creative agency.',
        cover_image: '/assets/blog-ai-crisis.webp',
        comment_count: 0,
        created_at: new Date().toISOString()
      },
      {
        id: 'blog-6',
        title: 'The Rise of Autonomous Agents: Coping with the Fear of Cognitive Displacement',
        slug: 'rise-autonomous-agents-coping-cognitive-displacement',
        summary: 'How the transition from copilots to fully autonomous agents is shaping public fear and reshaping the future of human intellect.',
        cover_image: '/assets/blog-autonomous-agents.webp',
        comment_count: 0,
        created_at: new Date().toISOString()
      },
      {
        id: 'blog-7',
        title: 'Why We Fear What We Build: The Myth and Reality of Superintelligence',
        slug: 'why-we-fear-what-we-build-superintelligence',
        summary: 'Differentiating between irrational existential dread and the realistic safety concerns surrounding modern Large Language Models and AGI.',
        cover_image: '/assets/blog-superintelligence.webp',
        comment_count: 0,
        created_at: new Date().toISOString()
      },
      {
        id: 'blog-8',
        title: 'Next.js 16: Building Lightning-Fast Dynamic Web Platforms',
        slug: 'nextjs-16-building-lightning-fast-platforms',
        summary: 'A developer\'s guide to the new features in Next.js 16, Turbopack integration, Server Components, and optimized rendering strategies.',
        cover_image: '/assets/blog-nextjs16.webp',
        comment_count: 0,
        created_at: new Date().toISOString()
      },
      {
        id: 'blog-9',
        title: 'Tailwind CSS v4: The Shift to CSS-First Utility Architectures',
        slug: 'tailwind-css-v4-css-first-utility-architectures',
        summary: 'Explaining the PostCSS-free compiler, CSS variables theme integration, and design token optimization in Tailwind\'s latest release.',
        cover_image: '/assets/blog-tailwind-v4.webp',
        comment_count: 0,
        created_at: new Date().toISOString()
      }
    ];
  }

  // JSON-LD structured data
  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://rkirankumar.com/blog#blog",
    "name": "Technical Insights by R Kiran Kumar",
    "description": "Technical articles on web development, mobile apps, AI integrations, and full stack engineering by R Kiran Kumar.",
    "url": "https://rkirankumar.com/blog",
    "author": { "@type": "Person", "@id": "https://rkirankumar.com/#person" },
    "inLanguage": "en-IN",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://rkirankumar.com/" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://rkirankumar.com/blog" }
      ]
    },
    "blogPost": blogs.map((b) => ({
      "@type": "BlogPosting",
      "headline": b.title,
      "description": b.summary,
      "url": `https://rkirankumar.com/blog/${b.slug}`,
      "datePublished": b.created_at ? new Date(b.created_at).toISOString() : new Date().toISOString(),
      "author": { "@type": "Person", "name": "R Kiran Kumar" }
    }))
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in-up">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }} />

      {/* Page Header */}
      <div className="space-y-6 mb-14">
        <Link href="/" className="inline-flex items-center text-sm font-semibold text-foreground-muted hover:text-primary transition-colors gap-1.5">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-primary tracking-widest uppercase">Writing</span>
              <span className="ai-badge">
                <Rss className="w-2.5 h-2.5" />
                Dev Articles
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">Technical Insights & Articles</h1>
            <p className="text-foreground-muted text-sm mt-2 max-w-xl font-light leading-relaxed">
              Thoughts, guides, and lessons learned from building with Next.js, MySQL, Flutter, AI APIs, and Tailwind — direct from Kuppam, AP.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-foreground-muted shrink-0">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="font-semibold">{blogs.length} {blogs.length === 1 ? 'Article' : 'Articles'} Published</span>
          </div>
        </div>

        {/* Accent gradient bar */}
        <div className="h-[2px] w-full bg-gradient-to-r from-logo-orange/60 via-primary to-transparent rounded-full" />
      </div>

      {/* Blogs Grid */}
      {blogs.length === 0 ? (
        <div className="text-center py-20 bg-gradient-to-br from-card to-background-alt border border-border rounded-3xl">
          <BookOpen className="w-10 h-10 text-foreground-muted mx-auto mb-3 opacity-40" />
          <p className="text-foreground-muted text-sm font-medium">No articles published yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {blogs.map((blog, idx) => (
            <article
              key={blog.id}
              className="bg-gradient-to-br from-card to-background-alt border border-border rounded-2xl overflow-hidden shadow-sm card-hover flex flex-col group"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
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
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-foreground-muted">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-primary/70" />
                      <span>{new Date(blog.created_at).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-primary/70" />
                      <span>R Kiran Kumar</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-primary/70" />
                      <span>{blog.comment_count || 0} {blog.comment_count === 1 ? 'Comment' : 'Comments'}</span>
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                    <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                  </h2>

                  <p className="text-foreground-muted text-sm font-light leading-relaxed">
                    {blog.summary}
                  </p>
                </div>

                <div className="border-t border-border/60 mt-6 pt-4">
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-hover group-hover:translate-x-1 transition-all duration-200"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
