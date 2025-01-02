<script lang="ts">
	import NekoImg from '$lib/crop_image.jpg';
	import { CropBox } from '$lib/components';

	let imageOffsetWidth = $state(0);
	let imageOffsetHeight = $state(0);
	let isImgLoaded = $derived(imageOffsetWidth > 0 || imageOffsetHeight > 0);
</script>

<div class="grid grid-cols-2">
	<div class="stack flex items-center justify-center">
		<img
			bind:offsetWidth={imageOffsetWidth}
			bind:offsetHeight={imageOffsetHeight}
			src={NekoImg}
			class="max-h-96 w-auto"
			alt="neko"
		/>
		{#if isImgLoaded}
			<div style:width="{imageOffsetWidth}px" style:height="{imageOffsetHeight}px">
				<CropBox />
			</div>
		{/if}
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
