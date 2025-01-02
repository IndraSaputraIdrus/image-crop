<script lang="ts">
	type Props = {
		width: number;
		height: number;
		lock: boolean;
		maxWidth: number;
		maxHeight: number;
	};

	let {
		width = $bindable(),
		height = $bindable(),
		lock = $bindable(),
		maxHeight,
		maxWidth
	}: Props = $props();

	const setWidth = (v: number) => {
    if(v > maxWidth) v = maxWidth
    if(v < 0) v = 0
    if(lock) height = v
    width = v
	};

	const setHeight = (v: number) => {
    if(v > maxHeight) v = maxHeight
    if(v < 0) v = 0
    if(lock) width = v
    height = v
	};
</script>

<div class="flex flex-col gap-4 items-start">
	<label class='flex flex-col w-full'>
		<span>Width</span>
		<input
			class="border border-black p-2 w-full"
			type="number"
			bind:value={() => width, setWidth}
			placeholder="width"
		/>
	</label>
	<label class='flex flex-col w-full'>
		<span>Height</span>
		<input
			class="border border-black p-2"
			type="number"
			bind:value={() => height, setHeight}
			placeholder="height"
		/>
	</label>
	<label>
		<input type="checkbox" bind:checked={lock} />
		<span>Lock ratio</span>
	</label>
	<button class="bg-indigo-200 p-2 w-full">Crop</button>
</div>
