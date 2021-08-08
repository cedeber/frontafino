/**
 * Throttle a function
 */
export function throttle(func: Function, delay: number): (...rest: any[]) => any {
    let start = performance.now();

    return function (this: any, ...args: any[]): any {
        if (performance.now() - start > delay) {
            start = performance.now();

            return func.call(this, ...args);
        }
    };
}

/**
 * Debounce a function
 */
export function debounce(func: Function, delay: number): (...rest: any[]) => void {
    let timer: number;

    return function (this: any, ...args: any[]) {
        clearTimeout(timer);
        timer = window.setTimeout(func.bind(this, ...args), delay);
    };
}
