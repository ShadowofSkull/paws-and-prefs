# 🐾 Paws & Preferences

A cat-rating single-page app where you swipe right on cats you find cute and left on ones that don't do it for you. At the end you get a summary of all the cats you liked.

---

## Design Idea

The visual theme is inspired by the soft, warm tones of a calico or tabby cat — creamy whites, earthy browns, and warm greys. The goal was to make the app feel calm, cosy, and cat-like rather than the typical bold primary-colour UI.

**Key design decisions:**

- **Colour palette** — Warm cream (`#FAF6F1`) base with earthy brown accents (`#7C5C4A`, `#8B6145`) and muted sage/terracotta for the CUTE/MEH stamps. No harsh contrast; everything feels soft and inviting.
- **Background texture** — A tiled cat-print SVG pattern overlaid at low opacity gives the background a subtle fur-patch feel without competing with the content.
- **Card design** — Cards use a warm off-white with a soft warm-brown shadow to feel like they're physically resting on the surface.
- **Motion** — Cards drag and rotate naturally, flying off in the direction of the swipe (right exits right, left exits left). A spring snap-back discourages accidental swipes.
- **Loading** — A bobbing 🐾 paw animation keeps the wait playful. Images are fetched as blobs in parallel in the background so every card loads instantly once the first one is ready.
- **Intro screen** — A brief tutorial screen with directional arrow indicators eases first-time users into the swipe mechanic before showing any cats.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React 19](https://react.dev/) |
| Build tool | [Vite](https://vitejs.dev/) |
| Animations | [Framer Motion](https://www.framer.com/motion/) — drag, spring physics, `AnimatePresence` exit animations |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) (Vite plugin) |
| Cat data & images | [CATAAS API](https://cataas.com/) (Cat As A Service) |
| Image caching | Blob URLs via `fetch` + `URL.createObjectURL` — images are downloaded once and served locally |
| Deployment | GitHub Actions → GitHub Pages (auto-deploy on push to `main`) |

---

## Getting Started

```bash
npm install
npm run dev
```

## Deploy

Pushing to `main` triggers the GitHub Actions workflow which builds and deploys to GitHub Pages automatically.

### Assets
<a target="_blank" href="https://icons8.com/icon/16015/cat-footprint">Cat Footprint</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>  
Cat Print Background - Designed by Freepik