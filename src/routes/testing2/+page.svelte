<script lang="ts">
	import NekoImage from '$lib/crop_image.jpg';
	let imageSrc = $state(''); // URL gambar yang akan dicrop
	let canvasWidth = $state(500); // Lebar kanvas
	let canvasHeight = $state(500); // Tinggi kanvas
	let cropbox = $state({ x: 50, y: 50, width: 100, height: 100 }); // Posisi & ukuran cropbox
	let isDragging = $state(false); // Untuk drag cropbox
	let startX = $state(0);
	let startY = $state(0);
	let image: HTMLImageElement | null = $state(null);

	// Fungsi untuk menggambar ulang kanvas
	const drawCanvas = () => {
		const canvas = document.getElementById('mainCanvas') as HTMLCanvasElement;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		if (!image) return;

		// Bersihkan kanvas
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);

		// Gambar gambar ke kanvas
		ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);

		// Gambar cropbox
		ctx.strokeStyle = 'red';
		ctx.lineWidth = 2;
		ctx.strokeRect(cropbox.x, cropbox.y, cropbox.width, cropbox.height);
	};

	// Crop gambar
	const cropImage = () => {
		const canvas = document.createElement('canvas');
		canvas.width = cropbox.width;
		canvas.height = cropbox.height;
		const ctx = canvas.getContext('2d');
		if (!ctx || !image) return;

		ctx.drawImage(
			image,
			cropbox.x,
			cropbox.y,
			cropbox.width,
			cropbox.height,
			0,
			0,
			cropbox.width,
			cropbox.height
		);

		// Kembalikan data URL hasil crop
		return canvas.toDataURL('image/png');
	};

	// Inisialisasi gambar
	$effect(() => {
		image = new Image();
		image.src = NekoImage;
		image.onload = drawCanvas;
	});

	// Handle mouse events untuk drag cropbox
	const handleMouseDown = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		const rect = target.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		if (
			x > cropbox.x &&
			x < cropbox.x + cropbox.width &&
			y > cropbox.y &&
			y < cropbox.y + cropbox.height
		) {
			isDragging = true;
			startX = x - cropbox.x;
			startY = y - cropbox.y;
		}
	};

	const handleMouseMove = (e: MouseEvent) => {
		if (!isDragging) return;

		const rect = (e.target as HTMLElement).getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		cropbox.x = x - startX;
		cropbox.y = y - startY;

		// Pastikan cropbox tetap di dalam kanvas
		cropbox.x = Math.max(0, Math.min(canvasWidth - cropbox.width, cropbox.x));
		cropbox.y = Math.max(0, Math.min(canvasHeight - cropbox.height, cropbox.y));

		drawCanvas();
	};

	const handleMouseUp = () => {
		isDragging = false;
	};
</script>

<div>
	<canvas
		id="mainCanvas"
		width={canvasWidth}
		height={canvasHeight}
		onmousedown={handleMouseDown}
		onmousemove={handleMouseMove}
		onmouseup={handleMouseUp}
	></canvas>

	<button
		onclick={() => {
			const croppedImage = cropImage();
			const link = document.createElement('a');
			link.href = croppedImage!;
			link.download = 'cropped-image.png';
			link.click();
		}}
	>
		Crop & Download
	</button>
</div>

<style>
	canvas {
		border: 1px solid #ccc;
	}
</style>
