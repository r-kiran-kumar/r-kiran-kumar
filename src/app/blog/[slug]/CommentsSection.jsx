// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : CommentsSection.jsx
// Description : CommentsSection module.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MessageSquare, Send, User, Image as ImageIcon, ChevronDown, ChevronUp } from 'lucide-react';

function formatDate(dt) {
  return new Date(dt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function Avatar({ name }) {
  const initials = name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || '?';
  const hue = name ? name.charCodeAt(0) * 13 % 360 : 200;
  return (
    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm"
      style={{ background: `hsl(${hue}, 60%, 48%)` }}>
      {initials}
    </div>
  );
}

export default function CommentsSection({ blogId, slug, initialComments = [] }) {
  const [comments, setComments] = useState(initialComments);
  const [form, setForm] = useState({ name: '', email: '', text: '', image_url: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  const handleImageUrl = (url) => {
    setForm(f => ({ ...f, image_url: url }));
    setImagePreview(url.startsWith('https://') ? url : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (!form.name.trim()) return setError('Please enter your name.');
    if (!form.text.trim()) return setError('Please write a comment.');
    setSubmitting(true);
    try {
      const devId = typeof window !== 'undefined' ? localStorage.getItem('rkk-device-id') || '' : '';
      const res = await fetch(`/api/blogs/${slug}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: form.name, 
          email: form.email, 
          text: form.text, 
          image_url: form.image_url,
          deviceId: devId
        }),
      });
      const data = await res.json();
      if (data.success) {
        setComments(prev => [...prev, data.comment]);
        setForm({ name: '', email: '', text: '', image_url: '' });
        setImagePreview('');
        setSuccess('✓ Comment posted! Thanks for sharing your thoughts.');
        setShowForm(false);
        setTimeout(() => setSuccess(''), 4000);
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection.');
    }
    setSubmitting(false);
  };

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--card-border)' }}>
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between" style={{ background: 'var(--card-bg)', borderBottom: '1px solid var(--card-border)' }}>
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold" style={{ color: 'var(--foreground)' }}>
            Discussion <span className="text-sm font-normal ml-1" style={{ color: 'var(--foreground-muted)' }}>({comments.length})</span>
          </h2>
        </div>
        <button
          onClick={() => setShowForm(f => !f)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ background: 'var(--primary)' }}
        >
          {showForm ? <><ChevronUp className="w-4 h-4" /> Cancel</> : <><MessageSquare className="w-4 h-4" /> Write a Comment</>}
        </button>
      </div>

      {/* Success Banner */}
      {success && (
        <div className="px-5 py-3 text-sm font-medium text-emerald-700 bg-emerald-50 border-b border-emerald-100 animate-fade-in">
          {success}
        </div>
      )}

      {/* Comment Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="p-5 space-y-4 border-b animate-fade-in" style={{ background: 'var(--background-alt)', borderColor: 'var(--card-border)' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5" style={{ color: 'var(--foreground-muted)' }}>
                Your Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--foreground-muted)' }} />
                <input
                  className="field pl-9"
                  placeholder="R Kiran Kumar"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  maxLength={100}
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5" style={{ color: 'var(--foreground-muted)' }}>
                Email <span className="font-normal normal-case">(optional)</span>
              </label>
              <input
                className="field"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5" style={{ color: 'var(--foreground-muted)' }}>
              Your Comment *
            </label>
            <textarea
              className="field resize-none"
              rows={4}
              placeholder="Share your thoughts, questions, or feedback…"
              value={form.text}
              onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
              maxLength={3000}
            />
            <p className="text-xs mt-1 text-right" style={{ color: 'var(--foreground-muted)' }}>{form.text.length}/3000</p>
          </div>

          {/* Optional Image URL */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5" style={{ color: 'var(--foreground-muted)' }}>
              <ImageIcon className="w-3.5 h-3.5 inline mr-1" /> Attach Image URL <span className="font-normal normal-case">(optional, https only)</span>
            </label>
            <input
              className="field"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={form.image_url}
              onChange={e => handleImageUrl(e.target.value)}
            />
            {imagePreview && (
              <div className="mt-2 relative h-28 w-48 rounded-xl overflow-hidden border" style={{ borderColor: 'var(--card-border)' }}>
                <Image src={imagePreview} alt="Preview" fill sizes="192px" className="object-cover" unoptimized
                  onError={() => setImagePreview('')} />
              </div>
            )}
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-60"
            style={{ background: 'var(--primary)' }}
          >
            <Send className="w-4 h-4" />
            {submitting ? 'Posting…' : 'Post Comment'}
          </button>
        </form>
      )}

      {/* Comments List */}
      <div style={{ background: 'var(--card-bg)' }}>
        {comments.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--card-border)' }} />
            <p className="text-sm font-medium" style={{ color: 'var(--foreground-muted)' }}>No comments yet — be the first!</p>
            {!showForm && (
              <button onClick={() => setShowForm(true)} className="mt-3 px-4 py-2 rounded-xl text-white text-sm font-semibold" style={{ background: 'var(--primary)' }}>
                Write a Comment
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: 'var(--card-border)' }}>
            {comments.map((comment, idx) => (
              <div key={comment.id || idx} className="p-5 flex gap-3 animate-fade-in">
                <Avatar name={comment.author_name} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                    <span className="font-semibold text-sm" style={{ color: 'var(--foreground)' }}>{comment.author_name}</span>
                    <span className="text-xs" style={{ color: 'var(--foreground-muted)' }}>{formatDate(comment.created_at)}</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>{comment.comment_text}</p>
                  {comment.image_url && (
                    <div className="mt-3 relative rounded-xl overflow-hidden max-w-xs" style={{ border: '1px solid var(--card-border)' }}>
                      <Image src={comment.image_url} alt="Attached" width={320} height={192} unoptimized className="w-full h-auto max-h-48 object-cover" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
