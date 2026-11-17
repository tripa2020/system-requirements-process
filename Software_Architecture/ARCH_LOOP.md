# Architecture Loop — Template (outline)

Nov 13, 2026 · @Alex · spec. Entry point: `SKILL.md` (`/arch_loop`).

One thing: take a refined set of requirements to modules, then to typed pseudo-functions, in one context with the owner. Then build each module with a fresh agent.

```
REFINE LOOP output ──► PHASE 1 · DESIGN  (main context + owner, one thread)
(R-ids, Motive, Goal)    1.0 load skill → 1.1 intake → 1.2 modules → 1.3 functions
                         → 1.4 depth check (agent) → 1.5 sequences → 1.6 direction
                                        │
                                        ▼  build/<module>/brief.md
                       PHASE 2 · BUILD  (per module, in dependency order)
                         brief → arch-builder (fresh) → arch-reviewer (fresh) → owner → merge
```

**Hard delimiter:** no types above 1.3. Requirements and modules are words. Types first appear on the function cards.

## Files

```
_templates/Software_Architecture/      this folder is the skill
  SKILL.md                   the host: /arch_loop entry, arguments, resume from state
  ARCH_LOOP.md               this file, the spec: phases, steps, who runs what
  PRINCIPLES.md              additions to Ousterhout.md; read by host at 1.0 and by every agent
  Ousterhout.md              owner's notes, the core principles
  ARCH_TEMPLATE.md           empty arch.md a project copies at 1.1
  CARDS_TEMPLATE.md          empty cards.md copied into each module folder at 1.3
  agents/arch-depth-check.md   1.4, once (Opus)
  agents/arch-builder.md       2.2, one per module; resumed for fixes
  agents/arch-reviewer.md      2.3, after each build and fix round
  agents/arch-integration.md   2.6, once after the last merge
  TLDR_L1_example.drawio     what 1.2 looks like on a real project
  Software_Architectue.md, Software_Architecture.drawio   owner's original notes; not read by the loop

<project>/architecture/
  arch.md                    the one source of truth (sections below)
  blocks.drawio              view rendered from arch.md
  build/
    <module_1>/
      cards.md               the module's function cards; the owner types here (1.3)
      brief.md               brief at the top (1.6); reports and reviews appended (Phase 2)
    <module_2>/ …            one folder per module, so the modules take shape side by side

<project>-arch/<module>/     git worktree on branch arch/<module>; removed at merge

## Install, activate, instantiate

```
INSTALL (once)   ~/.claude/skills/arch_loop      → symlink to this folder
                 ~/.claude/agents/arch-*.md      → symlinks to agents/arch-*.md
                 template edits take effect everywhere; open a new session to pick up new files
ACTIVATE         owner types  /arch_loop <project path> [requirements file]
                 disable-model-invocation: true → never starts on its own
INSTANTIATE      host reads ARCH_LOOP.md, PRINCIPLES.md, Ousterhout.md
                 no <project>/architecture/arch.md → copy ARCH_TEMPLATE.md, start 1.1
                 else → gate lines + § Build status → SKILL.md resume table
AGENTS           host launches Agent(subagent_type="arch-…", prompt=<paths only>)
                 frontmatter gives model + tools; agents read files, never the chat
STATE            only in <project>/architecture/ and git branches; /arch_loop again resumes
```
```

## Types

