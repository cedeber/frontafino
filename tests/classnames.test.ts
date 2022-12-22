import { assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts";
import { classNames } from "../src/classnames.ts";

Deno.test("classNames with string", () => {
	assertEquals(classNames("foo"), "foo");
	assertEquals(classNames("foo", "bar"), "foo bar");
});

Deno.test("classNames with number", () => {
	assertEquals(classNames(12), "12");
	assertEquals(classNames(12, 34), "12 34");
});

Deno.test("classNames with object", () => {
	assertEquals(classNames({ foo: true }), "foo");
	assertEquals(classNames({ bar: false }), "");
	assertEquals(classNames({ foo: true, bar: false }), "foo");
	// @ts-ignore Test truthy/falsy values
	assertEquals(classNames({ bar: 0 }), "");
	// @ts-ignore Test truthy/falsy values
	assertEquals(classNames({ bar: "" }), "");
	// @ts-ignore Test truthy/falsy values
	assertEquals(classNames({ foo: "bar" }), "foo");
});

Deno.test("classNames with array", () => {
	assertEquals(classNames(["foo", "bar"], "baz"), "foo bar baz");
	assertEquals(classNames(["foo", "bar"], ["baz"]), "foo bar baz");
});

Deno.test("classNames with all", () => {
	assertEquals(classNames(["foo", 12], [{ baz: true }, "foobar"]), "foo 12 baz foobar");
});

Deno.test("classNames with more falsy values", () => {
	// @ts-ignore Test truthy/falsy values
	assertEquals(classNames(0, false, ""), "");
});
