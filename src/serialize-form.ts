/**
 * Serialize a Form
 */
const serialize = (form: HTMLFormElement): { [name: string]: string } => {
    const inputs: NodeListOf<HTMLInputElement | HTMLTextAreaElement> =
        form.querySelectorAll("input, textarea");
    const fields: { [name: string]: string } = {};

    for (const input of inputs) {
        if (
            input.name &&
            !input.disabled &&
            input.type !== "file" &&
            input.type !== "reset" &&
            input.type !== "submit" &&
            input.type !== "button"
        ) {
            if (
                (input.type !== "checkbox" && input.type !== "radio") ||
                (input instanceof HTMLInputElement && input.checked)
            ) {
                fields[input.name] = input.value;
            }
        }
    }

    return fields;
};

export { serialize };
