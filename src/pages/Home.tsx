import React, { useCallback, useContext, useEffect, useRef, useState } from "react";

import { uid } from "../utils/tiny-tools";

import { StoreContext } from "../store/contexts";
import { increment, decrement } from "../store/actions";

import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogFooter, DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { getId } from 'office-ui-fabric-react/lib/Utilities';

import styles from "../styles/pages/home.scss";

export default function Home() {
    const store = useContext(StoreContext);
    let timeoutID = useRef(0);
    let [text, setText] = useState("Hello, world!");
    let [isDialogHidden, setDialogHidden] = useState(true);

    const incrementCounter = useCallback(() => store.dispatch(increment()), [store]);
    const decrementCounter = useCallback(() => store.dispatch(decrement()), [store]);

    useEffect(() => {
        const worker = new Worker("../workers/ping.ts");

        worker.onmessage = event => {
            const { message } = event.data;
            setText(message);
        };

        worker.postMessage({ message: "Hello, worker" });

        // @ts-ignore
        timeoutID.current = setTimeout(() => {
            setText(`Hello, ${uid()}!`);
        }, 2000);

        return function cleanup() {
            console.log("Home's cleanup");
            clearTimeout(timeoutID.current as any);
            worker.terminate();
        };
    }, []);

    return (
        <div>
            <button className={styles.red} onClick={handleClick}>{text}</button>
            <div>Redux Store: {counterValueRedux}</div>
            <button onClick={incrementCounter}>+</button>
            <button onClick={decrementCounter}>-</button>
        </div>
    );

    function handleClick() {
        console.log("Hello, world!");
    }
}
