# Round 1 — refine_loop requirements          2026-11-03

Pass 1. Answered 2026-11-03 in chat, copied here verbatim by the orchestrator. No agent launched. The shelf table below is read from `reports/Agent loop architectures survey.md` and its notes, where the URLs were opened on 2026-11-03; no new lane ran. No simulated owner: there is no record yet.

## What the last round changed
Nothing: this is the first draft. R1, R3, R4, R5, R6, R8 and R9 carry your decisions of 2026-11-03; every other line is `(draft)`.

## Coverage map
- **Scope and NOT** — Clear · the decisions name the files, the cap, the agents, the gate; the NOT line is drafted · Q6 confirms the edge
- **Delivered** — Partial · nothing says what the Decision section holds or who reads it next · Q3
- **Numbers** — Missing · seven questions is the only number; no minutes per round, no pass cap · Q5
- **Failure** — Missing · nothing says what the loop does with a blank answer, or how you notice a wrong decision after `Decided on:` · Q4
- **Runner, reach and cost** — Partial · a Claude Code user skill, any project; which model the agents run on and what a pass may cost are open · not asked this round; S3 holds the working choice, cost follows Q5's number
- **Shelf and history** — Partial · the shelf half is in the table; the history half, what you did with such tasks before, is yours · Q1, Q7
- **Done on day one** — Missing · no line says what the first run must show for you to run it again · Q10
- **Tension** — Partial · drafted from the survey, not your words · Q8

## Shelf table
Rows read from the survey; URLs opened by the survey agents 2026-11-03. No winner.

| System | Shalls covered | Shalls missed | URL opened |
|---|---|---|---|
| Claude Code plan mode + AskUserQuestion | R1 (terminal, any project); asks before acting | R2, R7 (state in chat, no gate line in a doc); R3 (untyped, unfiltered); R5 (no finding agents by rule) | https://code.claude.com/docs/en/best-practices |
| Spec Kit `/speckit.clarify` | R3 (≤ 5 sequential questions against a coverage taxonomy); R2-ish (per-feature `spec.md`); R7-ish (reviewer-owned `[x]`) | R1 (per-project install, branch per feature); R5; R6 | https://github.com/github/spec-kit |
| Kiro specs | R2 (three markdown files); approval between phases | R1 (IDE only); R3; R7 (approval in the UI, not the doc) | https://kiro.dev/docs/specs/ |
| OpenSpec | R2 (one change folder per task, dated archive) | R7 ("dependencies are enablers, not gates"); R3 | https://github.com/Fission-AI/OpenSpec |
| ralph-loop plugin | R1 (terminal loop, any project) | R3, R7 ("Not good for: Tasks requiring human judgment or design decisions"; a completion promise, not an owner line) | https://github.com/anthropics/claude-plugins-official/tree/main/plugins/ralph-loop |
| Claude Code `/goal` | R1; a separate judge decides done | R7 (the evaluator "doesn't run commands or read files"); R3 | https://code.claude.com/docs/en/best-practices |
| HumanLayer RPI (research → plan → implement) | R5 (research before the plan); R7-ish (human reviews between phases) | R3 (no typed filters); R2 (plan files, no gate line) | https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/ace-fca.md |
| STORM / Co-STORM | R3 (perspective-guided question generation) | R6, R7 (no human in the loop); R2 | https://arxiv.org/abs/2402.14207 |
| Claude Code dynamic workflows | R5 (a script runs agents outside the context) | R7 ("No mid-run user input"); R9 (it is code) | https://code.claude.com/docs/en/workflows |
| BMAD advanced elicitation | R3-ish (role personas ask) | R2, R7 (accept or reject in chat); R1 (install per project) | https://github.com/bmad-code-org/BMAD-METHOD |

## Motive and Goal proposals
None this round: Motive and Goal are first drafts, confirmed or corrected by your answers below.

## Motive-level questions

### Q1 · product owner · root-cause · touches Motive, R1, S2

**Question:** Which task sitting in front of you right now would you run this on first, and how did you handle that kind of task last month without it?

**Why asked:** Motive says the full loops are too heavy; nothing says what you do today instead. The loop has to beat that, and the first task is the one the first run is judged on.

**What changes in the list:** "decided in chat with Claude" makes S2's number the time such a chat takes and R5 has to beat it; "started the full loop and stopped partway" turns the parts you skipped into NOT lines; "it sat undecided" makes Done and a pass cap about reaching any decision at all.

