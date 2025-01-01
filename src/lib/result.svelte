<script lang="ts">
	type Props = {
		images: HTMLImageElement;
		position: {
			startX: number;
			startY: number;
			endX: number;
			endY: number;
		};
	};

	let { images, position }: Props = $props();

	let canvasElement: HTMLCanvasElement | null = $state(null);

	const drawCanvas = () => {
		if (canvasElement) {
			const context = canvasElement.getContext('2d');
			if (!context) return;

			const newWidth = position.endX - position.startX;
			const newHeight = position.endY - position.startY;

			console.log({ newHeight, newWidth, ...position });

			canvasElement.width = images.width;
			canvasElement.height = images.height;

			context.clearRect(0, 0, canvasElement.width, canvasElement.height);
			context.drawImage(images, 0, 0);
		}
	};

	$effect(() => {
		if (position) {
			drawCanvas();
		}
	});
</script>

<div class='relative'>
	<canvas bind:this={canvasElement}></canvas>
  <div class={[
    'bg-red-500 absolute',
    'left-[220.5px] top-[158px]',

  ]}>Crop</div>
</div>
