# Requirements Loop — Template

Oct 29, 2026 · @Alex

One thing: turn what the owner says into a running list of requirements, by asking him questions from different roles, until he accepts the list. Design and handoff are not part of this process; they start in another document after the acceptance line exists. Agents with tools are part of it: anything searchable or testable is found by an agent before the round ships, so the owner is asked only what he uniquely knows.

## Three files

- `system_reqs/REQUIREMENTS.md` is the running list: motive, goal, shall, should, will, one tension. Nothing else. It is edited in place every pass and never restarted.
- `system_reqs/changelog.md` records system-level changes to the list only, with the owner's answer quoted in the `From:` line of each. Small edits are not logged; they get one line each in the next round's opener. The `From:` lines and the answers under `>` in the rounds are the record of his words.
- `system_reqs/round<n>.md` is where the owner answers.

Nothing else is written.

## The loop

```
 0 Goal  -->  1 Ask by role  -->  owner answers round<n>.md  -->  2 Morph the list  -->  3 Gate
   motive,      6–10 typed            in his own words,             shall/should/will       Accepted on: <date>
   goal, NOT    questions, each       approves or rejects           edited in place;        or Not yet: <why>
   change by    showing the fork      motive/goal proposals          system-level changes        |
   approval     in the list                                           to changelog.md            |
   ^                                                                                              |
   +--------------------------  Not yet: proposals against the goal in the next round  -----------+
```

The orchestrator is the model in the session. Agents launch without being asked, each in its own phase; they are listed under Agents by phase after the Gate. One pass is 0 → 1 → answers → 2 → 3. The first pass asks about the goal and the list; every later pass asks against the current list.

### 0 Goal

On the first pass the orchestrator drafts Motive (why the work, what he hopes to get out, what would make it not worth doing, whole goal or a scoped-down piece), one goal sentence, one journey and what it is NOT from the conversation, and marks each line `(draft)` until the owner has confirmed it in a round.

After that, **Motive and Goal change only by approval.** The orchestrator never edits them on its own. When an answer suggests the motive or goal has moved, the round carries a proposal: the current line, the proposed line, the quoted answer that motivated it, and an approve / reject slot. The line changes only when the owner writes approve. The `Not yet:` line from the gate is handled the same way: the orchestrator reads it against the goal and proposes, never redrafts.

Every round also carries one or two questions aimed at the Motive rather than at a requirement, of the root-cause, counterfactual or pre-mortem type. These are the questions that uncover what the owner wants; the proposals follow from his answers to them.

### 1 Ask by role

Pick the roles that fit the project from Roles below. Each role reads the motive, the goal and the current list and asks what it would need to know to sign off. The orchestrator keeps the 6–10 questions whose answers would most change the list, ranked by how much of the list they move, the top two marked. From pass 2 one cold builder agent (Agents by phase) adds at most three candidates to the pool; they pass the three filters and the ranking like any other. The order of the phase is under Simulated owner below.

**Coverage map, before the roles ask.** The orchestrator reads the list against eight categories and marks each Clear, Partial or Missing: Scope and NOT · Delivered (what, to whom, when, where, how much) · Numbers (every adjective) · Failure (how he notices, what ships anyway) · Runner, reach and cost · Shelf and history (what exists, what was tried) · Done on day one (what he judges by eye or ear) · Tension (which shall gives first). Partial and Missing categories get slots and roles first. When the shelf table is in the round, the Shelf half of Shelf and history is read from the table; the history half, what was tried, stays the owner's. The map is the orchestrator's own check and is not written out; a category that drove a question is named on that question's `Why asked` line.

Every question is typed, from this vocabulary; which types a round uses follows from what the list needs, not from a quota:

- **root-cause / reframing** — what problem is this requirement solving; what happens if it is dropped
- **boundary / scoping** — what is explicitly NOT in this
- **counterfactual** — if this constraint vanished, what would the list say
- **forcing-function** — rank these shalls; which one gives first
- **why-not-off-the-shelf** — what existing thing almost does this, and which requirement is the reason it does not; when the shelf table is in the round, its rows are the starting set and the question still asks what else
- **pre-mortem** — it is three months on and this stopped working or stopped being used; why
- **constraint-surfacing** — hard limit, preference, or inherited assumption
- **history-probing** — what was tried, how it failed
- **quantifying** — an adjective into a number
- **acceptance-defining** — what he would judge by eye or ear

