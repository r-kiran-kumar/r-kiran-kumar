// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : ownership-lib.mjs
// Description : Reads company-info.json and renders the canonical file header.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const ROOT = process.cwd();

export function loadInfo() {
  return JSON.parse(readFileSync(join(ROOT, 'company-info.json'), 'utf8'));
}

// Files whose headers are managed. Everything else is left alone.
export const INCLUDE_DIRS = ['src', 'scripts'];
export const SLASH_EXT = new Set(['.js', '.jsx', '.mjs', '.ts', '.tsx']);

export const SKIP = [
  'node_modules', '.next', '.git', '.claude', 'public',
];

function resolveToken(info, token, file, description) {
  if (token === 'file') return file;
  if (token === 'description') return description;
  return token.split('.').reduce((acc, k) => (acc == null ? acc : acc[k]), info) ?? '';
}

/** Render the header block for one file, in the given comment style. */
export function renderHeader(info, file, description, style = 'slash') {
  const s = info.header.styles[style];
  const body = info.header.lines
    .map((line) => line.replace(/\{\{([^}]+)\}\}/g, (_, t) => resolveToken(info, t.trim(), file, description)))
    // A blank template line must not leave trailing whitespace behind.
    .map((line) => (line === '' ? s.linePrefix.trimEnd() : s.linePrefix + line));
  return [s.open, ...body, s.close].join('\n');
}

/** The identity lines every managed file must carry, ignoring per-file fields. */
export function identityLines(info) {
  return [
    `${info.company.headerName} — ${info.company.tagline}`,
    `© ${info.company.copyrightYear} ${info.company.headerName}. ${info.company.rightsStatement}`,
    `Project     : ${info.project.name}`,
    `Website     : ${info.company.website}`,
    `Copyright   : ${info.company.copyrightUrl}`,
  ];
}