> I need to select springs for a system, and there are a lot of constraints. The spring selection is hard because I am designing a mechanical system at the same time. You need to have information on SolidWorks and stuff, and it's really hard There's a lot of stuff that I need that you cannot access or an agent cannot access, so that's really where the bottleneck is. Another one is being able to interface with some I2C or SPI device. That is what I used it for today, and it was decently good. It only asked me questions that I needed to

### Q2 · sceptic · pre-mortem · touches Motive, R5, R8, S2

**Question:** It is February and you have stopped typing `/refine_loop`; why?

**Why asked:** "What would make it not worth doing" is the orchestrator's draft, and the full loops' first runs each produced an edits file of rules the run dropped.

**What changes in the list:** "rounds took longer than deciding" makes S2 a shall with a number; "it asked me things it could have found" gives R5 a test (no question answerable by a probe or the shelf); "it kept telling me to escalate" loosens R8's trigger; "it did not feel like my notes" changes the task doc's shape.

> The codebase became too cumbersome. I was maintaining and trying to fix a bunch of stuff, and it just became less useful. Even in the requirements loop, there are inconsistencies in places that need to be fixed. When I'm designing these mini harnesses, it doesn't seem very deterministic. I'm not trying to write a full agentic harness. I'm trying to write a micro harness around a model. The model is the engine, and I can swap out the models whenever I want to. That's not really the case right now.

## Requirement questions

### Q3 ★ · user · acceptance-defining · touches R7, Delivered

**Question:** When you write `Decided on:`, what is in the Decision section, and who reads it next: you acting by hand, a build session, or the full requirements loop?

**Why asked:** R7 names the gate line; nothing in the list says what the loop delivers after it or what format the next reader needs.

**What changes in the list:** "me, by hand" keeps Decision as the choice, the why in your words and the first action, nothing more; "a build session" adds a shall that Decision names the files, the commands and done; "the full loop" makes R8's handoff format a shall and the task doc an input `REQUIREMENTS_LOOP.md` must read.

> Yeah, this is about requirements. The cited one isn't really a factor.

### Q4 · 3 a.m. operator · pre-mortem · touches R3, R6, Failure

**Question:** A round comes back with two questions blank and one answered "don't know"; what do you want the next round to do with them?

**Why asked:** the full loops re-ask once in shorter form, then drop with a line. R3 caps the round at seven, so a re-ask spends a slot a new question would have had.

**What changes in the list:** "re-ask once, shorter" inherits the rule and the cap counts re-asks; "decide for me and log it" adds decided-by-assumption with the date to R10 and frees the slots; "keep asking until I answer" removes the drop rule and the cap bends.

> I want it to go with what it does know and continue with the loop. There's obviously a goal in mind, and it should continue with that goal. It should think of questions that are more fruitful, will be more in line with making progress and ultimate utility to me, and be functional.

### Q5 ★ · finance · quantifying · touches S2, Numbers

**Question:** How many minutes will you give one round of reading and answering?

**Why asked:** S2 has no number, and the number sets the size of everything you read: question length, shelf rows, the task doc.

**What changes in the list:** under ten minutes caps the shelf at fewer rows and the question block at three lines; twenty to thirty keeps the full block and the table; "as long as it takes" drops S2.

> Probably 2 to 3 minutes. Nothing major.

### Q6 · architect · boundary · touches R8, NOT

**Question:** In your words, what makes a task too big for this loop: the number of parts, a decision you cannot undo, money, time, or something else?

**Why asked:** R8 says stop when the task outgrows the loop; the trigger in the draft skill (three categories still Missing, a one-way decision across parts) is the orchestrator's guess.

**What changes in the list:** each answer becomes R8's trigger in one line; "I will say when" drops the trigger and the orchestrator only proposes an escalation; "it is never too big, cut the scope" replaces Escalate with a scope-cut proposal.

> I would say having the interface with stuff like SolidWorks or Altium, or other places that are API-restricted or can't really be accessed by a CLI Hardware tasks are a big one where I have to confirm the wiring and what the hardware is. Then your job is only to interface with it through whatever communication protocol. That's a little bit different than

### Q7 · sceptic · why-not-off-the-shelf · touches R1, R3, R5, R7

