# leerob.com design spec (live site, measured)

Captured **2026-09-12** with Playwright Chromium (headless), `getComputedStyle`, and layout rects. Training-data memory is not a source. **Live site wins** over the public template repo.

| Field | Value |
| --- | --- |
| Live URL | https://leerob.com |
| Essay used | https://leerob.com/dx (note), https://leerob.com/css (dated blog) |
| Template repo | https://github.com/leerob/next-mdx-blog (`leerob/site` 301s here) |
| Viewports | `1440×900` and `390×844`, `deviceScaleFactor: 1`, `colorScheme: light` unless noted |
| Method | DOM + computed styles; CSS bundle `/_next/static/chunks/38df25e856253ffd.css`; screenshots under `docs/reference/` |
| Body used width at 1440 | `1430px` (10px reserved: `html { scrollbar-gutter: stable }`) |

Reference frames (not a substitute for the numbers below):

- `docs/reference/leerob-home-1440.jpg`
- `docs/reference/leerob-home-390.png`
- `docs/reference/leerob-post-1440.jpg`
- `docs/reference/leerob-post-390.png`

---

## 1. Capture date and URLs

- **Date:** 2026-09-12
- **Live:** https://leerob.com
- **Sitemap:** https://leerob.com/sitemap.xml (200)
- **RSS:** `/rss`, `/rss.xml`, `/feed`, `/feed.xml`, `/atom.xml` → **404**. No feed.
- **List routes:** `/blog`, `/writing`, `/about`, `/work` **redirect to `/`**. `/notes` and `/n` → **404**. Notes and blogs are **homepage sections**, not separate index pages.
- **Notes** are top-level slugs (`/beliefs`, `/ai`, `/dx`, …). **Blogs** are also top-level (`/model-behavior`, `/css`, `/heroku`, …).
- **Stack (live HTML):** Next.js on Vercel (`x-nextjs-prerender: 1`), `next-themes` `ThemeProvider` (`attribute="class"`, `defaultTheme="system"`, `enableSystem`, `disableTransitionOnChange`), `class="antialiased"` on `body`. JSON-LD `Person` in `<head>`.

---

## 2. Color tokens (measured CSS variables + computed RGB)

Authoritative live tokens from `:root` (later custom layer; ignore leftover Tailwind shadcn `--background: #fff` / `--foreground: #0a0a0a` and the first `--text-copy: #171717` theme dump — computed styles resolve to the values below).

### Light (default, `html.light`)

| Token | CSS value | Computed on body / UI |
| --- | --- | --- |
| `--bg` / page background | `#fff` | `rgb(255, 255, 255)` `#ffffff` |
| `--text-copy` / body text | `#282828` | `rgb(40, 40, 40)` `#282828` |
| `--text-heading` | `#282828` | `#282828` |
| `--text-secondary` (link hover, muted brown) | `#504945` | `rgb(80, 73, 69)` `#504945` |
| `--text-nav` (links, dates, bio chrome) | `#676767` | `rgb(103, 103, 103)` `#676767` |
| `--text-nav-hover` | `#504945` | `#504945` |
| `--surface-subtle` | `#f3f3f2` | `rgb(243, 243, 242)` `#f3f3f2` |
| `--line-subtle` | `color-mix(in srgb, var(--text-copy) 10%, transparent)` | `color(srgb 0.156863 0.156863 0.156863 / 0.1)` ≈ `#282828` at 10% |
| `--divider` | `#e2e2df` | `#e2e2df` |
| `--focus-color` (**his accent / focus ring**) | `#6657c8` | `#6657c8` |
| `--code-inline` | `#ad2111` | `#ad2111` |
| `--code-background` | `#f3f3f2` | `#f3f3f2` |
| Selection | `::selection { background: color-mix(in srgb, var(--text-copy) 12%, transparent) }` | — |

**Link color is not blue.** In-content links are `#676767` with underline at 30% of that color. Hover goes to `#504945` with underline at 30% of `#504945`. Record his accent as:

- **Focus / brand-violet:** `#6657c8`
- **Hover / secondary:** `#504945`
- **Muted / link:** `#676767`

We will override our `--accent` later; do not invent `#3b82f6` because the template uses Tailwind `blue-500`.

### Dark (`html.dark`, `prefers-color-scheme: dark` via `next-themes`)

