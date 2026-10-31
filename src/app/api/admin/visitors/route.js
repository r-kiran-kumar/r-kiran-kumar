// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : route.js
// Description : API route handler for /api/admin/visitors.
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

    let visitorsQuery = `SELECT id, device_id, ip_address, location, latitude, longitude, user_agent, visit_count, last_visit_at, created_at FROM visitors`;
    let countQuery = `SELECT COUNT(*) as count FROM visitors`;
    let queryParams = [];

    if (search) {
      const searchPattern = `%${search}%`;
      visitorsQuery += ` WHERE device_id LIKE ? OR ip_address LIKE ? OR location LIKE ? OR user_agent LIKE ?`;
      countQuery += ` WHERE device_id LIKE ? OR ip_address LIKE ? OR location LIKE ? OR user_agent LIKE ?`;
      queryParams = [searchPattern, searchPattern, searchPattern, searchPattern];
    }

    visitorsQuery += ` ORDER BY last_visit_at DESC LIMIT ${limit} OFFSET ${offset}`;
    
    // Fetch visitors with filters & pagination
    const visitors = await dbQuery(visitorsQuery, queryParams);
    
    // Fetch recent activity logs with joined coordinates/location
    let activitiesQuery = `
      SELECT 
        va.id, 
        va.device_id, 
        va.path, 
        va.referrer, 
        va.user_agent, 
        va.ip_address, 
        va.created_at,
        v.location,
        v.latitude,
        v.longitude
      FROM visitor_activities va
      LEFT JOIN visitors v ON va.device_id = v.device_id
    `;
    let actParams = [];
    if (search) {
      const searchPattern = `%${search}%`;
      activitiesQuery += ` WHERE va.device_id LIKE ? OR va.ip_address LIKE ? OR va.path LIKE ? OR va.referrer LIKE ?`;
      actParams = [searchPattern, searchPattern, searchPattern, searchPattern];
    }
    activitiesQuery += ` ORDER BY va.created_at DESC LIMIT 100`;
    const activities = await dbQuery(activitiesQuery, actParams);

    // Fetch summary stats
    const totalFiltered = await dbQuery(countQuery, queryParams);
    const totalVisitors = await dbQuery('SELECT COUNT(*) as count FROM visitors');
    const totalVisits = await dbQuery('SELECT SUM(visit_count) as total FROM visitors').catch(() => [{ total: 0 }]);

    return NextResponse.json({
      success: true,
      visitors,
      activities,
      total: totalFiltered[0]?.count || 0,
      summary: {
        totalVisitors: totalVisitors[0]?.count || 0,
        totalVisits: parseInt(totalVisits[0]?.total || '0', 10)
      }
    });
  } catch (err) {
    console.error('[Admin Visitors GET Error]', err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    // Clear all tracking logs
    await dbQuery('DELETE FROM visitor_activities');
    await dbQuery('DELETE FROM visitors');
    return NextResponse.json({ success: true, message: 'All tracking logs successfully cleared.' });
  } catch (err) {
    console.error('[Admin Visitors DELETE Error]', err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
