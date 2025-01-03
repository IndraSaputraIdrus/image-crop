<script lang="ts">
	type Props = {
		width: number;
		height: number;
		src: string;
	};

	let { width = $bindable(), height = $bindable(), src }: Props = $props();
</script>

<img
	bind:offsetWidth={width}
	bind:offsetHeight={height}
	class="max-h-96 w-auto"
	alt="preview"
  {src}
/>
