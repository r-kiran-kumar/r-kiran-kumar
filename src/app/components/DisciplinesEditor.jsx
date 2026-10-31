// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : DisciplinesEditor.jsx
// Description : DisciplinesEditor UI component.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

'use client';

import { useState } from 'react';

/* ─── Responsive Token components ───────────────── */
const Kw = ({ children }) => <span className="font-semibold text-[#007c9d] dark:text-[#00abcd]">{children}</span>;
const Fn = ({ children }) => <span className="text-[#127160] dark:text-[#4EC9B0]">{children}</span>;
const Cls = ({ children }) => <span className="text-[#0550ae] dark:text-[#4FC1FF]">{children}</span>;
const Str = ({ children }) => <span className="text-[#a31515] dark:text-[#CE9178]">{children}</span>;
const Num = ({ children }) => <span className="text-[#098658] dark:text-[#b5cea8]">{children}</span>;
const Cmt = ({ children }) => <span className="italic text-emerald-700/80 dark:text-[#6A9955]">{children}</span>;
const Pun = ({ children }) => <span className="text-slate-650 dark:text-[#808080]">{children}</span>;
const Prop = ({ children }) => <span className="text-[#001080] dark:text-[#9CDCFE]">{children}</span>;
const Op = ({ children }) => <span className="text-slate-900 dark:text-[#d4d4d4]">{children}</span>;
const Dec = ({ children }) => <span className="font-semibold text-[#b83c02] dark:text-[#FF5500]">{children}</span>;

