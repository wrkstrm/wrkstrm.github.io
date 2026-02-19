# Directory Design System: public vs provisioned vs private

This page establishes a **clear, non-overlapping directory taxonomy** for DocC and thread artifacts.

## 1) Public

**Meaning:** Content intended for broad, public consumption.

**Characteristics:**

- Published to GitHub Pages under a canonical public host.
- Must follow public-safe writing rules (no secrets; avoid unstable references like commit SHAs).
- Build/publish is automated by CI.

**Canonical sources (authoring):**

- mono: `code/mono/docc/public/host/github/<bundle>.docc/…`
- todo3: `github/users/<user>/public/docc/pages/<user>.github.io/<site>.docc/…`
  - or `github/orgs/<org>/public/docc/pages/<org>.github.io/<site>.docc/…`

**Published output:**

- `https://<host>/<site>/documentation/<tech-root>/…`

## 2) Provisioned

**Meaning:** Shareable documentation for operators. **Tiered above public**, but below private.

**Key rule:** provisioned content **mirrors the directory structure** of public material, but may contain **different, richer content** (operator notes, deployment guidance, SRE/runbooks, internal diagrams that are still safe to share).

**Characteristics:**

- Intended to be published/shareable, but not necessarily to the canonical public hubs.
- Deployed via tooling (e.g. `swift-docc-deploy deploy provisioned-share`) that generates a dedicated slug-hash Pages repo.
- Uses a **repo-root redirect page** (`/index.html`) to support custom OpenGraph/Twitter previews.

**Canonical sources (authoring):**

- mono: `code/mono/provisioned/<slug>-<series>/<bundle>.docc/…`
  - example: `code/mono/provisioned/wrkstrm-design-system-0/wrkstrm.design.docc/`
  - example: `code/mono/provisioned/git-design-system-0/git.design.docc/`

**Generated deploy repos (tool output):**

- `https://github.com/<owner>/<slug>-<hash>`
- `https://<owner>.github.io/<slug>-<hash>/` (Pages root)

**Redirect rule (critical):**

- The redirect target must be discovered from the built output (e.g. `_site/index/index.json`),
  not guessed from the `.docc` directory name.

## 3) Private

**Meaning:** Internal-only artifacts and working state.

**Characteristics:**

- Not published to GitHub Pages.
- May include internal context, operational details, and evolving notes.
- Often includes canonical event/state logs that can generate mirrors.

**Canonical sources (examples):**

- todo3 thread data (canonical): `.clia/threads/private/<threadId>/…`
- thread mirrors (generated): `.clia/threads/private/<threadId>.docc/…`
- local-only DocC bundles: `docc/private/host/local/<bundle>.docc/…` (repo-specific)

## Mirror mapping (structure only)

Provisioned mirrors the **shape** of public so people can find things predictably, but uses a different tier root.

Canonical mapping (conceptual):

- public: `public/docc/pages/<host>.github.io/<site>.docc/...`
- provisioned: `provisioned/docc/pages/<host>.github.io/<site>.docc/...`

Constraints:

- Same `<host>.github.io` and `<site>` coordinates (structure mirror).
- Content may differ (tiered docs).
- Public must not depend on provisioned.
- Provisioned may link out to public.

## Provisioned publish requirements (docc-deploy)

Provisioned publishing is defined by tooling behavior (currently `swift-docc-deploy deploy provisioned-share`):

- Generates a **repo-root** `/index.html` for custom OpenGraph/Twitter previews, then redirects into DocC.
- Uses a **slug-hash repo** pattern (`<slug>-<hash>`) for easy sharing.
- Redirect target must be discovered from built output (e.g. `_site/index/index.json`), not guessed.

## Non-overlap rule

A directory must belong to **exactly one** of:

- public
- provisioned
- private

If it is unclear: default to **private** until explicitly promoted.
