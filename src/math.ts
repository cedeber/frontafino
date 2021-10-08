/**
 * Normalization
 * @param v Initial value
 * @param vmin Initial minimum
 * @param vmax Initial maximun
 * @param tmin Transformed minimun
 * @param tmax Transformed maximum
 * @return Transformed value
 * @example normalize(0.5, -1, 1, 10, 20); // 17.5
 */
const normalize = (v: number, vmin: number, vmax: number, tmin: number, tmax: number): number => {
    const NV = Math.max(Math.min(v, vmax), vmin);
    const DV = vmax - vmin;
    const PC = (NV - vmin) / DV;
    const DT = tmax - tmin;
    return tmin + PC * DT;
};

/**
 * Random a number between min and max
 * @param [min=0] - Minimum value
 * @param [max=1] - Maximum value
 * @returns float between min and max
 */
const random = (min = 0, max = 1): number => {
    const mn = Math.min(min, max);
    const mx = Math.max(min, max);

    return Math.random() * (mx - mn) + mn;
};

/**
 * Transform a random function to returns integers
 */
const randomToInteger = (fn: typeof random) => {
    return (min = 0, max = 1, inclusive = false): number => {
        const mn = Math.ceil(Math.min(min, max));
        const mx = Math.floor(Math.max(min, max));

        return Math.floor(fn(mn, mx + (inclusive ? 1 : 0)));
    };
};

/**
 * Generated a random integer. Max excluded.
 * @param min (included)
 * @param max (excluded)
 */
const randomIntExcl = (min = 0, max = 9): number => randomToInteger(random)(min, max, false);

/**
 * Generated a random integer. Max included.
 * @param min (included)
 * @param max (included)
 */
const randomIntIncl = (min = 0, max = 9): number => randomToInteger(random)(min, max, true);

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

export { normalize, random, randomIntIncl, randomIntExcl, uid, uuidv4 };
