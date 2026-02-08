# Kebab-Case Manifesto

@Metadata {
  @PageKind(article)
}

Wrkstrm public paths, repositories, and documentation live on the web. Kebab-case keeps URLs,
paths, and tooling deterministic across platforms.

## Rules

- Use kebab-case for public slugs, repository names, directories, and filenames.
- Allowed: `a-z`, `0-9`, single hyphens. Disallowed: uppercase, underscores, dots, spaces.
- Regex: `^[a-z0-9]+(?:-[a-z0-9]+)*$`

## Why it matters

- **Stable URLs:** predictable, readable, and copy-safe in browsers.
- **Cross-platform safety:** avoids case-sensitive / case-insensitive drift.
- **Tooling hygiene:** simpler globbing, fewer edge cases, smaller diffs.
- **Ecosystem clarity:** paths match repo names, and repos match published docs.

## Exceptions

- **Product/import names:** Swift products remain `UpperCamelCase`.
- **Case-only renames:** use a temporary move to avoid macOS case-insensitive collisions.

## Related guidance

- <doc:filesystem-design>
