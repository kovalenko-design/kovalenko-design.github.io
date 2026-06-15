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

## Cases (starts with 3, expandable)

1. **BOSS Money** — Redesigning the International Money Transfer Experience
   - Fintech mobile app, global remittance, Flutter, Material Design system
   
2. **BOSS Revolution** — (details to be added)

3. **Mobile Top-Up UX** — (details to be added)

> New cases will be added over time. The grid must accommodate this gracefully.

---

## Design Rules

### Typography
- **Headlines:** Caudex (Google Fonts)
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

This project uses **figma-mcp-go** for free-plan Figma access without API rate limits.
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

---

## Tech Stack

- React + Vite
- CSS Modules (no exceptions — do not use inline styles or other CSS solutions)
- Google Fonts: Caudex + DM Sans
- React Router for navigation
- Framer Motion for animations and drawer transitions
- GitHub Pages deployment via `gh-pages` package
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

### Routing
`App.jsx` uses `BrowserRouter` with `basename="/git-portf"` (matches GitHub Pages path). Routes: `/` → Home, `/about` → About. Case drawer opens as an overlay on the Home route — no separate route.

### Case Data
Each case is a plain data object in `src/cases/` (one file per case). `src/cases/index.js` exports the array. Components receive case data as props — **never hardcode case content in components**. Adding a new case = add one data file + import it in `index.js`.

### Styling
CSS Modules only — no exceptions. Global CSS variables are in `src/styles/variables.css` (imported via `src/styles/global.css`). Use `var(--token-name)` throughout. Google Fonts (Caudex + DM Sans) are loaded in `global.css`.

### Assets
Case images go in `src/assets/cases/<case-id>/`. Always ask before assuming an asset filename — images are exported manually from Figma.

### GitHub Pages
`vite.config.js` sets `base: '/git-portf/'`. `package.json` has `predeploy` + `deploy` scripts using `gh-pages`. The `homepage` field is set to `https://vkovalenko.github.io/git-portf`.

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
