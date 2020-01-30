export default function dynamicStyles(...initialElements: HTMLElement[]) {
    const currentElements = new Set();
    const currentStyles = Object.create(null);
    const proxyObj = Object.create(null);

    initialElements.forEach(element => {
        if (element instanceof HTMLElement) {
            currentElements.add(element);
        }
    });

    proxyObj.add = function(...addedElements: HTMLElement[]) {
        addedElements.forEach(element => {
            if (element instanceof HTMLElement) {
                currentElements.add(element);
            }
        });
    };

    proxyObj.delete = function(element: HTMLElement) {
        currentElements.delete(element);
    };

    proxyObj.clear = function(deleteStyles = true) {
        if (deleteStyles) {
            currentElements.forEach(element => element.setAttribute("style", ""));
        }

        currentElements.clear();
    };

    proxyObj.list = function(): Set<HTMLElement> {
        return currentElements;
    };

    return new Proxy(proxyObj, {
        get(obj, prop) {
            if (prop in obj) {
                return obj[prop];
            }

            if (prop === "styles") {
                return currentStyles;
            }

            return undefined;
        },
        set(_obj, prop, value) {
            if (prop === "styles") {
                for (const element of currentElements.values()) {
                    for (const style in value) {
                        if (
                            style in element.style &&
                            value.hasOwnProperty(style)
                        ) {
                            element.style[style] = value[style];
                            currentStyles[style] = value[style];
                        }
                    }
                }

                return true;
            }

            for (const element of currentElements.values()) {
                if (prop in element.style) {
                    element.style[prop] = value;
                }
            }

            return true;
        },
    });
}

export function setStyles(styles: CSSStyleDeclaration, element: HTMLElement) {
    for (const styl in styles) {
        if (
            styl in element.style &&
            styles.hasOwnProperty(styl)
        ) {
            element.style[styl] = styles[styl];
        }
    }
}
