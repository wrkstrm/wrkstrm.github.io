# CLIA × τau 2025

@Metadata {
  @PageKind(article)
  @PageColor(purple)
  @TitleHeading("Timeline")
  @PageImage(purpose: icon, source: "system-designs-icon", alt: "Wrkstrm")
  @PageImage(purpose: card, source: "system-designs-card", alt: "Wrkstrm")
}

A curated timeline of key moments in the evolution of **CLIA** (the agent + tooling system) and **TAU** (the app surface area + runtime patterns) across 2025.

<callout icon="clock" color="purple">
Selected highlights only.

Dates are anchored to mono git history; descriptions are editorial summaries of why each moment mattered.
</callout>

## April

- **2025-04-12 — MacTrader compiles (early macTau lineage)**
  Establishes the earliest macOS lineage that later converges into macTau.
  
  Commit: <https://github.com/wrkstrm/mono/commit/48e099614>

## July — CLIA becomes navigable

- **2025-07-21 — `clia.xcscheme` created**
  First-class Xcode entrypoint for CLIA work.
  
  Commit: <https://github.com/wrkstrm/mono/commit/71e96c0a6>

- **2025-07-22 — CLIA metadata identifiers move to UUIDs**
  A step toward stable, tool-friendly identity across triads and artifacts.
  
  Commit: <https://github.com/wrkstrm/mono/commit/3f0f13162>

- **2025-07-25 → 2025-07-27 — CLIA artifacts reorganized + project-specific CLIA directories**
  Establishes a repeatable pattern for scoping CLIA artifacts per project, without losing global coherence.
  
  Commits:
  - <https://github.com/wrkstrm/mono/commit/10cb8d313>
  - <https://github.com/wrkstrm/mono/commit/7c977bff0>
  - <https://github.com/wrkstrm/mono/commit/90bc9b7ae>

## August — Trader becomes TAU; CLIA triads normalize

- **2025-08-23 → 2025-08-24 — Trader → TAU rename (targets/schemes/project)**
  TAU’s identity becomes explicit across project surfaces.
  
  Commits:
  - <https://github.com/wrkstrm/mono/commit/80de2ba30>
  - <https://github.com/wrkstrm/mono/commit/306823ba9>

- **2025-08-30 — CLIA triad normalization sprint**
  Hardens the triad conventions so agents and tooling can rely on consistent structure.
  
  Commits:
  - <https://github.com/wrkstrm/mono/commit/feb4048ec>
  - <https://github.com/wrkstrm/mono/commit/ae85a0c14>
  - <https://github.com/wrkstrm/mono/commit/2c03bbd37>

## September — CLIA × TAU integration accelerates

- **2025-09-01 — TAU identity + structure lock in**
  TAU’s naming and location settle, enabling stable iteration.
  
  Commits:
  - <https://github.com/wrkstrm/mono/commit/4186f47bd>
  - <https://github.com/wrkstrm/mono/commit/794043053>

- **2025-09-01 → 2025-09-03 — Daemons, polling, and omnibroker docs emerge**
  The runtime story solidifies: background work, polling patterns, and broker abstraction.
  
  Commits:
  - <https://github.com/wrkstrm/mono/commit/677eca5d9>
  - <https://github.com/wrkstrm/mono/commit/d2d571f40>
  - <https://github.com/wrkstrm/mono/commit/1a395b535>

- **2025-09-19 — CLIA output updated to OpenAI schema**
  Bridges CLIA’s structured output into modern model APIs.
  
  Commit: <https://github.com/wrkstrm/mono/commit/af76f419c>

- **2025-09-22 — TAU menu bar app + metrics surface via CLIA CLI**
  CLIA begins to “see” TAU operationally.
  
  Commit: <https://github.com/wrkstrm/mono/commit/640d306ce>

## October — `.clia` migration + universal cores

- **2025-10-01 — CLIA operator docs + incident modules; WhisperExit removed**
  Re-centers ops around consistent CLIA operator surfaces.
  
  Commits:
  - <https://github.com/wrkstrm/mono/commit/ebbc3ee85>
  - <https://github.com/wrkstrm/mono/commit/cab59e6e9>

- **2025-10-06 — Migrate `.wrkstrm/clia` → `.clia` root**
  A project-wide consolidation: one canonical root for CLIA artifacts.
  
  Commits:
  - <https://github.com/wrkstrm/mono/commit/6129d667e>
  - <https://github.com/wrkstrm/mono/commit/3e2947153>
  - <https://github.com/wrkstrm/mono/commit/78277366d>

- **2025-10-07 — Move clia-agent-core + incident-core to “universal”**
  Makes the core building blocks reusable across repos and environments.
  
  Commit: <https://github.com/wrkstrm/mono/commit/4036aea40>

## December — CLIA tooling & docs stabilize

- **2025-12-21 → 2025-12-22 — Generated CLIA agent docs + TAU expertise docs**
  Institutional memory becomes browsable.
  
  Commits:
  - <https://github.com/wrkstrm/mono/commit/e8306b32b>
  - <https://github.com/wrkstrm/mono/commit/632aca302>
  - <https://github.com/wrkstrm/mono/commit/c3cdf6b0c>

- **2025-12-28 — CLIA Tools roadmap docs + diagrams**
  A clean “where this goes next” story for CLIA tooling.
  
  Commits:
  - <https://github.com/wrkstrm/mono/commit/3dc06d8f6>
  - <https://github.com/wrkstrm/mono/commit/f1fb8c37c>

- **2025-12-29 — CLIA rituals + macOS test target improvements**
  Tightens repeatable practices and improves platform validation.
  
  Commit: <https://github.com/wrkstrm/mono/commit/616e96551>
