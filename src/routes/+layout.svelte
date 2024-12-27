<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<main class="container mx-auto px-5 py-8 grid place-content-center h-full">
	{@render children()}
</main>
