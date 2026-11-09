/* data.js — the one place facts live for a design-views run.
   Filled BY HAND from system_design/DESIGN.md for the pass being drawn; never generated. Every entry traces to a
   section named in `src`. Keep the shape: viewer.js and the pages read these fields by name.
   Mapping (DESIGN_VIEWS.md Appendix B):
     pass, date         ← DESIGN.md header line (Rounds, as-of date)
     systems            ← § System: the subsystems the diagram groups modules into; J = joint/orchestration
     modules[]          ← § Module: one entry per "### <name> (draft)"; hides/exposes/serves/door from its bullets;
                          reads/writes from § File + the module's exposes line; calls from § System arrows
     files[]            ← § File: one entry per path; kind from the folder; owner from the comment; one = the comment
     boundaries[]       ← § Interface (one line each) + interfaces.md (probe column)
     decisions[]        ← § Alternatives: id, title, one-way/two-way, state, the decision line, modules touched
     open[]             ← § Open slots: the question id if a round asks it, text, resolve-by milestone, modules touched
     milestones[]       ← § System milestone paragraphs: id, title, hours (EST), builds (module ids), one line */
window.HARNESS = {
  pass: "pass <n>",
  date: "<YYYY-MM-DD>",
  source: "../../DESIGN.md",

  systems: {
    A: { name: "System A", role: "<role>", claim: "<in and out, one line>", built: "<milestone>" },
    B: { name: "System B", role: "<role>", claim: "<in and out, one line>", built: "<milestone>" },
    J: { name: "Joint", role: "orchestration", claim: "<the session, the wrapper, the shared tool>", built: "<milestone>" }
  },

  /* modules: id · sys (A|B|J) · status new|existing · one-line claim · hides · exposes[] · serves[] · door · reads[] · writes[] · calls[] */
  modules: [
    { id: "<module>", sys: "A", status: "new", src: "§ Module <module>",
      one: "<what it is, one sentence, the reader's words>",
      hides: "<the decision it hides, from the hides: bullet>",
      exposes: ["<call → result>", "<call → result>"],
      serves: ["R1"],
      door: { kind: "two-way", id: "D<n> or omit", state: "working | decided r<n> | open", text: "<the door line>" },
      reads: ["<file id>"],
      writes: ["<file id>"],
      calls: ["<module id>"] }
  ],

  /* files: id · path · kind instruction|input|handoff|library|run|project|harness|output|external · owner · one line */
  files: [
    { id: "<file id>", path: "<path as in § File>", kind: "instruction", owner: "you | harness | run | test loop", one: "<the § File comment>" }
  ],

  /* boundaries: id · from · to (module ids, or you/inputs/external) · crosses · fails · noticed · ships · probe possible|none|n/a */
  boundaries: [
    { id: "I1", from: "<module>", to: "<module>", crosses: "<what crosses>", fails: "<how it fails>", noticed: "<how it is noticed>", ships: "<what ships anyway>", probe: "possible" }
  ],

  decisions: [
    { id: "D1", title: "<title>", kind: "one-way", state: "decided r<n>", choice: "<the decision line>", touches: ["<module>"] }
  ],

  open: [
    { q: "Q1", star: false, text: "<the open slot>", by: "M1", touches: ["<module>"] }
  ],

  milestones: [
    { id: "M0", title: "<title>", hours: null, builds: ["<module>"], text: "<one line>" }
  ]
};
