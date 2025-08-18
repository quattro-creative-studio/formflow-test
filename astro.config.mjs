import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';
import vercel from '@astrojs/vercel';
export default defineConfig({
  // add yur domain name here
  vite: {
      plugins: [tailwindcss()],
    },

  site: 'https://yoursite.com',

  integrations: [sitemap(), sanity({
    projectId: "3nr8zhae",
    dataset: "production",
    useCdn: false
  })],

  adapter: vercel()
});