| Token | Value | Body computed |
| --- | --- | --- |
| `--bg` | `#1b1a19` | `rgb(27, 26, 25)` |
| `--text-copy` | `#e8e5df` | `rgb(232, 229, 223)` |
| `--text-heading` | `#f4f1eb` | — |
| `--text-secondary` | `#cbc6be` | — |
| `--text-nav` | `#aaa59e` | — |
| `--text-nav-hover` | `#f4f1eb` | — |
| `--surface-subtle` | `#242321` | — |
| `--code-background` | `#242321` | — |
| `--code-inline` | `#e06c5f` | — |
| `--divider` | `#3b3936` | — |
| `--line-subtle` | `color-mix(in srgb, var(--text-copy) 18%, transparent)` | — |
| `--background` (shadcn leftover) | `lab(3.69215% 0.635333 1.13429)` | not what paints the page; `--bg` does |

---

## 3. Typography

### How fonts load

**Reading face (body, titles, notes, blog titles):**

```css
@font-face {
  font-family: "Iowan Old Style Local";
  font-style: normal; /* also italic */
  font-weight: 400;   /* also 700 */
  font-display: swap;
  src: local("Iowan Old Style"), local("IowanOldStyle-Roman"), local("Iowan Old Style BT");
}
```

Italic and bold faces similarly via `local("Iowan Old Style Italic")` / `local("IowanOldStyle-Bold")` etc. **No remote woff2 for Iowan.** If the OS does not have it, the stack falls through.

```css
:root {
  --font-reading: "Iowan Old Style Local", "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif;
  --font-ui: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
body {
  font-family: var(--font-reading);
  font-size: 17px;
  line-height: 1.6;
}
```

**Computed `body` font-family:** `"Iowan Old Style Local", "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif`.

**UI face** (bio toggle, article meta, blog dates, footnotes): `--font-ui` as above. **Not Geist.** Tailwind `--default-font-family` still mentions Geist, but body overrides it. `Caveat` (Google, weight 500) is in the CSS bundle and unused on home/post.

Mono (code): `SF Mono, Monaco, Inconsolata, Fira Code, monospace`; `pre code` `font-size: 13px; line-height: 1.4`.

### Measured type ramp

Root `font-size` is the browser default `16px` (rems below assume 16). Body is explicitly `17px`.

| Role | Selector | font-family | size | weight | line-height | letter-spacing | color | extra |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Body | `body` | `--font-reading` | **17px** | 400 | **27.2px** (1.6) | `normal` | `#282828` | `antialiased`; `letter-spacing: normal` (not tracking-tight) |
| Name / home h1 | `h1.site-title` | `--font-reading` | **42.4px** at 1440 = `clamp(2.2rem, 3.5vw, 2.65rem)` → 2.65rem; **35.2px** at 390 = 2.2rem | **600** | **48.76px** (1.15) at 1440; 40.47px box at 390 | **-0.848px** (−0.02em) at 1440 | `#282828` | margin `0 0 40.28px` (0.95em) at 1440; at ≤639px margin-bottom **0.9em** |
| Home title link | `a.site-title-link` | inherit | inherit | inherit | inherit | inherit | inherit | `text-decoration: none`; hover `opacity: 0.72` (measured) in **0.3s ease-in-out** |
| Role line | *(none)* | — | — | — | — | — | — | No separate subtitle. Identity is `@leerob` (X link). Short bio is two `p.content-paragraph`. |
| Bio chrome | `.bio-toggle` | `--font-ui` | **14px** | 400 | **19.6px** (1.4) | **0.14px** (0.01em) | `#676767` | flex, space-between, baseline |
| Bio active option | `button[aria-pressed=true]` | `--font-ui` | 14px | 400 | 19.6px | 0.14px | **`#282828`** | 1px underline via `::after` at `bottom: -0.62rem` |
| Section headings (Notes / Blogs) | `.writing-index h2` | `--font-reading` | **23.2px** (1.45rem) | **600** | **32.48px** (1.4) | **-0.464px** (−0.02em) | `#282828` | margin-top 0 on the h2; section spacing 3.5rem (see layout) |
| Post/section h2 | `h2.content-heading` | `--font-reading` | **23.2px** (1.45rem) | **600** | **32.48px** (1.4) | **-0.464px** | `#282828` | margin **49.6px 0 19.2px** (3.1rem / 1.2rem) |
| h3 | `.content-subheading` | `--font-reading` | 1.35rem (21.6px) | 400 italic | 1.4 | −0.02em | `--text-heading` | CSS; not on `/dx` |
| Small italic h | `.content-small-heading` | inherit reading | 0.97rem (15.52px) | 400 italic | 1.4 | — | `--text-heading` | CSS |
| List items (notes + post ul) | `li` / `.content-list` | `--font-reading` | **17px** | 400 | **27.2px** | `normal` | `#282828` | `list-style: square` |
| Notes links | `.notes-list a` | `--font-reading` | 17px | 400 | 27.2px | normal | **`#676767`** | underline 30% |
| Blog row title | `a.blog-row` | `--font-reading` | **17px** | 400 | **27.2px** | normal | **`#282828`** | no underline |
| Blog date | `a.blog-row time` | `--font-ui` | **14px** | 400 | **22.4px** | 0; `font-variant-numeric: lining-nums tabular-nums` | **`#676767`** | nowrap at 1440 |
| Nav | *(none)* | — | — | — | — | — | — | No `<nav>`, no fixed link stack. See §11. |
| Footer | *(none)* | — | — | — | — | — | — | No site footer. See §9. |
| Post title 1440 | `h1.content-title` | `--font-reading` | **30px** | **600** | **33px** (1.1 when followed by `.article-meta`) | **-0.6px** (−0.02em) | `#282828` | margin `0 0 12px` |
| Post title 390 | `h1.content-title` | `--font-reading` | **32px** (2rem, max-width 639px override) | 600 | **35.2px** | **-0.64px** | `#282828` | margin `0 0 12px` |
| Post date / byline | `a.article-meta` | `--font-ui` | **13px** | 400 | **17.55px** (1.35) | `normal` on the row; details **-0.065px** (−0.005em) | **`#676767`** | `text-decoration: none`; flex; gap **7.2px** (0.45rem) |
| Post body | `p.content-paragraph` | `--font-reading` | **17px** | 400 | **27.2px** | `normal` | `#282828` | margin `0 0 23.2px` (1.45rem) |
| Emphasis | `em.content-emphasis` | inherit | 17px | **400 italic** | 27.2px | normal | `#282828` | CSS `font-style: italic; font-weight: 400` |
| Strong | `.content-strong` | inherit | — | **700** | — | — | — | CSS |

