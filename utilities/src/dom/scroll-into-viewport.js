let scrollIntoViewportAnimationId = 0;

/**
 * like element.scrollIntoView({block: "top", behavior: "smooth"});
 * @param {number} [topMargin=0] Top margin decal in pixel
 * @param {number} [speed=35] Average pixel per frame (~ 60fps)
 * @param {Function} easingFunction
 * @returns {Function} the callback if any
 */
export default function scrollIntoViewport(
    topMargin = 0,
    speed = 35,
    easingFunction = (time, duration) => easeOutCubic(time, 0, 1, duration),
) {
    /**
     * @param {HTMLElement} element
     * @returns {Promise<boolean>} true: scrolled; false: already at destination
     */
    return async function(element) {
        const goTo = getTopPosition(element) - topMargin;

        return scrollTo(goTo);
    };

    /**
     * @param {number} goTo
     * @returns {Promise<boolean>}
     */
    async function scrollTo(goTo) {
        return new Promise(resolve => {
            const startTime = Date.now();
            const scrollOffset = window.pageYOffset; // or pageYOffset=scrollY
            const pageHeight = Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight,
            );
            const windowHeight = window.innerHeight;
            let delta = goTo - scrollOffset;
            const duration = Math.abs(delta / (speed * 60) * 1000);
            let toGo = scrollOffset;
            const easing = time => easingFunction(time, duration);

            // limit to not scroll more than the page can scroll
            // if the target position is low in the page
            const next = pageHeight - goTo;

            if (next < windowHeight) {
                delta = delta - (windowHeight - next);
            }

            window.cancelAnimationFrame(scrollIntoViewportAnimationId);

            if (delta !== 0) {
                scrollIntoViewportAnimationId = window.requestAnimationFrame(
                    step,
                );

                return;
            }

            // already at destination
            return resolve(false);

            /**
             * Scroll to the element
             * @returns {*}
             */
            function step() {
                // FIXME :: doesn't work well on mobile
                /*
                const whereAmI = window.pageYOffset;

                if (toGo < whereAmI - 1 || toGo > whereAmI + 1) {
                    // Scroll animation cancelled
                    // for high definition screens, some browsers doesn't return a integer if
                    // the screen's pixel's definition is not an integer.
                    return reject();
                }
                */

                const delay = Date.now() - startTime;
                const easingVariation = easing(delay);

                toGo =
                    easingVariation > 1
                        ? goTo // if scroll too much
                        : Math.ceil(delta * easingVariation + scrollOffset);

                // Still need to scroll
                if (easingVariation < 1 && toGo !== goTo) {
                    window.scrollTo(0, toGo); // or scroll()
                    scrollIntoViewportAnimationId = window.requestAnimationFrame(
                        step,
                    );

                    return;
                }

                // Scroll done, perfectly placed
                window.scrollTo(0, goTo);

                return resolve(true);
            }
        });
    }
}

/**
 * Get top position of an element in the page
 * @param {HTMLElement} element
 * @param {Element|Window} [boundary=window]
 * @returns {number} The top position in pixels
 */
export function getTopPosition(
    element,
    boundary = window,
) {
    let top = element.offsetTop;

    while (
        (element = element.offsetParent) !== null &&
        element !== boundary
    ) {
        top += element.offsetTop;
    }

    return top;
}

/**
 * Default easing function. You could also use bezier like https://github.com/gre/bezier-easing
 * @param {number} time
 * @param {number} begin
 * @param {number} change
 * @param {number} duration
 * @return {number}
 */
function easeOutCubic(time, begin, change, duration) {
    return change * ((time = time / duration - 1) * time * time + 1) + begin;
}
