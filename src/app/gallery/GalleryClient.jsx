// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : GalleryClient.jsx
// Description : GalleryClient module.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn, Play, LayoutGrid, Rows3 } from 'lucide-react';

/* ─── Constants ─────────────────────────────── */
const CATS = ['all','office','events','design','work','personal','travel','other'];
const CAT_LABELS = {
  all: 'All', office: 'Office', events: 'Events', design: 'Design',
  work: 'Work', personal: 'Personal', travel: 'Travel', other: 'Other'
};

/* ─── Span pattern for bento grid (cycles) ──── */
// Each entry: { colSpan, rowSpan } — CSS grid template areas
const SPAN_PATTERNS = [
  { col: 2, row: 2 },  // featured big
  { col: 1, row: 1 },  // small
  { col: 1, row: 1 },  // small
  { col: 1, row: 2 },  // tall
  { col: 1, row: 1 },  // small
  { col: 2, row: 1 },  // wide
  { col: 1, row: 1 },  // small
  { col: 1, row: 1 },  // small
];

function getSpan(index) {
  return SPAN_PATTERNS[index % SPAN_PATTERNS.length];
}

/* ─── Helpers ─────────────────────────────── */
const isVideo = (url = '') =>
  ['.mp4', '.webm', '.ogg', '.mov'].some(e => url.toLowerCase().includes(e));

/* ─── CategoryPill ─────────────────────────── */
function CategoryPill({ label, count, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer outline-none"
      style={{
        background: active ? 'var(--primary)' : 'var(--badge-bg)',
        color: active ? '#fff' : 'var(--foreground-muted)',
        boxShadow: active ? '0 4px 18px rgba(0,171,205,0.35)' : 'none',
        transform: active ? 'translateY(-1px)' : 'translateY(0)',
      }}
    >
      {label}
      {count != null && (
        <span
          className="text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[1.2rem] text-center"
          style={{
            background: active ? 'rgba(255,255,255,0.25)' : 'var(--card-border)',
            color: active ? '#fff' : 'var(--foreground-muted)',
          }}
        >
          {count}
        </span>
      )}
    </button>
  );
}

