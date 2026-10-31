// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : VisitorCounter.jsx
// Description : VisitorCounter UI component.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

'use client';

import { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';

export default function VisitorCounter() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const handleStats = (e) => {
      if (e.detail) {
        setStats(e.detail);
      }
    };
    window.addEventListener('rkk-visitor-stats', handleStats);

    // Fetch initial stats
    const devId = localStorage.getItem('rkk-device-id');
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        deviceId: devId || 'rkk_init', 
        path: window.location.pathname 
      })
    })
    .then(r => r.json())
    .then(data => {
      if (data.success) setStats(data);
    })
    .catch(() => {});

    return () => window.removeEventListener('rkk-visitor-stats', handleStats);
  }, []);

  if (!stats) return <span className="opacity-40">Connecting stats...</span>;

  return (
    <span className="inline-flex items-center gap-1 text-slate-400 dark:text-slate-500 font-medium">
      <Eye className="w-3.5 h-3.5 text-primary shrink-0" />
      <span>{stats.totalVisits.toLocaleString()} views</span>
    </span>
  );
}
