# System Requirements Process — Template

Oct 26, 2026 · @Alex

A repeatable way to turn a goal into hard requirements, a system diagram, validated interfaces, and a build brief an agent can execute. The **core** below is what you and the model read on every project; the **appendix** is what the agent team consults. Every project gets one of these, in `system_reqs/`, from now on.

## Rules

1. **One live doc, two files.** `system_reqs/SYSTEM_REQUIREMENTS.md` is the only project document; every answer, phase, review and decision updates it in place, in the same session, before anything else is written; it is never replaced, copied into a numbered pass, or restarted. `round<n>.md` is the one other file, the question interface the owner answers in. Nothing else is created unless it is part of the system design itself (a probe log, a lane report under `lanes/` when lanes ran). Critiques, adjudications, the inventory summary, traceability, raw review findings and the candidates table are sections of the doc, the long ones under Reference at the bottom; notes about this process go to `_templates/FULL_RUN_EDITS.md`, never into the project.
2. Inventory before design; the candidates table always has a row for "extend what exists".
3. Requirements are separated by regime: shall / should / will, then stages, interfaces, budgets, acceptance; never mixed in one list.
4. Degrade visibly: every stage has a failure column and every interface a failure shape; a failure invisible to the user is a major.
5. Decisions are never deleted; a reversal keeps the old block and adds a new one. Every decision is a D-n block, a thinking frame, not a menu: the delimiters of the decision (what is fixed, what is open), the paths and ways to think about it for this problem, the frame of mind to be in, the important factors, and what would change the answer; no options listed, no default picked by the orchestrator. Each open block carries a working assumption, tagged `[D-n]` wherever the doc relies on it; the owner writes the decision under the block and the orchestrator sets its status decided with the date. When any section's content is superseded, the old text moves to `## Superseded` at the end of the doc, each entry with the section it came from, the date, and why it changed; live content is always read first.
6. Chat carries reasons, the doc carries decisions, `round<n>.md` carries questions: every open D-n block is mirrored there as a question with its working assumption; the owner answers in the round file; the orchestrator copies the answers into the D-n blocks and sets them decided. Nothing sits between the goal and the diagram but the requirements.

## The process

Seven phases, two gate reviews. Phases 0–4 iterate in place: when an answer moves a hard requirement, candidates are re-scored by one new lane on the new option, the old table moves to Superseded with the date and the why, and the doc is re-evaluated to design proposed; nothing is restarted. Nothing is built before *design settled*.

```
 0 Classify --> 1 Constrain <--> 2 Ask by role <--> 3 Research lanes
      goal,          shall/        rounds,            parallel agents,
      inventory      should/will   decisions table    scored per shall
                                                              |
      +-------------------------------------------------------+
      v
 4 Specify --> [review: design PROPOSED] --> 5 Validate interfaces --> 6 Setup + handoff
   stages,       agent team, 0 open majors       probes from the runner,    keys, layout,
   interfaces,   (or accepted in writing)        then one e2e trace;        HANDOFF.md
   budgets             ^                         [review: design SETTLED]
                       |  open major: re-score or accept in writing
                       +------------------------------------------------
```

