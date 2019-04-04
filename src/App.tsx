import React, { Suspense } from "react";
import { Router, Link } from "@reach/router";

import Home from "./pages/Home";

const About = React.lazy(() => import("./pages/About"));

export default function App() {
    return (
        <>
            <header>
                <nav>
                    <Link to="/">Home</Link> | <Link to="about">About</Link>
                </nav>
            </header>
            <Suspense fallback={<div>Loading...</div>}>
                <Router>
                    <Home who="You" path="/" />
                    <About path="about" />
                </Router>
            </Suspense>
        </>
    );
}
