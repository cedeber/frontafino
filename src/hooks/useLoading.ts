import { useEffect, useRef, useState } from "react";

function useVisuallyLoading(isLoading: boolean, debounceStart = 0, minimumTimeout = 1000): boolean {
	// fake loading for at least [minimumTimeout] ms
	const [isVisuallyLoading, setVisuallyLoading] = useState(false);
	const visuallyLoadingTimeoutRef = useRef(0);
	const timeoutStartRef = useRef<number>();

	useEffect(() => {
		// reset loading
		window.clearTimeout(visuallyLoadingTimeoutRef.current);

		if (isLoading) {
			// start the loading, debounced if set
			timeoutStartRef.current = Date.now();
			visuallyLoadingTimeoutRef.current = window.setTimeout(
				() => setVisuallyLoading(true),
				debounceStart,
			);
		} else if (isVisuallyLoading) {
			// stop the loading after the remaining time, if any
			const now = Date.now();
			const remainingTime = timeoutStartRef.current
				? Math.max(0, minimumTimeout - (now - timeoutStartRef.current))
				: 0;
			visuallyLoadingTimeoutRef.current = window.setTimeout(
				() => setVisuallyLoading(false),
				remainingTime,
			);
		}
	}, [isLoading]);

	return isVisuallyLoading;
}

const useLongLoading = (isLoading: boolean, delay = 1500, minimumTimeout = 700): boolean => {
	const [isLoadingForLong, setLoadingForLong] = useState(false);
	const loadingTimeoutRef = useRef<number>();

	useEffect(() => {
		if (!isLoading) {
			window.clearTimeout(loadingTimeoutRef.current);
			loadingTimeoutRef.current = undefined;
			setLoadingForLong(false);
		} else if (loadingTimeoutRef.current == undefined) {
			loadingTimeoutRef.current = window.setTimeout(() => setLoadingForLong(true), delay);
		}
	}, [isLoading]);

	return useVisuallyLoading(isLoadingForLong, 0, minimumTimeout);
};

export { useVisuallyLoading, useLongLoading };