```python
Requirement  = {id: "R1", text: str, kind: shall | should | will,
                tag: structural | local}          # structural shapes modules; local fits in one function

Decision     = {id: "D1", text: str}              # a design decision likely to change

Module       = {name: str,
                provides: str,                    # the abstraction, 1–2 sentences, as a caller sees it
                hides: str, limits: str,
                components: [{name, decision: D-id}],   # where each hidden decision lives; one or more
                not_merged_with: [{module, cost_to_callers, would_flip_if}],  # only seriously considered pairs
                reqs: [R-id]}

Edge         = {from: module, to: module, crosses: str}   # what crosses, named; typed at 1.3

FunctionCard = {module, name, req: R-id,
                signature: "name(args: T) -> T",
                does, args, returns, side_effects, requires, errors,  # 🟦 interface comment
                part: core | shell,               # pure decision vs I/O, only where it's cheap
                pseudocode: [🟧 phase lines]}     # ≤ 10 lines

CrossDecision = {text, why, modules: [name]}      # → arch.md § History (Ousterhout Ch 13)

Sequence     = {name: startup | main_cycle | fault | ..., steps: [module.function]}

Finding      = {red_flag, where, why, proposed_fix}

Direction    = {build_order: [module],
                scope: {module: whole | [function]},   # usually whole; function-first when the owner names functions
                done:  {module: str}}             # owner's words, verbatim

Brief        = {module, scope, done,              # from Direction
                cards: "build/<module>/cards.md",  # a path, not a copy, so nothing drifts
                depends_on: [{module, cards path, state: merged | stub}],   # interfaces only, never their code
                used_by:    [{module, cards it calls, state}],          # a merged caller freezes those cards
                must_not_contradict: [Decision + CrossDecision],       # its own D-id + History lines naming it
                run_for_real: rules,              # reads + cheap calls free; ask before spend > cap,
                                                  #   anything sent outward, or an actuator
                commands: {test, run},            # how to run tests and the module in this project
                constraints: [check],             # arch.md § Constraints: lint, types, budgets; builder can't edit
                branch: "arch/<module>", worktree: "<project>-arch/<module>"}
                                                  # tests are written by the builder

BuildReport  = {module, built: [function], tests: pass | fail + output tail,
                deviations: [{card, change, why}], stopped_on: none | shared_interface | cap,
                questions: [str], logs: path}

Review       = {verdict: approve | changes, findings: [{severity, file_line, card, evidence}]}

BuildStatus  = {module: pending | building | review | owner | merged, scope, branch, date}
```

## Phase 1 · Design

```python
def phase_1(requirements_doc) -> [Brief]:
    # 🟦 Runs in the main context, with the owner in the chat. One thread: every
    # 🟦 decision depends on the others, so nothing here is handed to a subagent
    # 🟦 except the one read-only depth check.

    # 1.0 · load principles ─────────────────────────────── main
    load("PRINCIPLES.md", "Ousterhout.md")      # stays in context for every step

    # 1.1 · intake ──────────────────────────────────────── main drafts, owner confirms
    reqs: [Requirement] = import_rids(requirements_doc)   # shall / should / will, no new reqs
    tag_each(reqs, structural | local)                    # draft tags
    # no priority here: priority is the owner's call at 1.6 and during build/test
    gate("intake ok")

    # 1.2 · modules ─────────────────────────────────────── main drafts, owner edits in words
    decisions: [Decision] = list_decisions_likely_to_change(reqs)   # first, before any box
    modules:   [Module]   = group_by_caller_view(decisions)         # few deep modules; each decision
                                                                    # becomes a component inside one
    edges:     [Edge]     = name_what_crosses(modules)
    for pair in modules joined by an edge, with any Ch 9 indicator yes:
        merge, or record not_merged_with: cost to callers · would flip if
    if len(modules) > 8: merge_pass()                               # cap 8, target 4–6
    design_it_twice(hardest_boundary)          # 2 radically different splits, owner picks;
                                               # identical caller view → fewer interfaces wins
    render("blocks.drawio")    # system → module boxes with component chips and R-chips, named edges,
                               # rejected merges as dashed red links labelled "would flip if"
    check(every D-id in exactly one component; every R-id in exactly one module)
    gate("modules ok")

    # 1.3 · functions ───────────────────────────────────── main, one module at a time
    for m in modules:
        copy(CARDS_TEMPLATE.md → build/<m>/cards.md)
        draft_cards(m)                               # 🟦 block before 🟧, per Ch 15; headings "(draft)"
        # a 🟦 block that is long or hard to write → back to design_it_twice
    loop until every card is confirmed:
        owner edits build/<m>/cards.md directly      # types, shapes, names, whole cards
        host re-reads the file first, never overwrites owner text,
        asks with "> host:" lines; owner removes "(draft)" to confirm
    index(arch.md § Functions)                       # module → cards path → card names
    cross: [CrossDecision] = collect(cards)          # protocols, ids, formats, flags
    check(every card names an R-id; every R-id has a card)   # a checklist, not an agent

    # 1.4 · depth check ─────────────────────────────────── AGENT arch-depth-check (Opus), once
    findings: [Finding] = launch("arch-depth-check", reads=[arch.md, PRINCIPLES.md, code root?],
                                 model=opus, returns="≤ 7 findings")
    owner_accepts_or_rejects(findings); apply_accepted(arch.md)

    # 1.5 · sequences ───────────────────────────────────── main
    seqs: [Sequence] = walk(startup, main_cycle, fault, using=cards)
    for break_ in unresolved_steps(seqs):              # missing card or mismatched type
        goto 1.3 if function_level(break_) else 1.2    # zoom out, fix, come back

    # 1.6 · direction ───────────────────────────────────── OWNER, in words
    build_order = topological(edges)                   # leaves first; a cycle → merge candidate
    direction: Direction = owner_says(build_order ok?, scope per module, done per module)
    # scope: whole module by default; the owner may name functions to build first
    constraints = owner_confirms(draft checks: lint, types, test command, budgets)   # → § Constraints
    briefs = [write_brief(m, direction) for m in build_order]
    set_build_status(all modules: pending)
    gate("build")
    return briefs
```

