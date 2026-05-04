# Dipanshu Sharma — Portfolio

> A premium, 2026-era developer portfolio. Built as a single-page editorial experience that doubles as a working artifact of the engineer behind it.

**Live narrative:** A senior frontend engineer with 7+ years across enterprise scale (Cisco Webex), high-traffic e-commerce (Kaufland), and other startup environments. The site argues — through structure, type, and motion — that the author thinks like a *product-minded architect*.

---

## The "Engineer's Console" (Dev Mode)

Toggle with **`⌘ .`** / **`Ctrl + .`** or the button in the nav.

What it reveals:

- A 12-column grid overlay aligned to the design system
- Live FPS, viewport size, and active section
- An **Architecture View** — an SVG node graph of the app's component tree, animated with Framer Motion

This isn't decoration. It's the same kind of tooling I reach for when debugging real apps, exposed as a feature.

---

## Sections

| # | Section | Story |
|---|---|---|
| 01 | **Hero** | The thesis: *"Building interfaces that scale to millions."* |
| 02 | **Experience** | A vertical timeline. Each company gets its own accent color and metric shelf. |
| 03 | **Stack / Constellation** | A T-shaped skill map rendered as a constellation — distance from center = expertise, angle = category. No progress bars. |
| 04 | **Contact / Sign-off** | Editorial close with channels, locale signal, and education appendix. |

---

## Tech Stack

```
React 18  ·  TypeScript  ·  Vite  ·  SCSS (Sass modern compiler)
Framer Motion  ·  Lenis (smooth scroll)
```

No CSS framework. No UI library. No template starter. Hand-built.

---

## Getting Started

```bash
# install
pnpm install        # or: npm install / yarn

# dev (opens at http://localhost:5173)
pnpm dev

# type-check
pnpm type-check

# production build
pnpm build

# preview the production bundle
pnpm preview
```

> Requires Node ≥ 18.

---

## Project Structure

```
src/
├── App.tsx                  # Composes provider + sections
├── main.tsx                 # ReactDOM root
├── components/
│   ├── Navigation.tsx       # Fixed nav with glass-on-scroll + dev toggle
│   ├── DevConsole.tsx       # The Engineer's Console (grid, telemetry, arch view)
│   ├── SectionHeader.tsx    # Shared editorial header
│   └── Footer.tsx           # Build-meta footer
├── sections/
│   ├── Hero.tsx
│   ├── Experience.tsx       # Timeline
│   ├── Stack.tsx            # T-shape constellation
│   └── Contact.tsx          # Sign-off + education
├── context/
│   └── DevModeContext.tsx   # Dev mode state + telemetry + ⌘. shortcut
├── hooks/
│   ├── useSmoothScroll.ts   # Lenis init (respects prefers-reduced-motion)
│   ├── useScrollSection.ts  # IntersectionObserver active-section tracking
├── data/
│   └── portfolio.ts         # Single source of truth (typed)
└── styles/
    ├── _tokens.scss         # Design system
    ├── global.scss          # Reset + base
    └── index.scss           # Entry
```

---

## Notable Implementation Details

- **Smooth scroll** with Lenis is gated behind `prefers-reduced-motion` — the site stays snappy and accessible.
- **`useScrollSection`** uses `IntersectionObserver` (not scroll listeners) for cheap active-section tracking.
- **The constellation** in `Stack.tsx` is a custom layout algorithm — skills are placed on rings (by level) and clustered by category angle, then rendered as SVG with hover affordances.
- **Path aliases** (`@/`, `@components`, `@sections`, `@hooks`, `@data`, `@styles`) are wired in both `vite.config.ts` and `tsconfig.json` for symmetric DX.
- **All motion** uses the same easing curve (`cubic-bezier(0.16, 1, 0.3, 1)` — ease-out-expo) for a unified feel.
- **Bundle size**: ~334 KB JS / ~46 KB CSS uncompressed (105 KB / 8 KB gzipped) for the entire experience.

---

## Contact

- **Email** — dipanshusharma2510@gmail.com
- **LinkedIn** — [sharma-dipanshu](https://linkedin.com/in/sharma-dipanshu)
- **GitHub** — [meta-dipanshu-sharma](https://github.com/meta-dipanshu-sharma)
- **Location** — Berlin, Germany

---
