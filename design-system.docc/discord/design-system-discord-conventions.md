# Discord Conventions (Org + Agent Channels)

@Metadata {
  @PageImage(purpose: icon, source: "docc-docc-design-system-icon", alt: "DocC design-system icon")
  @PageKind(article)
  @PageColor(purple)
}

This page documents the current Discord information architecture conventions used to keep large, multi-org agent rosters scannable.

## Design decision: Operators are Agents (no separate category)

We experimented with splitting “operators” and “agents” into separate Discord categories.

We reverted that.

**Rationale**

- An “operator” is an **operating posture** (guardrails + safety defaults), not a different kind of entity.
- Discord navigation should remain stable as the roster grows; splitting by posture creates churn.
- Posture is better represented in:
  - channel naming (type prefix), and
  - triad Agency (constraints / S-Type), not sidebar taxonomy.

## Category naming (org-first, type prefix)

Org categories are prefixed by a shared org-type emoji, and suffixed with a per-org callsign:

- Format: `🌐-<org>-<callsign>`

Example org callsigns:

- `🌐-wrkstrm-⚙️`
- `🌐-todo3-📦`
- `🌐-text-allora-🗣️`
- `🌐-wrkstrm-finance-💹`
- `🌐-laussat-studio-🎨`

## Channel naming (type first, emoji last)

Agent/operator chat channels are named with type first and the persona emoji last:

- Format: `<type>-<slug>-<emoji>`

Where:

- `<type>` is currently:
  - `💠` for agent persona chats
  - `🧬` for operator-posture chats
- `<slug>` is the stable identifier (lowercase, kebab-case; keep it short)
- `<emoji>` is the persona emoji (single emoji)

Examples:

- `💠-crush-🐍`
- `💠-tau-🪐`
- `🧬-rismay-🧬`
- `🧬-uptobat-👻`

## Operator thread protocol (🧬)

Operator-posture channels (🧬) can accumulate many parallel lines of thought. Use Discord threads to keep work
scannable without fragmenting into new channels.

Minimal protocol:

- **One thread = one intent.** If the intent changes, spin a new thread.
- **Thread opener** must include a short framing header (who/with/org/lane/scope) + a one-line goal.
- Capture outcomes explicitly:
  - `DECISION:` for durable decisions.
  - `TODO:` for actionable follow-ups.

### Thread naming (operator spec)

Use a deterministic name that encodes priority, status, tags, and a short slug:

- Format: `🧵-pM.m-<statusEmoji>-<tagEmojis>-<short-slug>`

Examples:

- `🧵-p0.1-⛔️-🔐🔗-fix-ssh-auth`
- `🧵-p0.2-🔵-🧯🌐-wrkstrm-app-missing-content`

Canonical metadata is stored in repo thread artifacts under `threads/<slug>/*.thread.clia.json` (including
`priority`, `statusEmoji`, and `tagEmojis`).

### Thread lifecycle (Discord-native)

We use Discord’s own lifecycle terms as semantics:

- **Active**: objective is still in progress.
- **Archived**: objective is finished (main mission complete).
- **Locked**: objective is finished *and* all related subthreads are finished.

Operational notes:

- Archiving/locking is a UI hygiene move; the repo thread artifact remains the system of record.
- If a thread is archived/locked but new work is discovered, create a continuation thread and link it from the
  thread events stream.

Promotion path (turn threads into durable knowledge):

- Stable rule/pattern → promote to `memory.docc/expertise/`.
- Dated outcome/postmortem → promote to `memory.docc/journal/`.
- Sketch/hypothesis → keep in `memory.docc/ideas/`.
- Committed work item → `.clia/BACKLOG.md`.

## Message formatting

- See <doc:design-system-discord-message-formatting>.

## Notes

- Channel topics may contain automation hints (e.g. `$sync ^channel-name ...`). Keep these in sync if the channel is renamed.
- Avoid embedding “lane” semantics into Discord categories; use naming + triads.
