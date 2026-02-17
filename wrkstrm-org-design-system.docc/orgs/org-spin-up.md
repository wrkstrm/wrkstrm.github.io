# Org spin-up checklist

@Metadata {
  @PageKind(article)
  @TitleHeading("Org Spin-Up")
}

This is the canonical, minimal checklist for spinning up a new GitHub org (example: `tau`) so it feels like `wrkstrm` / `wrkstrm-finance`.

## 1) Pre-flight (decisions)

- **Org handle**: confirm availability and spelling.
- **Scope (1 sentence)**: what belongs in the org; what *doesn’t*.
- **Initial Owners**: 2–3 humans.
- **Billing / plan**: Free vs Team; confirm whether private repos are needed.

## 2) Create org (UI)

Recommended: create the org in the GitHub UI, then apply the rest with a standard settings pass.

- Require **2FA** for members.
- Decide whether members can create repos (default: **Owners only**).

## 3) Baseline org settings

- **Default branch**: `main`.
- **GitHub Actions policy**: choose one:
  - Strict: allow only actions from GitHub + org allowlist.
  - Permissive: allow all (not recommended for new orgs).
- **Security features** (plan-dependent): Dependabot alerts, secret scanning.

## 4) Teams

Minimum viable set:

- `core` — write/admin for core repos
- `contributors` — triage (optional)

Notes:
- GitHub “Owners” is separate from teams; still create an `owners` team if you want a human-readable roster.

## 5) First repos

Create these first so the org is self-documenting:

- `.github` — org-wide defaults (templates, CODEOWNERS strategy, shared workflows)
- `meta` (or `roadmap`) — charter + decisions + RFCs

Optional (only if you need them immediately):
- `docs` / website repo

## 6) Branch protections (per repo)

Protect `main` on initial repos:

- Require PRs
- Require status checks (CI)
- Require 1–2 reviews
- Block force-push

## 7) “Done” criteria

- At least **2 Owners** confirmed
- 2FA enforced
- `.github` and `meta` exist
- `main` is protected on initial repos
