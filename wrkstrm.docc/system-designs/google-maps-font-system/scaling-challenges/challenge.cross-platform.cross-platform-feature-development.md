# Cross-platform Feature Development

@Metadata {
  @PageKind(article)
  @PageColor(gray)
  @PageImage(purpose: icon, source: "ios-scaling-challenges-27-cross-platform-feature-development-icon.codex", alt: "Cross-platform feature development icon")
  @PageImage(purpose: card, source: "ios-scaling-challenges-27-cross-platform-feature-development-card.codex", alt: "Cross-platform feature development card")
}

@Image(source: "ios-scaling-challenges-27-cross-platform-feature-development-hero.codex", alt: "Cross-platform feature development hero")

This page records how the Google Maps typography system addressed "Cross-platform feature development".

## Challenge

iPad vs iPhone were on two different timelines, so they needed separate
experiment setups.

## System Design Response

We kept both surfaces stable throughout the transition.

## Evidence and Remaining Risk

iPhone and iPad shipped two design systems at the same time.
## Diagram: Context Snapshot

@Image(source: "system-designs-google-maps-font-system-scaling-challenges-challenge.cross-platform.cross-platform-feature-development-context.mermaid", alt: "Context snapshot")

```mermaid
%% file: system-designs-google-maps-font-system-scaling-challenges-challenge.cross-platform.cross-platform-feature-development-context.svg
%% title: Cross-platform feature development - Context snapshot
flowchart LR
  A["Challenge: Cross-platform feature development"] --> B["Constraint or pressure"]
  B --> C["System design response"]
  C --> D["Evidence and remaining risk"]
```
