# System Design Loop — Template

Oct 31, 2026 · @Alex · draft · first run KiCad 2026-10-31, edits 2026-11-01 to 2026-11-03

One thing: turn the accepted `REQUIREMENTS.md` into a design the owner would build from, by drafting it at four levels, asking him questions from roles, and morphing it until he writes `Settled on:`.

Input: `system_reqs/REQUIREMENTS.md` with its `Accepted on:` line. If design shows a shall cannot hold, the change goes into `system_reqs/changelog.md`, the acceptance line is cleared, and the owner re-accepts in the next design round `(draft rule)`.

## Files

- `system_design/DESIGN.md` is the running design at four levels: System, Module, Interface, File. Lean by design: one line per interface, one entry per module. Edited in place every pass, never restarted.
- `system_design/modules.md` holds the full module entries: what each module hides, what it exposes and the errors a caller sees, what it serves, its door; never its inside. How a failure is noticed and what ships stays in `interfaces.md`.
- `system_design/interfaces.md` holds the full interface rows and their probe results, so the live doc does not fill with boundaries as they are built and accepted.
- `system_design/changelog.md` records design-level changes with the owner's answer quoted in the `From:` line of each; with the answers under `>` in the rounds, this is the record of his words.
- `system_design/round<n>.md` is where the owner answers.
- `system_design/tests.md` is drafted by the Tester agent after `Settled on:`, finished by the orchestrator, written once, and is the build's acceptance sheet.
- `system_design/design_view/pass<n>/` is written by `DESIGN_VIEWS.md` after a review pass: the design drawn from several angles as explorable HTML. A snapshot, not the record; not part of the settled checklist.

Nothing else is written.

## Levels

The design is organised and optimised one level at a time. Every requirement is placed at the level where it is satisfied; a requirement may sit at more than one level, and a requirement with no level is an open slot.

### System
- decides: which modules exist, the arrows between them, milestone 1, budgets
- hard to change after build: yes

### Module
- decides: what each module hides, what it exposes, which requirements it serves
- hard to change after build: the boundary yes, the inside no

### Interface
- decides: what crosses each boundary, in what format, how it fails
- hard to change after build: yes

### File
- decides: the tree as it will be, where prompts and config live, what is installed
- hard to change after build: mostly no

Each decision that could go another way is tagged **one-way** (changing it later touches more than one module) or **two-way** (changeable inside one module without anyone noticing). One-way decisions get two alternatives with pros and cons and the owner's decision in writing. Two-way decisions the orchestrator makes and logs.

## The loop

```
 0 Read in  -->  1 Shape  -->  2 Ask by role  -->  owner answers  -->  3 Morph  -->  4 Gate
  every shall      four levels,    6–10 typed            round<n>.md         DESIGN.md         Settled <date>
  placed at a      two alternat-   questions, each       in his words,       edited in         Settled, except: …
  level; likely-   ives per one-   naming the level      decides the         place; every      Not yet: <why>
  to-change list   way door; red   and module it         one-way doors       change to            |
                   flag self-check touches                                   changelog.md         |
   ^                                                                                              |
   +------------  Not yet: proposals against the design  -----------------------------------------+
```

The orchestrator is the model in the session. One pass is 0 → 1 → 2 → answers → 3 → 4. Pass 1 launches nothing: the owner sees the first design before any agent runs. From pass 2 each phase has its agents, listed after the Gate; every later pass re-shapes only what the answers moved.

### 0 Read in

Read `REQUIREMENTS.md` and the requirements changelog. Place every shall and should at a level. From the requirements and the conversation, draft the **likely-to-change list**: the decisions that will move in six months (model, voice, delivery channel, source format, runner). This list generates the modules: each module hides one decision from it (Parnas). Lines the orchestrator inferred carry `(draft)` until the owner confirms them in a round.

### 1 Shape

The orchestrator writes or re-writes the four levels in `DESIGN.md`, in order:

- **System.** Diagram: modules and arrows, every arrow a line at the Interface level. Milestone 1: the minimal useful subset that crosses every real component end to end, kept and grown, never thrown away. Budgets: cost, time, tokens, hours of plumbing, each marked measured or EST.
- **Module.** One entry each: hides which decision · exposes what · requirements served · door. Together-or-apart is decided here: two modules that share a format, are always used together, or cannot be understood apart are one module. The full entry lives in `modules.md`.
- **Interface.** One line per boundary: what crosses, format, how it fails · how it is noticed · what ships anyway. The full row lives in `interfaces.md`.
- **File.** The tree as it will be. Top-level names say the use case, not the framework; deleting a feature deletes one folder. Prompts, rules and config are data files, not code. Install list: the tools the design names, each marked present with version · pinned · to fetch by the fact probe, one prompt per tool. The orchestrator never lists a directory.

