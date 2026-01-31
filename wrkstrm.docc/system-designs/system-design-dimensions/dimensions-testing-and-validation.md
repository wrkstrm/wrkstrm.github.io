# Testing and Validation

@Metadata {
  @PageKind(article)
  @PageColor(gray)
  @TitleHeading("Testing and Validation")
  @PageImage(purpose: icon, source: "system-designs-system-design-dimensions-icon.codex", alt: "Testing and Validation icon")
  @PageImage(purpose: card, source: "system-designs-system-design-dimensions-card.codex", alt: "Testing and Validation card")
}

@Options {
  @AutomaticSeeAlso(disabled)
}

@Image(source: "system-designs-system-design-dimensions-hero.codex", alt: "Testing and Validation hero")

Explain how correctness was proven before and after launch.

## Include

- Test strategy and coverage.
- Validation steps or QA gates.
- Regression or snapshot tooling.

## Diagram: Context Snapshot

@Image(source: "system-designs-system-design-dimensions-dimensions-testing-and-validation-context.mermaid", alt: "Context snapshot")

```mermaid
%% file: system-designs-system-design-dimensions-dimensions-testing-and-validation-context.svg
%% title: Testing and Validation - Context snapshot
flowchart LR
  A["Testing and Validation"] --> B["Constraints and scope"]
  B --> C["Complexity drivers"]
  C --> D["Design tradeoffs"]
  D --> E["Risk: regressions and drift"]
  D --> F["Risk: migration cost"]
  D --> G["Risk: stakeholder misalignment"]
```
