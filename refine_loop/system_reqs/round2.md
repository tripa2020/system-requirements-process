# Round 2 — refine_loop requirements          2026-11-03

Pass 2. Agents launched: the shelf lane reran (a shall moved; 25 pages opened) and the simulated owner answered the draft of this round from the record, on a different model from the session.

## What round 1 changed
- R3 rewritten: the filters and the typing stay a shall; the count cap moved to S4 (your rank: R3 gives first)
- R5 rewritten: agents search the web and read the project's own files before any question, and report found / could not verify in the terminal
- R8 rewritten: the boundary is what an agent cannot reach, not the size of the task; you do or confirm that part, the loop continues
- R11 new: a blank or "don't know" is not re-asked; the loop goes on with what it knows and logs the assumption
- R12 new: questions aim at goal, motive and end result, ranked by progress and utility to you
- R13 new: agents defined per task, launched when needed, in parallel
- R14 new: once requirements are good enough, the loop completes the task, working while it waits
- R15 new: the model is swappable; the rules name no model
- R2 rewritten: the three files are the loop's own; the task's outputs go where the task says
- R7 rewritten: the gate stays a line in the doc; its wording waits on P4
- S2: two to three minutes a round · W2: watcher agent · Tension replaced with your Q8 words
- Small edits, not logged: R1, R5, R9 carry your rank; S3 unchanged
- Simulated owner: cut none. Q1, Q2, Q4 and Q6 were partly answered by the record and are narrowed below to the part it does not say; Q3, Q5, Q7 it could only guess.
- One fact from the shelf table that bears on R8, R13 and R14: in Claude Code only the main session can ask you; every subagent has the question tool stripped, and dynamic workflows take no mid-run input. The loop's asking has to live in the session, its agents cannot ask.

## Coverage map
- **Scope and NOT** — Partial · the goal moved from a decision to completing the task; the NOT line needs "not a full agentic harness" · P3, P4
- **Delivered** — Partial · "requirements good enough, then the task done"; what the end result is on the first task is not said · Q1
- **Numbers** — Partial · two to three minutes a round is in; how long the loop may work unattended is not · Q5
- **Failure** — Partial · blanks are settled (R11); what happens when your answer contradicts what was built meanwhile is not · Q7
- **Runner, reach and cost** — Partial · Claude Code in the terminal; which model you need to swap, and whether the loop must run outside Claude Code, is not said · Q2
- **Shelf and history** — Partial · shelf rerun below; history: today's I2C/SPI run, what it got right and missed · Q4
- **Done on day one** — Partial · "better results than if I were managing the agents myself" is in P4; what you would check first on the first run is not · Q4
- **Tension** — Clear · your Q8 words

## Shelf table
Shelf lane, 2026-11-03, reads `REQUIREMENTS.md` only; URL opened for every row; no winner.

