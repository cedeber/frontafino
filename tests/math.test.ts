import { normalize, random } from "../src/math";

it("normalize", () => {
    expect(normalize(0.5, -1, 1, 10, 20)).toBe(17.5);
});

describe("random", () => {
    it("default", () => {
        const value = random();
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThan(1);
    });

    it("contained", () => {
        const value = random(3, 3.1);
        expect(value).toBeGreaterThanOrEqual(3);
        expect(value).toBeLessThan(3.1);
    });

    it("same", () => {
        const value = random(3, 3);
        expect(value).toBe(3);
    });

    it("inverted", () => {
        const value = random(3, -3);
        expect(value).toBeGreaterThanOrEqual(-3);
        expect(value).toBeLessThan(3);
    });
});
