// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : page.js
// Description : Page component for the blog/[slug] route.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

import { dbQuery } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import BlogInteractions from './BlogInteractions';
import CommentsSection from './CommentsSection';

export const revalidate = 0;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const baseUrl = 'https://rkirankumar.com';
  try {
    const blogs = await dbQuery('SELECT title, summary, cover_image, created_at FROM blogs WHERE slug = ? AND is_published = 1', [slug]);
    if (blogs.length > 0) {
      const blog = blogs[0];
      return {
        title: `${blog.title} | R Kiran Kumar Blog`,
        description: blog.summary || `Read '${blog.title}' — a technical article by R Kiran Kumar, Full Stack Developer in Kuppam, Andhra Pradesh.`,
        alternates: { canonical: `${baseUrl}/blog/${slug}` },
        openGraph: {
          type: 'article',
          url: `${baseUrl}/blog/${slug}`,
          title: `${blog.title} | R Kiran Kumar Blog`,
          description: blog.summary,
          images: blog.cover_image
            ? [{ url: blog.cover_image, width: 1200, height: 630, alt: blog.title }]
            : [{ url: `${baseUrl}/assets/og-image.webp`, width: 1200, height: 630, alt: 'R Kiran Kumar Blog' }],
          siteName: 'R Kiran Kumar — Developer Portfolio',
          locale: 'en_IN',
          publishedTime: blog.created_at ? new Date(blog.created_at).toISOString() : undefined,
          authors: [`${baseUrl}/about`],
        },
        twitter: {
          card: 'summary_large_image',
          site: '@rkirankumar',
          creator: '@rkirankumar',
          title: `${blog.title} | R Kiran Kumar`,
          description: blog.summary,
          images: blog.cover_image ? [blog.cover_image] : [`${baseUrl}/assets/og-image.webp`],
        },
      };
    }
  } catch {}
  return {
    title: 'Blog Article | R Kiran Kumar',
    description: "Read the latest technical article on R Kiran Kumar's developer blog.",
    alternates: { canonical: `https://rkirankumar.com/blog/${slug}` },
  };
}

