<script lang="ts">
	import NekoImg from '$lib/crop_image.jpg';
	import { store } from '$lib/store.svelte';

	let resizedSize = 384;

	let width = $state(200);
	let height = $state(200);

	let currentPosition = $derived({ x: store.x, y: store.y });
	let box = $derived({
		offsetWidth: store.cropBox.offsetWidth,
		offsetHeight: store.cropBox.offsetHeight
	});
	let isLoadedImg = $state(false);

	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	let image: HTMLImageElement;

	function drawImage() {
		const scaleX = image.width / resizedSize;
		const scaleY = image.height / resizedSize;
		const cropX = currentPosition.x * scaleX;
		const cropY = currentPosition.y * scaleY;
		const cropWidth = box.offsetWidth * scaleX;
		const cropHeight = box.offsetHeight * scaleY;

		context.clearRect(0, 0, canvas.width, canvas.height);
		context.drawImage(
			image,
			cropX,
			cropY,
			cropWidth,
			cropHeight,
			0,
			0,
			canvas.width,
			canvas.height
		);
	}

	$effect(() => {
		context = canvas.getContext('2d')!;
		image = new Image();
		image.src = NekoImg;
		image.onload = () => (isLoadedImg = true);
	});

	$effect(() => {
		if (isLoadedImg && currentPosition) {
			drawImage();
		}
	});
</script>

<canvas bind:this={canvas} class="border border-red-500" width="{width}px" height="{height}px"
></canvas>
