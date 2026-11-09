# Round 4 — refine_loop requirements          2026-11-03

Pass 4.

## Opener

Since round 3: R19 new (the task opens with the Motive process); R17 moved to should (S5) and R15 to should (S6) with W3 for other engines, by your ranking; R6, R8, R14, R18 rewritten from your words. Entries under Round 3 in `changelog.md`. Round 3 Q3 ("not sure what this mean") resolved to the default: R7 keeps a line in the doc, wording drafted `Go on: <date>` as `(draft)`. The round-3 fact probe's finding landed in R1 as `(draft)`: a user-level skill under `~/.claude/skills/`, symlink allowed.

Agents: the shelf lane reran on the moved shalls (14 pages opened). The Builder, cold on Opus, returned three questions; all three passed the filters and are Q1, Q2, Q3 below. The fact probe took the Builder's one searchable item. The simulated owner, on a different model, cut none; Q1, Q2, Q4, Q6 and Q7 are narrowed to what the record does not say.

Found: in Claude Code, background subagents and background shells keep running while a question waits for you ("Background subagents run concurrently while you continue working"); the question itself stays open until you answer unless a timeout is set (60 s, 5 min, 10 min), after which Claude proceeds on its own; `/goal` does not advance while a question is open; the docs do not say the main session can do other work with a question open; subagents cannot ask you. https://code.claude.com/docs/en/sub-agents · https://code.claude.com/docs/en/goal · https://code.claude.com/docs/en/tools-reference. Bears on R14 and Q1: "keeps making progress while a question waits" is true of the agents it launched, not of the session.

## Shelf table
Shelf lane, 2026-11-03, reads `REQUIREMENTS.md` only; URL opened for every row; no winner.

