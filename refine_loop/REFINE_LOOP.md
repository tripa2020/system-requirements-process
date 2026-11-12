# Refine Loop — Template

Nov 7, 2026 · @Alex · Phase 3: agents and prompts. Phase 4 builds the skill.

One thing: `/refine_loop <Project> <task>` takes a task from motive to go in three cycles and one research stage, then does the task. The owner answers in the chat. The loop keeps the record.

## Files
Every run lives under one fixed folder, whatever directory the command was run from:

`/Users/alex/Code_ws/active/refine_loop_runs/<task-slug>/`

- `refine_process.md` — the running document. Edited in place, never restarted.
- `history.md` — every round's questions, the owner's answers copied verbatim from the chat, every stage 3 report, every work report. Appended, never edited.
- `changelog.md` — system-level changes to `refine_process.md`, the owner's words quoted in `From:`.

The task's own outputs go where the task says. The loop writes nothing else.

**The orchestrator reads this file and the run's three files. Nothing else.** Not `REQUIREMENTS_LOOP.md`, not `SYSTEM_DESIGN_LOOP.md`, not another run. Everything the loop needs is in this file.

## The loop

```
Cycle 1  -->  Cycle 2  -->  Stage 3  -->  Cycle 3  -->  Go  -->  Work
Motive        Requirements  Research     Final round   Go on:   unattended,
and Goal      shall/should  agents only  from the      <date>   reports
              /will         no questions findings
```

Three cycles, one stage, one gate. Every cycle has the same body. The cycles differ only in their feed, the sections they own, the agents they launch and their gate line.

## The cycle body

```
Feed  -->  Ask  -->  owner answers in chat  -->  Record  -->  Morph  -->  Gate line
```

- **Feed** — what the questions are drawn from. The only part that changes per cycle.
- **Ask** — the questions are shown in the chat. Each is typed from Question types below, passes the three filters (asymmetric · the answers fork the document · one decision, open-ended), shows the fork, and is ranked; at most seven a round, top two marked. A readable fact is never asked; it goes to the fact probe. The round ends with a recap, one line per question, so he can answer by number.
- **Owner answers** in the chat, by number, in his words. A blank or "don't know" is not re-asked; the loop goes on with what it knows and logs an assumption.
- **Record** — the orchestrator appends the round to `history.md`: each question, the owner's answer verbatim under `>`.
- **Morph** — edits only the sections the cycle owns. Every line is the owner's or `(draft)`. System-level changes get a `changelog.md` entry.
- **Gate line** — the owner says it in the chat; the orchestrator writes it with the date at the top of `refine_process.md` and quotes him in `history.md`.

## Question types
Every question carries one of these. Which types a round uses follows from what the document needs, not from a quota.

- **root-cause / reframing** — what problem is this solving; what happens if it is dropped
- **boundary / scoping** — what is explicitly NOT in this
- **counterfactual** — if this constraint vanished, what would the document say
- **forcing-function** — rank these shalls; which one gives first
- **why-not-off-the-shelf** — what existing thing almost does this, and which requirement is the reason it does not
- **pre-mortem** — three months on this stopped working or being used; why
- **constraint-surfacing** — hard limit, preference, or inherited assumption
- **history-probing** — what was tried, how it failed
- **quantifying** — an adjective into a number
- **acceptance-defining** — what he would judge by eye or ear

## Cycles

### Cycle 1 · Motive and Goal
Owns Motive, Goal. Gate line `Motive approved: <date>`. One round by default; a rejected line brings one more.

1. Read the command and the conversation. Draft Motive (why the work · what he hopes to get out · what would make it not worth doing · whole or scoped-down), Goal, Journey, NOT, Deliverable. Every line `(draft)`. Write `refine_process.md`.
2. Any readable fact in the draft → **fact probe**.
3. Draft at most five questions, motive-level types only: root-cause, counterfactual, pre-mortem, boundary. Three filters.
4. Show in the chat: the draft, then the questions, then the recap.
5. Record. Morph Motive and Goal from his words. Write the gate line when he says it.

### Cycle 2 · Requirements
Owns Shall, Should, Will, Known tension. Gate line `List good enough: <date>`. Repeats until he says so.

1. Coverage map, not written out: seven fixed categories plus up to three the orchestrator adds for the task, each Clear, Partial or Missing. Fixed: Scope and NOT · Delivered · Numbers · Failure · Runner, reach and cost · History, what was tried · Done on day one.
2. Pick four to six roles, Partial and Missing first. Each asks what it must know to sign off, against Motive, Goal and the list.
3. Three filters on the pool. A searchable candidate → **fact probe**, project files allowed.
4. From the second round: **simulated owner** on the draft; a question answered from the record is cut, its quote goes to Morph.
5. Rank to at most seven, top two marked. Show in the chat with the recap.
6. Record. Morph the list; changelog. Write the gate line when he says it.

