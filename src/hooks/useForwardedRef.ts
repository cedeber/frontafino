import {
	ForwardedRef,
	MutableRefObject,
	RefObject,
	useEffect,
	useImperativeHandle,
	useRef,
} from "react";

// Make a difference between undefined (not set) and null (waiting for render)
// Need this difference for useHotKeys
export const useForwardedRef = <T extends Element>(
	ref?: MutableRefObject<T> | ForwardedRef<T>,
): MutableRefObject<T | null> | undefined => {
	const innerRef = useRef<T | null>(null);

	useEffect(() => {
		if (!ref) return;

		if (typeof ref === "function") {
			ref(innerRef.current);
		} else {
			innerRef.current = ref.current;
		}
	});

	return ref === undefined ? undefined : innerRef;
};

export function useDOMRef<T extends HTMLElement>(
	ref: RefObject<T> | ForwardedRef<T> | null,
): MutableRefObject<T | null> {
	type U = T | null;

	const domRef = useRef<T>(null);
	useImperativeHandle<U, U>(ref ?? undefined, () => domRef.current, [domRef]);
	return domRef;
}
