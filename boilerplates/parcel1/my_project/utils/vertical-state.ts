interface VerticalState {
    topPosition: number;
    topProgress: number;
    bottomProgress: number;
    ahead: boolean;
    entering: boolean;
    contained: boolean;
    exiting: boolean;
    behind: boolean;
}

export default function verticalState(
    marginTop = 0,
    marginBottom = marginTop,
): (arg0: HTMLElement, arg1: HTMLElement | Window | null) => VerticalState {
    return function(domElement: HTMLElement, container: HTMLElement | Window | null = window): VerticalState {
        const wTop = container === window || container == null ? window.pageYOffset : (container as HTMLElement).scrollTop;
        const wHeight = container === window || container == null ? window.innerHeight : (container as HTMLElement).offsetHeight;
        const topPosition = getTopPosition(domElement);
        const topProgress = getTopProgress();
        const bottomProgress = getBottomProgress();

        return {
            topPosition,
            topProgress,
            bottomProgress,
            ahead: topProgress < 0,
            entering: topProgress > 0 && topProgress < 1 && bottomProgress < 0,
            contained: (topProgress < 1 && bottomProgress > 0) || (topProgress > 1 && bottomProgress < 0),
            exiting: topProgress > 1 && bottomProgress > 0 && bottomProgress < 1,
            behind: bottomProgress > 1,
        };

        /**
         * Position of the top border of the element depending on the viewport visibility
         * @returns 0 => bottom of the viewport, 1 => top of the viewport
         */
        function getTopProgress(): number {
            return 1 - (topPosition - (wTop + marginTop)) / (wHeight - marginTop - marginBottom);
        }

        /**
         * Position of the bottom border of the element depending on the viewport visibility
         * @returns {number} 0 => bottom of the viewport, 1 => top of the viewport
         */
        function getBottomProgress() {
            return (
                1 - (topPosition + domElement.offsetHeight - (wTop + marginTop)) / (wHeight - marginTop - marginBottom)
            );
        }
    };
}

/**
 * Get top position of an element in the page
 * @returns The top position in pixels
 */
export function getTopPosition(element: HTMLElement, boundary: HTMLElement | Window = window): number {
    let currentElement: HTMLElement | null = element;
    let top = currentElement.offsetTop;

    while (
        (currentElement = currentElement.offsetParent as HTMLElement | null) !== null &&
        currentElement !== boundary
    ) {
        top += currentElement.offsetTop;
    }

    return top;
}
