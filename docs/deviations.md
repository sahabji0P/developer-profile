# Intentional deviations from live leerob.com

Measured against https://leerob.com on 2026-09-12 (`docs/leerob-spec.md`).
Anything **not** on this list should match the spec numbers (600px column, shell pad, 17px/1.6 type, h1 clamp, 3.5rem section gap, 0.72em blog-row padding, 0.3s ease-in-out links).

## Dark only

Live leerob.com is light-first with a system dark via `next-themes`. This site is **dark only**, using the measured live dark tokens (`#1b1a19` / `#e8e5df` / `#f4f1eb` / `#aaa59e`). No light theme toggle.

## Nav

Live leerob.com has **no** `<nav>` and no `position: fixed` chrome at 1440 or 390. Home from a post is the byline link.

This product still needs five text routes. Documented behavior:

- **≥640px / 1440:** fixed top-right vertical stack, `right: var(--page-pad)`, outside the 600px column. No hamburger.
- **≤639px / 390:** nav leaves `position: fixed` and sits in **normal document flow above the title** as a wrapping row of the five words (`Home Work About Blog Scratchpad`). Still text links, no hamburger.

## Footer

Live has **no site footer**. We render Email / GitHub / X / LinkedIn on every HTML page (`footer.site-footer.content-frame`). Required by the product, not by leerob.

## Accent `#2DD4BF`

Live focus/hover accent is violet `#6657c8`; in-content hover is brown `#504945` (light) or heading cream (dark). Ours:

- `--accent: #2DD4BF` (cool teal that reads on the dark ground; earlier `#0F766E` was too muddy on `#1b1a19`)
- in-content link hover and current-nav color use teal
- `:focus-visible` outline is `2px solid #2DD4BF` (offset 3px)

Link rest color stays `#aaa59e` with a 30% underline, 0.3s ease-in-out.

## Routes

Live puts Notes and Blogs **on `/` only**; `/blog`, `/about`, `/work` redirect home. Notes and essays are top-level slugs.

We keep separate indexes and slugs:

- `/` — name, role, three-line bio, Selected work, Writing, Scratchpad
- `/work`, `/about`, `/blog`, `/scratchpad`
- `/blog/[slug]`, `/scratchpad/[slug]`
- `/rss.xml`, `/llms.txt`

Home section headings link through to `/work`, `/blog`, and `/scratchpad`.

## No collage

Live home ≥1100px is a two-column `.home-layout` with a sticky SF/Iowa illustration. We have no equivalent image, so we **do not** opt into `.home-layout`. Home stays a **centered 600px column** at 1440 (the same as live below 1100px / our posts).

## Role line + three-line bio

Live identity is `@leerob` plus a Default/Long bio toggle. We show:

- `site.name`
- a muted role paragraph (`site.role`)
- a plain three-line bio (the live About sentence split on periods — no Default/Long chrome)

Longer about copy lives on `/about`.

## Pagella fallback

Live reading face is `local("Iowan Old Style")` then Palatino / Georgia. Linux CI does not have Iowan. We insert **TeX Gyre Pagella** (OFL, Palatino metrics) in the stack after Palatino.

## RSS

Live has **no** feed (`/rss` 404). We ship `/rss.xml` with both seed entries. Chromium’s XML tree view can overflow at 390; that is the browser’s XML UI, not our layout.

## About contact block

`/about` ends with a Contact list (Email, GitHub, X, LinkedIn) **and** the site footer repeats those four links. Required: contact is the last block on `/about` **and** in the footer.

## Out of scope / leftover live copy

These are **not** polish bugs:

- Sibling dim on a 1-item blog list (CSS is correct; only one seed post)
- Live-site grammar in the home bio (do not copyedit)
- “COREO” in Achievements (verbatim from v1)
- `/rss.xml` Chromium XML-tree horizontal scroll
