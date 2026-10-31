// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : page.js
// Description : Page component for the admin route.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

'use client';

import { useState, useEffect } from 'react';
import { BookOpen, MessageSquare, FolderGit, Mail, Loader2, ImageIcon, Link2, Users, Activity } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/admin/stats');
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to load statistics.');
        }
        setStats(data.stats);
        setEnquiries(data.recentEnquiries || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch admin data.');
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <span className="ml-3 font-semibold" style={{ color: 'var(--foreground-muted)' }}>Loading Dashboard...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border p-6 rounded-2xl bg-red-50/50 border-red-200 text-red-700">
        <h2 className="font-bold text-lg mb-2">Error Loading Dashboard</h2>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  const statCards = [
    { label: 'Blog Posts', value: stats?.blogs || 0, icon: BookOpen, color: 'text-sky-500 bg-sky-500/10 border-sky-500/20' },
    { label: 'Blog Comments', value: stats?.comments || 0, icon: MessageSquare, color: 'text-teal-500 bg-teal-500/10 border-teal-500/20' },
    { label: 'Projects', value: stats?.projects || 0, icon: FolderGit, color: 'text-amber-500 bg-amber-500/10 border-amber-500/20' },
    { label: 'Gallery Photos', value: stats?.gallery || 0, icon: ImageIcon, color: 'text-purple-500 bg-purple-500/10 border-purple-500/20' },
    { label: 'Enquiries', value: stats?.enquiries || 0, icon: Mail, color: 'text-primary bg-primary/10 border-primary/20' },
    { label: 'Backlinks', value: stats?.backlinks || 0, icon: Link2, color: 'text-pink-500 bg-pink-500/10 border-pink-500/20' },
    { label: 'Unique Visitors', value: stats?.visitors || 0, icon: Users, color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20' },
    { label: 'Total Page Views', value: stats?.visits || 0, icon: Activity, color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: 'var(--foreground)' }}>Overview Dashboard</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--foreground-muted)' }}>Real-time site metrics and client contacts.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-8 gap-4">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="group border p-5 rounded-2xl shadow-sm flex items-center justify-between transition-all duration-300 hover:shadow-md hover:border-logo-orange/60 hover:-translate-y-0.5 border-border bg-gradient-to-br from-card to-background-alt">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider block text-foreground-muted">{card.label}</span>
                <span className="text-2xl font-extrabold block text-foreground">{card.value}</span>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-300 group-hover:scale-110 ${card.color}`}>
                <Icon className="w-4.5 h-4.5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Enquiries */}
      <div className="border rounded-2xl overflow-hidden shadow-sm" style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
        <div className="p-6 border-b" style={{ borderColor: 'var(--card-border)' }}>
          <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
            <Mail className="w-5 h-5 text-primary" />
            <span>Recent Contact Enquiries</span>
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--foreground-muted)' }}>Latest 5 entries submitted through the contact form.</p>
        </div>

        {enquiries.length === 0 ? (
          <div className="p-10 text-center text-sm" style={{ color: 'var(--foreground-muted)' }}>
            No contact submissions received yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-xs font-bold uppercase" style={{ background: 'var(--background-alt)', borderColor: 'var(--card-border)', color: 'var(--foreground-muted)' }}>
                  <th className="p-4 pl-6">Client Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4 pr-6">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y text-sm" style={{ borderColor: 'var(--card-border)', color: 'var(--foreground-muted)' }}>
                {enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-primary/5 transition-colors">
                    <td className="p-4 pl-6 font-semibold" style={{ color: 'var(--foreground)' }}>{enq.full_name}</td>
                    <td className="p-4 font-mono text-xs">{enq.email}</td>
                    <td className="p-4 text-xs font-semibold">{enq.phone_number}</td>
                    <td className="p-4 pr-6 text-xs">
                      {new Date(enq.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
