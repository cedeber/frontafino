import { assertArrayIncludes } from "https://deno.land/std@0.168.0/testing/asserts.ts";
import { deepDifference } from "../src/difference.ts";
import { deepClone } from "../src/clone.ts";

Deno.test("Difference with numbers", () => {
	const arr1 = [1, 2, 3];
	const arr2 = [2, 4];

	assertArrayIncludes(deepDifference(arr1, arr2), [1, 3, 4]);
	assertArrayIncludes(deepDifference(arr1, deepClone(arr1)), []);
	assertArrayIncludes(deepDifference(arr1, deepClone(arr1).reverse()), []);
	assertArrayIncludes(deepDifference(arr1, [2, 1, 3]), []);
});

Deno.test("Difference with strings", () => {
	const arr1 = ["foo", "bar"];
	const arr2 = ["bar", "baz", "foo"];

	assertArrayIncludes(deepDifference(arr1, arr2), ["baz"]);
	assertArrayIncludes(deepDifference(arr1, arr1.reverse()), []);
});

Deno.test("Difference with arrays", () => {
	const arr1 = [["foo", "bar"], 1, 2];
	const arr2 = [1, 2];

	assertArrayIncludes(deepDifference(arr1, arr2), [["foo", "bar"]]);
	assertArrayIncludes(deepDifference(arr1, [["foo", "bar"]]), [1, 2]);
	assertArrayIncludes(deepDifference(arr1, [2, ["foo"]]), [["foo", "bar"], 1, ["foo"]]);
	assertArrayIncludes(deepDifference([[["foo"], 1], "bar"], ["baz", [["foo"], 1]]), [
		"bar",
		"baz",
	]);
});
