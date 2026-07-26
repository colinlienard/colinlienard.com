import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, fontProviders } from 'astro/config';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import icons from 'unplugin-icons/vite';

export default defineConfig({
	site: 'https://colinlienard.com',
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
			weights: ['500'],
			styles: ['italic'],
		},
	],
	trailingSlash: 'never',
	vite: {
		plugins: [
			icons({
				compiler: 'svelte',
				customCollections: {
					custom: FileSystemIconLoader('./src/assets/custom-icons'),
				},
			}),
			tailwindcss(),
		],
	},
});
