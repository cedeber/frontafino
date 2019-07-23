import React from "react";
import styled from "@emotion/styled";
import { RouteComponentProps } from "@reach/router";

import { uid } from "../utils";

interface Props extends RouteComponentProps {
    who?: string;
}

const T = styled.span`
    color: red;
`;

export default function Home(props: Props) {
    console.log("Home");
    let timeoutID = React.useRef(0);
    let [text, setText] = React.useState("Hello, world!");

    React.useEffect(() => {
        console.log("Home's effect");

        const worker = new Worker("../workers/ping.ts");

        worker.onmessage = event => {
            console.log("Home's worker");
            const { message } = event.data;
            setText(message);
        };

        worker.postMessage({ message: "Hello, worker" });

        // @ts-ignore
        timeoutID.current = setTimeout(() => {
            console.log("Home's timeout");
            setText(`Hello, ${uid()}!`);
        }, 2000);

        return function cleanup() {
            console.log("Home's cleanup");
            clearTimeout(timeoutID.current as any);
            // worker.terminate();
        };
    }, []);

    return (
        <div>
            Hello, {props.who}!
            <br />
            <T onClick={handleClick}>{text}</T>
        </div>
    );

    function handleClick() {
        console.log("Hello, world!");
    }
}
