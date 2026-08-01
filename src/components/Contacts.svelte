<script lang="ts">
	import { type Snippet, tick } from 'svelte';
	import type { Attachment } from 'svelte/attachments';
	import { cubicOut } from 'svelte/easing';
	import { on } from 'svelte/events';
	import { Tween } from 'svelte/motion';
	import { fade } from 'svelte/transition';
	import MaltIcon from 'virtual:icons/custom/malt';
	import BanknotesIcon from 'virtual:icons/heroicons/banknotes';
	import CheckBadgeIcon from 'virtual:icons/heroicons/check-badge-16-solid';
	import MapPinIcon from 'virtual:icons/heroicons/map-pin';
	import ShieldCheckIcon from 'virtual:icons/heroicons/shield-check';
	import GithubIcon from 'virtual:icons/logos/github-icon';
	import LinkedinIcon from 'virtual:icons/logos/linkedin-icon';
	import XIcon from 'virtual:icons/logos/x';
	import { CONTACT } from '../config';
	import type { Contributions } from '../utils/github-contributions';
	import { flyWithBlur } from '../utils/svelte-transitions';
	import GithubGraph from './GithubGraph.svelte';

	let {
		children,
		contributions,
		contributionsLabel,
		labels,
	}: {
		children: Snippet;
		contributions: Contributions;
		contributionsLabel: string;
		labels: {
			linkedinHeadline: string;
			linkedinLocation: string;
			linkedinCta: string;
			maltAvailability: string;
			maltRate: string;
			maltLocation: string;
			xCta: string;
		};
	} = $props();

	let open = $state(false);
	let contentIndex = $state(0);
	let prevContentIndex = $state(0);
	let popupElement = $state<HTMLElement>();
	let direction = $derived(Math.max(Math.min(contentIndex - prevContentIndex, 1), -1));

	const left = new Tween(0, { duration: 300, easing: cubicOut });
	const width = new Tween(0, { duration: 300, easing: cubicOut });
	const height = new Tween(0, { duration: 300, easing: cubicOut });

	const items = [
		{
			label: 'GitHub',
			url: CONTACT.github,
			icon: GithubIcon,
			content: github,
		},
		{
			label: 'LinkedIn',
			url: CONTACT.linkedin,
			icon: LinkedinIcon,
			content: linkedin,
		},
		{
			label: 'Malt',
			url: CONTACT.malt,
			icon: MaltIcon,
			content: malt,
		},
		{
			label: 'X',
			url: CONTACT.x,
			icon: XIcon,
			content: x,
		},
	];

	const hover =
		(index: number): Attachment<HTMLAnchorElement> =>
		(node) => {
			return on(node, 'pointerenter', async (event) => {
				if (event.pointerType !== 'mouse') return;

				let prevOpen = open;
				open = true;

				left.set(node.offsetLeft + node.offsetWidth / 2, prevOpen ? {} : { duration: 0 });
				prevContentIndex = contentIndex;
				contentIndex = index;

				await tick();
				if (!popupElement) return;
				width.set(popupElement.offsetWidth, prevOpen ? {} : { duration: 0 });
				height.set(popupElement.offsetHeight, prevOpen ? {} : { duration: 0 });
			});
		};
</script>

