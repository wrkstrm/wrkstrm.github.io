# GitHub Actions for DocC publishing

Use GitHub Actions to build and publish DocC bundles to GitHub Pages.
This page documents the conventions we rely on in wrkstrm so DocC sites stay predictable.

## The mental model

DocC publishing has three separate concerns that are easy to accidentally conflate:

1) **DocC build output paths** (what `docc` generates)
2) **GitHub Pages mount path** (where Pages serves the artifact)
3) **Custom domain redirects** (how GitHub rewrites `*.github.io` → your custom domain)

When diagnosing a broken URL, identify which layer is responsible.

## `--hosting-base-path` is *not* a routing rule

`--hosting-base-path` only changes how DocC generates *internal links and asset paths* (CSS/JS/images)
so that the rendered site works when served under a subpath.

It does **not** create a new route on the server.

Example:

- Setting `--hosting-base-path "/requests.docc"` does **not** guarantee that
  `https://<host>/requests.docc/…` exists.
- It only ensures that **if** you serve the output under `/requests.docc`, the links will work.

## Default Pages domain vs custom domain

If a Pages site (often the org/user Pages repo) is configured with a custom domain, GitHub will
redirect requests for the default domain:

- `https://<org>.github.io/<path>` → `https://<custom-domain>/<path>`

This can make it look like a “repo-specific Pages URL” is broken when the real behavior is a
custom-domain redirect.

## Redirects: prefer workflow-generated `index.html`

### Markdown-only redirects

You can create a DocC page that says “This page moved” and links to the new location.
That’s reliable.

Automatic redirects are **not** reliable in Markdown/DocC:

- `meta refresh` tags may be stripped or ignored
- JavaScript redirects are typically not allowed

### Recommended: static redirect stub

If you need an actual redirect, generate a tiny `index.html` redirect page in your workflow output
(e.g. for `/documentation/requests/`) and include it in the artifact uploaded to Pages.

This keeps redirects deterministic and independent of DocC sanitization.

## Workflow checklist

- Use `swift-actions/setup-swift` (Linux CI) or Xcode’s `docc` locally.
- Confirm the Pages artifact contains the expected mount path.
- Confirm `--hosting-base-path` matches the path the artifact will be served under.
- If you need redirects, generate static `index.html` files as a post-build step.

## Failure modes we’ve hit

- **404 on a “subpath site”**: the file tree doesn’t actually include that folder on Pages.
- **Working on custom domain, broken on `*.github.io`**: Pages custom domain redirect rules are in play.
- **Assets 404 (CSS/JS)**: `--hosting-base-path` mismatch.
