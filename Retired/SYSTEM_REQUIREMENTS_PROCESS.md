# System Requirements Process — Template

Oct 26, 2026 · @Alex

A repeatable way to turn a goal into hard requirements, a system diagram, validated interfaces, and a build brief an agent can execute. The **core** below is what you and the model read on every project; the **appendix** is what the agent team consults. Every project gets one of these, in `system_reqs/`, from now on.

## Rules

1. **One live doc, two files.** `system_reqs/SYSTEM_REQUIREMENTS.md` is the only project document; every answer, phase, review and decision updates it in place, in the same session, before anything else is written; it is never replaced, copied into a numbered pass, or restarted. `round<n>.md` is the one other file, the question interface the owner answers in. Nothing else is created unless it is part of the system design itself (a probe log, a lane report under `lanes/` when lanes ran). Critiques, adjudications, the inventory summary, traceability, raw review findings and the candidates table are sections of the doc

2. Inventory before design; the candidates table always has a row for "look for previous implementations, what exists on file and on the web, that might solidify the requirements or expose weak points".

3. Requirements are separated by regime: shall / should / will, then stages, interfaces, budgets, acceptance; never mixed in one list. They are re-derived on every pass, not patched: the goal of each pass is to characterize, refine, synthesize, operationalize and optimize the requirements, so the system built is the most functional, durable and well-structured one possible.

4. Degrade visibly: every stage has a failure column and every interface a failure shape; a failure invisible to the user is a major.

5. Decisions are never deleted; a reversal keeps the old block, moves it to #superseced section and adds a new one. Every decision is a D-n block, a thinking frame, not a menu: the delimiters of the decision (what is fixed, what is open), the paths and ways to think about it for this problem, the frame of mind to be in, the important factors, and what would change the answer; no options listed, no default picked by the orchestrator. Each open block carries a working assumption, tagged `[D-n]` wherever the doc relies on it; the owner writes the decision under the block and the orchestrator sets its status decided with the date. When any section's content is superseded, the old text moves to `## Superseded` at the end of the doc, each entry with the section it came from, the date, and why it changed; live content is always read first.

6. Chat carries reasons, the doc carries decisions, `round<n>.md` carries this pass's questions: the new decisions derived from the current requirements and design, each with its working assumption; an old block is re-asked only when its working assumption is now contradicted. The owner answers in the round file and says what he likes and does not; the round is an input to every phase of the next pass, not only an answer sheet. The orchestrator copies the answers into the D-n blocks and sets them decided. Nothing sits between the goal and the diagram but the requirements.

## The process

Nine phases, one owner gate, one agent-team review. Phases 0–4 run without stopping; the owner's one touch before the gate is rewriting the goal sentence in Phase 0. Phases 0–5 loop until the requirements meet the owner's standard: at Phase 5 the owner answers the round and accepts in writing or writes what is unsatisfactory; Phases 0–4 then re-run with the round as input: the goal is critiqued against the updated requirements, the requirements are re-derived and diffed, old text moves to Superseded with the date and the why, and new decisions are produced from the new requirements; nothing is restarted. The first pass is Phases 0, 1, 4, 5 and launches no agent: the owner sees the requirements before the critique reviewers, the lanes or the probes run. Nothing is designed before `Requirements accepted on:` is in the doc. Nothing is built before *design settled*.

```
 0 Classify --> 1 Constrain --> 2 Research lanes --> 3 Validate interfaces --> 4 Ask by role
      motive,       shall/           parallel agents,      probes from the runner:     round<n>.md,
      goal,         should/will,     scored per shall      possible / not possible     working assumptions
      journeys      tension                                                                  |
      ^                                                                                      v
      |  not yet: <what is unsatisfactory>; re-run only what changed    [5 Requirements gate: owner]
      +---------------------------------------------------------------   answers round<n>.md;
                                                                          accepts in writing
                                                                                   |
                                     Requirements accepted on: <date>              |
      +----------------------------------------------------------------------------+
      v
 6 Specify --> [7 review: design SETTLED] --> 8 Setup + handoff
   stages,       agent team, 0 open majors        keys, layout,
   interfaces,   (or accepted in writing),        HANDOFF.md
   budgets,      then one e2e trace
   Proposed           |
      ^               |  open major: re-score at 6
      +---------------+  a moved shall: acceptance to Superseded, back to 1

 first pass: 0 -> 1 -> 4 -> 5 (no critique reviewers, no lanes, no probes; nothing is launched before the owner has seen the shalls); every later pass: 0 -> 1 -> 2 -> 3 -> 4 -> 5 with round<n>.md as input
```

