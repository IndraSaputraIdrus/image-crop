<script lang="ts">
	import { store } from '$lib/store.svelte';

	type Coordinate = { x: number; y: number };

	type UpdateProps = { startPosition: Coordinate; newPosition: Coordinate };

	type Props = {
		width: number;
		height: number;
		update?: (props: UpdateProps) => void;
	};

	let { width, height, update }: Props = $props();

	const drag = (element: HTMLElement) => {
		let startPosition = {
			x: 0,
			y: 0
		};

		let newPosition = {
			x: 0,
			y: 0
		};

		let isDragging = false;
		const parentRect = element.parentElement!.getBoundingClientRect();

		const handleMouseDown = (e: MouseEvent) => {
			e.preventDefault();
			e.stopPropagation();

			isDragging = true;

			startPosition = {
				x: e.clientX,
				y: e.clientY
			};

			element.style.cursor = 'grabbing';

			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);
		};

		const handleMouseMove = (e: MouseEvent) => {
			if (!isDragging) return;

			newPosition = {
				x: startPosition.x - e.clientX,
				y: startPosition.y - e.clientY
			};

			startPosition = {
				x: e.clientX,
				y: e.clientY
			};

			const newLeft = element.offsetLeft - newPosition.x;
			const newTop = element.offsetTop - newPosition.y;

			const elementRect = element.getBoundingClientRect();

			if (newLeft >= 0 && newLeft + elementRect.width <= parentRect.width) {
				element.style.left = `${newLeft}px`;
			}

			if (newTop >= 0 && newTop + elementRect.height <= parentRect.height) {
				element.style.top = `${newTop}px`;
			}

			store.top = elementRect.top
      store.left = elementRect.left
      store.width = elementRect.height
      store.heigth = elementRect.y
		};

		const handleMouseUp = () => {
			if (isDragging) {
				isDragging = false;
				document.removeEventListener('mousemove', handleMouseMove);
				document.removeEventListener('mouseup', handleMouseUp);
				update?.({ startPosition, newPosition });
			}
		};

		element.addEventListener('mousedown', handleMouseDown);

		return {
			destroy() {
				element.removeEventListener('mousedown', handleMouseDown);
			}
		};
	};
</script>

<div
	use:drag
	style="width: {width}px; height: {height}px"
	class={['crop-box', 'absolute inset-0']}
></div>

<style>
	.crop-box {
		--color: #60a5fa;
		--size: 1.5px;

		background-size: 25% 25%;
		background-image: linear-gradient(to right, var(--color) var(--size), transparent var(--size)),
			linear-gradient(to bottom, var(--color) var(--size), transparent var(--size));

		border-right: var(--size) solid var(--color);
		border-bottom: var(--size) solid var(--color);
		box-sizing: border-box;
	}
</style>
