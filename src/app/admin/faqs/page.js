// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : page.js
// Description : Page component for the admin/faqs route.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

'use client';

import { useState, useEffect } from 'react';
import { fetchJson } from '@/lib/api';
import { Plus, Edit2, Trash2, Loader2, Save, X, Eye, EyeOff, Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, HelpCircle, Mail, Phone, Calendar, UserCheck } from 'lucide-react';

export default function AdminFaqs() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Search & Sorting & Pagination State
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('sort_order');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  // Form State
  const [editId, setEditId] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [sortOrderForm, setSortOrderForm] = useState('99');
  const [isPublished, setIsPublished] = useState(false);
  const [modalAlert, setModalAlert] = useState(null); // { title, message, type }

  const showAlert = (message, title = 'Notification', type = 'error') => {
    setModalAlert({ title, message, type });
  };

  // Pure I/O, no state — lets the mount effect drive it from a callback rather
  // than calling a setState-bearing function synchronously, and lets the effect
  // drop the result if the component unmounted mid-flight.
  const loadFaqs = async () => {
    const data = await fetchJson('/api/admin/faqs');
    return data.faqs || [];
  };

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      setFaqs(await loadFaqs());
    } catch (err) {
      showAlert(err.message || 'Failed to load FAQs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    loadFaqs()
      .then((rows) => { if (!cancelled) setFaqs(rows); })
      .catch((err) => { if (!cancelled) showAlert(err.message || 'Failed to load FAQs.'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const openAddModal = () => {
    setEditId(null);
    setQuestion('');
    setAnswer('');
    setSortOrderForm('99');
    setIsPublished(true);
    setShowModal(true);
  };

  const openEditModal = (faq) => {
    setEditId(faq.id);
    setQuestion(faq.question);
    setAnswer(faq.answer || '');
    setSortOrderForm(String(faq.sort_order || 99));
    setIsPublished(faq.is_published === 1);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this FAQ?')) {
      try {
        await fetchJson(`/api/admin/faqs?id=${id}`, { method: 'DELETE' });
        setFaqs(faqs.filter(f => f.id !== id));
      } catch (err) {
        showAlert(err.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question) {
      showAlert('Question is required.');
      return;
    }

    setSaving(true);
    const body = {
      id: editId,
      question,
      answer,
      sortOrder: sortOrderForm,
      isPublished
    };

    try {
      await fetchJson('/api/admin/faqs', {
        method: editId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      setShowModal(false);
      fetchFaqs();
    } catch (err) {
      showAlert(err.message);
    } finally {
      setSaving(false);
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
  const filteredFaqs = faqs.filter(f =>
    f.question.toLowerCase().includes(search.toLowerCase()) ||
    (f.answer && f.answer.toLowerCase().includes(search.toLowerCase())) ||
    (f.name && f.name.toLowerCase().includes(search.toLowerCase())) ||
    (f.email && f.email.toLowerCase().includes(search.toLowerCase()))
  );

  const sortedFaqs = [...filteredFaqs].sort((a, b) => {
    let valA = a[sortField] ?? '';
    let valB = b[sortField] ?? '';
    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();

    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Paginated list
  const paginatedFaqs = sortedFaqs.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.max(Math.ceil(sortedFaqs.length / itemsPerPage), 1);

  if (loading && faqs.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-3 font-semibold text-foreground-muted">Loading FAQs...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Manage FAQs</h1>
          <p className="text-foreground-muted text-xs mt-1">Answer user questions or publish FAQs directly to your website.</p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center bg-primary hover:bg-primary-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New FAQ</span>
        </button>
      </div>

      {/* Controls: Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
          <input
            type="text"
            placeholder="Search questions & answers..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:border-primary bg-card text-foreground"
          />
        </div>
      </div>

      {/* FAQs List Table */}
      {sortedFaqs.length === 0 ? (
        <div className="bg-card border border-border p-12 text-center text-foreground-muted rounded-3xl text-sm shadow-sm">
          No FAQs found matching search query.
        </div>
      ) : (
        <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-background-alt border-b border-border/50 text-foreground-muted text-xs font-bold uppercase">
                  <th className="p-4 pl-6 cursor-pointer hover:bg-background-alt/50 transition-colors" onClick={() => handleSort('question')}>
                    <div className="flex items-center gap-1">
                      <span>FAQ Question & Submitter</span>
                      {sortField === 'question' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                    </div>
                  </th>
                  <th className="p-4 cursor-pointer hover:bg-background-alt/50 transition-colors" onClick={() => handleSort('answer')}>
                    <div className="flex items-center gap-1">
                      <span>Answer</span>
                      {sortField === 'answer' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                    </div>
                  </th>
                  <th className="p-4 cursor-pointer hover:bg-background-alt/50 transition-colors" onClick={() => handleSort('sort_order')}>
                    <div className="flex items-center gap-1">
                      <span>Sort Order</span>
                      {sortField === 'sort_order' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                    </div>
                  </th>
                  <th className="p-4 cursor-pointer hover:bg-background-alt/50 transition-colors" onClick={() => handleSort('is_published')}>
                    <div className="flex items-center gap-1">
                      <span>Status</span>
                      {sortField === 'is_published' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                    </div>
                  </th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 text-foreground-muted text-sm">
                {paginatedFaqs.map((faq) => (
                  <tr key={faq.id} className="hover:bg-background-alt/30 transition-colors">
                    <td className="p-4 pl-6 space-y-1 max-w-[280px]">
                      <div className="font-semibold text-foreground leading-normal">{faq.question}</div>
                      {faq.name ? (
                        <div className="space-y-0.5 mt-1 text-[10px] text-foreground-muted border-t border-border/30 pt-1.5">
                          <div className="font-medium text-foreground-muted">Asked by: {faq.name}</div>
                          {faq.email && (
                            <div className="flex items-center gap-1 font-mono">
                              <Mail className="w-3 h-3 text-foreground-muted/40" />
                              <span>{faq.email}</span>
                            </div>
                          )}
                          {faq.phone && (
                            <div className="flex items-center gap-1 font-mono">
                              <Phone className="w-3 h-3 text-foreground-muted/40" />
                              <span>{faq.phone}</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-[10px] text-emerald-500 flex items-center gap-1 font-bold pt-1.5">
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>Admin Authored</span>
                        </div>
                      )}
                    </td>
                    <td className="p-4 max-w-[320px]">
                      {faq.answer ? (
                        <p className="text-foreground-muted text-xs whitespace-pre-wrap leading-relaxed truncate" title={faq.answer}>
                          {faq.answer}
                        </p>
                      ) : (
                        <span className="inline-flex items-center text-[10px] font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 rounded-full px-2 py-0.5">
                          Pending Answer
                        </span>
                      )}
                    </td>
                    <td className="p-4 font-mono text-xs">{faq.sort_order}</td>
                    <td className="p-4">
                      {faq.is_published === 1 ? (
                        <span className="inline-flex items-center text-[10px] font-bold text-teal-500 bg-teal-500/10 border border-teal-500/20 rounded-full px-2 py-0.5 gap-1">
                          <Eye className="w-3 h-3" />
                          <span>Published</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-[10px] font-bold text-foreground-muted bg-background-alt border border-border rounded-full px-2 py-0.5 gap-1">
                          <EyeOff className="w-3 h-3" />
                          <span>Draft</span>
                        </span>
                      )}
                    </td>
                    <td className="p-4 pr-6 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(faq)}
                        className="p-1.5 text-foreground-muted hover:text-primary hover:bg-background-alt rounded-lg transition-colors cursor-pointer"
                        title={faq.answer ? "Edit FAQ" : "Answer FAQ"}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(faq.id)}
                        className="p-1.5 text-foreground-muted hover:text-red-600 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                        title="Delete FAQ"
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

      {/* FAQ Editor Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-card rounded-3xl max-w-xl w-full max-h-[85vh] overflow-hidden shadow-2xl flex flex-col border border-border animate-scale-in">
            <div className="p-6 border-b border-border/60 flex justify-between items-center shrink-0">
              <h2 className="text-lg font-bold text-foreground">
                {editId ? (answer ? 'Edit FAQ' : 'Answer Question') : 'New FAQ'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-background-alt rounded-lg cursor-pointer">
                <X className="w-5 h-5 text-foreground-muted" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col flex-grow overflow-hidden">
              <div className="p-6 space-y-4 overflow-y-auto flex-grow">
                <div>
                  <label className="block text-xs font-semibold text-foreground-muted mb-1">Question *</label>
                  <textarea
                    required
                    rows="3"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full bg-background-alt border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary resize-none"
                    placeholder="Enter the question..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground-muted mb-1">Answer</label>
                  <textarea
                    rows="5"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="w-full bg-background-alt border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary resize-none"
                    placeholder="Provide the answer..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 items-center">
                  <div>
                    <label className="block text-xs font-semibold text-foreground-muted mb-1">Sort Order</label>
                    <input
                      type="number"
                      value={sortOrderForm}
                      onChange={(e) => setSortOrderForm(e.target.value)}
                      className="w-full bg-background-alt border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                      placeholder="99"
                    />
                  </div>
                  <div className="pt-5">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isPublished}
                        onChange={(e) => setIsPublished(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-background-alt peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      <span className="ml-3 text-xs font-semibold text-foreground-muted">Published publicly</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-border/60 flex justify-end space-x-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-background-alt hover:bg-border/60 text-foreground-muted text-xs font-semibold px-4 py-2.5 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-md gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? 'Saving...' : 'Save FAQ'}</span>
                </button>
              </div>
            </form>
          </div>
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
