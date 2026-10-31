<!--
============================================================================
ChronoSparkSolutions — A Software Company
© 2026 ChronoSparkSolutions. All rights reserved.

Project     : R Kiran Kumar
File        : OWNERSHIP.md
Description : How the company-info ownership metadata is defined and consumed.
Website     : https://www.chronosparksolutions.com/
Copyright   : https://www.chronosparksolutions.com/copyright
============================================================================
-->

# Ownership metadata — single source of truth

`company-info.json` is the one place ChronoSpark Solutions' ownership facts are
defined: the company name and links, and the corporate header template.
Everything else (file headers, the CI ownership guard) is derived from or
checked against it, so a change is made **once, here** and stays consistent
everywhere.

## Serving it from an endpoint (optional)

You can host this exact JSON at a URL (for example `https://rkirankumar.com/company-info`)
and have a **documented build step** fetch it. Requirements if you do:

- Serve it over HTTPS with `Content-Type: application/json`.
- It is public, read-only metadata — no secrets in it.
- Fetching is a transparent, logged build/generate step, not a hidden runtime
  action. Anything that pulls from it is committed and reviewable, and pins a
  checksum so a changed endpoint can't silently alter the codebase.
- Keep the checked-in `company-info.json` as the fallback and the reviewable
  record of what the endpoint is expected to return.

## Fields

| Path | Meaning |
| :--- | :--- |
| `company.name` / `company.headerName` | Full name / the no-space form used in headers |
| `company.website`, `company.copyrightUrl`, `company.contactEmail` | Links shown in the header and for licensing questions |
| `company.copyrightYear`, `company.rightsStatement` | `© <year> … <statement>` line |
| `project.name` | The project this repo is — `R Kiran Kumar` here, `ChronoSpark Solutions` in that repo |
| `header.lines` | The header body; `{{...}}` tokens are substituted, `{{file}}`/`{{description}}` per file |
| `header.styles` | Comment framing for slash-comment vs block-comment file types |

## Commands

| Command | What it does |
| :--- | :--- |
| `npm run ownership:stamp` | Writes the canonical header onto every managed file, preserving existing descriptions |
| `npm run ownership:check` | Verifies every managed file carries it; exits non-zero on drift |

Managed files are `.js/.jsx/.mjs/.ts/.tsx` under `src/` and `scripts/`.

## Enforcement

The values here are enforced by `scripts/check-ownership.mjs` (run in CI via
`.github/workflows/ownership-guard.yml`), which **fails the build** when a header
is missing or an identity line is changed. Enforcement is transparent and
non-destructive by design — it blocks bad changes; it never deletes files,
phones home to rewrite the tree, or hides itself from review.
