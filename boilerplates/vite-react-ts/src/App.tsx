import React from "react";
import { CountProvider, useCount } from "./context/count";

function App(): React.ReactElement {
    return (
        <CountProvider>
            <Count />
        </CountProvider>
    );
}

function Count() {
    const [{ count }, dispatchCount] = useCount();

    return (
        <>
            <div>{count}</div>
            <button onClick={() => dispatchCount({ type: "increment" })}>increment</button>
        </>
    );
}

export default App;
