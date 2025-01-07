<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { CropBox, CropResult, Forms, ImagePreview, LoadingIcon } from '$lib/components';
	import { store, imageStore } from '$lib/store.svelte';
	import { fade } from 'svelte/transition';

	let isImgLoaded = $derived(imageStore.offsetWidth > 0);
	let imageUrl = $derived(page.url.searchParams.get('image'));
	let isLoading = $state(false);

	$effect(() => {
		if (!imageUrl) {
			goto('/');
			return;
		}

		const image = new Image();
		image.src = imageUrl;
		image.onerror = () => {
      return goto("/")
		};

		imageStore.src = imageUrl;
	});
</script>

<div class="grid grid-cols-2 md:grid-cols-4 h-full">
	{#if isLoading}
		<div class="text-muted col-span-4 place-self-center">
			<LoadingIcon class="size-16 animate-spin" />
		</div>
	{:else}
		<div
			in:fade={{ duration: 200 }}
			class="stack flex items-center justify-center col-span-2 md:col-span-3"
		>
			<div>
				<ImagePreview />
			</div>
			{#if isImgLoaded}
				<div style:width="{imageStore.offsetWidth}px" style:height="{imageStore.offsetHeight}px">
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
