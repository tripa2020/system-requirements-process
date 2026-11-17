---
name: arch_loop
description: Take a project's refined requirements to modules and typed pseudo-function cards with the owner, then build each module with a fresh agent on its own branch. Owner answers in the chat.
argument-hint: <project path> [requirements file]
disable-model-invocation: true
---

# Architecture loop

You are the host: the main context that runs Phase 1 with the owner and launches every agent in Phase 2.

The spec is `/Users/alex/Code_ws/active/_templates/Software_Architecture/ARCH_LOOP.md`. Read it first, in full, every time. It defines the phases, steps, types, agents and rules. This file only says how to start and where to resume.

At step 1.0, also read `/Users/alex/Code_ws/active/_templates/Software_Architecture/PRINCIPLES.md` and the `Ousterhout.md` it points to, in full. Keep them in mind for every step that follows.

## Arguments

`$ARGUMENTS` is `<project path> [requirements file]`.
- `<project path>` is the project's root folder.
- `[requirements file]` defaults to the refine loop's output for this project, or `system_reqs/REQUIREMENTS.md` if that exists. If neither is found, ask the owner.

## Where the run lives

Inside the project, never in the templates folder:

```
<project path>/architecture/
    arch.md              copied from ARCH_TEMPLATE.md (beside this file) at 1.1
    blocks.drawio        rendered from arch.md § Modules + § Edges
    build/<module>/      one folder per module
        cards.md         function cards, from CARDS_TEMPLATE.md at 1.3; the owner edits them directly
        brief.md         brief at the top (1.6); each round's report and review appended below (Phase 2)
```

Build worktrees live beside the project, not inside it: `<project path>-arch/<module>/` on branch `arch/<module>`.

## Resume from state

Read the gate line at the top of `arch.md` and its § Build status, then enter at the first row that matches:

| State | Enter |
|---|---|
| no `architecture/arch.md` | 1.0, then 1.1 |
| `intake ok: —` | 1.1 |
| `modules ok: —` | 1.2 |
| `modules ok:` set, a module with no `build/<module>/cards.md` or with `(draft)` cards | 1.3 |
| § Depth check empty | 1.4 |
| § Sequences empty | 1.5 |
| `build: —` | 1.6 |
| a module `building` or `review` | Phase 2, resume that module's worktree |
| a module `owner` | Phase 2, owner gate for that module |
| next module `pending` | Phase 2, next module |
| all `merged`, no integration report | Phase 2, integration |

## Rules

1. Write `arch.md` only from the step that owns the section, or after the owner approves a change.
2. Re-read a `cards.md` before changing it. The owner edits those files directly; never overwrite the owner's text.
3. Every agent reads files, never this conversation. Launch it with `subagent_type` set to its name (`arch-depth-check`, `arch-builder`, `arch-reviewer`, `arch-integration`); the prompt carries only the paths its Inputs section asks for.
4. Nothing merges to the project's main branch without the owner's word in the chat.
