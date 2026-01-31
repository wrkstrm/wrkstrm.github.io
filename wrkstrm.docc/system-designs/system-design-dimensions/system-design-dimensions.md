# System Design Dimensions

@Metadata {
  @PageKind(article)
  @PageColor(gray)
  @TitleHeading("System Design Dimensions")
  @PageImage(purpose: icon, source: "system-designs-system-design-dimensions-icon.codex", alt: "System Design Dimensions icon")
  @PageImage(purpose: card, source: "system-designs-system-design-dimensions-card.codex", alt: "System Design Dimensions card")
}

@Options {
  @AutomaticSeeAlso(disabled)
}

@Image(source: "system-designs-system-design-dimensions-hero.codex", alt: "System Design Dimensions hero")

A system design template organized as dimensions. Use it as a checklist for what
could matter, then select only the dimensions that fit your case study.

## How to Use

- Start with the executive summary and problem context.
- Add only the dimensions that change decisions or outcomes.
- Keep diagrams embedded in the dimension where they are discussed.

## Diagram: Context Snapshot

@Image(source: "system-designs-system-design-dimensions-system-design-dimensions-context.mermaid", alt: "Context snapshot")

```mermaid
%% file: system-designs-system-design-dimensions-system-design-dimensions-context.svg
%% title: System Design Dimensions - Context snapshot
flowchart LR
  A["System Design Dimensions"] --> B["Constraints and scope"]
  B --> C["Complexity drivers"]
  C --> D["Design tradeoffs"]
  D --> E["Risk: regressions and drift"]
  D --> F["Risk: migration cost"]
  D --> G["Risk: stakeholder misalignment"]
```

## Topics

- <doc:dimensions-executive-summary>
- <doc:dimensions-problem-context>
- <doc:dimensions-goals-and-non-goals>
- <doc:dimensions-requirements-and-constraints>
- <doc:dimensions-stakeholders-and-ownership>
- <doc:dimensions-architecture-overview>
- <doc:dimensions-data-flows-and-interfaces>
- <doc:dimensions-risks-and-tradeoffs>
- <doc:dimensions-security-privacy-compliance>
- <doc:dimensions-reliability-scalability-performance>
- <doc:dimensions-observability-and-operations>
- <doc:dimensions-testing-and-validation>
- <doc:dimensions-migration-and-rollout>
- <doc:dimensions-results-and-metrics>
- <doc:dimensions-lessons-and-next-steps>
- <doc:dimensions-appendix-and-references>


