// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : ContactForm.jsx
// Description : ContactForm module.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Send, AlertCircle, CheckCircle } from 'lucide-react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim() || !message.trim()) {
      setError('All fields are required.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const devId = typeof window !== 'undefined' ? localStorage.getItem('rkk-device-id') || '' : '';
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, message, deviceId: devId }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit form.');
      }

      setSuccess('Your message was received! R Kiran Kumar will contact you shortly.');
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-foreground">Send a Message</h3>
        <p className="text-foreground-muted text-xs font-light">Share your project ideas or logistics plan, and I will write back.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-xs font-semibold text-foreground-muted mb-1">Your Name</label>
          <input
            id="contact-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="Kiran Kumar"
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className="block text-xs font-semibold text-foreground-muted mb-1">Phone Number</label>
          <input
            id="contact-phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="+91 9988776655"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-xs font-semibold text-foreground-muted mb-1">Email Address</label>
        <input
          id="contact-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          placeholder="kiran@example.com"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-xs font-semibold text-foreground-muted mb-1">Message or Requirements</label>
        <textarea
          id="contact-message"
          required
          rows="5"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          placeholder="Describe your project, app ideas or timelines..."
        />
      </div>

      {error && (
        <div className="flex items-center space-x-2 text-red-500 text-xs font-semibold">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center space-x-2 text-emerald-500 text-xs font-semibold">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all duration-200 gap-2 cursor-pointer"
      >
        <span>{loading ? 'Sending Message...' : 'Send Message'}</span>
        <Send className="w-4 h-4" />
      </button>

      <p className="text-center text-[8px] text-foreground-muted font-medium">
        By submitting, you agree to our <Link href="/terms" className="text-primary hover:underline font-bold">Terms</Link> and <Link href="/privacy" className="text-primary hover:underline font-bold">Privacy Policy</Link>.
      </p>
    </form>
  );
}