Three filters, every question passes all three:

1. **Asymmetric** — only what the owner uniquely knows. Anything searchable, derivable, or already in the record is not a question for him; the searchable goes to the fact probe (Agents by phase).
2. **The answers fork the list** — each plausible answer changes a requirement differently. If every answer leaves the list the same, the question is cut.
3. **One decision per question, open-ended** — never bare yes/no, except the forcing-function type where the ranking is the answer.

**Simulated owner, from pass 2.** See Agents by phase. Order inside the phase: the shelf lane runs from the list alone, carried forward if no shall moved; the coverage map reads the list and the table; the roles ask and the builder agent asks cold, in parallel, into one pool; the three filters run on the pool, the searchable going to the fact probe; the pool is ranked to 6–10 with the top two marked; the simulated owner answers the draft, builder questions included; the round is written.

A question block:

```markdown
### Q3 · 3 a.m. operator · pre-mortem · touches R10, R11

**Question:** On a night the orchestrator cannot fix the fault, what do you want to find on the phone at 05:50?

**What changes in the list:** "nothing is fine" keeps R10 as is and R11 stays should-level; "the finished papers" adds a shall that partial episodes ship; "a spoken line saying what died" rewrites R10 to require audio on every failure.

>
```

The block is the question and the fork. A `Why asked` line, options or anything else appear at the orchestrator's judgement, never with pros and cons. The owner answers under `>` in his words, or leaves it blank; a blank question resolves to the default: the list stays as it is on that fork, the opener says so in one line, and the question is not asked again. Every question is new each pass: an old one returns only if a later answer contradicted it, and the question says which answer.

The round file, in order: an opener saying briefly what changed since the last round and what the agents did; the shelf table; the Motive and Goal proposals, if any, with approve / reject slots; the motive-level questions; the requirement questions; a recap list of every question in one line each so the owner can answer by number; one free line for what he likes and does not about the list; the gate slot.

### 2 Morph the list

The orchestrator re-reads motive, goal and every round so far, then edits the shall, should and will sections of `REQUIREMENTS.md` in place: add, rewrite, split, merge, move between regimes, or drop. Motive and Goal are edited only where the owner wrote approve.

**What is logged.** One test: would a builder with only the list build something different? A change that passes it gets one entry in `changelog.md`, headed by the R-id (or Motive, Goal, Tension), with the owner's answer quoted in its `From:` line. A change that fails it is named in one line in the next round's opener instead. Example:

```markdown
### Round 3

#### R7 · rewritten
Was: script on Fable
Now: script on Opus 5.5
From: Q2, "stick with Opus for the cognition pass"

#### R17 · new shall
Now: one tap in the morning, never a search
From: Q3, "one tap, I will not go looking for it"

#### R9 · moved shall to should
From: Q1, "loosely"

#### R14 · dropped
Was: first episode fixed to five topics
From: Q5, built as a tracer instead

#### Goal · approved
Was: <old sentence>
Now: <approved sentence>
From: round 3 proposal, approved
```

### 3 Gate

The owner reads the list. He writes `Accepted on: <date>` at the top of `REQUIREMENTS.md`, or `Not yet: <what is unsatisfactory>` in the round file. Not yet feeds Phase 0 of the next pass as a proposal against the goal, not a redraft. The gate's state is the line in the doc, never the chat.

## Agents by phase

Agents the orchestrator launches without being asked. A new one is added here when a round shows the need, not before. Each returns to the orchestrator and writes no file; its result lands in the one place it is used.

