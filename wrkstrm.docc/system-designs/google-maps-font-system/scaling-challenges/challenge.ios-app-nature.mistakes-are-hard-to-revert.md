# Mistakes Are Hard to Revert

@Metadata {
  @PageKind(article)
  @PageColor(gray)
  @PageImage(purpose: icon, source: "ios-scaling-challenges-02-mistakes-are-hard-to-revert-icon.codex", alt: "Mistakes are hard to revert icon")
  @PageImage(purpose: card, source: "ios-scaling-challenges-02-mistakes-are-hard-to-revert-card.codex", alt: "Mistakes are hard to revert card")
}

@Image(source: "ios-scaling-challenges-02-mistakes-are-hard-to-revert-hero.codex", alt: "Mistakes are hard to revert hero")

This page records how the Google Maps typography system addressed "Mistakes are hard to revert".

## Challenge

We avoided global variables for experiment control because mistakes are hard to
revert at scale.

## System Design Response

We moved to service-based dependency injection that runs before the app
delegate lifecycle begins.

## Evidence and Remaining Risk

N/A.
## Diagram: Context Snapshot

@Image(source: "system-designs-google-maps-font-system-scaling-challenges-challenge.ios-app-nature.mistakes-are-hard-to-revert-context.mermaid", alt: "Context snapshot")

```mermaid
%% file: system-designs-google-maps-font-system-scaling-challenges-challenge.ios-app-nature.mistakes-are-hard-to-revert-context.svg
%% title: Mistakes are hard to revert - Context snapshot
flowchart LR
  A["Challenge: Mistakes are hard to revert"] --> B["Constraint or pressure"]
  B --> C["System design response"]
  C --> D["Evidence and remaining risk"]
```
