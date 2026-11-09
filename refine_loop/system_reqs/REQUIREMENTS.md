# Requirements — refine_loop          2026-11-03 · Alex
Accepted on: —          Rounds: 4

## Motive
- Why the work: the two full loops are too heavy for most tasks; what is worth keeping from them is the discipline of what may be asked (draft)
- What I hope to get out: one command, durable across projects, that runs the same question discipline on any bounded task, with agents finding solutions before I am asked (draft · proposal P1 in round 2)
- What would make it not worth doing: if a task costs more rounds than deciding in chat, or if it only works next to the full loops (draft · proposal P2 in round 2)
- Whole goal or a scoped-down piece: scoped-down: the asking framework and the finding agents; no design levels, no views, no build (draft · proposal P3 in round 2)

## Goal
`/refine_loop <Project> <task>` turns a named task into a decision the owner acts on: agents find what is findable, the owner answers at most seven typed questions a round, and one task document is morphed in place until he writes `Decided on:`. (draft · proposal P4 in round 2)
Journey: type the command → read round1.md → answer under `>` → run it again → read the task doc → write `Decided on:` (draft · P4)   ·   NOT: a requirements list, a system design, a build, views; not an inventory of the machine; not enforced by hooks (draft · P4)

## Shall (hard)
- **R1** run as `/refine_loop` from the terminal in any project with no per-project setup · decided 2026-11-03 · a user-level skill under `~/.claude/skills/`, symlink allowed (draft, fact probe round 3) · ranked third of four, round 1 Q8; third of four again, round 3 Q5
- **R2** the loop's own files are `Task_<Project>.md`, `changelog.md` and `round<n>.md` under `refine_loop/<task>/` in the project root; what the task itself produces is written where the task says (draft, rewritten round 1; depends on P4)
- **R3** every question passes the three filters: asymmetric · the answers fork the doc · one decision, open-ended; every question is typed · decided 2026-11-03 · the count cap moved to S4, round 1 Q8 · ranked first of four, round 3 Q5
- **R4** mark a coverage map before the roles ask: seven fixed categories plus up to three the orchestrator adds for the task · decided 2026-11-03
- **R5** before any question, agents search the web and read the project's own files (firmware, configs, schematics as text), and report in the terminal what was found and what could not be verified; a fact readable from the project or the web is never asked; no inventory of the machine, no other project read · decided 2026-11-03, rewritten round 1 · ranked first of four
- **R6** run the simulated owner from pass 2 on this task's files only · decided 2026-11-03; during unattended work it also answers the loop's own questions from the record, knowing what is important and what can go on, and every such answer is logged as an assumption under R11 · rewritten round 2 (draft on the second half); on the owner's return the loop asks him to confirm each assumption first, before more is built on it · round 3 Q7
- **R7** the gate is a line the owner writes at the top of the task doc, never the chat; wording drafted by the orchestrator: `Go on: <date>` after the Motive and Goal are approved (draft; round 3 Q3 resolved to the default)
- **R8** when a step needs what an agent cannot reach (SolidWorks, Altium, an API-restricted tool, the wiring, the identity of the hardware), the loop asks the owner to do or confirm that part and continues with the rest; the owner's part ends where the communication protocol begins · rewritten round 1 · talking to hardware needs no permission; moving an actuator gets a warning and a confirmation before it proceeds · round 2 · at a step only the owner can do, the loop writes the steps, clarifies them if asked, and waits for him on that part · round 3 Q6 · escalation to `REQUIREMENTS_LOOP.md` stays available, its trigger open (draft)
- **R9** no enforcement: no hooks, no deny rules; every rule is prose the orchestrator keeps · decided 2026-11-03 · ranked second of four
- **R10** every line is the owner's or `(draft)`; nothing is deleted; every changelog entry quotes the owner's answer in `From:` (draft, inherited from the full loops)
- **R11** a blank or "don't know" is not re-asked: the loop goes on with what it knows toward the goal and logs the assumption with the date (draft, round 1 Q4)
- **R12** questions aim at the owner's goal, motive and end result, ranked by progress toward the goal and utility to him; never at a detail an agent can read (draft, round 1 Q7, Q4)
- **R13** agents are defined per task and launched when the task needs them, in parallel where they are independent: a hardware-interface agent, web-search agents for what exists and what he would not know, a team reading papers; not a fixed list (draft, round 1 Q9, Q7) · unattended default order: web search, tests against hardware, papers, building last · round 2 Q6
- **R14** once requirements are known to a good-enough degree and the owner has refined his goals, the loop goes off and completes the task, researching and building while it waits, with no limit on actions or time, and asks only as needed; while a question waits for him it keeps making progress elsewhere or validating results; an answer that contradicts work already done means stop, ask, then incorporate the change and redesign around it without restarting (draft, round 1 Q10, round 2 Q2 Q3 Q5 Q7, round 3 Q1; depends on P5) · ranked second of four, round 3 Q5
- **R16** the end result of a task is named in the task doc as a deliverable and may be refined while the task runs; for the spring task: a BOM of parts to order and the special geometry to make in SolidWorks (draft, round 2 Q1)
- **R18** every unattended stretch ends with a report: what was achieved, why it solves the goal, and what was learned for the next implementation · round 3 Q8
- **R19** the task opens with the Motive process of the requirements loop: why the work, what he hopes to get out, what would make it not worth doing, whole or scoped-down, and a goal line, drafted `(draft)` and changed only by his approval, before any agent goes off (draft, round 3 Q2)

## Should (trade-offs)
- **S1** share the question bank, the types and the round format with the two full loops, so an answer here reads the same there and an escalation carries over · weight: high (draft)
- **S2** one round costs the owner two to three minutes of reading and answering · weight: high · round 1 Q5
- **S3** the simulated owner runs on a different model from the session · weight: medium (draft, from the survey)
- **S4** at most seven questions a round · weight: low · moved from R3, round 1 Q8
- **S5** before agents go off the loop shows what was found, what could not be verified, and what it is about to send them to do and why · weight: medium · moved from R17, round 3 Q5 (unranked, gives first)
- **S6** the model is Claude for now; the model per agent and for the session is a setting · weight: low · moved from R15, round 3 Q4

## Will (deferred)
- **W1** a skill form of the two full loops, entered from this loop's escalation · phase: after two runs of this loop (draft)
- **W2** a long-running watcher agent that tunes a running system against a criterion, e.g. PID gains · phase: after the first hardware task runs · round 1 Q9
- **W3** engines other than Claude · phase: later · round 3 Q4

## Known tension
The rules that make asking valid (R3, R4, R12) against leaving the model free (R9): "when you give them too many constraints, the output quality degrades, and the model gets kind of shoved or directed into this certain way." · round 1 Q8 · when transparency (S5) collides with any of R3, R14, R1, transparency gives first · round 3 Q5
