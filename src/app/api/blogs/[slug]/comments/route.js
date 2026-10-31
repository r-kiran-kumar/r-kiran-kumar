// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : route.js
// Description : API route handler for /api/blogs/[slug]/comments.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

import { dbQuery } from '@/lib/db';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Fetch approved comments for a specific blog post
export async function GET(request, { params }) {
  const { slug } = await params;
  try {
    const blogs = await dbQuery('SELECT id FROM blogs WHERE slug = ? AND is_published = 1', [slug]);
    if (!blogs.length) {
      return NextResponse.json({ success: false, message: 'Blog not found.' }, { status: 404 });
    }

    const comments = await dbQuery(
      'SELECT id, blog_id, author_name, comment_text, image_url, created_at FROM comments WHERE blog_id = ? AND is_approved = 1 ORDER BY created_at ASC',
      [blogs[0].id]
    );

    return NextResponse.json({ success: true, comments });
  } catch (error) {
    console.error('[Comments GET]', error);
    return NextResponse.json({ success: false, message: 'Server error.' }, { status: 500 });
  }
}

async function ensureCommentSchema() {
  try {
    await dbQuery('ALTER TABLE comments ADD COLUMN device_id VARCHAR(64) NULL');
    await dbQuery('ALTER TABLE comments ADD COLUMN location VARCHAR(255) NULL');
  } catch (e) {
    // Columns already exist
  }
}

// Post a new comment (open — no login required)
export async function POST(request, { params }) {
  const { slug } = await params;
  try {
    await ensureCommentSchema();
    const { name, email, text, image_url, deviceId } = await request.json();

    if (!name?.trim() || !text?.trim()) {
      return NextResponse.json({ success: false, message: 'Name and comment are required.' }, { status: 400 });
    }
    if (name.trim().length > 100) {
      return NextResponse.json({ success: false, message: 'Name too long (max 100 chars).' }, { status: 400 });
    }
    if (text.trim().length > 3000) {
      return NextResponse.json({ success: false, message: 'Comment too long (max 3000 chars).' }, { status: 400 });
    }

    // Validate image URL if provided
    let safeImageUrl = null;
    if (image_url?.trim()) {
      try {
        const url = new URL(image_url.trim());
        if (url.protocol === 'https:') safeImageUrl = url.href;
      } catch {
        // Invalid URL — ignore image
      }
    }

    // Find blog by slug
    const blogs = await dbQuery('SELECT id FROM blogs WHERE slug = ? AND is_published = 1', [slug]);
    if (!blogs.length) {
      return NextResponse.json({ success: false, message: 'Blog not found.' }, { status: 404 });
    }

    const commentId = crypto.randomUUID();
    const createdAt = new Date();

    // Lookup visitor location if deviceId is provided
    let locationStr = null;
    if (deviceId) {
      const visitors = await dbQuery('SELECT latitude, longitude, location FROM visitors WHERE device_id = ?', [deviceId]);
      if (visitors.length > 0) {
        const v = visitors[0];
        if (v.latitude && v.longitude) {
          locationStr = `Coords: ${v.latitude}, ${v.longitude}`;
        } else if (v.location) {
          locationStr = v.location;
        }
      }
    }

    await dbQuery(
      'INSERT INTO comments (id, blog_id, author_name, author_email, comment_text, image_url, is_approved, created_at, device_id, location) VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?, ?)',
      [commentId, blogs[0].id, name.trim(), email?.trim() || null, text.trim(), safeImageUrl, createdAt, deviceId || null, locationStr]
    );

    const comment = {
      id: commentId,
      blog_id: blogs[0].id,
      author_name: name.trim(),
      comment_text: text.trim(),
      image_url: safeImageUrl,
      is_approved: 1,
      created_at: createdAt.toISOString()
    };

    return NextResponse.json({ success: true, message: 'Comment posted!', comment });
  } catch (error) {
    console.error('[Comments POST]', error);
    return NextResponse.json({ success: false, message: 'Server error.' }, { status: 500 });
  }
}
