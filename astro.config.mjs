import sitemap from '@astrojs/sitemap';
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
			weights: ['100 900'],
			styles: ['normal'],
		},
		{
			provider: fontProviders.google(),
			name: 'Geist Mono',
			cssVariable: '--font-geist-mono',
			weights: ['100 900'],
			styles: ['normal'],
		},
	],
	vite: {
		plugins: [icons({ compiler: 'astro' }), tailwindcss()],
	},
});