## Phase 1 output — the handoff to Phase 2

Phase 1 is done when `arch.md` has `build: <date>` set. At that point these exist, and Phase 2 reads nothing else:

| Output | Contents | Read by |
|---|---|---|
| `arch.md` | Every section filled; three gate lines dated; § Build status with every module `pending` | host |
| `blocks.drawio` | Rendered from `arch.md` | owner |
| `build/<module>/cards.md`, one per module | The module's confirmed cards, edited by the owner | builder, reviewer, integration |
| `build/<module>/brief.md`, one per module | The `Brief` type above: scope, done, the path to this module's cards, its dependencies' cards paths, the decisions it must not contradict, run-for-real rules, test and run commands, branch and worktree | builder, reviewer |

The brief is the builder's whole world. A builder that has to ask something the design already settled means the brief was thin; fix the brief template, not just that run.

## Phase 2 · Build

```python
def phase_2(briefs: [Brief]) -> None:
    # 🟦 One fresh agent per module on its own branch and worktree. Nothing reaches
    # 🟦 main until the owner signs off that module. Modules run one at a time.

    for brief in briefs:                               # build order from 1.6
        # 2.1 · isolate ─────────────────────────────────── host
        git_worktree_add(brief.worktree, branch=brief.branch, from_="main")
        status(brief.module, "building")

        # 2.2 · build ───────────────────────────────────── AGENT arch-builder (Sonnet), cwd = worktree
        report = launch("arch-builder", reads=[brief, PRINCIPLES.md, merged code of depends_on])
        # its cycle: tests from cards + done → run red → implement → green
        #            → run for real (brief.run_for_real) → debug, capped at 5 fix attempts
        # card wrong:  change it in its branch and record a deviation — except a card
        #              a merged module calls: stop and return (stopped_on = shared_interface)
        if report.stopped_on == "cap":
            report = launch("arch-builder", fresh, reads=[brief, report])   # one retry with failure notes
            if report.stopped_on == "cap": owner_decides(report); continue
        if report.stopped_on == "shared_interface": owner_decides(report); continue

        # 2.3 · review ──────────────────────────────────── AGENT arch-reviewer (Sonnet), cwd = worktree
        status(brief.module, "review")
        review = launch("arch-reviewer", reads=[brief, report, diff main...branch, PRINCIPLES.md])
        # runs the tests itself; flips a condition to check the tests catch it;
        # checks every card's 🟦 promise; finds deviations the builder didn't report
        for _ in range(2):                             # fix rounds, capped
            if review.verdict == "approve": break
            resume(builder, review.findings)           # same builder, its context intact
            review = launch("arch-reviewer", fresh, reads=[...])

        # 2.4 · owner gate ──────────────────────────────── OWNER
        status(brief.module, "owner")
        append("build/<module>/brief.md", report, review)
        owner_reads(report, review); owner_may_try(brief.worktree)
        if not owner_says("merge"): resume(builder, owner_words); goto 2.3

        # 2.5 · finish ──────────────────────────────────── host
        merge(brief.branch, into="main")
        # the merge carries any changed cards.md; host adds cross-module changes to § History
        status(brief.module, "merged"); git_worktree_remove(brief.worktree)
        refresh_briefs(later modules)                  # their depends_on now point at merged code

    # 2.6 · integration ─────────────────────────────────── AGENT arch-integration (Sonnet), on main
    git_worktree_add("<project>-arch/integration", branch="arch/integration", from_="main")
    result = launch("arch-integration", reads=[arch.md, PRINCIPLES.md])
    # runs each 1.5 sequence as an end-to-end test against the merged modules
    owner_reads(result)                                # a failure names the sequence step and the card
    # seam fix → a new arch/<module> round (2.2–2.5); integration branch merges when all pass
```

