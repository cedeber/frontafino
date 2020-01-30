/**
 * @returns {Promise<*>}
 */
export async function pageLoaded() {
    return new Promise(resolve => {
        if (document.readyState === 'complete') {
            resolve();
        } else {
            window.addEventListener('load', () => {
                resolve();
            });
        }
    });
}

/**
 * Throttle a function
 * @param {Function} func
 * @param {number} delay
 * @returns {function(...*)}
 */
export function throttle(func, delay) {
    let start = performance.now();

    /**
     * @param {...*} args
     * @returns {*}
     */
    return function(...args) {
        if (performance.now() - start > delay) {
            start = performance.now();

            return func.call(this, ...args);
        }
    };
}

/**
 * Debounce a function
 * @param {Function} func
 * @param {number} delay
 * @returns {function(...*)}
 */
export function debounce(func, delay) {
    /** @type {number} */
    let timer;

    /**
     * @param {...*} args
     */
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(func.bind(this, ...args), delay);
    };
}

/**
 * Normalization
 * @param {number} v - Initial value
 * @param {number} vmin - Initial minimum
 * @param {number} vmax - Initial maximun
 * @param {number} tmin - Transformed minimun
 * @param {number} tmax - Transformed maximum
 * @returns {number} - Transformed value
 * @example normalize(0.5, -1, 1, 10, 20); // 17.5
 */
export function normalize(v, vmin, vmax, tmin, tmax) {
    const NV = Math.max(Math.min(v, vmax), vmin);
    const DV = vmax - vmin;
    const PC = (NV - vmin) / DV;
    const DT = tmax - tmin;

    return tmin + PC * DT;
}

/**
 * Generate an unique ID
 * @return {string}
 */
export function uid() {
    return Math.random()
        .toString(36)
        .substr(2, 9);
}

/**
 * Flatten an Array or a Set
 * @param {*[]|Set<*>} [arr=[]] An array may hide other arrays
 * @returns {*[]}
 */
export function flatten(arr = []) {
    let list = [];

    for (let v of arr) {
        list = list.concat(
            v instanceof Array || v instanceof Set ? flatten(v) : v,
        );
    }

    return list;
}

/**
 * Get language sets in browser
 * @param {string[]} [locales=["en"]] Default first
 * @returns {string}
 */
export function locale(locales = ['en']) {
    const locale =
        navigator.language.indexOf('-') === -1
            ? navigator.language
            : navigator.language.split('-')[0];

    return locales.indexOf(locale) === -1 ? locales[0] : locale;
}

/**
 * Serialize a Form
 * @param {HTMLFormElement} form
 * @returns {*}
 */
export function serialize(form) {
    const inputs = form.querySelectorAll('input, textarea');
    const fields = {};

    for (const input of inputs) {
        if (
            input.name &&
            !input.disabled &&
            input.type !== 'file' &&
            input.type !== 'reset' &&
            input.type !== 'submit' &&
            input.type !== 'button'
        ) {
            if (
                (input.type !== 'checkbox' && input.type !== 'radio') ||
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
 * @param {number} [min=0] - Minimum value
 * @param {number} [max=1] - Maximum value
 * @returns {number} - float between min and max
 */
export function random(min = 0, max = 1) {
    return Math.random() * (max - min) + min;
}

/**
 * Transform a random function to returns integers
 * @param {function(number, number, *[]): number} fn
 * @returns {function(number, number, ...[*]): number}
 */
export function randomtoInteger(fn) {
    /**
     * @param {number} [min=0] Minimum value
     * @param {number} [max=1] Maximum value
     * @param {*[]} values Other parameters
     * @returns {number} Random integer
     */
    return function(min = 0, max = 1, ...values) {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(fn(min, max, values));
    };
}

/**
 * Returns shorten text
 * @param {number} [wordsNumber=15]
 * @param {string} [endChars="…"]
 * @param {string} [splitter=" "]
 * @returns {function(string): string}
 */
export function shorten(wordsNumber = 15, endChars = '…', splitter = ' ') {
    /**
     * @param {string} text
     * @returns {string}
     */
    return function(text) {
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
 * @param {string} path
 * @returns {string}
 */
export function extension(path) {
    return path.slice(((path.lastIndexOf('.') - 1) >>> 0) + 2);
}

/**
 * Deep clone
 * @param obj {*}
 * @return {*}
 */
export function deepClone(obj) {
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