**Question:** Of the shelf rows, which have you tried, and for the nearest one, which requirement is the reason it was not enough? Plan mode with AskUserQuestion is the nearest thing already in the terminal.

**Why asked:** the shelf half of the category is in the table; the history half is yours, and the reason the nearest tool fails is the shall that justifies building.

**What changes in the list:** "plan mode asks fine but the state is lost in chat" makes R2 and R7 the reason to build and the rest negotiable; "Spec Kit, too much ceremony" makes R3's cap and the NOT line the reason; "tried none" sends one row to a fact probe before pass 2 instead of a question.

> Asking the questions doesn't seem to be trying to get my goals and motives and what the end result is. It's too myopic in its approach. I need something that is more versatile and can launch agents when needed. Before asking me a question, there should be an agent that goes out and searches and looks for everything, then comes back to me, comes back to the main terminal, and communicates that: "Oh yeah, this is what was found out. This is what I still couldn't verify." Then ask me questions, not just ask me questions like, "Oh, what SPI bus protocol and speed are you using?" You should be able to get that from the firmware.

### Q8 · staff engineer · forcing-function · touches R1, R3, R5, R9, Tension

**Question:** Rank these four: any project with no setup (R1), seven questions at most (R3), agents find first (R5), no enforcement (R9). Which gives first when two collide?

**Why asked:** the tension line is drafted from the survey; R9 and R1 collide in it (prose rules are the ones a run drops silently), and R5 and R3 collide on cost.

**What changes in the list:** R9 last adds a will for one hook after the first dropped rule; R3 last makes the cap a should; R5 last makes the agents run only when the round names a question they would answer; R1 last allows per-project setup files.

> r5, r9, r1, r3 What I've noticed with these models is that when you give them too many constraints, the output quality degrades, and the model gets kind of shoved or directed into this certain way. Thinking it limits what the models are best for

### Q9 · maintainer in a year · counterfactual · touches R5, R9

**Question:** If a pass cost nothing and took no time, what would you have the agents do before you are asked that R5 does not have them do today?

**Why asked:** R5 names two agents; the full design loop has seven. The ones you would add if they were free show which shall is actually a cost ceiling.

**What changes in the list:** "run the candidates" adds a spike agent and a will; "review the task doc cold" adds the review team as a should; "nothing more" confirms R5 complete and makes the cap a scope choice, not a cost one.

> For example:
> - Spawning an agent that's responsible for just the hardware interface.
> - Spawning web search agents on it in parallel to go over what else is out there and what could help me design or build or know that I wouldn't know before.
> - Being able to go through research papers, seeing if there's anything that could help me, like a team of researchers going through research papers in Arvix. Knowing the best system for heuristically tuning some PID gain, making a system, and having an agent that just watches the PID loop gains and tunes them according to some criteria

### Q10 · product owner · acceptance-defining · touches Done on day one

**Question:** What must the first run show you, by eye, for you to run it a second time on another project?

**Why asked:** Done on day one is Missing; the first run is on a template with no run behind it, and the full loops' first runs were judged by their edits files.

**What changes in the list:** "round 1 asked nothing I could have searched" makes that R5's acceptance test; "the task doc reads like my own notes" fixes the doc's shape before the skill is written; "a decision in two passes" adds a pass cap to Numbers.

> It must only ask questions that only I have the answer to and continue to be building and running or doing whatever, researching in the meantime. It must be able to give me better results than I could achieve if I were managing the agents myself, which is the point of the refine loop: it asks me based on the level of requirements and then goes off and completes the task so that it knows, to a good enough degree, what I need, and only asks me questions as needed while continuing to build.

## Recap
1. Q1 · which task first, and how you handled such tasks without it
2. Q2 · February, you stopped using it: why
3. Q3 ★ · what is in Decision and who reads it next
4. Q4 · blanks and "don't know": re-ask, decide for you, or keep asking
5. Q5 ★ · minutes per round
6. Q6 · what makes a task too big, in your words
7. Q7 · which shelf rows you tried, and the reason the nearest failed
8. Q8 · rank R1, R3, R5, R9
9. Q9 · with free passes, what more would the agents do first
10. Q10 · what the first run must show for a second run

## Likes and dislikes
>

## Gate
`Accepted on: <date>` at the top of `REQUIREMENTS.md`, or here: Not yet:
>
