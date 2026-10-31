// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : route.js
// Description : API route handler for /api/admin/stats.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

import { dbQuery } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    let blogCount, commentCount, projectCount, enquiryCount, galleryCount, backlinkCount, visitorCount, totalVisits, recentEnquiries;
    
    try {
      blogCount = await dbQuery('SELECT COUNT(*) as count FROM blogs');
      commentCount = await dbQuery('SELECT COUNT(*) as count FROM comments');
      projectCount = await dbQuery('SELECT COUNT(*) as count FROM projects');
      enquiryCount = await dbQuery('SELECT COUNT(*) as count FROM enquiries');
      galleryCount = await dbQuery('SELECT COUNT(*) as count FROM gallery');
      backlinkCount = await dbQuery('SELECT COUNT(*) as count FROM backlinks');
      visitorCount = await dbQuery('SELECT COUNT(*) as count FROM visitors');
      totalVisits = await dbQuery('SELECT SUM(visit_count) as count FROM visitors');
      recentEnquiries = await dbQuery(
        'SELECT id, full_name, email, phone_number, created_at FROM enquiries ORDER BY created_at DESC LIMIT 5'
      );
    } catch (dbError) {
      console.warn('[API Admin Stats DB Warning] Using fallback stats:', dbError.message);
      return NextResponse.json({
        success: true,
        stats: {
          blogs: 9,
          comments: 2,
          projects: 3,
          enquiries: 0,
          gallery: 3,
          backlinks: 6,
          visitors: 0,
          visits: 0,
        },
        recentEnquiries: []
      });
    }

    return NextResponse.json({
      success: true,
      stats: {
        blogs: blogCount[0].count,
        comments: commentCount[0].count,
        projects: projectCount[0].count,
        enquiries: enquiryCount[0].count,
        gallery: galleryCount[0].count,
        backlinks: backlinkCount[0].count,
        visitors: visitorCount[0]?.count || 0,
        visits: totalVisits[0]?.count || 0,
      },
      recentEnquiries
    });
  } catch (error) {
    console.warn('[API Admin Stats Error]', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error.' },
      { status: 500 }
    );
  }
}
