import { onMount } from 'svelte';
import { on } from 'svelte/events';

type Theme = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'theme';

export function createTheme() {
	let value = $state<Theme>('system');

	function set(v: Theme) {
		value = v;
		if (value === 'system') {
			localStorage.removeItem(STORAGE_KEY);
		} else {
			localStorage.setItem(STORAGE_KEY, value);
		}
		document.documentElement.classList.toggle(
			'dark',
			value === 'dark' ||
				(value === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches),
		);
	}

	onMount(() => {
		value = (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? 'system';

		const media = window.matchMedia('(prefers-color-scheme: dark)');
		return on(media, 'change', () => {
			if (value === 'system') {
				set('system');
			}
		});
	});

	return {
		get value() {
			return value;
		},
		set value(v: Theme) {
			set(v);
		},
	};
}
