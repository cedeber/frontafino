import { ForwardedRef, MutableRefObject, useEffect, useRef } from "react";

// Make a difference between undefined (not set) and null (waiting for render)
// Need this difference for useHotKeys
const useForwardedRef = (
    ref?: MutableRefObject<Element> | ForwardedRef<Element>,
): MutableRefObject<Element | null> | undefined => {
    const innerRef = useRef<Element | null>(null);

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

export { useForwardedRef };
