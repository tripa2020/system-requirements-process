# Design principles

Reference, not a skill. The host skill (`SKILL.md`) has the main context read this at step 1.0; each agent reads it before judging a design or code.

One rule set for every judgement in the architecture loop: splitting, merging, writing function cards, and flagging red flags. The main context and the agents check against the same list.

## Core

Read `/Users/alex/Code_ws/active/_templates/Software_Architecture/Ousterhout.md` in full. It is the primary source. Its Design Procedure, card template (🟦 interface / 🟧 implementation) and red-flags checklist are used as written. Everything below only adds to it.

Where the steps use it:

| Ousterhout.md | Architecture loop step |
|---|---|
| Design Procedure 1 · Find the knowledge | 1.2: decisions, then modules that each hide one or more of them |
| Design Procedure 2 · Design it twice | 1.2: hardest boundary; 1.3: hardest interface |
| Design Procedure 3 · Interface comments first | 1.3: the card *is* the 🟦 block |
| Design Procedure 4 · Red flags | 1.4: depth-check checklist; Phase 2 review |
| Design Procedure 5 · Cross-module decisions | `arch.md` § History |

## Additions

One line each. Each names the step where it applies.

- **Decisions first** (Parnas 1972): list the design decisions likely to change before drawing any module. Each decision must be hidden *somewhere*, and a module may hide several. A decision earns its own module only when hiding it inside another module would make that module's interface harder to use; otherwise it becomes a component inside a module. → 1.2
- **Few deep modules:** 4–6 top-level modules is the target, and 8 is the cap. Over 8 is a red flag (Ousterhout §4.6, classitis), and 1.2 runs a merge pass before its gate. When two splits look the same to callers, the one with fewer interfaces wins. → 1.2, 1.4
- **Core vs shell** (Bernhardt): put decision logic in pure functions (typed values in, typed values out, testable without mocks) and keep the I/O around it thin. Apply it where it's cheap; don't contort a design to get it. → card field `part: core | shell`
- **Essential vs derived state** (Moseley & Marks, *Out of the Tar Pit*): store only state the requirements demand. Compute derived values instead of storing them. Every piece of state has one owner, a module or a component inside one. → 1.2 `Hides`, 1.4
- **Plain data at boundaries** (Martin): a type that crosses an edge is plain data shaped for the consumer, never a driver, framework, SDK or database type. → 1.3 signatures on edges

## Agent loops

Apply these when the system being designed is itself an LLM loop, and to the architecture loop's own agents.

- **Code owns control flow and state; the LLM proposes.** Deterministic code decides what runs next and holds the state, so a step is `(state, event) → state`.
  - \+ resumable, testable, failures show up in readable code, cost is bounded
  - − more code up front, and you hand-write branches the model might have handled. Worth it for unattended runs, overkill for one-off exploration.
- **Minimal, non-overlapping tools with compact returns.** Arguments are shaped so misuse is hard. Full output is written to disk and the tool returns a pointer to it.
  - \+ fewer wrong tool picks, smaller context, cheaper runs
  - − a narrow toolset can block a legitimate fix. Give an agent whatever capability its job could use, and fence what it may *write*, not what it may *do*.
- **Subagents.** A new subagent is Sonnet, unless the step says otherwise (the depth check runs on Opus). Its brief carries an objective, the output shape, its tools and boundaries, and the decisions it must not contradict. Decisions that depend on each other stay in one thread.

## Embedded (not yet)

Recorded for later; not applied until a project needs it.

- **HAL:** the application sees data, not hardware, and never bypasses the hardware abstraction layer.
- **Active objects:** each concurrent unit owns its data and an event queue, never blocks, and communicates only by events.
- **ISRs:** acknowledge, capture and signal only, with a bounded worst-case time. Variables shared with an ISR are reached only through accessor functions.
- **Timing contract:** a function on a real-time path declares its rate, worst-case execution time and priority on its card.
