<script lang="ts">
	//import { page } from '$app/state';
	//let src: string | null = $derived(page.url.searchParams.get('image'));
	import imgTemp from '$lib/crop_image.jpg';
	import CropBox from '$lib/crop-box.svelte';

	let imageWidth = $state(0);
	let imageHeight = $state(0);

	let imageElement: HTMLImageElement | null = $state(null);
	let containerElement: HTMLElement | null = $state(null);

	let originalSize = $state({ width: 0, height: 0 });
	let customSize = $state({ width: 200, height: 200 });

	let positionX = $state(0);
	let positionY = $state(0);

	$effect(() => {
		if (imageElement) {
			const { width, height } = imageElement;
			imageWidth = width;
			imageHeight = height;
			//customSize = { height, width };
		}
	});

	$effect(() => {
		const image = new Image();
		image.src = imgTemp;
		image.onload = () => {
			const { width, height } = image;
			originalSize = { height, width };
		};
	});

	$effect(() => {
		if (customSize) {
			if (customSize.width > imageWidth) {
				customSize.width = imageWidth;
			}

			if (customSize.height > imageHeight) {
				customSize.height = imageHeight;
			}
		}
	});

	$inspect({ positionX, positionY });
</script>

<main class="container mx-auto py-10 h-full">
	<div class="grid grid-cols-2 gap-4">
		<div class="p-10 bg-slate-100 max-h-full flex items-center justify-center">
			<div bind:this={containerElement} class="relative" style="width: {imageElement?.width}px">
				<img
					src={imgTemp}
					draggable="false"
					bind:this={imageElement}
					class="aspect-square max-h-96 w-auto select-none"
					alt=""
				/>
				{#if imageElement}
					<CropBox
						update={({ x, y }) => {
							positionX = x;
							positionY = y;
						}}
						width={customSize.width}
						height={customSize.height}
					/>
				{/if}
			</div>
		</div>
		<div class="p-10">
			<button class="bg-indigo-200 p-2">Crop</button>
			<input
				class="border border-black p-2"
				type="number"
				bind:value={customSize.width}
				placeholder="width"
			/>
		</div>
	</div>
</main>
