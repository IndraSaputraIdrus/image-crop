<script lang="ts">
	import JING from '$lib/jing.jpg';
	import { drag } from '$lib/actions/drag';

	let naturalWidth = $state(0);
	let naturalHeight = $state(0);

	let resizedWidth = $state(0);
	let resizedHeight = $state(0);

	let oriWidth = $state(0);
	let oriHeight = $state(0);

	let position = $state({
		x: 0,
		y: 0
	});

	let boxSize = $state(100);
	let draggable: HTMLElement | undefined = $state();

	function scale(value: number, direction: string) {
		const scale = direction === 'top' ? oriHeight / resizedHeight : oriWidth / resizedWidth;
		return value * scale;
	}

	function handleOverflow() {
		const cropSizeY = draggable!.offsetTop + boxSize;
		const cropSizeX = draggable!.offsetLeft + boxSize;
		let excess: number;
		if (cropSizeY > resizedHeight) {
			excess = cropSizeY - resizedHeight;
			position.y = draggable!.offsetTop - excess;
		}
		if (cropSizeX > resizedWidth) {
			excess = cropSizeX - resizedWidth;
			position.x = draggable!.offsetLeft - excess;
		}
	}

	$effect(() => {
		const ratio = naturalWidth / naturalHeight;
		let width = 350;
		resizedWidth = width;
		resizedHeight = width / ratio;

		width = 450;
		oriWidth = width;
		oriHeight = width / ratio;
	});

	$effect(() => {
		if (resizedHeight > 0 && boxSize > resizedHeight) {
			boxSize = +resizedHeight.toFixed();
		}
	});
</script>

<div class="p-5 h-screen">
	<div class="h-full grid grid-cols-2 gap-5">
		<div class="border border-red-500 p-5 flex flex-col gap-5">
			<h1 class="text-foreground mb-4">
				Resized image (w: {resizedWidth}, h: {resizedHeight.toFixed(2)})
			</h1>
			<div class="relative" style:height="{resizedHeight}px" style:width="{resizedWidth}px">
				<img
					id="img1"
					class="ring ring-red-500 h-full w-full"
					bind:naturalWidth
					bind:naturalHeight
					src={JING}
					alt="jing"
					style:height="{resizedHeight}px"
					style:width="{resizedWidth}px"
				/>

				{#if resizedWidth > 0}
					<div
						bind:this={draggable}
						use:drag={({ x, y }) => {
							position.x = x;
							position.y = y;
						}}
						style:top="{position.y}px"
						style:left="{position.x}px"
						style:width="{boxSize}px"
						style:height="{boxSize}px"
						class="absolute z-[999] bg-white"
					></div>
				{/if}
			</div>

			<div>
				<input
					type="number"
					bind:value={() => boxSize,
					(v) => {
						boxSize = v;
						handleOverflow();
					}}
				/>
			</div>
		</div>
		<div class="border border-blue-500 p-5">
			<h1 class="text-foreground mb-4">Resized image (w: {oriWidth}, h: {oriHeight.toFixed(2)})</h1>
			<div class="relative" style:height="{oriHeight}px" style:width="{oriWidth}px">
				<img style:height="{oriHeight}px" style:width="{oriWidth}px" src={JING} alt="jingOri" />
				{#if resizedWidth > 0}
					<div
						use:drag={({ x, y }) => {
							position.x = x;
							position.y = y;
						}}
						style:top="{scale(position.y, 'top')}px"
						style:left="{scale(position.x, 'left')}px"
						style:width="{scale(boxSize, 'left')}px"
						style:height="{scale(boxSize, 'top')}px"
						class="absolute z-[999] bg-white"
					></div>
				{/if}
			</div>
		</div>
	</div>
</div>
