import React from "react";
import ReactDOM from "react-dom";

interface Props {
    [key: string]: string;
}

/**
 * Connect Web Component attributes to React Component properties
 * @param name Name of the Web Component
 * @param Component React Component
 * @param attributes Which attributes will be passed as properties
 */
export default function connect(name: string, Component: any, attributes: string[]) {
    return customElements.define(name, class extends HTMLElement {
        localProps: Props = {};

        render() {
            ReactDOM.render(<Component {...this.localProps} />, this);
        }

        static get observedAttributes() {
            return attributes;
        }

        attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
            // Only re-render if the attribute has been set in connectedCallback
            if (this.localProps.hasOwnProperty(name)) {
                this.localProps[name] = newValue || "";
                this.render();
            }
        }

        connectedCallback() {
            for (const attr of attributes) {
                this.localProps[attr] = this.getAttribute(attr) || "";
            }

            this.render();
        }
    });
}
