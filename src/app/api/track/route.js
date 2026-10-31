// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : route.js
// Description : API route handler for /api/track.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

import { NextResponse } from 'next/server';
import { dbQuery } from '@/lib/db';
import { randomUUID } from 'crypto';

// In-memory cache for visitor statistics to avoid querying DB on every request
let cachedStats = null;
let lastCacheTime = 0;
const CACHE_TTL = 10000; // 10 seconds cache TTL

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
            || request.headers.get('x-real-ip')
            || '127.0.0.1';
  const ua = request.headers.get('user-agent') || 'Unknown';

  try {
    const body = await request.json();
    const { deviceId, path, referrer, latitude, longitude } = body;

    if (!deviceId) {
      return NextResponse.json({ success: false, message: 'Missing deviceId' }, { status: 400 });
    }

    // Perform DB inserts and updates ASYNCHRONOUSLY without awaiting them.
    // This makes the response time instant (<5ms) and non-blocking.
    (async () => {
      try {
        let resolvedLocation = null;
        if (latitude && longitude) {
          resolvedLocation = `Coords: ${latitude}, ${longitude}`;
        } else {
          // If no geolocation coords yet, look up via IP-API (only if not local IP)
          if (ip !== '127.0.0.1' && ip !== '::1' && !ip.startsWith('192.168.') && !ip.startsWith('10.')) {
            try {
              const res = await fetch(`http://ip-api.com/json/${ip}`);
              const data = await res.json();
              if (data && data.status === 'success') {
                resolvedLocation = `${data.city}, ${data.regionName}, ${data.country}`;
              }
            } catch (e) {
              console.error('[IP Geo Lookup Error]', e);
            }
          }
          if (!resolvedLocation) {
            resolvedLocation = 'Kuppam, Andhra Pradesh, India'; // Fallback
          }
        }

        // 1. Upsert visitor record
        const visitors = await dbQuery('SELECT id, visit_count, location FROM visitors WHERE device_id = ?', [deviceId]);
        
        if (visitors.length === 0) {
          // New visitor
          const newVisitorId = randomUUID();
          await dbQuery(
            `INSERT INTO visitors (id, device_id, ip_address, location, user_agent, latitude, longitude, visit_count, last_visit_at, created_at, updated_at) 
             VALUES (?, ?, ?, ?, ?, ?, ?, 1, NOW(), NOW(), NOW())`,
            [newVisitorId, deviceId, ip, resolvedLocation, ua, latitude || null, longitude || null]
          );
        } else {
          // Returning visitor
          if (latitude && longitude) {
            await dbQuery(
              `UPDATE visitors 
               SET visit_count = visit_count + 1, ip_address = ?, location = ?, user_agent = ?, latitude = ?, longitude = ?, last_visit_at = NOW() 
               WHERE device_id = ?`,
              [ip, resolvedLocation, ua, latitude, longitude, deviceId]
            );
          } else {
            // Keep existing location if already set, else set IP resolved location
            const locToSet = visitors[0].location || resolvedLocation;
            await dbQuery(
              `UPDATE visitors 
               SET visit_count = visit_count + 1, ip_address = ?, location = ?, user_agent = ?, last_visit_at = NOW() 
               WHERE device_id = ?`,
              [ip, locToSet, ua, deviceId]
            );
          }
        }

        // 2. Track activity log (navigation / where they came from and where they went)
        const activityId = randomUUID();
        await dbQuery(
          `INSERT INTO visitor_activities (id, device_id, path, referrer, user_agent, ip_address) 
           VALUES (?, ?, ?, ?, ?, ?)`,
          [activityId, deviceId, path || '/', referrer || null, ua, ip]
        );
      } catch (dbErr) {
        console.error('[Lazy Tracking Insert Error]', dbErr);
      }
    })();

    // Retrieve visitor stats with cache fallback to keep loading speed fast
    const now = Date.now();
    if (!cachedStats || now - lastCacheTime > CACHE_TTL) {
      try {
        const uniqueCountRes = await dbQuery('SELECT COUNT(*) as total FROM visitors');
        const totalVisitsRes = await dbQuery('SELECT SUM(visit_count) as total FROM visitors').catch(() => [{ total: 0 }]);
        
        cachedStats = {
          totalVisitors: uniqueCountRes[0]?.total || 0,
          totalVisits: totalVisitsRes[0]?.total || 0
        };
        lastCacheTime = now;
      } catch (statsErr) {
        console.error('[Track Stats Fetch Error]', statsErr.message);
        cachedStats = cachedStats || { totalVisitors: 1, totalVisits: 1 };
      }
    }

    return NextResponse.json({
      success: true,
      ...cachedStats
    });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message, totalVisitors: 1, totalVisits: 1 }, { status: 200 });
  }
}
