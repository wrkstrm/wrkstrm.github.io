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
- `🧬-uptobat-r-👻`

## Notes

- Channel topics may contain automation hints (e.g. `$sync ^channel-name ...`). Keep these in sync if the channel is renamed.
- Avoid embedding “lane” semantics into Discord categories; use naming + triads.