`@leerob` uses a slightly raised `@`: `.site-title-at { font-size: 1.1em; top: 0.015em; margin-right: 0.015em }`.

---

## 4. Layout

### Shell and measure

```css
.site-shell {
  --page-pad: clamp(1.25rem, 3.4vw, 3.25rem);
  min-height: 100vh;
  padding: var(--page-pad);
  container-type: inline-size;
}
.content-frame {
  --content-width: 600px;
  width: min(100%, var(--content-width));
  margin-inline: auto;
  position: relative;
}
@media (max-width: 639px) {
  .site-shell { padding: 2.5rem 1.25rem 1.25rem; }
}
```

| Viewport | `main.site-shell` padding (computed) | `.content-frame` used width | Frame x | Frame padding | Horizontal page pad |
| --- | --- | --- | --- | --- | --- |
| **1440×900** | **48.96px** all sides (`3.4vw × 1440 = 48.96`, clamp between 20px and 52px) | **600px** | Home: frame box is centered at **x=415**; text column pulled left to **x=48.95** by `.home-layout` negative margin. Posts: frame **x=415**, **y=96.95** | **0px** | **48.96px** on the shell, **0** on the column |
| **390×844** | **40px 20px 20px** (2.5rem / 1.25rem / 1.25rem) | **340px** (`380 − 20 − 20`; body width 380 because of scrollbar gutter) | **x=20, y=40** | **0px** | **20px** |

`.content-frame` has **no horizontal padding**. Side inset is entirely `.site-shell` padding. Max content width is **exactly 600px**, not `60ch`.

### Home two-column (min-width: 1100px only)

```css
@media (min-width: 1100px) {
  .home-layout {
    width: min(100cqi, 1500px);
    margin-inline: calc((var(--content-width) - min(100cqi, 1500px)) / 2);
    grid-template-columns: minmax(0, 1.75fr) minmax(380px, 1fr);
    gap: clamp(2rem, 3.6vw, 3.75rem);
    display: grid;
    align-items: start;
  }
  .home-copy { width: min(100%, var(--content-width)); } /* 600px */
  .home-visual {
    display: block;
    position: sticky;
    top: var(--page-pad); /* 48.96px */
    height: calc(100svh - (2 * var(--page-pad)));
    min-height: min(72svh, 760px);
  }
}
```

