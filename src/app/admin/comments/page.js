// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : page.js
// Description : Page component for the admin/comments route.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

'use client';

import { useState, useEffect } from 'react';
import { Loader2, Trash2, CheckCircle, XCircle, Calendar, Mail, FileText, Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AdminComments() {
  const [comments, setComments] = useState([]);
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
  const loadComments = async () => {
    const response = await fetch('/api/admin/comments');
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch comments.');
    return data.comments || [];
  };

  const fetchComments = async () => {
    setLoading(true);
    try {
      setComments(await loadComments());
    } catch (err) {
      setError(err.message || 'Failed to load comments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    loadComments()
      .then((rows) => { if (!cancelled) setComments(rows); })
      .catch((err) => { if (!cancelled) setError(err.message || 'Failed to load comments.'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const handleToggleApprove = async (id, currentApproved) => {
    const nextState = !currentApproved;
    try {
      const response = await fetch('/api/admin/comments', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isApproved: nextState }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to update status.');
      
      // Update local state list
      setComments(comments.map(c => c.id === id ? { ...c, is_approved: nextState ? 1 : 0 } : c));
    } catch (err) {
      showAlert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this comment?')) {
      try {
        const response = await fetch(`/api/admin/comments?id=${id}`, { method: 'DELETE' });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to delete comment.');
        setComments(comments.filter(c => c.id !== id));
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
  const filteredComments = comments.filter(c =>
    c.author_name.toLowerCase().includes(search.toLowerCase()) ||
    (c.author_email && c.author_email.toLowerCase().includes(search.toLowerCase())) ||
    c.comment_text.toLowerCase().includes(search.toLowerCase()) ||
    (c.blog_title && c.blog_title.toLowerCase().includes(search.toLowerCase()))
  );

  const sortedComments = [...filteredComments].sort((a, b) => {
    let valA = a[sortField] ?? '';
    let valB = b[sortField] ?? '';
    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();

    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Paginated list
  const paginatedComments = sortedComments.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.max(Math.ceil(sortedComments.length / itemsPerPage), 1);

  if (loading && comments.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-3 text-foreground-muted text-sm">Loading discussion entries...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Comments Moderation</h1>
        <p className="text-foreground-muted text-xs mt-1">Approve, reject, or remove user discussion posts on your articles.</p>
      </div>

      {/* Controls: Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
          <input
            type="text"
            placeholder="Search comments..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:border-primary bg-card text-foreground"
          />
        </div>
      </div>

      {/* Comments List Table */}
      {sortedComments.length === 0 ? (
        <div className="bg-card border border-border p-12 text-center text-foreground-muted rounded-3xl text-sm shadow-sm">
          No comments found matching search query.
        </div>
      ) : (
        <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-background-alt border-b border-border/50 text-foreground-muted text-xs font-bold uppercase">
                  <th className="p-4 pl-6 cursor-pointer hover:bg-background-alt/50 transition-colors" onClick={() => handleSort('author_name')}>
                    <div className="flex items-center gap-1">
                      <span>Commenter Info</span>
                      {sortField === 'author_name' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                    </div>
                  </th>
                  <th className="p-4 cursor-pointer hover:bg-background-alt/50 transition-colors" onClick={() => handleSort('blog_title')}>
                    <div className="flex items-center gap-1">
                      <span>Article</span>
                      {sortField === 'blog_title' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                    </div>
                  </th>
                  <th className="p-4 cursor-pointer hover:bg-background-alt/50 transition-colors" onClick={() => handleSort('comment_text')}>
                    <div className="flex items-center gap-1">
                      <span>Message</span>
                      {sortField === 'comment_text' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                    </div>
                  </th>
                  <th className="p-4 cursor-pointer hover:bg-background-alt/50 transition-colors" onClick={() => handleSort('is_approved')}>
                    <div className="flex items-center gap-1">
                      <span>Status</span>
                      {sortField === 'is_approved' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                    </div>
                  </th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 text-foreground-muted text-sm">
                {paginatedComments.map((comm) => (
                  <tr key={comm.id} className="hover:bg-background-alt/30 transition-colors">
                    <td className="p-4 pl-6 space-y-1 max-w-[200px]">
                      <div className="font-semibold text-foreground truncate">{comm.author_name}</div>
                      {comm.author_email && (
                        <div className="flex items-center gap-1 text-[10px] text-foreground-muted font-mono truncate">
                          <Mail className="w-3 h-3 text-foreground-muted/40" />
                          <span>{comm.author_email}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-[10px] text-foreground-muted">
                        <Calendar className="w-3 h-3 text-foreground-muted/40" />
                        <span>{new Date(comm.created_at).toLocaleDateString('en-IN', { dateStyle: 'short' })}</span>
                      </div>
                    </td>
                    <td className="p-4 max-w-[180px]">
                      <div className="flex items-center gap-1 text-xs text-foreground-muted font-semibold truncate" title={comm.blog_title}>
                        <FileText className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>{comm.blog_title || 'General'}</span>
                      </div>
                    </td>
                    <td className="p-4 max-w-[280px]">
                      <p className="text-foreground-muted text-xs whitespace-pre-wrap leading-relaxed truncate" title={comm.comment_text}>
                        {comm.comment_text}
                      </p>
                    </td>
                    <td className="p-4">
                      {comm.is_approved === 1 ? (
                        <button
                          onClick={() => handleToggleApprove(comm.id, true)}
                          className="inline-flex items-center text-[10px] font-bold text-teal-500 bg-teal-500/10 border border-teal-500/20 rounded-full px-2.5 py-0.5 gap-1 cursor-pointer hover:bg-teal-500/25 transition-colors"
                          title="Click to Reject"
                        >
                          <CheckCircle className="w-3 h-3" />
                          <span>Approved</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleToggleApprove(comm.id, false)}
                          className="inline-flex items-center text-[10px] font-bold text-red-500 bg-red-500/10 border border-red-500/20 rounded-full px-2.5 py-0.5 gap-1 cursor-pointer hover:bg-red-500/25 transition-colors"
                          title="Click to Approve"
                        >
                          <XCircle className="w-3 h-3" />
                          <span>Rejected</span>
                        </button>
                      )}
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <button
                        onClick={() => handleDelete(comm.id)}
                        className="p-1.5 text-foreground-muted hover:text-red-600 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                        title="Delete Comment"
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
