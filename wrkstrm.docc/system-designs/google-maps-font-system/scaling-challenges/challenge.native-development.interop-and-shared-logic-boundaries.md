# Interop and Shared Logic Boundaries

@Metadata {
  @PageKind(article)
  @PageColor(gray)
  @PageImage(purpose: icon, source: "ios-scaling-challenges-26-interop-and-shared-logic-boundaries-icon.codex", alt: "Interop and shared logic boundaries icon")
  @PageImage(purpose: card, source: "ios-scaling-challenges-26-interop-and-shared-logic-boundaries-card.codex", alt: "Interop and shared logic boundaries card")
}

@Image(source: "ios-scaling-challenges-26-interop-and-shared-logic-boundaries-hero.codex", alt: "Interop and shared logic boundaries hero")

This page records how the Google Maps typography system addressed "Interop and shared logic boundaries".

## Challenge

The font system needed to be set up across multiple test harnesses and still
work consistently at shared logic boundaries.

## System Design Response

We reduced the number of test runners to make the shared setup reliable.

## Evidence and Remaining Risk

N/A.
## Diagram: Context Snapshot

@Image(source: "system-designs-google-maps-font-system-scaling-challenges-challenge.native-development.interop-and-shared-logic-boundaries-context.mermaid", alt: "Context snapshot")

```mermaid
%% file: system-designs-google-maps-font-system-scaling-challenges-challenge.native-development.interop-and-shared-logic-boundaries-context.svg
%% title: Interop and shared logic boundaries - Context snapshot
flowchart LR
  A["Challenge: Interop and shared logic boundaries"] --> B["Constraint or pressure"]
  B --> C["System design response"]
  C --> D["Evidence and remaining risk"]
```
