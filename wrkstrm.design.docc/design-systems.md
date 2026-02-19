# Design Systems

@Metadata {
  @PageKind(article)
  @PageColor(blue)
  @TitleHeading("DocC authoring + preview tooling")
  @PageImage(purpose: icon, source: "clia-design-systems-icon", alt: "Design systems icon")
  @PageImage(purpose: card, source: "clia-design-systems-card", alt: "Card")
}

A set of public design guides for DocC authoring, preview workflows, and documentation structure.

@Image(source: "clia-design-systems-hero", alt: "Hero: terminal + DocC + tooling")

## Public vs Private

Wrkstrm documentation is split into public and private surfaces.

- **Public** content is publishable (e.g. GitHub Pages) and must be written for an external reader.
- **Private** content is internal-only (operators, local paths, internal benchmarks/incidents, unreleased plans).

### The top level is not a dumping ground

The bundle root should stay small and curated. Add new pages to an appropriate topic folder (for example `docc/`, `tui/`, `spm/`, `svg/`) and link them through the relevant container article.

Treat the boundary as a **release contract**, not a folder naming preference. When content must move from private → public, follow the explicit bridging/graduation rules in:

- <doc:docc-design-system-file-organization>

## Topics

### DocC

- <doc:docc-design-system>
- <doc:filesystem-design>
- <doc:docc-design-system-docc-packages>
- <doc:docc-design-system-docc-packages-usage-map>
- <doc:docc-design-system-preview>
