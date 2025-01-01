<script lang="ts">
	import NekoImg from '$lib/crop_image.jpg';
	import { drag, store } from './actions.svelte';

	let canvasElement: HTMLCanvasElement;
	let box: HTMLDivElement;
	let width = $state(0);
	let height = $state(0);
	const currentPosition = $derived({ x: store.x, y: store.y });
	const isDrag = $derived(width > 0 || height > 0);

	function drawImage() {
		const context = canvasElement.getContext('2d');
		if (context) {
			const img = new Image();
			img.src = NekoImg;
			img.onload = () => {
				//canvasElement.width = width;
				//canvasElement.height = height;

				//const scaleX = width / img.width;
				//const scaleY = height / img.height;

				const scaleX = img.width / width;
				const scaleY = img.height / height;

				canvasElement.width = img.width;
				canvasElement.height = img.height;

				context.clearRect(0, 0, canvasElement.width, canvasElement.height);

				const cropX = currentPosition.x * scaleX;
				const cropY = currentPosition.y * scaleY;
				const cropWidth = store.offsetWidth * scaleX;
				const croptHeigth = store.offsetHeight * scaleY;

				console.log({ cropX, cropY, cropWidth, croptHeigth });

				context.drawImage(
					img,
					cropX,
					cropY,
					cropWidth,
					croptHeigth,
					0,
					0,
					canvasElement.width,
					canvasElement.height
				);
			};
		}
	}

	$effect(() => {
		store.offsetWidth = width;
		store.offsetHeight = height;
	});

	$effect(() => {
		if (isDrag && currentPosition) {
			drawImage();
		}
	});
</script>

<div class="h-full w-full flex flex-col gap-10">
	<div class="flex justify-between">
		<div bind:clientWidth={width} bind:clientHeight={height} class="size-96 stack">
			<img src={NekoImg} draggable="false" class="w-full h-full" alt="" />
			<div
				style:transform="translateX({store.x}px) translateY({store.y}px)"
				bind:this={box}
				use:drag
				class="text-red-500 size-20 border-2 border-red-500 grid place-content-center"
			>
				Box
			</div>
		</div>

		<div>
			<canvas bind:this={canvasElement}></canvas>
		</div>
	</div>

	<div>
		{JSON.stringify(store)}

		<input type="text" bind:value={store.x} />
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
