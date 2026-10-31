// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : ProjectsClient.jsx
// Description : ProjectsClient module.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Code2, Database, Smartphone, Palette, FolderGit2, ArrowRight } from 'lucide-react';

const Github = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function ProjectsClient({ initialProjects }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All Projects', icon: FolderGit2 },
    { id: 'web', label: 'Web Apps', icon: Code2 },
    { id: 'backend', label: 'Backend & APIs', icon: Database },
    { id: 'mobile', label: 'Mobile Apps', icon: Smartphone },
    { id: 'ui', label: 'UI/UX Designs', icon: Palette },
  ];

  const filteredProjects = activeFilter === 'all'
    ? initialProjects
    : initialProjects.filter(p => p.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div className="space-y-12">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border/80 pb-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeFilter === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]'
                  : 'text-foreground-muted hover:text-primary hover:bg-badge'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Grid List */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-gradient-to-br from-card to-background-alt border border-border rounded-3xl">
          <p className="text-foreground-muted text-sm">No projects listed under this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj) => {
            const detailUrl = proj.title === 'Hi Partner' ? '/projects/hi-partner' : null;
            return (
            <div key={proj.id} className="bg-gradient-to-br from-card to-background-alt border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-logo-orange/60 transition-all duration-300 flex flex-col hover:translate-y-[-4px] group">
              <div className="relative h-48 w-full bg-badge overflow-hidden">
                <Image
                  src={proj.image_url || '/assets/project-chronospark.webp'}
                  alt={proj.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-108"
                />
                <div className="absolute top-3 left-3 bg-card/95 backdrop-blur-sm border border-border/60 rounded-full px-3.5 py-1 text-[10px] font-bold text-primary uppercase tracking-wider">
                  {proj.category}
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{proj.title}</h3>
                  <p className="text-foreground-muted text-sm font-light leading-relaxed mt-2">{proj.description}</p>
                </div>
                <div className="flex gap-4 border-t border-border/80 pt-4 mt-auto">
                  {detailUrl && (
                    <Link
                      href={detailUrl}
                      className="text-xs font-bold text-primary hover:text-primary-hover flex items-center space-x-1 transition-colors"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                  {!detailUrl && proj.live_url && (
                    <a
                      href={proj.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-primary hover:text-primary-hover flex items-center space-x-1 transition-colors"
                    >
                      <span>Visit Live</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {proj.github_url && (
                    <a
                      href={proj.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-foreground-muted hover:text-foreground flex items-center space-x-1 transition-colors"
                    >
                      <span>GitHub</span>
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
