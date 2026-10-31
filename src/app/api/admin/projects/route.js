// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : route.js
// Description : API route handler for /api/admin/projects.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

import { dbQuery } from '@/lib/db';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

// GET all projects
export async function GET() {
  try {
    const projects = await dbQuery('SELECT * FROM projects ORDER BY sort_order');
    return NextResponse.json({ success: true, projects });
  } catch (error) {
    console.error('[API Admin Projects GET Error]', error);
    return NextResponse.json({ success: false, message: 'Failed to retrieve projects.' }, { status: 500 });
  }
}

// POST: Create a new project
export async function POST(request) {
  try {
    const { title, description, category, imageUrl, liveUrl, githubUrl, sortOrder, isPublished } = await request.json();

    if (!title || !description || !category) {
      return NextResponse.json({ success: false, message: 'Title, description and category are required.' }, { status: 400 });
    }

    const id = crypto.randomUUID();
    const published = isPublished ? 1 : 0;
    const order = sortOrder ? parseInt(sortOrder, 10) : 0;

    await dbQuery(`
      INSERT INTO projects (id, title, description, category, image_url, live_url, github_url, sort_order, is_published)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [id, title, description, category, imageUrl || null, liveUrl || null, githubUrl || null, order, published]);

    return NextResponse.json({ success: true, message: 'Project created successfully.', id });
  } catch (error) {
    console.error('[API Admin Projects POST Error]', error);
    return NextResponse.json({ success: false, message: 'Failed to create project.' }, { status: 500 });
  }
}

// PUT: Update an existing project
export async function PUT(request) {
  try {
    const { id, title, description, category, imageUrl, liveUrl, githubUrl, sortOrder, isPublished } = await request.json();

    if (!id || !title || !description || !category) {
      return NextResponse.json({ success: false, message: 'Missing required update fields.' }, { status: 400 });
    }

    const published = isPublished ? 1 : 0;
    const order = sortOrder ? parseInt(sortOrder, 10) : 0;

    await dbQuery(`
      UPDATE projects 
      SET title = ?, description = ?, category = ?, image_url = ?, live_url = ?, github_url = ?, sort_order = ?, is_published = ? 
      WHERE id = ?
    `, [title, description, category, imageUrl || null, liveUrl || null, githubUrl || null, order, published, id]);

    return NextResponse.json({ success: true, message: 'Project updated successfully.' });
  } catch (error) {
    console.error('[API Admin Projects PUT Error]', error);
    return NextResponse.json({ success: false, message: 'Failed to update project.' }, { status: 500 });
  }
}

// DELETE: Remove a project
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Project ID is required.' }, { status: 400 });
    }

    await dbQuery('DELETE FROM projects WHERE id = ?', [id]);

    return NextResponse.json({ success: true, message: 'Project deleted successfully.' });
  } catch (error) {
    console.error('[API Admin Projects DELETE Error]', error);
    return NextResponse.json({ success: false, message: 'Failed to delete project.' }, { status: 500 });
  }
}
