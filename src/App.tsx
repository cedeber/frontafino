import { hot } from "react-hot-loader";
import React, { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Global, css } from "@emotion/core";
import styled from "@emotion/styled";

import store from "./redux/store";

import Home from "./pages/Home";
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));

import NavigationBar from "./components/NavigationBar";
import Loading from "./components/Loading";

const Main = styled.main`
    margin-top: 44px;
`;

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <header>
                    <NavigationBar />
                </header>
                <Main>
                    <Suspense fallback={<Loading />}>
                        <Switch>
                            <Route path="/about" exact component={About} />
                            <Route path="/" exact component={Home} />
                            <Route component={NotFound} />
                        </Switch>
                    </Suspense>
                </Main>
            </BrowserRouter>
            <Global styles={css`
                body {
                    margin: 0;
                    font-family: -apple-system, system-ui, sans-serif;
                    color: #444;
                    line-height: 1.5;
                }
            `} />
        </Provider>
    );
}

let exportedApp = App;

if (process.env.NODE_ENV === "development") {
    exportedApp = hot(module)(App);
}

export default exportedApp;
