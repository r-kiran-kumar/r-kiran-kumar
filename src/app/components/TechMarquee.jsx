// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : TechMarquee.jsx
// Description : TechMarquee UI component.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

'use client';

import React from 'react';
import { 
  SiNextdotjs, SiReact, SiNodedotjs, SiPython, SiMysql, 
  SiFlutter, SiDart, SiTypescript, SiTailwindcss, SiPhp, 
  SiLaravel, SiFigma, SiDocker, SiGraphql, SiGit, 
  SiNginx, SiFastapi, SiLinux 
} from 'react-icons/si';

export const TechIcons = {
  'Next.js':    <SiNextdotjs className="w-4 h-4 text-slate-800 dark:text-white" />,
  'React':      <SiReact className="w-4 h-4 text-[#61DAFB]" />,
  'Node.js':    <SiNodedotjs className="w-4 h-4 text-[#339933]" />,
  'Python':     <SiPython className="w-4 h-4 text-[#3776AB]" />,
  'MySQL':      <SiMysql className="w-4 h-4 text-[#4479A1]" />,
  'Flutter':    <SiFlutter className="w-4 h-4 text-[#02569B]" />,
  'Dart':       <SiDart className="w-4 h-4 text-[#0175C2]" />,
  'TypeScript': <SiTypescript className="w-4 h-4 text-[#3178C6]" />,
  'Tailwind':   <SiTailwindcss className="w-4 h-4 text-[#06B6D4]" />,
  'PHP':        <SiPhp className="w-4 h-4 text-[#777BB4]" />,
  'Laravel':    <SiLaravel className="w-4 h-4 text-[#FF2D20]" />,
  'Figma':      <SiFigma className="w-4 h-4 text-[#F24E1E]" />,
  'Docker':     <SiDocker className="w-4 h-4 text-[#2496ED]" />,
  'GraphQL':    <SiGraphql className="w-4 h-4 text-[#E10098]" />,
  'Git':        <SiGit className="w-4 h-4 text-[#F05032]" />,
  'Nginx':      <SiNginx className="w-4 h-4 text-[#009639]" />,
  'FastAPI':    <SiFastapi className="w-4 h-4 text-[#009688]" />,
  'Linux':      <SiLinux className="w-4 h-4 text-[#FCC624]" />,
};

export const techMarqueeItems = [
  { key: 'Next.js', label: 'Next.js', desc: 'React framework utilized for building fast, SEO-rich web apps.' },
  { key: 'React', label: 'React', desc: 'Component architecture utilized for single page interfaces.' },
  { key: 'Node.js', label: 'Node.js', desc: 'Event-driven JavaScript runtime utilized for scalable API gateways.' },
  { key: 'Python', label: 'Python', desc: 'General programming language utilized for automation and machine learning.' },
  { key: 'MySQL', label: 'MySQL', desc: 'Relational database management server utilized for client CRM databases.' },
  { key: 'Flutter', label: 'Flutter', desc: 'Cross-platform mobile application framework utilized for iOS and Android.' },
  { key: 'Dart', label: 'Dart', desc: 'Type-safe programming language optimized for client mobile interfaces.' },
  { key: 'TypeScript', label: 'TypeScript', desc: 'Typed superset of JavaScript utilized for clean type validation.' },
  { key: 'Tailwind', label: 'Tailwind CSS', desc: 'Utility-first CSS styling framework utilized for fast custom interfaces.' },
  { key: 'PHP', label: 'PHP', desc: 'Server scripting engine utilized for legacy integrations.' },
  { key: 'Laravel', label: 'Laravel', desc: 'Expressive PHP application framework utilized for rapid model logic.' },
  { key: 'Figma', label: 'Figma', desc: 'Collaborative UI design mapping tool utilized for interface wireframes.' },
  { key: 'Docker', label: 'Docker', desc: 'Container deployment orchestration standard utilized for system isolation.' },
  { key: 'GraphQL', label: 'GraphQL', desc: 'Flexible graph query schema standard utilized for database requests.' },
  { key: 'Git', label: 'Git', desc: 'Source version distribution system utilized for developer code histories.' },
  { key: 'Nginx', label: 'Nginx', desc: 'Reverse proxy server utilized for load balancing and routing.' },
  { key: 'FastAPI', label: 'FastAPI', desc: 'High performance REST python services library utilized for data pipelines.' },
  { key: 'Linux', label: 'Linux', desc: 'Open source kernel operating system utilized for secure cloud infrastructure.' },
];

export default function TechMarquee() {
  return (
    <div className="py-4 overflow-hidden border-y border-[#d0f0f5] dark:border-primary/15 bg-[#eaf7fa] dark:bg-slate-900/40">
      <div className="flex items-center gap-8 animate-chrono-marquee whitespace-nowrap" style={{ width: 'max-content' }}>
        {[...techMarqueeItems, ...techMarqueeItems].map((tech, i) => (
          <span
            key={i}
            className="flex items-center gap-2.5 flex-shrink-0 cursor-default"
            itemScope
            itemType="https://schema.org/Thing"
          >
            {/* Structured Schema Meta for Clean SEO */}
            <meta itemProp="name" content={tech.label} />
            <meta itemProp="description" content={`${tech.label} - ${tech.desc}`} />
            
            {/* Clean Circular Icon Bubble */}
            <span className="w-8 h-8 rounded-full bg-[#00abcd]/10 border border-[#00abcd]/20 flex items-center justify-center shrink-0 transition-transform duration-200 hover:scale-110">
              <span className="flex items-center justify-center shrink-0">
                {TechIcons[tech.key] ?? <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
              </span>
            </span>
            <span className="text-[#041e23]/75 dark:text-slate-200 text-sm font-semibold">{tech.label}</span>
            <span className="ml-4 text-[#041e23]/15 dark:text-white/10 text-lg">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
