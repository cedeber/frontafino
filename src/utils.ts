/**
 * Generate an unique ID
 */
export function uid(): string {
    return Math.random()
        .toString(36)
        .substr(2, 9);
}
