/* Explore mechanics shared by every view (R7).
   A figure opts in with <svg data-explore>. Inside it:
     [data-node="id"]        a selectable element (module, file, agent, step); id keys HARNESS.modules / files / agents
     [data-edge="a>b"]       an arrow from node a to node b (plus its label, grouped under the same attribute)
     [data-layer="name"]     an element hidden when the page's layer toggle for `name` is off
   Page chrome:
     <aside data-panel>      receives the detail of the selected node
     [data-layer-toggle]     buttons with data-layer="name", aria-pressed
   Keyboard: Tab reaches every node; Enter or Space selects; Escape clears; arrows move between nodes in document order. */
(function () {
  "use strict";
  const H = window.HARNESS || {};
  const byId = (list, id) => (list || []).find(x => x.id === id);

  function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }

  function graph(svg) {
    const nodes = Array.from(svg.querySelectorAll("[data-node]"));
    const edges = Array.from(svg.querySelectorAll("[data-edge]")).map(el => {
      const [a, b] = el.dataset.edge.split(">");
      return { el, a: a.trim(), b: b.trim() };
    });
    return { nodes, edges };
  }

  function reach(edges, start, dir) {
    const seen = new Set([start]); const stack = [start]; const used = new Set();
    while (stack.length) {
      const n = stack.pop();
      edges.forEach(e => {
        const from = dir === "down" ? e.a : e.b, to = dir === "down" ? e.b : e.a;
        if (from === n) { used.add(e); if (!seen.has(to)) { seen.add(to); stack.push(to); } }
      });
    }
    seen.delete(start);
    return { nodes: seen, edges: used };
  }

  function clear(svg) {
    svg.classList.remove("has-focus");
    svg.querySelectorAll(".is-focus,.is-up,.is-down,.is-dim").forEach(el => el.classList.remove("is-focus", "is-up", "is-down", "is-dim"));
    svg.querySelectorAll("[data-node][aria-pressed]").forEach(el => el.setAttribute("aria-pressed", "false"));
  }

  function select(svg, id) {
    const g = graph(svg);
    clear(svg);
    if (!id) { fillPanel(null); return; }
    svg.classList.add("has-focus");
    const up = reach(g.edges, id, "up"), down = reach(g.edges, id, "down");
    g.nodes.forEach(n => {
      const nid = n.dataset.node;
      if (nid === id) { n.classList.add("is-focus"); n.setAttribute("aria-pressed", "true"); }
      else if (up.nodes.has(nid)) n.classList.add("is-up");
      else if (down.nodes.has(nid)) n.classList.add("is-down");
      else n.classList.add("is-dim");
    });
    g.edges.forEach(e => {
      if (up.edges.has(e)) e.el.classList.add("is-up");
      else if (down.edges.has(e)) e.el.classList.add("is-down");
      else e.el.classList.add("is-dim");
    });
    const node = g.nodes.find(n => n.dataset.node === id);
    fillPanel(node && node.dataset.ref ? node.dataset.ref : id, { up: up.nodes, down: down.nodes });
  }

  function li(items) { return items && items.length ? "<ul>" + items.map(i => "<li>" + esc(i) + "</li>").join("") + "</ul>" : "<p class='none'>none</p>"; }
  function fileRow(id) { const f = byId(H.files, id); return f ? "<li><code>" + esc(f.path) + "</code> <span>" + esc(f.one) + "</span></li>" : "<li><code>" + esc(id) + "</code></li>"; }

  function fillPanel(id, ctx) {
    const panel = document.querySelector("[data-panel]");
    if (!panel) return;
    if (!id) { panel.innerHTML = panel.dataset.empty ? "<p class='hint'>" + esc(panel.dataset.empty) + "</p>" : ""; panel.classList.remove("is-open"); return; }
    panel.classList.add("is-open");
    const m = byId(H.modules, id);
    const f = byId(H.files, id);
    const custom = (window.VIEW_DETAIL && window.VIEW_DETAIL[id]) || null;
    let html = "";
    if (m) {
      const sys = H.systems[m.sys] || {};
      const opens = (H.open || []).filter(o => (o.touches || []).includes(m.id));
      const decs = (H.decisions || []).filter(d => (d.touches || []).includes(m.id));
      html += "<header><span class='kicker'>" + esc(sys.name || "") + " · " + (m.status === "new" ? "to build" : "existing") + "</span><h2>" + esc(m.id) + "</h2><p>" + esc(m.one) + "</p></header>";
      html += "<section><h3>Hides</h3><p>" + esc(m.hides) + "</p></section>";
      html += "<section><h3>Exposes</h3>" + li(m.exposes) + "</section>";
      html += "<section><h3>Reads</h3><ul class='files'>" + (m.reads || []).map(fileRow).join("") + "</ul></section>";
      html += "<section><h3>Writes</h3><ul class='files'>" + (m.writes || []).map(fileRow).join("") + "</ul></section>";
      html += "<section><h3>Serves</h3><p class='ids'>" + (m.serves || []).map(esc).join(" · ") + "</p></section>";
      html += "<section><h3>State</h3><p><span class='state " + esc(m.door.kind) + "'>" + esc(m.door.id ? m.door.id + " · " : "") + esc(m.door.kind) + " · " + esc(m.door.state) + "</span> " + esc(m.door.text) + "</p>"
        + (decs.length ? "<ul>" + decs.map(d => "<li><b>" + esc(d.id) + "</b> " + esc(d.title) + " — " + esc(d.choice) + " <i>(" + esc(d.state) + ")</i></li>").join("") + "</ul>" : "")
        + (opens.length ? "<p class='kicker'>Open in round 4</p><ul>" + opens.map(o => "<li><b>" + esc(o.q) + (o.star ? " ★" : "") + "</b> " + esc(o.text) + " <i>(by " + esc(o.by) + ")</i></li>").join("") + "</ul>" : "")
        + "</section>";
      html += "<p class='src'>DESIGN.md " + esc(m.src) + "</p>";
    } else if (f) {
      html += "<header><span class='kicker'>" + esc(f.kind) + " · owner: " + esc(f.owner) + "</span><h2><code>" + esc(f.path) + "</code></h2><p>" + esc(f.one) + "</p></header>";
      const readers = (H.modules || []).filter(x => (x.reads || []).includes(f.id)).map(x => x.id);
      const writers = (H.modules || []).filter(x => (x.writes || []).includes(f.id)).map(x => x.id);
      html += "<section><h3>Written by</h3>" + li(writers) + "</section><section><h3>Read by</h3>" + li(readers) + "</section>";
      html += "<p class='src'>DESIGN.md § File</p>";
    } else if (custom) {
      html += custom;
    } else {
      html += "<header><h2>" + esc(id) + "</h2></header>";
    }
    if (ctx && (ctx.up.size || ctx.down.size)) {
      html += "<section class='trace'><h3>In this figure</h3><p><b>upstream</b> " + (ctx.up.size ? Array.from(ctx.up).map(esc).join(", ") : "—") + "</p><p><b>downstream</b> " + (ctx.down.size ? Array.from(ctx.down).map(esc).join(", ") : "—") + "</p></section>";
    }
    panel.innerHTML = html + "<button type='button' class='close' data-close>Clear selection</button>";
    panel.querySelector("[data-close]").addEventListener("click", () => { document.querySelectorAll("svg[data-explore]").forEach(clear); fillPanel(null); });
  }

  function wire(svg) {
    const g = graph(svg);
    g.nodes.forEach(n => {
      n.setAttribute("tabindex", "0");
      n.setAttribute("role", "button");
      n.setAttribute("aria-pressed", "false");
      if (!n.hasAttribute("aria-label")) n.setAttribute("aria-label", n.dataset.label || n.dataset.node);
      const act = ev => { ev.preventDefault(); const already = n.classList.contains("is-focus"); document.querySelectorAll("svg[data-explore]").forEach(s => s !== svg && clear(s)); select(svg, already ? null : n.dataset.node); };
      n.addEventListener("click", act);
      n.addEventListener("keydown", ev => {
        if (ev.key === "Enter" || ev.key === " ") act(ev);
        else if (ev.key === "Escape") { clear(svg); fillPanel(null); }
        else if (ev.key === "ArrowRight" || ev.key === "ArrowDown") { ev.preventDefault(); const i = g.nodes.indexOf(n); (g.nodes[i + 1] || g.nodes[0]).focus(); }
        else if (ev.key === "ArrowLeft" || ev.key === "ArrowUp") { ev.preventDefault(); const i = g.nodes.indexOf(n); (g.nodes[i - 1] || g.nodes[g.nodes.length - 1]).focus(); }
      });
      n.addEventListener("mouseenter", () => n.classList.add("is-hover"));
      n.addEventListener("mouseleave", () => n.classList.remove("is-hover"));
    });
  }

  function layers() {
    document.querySelectorAll("[data-layer-toggle]").forEach(btn => {
      const name = btn.dataset.layer;
      const apply = on => {
        btn.setAttribute("aria-pressed", on ? "true" : "false");
        document.querySelectorAll("[data-layer='" + name + "']:not([data-layer-toggle])").forEach(el => el.classList.toggle("layer-off", !on));
      };
      apply(btn.getAttribute("aria-pressed") !== "false");
      btn.addEventListener("click", () => apply(btn.getAttribute("aria-pressed") === "false"));
    });
  }

  /* step-through for temporal and flow figures: [data-step="n"] elements; buttons [data-step-prev] [data-step-next]; a counter [data-step-count] */
  function steps() {
    document.querySelectorAll("[data-stepper]").forEach(box => {
      const items = Array.from(box.querySelectorAll("[data-step]")).map(el => +el.dataset.step);
      const max = Math.max.apply(null, items.length ? items : [0]);
      let cur = max; /* complete at rest: everything visible until the reader steps */
      const prev = box.querySelector("[data-step-prev]"), next = box.querySelector("[data-step-next]"), all = box.querySelector("[data-step-all]"), out = box.querySelector("[data-step-count]");
      const notes = box.querySelector("[data-step-note]");
      const apply = () => {
        box.querySelectorAll("[data-step]").forEach(el => el.classList.toggle("step-future", +el.dataset.step > cur));
        box.querySelectorAll("[data-step]").forEach(el => el.classList.toggle("step-now", +el.dataset.step === cur));
        if (out) out.textContent = cur + " / " + max;
        if (notes) { const n = box.querySelector("[data-step='" + cur + "'][data-note]"); notes.textContent = n ? n.dataset.note : ""; }
      };
      prev && prev.addEventListener("click", () => { cur = Math.max(1, cur - 1); apply(); });
      next && next.addEventListener("click", () => { cur = Math.min(max, cur + 1); apply(); });
      all && all.addEventListener("click", () => { cur = max; apply(); });
      box.addEventListener("keydown", ev => { if (ev.target.closest("[data-node]")) return; if (ev.key === "ArrowRight") { cur = Math.min(max, cur + 1); apply(); } if (ev.key === "ArrowLeft") { cur = Math.max(1, cur - 1); apply(); } });
      apply();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("svg[data-explore]").forEach(wire);
    layers();
    steps();
    fillPanel(null);
    document.addEventListener("keydown", ev => { if (ev.key === "Escape") { document.querySelectorAll("svg[data-explore]").forEach(clear); fillPanel(null); } });
  });

  window.VIEWER = { select, clear };
})();
