/**
 * Connect Web Component attributes to Svelte Component properties
 * @param {string} name Name of the Web Component
 * @param {*} Component Svelte Component
 * @param {string[]} attributes Which attributes will be passed as properties
 */
export default function connect(name, Component, attributes = []) {
    return customElements.define(name, class extends HTMLElement {
        constructor() {
            super();
            this.component = undefined;
        }

        static get observedAttributes() {
            return attributes;
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (this.component && oldValue !== newValue) {
                this.component.$set({ [name]: newValue });
            }
        }

        connectedCallback() {
            let props = {};

            for (let attr of attributes) {
                props[attr] = this.getAttribute(attr) || undefined;
            }

            // empty element
            while (this.firstChild) {
                this.removeChild(this.lastChild);
            }

            this.component = new Component({
                target: this,
                props,
            });
        }

        disconnectedCallback() {
            this.component.$destroy();
        }
    });
}
