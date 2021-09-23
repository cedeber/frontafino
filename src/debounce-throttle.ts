type UnknownFn = (...args: any[]) => unknown;

/**
 * Throttle a function
 */
function throttle(func: UnknownFn, delay: number): (...rest: any[]) => unknown {
    let start = performance.now();

    return function (this: unknown, ...args: any[]): unknown {
        if (performance.now() - start > delay) {
            start = performance.now();

            return func.call(this, ...args);
        }
    };
}

/**
 * Debounce a function
 */
function debounce(func: UnknownFn, delay: number): (...rest: any[]) => void {
    let timer: number;

    return function (this: unknown, ...args: any[]) {
        clearTimeout(timer);
        timer = window.setTimeout(func.bind(this, ...args), delay);
    };
}

export { throttle, debounce };
