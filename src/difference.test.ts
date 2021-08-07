import { deepDifference } from "./difference";
import { deepClone } from "./clone";

describe("difference", () => {
    it("With numbers", () => {
        const arr1 = [1, 2, 3];
        const arr2 = [2, 4];

        expect(deepDifference(arr1, arr2)).toStrictEqual([1, 3, 4]);
        expect(deepDifference(arr1, deepClone(arr1))).toStrictEqual([]);
        expect(deepDifference(arr1, deepClone(arr1).reverse())).toStrictEqual([]);
        expect(deepDifference(arr1, [2, 1, 3])).toStrictEqual([]);
    });
    it("With strings", () => {
        const arr1 = ["foo", "bar"];
        const arr2 = ["bar", "baz", "foo"];

        expect(deepDifference(arr1, arr2)).toStrictEqual(["baz"]);
        expect(deepDifference(arr1, arr1.reverse())).toStrictEqual([]);
    });
    it("With arrays", () => {
        const arr1 = [["foo", "bar"], 1, 2];
        const arr2 = [1, 2];

        expect(deepDifference(arr1, arr2)).toStrictEqual([["foo", "bar"]]);
        expect(deepDifference(arr1, [["foo", "bar"]])).toStrictEqual([1, 2]);
        expect(deepDifference(arr1, [2, ["foo"]])).toStrictEqual([["foo", "bar"], 1, ["foo"]]);
        expect(deepDifference([[["foo"], 1], "bar"], ["baz", [["foo"], 1]])).toStrictEqual([
            "bar",
            "baz",
        ]);
    });
});
