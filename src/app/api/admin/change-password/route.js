// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : route.js
// Description : API route handler for /api/admin/change-password.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

import { dbQuery } from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'kkHHksd6dscecQrS3RKiranKumar2026SecureKey';
const SESSION_COOKIE_NAME = 'rkirankumar_session';

export async function POST(request) {
  try {
    const cookie = request.cookies.get(SESSION_COOKIE_NAME);
    const token = cookie?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized.' }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ success: false, message: 'Unauthorized.' }, { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ success: false, message: 'Current and new passwords are required.' }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ success: false, message: 'New password must be at least 6 characters.' }, { status: 400 });
    }

    // Get current user
    const users = await dbQuery('SELECT * FROM users WHERE id = ?', [decoded.id]);
    if (users.length === 0) {
      return NextResponse.json({ success: false, message: 'User not found.' }, { status: 404 });
    }

    const user = users[0];

    // Check old password
    const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isMatch) {
      return NextResponse.json({ success: false, message: 'Incorrect current password.' }, { status: 400 });
    }

    // Hash and save new password
    const newHash = await bcrypt.hash(newPassword, 10);
    await dbQuery('UPDATE users SET password_hash = ? WHERE id = ?', [newHash, user.id]);

    return NextResponse.json({ success: true, message: 'Password updated successfully.' });
  } catch (error) {
    console.error('[API Change Password Error]', error);
    return NextResponse.json({ success: false, message: 'Internal server error.' }, { status: 500 });
  }
}
