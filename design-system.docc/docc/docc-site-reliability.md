# Site reliability (DocC)

Operational conventions for monitoring DocC sites.

This is intentionally **not** part of any publish workflow.
Publishing builds bytes; reliability monitoring verifies the live site stays healthy.

## Smoke testing deployments (don’t trust the HTML)

A DocC page can return **HTTP 200** and still render white (JS bundle not loading, wrong base path,
wrong mount root, missing `data/` tree, etc.). For monitoring, prefer checking DocC’s **JSON
payloads**.

### Canonical JSON probe

For a bundle named `index`, the following should return **200** and valid JSON:

- `GET /data/documentation/index.json`

Example:

```bash
curl -fsSL "https://<host>/data/documentation/index.json" \
  | jq -e '.primaryContentSections | length > 0'
```

### What to assert (minimal)

Keep assertions loose so we don’t break monitoring on minor DocC schema changes.

- Status code is 200
- Response is `application/json`
- JSON parses
- JSON contains one of:
  - `.primaryContentSections` (article JSON)
  - `.identifier` / `.metadata` (varies by DocC version)

## Incident threads (site reliability)

Every org with public Pages should have a dedicated **incident thread** whose name encodes current
health.

### Status badges

Use exactly one of three badges (based on the *last run status*):

- 🟢 (healthy)
- 🟡 (degraded)
- 🔴 (down)

### Thread naming convention (double emoji)

Thread name template:

- `{thread-type-emoji}{status-emoji} incidents: site-reliability-{agent-emoji}`

Where:
- `thread-type-emoji` = `🛡️` (SRE/guardrails)
- `status-emoji` = 🟢 | 🟡 | 🔴 (last run status)

Examples:
- `🛡️🟢 incidents: site-reliability-🧩`
- `🛡️🟡 incidents: site-reliability-🧩`
- `🛡️🔴 incidents: site-reliability-🧩`

### Posting rules (state-change only)

Monitors should track the last known status and:

- 🟢 → 🟡: post once with a short degradation summary
- 🟡 → 🟢: post once with a recovery summary
- any → 🔴: post once with a failure summary (include failing probes)
- same → same: **no post** (avoid hourly spam)

### Status definitions (recommended)

- 🟢: all JSON probes succeed (200 + JSON parses + minimal assertions)
- 🟡: some probes fail but primary index probe succeeds
- 🔴: primary index probe fails (or multiple probes fail)
