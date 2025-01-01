<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<main class="container mx-auto py-10 h-full">
	{@render children()}
</main>
