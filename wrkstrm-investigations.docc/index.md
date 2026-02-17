# Wrkstrm Investigations

@Metadata {
  @PageKind(article)
  @PageColor(blue)
  @TechnologyRoot
  @TitleHeading("Investigations")
  @Available(platform: macOS, introduced: "1.0")
}

A public, write-once log of operational / systems investigations.

This is where we document:
- what was observed
- the most likely causes
- what we measured
- how we’ll prevent regressions

## Operational note (DocC deploy timing)

DocC deploys are usually complete within ~1–2 minutes.

For now, treat the **worst recorded time** in the deploy-duration investigation as the “wait-until” threshold before calling a deploy stuck.

When a deploy is slow, broken, or a site returns 404:
- Record the failing run id + the key error line(s)
- Record the observed time-to-green
- Add an investigation entry so we can fix the root cause and tighten the p90

## Topics

- <doc:investigation-2026-02-17-docc-deploy-duration>
- <doc:high-token-usage-and-rate-limits>
