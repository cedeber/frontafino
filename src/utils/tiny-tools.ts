export async function pageLoaded(): Promise<void> {
    return new Promise(resolve => {
        if (document.readyState === "complete") {
            resolve();
        } else {
            window.addEventListener("load", () => {
                resolve();
            });
        }
    });
}

export function throttle(func: Function, delay: number): (...args: any) => any {
    let start = performance.now();

    return function(this: any, ...args) {
        if (performance.now() - start > delay) {
            start = performance.now();

            return func.call(this, ...args);
        }
    };
}

export function debounce(func: Function, delay: number): (...args: any) => void {
    let timer: number;

    return function(this: any, ...args) {
        window.clearTimeout(timer);
        timer = window.setTimeout(func.bind(this, ...args), delay);
    };
}

/**
 * Normalization
 * @param v Initial value
 * @param vmin Initial minimum
 * @param vmax Initial maximun
 * @param tmin Transformed minimun
 * @param tmax Transformed maximum
 * @returns Transformed value
 * @example normalize(0.5, -1, 1, 10, 20); // 17.5
 */
export function normalize(v: number, vmin: number, vmax: number, tmin: number, tmax: number): number {
    const NV = Math.max(Math.min(v, vmax), vmin);
    const DV = vmax - vmin;
    const PC = (NV - vmin) / DV;
    const DT = tmax - tmin;

    return tmin + PC * DT;
}

export function uid(): string {
    return Math.random()
        .toString(36)
        .substr(2, 9);
}

/**
 * Flatten an Array or a Set
 * @param [arr=[]] An array may hide other arrays
 */
export function flatten(arr: any[] | Set<any> = []): any[] {
    let list: any[] = [];

    for (let v of arr) {
        list = list.concat(v instanceof Array || v instanceof Set ? flatten(v) : v);
    }

    return list;
}

/**
 * Get language sets in browser
 * @param [locales=["en"]] Default first
 */
export function locale(locales = ["en"]): string {
    const locale = navigator.language.indexOf("-") === -1 ? navigator.language : navigator.language.split("-")[0];

    return locales.indexOf(locale) === -1 ? locales[0] : locale;
}

/**
 * Serialize a Form
 */
export function serialize(form: HTMLFormElement): {} {
    const inputs: NodeListOf<HTMLInputElement | HTMLTextAreaElement> = form.querySelectorAll("input, textarea");
    const fields: { [key: string]: any } = {};

    // @ts-ignore
    for (const input of inputs) {
        if (
            input.name &&
            !input.disabled &&
            input.type !== "file" &&
            input.type !== "reset" &&
            input.type !== "submit" &&
            input.type !== "button"
        ) {
            if (
                (input.type !== "checkbox" && input.type !== "radio") ||
                (input instanceof HTMLInputElement && input.checked)
            ) {
                fields[input.name] = input.value;
            }
        }
    }

    return fields;
}

/**
 * Random a number between min and max
 * @param [min=0] Minimum value
 * @param [max=1] Maximum value
 * @returns Float between min and max
 */
export function random(min = 0, max = 1): number {
    return Math.random() * (max - min) + min;
}

/**
 * Transform a random function to returns integers
 */
export function randomtoInteger(
    fn: (arg0: number, arg1: number, ...args: any) => number,
): (arg0: number, arg1: number, ...args: any) => number {
    /**
     * @param [min=0] Minimum value
     * @param [max=1] Maximum value
     * @param values Other parameters
     * @returns Random integer
     */
    return function(min = 0, max = 1, ...values: any): number {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(fn(min, max, ...values));
    };
}

/**
 * Returns shorten text
 */
export function shorten(wordsNumber = 15, endChars = "…", splitter = " "): (arg0: string) => string {
    return function(text: string): string {
        const textArray = text.split(splitter, wordsNumber);

        textArray.map(word => word.trim());

        if (endChars && endChars.length > 0 && textArray.length > wordsNumber) {
            textArray.push(endChars);
        }

        return textArray.join(splitter);
    };
}

/**
 * Get the extension of the path
 */
export function extension(path: string): string {
    return path.slice(((path.lastIndexOf(".") - 1) >>> 0) + 2);
}

/**
 * Deep clone
 */
export function deepClone(obj: any): {} {
    let copy: { [key: string]: any };

    // Handle the 3 simple types, and null or undefined
    if (obj == undefined || typeof obj !== "object") {
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
            copy[i] = deepClone(obj[i]);
        }

        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};

        for (const attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = deepClone(obj[attr]);
            }
        }

        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}
