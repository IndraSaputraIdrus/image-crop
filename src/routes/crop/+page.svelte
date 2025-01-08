<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { CropBox, CropResult, Forms, ImagePreview, LoadingIcon } from '$lib/components';
	import { imageStore } from '$lib/store.svelte';
	import { fade } from 'svelte/transition';

	let isImgLoaded = $derived(imageStore.offsetWidth > 0);
	let imageUrl = $derived(page.url.searchParams.get('image') ?? null);
	let isLoading = $state(true);

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

		image.onload = () => {
			imageStore.src = imageUrl;
			imageStore.naturalHeight = image.naturalHeight;
			imageStore.naturalWidth = image.naturalWidth;
			isLoading = false;
		};
	});
</script>

<div class="h-dvh px-5 md:px-8 py-5 md:py-10">
	<div class={['h-full', 'flex flex-col', 'md:flex-row justify-center', 'gap-5 items-center']}>
		<div class="relative">
			<ImagePreview />
      <CropBox />
		</div>
		<div class='flex flex-col gap-4'>
			<Forms />
			<CropResult />
		</div>
	</div>
</div>
