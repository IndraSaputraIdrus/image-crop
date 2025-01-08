<script lang="ts">
	import { goto } from '$app/navigation';
	import { imageStore } from '$lib/store.svelte';

	$effect(() => {
		if (!imageStore.src) {
			goto('/');
		}
	});
</script>

<img
	bind:naturalHeight={imageStore.naturalHeight}
	bind:naturalWidth={imageStore.naturalWidth}
	bind:clientWidth={imageStore.offsetWidth}
	bind:clientHeight={imageStore.offsetHeight}
	src={imageStore.src}
	class="max-h-96 w-auto"
	alt="preview"
/>
