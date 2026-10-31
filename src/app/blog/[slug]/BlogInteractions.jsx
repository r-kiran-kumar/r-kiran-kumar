// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : BlogInteractions.jsx
// Description : BlogInteractions module.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

const Twitter = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={props.className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Facebook = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={props.className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const Linkedin = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={props.className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const Whatsapp = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={props.className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const Share2 = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

export default function BlogInteractions({ slug, initialLikes, bottom = false }) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popped, setPopped] = useState(false);
  const [copied, setCopied] = useState(false);

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

  useEffect(() => {
    const devId = getDeviceId();
    let cancelled = false;
    fetch(`/api/blogs/${slug}/like?device_id=${encodeURIComponent(devId)}`)
      .then(r => r.json())
      .then(d => {
        if (cancelled) return;
        // The server is authoritative; the cached flag is only a fallback for
        // when it doesn't report a like state for this device.
        const cached = localStorage.getItem(`rkk-like-${slug}`) === 'true';
        if (d.likes !== undefined) setLikes(d.likes);
        setLiked(d.liked !== undefined ? d.liked : cached);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [slug]);

  const handleLike = async () => {
    if (loading) return;
    setLoading(true);
    const nextLiked = !liked;
    setLiked(nextLiked);
    setLikes(l => nextLiked ? l + 1 : Math.max(0, l - 1));
    setPopped(true);
    setTimeout(() => setPopped(false), 400);
    localStorage.setItem(`rkk-like-${slug}`, String(nextLiked));

    try {
      const devId = getDeviceId();
      const r = await fetch(`/api/blogs/${slug}/like`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceId: devId })
      });
      const d = await r.json();
      if (d.likes !== undefined) setLikes(d.likes);
      if (d.liked !== undefined) {
        setLiked(d.liked);
        localStorage.setItem(`rkk-like-${slug}`, String(d.liked));
      }
    } catch {}
    setLoading(false);
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Read this article on R Kiran Kumar's blog`;

  const handleSystemShare = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        text: shareText,
        url: shareUrl,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 sm:gap-3 ${bottom ? 'mt-8 pt-8 border-t' : 'mb-8'}`}
      style={bottom ? { borderColor: 'var(--card-border)' } : {}}>

      {/* Like Button */}
      <button
        onClick={handleLike}
        disabled={loading}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 shrink-0 ${liked ? 'text-white' : 'hover:scale-105'} ${popped ? 'like-pop' : ''}`}
        style={{
          background: liked ? 'linear-gradient(135deg, #ff6b8a, #ff4466)' : 'var(--badge-bg)',
          color: liked ? 'white' : 'var(--foreground-muted)',
          border: liked ? 'none' : '1px solid var(--card-border)',
        }}
        aria-label={liked ? 'Unlike this article' : 'Like this article'}
      >
        <Heart className={`w-4 h-4 transition-all ${liked ? 'fill-white' : ''}`} />
        <span>{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
      </button>

      {/* Divider */}
      <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">|</span>

      {/* Share Label */}
      <span className="text-xs font-semibold uppercase tracking-wider hidden sm:inline" style={{ color: 'var(--foreground-muted)' }}>Share:</span>

      {/* WhatsApp Share */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' - ' + shareUrl)}`}
        target="_blank" rel="noopener noreferrer"
        className="p-2 rounded-full border transition-all hover:scale-110 flex items-center justify-center hover:bg-emerald-50 dark:hover:bg-emerald-950/20"
        style={{ background: 'var(--badge-bg)', color: '#25D366', borderColor: 'var(--card-border)' }}
        title="Share on WhatsApp"
      >
        <Whatsapp className="w-4 h-4" />
      </a>

      {/* Twitter Share */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
        target="_blank" rel="noopener noreferrer"
        className="p-2 rounded-full border transition-all hover:scale-110 flex items-center justify-center hover:bg-sky-50 dark:hover:bg-sky-950/20"
        style={{ background: 'var(--badge-bg)', color: '#000000', borderColor: 'var(--card-border)' }}
        title="Share on Twitter / X"
      >
        <Twitter className="w-4 h-4" />
      </a>

      {/* LinkedIn Share */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
        target="_blank" rel="noopener noreferrer"
        className="p-2 rounded-full border transition-all hover:scale-110 flex items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-950/20"
        style={{ background: 'var(--badge-bg)', color: '#0A66C2', borderColor: 'var(--card-border)' }}
        title="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </a>

      {/* Facebook Share */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
        target="_blank" rel="noopener noreferrer"
        className="p-2 rounded-full border transition-all hover:scale-110 flex items-center justify-center hover:bg-indigo-50 dark:hover:bg-indigo-950/20"
        style={{ background: 'var(--badge-bg)', color: '#1877F2', borderColor: 'var(--card-border)' }}
        title="Share on Facebook"
      >
        <Facebook className="w-4 h-4" />
      </a>

      {/* Mobile/System Share */}
      <button
        onClick={handleSystemShare}
        className="p-2 rounded-full border transition-all hover:scale-110 flex items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
        style={{ background: 'var(--badge-bg)', color: 'var(--primary)', borderColor: 'var(--card-border)' }}
        title="More Share Options"
      >
        <Share2 className="w-4 h-4" />
      </button>

      {/* Sleek inline toast notification */}
      {copied && (
        <div className="fixed bottom-5 right-5 z-50 animate-slide-in-right">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl shadow-xl border bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 backdrop-blur-md">
            <span className="text-xs font-bold">✓ Link copied to clipboard!</span>
          </div>
        </div>
      )}
    </div>
  );
}
