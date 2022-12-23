import { RefObject, useEffect, useRef, useState } from "react";

interface Rect extends Omit<DOMRect, "toJson"> {
	/** This is an Integer, use Math.round() with other values to compare. */
	scrollWidth: number;
	/** This is an Integer, use Math.round() with other values to compare. */
	scrollHeight: number;
	widthOverflow: boolean;
}

export const useResizeObserver = (ref: RefObject<Element>): Rect | undefined => {
	const [boxSize, setBoxSize] = useState<Rect>();

	const observer = useRef(
		new ResizeObserver((entries) => {
			for (const entry of entries) {
				// usually a single one as we pass a single ref
				// @see `contentBoxSize` for later
				setBoxSize({
					...(entry.contentRect.toJSON() as Omit<DOMRect, "toJson">),
					scrollWidth: entry.target.scrollWidth,
					scrollHeight: entry.target.scrollHeight,
					widthOverflow: entry.target.scrollWidth > Math.round(entry.contentRect.width),
				});
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
