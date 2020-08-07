export default class ExpandableLightbox extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });

    startLeft = 0;
    startTop = 0;
    startClientRect;
    endClientRect;
    isOpen = false;
    windowWidth = 0;

    opacity = 0;
    duration = 300;

    scrollable = document.body;

    closeMeMaybe = this._checkWindowWidth.bind(this);

    connectedCallback() {
        this.shadow.innerHTML = `
            ${styles}
            <slot name="content"></slot>
            <slot name="close"></slot>
        `;

        const contentElement = this.shadow.querySelector("slot[name='content']");
        const closeElement = this.shadow.querySelector("slot[name='close']");

        contentElement.addEventListener("click", this._open.bind(this));
        closeElement.addEventListener("click", this._close.bind(this));
    }

    _checkWindowWidth() {
        if (window.innerWidth !== this.windowWidth) {
            this._close();
        }
    }

    _open() {
        if (this.isOpen) {
            return;
        }

        this.isOpen = true;
        this.windowWidth = window.innerWidth;

        window.addEventListener("resize", this.closeMeMaybe);

        /* --- Animation --- */
        this.classList.add("has-no-transitions");

        // Get start and final positions
        this.startClientRect = this.getBoundingClientRect();
        this.classList.add("is-expanded");
        this.endClientRect = this.getBoundingClientRect();
        this.classList.remove("is-expanded");

        const endTop = window.innerHeight / 2 - this.endClientRect.height / 2;
        const endLeft = window.innerWidth / 2 - this.endClientRect.width / 2;

        // Place to final destination
        this.classList.add("is-expanded");
        this.style.top = `${endTop}px`;
        this.style.left = `${endLeft}px`;
        this.style.opacity = "1"; // avoid flickering

        // Scale and translation animation
        const scaleWidth = 1 / (this.endClientRect.width / this.startClientRect.width);
        const translateX = endLeft - this.startClientRect.left;
        const translateY = endTop - this.startClientRect.top;
        const player = this.animate(
            [
                {
                    opacity: this.opacity,
                    transform: `matrix(
                    ${scaleWidth},
                    0,
                    0,
                    ${scaleWidth},
                    ${-translateX},
                    ${-translateY}
                ) translateZ(0)`,
                },
                {
                    opacity: 1,
                    transform: `matrix(1,0,0,1,0,0) translateZ(0)`,
                },
            ],
            {
                duration: this.duration,
                easing: "cubic-bezier(0.645, 0.045, 0.355, 1.000)",
                iterations: 1,
            },
        );

        player.addEventListener("finish", () => {
            this.classList.remove("has-no-transitions");
            this.style.opacity = "";
        });
    }

    _close(event) {
        if (!this.isOpen) {
            return;
        }

        this.isOpen = false;
        window.removeEventListener("resize", this.closeMeMaybe);
        if (event != undefined) {
            event.stopPropagation();
        }

        /* --- Animation --- */
        this.classList.add("has-no-transitions");

        // Back to origin
        this.style.top = `${this.startTop}px`;
        this.style.left = `${this.startLeft}px`;

        // Scale and translation animation
        const scaleWidth = this.startClientRect.width / this.endClientRect.width;
        const translateX = this.startClientRect.left - this.endClientRect.left;
        const translateY = this.startClientRect.top - this.endClientRect.top;
        const player = this.animate(
            [
                {
                    opacity: 1,
                    transform: `matrix(1,0,0,1,${-translateX},${-translateY}) translateZ( 0 )`,
                },
                {
                    opacity: this.opacity,
                    transform: `matrix(${scaleWidth},0,0,${scaleWidth},0,0) translateZ( 0 )`,
                },
            ],
            {
                duration: this.duration,
                easing: "cubic-bezier(0.645, 0.045, 0.355, 1.000)",
                iterations: 1,
            },
        );

        player.addEventListener("finish", () => {
            this.classList.remove("is-expanded");
            this.classList.remove("has-no-transitions");
            this.scrollable.style.minHeight = "";
        });
    }
}

const styles = `
<style>
    :host { transform-origin: top left; }
    :host(.is-expanded) { position: absolute; }
</style>
`;
