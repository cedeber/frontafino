import { assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts";
import { computed, effect, signal } from "../src/signals.ts";

Deno.test("initial signal", () => {
	const single = signal(1);
	assertEquals(single.value, 1);
});

Deno.test("change signal", () => {
	const single = signal(1);
	++single.value;
	assertEquals(single.value, 2);
});

Deno.test("effect", () => {
	let value = 0;
	const single = signal(1);
	effect(() => {
		value = single.value;
	});
	++single.value;
	assertEquals(value, 2);
});

Deno.test("computed", () => {
	const single = signal(1);
	const double = signal(10);
	const triple = signal(100);

	const sum = computed(() => single.value + double.value + triple.value);

	assertEquals(sum.value, 111);
});

Deno.test("computed + effect", () => {
	const single = signal(1);
	const double = signal(10);
	const triple = signal(100);

	const sum = computed(() => single.value + double.value + triple.value);
	++single.value;

	assertEquals(sum.value, 112);
});
