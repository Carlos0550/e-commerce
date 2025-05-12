import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  site:"https://shop.cinnamon-makeup.com",
  integrations: [react(), sitemap()],
  server: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT || '4321'),
  },
});
