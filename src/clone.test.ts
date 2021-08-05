import { deepClone } from "./clone";

describe("deepClone", () => {
    it("Cloning undefined or null", () => {
        const cloneUndefined = deepClone(undefined);
        const cloneNull = deepClone(null);
        expect(cloneUndefined).toBe(undefined);
        expect(cloneNull).toBe(null);
    });
    it("Cloning a Set or a Map", () => {
        expect(() => deepClone(new Set())).toThrow();
        expect(() => deepClone(new Map())).toThrow();
    });
    it("Cloning a number", () => {
        const obj = 5;
        const clone = deepClone(obj);
        expect(obj).toBe(clone);
        expect(clone).toBe(5);
    });
    it("Cloning a string", () => {
        const obj = "foo bar";
        const clone = deepClone(obj);
        expect(obj).toBe(clone);
        expect(clone).toBe("foo bar");
    });
    it("Cloning a Date", () => {
        const obj = new Date("January 5, 2020, 13:37:00 UTC");
        const clone = deepClone(obj);
        expect(obj).not.toBe(clone);
        expect(clone).toBeInstanceOf(Date);
        expect(obj.getUTCDay()).toBe(clone.getUTCDay());
    });
    describe("Cloning an object", () => {
        const array = [1, 2, { x: 7 }];
        const obj = { a: 1, b: 2, c: array };
        const clone = deepClone(obj);

        it("should be a different instance", () => {
            expect(obj).not.toBe(clone);
        });

        it("should have the same values", () => {
            expect(obj.a).toBe(clone.a);
            expect(clone.c).toBeInstanceOf(Array);
            expect(clone.c.length).toBe(array.length);
            expect(clone.c[2]).not.toBe(array[2]);
        });
    });
    describe("Cloning an array", () => {
        const obj = [1, 2, { a: 1, b: [3, { x: 7 }] }];
        const clone = deepClone(obj);

        it("should be a different instance", () => {
            expect(obj).not.toBe(clone);
        });

        it("should have the same values", () => {
            expect(obj[0]).toBe(clone[0]);
            expect(clone[2].b[1].x).toBe(7);
        });
    });
});
