<script lang="ts">
	import type { Snippet } from 'svelte';
	import ArrowUpRightIcon from 'virtual:icons/heroicons/arrow-up-right';
	import type { MenuItemData } from './menu';

	let {
		children,
		isSelected,
		isActive,
		isLink,
		isCentered,
		onmouseenter,
		onselect,
	}: {
		children: Snippet;
		isSelected: boolean;
		onmouseenter(): void;
	} & MenuItemData = $props();
</script>

<button
	class="flex items-center gap-2 p-2 rounded-lg
	  {isSelected ? 'bg-fg/5' : ''}
  	{isCentered ? 'justify-center' : ''}
  	{isActive ? 'outline outline-border' : ''}
	"
	{onmouseenter}
	onclick={onselect}
	>{@render children()}
	{#if isLink}
		<ArrowUpRightIcon class="ml-auto size-4" />
	{/if}
</button>
