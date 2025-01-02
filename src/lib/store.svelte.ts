type Size = { offsetWidth: number; offsetHeight: number };

type Store = {
	x: number;
	y: number;
	image: string | null;
	cropBox: Size & { lockRatio: boolean };
	container: Size
};

export const store: Store = $state({
	x: 0,
	y: 0,
	image: null,
	cropBox: {
		lockRatio: false,
		offsetWidth: 0,
		offsetHeight: 0
	},
	container: {
		offsetWidth: 0,
		offsetHeight: 0
	}
});
