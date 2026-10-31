// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : route.js
// Description : API route handler for /api/admin/gallery.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

import { NextResponse } from 'next/server';
import { dbQuery } from '@/lib/db';
import { randomUUID } from 'crypto';

// GET all gallery items (admin)
export async function GET() {
  try {
    const items = await dbQuery('SELECT * FROM gallery ORDER BY sort_order ASC, created_at DESC');
    return NextResponse.json({ success: true, items });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

// POST create new gallery item
export async function POST(request) {
  try {
    const { title, description, image_url, alt_text, category, sort_order } = await request.json();
    if (!title?.trim() || !image_url?.trim()) {
      return NextResponse.json({ success: false, message: 'Title and image URL are required.' }, { status: 400 });
    }
    const id = randomUUID();
    const order = parseInt(sort_order) || 99;
    await dbQuery(
      'INSERT INTO gallery (id, title, description, image_url, alt_text, category, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, title.trim(), description?.trim() || null, image_url.trim(), alt_text?.trim() || title.trim(), category || 'other', order]
    );
    const item = await dbQuery('SELECT * FROM gallery WHERE id = ?', [id]);
    return NextResponse.json({ success: true, item: item[0] }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

// PUT update gallery item
export async function PUT(request) {
  try {
    const { id, title, description, image_url, alt_text, category, sort_order } = await request.json();
    if (!id) return NextResponse.json({ success: false, message: 'ID required.' }, { status: 400 });
    await dbQuery(
      'UPDATE gallery SET title = ?, description = ?, image_url = ?, alt_text = ?, category = ?, sort_order = ?, updated_at = NOW() WHERE id = ?',
      [title?.trim(), description?.trim() || null, image_url?.trim(), alt_text?.trim() || title?.trim(), category || 'other', parseInt(sort_order) || 99, id]
    );
    const item = await dbQuery('SELECT * FROM gallery WHERE id = ?', [id]);
    return NextResponse.json({ success: true, item: item[0] });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

// DELETE gallery item
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, message: 'ID required.' }, { status: 400 });
    await dbQuery('DELETE FROM gallery WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'Deleted.' });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
