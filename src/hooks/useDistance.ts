import { ForwardedRef, MutableRefObject, useEffect, useState } from "react";
import { useForwardedRef } from "./useForwardedRef.js";
import { throttle } from "../debounce-throttle.js";

interface Position {
    x: number;
    y: number;
}

interface Box extends Position {
    width: number;
    height: number;
}

const isCollide = (a: Box, b: Box): boolean =>
    !(a.y + a.height < b.y || a.y > b.y + b.height || a.x + a.width < b.x || a.x > b.x + b.width);

const getDistance = (a: Position, b: Position): number => {
    // Calculate the distance using the Pythagorean Theorem (a^2 + b^2 = c^2)
    const distanceSquared = Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2);
    return Math.sqrt(distanceSquared);
};

const getBoxDistance = (a: Box, b: Position) => {
    if (!a || !b) return;

    // Both boxes collide
    if (isCollide(a, { x: b.x, y: b.y, width: 1, height: 1 })) return 0;

    // Aligned horizontally
    if (b.y >= a.y && b.y <= a.y + a.height) {
        const right = Math.abs(a.x + a.width - b.x);
        const left = Math.abs(a.x - b.x);
        return Math.min(right, left);
    }

    // Aligned vertically
    if (b.x >= a.x && b.x <= a.x + a.width) {
        const top = Math.abs(a.y - b.y);
        const bottom = Math.abs(a.y + a.height - b.y);
        return Math.min(top, bottom);
    }

    // Distances from the corners
    const topLeft = getDistance({ x: a.x, y: a.y }, b);
    const topRight = getDistance({ x: a.x + a.width, y: a.y }, b);
    const bottomRight = getDistance({ x: a.x + a.width, y: a.y + a.height }, b);
    const bottomLeft = getDistance({ x: a.x, y: a.y + a.height }, b);

    return Math.min(topLeft, topRight, bottomRight, bottomLeft);
};

const useDistance = (
    ref?: MutableRefObject<Element> | ForwardedRef<Element>,
): number | undefined => {
    const [distance, setDistance] = useState<number>();
    const elRef = useForwardedRef(ref);

    useEffect(() => {
        const ref = elRef?.current;
        if (!ref) return;

        const listener = throttle((event: PointerEvent) => {
            // We get it on every event because box may move between events
            const elBox: Box = ref.getBoundingClientRect();
            setDistance(getBoxDistance(elBox, event));
        }, 85); // every 5 frames

        window.addEventListener("pointermove", listener);
        return () => window.removeEventListener("pointermove", listener);
    }, [elRef]);

    return distance;
};

export { useDistance };
