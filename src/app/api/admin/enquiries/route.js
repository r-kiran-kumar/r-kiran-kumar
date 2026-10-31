// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : route.js
// Description : API route handler for /api/admin/enquiries.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

import { NextResponse } from 'next/server';
import { dbQuery } from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10), 200);
    const offset = Math.max(parseInt(searchParams.get('offset') || '0', 10), 0);
    const search = searchParams.get('search')?.trim() || '';

    let enquiriesQuery = `SELECT id, full_name, email, phone_number, message, ip_address, device_id, location, status, created_at FROM enquiries`;
    let countQuery = `SELECT COUNT(*) as count FROM enquiries`;
    let queryParams = [];

    if (search) {
      const searchPattern = `%${search}%`;
      enquiriesQuery += ` WHERE full_name LIKE ? OR email LIKE ? OR phone_number LIKE ? OR message LIKE ? OR location LIKE ?`;
      countQuery += ` WHERE full_name LIKE ? OR email LIKE ? OR phone_number LIKE ? OR message LIKE ? OR location LIKE ?`;
      queryParams = [searchPattern, searchPattern, searchPattern, searchPattern, searchPattern];
    }

    enquiriesQuery += ` ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`;

    const enquiries = await dbQuery(enquiriesQuery, queryParams);
    const totalFiltered = await dbQuery(countQuery, queryParams);
    const totalEnquiries = await dbQuery('SELECT COUNT(*) as count FROM enquiries');

    return NextResponse.json({
      success: true,
      enquiries,
      total: totalFiltered[0]?.count || 0,
      totalAll: totalEnquiries[0]?.count || 0
    });
  } catch (err) {
    console.error('[Admin Enquiries GET Error]', err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ success: false, message: 'ID and Status are required.' }, { status: 400 });
    }

    await dbQuery('UPDATE enquiries SET status = ? WHERE id = ?', [status, id]);
    return NextResponse.json({ success: true, message: 'Status updated.' });
  } catch (err) {
    console.error('[Admin Enquiries PUT Error]', err);
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

    await dbQuery('DELETE FROM enquiries WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'Enquiry deleted successfully.' });
  } catch (err) {
    console.error('[Admin Enquiries DELETE Error]', err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