For every one-way decision: two radically different alternatives, sketched to the key boundaries only, pros and cons, and the owner's decision slot. Design it twice is the one place options carry pros and cons. When the Alternatives lane returns more than two candidates, two go into the entry and the rest are named below it in one line each as rejected, with the why.

**Self-check, walked before the round is written.** Red flags the orchestrator can see without the owner: shallow module (interface as complex as what it hides), information leakage (one format known in two modules), temporal decomposition (modules named by when they run), pass-through layer, special-general mixture, a parameter no module reads, an error that could be defined out of existence, an unbounded log, queue or backlog, a mutating step unsafe to run twice, an external call without timeout and retry budget. Each flag is fixed in place or named in the round opener. A flag whose fix needs a fact only the owner holds becomes a question.

### 2 Ask by role

Pick the roles that fit from the bank below. Each role reads the requirements and the four levels and asks what it would need to sign off. The orchestrator keeps the 6–10 questions whose answers most change the design, ranked, top two marked.

**Coverage map, before the roles ask.** The orchestrator reads the four levels against ten categories and marks each Clear, Partial or Missing: Likely to change (every decision hidden by a named module) · Knowledge placement (every format or rule known in one place) · Failure shapes (noticed · ships anyway, per boundary) · Observability (the single line that says what the run did) · Blast radius (secrets, where they live, what a leak or bad run reaches) · Runner and installs (present · pinned · to fetch) · Cost driver (which stage dominates, which price change forces a redesign) · Milestone 1 (minimal, crosses every component, what he judges by eye or ear) · One-way doors (two alternatives, his decision in writing) · Prior art (from pass 3: every row has a disposition; before pass 3 marked Missing with the line "lane runs in pass 3"). Partial and Missing categories get slots and roles first; a Missing category left unasked gets one line saying why. The map goes into the round as one line per category, in the form `- **Observability** — Missing · no module writes the run line · Q8`.

**Order inside the phase.** The coverage map; the CTO agent, and on pass 2 the Builder and Tester agents; the Alternatives lane for any one-way entry first written this pass; the roles ask; the three filters; the simulated owner on the draft round; the round is written.

Every question is typed. Across the round these six each appear at least once:

- **likely-change** — what moves in six months; which module absorbs it
- **knowledge-placement** — this format or rule is known in two places; which one owns it
- **interface-cost** — what must the caller know; could the module derive it instead
- **errors-out-of-existence** — for this failure shape, can the operation be restated so it cannot fail; what ships anyway
- **design-it-twice** — two decompositions with their costs; which cost he accepts
- **why-not-off-the-shelf** — this existing thing almost fits; which requirement or boundary is the reason it does not

Remaining slots from: together-or-apart, boundary (what a module is NOT), reversibility (can this one-way door be made two-way, at what cost), blast-radius (what a leaked secret or a bad run can reach), observability (which single line says what the run did), quantifying, acceptance-defining (what he judges by eye or ear at milestone 1).

Three filters, stricter than the requirements loop on the first:

1. **Asymmetric** — only what the owner uniquely knows: what will change, what he will touch often, what he tried and how it failed, what he will tolerate maintaining, facts about his environment. Anything derivable from the design is the orchestrator's job in Shape, done by hand or handed to the fact probe (Agents by phase) with one prompt per fact.
2. **The answers fork the design** — each plausible answer produces a different module, boundary, tree or milestone.
3. **One decision per question, open-ended** — except design-it-twice, where the choice between the alternatives is the answer.

The first filter is tested, not trusted: from pass 2 the simulated owner (Agents by phase) answers the draft round from the record before it ships; what it answers from the record is cut or replaced, what it guesses is the owner's.

A question block:

```markdown
### Q2 · architect · knowledge-placement · Module level · touches synth, tts · serves R3, R6

**Question:** The notes.md section order is known by the script writer and by the TTS chunker. Which of them owns it when it changes?

**Why asked:** R4 fixes the spoken order; both modules currently parse the same headings. If the order changes, two modules change.

**What changes in the design:** "the writer" merges the chunker into it and TTS receives finished segments; "the chunker" makes the writer emit one blob and the chunker owns the structure; "a shared file" adds a format module both read.

>
```

