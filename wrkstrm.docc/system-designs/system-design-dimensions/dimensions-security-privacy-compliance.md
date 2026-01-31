# Security, Privacy, Compliance

@Metadata {
  @PageKind(article)
  @PageColor(gray)
  @TitleHeading("Security, Privacy, Compliance")
  @PageImage(purpose: icon, source: "system-designs-system-design-dimensions-icon.codex", alt: "Security, Privacy, Compliance icon")
  @PageImage(purpose: card, source: "system-designs-system-design-dimensions-card.codex", alt: "Security, Privacy, Compliance card")
}

@Options {
  @AutomaticSeeAlso(disabled)
}

@Image(source: "system-designs-system-design-dimensions-hero.codex", alt: "Security, Privacy, Compliance hero")

Capture data handling, compliance risk, and guardrails.

## Include

- Threat model or abuse cases.
- Data retention, encryption, or access controls.
- Privacy and compliance requirements.

## Diagram: Context Snapshot

@Image(source: "system-designs-system-design-dimensions-dimensions-security-privacy-compliance-context.mermaid", alt: "Context snapshot")

```mermaid
%% file: system-designs-system-design-dimensions-dimensions-security-privacy-compliance-context.svg
%% title: Security, Privacy, Compliance - Context snapshot
flowchart LR
  A["Security, Privacy, Compliance"] --> B["Constraints and scope"]
  B --> C["Complexity drivers"]
  C --> D["Design tradeoffs"]
  D --> E["Risk: regressions and drift"]
  D --> F["Risk: migration cost"]
  D --> G["Risk: stakeholder misalignment"]
```
