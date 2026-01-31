# Advanced Code Quality Checks

@Metadata {
  @PageKind(article)
  @PageColor(gray)
  @PageImage(purpose: icon, source: "ios-scaling-challenges-35-advanced-code-quality-checks-icon.codex", alt: "Advanced code quality checks icon")
  @PageImage(purpose: card, source: "ios-scaling-challenges-35-advanced-code-quality-checks-card.codex", alt: "Advanced code quality checks card")
}

@Image(source: "ios-scaling-challenges-35-advanced-code-quality-checks-hero.codex", alt: "Advanced code quality checks hero")

This page records how the Google Maps typography system addressed "Advanced code quality checks".

## Challenge

We needed to simplify the API surface to improve quality checks.

## System Design Response

We reduced the API surface from ~40 references to 11 APIs.

## Evidence and Remaining Risk

We removed dependency on M1 libraries and deleted C-based APIs.
## Diagram: Context Snapshot

@Image(source: "system-designs-google-maps-font-system-scaling-challenges-challenge.practice-and-maturity.advanced-code-quality-checks-context.mermaid", alt: "Context snapshot")

```mermaid
%% file: system-designs-google-maps-font-system-scaling-challenges-challenge.practice-and-maturity.advanced-code-quality-checks-context.svg
%% title: Advanced code quality checks - Context snapshot
flowchart LR
  A["Challenge: Advanced code quality checks"] --> B["Constraint or pressure"]
  B --> C["System design response"]
  C --> D["Evidence and remaining risk"]
```