### Stage 3 · Research
No questions to the owner. Input is `refine_process.md` and `history.md`, never the conversation.

1. **Breadth.** Launch in parallel: **prior-art survey**, four Opus agents, one angle each; **CTO and future sight**, one agent.
2. **Align.** Merge the survey to at most eight rows. For each row the orchestrator writes the disposition: which shalls and which quoted answers it aligns with, which it contradicts, adopted in part or rejected with the reason. A contradicting row is an open fork.
3. **Ask.** **Builder**, cold. **Simulated owner** answers the builder's and the CTO's questions; one answered from the record is cut.
4. Write the report, show it in the chat, append it to `history.md`: Found · Could not verify · Prior art table · Make-or-break · Open forks · What it proposes to send agents to do, and why.

### Cycle 3 · Final round
Owns any section by proposal, and Assumptions. Gate line `Go on: <date>`.

1. Candidate pool: the open forks, the builder and CTO questions that survived, and every assumption the loop would otherwise make unattended.
2. Three filters; a searchable candidate → **fact probe**. Rank to at most seven. Show in the chat with the recap.
3. Record. Morph by proposal: current line, proposed line, his quoted answer, approve or reject. Unanswered assumptions go under Assumptions. Write the gate line when he says it.

### Go · Work
- Completes the task. Default order when unattended: web search, tests against hardware, papers, building last. No limit on actions or time.
- Any fact met on the way → **fact probe**. A hardware boundary → **interface probe** before building on it. A one-way action, such as placing an order or cutting a part → **alternatives lane** first.
- While a question waits for him, the agents keep working. An answer that contradicts work done: stop, ask, incorporate, redesign around it, no restart.
- A step only he can do: the loop writes the steps, clarifies if asked, waits on that part, continues with the rest. Talking to hardware needs no permission; moving an actuator gets a warning and a confirmation.
- The **simulated owner** answers the loop's own questions from the record; each answer goes under Assumptions with the date. On his return the loop asks him to confirm each assumption first.
- Every unattended stretch ends with a report in the chat and `history.md`: what was achieved, why it solves the goal, what was learned for the next implementation.

## Agents by cycle
Seven agents. Their definitions are complete here. Each reads files, never the conversation, returns to the orchestrator and writes no file. `<task dir>` is `/Users/alex/Code_ws/active/refine_loop_runs/<task-slug>/`.

### Fact probe
- launches: any cycle, when the orchestrator meets one fact it would otherwise assume or ask; one prompt per fact
- model: Sonnet · tools: web search, web fetch, shell, read
- returns: at most three lines · lands in: the line that needed it, marked `(draft)`; in the round opener as `Found:`

```
You verify one fact. Fact: <the fact as the orchestrator would otherwise assume it>.
Search, fetch and read as many sources as you need to settle this one fact: web search, web fetch on every promising result, shell and read on any file or repository, cloned into a temporary directory, never <task dir>. Do not stop at search snippets.
Do not survey. Do not report on anything but this fact.
Return at most three lines: the fact · confirmed / not confirmed / could not verify · every URL opened, command run and file read.
```

### Simulated owner
- launches: cycle 2 from its second round, stage 3 step 3, cycle 3, Work; on a draft question set
- model: Opus · tools: read
- returns: one line per question · lands in: cut questions named in the round opener with their quote; in Work, under Assumptions

```
You answer as the owner. Read <task dir>/refine_process.md and <task dir>/history.md. Do not invent.
For each numbered question below, answer in one line as he would, tagged `from record: "<his quote>"` when his words in history.md answer it, or `guess` when they do not.
Return one line per question, numbered as given.
<questions>
```

### Prior-art survey
- launches: stage 3 step 1, four agents in parallel, one angle each; again in Work when a shall moves
- model: Opus · tools: web search, web fetch, shell, read
- returns: at most four systems per agent; the orchestrator merges to at most eight rows and writes the disposition · lands in: the Prior art table of the stage 3 report

```
You search for existing implementations of this task. Angle: <same domain | adjacent domain with the same shape | open-source repositories | write-ups by people who built against these requirements>.
Read <task dir>/refine_process.md and <task dir>/history.md. Of the task's files, nothing else.
Fetch and read as many sources as you need: web search, web fetch on every promising result, follow links, read docs and READMEs, clone and read code with shell and read in a temporary directory, never <task dir>. Do not stop at search snippets. Open every URL you cite; drop any you cannot open.
Return at most four systems, each on one line: system · what it does · shalls covered (R-ids) · shalls missed (R-ids) · the owner answer in history.md it contradicts, quoted, or none · URL opened.
No winner. No recommendation.
```

### CTO and future sight
- launches: stage 3 step 1, beside the survey
- model: Opus · tools: web search, web fetch, shell, read
- returns: at most five findings, at most three questions · lands in: Make-or-break in the report; questions into the cycle 3 pool