The owner answers under `>` in his words or leaves it blank; a blank is asked once more in shorter form, then dropped with a line saying so. Every question is new each pass; an old one returns only if a later answer contradicted it.

The round file, in order: what the last round changed, one line each, closing with one line naming the questions the simulated owner cut or replaced; the coverage map, one line per category; the one-way decisions awaiting his word, each with its two alternatives; the questions; a recap of every question in one line so he can answer by number; one free line for what he likes and does not about the design; the gate slot.

### 3 Morph

The orchestrator re-reads the requirements and every design round, then edits the four levels in place, and the entries in `modules.md` and `interfaces.md` they point to. The threshold for a changelog entry is one test: would a builder with only `DESIGN.md` build something different?

Logged: a module added, merged, split or dropped; the decision a module hides moved; a boundary or its format changed; a requirement moved between levels; a one-way door decided; an alternative chosen or rejected; an open slot opened or resolved; milestone 1 changed. Not logged, named in the next round's opener instead: wording, a tree rename, a two-way decision, a budget figure updated.

```markdown
### Round 2

#### synth · merged with chunker
Was: script writer and TTS chunker both parsed section headings
Now: one module, emits finished segments; TTS receives audio-ready text
From: Q2, "the writer owns it, the chunker shouldn't know what a section is"

#### R10 · moved Interface → Module
From: Q5, failure reason is composed where the failure is caught, not at the Telegram boundary

#### D · runner decided one-way
Was: GitHub Actions or a Mac mini, two alternatives
Now: GitHub Actions
From: round 2 decision slot, "nothing depends on the laptop"
```

Exit test: every answered question produced a logged change, a small edit named in the next opener, or one line saying why it changed nothing.

**Review, after round 3.** Once the owner's round 3 answers are morphed in, the orchestrator launches the design review team (Agents by phase) without being asked. Its findings are clustered by root cause into at most eight, severity kept; the clusters become round 4's questions and decision slots, and the gate of pass 4 is the follow-up. The clusters are written as a `## Review` section at the end of `DESIGN.md`, one line each: root cause · severity · evidence quoted · disposition. Per-role findings are not written down. A major that moves a shall goes to the requirements changelog and clears the acceptance line. Once the clusters have been asked in round 4, answered, and morphed, the orchestrator runs `_templates/DESIGN_VIEWS.md`: the views folder is the first thing the owner opens before reading `DESIGN.md` for the settled line, and a mismatch he names there comes back as a question in the next round.

### 4 Gate

The owner reads `DESIGN.md`. The orchestrator first walks the settled checklist and writes the result at the top of the round:

- every shall placed at a level and served by a named module; every module names the one decision it hides
- every one-way decision shows two alternatives and the owner's decision in writing
- every failure shape says how it is noticed and what ships anyway
- every install is present, pinned or to fetch
- milestone 1 is the minimal useful subset and crosses every real component
- every open slot has a resolve-by stage: before build, during build, after milestone 1
- the review has run and the round carrying its clusters has been answered and morphed; zero majors stay open, or each is accepted in writing
- the coverage map reads Clear in every category, or each Partial one is an open slot with its stage
- every `## Prior art` row has a disposition: adopted in part, or rejected with the shall or answer that is the reason

`Settled on:` is available from the gate of pass 4 at the earliest, since the review runs after round 3 and its clusters need one answered round. The owner then writes one of three lines at the top of `DESIGN.md`: `Settled on: <date>`, `Settled on: <date>, except: <open slots, each with its stage>`, or `Not yet: <what is unsatisfactory>` in the round file. Not yet feeds Phase 0 of the next pass as a proposal against the design. The gate's state is the line in the doc, never the chat.

**After the review.** Once round 3's review clusters are morphed, milestone 1 may be built on the real runner while the remaining rounds run; a design change during that build is logged as any other. **After settled.** `tests.md` is drafted by the Tester agent from the design and finished by the orchestrator. When milestone 1 runs end to end on the real runner, the owner writes `Built on: <date>` under the settled line; from then on `DESIGN.md` describes what exists and edits to it are logged as supersessions.

## Agents by phase

Nothing launches on pass 1: the owner sees the first design before any agent runs. From pass 2 each agent is listed under the phase it serves, with its launch moment. It returns to the orchestrator and writes no file, with two named exceptions: the Tester agent drafts `tests.md` after the settled line and Design views writes its folder. Tool use is allowed. Each result lands in the one place it is used, named below.

