# DocC Design System Checklists

@Metadata {
  @PageImage(purpose: icon, source: "docc-docc-design-system-checklists-icon", alt: "Icon")
  @PageImage(purpose: card, source: "docc-docc-design-system-checklists-card", alt: "Card")
}

@Image(source: "docc-docc-design-system-checklists-hero", alt: "Hero")

## Readiness Checklists

## Authoring Checklist

- Entry page describes purpose, audience, and scope.
- Place `@Metadata { ... }` directly after the title line.
- Use `@TechnologyRoot` for hub pages.
- Set a topic lane with `@PageColor(...)`.
- Add `@PageImage(purpose: icon|card, source: "...", alt: "...")`.
- Use `@Options { @TopicsVisualStyle(...) }` near the top when needed.
- Keep the summary paragraph text-only (no links or images).
- Prefer a hero or overview image immediately after the summary (`@Image(...)`).
- Topics section is short, ordered, and scannable.
- Group Topics by intent: Start here, Deep dives, Reference.
- Code examples use fenced blocks with language tags.
- Callouts are consistent: Note, Warning (with verify step), Important (risk + owner).
- Assets live in `resources/` with lower-case file names.

## Review Checklist

- Navigation is predictable and links resolve.
- Git hygiene: **no `git reset --hard`** on shared repos/lanes (you can silently discard work). Prefer:
  - `git revert <commit>` for bad commits (especially if pushed)
  - or a follow-up “fix” commit (e.g. move files back / restore fields)
  - use path-scoped restore (`git restore <path>`) instead of history rewrites
- Visuals are readable and consistent with DocC style.
- Hero and diagram SVGs render cleanly (gradients, strokes, and text remain legible).
- README pointers align with DocC entry points.
- Topics groups stay readable: 5 to 7 links per group.
- Tutorials have a `Tutorials.tutorial` root and references for each entry.
- Known DocC warnings are listed with fixes or a planned follow-up.
- Diagram assets have a rendered SVG version committed for DocC.

## Publish Checklist

- Preview commands are documented and reproducible.
- Custom renderer or CSS overrides are called out.
- Known warnings are listed with a follow-up plan.
- If preview fails due to file limits, raise `ulimit -n` for the preview shell.
- Verify the root URL is `/documentation/<bundle>/` (avoid `/documentation/documentation`).
- Destructive actions happen last: move files first, build the new product, test it, add tests when
  possible, then remove legacy files.

## Auto Mode Safe Space Protocol (S0)

Use Git worktrees + explicit guardrails to create a safe, parallel workspace where agents can work autonomously without colliding with each other (or with `main`).

### Guardrails (required)

Before any autonomous work begins, make the boundaries explicit:

- **Scope:** what this agent/task may touch (repo(s), services, envs).
- **Blast radius cap:** canary %, region scope, rate limits.
- **Kill switch:** who can stop auto mode globally and how to stop a single agent/task.
- **Hard prohibitions:** actions auto mode must not take without explicit authorization.
- **Reversibility:** every action must have an explicit rollback.

### Naming (required)

- Worktree dir: `../wt-INC<id>-<short>`
- Branch: `inc/INC<id>/<short>-<owner>`

Example:

- `../wt-INC1471-mitigate-queue`
- `inc/INC1471/mitigate-queue-rismay`

### Create the parallel world (recommended)

Create the worktree and its branch in one step:

```bash
git worktree add ../wt-INC1471-mitigate-queue -b inc/INC1471/mitigate-queue-rismay
cd ../wt-INC1471-mitigate-queue
```

### Operating rules

- 1 branch ↔ 1 worktree during the incident (don’t reuse a branch across worktrees).
- Don’t do incident work directly on `main` (unless explicitly approved by the IC).
- Commit small and early; push early so another responder can take over if needed.
- One PR per task/worktree. If scope changes, spawn a new worktree.

### Autonomy rules

- Agents can propose changes freely (commits/PRs) within the declared scope.
- Agents can run local checks (lint/tests) and prepare rollbacks.
- Agents should only *execute* changes that fall into pre-approved action classes for auto mode.

### Discord execution lanes (current)

When using Discord lanes for autonomous work, standardize names so automation can safely follow renames:

- Workspace channel: `🏎️<badge>-auto-<slug>`
- Aggregator channel: `🏎️🟡-auto-control`

Badges:

- 🟡 pending
- 🔵 working
- 🟢 complete
- 🔴 blocked

### “Parallel world” comms (post on task claim)

Every autonomous task claim should include:

- **Worktree:** name/path
- **Branch:** full branch name
- **Goal:** 1 sentence
- **Expected impact:** 1 sentence
- **Signals watched:** which probes/SLOs determine success/failure
- **Rollback:** 1 sentence

### Audit trail (required)

- Prefer commits + PR links over copy/pasted diffs.
- Keep a short incident/autonomy timeline with key decisions + links.

### Build breakage quick-fix protocol (required; timeboxed)

If a turn encounters a build/install failure that prevents normal work, attempt **quick fixes first**,
then escalate and pause automation.

**Timebox:** 5–10 minutes maximum. If not resolved by then, treat as an SRE incident.

Quick fixes (try in order):

1) Re-run with a clean-ish state
   - `swift package resolve`
   - re-run the failing command (capture full stderr)
2) Clear local build artifacts
   - delete the affected package’s `.build/`
3) Resolve SwiftPM identity/duplicate-target collisions
   - ensure the same dependency isn’t being pulled via both local + remote identities
4) Reinstall critical tools
   - `swift-installer cli --package-path <clia-agent-cli> --product clia --configuration release`
5) Resources warnings → build errors
   - ensure resources are explicitly declared in `Package.swift` (or excluded) for the failing target

If quick fixes fail:

- Set `turnOperationMode` → `paused` in `<repoRoot>/.clia/workspace.clia.json`
- Post `status: blocked` in the workspace auto channel
- Create an SRE incident thread in `#🛡️📦🟢-sre-incidents` with:
  - failing command
  - error snippet
  - scope (which org/workspace)
  - last known good / suspected change
  - rollback suggestion
- Notify the operator (via `.clia/profiles/operators/...`) with a link to the thread

### Cleanup

After merge (or when abandoning a task):

```bash
cd <main-repo>
git worktree remove ../wt-INC1471-mitigate-queue
```
