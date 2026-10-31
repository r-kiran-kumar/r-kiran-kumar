// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : page.js
// Description : Page component for the faqs route.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

'use client';

import { useState, useEffect } from 'react';
import { HelpCircle, ChevronDown, Send, CheckCircle2, MessageSquare, Loader2, Phone, Mail, User } from 'lucide-react';

export default function FaqsPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [question, setQuestion] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Pure I/O, no state — lets the mount effect drive it from a callback rather
  // than calling a setState-bearing function synchronously, and lets the effect
  // drop the result if the component unmounted mid-flight.
  const loadFaqs = async () => {
    const res = await fetch('/api/faqs');
    const data = await res.json();
    return data.success ? (data.faqs || []) : [];
  };

  const fetchFaqs = async () => {
    try {
      setFaqs(await loadFaqs());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    loadFaqs()
      .then((rows) => { if (!cancelled) setFaqs(rows); })
      .catch((e) => { console.error(e); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !question) {
      setError('Please provide your name and your question.');
      return;
    }
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, question })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setName('');
        setEmail('');
        setPhone('');
        setQuestion('');
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Connection failed. Please check your internet and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-16">
      
      {/* FAQPage JSON-LD — injected dynamically from loaded FAQ data */}
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "@id": "https://rkirankumar.com/faqs#faqpage",
            "name": "Frequently Asked Questions — R Kiran Kumar",
            "url": "https://rkirankumar.com/faqs",
            "inLanguage": "en-IN",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://rkirankumar.com/" },
                { "@type": "ListItem", "position": 2, "name": "FAQs", "item": "https://rkirankumar.com/faqs" }
              ]
            },
            "mainEntity": faqs.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}}
        />
      )}

      {/* Headings */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Got Questions? We Have Answers</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Frequently Asked Questions
        </h1>
        <p className="text-foreground-muted text-sm max-w-xl mx-auto font-light leading-relaxed">
          Find instant answers to common questions about my technology stack, development workflow, and locations, or ask your own question below.
        </p>
      </div>

      {/* Accordions */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : faqs.length === 0 ? (
        <div className="bg-card border border-border p-8 text-center text-foreground-muted rounded-2xl text-sm">
          No published FAQs found. Be the first to ask a question!
        </div>
      ) : (
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={faq.id} 
                className="bg-card border border-border/80 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-foreground text-sm sm:text-base hover:bg-badge/50 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-foreground-muted transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
                </button>
                <div 
                  className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[300px] border-t border-border/50 p-5' : 'max-h-0 overflow-hidden p-0'}`}
                >
                  <p className="text-foreground-muted text-xs sm:text-sm leading-relaxed font-light whitespace-pre-wrap">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Ask Question Form */}
      <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-md max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-2.5 text-primary border-b border-border/50 pb-4">
          <MessageSquare className="w-5 h-5 shrink-0" />
          <h2 className="text-lg font-bold text-foreground">Ask R Kiran Kumar a Question</h2>
        </div>

        {success ? (
          <div className="p-6 bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 rounded-2xl flex flex-col items-center text-center space-y-3">
            <CheckCircle2 className="w-10 h-10" />
            <h3 className="font-bold text-base">Question Submitted!</h3>
            <p className="text-xs leading-relaxed max-w-sm font-light">
              Your question has been logged successfully. Once reviewed and answered, it will appear publicly on this page. Thank you!
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="mt-2 text-xs font-semibold hover:underline text-primary"
            >
              Ask another question
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs rounded-xl font-medium">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-foreground-muted mb-1">Your Name *</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted/60" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-badge/40 border border-border/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary placeholder:text-foreground-muted/50"
                    placeholder="e.g. Anand"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground-muted mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted/60" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-badge/40 border border-border/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary placeholder:text-foreground-muted/50"
                    placeholder="anand@example.com"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground-muted mb-1">Phone Number (Optional)</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted/60" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-badge/40 border border-border/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary placeholder:text-foreground-muted/50"
                  placeholder="e.g. +91 98765 43210"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground-muted mb-1">Your Question *</label>
              <textarea
                required
                rows="4"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full bg-badge/40 border border-border/80 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary resize-none placeholder:text-foreground-muted/50"
                placeholder="What would you like to know?"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-white text-xs sm:text-sm font-bold py-3 px-6 rounded-xl shadow-md gap-1.5 transition cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Question</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

    </div>
  );
}
