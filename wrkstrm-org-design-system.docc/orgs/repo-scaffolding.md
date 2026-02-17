# Repo scaffolding

@Metadata {
  @PageKind(article)
  @TitleHeading("Repo Scaffolding")
}

The goal is for a new org to be useful *immediately* and to encode defaults centrally.

## Required repos

### 1) `.github`

Org-wide defaults:

- Issue templates / PR templates
- Shared workflows (lint/test/release)
- CODEOWNERS strategy (teams)
- SECURITY.md, SUPPORT.md (optional)

### 2) `meta` (or `roadmap`)

Org coordination:

- Charter / scope
- Decisions (ADR-style) and RFCs
- Naming conventions and repo taxonomy
- “How we work” (branching, releases)

## Optional repos

- `docs` / `site` — only if the org needs a public web presence.
- `playground` — experiments you’re willing to delete.

## Naming conventions

- Prefer **kebab-case** for repos.
- Use a consistent prefix only when it materially helps discovery (avoid unnecessary repetition).
