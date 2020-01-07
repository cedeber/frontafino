import { h } from "/modules/preact.js";
import { useEffect } from "/modules/preact/hooks.js";
export default function Users(props) {
    useEffect(() => {
        document.title = `User ${props.params.name} profile`;
    }, []);
    return h("div", null,
        "User ",
        props.params.name);
}
//# sourceMappingURL=Users.js.map