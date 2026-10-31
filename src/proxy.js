// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : proxy.js
// Description : proxy module.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

// ============================================================================
// R Kiran Kumar Portfolio & Blog Platform
// File        : middleware.js
// Description : Security middleware to protect /admin pages and /api/admin/
//               endpoints using Edge-compatible JWT verification.
// ============================================================================

import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'kkHHksd6dscecQrS3RKiranKumar2026SecureKey';
const SESSION_COOKIE_NAME = 'rkirankumar_session';

async function verifyJwtEdge(token, secret) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [headerB64, payloadB64, signatureB64] = parts;

    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const key = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const data = encoder.encode(`${headerB64}.${payloadB64}`);

    // Base64URL decode signature
    const signatureStr = atob(signatureB64.replace(/-/g, '+').replace(/_/g, '/'));
    const signature = new Uint8Array(signatureStr.length);
    for (let i = 0; i < signatureStr.length; i++) {
      signature[i] = signatureStr.charCodeAt(i);
    }

    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signature,
      data
    );

    if (!isValid) return null;

    // Base64URL decode payload
    const payloadStr = atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/'));
    const payloadBytes = new Uint8Array(payloadStr.length);
    for (let i = 0; i < payloadStr.length; i++) {
      payloadBytes[i] = payloadStr.charCodeAt(i);
    }

    const payload = JSON.parse(new TextDecoder().decode(payloadBytes));

    // Check expiry
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const cookie = request.cookies.get(SESSION_COOKIE_NAME);
  const token = cookie?.value;

  const payload = token ? await verifyJwtEdge(token, JWT_SECRET) : null;

  // Protect /admin routes
  if (pathname.startsWith('/admin')) {
    if (!payload) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protect /api/admin routes
  if (pathname.startsWith('/api/admin')) {
    if (!payload) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized.' },
        { status: 401 }
      );
    }
  }

  // Redirect authenticated users away from /login
  if (pathname === '/login') {
    if (payload) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // Append x-pathname to headers for layout conditional checks
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    }
  });
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/login',
  ],
};
