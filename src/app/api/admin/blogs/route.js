// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : route.js
// Description : API route handler for /api/admin/blogs.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

import { dbQuery } from '@/lib/db';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

// GET all blogs (published and unpublished)
export async function GET() {
  try {
    const blogs = await dbQuery('SELECT * FROM blogs ORDER BY created_at DESC');
    return NextResponse.json({ success: true, blogs });
  } catch (error) {
    console.error('[API Admin Blogs GET Error]', error);
    return NextResponse.json({ success: false, message: 'Failed to retrieve blogs.' }, { status: 500 });
  }
}

// POST: Create a new blog
export async function POST(request) {
  try {
    const { title, slug, summary, content, coverImage, isPublished } = await request.json();

    if (!title || !slug || !summary || !content) {
      return NextResponse.json({ success: false, message: 'Title, slug, summary and content are required.' }, { status: 400 });
    }

    const id = crypto.randomUUID();
    const published = isPublished ? 1 : 0;

    await dbQuery(`
      INSERT INTO blogs (id, title, slug, summary, content, cover_image, is_published)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [id, title, slug, summary, content, coverImage || null, published]);

    return NextResponse.json({ success: true, message: 'Blog post created successfully.', id });
  } catch (error) {
    console.error('[API Admin Blogs POST Error]', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ success: false, message: 'A blog post with this slug already exists.' }, { status: 409 });
    }
    return NextResponse.json({ success: false, message: 'Failed to create blog post.' }, { status: 500 });
  }
}

// PUT: Update an existing blog
export async function PUT(request) {
  try {
    const { id, title, slug, summary, content, coverImage, isPublished } = await request.json();

    if (!id || !title || !slug || !summary || !content) {
      return NextResponse.json({ success: false, message: 'Missing required update fields.' }, { status: 400 });
    }

    const published = isPublished ? 1 : 0;

    await dbQuery(`
      UPDATE blogs 
      SET title = ?, slug = ?, summary = ?, content = ?, cover_image = ?, is_published = ? 
      WHERE id = ?
    `, [title, slug, summary, content, coverImage || null, published, id]);

    return NextResponse.json({ success: true, message: 'Blog post updated successfully.' });
  } catch (error) {
    console.error('[API Admin Blogs PUT Error]', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ success: false, message: 'A blog post with this slug already exists.' }, { status: 409 });
    }
    return NextResponse.json({ success: false, message: 'Failed to update blog post.' }, { status: 500 });
  }
}

// DELETE: Remove a blog post
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Blog ID is required.' }, { status: 400 });
    }

    // First delete comments linked to this blog
    await dbQuery('DELETE FROM comments WHERE blog_id = ?', [id]);
    // Then delete the blog post
    await dbQuery('DELETE FROM blogs WHERE id = ?', [id]);

    return NextResponse.json({ success: true, message: 'Blog post and its comments deleted successfully.' });
  } catch (error) {
    console.error('[API Admin Blogs DELETE Error]', error);
    return NextResponse.json({ success: false, message: 'Failed to delete blog post.' }, { status: 500 });
  }
}
