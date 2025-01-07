<script lang="ts">
	import { drag } from '$lib/actions/drag';
	import { imageStore, cropBoxStore } from '$lib/store.svelte';

	let cropBoxElement: undefined | HTMLElement = $state();

	const scale = (value: number, type: string): number => {
		const scaleFactor =
			type === 'width'
				? imageStore.offsetWidth / imageStore.naturalWidth
				: imageStore.offsetHeight / imageStore.naturalHeight;

		return value * scaleFactor;
	};

	const handleOverflow = (value: number, boxSize: number, maxSize: number, type: string) => {
		if (!cropBoxElement) return value;

		//const cropSize = value + scale(cropBoxStore.width, 'width');
		//if (cropSize > imageStore.offsetWidth) {
		//	const excess = cropSize - imageStore.offsetWidth;
		//	value -= excess;
		//}

		const cropSize = value + scale(boxSize, type);
		if (cropSize > maxSize) {
			const excess = cropSize - maxSize;
			value -= excess;
		}

		return value;
	};

	$effect(() => {
		cropBoxStore.x = 0;
		cropBoxStore.y = 0;
		cropBoxStore.width = imageStore.naturalWidth;
		cropBoxStore.height = imageStore.naturalHeight;
	});

	$effect(() => {
		if (cropBoxStore.width) {
			cropBoxStore.x = handleOverflow(
				cropBoxStore.x,
				cropBoxStore.width,
				imageStore.offsetWidth,
				'width'
			);
		}

		if (cropBoxStore.height) {
			cropBoxStore.y = handleOverflow(
				cropBoxStore.y,
				cropBoxStore.height,
				imageStore.offsetHeight,
				'height'
			);
		}
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
	style:width="{scale(cropBoxStore.width, 'width')}px"
	style:height="{scale(cropBoxStore.height, 'height')}px"
	class="border border-blue-500 relative z-[999] cursor-move bg-black/70"
>
	{#each ['top-left', 'top-right', 'bottom-left', 'bottom-right'] as position}
		{@render button(position)}
	{/each}
</div>