## Agents

| Agent | When | Model | Reads | Returns |
|---|---|---|---|---|
| `arch-depth-check` | 1.4, once | Opus | `arch.md`, PRINCIPLES, code if any | ≤ 7 findings: red flag · where · why · fix |
| `arch-builder` | 2.2, one per module; resumed for fixes | Sonnet | its brief, PRINCIPLES, merged dependency code | BuildReport |
| `arch-reviewer` | 2.3, after each build and each fix round | Sonnet | brief, report, diff, PRINCIPLES | Review |
| `arch-integration` | 2.6, once after the last merge | Sonnet | `arch.md` § Sequences, merged code | per sequence: pass / fail at step · card · output |

Every agent reads files, never the conversation, and returns its result to main. Any new subagent is Sonnet (arch-depth-check is the one Opus exception) with an objective, an output shape, its tools and its boundaries, plus the decisions it must not contradict.

## `arch.md` sections

```markdown
# Architecture — <project>          <date> · <owner>
intake ok: —   modules ok: —   build: —

## Requirements        (1.1)  R-id · text · shall/should/will · structural/local
## Decisions           (1.2)  D-id · decision likely to change
## Modules             (1.2)  name · provides · hides · components (D-ids) · limits · not merged with · R-ids
## Edges               (1.2)  from → to · what crosses
## Functions           (1.3)  index only: module → build/<module>/cards.md → card names
## Sequences           (1.5)  startup · main cycle · fault
## History             (1.3+) cross-module decisions: decision · why · modules (Ch 13)
## Direction           (1.6)  owner's words: build order · scope · done
## Constraints         (1.6)  checks every build must pass; builder can't edit
## Build status        (1.6, Phase 2)  module · scope · branch · state · date
```

## Settled (2026-11-13)

- Tests are written by the builder, from the module's cards and the owner's `done` line.
- Cards live in `build/<module>/cards.md`, one folder per module, edited by the owner directly; `arch.md` § Functions only indexes them. `architecture/` must be inside the project's git repo so each worktree carries the cards.
- Modules: target 4–6, cap 8 (2026-11-16, replaces "no cap"). A module hides one or more decisions as components. Functions: no cap.
- Merge reasoning: one "Not merged with" line per seriously considered pair (shares an edge, a Ch 9 indicator says yes): cost to callers · would flip if. No separate merges section.
- Components are labels, not build units; to build one first, name its functions in the scope.
- A build cycle is usually a whole module; the owner may name functions to build first.
- The owner signs off each module before the next starts.
- Run for real: reads and cheap calls free; ask before spending past a cap, sending anything outward, or moving an actuator.
- Integration runs the 1.5 sequences once, after the last merge.
- Reviewer has full capability; fixes go back to the same builder, resumed.
- Each module builds on branch `arch/<module>` in its own worktree; finishing a module merges it back to main and folds its deviations into `arch.md`.
- A builder stuck at its cap gets one fresh retry with the failure notes, then goes to the owner.

- Card wrong during build: change it in the branch and report; stop only if a merged module calls that card.
- Constraints live in `arch.md` § Constraints (written at 1.6, copied into each brief), not a separate file. The floor guard (no weakened tests after a red run, no new suppressions, stubs or empty catches) is fixed in the builder and reviewer definitions.
- Fix-attempt cap inside a build: 5.