```
Read <task dir>/refine_process.md and <task dir>/history.md. Of the task's files, nothing else. Fetch and read as many sources as you need: web search, web fetch on every promising result, follow links, read docs and READMEs, clone and read code with shell and read in a temporary directory, never <task dir>. Do not stop at search snippets. Open every URL you cite.
Answer two things. First: what must be true for this task's Deliverable to still be in use one month after it ships, rather than merely delivered. Second: what made comparable efforts in this field fail, and what made them succeed.
Return at most five findings, one line each with the URL opened.
Then at most three questions for the owner, each: type · touches (R-ids or Motive) · the question · what changes in the document under each plausible answer. Ask nothing the record or the web answers.
```

### Builder
- launches: stage 3 step 3, once
- model: Opus · tools: read
- returns: at most three questions, then its own decisions · lands in: questions into the cycle 3 pool after the simulated owner; its decisions checked against the list, one-way ones become questions

```
You are about to do this task cold. Read <task dir>/refine_process.md and <task dir>/history.md. Nothing else.
List what you would have to ask the owner before writing the first file or ordering the first part, and the decisions you would make yourself.
Return at most three questions, each: type · touches (R-ids or Motive) · the question · what changes in the document under each plausible answer.
Then the decisions you would make yourself, one line each.
```

### Interface probe
- launches: Work, before building on a hardware or software boundary; again when the boundary changes
- model: Sonnet · tools: shell on the runtime
- returns: possible / not possible · lands in: the task's own files; one line in the next report

```
Boundary: <name>. Format: <what crosses it>. Runtime: <where it runs>.
Run one real sample against this boundary from that runtime. Do not move an actuator.
Return at most three lines: possible / not possible · the command run · what came back.
```

### Alternatives lane
- launches: Work, before a one-way action
- model: Sonnet · tools: web search, web fetch, shell, read
- returns: at most four candidates, scored, one back-up · lands in: the chat, before the action; the chosen one in the next report

```
Decision: <the one-way action>. Read <task dir>/refine_process.md and <task dir>/history.md. Of the task's files, nothing else.
Fetch and read as many sources as you need: web search, web fetch on every promising result, follow links, read docs and READMEs, clone and read code with shell and read in a temporary directory, never <task dir>. Do not stop at search snippets. Open every URL you cite; drop a candidate without one.
Return at most four radically different candidates. For each: name · URL opened · against every shall: R-id meets / misses / unknown · the owner answer it fits or contradicts, quoted. Name one back-up. No winner.
```

## The running document

```markdown
# Refine — <project> · <task>          <as-of date> · <owner>
Motive approved: —     List good enough: —     Go on: —     Rounds: 0

## Motive                                                      (cycle 1)
- Why the work: <line>
- What I hope to get out: <line>
- What would make it not worth doing: <line>
- Whole goal or a scoped-down piece: <line>

## Goal                                                        (cycle 1)
<one sentence>
Journey: <one line>   ·   NOT: <one line>   ·   Deliverable: <one line>

## Shall (hard)                                                (cycle 2)
- **R1** <line>

## Should (trade-offs)                                         (cycle 2)
- **R2** <line> · weight: high

## Will (deferred)                                             (cycle 2)
- **R3** <line> · phase: <when>

## Known tension                                               (cycle 2)
<the two requirements that pull against each other, one line>

## Assumptions                                                 (cycle 3, Work)
- <date> · <assumption> · from: stand-in | blank answer · confirmed: —
```

## The history file

```markdown
# History — <project> · <task>

## Round 1 · Cycle 1 · <date>
### Q1 · <role> · <type> · touches Motive
**Question:** <text>
**What changes in the document:** <fork>
> <owner's answer, verbatim>
### Gate
> <owner's words>  →  Motive approved: <date>

## Stage 3 · <date>
Found · Could not verify · Prior art table · Make-or-break · Open forks · Proposed plan

## Report · <date>
<achieved · why it solves the goal · learned>
```

## Roles
Four to six per task, first the roles whose coverage categories are Partial or Missing. One line each on what the role must know before it signs off.

- **Product owner** — what done looks like on day one, judged by eye or ear
- **Architect** — what exists and why it is not enough; what each part hides
- **Infrastructure** — where it runs, what that place reaches, the margin for a late run
- **3 a.m. operator** — how a failure is noticed, what ships anyway, the one safe re-run
- **Finance** — the cost of one unit; what he would build if the ceiling vanished
- **Sceptic** — why this died three months on; which shall gives first
- **Professor of the field** — the known-good baseline and what this does that it does not
- **Practitioner of the domain** — named per task; what is under-specified for real use

## Rules
1. Every line is the owner's or `(draft)`. A draft never becomes shall on its own.
2. Shall, should and will stay separate. A move needs an answer and a changelog entry.
3. Nothing is deleted. A drop lives in the changelog with the why. R-ids are never reused.
4. A section is edited only by the cycle that owns it. After that cycle's gate line, only by approval.
5. The orchestrator reads this file and the run's three files. No other template, loop or run.
