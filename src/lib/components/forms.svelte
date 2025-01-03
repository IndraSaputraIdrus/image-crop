<script lang="ts">
	import { store } from '$lib/store.svelte';

	type Props = {
		maxWidth: number;
		maxHeight: number;
	};

	let { maxHeight, maxWidth }: Props = $props();

	const setWidth = (v: number) => {
		if (v > maxWidth) v = maxWidth;
		if (v < 0) v = 0;
		if (store.cropBox.lockRatio)
			if (v > maxHeight) {
				store.cropBox.offsetHeight = maxHeight;
			} else {
				store.cropBox.offsetHeight = v;
			}
		store.cropBox.offsetWidth = v;
	};

	const setHeight = (v: number) => {
		if (v > maxHeight) v = maxHeight;
		if (v < 0) v = 0;
		if (store.cropBox.lockRatio)
			if (v > maxWidth) {
				store.cropBox.offsetWidth = maxWidth;
			} else {
				store.cropBox.offsetWidth = v;
			}

		store.cropBox.offsetHeight = v;
	};
</script>

<div class="flex flex-col gap-4 items-start text-foreground">
	<label class="flex flex-col w-full">
		<span>Width</span>
		<input
			class="border border-black p-2 w-full text-primary"
			type="number"
			bind:value={() => store.cropBox.offsetWidth, setWidth}
			placeholder="width"
		/>
	</label>
	<label class="flex flex-col w-full">
		<span>Height</span>
		<input
			class="border border-black p-2 text-primary"
			type="number"
			bind:value={() => store.cropBox.offsetHeight, setHeight}
			placeholder="height"
		/>
	</label>
	<label>
		<input type="checkbox" bind:checked={store.cropBox.lockRatio} />
		<span>Lock ratio</span>
	</label>
</div>