Measured at 1440:

- `.home-layout`: **1332.09×1122.17**, `display: grid`, gap **51.84px** (`3.6vw × 1440`), margin-inline **-366.047px**
- `.home-copy`: **600×1122.17** at **x=48.95, y=48.95**
- `.home-visual`: **465.56×802.08** at **x=915.48, y=48.95**, `position: sticky`, `top: 48.96px`, bg `#f3f3f2`, `border: 1px solid` line-subtle, `border-radius: 10px`
- Below 1100px (including 390): `.home-layout` is `display: block`; `.home-visual` is **`display: none`** (0×0)

### Article pages

At `min-width: 1100px`, `.content-frame:has(> .content-title + .article-meta)` gets **`margin-top: 48px`** in addition to shell pad → title at **y=96.95**. At 390 that extra margin is **0**.

At `min-width: 1400px`, desktop margin notes (`.margin-note-desktop`) sit `position: absolute; left: calc(100% + 2rem); width: 240px`. Empty `.article-margin-notes` footer is `display: none`.

### Vertical rhythm

| From → to | Measured gap | Source |
| --- | --- | --- |
| h1 → bio toggle | 40.28px | `.site-title` margin-bottom 0.95em |
| Bio section bottom → Notes h2 | **56px** | `.writing-index { margin-top: 3.5rem }` collapsed with `.bio-section { margin-bottom: 3.25rem }` (52px); 3.5rem wins |
| Notes list bottom → Blogs h2 | **56px** | `.writing-index > section + section { margin-top: 3.5rem }` |
| Section h2 → list | Notes h2 margin-bottom **19.2px** (1.2rem); `.notes-list` extra margin-top **13.6px** (0.8em) |
| `.bio-section` | margin-bottom **52px** (3.25rem) | |
| Body paragraphs | margin-bottom **23.2px** (1.45rem) | |
| Post h2 | margin **49.6px 0 19.2px** | |
| Post byline | margin **0 0 38.4px** (2.4rem) | |
| Post ul.content-list | margin **16px 0 19.2px 24px**; `list-style: square` | |

---

## 5. Homepage section order and spacing

Order in `.home-copy` (1440 and 390):

1. **`h1.site-title`** → `@leerob` (`a.site-title-link` → `https://x.com/leerob`)
2. **`section.bio-section`**
   - `.bio-toggle`: label `Bio` + options `Default` | `Long`
   - Default: two `p.content-paragraph`
3. **`.writing-index`**
   - **Notes** (`h2`) + `ul.notes-list` (10 square-bullet links, 2 columns at 1440)
   - **Blogs** (`h2`) + `.blogs-list` of `a.blog-row` (title + `time`)
4. **`.home-visual`** (sibling of `.home-copy`, only ≥1100px): SF / Iowa collage `img.home-visual-image` + `video.home-visual-video` (`opacity` crossfade **0.24s**)

Default bio copy (live, 2026-09-12):

> I’m an engineer and writer. I work on ML at SpaceX (formerly at Cursor) where I help train useful AI models. Previously, I worked at Vercel on Next.js. I’ve been coding for 15 years and teaching for the second half.
>
> My life’s work is to make technology easy to understand and interesting to learn about. I’m a husband to my much cooler wife, a father to two radiant daughters, and a massive music fan. I also advise companies and angel invest.

Inline links: `Cursor` (`.home-cursor-link` → `/cursor`, custom cursor SVG), `Vercel` (`.home-vercel-link` → `/vercel`), `angel invest` (`mailto:lee@leerob.com`).

---

## 6. Bio expand / collapse

**There is no `more` / `less` control and no `<details>`.** Mechanism:

```html
<div class="bio-toggle">
  <span>Bio</span>
  <div class="bio-toggle-options" aria-label="Bio length">
    <button type="button" aria-controls="bio-content" aria-pressed="true">Default</button>
    <button type="button" aria-controls="bio-content" aria-pressed="false">Long</button>
  </div>
</div>
```

