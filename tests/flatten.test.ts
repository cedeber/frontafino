import { assertArrayIncludes } from "https://deno.land/std@0.168.0/testing/asserts.ts";
import { flatten } from "../src/flatten.ts";

Deno.test("Flatten with Array", () => {
	assertArrayIncludes(flatten([1, 2, [3, 4, [5, 6]]]), [1, 2, 3, 4, 5, 6]);
	assertArrayIncludes(flatten([1, false, ["3", "4", [{ a: 1, b: 2 }]]]), [
		1,
		false,
		"3",
		"4",
		{ a: 1, b: 2 },
	]);
});

Deno.test("Flatten with Set", () => {
	const set = new Set();
	set.add(1);
	set.add([2, 3]);
	assertArrayIncludes(flatten(set), [1, 2, 3]);
});
