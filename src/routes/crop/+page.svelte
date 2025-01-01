<script lang="ts">
	//import { page } from '$app/state';
	//let src: string | null = $derived(page.url.searchParams.get('image'));
	import imgTemp from '$lib/crop_image.jpg';
	import CropBox from '$lib/crop-box.svelte';
	import Forms from '$lib/forms.svelte';
	import Result from '$lib/result.svelte';
	let imageElement: HTMLImageElement | null = $state(null);

	let originalSize = $state({ width: 0, height: 0 });
	let customSize = $state({ width: 200, height: 200 });
	let lockRatio = $state(false);
	let isLoad = $state(false);

	let imgSize = $state({ width: 0, height: 0 });

	let position = $state({
		startX: 0,
		startY: 0,
		endX: 0,
		endY: 0
	});

	let image: HTMLImageElement | null = $state(null);

	$effect(() => {
		if (!image) {
			image = new Image();
			image.src = imgTemp;
			image.onload = () => {
				const { width, height } = image!;
				originalSize = { height, width };
				isLoad = true;
			};
		}
	});
</script>

	<div class="grid grid-cols-2 gap-4">
		<div class="p-10 bg-slate-100 max-h-full flex items-center justify-center">
			<div class="relative" style="width: auto">
				<img
					src={imgTemp}
					draggable="false"
					bind:clientWidth={imgSize.width}
					bind:clientHeight={imgSize.height}
					class="aspect-square max-h-96 w-auto select-none"
					alt=""
				/>
				{#if isLoad}
					<CropBox
						update={({ newPosition, startPosition }) => {
							position.startX = startPosition.x;
							position.startY = startPosition.y;
							position.endX = newPosition.x;
							position.endY = newPosition.y;
						}}
						width={customSize.width}
						height={customSize.height}
					/>
				{/if}
			</div>
		</div>
		<div class="p-10">
			<Forms
				bind:width={customSize.width}
				bind:height={customSize.height}
				bind:lock={lockRatio}
				maxWidth={imgSize.width}
				maxHeight={imgSize.height}
			/>
		</div>
	</div>

	<div class="pb-10">
		<h2>Canvas</h2>
		{#if image}
			<Result images={image} {position} />
		{/if}
	</div>
