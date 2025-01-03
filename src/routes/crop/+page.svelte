<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { CropBox, CropResult, Forms, ImagePreview, LoadingIcon } from '$lib/components';
	import { store } from '$lib/store.svelte';
	import { fade } from 'svelte/transition';

	let imageOffsetWidth = $state(0);
	let imageOffsetHeight = $state(0);
	let isImgLoaded = $derived(imageOffsetWidth > 0 || imageOffsetHeight > 0);
	let image = $derived(page.url.searchParams.get('image'));
	let isLoading = $state(true);

	$effect(() => {
		if (!image) {
			goto('/');
		}
	});

	$effect(() => {
		const imageOriginal = new Image();
		imageOriginal.src = image!;

		imageOriginal.onload = () => {
			isLoading = false;
		};

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
	{#if isLoading}
		<div class="text-muted col-span-4 place-self-center">
			<LoadingIcon class="size-16 animate-spin" />
		</div>
	{:else}
		<div in:fade={{ duration: 200 }} class="stack flex items-center justify-center col-span-3">
			<div>
				<ImagePreview bind:width={imageOffsetWidth} bind:height={imageOffsetHeight} src={image!} />
			</div>
			{#if isImgLoaded}
				<div style:width="{imageOffsetWidth}px" style:height="{imageOffsetHeight}px">
					<CropBox />
				</div>
			{/if}
		</div>
		<div in:fade={{ duration: 200 }} class="grid place-content-center gap-5">
			<Forms maxWidth={store.image.offsetWidth} maxHeight={store.image.offsetHeight} />
			<CropResult />
		</div>
	{/if}
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