Phase 
- Produces 
- Exit test


0 Classify
-  **Motive** (why the work, what I hope to get out, what would make it not worth doing, whole goal or a scoped-down piece), goal sentence, user journey, 3 off-nominal journeys, what it is NOT (Motive is the owner's four lines; Q&A transcripts go to round files, never the doc), 

- **Goal critique**, every pass from the second: the user role and the staff engineer read motive + goal cold, with the current requirements and the owner's `Not yet:` line, and return findings that quote the line and name the gap; the owner rewrites the goal sentence himself, in the round file; a changed goal is an edit, old text to Superseded, never a restart


1 Constrain
- **Shall** (hard requirements) · **should** (trade-offs, weighted) · **will, phase N** (deferred) · one known tension · budget table. Derived fresh each pass by one Sonnet agent that reads cold, without the old list in its context: the motive, the goal, the inventory, the candidates table when lanes ran, and the whole of `round<n-1>.md`, likes and dislikes included; the orchestrator diffs the new set against the old, what changed goes to Superseded with the why. Patching the old list is not a pass
- At least one shall and one named tension; from the second pass, at least one requirement rewritten, added or dropped, with its why; open decisions may remain, each as a `[D-n]` working assumption


2 Research lanes
- Not on the first pass; lanes launch on the second pass, after the owner has answered `round1.md`, and after that only when a shall moved. The orchestrator names ≤ 7 architecture families in chat from the motive, the shalls and the most recent `round<n>.md`, then one lane per family plus one for open-source implementations, on Sonnet (bounded search); each lane returns ≤ 2 radically different candidates and a named back-up, per Appendix B
- Every surviving candidate scored on the motive, the goal and every shall; candidates that differ only in name are merged and the table says what the real difference is; the pick is a Decision block (D-n), never a chat question; a reopened decision keeps its old block and gets a new one


3 Validate interfaces
- Not on the first pass; probes run once a candidates table exists. Every possible and proposed interface is probed from the runtime environment, in parallel
- What is possible and not possible given the environment, and what needs to be done, written into the doc; a candidate whose interface is not possible is marked in the candidates table


4 Ask by role
- Questions grouped by role, asked fresh each pass against the current requirements and, after Phase 6, the current design; every question becomes a new Decision block (D-n: the five thinking-frame lines and a working assumption; no options, no default). `round<n>.md` carries the ten most important open decisions, ranked by impact on the goal; the rest stay in the doc as open blocks with their working assumptions, no cap on their number. An old block is re-asked only when its working assumption is now contradicted; a block the owner left blank is re-asked once in the next round, then keeps its assumption, set decided-by-assumption with the date. On the first pass the round asks only about the requirements: shall, should, will, the tension, the budget. The round ends with the gate slot and one free line: what the owner likes and does not
- No question is asked in chat; every open decision has a working assumption tagged `[D-n]` wherever the doc relies on it; `round<n>.md` is issued and the run continues to Phase 5


5 Requirements gate
- The run stops here, the only stop before the review. The owner answers `round<n>.md`; the orchestrator copies every answer into its D-n block and sets it decided with the date, and records the owner's likes and dislikes in the gate log. The owner then reads the live requirements. If they meet the owner's standard, the owner writes `Requirements accepted on: <date>` in the doc. If not, the owner writes `Not yet: <what is unsatisfactory>` in the round file; the run re-enters Phase 0 and reads the motive and goal against that line (a changed goal is an edit, old text to Superseded, never a restart), then Phases 0–4 re-run with `round<n>.md` as input: the goal is critiqued against the updated requirements, the requirements are re-derived and diffed at Phase 1, lanes re-score when a shall moved, probes re-run for interfaces that changed, Phase 4 produces new decisions from the new requirements and issues `round<n+1>.md`, and the run returns here
- The `Requirements accepted on:` line exists in the doc; the gate's state is read from the doc, never from chat. Acceptance requires a candidates table and a Phase 3 result, so the first pass ends in `Not yet:` by design. Nothing is designed before this line exists


6 Specify
- From the accepted requirements and the decided D-n blocks, the orchestrator produces: System diagram · stages (with the failure column) · interfaces (5 columns) · budgets · **Proposed** (recommendation, implementation, folder layout, what the user sees, one real sample output) · acceptance with a first milestone. Any decision the design opens becomes a D-n block with a working assumption, mirrored into the next round file; the owner answers it in the same sitting as the review adjudication
- Proposed section complete, with one real sample output and a first milestone


7 Design review
- Agent-team review of the accepted doc, clustered by root cause, every cluster adjudicated and the doc edited for each fix before Phase 8; on every re-evaluation the checklist under Run without stopping is walked; an open major sends the run back to Phase 6 for a re-score, or is accepted in writing; a major that moves a shall reopens the gate: the `Requirements accepted on:` line goes to Superseded and the run re-enters Phase 1; then one thin end-to-end trace, kept as milestone 1
- **Design settled**: zero open majors, or every open major accepted in writing; the end-to-end trace runs; `Design settled on: <date>` written in the doc


8 Setup and handoff
- Keys, installs, repo layout as in Proposed (or Superseded says why not), `HANDOFF.md` beside the doc in `system_reqs/`
- An agent with only the repo and the doc builds without asking. No HANDOFF.md before design settled, except a tracer: a first milestone built early as a probe, named as such in Decisions


**Run without stopping.** The orchestrator runs Phases 0–4 without stopping; the owner's one touch before the gate is rewriting the goal sentence in Phase 0. Where an answer from the owner is needed, it writes a D-n block with a marked working assumption, mirrors it into the round file, and continues. The run stops once before the review, at Phase 5, where the owner answers `round<n>.md` and accepts the requirements or writes what is unsatisfactory. The owner answers in one place, the round file. Every pass through Phase 5 re-evaluates the doc in place, live, with no new pass: each answered D-n block is set decided with the date; the requirements are re-derived at Phase 1 with the round as input and diffed, old text to Superseded with the why; every `[D-n]`-tagged sentence downstream is rewritten against the answer; when an answer moves a shall, candidates are re-scored by one new lane on the new option and the old table moves to Superseded; new decisions are produced at Phase 4 from the re-derived requirements, each a new D-n block with a working assumption, mirrored into the next round file; a decision the answers open is added the same way, never folded silently into an existing block; on the first pass, Phases 2 and 3 are skipped; after a review, the adjudication rows are re-checked. `Requirements accepted on:` gets its date at Phase 5 and `Design settled on:` at Phase 7; both are read from the doc, never from chat.

## The project document

Start every project with this skeleton, in this order; hard requirements and the diagram come first because they are what the reader decides against. Plant each heading before research and fill in order.

```markdown
# System Requirements — <project>          <as-of date> · <owner>

## Motive
why the work · what I hope to get out · what would make it not worth doing · whole goal or a scoped-down piece

## Goal
<one sentence>

## Hard requirements (shall)
R1 The system shall …            rationale: …
R2 …
## Trade-offs (should)           weight: high / medium / low
## Deferred (will, phase N)
Known tension: <the two that pull against each other>

## System diagram
+----------+    +----------+    +----------+
| 1 stage  |--->| 2 stage  |--->| 3 stage  |   = existing / [new] / (phase 2)
+----------+    +----------+    +----------+
every arrow is a row in Interfaces

## Journey
User journey 1..n  ·  Off-nominal 1..3  ·  What this is NOT
Inventory: N items, tagged proven here / proven elsewhere / unproven, summarised here; the full list lives under Reference, since the loop spans sessions

## Stages
| Stage | Requirement (R-id) | shall / should / will | Fails how · noticed how · ships anyway |

## Interfaces
| Boundary | What crosses (format, units, failure shape) | Probe command | Result (Phase 3: possible / not possible · Phase 7: green / red) | Owner when it changes |

## Budgets
| Resource (cost, time, tokens, hours of plumbing) | Allocation | Measured or EST | Margin |

## Proposed
System recommendation: <which candidate and why, two lines>
Design implementation: <modules and the path through them, in the owner's language>
Folder layout: <the tree as it will be>
What the user sees: <the screen, the file, the sound, the command>
Sample output: <one real output, not a description>

## Decisions
Index: | D-n | title | status: open / decided <date> |
Gate log: | round | date | accepted / not yet | what was unsatisfactory, in the owner's words |

### D1 — <what is being decided>                        status: open | decided <date>
Impact on the goal: <which shall or motive line this touches; what moves if it goes wrong>
Delimiters: <what is fixed · what is open>
Paths: <the ways to think about this, for this problem>
Frame of mind: <how to approach it>
Important factors: <what weighs, and how much>
What would change the answer: <…>
Working assumption: <x> — tagged [D1] wherever the doc relies on it
---
Decided: <owner's words, copied from round<n>.md, date>

Review adjudication: | RC-n | root cause | fix / accept | reason | edits made |
Requirements accepted on: <date>, round <n>   ·   Design settled on: <date>

## Acceptance
First milestone: <one thin end-to-end slice, kept>
- [ ] five consecutive runs pass … - [ ] one deliberately broken stage still ships with a warning … - [ ] budgets held

## Reference
Inventory (N items, tagged) · traceability (R-id → stage → test → interface row → probe) · candidates table (≤ 8 rows, one line on what the real difference is, impossible interfaces marked) · probe results (Phase 3 feasibility, Phase 7 trace) · raw review findings by role · sources
Lane reports, only when lanes ran: lanes/<family>.md

## Superseded
| From section | Date | Why it changed | Old text |

## Ledger
{"date":"…"}   one JSON line per run, appended, newest last
```

## Gate review by agent team

Once, at Phase 7, after `Requirements accepted on:` is in the doc, spawn an agent team that has not seen the conversation. Each agent reads the doc cold in one role, the accepted requirements and the decided D-n blocks as context and the Proposed section as its primary object, and returns findings tagged **major** (would change a shall, a boundary, or the first milestone) or **minor**. Standing roles: architect, infrastructure, 3 a.m. operator, finance, the user, sceptic, professor of the field, staff engineer of the domain being built for. The sceptic owns the failure column. The gate passes at zero open majors and exits to *design settled*; a major can be accepted with a written reason, recorded in the Decisions index as "moving forward with open major"; a major that moves a shall reopens the Requirements gate: the acceptance line goes to Superseded and the run re-enters Phase 1. Adjudications go under Decisions, raw findings under Reference; no review file. Reviewers run on Opus: these are diagnostic tasks with unset criteria. Each agent returns at most five findings as {section, finding, major|minor, evidence quoted from the doc}; the orchestrator clusters findings by root cause (not by shared evidence line) into at most eight clusters on one page; raw findings go under Reference in the doc; the owner adjudicates clusters, one row each.

## Question bank

Two standing questions per role; adapt the nouns. Standing forms: "How do you …?" (AWS) and "What two concerns does this choice braid together?" (Hickey). Every round file ends with the gate slot: `Accepted on: <date>` or `Not yet: <what is unsatisfactory>`.

| Role | Questions |
| --- | --- |
| Product owner / user | What is "done" on day one, in one sentence? What is the smallest thing you would judge by eye or ear before building the rest? |
| Architect | What already exists that covers part of this? What does each stage hide from the others, and what crosses each boundary? |
| Infrastructure | Where does it run, and what can that place reach? What is the deadline, the schedule, and the margin for a late or skipped trigger? |
| 3 a.m. operator | When it fails, how do you notice, and what ships anyway? What is the one command that re-runs it safely? |
| Finance | What does one unit cost, measured or estimated? Which ceiling applies now, development or steady state? |
| Sceptic | It is three months from now and this stopped working or stopped being used; why? Which single boundary is most likely to be wrong? |
| Professor of the field | What is the known-good baseline, and where is the regression target? What does the literature say fails first in this class of system? |
| Staff engineer of the domain | Which requirement is under-specified for a real deployment? What would you refuse to sign off on? |

## Ledger

One JSON line per run, appended even when everything fails. It lives at the very bottom of the project document, below Superseded, not in a separate file. It is the cost ledger, the deadline check, and the evidence for any postmortem.

```json
{"date":"2026-10-27","started":"01:04","delay_s":240,"stages":{"ingest":"ok","synth":"ok","tts":"failed: quota"},"tokens":{"in":48210,"out":9120},"usd":0.41,"versions":{"model":"claude-fable-5","prompts":"3f9a1c"},"published_at":null,"warnings":["tts failed; shipped without audio"]}
```


---

## Appendix


**A. Traceability.** One table under Reference in the project document: R-id → stage → acceptance test → interface row → probe result. Two filters are the whole check: every shall has a stage, every stage has a test.

**B. Research lanes.** Each lane returns at most two radically different candidates ranked against every shall, URLs actually opened, UNVERIFIED marks (an UNVERIFIED fact may lower a score, never raise one), the range at which each candidate passes, and a named back-up. The lane brief carries the motive, the shalls and the inventory. One lane always searches open-source implementations of the thing being built. The merged table is ≤ 8 rows, under Reference in the project document. Re-score when a shall moves: one new lane on the new option; the old table moves to Superseded with the date and the why.

**C. Interfaces.** The five-column row is a lightweight Interface Control Document: the agreed facts about a boundary and how it is verified, in one row, so a contract cannot exist without its probe. Probe types, cheapest first: reachability, auth, contract (a real sample against the format), cost and latency, failure mode, end-to-end. Phase 3 runs the cheap types, reachability, auth and contract, on every possible and proposed interface; cost and latency, failure mode and end-to-end wait for Phase 7. Probes are throwaway; the end-to-end trace is kept.

**D. Gate review and the failure column.** Lightweight FMEA: per stage, the way it fails, how it is noticed, what ships anyway. No scores. The sceptic agent fills it at the Phase 7 review; during the end-to-end trace, before design settled, each row is induced once from the runner (`FAIL_STAGE=<name>`), plus a same-date rerun that must cost zero and a kill-and-resume that must continue. Goal critique (Phase 0, every pass from the second): two reviewers on Opus, the user role and the staff engineer, read the Motive block, the Goal, the current requirements and the owner's `Not yet:` line cold. Four questions: does the goal serve the motive; is any part of the goal a scoped-down version of a larger one the motive implies; what will have changed a month after success; which requirement the goal no longer covers, or which goal line no requirement serves. Every finding quotes the line and names the gap between motive and goal, and stops there; the reviewer argues for the goal the owner says he wants, against the goal he wrote, and never proposes wording. Reviewer checklists, one line each: architect — every arrow has an interface row, every stage states what it hides; infrastructure — runner named, every host it must reach listed, schedule and margin stated; 3 a.m. operator — failure column filled per stage, one safe re-run command; finance — every figure marked measured or EST, a ceiling named; user — the journey walks against the stage table, the first milestone is judgeable; sceptic — per shall, the single boundary that breaks it, any shall without a test; professor — baseline and regression target named, uncited claims; staff engineer — under-specified units, formats, limits, anything they would refuse to sign. Once a role's checklist has caught real majors on two projects, that role may move to Sonnet; record the change here.

**E. LLM-pipeline module (optional).** When the system is prompts plus models: `golden/` holds prompts verbatim as text with a provenance header (source path, hash); `golden/approved/` holds reviewed reference outputs diffed after scrubbing timestamps and ids; `VERSIONS.md` records the model and settings each prompt was approved under; any prompt edit re-runs approvals and updates the hash. Regex gates check shape, approvals check content.

**F. Grounding.** Each rule above has a canonical ancestor: inventory-first is Gall's law; shall/should/will is NASA SEH App. C; the failure column is the FMEA detection column (MIL-STD-1629A) and Lampson's rule that a spec must let code report failure; fail-fast is Gray 1985 and Nygard's stability patterns; decisions-never-deleted is Nygard's ADRs; interfaces-before-build is NASA Gold Rule 1.44 and Hunt & Thomas's tracer bullets; the owner's requirements gate is the SRR and the agent-team review collapses PDR and CDR into one (GSFC-STD-1001); the agent-team review is NASA's inspection practice with the roles played by agents; the ledger is Stripe's canonical log line; contracts with pre/post/failure are Meyer's Design by Contract; the budget table is GSFC Gold Rule 1.06 margins. Principles examined and deliberately left out of the core: full ISO 29148 documents, separate IRD/ICD, review boards, FMECA scoring, DSM algorithms, nine-level TRL, 5×5 risk matrices, multi-SLO dashboards, schema registries, full hexagonal layering, SOLID beyond dependency inversion, DSPy optimizers.

**G. Conflicts resolved.** Worse-is-better vs correctness: correctness at the end-to-end check, simplicity inside stages. DRY vs a verbatim donor copy: a pinned copy with provenance is the single source inside this repo. YAGNI vs probing every boundary: every boundary gets a cheap probe at Phase 3; only boundaries the first milestone exercises get a contract row and the trace. Parnas vs `src/` by stage: stages own a hidden decision, not just an order, and are replaceable behind their contract. Postel vs fail-fast: tolerant of format, strict on completeness.


**H. Sources.** [Saltzer & Kaashoek principles](<https://eng.libretexts.org/Bookshelves/Computer_Science/Programming_and_Computation_Fundamentals/Principles_of_Computer_System_Design_(Saltzer_and_Kaashoek)/00%3A_Front_Matter/04%3A_Computer_System_Design_Principles>) · [Lampson 1983](https://www.cs.princeton.edu/courses/archive/fall15/cos518/papers/hints-design.pdf) · [Lampson 2020](https://arxiv.org/pdf/2011.02455) · [End-to-end arguments](https://www.cs.princeton.edu/courses/archive/fall15/cos518/papers/endtoend.pdf) · [Parnas 1972](https://www.cse.sc.edu/~mgv/csce590f20/ParnasCriteria.pdf) · [Gray 1985](https://courses.cs.duke.edu/spring11/cps210/papers/Gray_computers_stop.pdf) · [Meyer 1992](https://www.kth.se/social/files/59526bfb56be5b4f17000807/meyer-92-contracts.pdf) · [ADRs](https://adr.github.io) · [Design Docs at Google](https://medium.com/@cramforce/a152f4484c6b) · [Tracer bullets](https://www.artima.com/articles/tracer-bullets-and-prototypes) · [NASA SEH 6.3 interfaces](https://www.nasa.gov/seh/6-3-interface-management) · [NASA SEH App. C](https://www.nasa.gov/seh/appendix-c-how-to-write-a-good-requirement) · [NASA SEH App. S ConOps](https://www.nasa.gov/seh/appendix-s-concept-of-operations) · [GSFC Gold Rules](https://standards.nasa.gov/sites/default/files/standards/GSFC/G/0/GSFC-STD-1000Revg_signature.pdf) · [GSFC-STD-1001 reviews](https://webarchive.library.unt.edu/web/20130213231258/http://www.goes-r.gov/syseng/docs/GSFC_STD_1001.pdf) · [SRE: SLOs](https://sre.google/sre-book/service-level-objectives/) · [SRE: postmortems](https://sre.google/sre-book/postmortem-culture/) · [Crash-only software](https://www.usenix.org/legacy/events/hotos03/tech/full_papers/candea/candea_html/) · [Stripe canonical log lines](https://stripe.com/cn/blog/canonical-log-lines) · [GitHub scheduled-workflow delays](https://docs.github.com/en/enterprise-cloud@latest/actions/monitoring-and-troubleshooting-workflows/troubleshooting-workflows/about-troubleshooting-workflows) · [Principles of chaos](https://principlesofchaos.org/) · [Pre-mortem](https://en.wikipedia.org/wiki/Pre-mortem)
