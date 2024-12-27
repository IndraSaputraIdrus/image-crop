<script lang="ts">
	import { goto } from '$app/navigation';

	let files: FileList | undefined = $state();

	const accept = ['.jpg', '.jpeg', '.png'];

	function onsubmit(e: SubmitEvent) {
		e.preventDefault();

		if (!files) return;

		const url = URL.createObjectURL(files[0]);
		goto(`/crop?image=${url}`);
	}
</script>

<h1 class="text-4xl font-semibold mb-5">Image Crop Online</h1>

<form {onsubmit} class="flex flex-col gap-5">
	<input bind:files type="file" accept={accept.join(',')} placeholder="Upload image" />
	<button class="bg-slate-950 text-slate-100 rounded p-2 font-bold">Submit</button>
</form>
