<script lang="ts">
	import { cropBoxStore, imageStore } from '$lib/store.svelte';

	const naturalWidth = $derived(imageStore.naturalWidth);
	const naturalHeight = $derived(imageStore.naturalHeight);
	const offsetWidht = $derived(imageStore.offsetWidth);
	const offsetHeight = $derived(imageStore.offsetHeight);
	const imageUrl = $derived(imageStore.src);

	const boxWidth = $derived(cropBoxStore.width);
	const boxHeight = $derived(cropBoxStore.height);
	const positionX = $derived(cropBoxStore.x);
	const positionY = $derived(cropBoxStore.y);

	const drawImage = (image: HTMLImageElement) => {
		const scaleX = naturalWidth / offsetWidht;
		const scaleY = naturalHeight / offsetHeight;
		const cropX = positionX * scaleX;
		const cropY = positionY * scaleY;

		const canvas = document.createElement('canvas');
		canvas.width = boxWidth;
		canvas.height = boxHeight;

		const context = canvas.getContext('2d')!;
		context.clearRect(0, 0, boxWidth, boxHeight);
		context.drawImage(image, cropX, cropY, boxWidth, boxHeight, 0, 0, boxWidth, boxHeight);

		return canvas.toDataURL('image/jpeg', 100);
	};

	const download = (dataUrl: string) => {
		const a = document.createElement('a');
		a.href = dataUrl;
		a.download = 'Image.jpeg';
		a.click();
	};

	const cropImage = () => {
		if (!imageUrl) return;
		const image = new Image();
		image.src = imageUrl;

		image.onerror = (e) => {
			console.log(e);
		};

		image.onload = () => {
      const data = drawImage(image)
			download(data);
		};
	};
</script>

<button
	onclick={cropImage}
	class={[
		'bg-blue-800 text-foreground',
		'p-2 rounded',
		'text-lg font-medium',
    'transition',
		'hover:bg-blue-800/70',
    'focus:outline-none focus:ring focus:ring-blue-200'
	]}
>
	Crop Image
</button>
