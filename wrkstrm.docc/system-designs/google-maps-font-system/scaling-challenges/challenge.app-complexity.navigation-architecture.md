# Navigation Architecture

@Metadata {
  @PageKind(article)
  @PageColor(gray)
  @PageImage(purpose: icon, source: "ios-scaling-challenges-13-navigation-architecture-icon.codex", alt: "Navigation architecture icon")
  @PageImage(purpose: card, source: "ios-scaling-challenges-13-navigation-architecture-card.codex", alt: "Navigation architecture card")
}

@Image(source: "ios-scaling-challenges-13-navigation-architecture-hero.codex", alt: "Navigation architecture hero")

This page records how the Google Maps typography system addressed "Navigation architecture".

## Challenge

Google Fonts needed to be used in the main navigation element.

## System Design Response

N/A.

## Evidence and Remaining Risk

We timed the milliseconds to load for the main navigation typography.

## Diagram: Context Snapshot

@Image(source: "system-designs-google-maps-font-system-scaling-challenges-challenge.app-complexity.navigation-architecture-context.mermaid", alt: "Context snapshot")

```mermaid
%% file: system-designs-google-maps-font-system-scaling-challenges-challenge.app-complexity.navigation-architecture-context.svg
%% title: Navigation architecture - Context snapshot
flowchart LR
  A["Challenge: Navigation architecture"] --> B["Constraint or pressure"]
  B --> C["System design response"]
  C --> D["Evidence and remaining risk"]
```
