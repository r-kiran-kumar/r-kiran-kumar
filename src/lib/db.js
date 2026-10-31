// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : db.js
// Description : db helper module.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

// ============================================================================
// R Kiran Kumar Portfolio & Blog Platform
// File        : db.js
// Description : MySQL connection pool utilizing mysql2 promise client.
//               Supports automated table initialization and admin seeding.
// ============================================================================

import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

let pool;

if (process.env.NODE_ENV === 'production') {
  pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Dev@3219Mysql!',
    database: process.env.DB_NAME || 'rkirankumar',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    waitForConnections: true,
    connectionLimit: 3,
    queueLimit: 0,
  });
} else {
  if (!global.mysqlPool) {
    global.mysqlPool = mysql.createPool({
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'Dev@3219Mysql!',
      database: process.env.DB_NAME || 'rkirankumar',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      waitForConnections: true,
      connectionLimit: 3,
      queueLimit: 0,
    });
  }
  pool = global.mysqlPool;
}

/**
 * Helper to execute a query.
 */
export async function dbQuery(sql, params = []) {
  try {
    const [results] = await pool.query(sql, params);
    return results;
  } catch (error) {
    console.warn('[Database Query Warning]', error.message || error);
    throw error;
  }
}

/**
 * Automate table creation if they do not exist.
 */
