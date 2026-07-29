<script lang="ts">
	import { fade } from 'svelte/transition';
	import { type Contributions, toWeeks } from '../utils/github-contributions';

	let { contributions }: { contributions: Contributions } = $props();

	const weeks = $derived(toWeeks(contributions));

	const levels = [
		'bg-fg/10',
		'bg-green-600/20 dark:bg-green-400/20',
		'bg-green-600/40 dark:bg-green-400/40',
		'bg-green-600/65 dark:bg-green-400/65',
		'bg-green-600/90 dark:bg-green-400/90',
	];

	let hovered = $state<{ count: number; date: string; left: number; top: number }>();
	let containerWidth = $state(0);
	let tooltipWidth = $state(0);

	const formatter = new Intl.DateTimeFormat(
		typeof document === 'undefined' ? undefined : document.documentElement.lang,
		{ day: 'numeric', month: 'long', timeZone: 'UTC' },
	);

	const label = $derived(
		hovered
			? `${hovered.count} contribution${hovered.count > 1 ? 's' : ''} · ${formatter.format(new Date(hovered.date))}`
			: '',
	);

	const left = $derived(
		hovered
			? Math.min(Math.max(hovered.left, tooltipWidth / 2), containerWidth - tooltipWidth / 2)
			: 0,
	);

	function handlePointerOver(event: PointerEvent) {
		const target = event.target as HTMLElement;
		const { date, count } = target.dataset;
		if (!date) {
			hovered = undefined;
			return;
		}
		hovered = {
			count: Number(count),
			date,
			left: target.offsetLeft + target.offsetWidth / 2,
			top: target.offsetTop,
		};
	}
</script>

<div
	class="relative flex w-[min(22rem,calc(100vw-6rem))] flex-col gap-2"
	bind:clientWidth={containerWidth}
	onpointerover={handlePointerOver}
	onpointerleave={() => (hovered = undefined)}
	role="presentation"
>
	<div
		class="grid grid-flow-col grid-rows-7 gap-[1.5px]"
		style:grid-template-columns="repeat({weeks.length}, minmax(0, 1fr))"
	>
		{#each weeks as week, weekIndex (weekIndex)}
			{#each week as day, dayIndex (dayIndex)}
				<div
					class="aspect-square w-full rounded-[1.5px] {day && levels[day.level]}"
					data-date={day?.date}
					data-count={day?.count}
				></div>
			{/each}
		{/each}
	</div>

	{#if hovered}
		<div
			transition:fade={{ duration: 100 }}
			class="squircle pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+0.25rem)] bg-stone-900 px-2 py-1 text-xs text-nowrap text-stone-100 shadow-xl/30 dark:bg-stone-950"
			style:left="{left}px"
			style:top="{hovered.top}px"
			bind:clientWidth={tooltipWidth}
		>
			{label}
		</div>
	{/if}
</div>
