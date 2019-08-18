import React, { useCallback } from "react";
import ReactDOM from "react-dom";
import { Button } from "@blueprintjs/core";

interface Props {
    [key: string]: string;
}

// define here which attributes will be passed as React props
const domAttributes = ["who"];

function HelloReact(props: Props) {
    const changeWho = useCallback(() => {
        const el = document.querySelector("hello-you");
        el!.setAttribute("who", "React Web Component");
    }, []);

    return <div>
            <p>Hello, {props.who}!</p>
            <Button onClick={changeWho} text="Change attribute" />
        </div>;
}

export class Hello extends HTMLElement {
    localProps: Props = {};

    render() {
        ReactDOM.render(<HelloReact {...this.localProps} />, this);
    }

    static get observedAttributes() {
        return domAttributes;
    }

    attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
        // Only re-render if the attribute has been set in connectedCallback
        if (this.localProps.hasOwnProperty(name)) {
            this.localProps[name] = newValue || "";
            this.render();
        }
    }

    connectedCallback() {
        for (const attr of domAttributes) {
            this.localProps[attr] = this.getAttribute(attr) || "";
        }

        this.render();
    }
}
