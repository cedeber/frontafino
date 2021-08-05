const deepClone = <T>(obj: T): T => {
    // Handle the 3 simple types, and null or undefined
    if (obj == undefined || typeof obj !== "object") {
        return obj;
    }

    // Handle Set and Map
    // @see https://github.com/WebReflection/json-map for future update
    if (obj instanceof Set || obj instanceof Map) {
        throw new Error("Unable to clone! Its type is not supported.");
    }

    // Handle Date
    if (obj instanceof Date) {
        const copy = new Date();
        copy.setTime(obj.getTime());

        return copy as unknown as T;
    }

    // Handle Array
    if (obj instanceof Array) {
        const copy: unknown[] = [];

        for (let i = 0, len = obj.length; i < len; i += 1) {
            copy[i] = deepClone(obj[i]);
        }

        return copy as unknown as T;
    }

    // Handle Object
    if (obj instanceof Object) {
        const copy: Record<string, unknown> = {};

        for (const attr in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, attr)) {
                copy[attr] = deepClone(obj[attr]);
            }
        }

        return copy as unknown as T;
    }

    throw new Error("Unable to clone! Its type is not supported.");
};

export { deepClone };