### Fact probe
- phase: Shape, any level
- launches: when the orchestrator meets a fact it would otherwise assume: a version, a format, a limit, a price, whether a command or package exists; one prompt per fact, from pass 2
- does: verifies that one fact with tools, web search or a command on the runtime; no survey, no neighbours of the fact
- returns: at most three lines: the fact, confirmed or not, the command or URL that showed it · lands in: the line of `DESIGN.md` or `interfaces.md` that needed it, marked measured

### Interface probe
- phase: Shape, Interface level
- launches: from pass 2, when a decision slot depends on whether the boundary works, before that slot ships; again when the row changes
- does: one real sample against the row's format, from the runtime the system will run on
- returns: possible / not possible, with the command run · lands in: the boundary's row in `interfaces.md`

### Comparable implementations lane
- phase: Shape, pass 3, before round 3 is written
- launches: once, when the owner's round 2 answers are morphed in, without being asked; again when a shall moves or a one-way door is decided
- does: a team of three or four Sonnet agents with web search, one angle each: systems in the same domain, systems in adjacent domains with the same shape, open-source repositories, write-ups by people who built against these requirements. Each reads `REQUIREMENTS.md`, the design changelog's `From:` quotes and every round so far with the owner's answers, not the conversation, and opens every URL it cites
- returns: ≤ 4 systems per agent, merged by the orchestrator into ≤ 8 rows: system · how it decomposes into modules · shalls covered · shalls missed · which of the owner's answers it contradicts · URL opened · disposition; UNVERIFIED marks; no winner. The disposition is filled by the orchestrator in Morph of the same pass: adopted in part (which module or boundary), or rejected with the shall or answer that is the reason · lands in: a `## Prior art` section of `DESIGN.md`, one line per row, read by the design review team the same pass; a row that contradicts a one-way decision or an answer becomes a question or decision slot in round 3

### Alternatives lane
- phase: Ask by role
- launches: for every one-way decision, when its Alternatives entry is first written, from pass 2; again when a shall moves
- does: reads the decision's entry, `REQUIREMENTS.md` and the owner's answers in every round so far, not the conversation
- returns: ≤ 4 radically different candidates, URLs actually opened, UNVERIFIED marks, scored against every shall and against the owner's answers, a named back-up · lands in: the decision's entry under Alternatives, two kept, the rest named rejected
- tool use: web search; a candidate without an opened URL is dropped

### CTO and future sight
- phase: Ask by role
- launches: every pass from 2, after the coverage map
- does: reads the requirements and the four levels; web search allowed; asks what must be true for this to succeed in one month rather than merely pass, and looks at where the goal's field is heading from several perspectives
- returns: ≤ 3 questions in the question-block form, each naming the level and module it touches, and one line per finding with the URL opened · lands in: the round, where its questions compete for the 6–10 slots like any role's; the finding lines in the round opener

### Builder agent
- phase: Ask by role on pass 2; the review team on pass 3
- launches: pass 2, on the morphed design before the round is written, as the interim read; pass 3, as the builder role in the design review team. Not every pass, for the same reason as the Tester
- does: given only `REQUIREMENTS.md`, `DESIGN.md` and `modules.md`, cold, lists every question it would have to ask the owner before writing the first file, and the decisions it would make on its own
- returns: each question tagged gap to close or gap to accept; the decisions it would make itself · lands in: gaps become round questions or open slots with a stage; its self-made decisions are checked against the one-way list and any one-way one becomes a decision slot

### Tester agent
- phase: Ask by role on pass 2; the review team on pass 3; after `Settled on:`
- launches: pass 2, as the interim read once interface rows exist; pass 3, as a role in the design review team; once more after the settled line, to draft `tests.md`. Not every pass: the cold individual read is where inspections find most defects (Wiegers, Fagan), and a round holds 6–10 questions
- does: for each boundary, names the input that makes it fail and checks whether the row says how that is noticed and what ships; tools allowed for reading the repo and the web; it runs nothing against the runtime, the interface probe is the only agent that does
- returns: one line per boundary: failing input · noticed or not · what ships; a boundary it cannot answer becomes a question · lands in: the row in `interfaces.md`; questions in the round; after settled, the draft of `tests.md`

