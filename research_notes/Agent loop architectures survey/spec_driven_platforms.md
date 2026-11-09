# Spec-driven and document-driven development platforms for AI coding agents (as of 2026-11-03)

All pages below were opened on 2026-11-03 unless marked UNVERIFIED. Publication dates are given where the page states one. "Accessed" means the live page as fetched today; many of these projects change weekly, so version-specific claims are perishable.

Shared vocabulary used throughout (from Böckeler, see Critiques section): **spec-first** = write a spec for this task, then let it fall out of use; **spec-anchored** = keep the spec after the task and maintain it as the feature evolves; **spec-as-source** = humans edit only the spec, code is regenerated.

---

## Key question 1: AWS Kiro specs (requirements.md / design.md / tasks.md, hooks, steering)

### Takeaway
Kiro is the only IDE-native platform in this set: three markdown artifacts per spec, a fixed three-phase order (with a Design-First variant and a gate-less "Quick Spec"), approval via in-editor review/continue controls rather than any field written into the document, and re-derivation ("Sync Files") rather than a changelog when code and spec drift. Pricing is credit-metered; spec-task execution is explicitly costlier than chat.

### Cited Findings
- Artifacts: `requirements.md` (or `bugfix.md` for bug fixes) holds "user stories and acceptance criteria ... in structured notation"; `design.md` holds "technical architecture, sequence diagrams, and implementation considerations" incl. error handling and testing strategy; `tasks.md` is "a plan of discrete, trackable implementation tasks" — [Kiro docs: Specs](https://kiro.dev/docs/specs/) (accessed 2026-11-03)
- Phase order: Requirements-First is "Requirements → Design → Tasks"; Design-First is "Design → Requirements → Tasks"; "you must choose a workflow when creating the spec" and converting between workflows means creating a new spec and copying content — [Kiro: Feature Specs](https://kiro.dev/docs/specs/feature-specs/); [Kiro: Best Practices](https://kiro.dev/docs/specs/best-practices/)
- EARS pattern in requirements: "WHEN [condition/event] THE SYSTEM SHALL [expected behavior]"; benefits listed as clarity, testability, traceability, completeness — [Kiro: Feature Specs](https://kiro.dev/docs/specs/feature-specs/)
- Gate mechanism: approval is a UI act, not a document field. The IDE offers a floating **Review** button that opens "Markdown Review" where you "comment on specific passages and send the comments to Kiro together"; after requirements you can "Select Analyze Requirements from the chat options or the Continue dropdown in the editor" — [Kiro: Specs](https://kiro.dev/docs/specs/); [Kiro: Feature Specs](https://kiro.dev/docs/specs/feature-specs/)
- Explicit absence of gates in Quick Spec: Quick Spec "runs all three phases automatically without approval gates between them" and is aimed at users who "have been defaulting to Vibe mode because the standard Spec flow felt too heavy" — [Kiro: Feature Specs](https://kiro.dev/docs/specs/feature-specs/); [Kiro: Best Practices](https://kiro.dev/docs/specs/best-practices/)
- Spec types: Feature Specs, Quick Spec, Bugfix Specs (bugfix.md covers current/expected/unchanged behaviour); a Bugfix Spec "can't be converted directly into a Feature Spec" — [Kiro: Specs](https://kiro.dev/docs/specs/); [Kiro: Best Practices](https://kiro.dev/docs/specs/best-practices/)
- Change after approval (drift handling): no changelog. Requirements-First edit path: edit `requirements.md`, "ask Kiro to update design.md", then run **Sync Files** on `tasks.md` "so new tasks map to new requirements". Design-First path: after architecture changes "ask Kiro to validate and regenerate requirements to ensure they remain feasible." If tasks were done outside the spec, **Sync Files** "will automatically mark completed tasks" — [Kiro: Best Practices](https://kiro.dev/docs/specs/best-practices/)
- Task execution: "Run tasks individually or all at once"; on run-all, Kiro "builds a dependency graph and groups independent tasks into waves. Waves execute sequentially; tasks within a wave execute concurrently." "Run all Tasks" only runs incomplete tasks marked as required — [Kiro: Specs](https://kiro.dev/docs/specs/); [Kiro: Best Practices](https://kiro.dev/docs/specs/best-practices/)
- Requirements analysis: "Analyze Requirements" (IDE, CLI) "takes minutes (not seconds)"; "Correctness (property-based testing)" is IDE-only — [Kiro: Specs](https://kiro.dev/docs/specs/); [Kiro: Best Practices](https://kiro.dev/docs/specs/best-practices/). Augment's vendor page describes the 2026 Requirements Analysis as using "formal logic and SMT solvers to find contradictions" — [Augment Code, 2026-03-07, upd. 2026-06-18](https://www.augmentcode.com/tools/best-spec-driven-development-tools) (vendor claim, UNVERIFIED against Kiro docs)
- Steering (the "memory bank"): `.kiro/steering/product.md`, `tech.md`, `structure.md`, included in every interaction by default; global steering in `~/.kiro/steering/`; inclusion modes set in YAML front matter: `always` (default), `fileMatch`, `manual` (`#steering-file-name`), `auto` (matches `description`) — [Kiro: Steering](https://kiro.dev/docs/steering/)
- Hooks: "Hooks run shell commands or agent prompts automatically when specific events happen"; triggers named include `PostFileSave`, `PreToolUse`, `PostToolUse`, `Stop`; actions are **Command** (shell, JSON context on STDIN, 60 s default timeout) or **Agent** (inject a prompt); stored as JSON in `.kiro/hooks/`; example use: "Blocking tool execution unless preconditions are met (PreToolUse)". The hooks page does not mention keeping specs in sync — [Kiro: Hooks](https://kiro.dev/docs/hooks/)
- Cross-project reuse: "You can have as many specs as you want in a single repo"; cross-team sharing "relies on workarounds like Git submodules or package references" and Kiro asks for cross-project needs to be filed on GitHub — [Kiro: Best Practices](https://kiro.dev/docs/specs/best-practices/)
- Pricing (accessed 2026-11-03, no effective date on page): Free $0/50 credits (open-weight + Claude Sonnet 4.5), Pro $20/1,000, Pro+ $40/2,000, Pro Max $100/5,000, Power $200/10,000; add-on $0.04/credit; "complex [prompts], such as executing a spec task, typically cost more" than 1 credit; model choice multiplies rate (example: Sonnet 4.6 = 1.3x Auto); monthly credits do not roll over — [Kiro: Pricing](https://kiro.dev/pricing/)
- Criticism: pricing backlash and an acknowledged metering bug "where some tasks inaccurately consume multiple requests", with refunds; launch-period daily limits and a waitlist — [Techzine (price increase)](https://www.techzine.eu/news/devops/133888/aws-significantly-increases-the-price-of-its-kiro-development-environment); [Techzine (usage restrictions)](https://www.techzine.eu/news/devops/133231/usage-restrictions-for-kiro-after-unexpectedly-high-demand) (search snippets, not fully opened — UNVERIFIED detail; a DEV post places a similar metering bug in March 2026, conflicting with Techzine's August timing)
- Critic on workflow size: Kiro "turned a small bug into four user stories and 16 acceptance criteria" — [Böckeler, martinfowler.com, 2025-10-15](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)
- Critic on agents ignoring the spec: with Kiro on a "referred by" field in Atomic CRM, an agent "marked a verification task done without any unit tests, writing manual testing instructions instead" — [Zaninotto, Marmelab, 2025-11-12](https://marmelab.com/blog/2025/11/12/spec-driven-development-waterfall-strikes-back.html)
- Vendor-benchmark result (see Evidence section for caveats): Kiro 82% merge rate (41/50), $2.35/merged ticket, 0.39 review defects per merged ticket — [Uvik, run 2026-10-15](https://uvik.net/blog/spec-driven-development-benchmark/)

### Inferences
- Kiro's phase order is enforced by the product (the IDE drives the flow and exposes Review/Continue), so it is the closest to "executable" among the tools here — but the enforcement is the chat UI's turn-taking, not a check on the document. Nothing in the docs describes a recorded sign-off inside `requirements.md`.
- Drift handling is re-derivation (regenerate design from requirements; Sync tasks), not a delta or changelog. The spec is treated as spec-first with optional re-synchronisation, not spec-anchored.
- Hooks (`PreToolUse` blocking) are the only mechanism here that can refuse an agent action by code; they are generic and not wired to the spec phases by default.

### Gaps
- The exact chat wording Kiro uses to ask for phase approval (e.g. "Does the design look good?") is not on the current docs pages opened; the `/docs/specs/concepts/` URL returns 404. Older third-party write-ups describe an explicit per-phase "approve" question — UNVERIFIED.
- Whether Kiro writes any approval marker into the spec files: not found.
- Current Kiro version number: not captured.

---

## Key question 2: GitHub Spec Kit (constitution → specify → clarify → plan → checklist → tasks → analyze → implement → converge)

### Takeaway
Spec Kit is a Python CLI (`specify`) that scaffolds templates and slash commands into whatever agent you use; its phase order is a recommendation in prose ("Run them in order"), with one hard dependency (specify before plan), reviewer-owned checklists as the human gate, and an append-only `converge` loop as the post-implementation drift check. Spec Kit 1.0 shipped around Oct 2026 and now bundles bug-fix and idea-assessment extensions.

### Cited Findings
- Goal statement: Spec-Driven Development "inverts the usual relationship: specs generate code"; "Specifications don't serve code—code serves specifications"; the spec is "the primary artifact"; "Debugging means fixing the spec or plan that produced bad code" — [spec-driven.md](https://github.com/github/spec-kit/blob/main/spec-driven.md)
- Honest status line in the methodology doc: "Today, practicing SDD requires assembling existing tools and maintaining discipline throughout the process" — [spec-driven.md](https://github.com/github/spec-kit/blob/main/spec-driven.md)
- Packaging: requires Python 3.11+ and uv; `uv tool install specify-cli`; `specify init my-project --integration copilot`; extensions via `specify extension add bug` / `add assess`; search for `extension`, `preset`, `workflow`, `bundle`; repo top level has `templates/`, `extensions/`, `presets/`, `workflows/`, `scripts/`, `src/specify_cli/`, `integrations/`, `.specify/memory` — [spec-kit README](https://github.com/github/spec-kit)
- Agent-agnosticism: README names only Copilot in the example and defers to an integrations page; the mechanism is that each integration gets its own slash-command files generated from shared templates — [spec-kit README](https://github.com/github/spec-kit). (The integrations page itself was not opened — list of supported agents UNVERIFIED.)
- Dates: README embeds videos dated 2026-05-08 (intro) and 2026-10-16 ("Spec Kit 1.0 and the expanded toolkit") — [spec-kit README](https://github.com/github/spec-kit)
- Artifacts: `memory/constitution.md`; per feature `spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`, `tasks.md`, optional `implementation-details/`; `/speckit.specify` auto-numbers the feature and creates a branch and `specs/[branch-name]/` — [spec-driven.md](https://github.com/github/spec-kit/blob/main/spec-driven.md)
- Constitution: nine articles — I Library-First, II CLI Interface Mandate, III Test-First ("No implementation code shall be written before" tests are written, approved, confirmed failing), IV–VI project-defined, VII Simplicity, VIII Anti-Abstraction, IX Integration-First. Amendments "require documented rationale, review and approval by project maintainers, and a backwards compatibility assessment" — [spec-driven.md](https://github.com/github/spec-kit/blob/main/spec-driven.md)
- Command semantics (official reference):
  - `/speckit.specify` — "Only this command is strictly required before /speckit.plan"; may emit `checklists/requirements.md`.
  - `/speckit.clarify` — "Asks up to five targeted questions about underspecified areas and encodes the answers back into spec.md"; run "as often as needed before planning, each time on a different area".
  - `/speckit.checklist` — generates "unit tests for your requirements"; "Custom items are reviewer-owned. A reviewer marks [x] only after the requirements-quality criterion is satisfied ... implementation must not self-approve them."
  - `/speckit.analyze` — "read-only cross-artifact analysis across spec.md, plan.md, and tasks.md, reporting conflicts, gaps, and ambiguities ... never edits files".
  - `/speckit.implement` — "Counts checklist checkboxes and asks before proceeding if any are unchecked."
  - `/speckit.converge` — "Append-only ... its only write is adding tasks to tasks.md"; reports `Converged` or appends a "Convergence" section; loop implement→converge until converged.
  - The overview recommends "adding the clarify/checklist/analyze quality gates for anything with meaningful ambiguity" (i.e. they are optional) — [Agentic SDD reference](https://github.github.io/spec-kit/reference/agentic-sdd.html); [Reference overview](https://github.github.io/spec-kit/reference/overview.html)
- `[NEEDS CLARIFICATION: ...]` markers: the methodology doc requires the LLM to place these on ambiguities "instead of guessing" — [spec-driven.md](https://github.com/github/spec-kit/blob/main/spec-driven.md)
- Change after approval: the methodology says when acceptance criteria change, plans "automatically flag affected technical decisions", with no mechanism described; the reference says re-run `/speckit.tasks` "to regenerate the task list when earlier artifacts change" and re-run `analyze` until clean — [spec-driven.md](https://github.com/github/spec-kit/blob/main/spec-driven.md); [Agentic SDD reference](https://github.github.io/spec-kit/reference/agentic-sdd.html)
- Extensions (1.0): bug (`/speckit-bug-assess`, `-fix`, `-test`, output in `.specify/bugs/<slug>/`) and assess (`intake`, `research`, `define`, `shape`, `decide`, output in `.specify/assessments/<slug>/`) — [spec-kit README](https://github.com/github/spec-kit). Note README spells commands with hyphens (`/speckit-specify`) while the reference site uses dots (`/speckit.specify`).
- Critic (Thoughtworks/Böckeler): spec-kit "felt like overkill for a 3–5 point feature"; it "produced many repetitive, verbose files"; "Each spec gets its own branch, which suggests a lifetime tied to a change request rather than a feature"; agents "ignored instructions, for example by regenerating existing classes as new ones, or by over-applying constitution rules" — [Böckeler, 2025-10-15](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)
- Critic (Marmelab): adding a current-date display to a time-tracker "produced 8 files and about 1,300 lines of text" — [Zaninotto, 2025-11-12](https://marmelab.com/blog/2025/11/12/spec-driven-development-waterfall-strikes-back.html)
- HN practitioner: with Spec-Kit on a CLI tool, Claude "wanted to design the whole prod-ready CLI up front", and after hours "it had built the wrong thing" (thomascountz); opposite report from ErrantX that two short prompts worked — [HN thread 45935763](https://news.ycombinator.com/item?id=45935763)
- Competitor framing: OpenSpec's README calls Spec Kit "heavyweight, with rigid phase gates, a lot of Markdown, and Python setup" — [OpenSpec README](https://github.com/Fission-AI/OpenSpec)
- Vendor benchmark: Spec Kit 1.0 80% merge (40/50), $3.33, 18 min median spec time, 0.57 defects — [Uvik](https://uvik.net/blog/spec-driven-development-benchmark/)

### Inferences
- Enforcement is almost entirely prose: the only code-level checks are `implement` counting unchecked checklist boxes and `converge` being append-only. Skipping `clarify`/`checklist`/`analyze` is permitted by design.
- The human gate is recorded as `[x]` marks in checklist files, which is the most explicit "approval as a document field" among the tools surveyed (Kiro: UI; OpenSpec: none; BMAD: conversational).
- `converge` is a code→spec reconciliation pass (does the code satisfy the spec?), not a spec→spec changelog. There is no delta or version history of the spec itself beyond git.

### Gaps
- The list of integrations and the exact template contents (spec-template, plan-template) were not opened.
- Whether `analyze` checks constitution violations with severity levels (earlier versions did, per memory — UNVERIFIED on the current reference page).

---

## Key question 3: OpenSpec (change proposals, delta specs, archive)

### Takeaway
OpenSpec splits "specs" (current truth, `openspec/specs/`) from "changes" (proposals in `openspec/changes/<name>/` with `proposal.md`, delta `specs/`, `design.md`, `tasks.md`); deltas use ADDED/MODIFIED/REMOVED headers and are merged into the main specs on archive. It records no approval; the gate is "you review the plan before any code is written" then `/opsx:apply`. Artifact dependencies are declared in a schema but are "enablers, not gates".

### Cited Findings
- Goal: "Spec-driven development (SDD) for AI coding assistants"; motivation: "AI coding assistants are powerful but unpredictable when requirements live only in chat history" — [OpenSpec README](https://github.com/Fission-AI/OpenSpec)
- Scale: 73.8k stars, 1,028 commits (accessed 2026-11-03); Augment cited 52,100 stars "as of June 2026" — [OpenSpec README](https://github.com/Fission-AI/OpenSpec); [Augment](https://www.augmentcode.com/tools/best-spec-driven-development-tools)
- Specs vs changes: "Specs (openspec/specs/) are the source of truth and describe how the system currently behaves. Changes (openspec/changes/) are proposed modifications, each in its own folder, kept separate until archived." — [OpenSpec concepts.md](https://raw.githubusercontent.com/Fission-AI/OpenSpec/main/docs/concepts.md)
- Delta headers: `## ADDED Requirements` (appended on archive), `## MODIFIED Requirements` (replaces existing), `## REMOVED Requirements` (deleted), `## Purpose` (seeds a brand-new capability). Requirements use `### Requirement: <name>` with RFC 2119 SHALL/MUST/SHOULD/MAY; scenarios use `#### Scenario: <name>` with GIVEN/WHEN/THEN — [concepts.md](https://raw.githubusercontent.com/Fission-AI/OpenSpec/main/docs/concepts.md)
- Why deltas (stated): "Clarity: a delta shows exactly what changes, without requiring a mental diff against the full spec. Conflict avoidance: two changes can touch the same spec file if they modify different requirements. Review efficiency: reviewers see only the changed content. Brownfield fit: most work modifies existing behavior, so deltas make modifications first-class." — [concepts.md](https://raw.githubusercontent.com/Fission-AI/OpenSpec/main/docs/concepts.md)
- Archive mechanics: each ADDED/MODIFIED/REMOVED section is applied to the matching main spec; the change folder moves to `changes/archive/` with a date prefix; a capability is retired only if the change sets `retire_capabilities: true` — [concepts.md](https://raw.githubusercontent.com/Fission-AI/OpenSpec/main/docs/concepts.md)
- Gates: dependency schema (`spec-driven`): `proposal` (none) → `specs`, `design` (require proposal) → `tasks` (require specs and design); "Dependencies are 'enablers, not gates': they show what can be created, not what must come next." README: "update any artifact anytime, no rigid phase gates"; "fluid not rigid", "iterative not waterfall" — [concepts.md](https://raw.githubusercontent.com/Fission-AI/OpenSpec/main/docs/concepts.md); [README](https://github.com/Fission-AI/OpenSpec)
- Approval: "No explicit approval field or step is described"; "you review the plan before any code is written" then `/opsx:apply` — [README](https://github.com/Fission-AI/OpenSpec)
- Commands: default profile `/opsx:explore`, `/opsx:propose`, `/opsx:apply`, `/opsx:archive`; expanded profile adds `/opsx:new`, `/opsx:continue`, `/opsx:ff`, `/opsx:verify`, `/opsx:bulk-archive`, `/opsx:onboard`; CLI `openspec init|update|install|config`; "30+ AI assistants" (Cursor, Copilot, Amazon Q, Codex named); Node 22.12+; "Stores (cross-repo planning) are in beta"; recommends high-reasoning models ("Codex 5.5 and Opus 4.7") and clearing context before implementation — [README](https://github.com/Fission-AI/OpenSpec)
- Positioning vs others: Spec Kit "heavyweight ... rigid phase gates"; Kiro "locked to its IDE and limited to Claude models" — [README](https://github.com/Fission-AI/OpenSpec)
- Critic (vendor): "Proposals do not update during implementation, there is no multi-agent orchestration, and it has no persistent codebase context beyond what the chosen agent provides"; labelled "semi-living" — [Augment](https://www.augmentcode.com/tools/best-spec-driven-development-tools)
- Vendor benchmark: OpenSpec 84% merge (42/50), $2.71, 12 min median spec time, 0.40 defects — best of the spec arms on this run — [Uvik](https://uvik.net/blog/spec-driven-development-benchmark/)

### Inferences
- OpenSpec is the only tool here whose data model is explicitly spec-anchored (a maintained current-state spec plus a dated archive of merged deltas). The archive folder is, in effect, the changelog.
- Approval is implicit: running `/opsx:apply` is the recorded act, and the archive date-prefix is the only timestamp. There is nothing comparable to an "Accepted on:" line.
- The schema-declared dependency graph is a declarative, machine-readable phase model, yet the authors deliberately refuse to make it blocking.

### Gaps
- `openspec validate --strict` (present in 2025 versions per memory) is not mentioned on the pages opened — UNVERIFIED whether it still exists.
- How `/opsx:verify` compares implementation to delta specs was not opened.

---

## Key question 4: BMAD Method (persona agents; PRD, architecture, stories)

### Takeaway
BMAD packages a full agile org as named persona agents (Analyst Mary, PM John, PO Sofia, Architect Winston, Dev Amelia, UX Sally) and workflow skills (product brief → PRD → UX → architecture → tickets → build → review → retrospective), installed via `npx bmad-method install` (v6.12 stable; v7 preview as plugin/skills). Gates are conversational accept/reject steps, not document fields. Critics consistently report heaviness, token cost, huge artifacts, and manual orchestration; the maintainers responded with a "small change goes straight to build" entry point.

### Cited Findings
- Goal: "Agile Ai Driven Development", to "turn an idea or change request into working software without giving up the thinking"; delivery loop stages: Clarify, Plan, Build and verify, Learn and adjust; "small changes go straight to build, and complex work gets more planning" — [BMAD-METHOD README](https://github.com/bmad-code-org/BMAD-METHOD)
- Packaging: stable v6.12 via `npx bmad-method install` (Node 20.12+, Python 3.10+); V7 preview alpha via `npx skills add bmad-code-org/BMAD-METHOD --skill '*'` plus Claude Code and Codex plugin marketplaces (requires uv); "release ETA of mid-November 2026" — [README](https://github.com/bmad-code-org/BMAD-METHOD)
- Personas (docs reference): Analyst (Mary) — brainstorming, research, product brief, PRFAQ, project context; Product Manager (John) — PRD; Product Owner (Sofia) — "Turns requirements into tickets, slices epics, refines, replans, sets up the tracker"; Architect (Winston); Developer (Amelia) — build, QA test generation, code review, epic retrospective; UX Designer (Sally); Technical Writer (Paige) "on hiatus" — [BMad docs: Skills and Agents](https://docs.bmad-method.org/reference/skills-and-agents/)
- Workflow skills: `bmad-product-brief`, `bmad-prfaq`, `bmad-prd`, `bmad-ux` (writes `DESIGN.md`, `EXPERIENCE.md`), `bmad-architecture`, `bmad-project-context`; build loop `bmad-build`, `bmad-build-auto` ("one iteration of an unattended development loop"), `bmad-code-review` ("several independent reviewers, then triages"), `bmad-walkthrough`, `bmad-qa-generate-e2e-tests`, `bmad-retrospective` ("decides whether to accept" an epic) — [Skills and Agents](https://docs.bmad-method.org/reference/skills-and-agents/)
- Gate mechanism: no formal gates labelled; human decision points are `bmad-advanced-elicitation` ("you accept, partly accept, reject, or rerun each proposed revision"), epic retrospective acceptance, `bmad-walkthrough` review, and the PO's `REPLAN` code for mid-flight changes — [Skills and Agents](https://docs.bmad-method.org/reference/skills-and-agents/)
- Thinking vs building split: "You can use the thinking skills without any code generation, or go straight to building for a small fix"; `bmad-party-mode` runs "a multi-persona discussion with you steering" — [BMad docs home](https://docs.bmad-method.org/)
- Beyond software: official modules include BMad Creative Intelligence Suite ("innovation, design thinking, storytelling"), BMad Game Dev Studio, BMad Test Architect, BMad Loop, BMad Builder; `bmad-toolsmith` and `bmad-eval` for building/measuring skills — [README](https://github.com/bmad-code-org/BMAD-METHOD); [docs home](https://docs.bmad-method.org/)
- Critic (Jan 2026): "heavy, sequential workflow with a steep learning curve"; planning "6 to 15 minutes before any code"; "One user reportedly used about 230 million tokens in a week" (v6 reduced this); "rigid until you understand when to streamline"; manual orchestration across web UI and IDE; PRDs "tens of thousands of tokens" so sharding was introduced; "relies on state-of-the-art model capabilities"; agents "may miss updating status files or trackers" — [asantos2000, 2026-01-10](https://asantos2000.github.io/blog/post-3/)
- Critic (Feb 2026): two days on a macOS TODO app produced PROJECT.md, REQUIREMENTS.md, ROADMAP.md, ARCHITECTURE.md, epics and stories, "Zero lines of actual code"; switched to GSD (Get Shit Done) — [guillim, 2026-02-08](https://guillim.github.io/ai/development/2026/02/08/bmad-method-disappointment.html)
- Other critiques (search snippets, not opened — UNVERIFIED detail): a ~2,241-line ARCHITECTURE.md to review; "you personally bear the cognitive load of coordination" — [search results](https://dev.to/ndabene/i-stopped-using-bmad-heres-what-replaced-it-25o8)
- Vendor critique: "21+ role-based agents"; "static specs with file-based handoffs, coordination overhead when design issues arise, and portability problems with absolute file paths" — [Augment](https://www.augmentcode.com/tools/best-spec-driven-development-tools)
- Vendor benchmark: BMAD 6.x 82% merge, $4.23 (most expensive), 28 min median spec time (longest), 0.49 defects — [Uvik](https://uvik.net/blog/spec-driven-development-benchmark/)
- Academic taxonomy includes BMAD among six frameworks and notes "fragility of community extensions, platform dependence" as recurring risks — [de Macedo, arXiv 2606.04967, 2026-06-03](https://arxiv.org/abs/2606.04967)

### Inferences
- What personas buy: role-specific question sets and review lenses (the PM asks PRD questions, the Architect asks architecture questions) and a legible handoff vocabulary that maps to existing agile roles — the same device as "typed questions from roles" in the user's Requirements loop. The cost is that each persona carries its own large context.
- BMAD is the heaviest process and the only one with a retrospective/accept step for completed work; the acceptance is a conversational verdict, not a line written into the PRD.
- The maintainers' v6/v7 direction (skills, "straight to build", sharding) is a direct response to the heaviness critiques.

### Gaps
- Exact v6 artifact filenames (`PRD.md`, `architecture.md`, `sprint-status.yaml`, epic/story files) were not confirmed on the pages opened; the docs reference lists skills, not output file names.
- No formal description found of how BMAD records that a PRD is "approved".

---

## Key question 5: Tessl, Superpowers, Agent OS, cc-sdd, and other 2026 entrants

### Takeaway
Tessl pivoted its public positioning from a spec-as-source "Framework" (closed beta since Sept 2025, never confirmed GA) to an "agent enablement platform" of skills/loops, while still publishing a spec-driven-development "tile" with `.spec.md` files and a `spec-before-code` rule. Superpowers and Agent OS are prose-skill methodologies (brainstorm → plan → execute; standards → shape spec) with no recorded approval. cc-sdd is a Kiro-derived skill set with "humans approve at phase gates". Codex still has no official plan mode; Cursor has a Plan mode; Augment sells a "living spec" cloud agent.

### Cited Findings
**Tessl**
- Current positioning: "the agent enablement platform"; Registry indexes skills; a "loop applies a skill on a schedule"; a "factory is several loops running together"; free tier 1,000 credits/month; claims "74% of findings are real defects, up from 50%" for its review loop and "94% task success, up from 67%" on Fastify; agent-agnostic (Claude Code, Cursor, Codex, Antigravity, Copilot, Gemini) — [tessl.io](https://tessl.io/) (vendor claims)
- SDD tile: a "steering tile" with "no special commands or framework"; phases: Requirement gathering (interview "one question at a time") → Stakeholder approval → Implementation → Review ("update specs with newly discovered requirements"); rule `spec-before-code`: "implementation must never begin without an approved spec"; spec files are `.spec.md` with YAML frontmatter (`name`, `description`, `targets` = files/globs covered) and inline `[@test]` links from requirements to tests; install `tessl install tessl-labs/spec-driven-development`; "does not describe a mechanism for recording" approval — [tesslio/spec-driven-development-tile](https://github.com/tesslio/spec-driven-development-tile)
- Tessl Framework (spec-as-source): "the only one explicitly aiming at spec-anchoring and exploring spec-as-source"; specs map "roughly one-to-one to code files", generated code carries a "generated from spec, do not edit" marker; `tessl document` reverse-engineers specs; `tessl build` generation "was non-deterministic" — [Böckeler, 2025-10-15](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html); Thoughtworks: "in private beta as of September 2025 ... makes the specification the maintained artifact rather than the code" — [Thoughtworks Radar, 2025-11-05](https://www.thoughtworks.com/radar/techniques/spec-driven-development)
- Third-party status: Framework "launched ... in closed beta ... on September 16, 2025" and "as of mid-2026 ... still does not appear to have reached general availability"; tessl-labs/spec-kit tile archived 2026-02-04 as "superseded by tessl-labs/intent-integrity-kit" — [search snippets: CodeMySpec review; tessl registry](https://codemyspec.com/blog/tessl-review) (not opened — UNVERIFIED)

**Superpowers (obra)**
- "a complete software development methodology for your coding agents" built from composable skills; workflow: brainstorming (asks questions, "plays back its understanding"; "projects get a written design document") → using-git-worktrees → writing-plans ("2-5 minute tasks, each with exact file paths, code, and verification steps") → subagent-driven-development or executing-plans → test-driven-development ("deletes code written before its tests") → requesting-code-review ("critical issues block progress") → finishing-a-development-branch — [obra/superpowers](https://github.com/obra/superpowers)
- Packaging: plugin manifests per harness (`.claude-plugin`, `.cursor-plugin`, `.codex-plugin`), `skills/<name>/SKILL.md`; installs for Claude Code, Codex, Cursor, Gemini CLI, Copilot CLI, OpenCode, Devin, Factory Droid, Kimi, Qwen, Hermes, Muse, etc. — [obra/superpowers](https://github.com/obra/superpowers)
- Enforcement: "Mandatory workflows, not suggestions"; skills "trigger automatically"; the only code-level mechanism is a session-start hook injecting the `using-superpowers` bootstrap, and "Hermes lacks a post-compaction hook, so long sessions can lose the bootstrap" — [obra/superpowers](https://github.com/obra/superpowers)
- Approval: in brainstorming "the user signs off on the design"; subagent-driven development "starts once the user says 'go'"; "does not describe an explicit approval gate for the plan itself"; claims autonomous runs of "a couple hours at a time" — [obra/superpowers](https://github.com/obra/superpowers)

**Agent OS (Builder Methods, Brian Casel)**
- "a system for injecting your codebase standards and writing better specs for spec-driven development"; v3 adds standards discovery from an existing codebase; four steps: Install → Discover standards → Inject standards → Shape spec ("enhanced shaping questions in plan mode"); outputs are markdown so "any tool that can read files can use them"; Claude Code gets slash commands, other tools reference `agent-os/` files directly; MIT, 5.6k stars; repo has `commands/agent-os/`, `profiles/default/global/`, `config.yml` — [buildermethods.com/agent-os](https://buildermethods.com/agent-os); [buildermethods/agent-os](https://github.com/buildermethods/agent-os)
- No approval mechanism or limitations stated on either page.

**cc-sdd (gotalab)**
- v3.0; "installs an agentic SDLC workflow as Agent Skills"; "turns approved specs into long-running autonomous implementation"; "Agents draft specs, humans approve them at phase gates, and code is what ships" (code, not spec, is source of truth); skills: `kiro-discovery` (writes `brief.md`, `roadmap.md`), `kiro-spec-init`, `kiro-spec-requirements`, `kiro-spec-design`, `kiro-spec-tasks`, `kiro-impl` (per-task implementer and reviewer subagents where available), `kiro-steering`, `kiro-validate-gap`, `kiro-spec-batch`; "Kiro-inspired", Kiro specs "remain compatible and portable"; stable on Claude Code and Codex, beta on Cursor/Copilot/Devin/OpenCode/Gemini/Antigravity; `npx cc-sdd@latest`; 17 skills per integration, 14 languages; templates in `{{KIRO_DIR}}/settings/`; limitation: "Beta integrations are not verified for the full autonomous loop" and per-task independent review "requires native subagents" — [gotalab/cc-sdd](https://github.com/gotalab/cc-sdd)

**Other 2026 entrants**
- Augment Cosmos (launched May 2026 per vendor): org-scope cloud agents with "Experts", a Context Engine, Organization Knowledge; spec is "Living and auto-updating"; "Living specs prevent drift during implementation"; limitations admitted: "limited independent third-party benchmarks", unnecessary for solo single-repo devs; Business $100/month — [Augment, 2026-03-07/06-18](https://www.augmentcode.com/tools/best-spec-driven-development-tools) (vendor)
- Codex: maintainer etraut-openai opened "Plan / Spec Mode" discussion 2025-11-27 asking about "modal vs. non-modal operation, persisted vs. ephemeral plans, interview-style vs. freeform"; shared an `AGENTS.md` snippet with specs in `/specs`; on 2025-12-03 called manual step-gating's advantage "likely a point-in-time limitation of the models"; last substantive maintainer reply 2025-12-12; a community-linked plan skill saves to `~/.codex/plans`; "No dedicated plan or spec mode has been announced in this thread" (latest comment 2026-07-31) — [openai/codex discussion #7355](https://github.com/openai/codex/discussions/7355)
- Cursor: Agent/Plan/Ask modes, Plan "asks clarifying questions first"; `.cursor/rules` `.mdc` files classed by Augment as "pseudo-specs" with "No automated validation or spec lifecycle" — [search snippets](https://github.com/sapegin/two-step-ai-coding-modes/); [Augment](https://www.augmentcode.com/tools/best-spec-driven-development-tools) (Cursor docs not opened — UNVERIFIED)
- Academic survey (June 2026) compared Spec Kit, OpenSpec, BMAD, GSD (Get Shit Done), Spec Kitty, Reversa, plus Spec-Flow out of sample — evidence that the long tail now includes GSD and Spec Kitty — [de Macedo, arXiv 2606.04967](https://arxiv.org/abs/2606.04967)

### Inferences
- Tessl is the clearest example of the spec-as-source bet being quietly shelved: the public site no longer mentions the Framework, and the surviving artifact is a prose tile that asks for approval without recording it.
- Superpowers and Agent OS are the "skills" school: they rely on the harness loading a SKILL.md and the model obeying it; both admit (Superpowers explicitly) that losing the bootstrap context loses the process.
- cc-sdd is the most explicit about the contract direction (code is truth, spec is the approved contract that launches autonomy) — the inverse of Spec Kit's "code serves specifications".

### Gaps
- Agent OS v3 file structure and command names (plan-product, shape-spec, write-spec, implement-tasks, `agent-os/specs/<date-name>/`) — docs page 404; UNVERIFIED.
- cc-sdd v2's `spec.json` with `approvals.requirements.approved` flags and `-y` auto-approve: not on the v3 README; UNVERIFIED whether retained.
- Tessl Framework current status: only secondhand.

---

## Key question 6: Thoughtworks / Fowler / Böckeler / Beck and other critiques

### Takeaway
The canonical critiques are: (1) one workflow doesn't fit all task sizes; (2) markdown review overload; (3) false sense of control because agents ignore the spec; (4) up-front spec denies the learning loop (Beck/Fowler, "waterfall strikes back"); (5) prose specs drift and nothing signals it (Frisinger); (6) spec-as-source repeats model-driven development's inflexibility plus LLM non-determinism; (7) the "bitter lesson" that hand-crafted rules for AI don't scale (Thoughtworks). Thoughtworks put SDD in Assess in Nov 2025.

### Cited Findings
- Böckeler (2025-10-15): three levels spec-first / spec-anchored / spec-as-source; "All the SDD approaches the author reviewed are spec-first, but few commit to maintaining specs over time"; "One workflow doesn't fit all sizes"; "Reviewing markdown is tedious"; "False sense of control: agents often ignored instructions"; "Up-front design versus iteration"; "Functional versus technical separation is unclear"; "Unclear target user and problem"; "spec-as-source resembles model-driven development, which never took off for business apps ... LLMs ... add non-determinism"; SDD "sometimes meaning little more than 'detailed prompt'"; closing word "Verschlimmbesserung" — [martinfowler.com](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)
- Thoughtworks Radar (2025-11-05, ring Assess; "Not on the current edition" as of today): "workflows remain elaborate and opinionated"; tools "behave very differently depending on task size and type"; "Some generate lengthy spec files that are hard to review"; "it is sometimes unclear who the intended user is"; "the field may be relearning the 'bitter lesson' that hand-crafted detailed rules for AI don't scale" — [Thoughtworks Radar](https://www.thoughtworks.com/radar/techniques/spec-driven-development)
- Beck via Fowler (2026-01-08): SDD descriptions "emphasize 'writing the whole specification before implementation'"; the assumption "that you won't learn anything during implementation that changes the spec" is "bizarre"; Fowler: "the learning loop of experimentation is essential to building the understanding that makes any worthwhile specification possible"; the key is to "accelerate the feedback loops" — [martinfowler.com/fragments/2026-01-08](https://martinfowler.com/fragments/2026-01-08.html)
- Marmelab (2025-11-12): "Context blindness", "Markdown overload", "Bureaucracy: Specs contain repetitions, imaginary corner cases, and excessive refinements", "Faux agile", "Double review", "False security: Agents don't always follow the spec", "Diminishing returns ... For large existing codebases, it is mostly unusable", "spending 80% of your time reading instead of thinking"; conclusion: "SDD adds little value over the plan modes and task lists coding agents already have" — [Marmelab](https://marmelab.com/blog/2025/11/12/spec-driven-development-waterfall-strikes-back.html)
- HN on Marmelab: "SDD is exactly waterfall" (constantcrying) vs "A day's work is not a spec. It's a ticket's worth of work, which is agile" (mattmanser); "the difference is purely in how much spec you write before you start implementing" (pydry); agents may "remove all the tests, change their meaning to make them pass" (techpression); "loose markdown 'specs' leave too much to the model" (CuriouslyC); one user reports "20x ROI" from AI-runnable acceptance tests (canterburry) — [HN 45935763](https://news.ycombinator.com/item?id=45935763)
- Frisinger (prose drift): "A prose spec kept separate from the code drifts from it, and nothing signals the divergence"; "The executable test is the only spec that cannot lie"; SDD tools are "useful for coordination and prompt structuring but wrongly sold as a source of truth" — [dev.to/tmfrisinger](https://dev.to/tmfrisinger/spec-driven-development-is-the-prose-spec-drift-trap-reborn-4p99) (year not shown on page)
- Defences (search snippets, not opened — UNVERIFIED): Yeret argues "diminishing returns on specification ... can show up pretty early"; Pant argues "waterfall failed because of the cost of the loop, not the existence of the phases" — [Yeret](https://yuvalyeret.com/blog/spec-driven-development-isnt-waterfall-unless-youre-using-it-that-way/); [Pant](https://utsabpant.com/blog/spec-driven-development-without-the-hype)
- Academic (de Macedo, 2026-06-03): frameworks converge on "persistent artifacts, work contracts, traceability, and human review"; "structural trade-off between process depth and portability across agents"; recurring risks "drift between specification and code, excessive trust in generated artifacts, fragility of community extensions, platform dependence, and a lack of benchmarks for the complete process" — [arXiv 2606.04967](https://arxiv.org/abs/2606.04967)

### Inferences
- The critiques cluster on exactly the two things the user's templates try to institutionalise: a recorded human gate ("Accepted on:", "Settled on:") and a changelog. None of the critics object to those; they object to volume, rigidity and unverified trust in the spec.
- "Loss of design dialogue" as a named critique was not found verbatim; the nearest are Böckeler's "unclear target user" and Beck's learning-loop point.

### Gaps
- No critique found that targets the role-persona question mechanism specifically.
- Thoughtworks Vol. 34 (April 2026) status of the blip: one locale says not on current edition; not resolved.

---

## Key question 7: Executable vs prose enforcement; what happens when the agent skips a step

### Takeaway
Only Kiro (IDE turn-taking plus `PreToolUse` hooks) and small pieces of Spec Kit (`implement` checkbox count, `converge` append-only) enforce anything in code; everything else is prose the model reads. When an agent skips a step, the tools either do nothing (OpenSpec by design, Superpowers, Agent OS, BMAD), ask (Spec Kit implement), or depend on the user noticing.

### Cited Findings
- Kiro: Quick Spec exists precisely to skip gates ("without approval gates between them"); hooks can block tool execution on preconditions (`PreToolUse`) — [Kiro: Feature Specs](https://kiro.dev/docs/specs/feature-specs/); [Kiro: Hooks](https://kiro.dev/docs/hooks/)
- Spec Kit: only `specify` is "strictly required before /speckit.plan"; clarify/checklist/analyze are optional "quality gates"; `implement` "asks before proceeding if any are unchecked"; `analyze` "never edits files"; `converge` "Append-only" — [Agentic SDD reference](https://github.github.io/spec-kit/reference/agentic-sdd.html)
- OpenSpec: "Dependencies are 'enablers, not gates'"; "no rigid phase gates" — [concepts.md](https://raw.githubusercontent.com/Fission-AI/OpenSpec/main/docs/concepts.md); [README](https://github.com/Fission-AI/OpenSpec)
- Superpowers: "Mandatory workflows, not suggestions" but the mechanism is a session-start bootstrap prompt; "Hermes lacks a post-compaction hook, so long sessions can lose the bootstrap" — [obra/superpowers](https://github.com/obra/superpowers)
- cc-sdd: "Installing the skills does not confirm that a host can run it" — [gotalab/cc-sdd](https://github.com/gotalab/cc-sdd)
- BMAD: no gates labelled; agents "may miss updating status files or trackers, which can cause inconsistencies" — [docs reference](https://docs.bmad-method.org/reference/skills-and-agents/); [asantos2000](https://asantos2000.github.io/blog/post-3/)
- Evidence of skipping in practice: Spec Kit agents "regenerating existing classes as new ones, or by over-applying constitution rules" — [Böckeler](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html); Kiro agent "marked a verification task done without any unit tests" — [Marmelab](https://marmelab.com/blog/2025/11/12/spec-driven-development-waterfall-strikes-back.html)
- Codex maintainer view: the need for manual step-gating is "likely a point-in-time limitation of the models" — [codex #7355](https://github.com/openai/codex/discussions/7355)

### Inferences
- The field's actual enforcement primitives are: (a) hooks that run before/after tool calls (Kiro `PreToolUse`; Claude Code hooks, which Superpowers uses only for bootstrap), (b) counting checkboxes in a file, (c) read-only/append-only command scopes. A loop that wanted executable gates would use (a) to refuse writes outside the current phase's artifact and (b) to require an "Accepted on:" line before advancing.

### Gaps
- No tool opened documents a machine check that a human (not the agent) wrote the approval. Spec Kit's "implementation must not self-approve" is a prose rule.

---

## Key question 8: Evidence on outcomes

### Takeaway
Rigorous evidence is thin and points two ways: one independent large-sample observational study (ESEM 2026) finds spec artifacts do not reduce defects or rework; one vendor-run 50-ticket benchmark (Oct 2026) finds spec workflows raise merge rate 72%→80-84% on features/data pipelines but not on bug fixes/refactors/tests; the academic survey says complete-process benchmarks are still lacking.

### Cited Findings
- Hill, ESEM 2026 (Dagstuhl LIPIcs vol. 394): "Specification Artifacts in Open-Source Pull Request Workflows Do Not Reduce Defects"; 88,052 PRs across 119 repos, 25,209 artifacts scored, SZZ defect tracing; spec quality predicts neither defects (p = 0.164) nor rework (p = 0.860); specs do not constrain scope of AI-tagged changes (p = 0.997); in repos with no detected AI use, specs show -3.3pp rework (p = 0.014) but this does not survive multiple-comparison correction; "Specification artifacts proxy for task complexity"; "SDD tool adoption itself remains untested: no repository in the sample commits such output" — [Dagstuhl entity page](https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.ESEM.2026.84) (search snippet; PDF not opened; SSRN mirror returned 403). Note: an SSRN-derived snippet said 100,247 PRs — figures conflict between versions; UNVERIFIED which is final.
- Uvik benchmark (run 2026-10-15, page updated 2026-11-02): 50 brownfield Python tickets, claude-sonnet-5 in all arms, Claude Code 2026.09 (Kiro in own IDE), 45-min spec + 45-min build boxes, blind senior review; merge rates Spec Kit 80%, Kiro 82%, BMAD 82%, OpenSpec 84%, no-spec 72%; review defects per merged ticket 0.57/0.39/0.49/0.40 vs 0.86; features and data pipelines "up to 90% against 60% for the control"; "On bug-fix, refactor, and test-writing tickets, the spec did not clearly improve results"; spec phases used 28-44% of tokens; noise ±10pp; vendor "publishes this research while also selling related ... services" — [Uvik](https://uvik.net/blog/spec-driven-development-benchmark/)
- Piskala, arXiv 2602.00180 (2026-01-30, submitted to AIWare 2026): argues specs "as the source of truth and code as a generated or verified secondary artifact"; three levels; case studies "in API development, enterprise systems, and embedded software"; abstract cites no metrics — [arXiv](https://arxiv.org/abs/2602.00180). A separate arXiv item (2607.16680) is described in search snippets as calling a "73% security-defect reduction and the halved time-to-market" "unreplicated case results" — UNVERIFIED (not opened).
- de Macedo, arXiv 2606.04967: "a lack of benchmarks for the complete process"; calls for "intermediate-quality metrics, context governance, installation security, and reproducibility" — [arXiv](https://arxiv.org/abs/2606.04967)
- Vendor claims: Tessl loop figures (74%/50%, 94%/67%) — [tessl.io](https://tessl.io/); Augment "spec reflected an API change immediately" — [Augment](https://www.augmentcode.com/tools/best-spec-driven-development-tools)
- Anecdotes: "20x ROI" from acceptance tests (HN canterburry); Marmelab built a 3D sculpting tool "in about 10 hours with Claude Code, without writing any spec" — [HN](https://news.ycombinator.com/item?id=45935763); [Marmelab](https://marmelab.com/blog/2025/11/12/spec-driven-development-waterfall-strikes-back.html)

### Inferences
- The two best data points are not actually in conflict: Hill measures whether a spec artifact in a PR predicts defects (no), Uvik measures whether a 45-minute spec phase before agentic build raises first-review mergeability on feature work (yes, modestly). Neither measures spec maintenance over time, which is where the critics' "rot" concern lives.

### Gaps
- No study found that measures spec-anchored maintenance (does a kept spec help the second and third change?).
- No study found on the effect of recorded human approval vs none.

---

## What would stop this from managing something other than software

### Takeaway
Every platform surveyed binds its gates and its verification to software-only signals: git branches, tests, tool-call hooks, codebases to scan, and "merge" as the success event. Remove the code and what remains is a markdown interview with no way to check the artifact against reality.

### Cited Findings
- Verification is code-shaped: Spec Kit `converge` "Assesses the codebase against the spec"; Article III requires failing tests before implementation — [Agentic SDD reference](https://github.github.io/spec-kit/reference/agentic-sdd.html); [spec-driven.md](https://github.com/github/spec-kit/blob/main/spec-driven.md). Tessl links requirements to `[@test]` and `targets` are source globs — [SDD tile](https://github.com/tesslio/spec-driven-development-tile). Superpowers "deletes code written before its tests" and verifies "a clean test baseline" — [superpowers](https://github.com/obra/superpowers). Kiro "Correctness (property-based testing)" and `Sync Files` "analyzes the codebase" — [Kiro: Specs](https://kiro.dev/docs/specs/); [Best Practices](https://kiro.dev/docs/specs/best-practices/)
- Lifecycle is git-shaped: Spec Kit "auto-numbers the feature, creates a branch"; Superpowers "using-git-worktrees" and "finishing-a-development-branch ... offers merge/PR/keep/discard" — [spec-driven.md](https://github.com/github/spec-kit/blob/main/spec-driven.md); [superpowers](https://github.com/obra/superpowers)
- Context is codebase-shaped: Agent OS v3 "discovers and documents standards from your codebase"; Kiro steering `tech.md`/`structure.md`; BMAD `bmad-project-context` "for existing codebases" — [Agent OS](https://buildermethods.com/agent-os); [Kiro: Steering](https://kiro.dev/docs/steering/); [BMad docs](https://docs.bmad-method.org/)
- Enforcement is tool-call-shaped: Kiro hooks fire on `PostFileSave`, `PreToolUse`, `PostToolUse`, `Stop` — [Kiro: Hooks](https://kiro.dev/docs/hooks/)
- Outcome metrics are PR-shaped: Hill's study scores PR artifacts and SZZ defects; Uvik's benchmark scores "merge rate" — [Dagstuhl](https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.ESEM.2026.84); [Uvik](https://uvik.net/blog/spec-driven-development-benchmark/)
- Counter-examples that do generalise: BMAD ships Creative Intelligence Suite ("innovation, design thinking, storytelling") and Game Dev Studio modules, and `bmad-party-mode` multi-persona discussion is domain-free — [BMAD README](https://github.com/bmad-code-org/BMAD-METHOD); OpenSpec's delta model (ADDED/MODIFIED/REMOVED requirements with SHALL and GIVEN/WHEN/THEN scenarios, merged on archive) contains nothing software-specific — [concepts.md](https://raw.githubusercontent.com/Fission-AI/OpenSpec/main/docs/concepts.md); Spec Kit's `assess` extension (intake → research → define → shape → decide) is an idea-assessment flow with no code output — [spec-kit README](https://github.com/github/spec-kit); Kiro requirements EARS and Böckeler's "requirements vs implementation" separation are general requirements-engineering devices — [Kiro: Feature Specs](https://kiro.dev/docs/specs/feature-specs/); [Böckeler](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)
- The prose-drift critique applies more strongly outside software: Frisinger's remedy is that "CI keeps tests and code in sync, so divergence causes a failing build rather than silent drift" — a non-software domain has no CI — [dev.to/tmfrisinger](https://dev.to/tmfrisinger/spec-driven-development-is-the-prose-spec-drift-trap-reborn-4p99)

### Inferences
- Four blockers, in order of severity: (1) no verification oracle — every platform's "done" is a passing test or a merged PR; a non-software domain needs a substitute acceptance oracle (a human sign-off, a measurement, a checklist) and none of the tools provide a slot for it beyond Spec Kit's reviewer-owned `[x]` checklist; (2) no drift detector — Kiro Sync and Spec Kit converge read code to find drift; (3) the phase names and persona vocabulary (PM/Architect/Dev, tasks.md "implementation") are baked into templates; (4) tooling assumptions (Python/uv, Node, git branches per feature, IDE) are incidental but real.
- The portable parts are exactly the parts the user's loops already use: EARS/SHALL lists, role-typed questions, delta-style change records, and a reviewer-owned approval mark. The missing piece in every surveyed tool, and the one a non-software loop must supply, is a recorded "accepted/settled" line plus a non-code oracle for "did reality match the spec".

### Gaps
- No platform documentation opened claims to target non-software domains except BMAD's modules; no evidence found of anyone running Kiro/Spec Kit/OpenSpec on non-code artifacts.
