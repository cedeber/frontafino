import React, { useCallback, useContext, useEffect, useRef, useState, useReducer } from "react";
import { uid } from "../my_project/utils/tiny-tools";

import GlobalContext, { increment, decrement } from "../shell_app/stores";
import LocalContext, { initialState, reducer, say } from "./stores";

import { H1, Button, ButtonGroup, Callout } from "@blueprintjs/core/lib/esnext";
import styles from "./styles.scss";
import { Classes, Dialog, H2, InputGroup, Intent, Label, Tooltip } from "@blueprintjs/core";
import { useDocumentTitle } from "../my_project/utils/hooks";
import { PROJECT_NAME } from "../my_project/settings";

import { Loading } from "../shell_app/views";

import { useQuery } from "@apollo/react-hooks";
import stargazersQuery from "./queries/stargazers.graphql"

// === PAGES === //
/* --- Home Page --- */
export function HomePage() {
    const { data, loading } = useQuery(stargazersQuery);

    useDocumentTitle(PROJECT_NAME);

    return (
        <>
            <TextWorker />
            <Counter />
            <DialogButton />
            <H2>I am a web Component</H2>
            <p>I am rendered by React but this is another instance</p>
            <hello-you who="World" />
            <H2>GraphQL</H2>
            {loading ? <Loading /> : <p>The current GitHub repo has {data.repository.stargazers.totalCount} stargazers</p>}
        </>
    );
}

/* --- Context Page --- */
export function ContextPage() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useDocumentTitle("Test");

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

    return <p>I am the Print Component. The local context value is: {state.text}</p>;
}

export function Input() {
    const { state, dispatch } = useContext(LocalContext);
    const sayText = useCallback(e => dispatch(say(e.target.value || "")), [dispatch]);

    return (
        <div>
            <Label>
                Set the context value
                <InputGroup value={state.text} onChange={sayText} />
            </Label>
        </div>
    );
}
