<script lang="ts">
	import { drag } from '$lib/actions/drag';
	import { store } from '$lib/store.svelte';

	let currentX = $state(0);
	let currentY = $state(0);

	let width = $derived(store.cropBox.offsetWidth);
	let height = $derived(store.cropBox.offsetHeight);
</script>

<div
	use:drag={({ x, y }) => {
		currentX = x;
		currentY = y;
		store.x = x;
		store.y = y;
	}}
	style:translate="{currentX}px {currentY}px"
	style:width="{width}px"
	style:height="{height}px"
	class="border border-blue-500"
></div>
