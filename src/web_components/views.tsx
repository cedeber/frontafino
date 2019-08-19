import React, { useCallback } from "react";
import { Button } from "@blueprintjs/core";

interface Props {
    // [key: string]: string;
    who: string;
}

export function Hello(props: Props) {
    const changeWho = useCallback(() => {
        const el = document.querySelector("hello-you");
        el!.setAttribute("who", "React Web Component");
    }, []);

    return (
        <div>
            <p>Hello, {props.who}!</p>
            <Button onClick={changeWho} text="Change attribute" />
        </div>
    );
}
