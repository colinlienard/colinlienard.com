import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, fontProviders } from 'astro/config';
import icons from 'unplugin-icons/vite';

export default defineConfig({
	// TODO: remove staging
	site: 'https://staging.colinlienard.com',
	i18n: {
		locales: ['fr', 'en'],
		defaultLocale: 'fr',
	},
	integrations: [
		svelte({ extensions: ['.svelte'] }),
		sitemap({
			i18n: {
				defaultLocale: 'fr',
				locales: {
					fr: 'fr-FR',
					en: 'en-US',
				},
			},
		}),
	],
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Inter',
			cssVariable: '--font-inter',
			weights: ['500'],
			styles: ['normal'],
		},
		{
			provider: fontProviders.google(),
			name: 'Newsreader',
			cssVariable: '--font-newsreader',
			weights: ['600'],
			styles: ['italic'],
		},
	],
	vite: {
		plugins: [icons({ compiler: 'astro' }), tailwindcss()],
	},
});
