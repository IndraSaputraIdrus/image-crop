<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { CropBox, CropResult, Forms } from '$lib/components';
	import { store } from '$lib/store.svelte';

	let imageOffsetWidth = $state(0);
	let imageOffsetHeight = $state(0);
	let isImgLoaded = $derived(imageOffsetWidth > 0 || imageOffsetHeight > 0);
  let image = $derived(page.url.searchParams.get('image'))

  $effect(() => {
    if(!image) {
      goto('/')
    }
  })

	$effect(() => {
		store.container.offsetWidth = imageOffsetWidth;
		store.container.offsetHeight = imageOffsetHeight;
    store.cropBox.offsetWidth = imageOffsetWidth;
    store.cropBox.offsetHeight = imageOffsetHeight
    store.image = image
	});
</script>

<div class="grid grid-cols-2">
	<div class="stack flex items-center justify-center">
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

	<div class="grid place-content-center">
		<CropResult />
	</div>
</div>

<Forms maxWidth={imageOffsetWidth} maxHeight={imageOffsetHeight} />

<style>
	.stack {
		display: grid;
		place-content: center;

		> * {
			grid-area: 1 / 1;
		}
	}
</style>
