<script lang="ts">
	import type { Component, Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import { on } from 'svelte/events';
	import ArrowUpRightIcon from 'virtual:icons/heroicons/arrow-up-right';
	import BriefcaseIcon from 'virtual:icons/heroicons/briefcase';
	import CodeBracketIcon from 'virtual:icons/heroicons/code-bracket';
	import ComputerDesktopIcon from 'virtual:icons/heroicons/computer-desktop';
	import HomeIcon from 'virtual:icons/heroicons/home';
	import MoonIcon from 'virtual:icons/heroicons/moon';
	import StarIcon from 'virtual:icons/heroicons/star';
	import SunIcon from 'virtual:icons/heroicons/sun';
	import { slideWithOpacity } from '../utils/slide-with-opacity';

	const ITEMS_NUMBER = 8;
	const TRANSITION_DURATION = 400;

	type Translations = {
		role: string;
		sections: string;
		language: string;
		theme: string;
		hero: string;
		experience: string;
		projects: string;
		stack: string;
		light: string;
		dark: string;
		system: string;
	};

	let { translations, children }: { translations: Translations; children?: Snippet } = $props();

	type Theme = 'light' | 'dark' | 'system';

	let isMac = $state(true);
	let isOpen = $state(false);
	let isKeyDown = $state(false);
	let isTransitioning = $state(false);
	let selectedItem = $state(0);
	let theme = $state<Theme>('system');

	function applyTheme(value: Theme) {
		theme = value;
		if (value === 'system') {
			localStorage.removeItem('theme');
		} else {
			localStorage.setItem('theme', value);
		}
		document.documentElement.classList.toggle(
			'dark',
			value === 'dark' ||
				(value === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches),
		);
	}

	onMount(() => {
		isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform);
		theme = (localStorage.getItem('theme') as Theme | null) ?? 'system';

		const media = window.matchMedia('(prefers-color-scheme: dark)');
		const offMedia = on(media, 'change', () => {
			if (theme === 'system') applyTheme('system');
		});

		let timeout: ReturnType<typeof setTimeout>;
		let timeout2: ReturnType<typeof setTimeout>;

		const off = on(window, 'keydown', (e) => {
			if (!(e.key === 'k' && (isMac ? e.metaKey : e.ctrlKey))) {
				return;
			}
			e.preventDefault();
			isOpen = !isOpen;

			isTransitioning = true;
			clearTimeout(timeout);
			timeout = setTimeout(() => (isTransitioning = false), TRANSITION_DURATION);

			isKeyDown = true;
			clearTimeout(timeout2);
			timeout2 = setTimeout(() => (isKeyDown = false), 150);
		});

		return () => {
			clearTimeout(timeout);
			clearTimeout(timeout2);
			off();
			offMedia();
		};
	});

	$effect(() => {
		if (!isOpen) return;

		selectedItem = 0;

		const offs = [
			on(window, 'keydown', (e) => {
				switch (e.key) {
					case 'ArrowUp':
					case 'k': {
						e.preventDefault();
						selectedItem--;
						break;
					}
					case 'ArrowDown':
					case 'j': {
						e.preventDefault();
						selectedItem++;
						break;
					}
					case 'Enter': {
						e.preventDefault();
						handleMenuAction();
						if (selectedItem < 5) isOpen = false;
						break;
					}
					case 'Escape': {
						e.preventDefault();
						isOpen = false;
						break;
					}
				}
				if (selectedItem < 0) selectedItem = ITEMS_NUMBER - 1;
				if (selectedItem > ITEMS_NUMBER - 1) selectedItem = 0;
			}),
			on(window, 'click', (e) => {
				if (!(e.target as HTMLElement).closest('#menu')) {
					isOpen = false;
				}
			}),
		];

		return () => {
			for (const off of offs) off();
		};
	});

	function handleMenuAction(index = selectedItem) {
		if (index === 4) {
			window.location.pathname = window.location.pathname === '/en' ? '' : '/en';
			return;
		}
		if (index >= 5) {
			applyTheme(index === 5 ? 'light' : index === 6 ? 'dark' : 'system');
			return;
		}
		const targets = ['hero', 'experience', 'projects', 'stack'];
		const target = document.querySelector<HTMLElement>('#' + targets[index]);
		if (target) {
			scrollTo({ behavior: 'smooth', top: target.offsetTop - 150 });
		}
	}
</script>

