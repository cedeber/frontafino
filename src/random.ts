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

/**
 * UUID v4
 * Use crypto.randomUUID() once available
 */
const uuidv4 = (): string => {
    const hex: string[] = [];

    for (let i = 0; i < 256; i++) {
        hex[i] = (i < 16 ? "0" : "") + i.toString(16);
    }

    function makeUUID() {
        const r = crypto.getRandomValues(new Uint8Array(16));

        r[6] = (r[6] & 0x0f) | 0x40;
        r[8] = (r[8] & 0x3f) | 0x80;

        return (
            hex[r[0]] +
            hex[r[1]] +
            hex[r[2]] +
            hex[r[3]] +
            "-" +
            hex[r[4]] +
            hex[r[5]] +
            "-" +
            hex[r[6]] +
            hex[r[7]] +
            "-" +
            hex[r[8]] +
            hex[r[9]] +
            "-" +
            hex[r[10]] +
            hex[r[11]] +
            hex[r[12]] +
            hex[r[13]] +
            hex[r[14]] +
            hex[r[15]]
        );
    }

    return makeUUID();
};

export { randomInt, uid, uuidv4 };
