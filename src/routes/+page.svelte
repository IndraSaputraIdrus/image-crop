<script lang="ts">
	import { goto } from '$app/navigation';
	import LoadingIcon from '$lib/components/loading-icon.svelte';
	import { imageStore, cropBoxStore } from '$lib/store.svelte';

	let files: FileList | undefined = $state();
	const accept = ['.jpg', '.jpeg', '.png'];
	let isLoading = $state(false);

	$effect(() => {
		if (files) {
			isLoading = true;
			const url = URL.createObjectURL(files[0]);
			isLoading = false;
			goto(`/crop?image=${url}`);
		}
	});

	$effect(() => {
		imageStore.offsetHeight = 0;
		imageStore.offsetWidth = 0;
		imageStore.naturalHeight = 0;
		imageStore.naturalWidth = 0;
		imageStore.src = null;

		cropBoxStore.width = 0;
		cropBoxStore.height = 0;
		cropBoxStore.x = 0;
		cropBoxStore.y = 0;
		cropBoxStore.offsetLeft = 0;
		cropBoxStore.offsetTop = 0;
	});
</script>

<div class="min-h-dvh grid place-content-center">
	<div class="text-foreground p-10 rounded flex flex-col gap-10">
		<div class="space-y-5 mx-auto text-center">
			<h1 class="text-3xl md:text-5xl font-semibold">Cropify Your Images.</h1>
			<p class="text-base md:text-lg text-muted max-w-lg">
				Quick and easy image cropping, right in your browser.
			</p>
		</div>

		<div class="flex items-center justify-center">
			<label
				class={[
					'mx-auto bg-foreground text-primary px-4 py-2 rounded-lg',
					'transition ease-in-out duration-300',
					'font-semibold',
					'hover:bg-foreground/70 hover:cursor-pointer',
          'flex items-center gap-4'
				]}
			>
				<span>Upload image</span>
        {#if isLoading}
          <LoadingIcon class='animate-spin size-4' />
        {/if}
				<input
					bind:files
					type="file"
					accept={accept.join(',')}
					placeholder="Upload image"
					class="hidden"
				/>
			</label>
		</div>
	</div>
</div>
