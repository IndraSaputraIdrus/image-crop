<script lang="ts">
	import { drag } from '$lib/actions/drag';
	import { store } from '$lib/store.svelte';

  let cropBoxElement: undefined | HTMLElement = $state()

	const scaleX = store.container.offsetWidth / store.image.offsetWidth;
	const scaleY = store.container.offsetHeight / store.image.offsetHeight;
	let scaleWidth = $derived(store.cropBox.offsetWidth * scaleX);
	let scaleHeight = $derived(store.cropBox.offsetHeight * scaleY);

  const handleOverflowRight = () => {
    console.log(store.cropBox)
  }

  $effect(() => {
    if(cropBoxElement) {
      store.cropBox.offsetTop = cropBoxElement.offsetTop
      store.cropBox.offsetLeft = cropBoxElement.offsetLeft
    }
  })
</script>

{#snippet button(position: string)}
	<button
		class={[
			'size-2.5 bg-slate-200',
			'rounded-full border border-blue-500',
			'absolute z-[99]',
			position === 'top-left' && '-top-[5px] -left-[5px] cursor-nwse-resize',
			position === 'top-right' && '-right-[5px] -top-[5px] cursor-nesw-resize',
      position === 'bottom-left' && '-bottom-[5px] -left-[5px] cursor-nesw-resize',
      position === 'bottom-right' && '-bottom-[5px] -right-[5px] cursor-nwse-resize'
		]}
		aria-label="resize crop"
	></button>
{/snippet}

<div class='w-[100px] h-[100px] absolute bg-red-500'></div>

<div
	use:drag={({ x, y }) => {
		store.x = x;
		store.y = y;
	}}
  bind:this={cropBoxElement}
	style:translate="{store.x}px {store.y}px"
	style:width="{scaleWidth}px"
	style:height="{scaleHeight}px"
	class="border border-blue-500 relative z-[999] cursor-move bg-black/70"
>
	{#each ['top-left', 'top-right', 'bottom-left', 'bottom-right'] as position}
		{@render button(position)}
	{/each}
</div>
