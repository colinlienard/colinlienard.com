import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	i18n: {
		locales: ['fr', 'en'],
		defaultLocale: 'fr',
	},
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Inter',
			cssVariable: '--font-inter',
			weights: ['100 900'],
			styles: ['normal'],
		},
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
