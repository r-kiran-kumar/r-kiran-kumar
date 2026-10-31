// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : check-ownership.mjs
// Description : Fails the build when a managed source file is missing the
//               canonical header or its identity lines have drifted.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';
import { INCLUDE_DIRS, ROOT, SKIP, SLASH_EXT, identityLines, loadInfo } from './ownership-lib.mjs';

const info = loadInfo();
const required = identityLines(info);

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (SKIP.includes(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (SLASH_EXT.has(extname(entry))) out.push(full);
  }
  return out;
}

const failures = [];
for (const dir of INCLUDE_DIRS) {
  let files = [];
  try { files = walk(join(ROOT, dir)); } catch { continue; }
  for (const full of files) {
    const rel = relative(ROOT, full).split('\\').join('/');
    const head = readFileSync(full, 'utf8').split('\n').slice(0, 14).join('\n');
    if (!head.startsWith('// ====')) { failures.push([rel, 'missing ownership header']); continue; }
    const missing = required.filter((line) => !head.includes(line));
    if (missing.length) failures.push([rel, `header drifted — expected: ${missing.join(' | ')}`]);
  }
}

if (failures.length) {
  console.error(`\n✖ Ownership guard failed for ${failures.length} file(s):\n`);
  for (const [file, why] of failures) console.error(`  ${file}\n      ${why}`);
  console.error(`\nRun \`node scripts/stamp-ownership.mjs\` to fix.\n`);
  process.exit(1);
}
console.log('✓ Ownership guard passed — every managed file carries the canonical header.');
