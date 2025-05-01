// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeFlexoki from 'starlight-theme-flexoki'

import svelte from '@astrojs/svelte';

import tailwindcss from '@tailwindcss/vite';

import d2 from 'astro-d2';

// https://astro.build/config
export default defineConfig({
  experimental: {
    contentIntellisense: true,
  },
  integrations: [starlight({
      title: 'TS Zero to Hero',
      plugins: [starlightThemeFlexoki()],
      tagline: "Bum Bum!",
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
      sidebar: [
          {
              label: 'Getting Started',
              autogenerate: { directory: "getting-started" }
          },
          {
              label: 'Reference',
              autogenerate: { directory: 'reference' },
          },
      ],
      }), svelte(), d2()],

  vite: {
    plugins: [tailwindcss()],
  },
});