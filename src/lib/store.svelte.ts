type ImageStore = {
	offsetHeight: number;
	offsetWidth: number;
	naturalHeight: number;
	naturalWidth: number;
	src: null | string;
};

type CropBoxStore = {
  width: number;
  height: number;
  x: number;
  y: number;
  offsetLeft: number;
  offsetTop: number;
}

export const imageStore: ImageStore = $state({
	offsetHeight: 0,
	offsetWidth: 0,
	naturalHeight: 0,
	naturalWidth: 0,
	src: null
});

export const cropBoxStore: CropBoxStore = $state({
  width: 0,
  height: 0,
  x: 0,
  y: 0,
  offsetLeft: 0,
  offsetTop: 0
})
