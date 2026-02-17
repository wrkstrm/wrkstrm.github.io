# Security baseline

@Metadata {
  @PageKind(article)
  @TitleHeading("Security Baseline")
}

This is the default security posture for new orgs.

## Identity & access

- **Enforce 2FA** for all members.
- Start with **Owners-only** repo creation.
- Prefer **team-based CODEOWNERS** (avoid single-person ownership).

## Branch / change control

- Protect `main` on all repos.
- Require PRs and at least 1 review.
- Require CI checks.
- Block force-push.

## Supply chain

- GitHub Actions: prefer **allowlist** mode.
- Enable Dependabot alerts.
- Enable secret scanning (plan-dependent).

## Incident hygiene

- Ensure `.github/SECURITY.md` exists and points to the right disclosure process.
- Ensure at least 2 Owners can rotate credentials and access.
