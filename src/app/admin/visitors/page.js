// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : page.js
// Description : Page component for the admin/visitors route.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Users, Globe, Activity, Trash2, RefreshCw, Eye, Navigation, ArrowUpRight, Compass, Search, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

export default function VisitorsAdmin() {
  const searchParams = useSearchParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [clearing, setClearing] = useState(false);
  // Derived from the URL on first render, so no setState is needed on mount.
  const [search, setSearch] = useState(() => searchParams.get('search') || '');
  const [page, setPage] = useState(1);
  const limit = 50;
  const [modalAlert, setModalAlert] = useState(null); // { title, message, type }
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);

  const showAlert = (message, title = 'Notification', type = 'error') => {
    setModalAlert({ title, message, type });
  };

  // Pure I/O, no state — the effects below set state from a callback instead.
  async function loadVisitors(searchVal, pageVal) {
    const offset = (pageVal - 1) * limit;
    const res = await fetch(`/api/admin/visitors?limit=${limit}&offset=${offset}&search=${encodeURIComponent(searchVal)}`);
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to fetch logs.');
    return json;
  }

  async function fetchVisitors(searchVal = search) {
    setLoading(true);
    try {
      setData(await loadVisitors(searchVal, page));
    } catch (err) {
      setError(err.message || 'Could not load visitor logs.');
    } finally {
      setLoading(false);
    }
  }

  // Initial load, and reload whenever the page changes.
  useEffect(() => {
    let cancelled = false;
    loadVisitors(search, page)
      .then((json) => { if (!cancelled) setData(json); })
      .catch((err) => { if (!cancelled) setError(err.message || 'Could not load visitor logs.'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
    // `search` is applied explicitly via the search form, not on every keystroke.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setSelectedDeviceId(null); // Clear selected device on search
    fetchVisitors();
  };

  const handleClearLogs = async () => {
    if (!confirm('Are you sure you want to permanently delete all visitor records and activity traces?')) return;
    setClearing(true);
    try {
      const res = await fetch('/api/admin/visitors', { method: 'DELETE' });
      if (res.ok) {
        setData({ visitors: [], activities: [], total: 0, summary: { totalVisitors: 0, totalVisits: 0 } });
        setPage(1);
        setSelectedDeviceId(null);
      }
    } catch (err) {
      showAlert('Error clearing logs: ' + err.message);
    } finally {
      setClearing(false);
    }
  };

  const getOS = (ua = '') => {
    if (ua.includes('Windows')) return 'Windows';
    if (ua.includes('Macintosh') || ua.includes('Mac OS')) return 'macOS';
    if (ua.includes('Linux')) return 'Linux';
    if (ua.includes('Android')) return 'Android';
    if (ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
    return 'Other';
  };

  const getBrowser = (ua = '') => {
    if (ua.includes('Edg')) return 'Edge';
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
    return 'Other';
  };

  const { visitors = [], activities = [], total = 0, summary = { totalVisitors: 0, totalVisits: 0 } } = data || {};
  const displayedActivities = selectedDeviceId
    ? activities.filter(act => act.device_id === selectedDeviceId)
    : activities;
  const totalPages = Math.max(Math.ceil(total / limit), 1);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Visitor Analytics & Activity Tracing</h1>
          <p className="text-sm text-foreground-muted mt-1">Monitor real-time user journeys and geolocation mappings dynamically.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setSearch(''); setPage(1); setSelectedDeviceId(null); fetchVisitors(''); }}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-border hover:bg-background-alt rounded-xl text-sm font-semibold transition cursor-pointer bg-card text-foreground"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Reset / Refresh</span>
          </button>
          <button
            onClick={handleClearLogs}
            disabled={clearing}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-500 rounded-xl text-sm font-semibold transition cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>{clearing ? 'Clearing...' : 'Clear Logs'}</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-card border border-border p-6 rounded-2xl flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-xs font-bold text-foreground-muted uppercase tracking-wider block">Total Unique Visitors</span>
            <span className="text-3xl font-black text-foreground">{summary.totalVisitors.toLocaleString()}</span>
          </div>
          <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center text-primary">
            <Users className="w-5 h-5" />
          </div>
        </div>
        <div className="bg-card border border-border p-6 rounded-2xl flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-xs font-bold text-foreground-muted uppercase tracking-wider block">Total Page Views (Visits)</span>
            <span className="text-3xl font-black text-foreground">{summary.totalVisits.toLocaleString()}</span>
          </div>
          <div className="w-12 h-12 bg-sky-500/10 border border-sky-500/20 rounded-xl flex items-center justify-center text-sky-500">
            <Activity className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-md">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
          <input
            type="text"
            placeholder="Search IP, device ID, browser, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-card text-foreground"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-xl transition cursor-pointer"
        >
          Search
        </button>
      </form>

      {/* Main Grid: Left = Visitor Profiles, Right = Realtime Tracing */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Visitor Profiles (Left 5 cols) */}
        <div className="lg:col-span-5 bg-card border border-border rounded-2xl shadow-sm flex flex-col">
          <div className="p-6 border-b border-border/50 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                <span>Device Profiles ({total.toLocaleString()})</span>
              </h2>
              <p className="text-xs text-foreground-muted mt-0.5">List of unique visitor browsers.</p>
            </div>
          </div>

          <div className="p-4 space-y-3 overflow-y-auto max-h-[600px] flex-grow min-h-[300px]">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : visitors.length === 0 ? (
              <div className="text-center py-8 text-sm text-foreground-muted">No matching visitors found.</div>
            ) : (
              visitors.map((visitor) => {
                const isSelected = selectedDeviceId === visitor.device_id;
                return (
                  <div
                    key={visitor.id}
                    onClick={() => setSelectedDeviceId(isSelected ? null : visitor.device_id)}
                    className={`p-4 rounded-2xl transition cursor-pointer border ${
                      isSelected
                        ? 'bg-primary/10 border-primary/30'
                        : 'border-border/30 hover:border-border hover:bg-background-alt/30'
                    } space-y-3`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-foreground bg-background-alt px-2 py-0.5 rounded">
                        {visitor.device_id.substring(0, 16)}...
                      </span>
                      <span className="text-[10px] font-bold text-foreground-muted bg-background-alt border border-border px-2 py-0.5 rounded-full">
                        {visitor.visit_count} views
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-1.5 text-xs text-foreground-muted">
                      <div className="flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5 text-foreground-muted/50 shrink-0" />
                        <span>{getOS(visitor.user_agent)} ({getBrowser(visitor.user_agent)})</span>
                      </div>
                      <div className="text-right">
                        <span className="text-foreground-muted font-mono">IP: {visitor.ip_address}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-foreground-muted pt-1 border-t border-border/20">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span className="truncate" title={visitor.location}>{visitor.location || 'Unknown Location'}</span>
                      </div>
                      {visitor.latitude && visitor.longitude && (
                        <a 
                          href={`https://www.google.com/maps?q=${visitor.latitude},${visitor.longitude}`}
                          target="_blank" rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-primary font-semibold hover:underline flex items-center gap-0.5 shrink-0 ml-2"
                          title="View exact coordinates on Google Maps"
                        >
                          <span>View Map</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    <div className="text-[10px] text-foreground-muted text-right">
                      Last active: {new Date(visitor.last_visit_at).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-border flex items-center justify-between bg-background-alt/30 rounded-b-2xl">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1 || loading}
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
                disabled={page === totalPages || loading}
                className="inline-flex items-center gap-1 px-3 py-1.5 border border-border rounded-lg text-xs font-semibold hover:bg-background-alt disabled:opacity-50 transition cursor-pointer bg-card text-foreground"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Realtime Page Activity Tracing (Right 7 cols) */}
        <div className="lg:col-span-7 bg-card border border-border rounded-2xl shadow-sm flex flex-col">
          <div className="p-6 border-b border-border/50 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Activity className="w-5 h-5 text-sky-500" />
                <span>
                  {selectedDeviceId
                    ? `Logs: ${selectedDeviceId.substring(0, 12)}...`
                    : 'Real-Time Logs (Latest 100)'}
                </span>
              </h2>
              <p className="text-xs text-foreground-muted mt-0.5">
                {selectedDeviceId
                  ? 'Showing activities filtered for the selected device.'
                  : 'Chronological trace of pageviews and navigation steps.'}
              </p>
            </div>
            {selectedDeviceId && (
              <button
                onClick={() => setSelectedDeviceId(null)}
                className="text-xs font-semibold px-3 py-1.5 bg-background-alt border border-border hover:bg-border/30 rounded-xl transition text-foreground shrink-0 cursor-pointer"
              >
                Clear Filter
              </button>
            )}
          </div>

          <div className="p-6 divide-y divide-border/40 overflow-y-auto max-h-[660px] flex-grow min-h-[300px]">
            {loading && !data ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : displayedActivities.length === 0 ? (
              <div className="text-center py-12 text-sm text-foreground-muted space-y-3">
                <p>No recent activity logs found{selectedDeviceId ? ' for this device' : ''}.</p>
                {selectedDeviceId && (
                  <button
                    onClick={() => {
                      setSearch(selectedDeviceId);
                      fetchVisitors(selectedDeviceId);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary/10 border border-primary/20 hover:bg-primary/20 text-primary rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Search database history for this device</span>
                  </button>
                )}
              </div>
            ) : (
              displayedActivities.map((act) => (
                <div key={act.id} className="py-4 first:pt-0 last:pb-0 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <span className="text-xs font-mono text-foreground-muted">
                      ID: {act.device_id.substring(0, 12)}...
                    </span>
                    <span className="text-[11px] text-foreground-muted">
                      {new Date(act.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                      Visited: {act.path}
                    </span>
                    {act.referrer && (
                      <span className="text-xs text-foreground-muted bg-background-alt border border-border px-2 py-0.5 rounded truncate max-w-xs sm:max-w-md">
                        From: {act.referrer}
                      </span>
                    )}
                  </div>

                  <div className="text-[10px] text-foreground-muted flex flex-wrap items-center justify-between gap-2 pt-1">
                    <div className="flex items-center gap-2">
                      <span>IP: {act.ip_address}</span>
                      {act.location && (
                        <span className="text-foreground-muted/70 flex items-center gap-0.5">
                          <MapPin size={10} className="text-primary shrink-0" />
                          <span className="truncate max-w-[150px]">{act.location}</span>
                        </span>
                      )}
                      {act.latitude && act.longitude && (
                        <a 
                          href={`https://www.google.com/maps?q=${act.latitude},${act.longitude}`}
                          target="_blank" rel="noopener noreferrer"
                          className="text-primary font-bold hover:underline flex items-center gap-0.5 ml-1"
                          title="View exact coordinates on Google Maps"
                        >
                          <span>View Map</span>
                          <ArrowUpRight className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                    <span className="truncate max-w-xs">Browser: {act.user_agent}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

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
