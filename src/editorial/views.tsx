import React, { useCallback, useContext, useEffect, useRef, useState, useReducer } from "react";
import { uid } from "../boilerplate/utils/tiny-tools";

import GlobalContext, { increment, decrement } from "../app/stores";
import LocalContext, { initialState, reducer, say } from "./stores";

import { H1, Button, ButtonGroup, Callout } from "@blueprintjs/core/lib/esnext";
import styles from "./styles.scss";
import { Classes, Dialog, InputGroup, Intent, Label, Tooltip } from "@blueprintjs/core";

// === PAGES === //
/* --- Home Page --- */
export function HomePage() {
    return (
        <>
            <TextWorker />
            <Counter />
            <DialogButton />
        </>
    );
}

/* --- Context Page --- */
export function ContextPage() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <LocalContext.Provider value={{ state, dispatch }}>
            <H1>Context</H1>
            <Callout title={"Local context"}>
                The input and the label are separated components, inside of this page context. The value is not pass via
                the props, theses components are tweens anyways, but through the local context of this page to all
                children. The context value is going to be lost once the page will change.
            </Callout>
            <Input />
            <Print />
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
            <p>
                Global Store (Math done by WASM/Rust): <span className={styles.red}>{state.value}</span>
            </p>
            <ButtonGroup>
                <Button icon="add" onClick={incrementCounter}>
                    Increment
                </Button>
                <Button icon="remove" onClick={decrementCounter}>
                    Decrement
                </Button>
            </ButtonGroup>
        </div>
    );
}

/* --- Dialog Button --- */
export function DialogButton() {
    const [isDialogHidden, setDialogHidden] = useState(true);

    return (
        <div>
            <Button onClick={() => setDialogHidden(false)}>Open Dialog</Button>
            <Dialog
                icon="inbox"
                onClose={() => setDialogHidden(true)}
                title="All emails together"
                autoFocus={true}
                canEscapeKeyClose={true}
                canOutsideClickClose={true}
                enforceFocus={true}
                isOpen={!isDialogHidden}
                usePortal={true}
            >
                <div className={Classes.DIALOG_BODY}>
                    <p>
                        Your Inbox has changed. No longer does it include favorites, it is a singular destination for
                        your emails.
                    </p>
                </div>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Tooltip content="This button is hooked up to close the dialog.">
                            <Button onClick={() => setDialogHidden(true)}>Cancel</Button>
                        </Tooltip>
                        <Button intent={Intent.PRIMARY} onClick={() => setDialogHidden(true)}>
                            Save
                        </Button>
                    </div>
                </div>
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

    return <p>{text}</p>;
}

/* --- * --- */
export function Print() {
    const { state } = useContext(LocalContext);

    return (
        <p>
            I am the Print Component. The local context value is: {state.text}
        </p>
    );
}

export function Input() {
    const { state, dispatch } = useContext(LocalContext);
    const sayText = useCallback((e) => dispatch(say(e.target.value || "")), [dispatch]);

    return (
        <div>
            <Label>
                Set the context value
                <InputGroup value={state.text} onChange={sayText} />
            </Label>
        </div>
    );
}
