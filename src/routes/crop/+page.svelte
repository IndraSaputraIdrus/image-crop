<script lang="ts">
	//import { page } from '$app/state';
	//let src: string | null = $derived(page.url.searchParams.get('image'));
	import imgTemp from '$lib/crop_image.jpg';

	let imageWidth = $state(0);
	let imageHeight = $state(0);
  
	let imageElement: HTMLImageElement | null = $state(null);
  let cropBox: HTMLElement | null = $state(null)

	let originalSize = $state({ width: 0, height: 0 });
	let customSize = $state({ width: 0, height: 0 });

  let isDrag = $state(false)

	$effect(() => {
		if (imageElement) {
      const {width, height} = imageElement
			imageWidth = width;
			imageHeight = height;
			customSize = { height, width };
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

	$inspect({ originalSize, resized: { imageWidth, imageHeight } });
</script>

<main class="container mx-auto py-10 h-full">
	<div class="grid grid-cols-2 gap-10">
		<div class="p-10 bg-slate-100 max-h-full">
			<div class="relative mx-auto" style='width: {imageElement?.width}px'>
				<img src={imgTemp} bind:this={imageElement} class="h-96 w-auto" alt="" />
				<div style='width: {customSize.width}px; height: {customSize.width}px' bind:this={cropBox} class="ring-2 ring-blue-500 absolute inset-0"></div>
			</div>
		</div>
		<div class="p-10">
			<button class="bg-indigo-200 p-2">Crop</button>
      <input class='border border-black p-2' type="number" bind:value={customSize.width} placeholder='width'>
		</div>
	</div>
</main>
