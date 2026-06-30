import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import astro from 'eslint-plugin-astro';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import ts from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
	js.configs.recommended,
	...ts.configs.recommended,
	...astro.configs.recommended,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},
	eslintPluginUnicorn.configs['recommended'],
	{
		rules: {
			'unicorn/filename-case': [
				'error',
				{
					case: 'kebabCase',
					ignore: [/^(.*)\.astro$/],
				},
			],
			'unicorn/name-replacements': 'off',
		},
	},
	{
		plugins: {
			'simple-import-sort': simpleImportSort,
		},
		rules: {
			'simple-import-sort/imports': [
				'warn',
				{ groups: [[String.raw`^\u0000`, '^node:', String.raw`^@?\w`, '^', String.raw`^\.`]] },
			],
			'simple-import-sort/exports': 'warn',
		},
	},
	{
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unused-expressions': ['error', { allowTaggedTemplates: true }],
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ ignoreRestSiblings: true, varsIgnorePattern: '^_', argsIgnorePattern: '_' },
			],
			'no-console': ['warn', { allow: ['warn', 'error'] }],
		},
	},
	prettier,
	{
		ignores: ['**/dist/**', '**/.astro/**'],
	},
];