export default function DisciplinesEditor() {
  const [activeTab, setActiveTab] = useState('web');

  const panes = {
    web: {
      filename: 'web-app.tsx',
      dotColor: '#FFB800',
      lines: [
        <><Cmt>{'// web-app.tsx — Next.js production page'}</Cmt></>,
        <><Kw>import</Kw> <Pun>{'{'}</Pun> <Fn>Metadata</Fn> <Pun>{'}'}</Pun> <Kw>from</Kw> <Str>’next’</Str><Pun>;</Pun></>,
        <>&nbsp;</>,
        <><Dec>@Page</Dec><Pun>({'{'}</Pun> <Prop>seo</Prop><Pun>:</Pun> <Str>’rank-1’</Str><Pun>,</Pun> <Prop>speed</Prop><Pun>:</Pun> <Str>’99ms’</Str> <Pun>{'}'})</Pun></>,
        <><Kw>export default function</Kw> <Fn>HomePage</Fn><Pun>()</Pun> <Pun>{'{'}</Pun></>,
        <>&nbsp;&nbsp;<Kw>const</Kw> <Prop>stack</Prop> <Op>=</Op> <Pun>[</Pun><Str>’React’</Str><Pun>,</Pun> <Str>’Next.js’</Str><Pun>,</Pun> <Str>’Tailwind’</Str><Pun>];</Pun></>,
        <>&nbsp;&nbsp;<Kw>return</Kw> <Fn>render</Fn><Pun>(</Pun><Prop>stack</Prop><Pun>);</Pun></>,
        <><Pun>{'}'}</Pun></>,
      ]
    },
    api: {
      filename: 'api-server.py',
      dotColor: '#00abcd',
      lines: [
        <><Cmt># api-server.py — FastAPI route handler</Cmt></>,
        <><Kw>from</Kw> <Cls>rkk_api</Cls> <Kw>import</Kw> <Fn>Database</Fn><Pun>,</Pun> <Fn>Router</Fn></>,
        <>&nbsp;</>,
        <><Prop>db</Prop> <Op>=</Op> <Fn>Database</Fn><Pun>(</Pun><Prop>pool</Prop><Op>=</Op><Num>3</Num><Pun>,</Pun> <Prop>engine</Prop><Op>=</Op><Str>“mysql”</Str><Pun>)</Pun></>,
        <>&nbsp;</>,
        <><Dec>@Router.get</Dec><Pun>(</Pun><Str>“/api/v1/data”</Str><Pun>)</Pun></>,
        <><Kw>def</Kw> <Fn>get_data</Fn><Pun>(</Pun><Prop>req</Prop><Pun>:</Pun> <Cls>Request</Cls><Pun>):</Pun></>,
        <>&nbsp;&nbsp;<Kw>return</Kw> <Prop>db</Prop><Pun>.</Pun><Fn>query</Fn><Pun>(</Pun><Prop>optimized</Prop><Op>=</Op><Kw>True</Kw><Pun>)</Pun></>,
      ]
    },
    app: {
      filename: 'main.dart',
      dotColor: '#7FB4FF',
      lines: [
        <><Cmt>{'// main.dart — Flutter mobile entry point'}</Cmt></>,
        <><Kw>import</Kw> <Str>’package:flutter/material.dart’</Str><Pun>;</Pun></>,
        <>&nbsp;</>,
        <><Kw>void</Kw> <Fn>main</Fn><Pun>()</Pun> <Op>async</Op> <Pun>{'{'}</Pun></>,
        <>&nbsp;&nbsp;<Fn>WidgetsFlutterBinding</Fn><Pun>.</Pun><Fn>ensureInitialized</Fn><Pun>();</Pun></>,
        <>&nbsp;&nbsp;<Fn>runApp</Fn><Pun>(</Pun><Kw>const</Kw> <Cls>RKKApp</Cls><Pun>(</Pun></>,
        <>&nbsp;&nbsp;&nbsp;&nbsp;<Prop>targets</Prop><Pun>:</Pun> <Pun>[</Pun><Str>’iOS’</Str><Pun>,</Pun> <Str>’Android’</Str><Pun>],</Pun></>,
        <>&nbsp;&nbsp;<Pun>));</Pun></>,
        <><Pun>{'}'}</Pun></>,
      ]
    },
    ui: {
      filename: 'design-system.css',
      dotColor: '#E07BE0',
      lines: [
        <><Cmt>{'/* design-system.css — RKK Design Tokens */'}</Cmt></>,
        <><Prop>:root</Prop> <Pun>{'{'}</Pun></>,
        <>&nbsp;&nbsp;<Prop>--brand-cyan</Prop><Pun>:</Pun>   <Num>#00abcd</Num><Pun>;</Pun></>,
        <>&nbsp;&nbsp;<Prop>--brand-orange</Prop><Pun>:</Pun> <Str>#ff5500</Str><Pun>;</Pun></>,
        <>&nbsp;&nbsp;<Prop>--font-sans</Prop><Pun>:</Pun>   <Str>’Space Grotesk’</Str><Pun>;</Pun></>,
        <>&nbsp;&nbsp;<Prop>--radius</Prop><Pun>:</Pun>      <Num>12px</Num><Pun>;</Pun></>,
        <><Pun>{'}'}</Pun></>,
        <>&nbsp;</>,
        <><Fn>.card</Fn> <Pun>{'{'}</Pun> <Prop>background</Prop><Pun>:</Pun> <Kw>var</Kw><Pun>(</Pun><Prop>--brand-cyan</Prop><Pun>);</Pun> <Pun>{'}'}</Pun></>,
      ]
    }
  };

  const active = panes[activeTab];

  return (
    <div className="w-full rounded-2xl shadow-xl overflow-hidden mt-12 border border-slate-200 dark:border-slate-700/60 bg-slate-50 dark:bg-[#1E1E1E] transition-colors duration-300">

      {/* ── Window Title Bar ── */}
      <div className="flex items-center justify-between px-4 py-2.5 select-none bg-slate-200/60 dark:bg-[#323233] border-b border-slate-300/60 dark:border-[#252526] transition-colors duration-300">
        {/* Traffic Lights */}
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56] hover:opacity-80 transition-opacity" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:opacity-80 transition-opacity" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f] hover:opacity-80 transition-opacity" />
        </div>
        {/* Centered filename */}
        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">{active.filename}</span>
        {/* Pulsing status */}
        <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
          Running
        </span>
      </div>

      {/* ── File Tabs ── */}
      <div className="flex items-center gap-0 overflow-x-auto scrollbar-none bg-slate-100 dark:bg-[#252526] border-b border-slate-200/80 dark:border-[#1E1E1E] transition-colors duration-300">
        {Object.entries(panes).map(([key, pane]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-mono whitespace-nowrap transition-colors cursor-pointer shrink-0 border-t-2 ${activeTab === key
                ? 'bg-slate-50 dark:bg-[#1E1E1E] text-slate-900 dark:text-[#d4d4d4] border-t-[#00abcd]'
                : 'bg-transparent text-slate-500 dark:text-[#858585] border-t-transparent hover:text-slate-800 dark:hover:text-[#d4d4d4]'
              }`}
          >
            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: pane.dotColor }} />
            {pane.filename}
          </button>
        ))}
      </div>

      {/* ── Line Numbers + Code ── */}
      <div className="flex font-mono text-[12px] leading-6 overflow-x-auto bg-slate-50 dark:bg-[#1E1E1E] transition-colors duration-300" style={{ minHeight: '200px' }}>
        {/* Gutter */}
        <div className="shrink-0 flex flex-col items-end pr-4 pl-5 py-5 select-none text-slate-400 dark:text-[#4f4f4f] bg-slate-100/40 dark:bg-[#1E1E1E] border-r border-slate-200 dark:border-[#2d2d2d] transition-colors duration-300">
          {active.lines.map((_, i) => (
            <div key={i} className="leading-6">{i + 1}</div>
          ))}
        </div>
        {/* Code body */}
        <div className="py-5 px-6 flex flex-col whitespace-pre-wrap text-slate-700 dark:text-[#d4d4d4] transition-colors duration-300">
          {active.lines.map((line, i) => (
            <div key={i} className="leading-6">{line}</div>
          ))}
        </div>
      </div>

      {/* ── Status Bar ── */}
      <div className="flex items-center justify-between px-4 py-1.5 text-[10px] font-mono select-none bg-[#00abcd] text-white">
        <span className="font-bold">R Kiran Kumar — Full Stack Developer</span>
        <div className="flex items-center gap-4">
          <span>UTF-8</span>
          <span className="font-bold text-white">▸ Kuppam, AP</span>
        </div>
      </div>
    </div>
  );
}
