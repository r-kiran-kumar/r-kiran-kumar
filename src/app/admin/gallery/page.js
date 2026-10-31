// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : page.js
// Description : Page component for the admin/gallery route.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Plus, Pencil, Trash2, X, Check, ImageIcon, RefreshCw, Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Video } from 'lucide-react';

const CATEGORIES = ['office','events','design','work','personal','travel','other'];
const CAT_COLORS = {
  office: '#00abcd', events: '#8b5cf6', design: '#ec4899',
  work: '#f59e0b', personal: '#10b981', travel: '#f97316', other: '#64748b'
};

const empty = { title: '', description: '', image_url: '', alt_text: '', category: 'other', sort_order: 99 };

export default function AdminGalleryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | 'add' | 'edit'
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  // Search & Sorting & Pagination State
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('sort_order');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const isVideo = (url = '') => {
    const exts = ['.mp4', '.webm', '.ogg', '.mov'];
    return exts.some(e => url.toLowerCase().endsWith(e) || url.toLowerCase().includes(e + '?'));
  };

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Pure I/O, no state — so the mount effect can set state from a callback and
  // discard the result if the component unmounted mid-flight.
  const loadItems = useCallback(async () => {
    const r = await fetch('/api/admin/gallery');
    const d = await r.json();
    return d.success ? (d.items || []) : [];
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await loadItems());
    } finally { setLoading(false); }
  }, [loadItems]);

  useEffect(() => {
    let cancelled = false;
    loadItems()
      .then((rows) => { if (!cancelled) setItems(rows); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [loadItems]);

  const openAdd = () => { setForm(empty); setEditId(null); setModal('add'); };
  const openEdit = (item) => {
    setForm({ title: item.title, description: item.description || '', image_url: item.image_url, alt_text: item.alt_text || '', category: item.category || 'other', sort_order: item.sort_order || 99 });
    setEditId(item.id);
    setModal('edit');
  };
  const closeModal = () => { setModal(null); setEditId(null); setForm(empty); };

  const save = async () => {
    if (!form.title.trim() || !form.image_url.trim()) return showToast('Title and URL required', 'error');
    setSaving(true);
    try {
      const method = modal === 'add' ? 'POST' : 'PUT';
      const body = modal === 'edit' ? { ...form, id: editId } : form;
      const r = await fetch('/api/admin/gallery', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const d = await r.json();
      if (d.success) { showToast(modal === 'add' ? 'Media added!' : 'Updated!'); closeModal(); load(); }
      else showToast(d.message || 'Error', 'error');
    } finally { setSaving(false); }
  };

  const deleteItem = async (id) => {
    const r = await fetch(`/api/admin/gallery?id=${id}`, { method: 'DELETE' });
    const d = await r.json();
    if (d.success) { showToast('Deleted'); load(); }
    else showToast(d.message || 'Error', 'error');
    setDeleteConfirm(null);
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
  const filteredItems = items.filter(i =>
    i.title.toLowerCase().includes(search.toLowerCase()) ||
    i.category.toLowerCase().includes(search.toLowerCase()) ||
    (i.description && i.description.toLowerCase().includes(search.toLowerCase()))
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    let valA = a[sortField] ?? '';
    let valB = b[sortField] ?? '';
    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();

    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Paginated list
  const paginatedItems = sortedItems.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.max(Math.ceil(sortedItems.length / itemsPerPage), 1);

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-lg text-white font-medium text-sm animate-fade-in ${toast.type === 'error' ? 'bg-red-500' : 'bg-emerald-500'}`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Gallery Manager</h1>
          <p className="text-foreground-muted text-xs mt-1">Upload and organize images or videos on your portfolio.</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center bg-primary hover:bg-primary-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Media</span>
        </button>
      </div>

      {/* Controls: Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
          <input
            type="text"
            placeholder="Search media..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:border-primary bg-card text-foreground"
          />
        </div>
      </div>

      {/* Media List Table */}
      {loading && items.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : sortedItems.length === 0 ? (
        <div className="bg-card border border-border p-12 text-center text-foreground-muted rounded-3xl text-sm shadow-sm">
          No media items found.
        </div>
      ) : (
        <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-background-alt border-b border-border/50 text-foreground-muted text-xs font-bold uppercase">
                  <th className="p-4 pl-6">Preview</th>
                  <th className="p-4 cursor-pointer hover:bg-background-alt/50 transition-colors" onClick={() => handleSort('title')}>
                    <div className="flex items-center gap-1">
                      <span>Title</span>
                      {sortField === 'title' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                    </div>
                  </th>
                  <th className="p-4 cursor-pointer hover:bg-background-alt/50 transition-colors" onClick={() => handleSort('category')}>
                    <div className="flex items-center gap-1">
                      <span>Category</span>
                      {sortField === 'category' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                    </div>
                  </th>
                  <th className="p-4 cursor-pointer hover:bg-background-alt/50 transition-colors" onClick={() => handleSort('sort_order')}>
                    <div className="flex items-center gap-1">
                      <span>Sort Order</span>
                      {sortField === 'sort_order' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                    </div>
                  </th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 text-foreground-muted text-sm">
                {paginatedItems.map((item) => (
                  <tr key={item.id} className="hover:bg-background-alt/30 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-border flex items-center justify-center bg-background-alt shrink-0">
                        {isVideo(item.image_url) ? (
                          <Video className="w-5 h-5 text-foreground-muted" />
                        ) : (
                          <Image src={item.image_url} alt={item.title} fill className="object-cover" unoptimized />
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-foreground">
                      <p className="max-w-xs truncate">{item.title}</p>
                      {item.description && <p className="text-foreground-muted text-xs font-light truncate max-w-xs">{item.description}</p>}
                    </td>
                    <td className="p-4">
                      <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full text-white capitalize" style={{ background: CAT_COLORS[item.category] || '#64748b' }}>
                        {item.category}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-xs">{item.sort_order}</td>
                    <td className="p-4 pr-6 text-right space-x-2">
                      <button
                        onClick={() => openEdit(item)}
                        className="p-1.5 text-foreground-muted hover:text-primary hover:bg-background-alt rounded-lg transition-colors cursor-pointer"
                        title="Edit Media"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(item.id)}
                        className="p-1.5 text-foreground-muted hover:text-red-600 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                        title="Delete Media"
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

      {/* Add/Edit Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-card rounded-3xl max-w-lg w-full max-h-[85vh] overflow-hidden shadow-2xl flex flex-col border border-border animate-scale-in">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/60 shrink-0">
              <h2 className="text-lg font-bold text-foreground">
                {modal === 'add' ? 'Add New Gallery Media' : 'Edit Gallery Media'}
              </h2>
              <button onClick={closeModal} className="p-1 hover:bg-background-alt rounded-lg cursor-pointer text-foreground-muted">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 flex-grow overflow-y-auto">
              {/* Media Preview */}
              {form.image_url && (
                <div className="relative h-40 rounded-xl overflow-hidden flex items-center justify-center border border-border" style={{ background: 'var(--background-alt)' }}>
                  {isVideo(form.image_url) ? (
                    <video src={form.image_url} controls className="max-h-full object-contain" />
                  ) : (
                    <Image src={form.image_url} alt="Preview" fill className="object-cover" unoptimized />
                  )}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-foreground-muted mb-1">Media URL (Image or Video) *</label>
                <input className="w-full bg-background-alt border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary" value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} placeholder="https://example.com/media.jpg" />
                <div className="mt-2.5 flex items-center gap-2">
                  <span className="text-xs font-bold text-foreground-muted">Or Upload:</span>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      const formData = new FormData();
                      formData.append('file', file);
                      setSaving(true);
                      try {
                        const res = await fetch('/api/admin/upload?type=gallery', {
                          method: 'POST',
                          body: formData
                        });
                        const json = await res.json();
                        if (json.success) {
                          setForm(f => ({ ...f, image_url: json.url }));
                          showToast('File uploaded successfully!');
                        } else {
                          showToast(json.message || 'Upload failed', 'error');
                        }
                      } catch (err) {
                        showToast(err.message, 'error');
                      } finally {
                        setSaving(false);
                      }
                    }}
                    className="text-xs text-foreground-muted file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground-muted mb-1">Title *</label>
                <input className="w-full bg-background-alt border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Media title" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground-muted mb-1">Description</label>
                <textarea className="w-full bg-background-alt border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary resize-none" rows={2} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Short caption..." />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground-muted mb-1">Alt Text (SEO)</label>
                <input className="w-full bg-background-alt border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary" value={form.alt_text} onChange={e => setForm(f => ({ ...f, alt_text: e.target.value }))} placeholder="Describe the media for accessibility" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-foreground-muted mb-1">Category</label>
                  <select className="w-full bg-background-alt border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary h-10" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground-muted mb-1">Sort Order</label>
                  <input className="w-full bg-background-alt border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary" type="number" value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: e.target.value }))} min="1" max="999" />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-border/60 shrink-0">
              <button onClick={closeModal} className="bg-background-alt hover:bg-border/60 text-foreground-muted text-xs font-semibold px-4 py-2.5 rounded-xl cursor-pointer">
                Cancel
              </button>
              <button onClick={save} disabled={saving} className="inline-flex items-center bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-md gap-1.5 cursor-pointer">
                {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                {saving ? 'Saving…' : modal === 'add' ? 'Add Media' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="w-full max-w-sm bg-card rounded-3xl p-6 shadow-2xl border border-border animate-scale-in">
            <h3 className="text-lg font-bold mb-2 text-foreground">Delete Media Item?</h3>
            <p className="text-sm text-foreground-muted mb-5">This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="bg-background-alt hover:bg-border/60 text-foreground-muted text-xs font-semibold px-4 py-2.5 rounded-xl cursor-pointer">Cancel</button>
              <button onClick={() => deleteItem(deleteConfirm)} className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors cursor-pointer">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
