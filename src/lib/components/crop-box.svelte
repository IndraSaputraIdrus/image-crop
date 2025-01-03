<script lang="ts">
	import { drag } from '$lib/actions/drag';
	import { store } from '$lib/store.svelte';

	let currentX = $state(0);
	let currentY = $state(0);

	const scaleX = store.container.offsetWidth / store.image.offsetWidth
  const scaleY = store.container.offsetHeight / store.image.offsetHeight
  let scaleWidth = $derived(store.cropBox.offsetWidth * scaleX)
  let scaleHeight = $derived(store.cropBox.offsetHeight * scaleY)
</script>

<div
	use:drag={({ x, y }) => {
		currentX = x;
		currentY = y;
		store.x = x;
		store.y = y;
	}}
	style:translate="{currentX}px {currentY}px"
	style:width="{scaleWidth}px"
	style:height="{scaleHeight}px"
	class="border border-blue-500"
></div>
