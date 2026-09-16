# QA click-through — shashwatjain.tech v2

**Branch:** `agent/portfolio-v2-296a`  
**Date:** 2026-09-12  
**Build:** `npm run build` **PASS** (Next.js 16.3.5, 13/13 static pages)  
**Server:** `npm run start` on **port 3456** (`http://127.0.0.1:3456`)  
**Browser:** Playwright Chromium, `colorScheme: 'light'`, `deviceScaleFactor: 1`  
**Viewports:** `1440×900` and `390×844`  
**Recording:** `/opt/cursor/artifacts/qa-clickthrough.webm` (also `qa-clickthrough.mp4`)  
**Frames:** `/opt/cursor/artifacts/qa-*.png` and `/workspace/docs/qa-frames/`

Routes hit: `/`, `/work`, `/about`, `/blog`, `/blog/brain-tumor-classification-deit`, `/scratchpad`, `/scratchpad/how-this-site-is-built`, `/this-page-does-not-exist` (404), `/rss.xml`, `/llms.txt`.

On `/`: Default/Long bio toggle clicked; a blog row hovered; an in-content link hovered (`Selected work` and post `16th ICCCNT`); Tab through focusable controls.

---

## Measured layout

| Route | 1440 `content-frame` | 390 `content-frame` | 390 `scrollWidth` | 390 `innerWidth` | 390 `scrollWidth > innerWidth` |
| --- | ---: | ---: | ---: | ---: | --- |
| `/` | 600px | 340px | 380 | 390 | no |
| `/work` | 600 | 340 | 380 | 390 | no |
| `/about` | 600 | 340 | 380 | 390 | no |
| `/blog` | 600 | 340 | 380 | 390 | no |
| `/blog/brain-tumor-classification-deit` | 600 | 340 | 380 | 390 | no |
| `/scratchpad` | 600 | 340 | 380 | 390 | no |
| `/scratchpad/how-this-site-is-built` | 600 | 340 | 380 | 390 | no |
| `/this-page-does-not-exist` | 600 | 340 | 380 | 390 | no |
| `/rss.xml` (Chromium XML tree) | n/a | n/a | 427 | 390 | **yes** (browser XML view, not site chrome) |
| `/llms.txt` | n/a | n/a | 390 | 390 | no |

Home at 390: `document.documentElement.scrollWidth = 380`, `clientWidth = 390`, `innerWidth = 390`. **No HTML route had `scrollWidth > innerWidth`.** The only 390 overflow is Chromium’s pretty-printed `/rss.xml` tree (`427 > 390`).

Body at both widths (HTML pages): `background #ffffff`, `color #282828`, `font-size 17px`, `font-family "Iowan Old Style Local", "Iowan Old Style", "Palatino Linotype", Palatino, "TeX Gyre Pagella", Georgia, serif`. Loaded face on this Linux agent: **TeX Gyre Pagella** (Iowan is `local()`-only and is not installed). Not Geist/Inter.

---

## Spec checklist

Visual / layout

- [x] Column is 600px at 1440; ~340px content at 390
- [x] At 390, `document.documentElement.scrollWidth <= innerWidth` on HTML routes (NO horizontal scroll). Measured. (`/rss.xml` XML viewer is the exception; see defects.)
- [x] Nav visible at 390 without a hamburger; all 5 items readable (`Home Work About Blog Scratchpad`, 12px, no hamburger)
- [ ] Nav does not overlap the h1 into unreadability — **FAIL at 390** (see defects 1–2)
- [x] Footer contact links on every HTML page (`Email GitHub X LinkedIn`). Raw `/rss.xml` and `/llms.txt` have no site chrome (expected).
- [x] No lorem ipsum, TODO, placeholder images, purple gradients, cards-with-shadows, skill bars
- [x] Type: ~17px body, Iowan/Palatino/Georgia/Pagella serif, not Geist/Inter as the reading face
- [x] Background `#ffffff` (`colorScheme: 'light'`; `html` class `light`)
- [x] Links gray (`#676767`) with soft underline (~30% alpha); hover goes teal `#0F766E` (measured on `Selected work` and `16th ICCCNT`)
- [ ] Bio Default/Long works, instant swap, aria-pressed — **partial**: `aria-pressed` swaps instantly; **copy is identical so nothing visible changes** (defect 3)
- [ ] Blog rows: title + date; hover sibling dim — **title + date yes; sibling dim not visible** (defect 4)
- [x] 404 is one line + home link (`This page does not exist. Home`)
- [x] RSS is valid XML with both seed entries (`How this site is built`, `Brain Tumor Classification Using DeiT Vision Transformer`); `Content-Type: application/xml; charset=utf-8`
- [x] First paint has readable text (no loader). Screenshot `qa-home-first-paint-1440.png` shows the name, role, and bio immediately.

