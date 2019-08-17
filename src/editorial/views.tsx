import React, { useCallback, useContext, useEffect, useRef, useState, useReducer } from "react";
import { uid } from "../boilerplate/utils/tiny-tools";

import GlobalContext, { increment, decrement } from "../app/stores";
import LocalContext, { initialState, reducer, say } from "./stores";

import { Stack } from "office-ui-fabric-react/lib/Stack";
import { DefaultButton, PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { Label } from "office-ui-fabric-react/lib/Label";
import { Text } from "office-ui-fabric-react/lib/Text";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Dialog, DialogFooter, DialogType } from "office-ui-fabric-react/lib/Dialog";
import { getId } from "office-ui-fabric-react/lib/Utilities";

import styles from "./styles.scss";

// === PAGES === //
/* --- Home Page --- */
export function HomePage() {
    return (
        <Stack horizontal={false}>
            <TextWorker />
            <DialogButton />
            <Counter />
        </Stack>
    );
}

/* --- Context Page --- */
export function ContextPage() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <LocalContext.Provider value={{ state, dispatch }}>
            <Stack horizontal={false} tokens={{ childrenGap: 15 }} styles={{ root: { width: 650 } }}>
                <Text>
                    <h1>Hello</h1>
                    <h2>Context</h2>
                    <p>
                        The input and the label are separated components, inside of this page context. The value is not
                        pass via the props, theses components are tweens anyways, but through the local context of this
                        page to all children. The context value is going to be lost once the page will change.
                    </p>
                </Text>
                <Input />
                <Print />
            </Stack>
        </LocalContext.Provider>
    );
}

// === COMPONENTS === //
/* --- Counter --- */
export function Counter() {
    const { state, dispatch } = useContext(GlobalContext);
    const incrementCounter = useCallback(() => dispatch(increment()), [dispatch]);
    const decrementCounter = useCallback(() => dispatch(decrement()), [dispatch]);

    return (
        <div>
            <Label>
                Global Store (Math done by WASM/Rust): <span className={styles.red}>{state.value}</span>
            </Label>
            <DefaultButton onClick={incrementCounter}>+</DefaultButton>
            <DefaultButton onClick={decrementCounter}>-</DefaultButton>
        </div>
    );
}

/* --- Dialog Button --- */
export function DialogButton() {
    const [isDialogHidden, setDialogHidden] = useState(true);

    return (
        <div>
            <DefaultButton onClick={() => setDialogHidden(false)}>Open Dialog</DefaultButton>
            <Dialog
                hidden={isDialogHidden}
                onDismiss={() => setDialogHidden(true)}
                dialogContentProps={{
                    type: DialogType.normal,
                    title: "All emails together",
                    subText:
                        "Your Inbox has changed. No longer does it include favorites, it is a singular destination for your emails.",
                }}
                modalProps={{
                    titleAriaId: getId("dialogLabel"),
                    subtitleAriaId: getId("subTextLabel"),
                    isBlocking: false,
                    styles: { main: { maxWidth: 450 } },
                }}
            >
                <DialogFooter>
                    <PrimaryButton onClick={() => setDialogHidden(true)} text="Save" />
                    <DefaultButton onClick={() => setDialogHidden(true)} text="Cancel" />
                </DialogFooter>
            </Dialog>
        </div>
    );
}

/* --- Text Worker --- */
export function TextWorker() {
    let timeoutID = useRef(0);
    const [text, setText] = useState("Hello, world!");

    useEffect(() => {
        const worker = new Worker("./workers/ping.ts");

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
            console.log("TextWorker's cleanup");
            clearTimeout(timeoutID.current as any);
            worker.terminate();
        };
    }, []);

    return (
        <div>
            <Text>{text}</Text>
        </div>
    );
}

/* --- * --- */
export function Print() {
    const { state } = useContext(LocalContext);

    return (
        <p>
            I am the Print Component. The local context value is: <Label>{state.text}</Label>
        </p>
    );
}

export function Input() {
    const { state, dispatch } = useContext(LocalContext);
    const sayText = useCallback((_e, val) => dispatch(say(val || "")), [dispatch]);

    return (
        <div>
            <TextField label="Set the context value" defaultValue={state.text} onChange={sayText} />
        </div>
    );
}
