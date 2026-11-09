# Changelog — refine_loop requirements

System-level changes to `REQUIREMENTS.md` only, one entry per change, the owner's answer quoted in `From:`. Small edits are named in the next round's opener.

### Round 1

Answered 2026-11-03. R1, R4, R6, R9 unchanged. Motive and Goal not edited: four proposals carried in round 2 (P1–P4).

#### R3 · rewritten, cap moved to should
Was: ask at most seven questions a round, every one typed, every one past the three filters
Now: every question passes the three filters and is typed; the count cap is S4
From: Q8, "r5, r9, r1, r3 What I've noticed with these models is that when you give them too many constraints, the output quality degrades"

#### S4 · new should
Now: at most seven questions a round · weight: low
From: Q8, R3 ranked last of four

#### R5 · rewritten
Was: run the fact probe and the shelf lane before the owner is asked, from pass 1; no inventory: no agent reads the disk beyond the task folder
Now: before any question, agents search the web and read the project's own files and report found / could not verify in the terminal; a fact readable from the project or the web is never asked; no inventory, no other project
From: Q7, "Before asking me a question, there should be an agent that goes out and searches and looks for everything, then comes back to me ... 'this is what was found out. This is what I still couldn't verify.' ... not just ask me questions like, 'Oh, what SPI bus protocol and speed are you using?' You should be able to get that from the firmware."

#### R8 · rewritten
Was: when the task outgrows the loop, stop, write Escalate, ask whether to start REQUIREMENTS_LOOP.md
Now: when a step needs what an agent cannot reach, the loop asks the owner to do or confirm that part and continues with the rest; escalation stays available, trigger open
From: Q6, "having the interface with stuff like SolidWorks or Altium, or other places that are API-restricted or can't really be accessed by a CLI ... I have to confirm the wiring and what the hardware is. Then your job is only to interface with it through whatever communication protocol."

#### R11 · new shall
Now: a blank or "don't know" is not re-asked; the loop continues with what it knows and logs the assumption
From: Q4, "I want it to go with what it does know and continue with the loop. There's obviously a goal in mind, and it should continue with that goal."

#### R12 · new shall
Now: questions aim at goal, motive and end result, ranked by progress and utility; never at a detail an agent can read
From: Q7, "Asking the questions doesn't seem to be trying to get my goals and motives and what the end result is. It's too myopic"; Q4, "questions that are more fruitful, will be more in line with making progress and ultimate utility to me"

#### R13 · new shall
Now: agents defined per task, launched when needed, in parallel where independent
From: Q9, "Spawning an agent that's responsible for just the hardware interface. Spawning web search agents on it in parallel ... a team of researchers going through research papers"; Q7, "more versatile and can launch agents when needed"

#### R14 · new shall
Now: once requirements are good enough, the loop completes the task, working while it waits, asking only as needed
From: Q10, "it asks me based on the level of requirements and then goes off and completes the task so that it knows, to a good enough degree, what I need, and only asks me questions as needed while continuing to build."

#### R15 · new shall
Now: the model is swappable; the rules name no model
From: Q2, "I'm trying to write a micro harness around a model. The model is the engine, and I can swap out the models whenever I want to. That's not really the case right now."

#### R2 · rewritten
Was: write only the three files
Now: the three files are the loop's own; the task's outputs go where the task says
From: Q10, "continue to be building and running"; the build writes files the old line forbade

#### R7 · rewritten
Was: the gate is `Decided on: <date>`
Now: the gate is a line the owner writes in the doc; its wording depends on P4
From: Q3, "this is about requirements. The cited one isn't really a factor."; Q10, "to a good enough degree"

#### S2 · rewritten
Was: under N minutes, N open
Now: two to three minutes · weight: high
From: Q5, "Probably 2 to 3 minutes. Nothing major."

#### W2 · new will
Now: a long-running watcher agent tuning a running system against a criterion
From: Q9, "an agent that just watches the PID loop gains and tunes them according to some criteria"

#### Tension · replaced
Was: open-ended (R9) against reproducible (R1)
Now: the rules that make asking valid against leaving the model free
From: Q8, "it limits what the models are best for"

### Round 2

