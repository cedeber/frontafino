import { assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts";
import { normalize } from "../src/math.ts";

Deno.test("normalize", () => {
	assertEquals(normalize(0.5, -1, 1, 10, 20), 17.5);
});
