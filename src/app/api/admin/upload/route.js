// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : route.js
// Description : API route handler for /api/admin/upload.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import crypto from 'crypto';

export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url);
    const uploadType = searchParams.get('type') || 'general';

    // Validate type to prevent path traversal
    const allowedTypes = ['projects', 'blogs', 'gallery', 'general'];
    const targetType = allowedTypes.includes(uploadType) ? uploadType : 'general';

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create public/uploads/<type> directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'public', 'uploads', targetType);
    await mkdir(uploadDir, { recursive: true });

    // Generate a unique filename using UUID and preserve file extension
    const originalName = file.name || 'file';
    const ext = originalName.includes('.') ? originalName.split('.').pop().toLowerCase() : 'jpg';
    const filename = `${crypto.randomUUID()}.${ext}`;
    const filePath = join(uploadDir, filename);

    await writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      url: `/uploads/${targetType}/${filename}`,
    });
  } catch (error) {
    console.error('[Upload Error]', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
