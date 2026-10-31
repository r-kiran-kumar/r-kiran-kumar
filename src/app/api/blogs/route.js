// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : route.js
// Description : API route handler for /api/blogs.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

import { dbQuery } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const blogs = await dbQuery('SELECT * FROM blogs WHERE is_published = 1 ORDER BY created_at DESC');
    return NextResponse.json({ success: true, blogs });
  } catch (error) {
    console.error('[API Blogs Error]', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error.' },
      { status: 500 }
    );
  }
}
