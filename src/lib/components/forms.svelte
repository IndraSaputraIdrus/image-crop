<script lang="ts">
	import { cropBoxStore, imageStore } from '$lib/store.svelte';
	let isLockRatio = $state(false);
	let width: null | number = $state(null);
	let height: null | number = $state(null);

	const handleValue = (value: number | null, type: string, fromLockRatio = false) => {
		if (type === 'width') {
			value = value ? Math.max(0, Math.min(value, imageStore.naturalWidth)) : value;
			width = value;
			cropBoxStore.width = value ?? 0;
			if (isLockRatio && !fromLockRatio) {
				handleValue(value, 'height', true);
			}
		}

		if (type === 'height') {
			value = value ? Math.max(0, Math.min(value, imageStore.naturalHeight)) : value;
			height = value;
			cropBoxStore.height = value ?? 0;
			if (isLockRatio && !fromLockRatio) {
				handleValue(value, 'width', true);
			}
		}
	};

	$effect(() => {
		width = imageStore.naturalWidth;
		height = imageStore.naturalHeight;
	});
</script>

<div class="flex flex-col gap-4 items-start text-foreground">
	<label class="flex flex-col w-full">
		<span>Width</span>
		<input
			class="border border-black p-2 w-full text-primary"
			type="number"
			placeholder="width"
			bind:value={() => width, (v) => handleValue(v, 'width')}
		/>
	</label>
	<label class="flex flex-col w-full">
		<span>Height</span>
		<input
			class="border border-black p-2 text-primary"
			type="number"
			placeholder="height"
			bind:value={() => height, (v) => handleValue(v, 'height')}
		/>
	</label>
	<label>
		<input type="checkbox" bind:checked={isLockRatio} />
		<span>Lock ratio</span>
	</label>
</div>
