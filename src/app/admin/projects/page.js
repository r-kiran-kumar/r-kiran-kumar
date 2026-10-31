// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : page.js
// Description : Page component for the admin/projects route.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Loader2, Save, X, Eye, EyeOff, FolderGit, Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
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
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('web');
  const [imageUrl, setImageUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [sortOrderForm, setSortOrderForm] = useState('10');
  const [isPublished, setIsPublished] = useState(true);
  const [modalAlert, setModalAlert] = useState(null); // { title, message, type }

  const showAlert = (message, title = 'Notification', type = 'error') => {
    setModalAlert({ title, message, type });
  };

  // Pure I/O, no state — lets the mount effect drive it from a callback rather
  // than calling a setState-bearing function synchronously, and lets the effect
  // drop the result if the component unmounted mid-flight.
  const loadProjects = async () => {
    const response = await fetch('/api/admin/projects');
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch projects.');
    return data.projects || [];
  };

  const fetchProjects = async () => {
    setLoading(true);
    try {
      setProjects(await loadProjects());
    } catch (err) {
      showAlert(err.message || 'Failed to load projects.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    loadProjects()
      .then((rows) => { if (!cancelled) setProjects(rows); })
      .catch((err) => { if (!cancelled) showAlert(err.message || 'Failed to load projects.'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const openAddModal = () => {
    setEditId(null);
    setTitle('');
    setDescription('');
    setCategory('web');
    setImageUrl('');
    setLiveUrl('');
    setGithubUrl('');
    setSortOrderForm('10');
    setIsPublished(true);
    setShowModal(true);
  };

  const openEditModal = (proj) => {
    setEditId(proj.id);
    setTitle(proj.title);
    setDescription(proj.description);
    setCategory(proj.category);
    setImageUrl(proj.image_url || '');
    setLiveUrl(proj.live_url || '');
    setGithubUrl(proj.github_url || '');
    setSortOrderForm(String(proj.sort_order || 0));
    setIsPublished(proj.is_published === 1);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to delete project.');
        setProjects(projects.filter(p => p.id !== id));
      } catch (err) {
        showAlert(err.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !category) {
      showAlert('Please fill in all required fields.');
      return;
    }

    setSaving(true);
    const body = {
      id: editId,
      title,
      description,
      category,
      imageUrl,
      liveUrl,
      githubUrl,
      sortOrder: sortOrderForm,
      isPublished
    };

    try {
      const response = await fetch('/api/admin/projects', {
        method: editId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to save project.');

      setShowModal(false);
      fetchProjects();
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
  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    let valA = a[sortField] ?? '';
    let valB = b[sortField] ?? '';
    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();

    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Paginated list
  const paginatedProjects = sortedProjects.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.max(Math.ceil(sortedProjects.length / itemsPerPage), 1);

  if (loading && projects.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-3 font-semibold text-foreground-muted">Loading projects...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Manage Projects</h1>
          <p className="text-foreground-muted text-xs mt-1">Add, edit, or remove entries from your portfolio works.</p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center bg-primary hover:bg-primary-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Controls: Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:border-primary bg-card text-foreground"
          />
        </div>
      </div>

      {/* Projects List Table */}
      {sortedProjects.length === 0 ? (
        <div className="bg-card border border-border p-12 text-center text-foreground-muted rounded-3xl text-sm shadow-sm">
          No projects found matching search query.
        </div>
      ) : (
        <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-background-alt border-b border-border/50 text-foreground-muted text-xs font-bold uppercase">
                  <th className="p-4 pl-6 cursor-pointer hover:bg-background-alt/50 transition-colors" onClick={() => handleSort('title')}>
                    <div className="flex items-center gap-1">
                      <span>Project Name</span>
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
                {paginatedProjects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-background-alt/30 transition-colors">
                    <td className="p-4 pl-6 font-semibold text-foreground max-w-xs truncate">{proj.title}</td>
                    <td className="p-4 capitalize">{proj.category}</td>
                    <td className="p-4 font-mono text-xs">{proj.sort_order}</td>
                    <td className="p-4">
                      {proj.is_published === 1 ? (
                        <span className="inline-flex items-center text-[10px] font-bold text-teal-500 bg-teal-500/10 border border-teal-500/20 rounded-full px-2 py-0.5 gap-1">
                          <Eye className="w-3 h-3" />
                          <span>Visible</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-[10px] font-bold text-foreground-muted bg-background-alt border border-border rounded-full px-2 py-0.5 gap-1">
                          <EyeOff className="w-3 h-3" />
                          <span>Hidden</span>
                        </span>
                      )}
                    </td>
                    <td className="p-4 pr-6 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(proj)}
                        className="p-1.5 text-foreground-muted hover:text-primary hover:bg-background-alt rounded-lg transition-colors cursor-pointer"
                        title="Edit Project"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(proj.id)}
                        className="p-1.5 text-foreground-muted hover:text-red-600 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                        title="Delete Project"
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

      {/* Editor Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-card rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl flex flex-col border border-border animate-scale-in">
            <div className="p-6 border-b border-border/60 flex justify-between items-center shrink-0">
              <h2 className="text-lg font-bold text-foreground">{editId ? 'Edit Project' : 'New Project'}</h2>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-background-alt rounded-lg cursor-pointer">
                <X className="w-5 h-5 text-foreground-muted" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col flex-grow overflow-hidden">
              <div className="p-6 space-y-4 overflow-y-auto flex-grow">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground-muted mb-1">Project Title *</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-background-alt border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                      placeholder="e.g. Kuppam Agri-Track"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground-muted mb-1">Category *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-background-alt border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary h-10"
                    >
                      <option value="web">Web Apps</option>
                      <option value="backend">Backend & APIs</option>
                      <option value="mobile">Mobile Apps</option>
                      <option value="ui">UI/UX Designs</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground-muted mb-1">Project Description *</label>
                  <textarea
                    required
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-background-alt border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary resize-none"
                    placeholder="Describe what the project does..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground-muted mb-1">Live Demo URL</label>
                    <input
                      type="url"
                      value={liveUrl}
                      onChange={(e) => setLiveUrl(e.target.value)}
                      className="w-full bg-background-alt border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                      placeholder="https://example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground-muted mb-1">GitHub Repo URL</label>
                    <input
                      type="url"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      className="w-full bg-background-alt border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground-muted mb-1">Image/Video URL</label>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full bg-background-alt border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                      placeholder="https://images.unsplash.com/..."
                    />
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
                            const res = await fetch('/api/admin/upload?type=projects', {
                              method: 'POST',
                              body: formData
                            });
                            const json = await res.json();
                            if (json.success) {
                              setImageUrl(json.url);
                            } else {
                              setModalAlert({ title: 'Error', message: 'Upload failed: ' + json.message, type: 'error' });
                            }
                          } catch (err) {
                            setModalAlert({ title: 'Error', message: err.message, type: 'error' });
                          } finally {
                            setSaving(false);
                          }
                        }}
                        className="text-xs text-foreground-muted file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-foreground-muted mb-1">Sort Order</label>
                      <input
                        type="number"
                        value={sortOrderForm}
                        onChange={(e) => setSortOrderForm(e.target.value)}
                        className="w-full bg-background-alt border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                        placeholder="e.g. 10"
                      />
                    </div>
                    <div>
                      <label className="relative inline-flex items-center cursor-pointer mt-2">
                        <input
                          type="checkbox"
                          checked={isPublished}
                          onChange={(e) => setIsPublished(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-background-alt peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        <span className="ml-3 text-xs font-semibold text-foreground-muted">Visible publicly</span>
                      </label>
                    </div>
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
                  <span>{saving ? 'Saving...' : 'Save Project'}</span>
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
