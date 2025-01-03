<script lang="ts">
	import { drag } from '$lib/actions/drag';
	import { store } from '$lib/store.svelte';

	let currentX = $state(0);
	let currentY = $state(0);

	const scaleX = store.container.offsetWidth / store.image.offsetWidth;
	const scaleY = store.container.offsetHeight / store.image.offsetHeight;
	let scaleWidth = $derived(store.cropBox.offsetWidth * scaleX);
	let scaleHeight = $derived(store.cropBox.offsetHeight * scaleY);
</script>

{#snippet button(position: string)}
	<button
		class={[
			'size-2.5 bg-slate-200',
			'rounded-full border border-blue-500',
			'absolute z-[99]',
			position === 'top-left' && '-top-[5px] -left-[5px] cursor-nwse-resize',
			position === 'top-right' && '-right-[5px] -top-[5px] cursor-nesw-resize',
      position === 'bottom-left' && '-bottom-[5px] -left-[5px] cursor-nesw-resize',
      position === 'bottom-right' && '-bottom-[5px] -right-[5px] cursor-nwse-resize'
		]}
		aria-label="resize crop"
	></button>
{/snippet}

<div
	use:drag={({ x, y }) => {
		currentX = x;
		currentY = y;
		store.x = x;
		store.y = y;
	}}
	style:translate="{currentX}px {currentY}px"
	style:width="{scaleWidth}px"
	style:height="{scaleHeight}px"
	class="border border-blue-500 relative z-[999] cursor-move"
>
	{#each ['top-left', 'top-right', 'bottom-left', 'bottom-right'] as position}
		{@render button(position)}
	{/each}
</div>
