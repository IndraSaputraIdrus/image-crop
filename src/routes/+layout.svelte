<script lang="ts">
	import '@fontsource/roboto/400.css';
	import '@fontsource/roboto/500.css';
	import '@fontsource/roboto/700.css';
	import '@fontsource/roboto/900.css';

	import '../app.css';
	let { children } = $props();
</script>

<main class="max-w-6xl mx-auto text-[var(--bg-primary)]">
	{@render children()}
</main>
