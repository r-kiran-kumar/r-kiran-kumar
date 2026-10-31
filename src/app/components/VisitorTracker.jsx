// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : VisitorTracker.jsx
// Description : VisitorTracker UI component.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function VisitorTracker() {
  const pathname = usePathname();
  const prevPathRef = useRef(null);
  const locationAskedRef = useRef(false);

  // Helper to retrieve/create persistent device ID
  const getDeviceId = () => {
    if (typeof window === 'undefined') return '';
    let id = localStorage.getItem('rkk-device-id');
    if (!id) {
      id = 'rkk_dev_' + Math.random().toString(36).substring(2, 15) + '_' + Date.now().toString(36);
      localStorage.setItem('rkk-device-id', id);
    }
    return id;
  };

  // 1. Page transition and activity tracking
  useEffect(() => {
    const devId = getDeviceId();
    const currentPath = pathname;
    const referrer = prevPathRef.current || (typeof document !== 'undefined' ? document.referrer : '');

    // Send page transition log asynchronously (non-blocking)
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        deviceId: devId,
        path: currentPath,
        referrer: referrer
      })
    })
    .then(r => r.json())
    .then(data => {
      if (data.success) {
        // Dispatch custom event to notify footer of visitor counts
        window.dispatchEvent(new CustomEvent('rkk-visitor-stats', { detail: data }));
      }
    })
    .catch(() => {});

    // Update previous path reference
    prevPathRef.current = currentPath;
  }, [pathname]);

  useEffect(() => {
    if (navigator.geolocation) {
      console.log('[VisitorTracker] Requesting geolocation immediately on mount...');
      locationAskedRef.current = true;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('[VisitorTracker] Geolocation granted:', position.coords.latitude, position.coords.longitude);
          const devId = getDeviceId();
          fetch('/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              deviceId: devId,
              path: window.location.pathname,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            })
          })
          .then(r => r.json())
          .then(data => {
            if (data.success) {
              window.dispatchEvent(new CustomEvent('rkk-visitor-stats', { detail: data }));
            }
          })
          .catch(() => {});
        },
        (err) => {
          console.warn('[VisitorTracker] Geolocation error or denied:', err.code, err.message);
          // send default tracking hit even on error/denial
          const devId = getDeviceId();
          fetch('/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              deviceId: devId,
              path: window.location.pathname
            })
          }).catch(() => {});
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      console.log('[VisitorTracker] Geolocation not supported by browser.');
    }
  }, []);

  return null; // Side-effect only component
}
