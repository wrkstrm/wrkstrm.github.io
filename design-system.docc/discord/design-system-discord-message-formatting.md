# Discord Message Formatting (safe subset)

@Metadata {
  @PageKind(article)
  @PageColor(purple)
}

This page documents the **safe** Discord message formatting subset we rely on for operator and agent work.

Goal: messages should render predictably, stay readable on mobile, and be resilient to tool limitations.

## Supported formatting (reliable)

- **Bold:** `**bold**`
- *Italic:* `*italic*`
- __Underline__: `__underline__`
- ~~Strike~~: `~~strike~~`
- Inline code: `` `code` ``
- Code blocks:

  ```
  ```ts
  const x = 1
  ```
  ```

- Block quotes:
  - `> quote`
  - `>>> multi-line quote`
- Lists:
  - bullets: `- item`
  - numbered: `1. item`

## Links

- Plain URLs auto-link reliably.
- Avoid depending on rich embeds for critical information.

## Message size + chunking

- Discord hard limit is **2000 characters** per message.
- Prefer multiple short messages over one long message.
- Put any structured payload into a **fenced code block**.

## Templates

### Thread opener (operator)

```
by: <operator>
with: <participants>
org: <org>
lane: operator 🧬

goal: <one sentence>

links:
- <url>

TODO:
- [ ] <action>

DECISION:
- <if any>
```

### Status card

```
status: <backlog|in-progress|blocked|done>
blockers:
- <blocker>
next:
- <next action>
```

## Tooling constraints (current)

- Inline buttons are not enabled for Discord in this deployment.
- Treat “embeds” as a nice-to-have; the canonical content should be plain text + markdown.
