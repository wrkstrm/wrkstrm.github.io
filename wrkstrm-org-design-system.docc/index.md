# Index

@Metadata {
  @PageKind(article)
  @PageColor(purple)
  @TechnologyRoot
  @Available(platform: macOS, introduced: "1.0")
  @TitleHeading("Org Design System")
}

@Options {
  @TopicsVisualStyle(detailedGrid)
  @AutomaticSeeAlso(disabled)
}

A repeatable, security-first process for creating and operating GitHub orgs in the Wrkstrm ecosystem (e.g. `wrkstrm`, `wrkstrm-finance`, and future orgs like `tau`).

## Principles

- **Repeatable over bespoke**: prefer a standard baseline you can apply to every org.
- **Least privilege**: start restrictive; expand access intentionally.
- **Two-owner rule**: never create an org with a single human Owner.
- **Templates, not tribal knowledge**: org defaults live in `.github` and `meta` so the process is inspectable.

## Topics

### Org Provisioning

- <doc:org-spin-up>
- <doc:repo-scaffolding>
- <doc:security-baseline>
