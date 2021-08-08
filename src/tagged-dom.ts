import { uid } from "./uid.js";
import { flatten } from "./flatten.js";

interface TaggedDOM {
    fragment: DocumentFragment;
    render: (element?: Element) => Promise<any>;
}

/**
 * DocumentFragment Tagged templates
 */
export default function dom(strings: TemplateStringsArray, ...expressions: any[]): TaggedDOM {
    // Use template instead of document.createDocumentFragment() because it needs a parentNode
    /** @type HTMLTemplateElement */
    const template = document.createElement("template");
    const tagPromise = promiseTagger();
    const proxyProperties: Map<PropertyKey, HTMLElement> = new Map();
    const html = [strings[0]];

    const proxy = new Proxy(
        {},
        {
            get(_obj, prop) {
                return proxyProperties.get(prop);
            },
            set(_obj, prop, value) {
                const parent = proxyProperties.get(prop);

                if (parent) {
                    value = isDomObject(value) ? value : dom`${value}`;
                    value.render(parent);

                    return true;
                }

                return false;
            },
        },
    );

    /* --- Create DOM --- */
    if (expressions.length > 0) {
        const resolvedExpressions = resolveExpressions(expressions, tagPromise);

        resolvedExpressions.forEach((expr, i) => html.push(expr, strings[i + 1]));
    }

    template.innerHTML = flatten(html).join("");

    /* --- Resolve promises --- */
    const fragment = template.content;
    const promisesMap = tagPromise() as Map<string, Promise<any>>;

    for (const [tag, promise] of promisesMap) {
        const element = fragment.querySelector(tag);

        // element doesn't exist or has been replaced by the proxy
        if (!element) continue;

        // resolve the Promises - async
        promise.then((value) => {
            if (
                value == undefined || // null or undefined
                (Array.isArray(value) && value.length === 0) // empty Array
            ) {
                return;
            }

            if (typeof value !== "object" && typeof value !== "function") {
                // this is a simple text node but we parse it. !createTextNode
                value = dom`${value}`.fragment;
            } else if (!(value instanceof DocumentFragment)) {
                const { fragment } = isDomObject(value)
                    ? value
                    : dom`${typeof value === "function" ? value() : value}`;

                value = fragment;
            }

            // replace the promise node
            const parent = element.parentNode as HTMLElement;

            if (parent) {
                if (parent.nodeType === 1) {
                    const proxyPropName = parent.getAttribute(":proxy");

                    if (proxyPropName) {
                        parent.removeAttribute(":proxy");
                        proxyProperties.set(proxyPropName, parent);
                    }
                }

                parent.replaceChild(value, element);
            }
        });
    }

    return {
        fragment,
        render,
    };

    async function render(element?: Element): Promise<any> {
        if (element != undefined) {
            element.innerHTML = "";
            element.append(fragment);
        }

        return Promise.all(promisesMap.values()).then(() => proxy);
    }
}

/**
 * Specific tag replaced by the promise result
 */
function promiseTagger() {
    const map: Map<string, Promise<any>> = new Map();

    return function (promise?: Promise<any>): string | Map<string, Promise<any>> {
        const tag = `tagdom-${uid()}`;

        if (promise == undefined) {
            return map;
        }

        map.set(tag, promise);

        return `<${tag}></${tag}>`;
    };
}

/**
 * @param expressions string literals expressions
 * @param tagPromise promiseTagger return
 */
function resolveExpressions(expressions: any[], tagPromise: Function): string[] {
    const result: string[] = [];

    expressions.forEach((entry: any) => {
        // null or undefined
        if (entry == undefined || (Array.isArray(entry) && entry.length === 0)) {
            return;
        }

        if (Array.isArray(entry)) {
            // resolve each expression on the array
            entry = entry.map((value) => resolveExpressions([value], tagPromise));
        } else if (entry instanceof Promise) {
            // create a tag
            entry = tagPromise(entry);
        } else if (typeof entry === "function") {
            // resolve the result of the function
            entry = resolveExpressions([entry()], tagPromise);
        } else {
            entry =
                typeof entry !== "object"
                    ? entry // String
                    : tagPromise(Promise.resolve(entry)); // DOM -> create a tag
        }

        result.push(entry);
    });

    return result;
}

function isDomObject(obj: any): boolean {
    return typeof obj === "object" && "fragment" in obj && "render" in obj;
}
