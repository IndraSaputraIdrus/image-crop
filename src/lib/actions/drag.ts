type Update = ({ x, y }: { x: number; y: number }) => void;

type Params = {
	initPosition: { x: number; y: number };
	update?: Update;
};

const getEventClientPosition = (e: MouseEvent | TouchEvent) => {
	if (e instanceof TouchEvent) {
		const touch = e.touches[0] || e.changedTouches[0];
		return { clientX: touch.clientX, clientY: touch.clientY };
	}
	return { clientX: e.clientX, clientY: e.clientY };
};

export const drag = (element: HTMLElement, { initPosition, update }: Params) => {
	const start = { x: 0, y: 0 };
	const current = { x: initPosition.x, y: initPosition.y };

	let isDragging = false;

	const handlePointerDown = (e: MouseEvent | TouchEvent) => {
		e.preventDefault();
		e.stopPropagation();

		isDragging = true;

		const { clientX, clientY } = getEventClientPosition(e);

		start.x = clientX;
		start.y = clientY;

		document.addEventListener('mousemove', handlePointerMove);
		document.addEventListener('mouseup', handlePointerUp);

		document.addEventListener('touchmove', handlePointerMove);
		document.addEventListener('touchend', handlePointerUp);
	};

	const handlePointerMove = (e: MouseEvent | TouchEvent) => {
		if (!isDragging) return;

		const { clientY, clientX } = getEventClientPosition(e);

		const dx = clientX - start.x;
		const dy = clientY - start.y;

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

		start.x = clientX;
		start.y = clientY;

		update?.({ x: current.x, y: current.y });
	};

	const handlePointerUp = () => {
		if (isDragging) {
			isDragging = false;
			document.removeEventListener('mousemove', handlePointerMove);
			document.removeEventListener('mouseup', handlePointerUp);

			document.removeEventListener('touchmove', handlePointerMove);
			document.removeEventListener('touchend', handlePointerUp);
		}
	};

	element.addEventListener('mousedown', handlePointerDown);
	element.addEventListener('touchstart', handlePointerDown);

	return {
		destroy() {
			element.removeEventListener('mousedown', handlePointerDown);
			element.removeEventListener('touchstart', handlePointerDown);
		}
	};
};