Also verified

- [x] Focus rings: `:focus-visible` 2px solid `#0F766E` on title, bio buttons, in-content links, blog rows, footer (`qa-home-focus-1440.png`)
- [x] `/llms.txt` is `text/plain; charset=utf-8`, 200, not an HTML error
- [x] `/rss.xml` is XML, not an HTML error

---

## Defects

Every issue actually seen in Chromium. Polish-agent should fix; this pass does not.

1. **`/scratchpad/how-this-site-is-built` · 390×844 — nav overlaps the h1 into unreadability.** Range rect of the title “How this site is built” is `left 20 / right 315.9 / top 42 / bottom 73`. Fixed nav is `left 306.6 / right 368.8`. Glyph overlap **9.3×31 px** on “built”. Screenshot: `qa-scratchpad-note-390.png`.

2. **All HTML routes · 390×844 — fixed nav sits inside the 340px column.** Nav `left: 306.6` vs content-frame `right: 360`. Every `h1` *box* intersects the nav by **53.4px** (`overlap.intersects: true` on `/`, `/work`, `/about`, `/blog`, blog post, `/scratchpad`, scratchpad note). Short titles (`Work`, `About`, `Shashwat Jain`) keep glyphs clear; long titles wrap under the five-item stack. No reserved top-right gutter. Screenshots: `qa-home-390.png`, `qa-blog-post-390.png`, `qa-scratchpad-390.png` (current `Scratchpad` link sits on the list rule).

3. **`/` · both viewports — Bio Default/Long is a no-op.** Clicking Long sets `aria-pressed="true"` on Long and `"false"` on Default instantly, then Default restores. `#bio-content` length stays **335** characters; strings are identical (`site.shortBio === site.longBio`). User cannot tell that Long exists.

4. **`/`, `/blog`, `/scratchpad` · 1440 (hover:hover) — blog-row sibling dim never appears.** CSS is `.blogs-list:hover .blog-row { opacity: 0.8 }` / hovered row `opacity: 1`, but each list has **one** row. Hovering the Writing row leaves both on-page rows at opacity `1` (the other row is a different list). `/blog` and `/scratchpad` indexes also have a single row. Title + date rendering is fine.

5. **`/blog` and `/scratchpad` · 1440 and 390 — index `h1` is body size.** `<h1>Blog</h1>` / `<h1>Scratchpad</h1>` have **no** `content-title` class. Computed: **17px / weight 400**. Work/About/post titles are **30px (1440) / 32px (390) / weight 600**. The index heading looks like a sentence, not a title. Screenshots: `qa-blog-1440.png`, `qa-scratchpad-1440.png`, `qa-blog-390.png`, `qa-scratchpad-390.png`.

6. **`/` · both — “Selected work” does not look like a section heading.** It is `h2.content-heading > a`, so `.content-frame a` wins: **`#676767` + underline** at 23.2px. Sibling headings “Writing” and “Scratchpad” stay `#282828` with no underline. Hover correctly goes `#0F766E`. Screenshots: `qa-home-1440.png`, `qa-home-link-hover-1440.png`.

7. **`/` vs `/work` · both — project title treatment is inconsistent.** Home teaser titles (`Money Mate`, `NeuroVision`, `Suraksha-AI`) are gray underlined links (`#676767`, 17px). `/work` titles are `#282828` with no underline; only `Live` / `GitHub` are links. Home titles look like inline copy links, not list titles.

