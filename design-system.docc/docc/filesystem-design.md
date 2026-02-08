# Filesystem Design

@Metadata {
  @PageKind(article)
}

The filesystem is the source of truth. Paths, slugs, and DocC navigation should mirror what
exists on disk so contributors can reason about structure without guesswork.

## Principles

- **Filesystem-first:** navigation mirrors directories and filenames.
- **Deterministic naming:** stable, predictable slugs in URLs and tools.
- **Cross-platform safety:** avoid case collisions and platform-specific behavior.

## Topics

### Naming

- <doc:filesystem-design-kebab-case-manifesto>

### Alignment

- <doc:docc-design-system-filesystem-alignment>
- <doc:docc-design-system-file-organization>
