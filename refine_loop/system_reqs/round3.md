# Round 3 — refine_loop requirements          2026-11-03

Pass 3, written under `REQUIREMENTS_LOOP.md` as edited 2026-11-03 20:19; the earlier draft of this round was replaced. Answered 2026-11-03 in chat, copied here verbatim by the orchestrator.

## Opener

Since round 2: R6, R8, R13, R14 rewritten; R16, R17, R18 new; entries in `changelog.md` under Round 2. Not logged: your Q4 confirmed R8 (you name the device, the agent does the rest) and R5 as written.

Blanks resolved to the default, not asked again: P1–P4 (Motive and Goal stay as first drafted; the Goal line still says "a decision ... `Decided on:`" while R14 and R16 now say the loop completes a named deliverable, so the next proposal will follow from Q2 and Q3 below); the model half of round 2 Q2 (R15 stays "a setting per agent and for the session", R1 stays Claude Code).

Agents: the shelf table is carried forward unchanged, no shall moved since its run. The Builder, cold on Opus, returned three questions; all three passed the filters and are in the round as Q1, Q3 and Q4. The fact probe took the Builder's one searchable item. The simulated owner, on a different model, cut none: every question below is narrowed to what the record does not say.

Found: a skill at `~/.claude/skills/<name>/SKILL.md` loads in every project on this machine, not in Cowork or cloud sessions; that entry may be a symlink to a folder elsewhere and loads once. https://code.claude.com/docs/en/skills. Lands in R1 as `(draft)`: user-level skill, symlink allowed.

## Shelf table
Carried forward from the pass-3 run, 2026-11-03; reads `REQUIREMENTS.md` only; URL opened for every row; no winner.

