import { flatten } from "../src/flatten";

describe("flatten", () => {
    it("With Array", () => {
        expect(flatten([1, 2, [3, 4, [5, 6]]])).toStrictEqual([1, 2, 3, 4, 5, 6]);
        expect(flatten([1, false, ["3", "4", [{ a: 1, b: 2 }]]])).toStrictEqual([
            1,
            false,
            "3",
            "4",
            { a: 1, b: 2 },
        ]);
    });
    it("With Set", () => {
        const set = new Set();
        set.add(1);
        set.add([2, 3]);
        expect(flatten(set)).toStrictEqual([1, 2, 3]);
    });
});