### Simulated owner
- phase: Ask by role, after the three filters, before the round is written
- launches: every pass from 2, on the draft round; never on pass 1, which has no record
- does: given `REQUIREMENTS.md`, `DESIGN.md`, both changelogs and every earlier round file with the owner's answers under `>`, not the conversation, answers every draft question as the owner, each answer tagged `from record: <quote>` or `guess`
- returns: one tag and quote per question; a question answered from the record failed the Asymmetric filter and is cut, its quote going into Morph as the owner's, or replaced; a guess means the question is the owner's · lands in: one line in the round opener naming the cut and replaced questions with their quotes

### Design review team
- phase: after Morph of pass 3, before round 4 is written
- launches: once, when the owner's round 3 answers are in and morphed, without being asked; again after majors are fixed, if he asks
- does: one agent per role, on Opus, roles picked from the bank for the project with the Builder and Tester always among them; each reads the requirements, the four levels and the `## Prior art` section without the conversation; the Professor and the Sceptic have web search and cite systems with the URL opened, the other roles have no search
- returns: ≤ 5 findings per role as {level, finding, major | minor, evidence quoted}; major = would change a boundary, a module's hidden decision, or milestone 1 · lands in: the `## Review` section of `DESIGN.md`, clustered; the clusters become round 4's questions and decision slots

### Design views
- phase: after the review's clusters have been asked, answered and morphed
- launches: once per review pass, by the orchestrator, without being asked
- does: the loop in `_templates/DESIGN_VIEWS.md` with its own agents (illustration research on the first run, one builder per delegated view), from `DESIGN.md` and the pass changelog
- returns: `system_design/design_view/pass<n>/` and `design_view/views_round<n>.md` · lands in: nothing in `DESIGN.md`; a mismatch the owner names in the views round becomes a question in the next design round

## The running design

```markdown
# Design — <project>          <as-of date> · <owner>
Settled on: —          Built on: —          Rounds: 2
Reads: system_reqs/REQUIREMENTS.md accepted <date>

## Likely to change
- model for the cognition pass · hidden by: synth
- delivery channel · hidden by: deliver
- <line> · hidden by: — (open slot, resolve before build)

## System
+---------+    +--------+    +-----+    +---------+
| backlog |--->| synth  |--->| tts |--->| deliver |     [new] / (phase B)
+---------+    +--------+    +-----+    +---------+
Milestone 1: one paper, notes.md → script → mp3 → Telegram, on the real runner, kept
Budgets
- <resource>: allocation · measured or EST · margin

## Module
### synth
- hides: which model and which prompts write the script
- exposes: segment(notes.md) → script.txt
- serves: R3 R4 R8
- door: one-way, model (decided r2)

## Interface
- synth → tts: script.txt, UTF-8, sections marked · fails: empty section · noticed: status entry + banner · ships: segment with the section named missing (interfaces.md #3)

## File
tldr/
  golden/            prompts verbatim, provenance header
  src/<module>/      one folder per module entry
  runs/<date>/       status, log line, outputs
Install: ffmpeg present · anthropic pinned 0.x · gemini-tts to fetch

## Alternatives
### Runner — one-way — decided 2026-11-02
A: GitHub Actions · pros: nothing depends on the laptop · cons: 15-min cron drift, secrets in repo settings
B: Mac mini launchd · pros: no drift, local files · cons: a machine to keep awake
Decision: A, "nothing depends on the laptop"

## Open slots
- <slot>: working choice · resolve by: before build | during build | after milestone 1

## Prior art          (from pass 3; comparable implementations lane)
- <system> · decomposes: <modules> · covers: R1 R2 · misses: R4 · contradicts: Q2 r2 "<answer>" · <URL opened> · rejected: R4
```

Rules for the design, three only:

1. **Every line is the owner's or marked draft.** A module, boundary or placement the orchestrator inferred carries `(draft)` until confirmed in a round; a one-way decision is never made by the orchestrator.
2. **The levels stay separate.** A requirement moves between levels only on an answer, with a changelog entry. The inside of a module is not described in `DESIGN.md`.
3. **Nothing is deleted.** A dropped module or rejected alternative lives in the changelog with the why. Alternatives keep their letters.

## Question bank by role

Two standing questions per role, aimed at the design; adapt the nouns. Use four to six roles per round, taking first the roles whose categories the map marks Partial or Missing. Type in brackets.

### Architect
- Which decision is each module hiding, and what changes if that decision changes? [likely-change]
- Which decisions are one-way doors, and for each, what is the second design? [design-it-twice]

### Infrastructure
- What is on the runner already, what is fetched at run time, and what is pinned? [quantifying]
- Which external call has no timeout, and what does the run do after the retries fail? [errors-out-of-existence]

