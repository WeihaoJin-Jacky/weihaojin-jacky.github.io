# Weihao Jin — Personal Website

A single-page academic portfolio built with [Astro](https://astro.build). Light, warm-neutral, typography-first design with a generative node-graph hero canvas.

## Editing content

All content lives in one file: [`src/data/site.ts`](src/data/site.ts).

- **Fill in a placeholder link**: replace its `href: null` with the real URL. Placeholder links render as dashed "soon" chips until then.
- **Add a profile photo**: put the image in `public/` (e.g. `public/portrait.jpg`) and set `photo: '/portrait.jpg'`. Until then a monogram tile is shown.
- **Add a CV**: put the PDF in `public/` and set `cv: { label: 'CV', href: '/cv.pdf' }`.
- **Add projects, publications, or news**: append entries to the corresponding array.

No component files need to change for content updates.

## Commands

| Command           | Action                                    |
| ----------------- | ----------------------------------------- |
| `npm install`     | Install dependencies                      |
| `npm run dev`     | Dev server at `localhost:4321`            |
| `npm run build`   | Production build to `./dist/`             |
| `npm run preview` | Preview the production build locally      |

## Deploying

**Vercel / Netlify**: import the repo — Astro is auto-detected, no configuration needed.

**GitHub Pages**: the included workflow (`.github/workflows/deploy.yml`) builds and deploys on every push to `main`. Enable Pages in the repo settings (Source: GitHub Actions). If the repo is a *project* repo (served at `username.github.io/repo-name`), also set in `astro.config.mjs`:

```js
export default defineConfig({
  site: 'https://<username>.github.io',
  base: '/<repo-name>',
});
```

For a user site (`username.github.io` repo) or a custom domain, leave `base` unset.

## Structure

```
src/
├── data/site.ts          # all content (the only file to edit for updates)
├── styles/tokens.css     # design tokens (colors, type scale, spacing)
├── styles/global.css     # reset + base typography
├── scripts/hero-canvas.ts# generative hero animation
├── layouts/BaseLayout.astro
├── components/           # small single-purpose presentational components
└── pages/index.astro     # composes the single page
```
