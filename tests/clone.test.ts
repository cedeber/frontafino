import {
	assertArrayIncludes,
	assertEquals,
	assertInstanceOf,
	assertNotStrictEquals,
	assertObjectMatch,
	assertThrows,
} from "https://deno.land/std@0.168.0/testing/asserts.ts";
import { deepClone } from "../src/clone.ts";

Deno.test("Cloning undefined or null", () => {
	const cloneUndefined = deepClone(undefined);
	const cloneNull = deepClone(null);
	assertEquals(cloneUndefined, undefined);
	assertEquals(cloneNull, null);
});

Deno.test("Cloning a Set or a Map", () => {
	assertThrows(() => deepClone(new Set()));
	assertThrows(() => deepClone(new Map()));
});

Deno.test("Cloning a number", () => {
	const obj = 5;
	const clone = deepClone(obj);
	assertEquals(obj, clone);
	assertEquals(clone, 5);
});

Deno.test("Cloning a string", () => {
	const obj = "foo bar";
	const clone = deepClone(obj);
	assertEquals(obj, clone);
	assertEquals(clone, "foo bar");
});

Deno.test("Cloning a Date", () => {
	const obj = new Date("January 5, 2020, 13:37:00 UTC");
	const clone = deepClone(obj);
	assertNotStrictEquals(obj, clone);
	assertInstanceOf(clone, Date);
	assertEquals(obj.getUTCDay(), clone.getUTCDay());
});

Deno.test("Cloning an object should be a different instance", () => {
	const array = [1, 2, { x: 7 }];
	const obj = { a: 1, b: 2, c: array };
	const clone = deepClone(obj);
	assertObjectMatch(obj, clone);
	assertNotStrictEquals(obj, clone);
});

Deno.test("Cloning an object should have the same values", () => {
	const array = [1, 2, { x: 7 }];
	const obj = { a: 1, b: 2, c: array };
	const clone = deepClone(obj);
	assertObjectMatch(obj, clone);
	assertEquals(obj.a, clone.a);
	assertInstanceOf(clone.c, Array);
	assertEquals(clone.c.length, array.length);
	assertNotStrictEquals(clone.c[2], array[2]);
});

Deno.test("Cloning an array should be a different instance", () => {
	const obj = [1, 2, { a: 1, b: [3, { x: 7 }] }];
	const clone = deepClone(obj);
	assertNotStrictEquals(obj, clone);
});

Deno.test("Cloning an array should have the same values", () => {
	const obj = [1, 2, { a: 1, b: [3, { x: 7 }] }];
	const clone = deepClone(obj);
	assertArrayIncludes(obj, clone);
	assertEquals(obj[0], clone[0]);
	// @ts-ignore
	assertEquals(clone[2].b[1].x, 7);
});