### 3 a.m. operator
- Which single log line says what the run did, how long each stage took, what it cost and why it stopped? [observability]
- What is the one safe re-run, and does it post anything twice? [acceptance-defining]

### Finance
- Which stage dominates the cost, and which dependency's price or quota change forces a redesign? [quantifying]
- If the ceiling vanished, which boundary would you redraw? [counterfactual]

### User
- When stage N fails, what do you see: nothing, stale output, or degraded output? [acceptance-defining]
- Would you accept the sample output as milestone 1 by eye or ear? [acceptance-defining]

### Sceptic
- Which existing tool does most of this module, and which requirement is the reason it is not used? [why-not-off-the-shelf]
- Which single boundary is most likely to be wrong? [boundary]

### Professor of the field
- Who has built against these requirements, and what did they learn? Read `## Prior art` first; a system it missed is the first thing to ask about. [why-not-off-the-shelf]
- Are these modules steps in the processing or decisions being hidden? [knowledge-placement]

### Practitioner of the product's domain (named per project, e.g. PCB designer for KiCad)
- Which rules of the craft does the output have to obey that no shall names, and which module enforces each or lets it through unnoticed? [errors-out-of-existence]
- What do you check first when you open the output, and what makes you reject it before reading further? [acceptance-defining]

### CTO and future sight (agent, see Agents by phase)
- What are the most important parts to make sure this succeeds in one month, and not just satisfactorily? [acceptance-defining]
- Looking at the goal with web search, where is this field heading, seen from different perspectives? [likely-change]

### Staff engineer of the domain
- What is the minimal useful subset, and does it still work with the upper levels pruned? [design-it-twice]
- Which one-way door would you most like to make two-way, at what cost? [reversibility]

### Security
- Which secrets does the job hold, where do they live, and what can a leaked one reach? [blast-radius]
- What data leaves the machine, to whom? [boundary]

### Tester agent (agent, see Agents by phase)
- For each boundary, what input makes it fail, and how is that noticed? [errors-out-of-existence]
- How is the recovery path exercised before a real failure? [acceptance-defining]

### Maintainer in a year
- Which decision will look wrong in a year, and where is the record of why it was made? [likely-change]
- If you delete feature X, how many folders do you touch? [knowledge-placement]

### Builder agent (agent, see Agents by phase)
- Is every boundary specified well enough to build the module without asking? [acceptance-defining]
- Which decisions may I make myself, and which must I not re-decide? [boundary]


## After settled: tests.md

Written once from the settled design, before the first file of code. Effort goes where a shall is at stake, where a failure would be silent, and where the boundary is external or one-way. Thorough on every interface row, every failure shape and every numbered shall; light inside a module, because the inside is cheap to change and the boundary is not.

### Contract
- proves: a real sample in, output matches the row's format
- why: the format is the one-way part of the boundary

### Induced failure, one per failure shape
- proves: status entry written, degraded output ships
- why: untested error paths do not work

### Same-day rerun
- proves: costs zero, posts nothing twice
- why: the operator's one safe command is a shall

### Kill and resume
- proves: continues from where it died
- why: unattended runs die mid-way

### Numbered shall
- proves: duration, count, cost measured against the line
- why: the adjectives were already turned into numbers

### End to end
- proves: milestone 1 through every real component, kept
- why: late integration surprise

Each test is one entry: the shall or boundary it protects · how the system fails if this test is wrong · the command · the expected result. LLM stages: shape by regex gate, content by approved golden outputs, as in `SYSTEM_REQUIREMENTS_PROCESS.md` appendix E.

## Sources

Parnas 1972 (likely-to-change list, information hiding) · Parnas 1979 (minimal subset, uses relation) · Ousterhout, A Philosophy of Software Design (deep modules, design it twice, define errors out of existence, red flags) · Bezos 2015 (one-way and two-way doors) · Fowler, Who Needs an Architect (eliminate irreversibility) · Nygard ADRs and Release It (supersession, timeouts, steady state) · Google design docs (alternatives considered, review as overhead) · Oxide RFD (published vs committed) · Rust RFC template (prior art, unresolved questions by stage) · Hunt & Thomas tracer bullets · Cockburn walking skeleton · Basili perspective-based reading · Fagan 1976 and Wiegers, Peer Reviews (individual preparation finds most defects; interim reviews) · SRE launch checklist · AWS Well-Architected reliability · Stripe canonical log lines. Survey with URLs: design_loop_best_practices.md, 2026-10-31 session.
