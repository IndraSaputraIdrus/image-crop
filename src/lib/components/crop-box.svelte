<script lang="ts">
	import { drag } from '$lib/actions/drag';

	let width = $state(80);
	let height = $state(80);

	let currentX = $state(0);
	let currentY = $state(0);
</script>

<div
	use:drag={({ x, y }) => {
		currentX = x;
		currentY = y;
	}}
	style:translate="{currentX}px {currentY}px"
	style:width="{width}px"
	style:height="{height}px"
	class="border border-blue-500"
></div>
