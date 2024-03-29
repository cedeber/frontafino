type UnknownFn = (...args: any[]) => unknown;

/**
 * Throttle a function
 */
export function throttle(func: UnknownFn, delay: number): (...rest: any[]) => unknown {
	let start = performance.now();

	return function (this: unknown, ...args: any[]): unknown {
		if (performance.now() - start > delay) {
			start = performance.now();
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			return func.call(this, ...args);
		}
	};
}

/**
 * Debounce a function
 */
export function debounce(func: UnknownFn, delay: number): (...rest: any[]) => void {
	let timer: number;

	return function (this: unknown, ...args: any[]) {
		clearTimeout(timer);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		timer = self.window.setTimeout(func.bind(this, ...args), delay);
	};
}
