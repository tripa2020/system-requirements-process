# design_views kit

The standing files every design-views run copies into `<project>/system_design/design_view/pass<n>/`. The process that uses them is `_templates/DESIGN_VIEWS.md`.

- `styles.css` — the visual system (rectilinear transit diagram: System A blue, System B red, amber for you and interchanges, ink for the operator; Hanken Grotesk + Figtree; tokens with both dark blocks; routes, stations, explore states, stepper, tables, the fixed detail panel). Edit here, never per run; a page-local rule a builder needs is reported and folded in.
- `viewer.js` — the explore mechanics: click or Enter on a `[data-node]` selects it, traces upstream and downstream over `[data-edge="a>b"]`, fills `<aside data-panel>` from `HARNESS` (modules, then files, then `window.VIEW_DETAIL`); `[data-layer-toggle]` buttons show and hide `[data-layer]` groups; a `[data-stepper]` container steps `[data-step]` elements. Escape clears; arrows move between nodes.
- `data.js` — the skeleton of `window.HARNESS`, filled by hand from DESIGN.md for the pass drawn (mapping in its header and in DESIGN_VIEWS.md Appendix B).
- `page.html` — the scaffold of every page: head, masthead with the pass stamp, line nav, the figure pattern with the SVG grammar in comments, panel, footer, script order.
- `check.py` — mechanical checks per page (title, viewport, styles linked, dark blocks in styles.css, external allowlist, one h1, nav resolves, SVG text ≥ 12 px, no literal colours, explore attributes and dangling edges, figcaptions, local links).

Copy for a run:

```
mkdir -p <project>/system_design/design_view/pass<n>
cp _templates/design_views/{styles.css,viewer.js,data.js} <project>/system_design/design_view/pass<n>/
```

`page.html` is read, not copied: each view starts from it and renames the title. The contract in one paragraph: every selectable thing is a `[data-node="id"]` whose id is a module id or file id from `data.js` (or a `data-ref` to one, or a key in `VIEW_DETAIL`); every arrow is a `[data-edge="a>b"]` between two node ids, one element per hop; every figure is one claim, stated in its `figcaption` and its `aria-label`, with what it omits named; every colour is a token; every text in a drawing is at least 12 px at drawn scale; the body never scrolls sideways, only `.figwrap`, `.tablewrap` and `pre.code` do. The kit is the file set to copy; rules reported by builders are folded in after each run, so the kit is always current.
