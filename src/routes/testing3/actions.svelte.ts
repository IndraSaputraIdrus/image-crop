type Store = {
  x: number;
  y: number;
  offsetHeight: number;
  offsetWidth: number;
}

export const store: Store = $state({
  x: 0,
  y: 0,
  offsetHeight: 0,
  offsetWidth: 0
})

export const drag = (element: HTMLElement) => {

  $effect(() => {
    store.x = element.offsetLeft
    store.y = element.offsetTop
  })

	const start = { x: 0, y: 0 };
	const current = { x: 0, y: 0 };

	let isDragging = false;

	const handleMouseDown = (e: MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		isDragging = true;

		start.x = e.clientX;
		start.y = e.clientY;

		element.style.cursor = 'grabbing';

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	};

	const handleMouseMove = (e: MouseEvent) => {
		if (!isDragging) return;

		const dx = e.clientX - start.x;
		const dy = e.clientY - start.y;

		// Calculate new positions
		let newX = current.x + dx;
		let newY = current.y + dy;

		// Get container and draggable dimensions
		const containerRect = element.parentElement!.getBoundingClientRect();
		const draggableRect = element.getBoundingClientRect();

		// Enforce boundaries
		const maxX = containerRect.width - draggableRect.width;
		const maxY = containerRect.height - draggableRect.height;

		newX = Math.max(0, Math.min(newX, maxX));
		newY = Math.max(0, Math.min(newY, maxY));

		// Update current positions
		current.x = newX;
		current.y = newY;

		// Apply the transform

		//element.style.transform = `translateX(${current.x}px) translateY(${current.y}px)`;

		start.x = e.clientX;
		start.y = e.clientY;

    store.x = current.x,
    store.y = current.y,
    store.offsetWidth = element.offsetWidth,
    store.offsetHeight = element.offsetHeight
	};

	const handleMouseUp = () => {
		if (isDragging) {
			isDragging = false;
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		}
	};

	element.addEventListener('mousedown', handleMouseDown);

	return {
		destroy() {
			element.removeEventListener('mousedown', handleMouseDown);
		}
	};
};
