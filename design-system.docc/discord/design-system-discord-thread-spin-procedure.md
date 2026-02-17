# Thread Spin Procedure (Operator Channels)

@Metadata {
  @PageKind(article)
  @PageColor(purple)
}

Thread spin is how operator-posture channels (🧬) stay scannable while running many parallel lines of work.

The procedure below is designed to be fast, consistent, and automation-friendly.

## 1) When to spin a thread

Spin a new thread when any of these change:

- **Intent** (goal changes)
- **Scope** (different system/repo/org)
- **Risk posture** (safe → risky)
- **Owner** (handoff to different operator)
- **Timeline** (now vs later)

Rule of thumb: **one thread = one intent**.

## 2) Name the thread (required)

Use the canonical operator thread name schema:

`🧵-<priority>-<status>-<id-emoji-1><id-emoji-2>-<slug>`

Where:

- `<priority>`: scanning/sorting prefix (examples: `p1.7`, `p2`)
- `<status>`: current state badge (team-defined emoji set)
- `<id-emoji-1><id-emoji-2>`: stable topic identifier (2 emojis)
- `<slug>`: lowercase kebab-case summary

Examples:

- `🧵-p1.7-🔵-👮‍♂️🥙-kebab-police`
- `🧵-p2-🔵-💸🌐-buy-clia-com`

## 3) Post the opener (required)

The opener must include:

### A) Framing header

Use a compact header that makes triage easy:

- **WHO:** (operator / stakeholder)
- **ORG:** (todo3 / wrkstrm / clia-org / etc.)
- **LANE:** (operator / product / infra / marketing)
- **SCOPE:** (what system)

### B) One-line goal

- `GOAL: <one sentence>`

### C) Definition of done

- `DONE WHEN: <observable outcome>`

### D) Working set

- `CONTEXT:` 3–7 bullets max
- `OPEN QUESTIONS:` 0–5 bullets
- `NEXT:` 1–3 bullets (smallest reversible steps)

## 4) During the thread

- Use explicit durable markers:
  - `DECISION:` for durable decisions
  - `TODO:` for actionable follow-ups
  - `BLOCKED:` for blockers (include what would unblock)
- Keep messages short; prefer checklists and diffs over essays.

## 5) Handoff procedure

When handing off to another operator (or future-you), post a **handoff block**:

- `STATE:` where things stand now
- `ARTIFACTS:` links (PRs, docs, threads)
- `RISKS:` what could go wrong
- `NEXT:` the next 1–3 steps
- `OWNER:` who has the ball

## 6) Closing the loop

When done:

- Post a final summary:
  - `OUTCOME:`
  - `DECISION:` (if any)
  - `FOLLOW-UPS:` (if any)
- Update thread status emoji if you use a closed/green convention.
- Promote durable knowledge:
  - stable rule/pattern → `memory.docc/expertise/`
  - dated outcome → `memory.docc/journal/`

## Notes

- Thread naming is part of the automation surface. Keep it stable.
- Prefer spinning more threads over bloating one thread; scanning wins.
