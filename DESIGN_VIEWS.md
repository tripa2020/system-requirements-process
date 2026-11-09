# Design Views — Template

Nov 2, 2026 · @Alex · draft · first run KiCad pass 4, 2026-11-02 (system_design/design_view/pass4/)

One thing: draw the current `DESIGN.md` from several angles, each at its own level, so the owner can see whether the design on paper is the one he imagines. A snapshot per design pass, drawn by hand, never generated. Clarity first, then look, then fidelity; currency gives first. The views are not the record; `DESIGN.md` is.

## When it runs

After a design pass in which the review team ran (SYSTEM_DESIGN_LOOP § Gate → Review), its clusters became round questions, the owner answered, and Morph applied the answers. Not on pass 1; not on a pass without a review. The orchestrator starts it without being asked; the owner's word is not needed. The views folder is the first thing he opens before reading `DESIGN.md` for the settled line.

One run = one folder `system_design/design_view/pass<n>/`, n = the design pass drawn. Earlier folders stay; nothing is regenerated. The kit in `_templates/design_views/` is copied in; the pages are written for this pass.

## Standing rules

These are the owner's answers from the first run (KiCad, `design_view/round1.md` and `round2.md`, kept under those names as the record), now defaults. A run does not ask them again.

- The reader is the owner checking his own picture. Vocabulary is the design's own: module names, R- I- D- V- M- Q- ids, never renamed.
- Files on disk, opened from `file://`: no server, no build. No library by default; the research brief may name one and the orchestrator may allow it for one view that needs it (ELK above ~15 boxes), pinned, from cdnjs, jsdelivr or unpkg only. Google Fonts only; everything else inline or in the kit.
- One visual system and one explore contract for every project (the kit): rectilinear transit diagram — System A blue, System B red, amber where the owner acts or files change hands, ink for the operator (the session, the wrapper and the shared CLI tool); stations are modules, lines are travel order, interchanges are the handoffs.
- Every box, arrow and line traces to a line in `DESIGN.md`; each page carries the pass it was drawn from.
- Status is in the panel on demand, never painted on every box.
- One claim per figure, stated in its caption and its `aria-label`; what the figure omits is named in the caption. Depth lives behind interaction, not on the canvas.
- Text in a drawing ≥ 12 px at drawn scale. Both themes from tokens. The body never scrolls sideways; only `.figwrap`, `.tablewrap` and `pre.code` scroll.
- Diagrams are explorable: a station opens to what it hides, exposes, reads, writes and its decision state; a selection lights upstream and downstream; keyboard reaches everything.
- Views: five always (System, Hierarchy, States, Flow, Agents), up to three more by the orchestrator's judgement (§ The views). Overview is the entry page, not a view. The line nav lists only the pages drawn.

## The brief

The orchestrator writes `design_view/pass<n>/BRIEF.md` before anything else. A header and five lines, this format (the date is the day of the run; n is the design pass drawn, read from the latest `### Pass <n>` heading in the design changelog, not from `Rounds:`):

```markdown
# Brief — design views pass <n>          <date>
Draws: DESIGN.md pass <n> (rounds <k>, review <date>)
Moved since last views (pass <m>): <modules added/merged/split; boundaries changed; milestone changed; doors decided> — from changelog.md
Copied forward unchanged: <views whose figures the morph did not touch, or "none, first run">
Extra views: <up to three, each with its grammar and the claim it is for> — or "none"
Omit: <what the figures must not try to show this pass, and why>
```

A view copied forward is copied from the earlier pass folder and its stamp updated; its panel reads the new `data.js`, so "unchanged" means its figures, not its panel text; the brief says so and the view's caption gains "figures unchanged since pass <m>".

**Judgement calls the orchestrator makes and records in BRIEF.md**, never asks: which modules are model steps (filled square) and which are code; which stations are yours (the gates, the review file, the skeleton, the pages you open); what the lines are called when DESIGN.md names none; which shared tool joins the subsystems under J; the default status `new` for a module the diagram does not mark; one node per templated path (`library/<MPN>/`, `runs/<n>/`); a decision without a D-number keeps its heading as id; `open[]` holds only slots still open, not the resolved, dropped or orchestrator-made ones; standing omissions carry forward until the brief lifts them.

## The views

