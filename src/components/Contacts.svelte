<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Attachment } from 'svelte/attachments';
	import { on } from 'svelte/events';
	import { Spring } from 'svelte/motion';
	import { fade } from 'svelte/transition';
	import GithubIcon from 'virtual:icons/logos/github-icon';
	import LinkedinIcon from 'virtual:icons/logos/linkedin-icon';
	import XIcon from 'virtual:icons/logos/x';
	import { CONTACT } from '../config';
	import { flyWithBlur } from '../utils/svelte-transitions';

	let open = $state(false);
	let content = $state<Snippet>();
	const left = new Spring(0);
	let isHovering = false;

	const hover: Attachment<HTMLAnchorElement> = (node) => {
		const offs = [
			on(node, 'mouseenter', () => {
				left.target = node.offsetLeft + node.offsetWidth / 2;
				left.stiffness = open ? 0.2 : 1;
				open = true;
				isHovering = true;
				switch (node.ariaLabel) {
					case 'Github': {
						content = github;
						break;
					}
					case 'Linkedin': {
						content = linkedin;
						break;
					}
					case 'Malt': {
						content = malt;
						break;
					}
					case 'X (Twitter)': {
						content = x;
						break;
					}
				}
			}),
			on(node, 'mouseleave', () => {
				isHovering = false;
				setTimeout(() => {
					if (!isHovering) open = false;
				}, 300);
			}),
		];

		return () => {
			for (const off of offs) off();
		};
	};
</script>

<a
	href={CONTACT.github}
	target="_blank"
	rel="noopener noreferrer"
	aria-label="Github"
	{@attach hover}
>
	<GithubIcon
		class="hover:[&_path]:fill-fg [&_path]:fill-muted size-6 [&_path]:transition-colors"
	/>
</a>
<a
	href={CONTACT.linkedin}
	target="_blank"
	rel="noopener noreferrer"
	aria-label="Linkedin"
	{@attach hover}
>
	<LinkedinIcon
		class="hover:[&_path]:fill-fg [&_path]:fill-muted size-6 [&_path]:transition-colors"
	/>
</a>
<a href={CONTACT.malt} target="_blank" rel="noopener noreferrer" aria-label="Malt" {@attach hover}>
	<svg
		viewBox="0 0 32 32"
		xmlns="http://www.w3.org/2000/svg"
		class="hover:[&_path]:fill-fg [&_path]:fill-muted size-6 [&_path]:transition-colors"
	>
		<path
			d="M27.3892 4.61825C24.9683 2.20484 22.3911 3.76909 20.7747 5.37803L5.51955 20.6331C3.90317 22.2495 2.21229 24.7076 4.75978 27.2477C7.29981 29.7877 9.75047 28.0968 11.3669 26.4804L26.622 11.2253C28.2384 9.61639 29.8026 7.03166 27.3892 4.61825ZM12.8119 3.99255L16.0447 7.22533L19.3296 3.93296C19.5531 3.7095 19.7765 3.50093 20.0074 3.30726C19.6648 1.57169 18.6741 0 16.0372 0C13.4004 0 12.4097 1.57914 12.0745 3.31471C12.3203 3.53073 12.5661 3.74674 12.8119 3.99255ZM19.3296 27.9851L16.0447 24.7002L12.8119 27.9255C12.5661 28.1713 12.3277 28.4022 12.0819 28.6108C12.4544 30.3836 13.4972 32 16.0372 32C18.5847 32 19.635 30.3687 20 28.5959C19.7765 28.4022 19.5531 28.2086 19.3296 27.9851ZM11.4413 11.8212H5.21415C2.92737 11.8212 0 12.5438 0 15.9553C0 18.5102 1.63129 19.5531 3.41155 19.9181C3.62011 19.6797 11.4413 11.8212 11.4413 11.8212ZM28.6853 11.9926C28.4916 12.216 20.648 20.0968 20.648 20.0968H26.7858C29.0726 20.0968 32 19.5531 32 15.9553C32 13.3259 30.4283 12.3352 28.6853 11.9926ZM13.4823 9.78026L14.5922 8.67039L11.3669 5.43762C9.75047 3.82123 7.29981 2.13035 4.75233 4.67784C2.89013 6.54004 3.30726 8.35754 4.2905 9.82495C4.5959 9.80261 13.4823 9.78026 13.4823 9.78026ZM18.5996 22.1378L17.4823 23.2551L20.7747 26.54C22.3911 28.1564 24.9683 29.7207 27.3818 27.3073C29.1844 25.5047 28.7747 23.6052 27.7765 22.0931C27.4562 22.1155 18.5996 22.1378 18.5996 22.1378Z"
		/>
	</svg>
</a>
<a
	href={CONTACT.x}
	target="_blank"
	rel="noopener noreferrer"
	aria-label="X (Twitter)"
	{@attach hover}
>
	<XIcon class="hover:[&_path]:fill-fg [&_path]:fill-muted size-6 [&_path]:transition-colors" />
</a>

{#if open}
	<div
		transition:fade={{ duration: 150 }}
		class="absolute bg-surface rounded-xl ring ring-border shadow-2xl p-4 bottom-[calc(100%+0.3rem)] translate-x-[-50%]"
		style:left={left.current + 'px'}
	>
		{#key content}
			<div in:flyWithBlur={{ x: 8, duration: 500 }} out:flyWithBlur={{ x: -8, duration: 500 }}>
				{@render content?.()}
			</div>
		{/key}
	</div>
{/if}

{#snippet github()}
	Github
{/snippet}

{#snippet linkedin()}
	Linkedin
{/snippet}

{#snippet malt()}
	Malt
{/snippet}

{#snippet x()}
	X (Twitter)
{/snippet}
