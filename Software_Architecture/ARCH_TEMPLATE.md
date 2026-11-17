# Architecture — <project>          <YYYY-MM-DD> · <owner>

intake ok: —     modules ok: —     build: —

<!--
The project's one source of truth for the architecture loop (ARCH_LOOP.md).
Copy this file to <project>/architecture/arch.md at step 1.1.
Each section is written by the step in its heading. Views and briefs are rendered from it; don't edit those by hand.
A line not yet confirmed by the owner ends with (draft).
No types above the cards files. Requirements, decisions and modules are words.
-->

## Requirements                                                   (1.1)

Imported from the refine loop. No new requirements are written here, and no priority is set here.

| R-id | Requirement | shall / should / will | structural / local |
|---|---|---|---|
| R1 | <line> | shall | structural |

## Decisions                                                      (1.2)

Design decisions likely to change, listed before any module is drawn.

- **D1** <decision> (draft)

## Modules                                                        (1.2)

Target 4–6 modules, cap 8. A module hides one or more decisions; each lives in a named component.

### <module name>   · R1 R4
- **Provides:** <the abstraction in 1–2 sentences, as a caller sees it>
- **Hides:** <the design decisions and state this module owns>
- **Components:** <name> (D1) · <name> (D3)
- **Limits:** <threading, timing, size, ownership>
- **Not merged with <module>:** <cost to callers> · would flip if <fact>   (only for a pair that shares an edge and a Ch 9 indicator says yes)
- **Design it twice:** <the alternative split considered, and why this one won; identical caller view → fewer interfaces wins> (hardest boundary only)

## Edges                                                          (1.2)

- <from> → <to> · <what crosses, in words; typed in § Functions>

## Functions                                                      (1.3)

Index only. Each module's cards live in `build/<module>/cards.md` (from CARDS_TEMPLATE.md), where the owner edits them.

| Module | Cards file | Cards |
|---|---|---|
| <module> | build/<module>/cards.md | <function>, <function> |

## Sequences                                                      (1.5)

Built only from cards above. A step that names no card, or whose types don't match, sends the loop back to 1.3 or 1.2.

### startup
1. <module.function> → <module.function>

### main cycle
1. …

### fault
1. …

## Depth check                                                    (1.4)

| # | Red flag | Where | Finding | Owner | Applied |
|---|---|---|---|---|---|
| 1 | <flag> | <module / card> | <one line> | accept / reject | <date> |

## History                                                        (1.3 onward)

Cross-module decisions (Ousterhout Ch 13): protocols, id formats, shared flags, status codes. Each is recorded once, here.

- <date> · <decision> · why: <reason> · modules: <names>

## Direction                                                      (1.6)

The owner's words, verbatim. Briefs are cut from this section.

> <build order ok? · scope per module (whole, or functions first) · what "done" means per module>

Build order (from § Edges, leaves first): <module>, <module>, …

## Constraints                                                    (1.6)

Checks every module build must pass. Copied into each brief; the builder can't edit them. The floor guard (no weakened tests after a red run, no new suppressions, stubs or empty catches) applies always and isn't repeated here.

- Test: `<command>`
- Lint / types: `<command>`
- Budgets: <cost cap, memory, timing — only what this project needs>

## Build status                                                   (1.6, Phase 2)

| Module | Scope | Branch | State | Date |
|---|---|---|---|---|
| <module> | whole \| <functions> | arch/<module> | pending \| building \| review \| owner \| merged | — |
