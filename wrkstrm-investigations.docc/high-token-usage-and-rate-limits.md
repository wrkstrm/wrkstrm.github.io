# High token usage & rate-limit pressure

@Metadata {
  @PageKind(article)
  @PageColor(blue)
  @TitleHeading("High token usage")
  @Available(platform: macOS, introduced: "1.0")
}

This investigation is about **overall token usage** and why it tends to run high in agentic workflows.

The goal is attribution: *which* behavior is driving usage, and *how to measure it* so we can reduce it safely.

---

## What “high usage” usually is

In practice, “high usage” is typically one (or more) of:

- **Token throughput** (input + output tokens)
- **Request rate** (requests/min)
- **Tool-call fanout** (one human turn causes many tool calls)
- **Retry storms** (429/5xx leading to retries, multiplying traffic)
- **Background automation** (cron/heartbeat/sub-agents doing work off-cycle)

Even if we’re currently watching *overall tokens*, rate limits tend to fail on **spikes**, not daily totals.

---

## Common root causes

### Hidden loops
- Heartbeat handlers that do too much each poll
- Cron jobs that trigger follow-on work repeatedly
- “Fix-up” steps that re-run because success detection is weak

**Signal:** repeated near-identical prompts/tool calls in logs.

### Tool-call fanout from one turn
- Multiple searches/snapshots/acts in a single turn
- Broad file scans across large trees
- Multiple sub-agent spawns

**Signal:** one conversation turn with many tool invocations and long tool chains.

### Over-large context windows
- Too much history attached to each completion
- Re-sending large blobs (logs/diffs/docs) repeatedly

**Signal:** high *input* tokens even when user messages are short.

### Retry / backoff misconfiguration
- 429 handling retries too aggressively
- Many concurrent tasks retrying together (thundering herd)

**Signal:** bursts of identical requests and visible 429s.

### Background tasks running too often
- “Nice-to-have” audits/checks scheduled too frequently

**Signal:** usage grows when humans are idle.

---

## Minimum viable metrics (to attribute spikes)

Track these per **turn** and per **tool call**:

- **tokens_in**, **tokens_out**, **tokens_total**
- **requests_total** (LLM calls)
- **tool_calls_total**
- **turn_duration_ms**
- **rate_limit_count (429)**
- **retry_count** and **retry_wait_ms_total**

Dimensions/tags:
- **sessionKey / conversation label**
- **channel/provider**
- **job_id** (cron) and/or **heartbeat: true/false**
- **agentId / model**
- **tool_name**

If we only pick one “north star” metric to start:

- **tokens_total per 5 minutes (p95 + max)**

---

## Two views that make debugging fast

1) **Top sessions by tokens (last 1h / 24h)**
- sessionKey → tokens_total, tool_calls_total, 429s

2) **Top cron/heartbeat sources (last 24h)**
- job_id/heartbeat → tokens_total, requests_total, 429s

---

## Logging format (JSONL)

Store one JSON object per event in a local log (easy to `jq`, easy to ship later).

```json
{
  "ts": "2026-02-16T21:35:12.123Z",
  "kind": "turn_summary",
  "sessionKey": "...",
  "channel": "discord",
  "model": "openai-codex/gpt-5.2",
  "tokens_in": 1820,
  "tokens_out": 420,
  "tool_calls": 6,
  "rate_limits": 0,
  "retry_count": 0,
  "duration_ms": 8421,
  "tags": {
    "heartbeat": false,
    "cron_job_id": null,
    "agentId": "..."
  }
}
```

---

## Next step

Implement the JSONL log + a small “spike detector” that rolls a 5-minute window and prints:
- total tokens in window
- top sessions
- top job sources
- top tools

Once we have that, we can identify the biggest lever (loops vs fanout vs context vs retries) and prioritize the fix.
