import { dropRepeats, flatten, join, map, split, trim } from "ramda";

type Obj = { [name: string]: boolean };
type T = string | number | { [key: string]: boolean };

const classNames = (...args: Array<T | T[] | undefined | null>): string => {
	let classes: string[] = [];

	for (const arg of args) {
		// Keep it falsy for undefined, null, empty string...
		if (!arg) continue;

		if (typeof arg === "string" || typeof arg === "number") {
			// TODO split spaces for duplicates?
			classes.push(String(arg));
		} else if (Array.isArray(arg) && arg.length) {
			const inner = classNames(...arg);
			// Extract again as array to drop duplicates at the end.
			if (inner) classes = flatten([classes, split(" ", inner)]);
		} else if (typeof arg === "object") {
			for (const key in arg) {
				if (Reflect.has(arg, key) && (arg as Obj)[key]) {
					classes.push(key);
				}
			}
		}
	}

	return join(" ", dropRepeats(map(trim, classes)));
};

export { classNames };