| System | Shalls covered | Shalls missed | URL opened |
|---|---|---|---|
| Kiro specs + steering (AWS) | R2 (requirements / design / tasks files under `.kiro/specs/`); R19 partial (steering `product.md` holds purpose, users, features, objectives; no "not worth doing" line); S5 partial (phase review via a Review button; Quick Spec skips the gates); R13 partial (tasks in parallel waves) | R3, R5, R6, R7 (gate is a button, not a line), R8, R11, R14, R18, R10 | https://kiro.dev/docs/specs/ · https://kiro.dev/docs/steering/ |
| GitHub Spec Kit | R2 (constitution / spec / plan / tasks per feature); R19 partial (constitution and specify before any build); R3/S4 partial (clarify step); S5 partial (review each result before continuing) | R6, R7 (review in chat), R8, R11, R14, R18 (no retrospective) | https://github.com/github/spec-kit |
| Devin 2.1 | S5 (confidence colour at start and after the plan); R11/R12 partial (asks only when not green); R14 ("will proceed automatically and accept async feedback"); pauses when unsure, in chat | R19, R2, R6, R7, R8, R18, R10 | https://cognition.com/blog/devin-2-1 |
| Google Jules | S5 (plan reviewed and approved before code); R14 partial (notified when it needs input) | R19, R6, R7 (a click), R8, R11, R18, R2, R10 | https://jules.google/docs |
| Temporal Approval pattern | R8/R14 partial (workflow blocks on a Signal; worker idles at no cost); R11 partial (timeout fallback, late Signals handled) | R19, R6, R7, R18, R2, R10, R12 | https://docs.temporal.io/design-patterns/approval |
| Reflexion (NeurIPS 2023) | R18 partial (reflective text in an episodic memory for the next trial) | R19, R6, R7, R8, R14, R2, R10, R11; no human in the loop | https://arxiv.org/abs/2303.11366 |
| OpenAI Codex ExecPlans | R2 partial (one living plan document per feature); R18 (mandatory "Outcomes & Retrospective", "Surprises & Discoveries", "Decision Log"); R10 partial (every revision notes the change and why); R11 partial (state assumptions, give alternatives); R14 ("do not prompt the user for next steps; simply proceed") | R19 (purpose only, no "not worth doing"), R7 (review optional, no gate line), R6, R8, R3, R12 | https://developers.openai.com/cookbook/articles/codex_exec_plans |
| Linear Agent Interaction Guidelines | R8/R14 partial (agent must show thinking, waiting, executing, finished; a human keeps final responsibility); S5 partial | R19, R6, R7, R11, R18, R2, R10; nothing on what to do while blocked | https://linear.app/developers/aig |
| Claude Code auto memory | R18 partial (learnings written to `MEMORY.md` across sessions); R1 partial (user-level, no setup) | R19, R6, R7, R8, R14, R2, R10 (notes are Claude's, not owner-approved) | https://code.claude.com/docs/en/memory |
| Apache Airflow HITL operators (3.1+) | R8 (task parks in `awaiting_input`, holds no worker; a link to a response page; `assigned_users`); R14 partial (only the dependent branch waits); R11 partial (`response_timeout` with defaults) | R19, R6, R7, R18, R2, R10, R12 | https://airflow.apache.org/docs/apache-airflow-providers-standard/stable/operators/hitl.html |
| Cursor Plan Mode | R19 partial (asks clarifying questions before planning); S5 (plan shown first); R7 partial (plan is an editable markdown file; the go is a click) | R6, R8, R11, R14, R18, R2, R10 | https://cursor.com/docs/agent/planning |

## Motive and Goal proposals
From your round 3 answers. Each changes its line only where you write approve; reject or write your own.

### P5 · Goal, Journey, NOT
Current: `/refine_loop <Project> <task>` turns a named task into a decision the owner acts on: agents find what is findable, the owner answers at most seven typed questions a round, and one task document is morphed in place until he writes `Decided on:`.
Proposed: `/refine_loop <Project> <task>` opens with the task's Motive and Goal, drafted and approved as in the requirements loop; agents search the web and the project and report what they found and could not verify; I answer only what I alone know; once I write the go line it completes the task, keeps making progress or validating while a question waits, and ends each stretch with what was achieved, why it solves the goal, and what was learned.
Journey: type the command → approve the Motive and Goal → read found / unverified → answer what only I can → write `Go on:` → it works → confirm its assumptions when I return → read the report.
NOT: a requirements list, a system design, views; not a full agentic harness; not an inventory of the machine; not enforced by hooks.
From: Q2, "the process of motive defininte in the requirement loop"; Q1, "it should just continue making progress or validating result"; Q8, "what was acheive why it solves the goal, what was learned for the next implementation"
approve / reject / your sentence:
>

### P6 · Motive · Whole goal or a scoped-down piece
Current: scoped-down: the asking framework and the finding agents; no design levels, no views, no build
Proposed: scoped-down: the Motive process, the asking framework, the finding agents, and the loop then doing the task; no design levels, no views; not a full agentic harness
From: Q2 as above; round 1 Q10, "then goes off and completes the task"
approve / reject:
>

## Motive-level question

### Q4 · product owner · root-cause · touches Motive, R16

**Question:** Why the spring task first: because it is the hardest case of "things I cannot hand an agent", or because it is the one you need done soonest?

**What changes in the list:** "hardest case" makes the first run a test of R8 and the Motive line "whole or scoped-down" reads "proven on the hard case first"; "soonest" makes the first run a test of R14 and R16 and the loop is judged on speed to the BOM; "both" keeps the lines as they are.

>

## Requirement questions

### Q1 ★ · Builder · constraint-surfacing · touches R2, R6, R14, S2, Journey

**Question:** While the loop is working and has a question that must wait for you, how do you want to give your answer: by typing into the same terminal session, which is still running, or by writing under `>` in a `round<n>.md` file that the loop picks up the next time you run it or the next time it checks?

**Why asked:** Runner and reach: round 3 Q1 said the model keeps making progress; the fact probe says the session itself waits on an open question while its agents run on. Which way you answer decides what "the loop" is.

**What changes in the list:** "I type into the running terminal" makes the skill one long session: questions go to the terminal and the changelog, `round<n>.md` becomes a record, "confirm on return" is the first thing it shows when you next type, and the Journey's "run it again" goes away; "I write under `>` in the file" keeps the Journey: every run rebuilds its state from the task doc and changelog, writes its questions, keeps working until the session ends, and "working while it waits" lasts until then; "either, whichever comes first" needs both paths and a rule for which answer wins, a new line in R14.

>

### Q2 · Builder · boundary · touches R6, R8, R11, R14, R3

**Question:** During an unattended stretch, which of the loop's questions should the simulated owner answer so the work can go on, and which should wait for you even if the work stalls?

**Why asked:** Failure: you ranked asking only what you know first; R6 lets a stand-in answer; the only named waits are actuator moves and steps only you can do.

**What changes in the list:** "everything except actuator moves and steps only I can do" leaves R8 as the only wait and the stand-in prompt has no hold-back rule; "anything that changes the goal, the deliverable or what gets ordered waits for me" adds that list to R6 and makes the BOM a point where the loop waits; "let it answer anything and I will catch it on return" moves all risk into the confirmation round, so that round shows what was built on each assumption and costs minutes against S2.

>

### Q3 ★ · Builder · acceptance-defining · touches Goal, R7, R14, R16, R18

**Question:** On the spring task, what ends the loop: the loop deciding the BOM and the SolidWorks geometry are good enough and writing its report, or you writing something in the task doc once you have checked them?

**Why asked:** Delivered: round 3 Q3 was unclear as asked; this is the same fork on the task in front of you.

**What changes in the list:** "the loop decides and reports" makes the R18 report the end, checked against R16, and R7 keeps only the go line; "I write a line when I have checked it" adds a second gate line to R7, R14 runs until you write it, and R18 reports are interim; "it never really ends, I keep refining" makes R16 a standing deliverable and adds a rule for reopening a finished task in the same folder.

>

### Q5 · practitioner of the domain · acceptance-defining · touches R16, R18

**Question:** When the BOM arrives, what makes you reject it before reading further?

**Why asked:** Done on day one: the first run is judged on this document and nothing says what you check first.

**What changes in the list:** "a part I cannot order" adds a shall that every BOM line names a supplier and stock checked by a fact probe; "a spring that ignores a constraint I gave" adds a shall that each line names the constraints it satisfies; "no geometry note" moves the SolidWorks geometry into the same document as the BOM.

>

### Q6 · finance · quantifying · touches R14

**Question:** What may one unattended day cost, in dollars or tokens, before you would rather it stopped and waited?

**What changes in the list:** a figure becomes a budget line in the task doc and R14's "no limit" gets that one limit; "no figure, it is an important task" keeps R14 as it is; "stop at the first point where spending buys nothing" adds a should that the loop stops when validation no longer changes.

>

### Q7 · architect · boundary · touches R19, S2

**Question:** For a small task, how much of the Motive process do you want before the go line: the four Motive lines and a goal approved in one round, or as many rounds as it takes until you write go?

**Why asked:** Scope: R19 opens every task with the Motive process and gives no scaling for a two-minute task.

**What changes in the list:** "one round" makes R19 a single proposal block you approve or edit; "as many as it takes" makes R19 the requirements loop's Phase 0 repeated until you write go; "depends on the task" adds a line that the loop proposes the number in round 1.

>

## Recap
1. Q1 ★ (Builder) · answer in the running terminal, or under `>` in the file
2. Q2 (Builder) · what the stand-in may answer, what waits for you
3. Q3 ★ (Builder) · what ends the spring task: its report, or your line
4. Q4 · why the spring task first: hardest, or soonest
5. Q5 · what makes you reject the BOM before reading further
6. Q6 · what one unattended day may cost
7. Q7 · how much Motive before go on a small task
P5, P6 · approve, reject, or your sentence

## Likes and dislikes
>

## Gate
`Accepted on: <date>` at the top of `REQUIREMENTS.md`, or here: Not yet:
>
