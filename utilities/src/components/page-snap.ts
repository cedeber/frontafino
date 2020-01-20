import scrollIntoViewport from "../dom/scroll-into-viewport.js";
import verticalState from "../dom/vertical-state.js";
import { debounce } from '../utils/tiny-tools.js';

export default class Snap extends HTMLElement {
    marginTop = parseInt(this.dataset.marginTop || "0", 10) || 0; // top margin decal
    speed = parseInt(this.dataset.speed || "35", 10) || 35; // average quantity of pixels to scroll per frame. Configure scrollIntoViewport
    vState = verticalState();
    show = scrollIntoViewport(this.marginTop, this.speed);

    static get observedAttributes() {
        return ["data-margin-top", "data-speed"];
    }

    connectedCallback() {
        window.addEventListener(
            "scroll",
            debounce(this.handle.bind(this), 120),
        );
    }

    /**
     * Center slide on the viewport
     */
    handle() {
        for (const element of this.children) {
            const vState = this.vState(element as HTMLElement);

            if (vState.topProgress > 0.5 && vState.bottomProgress < 0.5) {
                this.show(element);

                return;
            }
        }
    }

    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "data-margin-top":
                this.marginTop = parseInt(newValue || "0", 10) || 0;
                break;

            case "data-speed":
                this.speed = parseInt(newValue || "35", 10) || 35;
                break;
        }

        this.show = scrollIntoViewport(this.marginTop, this.speed);
    }
}
