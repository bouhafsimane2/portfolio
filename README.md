# Imane Bouhafs — Portfolio

Single-page portfolio built with **Next.js 15 (App Router), React 19, Tailwind CSS v4, Framer Motion and Lucide Icons**, with a **Three.js** hero scene and **Lenis** smooth scrolling.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

## Where to edit

| What | File |
| --- | --- |
| Texts, projects, links | `lib/data.ts` |
| Colours, fonts, global animations | `app/globals.css` (`@theme` block) |
| Rules of the T1 → T5 cascade demo | `lib/cascade.ts` |
| Hero 3D scene | `components/hero/HeroScene.tsx` |

## Structure

```
app/            layout (fonts, metadata), page, global styles
components/
  layout/       Nav, Footer, SmoothScroll (Lenis), ScrollProgress, Ambient background
  hero/         Hero + Three.js scene (client-only)
  sections/     SkillsBand, About
  flagship/     Flagship project + full-screen case study, cascade and RAG demos
  projects/     Filterable grid, project cards, detail panel with interactive diagram
  automation/   Automation Lab
  art/          Animated SVG illustrations
  ui/           Button, SectionHeading, TiltCard, Workflow, icons
lib/            data.ts (content), cascade.ts (demo classifier)
```

## Deploy

Import the repository on [Vercel](https://vercel.com/new): it is detected as a Next.js app, no configuration needed.