- **Not** `details/summary`.
- **Not** CSS `grid-template-rows: 0fr / 1fr`.
- **Not** `max-height` animation.
- Clicking **Long** sets `aria-pressed="true"` on that button, swaps the panel to `div.long-bio` (long essay + `.bio-gallery` image grids). Height jumped **1122px → 5498px by t=7ms** with `overflow: visible`, `max-height: none`, `grid-template-rows: none`, `opacity: 1` throughout. **No height/opacity animation on the bio body.**
- Active tab: `color: var(--text-copy)` plus `button[aria-pressed=true]:after { height: 1px; background: var(--text-copy); position: absolute; bottom: -0.62rem; left: 0; right: 0 }` sitting on the toggle’s `border-bottom: 1px solid var(--line-subtle)`.
- Toggle metrics: height **35.77px**, padding-bottom **8.8px** (0.55rem), margin-bottom **21.6px** (1.35rem), options `display: flex; gap: 1rem (16px); margin-left: auto`. Buttons: padding-block **3.2px** (0.2rem), `background: none; border: 0; cursor: pointer`.
- Long bio also contains `.bio-gallery-item` buttons (`transition: opacity 0.16s, transform 0.16s`; hover `opacity: 0.88; transform: translateY(-2px)`).

If we implement a shorter “more” control, match **tab underline + instant content swap** (or document a deliberate deviation). Do not copy a 0fr/1fr accordion unless we choose to.

---

## 7. Notes and Blog list layout

### Notes (`ul.notes-list`)

| Prop | 1440 | 390 (≤639px) |
| --- | --- | --- |
| `column-count` | **2** | **1** |
| `column-gap` | **40px** (2.5rem) | n/a |
| `padding-left` | **18.7px** (1.1em) | same |
| `margin` | **13.6px 0 0** (0.8em) | same |
| `list-style` | **square** | square |
| `li` margin-bottom | **3.2px** (0.2rem) | same |
| `li` padding-left | **2.55px** (0.15em) | same |
| `break-inside` | `avoid` | avoid |
| Link style | in-content link (`#676767` + 30% underline) | same |

Used box at 1440: **600×151.88** at y=489.33. Ten items.

### Blogs (`.blogs-list` > `a.blog-row`)

`.blogs-list`: `border-top: 1px solid var(--line-subtle)`; margin-top **14.45px** (0.85em); used **600×422.25**.

`a.blog-row` at 1440:

| Prop | Computed |
| --- | --- |
| display | **grid** |
| grid-template-columns | **minmax(0,1fr) auto** → used `521.094px 58.9062px` |
| gap | **20px** (1.25rem) |
| align-items | baseline |
| padding | **12.24px 0** (0.72em) |
| border-bottom | 1px solid line-subtle (~`#282828` @ 10%) |
| color | `#282828` |
| text-decoration | **none** |
| transition | **opacity 0.3s ease-in-out** (only `@media (hover: hover) and (pointer: fine)`) |
| used height | **52.66px** (single-line title) |

At ≤639px: `grid-template-columns: 1fr; gap: 0.15rem` — date wraps under title (`time { font-size: 13px }` in that media query).

**Hover (measured):** hovering one row sets **siblings to opacity 0.8** and the hovered row to **opacity 1** (`.blogs-list:hover .blog-row { opacity: 0.8 }` / `.blogs-list:hover .blog-row:hover { opacity: 1 }`). Duration **0.3s ease-in-out**.

Dates live only on the index row and on dated posts’ `.article-meta` (`<time>January 2024</time>·Lee Robinson`). Notes such as `/dx` omit `<time>` and show avatar + name only.

---

## 8. Link and hover styles

```css
.content-frame a {
  color: var(--text-nav); /* #676767 */
  text-decoration-line: underline;
  text-decoration-color: color-mix(in srgb, var(--text-nav) 30%, transparent);
  text-decoration-skip-ink: auto;
  text-underline-offset: auto;
  text-decoration-thickness: auto;
  transition: color 0.3s ease-in-out, text-decoration-color 0.3s ease-in-out;
}
.content-frame a:hover {
  color: var(--text-secondary); /* #504945 */
  text-decoration-color: color-mix(in srgb, var(--text-secondary) 30%, transparent);
}
```

Measured on `a.home-cursor-link` (“Cursor”):

| State | color | text-decoration-color |
| --- | --- | --- |
| Rest | `rgb(103, 103, 103)` `#676767` | `color(srgb 0.403922 0.403922 0.403922 / 0.3)` |
| Hover (after 350ms) | `rgb(80, 73, 69)` `#504945` | `color(srgb 0.313726 0.286275 0.270588 / 0.3)` |

Exceptions:

