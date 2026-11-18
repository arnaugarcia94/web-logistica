import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const site = process.env.SITE_URL || env.SITE_URL || process.env.URL;

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  integrations: site ? [sitemap()] : [],
});
