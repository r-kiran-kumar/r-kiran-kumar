// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : route.js
// Description : API route handler for /api/admin/faqs.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

import { NextResponse } from 'next/server';
import { dbQuery } from '@/lib/db';
import crypto from 'crypto';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10), 200);
    const offset = Math.max(parseInt(searchParams.get('offset') || '0', 10), 0);
    const search = searchParams.get('search')?.trim() || '';

    let faqsQuery = `SELECT id, name, email, phone, question, answer, is_published, sort_order, created_at FROM faqs`;
    let countQuery = `SELECT COUNT(*) as count FROM faqs`;
    let queryParams = [];

    if (search) {
      const searchPattern = `%${search}%`;
      faqsQuery += ` WHERE question LIKE ? OR answer LIKE ? OR name LIKE ? OR email LIKE ?`;
      countQuery += ` WHERE question LIKE ? OR answer LIKE ? OR name LIKE ? OR email LIKE ?`;
      queryParams = [searchPattern, searchPattern, searchPattern, searchPattern];
    }

    faqsQuery += ` ORDER BY sort_order ASC, created_at DESC LIMIT ${limit} OFFSET ${offset}`;

    const faqs = await dbQuery(faqsQuery, queryParams);
    const totalFiltered = await dbQuery(countQuery, queryParams);
    const totalFaqs = await dbQuery('SELECT COUNT(*) as count FROM faqs');

    return NextResponse.json({
      success: true,
      faqs,
      total: totalFiltered[0]?.count || 0,
      totalAll: totalFaqs[0]?.count || 0
    });
  } catch (err) {
    console.error('[Admin FAQs GET Error]', err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { question, answer, sortOrder, isPublished } = await request.json();

    if (!question) {
      return NextResponse.json({ success: false, message: 'Question is required.' }, { status: 400 });
    }

    const id = crypto.randomUUID();
    await dbQuery(
      `INSERT INTO faqs (id, name, email, phone, question, answer, is_published, sort_order)
       VALUES (?, NULL, NULL, NULL, ?, ?, ?, ?)`,
      [id, question, answer || null, isPublished ? 1 : 0, parseInt(sortOrder || '99', 10)]
    );

    return NextResponse.json({ success: true, message: 'FAQ created successfully.' });
  } catch (err) {
    console.error('[Admin FAQs POST Error]', err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, question, answer, sortOrder, isPublished } = await request.json();

    if (!id || !question) {
      return NextResponse.json({ success: false, message: 'ID and Question are required.' }, { status: 400 });
    }

    await dbQuery(
      `UPDATE faqs 
       SET question = ?, answer = ?, sort_order = ?, is_published = ?
       WHERE id = ?`,
      [question, answer || null, parseInt(sortOrder || '99', 10), isPublished ? 1 : 0, id]
    );

    return NextResponse.json({ success: true, message: 'FAQ updated successfully.' });
  } catch (err) {
    console.error('[Admin FAQs PUT Error]', err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'ID is required.' }, { status: 400 });
    }

    await dbQuery('DELETE FROM faqs WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'FAQ deleted successfully.' });
  } catch (err) {
    console.error('[Admin FAQs DELETE Error]', err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
