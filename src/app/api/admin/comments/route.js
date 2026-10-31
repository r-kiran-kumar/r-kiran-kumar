// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : route.js
// Description : API route handler for /api/admin/comments.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

import { dbQuery } from '@/lib/db';
import { NextResponse } from 'next/server';

// GET all comments with blog post titles
export async function GET() {
  try {
    const comments = await dbQuery(`
      SELECT c.*, b.title AS blog_title 
      FROM comments c
      JOIN blogs b ON c.blog_id = b.id
      ORDER BY c.created_at DESC
    `);
    return NextResponse.json({ success: true, comments });
  } catch (error) {
    console.error('[API Admin Comments GET Error]', error);
    return NextResponse.json({ success: false, message: 'Failed to retrieve comments.' }, { status: 500 });
  }
}

// PUT: Approve or disapprove a comment
export async function PUT(request) {
  try {
    const { id, isApproved } = await request.json();

    if (!id) {
      return NextResponse.json({ success: false, message: 'Comment ID is required.' }, { status: 400 });
    }

    const approved = isApproved ? 1 : 0;

    await dbQuery('UPDATE comments SET is_approved = ? WHERE id = ?', [approved, id]);

    return NextResponse.json({ success: true, message: 'Comment status updated successfully.' });
  } catch (error) {
    console.error('[API Admin Comments PUT Error]', error);
    return NextResponse.json({ success: false, message: 'Failed to update comment status.' }, { status: 500 });
  }
}

// DELETE: Remove a comment
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Comment ID is required.' }, { status: 400 });
    }

    await dbQuery('DELETE FROM comments WHERE id = ?', [id]);

    return NextResponse.json({ success: true, message: 'Comment deleted successfully.' });
  } catch (error) {
    console.error('[API Admin Comments DELETE Error]', error);
    return NextResponse.json({ success: false, message: 'Failed to delete comment.' }, { status: 500 });
  }
}