export default async function BlogDetailsPage({ params }) {
  const { slug } = await params;
  let blog = null;
  let comments = [];

  try {
    const blogs = await dbQuery('SELECT * FROM blogs WHERE slug = ? AND is_published = 1', [slug]);
    if (!blogs.length) return notFound();
    blog = blogs[0];
    comments = await dbQuery(
      'SELECT id, blog_id, author_name, comment_text, image_url, created_at FROM comments WHERE blog_id = ? AND is_approved = 1 ORDER BY created_at ASC',
      [blog.id]
    );
  } catch (error) {
    console.warn('[Blog DB Warning]', error.message);
    const fallbacks = {
      'building-high-performance-nextjs-apps': {
        id: 'blog-1', title: 'Building High Performance Next.js Apps', slug,
        summary: 'Learn how to leverage Next.js App Router, caching, and database pooling.',
        content: '### Introduction\nNext.js provides an incredible developer experience. When combined with a fast MySQL database backend, it loads in milliseconds.\n\n### Key Steps\n1. **Use Connection Pools**: Reusing connections is crucial.\n2. **Optimize Images**: Use the `next/image` component.\n3. **Leverage Edge Middleware**: Validate user sessions quickly.',
        cover_image: '/assets/blog-nextjs.webp', likes: 0, created_at: new Date().toISOString()
      },
      'why-tailwind-v4-is-a-game-changer': {
        id: 'blog-2', title: 'Why Tailwind CSS v4 is a Game Changer', slug,
        summary: 'A deep dive into the performance improvements of Tailwind CSS v4.',
        content: '### Styling the Future\nTailwind CSS v4 introduces compiled CSS stylesheets, reducing build times dramatically.\n\nIt supports CSS-first configuration, eliminating the need for complex config setups.',
        cover_image: '/assets/blog-tailwind.webp', likes: 0, created_at: new Date().toISOString()
      },
      'silent-shift-ai-making-humans-question-worth': {
        id: 'blog-3', title: 'The Silent Shift: Why AI is Making Humans Question Their Worth', slug,
        summary: 'An exploration of how advanced AI agents are causing humans to lose confidence in their cognitive abilities and career longevity.',
        content: '### Introduction\nAs artificial intelligence systems leap from simple helpers to autonomous reasoners, a psychological shift is occurring. Humans are no longer just afraid of losing jobs; they are starting to question their own cognitive worth and intellectual uniqueness.\n\n### The Roots of AI Anxiety\nHistorically, automation took over physical labor. Today, generative AI mimics reasoning, writing, and coding—activities central to human self-esteem. When a machine writes a poem or debugs a server in seconds, it triggers a crisis of confidence.\n\n### Reclaiming Cognitive Value\nTo navigate this era, we must focus on human-centric traits: emotional depth, physical execution, context understanding, and moral agency. AI is a tool, not a replacement for human presence.',
        cover_image: '/assets/blog-silent-shift.webp', likes: 0, created_at: new Date().toISOString()
      },
      'overcoming-fear-of-black-box-ai-anxiety': {
        id: 'blog-4', title: 'Overcoming the Fear of the Black Box: Navigating AI Anxiety', slug,
        summary: 'A practical guide on how to survive and thrive in the era of artificial intelligence without losing self-worth or career direction.',
        content: '### Facing the Unknown\nThe rapid expansion of AI has created a new subset of stress: AI Anxiety. The fear of being replaced or left behind is real, but it is manageable if we change our perspective.\n\n### Skills that Matter\nRather than competing with LLMs in rote memory or speed, humans should double down on creativity, strategic thinking, empathy, and hands-on implementation.\n\n### Integration, Not Replacement\nThe future belongs to the \'augmented human\'—those who learn to pair program, co-write, and ideate alongside AI tools while maintaining their own voice.',
        cover_image: '/assets/blog-ai-anxiety.webp', likes: 0, created_at: new Date().toISOString()
      },
      'ai-crisis-human-confidence-reclaiming-creativity': {
        id: 'blog-5', title: 'AI and the Crisis of Human Confidence: Can Creativity Be Reclaimed?', slug,
        summary: 'Analyzing the psychological impact of generative models on artists, writers, and developers, and how to reclaim human creative agency.',
        content: '### The Creative Paradox\nGenerative AI can create music, art, and poetry instantly. This speed has left many creatives feeling redundant, questioning if their years of training still hold value.\n\n### The True Value of Creation\nWhat AI lacks is personal narrative, lived experiences, and the emotional struggle of creating. The process of art is as valuable as the product.\n\n### The Path Forward\nWe must shift our focus from speed to depth, using AI to automate the mundane while leaving the core creative vision entirely in human hands.',
        cover_image: '/assets/blog-ai-crisis.webp', likes: 0, created_at: new Date().toISOString()
      },
      'rise-autonomous-agents-coping-cognitive-displacement': {
        id: 'blog-6', title: 'The Rise of Autonomous Agents: Coping with the Fear of Cognitive Displacement', slug,
        summary: 'How the transition from copilots to fully autonomous agents is shaping public fear and reshaping the future of human intellect.',
        content: '### Copilot to Autopilot\nWe are transitioning from tools that assist to agents that execute independently. This raises concerns about human cognitive stagnation.\n\n### Understanding the Shift\nWhen the machine writes, debugs, runs, and monitors code on its own, what is the role of the engineer? It shifts to system architect and problem verifier.\n\n### Maintaining Intellectual Sharpness\nTo combat cognitive displacement, we must continue solving hard logic problems without shortcuts, keeping our core skills strong.',
        cover_image: '/assets/blog-autonomous-agents.webp', likes: 0, created_at: new Date().toISOString()
      },
      'why-we-fear-what-we-build-superintelligence': {
        id: 'blog-7', title: 'Why We Fear What We Build: The Myth and Reality of Superintelligence', slug,
        summary: 'Differentiating between irrational existential dread and the realistic safety concerns surrounding modern Large Language Models and AGI.',
        content: '### Sci-Fi vs. Reality\nExistential fear of AI often stems from movies. In reality, the risks are immediate: alignment, data privacy, bias, and job displacements.\n\n### Unraveling Superintelligence\nAn artificial superintelligence is not a conscious being with malice; it is a complex optimizer. Alignment is about ensuring its goals match human wellbeing.\n\n### Building a Safe Tomorrow\nBy establishing clear safety boundaries and policy guidelines early, we can benefit from automation while protecting human values.',
        cover_image: '/assets/blog-superintelligence.webp', likes: 0, created_at: new Date().toISOString()
      },
      'nextjs-16-building-lightning-fast-platforms': {
        id: 'blog-8', title: 'Next.js 16: Building Lightning-Fast Dynamic Web Platforms', slug,
        summary: 'A developer\'s guide to the new features in Next.js 16, Turbopack integration, Server Components, and optimized rendering strategies.',
        content: '### Web Tech Shift\nNext.js 16 brings massive changes, with Turbopack as the default bundler for both development and production compilation.\n\n### Key Architectural Updates\n1. **Turbopack Dev Server**: Sub-second hot module reloading.\n2. **Enhanced Server Actions**: Seamless secure database mutations from frontend inputs.\n3. **Streaming Suspense**: Accelerated first contentful paint (FCP).\n\n### Performance Benefits\nBy pairing Next.js 16 with optimized database queries and caching strategies, load times can be cut in half.',
        cover_image: '/assets/blog-nextjs16.webp', likes: 0, created_at: new Date().toISOString()
      },
      'tailwind-css-v4-css-first-utility-architectures': {
        id: 'blog-9', title: 'Tailwind CSS v4: The Shift to CSS-First Utility Architectures', slug,
        summary: 'Explaining the PostCSS-free compiler, CSS variables theme integration, and design token optimization in Tailwind\'s latest release.',
        content: '### The CSS Compiler Evolution\nTailwind CSS v4 completely removes the need for javascript-based config files. The configuration is now defined directly inside the CSS stylesheet.\n\n### Modern Features\n1. **PostCSS-free Rust Engine**: Builds up to 10x faster.\n2. **Native CSS Variables Integration**: Fully custom design system tokens declared inside CSS.\n3. **Improved Container Queries**: Build layouts responsive to element width, not just screen width.\n\n### The Next Generation\nThis release marks the future of styling, bringing utility-first closer to standard CSS.',
        cover_image: '/assets/blog-tailwind-v4.webp', likes: 0, created_at: new Date().toISOString()
      }
    };
    if (fallbacks[slug]) { blog = fallbacks[slug]; comments = []; }
    else return notFound();
  }

  // Simple Markdown renderer
  const renderContent = (text) =>
    text.split('\n\n').map((para, i) => {
      if (para.startsWith('### ')) return (
        <h3 key={i} className="text-xl font-bold mt-8 mb-3" style={{ color: 'var(--foreground)' }}>
          {para.replace('### ', '')}
        </h3>
      );
      if (/^\d+\. /.test(para)) return (
        <p key={i} className="pl-4 text-sm italic py-1" style={{ borderLeft: '3px solid var(--primary)', color: 'var(--foreground-muted)' }}>
          {para}
        </p>
      );
      // Bold inline
      const boldParsed = para.split(/(\*\*[^*]+\*\*)/).map((chunk, j) =>
        chunk.startsWith('**') ? <strong key={j} style={{ color: 'var(--foreground)' }}>{chunk.replace(/\*\*/g, '')}</strong> : chunk
      );
      return <p key={i} className="leading-relaxed mb-4 text-sm sm:text-base" style={{ color: 'var(--foreground-muted)' }}>{boldParsed}</p>;
    });

  // ─── JSON-LD for this Article ──────────────────────────────────────────────
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://rkirankumar.com/blog/${blog.slug}#article`,
    "headline": blog.title,
    "description": blog.summary,
    "url": `https://rkirankumar.com/blog/${blog.slug}`,
    "inLanguage": "en-IN",
    "datePublished": blog.created_at ? new Date(blog.created_at).toISOString() : new Date().toISOString(),
    "dateModified": blog.updated_at ? new Date(blog.updated_at).toISOString() : new Date().toISOString(),
    "image": blog.cover_image ? { "@type": "ImageObject", "url": blog.cover_image } : { "@type": "ImageObject", "url": "https://rkirankumar.com/assets/og-image.webp" },
    "author": {
      "@type": "Person",
      "@id": "https://rkirankumar.com/#person",
      "name": "R Kiran Kumar",
      "url": "https://rkirankumar.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://rkirankumar.com/#chronospark",
      "name": "ChronoSpark Solutions",
      "logo": { "@type": "ImageObject", "url": "https://rkirankumar.com/assets/chronosparksolutions-logo.webp" }
    },
    "isPartOf": { "@type": "Blog", "@id": "https://rkirankumar.com/blog", "name": "R Kiran Kumar Blog" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://rkirankumar.com/" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://rkirankumar.com/blog" },
        { "@type": "ListItem", "position": 3, "name": blog.title, "item": `https://rkirankumar.com/blog/${blog.slug}` }
      ]
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* JSON-LD Article Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {/* Back */}
      <div className="mb-8">
        <Link href="/blog" className="inline-flex items-center text-sm font-semibold hover:text-primary transition-colors gap-1.5"
          style={{ color: 'var(--foreground-muted)' }}>
          <ArrowLeft className="w-4 h-4" /> Back to Articles
        </Link>
      </div>

      <article>
        {/* Cover Image */}
        {blog.cover_image && (
          <div className="relative h-56 sm:h-72 lg:h-80 w-full rounded-2xl overflow-hidden mb-8 shadow-md">
            <Image src={blog.cover_image} alt={blog.title} fill sizes="(max-width: 768px) 100vw, 896px" className="object-cover" unoptimized />
          </div>
        )}

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-xs mb-4" style={{ color: 'var(--foreground-muted)' }}>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(blog.created_at).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
          </span>
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5" /> By R Kiran Kumar
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4" style={{ color: 'var(--foreground)' }}>
          {blog.title}
        </h1>

        {/* Summary */}
        <p className="text-base sm:text-lg font-light italic leading-relaxed mb-8 pl-4 py-1"
          style={{ color: 'var(--foreground-muted)', borderLeft: '4px solid var(--primary)' }}>
          {blog.summary}
        </p>

        {/* Like + Share bar */}
        <BlogInteractions slug={blog.slug} initialLikes={blog.likes || 0} />

        {/* Content */}
        <div className="py-8 border-t mt-8 space-y-4" style={{ borderColor: 'var(--card-border)' }}>
          {renderContent(blog.content)}
        </div>
      </article>

      {/* Like bar (bottom too) */}
      <BlogInteractions slug={blog.slug} initialLikes={blog.likes || 0} bottom />

      {/* Comments */}
      <div className="mt-12">
        <CommentsSection blogId={blog.id} slug={blog.slug} initialComments={comments} />
      </div>
    </div>
  );
}
