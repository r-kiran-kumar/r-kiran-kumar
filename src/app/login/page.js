// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : page.js
// Description : Page component for the login route.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Lock, Mail, Loader2, ArrowLeft, AlertCircle } from 'lucide-react';

function LoginContent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed.');
      }

      router.push(redirect);
      router.refresh();
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative max-w-md w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl space-y-6">
      
      {/* Decorative Brand Accent (Orange/Cyan corner gradient) */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-logo-orange/20 to-primary/20 rounded-bl-[2.5rem] pointer-events-none rounded-tr-[2.5rem] blur-xl" />

      <div className="text-center space-y-2">
        {/* Brand Favicon icon */}
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-slate-100 to-white dark:from-slate-800/90 dark:to-slate-900/90 border border-slate-200/50 dark:border-slate-800/50 flex items-center justify-center mx-auto shadow-md relative group">
          <Image
            src="/assets/favicon-96x96.png"
            alt="R Kiran Kumar Favicon"
            width={48}
            height={48}
            className="w-20 h-20 rounded-xl object-contain transition-transform group-hover:scale-110"
          />
          {/* Subtle Orange pulsing dot highlight */}
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-logo-orange border-2 border-white dark:border-slate-900 animate-pulse" />
        </div>
        
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-4">
          Admin <span style={{ color: 'var(--primary)' }}>Access</span>
        </h1>
        <p className="text-slate-400 dark:text-slate-500 text-xs font-light max-w-[280px] mx-auto leading-relaxed">
          Verify credentials to enter the ChronoSpark database management workspace.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="login-email" className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
            <input
              id="login-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50/60 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              placeholder="kirankumar.3219.rkk@gmail.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="login-password" className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
            <input
              id="login-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50/60 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              placeholder="••••••••"
            />
          </div>
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-red-500 dark:text-red-400 text-xs font-semibold bg-red-50 dark:bg-red-950/20 p-3 rounded-2xl border border-red-100 dark:border-red-900/40 animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary disabled:from-primary/50 disabled:to-primary/50 text-white font-extrabold py-3 rounded-2xl shadow-xl shadow-primary/25 hover:shadow-primary/35 transition-all duration-300 gap-2 cursor-pointer border-t border-white/20"
        >
          {loading ? (
            <>
              <Loader2 className="w-4.5 h-4.5 animate-spin" />
              <span>Verifying Session...</span>
            </>
          ) : (
            <span>Launch Dashboard</span>
          )}
        </button>
      </form>

      <div className="border-t border-slate-100 dark:border-slate-800/60 pt-5 text-center">
        <Link href="/" className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-primary transition-colors gap-1.5">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Public Site</span>
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden bg-slate-50 dark:bg-slate-950">
      
      {/* Immersive Background Glows (Cyan & Logo Orange highlights) */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[140px] opacity-25 dark:opacity-15 pointer-events-none"
           style={{ background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full blur-[160px] opacity-20 dark:opacity-10 pointer-events-none"
           style={{ background: 'radial-gradient(circle, var(--logo-orange) 0%, transparent 70%)' }} />

      <Suspense fallback={
        <div className="text-center text-slate-500 text-sm">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-primary" />
          <span>Loading Page Component...</span>
        </div>
      }>
        <LoginContent />
      </Suspense>
    </div>
  );
}
