<script lang="ts">
	import { goto } from '$app/navigation';
	import { store } from '$lib/store.svelte';

	let currentPosition = $derived({ x: store.x, y: store.y });

	let box = $derived({ ...store.cropBox });

	let container = $derived({ ...store.container });

	let imageUrl = $derived(store.image.url);

	let isLoadedImg = $state(false);

	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	let image: HTMLImageElement;

	function drawImage() {
		const scaleX = image.width / container.offsetWidth;
		const scaleY = image.height / container.offsetHeight;
		const cropX = currentPosition.x * scaleX;
		const cropY = currentPosition.y * scaleY;
		const cropWidth = box.offsetWidth * scaleX;
		const cropHeight = box.offsetHeight * scaleY;

		canvas.width = cropWidth;
		canvas.height = cropHeight

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

		return canvas.toDataURL('image/jpeg', 100);
	}

	$effect(() => {
		if (imageUrl) {
			canvas = document.createElement('canvas');
			context = canvas.getContext('2d')!;
			image = new Image();
			image.src = imageUrl;
			image.onload = () => (isLoadedImg = true);
		}
	});

	function cropAndDownload() {
		const result = drawImage();
		const link = document.createElement('a');
		link.href = result;
		link.download = 'image.jpeg';
		link.click();
	}
</script>

{#if isLoadedImg}
	<button class="bg-blue-500 text-blue-100 rounded p-2" onclick={cropAndDownload}>Crop Image</button
	>
{/if}
