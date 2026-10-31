// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : route.js
// Description : API route handler for /api/auth/login.
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
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required.' },
        { status: 400 }
      );
    }

    // Lookup user
    const users = await dbQuery('SELECT * FROM users WHERE email = ? AND status = ?', [email, 'active']);
    if (users.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const user = users[0];

    // Check password hash
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // Update last login
    await dbQuery('UPDATE users SET last_login_at = ? WHERE id = ?', [new Date(), user.id]);

    // Create JWT Token (24 hours expiry)
    const token = jwt.sign(
      {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Prepare response with HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      message: 'Logged in successfully.',
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email
      }
    });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 24 hours
    });

    return response;
  } catch (error) {
    console.error('[API Auth Login Error]', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error.' },
      { status: 500 }
    );
  }
}
