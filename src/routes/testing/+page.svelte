<script lang="ts">
	let startX = $state(0);
	let startY = $state(0);
	let endX = $state(0);
	let endY = $state(0);
	let isDragging = $state(false);

	const rectangle = (element: HTMLElement) => {
		let rectangle: HTMLElement | null = null;

    const createRectangle = () => {
			const rectangle = document.createElement('div');
			rectangle.style.position = 'absolute';
			rectangle.style.top = `${Math.min(startY, endY)}px`;
			rectangle.style.left = `${Math.min(startX, endX)}px`;

      const maxWidth = window.innerWidth - rectangle.offsetLeft;
      const maxHeight = window.innerHeight - rectangle.offsetTop;
      rectangle.style.width = `${Math.min(Math.abs(startX - endX + 5), maxWidth)}px`;
      rectangle.style.height = `${Math.min(Math.abs(startY - endY + 5), maxHeight)}px`

			rectangle.style.border = '1px solid black';
			rectangle.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';

      return rectangle
    }

		const handleMouseDown = (e: MouseEvent) => {
			isDragging = true;
			startY = e.clientY;
			startX = e.clientX;
		};

		const handleMouseUp = () => {
			isDragging = false;
		};

		const handleMouseMove = (e: MouseEvent) => {
			if (!isDragging) return;
			endX = e.clientX;
			endY = e.clientY;

			if (rectangle) {
				element.removeChild(rectangle);
			}

      rectangle = createRectangle()
			element.appendChild(rectangle);
		};

		element.addEventListener('mousedown', handleMouseDown);
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);

		return {
			destroy() {
				element.removeEventListener('mousedown', handleMouseDown);
				document.removeEventListener('mousemove', handleMouseMove);
				document.removeEventListener('mouseup', handleMouseUp);
			}
		};
	};
</script>

<div use:rectangle class="grid place-content-center absolute inset-0 bg-slate-300">Container</div>
