/**
 * Generated a random integer.
 * @param min (included)
 * @param max (included)
 */
const randomInt = (min = 0, max = 9): number => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Unsafe uid
 */
const uid = (): string => {
    return Math.random().toString(36).substr(2);
};

export { randomInt, uid };
