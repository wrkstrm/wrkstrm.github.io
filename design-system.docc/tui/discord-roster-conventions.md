# Discord roster conventions (org callsigns + type-first channels)

- when: 2026-02-08

We standardized Discord information architecture for the CLIA-style roster.

## Decision

- Do **not** split “operators” vs “agents” into separate Discord categories.
  - Treat “operator” as a **posture** (guardrails / safety defaults), not a separate class.
- Make the sidebar scannable by using **type-first naming**.

## Conventions

### Org categories

- Format: `🌐-<org>-<callsign>`

Example callsigns:

- `🌐-wrkstrm-⚙️`
- `🌐-todo3-📦`
- `🌐-text-allora-🗣️`
- `🌐-wrkstrm-finance-💹`
- `🌐-laussat-studio-🎨`

### Chat channels

- Format: `<type>-<slug>-<emoji>`

Where:

- `<type>`:
  - `💠` = agent persona chat
  - `🧬` = operator-posture chat
- `<emoji>` is the persona emoji.

Examples:

- `💠-crush-🐍`
- `🧬-rismay-🧬`

### Automation topics

- Keep `$sync ^<channel-name>` aligned to the current channel name after renames.

## Rationale

- Reduces churn: org categories stay stable as the roster grows.
- Clear semantics: posture is expressed in triads + channel naming, not taxonomy.
- Better scan/grep: type-first makes it easy to find “all operator chats” or “all agents”.
