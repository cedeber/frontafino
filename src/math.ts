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

export { normalize };
