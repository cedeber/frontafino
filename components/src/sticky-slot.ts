import verticalState from "../../utilities/src/vertical-state.js";
import { pageLoaded } from '../../utilities/src/tiny-tools.js';

export default class Sticky extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    isSticky = false;
    marginTop = parseInt(this.dataset.marginTop || "0", 10);
    margins = [0, 0];
    vState = verticalState(this.marginTop);
    slotElement!: HTMLSlotElement;
    firstElement!: HTMLElement;

    constructor() {
        super();

        const parser = new DOMParser();
        const doc = parser.parseFromString(
            `<style>
                :host {
                    display: block;
                    box-sizing: border-box;
                }
            </style>
            <slot></slot>`,
            "text/html",
        );

        this.slotElement = doc.querySelector("slot")!;
        this.shadow.appendChild(doc.querySelector("style")!);
        this.shadow.appendChild(this.slotElement);
    }

    connectedCallback() {
        this.firstElement = firstNode(this.slotElement.assignedNodes());

        pageLoaded().then(() => {
            if (this.firstElement) {
                const height = getAbsoluteHeight(this.firstElement);

                this.margins = [height[0], height[2]];
                // Set the height because CSS position will be fixed
                this.style.height = `${height[0] + height[1] + height[2]}px`;
                this.style.paddingTop = height[0] + "px";
                this.style.paddingBottom = height[2] + "px";

                this.firstElement.style.marginTop = "0px";
                this.firstElement.style.marginBottom = "0px";

                window.requestAnimationFrame(this.stickToTop.bind(this));
            }
        });
    }

    /**
     * Detect if the element need to be sticky
     */
    stickToTop() {
        if (this.firstElement) {
            // Look the position form the top of the viewport + marginTop
            const topProgress = this.vState(this).topProgress;

            if (topProgress >= 1 && !this.isSticky) {
                // sticky
                this.firstElement.style.position = "fixed";
                this.firstElement.style.top = `${this.marginTop +
                    this.margins[0]}px`;
                this.isSticky = true;
            } else if (topProgress < 1 && this.isSticky) {
                // static
                this.firstElement.style.position = "";
                this.firstElement.style.top = "";
                this.isSticky = false;
            }

            // loop
            window.requestAnimationFrame(this.stickToTop.bind(this));
        }
    }
}

/**
 * Calculate element's height, margins included
 * @param {HTMLElement} element
 * @returns {number[]}
 */
function getAbsoluteHeight(element) {
    const styles = window.getComputedStyle(element);

    return [
        parseInt(styles.marginTop || "0", 10),
        element.offsetHeight,
        parseInt(styles.marginBottom || "0", 10),
    ];
}

/**
 *
 * @param {Node[]|NodeList} nodeList
 * @returns {HTMLElement|null}
 */
function firstNode(nodeList) {
    for (const node of nodeList) {
        if (isAChild(node)) {
            return /** @type {HTMLElement} */ (node);
        }
    }

    return null;
}

/**
 * Check is the node is not a carriage return
 * @param {Node} node
 * @returns {boolean}
 */
function isAChild(node) {
    return (
        node.nodeType === 1 ||
        !(
            node.nodeType === 3 &&
            node.textContent &&
            (node.textContent.indexOf("\n") >= 0 || node.textContent !== "")
        )
    );
}