<div
	id="menu"
	class="fixed top-8 sm:top-12 z-50 w-full rounded-3xl transition-all ease-out duration-400 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm ring ring-border {isOpen
		? 'rounded-b-xl max-w-[min(400px,calc(100vw-4rem))] shadow-2xl dark:shadow-2xl/50'
		: 'max-w-xs shadow-lg/6'}"
	role="presentation"
	onmouseenter={() => !isTransitioning && (isOpen = true)}
	onmouseleave={() => !isTransitioning && (isOpen = false)}
>
	<div
		class="flex items-center gap-2 p-1.5 pr-3"
		role="presentation"
		ontouchend={(e) => {
			e.preventDefault();
			if (!isTransitioning) isOpen = !isOpen;
		}}
	>
		{@render children?.()}
		<div class="flex flex-col leading-5">
			<span>Colin Lienard</span>
			<span class="text-sm text-muted">
				{translations.role}
			</span>
		</div>
		<kbd
			class="not-sm:hidden mr-1.5 ml-auto flex items-center gap-0.5 rounded-md border border-border bg-bg p-1 font-sans text-sm text-muted {isKeyDown
				? 'translate-y-0.5'
				: 'border-b-4'}"
		>
			<span class="leading-none" class:text-base={isMac}>{isMac ? '⌘' : 'Ctrl'}</span>K
		</kbd>
	</div>
	{#if isOpen}
		<div
			class="flex relative flex-col gap-1.5 p-1.5 pt-0"
			transition:slideWithOpacity={{ duration: TRANSITION_DURATION }}
		>
			<div class="absolute top-0 -left-12 not-sm:hidden -right-12 -bottom-16 -z-10"></div>
			<hr class="text-border -mx-1.5" />
			<span class="text-sm text-muted pl-2 pt-1">{translations.sections}</span>
			{@render menuItem(0, translations.hero, HomeIcon)}
			{@render menuItem(1, translations.experience, BriefcaseIcon)}
			{@render menuItem(2, translations.projects, StarIcon)}
			{@render menuItem(3, translations.stack, CodeBracketIcon)}
			<hr class="text-border -mx-1.5" />
			<span class="text-sm text-muted pl-2 pt-1">{translations.language}</span>
			{@render menuItem(4, window.location.pathname === '/en' ? 'Français' : 'English')}
			<hr class="text-border -mx-1.5" />
			<span class="text-sm text-muted pl-2 pt-1">{translations.theme}</span>
			<div class="grid grid-cols-3 gap-1.5">
				{@render menuItem(5, translations.light, SunIcon, theme === 'light')}
				{@render menuItem(6, translations.dark, MoonIcon, theme === 'dark')}
				{@render menuItem(7, translations.system, ComputerDesktopIcon, theme === 'system')}
			</div>
		</div>
	{/if}
</div>

{#snippet menuItem(index: number, title: string, Icon?: Component, isActive: boolean = false)}
	<button
		class="flex items-center gap-2 p-2 rounded-lg {selectedItem === index
			? isActive
				? 'bg-fg/10'
				: 'bg-fg/5'
			: isActive
				? 'bg-fg/5'
				: ''} {index > 4 ? 'justify-center' : ''}"
		onmouseenter={() => (selectedItem = index)}
		onclick={() => {
			handleMenuAction(index);
			if (index < 5) isOpen = false;
		}}
	>
		{#if Icon}
			<Icon class="[&_path]:stroke-2" />
		{/if}
		{title}
		{#if index === 4}
			<ArrowUpRightIcon class="ml-auto size-4" />
		{/if}
	</button>
{/snippet}

<!-- Blur gradient -->
<div class="pointer-events-none fixed inset-0 z-40 h-32">
	<div class="absolute inset-0 bg-linear-to-b from-bg to-transparent"></div>
	<div
		class="absolute inset-0 mask-[linear-gradient(to_bottom,black_0%,black_85%,transparent_100%)] backdrop-blur-[1px]"
	></div>
	<div
		class="absolute inset-0 mask-[linear-gradient(to_bottom,black_0%,black_55%,transparent_80%)] backdrop-blur-xs"
	></div>
	<div
		class="absolute inset-0 mask-[linear-gradient(to_bottom,black_0%,black_30%,transparent_55%)] backdrop-blur-sm"
	></div>
	<div
		class="absolute inset-0 mask-[linear-gradient(to_bottom,black_0%,black_12%,transparent_32%)] backdrop-blur-lg"
	></div>
</div>
