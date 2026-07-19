// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
// On GitHub Actions, derive the Pages URL from the repo so username or repo
// renames need no config change. Locally the site serves from the root.
const [owner, repo] = (process.env.GITHUB_REPOSITORY ?? '').split('/');

export default defineConfig({
  site: owner ? `https://${owner}.github.io` : undefined,
  base: repo ? `/${repo}/` : '/',
});
