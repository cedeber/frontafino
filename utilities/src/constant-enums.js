/**
 * Simulate an Enum data type
 * @param {Object} values
 * @returns {Proxy}
 */
export default function Enum(values) {
    const handler = {
        set() {
            throw new TypeError('Enum is read only');
        },
        get(obj, prop) {
            if (!(prop in obj)) {
                throw new ReferenceError(`Unknown enum key "${String(prop)}"`);
            }

            return Reflect.get(obj, prop);
        },
        deleteProperty() {
            throw new TypeError('Enum is read only');
        },
    };

    return new Proxy(transformToObject(values), handler);
}

/**
 * Convert the Enum to have Symbols as values
 * @param {function(Object): Proxy} fn
 * @returns {function(Object): Proxy}
 */
export function toSymbol(fn) {
    return function(values) {
        const convertedValues = transformToSymbol(transformToObject(values));

        return fn(convertedValues);
    };
}

/**
 * Convert the Enum to accept a list of String
 * @param {function(Object): Proxy} fn
 * @returns {function(Object): Proxy}
 */
export function asList(fn) {
    return function(...values) {
        return fn(values);
    };
}

/**
 * Convert the values of an object to Symbols
 * @param {Object} obj
 * @returns {Object}
 */
function transformToSymbol(obj) {
    let newObj = Object.create(null);

    for (let k of Object.keys(obj)) {
        newObj[k] = Symbol(String(obj[k]));
    }

    return newObj;
}

/**
 * Check and transforn if needed an Array into Object
 * @param {Array<string>|Object} data
 * @returns {Object}
 */
function transformToObject(data) {
    const newObj = Object.create(null);

    if (Array.isArray(data)) {
        for (const value of data) {
            if (typeof value !== 'string') {
                throw new TypeError(`Value "${value}" must be a String`);
            }

            newObj[String(value)] = value;
        }
    } else if (typeof data === 'object') {
        Object.assign(newObj, data);
    }

    return newObj;
}
