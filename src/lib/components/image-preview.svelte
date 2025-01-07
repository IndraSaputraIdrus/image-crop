<script lang="ts">
	import { imageStore } from '$lib/store.svelte';
</script>

<img
	bind:naturalHeight={imageStore.naturalHeight}
	bind:naturalWidth={imageStore.naturalWidth}
	bind:offsetWidth={imageStore.offsetWidth}
	bind:offsetHeight={imageStore.offsetHeight}
  src={imageStore?.src}
	class="max-h-96 w-auto"
	alt="preview"
/>
