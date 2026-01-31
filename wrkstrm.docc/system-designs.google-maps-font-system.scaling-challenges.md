# Scaling Challenges Coverage

@Metadata {
  @PageKind(article)
  @PageColor(gray)
  @PageImage(purpose: icon, source: "ios-scaling-challenges-icon.codex", alt: "Scaling challenges coverage icon")
  @PageImage(purpose: card, source: "ios-scaling-challenges-card.codex", alt: "Scaling challenges coverage card")
}

@Image(source: "ios-scaling-challenges-hero.codex", alt: "Scaling challenges coverage hero")

A coverage map for how the Google Maps typography system addressed each scaling challenge.

## Diagram: Coverage Map

@Image(source: "system-designs-google-maps-font-system-scaling-challenges-context.mermaid", alt: "Coverage map")

```mermaid
%% file: system-designs-google-maps-font-system-scaling-challenges-context.svg
%% title: Scaling challenges coverage map
flowchart LR
  A["Scaling challenges"] --> B["iOS app nature"]
  A --> C["App complexity"]
  A --> D["Large iOS teams"]
  A --> E["Cross-platform"]
  A --> F["Native development"]
  A --> G["Practice and maturity"]
```

## See Also

### Nature of iOS Apps

- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.ios-app-nature.state-management>
- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.ios-app-nature.mistakes-are-hard-to-revert>
- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.ios-app-nature.long-tail-of-old-app-versions>
- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.ios-app-nature.deeplinks-and-routing>
- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.ios-app-nature.push-and-background-notifications>
- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.ios-app-nature.app-crashes>
- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.ios-app-nature.offline-support>
- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.ios-app-nature.accessibility>
- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.ios-app-nature.ci-cd-and-the-build-train>
- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.ios-app-nature.third-party-libraries-and-sdks>

### App Complexity

- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.app-complexity.device-and-os-fragmentation>
- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.app-complexity.in-app-purchases>
- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.app-complexity.navigation-architecture>
- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.app-complexity.application-state-and-event-driven-changes>
- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.app-complexity.localization>
- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.app-complexity.modular-architecture-and-dependency-injection>
- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.app-complexity.automated-testing>
- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.app-complexity.manual-testing>

### Large iOS Teams

- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.large-ios-teams.planning-and-decision-making>
- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.large-ios-teams.architecting-to-avoid-collisions>
- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.large-ios-teams.shared-architecture-across-ios-apps>
- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.large-ios-teams.tooling-maturity-for-large-ios-teams>
- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.large-ios-teams.scaling-build-and-merge-times>
- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.large-ios-teams.mobile-platform-libraries-and-teams>

### Native vs Cross-platform

- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.cross-platform.cross-platform-feature-development>
- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.cross-platform.web-pwa-and-server-driven-apps>

### Native Development

- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.native-development.adopting-new-languages-and-frameworks>
- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.native-development.interop-and-shared-logic-boundaries>
- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.native-development.cross-platform-vs-native-decision-framework>

### Practice and Maturity

- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.practice-and-maturity.experimentation>
- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.practice-and-maturity.feature-flag-hell>
- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.practice-and-maturity.performance>
- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.practice-and-maturity.analytics-monitoring-and-alerting>
- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.practice-and-maturity.mobile-oncall>
- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.practice-and-maturity.advanced-code-quality-checks>
- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.practice-and-maturity.compliance-privacy-and-security>
- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.practice-and-maturity.client-side-data-migrations>
- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.practice-and-maturity.forced-upgrading>
- <doc:system-designs.google-maps-font-system.scaling-challenges.challenge.practice-and-maturity.app-size>

