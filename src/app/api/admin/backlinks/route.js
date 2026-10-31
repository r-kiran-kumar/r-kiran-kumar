// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : route.js
// Description : API route handler for /api/admin/backlinks.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

import { NextResponse } from 'next/server';
import { dbQuery } from '@/lib/db';
import { randomUUID } from 'crypto';

// GET all backlinks
export async function GET() {
  try {
    const items = await dbQuery('SELECT * FROM backlinks ORDER BY sort_order ASC, created_at DESC');
    return NextResponse.json({ success: true, items });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

// POST create backlink
export async function POST(request) {
  try {
    const { title, url, relationship, category, sort_order } = await request.json();
    if (!title?.trim() || !url?.trim()) {
      return NextResponse.json({ success: false, message: 'Title and URL are required.' }, { status: 400 });
    }
    const id = randomUUID();
    const order = parseInt(sort_order) || 99;
    await dbQuery(
      'INSERT INTO backlinks (id, title, url, relationship, category, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
      [id, title.trim(), url.trim(), relationship || 'nofollow', category || 'partner', order]
    );
    const item = await dbQuery('SELECT * FROM backlinks WHERE id = ?', [id]);
    return NextResponse.json({ success: true, item: item[0] }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

// PUT update backlink
export async function PUT(request) {
  try {
    const { id, title, url, relationship, category, sort_order } = await request.json();
    if (!id) return NextResponse.json({ success: false, message: 'ID required.' }, { status: 400 });
    await dbQuery(
      'UPDATE backlinks SET title = ?, url = ?, relationship = ?, category = ?, sort_order = ? WHERE id = ?',
      [title?.trim(), url?.trim(), relationship || 'nofollow', category || 'partner', parseInt(sort_order) || 99, id]
    );
    const item = await dbQuery('SELECT * FROM backlinks WHERE id = ?', [id]);
    return NextResponse.json({ success: true, item: item[0] });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

// DELETE backlink
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, message: 'ID required.' }, { status: 400 });
    await dbQuery('DELETE FROM backlinks WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'Deleted.' });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
