import { RefObject, useEffect, useRef, useState } from "react";

const useResizeObserver = (ref: RefObject<Element>): DOMRect | undefined => {
    const [boxSize, setBoxSize] = useState<DOMRect>();

    const observer = useRef(
        new ResizeObserver((entries) => {
            for (const entry of entries) {
                // usually a single one as we pass a single ref
                // @see `contentBoxSize` for later
                setBoxSize(entry.contentRect);
            }
        }),
    );

    useEffect(() => {
        const currentObserver = observer.current;
        const element = ref.current;

        if (!element) return;
        currentObserver.observe(element);

        return () => {
            // if ref changes, don't listen to the previous ref
            currentObserver.unobserve(element);
        };
    }, [ref]);

    useEffect(
        () => () => {
            // kill the observer instance on unmount;
            observer.current?.disconnect();
        },
        [],
    );

    return boxSize;
};

export { useResizeObserver };
