// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : route.js
// Description : API route handler for /api/blogs/[slug]/like.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

import { NextResponse } from 'next/server';
import { dbQuery } from '@/lib/db';
import { createHash, randomUUID } from 'crypto';

// Ensure device_id column exists in blog_likes table
async function ensureLikesSchema() {
  try {
    await dbQuery('ALTER TABLE blog_likes ADD COLUMN device_id VARCHAR(64) NULL');
    await dbQuery('ALTER TABLE blog_likes ADD INDEX idx_like_device_id (device_id)');
  } catch (e) {
    // Column/index already exists
  }
}

// GET /api/blogs/[slug]/like — returns current like count + whether this device liked
export async function GET(request, { params }) {
  const { slug } = await params;
  const sp = request.nextUrl.searchParams;
  const deviceId = sp.get('device_id') || '';

  try {
    await ensureLikesSchema();
    const blogs = await dbQuery('SELECT id, likes FROM blogs WHERE slug = ?', [slug]);
    if (!blogs.length) return NextResponse.json({ likes: 0, liked: false });

    const blog = blogs[0];
    let liked = false;

    if (deviceId) {
      const existing = await dbQuery(
        'SELECT id FROM blog_likes WHERE blog_id = ? AND device_id = ?',
        [blog.id, deviceId]
      );
      liked = existing.length > 0;
    } else {
      const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
                || request.headers.get('x-real-ip')
                || '127.0.0.1';
      const ipHash = createHash('sha256').update(ip + (process.env.JWT_SECRET || 'rkk-secret')).digest('hex');
      const existing = await dbQuery(
        'SELECT id FROM blog_likes WHERE blog_id = ? AND ip_hash = ?',
        [blog.id, ipHash]
      );
      liked = existing.length > 0;
    }

    return NextResponse.json({ likes: blog.likes || 0, liked });
  } catch {
    return NextResponse.json({ likes: 0, liked: false });
  }
}

// POST /api/blogs/[slug]/like — toggle like
export async function POST(request, { params }) {
  const { slug } = await params;
  try {
    await ensureLikesSchema();
    const blogs = await dbQuery('SELECT id, likes FROM blogs WHERE slug = ?', [slug]);
    if (!blogs.length) return NextResponse.json({ success: false, message: 'Blog not found' }, { status: 404 });

    const blog = blogs[0];
    
    let deviceId = '';
    try {
      const body = await request.json();
      deviceId = body.deviceId || '';
    } catch {}

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
              || request.headers.get('x-real-ip')
              || '127.0.0.1';
    const ipHash = createHash('sha256').update(ip + (process.env.JWT_SECRET || 'rkk-secret')).digest('hex');

    let existing = [];
    if (deviceId) {
      existing = await dbQuery(
        'SELECT id FROM blog_likes WHERE blog_id = ? AND device_id = ?',
        [blog.id, deviceId]
      );
    } else {
      existing = await dbQuery(
        'SELECT id FROM blog_likes WHERE blog_id = ? AND ip_hash = ?',
        [blog.id, ipHash]
      );
    }

    let newLikes;
    let liked;

    if (existing.length > 0) {
      // Unlike
      if (deviceId) {
        await dbQuery('DELETE FROM blog_likes WHERE blog_id = ? AND device_id = ?', [blog.id, deviceId]);
      } else {
        await dbQuery('DELETE FROM blog_likes WHERE blog_id = ? AND ip_hash = ?', [blog.id, ipHash]);
      }
      await dbQuery('UPDATE blogs SET likes = GREATEST(0, likes - 1) WHERE id = ?', [blog.id]);
      const updated = await dbQuery('SELECT likes FROM blogs WHERE id = ?', [blog.id]);
      newLikes = updated[0].likes;
      liked = false;
    } else {
      // Like
      const id = randomUUID();
      if (deviceId) {
        await dbQuery(
          'INSERT INTO blog_likes (id, blog_id, device_id, ip_hash) VALUES (?, ?, ?, ?)',
          [id, blog.id, deviceId, ipHash]
        );
      } else {
        await dbQuery(
          'INSERT INTO blog_likes (id, blog_id, ip_hash) VALUES (?, ?, ?)',
          [id, blog.id, ipHash]
        );
      }
      await dbQuery('UPDATE blogs SET likes = likes + 1 WHERE id = ?', [blog.id]);
      const updated = await dbQuery('SELECT likes FROM blogs WHERE id = ?', [blog.id]);
      newLikes = updated[0].likes;
      liked = true;
    }

    return NextResponse.json({ success: true, likes: newLikes, liked });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
