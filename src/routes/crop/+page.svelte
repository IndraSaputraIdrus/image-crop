<script lang="ts">
	import { page } from '$app/state';

	let src: string | null = $derived(page.url.searchParams.get('image'));
	let error: boolean = $derived(Boolean(!src));
	let canvasElement: HTMLCanvasElement | null = $state(null);

	function renderImg(src: string) {
    const img = new Image();

		img.src = src;

		img.onload = () => {
			if (canvasElement) {
				const { width, height } = img;
				canvasElement.width = width;
				canvasElement.height = height;

				const ctx = canvasElement.getContext('2d');
				if (!ctx) return;

        ctx.clearRect(0, 0, width, height)
				ctx.drawImage(img, 0, 0);
			}
		};

		img.onerror = () => {
			console.error('image error');
		};
	}

	$effect(() => {
		if (src) {
      renderImg(src)
		}
	});
</script>

{#if error}
  <p class='text-pink-500 italic'>Something error</p>
{/if}

<canvas bind:this={canvasElement}></canvas>
