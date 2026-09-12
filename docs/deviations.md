# Intentional deviations from live leerob.com

Measured against https://leerob.com on 2026-09-12 (`docs/leerob-spec.md`).
Anything **not** on this list should match the spec numbers (600px column, shell pad, 17px/1.6 type, h1 clamp, 3.5rem section gap, 0.72em blog-row padding, 0.3s ease-in-out links).

## Nav

Live leerob.com has **no** `<nav>` and no `position: fixed` chrome at 1440 or 390. Home from a post is the byline link.

This product still needs five text routes. Documented behavior:

- **≥640px / 1440:** fixed top-right vertical stack, `right: var(--page-pad)`, outside the 600px column. No hamburger.
- **≤639px / 390:** nav leaves `position: fixed` and sits in **normal document flow above the title** as a wrapping row of the five words (`Home Work About Blog Scratchpad`). Still text links, no hamburger.

## Footer

Live has **no site footer**. We render Email / GitHub / X / LinkedIn on every HTML page (`footer.site-footer.content-frame`). Required by the product, not by leerob.

## Accent `#0F766E`

Live focus/hover accent is violet `#6657c8`; in-content hover is brown `#504945`. Ours:

- `--accent: #0F766E`
- in-content link hover and current-nav color use teal
- `:focus-visible` outline is `2px solid #0F766E` (offset 3px)

Link rest color stays `#676767` with a 30% underline, 0.3s ease-in-out.

## Routes

Live puts Notes and Blogs **on `/` only**; `/blog`, `/about`, `/work` redirect home. Notes and essays are top-level slugs.

We keep separate indexes and slugs:

- `/` — identity, bio, selected work, writing, scratchpad
- `/work`, `/about`, `/blog`, `/scratchpad`
- `/blog/[slug]`, `/scratchpad/[slug]`
- `/rss.xml`, `/llms.txt`

## No collage

Live home ≥1100px is a two-column `.home-layout` with a sticky SF/Iowa illustration. We have no equivalent image, so we **do not** opt into `.home-layout`. Home stays a **centered 600px column** at 1440 (the same as live below 1100px / our posts).

## Role line

Live identity is `@leerob` only. We show `site.name` plus a muted role paragraph (`site.role`) under the h1.

## Pagella fallback

Live reading face is `local("Iowan Old Style")` then Palatino / Georgia. Linux CI does not have Iowan. We insert **TeX Gyre Pagella** (OFL, Palatino metrics) in the stack after Palatino:

`"Iowan Old Style Local", "Iowan Old Style", "Palatino Linotype", Palatino, "TeX Gyre Pagella", Georgia, serif`

Loaded face on this agent is Pagella. Not Geist/Inter.

## RSS

Live has **no** feed (`/rss` 404). We ship `/rss.xml` with both seed entries. Chromium’s XML tree view can overflow at 390; that is the browser’s XML UI, not our layout.

## About contact block

`/about` ends with a Contact list (Email, GitHub, X, LinkedIn) **and** the site footer repeats those four links. Required: contact is the last block on `/about` **and** in the footer.

## Bio Long copy

Live Long bio is a long essay plus image galleries. Our Default is the live v1 `shortBio` **verbatim** (awkward grammar kept). Long = that sentence plus extra paragraphs composed only from existing `content/site.ts` fields (Bennett B.Tech 2022–2026, Web Landers May–Dec 2024, publication title / venue / date). Instant swap, `aria-pressed`, no height animation.

## Out of scope / leftover live copy

These are **not** polish bugs:

- Sibling dim on a 1-item blog list (CSS is correct; only one seed post)
- Live-site grammar in `shortBio` (do not copyedit)
- “COREO” in Achievements (verbatim from v1)
- `/rss.xml` Chromium XML-tree horizontal scroll
