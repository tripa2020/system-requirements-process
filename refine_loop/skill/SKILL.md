---
name: refine_loop
description: Take a bounded task from motive to go in three question cycles and one research stage, then do the task. Owner answers in the chat.
argument-hint: <Project> <task>
disable-model-invocation: true
---

# Refine loop

The spec is `/Users/alex/Code_ws/active/_templates/refine_loop/REFINE_LOOP.md`. Read it first, whole, every time. It defines the cycles, the question types, the agents, the prompts, the documents and the rules. This file only says how to start and where to resume.

**Read nothing else.** Not `REQUIREMENTS_LOOP.md`, not `SYSTEM_DESIGN_LOOP.md`, not any other template or run. The spec is complete on its own.

## Arguments
`$ARGUMENTS` is `<Project> <task>`. `<Project>` is the first word and goes in the document header. `<task>` is the rest. `<task-slug>` is the task lowercased with spaces as hyphens.

## Where the run lives
Always here, whatever directory the command was run from:

```
/Users/alex/Code_ws/active/refine_loop_runs/<task-slug>/
    refine_process.md
    history.md
    changelog.md
```

Create the folder on the first run. Never create it anywhere else. The task's own outputs go where the task says.

## Resume from state
Read the three gate lines at the top of `refine_process.md`, and `history.md`, then enter here:

| State | Enter |
|---|---|
| no `refine_process.md` | Cycle 1, round 1 |
| `Motive approved: —` | Cycle 1, next round |
| `List good enough: —` | Cycle 2, next round |
| `List good enough:` set, no `## Stage 3` in `history.md` | Stage 3, then Cycle 3 |
| `Go on: —` | Cycle 3, next round |
| `Go on:` set | Work; confirm open Assumptions first |

## Running
- Run the cycle's numbered steps from the spec in order. Launch agents with the Agent tool using the prompt in the spec, filling the placeholders; run independent agents in one message.
- Show the round in the chat and stop for the owner's answers. When they arrive: Record, Morph, then ask for the gate line if he has not given it. On the gate line, write it with today's date and continue into the next cycle in the same session.
- Never ask a fact an agent can read. Never edit a section another cycle owns. Never delete a line.
- In Work, every unattended stretch ends with the report, in the chat and in `history.md`.