| Selector | Rest | Hover |
| --- | --- | --- |
| `a.site-title-link` | color inherit, **no underline** | **opacity 0.72** (measured), color inherit |
| `a.blog-row` | `#282828`, no underline | opacity treatment in §7 |
| `a.article-meta` | `#676767`, no underline | `color: var(--text-secondary)` |
| `a.home-cursor-link` | custom `cursor: url(/logos/cursor-mark.svg) 10 11, pointer` | same color transition |
| `a.home-vercel-link` | `cursor: url(/logos/vercel-mark.svg) 9 1, pointer` | same |

Focus-visible (buttons, links, summary): `outline: 2px solid #6657c8; outline-offset: 3px; border-radius: 2px`.

---

## 9. Footer

**No site footer.** The only `<footer>` is `<footer class="article-margin-notes" aria-label="Notes"></footer>`:

- empty → `display: none` (0×0)
- `flex-direction: column; margin-top: 2rem` when populated
- at `min-width: 1400px` hidden in favor of side `.margin-note-desktop`

Social presence is the **h1 `@leerob` → X** and **mailto** in the bio. Template footer (`@johnsmith`, youtube, linkedin, github, `text-gray-400 hover:text-blue-500`) is **not** on the live site.

Article “footer” equivalent: `.article-meta` byline linking **home** (`href="/"`), 20×20 grayscale avatar (`filter: grayscale()`, 1px line-subtle border, radius 9999px) + 13px UI name.

---

## 10. Animations and interactions catalog

### Page-load fades

**None.** Sampled `.home-copy` / `.content-frame` opacity from t=55ms–2516ms: always **`1`**. `animation-name: none` on all elements. No `@keyframes` in the live CSS bundle. Do not add a fade-in unless we explicitly want a deviation.

### Hover transitions (duration, easing, properties)

| Target | properties | duration | easing |
| --- | --- | --- | --- |
| `.content-frame a` | `color`, `text-decoration-color` | **0.3s** | **ease-in-out** |
| `.site-title-link` | `opacity` (0.72) via same 0.3s color transition bucket + opacity change | 0.3s | ease-in-out |
| `a.blog-row` | `opacity` | **0.3s** | **ease-in-out** (fine pointer + hover only) |
| `.bio-gallery-item` | `opacity`, `transform` | **0.16s** | default `ease` |
| `.home-visual-image` / `.home-visual-video` | `opacity` | **0.24s** | `ease` |
| `summary:before` (in-article details, if used) | `transform` rotate(90deg) | **0.16s** | default |
| Tailwind leftover `.duration-150` / `.transition-colors` | not what in-content links use | 0.15s / cubic-bezier(0.4,0,0.2,1) | ignore for body copy |

Default Tailwind `--default-transition-duration: 0.15s` is **not** the link timing. Links are **0.3s ease-in-out**.

### Bio expand animation

**None on the panel.** Instant swap Default ↔ Long. Only the tab underline (`::after`) and color change. Gallery tiles inside Long use 0.16s opacity/transform.

### Link underline behavior

Always on for body/notes links (not hover-reveal). Thickness `auto`, offset `auto`, skip-ink `auto`. Color is **30% mix** of the link color, so the line is softer than the glyphs. Hover retints both glyph and line to `#504945` at 30%. **No `underline-offset` custom value** (computed `auto`). Blog rows and the title are the no-underline exceptions.

### View transitions between routes

| Check | Result |
| --- | --- |
| `document.startViewTransition` | **exists** (Chromium API) |
| CSS `::view-transition` rules in stylesheets | **0 hits** |
| Authored `view-transition-name` besides html | **none**. `html` computes `view-transition-name: root` (UA default) |
| Next.js `viewTransition` in HTML/RSC | **not present** |
| Click internal link | navigated `/` → `/cursor`; no custom VT CSS |

Treat as **no designed view transitions**. Do not enable Next.js `viewTransition` just to mimic leerob unless we add our own.

### Scroll behavior

- `html { scroll-behavior: auto }` (computed). **Not** `smooth`.
- `scrollbar-gutter: stable; scrollbar-width: thin; scrollbar-color: gray transparent`
- `body { overflow-x: clip }`
- Sticky visual uses `top: var(--page-pad)` only on home ≥1100px

### `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  *, :before, :after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

`page.emulateMedia({ reducedMotion: 'reduce' })` measured link transition as **`1e-05s`** (`0.01ms`) ease-in-out. No other motion to disable (no page fade, no bio height anim).

---

## 11. 1440px vs 390px “nav” behavior (must be specific)

**Live leerob.com (2026-09-12) has no site navigation chrome at either width.**

