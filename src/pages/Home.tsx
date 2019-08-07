import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { uid } from "../utils/tiny-tools";
import { Store } from "../redux/reducers";
import { increment, decrement } from "../redux/actions";

import styles from "../styles/pages/home.scss";

export default function Home() {
    let timeoutID = useRef(0);
    let [text, setText] = useState("Hello, world!");

    const dispatch = useDispatch();
    const incrementCounter = useCallback(() => dispatch(increment()), [dispatch]);
    const decrementCounter = useCallback(() => dispatch(decrement()), [dispatch]);
    const counterValueRedux = useSelector((state: Store) => state.value);

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
