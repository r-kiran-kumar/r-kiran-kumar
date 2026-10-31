// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : route.js
// Description : API route handler for /api/faqs.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

import { NextResponse } from 'next/server';
import { dbQuery } from '@/lib/db';
import crypto from 'crypto';

export async function GET() {
  try {
    const faqs = await dbQuery(
      'SELECT id, question, answer, sort_order FROM faqs WHERE is_published = 1 ORDER BY sort_order ASC, created_at DESC'
    );
    return NextResponse.json({ success: true, faqs });
  } catch (err) {
    console.error('[Public FAQs GET Error]', err);
    return NextResponse.json({ success: false, message: 'Internal server error.' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name, email, phone, question } = await request.json();

    if (!name || !question) {
      return NextResponse.json({ success: false, message: 'Name and Question are required.' }, { status: 400 });
    }

    const id = crypto.randomUUID();
    await dbQuery(
      `INSERT INTO faqs (id, name, email, phone, question, answer, is_published, sort_order)
       VALUES (?, ?, ?, ?, ?, NULL, 0, 99)`,
      [id, name, email || null, phone || null, question]
    );

    return NextResponse.json({
      success: true,
      message: 'Your question has been submitted successfully! An administrator will review and answer it soon.'
    });
  } catch (err) {
    console.error('[Public FAQs POST Error]', err);
    return NextResponse.json({ success: false, message: 'Internal server error.' }, { status: 500 });
  }
}
