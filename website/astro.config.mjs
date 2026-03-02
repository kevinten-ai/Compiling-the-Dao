// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  site: 'https://kevinten-ai.github.io',
  base: '/Compiling-the-Dao',
  output: 'static',
  build: {
    assets: '_assets',
  },
});