Answered 2026-11-03. P1–P4 left blank: Motive and Goal unchanged, re-proposed once in shorter form in round 3. Q4 confirmed R8's wording (the owner names the hardware, the agent does the rest) and R5: no change, named in the round 3 opener.

#### R6 · rewritten
Was: run the simulated owner from pass 2 on this task's files only
Now: the same, and during unattended work it answers the loop's own questions from the record, each answer logged as an assumption
From: Q5, "Any questions it had, it would have had either a simulated owner or something that would have known what's actually important and what it could continue working on."

#### R8 · rewritten
Was: the owner's part ends where the communication protocol begins
Now: the same; talking to hardware needs no permission; moving an actuator gets a warning and a confirmation first
From: Q3, "No real limits. There will be tasks where we are required to talk to hardware ... Moving actuators, I'd want some warning or confirmation that it will proceed."

#### R13 · rewritten
Was: agents defined per task, launched when needed, no order
Now: unattended default order: web search, tests against hardware, papers, building last
From: Q6, "Searching the web, testing against hardware, reading papers, building at the end of the day"

#### R14 · rewritten
Was: once requirements are good enough, the loop completes the task, working while it waits, asking only as needed
Now: after requirements are good enough and the owner's goals are refined; no limit on actions or time; a contradicting answer means stop, ask, incorporate, redesign around it, no restart
From: Q2, "I want to design and be able to refine my goals before just sending agents off to stuff I don't really care about."; Q5, "If I'm having the loop run all day, it's obviously an important task, and there's stuff to do."; Q7, "Stop, ask, and then continue ... It should incorporate that change and redesign the system around it. Doesn't have to restart, but make it fit seamlessly."

#### R16 · new shall
Now: the end result is named in the task doc as a deliverable and may be refined while the task runs; spring task: a BOM to order and the special geometry for SolidWorks
From: Q1, "This is something that I would figure out as I'm making it. For the spring task, I need a BOM of parts to order and what special geometry I need to make in solidworks."

#### R17 · new shall
Now: before agents go off the loop shows what was found, what could not be verified, what it is about to send them to do and why; the owner refines his goal first
From: Q2, "I don't feel like I have a lot of transparency into the loop function ... I want this refinement as well before going off."

#### R18 · new shall
Now: every unattended stretch ends with a report of what the system being built looks like now
From: Q6, "at the end of the day, I want to have the end say something about what the system I'm building looks like."

### Round 3

Answered 2026-11-03. Q3 ("not sure what this mean") resolved to the default: R7 keeps "a line in the doc", wording drafted by the orchestrator as `(draft)`. R1 carries the fact probe's finding as `(draft)`.

#### R19 · new shall
Now: the task opens with the Motive process of the requirements loop, drafted and changed only by approval, before any agent goes off
From: Q2, "the process of motive defininte in the requirement loop"

#### R17 · moved shall to should (S5)
From: Q5, "asking only when i know, unattended finishing, one command aywhere" — R17 unranked, so it gives first

#### R15 · moved shall to should (S6), rewritten; W3 new will
Was: the model is the engine and is swappable; the rules name no model
Now: Claude for now; model per agent and session is a setting · W3: other engines, later
From: Q4, "claude for right now, extensiblity is less important"

#### R14 · rewritten
Was: works while it waits, asks only as needed
Now: the same, and while a question waits for him it keeps making progress elsewhere or validating results
From: Q1, "it will be a model driving so it should be fine, but it should just continue making progress or validating result"

#### R8 · rewritten
Was: the owner does or confirms his part and the loop continues with the rest
Now: at a step only he can do, the loop writes the steps, clarifies them if asked, and waits for him on that part
From: Q6, "wait for me or clarify what steps"

#### R6 · rewritten
Was: stand-in answers logged as assumptions
Now: the same, and on his return the loop asks him to confirm each assumption first
From: Q7, "confirm on return"

#### R18 · rewritten
Was: a report of what the system looks like now
Now: what was achieved, why it solves the goal, what was learned for the next implementation
From: Q8, "what was acheive why it solves the goal, what was learned for the next implementation"

#### Tension · extended
Now: transparency gives first against R3, R14, R1
From: Q5, as above
