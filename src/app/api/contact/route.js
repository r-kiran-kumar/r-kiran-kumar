// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : route.js
// Description : API route handler for /api/contact.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

import { dbQuery } from '@/lib/db';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

async function ensureEnquirySchema() {
  try {
    await dbQuery('ALTER TABLE enquiries ADD COLUMN device_id VARCHAR(64) NULL');
    await dbQuery('ALTER TABLE enquiries ADD COLUMN location VARCHAR(255) NULL');
  } catch (e) {
    // Columns already exist
  }
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(request) {
  try {
    await ensureEnquirySchema();
    const { name, phone, email, message, deviceId } = await request.json();

    if (!name || !phone || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'All fields are required.' },
        { status: 400, headers: corsHeaders }
      );
    }

    const id = crypto.randomUUID();
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() 
              || request.headers.get('x-real-ip')
              || '127.0.0.1';

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

    await dbQuery(`
      INSERT INTO enquiries (id, full_name, email, phone_number, message, ip_address, device_id, location)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [id, name, email, phone, message, ip, deviceId || null, locationStr]);

    return NextResponse.json({
      success: true,
      message: 'Enquiry submitted successfully.',
      id
    }, { headers: corsHeaders });
  } catch (error) {
    console.error('[API Contact Error]', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error.' },
      { status: 500, headers: corsHeaders }
    );
  }
}

