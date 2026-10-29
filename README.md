# Aliyan Sami — Portfolio

Personal site at https://aliyansami.github.io/, built with **React + TypeScript + Vite** and **Three.js**.

The hero figure (`src/components/EmbeddingField.tsx`) is a small Three.js scene of retrieval in an embedding space: a query moves through clustered chunks and its six nearest neighbours are found and linked every frame. It pauses when off-screen or in a background tab, and renders a single still frame when the visitor prefers reduced motion.

Content lives in `src/data/content.ts`; styles are plain CSS in `src/styles.css`, with light and dark themes following the system setting.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build      # outputs to ./dist
npm run preview    # preview the production build
```

## Deploy

Pushing to `main` builds and deploys to GitHub Pages via `.github/workflows/deploy.yml`.
