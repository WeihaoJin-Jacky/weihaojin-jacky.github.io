// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
// On GitHub Actions, derive the Pages URL from the repo so username or repo
// renames need no config change. A repo named <owner>.github.io is a user
// site served at the domain root; any other repo serves at /<repo>/.
// Locally the site serves from the root.
const [owner, repo] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const isUserSite = repo === `${owner}.github.io`;

export default defineConfig({
  site: owner ? `https://${owner}.github.io` : undefined,
  base: repo && !isUserSite ? `/${repo}/` : '/',
});
