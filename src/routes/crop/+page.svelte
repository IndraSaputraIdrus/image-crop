<script lang="ts">
	//import { page } from '$app/state';
	//let src: string | null = $derived(page.url.searchParams.get('image'));
	import imgTemp from '$lib/crop_image.jpg';

	let imageWidth = $state(0);
	let imageHeight = $state(0);

	let imageElement: HTMLImageElement | null = $state(null);
	let cropBox: HTMLElement | null = $state(null);
  let containerElement: HTMLElement | null = $state(null)

	let originalSize = $state({ width: 0, height: 0 });
	let customSize = $state({ width: 200, height: 200 });

	let isDrag = $state(false);

	let startX = $state(0);
	let startY = $state(0);

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

	$inspect({ originalSize, resized: { imageWidth, imageHeight } });

	const drag = (element: HTMLElement) => {
		const handleMouseDown = (e: MouseEvent) => {
      e.stopPropagation()
			isDrag = true;
			startY = e.clientY;
			startX = e.clientX;
			element.style.cursor = 'grabbing';
		};

		const handleMouseUp = () => {
			isDrag = false;
		};

		const handleMouseMove = (e: MouseEvent) => {
			if (!isDrag) return;
			const parent = containerElement!.getBoundingClientRect();

			let left = e.clientX - element.offsetWidth;
			let top = e.clientY - element.offsetHeight;

      if (left < 0) left = 0
			if (left > parent.width - element.offsetWidth) left = parent.width - element.offsetWidth;

      if(top < 0) top = 0
			if (top > parent.height - element.offsetHeight) top = parent.height - element.offsetHeight;


			element.style.left = `${left}px`;
			element.style.top = `${top}px`;
		};

		element.addEventListener('mousedown', handleMouseDown);
		document.addEventListener('mouseup', handleMouseUp);
		document.addEventListener('mousemove', handleMouseMove);

		return {
			destroy() {
				element.removeEventListener('mousedown', handleMouseDown);
				document.removeEventListener('mouseup', handleMouseUp);
				document.removeEventListener('mousemove', handleMouseMove);
			}
		};
	};
</script>

<main class="container mx-auto py-10 h-full">
	<div class="grid grid-cols-2 gap-4">
		<div class="p-10 bg-slate-100 max-h-full">
			<div bind:this={containerElement} class="relative mx-auto" style="width: {imageElement?.width}px">
				<img
					src={imgTemp}
					draggable="false"
					bind:this={imageElement}
					class="aspect-square max-h-96 w-auto select-none"
					alt=""
				/>
				<div
					use:drag
					style="width: {customSize.width}px; height: {customSize.width}px"
					bind:this={cropBox}
					class="ring-2 ring-blue-500 absolute inset-0"
				></div>
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
