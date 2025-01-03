<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { CropBox, CropResult, Forms } from '$lib/components';
	import { store } from '$lib/store.svelte';

	let imageOffsetWidth = $state(0);
	let imageOffsetHeight = $state(0);
	let isImgLoaded = $derived(imageOffsetWidth > 0 || imageOffsetHeight > 0);
	let image = $derived(page.url.searchParams.get('image'));

	$effect(() => {
		if (!image) {
			goto('/');
		}
	});

	$effect(() => {
		const imageOriginal = new Image();
		imageOriginal.src = image!;

		imageOriginal.onerror = () => {
			goto('/');
		};

		store.image.offsetHeight = imageOriginal.height;
		store.image.offsetWidth = imageOriginal.width;
		store.container.offsetWidth = imageOffsetWidth;
		store.container.offsetHeight = imageOffsetHeight;
		store.cropBox.offsetWidth = imageOriginal.width;
		store.cropBox.offsetHeight = imageOriginal.height;
		store.image.url = image;
	});
</script>

<div class="grid grid-cols-4 h-full">
	<div class="stack flex items-center justify-center col-span-3">
		<img
			bind:offsetWidth={imageOffsetWidth}
			bind:offsetHeight={imageOffsetHeight}
			src={image}
			class="max-h-96 w-auto"
			alt="neko"
		/>
		{#if isImgLoaded}
			<div style:width="{imageOffsetWidth}px" style:height="{imageOffsetHeight}px">
				<CropBox />
			</div>
		{/if}
	</div>

	<div class="grid place-content-center gap-5">
		<Forms maxWidth={store.image.offsetWidth} maxHeight={store.image.offsetHeight} />
		<CropResult />
	</div>
</div>

<style>
	.stack {
		display: grid;
		place-content: center;

		> * {
			grid-area: 1 / 1;
		}
	}
</style>