/* ─── GalleryTile ─────────────────────────── */
function GalleryTile({ item, colSpan, rowSpan, onClick, index }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="group cursor-pointer overflow-hidden rounded-2xl relative"
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
        animationDelay: `${index * 40}ms`,
        border: '1px solid var(--card-border)',
        background: 'var(--background-alt)',
      }}
      onClick={onClick}
    >
      {/* Media */}
      <div className="w-full h-full relative overflow-hidden" style={{ minHeight: rowSpan === 2 ? '380px' : '180px' }}>
        {isVideo(item.image_url) ? (
          <video
            src={item.image_url}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            autoPlay loop muted playsInline
          />
        ) : (
          <Image
            src={item.image_url}
            alt={item.alt_text || item.title}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            className={`object-cover transition-all duration-700 group-hover:scale-110 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setLoaded(true)}
            unoptimized
          />
        )}

        {/* Skeleton shimmer before load */}
        {!loaded && !isVideo(item.image_url) && (
          <div className="absolute inset-0 animate-pulse" style={{ background: 'var(--background-alt)' }} />
        )}

        {/* Hover overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col justify-end"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
          }}
        >
          {/* Zoom icon */}
          <div className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
               style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)' }}>
            {isVideo(item.image_url)
              ? <Play className="w-4 h-4 text-white" fill="white" />
              : <ZoomIn className="w-4 h-4 text-white" />
            }
          </div>

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span
              className="text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{ background: 'var(--primary)', color: '#fff' }}
            >
              {item.category}
            </span>
          </div>

          {/* Title & desc */}
          <div className="p-4">
            <p className="text-white font-bold text-sm leading-snug">{item.title}</p>
            {item.description && colSpan + rowSpan >= 3 && (
              <p className="text-white/60 text-xs mt-1 line-clamp-2">{item.description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Lightbox ─────────────────────────────── */
function Lightbox({ items, index, onClose, onPrev, onNext, onJump }) {
  const item = items[index];
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center animate-fade-in"
      style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(16px)' }}
      onClick={onClose}
    >
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 z-10"
           onClick={e => e.stopPropagation()}
           style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)' }}>
        <div>
          <p className="text-white font-bold text-base leading-tight">{item.title}</p>
          {item.description && <p className="text-white/50 text-xs mt-0.5">{item.description}</p>}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white/40 text-xs font-mono">{index + 1} / {items.length}</span>
          <button onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.1)' }}>
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Prev / Next */}
      {index > 0 && (
        <button
          onClick={e => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer hover:scale-110"
          style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}>
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      )}
      {index < items.length - 1 && (
        <button
          onClick={e => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer hover:scale-110"
          style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}>
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Main image */}
      <div className="max-w-5xl max-h-[75vh] w-full mx-16 animate-scale-in" onClick={e => e.stopPropagation()}>
        {isVideo(item.image_url) ? (
          <video src={item.image_url} controls autoPlay
            className="max-h-[70vh] max-w-full mx-auto rounded-2xl shadow-2xl object-contain block" />
        ) : (
          <Image src={item.image_url} alt={item.alt_text || item.title} width={1600} height={1200} unoptimized
            className="max-h-[70vh] max-w-full mx-auto rounded-2xl shadow-2xl object-contain block" style={{ height: 'auto' }} />
        )}
      </div>

      {/* Film strip thumbnails */}
      <div className="absolute bottom-0 left-0 right-0 pb-4 pt-8 px-4 z-10 gallery-filmstrip overflow-x-auto"
           style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent)' }}
           onClick={e => e.stopPropagation()}>
        <div className="flex gap-2 justify-center mx-auto w-max">
          {items.map((img, i) => (
            <button
              key={img.id}
              onClick={() => onJump(i)}
              className={`shrink-0 w-14 h-10 rounded-lg overflow-hidden transition-all duration-200 cursor-pointer ${i === index ? 'scale-110' : 'opacity-50 hover:opacity-80'}`}
              style={{ outline: i === index ? '2px solid var(--primary)' : 'none', outlineOffset: '2px' }}
            >
              {isVideo(img.image_url)
                ? <div className="w-full h-full bg-slate-700 flex items-center justify-center"><Play className="w-3 h-3 text-white" fill="white" /></div>
                : <Image src={img.image_url} alt="" width={80} height={80} unoptimized className="w-full h-full object-cover" />
              }
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main export ─────────────────────────── */
export default function GalleryClient({ initialItems }) {
  const [filter, setFilter]   = useState('all');
  const [layout, setLayout]   = useState('bento');  // 'bento' | 'grid'
  const [lightbox, setLightbox] = useState(null);
  const [visible, setVisible] = useState(true);

  const filtered = filter === 'all'
    ? initialItems
    : initialItems.filter(i => i.category === filter);

  const activeCats = CATS.filter(c => c === 'all' || initialItems.some(i => i.category === c));

  const countFor = (cat) => cat === 'all' ? initialItems.length : initialItems.filter(i => i.category === cat).length;

  /* ── filter change with fade transition ── */
  const handleFilter = (cat) => {
    setVisible(false);
    setTimeout(() => { setFilter(cat); setVisible(true); }, 220);
  };

  /* ── Keyboard nav ── */
  useEffect(() => {
    if (lightbox === null) return;
    const h = (e) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowLeft')  setLightbox(i => Math.max(0, i - 1));
      if (e.key === 'ArrowRight') setLightbox(i => Math.min(filtered.length - 1, i + 1));
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [lightbox, filtered.length]);

  /* ── Body scroll lock ── */
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  return (
    <div>
      {/* ── Filters + Layout Toggle ─────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        {/* Pill filters */}
        <div className="flex flex-wrap gap-2">
          {activeCats.map(cat => (
            <CategoryPill
              key={cat}
              label={CAT_LABELS[cat]}
              count={countFor(cat)}
              active={filter === cat}
              onClick={() => handleFilter(cat)}
            />
          ))}
        </div>

        {/* Layout toggle */}
        <div className="flex items-center gap-1 p-1 rounded-xl shrink-0"
             style={{ background: 'var(--badge-bg)', border: '1px solid var(--card-border)' }}>
          <button
            onClick={() => setLayout('bento')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer"
            style={{
              background: layout === 'bento' ? 'var(--card-bg)' : 'transparent',
              color: layout === 'bento' ? 'var(--primary)' : 'var(--foreground-muted)',
              boxShadow: layout === 'bento' ? '0 1px 4px rgba(0,0,0,0.12)' : 'none',
            }}
            title="Bento layout"
          >
            <LayoutGrid className="w-3.5 h-3.5" /> Bento
          </button>
          <button
            onClick={() => setLayout('grid')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer"
            style={{
              background: layout === 'grid' ? 'var(--card-bg)' : 'transparent',
              color: layout === 'grid' ? 'var(--primary)' : 'var(--foreground-muted)',
              boxShadow: layout === 'grid' ? '0 1px 4px rgba(0,0,0,0.12)' : 'none',
            }}
            title="Uniform grid"
          >
            <Rows3 className="w-3.5 h-3.5" /> Grid
          </button>
        </div>
      </div>

      {/* ── Results bar ─────────────────────────────── */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl font-black" style={{ color: 'var(--primary)' }}>{filtered.length}</span>
        <span className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
          {filter === 'all' ? 'photos & videos' : `in ${CAT_LABELS[filter]}`}
        </span>
        {filter !== 'all' && (
          <button onClick={() => handleFilter('all')}
            className="ml-auto text-xs font-semibold underline underline-offset-2 cursor-pointer transition-colors hover:text-primary"
            style={{ color: 'var(--foreground-muted)' }}>
            Clear filter
          </button>
        )}
      </div>

      {/* ── Empty state ─────────────────────────────── */}
      {filtered.length === 0 && (
        <div className="text-center py-28 flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center"
               style={{ background: 'var(--badge-bg)' }}>
            <ZoomIn className="w-7 h-7" style={{ color: 'var(--foreground-muted)' }} />
          </div>
          <p className="text-lg font-semibold" style={{ color: 'var(--foreground-muted)' }}>
            No media in this category yet.
          </p>
        </div>
      )}

      {/* ── Bento Grid ─────────────────────────────── */}
      {filtered.length > 0 && layout === 'bento' && (
        <div
          className="gallery-bento"
          style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.22s ease' }}
        >
          {filtered.map((item, idx) => {
            const { col, row } = getSpan(idx);
            return (
              <GalleryTile
                key={item.id}
                item={item}
                colSpan={col}
                rowSpan={row}
                index={idx}
                onClick={() => setLightbox(idx)}
              />
            );
          })}
        </div>
      )}

      {/* ── Uniform Grid ───────────────────────────── */}
      {filtered.length > 0 && layout === 'grid' && (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
          style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.22s ease' }}
        >
          {filtered.map((item, idx) => (
            <div
              key={item.id}
              className="group cursor-pointer rounded-2xl overflow-hidden relative"
              style={{ border: '1px solid var(--card-border)', aspectRatio: '4/3' }}
              onClick={() => setLightbox(idx)}
            >
              <div className="w-full h-full relative">
                {isVideo(item.image_url) ? (
                  <video src={item.image_url} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" autoPlay loop muted playsInline />
                ) : (
                  <Image src={item.image_url} alt={item.alt_text || item.title} fill
                    sizes="(max-width:640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110" unoptimized />
                )}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3"
                     style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent)' }}>
                  <p className="text-white text-xs font-bold leading-tight line-clamp-2">{item.title}</p>
                </div>
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full"
                        style={{ background: 'var(--primary)', color: '#fff' }}>
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Lightbox ───────────────────────────────── */}
      {lightbox !== null && filtered[lightbox] && (
        <Lightbox
          items={filtered}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onPrev={() => setLightbox(i => Math.max(0, i - 1))}
          onNext={() => setLightbox(i => Math.min(filtered.length - 1, i + 1))}
          onJump={(i) => setLightbox(i)}
        />
      )}
    </div>
  );
}
