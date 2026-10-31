// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : stamp-ownership.mjs
// Description : Writes the canonical header from company-info.json onto every managed source file, preserving any existing description.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { basename, extname, join, relative } from 'node:path';
import { INCLUDE_DIRS, ROOT, SKIP, SLASH_EXT, loadInfo, renderHeader } from './ownership-lib.mjs';

const info = loadInfo();

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (SKIP.includes(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (SLASH_EXT.has(extname(entry))) out.push(full);
  }
  return out;
}

/** Split a leading ChronoSpark header off the file, returning it and the rest. */
function splitHeader(src) {
  if (!src.startsWith('// ====')) return { header: null, body: src };
  const lines = src.split('\n');
  let end = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].startsWith('// ====')) { end = i; break; }
    if (!lines[i].startsWith('//')) break;          // not a contiguous header block
  }
  if (end === -1) return { header: null, body: src };
  const header = lines.slice(0, end + 1).join('\n');
  if (!header.includes('ChronoSpark')) return { header: null, body: src };
  return { header, body: lines.slice(end + 1).join('\n').replace(/^\n+/, '') };
}

/** Pull `Description :` (plus its continuation lines) out of an old header. */
function existingDescription(header) {
  if (!header) return null;
  const lines = header.split('\n');
  const i = lines.findIndex((l) => /^\/\/\s*Description\s*:/.test(l));
  if (i === -1) return null;
  const parts = [lines[i].replace(/^\/\/\s*Description\s*:\s*/, '').trim()];
  for (let j = i + 1; j < lines.length; j++) {
    const m = lines[j].match(/^\/\/\s{10,}(\S.*)$/);   // indented continuation
    if (!m) break;
    parts.push(m[1].trim());
  }
  return parts.join(' ').trim() || null;
}

/** Reasonable description when a file has never carried one. */
function deriveDescription(rel) {
  const name = basename(rel);
  const seg = rel.split('/');
  if (seg.includes('api')) return `API route handler for /${seg.slice(seg.indexOf('api')).slice(0, -1).join('/')}.`;
  if (name === 'page.js' || name === 'page.jsx') return `Page component for the ${seg.slice(2, -1).join('/') || 'home'} route.`;
  if (name === 'layout.js' || name === 'layout.jsx') return `Layout for the ${seg.slice(2, -1).join('/') || 'root'} route.`;
  if (seg.includes('components')) return `${basename(name, extname(name))} UI component.`;
  if (seg.includes('lib')) return `${basename(name, extname(name))} helper module.`;
  return `${basename(name, extname(name))} module.`;
}

let stamped = 0, updated = 0;
for (const dir of INCLUDE_DIRS) {
  let files = [];
  try { files = walk(join(ROOT, dir)); } catch { continue; }
  for (const full of files) {
    const rel = relative(ROOT, full).split('\\').join('/');
    const src = readFileSync(full, 'utf8');
    const { header, body } = splitHeader(src);
    const description = existingDescription(header) ?? deriveDescription(rel);
    const next = renderHeader(info, basename(rel), description) + '\n\n' + body;
    if (next === src) continue;
    writeFileSync(full, next);
    header ? updated++ : stamped++;
  }
}
console.log(`Ownership headers — ${stamped} added, ${updated} normalised.`);
