<script lang="ts">
	import { on } from 'svelte/events';
	import EnvelopeIcon from 'virtual:icons/heroicons/envelope-solid';
	import MapPinIcon from 'virtual:icons/heroicons/map-pin-solid';
	import { CONTACT } from '../../config';
	import { flyWithBlur } from '../../utils/svelte-transitions';
	import type { MenuTranslations } from './menu';
	import { getParisTime } from './menu';

	let {
		translations,
		lang,
		isPause,
	}: { translations: MenuTranslations; lang?: string; isPause: boolean } = $props();

	const options = [role, available, location, email, currentTime];

	let current = $state(0);
	let isVisible = $state(true);

	$effect(() => {
		isVisible = !document.hidden;
		return on(document, 'visibilitychange', () => {
			isVisible = !document.hidden;
		});
	});

	$effect(() => {
		if (isPause || !isVisible) return;
		const interval = setInterval(() => {
			current = (current + 1) % options.length;
		}, 4000);
		return () => clearInterval(interval);
	});
</script>

<span class="text-sm text-muted relative w-full">
	<span class="opacity-0" aria-hidden="true">_</span>
	{#key current}
		<span
			class="absolute inset-0 flex gap-1 items-center"
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
	<div class="relative blur-[1px] size-1.5 *:absolute *:inset-0 *:rounded-full *:bg-green-400">
		<div></div>
		<div class="ping"></div>
	</div>
	{translations.available}
{/snippet}

{#snippet location()}
	<MapPinIcon />
	{translations.location}
{/snippet}

{#snippet email()}
	<a class="contents" href={`mailto:${CONTACT.email}`}>
		<EnvelopeIcon />
		{CONTACT.email}
	</a>
{/snippet}

{#snippet currentTime()}
	<span class="font-mono">{getParisTime(lang)} (Paris)</span>
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
