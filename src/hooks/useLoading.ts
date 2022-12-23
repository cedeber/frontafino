import { useEffect, useRef, useState } from "react";

export function useVisuallyLoading(
	isLoading: boolean,
	debounceStart = 0,
	minimumTimeout = 1000,
): boolean {
	// fake loading for at least [minimumTimeout] ms
	const [isVisuallyLoading, setVisuallyLoading] = useState(false);
	const visuallyLoadingTimeoutRef = useRef(0);
	const timeoutStartRef = useRef<number>();

	useEffect(() => {
		// reset loading
		self.window.clearTimeout(visuallyLoadingTimeoutRef.current);

		if (isLoading) {
			// start the loading, debounced if set
			timeoutStartRef.current = Date.now();
			visuallyLoadingTimeoutRef.current = self.window.setTimeout(
				() => setVisuallyLoading(true),
				debounceStart,
			);
		} else if (isVisuallyLoading) {
			// stop the loading after the remaining time, if any
			const now = Date.now();
			const remainingTime = timeoutStartRef.current
				? Math.max(0, minimumTimeout - (now - timeoutStartRef.current))
				: 0;
			visuallyLoadingTimeoutRef.current = self.window.setTimeout(
				() => setVisuallyLoading(false),
				remainingTime,
			);
		}
	}, [isLoading]);

	return isVisuallyLoading;
}

export const useLongLoading = (isLoading: boolean, delay = 1500, minimumTimeout = 700): boolean => {
	const [isLoadingForLong, setLoadingForLong] = useState(false);
	const loadingTimeoutRef = useRef<number>();

	useEffect(() => {
		if (!isLoading) {
			self.window.clearTimeout(loadingTimeoutRef.current);
			loadingTimeoutRef.current = undefined;
			setLoadingForLong(false);
		} else if (loadingTimeoutRef.current == undefined) {
			loadingTimeoutRef.current = self.window.setTimeout(
				() => setLoadingForLong(true),
				delay,
			);
		}
	}, [isLoading]);

	return useVisuallyLoading(isLoadingForLong, 0, minimumTimeout);
};