8. **`/` and `/about` · both — bio prose is unedited and reads unfinished.** “Professionally I am… Additionally I had Presented a Research Paper on Vision Transformer based system at IEEE Conference (IIT Indore)” — missing period, “had Presented” / “based system”. Same string on home Default, home Long, and About.

9. **`/about` · both — Contact section duplicates the footer.** About ends with a “Contact” list of Email / GitHub / X / LinkedIn, then the site footer repeats the same four links. Screenshot: `qa-about-1440.png`.

10. **`/this-page-does-not-exist` · 390 — two competing “Home” labels.** The 404 line is `This page does not exist. Home` while the fixed nav’s first item is also `Home`, on the same visual row. Not glyph-clipped, but cramped and ambiguous. Screenshot: `qa-404-390.png`.

11. **`/blog/…` and `/scratchpad/…` · both — byline avatar is a 20×20 grayscale `/sj.jpeg` with `alt=""`.** At that size it reads as a generic person glyph, not a recognizable portrait. Empty alt on a content image.

12. **`/about` · 390 — experience date wraps mid-token.** “May 2024–Dec” / next line “2024”. Screenshot: `qa-about-390.png`.

13. **`/about` · both — “COREO” in Achievements** (“Runner Up in Hackaccino deploying a web application on COREO”). Looks like a typo / unknown product; worth checking against the live v1 source.

14. **`/rss.xml` · 390 — `document.documentElement.scrollWidth` (427) > `innerWidth` (390).** This is Chromium’s XML tree view of a long `<description>` line, not the site layout. Still the only route that fails the numeric overflow check. 1440 XML view does not overflow (`1440 == 1440`).

---

## Non-defects / notes

- `/llms.txt` 200 `text/plain`; lists routes and contact. Not HTML.
- `/rss.xml` 200 `application/xml`; channel title `Shashwat Jain` plus both seed `<item>`s.
- No purple gradients, box-shadows, skill bars, lorem, or TODO in the rendered UI.
- Focus rings present (teal 2px).
- Footer present on every App Router HTML page including 404.
- 1440: nav is far right of the 600px column; **no** h1 glyph overlap (`h1.right 1015`, `nav.left 1314`).
- `html { scrollbar-gutter: stable }` explains 1440 `scrollWidth 1430` / `innerWidth 1440` and 390 `scrollWidth 380` / `innerWidth 390` — not overflow.

---

## Artifact index

| File | What |
| --- | --- |
| `docs/qa-frames/qa-home-1440.png` / `qa-home-390.png` | Home |
| `docs/qa-frames/qa-work-1440.png` / `qa-work-390.png` | Work |
| `docs/qa-frames/qa-about-1440.png` / `qa-about-390.png` | About |
| `docs/qa-frames/qa-blog-1440.png` / `qa-blog-390.png` | Blog index |
| `docs/qa-frames/qa-blog-post-1440.png` / `qa-blog-post-390.png` | Blog post |
| `docs/qa-frames/qa-scratchpad-1440.png` / `qa-scratchpad-390.png` | Scratchpad index |
| `docs/qa-frames/qa-scratchpad-note-1440.png` / `qa-scratchpad-note-390.png` | Scratchpad note |
| `docs/qa-frames/qa-404-1440.png` / `qa-404-390.png` | 404 |
| `docs/qa-frames/qa-rss-1440.png` / `qa-rss.xml` | RSS |
| `/opt/cursor/artifacts/qa-clickthrough.webm` | Click-through recording |
| `/opt/cursor/artifacts/qa-clickthrough.mp4` | Transcode |
| `/opt/cursor/artifacts/qa-home-bio-long-1440.png` | After Long click (identical copy) |
| `/opt/cursor/artifacts/qa-home-link-hover-1440.png` | In-content hover teal |
| `/opt/cursor/artifacts/qa-home-focus-1440.png` | Tab focus ring on footer `X` |
| `/opt/cursor/artifacts/qa-home-first-paint-1440.png` | First paint, readable text |
| `/opt/cursor/artifacts/qa-metrics.json` | Raw Playwright measurements |
