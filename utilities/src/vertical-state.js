/**
 * @name VerticalState
 * @typedef VerticalState
 * @type {object}
 * @property {number} topPosition
 * @property {number} topProgress
 * @property {number} bottomProgress
 * @property {boolean} ahead
 * @property {boolean} entering
 * @property {boolean} contained
 * @property {boolean} exiting
 * @property {boolean} behind
 */

/**
 * @param {number} [marginTop=0]
 * @param {number} [marginBottom=marginTop]
 * @returns {function(HTMLElement): VerticalState}
 */
export default function verticalState(marginTop = 0, marginBottom = marginTop) {
     /**
     * @param {HTMLElement} domElement
     * @param {HTMLElement|Window|null} [container=null]
     * @returns {VerticalState}
     */
    return function(domElement, container = window) {
        const wTop =
            container === window || container == null
                ? window.pageYOffset
                : container.scrollTop;
        const wHeight =
            container === window || container == null
                ? window.innerHeight
                : container.offsetHeight;
        const topPosition = getTopPosition(domElement);
        const topProgress = getTopProgress();
        const bottomProgress = getBottomProgress();

        return /** @type {VerticalState} */ {
            topPosition,
            topProgress,
            bottomProgress,
            ahead: topProgress < 0,
            entering: topProgress > 0 && topProgress < 1 && bottomProgress < 0,
            contained:
                (topProgress < 1 && bottomProgress > 0) ||
                (topProgress > 1 && bottomProgress < 0),
            exiting:
                topProgress > 1 && bottomProgress > 0 && bottomProgress < 1,
            behind: bottomProgress > 1,
        };

        /**
         * Position of the top border of the element depending on the viewport visibility
         * @returns {number} 0 => bottom of the viewport, 1 => top of the viewport
         */
        function getTopProgress() {
            return (
                1 -
                (topPosition - (wTop + marginTop)) /
                    (wHeight - marginTop - marginBottom)
            );
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
}

/**
 * Get top position of an element in the page
 * @param {HTMLElement} element
 * @param {Element|Window} [boundary=window]
 * @returns {number} The top position in pixels
 */
export function getTopPosition(element, boundary = window) {
    let top = element.offsetTop;

    while ((element = element.offsetParent) !== null && element !== boundary) {
        top += element.offsetTop;
    }

    return top;
}
