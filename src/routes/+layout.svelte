<script lang="ts">
	import '@fontsource/roboto/400.css';
	import '@fontsource/roboto/500.css';
	import '@fontsource/roboto/700.css';
	import '@fontsource/roboto/900.css';

	import '../app.css';
	let { children } = $props();
</script>

<main class="container mx-auto py-10 h-full text-[var(--bg-primary)]">
	{@render children()}
</main>
