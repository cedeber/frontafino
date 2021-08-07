type Obj = { [name: string]: boolean };
type T = string | number | Obj;

const classNames = (...args: Array<T | T[]>): string => {
    const classes: string[] = [];

    for (const arg of args) {
        if (!arg) continue;

        if (typeof arg === "string" || typeof arg === "number") {
            classes.push(String(arg));
        } else if (Array.isArray(arg) && arg.length) {
            const inner = classNames(...arg);
            if (inner) classes.push(inner);
        } else if (typeof arg === "object") {
            for (const key in arg) {
                if (Object.prototype.hasOwnProperty.call(arg, key) && (arg as Obj)[key]) {
                    classes.push(key);
                }
            }
        }
    }

    return classes.map((c) => c.trim()).join(" ");
};

export { classNames };
