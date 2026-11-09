#!/usr/bin/env python3
"""Mechanical checks for a design-views page (DESIGN_VIEWS.md § Verify once).

    python3 _templates/design_views/check.py <page.html> [<page.html> ...]

Adapted from Tacta's html-design/check.py: md-twin and toc dropped (no .md twin, no contents rail here);
dark-mode read from the linked styles.css, since the tokens live in the kit, not the page.
Each check prints OK / WARN / FAIL; exit 1 on any FAIL.
  title        <title> present, 2-6 words
  viewport     viewport meta present, viewport-fit=cover
  styles       styles.css linked and present beside the page
  dark-mode    styles.css holds both dark blocks and body sets a background
  external     every http(s) src/href is fonts.googleapis.com / fonts.gstatic.com / cdnjs / jsdelivr / unpkg
  size         file under 16 MB
  h1           exactly one <h1>
  nav          every <a> in nav.linenav resolves on disk; one carries aria-current="page"
  svg-text     no font-size below 12px in <style> blocks, inline style= or SVG attributes
  left-rule    no coloured border-left/right thicker than 1px
  hex-in-body  no hard-coded hex colours in style="" attributes or <style> blocks (tokens only)
  explore      every <svg data-explore> has role="img" and aria-label; every data-edge "a>b" names nodes present in the page
  figcaption   every <figure> has a <figcaption>
  alt          every <img> has alt
  local-links  every relative href that is not an anchor resolves on disk
"""
import re, sys
from pathlib import Path

ALLOW = ("https://fonts.googleapis.com", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com",
         "https://cdn.jsdelivr.net/npm/", "https://unpkg.com")


def check(page: Path) -> int:
    html = page.read_text(encoding="utf-8")
    fails = 0

    def report(name, ok, detail="", warn=False):
        nonlocal fails
        tag = "OK  " if ok else ("WARN" if warn else "FAIL")
        if not ok and not warn:
            fails += 1
        print(f"{tag} {name:<12} {detail}")

    print(f"== {page.name}")
    m = re.search(r"<title>(.*?)</title>", html, re.S)
    words = len(m.group(1).split()) if m else 0
    report("title", bool(m) and 2 <= words <= 6, m.group(1).strip() if m else "missing")
    vp = re.search(r'<meta name="viewport" content="([^"]*)"', html)
    report("viewport", bool(vp) and "viewport-fit=cover" in vp.group(1), vp.group(1) if vp else "missing")

    css_link = re.search(r'<link rel="stylesheet" href="(styles\.css)"', html)
    css_path = page.parent / "styles.css"
    report("styles", bool(css_link) and css_path.exists(), "linked and present" if css_link and css_path.exists() else "styles.css not linked or missing")
    css = css_path.read_text(encoding="utf-8") if css_path.exists() else ""
    dark_media = re.search(r'prefers-color-scheme:\s*dark\)\s*\{\s*:root:not\(\[data-theme="light"\]\)', css)
    dark_attr = ':root[data-theme="dark"]' in css
    body_bg = re.search(r"body\s*\{[^}]*background", css)
    report("dark-mode", bool(dark_media and dark_attr and body_bg), f"media={bool(dark_media)} attr={dark_attr} body-bg={bool(body_bg)}")

    ext = sorted(set(re.findall(r'(?:src|href)="(https?://[^"]+)"', html)))
    bad = [u for u in ext if not u.startswith(ALLOW)]
    report("external", not bad, ", ".join(bad) if bad else f"{len(ext)} allowed")
    report("size", page.stat().st_size < 16 * 1024 * 1024, f"{page.stat().st_size / 1024:.0f} KB")
    report("h1", len(re.findall(r"<h1[\s>]", html)) == 1, f"{len(re.findall(r'<h1[\s>]', html))} found")

    nav = re.search(r'<nav class="linenav".*?</nav>', html, re.S)
    nav_links = re.findall(r'<a href="([^"]+)"', nav.group(0)) if nav else []
    missing = [h for h in nav_links if not (page.parent / h).exists()]
    current = bool(nav and 'aria-current="page"' in nav.group(0))
    report("nav", bool(nav) and not missing and current,
           ("missing: " + ", ".join(missing)) if missing else ("no aria-current" if not current else f"{len(nav_links)} links resolve"))

    small = []
    for v in re.findall(r"font-size:\s*([0-9.]+)px", html):
        if float(v) < 12:
            small.append(v)
    for v in re.findall(r'font-size="([0-9.]+)"', html):
        if float(v) < 12:
            small.append(v)
    report("svg-text", not small, ", ".join(sorted(set(small))) + "px" if small else "all >= 12px")

    thick = re.findall(r"border-(?:left|right):\s*([0-9.]+)px\s+solid\s+var\(--(?!rule)", html)
    thick = [t for t in thick if float(t) > 1]
    report("left-rule", not thick, f"{len(thick)} thicker than 1px" if thick else "")

    hexes = re.findall(r'style="[^"]*#[0-9a-fA-F]{3,6}\b', html) + re.findall(r"<style>.*?</style>", html, re.S)
    hexes = [h for h in hexes if re.search(r"#[0-9a-fA-F]{3,6}\b", h)]
    report("hex-in-body", not hexes, f"{len(hexes)} literal colour(s)" if hexes else "tokens only")

    svgs = re.findall(r"<svg\b[^>]*data-explore[^>]*>", html)
    bad_svg = [s for s in svgs if 'role="img"' not in s or "aria-label=" not in s]
    nodes = set(re.findall(r'data-node="([^"]+)"', html))
    edges = re.findall(r'data-edge="([^"]+)"', html)
    dangling = sorted({e for e in edges for end in e.split(">") if end.strip() not in nodes})
    report("explore", not bad_svg and not dangling,
           ("svg without role/aria-label: %d; " % len(bad_svg) if bad_svg else "") + ("dangling edges: " + ", ".join(dangling[:6]) if dangling else f"{len(nodes)} nodes, {len(edges)} edges"))

    figs = len(re.findall(r"<figure[\s>]", html)); caps = len(re.findall(r"<figcaption[\s>]", html))
    report("figcaption", figs == caps, f"{caps}/{figs}")
    imgs = re.findall(r"<img\b[^>]*>", html)
    report("alt", all(" alt=" in i for i in imgs), f"{len(imgs)} images")

    rel = [h for h in re.findall(r'href="([^"#:]+)"', html) if not h.startswith("http")]
    unresolved = sorted({h for h in rel if not (page.parent / h).exists()})
    report("local-links", not unresolved, ", ".join(unresolved) if unresolved else f"{len(set(rel))} resolve")
    print("result:", "FAIL" if fails else "OK")
    return fails


def main() -> int:
    args = [a for a in sys.argv[1:] if not a.startswith("-")]
    if not args:
        print(__doc__); return 2
    return 1 if sum(check(Path(a).resolve()) for a in args) else 0


if __name__ == "__main__":
    sys.exit(main())
