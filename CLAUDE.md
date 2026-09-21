# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

Personal portfolio website for Vadim Kovalenko, a Product Designer based in Warsaw, Poland.
Built with React, hosted on GitHub Pages (free).

The site presents Vadim's UX/UI case studies in a clean, editorial style inspired by tonik.com.
No dark mode. English only. Mobile-first responsive.

---

## Owner

**Name:** Vadim Kovalenko
**Title:** Product Designer · Scalable UX/UI · Systems & Clarity
**Email:** vadim.kavalenka@gmail.com
**LinkedIn:** https://www.linkedin.com/in/vadim-kovalenko-design/
**Location:** Warsaw, Poland

**Bio:**
I'm a product designer with 6+ years of experience in building fintech, communication, and retail products, built on a broader 15+ year design career across the U.S. and Europe. Currently leading a team designing a POS platform for small retail businesses. I focus on real user problems, work iteratively, and keep design tied to outcomes that matter.

---

## Site Structure

### Homepage
- Header: name, title, nav links (Work, About, Contact)
- Brief intro / tagline
- Case study grid — 3 to 4 cards per row, expandable over time
- Each card: cover image, project name, short description
- Footer: email, LinkedIn

### Case Study Page
- Opens as a large drawer/overlay (like tonik.com case pages)
- Full scrollable case content: hero, sections, images, copy
- Back navigation returns to homepage grid

### About Section
- Bio from CV
- Skills list
- Experience timeline (optional, can be added later)

---

## Cases (live now — grid accommodates growth)

Grid order = array order in `src/cases/index.js`. Currently live, in grid order:

1. **panther** (`/panther`) — Panther POS: the ground-up rebuild of a point-of-sale system for small retail (Kotlin Multiplatform, a design system, Pizza Builder, Consumer Engagement App)
2. **boss-money** — Redesigning the international money transfer experience (fintech mobile, Flutter, Material Design)
3. **zendit** — B2B feature design for a global prepaid platform (multi-user account management, bulk eSIM ordering)
4. **boss-revolution** — BOSS Revolution mobile app
5. **br-web-portal** — BR Web Portal

> New cases will be added over time. The grid must accommodate this gracefully.

### Adding a new case — the only recipe needed

1. Drop exported images into `src/assets/cases/<case-id>/` (ask before assuming filenames — always exported manually from Figma/Behance).
2. Create `src/cases/<case-id>.js` exporting a plain data object. Two schemas are in active use — pick whichever fits the story, don't force one onto the other:
   - **`sections` + `tools`** (bossMoney, brWebPortal, bossRevolution) — a linear array of free-form narrative sections.
   - **`features` + `context`/`approach`** (zendit) — structured per-feature blocks: `{ title, description, problem, work, image, imageCaption, imageLayout, videoId }`.
   - Common to both: `id, title, subtitle, description, tags, cover, logo, meta[], intro, introImage, retrospective, retroUrl`. Optional, used by some cases only: `splitIntro`, `introBgImage`, `introImageSmall`, `logoWide`.
3. Import it in `src/cases/index.js` and add to the `cases` array — that position sets its place in the grid.

That's the whole change. **Never hardcode case content in components** — CaseCard/CaseDrawer render whatever shape of data they're given.

---

### Section layouts available in `CaseModal.jsx` (set with `layout` on a section)
- default: `heading`, `body` (string or array; an item can be `{ lead, text }` for a bold run-in lead), `image` / `image2` / `image3` (stacked), `imageCaption`, `bodyAfter` (text after the image), `pair: [{ image, caption }, { image, caption }]` (two framed images on a gray card, each with its own caption), `clip`, `videoId` (old embeds)
- `overlay`, `info-grid` (`cells`), `two-col-body`, `two-media` (two images side by side)
- `timeline`: `stages: [{ title, body }]` joined by a dashed line (vertical on phones), plus `note: { label, body }`
- `carousel`: `slides: [{ image, caption }]` scrolling sideways with snap, arrows and dots; optional `body`
- `clip-side`: one narrow text column and the clip at two thirds of the width; optional `devices: [images]` shows a small row of drawings above the clip on a gradient strip

## Design Rules

### Typography
- **Headlines:** Encode Sans Expanded (Google Fonts), set in `variables.css` as `--font-headline`
- **Body:** DM Sans (Google Fonts)