export async function initDatabase() {
  try {
    // 1. Users table (admin users)
    await dbQuery(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone_number VARCHAR(50) NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'editor',
        status VARCHAR(50) DEFAULT 'active',
        last_login_at DATETIME NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 2. Enquiries table (Contact form submissions)
    await dbQuery(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id VARCHAR(36) PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone_number VARCHAR(50) NOT NULL,
        message TEXT NOT NULL,
        ip_address VARCHAR(64) NULL,
        status VARCHAR(50) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 3. Projects table
    await dbQuery(`
      CREATE TABLE IF NOT EXISTS projects (
        id VARCHAR(36) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(100) NOT NULL, -- web, backend, mobile, ui
        image_url VARCHAR(500) NULL,
        live_url VARCHAR(500) NULL,
        github_url VARCHAR(500) NULL,
        sort_order INT DEFAULT 0,
        is_published TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_category (category)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 4. Blogs table
    await dbQuery(`
      CREATE TABLE IF NOT EXISTS blogs (
        id VARCHAR(36) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        summary TEXT NOT NULL,
        content TEXT NOT NULL,
        cover_image VARCHAR(500) NULL,
        is_published TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_slug (slug),
        INDEX idx_published (is_published)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 5. Comments table
    await dbQuery(`
      CREATE TABLE IF NOT EXISTS comments (
        id VARCHAR(36) PRIMARY KEY,
        blog_id VARCHAR(36) NOT NULL,
        author_name VARCHAR(255) NOT NULL,
        author_email VARCHAR(255) NOT NULL,
        comment_text TEXT NOT NULL,
        is_approved TINYINT(1) DEFAULT 1, -- auto-approve or moderate
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_blog_id (blog_id),
        INDEX idx_approved (is_approved)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 6. Gallery table
    await dbQuery(`
      CREATE TABLE IF NOT EXISTS gallery (
        id VARCHAR(36) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NULL,
        image_url VARCHAR(500) NOT NULL,
        category VARCHAR(100) DEFAULT 'general',
        sort_order INT DEFAULT 0,
        is_published TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 7. Audit logs table
    await dbQuery(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id VARCHAR(36) PRIMARY KEY,
        user_email VARCHAR(255) NOT NULL,
        action VARCHAR(255) NOT NULL,
        details TEXT NULL,
        ip_address VARCHAR(64) NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 8. Backlinks table
    await dbQuery(`
      CREATE TABLE IF NOT EXISTS backlinks (
        id VARCHAR(36) PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        url VARCHAR(500) NOT NULL,
        relationship VARCHAR(50) DEFAULT 'nofollow',
        category VARCHAR(100) DEFAULT 'partner',
        sort_order INT DEFAULT 99,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 9. Visitors table
    await dbQuery(`
      CREATE TABLE IF NOT EXISTS visitors (
        id VARCHAR(36) PRIMARY KEY,
        device_id VARCHAR(64) UNIQUE NOT NULL,
        ip_address VARCHAR(64) NULL,
        location VARCHAR(255) NULL,
        latitude FLOAT NULL,
        longitude FLOAT NULL,
        user_agent TEXT NULL,
        visit_count INT DEFAULT 1,
        last_visit_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_device_id (device_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Ensure UNIQUE index exists on visitors(device_id) (in case database was created on old schema)
    const visitorsIndexes = await dbQuery("SHOW INDEX FROM visitors WHERE Key_name = 'device_id'");
    if (visitorsIndexes.length === 0) {
      console.log('[Migration] Adding UNIQUE constraint to visitors(device_id)...');
      try {
        // Clean up duplicate device_ids by keeping only the latest/arbitrary one
        await dbQuery(`
          DELETE v1 FROM visitors v1
          INNER JOIN visitors v2 ON v1.device_id = v2.device_id
          WHERE v1.id < v2.id
        `);
        // Add the UNIQUE index/constraint
        await dbQuery('ALTER TABLE visitors ADD UNIQUE (device_id)');
        console.log('[Migration] UNIQUE constraint successfully added.');
      } catch (migrationErr) {
        console.error('[Migration Error] Failed to enforce unique constraint on visitors(device_id):', migrationErr);
      }
    }

    // 10. Visitor Activities table
    await dbQuery(`
      CREATE TABLE IF NOT EXISTS visitor_activities (
        id VARCHAR(36) PRIMARY KEY,
        device_id VARCHAR(64) NOT NULL,
        path VARCHAR(255) NOT NULL,
        referrer VARCHAR(255) NULL,
        user_agent TEXT NULL,
        ip_address VARCHAR(64) NULL,
        duration INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_act_device_id (device_id),
        INDEX idx_act_path (path),
        INDEX idx_act_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 11. Blog Likes table (mapping device_id to blog)
    await dbQuery(`
      CREATE TABLE IF NOT EXISTS blog_likes (
        id VARCHAR(36) PRIMARY KEY,
        blog_id VARCHAR(36) NOT NULL,
        device_id VARCHAR(64) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY uq_blog_device (blog_id, device_id),
        INDEX idx_like_blog_id (blog_id),
        INDEX idx_like_device_id (device_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 12. FAQs table (answering questions and capturing submissions)
    await dbQuery(`
      CREATE TABLE IF NOT EXISTS faqs (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NULL,
        email VARCHAR(255) NULL,
        phone VARCHAR(50) NULL,
        question TEXT NOT NULL,
        answer TEXT NULL,
        is_published TINYINT(1) DEFAULT 0,
        sort_order INT DEFAULT 99,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_faq_published (is_published),
        INDEX idx_faq_sort (sort_order)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    console.log('[Database] All schemas initialized successfully.');

    // Seed default admin if none exists
    const users = await dbQuery('SELECT COUNT(*) as count FROM users');
    if (users[0].count === 0) {
      const adminId = 'rkk-admin-3219-rkirankumar';
      const email = 'kirankumar.3219.rkk@gmail.com';
      const passwordHash = await bcrypt.hash('admin123', 10);
      await dbQuery(`
        INSERT INTO users (id, full_name, email, password_hash, role, status)
        VALUES (?, 'R Kiran Kumar', ?, ?, 'admin', 'active')
      `, [adminId, email, passwordHash]);
      console.log('[Database] Default admin account seeded: ' + email + ' / admin123');
    }

    // Seed mock data if blogs are empty or missing new ones
    const blogCount = await dbQuery('SELECT COUNT(*) as count FROM blogs');
    if (blogCount[0].count === 0) {
      await dbQuery(`
        INSERT INTO blogs (id, title, slug, summary, content, cover_image, is_published)
        VALUES 
        ('blog-1', 'Building High Performance Next.js Apps', 'building-high-performance-nextjs-apps', 
         'Learn how to leverage Next.js App Router, caching, and database pooling to achieve sub-second load times.',
         '### Introduction\\nNext.js provides an incredible developer experience. When combined with a fast MySQL database backend, it can load in milliseconds. In this article, we go over the setup, pooling connections, optimizing images, and deploying with modern SEO guidelines.\\n\\n### Key Steps\\n1. **Use Connection Pools**: Reusing database connections is crucial.\\n2. **Optimize Images**: Use the \`next/image\` component.\\n3. **Leverage Edge Middleware**: Validate user sessions quickly.\\n\\nStay tuned for more updates!',
         '/assets/blog-nextjs.webp', 1),
        ('blog-2', 'Why Tailwind CSS v4 is a Game Changer', 'why-tailwind-v4-is-a-game-changer',
         'A deep dive into the performance improvements, native PostCSS config, and modern styling attributes of Tailwind CSS v4.',
         '### Styling the Future\\nTailwind CSS v4 introduces compiled CSS stylesheets, reducing build times dramatically. It also supports CSS-first configuration, eliminating the need for complex \`tailwind.config.js\` setups.\\n\\nLet\\'s build beautiful, lightning-fast UIs!',
         '/assets/blog-tailwind.webp', 1),
        ('blog-3', 'The Silent Shift: Why AI is Making Humans Question Their Worth', 'silent-shift-ai-making-humans-question-worth',
         'An exploration of how advanced AI agents are causing humans to lose confidence in their cognitive abilities and career longevity.',
         '### Introduction\\nAs artificial intelligence systems leap from simple helpers to autonomous reasoners, a psychological shift is occurring. Humans are no longer just afraid of losing jobs; they are starting to question their own cognitive worth and intellectual uniqueness.\\n\\n### The Roots of AI Anxiety\\nHistorically, automation took over physical labor. Today, generative AI mimics reasoning, writing, and coding—activities central to human self-esteem. When a machine writes a poem or debugs a server in seconds, it triggers a crisis of confidence.\\n\\n### Reclaiming Cognitive Value\\nTo navigate this era, we must focus on human-centric traits: emotional depth, physical execution, context understanding, and moral agency. AI is a tool, not a replacement for human presence.',
         '/assets/blog-silent-shift.webp', 1),
        ('blog-4', 'Overcoming the Fear of the Black Box: Navigating AI Anxiety', 'overcoming-fear-of-black-box-ai-anxiety',
         'A practical guide on how to survive and thrive in the era of artificial intelligence without losing self-worth or career direction.',
         '### Facing the Unknown\\nThe rapid expansion of AI has created a new subset of stress: AI Anxiety. The fear of being replaced or left behind is real, but it is manageable if we change our perspective.\\n\\n### Skills that Matter\\nRather than competing with LLMs in rote memory or speed, humans should double down on creativity, strategic thinking, empathy, and hands-on implementation.\\n\\n### Integration, Not Replacement\\nThe future belongs to the \\'augmented human\\'—those who learn to pair program, co-write, and ideate alongside AI tools while maintaining their own voice.',
         '/assets/blog-ai-anxiety.webp', 1),
        ('blog-5', 'AI and the Crisis of Human Confidence: Can Creativity Be Reclaimed?', 'ai-crisis-human-confidence-reclaiming-creativity',
         'Analyzing the psychological impact of generative models on artists, writers, and developers, and how to reclaim human creative agency.',
         '### The Creative Paradox\\nGenerative AI can create music, art, and poetry instantly. This speed has left many creatives feeling redundant, questioning if their years of training still hold value.\\n\\n### The True Value of Creation\\nWhat AI lacks is personal narrative, lived experiences, and the emotional struggle of creating. The process of art is as valuable as the product.\\n\\n### The Path Forward\\nWe must shift our focus from speed to depth, using AI to automate the mundane while leaving the core creative vision entirely in human hands.',
         '/assets/blog-ai-crisis.webp', 1),
        ('blog-6', 'The Rise of Autonomous Agents: Coping with the Fear of Cognitive Displacement', 'rise-autonomous-agents-coping-cognitive-displacement',
         'How the transition from copilots to fully autonomous agents is shaping public fear and reshaping the future of human intellect.',
         '### Copilot to Autopilot\\nWe are transitioning from tools that assist to agents that execute independently. This raises concerns about human cognitive stagnation.\\n\\n### Understanding the Shift\\nWhen the machine writes, debugs, runs, and monitors code on its own, what is the role of the engineer? It shifts to system architect and problem verifier.\\n\\n### Maintaining Intellectual Sharpness\\nTo combat cognitive displacement, we must continue solving hard logic problems without shortcuts, keeping our core skills strong.',
         '/assets/blog-autonomous-agents.webp', 1),
        ('blog-7', 'Why We Fear What We Build: The Myth and Reality of Superintelligence', 'why-we-fear-what-we-build-superintelligence',
         'Differentiating between irrational existential dread and the realistic safety concerns surrounding modern Large Language Models and AGI.',
         '### Sci-Fi vs. Reality\\nExistential fear of AI often stems from movies. In reality, the risks are immediate: alignment, data privacy, bias, and job displacements.\\n\\n### Unraveling Superintelligence\\nAn artificial superintelligence is not a conscious being with malice; it is a complex optimizer. Alignment is about ensuring its goals match human wellbeing.\\n\\n### Building a Safe Tomorrow\\nBy establishing clear safety boundaries and policy guidelines early, we can benefit from automation while protecting human values.',
         '/assets/blog-superintelligence.webp', 1),
        ('blog-8', 'Next.js 16: Building Lightning-Fast Dynamic Web Platforms', 'nextjs-16-building-lightning-fast-platforms',
         'A developer\'s guide to the new features in Next.js 16, Turbopack integration, Server Components, and optimized rendering strategies.',
         '### Web Tech Shift\\nNext.js 16 brings massive changes, with Turbopack as the default bundler for both development and production compilation.\\n\\n### Key Architectural Updates\\n1. **Turbopack Dev Server**: Sub-second hot module reloading.\\n2. **Enhanced Server Actions**: Seamless secure database mutations from frontend inputs.\\n3. **Streaming Suspense**: Accelerated first contentful paint (FCP).\\n\\n### Performance Benefits\\nBy pairing Next.js 16 with optimized database queries and caching strategies, load times can be cut in half.',
         '/assets/blog-nextjs16.webp', 1),
        ('blog-9', 'Tailwind CSS v4: The Shift to CSS-First Utility Architectures', 'tailwind-css-v4-css-first-utility-architectures',
         'Explaining the PostCSS-free compiler, CSS variables theme integration, and design token optimization in Tailwind\'s latest release.',
         '### The CSS Compiler Evolution\\nTailwind CSS v4 completely removes the need for javascript-based config files. The configuration is now defined directly inside the CSS stylesheet.\\n\\n### Modern Features\\n1. **PostCSS-free Rust Engine**: Builds up to 10x faster.\\n2. **Native CSS Variables Integration**: Fully custom design system tokens declared inside CSS.\\n3. **Improved Container Queries**: Build layouts responsive to element width, not just screen width.\\n\\n### The Next Generation\\nThis release marks the future of styling, bringing utility-first closer to standard CSS.',
         '/assets/blog-tailwind-v4.webp', 1)
      `);

      await dbQuery(`
        INSERT INTO comments (id, blog_id, author_name, author_email, comment_text, is_approved)
        VALUES 
        ('comm-1', 'blog-1', 'Amit Kumar', 'amit@example.com', 'Great write-up! This really helped speed up my landing pages.', 1),
        ('comm-2', 'blog-1', 'Sarah Jenkins', 'sarah@example.com', 'How do you handle connection limits on serverless functions?', 1)
      `);

      console.log('[Database] Seeded initial blog posts and comments.');
    } else {
      const existingBlogs = await dbQuery('SELECT id FROM blogs');
      const existingIds = existingBlogs.map(b => b.id);

      const seedBlogs = [
        ['blog-3', 'The Silent Shift: Why AI is Making Humans Question Their Worth', 'silent-shift-ai-making-humans-question-worth',
          'An exploration of how advanced AI agents are causing humans to lose confidence in their cognitive abilities and career longevity.',
          '### Introduction\\nAs artificial intelligence systems leap from simple helpers to autonomous reasoners, a psychological shift is occurring. Humans are no longer just afraid of losing jobs; they are starting to question their own cognitive worth and intellectual uniqueness.\\n\\n### The Roots of AI Anxiety\\nHistorically, automation took over physical labor. Today, generative AI mimics reasoning, writing, and coding—activities central to human self-esteem. When a machine writes a poem or debugs a server in seconds, it triggers a crisis of confidence.\\n\\n### Reclaiming Cognitive Value\\nTo navigate this era, we must focus on human-centric traits: emotional depth, physical execution, context understanding, and moral agency. AI is a tool, not a replacement for human presence.',
          '/assets/blog-silent-shift.webp', 1],
        ['blog-4', 'Overcoming the Fear of the Black Box: Navigating AI Anxiety', 'overcoming-fear-of-black-box-ai-anxiety',
          'A practical guide on how to survive and thrive in the era of artificial intelligence without losing self-worth or career direction.',
          '### Facing the Unknown\\nThe rapid expansion of AI has created a new subset of stress: AI Anxiety. The fear of being replaced or left behind is real, but it is manageable if we change our perspective.\\n\\n### Skills that Matter\\nRather than competing with LLMs in rote memory or speed, humans should double down on creativity, strategic thinking, empathy, and hands-on implementation.\\n\\n### Integration, Not Replacement\\nThe future belongs to the \'augmented human\'—those who learn to pair program, co-write, and ideate alongside AI tools while maintaining their own voice.',
          '/assets/blog-ai-anxiety.webp', 1],
        ['blog-5', 'AI and the Crisis of Human Confidence: Can Creativity Be Reclaimed?', 'ai-crisis-human-confidence-reclaiming-creativity',
          'Analyzing the psychological impact of generative models on artists, writers, and developers, and how to reclaim human creative agency.',
          '### The Creative Paradox\\nGenerative AI can create music, art, and poetry instantly. This speed has left many creatives feeling redundant, questioning if their years of training still hold value.\\n\\n### The True Value of Creation\\nWhat AI lacks is personal narrative, lived experiences, and the emotional struggle of creating. The process of art is as valuable as the product.\\n\\n### The Path Forward\\nWe must shift our focus from speed to depth, using AI to automate the mundane while leaving the core creative vision entirely in human hands.',
          '/assets/blog-ai-crisis.webp', 1],
        ['blog-6', 'The Rise of Autonomous Agents: Coping with the Fear of Cognitive Displacement', 'rise-autonomous-agents-coping-cognitive-displacement',
          'How the transition from copilots to fully autonomous agents is shaping public fear and reshaping the future of human intellect.',
          '### Copilot to Autopilot\\nWe are transitioning from tools that assist to agents that execute independently. This raises concerns about human cognitive stagnation.\\n\\n### Understanding the Shift\\nWhen the machine writes, debugs, runs, and monitors code on its own, what is the role of the engineer? It shifts to system architect and problem verifier.\\n\\n### Maintaining Intellectual Sharpness\\nTo combat cognitive displacement, we must continue solving hard logic problems without shortcuts, keeping our core skills strong.',
          '/assets/blog-autonomous-agents.webp', 1],
        ['blog-7', 'Why We Fear What We Build: The Myth and Reality of Superintelligence', 'why-we-fear-what-we-build-superintelligence',
          'Differentiating between irrational existential dread and the realistic safety concerns surrounding modern Large Language Models and AGI.',
          '### Sci-Fi vs. Reality\\nExistential fear of AI often stems from movies. In reality, the risks are immediate: alignment, data privacy, bias, and job displacements.\\n\\n### Unraveling Superintelligence\\nAn artificial superintelligence is not a conscious being with malice; it is a complex optimizer. Alignment is about ensuring its goals match human wellbeing.\\n\\n### Building a Safe Tomorrow\\nBy establishing clear safety boundaries and policy guidelines early, we can benefit from automation while protecting human values.',
          '/assets/blog-superintelligence.webp', 1],
        ['blog-8', 'Next.js 16: Building Lightning-Fast Dynamic Web Platforms', 'nextjs-16-building-lightning-fast-platforms',
          'A developer\'s guide to the new features in Next.js 16, Turbopack integration, Server Components, and optimized rendering strategies.',
          '### Web Tech Shift\\nNext.js 16 brings massive changes, with Turbopack as the default bundler for both development and production compilation.\\n\\n### Key Architectural Updates\\n1. **Turbopack Dev Server**: Sub-second hot module reloading.\\n2. **Enhanced Server Actions**: Seamless secure database mutations from frontend inputs.\\n3. **Streaming Suspense**: Accelerated first contentful paint (FCP).\\n\\n### Performance Benefits\\nBy pairing Next.js 16 with optimized database queries and caching strategies, load times can be cut in half.',
          '/assets/blog-nextjs16.webp', 1],
        ['blog-9', 'Tailwind CSS v4: The Shift to CSS-First Utility Architectures', 'tailwind-css-v4-css-first-utility-architectures',
          'Explaining the PostCSS-free compiler, CSS variables theme integration, and design token optimization in Tailwind\'s latest release.',
          '### The CSS Compiler Evolution\\nTailwind CSS v4 completely removes the need for javascript-based config files. The configuration is now defined directly inside the CSS stylesheet.\\n\\n### Modern Features\\n1. **PostCSS-free Rust Engine**: Builds up to 10x faster.\\n2. **Native CSS Variables Integration**: Fully custom design system tokens declared inside CSS.\\n3. **Improved Container Queries**: Build layouts responsive to element width, not just screen width.\\n\\n### The Next Generation\\nThis release marks the future of styling, bringing utility-first closer to standard CSS.',
          '/assets/blog-tailwind-v4.webp', 1]
      ];

      for (const blog of seedBlogs) {
        if (!existingIds.includes(blog[0])) {
          await dbQuery(`
            INSERT INTO blogs (id, title, slug, summary, content, cover_image, is_published)
            VALUES (?, ?, ?, ?, ?, ?, 1)
          `, blog);
          console.log('[Database] Seeded missing blog post: ' + blog[1]);
        }
      }

      // Migrate all existing database cover images from external Unsplash URLs to local clean WebP assets
      await dbQuery("UPDATE blogs SET cover_image = '/assets/blog-silent-shift.webp' WHERE id = 'blog-3'");
      await dbQuery("UPDATE blogs SET cover_image = '/assets/blog-ai-anxiety.webp' WHERE id = 'blog-4'");
      await dbQuery("UPDATE blogs SET cover_image = '/assets/blog-ai-crisis.webp' WHERE id = 'blog-5'");
      await dbQuery("UPDATE blogs SET cover_image = '/assets/blog-autonomous-agents.webp' WHERE id = 'blog-6'");
      await dbQuery("UPDATE blogs SET cover_image = '/assets/blog-superintelligence.webp' WHERE id = 'blog-7'");
      await dbQuery("UPDATE blogs SET cover_image = '/assets/blog-nextjs16.webp' WHERE id = 'blog-8'");
      await dbQuery("UPDATE blogs SET cover_image = '/assets/blog-tailwind-v4.webp' WHERE id = 'blog-9'");
    }

    // Seed mock projects
    const projectCount = await dbQuery('SELECT COUNT(*) as count FROM projects');
    if (projectCount[0].count === 0) {
      await dbQuery(`
        INSERT INTO projects (id, title, description, category, image_url, live_url, github_url, sort_order)
        VALUES
        ('proj-1', 'ChronoSpark Solutions Website', 'A premium Next.js corporate website with Google Review syncing and full applicant tracking systems.', 'web', '/assets/project-chronospark.webp', 'https://chronosparksolutions.com', 'https://github.com/r-kiran-kumar', 10),
        ('proj-2', 'Hi Partner', 'Voice-first hyperlocal services platform connecting skilled workers with customers across Andhra Pradesh. Built with Flutter & Node.js.', 'mobile', '/assets/project-hipartner.png', 'https://hipartner.online', NULL, 20),
        ('proj-3', 'Kuppam Agri-Track', 'Flutter mobile application for farmers in Gudupalli and Santhipuram to list crops and check wholesale prices.', 'mobile', '/assets/project-kuppamapp.webp', NULL, 'https://github.com/r-kiran-kumar', 30)
      `);
      console.log('[Database] Seeded initial projects.');
    }

    // Seed mock gallery images
    const galleryCount = await dbQuery('SELECT COUNT(*) as count FROM gallery');
    if (galleryCount[0].count === 0) {
      await dbQuery(`
        INSERT INTO gallery (id, title, description, image_url, category, sort_order)
        VALUES
        ('gal-1', 'ChronoSpark Office Kuppam', 'Team meeting at the Kuppam headquarters.', '/assets/gallery-office.webp', 'office', 10),
        ('gal-2', 'Kuppam Engineering College Workshop', 'Delivering a full-stack web development seminar.', '/assets/gallery-workshop.webp', 'events', 20),
        ('gal-3', 'UI Design Prototype', 'Figma presentation for a client web app.', '/assets/gallery-design.webp', 'design', 30)
      `);
      console.log('[Database] Seeded initial gallery images.');
    }

    // Seed mock backlinks
    const backlinkCount = await dbQuery('SELECT COUNT(*) as count FROM backlinks');
    if (backlinkCount[0].count === 0) {
      await dbQuery(`
        INSERT INTO backlinks (id, title, url, relationship, category, sort_order)
        VALUES
        ('link-1', 'Digital Kuppam', 'https://digitalkuppam.com', 'dofollow', 'work', 10),
        ('link-2', 'ChronoSpark Solutions', 'https://chronosparksolutions.com', 'dofollow', 'partner', 20),
        ('link-3', 'Developer GitHub Profile', 'https://github.com/r-kiran-kumar', 'dofollow', 'social', 30),
        ('link-4', 'Next.js Documentation', 'https://nextjs.org/docs', 'nofollow', 'other', 40),
        ('link-5', 'Tailwind CSS Reference', 'https://tailwindcss.com', 'nofollow', 'other', 50),
        ('link-6', 'Write Google Review', 'https://search.google.com/local/writereview?placeid=ChIJN6TS3ci_rTsRA4CZvqzwPkg', 'nofollow', 'social', 60)
      `);
      console.log('[Database] Seeded initial backlinks.');
    }

    // Seed default FAQs
    const faqCount = await dbQuery('SELECT COUNT(*) as count FROM faqs');
    if (faqCount[0].count === 0) {
      await dbQuery(`
        INSERT INTO faqs (id, name, email, phone, question, answer, is_published, sort_order)
        VALUES
        ('faq-1', NULL, NULL, NULL, 'What services do you offer?', 'I specialize in full stack web development (Next.js, Node.js, PHP), mobile apps (Flutter), and custom databases/APIs (MySQL, Postgres).', 1, 10),
        ('faq-2', NULL, NULL, NULL, 'Where are you based?', 'I am based in Kuppam, Andhra Pradesh, India, serving both local clients in Chittoor district and global businesses.', 1, 20),
        ('faq-3', NULL, NULL, NULL, 'How can we start a project?', 'You can fill out the contact form on my Contact page, drop an enquiry, or email me directly at kirankumar.3219.rkk@gmail.com.', 1, 30)
      `);
      console.log('[Database] Seeded default FAQs.');
    }

  } catch (err) {
    console.warn('[Database Setup Warning] Could not pre-initialize tables. Check MySQL state.', err.message);
  }
}

// Safely invoke initialization
initDatabase().catch(err => console.warn('Database setup warning:', err.message || err));

export default pool;
