<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import { on } from 'svelte/events';
	import { twMerge } from 'tailwind-merge';
	import { useTranslations } from '../i18n';

	let { locale, children }: { locale?: string; children?: Snippet } = $props();

	const t = $derived(useTranslations(locale));

	let isMac = $state(true);
	let isOpen = $state(false);
	let isKeyDown = $state(false);

	onMount(() => {
		isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform);

		let timeout: ReturnType<typeof setTimeout>;

		// eslint-disable-next-line unicorn/prefer-global-this
		const off = on(window, 'keydown', (e) => {
			if (!(e.key === 'k' && (isMac ? e.metaKey : e.ctrlKey))) {
				return;
			}
			e.preventDefault();
			isOpen = !isOpen;
			isKeyDown = true;
			clearTimeout(timeout);
			timeout = setTimeout(() => (isKeyDown = false), 150);
		});

		return () => {
			clearTimeout(timeout);
			off();
		};
	});
</script>

<div class="pointer-events-none fixed inset-0 z-50 h-32">
	<div class="absolute inset-0 bg-linear-to-b from-neutral-50 to-transparent"></div>
	<div
		class="absolute inset-0 mask-[linear-gradient(to_bottom,black_0%,black_85%,transparent_100%)] backdrop-blur-[2px]"
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

<div
	class="fixed top-12 z-50 flex w-full max-w-sm items-center gap-2 rounded-full bg-white p-1.5 pr-3 shadow-lg/6 ring ring-black/8"
>
	{@render children?.()}
	<div class="flex flex-col leading-5">
		<span>Colin Lienard</span>
		<span class="text-sm text-neutral-500/90">
			{t('menu.role')}
		</span>
	</div>
	<kbd
		class={twMerge(
			'mr-1.5 ml-auto flex items-center gap-0.5 rounded-md border border-neutral-200 bg-neutral-100 p-1 font-sans text-sm text-neutral-500',
			isKeyDown ? 'translate-y-0.5' : 'border-b-4',
		)}
	>
		<span class="leading-none" class:text-base={isMac}>{isMac ? '⌘' : 'Ctrl'}</span>K
	</kbd>
</div>
