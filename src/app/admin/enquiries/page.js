// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : page.js
// Description : Page component for the admin/enquiries route.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Loader2, Trash2, Calendar, Mail, Phone, MessageSquare, Compass, Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Navigation, ArrowUpRight, Inbox } from 'lucide-react';

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Search & Sorting & Pagination State
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const [modalAlert, setModalAlert] = useState(null); // { title, message, type }

  const showAlert = (message, title = 'Notification', type = 'error') => {
    setModalAlert({ title, message, type });
  };

  // Pure I/O, no state — lets the mount effect drive it from a callback rather
  // than calling a setState-bearing function synchronously, and lets the effect
  // drop the result if the component unmounted mid-flight.
  const loadEnquiries = async () => {
    const response = await fetch('/api/admin/enquiries');
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch enquiries.');
    return data.enquiries || [];
  };

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      setEnquiries(await loadEnquiries());
    } catch (err) {
      setError(err.message || 'Failed to load enquiries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    loadEnquiries()
      .then((rows) => { if (!cancelled) setEnquiries(rows); })
      .catch((err) => { if (!cancelled) setError(err.message || 'Failed to load enquiries.'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch('/api/admin/enquiries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to update status.');
      
      setEnquiries(enquiries.map(e => e.id === id ? { ...e, status: newStatus } : e));
    } catch (err) {
      showAlert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this enquiry record?')) {
      try {
        const response = await fetch(`/api/admin/enquiries?id=${id}`, { method: 'DELETE' });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to delete enquiry.');
        setEnquiries(enquiries.filter(e => e.id !== id));
      } catch (err) {
        showAlert(err.message);
      }
    }
  };

  // Sorting Handler
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setPage(1);
  };

  // Filtered & Sorted list
  const filteredEnquiries = enquiries.filter(e =>
    e.full_name.toLowerCase().includes(search.toLowerCase()) ||
    e.email.toLowerCase().includes(search.toLowerCase()) ||
    e.phone_number.toLowerCase().includes(search.toLowerCase()) ||
    e.message.toLowerCase().includes(search.toLowerCase()) ||
    (e.location && e.location.toLowerCase().includes(search.toLowerCase()))
  );

  const sortedEnquiries = [...filteredEnquiries].sort((a, b) => {
    let valA = a[sortField] ?? '';
    let valB = b[sortField] ?? '';
    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();

    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Paginated list
  const paginatedEnquiries = sortedEnquiries.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.max(Math.ceil(sortedEnquiries.length / itemsPerPage), 1);

  if (loading && enquiries.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-3 text-foreground-muted text-sm">Loading contact submissions...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Contact Enquiries</h1>
        <p className="text-foreground-muted text-xs mt-1">Review and manage messages received through the public contact forms.</p>
      </div>

      {/* Controls: Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
          <input
            type="text"
            placeholder="Search enquiries..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:border-primary bg-card text-foreground"
          />
        </div>
      </div>

      {/* Enquiries List Table */}
      {sortedEnquiries.length === 0 ? (
        <div className="bg-card border border-border p-12 text-center text-foreground-muted rounded-3xl text-sm shadow-sm">
          No enquiries found matching search query.
        </div>
      ) : (
        <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-background-alt border-b border-border/50 text-foreground-muted text-xs font-bold uppercase">
                  <th className="p-4 pl-6 cursor-pointer hover:bg-background-alt/50 transition-colors" onClick={() => handleSort('full_name')}>
                    <div className="flex items-center gap-1">
                      <span>Sender Details</span>
                      {sortField === 'full_name' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                    </div>
                  </th>
                  <th className="p-4 cursor-pointer hover:bg-background-alt/50 transition-colors" onClick={() => handleSort('message')}>
                    <div className="flex items-center gap-1">
                      <span>Message Details</span>
                      {sortField === 'message' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                    </div>
                  </th>
                  <th className="p-4 cursor-pointer hover:bg-background-alt/50 transition-colors" onClick={() => handleSort('location')}>
                    <div className="flex items-center gap-1">
                      <span>Tracking IP & Location</span>
                      {sortField === 'location' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                    </div>
                  </th>
                  <th className="p-4 cursor-pointer hover:bg-background-alt/50 transition-colors" onClick={() => handleSort('status')}>
                    <div className="flex items-center gap-1">
                      <span>Status</span>
                      {sortField === 'status' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                    </div>
                  </th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 text-foreground-muted text-sm">
                {paginatedEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-background-alt/30 transition-colors">
                    <td className="p-4 pl-6 space-y-1 max-w-[220px]">
                      <div className="font-semibold text-foreground truncate">{enq.full_name}</div>
                      <div className="flex items-center gap-1 text-[10px] text-foreground-muted font-mono truncate">
                        <Mail className="w-3 h-3 text-foreground-muted/40 shrink-0" />
                        <span>{enq.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-foreground-muted font-mono truncate">
                        <Phone className="w-3 h-3 text-foreground-muted/40 shrink-0" />
                        <span>{enq.phone_number}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-foreground-muted">
                        <Calendar className="w-3 h-3 text-foreground-muted/40 shrink-0" />
                        <span>{new Date(enq.created_at).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}</span>
                      </div>
                    </td>
                    <td className="p-4 max-w-[280px]">
                      <p className="text-foreground-muted text-xs whitespace-pre-wrap leading-relaxed truncate" title={enq.message}>
                        {enq.message}
                      </p>
                    </td>
                    <td className="p-4 max-w-[200px] space-y-1">
                      <div className="text-[10px] text-foreground-muted font-mono truncate">IP: {enq.ip_address}</div>
                      {enq.device_id && (
                        <div className="text-[9px] text-foreground-muted font-mono truncate">
                          <Link href={`/admin/visitors?search=${encodeURIComponent(enq.device_id)}`} className="hover:underline hover:text-primary transition-colors">
                            Dev ID: {enq.device_id.substring(0, 14)}...
                          </Link>
                        </div>
                      )}
                      {enq.location && (
                        <div className="text-[10px] text-primary flex items-center gap-0.5 font-medium truncate">
                          {enq.location.startsWith('Coords:') ? (
                            <a
                              href={`https://www.google.com/maps?q=${enq.location.replace('Coords: ', '')}`}
                              target="_blank" rel="noopener noreferrer"
                              className="hover:underline inline-flex items-center gap-0.5"
                            >
                              <Navigation className="w-3 h-3 shrink-0" />
                              <span>GPS Coordinates</span>
                              <ArrowUpRight className="w-2.5 h-2.5 shrink-0" />
                            </a>
                          ) : (
                            <span>{enq.location}</span>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <select
                        value={enq.status}
                        onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                        className="text-xs bg-background-alt border border-border rounded-lg px-2.5 py-1 text-foreground focus:outline-none focus:border-primary h-8"
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                      </select>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <button
                        onClick={() => handleDelete(enq.id)}
                        className="p-1.5 text-foreground-muted hover:text-red-600 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                        title="Delete record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-border flex items-center justify-between bg-background-alt/30 rounded-b-3xl">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="inline-flex items-center gap-1 px-3 py-1.5 border border-border rounded-lg text-xs font-semibold hover:bg-background-alt disabled:opacity-50 transition cursor-pointer bg-card text-foreground"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>
              <span className="text-xs font-bold text-foreground-muted">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="inline-flex items-center gap-1 px-3 py-1.5 border border-border rounded-lg text-xs font-semibold hover:bg-background-alt disabled:opacity-50 transition cursor-pointer bg-card text-foreground"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Sleek Modal Alert Dialog */}
      {modalAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-card border border-border w-full max-w-sm p-6 rounded-3xl shadow-2xl animate-scale-in text-center space-y-4">
            <div className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center ${
              modalAlert.type === 'error' ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'
            }`}>
              {modalAlert.type === 'error' ? <span className="text-xl font-bold">✕</span> : <span className="text-xl font-bold">✓</span>}
            </div>
            <h3 className="text-lg font-bold text-foreground">{modalAlert.title}</h3>
            <p className="text-sm text-foreground-muted leading-relaxed">{modalAlert.message}</p>
            <button
              onClick={() => setModalAlert(null)}
              className="w-full py-2.5 rounded-xl font-bold bg-primary text-white hover:bg-primary-hover transition-colors text-sm cursor-pointer"
              style={{ color: '#ffffff' }}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
