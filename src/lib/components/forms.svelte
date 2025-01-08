<script lang="ts">
	import { cropBoxStore, imageStore } from '$lib/store.svelte';
	let isLockRatio = $state(true);
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
		width = cropBoxStore.width === 0 ? null : cropBoxStore.width;
		height = cropBoxStore.height === 0 ? null : cropBoxStore.height;
	});

  const inputStyle = "border border-foreground text-foreground bg-primary p-2 rounded-md"
  const labelStyle = "text-sm text-foreground mb-1"
</script>

<div class="flex flex-col gap-4 items-start text-foreground">
	<label class="flex flex-col w-full">
		<span class={labelStyle}>Width</span>
		<input
			class={inputStyle}
			type="number"
			placeholder="width"
			bind:value={() => width, (v) => handleValue(v, 'width')}
		/>
	</label>
	<label class="flex flex-col w-full">
		<span class={labelStyle}>Height</span>
		<input
			class={inputStyle}
			type="number"
			placeholder="height"
			bind:value={() => height, (v) => handleValue(v, 'height')}
		/>
	</label>
	<label class='flex items-center gap-2'>
		<input type="checkbox" bind:checked={isLockRatio} />
		<span class='text-sm text-foreground'>Lock ratio</span>
	</label>
</div>