<div class="relative flex" onmouseleave={() => (open = false)} role="presentation">
	{#each items as { label, url, icon: Icon }, index (index)}
		<a
			class="hover:[&_path]:fill-fg [&_path]:fill-muted z-10 p-2"
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={label}
			{@attach hover(index)}
		>
			<Icon class="size-6 [&_path]:fill-current [&_path]:transition-colors" />
		</a>
	{/each}
	{#if open}
		<div
			transition:fade={{ duration: 150 }}
			class="bg-surface squircle-sm ring-border absolute bottom-[calc(100%+0.5rem)] flex translate-x-[-50%] items-end overflow-hidden shadow-2xl ring"
			style:left={left.current + 'px'}
			style:width={width.current + 'px'}
			style:height={height.current + 'px'}
		>
			{#key contentIndex}
				<div
					bind:this={popupElement}
					class="absolute"
					in:flyWithBlur={{ x: 200 * direction, duration: 300 }}
					out:flyWithBlur={{ x: 200 * -direction, duration: 300 }}
				>
					{@render items[contentIndex]?.content()}
				</div>
			{/key}
		</div>
	{/if}
	<!-- Pointer bridge -->
	<div class="absolute inset-0 -top-2"></div>
</div>

{#snippet github()}
	<div class="flex flex-col gap-3 p-3">
		<div class="flex items-center gap-3 [&_img]:rounded-full">
			<div class="relative">
				{@render children()}
				<div
					class="bg-surface ring-border absolute -right-1.5 -bottom-1.5 flex size-5 items-center justify-center rounded-full text-xs shadow-sm ring"
				>
					🎧
				</div>
			</div>
			<div class="flex flex-col">
				colinlienard
				<p class="text-muted text-sm">{contributionsLabel}</p>
			</div>
		</div>
		<GithubGraph {contributions} />
	</div>
{/snippet}

{#snippet linkedin()}
	<div class="linkedin-banner h-16 w-2xs bg-linear-to-br"></div>
	<div
		class="bg-surface absolute left-3 translate-y-[-50%] rounded-full p-0.5 [&_img]:size-14 [&_img]:rounded-full"
	>
		{@render children()}
	</div>
	<div class="flex flex-col gap-1 p-3 pt-8">
		<div>
			Colin Lienard <ShieldCheckIcon class="text-muted inline size-[1em] -translate-y-0.5" />
		</div>
		<div class="mt-1 flex items-end justify-between gap-3">
			<p class="text-muted text-sm">
				{labels.linkedinHeadline}<br />{labels.linkedinLocation}
			</p>
			<a
				class="text-bg h-fit rounded-full bg-[#0A66C2] px-3 py-1 text-sm transition-[filter] hover:brightness-120 dark:bg-[#71B7FB]"
				href={CONTACT.linkedin}
				target="_blank"
				rel="noopener noreferrer"
			>
				{labels.linkedinCta}
			</a>
		</div>
	</div>
{/snippet}

{#snippet malt()}
	<div class="flex flex-col gap-4 p-3">
		<div class="flex items-center gap-3 [&_img]:rounded-md">
			{@render children()}
			<div class="flex flex-col">
				Colin Lienard
				<p class="text-muted flex items-center gap-1.5 text-sm">
					<span class="size-1.5 rounded-full bg-green-400"></span>
					{labels.maltAvailability}
				</p>
			</div>
		</div>
		<div class="text-muted flex items-baseline justify-between gap-6 text-sm text-nowrap">
			<div class="flex items-center gap-1"><BanknotesIcon />{labels.maltRate}</div>
			<div class="flex items-center gap-1"><MapPinIcon />{labels.maltLocation}</div>
		</div>
		<div class="text-muted flex flex-wrap gap-2 text-sm">
			{#each ['React', 'TypeScript', 'Node'] as skill (skill)}
				<span class="ring-border rounded-md px-2 py-0.5 ring">{skill}</span>
			{/each}
		</div>
	</div>
{/snippet}

{#snippet x()}
	<img
		class="h-24 w-2xs max-w-[unset]"
		src="https://pbs.twimg.com/profile_banners/1599713873325658112/1769633299/1500x500"
		alt=""
	/>
	<div
		class="bg-surface absolute left-3 translate-y-[-50%] rounded-full p-0.5 [&_img]:size-14 [&_img]:rounded-full"
	>
		{@render children()}
	</div>
	<div class="flex flex-col p-3">
		<div class="flex justify-between">
			<div class="mt-6">
				@colinlienard <CheckBadgeIcon class="inline size-[1em] -translate-y-0.5 text-[#1d9bf0]" />
			</div>
			<a
				class="bg-fg text-bg hover:bg-fg/90 h-fit rounded-full px-3 py-1 text-sm transition-colors"
				href={CONTACT.x}
				target="_blank"
				rel="noopener noreferrer"
			>
				{labels.xCta}
			</a>
		</div>
		<span class="text-muted text-sm">Developer building with Svelte/React</span>
	</div>
{/snippet}

<style>
	.linkedin-banner {
		background-image:
			radial-gradient(
				circle at 120% 200%,
				#0000000a 0%,
				#0000000a 50%,
				#c5c5c50a 50%,
				#c5c5c50a 100%
			),
			radial-gradient(
				circle at 130% -10%,
				#4040400a 0%,
				#4040400a 50%,
				#ffffff0a 50%,
				#ffffff0a 100%
			),
			linear-gradient(to right, #0a66c2, #0a66c280);
	}
</style>