| System | Shalls covered | Shalls missed | URL opened |
|---|---|---|---|
| Claude Code subagents (`.claude/agents/*.md`, `--agents` JSON) | R1 (user-level `~/.claude/agents` works in any project); R5 partial (subagents keep WebSearch/WebFetch and read project files); R13 (defined per project/task, background subagents run concurrently, 20 at once by default); R15 (`model:` per agent incl. `inherit`, `CLAUDE_CODE_SUBAGENT_MODEL`) | R2, R3, R4, R6, R7, R10, R11, R12, R14; R8 (AskUserQuestion is stripped from every subagent; only the main session can ask); R9 (hooks are optional, not forbidden) | https://code.claude.com/docs/en/sub-agents |
| Claude Code plan mode (`/plan`, `--permission-mode plan`) | R5 partial ("reads files, runs shell commands to explore, and writes a plan, but does not edit"); R14 partial (approve → continues in auto mode); R9 partial (prose instruction, no hook) | R2, R3, R4, R6, R10, R11, R12, R13; R7 (gate is a chat approval prompt, not a line in a doc); R8 (no "owner does this part, agent continues with the rest") | https://code.claude.com/docs/en/permission-modes |
| Claude Code `/goal` and `/loop` | R14 (goal: "keeps working toward it without you prompting each step", check-ins while background work runs, resumes on `--resume`; loop: self-paced interval, `loop.md`, Claude ends loop when done); R1 (any project, session-scoped) | R9 (`/goal` "is a wrapper around a session-scoped prompt-based Stop hook"; unavailable when `disableAllHooks`); R3, R4, R5, R7, R8, R10, R11, R12, R13; scheduled prompts "can't ask clarifying questions" | https://code.claude.com/docs/en/goal · https://code.claude.com/docs/en/scheduled-tasks |
| Claude Code dynamic workflows (`/deep-research`, `ultracode`, `.claude/workflows/*.js`) | R5 (fans out web searches, cross-checks sources, "lists that claim as unverified instead of counting it as refuted"); R13 (`agent()`, `parallel()`, `pipeline()` written per task, up to 16 concurrent); R15 partial (model per stage, falls back to session model); R14 partial (runs in background while session stays free) | R8 and R11 ("No mid-run user input"); R3, R4, R6, R7, R10, R12; R9 partial (launch needs a permission prompt/rule) | https://code.claude.com/docs/en/workflows |
| OpenAI Codex CLI custom agents (`.codex/agents/*.toml`) | R13 (per-project TOML agents, "spawning specialized agents in parallel and then collecting their results"); R15 (`model`, `model_reasoning_effort` per agent, `/model` in session); R5 partial (`codex --search` live web search); R1 | R3, R4, R6, R7, R10, R11, R12, R14; R8 (page does not say subagents can ask the user; in non-interactive runs an approval need fails the agent); R9 (Codex has a hooks system) | https://learn.chatgpt.com/docs/agent-configuration/subagents · https://learn.chatgpt.com/docs/codex/cli |
| Google Gemini CLI plan mode + subagents (`.gemini/agents/*.md`) | R5 partial ("read-only environment", research tools, pauses with `ask_user` before drafting the plan); R13 partial (markdown subagents per project with `tools`, `max_turns`; parallelism not stated); R15 (`model: inherit` per agent, `gemini -m`); R3 partial (asks only "about trade-offs or implementation options") | R2, R4, R6, R7, R8, R10, R11, R12, R14; R9 not stated; page says the CLI was replaced by Antigravity CLI on 2026-06-18 | https://geminicli.com/docs/cli/plan-mode/ · https://geminicli.com/docs/core/subagents/ |
| opencode agents (`.opencode/agents/*.md`, `opencode.json`) | R13 (per-project markdown agents; General subagent "to run multiple units of work in parallel"); R15 (`model` per agent in `provider/model-id`, subagents inherit caller's model); R5 partial (`websearch`/`webfetch` tools); R3 partial (Plan agent has `question` tool "so it can ask you clarifying questions"); R1 | R2, R4, R6, R7, R8, R10, R11, R12, R14; R9 not stated (plugins exist) | https://opencode.ai/docs/agents/ |
| HumanLayer classic SDK (`human_as_tool`, `require_approval`) | R8 partial (agent calls a human "to bring a human into the loop for any reason"; denial feedback passed back to the LLM; CLI, Slack, email channels); R15 ("supports any LLM and all major orchestration frameworks that support tool calling") | R1, R2, R3, R4, R5, R6, R7, R10, R11, R12, R13; R14 (`require_approval` blocks; async/webhooks listed as Planned); R9 (enforcement lives in the tool wrapper by design); the GitHub README now describes a different product | https://pypi.org/project/humanlayer/ · https://github.com/humanlayer/humanlayer |
| pydantic-ai deferred tools (`requires_approval`, `CallDeferred`) | R8 (tool raises `CallDeferred` for work done outside the run; results supplied later and the run resumes); R14 partial (`HandleDeferredToolCalls` "continues in a single call without needing to end and restart"); R15 partial (multi-provider; examples OpenAI only) | R1, R2, R3, R4, R5, R6, R7, R9, R10, R11, R12, R13 | https://pydantic.dev/docs/ai/tools-toolsets/deferred-tools/ |
| Ambig-SWE, "Interactive Agents to Overcome Underspecificity in SE" (Vijayvargiya et al., ICLR 2026) | R3 and R12 as a published pattern (detect underspecification, ask targeted clarifying questions, use the answer; interaction improves results "by up to 74%"); R11 partial (models "struggle to distinguish between well-specified and underspecified instructions") | R1, R2, R4, R5, R6, R7, R8, R9, R10, R13, R14, R15 | https://arxiv.org/abs/2502.13069 |
| Google Jules (async coding agent) | R14 ("works autonomously — so you can move on", "You'll be notified when the task completes or needs your input"); R7 partial (plan approved before code changes, in the app, not a line in a doc) | R1 (web app), R2, R3, R4, R5, R6, R8, R9, R10, R11, R12, R13, R15 (model not stated) | https://jules.google/docs |
| mini-swe-agent (SWE-agent org) | R15 (any model via litellm/openrouter/portkey, no tool-calling API needed); R9 (no hooks, no permission layer, "Just some 100 lines of python for the agent class", bash only); R1 (terminal, pip-installed) | R2, R3, R4, R5 (no web search), R6, R7, R8, R10, R11, R12, R13 (batch inference only), R14 | https://github.com/SWE-agent/mini-swe-agent |

## Motive and Goal proposals
Each changes its line only where you write approve. Reject or rewrite in your words.

### P1 · Motive · What I hope to get out
Current: one command, durable across projects, that runs the same question discipline on any bounded task, with agents finding solutions before I am asked
Proposed: a micro harness around a model: the model is the engine and can be swapped; one command, durable across projects, that has agents find first, asks me only what I alone know, then completes the task
From: Q2, "I'm trying to write a micro harness around a model. The model is the engine, and I can swap out the models whenever I want to."; Q10, "then goes off and completes the task"
approve / reject:
>

### P2 · Motive · What would make it not worth doing
Current: if a task costs more rounds than deciding in chat, or if it only works next to the full loops
Proposed: if the template or its code grows until maintaining it is the work; if two runs of the same task behave differently for no reason I can see
From: Q2, "The codebase became too cumbersome. I was maintaining and trying to fix a bunch of stuff, and it just became less useful ... it doesn't seem very deterministic."
approve / reject:
>

### P3 · Motive · Whole goal or a scoped-down piece
Current: scoped-down: the asking framework and the finding agents; no design levels, no views, no build
Proposed: scoped-down: the asking framework and the finding agents, and the loop then does the task; no design levels, no views; not a full agentic harness
From: Q10, "continue to be building and running or doing whatever, researching in the meantime"; Q2, "I'm not trying to write a full agentic harness."
approve / reject:
>

### P4 · Goal, Journey, NOT, Done
Current goal: `/refine_loop <Project> <task>` turns a named task into a decision the owner acts on: agents find what is findable, the owner answers at most seven typed questions a round, and one task document is morphed in place until he writes `Decided on:`.
Proposed goal: `/refine_loop <Project> <task>` has agents search the web and the project first and report what they found and could not verify, asks me only what I alone know, aimed at the end result, and once it knows what I need to a good-enough degree goes off and completes the task, working while it waits and asking again only as needed.
Proposed journey: type the command → read the found / unverified report → answer the questions only I can, two to three minutes → it works → it asks as needed → done.
Proposed NOT: a requirements list, a system design, views; not a full agentic harness; not an inventory of the machine; not enforced by hooks.
Proposed Done: better results than if I were managing the agents myself.
From: Q10, "It must only ask questions that only I have the answer to and continue to be building ... It must be able to give me better results than I could achieve if I were managing the agents myself"; Q7, "comes back to the main terminal, and communicates that: 'Oh yeah, this is what was found out. This is what I still couldn't verify.' Then ask me questions"; Q3, "this is about requirements."
approve / reject, or your sentence:
>

## Questions
Two to three minutes. Answer by number; a blank is taken as "go with what you know" and logged (R11).

### Q1 ★ · product owner · root-cause · touches P4, R14, Delivered

**Question:** On the spring task, what is the end result you want from the loop: a shortlist with part numbers, a spring spec you carry into SolidWorks, or the loop iterating with you each time the mechanism changes?

**Why asked:** the record has the task and the bottleneck (what an agent cannot access), not what "completes the task" means for it. The first run is judged on this task.

**What changes in the list:** a shortlist makes R14's "complete" a deliverable with a format; a spec for SolidWorks adds a shall that the loop hands you a file in a form the tool takes; iterating as the mechanism changes makes R14 a standing loop and adds a re-entry rule.

>
This is something that I would figure out as I'm making it. For the spring task, I need a BOM of parts to order and what special geometry I need to make in solidworks. 

### Q2 ★ · sceptic · why-not-off-the-shelf · touches R1, R15, P1

**Question:** The shelf table shows Claude Code already has plan mode, `/goal`, `/loop` and subagents with a model per agent. What do you need from a micro harness that staying inside Claude Code with those does not give you: swapping the session model, swapping the agents' models, or running the loop outside Claude Code altogether?

**Why asked:** R15 says swappable and the record says "that's not really the case right now", but not which model you cannot swap today; the answer decides whether R1's "terminal" means Claude Code or any CLI.

**What changes in the list:** the agents' models keeps R1 as is and R15 becomes a `model:` setting per agent; the session model makes R1 "any Claude Code session" with the model as a flag; outside Claude Code rewrites R1 and R9 around a runner that is not Claude Code, and S1 drops.

>
I don't feel like I have a lot of transparency into the loop function. I really know what it means, and I want this refinement as well before going off. Part of it is that I want to design and be able to refine my goals before just sending agents off to stuff I don't really care about. 

### Q3 · 3 a.m. operator · boundary · touches R14, R8

**Question:** While the loop works unattended after requirements are good enough, what is the one kind of action it must never take without asking you first: spend money, flash or power hardware, write outside the project, run past a time limit, or something else?

**Why asked:** R14 lets it work while you are away; R8 makes you the one who confirms the wiring; nothing says what it may not do on its own, and R9 means the answer is a prose rule it has to keep.

**What changes in the list:** each answer becomes one line in R14; "nothing, let it run" removes the line; "hardware" extends R8 to every physical action.

>
No real limits. There will be tasks where we are required to talk to hardware. Maybe I'd want some type of warning, but it doesn't need to be. Moving actuators, I'd want some warning or confirmation that it will proceed. 

### Q4 · user · acceptance-defining · touches Done, R5, R12

**Question:** On today's I2C/SPI run, what would you have done differently if you had been managing the agents yourself, or what did it miss?

**Why asked:** the record says it was "decently good" and "only asked me questions that I needed to"; Done is "better than managing the agents myself", and today's run is the only measure of that so far.

**What changes in the list:** "nothing" makes today's run the day-one test and R5 as written; "it should have tried the device before asking" adds a shall that the hardware agent attempts the interface before any question; "it did not tell me what it found" strengthens R5's report into a fixed first section of each round.

>
It went well. It successfully identified, after knowing what device I was using. 

### Q5 · maintainer in a year · counterfactual · touches R14, Numbers

**Question:** If you could not answer for a whole day, what should the loop have done by the time you return, and what must it not have done?

**Why asked:** R14 says it works while it waits; no number says how far it may go without you, and the full loops stop dead at a gate.

**What changes in the list:** "finished what did not need me" makes R14 bounded by the open questions only; "a time or token budget" adds a number to R14 and a budget line to the task doc; "stop and wait" makes R14 a should.

>
It should have taken its motive to the best of its goals. Any questions it had, it would have had either a simulated owner or something that would have known what's actually important and what it could continue working on. If I'm having the loop run all day, it's obviously an important task, and there's stuff to do. 
### Q6 · staff engineer · forcing-function · touches R13, R14

**Question:** Rank what an unattended hour should go to: building, searching the web, reading papers, testing against hardware.

**Why asked:** R13 names the agent kinds you listed; nothing orders them, and the loop has to pick when you are not there.

**What changes in the list:** the ranking becomes R13's default order; "depends on the task" makes the order a question the loop asks once per task in round 1.

>
Searching the web, testing against hardware, reading papers, building at the end of the day, I want to have the end say something about what the system I'm building looks like. 
### Q7 · architect · pre-mortem · touches R14, R10, Failure

**Question:** An answer of yours arrives that contradicts what the loop built while waiting: revert to the state before it built, keep it and branch, or stop and ask?

**Why asked:** R14 builds while waiting and R10 deletes nothing; the two meet the first time an answer undoes work, and the full loops never faced it because they do not build.

**What changes in the list:** revert adds a shall that the loop snapshots the project before each unattended stretch; branch adds a shall that built work is kept aside and named; ask makes contradiction a reason to stop and adds a line to R14.

>
Stop, ask, and then continue. Anything I would say wouldn't derail what it was building so much. It might have a change. It should incorporate that change and redesign the system around it. Doesn't have to restart, but make it fit seamlessly. 

## Recap
1. Q1 ★ · spring task: shortlist, SolidWorks spec, or iterating with the mechanism
2. Q2 ★ · what staying inside Claude Code does not give you; which model to swap
3. Q3 · the one thing it must never do unattended without asking
4. Q4 · today's I2C/SPI run: what you would have done differently, what it missed
5. Q5 · gone for a day: what it should have done, and not
6. Q6 · rank the unattended hour: build, web, papers, hardware
7. Q7 · an answer contradicts what it built meanwhile: revert, branch, or ask
P1–P4 · approve, reject, or your sentence

## Likes and dislikes
>

## Gate
`Accepted on: <date>` at the top of `REQUIREMENTS.md`, or here: Not yet:
>