### Color Palette
| Token | Hex |
|---|---|
| Surface | #FCFCFC |
| Background | #F2F2F2 |
| Neutral_light | #D9D9D9 |
| Neutral_dark | #565759 |
| Charcoal | #2B2B2B |
| Darkest_dark | #1E1E1E |
| Primary | #4F76BB |
| Primary_light | #74A4FF |
| Primary_light_light | #ECF0FC |
| Accent1 | #FFCA00 |
| Accent2 | #D822F3 |

> Do NOT use BM_Green (#2AAA5B), BR_gradient, or BM_gradient in site UI. These are reserved brand colors for case content only.

### Visual Style
- Clean, minimal, lots of whitespace
- Light background only — no dark mode
- Subtle hover interactions on cards
- Case drawer opens with smooth animation
- Mobile behavior mirrors desktop — same drawer pattern, stacked grid

### Layout
- Max content width: 1280px
- Card grid: 3–4 columns on desktop, 1 column on mobile
- Consistent spacing using 8pt grid

---

## Figma Access

This project was set up with **figma-mcp-go** for free-plan Figma access without API rate limits. NOTE (2026-09): the plugin repository was taken down by GitHub after a copyright notice, so the plugin cannot be downloaded any more and the setup below no longer works. Use screenshots or the official Figma connector instead.
It reads Figma files via a local plugin bridge — no REST API, no rate limits.

### Setup (run once)
Add `.mcp.json` to the project root:
```json
{
  "mcpServers": {
    "figma-mcp-go": {
      "command": "npx",
      "args": ["-y", "@vkhanhqui/figma-mcp-go"]
    }
  }
}
```
Then install the Figma plugin from: https://github.com/vkhanhqui/figma-mcp-go/releases
In Figma Desktop: **Plugins → Development → Import plugin from manifest**
Run the plugin inside the Figma file before asking Claude Code to read it.

### Usage
- Ask Claude Code to read the Figma file only when needed — don't over-fetch
- Assets that need exporting will be requested manually and placed in `/assets`
- Animations (Lottie) cannot be read via MCP — export manually when needed

---

## Assets

- Case study images exported manually from Figma or Behance
- Assets will be placed in `src/assets/cases/<case-id>/`, organized by case
- Claude Code should ask before assuming any asset filename or path
- Working files for making assets (originals, tools, docs) live in `_sources/` inside the project. It is ignored by git and lint. See `_sources/README.md`.

### Image specs — match these for every new case (measured from the 4 live cases)

- **Cover image** (`cover` field, shown on the homepage grid card): CSS enforces `aspect-ratio: 404 / 313` (≈1.29:1) with `object-fit: cover`. All 4 live covers are ~1616×1260px (2× retina at that ratio). Export new covers at the same ratio, ~1600px wide minimum — the crop is forgiving (`object-fit: cover`) but the source must already be close to 1.29:1 or the crop looks wrong.
- **Intro / section / feature images** (`introImage`, `image` inside `features`/`sections`): no fixed aspect ratio in CSS — these scale via `max-width: 100%`, so dimensions vary per case (screenshots, phone mockups, wide platform shots all coexist). Export at whatever ratio suits the actual content, at a resolution sharp on retina (≥1600px on the long edge for a full-width shot).
- **Demo clips** (`clip: { src, poster, caption }` on a section or feature): short looping mp4, muted, silent, no player chrome; it plays only while at least 45% is on screen (the bottom 15% of the screen does not count), opens full screen on click, and has small restart / pause / full-screen buttons (always visible on touch screens). Encode with a fast-start mp4 and keep each clip under about 8 MB. **Every clip needs a caption** in the form "<Feature> flow example" (the caption is part of the clip data, so a clip cannot appear without one). No YouTube embeds and no unlisted video IDs in the repo, it is public.
- Typography and color are never touched per-image — they come from `global.css` / `variables.css` (Encode Sans Expanded + DM Sans, the token table above). Nothing case-specific to configure there.

---

## Tech Stack

- React + Vite
- CSS Modules (no exceptions — do not use inline styles or other CSS solutions)
- Google Fonts: Encode Sans Expanded + DM Sans
- React Router for navigation
- Framer Motion for animations and drawer transitions
- GitHub Pages deployment via GitHub Actions on push to `main` (see Architecture → Deploy)
- ESLint + Prettier configured at project init
- Agentation MCP for visual feedback during development

---

## Commands

```bash
npm run dev        # start dev server (localhost:5173)
npm run build      # production build → dist/
npm run preview    # preview production build locally
npm run lint       # ESLint
npm run format     # Prettier (src/**/*.{js,jsx,css})
npm run deploy     # build + push to gh-pages branch
```

---

## Architecture

### Routing and deep links
`App.jsx` uses `BrowserRouter` with `basename="/"` (custom domain, no sub-path). Routes: `/` → Home, `/about` → About, `/:caseId` → Home with that case open (the case `id`, for example `/panther`). Opening a case from the grid pushes the address, and the browser's back button or the close button returns to the grid. A shared link (no history to go back to) returns to `/` on close. An unknown address redirects to `/`. The pop-up has a "Copy link" button next to the close button.
GitHub Pages cannot serve those addresses by itself, so `vite.config.js` has a small `addressPages` plugin: after the build it copies `dist/index.html` into `dist/about/`, and `dist/<case id>/` for every file in `src/cases` (the id is read from the file). A new case therefore gets its address automatically. No share-preview (Open Graph) tags: not wanted.

### Case Data
Each case is a plain data object in `src/cases/` (one file per case). `src/cases/index.js` exports the array. Components receive case data as props — **never hardcode case content in components**. Adding a new case = add one data file + import it in `index.js`.

### Styling
CSS Modules only — no exceptions. Global CSS variables are in `src/styles/variables.css` (imported via `src/styles/global.css`). Use `var(--token-name)` throughout. Google Fonts (Encode Sans Expanded + DM Sans) are loaded in `global.css`.

### Assets
Case images go in `src/assets/cases/<case-id>/`. Always ask before assuming an asset filename — images are exported manually from Figma.

### Deploy — GitHub Actions, not the `gh-pages` script
`vite.config.js` sets `base: '/'`. Custom domain `kovalenko.info` (see `public/CNAME`), `homepage` in `package.json` is `https://kovalenko.info`. **Live deploy path is `.github/workflows/deploy.yml`: push to `main` → GitHub Actions runs `npm ci && npm run build` → publishes `dist/` to GitHub Pages automatically.** The `npm run deploy` / `gh-pages` script in `package.json` still exists but is not what actually ships the site — don't rely on it, don't need to run it. Repo: `github.com/kovalenko-design/kovalenko-design.github.io` (repo name is fixed by GitHub Pages' `<org>.github.io` convention; the project itself is "Kovalenko Portfolio"). Deploy status: https://github.com/kovalenko-design/kovalenko-design.github.io/actions
`publish.sh` in the repo root is a one-command helper: stages, commits, pushes to `main`. Optional — GitHub Desktop's commit/push works the same.

---

## Feedback & Annotation Workflow

This project uses **Agentation** for visual feedback during development.
Instead of describing UI issues in words, annotations are clicked directly on the page.

### Setup (run once in terminal)
```
npm install agentation-mcp
npx add-mcp "npx -y agentation-mcp server"
```
Then restart Claude Code. Verify with: `npx agentation-mcp doctor`

### How to use during development
1. Run the dev server so the site is live in the browser
2. Click the Agentation icon (bottom-right of the page)
3. Click any element and write your feedback
4. In Claude Code say: **"address my annotations"** or **"fix annotation 3"**

### Watch mode
When doing active UI review, say **"watch mode"** in Claude Code.
Claude will automatically pick up new annotations as they are added and fix them one by one.

---

## Rules for Claude Code

- Always ask before making structural changes to the layout
- Never use placeholder lorem ipsum — ask for real copy if missing
- Keep components modular — each case is its own data object, not hardcoded
- Mobile must be tested at every step, not as an afterthought
- Do not add dark mode, animations that feel heavy, or unnecessary dependencies
- When adding a new case, only the data object should need updating — not the components
- **Percentage-based sizing requests:** When Vadim says "make this X% bigger/smaller", calculate the new value from the current one using proper math, then round up to the nearest even integer. Example: current value 14px, "make it 20% bigger" → 14 × 1.2 = 16.8 → round up to 18. All final CSS values must be whole even numbers — no decimals, no odd numbers.
