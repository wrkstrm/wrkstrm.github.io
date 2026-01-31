# Device and OS Fragmentation

@Metadata {
  @PageKind(article)
  @PageColor(gray)
  @PageImage(purpose: icon, source: "ios-scaling-challenges-11-device-and-os-fragmentation-icon.codex", alt: "Device and OS fragmentation icon")
  @PageImage(purpose: card, source: "ios-scaling-challenges-11-device-and-os-fragmentation-card.codex", alt: "Device and OS fragmentation card")
}

@Image(source: "ios-scaling-challenges-11-device-and-os-fragmentation-hero.codex", alt: "Device and OS fragmentation hero")

This page records how the Google Maps typography system addressed "Device and OS fragmentation".

## Challenge

Four supported OS versions and a 300 million user base multiplied risk for any
typography change.

## System Design Response

We explicitly tested on small screens as part of the rollout plan.

## Evidence and Remaining Risk

We monitored crash rates by OS version, including an early iOS release.
## Diagram: Context Snapshot

@Image(source: "system-designs-google-maps-font-system-scaling-challenges-challenge.app-complexity.device-and-os-fragmentation-context.mermaid", alt: "Context snapshot")

```mermaid
%% file: system-designs-google-maps-font-system-scaling-challenges-challenge.app-complexity.device-and-os-fragmentation-context.svg
%% title: Device and OS fragmentation - Context snapshot
flowchart LR
  A["Challenge: Device and OS fragmentation"] --> B["Constraint or pressure"]
  B --> C["System design response"]
  C --> D["Evidence and remaining risk"]
```
