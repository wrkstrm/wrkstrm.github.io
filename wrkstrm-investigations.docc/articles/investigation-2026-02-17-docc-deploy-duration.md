# Investigation — DocC deploy duration (GitHub Pages)

Question: **How long does a DocC deploy usually take?**

This measures GitHub Actions run durations for the `Publish DocC` workflow on each `*.github.io` repo.

## What to do with this

- If a deploy is still running, don’t panic until **after the current worst recorded duration** (see below).
- If the site is still failing after that threshold, record the failure (run id + error line) and open an investigation entry.

## Summary (recent runs)

Overall (all repos combined):
- samples: **143**
- average: **75s**
- median: **68s**
- p90: **77s**

Worst recorded (in this sample):
- **177s** (≈ 3 minutes)

Per repo (seconds):
- `wrkstrm/wrkstrm.github.io`: n=25, avg **98s**, median **69s**, p90 **83s**
- `clia-org/clia-org.github.io`: n=25, avg **68s**, median **67s**, p90 **76s**
- `codeswiftly/codeswiftly.github.io`: n=23, avg **69s**, median **72s**, p90 **83s**
- `laussat-studio/laussat-studio.github.io`: n=25, avg **69s**, median **67s**, p90 **78s**
- `swift-universal/swift-universal.github.io`: n=13, avg **69s**, median **66s**, p90 **77s**
- `rismay/rismay.github.io`: n=25, avg **70s**, median **68s**, p90 **77s**
- `wrkstrm-finance/wrkstrm-finance.github.io`: n=7, avg **83s**, median **74s**

## Method

Data source: GitHub CLI (`gh`) run list timestamps (`createdAt` → `updatedAt`) on the default branch.

Command (example; per repo):

```bash
gh run list \
  --repo <owner>/<repo> \
  --workflow "Publish DocC" \
  --branch main \
  --limit 25 \
  --json databaseId,conclusion,createdAt,updatedAt,displayTitle
```

Duration is computed as:

- `updatedAt - createdAt`

Notes:
- This measures **workflow wall time**, not the time for the deployed pages to propagate to end-users.
- A few long runs can skew the mean; median + p90 are better for expectation-setting.
