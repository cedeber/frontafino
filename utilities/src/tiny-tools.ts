/**
 * Throttle a function
 */
export function throttle(func: Function, delay: number): (...rest: any[]) => any {
    let start = performance.now();

    return function (...args: any[]): any {
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

    return function (...args: any[]) {
        clearTimeout(timer);
        timer = setTimeout(func.bind(this, ...args), delay);
    };
}

/**
 * Generate an unique I
 */
export function uid(): string {
    return Math.random()
        .toString(36)
        .substr(2, 9);
}

/**
 * Flatten an Array or a Set
 */
export function flatten(arr: any[] | Set<any> = []): any[] {
    let list = [];

    for (let v of arr) {
        list = list.concat(
            v instanceof Array || v instanceof Set ? flatten(v) : v,
        );
    }

    return list;
}

/**
 * Deep clone
 */
export function clone(obj: any): any {
    let copy;

    // Handle the 3 simple types, and null or undefined
    if (obj == undefined || typeof obj !== 'object') {
        return obj;
    }

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());

        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];

        for (let i = 0, len = obj.length; i < len; i += 1) {
            copy[i] = clone(obj[i]);
        }

        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};

        for (const attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = clone(obj[attr]);
            }
        }

        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}
