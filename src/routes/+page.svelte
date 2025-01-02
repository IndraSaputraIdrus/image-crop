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

<div class="h-full grid place-content-center">
	<div class='text-foreground p-10 rounded flex flex-col gap-10'>
		<div class="space-y-5 mx-auto text-center">
			<h1 class="text-3xl md:text-5xl font-semibold">Cropify Your Images.</h1>
			<p class="text-base md:text-lg text-muted max-w-lg">
				Quick and easy image cropping, right in your browser.
			</p>
		</div>

		<form {onsubmit} class='flex items-center justify-center'>
			<label
				class={[
          'mx-auto bg-foreground text-primary px-4 py-2 rounded-lg',
					'transition ease-in-out duration-300',
          'font-semibold',
					'hover:bg-foreground/70 hover:cursor-pointer'
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
</div>
