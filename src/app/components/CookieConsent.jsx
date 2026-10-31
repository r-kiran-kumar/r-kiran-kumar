// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : CookieConsent.jsx
// Description : CookieConsent UI component.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

'use client';

import { useState, useEffect } from 'react';
import { Shield, X } from 'lucide-react';
import Link from 'next/link';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user has already made a selection
    const consent = localStorage.getItem('rkk-cookie-consent');
    if (!consent) {
      // Show consent banner after a small delay (1s)
      const timer = setTimeout(() => setShow(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('rkk-cookie-consent', 'accepted');
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem('rkk-cookie-consent', 'declined');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:max-w-md z-[100] animate-slide-up">
      <div className="bg-card/95 border border-border/80 backdrop-blur-md rounded-2xl p-5 shadow-2xl space-y-4">
        
        {/* Header Title */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-primary">
            <Shield className="w-5 h-5 shrink-0" />
            <h4 className="text-sm font-bold text-foreground">Cookie Consent & Analytics</h4>
          </div>
          <button 
            onClick={handleDecline} 
            className="p-1 hover:bg-badge rounded-lg transition-colors cursor-pointer text-foreground-muted hover:text-foreground"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Description text */}
        <p className="text-xs text-foreground-muted leading-relaxed font-light">
          We use cookies and unique local identifier logs to maintain lightning-fast page loading speeds, track global visitor statistics, support personal blog likes, and comply with safety standards. Learn more in our <Link href="/privacy" className="text-primary hover:underline font-semibold">Privacy Policy</Link>.
        </p>

        {/* Buttons */}
        <div className="flex gap-2 justify-end pt-1">
          <button
            onClick={handleDecline}
            className="px-3.5 py-2 border border-border hover:bg-badge rounded-xl text-xs font-bold text-foreground-muted hover:text-foreground transition-all cursor-pointer bg-transparent"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-primary/10 cursor-pointer"
          >
            Accept Cookies
          </button>
        </div>

      </div>
    </div>
  );
}
