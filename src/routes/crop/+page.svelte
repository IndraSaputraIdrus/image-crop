<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { CropBox, CropResult, Forms, ImagePreview, LoadingIcon } from '$lib/components';
	import { imageStore } from '$lib/store.svelte';
	import { fade } from 'svelte/transition';

	let isImgLoaded = $derived(imageStore.offsetWidth > 0);
	let imageUrl = $derived(page.url.searchParams.get('image') ?? null);

	$effect(() => {
		if (!imageUrl) {
			goto('/');
			return;
		}

		const image = new Image();
		image.src = imageUrl;
		image.onerror = () => {
			return goto('/');
		};
	});

	$effect(() => {
		if (imageUrl) {
			imageStore.src = imageUrl;
		}
	});
</script>

<div class="min-h-dvh grid grid-cols-1 md:grid-cols-4 w-full py-5">
	<div in:fade={{ duration: 200 }} class="stack md:col-span-3 px-3">
		{#if imageStore.src}
			<div>
				<ImagePreview />
			</div>
		{/if}
		{#if isImgLoaded}
			<div style:width="{imageStore.offsetWidth}px" style:height="{imageStore.offsetHeight}px">
				<CropBox />
			</div>
		{/if}
	</div>
	<div in:fade={{ duration: 200 }} class="grid gap-5 px-3 w-full sm:w-auto md:place-content-center">
		<Forms />
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
