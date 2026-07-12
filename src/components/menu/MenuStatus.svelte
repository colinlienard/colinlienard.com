<script lang="ts">
	import { onMount } from 'svelte';
	import GithubIcon from 'virtual:icons/logos/github-icon';
	import { flyWithBlur } from '../../utils/svelte-transitions';
	import type { MenuTranslations } from './menu';
	import { getParisTime, getWeekContributions } from './status';

	let { translations, lang }: { translations: MenuTranslations; lang?: string } = $props();

	let weekContributions = $state<number | null>(null);

	const options = $derived([
		role,
		available,
		...(weekContributions ? [contributions] : []),
		currentTime,
	]);

	let current = $state(0);

	$effect(() => {
		const interval = setInterval(() => {
			current = (current + 1) % options.length;
		}, 4000);

		return () => clearInterval(interval);
	});

	onMount(() => {
		getWeekContributions().then((value) => {
			if (value !== null) weekContributions = value;
		});
	});
</script>

<span class="text-sm text-muted relative w-full">
	<span class="opacity-0" aria-hidden="true">_</span>
	{#key current}
		<span
			class="absolute inset-0"
			in:flyWithBlur={{ y: 8, duration: 500 }}
			out:flyWithBlur={{ y: -8, duration: 500 }}
		>
			{@render options[current]()}
		</span>
	{/key}
</span>

{#snippet role()}
	{translations.role}
{/snippet}

{#snippet available()}
	<div class="flex gap-1 items-center">
		<div class="relative size-1.5 *:absolute *:inset-0 *:rounded-full *:bg-green-400">
			<div></div>
			<div class="ping"></div>
		</div>
		{translations.available}
	</div>
{/snippet}

{#snippet currentTime()}
	<span class="font-mono">
		{getParisTime(lang)} (Paris)
	</span>
{/snippet}

{#snippet contributions()}
	<div class="flex gap-1 items-center min-w-0">
		<GithubIcon class="shrink-0 size-3 translate-y-[-0.5px] [&_path]:fill-muted" />
		<span class="truncate">
			<span class="font-mono">{weekContributions}</span>
			<span>{translations.contributions}</span>
		</span>
	</div>
{/snippet}

<style>
	.ping {
		animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
	}

	@keyframes ping {
		90%,
		100% {
			transform: scale(3);
			opacity: 0;
		}
	}
</style>