- **Shelf lane** · phase 1, first in the phase, before the coverage map. Runs every pass from the first draft list; when no shall has moved since the last run the table is carried forward unchanged, when one has moved it reruns. Has web search. Reads `REQUIREMENTS.md` only, not the conversation. Returns at most twelve rows of system · shalls covered · shalls missed · URL opened; a row without an opened URL is dropped; no winner and no recommendation. Lands in the round as the shelf table.
- **Builder agent** · phase 1, alongside the roles, before the three filters, every pass from 2. Opus. Given `REQUIREMENTS.md`, `changelog.md` and every earlier round file with the owner's answers under `>`, not the conversation, it lists what it would have to ask the owner before writing the first file. Returns at most three typed questions, each with the R-ids it touches and the fork in the list. They join the candidate pool and pass the three filters like any other; a candidate filter 1 calls searchable or derivable goes to the fact probe. A kept one carries the role name Builder in its header, so the agent's worth is visible after two or three passes.
- **Fact probe** · phase 1, on any candidate the filters call searchable or derivable, from pass 2. Web search and shell. One prompt per fact, reads `REQUIREMENTS.md` only. Returns at most three lines with the URL opened or the command run. Lands in the round opener as `Found:`, and as a `(draft)` line in the list when it would change a requirement.
- **Simulated owner** · phase 1, on the draft round after the three filters, before it ships, from pass 2. Given `REQUIREMENTS.md`, `changelog.md` and every earlier round file with the owner's answers under `>`, not the conversation, it answers every draft question as the owner, builder questions included, each answer tagged `from record: <quote>` or `guess`. A question answered from the record failed filter 1, already in the record: it is cut and the quoted answer goes into Morph as the owner's, or it is replaced by one the record cannot answer. A guess means the question is the owner's. Lands as one line in the round opener naming each cut or replaced question with the quote that answered it.

## The running list

The list is only the requirements. System-level history lives in `changelog.md`; the list does not quote rounds or carry history.

```markdown
# Requirements — <project>          <as-of date> · <owner>
Accepted on: —          Rounds: 3

## Motive
- Why the work: <line>
- What I hope to get out: <line>
- What would make it not worth doing: <line>
- Whole goal or a scoped-down piece: <line>

## Goal
<one sentence>
Journey: <one line>   ·   NOT: <one line>

## Shall (hard)
- **R1** deliver, every weekday, two hours of audio as 8 segments of ~15 min, one paper each
- **R2** have the day's audio on the phone before the morning drive, nothing to look for

## Should (trade-offs)
- **R3** send the Claude passes through Batch pricing wherever the chain still publishes by 05:00 · weight: high

## Will (deferred)
- **R4** publish a pre-rendered failure clip when TTS or delivery dies · phase B

## Known tension
<the two requirements that pull against each other, one line>
```

Rules for the list, three only:

1. **Every line is the owner's or marked draft.** A requirement the orchestrator inferred carries `(draft)` at the end of its line until the owner confirms it in a round; a draft never becomes shall on its own. Motive and Goal lines are `(draft)` until confirmed, then change only by approval.
2. **Shall, should and will stay separate.** A requirement moves between them only on an answer, with a changelog entry.
3. **Nothing is deleted.** A drop is always system-level, so every dropped requirement lives in the changelog with the why. R-ids are never reused.

## Roles

One line each on what the role must know before it signs off. Use four to six per project, first the roles whose categories the map marks Partial or Missing. The builder is an agent (Agents by phase), not a role.

- **Product owner / user** — what done looks like on day one, judged by eye or ear
- **Architect** — what already exists and why it is not enough, the shelf table first; what each part hides, what crosses a boundary
- **Infrastructure** — where it runs, what that place reaches, the deadline and the margin for a late run
- **3 a.m. operator** — how a failure is noticed, what ships anyway, the one safe re-run
- **Finance** — the cost of one unit, and what he would build if the ceiling vanished
- **Sceptic** — why this died or went unused three months on; which shall gives first
- **Professor of the field** — the known-good baseline and what this does that it does not
- **Staff engineer of the domain** — what is under-specified for a real deployment, what he would refuse to sign

## After acceptance

Design starts in a separate document that reads `REQUIREMENTS.md` as its input. If design moves a shall, the change comes back as a changelog entry and the acceptance line is cleared until the owner re-accepts. The inventory, the depth Alternatives lane with scored candidates per decision, interface probes against chosen parts, and the agent-team review belong to that document (`SYSTEM_DESIGN_LOOP.md`). The breadth shelf table, and any probe that settles a searchable question about the list, stay here; the design loop runs its own breadth search once the owner's answers exist.
