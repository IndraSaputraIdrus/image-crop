<script lang="ts">
	import { drag } from '$lib/actions/drag';
	import { imageStore, cropBoxStore } from '$lib/store.svelte';

	let cropBoxElement: undefined | HTMLElement = $state();

	$effect(() => {
		cropBoxStore.width = 200;
    cropBoxStore.height = 200
	});
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
		cropBoxStore.x = x;
		cropBoxStore.y = y;
	}}
	bind:this={cropBoxElement}
	style:translate="{cropBoxStore.x}px {cropBoxStore.y}px"
	style:width="{cropBoxStore.width}px"
	style:height="{cropBoxStore.height}px"
	class="border border-blue-500 relative z-[999] cursor-move bg-black/70"
>
	{#each ['top-left', 'top-right', 'bottom-left', 'bottom-right'] as position}
		{@render button(position)}
	{/each}
</div>
