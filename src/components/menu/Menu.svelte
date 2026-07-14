<script lang="ts">
	import type { Component, Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import { on } from 'svelte/events';
	import BriefcaseIcon from 'virtual:icons/heroicons/briefcase';
	import CodeBracketIcon from 'virtual:icons/heroicons/code-bracket';
	import ComputerDesktopIcon from 'virtual:icons/heroicons/computer-desktop';
	import HomeIcon from 'virtual:icons/heroicons/home';
	import MoonIcon from 'virtual:icons/heroicons/moon';
	import StarIcon from 'virtual:icons/heroicons/star';
	import SunIcon from 'virtual:icons/heroicons/sun';
	import { slideWithOpacity } from '../../utils/svelte-transitions';
	import type { MenuItemData, MenuTranslations } from './menu';
	import MenuItem from './MenuItem.svelte';
	import MenuStatus from './MenuStatus.svelte';
	import { createTheme } from './theme.svelte';

	type Item = MenuItemData & { name: string; icon?: Component };
	type Section = { label: string; isGrid?: boolean; items: Item[] };

	const TRANSITION_DURATION = 400;

	let {
		children,
		translations,
		lang,
	}: { children?: Snippet; translations: MenuTranslations; lang?: string } = $props();

	const theme = createTheme();

	let isMac = $state(false);
	let isOpen = $state(false);
	let isTransitioning = $state(false);
	let selectedItem = $state(0);

	const sections: Section[] = $derived([
		{
			label: translations.sections,
			items: [
				{
					name: translations.hero,
					icon: HomeIcon,
					onselect: () => scrollToSection('hero'),
				},
				{
					name: translations.experience,
					icon: BriefcaseIcon,
					onselect: () => scrollToSection('experience'),
				},
				{
					name: translations.projects,
					icon: StarIcon,
					onselect: () => scrollToSection('projects'),
				},
				{
					name: translations.stack,
					icon: CodeBracketIcon,
					onselect: () => scrollToSection('stack'),
				},
			],
		},
		{
			label: translations.language,
			items: [
				{
					name: window.location.pathname.startsWith('/en') ? 'Français' : 'English',
					isLink: true,
					onselect() {
						window.location.pathname = window.location.pathname.startsWith('/en') ? '' : '/en';
					},
				},
			],
		},
		{
			label: translations.theme,
			isGrid: true,
			items: [
				{
					name: translations.light,
					icon: SunIcon,
					isCentered: true,
					isActive: theme.value === 'light',
					onselect: () => (theme.value = 'light'),
				},
				{
					name: translations.dark,
					icon: MoonIcon,
					isCentered: true,
					isActive: theme.value === 'dark',
					onselect: () => (theme.value = 'dark'),
				},
				{
					name: translations.system,
					icon: ComputerDesktopIcon,
					isCentered: true,
					isActive: theme.value === 'system',
					onselect: () => (theme.value = 'system'),
				},
			],
		},
	]);
	const items = $derived(sections.flatMap((section) => section.items));

	function scrollToSection(id: string) {
		const target = document.querySelector<HTMLElement>('#' + id);
		if (target) {
			scrollTo({ behavior: 'smooth', top: target.offsetTop - 150 });
			isOpen = false;
		}
	}

	onMount(() => {
		isMac =
			(navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData
				?.platform === 'macOS' || /Mac|iPhone|iPad|iPod/.test(navigator.platform);

		let timeout: ReturnType<typeof setTimeout>;

		const off = on(window, 'keydown', (e) => {
			if (!(e.key === 'k' && (isMac ? e.metaKey : e.ctrlKey))) {
				return;
			}
			e.preventDefault();
			isOpen = !isOpen;

			isTransitioning = true;
			clearTimeout(timeout);
			timeout = setTimeout(() => (isTransitioning = false), TRANSITION_DURATION);
		});

		return () => {
			clearTimeout(timeout);
			off();
		};
	});

	$effect(() => {
		if (!isOpen) return;

		selectedItem = window.innerWidth < 480 ? -1 : 0;

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
						items[selectedItem].onselect();
						break;
					}
					case 'Escape': {
						e.preventDefault();
						isOpen = false;
						break;
					}
				}
				if (selectedItem < 0) selectedItem = items.length - 1;
				if (selectedItem > items.length - 1) selectedItem = 0;
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
</script>

<div
	id="menu"
	class="menu fixed top-8 sm:top-12 z-50 w-full rounded-[1.6rem] transition-all ease-out duration-400 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm ring ring-border {isOpen
		? 'rounded-b-xl max-w-[min(400px,calc(100vw-4rem))] shadow-2xl dark:shadow-2xl/50'
		: 'max-w-xs shadow-lg/6'}"
	role="presentation"
	onmouseenter={() => !isTransitioning && (isOpen = true)}
	onmouseleave={() => !isTransitioning && (isOpen = false)}
>
	<div
		class="flex items-center p-1.5 overflow-hidden"
		role="presentation"
		ontouchend={(e) => {
			e.preventDefault();
			if (!isTransitioning) isOpen = !isOpen;
		}}
	>
		{@render children?.()}
		<div class="menu-status flex justify-between pl-2 pr-1.5 items-center w-full text-nowrap">
			<div class="flex flex-col leading-5 w-full">
				<span>Colin Lienard</span>
				<MenuStatus {translations} {lang} isPause={isOpen} />
			</div>
			<kbd
				class="not-sm:hidden mr-1.5 ml-auto flex items-center gap-0.5 rounded-md bg-fg/5 p-1 font-sans text-sm text-muted"
			>
				<span class="leading-none" class:text-base={isMac}>{isMac ? '⌘' : 'Ctrl'}</span>K
			</kbd>
		</div>
	</div>
	{#if isOpen}
		<div
			class="flex relative flex-col gap-1.5 p-1.5 pt-0"
			transition:slideWithOpacity={{ duration: TRANSITION_DURATION }}
		>
			{#each sections as section (section.label)}
				<hr class="text-border -mx-1.5" />
				<span class="text-sm text-muted pl-2 pt-1">{section.label}</span>
				<div class={section.isGrid ? 'grid grid-cols-3 gap-1.5' : 'contents'}>
					{#each section.items as item (item.name)}
						{@const { name, icon: Icon, ...props } = item}
						{@const index = items.indexOf(item)}
						<MenuItem
							{...props}
							isSelected={selectedItem === index}
							onmouseenter={() => (selectedItem = index)}
						>
							{#if Icon}<Icon />{/if}
							{name}
						</MenuItem>
					{/each}
				</div>
			{/each}
			<div class="absolute top-0 -left-12 not-sm:hidden -right-12 -bottom-16 -z-10"></div>
		</div>
	{/if}
</div>

<style>
	.menu {
		animation: menu 0.6s 0.2s var(--ease-in-out) backwards;
		--width: 45px;
		@media (width > 480px) {
			--width: 52px;
		}
	}

	.menu-status {
		animation: menu-status 0.5s 0.6s var(--ease-in-out) backwards;
	}

	@keyframes menu {
		0% {
			transform: scale(50%);
			opacity: 0;
			width: var(--width);
			pointer-events: none;
		}
		50% {
			transform: scale(100%);
			opacity: 1;
			width: var(--width);
		}
		100% {
			width: 320px;
			pointer-events: none;
		}
	}

	@keyframes menu-status {
		0% {
			opacity: 0;
			filter: blur(4px);
		}
		100% {
			opacity: 1;
		}
	}
</style>