| System | Shalls covered | Shalls missed | URL opened |
|---|---|---|---|
| Claude Code `/goal` | R14 (works unattended until a fresh model judges the condition met; no cap unless written in; check-ins while subagents run; resumes across sessions), R15, R18 partial (status: condition, elapsed, turns, spend, evaluator's reason) | R6 (judges, never answers for the owner), R8, R13 order, R16, R17, R18 as a picture of the system | https://code.claude.com/docs/en/goal |
| Claude Code plan mode | R17 (researches, presents a plan, owner approves or edits or says keep planning; edits blocked until approval), R14 partial, R9 partial | R6, R8, R13, R16, R18; no found/unverified split | https://code.claude.com/docs/en/permission-modes |
| Claude Code subagents | R13 (per-task Markdown agents, up to 20 in parallel, summary returns), R15 (model per subagent), R1 partial (`~/.claude/agents/`) | R13 order, R6, R8 (generic prompts, no actuator warning), R14, R17, R18 | https://code.claude.com/docs/en/sub-agents |
| AutoGen `UserProxyAgent` | R6 first half (stands in for the user, auto-replies, capped), R15 | R6 second half (no record, no judgement of importance), R11, R8, R13, R14, R17, R18 | https://microsoft.github.io/autogen/0.2/docs/reference/agentchat/user_proxy_agent/ |
| Pydantic AI `AskUser` | R6 partial (any callable answers), R11 partial (deferred questions), R3 partial (typed questions) | R6 record-based, R11 logging, R8, R13, R14, R17, R18 | https://pydantic.dev/docs/ai/harness/ask-user/index.md |
| Agno Decision Log | R11 and R6 second half (logs decisions with reasoning, alternatives, confidence; outcomes recorded; injected into the prompt), R10 partial | the simulated owner itself, R8, R13, R14, R17, R18 | https://docs.agno.com/learning/stores/decision-log |
| Google Jules | R17 (plan with assumptions shown before code; owner revises, answers, approves), R14 partial (replans on feedback), R18 partial (files, runtime, lines), R16 partial (PR) | R6 (auto-approves on a timer), R8, R13, R18 as state, R2, R7 | https://jules.google/docs/review-plan/ · https://jules.google/docs/running-tasks.md |
| Devin 2.1 | R17 (plan plus confidence colour; asks until green), R14 partial, R12 partial | R6, R8, R13 order, R16, R18, R11 | https://cognition.com/blog/devin-2-1 |
| Cursor Cloud Agents | R14 (hours on its own VM), R16 partial (PR), R18 partial (videos, logs), R13 partial | R17, R6, R8, R11, R13 order, R18 as a written state, R7 | https://cursor.com/help/ai-features/background-agents |
| Conversational HRC on ROS 2 (arXiv 2606.06061) | R8 (operator confirms before any motion), R17 partial | R6, R11, R13, R14, R16, R18 | https://arxiv.org/abs/2606.06061 |
| HAMMR (AAMAS 2026) | R8 (approval before physical action, with risk and justification), R17 partial, R13 partial | R6, R11, R14, R16, R18 | https://jyx.jyu.fi/handle/123456789/112378 |
| ALAS (arXiv 2511.03094) | R14 second half (local repair, work preserved, restore points), R10 partial | R14 first half, R6, R8, R13, R16, R17, R18 | https://arxiv.org/abs/2511.03094 |

## Motive and Goal proposals
None: round 2's were left blank and resolved to the default.

## Motive-level question

### Q2 ★ · product owner · root-cause · touches R17, R14, Goal

**Question:** "Refine my goals before sending agents off": what does that look like on screen? The loop rewriting your goal sentence with you until you approve it; a list of what you do not care about that you strike or keep; or each agent's intended job shown so you strike the ones you do not want?

**Why asked:** Done on day one and Scope: R17 is drafted from one sentence; its shape is the first screen of every task and the source of the next Goal proposal.

**What changes in the list:** "the goal sentence" makes R17 a goal round before any agent and the Goal line follows your approved sentence; "the strike list" makes R17 a NOT list the agents read; "the agent jobs" makes R17 a dispatch list you edit and R13's "when needed" becomes "when you kept it".

> the process of motive defininte in the requirement loop

## Requirement questions

### Q1 ★ · Builder · constraint-surfacing · touches R2, R6, R11, R14, R17, R18

**Question:** When the loop is working unattended and hits a question only you can answer, where are you, and how should that question reach you?

**Why asked:** Runner and reach: every other line assumes an answer to this and none states it.

**What changes in the list:** "I keep the terminal open and come back to it" makes the loop one long session that asks in the terminal and keeps working, and `round<n>.md` becomes a log rather than the way you answer; "I close it and re-run `/refine_loop` later" makes it a skill started each round that writes its questions and the R18 report, ends, and rebuilds its state from the task doc and changelog, so "working while it waits" covers only the time until the session ends; "I check from my phone or another machine" needs a channel outside the terminal, a requirement the list does not have.

> it will be a model driving so it should be fine, but it should just continue making progress or validating result

### Q3 · Builder · acceptance-defining · touches R7, R14, R17, Goal

**Question:** What exactly do you write in the task doc to tell the loop "you know enough, go do it", and is that the same line you write when the task is finished?

**Why asked:** Delivered: R7 says a line in the doc and leaves the wording open.

**What changes in the list:** "one line, something like `Go:`, and it decides when it is done" makes one gate between the questions and the work, and the end is the R18 report measured against the R16 deliverable; "two lines, `Go:` then `Done:`" splits R7 into two gates and the task doc keeps a section open until the second; "no line, it decides when requirements are good enough and shows me the summary" drops the written gate, R17's summary becomes the checkpoint and silence counts as go, which conflicts with R7 as it stands.

> not sure what this mean

### Q4 · Builder · constraint-surfacing · touches R15, S3, R6, R13

**Question:** When you say you want to swap the engine, which model do you actually want to put in, and in which seat: the session, the agents, or the simulated owner?

**Why asked:** Runner and reach: the record says swapping "is not really the case right now" and never names the model or the seat.

**What changes in the list:** "another Claude model per agent" makes R15 a `model:` line in each agent prompt plus a session flag; "a local or non-Anthropic model for the agents or the simulated owner" means agents that call that model's CLI or API, so R15 and S3 name a calling convention and R9 has to allow a little glue; "the session model itself" means the skill cannot rely on Claude Code's agent or question tools and becomes a plain prompt any CLI can run, rewriting R1 and dropping S1.

> claude for right now, extensiblity is less important

### Q5 · staff engineer · forcing-function · touches R17, R14, R3, R1, Tension

**Question:** Rank: transparency before agents go off (R17), finishing the task unattended (R14), asking only what you alone know (R3), one command on any project (R1). Which gives first?

**What changes in the list:** R17 first makes the goal round a shall that unattended work waits on; R14 first makes R17 a should and R18 the place you see it after; R3 first narrows the simulated owner's stand-in role to what the record proves; R1 first keeps everything inside what a user-level skill can do.

> asking only when i know, unattended finishing, one command aywhere

### Q6 · architect · boundary · touches R8, R14

**Question:** The spring task reaches a step only you can do in SolidWorks. Should the loop write you a precise instruction and wait, or go on with everything else and hand you the batched instructions at the end of the stretch?

**What changes in the list:** "wait" adds to R8 "stops at the first owner step"; "batch" adds "owner steps collected, the rest continues"; "depends" makes it a question the loop asks once per task in the goal round.

> wait for me or clarify what steps

### Q7 · 3 a.m. operator · pre-mortem · touches R6, R11, R18

**Question:** The simulated owner answered for you during the day and got one wrong. How do you want to find out: a list of its assumptions at the top of the report, each with what was built on it; or the loop asking you to confirm each assumption first thing when you return?

**Why asked:** Failure: R6 lets it stand in and R11 logs the assumption; nothing says how a wrong one reaches you before more is built on it.

**What changes in the list:** "the list" makes R18 open with assumptions and their dependents; "confirm first" starts each return with a confirmation round, which costs minutes against S2; "I will find it in the changelog" changes nothing.

> confirm on return

### Q8 · user · acceptance-defining · touches R18

**Question:** The report at the end of a stretch, "what the system looks like now": what must it show for you to read it in two minutes? A parts and connections diagram, the BOM so far, the open questions, what changed since the last report, or something else?

**Why asked:** Delivered: every state report on the shelf is a diff, a PR or a counter; none is a picture of a system.

**What changes in the list:** each item becomes a line of R18; "a diagram" adds a should that the loop draws, which the design-views kit already does; "what changed" makes R18 a changelog view.

> what was acheive why it solves the goal, what was learned for the next implementation

## Recap
1. Q1 ★ (Builder) · where you are when it needs you, and how the question reaches you
2. Q2 ★ · refining the goal on screen: sentence, strike list, or agent jobs
3. Q3 (Builder) · the go line, and whether it is also the done line
4. Q4 (Builder) · which model, in which seat
5. Q5 · rank R17, R14, R3, R1
6. Q6 · a SolidWorks step: wait, or batch to the end
7. Q7 · a wrong assumption: list at the top, or confirm on return
8. Q8 · what the end-of-stretch report shows

## Likes and dislikes
>

## Gate
`Accepted on: <date>` at the top of `REQUIREMENTS.md`, or here: Not yet:
>
