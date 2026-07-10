<script lang="ts">
	import type { Component, Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import { on } from 'svelte/events';
	import ArrowUpRightIcon from 'virtual:icons/heroicons/arrow-up-right';
	import BriefcaseIcon from 'virtual:icons/heroicons/briefcase';
	import CommandLineIcon from 'virtual:icons/heroicons/command-line';
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

	let isMac = $state(true);
	let isOpen = $state(false);
	let isKeyDown = $state(false);
	let isTransitioning = $state(false);
	let selectedItem = $state(0);

	onMount(() => {
		isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform);

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
					case 'Enter':
					case 'Escape': {
						e.preventDefault();
						isOpen = false;
						if (e.key === 'Enter') handleMenuAction();
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
		const targets = ['hero', 'experience', 'projects', 'stack'];
		const target = document.querySelector<HTMLElement>('#' + targets[index]);
		if (target) {
			scrollTo({ behavior: 'smooth', top: target.offsetTop - 150 });
		}
	}
</script>

<div
	id="menu"
	class="fixed top-12 z-50 w-full rounded-3xl transition-all ease-out duration-400 bg-white/90 backdrop-blur-sm ring ring-black/8 {isOpen
		? 'rounded-b-xl max-w-md shadow-2xl'
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
			<span class="text-sm text-neutral-400/90">
				{translations.role}
			</span>
		</div>
		<kbd
			class="not-sm:hidden mr-1.5 ml-auto flex items-center gap-0.5 rounded-md border border-neutral-200 bg-neutral-100 p-1 font-sans text-sm text-neutral-400 {isKeyDown
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
			<hr class="text-black/8 -mx-1.5" />
			<span class="text-sm text-neutral-400 pl-2 pt-1">{translations.sections}</span>
			{@render menuItem(0, translations.hero, HomeIcon)}
			{@render menuItem(1, translations.experience, BriefcaseIcon)}
			{@render menuItem(2, translations.projects, StarIcon)}
			{@render menuItem(3, translations.stack, CommandLineIcon)}
			<hr class="text-black/8 -mx-1.5" />
			<span class="text-sm text-neutral-400 pl-2 pt-1">{translations.language}</span>
			{@render menuItem(4, window.location.pathname === '/en' ? 'Français' : 'English')}
			<hr class="text-black/8 -mx-1.5" />
			<span class="text-sm text-neutral-400 pl-2 pt-1">{translations.theme}</span>
			<div class="grid grid-cols-3 gap-1.5">
				{@render menuItem(5, translations.light, SunIcon)}
				{@render menuItem(6, translations.dark, MoonIcon)}
				{@render menuItem(7, translations.system, ComputerDesktopIcon, true)}
			</div>
		</div>
	{/if}
</div>

{#snippet menuItem(index: number, title: string, Icon?: Component, isActive: boolean = false)}
	<button
		class="flex items-center gap-2 p-2 rounded-lg {selectedItem === index
			? isActive
				? 'bg-neutral-900/10'
				: 'bg-neutral-900/5'
			: isActive
				? 'bg-neutral-900/5'
				: ''} {index > 4 ? 'justify-center' : ''}"
		onmouseenter={() => (selectedItem = index)}
		onclick={() => {
			handleMenuAction(index);
			isOpen = false;
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
	<div class="absolute inset-0 bg-linear-to-b from-neutral-50 to-transparent"></div>
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
