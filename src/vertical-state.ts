export interface VerticalState {
	topPosition: number;
	topProgress: number;
	bottomProgress: number;
	ahead: boolean;
	entering: boolean;
	inside: boolean;
	contained: boolean;
	exiting: boolean;
	behind: boolean;
}

const verticalState = (
	domElement: HTMLElement,
	container: HTMLElement | Window = window,
	marginTop = 0,
	marginBottom = marginTop,
): VerticalState => {
	const wTop = container === window ? window.scrollY : (container as HTMLElement).scrollTop;
	const wHeight =
		container === window ? window.innerHeight : (container as HTMLElement).offsetHeight;
	const topPosition = getTopPosition(domElement, container);
	const topProgress = getTopProgress();
	const bottomProgress = getBottomProgress();

	return {
		topPosition,
		topProgress,
		bottomProgress,
		ahead: topProgress < 0,
		entering: topProgress > 0 && topProgress < 1 && bottomProgress < 0,
		inside: topProgress > 0 && bottomProgress < 1,
		contained:
			(topProgress < 1 && bottomProgress > 0) || (topProgress > 1 && bottomProgress < 0),
		exiting: topProgress > 1 && bottomProgress > 0 && bottomProgress < 1,
		behind: bottomProgress > 1,
	};

	/**
	 * Position of the top border of the element depending on the viewport visibility
	 * @returns {number} 0 => bottom of the viewport, 1 => top of the viewport
	 */
	function getTopProgress() {
		return 1 - (topPosition - (wTop + marginTop)) / (wHeight - marginTop - marginBottom);
	}

	/**
	 * Position of the bottom border of the element depending on the viewport visibility
	 * @returns {number} 0 => bottom of the viewport, 1 => top of the viewport
	 */
	function getBottomProgress() {
		return (
			1 -
			(topPosition + domElement.offsetHeight - (wTop + marginTop)) /
				(wHeight - marginTop - marginBottom)
		);
	}
};

/**
 * Get top position of an element in the page
 * @returns {number} The top position in pixels
 */
const getTopPosition = (
	domElement: HTMLElement,
	boundary: HTMLElement | Window = window,
): number => {
	let element: HTMLElement | null = domElement;
	let top = element.offsetTop;

	// Or offsetParent
	while (
		(element = element.offsetParent as HTMLElement | null) !== null &&
		element !== boundary
	) {
		top += element.offsetTop;
	}

	return top;
};

export { verticalState, getTopPosition };