| View | Page | Grammar | Claim it must make | Level | Drawn by |
| --- | --- | --- | --- | --- | --- |
| Overview (entry, not a view) | index.html | emblem (the System map's topology without labels, in the hero) · `.cards` gallery · legend | what is being built in one paragraph, written by the orchestrator from § System and the goal; one card per view with its grammar and claim | — | orchestrator |
| System · always | system.html | transit map (C4 L1) + one strip map per subsystem (L2) with what crosses each hop and its I-id | the subsystems, the one crossing between them, where the owner stands | System, Interface | orchestrator |
| Hierarchy · always | hierarchy.html | horizontal icicle (harness → subsystems, joint modules, your inputs, instruction docs → module → files written) + the § File tree with ownership marks | which band is wide; where the harness may write and where it may not | System, File | builder |
| States · always | states.html | statechart of a run and its steps with guards on the edges + decision board from `decisions` and `open` | every exit is a named state; what is settled and what still moves | Interface, System | builder |
| Flow · always | flow.html | flowchart beside pseudocode, step-through, one per procedure (wrapper, promote, the main cycle, the hardest check) | each procedure's branches and dead ends | Module | builder |
| Agents · always | agents.html | nested boundaries (you ⊃ session ⊃ wrapper ⊃ step cwd ⊃ sub-agent), crossings vs blocked, one-step sequence, who-sees-what table | isolation: what enters, what stops at the wall | Interface | builder |
| Temporal · optional | temporal.html | sequence diagram of one unit's life (the unit named in the brief) + swimlanes of one cycle under each driver | who delegates every external call to whom; the cap and the transaction, as DESIGN.md states them | Interface | builder |
| Files · optional | files.html | module × file adjacency matrix (reads, writes, sole writer) + bipartite crossing | every file has one writer; N files cross, nothing else | File | orchestrator |
| Other · optional, one or more within the three | <name>.html | from research/illustration_brief.md § 1(g): data lineage, decision map, per-unit journey, state of a boundary | named in the brief | named | builder |

The orchestrator draws the spine by hand first (Overview, System, Files when chosen): it fixes the station ids, the routes and the vocabulary every builder copies. The rest are built in parallel by agents from the same data, kit and exemplar.

## The kit and the explore contract

`_templates/design_views/` holds `styles.css` (tokens, both dark blocks, routes, stations, explore states, stepper, panel), `viewer.js` (select · trace · panel · layers · stepper · keyboard), `data.js` (the `HARNESS` skeleton), `page.html` (the scaffold with the figure pattern and the SVG grammar in comments), `check.py` (mechanical checks), `README.md`. Copy `styles.css`, `viewer.js`, `data.js` into the pass folder; start every page from `page.html`. A rule a page needs that the kit lacks goes in a page-local `<style>` and is reported; the orchestrator folds it into the kit after the run.

`data.js` is the one place facts live: `systems`, `modules` (id, sys, status, src, one, hides, exposes, serves, door, reads, writes, calls), `files` (id, path, kind, owner, one), `boundaries` (I-rows), `decisions`, `open`, `milestones`. Filled by hand from `DESIGN.md`, with the probe column from `interfaces.md` and the question ids from the current round (Appendix B). `one` is the orchestrator's one-sentence reading of a module, not a quote; `door` is {kind: one-way | two-way, id: the D-number if any, state: decided r<n> | working | open, text}; `milestones[].builds` lists module ids and `hours` is null where DESIGN.md gives none; file `kind` is one of instruction · input · handoff · library · run · project · harness · output · external, and `owner` is `harness` when the tree comment names none. Nodes that are not modules or files (you · inputs · sources · skeleton · gate1 · gate2 · review · promote, and any the pages add) live only in each page's `VIEW_DETAIL`; boundary `from`/`to` may use those ids. On a later pass the ids of the earlier `data.js` are kept, so copied pages and traces still resolve. Every page reads it; the panel is built from it.

The contract, which `viewer.js` enforces and `check.py` tests: `[data-node="id"]` is selectable, keyed by a module id or file id, or carrying `data-ref` to one, or a key in the page's `window.VIEW_DETAIL`; `[data-edge="a>b"]` is one hop between two node ids, one element per hop so the trace runs; `[data-layer="name"]` groups hide behind a `[data-layer-toggle][data-layer="name"]` button; `[data-stepper]` containers step `[data-step="n"]` elements with `data-note` feeding the toolbar note. The figure pattern is `section` → `.sec-head` (kicker · h2 · .claim) → `.legend` → `.toolbar` → `figure > .figwrap > svg[data-explore role="img" aria-label]` → `figcaption` with the claim and the omissions, as in `page.html`.

## The loop

```
 0 Brief  -->  1 Data  -->  2 Spine  -->  3 Builders  -->  4 Review  -->  5 Verify once  -->  6 Round
  BRIEF.md       data.js       index,        one agent per     orchestrator     1280 + 390,         views_round<n>.md
  five lines     by hand       system,       delegated view,   renders each     light + dark,       two starred
  from the       from          files;        in parallel,      page, fixes      check.py,           questions;
  changelog      DESIGN.md     by hand       same kit          or sends back    one fix batch       answers → next
                                                                                                    design round
```

### 0 Brief
Read `DESIGN.md`, `changelog.md` for the pass, and the previous views folder if one exists. Write BRIEF.md. On the first run for a project, or when the owner reopens the theme or asks for a grammar the table lacks, launch the illustration research (Agents by phase) and wait for `research/illustration_brief.md`. Exit: BRIEF.md names what moved, what is copied, what is extra.

### 1 Data
Fill `data.js` from `DESIGN.md` by the mapping in Appendix B. Every module gets reads and writes as file ids; every file id used by a module exists in `files`; every boundary row's `from` and `to` are node ids the pages will use. Exit: `node -e "require"`-free sanity — open any page, the panel finds every module.

### 2 Spine
Write `index.html`, `system.html` and, when chosen, `files.html` by hand from `page.html`. The System map fixes the station ids (`data-node`), the line names and the station shapes (code step · model step · you · interchange · file) that every builder reuses. Render once at 1280; fix label collisions; this is the exemplar. Exit: the three pages pass `check.py`; a click on a station opens the panel.

### 3 Builders
Launch one builder agent per delegated view, or per pair that shares data (Flow + States), in a single message (Appendix A). Each gets the shared preamble with its placeholders filled, its spec block, the kit paths, the exemplar and the brief. They do not edit shared files; they report needed rules. A builder's own render check catches its overlaps and clipping; the orchestrator's review (4) judges the figure; Verify once (5) is the one batch across the whole set. Exit: each returns the page path, its figures' claims, shared-file needs, and what it could not verify.

### 4 Review
The orchestrator renders every returned page itself (local server, 1280 full page) and reads the screenshot: collisions, clipping, a claim the figure does not make, a fact not in `DESIGN.md`. A small fix is made in place; a wrong figure goes back to its agent with the screenshot path and one sentence. Fold reported rules into the kit. Exit: every page accepted by eye.

### 5 Verify once
All pages together: 1280 and 390 wide, light and dark; the one-evaluate iframe check that no page's body scrolls sideways; `check.py` on every page; one fix batch; run once more; stop. The checks run over a local http server because the Playwright MCP blocks `file://`; nothing on the pages depends on the scheme (relative links, no fetch), so open `index.html` from Finder once at the end and leave it there for the owner. Publishing as an artifact is optional and secondary: the folder on disk is the deliverable; in an artifact the sub-pages' link back to the index does not resolve.

### 6 Round
Write `design_view/views_round<n>.md`: what this pass drew and what changed since the last views, one line each; the brief's open choices; two starred questions, verbatim:
- **Q1 ★** Walk the views once. Which one first showed you something that is not how you imagine the harness, and what was it? (a drawing error · a design fact you had not registered · a design you disagree with)
- **Q2 ★** Which view is too deep, which still too shallow, and what would you add or cut on each?
Then a recap by number and one free line. Answers land in two places: a mismatch that is a design fact or a disagreement becomes a line in the next design round; a drawing error and the depth answers become the next brief. No simulated owner runs here: nothing on record is about views that did not exist.

## Agents by phase

Each agent serves one phase, writes only its own output, returns to the orchestrator.

### Illustration research
- phase: Brief
- launches: the first run for a project; again only when the owner reopens the theme or names a grammar the table lacks
- does: with web search, reads `DESIGN.md` § System · Module · Interface · File once, then finds the diagram grammar per view with exemplars, three visual directions that are not the known AI defaults with one recommended, and the tools that draw explorable diagrams in self-contained HTML verified for `file://` and the artifact CSP
- returns: `design_view/research/illustration_brief.md` · lands in: the brief's extra-view choices; the kit, if a direction changes
- prompt: Appendix A1

### View builders
- phase: Builders
- launches: every run, one per delegated view or shared-data pair, all in one message
- does: reads the kit, the exemplar, `data.js`, the named `DESIGN.md` sections and the brief; writes one page; verifies it once at 1280 and 390 with the shared browser; clicks one node and one control
- returns: page path · each figure's claim · page-local rules it needed · what it could not verify · lands in: the pass folder; rules into the kit
- prompt: Appendix A2 + its spec block in A3

### Render review
- phase: Review · the orchestrator itself, no agent: an agent cannot see its own page as the owner will

## Verify once, the commands

```
cd <project>/system_design && python3 -m http.server 8765 --bind 127.0.0.1 &      # the Playwright MCP blocks file://
# Playwright MCP: resize 1280×900 → navigate each page → full-page screenshot → read it; then emulate dark and look once
# one evaluate on any page: load every page in a 390px iframe and read documentElement.scrollWidth (must equal 390)
python3 <WORKSPACE>/_templates/design_views/check.py design_view/pass<n>/*.html
pkill -f "http.server 8765"
```

## Next step, undecided
A skill (`/design-views <project> <pass>`) that writes the brief from the changelog, copies the kit, and launches Appendix A's agents from this file. Not built; this file and its prompts are the process until the owner decides.

## Sources
design_view/research/illustration_brief.md (grammars, directions, tools) · the built-in `artifact-design` and `artifact-diagramming` skills (page contract, SVG mechanics) · Tacta `.claude/skills/html-design/` (the verifier `check.py` is adapted from, the 12 px floor, the one-batch verify) · Beck, Vignelli, Birman (rectilinear transit diagrams; Beck borrowed circuit-drawing conventions) · c4model.com (levels) · bost.ocks.org/mike/miserables (adjacency matrix) · statecharts.dev.

---

## Appendix A — prompts, verbatim

Placeholders: `<WORKSPACE>` the workspace root (/Users/alex/Code_ws/active) · `<PROJECT>` the project root (e.g. <WORKSPACE>/KICAD) · `<PASS>` the pass folder (<PROJECT>/system_design/design_view/pass<n>) · `<PASS-NAME>` its last segment (pass<n>) · `<VIEW>` the page · `<SECTIONS>` the DESIGN.md sections the view draws from, chosen by the orchestrator from the view's row in § The views (pass 4 used: Flow → § Module run, loop, fpcheck, sch; Temporal → § System milestone 1, § Module, § Interface; Hierarchy → § File, § Module, § System; Agents → § Module loop, run, § Alternatives D2, § Interface I1 I2 I15 I13). Paste as the agent's prompt with the placeholders filled; do not summarise.

### A1 · Illustration research (first run, or on reopen)

```
You are a research agent. The owner is drawing a system design as explorable HTML views and wants the illustration types and a fresh visual direction found by web search, not assumed.

What the owner said (verbatim): "get a better idea of the system by viewing it in multiple ways with the correct structure and illustration, not complete but, system, temporal, block diagram, flow diagram, hierarchy, agent communication, just different ways to view the system so I know it is how I imagine it" · "ways to visualize the code, which files are called and illustrative representations that are correctly placed in html and clear" · "html front end like a nice website" · "diagram explored, not necessarily tool operated" · "I want a different theme. I've seen this theme too many times, and it's stale." Ranking: clarity, look, fidelity, currency.

The system: read <PROJECT>/system_design/DESIGN.md § System, § Module, § Interface, § File once so your recommendations fit the real content. Pages must open from file:// (no server, no build), may use CDN scripts from cdnjs/jsdelivr/unpkg only, inline SVG preferred, and must survive the claude.ai artifact CSP.

Deliver as <PROJECT>/system_design/design_view/research/illustration_brief.md and in your final message:
1. Illustration type per view — for (a) block diagram whole and per subsystem, (b) flow per procedure, (c) temporal: one unit's life and one cycle, (d) hierarchy system → subsystem → module → files, (e) agent communication: orchestrator, wrapper, sub-agents, context each receives, isolation, (f) files: which module reads and writes which, (g) any further angle these miss (state machine, data lineage, decision map): the grammar that fits and why, one or two real exemplars done well in interactive HTML (URLs), the interaction that earns its place, the legibility rules (text floor, label the arrow, one claim per figure). Consider C4 levels, sequence diagrams, swimlanes, Sankey, treemap, icicle, dependency and call graphs, adjacency matrices, timelines, explorable explanations.
2. Three visual directions that are NOT the known AI defaults (warm cream + serif + terracotta; near-black + acid green; broadsheet hairlines; purple-blue gradient; Inter/Space Grotesk; a grid-and-mono "sheet" look). For each: name, the world it comes from, a 5-token palette (light and dark hex), two Google Fonts with roles, layout concept, one motion idea, two real sites in that world (URLs), the risk. Recommend one for an engineer who wants clarity first, in three lines.
3. Tools and skills that draw explorable diagrams in self-contained HTML, verified for file:// and CDN availability: hand SVG, ELK.js, dagre + d3, cytoscape, Mermaid, markmap, any Claude Code skill or plugin that generates such diagrams. Table: tool, pinned CDN URL, global name, works from file:// (yes/no/unverified), keyboard reach, verdict per view.
4. Executable path (≤ 10 steps): which skill to load or install before drawing, which tool per view, the order to draw, the one verification pass.
Rules: cite the page read for every claim; mark unverified; prefer official docs and READMEs; WebSearch extended mode where standard is thin. Do not decide the pages' content; do not install anything.
```

### A2 · View builder, shared preamble

```
You are building one page of a small static site that visualizes a system design. Everything you need is on disk; read before writing.

FOLDER: <PASS>/
READ FIRST, in this order:
1. styles.css — the shared visual system (rectilinear transit diagram: tokens --a System A, --b System B, --amber you/interchange, --op ink; .route .station .box .arrow .lbl .line-name .zone .mono; explore states; toolbar; tables; pre.code; .two grid). Use its classes; do not add a stylesheet. If you truly need a rule, put it in a small <style> block in your page and report it.
2. viewer.js — explore mechanics. Any <svg data-explore> with [data-node="id"] groups and [data-edge="a>b"] elements gets click/keyboard select, upstream/downstream tracing, and a detail panel (<aside class="panel" data-panel …>). Layer toggles: [data-layer-toggle][data-layer="name"] buttons show/hide [data-layer="name"] groups. Step-through: a [data-stepper] container, [data-step="n"] elements (optional data-note), buttons data-step-prev / data-step-next / data-step-all, a counter data-step-count, a note slot data-step-note; steps start fully revealed.
3. data.js — window.HARNESS: systems, modules (hides, exposes, serves, door, reads, writes), files, boundaries (I-rows), decisions, open, milestones. The panel looks up a node's data-node (or data-ref) in modules, then files, then window.VIEW_DETAIL[id] (HTML you define in the page for other nodes).
4. system.html — THE EXEMPLAR. Copy its <head>, masthead, line nav (set aria-current="page" on your page's link), .page/.col structure, footer, script order (data.js, VIEW_DETAIL, viewer.js) and its figure pattern (<section> with .sec-head kicker/h2/.claim, .legend, optional .toolbar, <figure><div class="figwrap"><svg viewBox data-explore role="img" aria-label style="min-width: 900px">…</svg></div><figcaption><b>claim.</b> …</figcaption></figure>). Reuse its station ids and shapes. Match its tone: short claims; captions name what is omitted.
5. BRIEF.md — what moved this pass, what to omit.
6. Content: <PROJECT>/system_design/DESIGN.md <SECTIONS> and <PROJECT>/system_design/interfaces.md (the rows named in your spec).
7. Grammar: <PROJECT>/system_design/design_view/research/illustration_brief.md § 1, the row for your view.

RULES: full HTML document like system.html (doctype, charset, viewport with viewport-fit=cover, <title> 2–4 words, the Google Fonts link, styles.css). No other external resources; no libraries. Hand-authored inline SVG, viewBox-sized, every text ≥ 12px, arrows via <marker> ids unique within the page, tokens only (never a literal hex). Phone width must not scroll the body horizontally (only .figwrap, .tablewrap and pre.code scroll). Both themes come from tokens. One claim per figure in the figcaption, omissions named. Identifiers (R-, I-, D-, V-, M-, Q-) are DESIGN.md's own. Do not edit styles.css, viewer.js, data.js or system.html; describe any shared addition in your final message. Every fact on the page must come from DESIGN.md or interfaces.md; do not invent flags, numbers, durations or files; where DESIGN.md is silent, say so in the caption.

VERIFY ONCE: a local server serves the folder at http://127.0.0.1:8765/design_view/<PASS-NAME>/ (if down: cd <PROJECT>/system_design && python3 -m http.server 8765 --bind 127.0.0.1, in the background). Use the Playwright MCP tools (ToolSearch 'select:mcp__playwright__browser_navigate,mcp__playwright__browser_take_screenshot,mcp__playwright__browser_resize,mcp__playwright__browser_console_messages,mcp__playwright__browser_click'; the browser is shared with sibling agents, so re-navigate before each screenshot or open your own page via browser_run_code_unsafe): render at 1280 and 390 wide, full page, screenshots under <WORKSPACE>/.playwright-mcp/ (the only allowed root), read them with Read, fix overlaps and clipping in one batch, click one node and one control to confirm the panel and the control, check the console, then stop.

FINAL MESSAGE: the file path; what each figure claims; page-local rules you needed; anything you could not verify; any content judgement where DESIGN.md was ambiguous.
```

### A3 · Spec blocks, one per view (append the matching block to A2)

**Flow + States** (two pages, one agent)
```
PAGE 1 — flow.html, <title>Procedure Flows</title>. Each procedure its own <section data-stepper> with a .two grid: left <pre class="code"> with one <span class="ln" data-step="n"> per line (6–12 steps per procedure), right an <svg data-explore> flowchart whose nodes and edges carry the same data-step numbers; a .toolbar with prev/next/all, the counter and the note. Procedures, from DESIGN.md § Module: (1) the step wrapper (what it makes, copies, writes before launch, the call with its isolation flags, the checks on exit, what it rewrites); (2) the promote/accept operation with every refusal as a branch; (3) the main cycle with its pass cap and exit condition, including the pre-checks; (4) the hardest validation check with its result states. Flowchart grammar: route-coloured spine, decision diamonds as rotated rects with the condition on the outgoing edges, 'you' stations amber, refusals and failures as short dead-end stubs; label every branch edge.
PAGE 2 — states.html, <title>Run States</title>. (1) Statechart of a run and its steps: initial dot, rounded state boxes, labeled transitions event [guard], a zone for the step-level states inside the run-level ones, a zone for the accept/promote guard states; explorable (data-node per state, data-edge per transition), VIEW_DETAIL per state quoting DESIGN.md. (2) Decision board: a small script renders .cards from HARNESS.decisions and HARNESS.open (kind × state, modules touched, resolve-by), with a .toolbar filter by kind. Caption: the design is draft until confirmed.
```

**Temporal**
```
PAGE — temporal.html, <title>Time Views</title>. (1) A sequence diagram of one unit's life through the main loop: lifelines left to right you · session · wrapper · sub-agent (one per step) · the tool · external sources · files; every message in order with its I-id, each a data-edge with data-step n and data-note; key messages carry a ring station mid-arrow whose VIEW_DETAIL quotes the interfaces.md row (crosses, fails, noticed, ships, probe); the 'waiting on you' interval as an amber band on your lifeline; a step-through over the messages. (2) Swimlane timelines of one cycle, one per driver (e.g. the milestone script vs production), same lane order so the rows compare: boxes are order not time (DESIGN.md gives no durations, say so), the pass cap as a bracket, the exit condition verbatim, the staged copy as a shaded band, what is promoted and what is not. Lane heads are data-nodes; hops are data-edges.
```

**Hierarchy**
```
PAGE — hierarchy.html, <title>Harness Hierarchy</title>. (1) A horizontal icicle: level 0 the harness; level 1 the subsystems, the joint modules, your inputs, the instruction docs; level 2 modules; level 3 the files each writes (HARNESS.modules[].writes resolved to paths via HARNESS.files). Row heights proportional to leaves; labels horizontal, ≥ 12px, never rotated. Zones coloured by subsystem. Each cell a data-node (module ids, file ids; groups via VIEW_DETAIL), parent→child as data-edge. A layer toggle overlaying the milestone each module is built in (HARNESS.milestones.builds). Compute the layout in a small inline script from HARNESS, synchronous, placed between data.js and viewer.js, emitting <rect> and <text> so the page is complete at rest. (2) The § File tree as an indented tree with elbow connectors, each folder/file a data-node, owner marked (you = amber station, harness = ink, test loop = soft box) with a legend; DESIGN.md's own comments as sub labels. Caption: what the tree shows that the icicle cannot (ownership, where the harness may write).
```

**Agents**
```
PAGE — agents.html, <title>Agent Boundaries</title>. (1) Nested boundaries: outermost you (amber zone: the conversation, the files you read); inside it the session; inside it the wrapper; inside it the step's cwd; innermost the sub-agent whose context is exactly the instruction doc, the listed files and the named tools. Arrows: the packet from session to wrapper (I-row), the inward arrows from wrapper into the sub-agent — the ONLY arrows that cross the innermost wall — and the outward results; blocked items as .arrow.blocked stubs stopping at the wall with a bar (default system prompt, account tools, memory, identity, the orchestrator's transcript, earlier passes), from interfaces.md. Layer toggles: 'what is blocked' (on), 'flags' (off) showing each isolation flag beside the boundary it enforces. (2) One step as a short sequence (you · session · wrapper · sub-agent · the run log) with a step-through, and the exact log-line formats from the I-row as .mono blocks. (3) A table 'what each party can see': rows per party; columns standing context · files it may write · what it never sees; filled strictly from DESIGN.md; a second small table of the budget lines.
```

**Files** (orchestrator-drawn by default; this block if delegated)
```
PAGE — files.html, <title>File Matrix</title>. (1) An adjacency matrix rendered by a small script from HARNESS: rows the modules plus you, columns the files grouped by folder; open dot = reads, filled = writes, ringed = sole writer; row/column cross-highlight on hover and focus; a column filter by folder; click a cell for the file and its readers and writers, click a row head for the module. (2) A bipartite figure of the files that cross between subsystems: writers left, the files as amber interchanges in the middle, readers right, every arrow labeled; caption says nothing else crosses.
```

**Other** (an extra view named in the brief)
```
PAGE — <name>.html, <title><2–4 words></title>. Grammar: <from illustration_brief.md § 1(g)>. Claim: <from the brief>. Sections: <1–2, each one figure>. Nodes: <which ids>. Omit: <from the brief>.
```

## Appendix B — DESIGN.md → data.js

| data.js field | DESIGN.md source | line shape read |
| --- | --- | --- |
| pass, date | the latest `### Pass <n>` heading in the design changelog · DESIGN.md header | pass number from the changelog heading; date = DESIGN.md's as-of date (the brief carries the run date) |
| systems.A/B/J | § System diagram bands and captions | the band titles; J = loop, run, the shared tool |
| modules[].id, src, sys, one | § Module headings · § System bands | `### <name> (draft …)` · sys from the band the module sits in (J for the session, the wrapper, the shared tool) · one = the orchestrator's sentence |
| modules[].hides / exposes / serves / door | the four bullets under each heading | `hides:` one string · `exposes:` split on ` · ` · `serves:` ids · `door:` kind, id, state, text |
| modules[].status | § System legend | `=` existing · `[new]` to build |
| modules[].reads / writes | § File tree comments + the module's exposes line | a file the module's calls take in → reads; a file it produces → writes; ids are the file ids below |
| modules[].calls | § System arrows | module → module arrows only |
| files[] | § File tree, one node per path, templated paths as one node | `path  comment` → id (short, stable, kept across passes), path, kind by folder, owner from the comment (`harness` when none), one = the comment |
| boundaries[] | § Interface one-liners · interfaces.md columns | `I<n> a → b: crosses · fails · noticed · ships · probe` |
| decisions[] | § Alternatives | `### D<n> · <title> — one-way/two-way — <state>` · `Decision:` line · modules in the text; a decided heading without a D-number keeps its heading as id |
| open[] | § Open slots · the current round's recap | only slots still open: slot text · `round-<k> Q<j>` · `resolve by:` milestone; resolved, dropped and orchestrator-made two-way lines stay out |
| milestones[] | § System milestone paragraphs | `Milestone <n> (…)` · the hour budget line (null where none) · `builds` = module ids named as built |