| Check | 1440×900 | 390×844 |
| --- | --- | --- |
| `<nav>` / `[role=navigation]` | **none** | **none** |
| `position: fixed` elements | **none** | **none** |
| `position: sticky` | `.home-visual` only (right column) | **none** (visual `display: none`) |
| Hamburger / menu icon / `aria-label=menu` | **none** | **none** |
| Top-right vertical link stack (home / blog / notes) | **absent** | **absent** |
| How you get home from a post | `a.article-meta[href="/"]` under the title (avatar + name, 13px UI, no underline) | **same**, still in document flow, not fixed |
| How you get to notes/blog | **in-page lists** on `/` | **same**, single column |

Do **not** implement a fixed top-right vertical nav “because older leerob had one.” That is not on the live site. If our product requires a nav, it is a **documented deviation**: keep it out of a hamburger at 390px (live has none), keep it text links, and do not steal the 600px column.

Home identity at both widths is the in-flow `h1`. At 390 the h1 is 35.2px; shell pad is 40/20/20; notes collapse to 1 column; blog dates stack under titles. Still no menu button.

---

## 12. Live site vs `next-mdx-blog` repo

Cloned 2026-09-12 from https://github.com/leerob/next-mdx-blog (also the target of `github.com/leerob/site`).

| Topic | Repo template | Live leerob.com | Winner |
| --- | --- | --- | --- |
| Font | `next/font/google` **Inter**; `--font-family-sans: Inter, sans-serif`; `tracking-tight` on body | **Iowan Old Style** via `local()` @font-face + Palatino/Georgia stack; body 17px / 1.6 / no tight tracking | **Live** |
| Measure | `main.max-w-[60ch].mx-auto.w-full.space-y-6` inside `p-8` (`32px`) shell, `md:pt-8` | **`--content-width: 600px`**, shell `padding: clamp(1.25rem, 3.4vw, 3.25rem)` / mobile `40px 20px 20px` | **Live** |
| Home | Single MDX page, `h1` “John Smith”, example `/n/1` links | `@leerob` + Default/Long bio + Notes + Blogs + sticky illustration ≥1100px | **Live** |
| Notes routing | `app/n/{id}/page.mdx` | Top-level `/{slug}` (`/dx`, `/beliefs`, …). `/n` 404 | **Live** |
| Indexes | No Notes/Blogs sections; “Examples” list | Homepage two-column notes + dated blog rows; `/blog` `/writing` redirect home | **Live** |
| MDX components | Tailwind utilities (`text-gray-800`, `leading-snug`, `text-blue-500`) in `mdx-components.tsx` | Semantic classes: `content-paragraph`, `content-title`, `content-heading`, `content-list`, `content-emphasis`, `content-link` | **Live** |
| Links | `text-blue-500 hover:text-blue-700`; dark underline | Gray `#676767` + 30% underline → `#504945` in 0.3s | **Live** |
| Footer | Centered X/YouTube/LinkedIn/GitHub, `hover:text-blue-500 transition-colors duration-200` | **No footer** | **Live** |
| Nav | None in template either | None | same |
| Theme | `dark:bg-zinc-950` utilities + `prefers-color-scheme` in CSS | `next-themes` class `.dark` with warm tokens (`#1b1a19` / `#e8e5df`) | **Live** |
| Syntax | `sugar-high` + same `--sh-*` Tokyo-night-ish tokens | Same `--sh-class: #7aa2f7` etc. in the live bundle | shared |
| RSS | None | None | same |
| Sitemap | `app/sitemap.ts` over `app/n` + `/` | `sitemap.xml` of `/` + essays + `/_glossary/*` | **Live** (richer) |
| MDX pipeline | `@next/mdx` + `experimental.mdxRs: { mdxType: 'gfm' }`, `pageExtensions: ['mdx','ts','tsx']` | Same family (MDX pages, GFM lists/headings, prerendered). Live also has React islands (bio toggle, galleries, theme) | copy live class names, not template utilities |
| Analytics | `@vercel/analytics` | Present (`Analytics` in RSC payload) | shared |
| Motion | `framer-motion` in package.json | Not observed as page-load animation; bio is a React press-state | don’t add Framer fades |
| Metadata | `John Smith`, `metadataBase: next-mdx-blog.vercel.app` | `Lee Robinson`, `description: Developer and writer.`, OG 1280×720 | **Live** |
| Redirects | Optional Postgres `redirects` table | `/blog` `/writing` `/about` → `/` | **Live** |
| Code UI | `code` 14px Menlo, gray-100 chip | `pre` radius 0.45rem, pad `1rem 2rem 1rem 1rem`, 13px, `--code-background` | **Live** |

