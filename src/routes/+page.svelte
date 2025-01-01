<script lang="ts">
	import { goto } from '$app/navigation';

	let files: FileList | undefined = $state();

	const accept = ['.jpg', '.jpeg', '.png'];
	function onsubmit(e: SubmitEvent) {
		e.preventDefault();
	}

	$effect(() => {
		if (files) {
			const url = URL.createObjectURL(files[0]);
			goto(`/crop?image=${url}`);
		}
	});
</script>

<div class="h-full flex justify-center flex-col gap-10">
	<h1 class="text-6xl font-semibold text-center">Image Crop Online</h1>

	<form {onsubmit} class="flex flex-col gap-5 max-w-sm mx-auto w-full">
		<label
			class={[
				'w-full bg-blue-300 text-blue-700 p-2 font-bold rounded text-center',
				'transition',
				'hover:bg-blue-200 hover:cursor-pointer'
			]}
		>
			<span>Upload image</span>
			<input
				bind:files
				type="file"
				accept={accept.join(',')}
				placeholder="Upload image"
				class="hidden"
			/>
		</label>
	</form>
</div>
