import * as React from "react";

/** @todo the result of a fetch should be saved in cache (lru-cache) or Storage */
let done = false;

export default function Async(_props: any) {
    return <div>
        <React.Suspense fallback={<div>Loading...</div>}>
            {timeoutPromise(() => <p>I am a lazy loaded About page with async content!</p>, 2000)}
        </React.Suspense>
    </div>
}

function timeoutPromise(fn, delay) {
    console.log("call me maybe");

    if (done) {
        return fn();
    }

    throw new Promise(resolve => {
        setTimeout(() => {done = true; resolve()}, delay);
    });
}
