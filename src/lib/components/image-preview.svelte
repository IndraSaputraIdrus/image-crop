<script lang="ts">
	import { imageStore } from '$lib/store.svelte';
</script>

<img
	bind:naturalHeight={imageStore.naturalHeight}
	bind:naturalWidth={imageStore.naturalWidth}
  bind:clientWidth={imageStore.offsetWidth}
  bind:clientHeight={imageStore.offsetHeight}
	src={imageStore.src}
	class="h-full w-full"
	alt="preview"
/>
