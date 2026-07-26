<script lang="ts">
	import { type Snippet, tick } from 'svelte';
	import type { Attachment } from 'svelte/attachments';
	import { cubicOut } from 'svelte/easing';
	import { on } from 'svelte/events';
	import { Tween } from 'svelte/motion';
	import { fade } from 'svelte/transition';
	import MaltIcon from 'virtual:icons/custom/malt';
	import BanknotesIcon from 'virtual:icons/heroicons/banknotes';
	import MapPinIcon from 'virtual:icons/heroicons/map-pin';
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
	let direction = $derived(contentIndex - prevContentIndex);

	const left = new Tween(0, { duration: 300, easing: cubicOut });
	const width = new Tween(0, { duration: 300, easing: cubicOut });
	const height = new Tween(0, { duration: 300, easing: cubicOut });

	const contents = [github, linkedin, malt, x];

	const items = [
		{
			label: 'GitHub',
			url: CONTACT.github,
			icon: GithubIcon,
		},
		{
			label: 'LinkedIn',
			url: CONTACT.linkedin,
			icon: LinkedinIcon,
		},
		{
			label: 'Malt',
			url: CONTACT.malt,
			icon: MaltIcon,
		},
		{
			label: 'X',
			url: CONTACT.x,
			icon: XIcon,
		},
	];

	const hover: Attachment<HTMLAnchorElement> = (node) => {
		return on(node, 'mouseenter', async () => {
			let prevOpen = open;
			open = true;

			left.set(node.offsetLeft + node.offsetWidth / 2, prevOpen ? {} : { duration: 0 });
			prevContentIndex = contentIndex;
			contentIndex = parseInt(node.dataset.index || '0');

			await tick();
			width.set(popupElement!.offsetWidth, prevOpen ? {} : { duration: 0 });
			height.set(popupElement!.offsetHeight, prevOpen ? {} : { duration: 0 });
		});
	};
</script>

<div class="relative flex" onmouseleave={() => (open = false)} role="presentation">
	{#each items as { label, url, icon: Icon }, index (index)}
		<a
			class="p-2 z-10 hover:[&_path]:fill-fg [&_path]:fill-muted"
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={label}
			data-index={index}
			{@attach hover}
		>
			<Icon class="[&_path]:fill-current size-6 [&_path]:transition-colors" />
		</a>
	{/each}
	{#if open}
		<div
			transition:fade={{ duration: 150 }}
			class="absolute flex items-end bg-surface overflow-hidden squircle-sm ring ring-border shadow-2xl bottom-[calc(100%+0.5rem)] translate-x-[-50%]"
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
					{@render contents[contentIndex]?.()}
				</div>
			{/key}
		</div>
	{/if}
	<div class="absolute inset-0 -top-2"></div>
</div>

{#snippet github()}
	<div class="flex flex-col p-3 gap-3">
		<div class="flex items-center gap-3 [&_img]:rounded-full">
			{@render children()}
			<div class="flex flex-col">
				colinlienard
				<p class="text-muted text-sm">{contributionsLabel}</p>
			</div>
		</div>
		<GithubGraph {contributions} />
	</div>
{/snippet}

{#snippet linkedin()}
	<div class="h-16 w-2xs bg-linear-to-br from-[#0A66C2] to-[#0A66C2]/30"></div>
	<div
		class="absolute left-3 translate-y-[-50%] p-0.5 bg-surface rounded-full [&_img]:size-14 [&_img]:rounded-full"
	>
		{@render children()}
	</div>
	<div class="flex flex-col gap-1 p-3 pt-8">
		<span>Colin Lienard</span>
		<div class="mt-1 flex items-end justify-between gap-3">
			<p class="text-muted text-sm">
				{labels.linkedinHeadline}<br />{labels.linkedinLocation}
			</p>
			<a
				class="bg-[#0A66C2] dark:bg-[#71B7FB] text-bg h-fit hover:brightness-120 transition-[filter] py-1 px-3 rounded-full text-sm"
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
	<div class="flex flex-col gap-3 p-3">
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
		<div class="flex items-baseline text-nowrap text-muted text-sm justify-between gap-6">
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
		class="w-2xs max-w-[unset] h-24"
		src="https://pbs.twimg.com/profile_banners/1599713873325658112/1769633299/1500x500"
		alt=""
	/>
	<div
		class="absolute left-3 translate-y-[-50%] p-0.5 bg-surface rounded-full [&_img]:size-14 [&_img]:rounded-full"
	>
		{@render children()}
	</div>
	<div class="flex flex-col p-3">
		<div class="flex justify-between">
			<span class="mt-6">@colinlienard</span>
			<a
				class="bg-fg text-bg text-sm h-fit hover:bg-fg/90 transition-colors py-1 px-3 rounded-full"
				href={CONTACT.x}
				target="_blank"
				rel="noopener noreferrer"
			>
				{labels.xCta}
			</a>
		</div>
		<span class="text-sm text-muted">Developer building with svelte/react</span>
	</div>
{/snippet}
