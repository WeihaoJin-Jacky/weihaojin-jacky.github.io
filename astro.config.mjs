// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
// Served from GitHub Pages at https://jackyjin1234.github.io/Personal-website/,
// so assets and links are prefixed with the repo-name base path.
export default defineConfig({
  site: 'https://jackyjin1234.github.io',
  base: '/Personal-website/',
});
