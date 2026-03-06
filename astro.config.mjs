import tailwind from '@astrojs/tailwind';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://tvarley.github.io',
	integrations: [mdx(), sitemap(), tailwind()],
});
