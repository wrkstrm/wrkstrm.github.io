# Cross-platform vs Native Decision Framework

@Metadata {
  @PageKind(article)
  @PageColor(gray)
  @PageImage(purpose: icon, source: "ios-scaling-challenges-28-cross-platform-vs-native-decision-framework-icon.codex", alt: "Cross-platform vs native decision framework icon")
  @PageImage(purpose: card, source: "ios-scaling-challenges-28-cross-platform-vs-native-decision-framework-card.codex", alt: "Cross-platform vs native decision framework card")
}

@Image(source: "ios-scaling-challenges-28-cross-platform-vs-native-decision-framework-hero.codex", alt: "Cross-platform vs native decision framework hero")

This page records how the Google Maps typography system addressed "Cross-platform vs native decision framework".

## Challenge

Cross-platform frameworks would load the app about 2x slower (measured), which
was unacceptable for the typography rollout.

## System Design Response

We stayed native.

## Evidence and Remaining Risk

Evidence: we denied this path because of performance.
## Diagram: Context Snapshot

@Image(source: "system-designs-google-maps-font-system-scaling-challenges-challenge.native-development.cross-platform-vs-native-decision-framework-context.mermaid", alt: "Context snapshot")

```mermaid
%% file: system-designs-google-maps-font-system-scaling-challenges-challenge.native-development.cross-platform-vs-native-decision-framework-context.svg
%% title: Cross-platform vs native decision framework - Context snapshot
flowchart LR
  A["Challenge: Cross-platform vs native decision framework"] --> B["Constraint or pressure"]
  B --> C["System design response"]
  C --> D["Evidence and remaining risk"]
```
