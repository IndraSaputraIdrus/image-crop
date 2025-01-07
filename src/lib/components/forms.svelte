<script lang="ts">
	import { store } from '$lib/store.svelte';

	type Props = {
		maxWidth: number;
		maxHeight: number;
	};
	let { maxHeight, maxWidth }: Props = $props();

	const isLockRatio = $derived(store.cropBox.lockRatio);
	let width: null | number = $state(null);
	let height: null | number = $state(null);

	const container = $derived({ ...store.container });
	const original = $derived({ ...store.image });

	const scaleToDown = (v: number, type: 'width' | 'height') => {
		const scale =
			type === 'width'
				? container.offsetWidth / original.offsetWidth
				: container.offsetHeight / original.offsetHeight;
		return v * scale;
	};

	const setWidth = (v: number | null) => {
		if (v === null) {
			width = v;
			height = isLockRatio ? v : height;
			return;
		}

		v = Math.max(0, Math.min(v, maxWidth));
		store.cropBox.offsetWidth = scaleToDown(v, 'width');
		width = v;

		if (isLockRatio) {
			height = Math.min(v, maxHeight);
			store.cropBox.offsetHeight = scaleToDown(height, 'height');
		}
	};

	const setHeight = (v: number | null) => {
		if (v === null) {
			height = v;
			width = isLockRatio ? v : width;
			return;
		}

		v = Math.max(0, Math.min(v, maxHeight));

		store.cropBox.offsetHeight = scaleToDown(v, 'height');
		height = v;

		if (isLockRatio) {
			width = Math.min(v, maxWidth);
			store.cropBox.offsetWidth = scaleToDown(width, 'width');
		}
	};

	$effect(() => {
		width = store.image.offsetWidth;
		height = store.image.offsetHeight;
	});
</script>

<div class="flex flex-col gap-4 items-start text-foreground">
	<label class="flex flex-col w-full">
		<span>Width</span>
		<input
			class="border border-black p-2 w-full text-primary"
			type="number"
			placeholder="width"
			bind:value={() => width, setWidth}
		/>
	</label>
	<label class="flex flex-col w-full">
		<span>Height</span>
		<input
			class="border border-black p-2 text-primary"
			type="number"
			bind:value={() => height, setHeight}
			placeholder="height"
		/>
	</label>
	<label>
		<input type="checkbox" bind:checked={store.cropBox.lockRatio} />
		<span>Lock ratio</span>
	</label>
</div>