**Implementation rule:** copy live computed values and live class semantics. Use the repo only as a sketch of MDX-in-App-Router (`page.mdx` + `useMDXComponents`), sitemap, and sugar-high — not for color, type, nav, or footer.

---

## 13. Implementation notes for shashwatjain.tech

`app/globals.css` currently has empty slots for the layout agent. Set them from **live**, then we override accent for our brand later:

```css
:root {
  --background: #ffffff;          /* --bg */
  --foreground: #282828;          /* --text-copy / --text-heading */
  --muted: #676767;               /* --text-nav (links, dates, chrome) */
  --accent: #504945;              /* HIS hover/secondary; we will replace */
  --accent-focus: #6657c8;        /* HIS focus ring — record even if unused */
  --measure: 600px;               /* --content-width */
  --font-sans: "Iowan Old Style Local", "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif;
  --font-ui: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --surface-subtle: #f3f3f2;
  --line-subtle: color-mix(in srgb, var(--foreground) 10%, transparent);
  --page-pad: clamp(1.25rem, 3.4vw, 3.25rem);
}
```

Do **not** keep Geist as the reading face if the goal is leerob-faithful. Load Iowan the way he does (`local()` + Palatino/Georgia). If Iowan is missing on Linux CI, Palatino/Georgia is the designed fallback — that is acceptable.

### Nav structure to copy

```
main.site-shell
  article.content-frame
    [home] div.home-layout
      div.home-copy
        h1.site-title
        section.bio-section (Default/Long)
        div.writing-index
          section Notes (ul.notes-list)
          section Blogs (div.blogs-list > a.blog-row)
      aside.home-visual   /* optional; hide <1100px */
    [post] h1.content-title + a.article-meta[href=/] + prose
    footer.article-margin-notes  /* omit if empty */
```

- No hamburger at 390px.
- No fixed top-right stack.
- Home from posts = byline link, not a floating nav.

### MDX patterns to copy (live, not template utilities)

Map MDX elements to classes:

| MDX | Class | Notes |
| --- | --- | --- |
| `h1` | `content-title` | 30px / 600 / −0.02em; 2rem at ≤639px |
| `h2` | `content-heading` | 1.45rem / 600 / margin 3.1rem 0 1.2rem |
| `p` | `content-paragraph` | 17px / 1.6 / margin-bottom 1.45rem |
| `ul` | `content-list` | square, `margin: 1rem 0 1.2rem 1.5rem` |
| `ol` | `content-ordered-list` | decimal, `margin-left: 2rem` |
| `a` | (default `.content-frame a`) | gray underline 30% / 0.3s ease-in-out |
| `em` | `content-emphasis` | italic 400 |
| `strong` | `content-strong` | 700 |
| `blockquote` | `content-blockquote` | 2px left bar mixed nav/bg, pad 1.25rem, color `--text-secondary` |

Index pages: put Notes + Blogs **on home**, like live. Optional `/n/` folder from the template is **not** what live does.

Also copy:

- `html { scrollbar-gutter: stable; scrollbar-width: thin }`
- reduced-motion `transition-duration: 0.01ms`
- `next-themes` with `disableTransitionOnChange` if we support dark
- sugar-high token set if we highlight code
- **No RSS** unless we add our own
- **No page-load fade**, **no view-transition CSS**

### Numbers to treat as law

- Column: **`width: min(100%, 600px)`**, **padding 0**, centered in the shell (home ≥1100px is the only left-shifted exception)
- Shell pad: **`clamp(1.25rem, 3.4vw, 3.25rem)`**; ≤639px **`40px 20px 20px`**
- Body: **17px / 400 / 27.2px / `#282828` / Iowan stack**
- Links: **`#676767` → `#504945`**, underline 30% mix, **0.3s ease-in-out**
- Home h1: **`clamp(2.2rem, 3.5vw, 2.65rem)` / 600 / 1.15 / −0.02em**
- Post h1: **30px / 600 / 1.1 / −0.02em** (32px at 390)
- Section h2: **1.45rem / 600 / 1.4 / −0.02em**
- Section gap: **3.5rem**
- Blog row: grid `1fr auto`, pad **0.72em 0**, date **14px UI `#676767`**, hover sibling opacity **0.8** in **0.3s**