| Phase | Produces | Exit test |
| --- | --- | --- |
| 0 Classify | **Motive** (why the work, what I hope to get out, what would make it not worth doing, whole goal or a scoped-down piece), goal sentence, user journey, 3 off-nominal journeys, what it is NOT (Motive is the owner's four lines; Q&A transcripts go to round files, never the doc), **inventory** of what already exists (tagged proven here / proven elsewhere / unproven; built once, appended afterwards, rebuilt only on the owner's request; summary in the doc, full list in the orchestrator's context) | **Goal critique**: the user role and the staff engineer read motive + goal cold and return findings that quote the line and name the gap; the owner rewrites the goal sentence himself |
| 1 Constrain | **Shall** (hard requirements) · **should** (trade-offs, weighted) · **will, phase N** (deferred) · one known tension · budget table | At least one shall and one named tension |
| 2 Ask by role | Rounds of 6–9 questions grouped by role; every open question becomes a Decision block (D-n: the five thinking-frame lines and a working assumption; no options, no default) and is mirrored into `round<n>.md` | No question is asked in chat; every open decision has a working assumption tagged `[D-n]` wherever the doc relies on it |
| 3 Research lanes | The orchestrator names ≤ 5 architecture families in chat (owner may veto), then one lane per family plus one for open-source implementations, on Sonnet (bounded search); each lane returns ≤ 2 radically different candidates and a named back-up, per Appendix B. Lane briefs carry the first milestone's measured inputs | Every surviving candidate scored on every shall; candidates that differ only in name are merged and the table says what the real difference is; the pick is a Decision block (D-n), never a chat question; a reopened decision keeps its old block and gets a new one |
| 4 Specify | System diagram · stages (with the failure column) · interfaces (5 columns) · budgets · **Proposed** (recommendation, implementation, folder layout, what the user sees, one real sample output) · acceptance with a first milestone | **Design proposed**: agent-team review, clustered by root cause, every cluster adjudicated and the doc edited for each fix before Phase 5; on every re-evaluation the checklist under Run without stopping is walked, and the gate's state is read from the doc, never from chat |
| 5 Validate interfaces | Every interface row probed from the runtime environment, in parallel; then one thin end-to-end trace kept as milestone 1 | **Design settled**: all rows green or red with a workaround; second agent-team review |
| 6 Setup and handoff | Keys, installs, repo layout as in Proposed (or Superseded says why not), `HANDOFF.md` beside the doc in `system_reqs/` | An agent with only the repo and the doc builds without asking. No HANDOFF.md before design settled, except a tracer: a first milestone built early as a probe, named as such in Decisions |

**Run without stopping.** The orchestrator runs Phases 0–4 without stopping. Where an answer from the owner is needed, it writes a D-n block with a marked working assumption, mirrors it into the round file, and continues. The owner answers in one place, the round file, at *design proposed* and again at *design settled*. If an answer moves a shall, the doc is re-evaluated to design proposed in place, live, with no stop and no new pass; old text goes to Superseded with the why. On every re-evaluation: each answered D-n block is set decided with the date; every `[D-n]`-tagged sentence downstream is rewritten against the answer, old text to Superseded with the why; any new decision the answers open becomes a new D-n block with a working assumption, mirrored into the next round file, never folded silently into an existing block; the adjudication rows are re-checked; and the `Design proposed on:` line gets the new date.

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
Inventory: N items, tagged proven here / proven elsewhere / unproven, summarised under Reference; the full list stays in the orchestrator's context

## Stages
| Stage | Requirement (R-id) | shall / should / will | Fails how · noticed how · ships anyway |

## Interfaces
| Boundary | What crosses (format, units, failure shape) | Probe command | Result | Owner when it changes |

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
Design proposed on: <date>   ·   Design settled on: <date>

## Acceptance
First milestone: <one thin end-to-end slice, kept>
- [ ] five consecutive runs pass … - [ ] one deliberately broken stage still ships with a warning … - [ ] budgets held

## Reference
Inventory (N items, tagged) · traceability (R-id → stage → test → interface row → probe) · candidates table (≤ 8 rows, one line on what the real difference is) · probe results · raw review findings by role · sources
Lane reports, only when lanes ran: lanes/<family>.md

## Superseded
| From section | Date | Why it changed | Old text |

## Ledger
{"date":"…"}   one JSON line per run, appended, newest last
```

## Gate review by agent team

At *design proposed* and again at *design settled*, spawn an agent team that has not seen the conversation. Each agent reads the doc cold in one role, the Proposed section as its primary object, and returns findings tagged **major** (would change a shall, a boundary, or the first milestone) or **minor**. Standing roles: architect, infrastructure, 3 a.m. operator, finance, the user, sceptic, professor of the field, staff engineer of the domain being built for. The sceptic owns the failure column. The gate passes at zero open majors; a major can be accepted with a written reason, recorded in the Decisions index as "moving forward with open major". Adjudications go under Decisions, raw findings under Reference; no review file. Reviewers run on Opus: these are diagnostic tasks with unset criteria. Each agent returns at most five findings as {section, finding, major|minor, evidence quoted from the doc}; the orchestrator clusters findings by root cause (not by shared evidence line) into at most eight clusters on one page; raw findings go under Reference in the doc; the owner adjudicates clusters, one row each.

## Question bank

Two standing questions per role; adapt the nouns. Standing forms: "How do you …?" (AWS) and "What two concerns does this choice braid together?" (Hickey).

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

**How this template is developed.** Run Phases 0–2 on a small real goal; read what it produced as a reviewer of the process, not the project; state each defect as one line; make the smallest edit (a sentence, a column, an exit test, never a phase) to the doc and the md together; log it in the change list; test it on the next pass with a different goal. Rules that hold: edits follow an artifact, never an argument alone; every change is announced and vetoed or approved before it lands; anything adopted from outside is explained in plain words first; the owner's ideas are backed by sources, not replaced; the owner alone rewrites the goal; cost and model choices are written down.

**A. Traceability.** One table under Reference in the project document: R-id → stage → acceptance test → interface row → probe result. Two filters are the whole check: every shall has a stage, every stage has a test.

**B. Research lanes.** Each lane returns at most two radically different candidates ranked against every shall, URLs actually opened, UNVERIFIED marks (an UNVERIFIED fact may lower a score, never raise one), the range at which each candidate passes, and a named back-up. The lane brief carries the first milestone's measured inputs (sizes, counts, one real sample). One lane always searches open-source implementations of the thing being built. The merged table is ≤ 8 rows, under Reference in the project document. Re-score when a shall moves: one new lane on the new option; the old table moves to Superseded with the date and the why.

**C. Interfaces.** The five-column row is a lightweight Interface Control Document: the agreed facts about a boundary and how it is verified, in one row, so a contract cannot exist without its probe. Probe types, cheapest first: reachability, auth, contract (a real sample against the format), cost and latency, failure mode, end-to-end. Probes are throwaway; the end-to-end trace is kept.

**D. Gate review and the failure column.** Lightweight FMEA: per stage, the way it fails, how it is noticed, what ships anyway. No scores. The sceptic agent fills it at design proposed; at design settled each row is induced once from the runner (`FAIL_STAGE=<name>`), plus a same-date rerun that must cost zero and a kill-and-resume that must continue. Goal critique (Phase 0): two reviewers on Opus, the user role and the staff engineer, read the Motive block and the Goal cold. Three questions: does the goal serve the motive; is any part of the goal a scoped-down version of a larger one the motive implies; what will have changed a month after success. Every finding quotes the line and names the gap between motive and goal, and stops there; the reviewer argues for the goal the owner says he wants, against the goal he wrote, and never proposes wording. Reviewer checklists, one line each: architect — every arrow has an interface row, every stage states what it hides; infrastructure — runner named, every host it must reach listed, schedule and margin stated; 3 a.m. operator — failure column filled per stage, one safe re-run command; finance — every figure marked measured or EST, a ceiling named; user — the journey walks against the stage table, the first milestone is judgeable; sceptic — per shall, the single boundary that breaks it, any shall without a test; professor — baseline and regression target named, uncited claims; staff engineer — under-specified units, formats, limits, anything they would refuse to sign. Once a role's checklist has caught real majors on two reviews, that role may move to Sonnet; record the change here.

**E. LLM-pipeline module (optional).** When the system is prompts plus models: `golden/` holds prompts verbatim as text with a provenance header (source path, hash); `golden/approved/` holds reviewed reference outputs diffed after scrubbing timestamps and ids; `VERSIONS.md` records the model and settings each prompt was approved under; any prompt edit re-runs approvals and updates the hash. Regex gates check shape, approvals check content.

**F. Grounding.** Each rule above has a canonical ancestor: inventory-first is Gall's law; shall/should/will is NASA SEH App. C; the failure column is the FMEA detection column (MIL-STD-1629A) and Lampson's rule that a spec must let code report failure; fail-fast is Gray 1985 and Nygard's stability patterns; decisions-never-deleted is Nygard's ADRs; interfaces-before-build is NASA Gold Rule 1.44 and Hunt & Thomas's tracer bullets; the two-level gate is PDR/CDR (GSFC-STD-1001); the agent-team review is NASA's inspection practice with the roles played by agents; the ledger is Stripe's canonical log line; contracts with pre/post/failure are Meyer's Design by Contract; the budget table is GSFC Gold Rule 1.06 margins. Principles examined and deliberately left out of the core: full ISO 29148 documents, separate IRD/ICD, review boards, FMECA scoring, DSM algorithms, nine-level TRL, 5×5 risk matrices, multi-SLO dashboards, schema registries, full hexagonal layering, SOLID beyond dependency inversion, DSPy optimizers.

**G. Conflicts resolved.** Worse-is-better vs correctness: correctness at the end-to-end check, simplicity inside stages. DRY vs a verbatim donor copy: a pinned copy with provenance is the single source inside this repo. YAGNI vs probing every boundary: only boundaries the first milestone exercises get contracts and probes. Parnas vs `src/` by stage: stages own a hidden decision, not just an order, and are replaceable behind their contract. Postel vs fail-fast: tolerant of format, strict on completeness.

**H. Lessons (TLDR\_morning\_exploration, 2026-10-26).** The reference artifact arrived after being asked for twice → ask for it in Phase 0. The best v1 candidate was in the owner's own repo, not on the web → inventory first. A hard requirement became phase 2 by round three → re-score, keep the old table. The runner could not reach half the APIs, found while building → interfaces validated before settled. The first draft of this template reached 7,500 tokens → core and appendix split.

**I. Sources.** [Saltzer & Kaashoek principles](<https://eng.libretexts.org/Bookshelves/Computer_Science/Programming_and_Computation_Fundamentals/Principles_of_Computer_System_Design_(Saltzer_and_Kaashoek)/00%3A_Front_Matter/04%3A_Computer_System_Design_Principles>) · [Lampson 1983](https://www.cs.princeton.edu/courses/archive/fall15/cos518/papers/hints-design.pdf) · [Lampson 2020](https://arxiv.org/pdf/2011.02455) · [End-to-end arguments](https://www.cs.princeton.edu/courses/archive/fall15/cos518/papers/endtoend.pdf) · [Parnas 1972](https://www.cse.sc.edu/~mgv/csce590f20/ParnasCriteria.pdf) · [Gray 1985](https://courses.cs.duke.edu/spring11/cps210/papers/Gray_computers_stop.pdf) · [Meyer 1992](https://www.kth.se/social/files/59526bfb56be5b4f17000807/meyer-92-contracts.pdf) · [ADRs](https://adr.github.io) · [Design Docs at Google](https://medium.com/@cramforce/a152f4484c6b) · [Tracer bullets](https://www.artima.com/articles/tracer-bullets-and-prototypes) · [NASA SEH 6.3 interfaces](https://www.nasa.gov/seh/6-3-interface-management) · [NASA SEH App. C](https://www.nasa.gov/seh/appendix-c-how-to-write-a-good-requirement) · [NASA SEH App. S ConOps](https://www.nasa.gov/seh/appendix-s-concept-of-operations) · [GSFC Gold Rules](https://standards.nasa.gov/sites/default/files/standards/GSFC/G/0/GSFC-STD-1000Revg_signature.pdf) · [GSFC-STD-1001 reviews](https://webarchive.library.unt.edu/web/20130213231258/http://www.goes-r.gov/syseng/docs/GSFC_STD_1001.pdf) · [SRE: SLOs](https://sre.google/sre-book/service-level-objectives/) · [SRE: postmortems](https://sre.google/sre-book/postmortem-culture/) · [Crash-only software](https://www.usenix.org/legacy/events/hotos03/tech/full_papers/candea/candea_html/) · [Stripe canonical log lines](https://stripe.com/cn/blog/canonical-log-lines) · [GitHub scheduled-workflow delays](https://docs.github.com/en/enterprise-cloud@latest/actions/monitoring-and-troubleshooting-workflows/troubleshooting-workflows/about-troubleshooting-workflows) · [Principles of chaos](https://principlesofchaos.org/) · [Pre-mortem](https://en.wikipedia.org/wiki/Pre-mortem)
