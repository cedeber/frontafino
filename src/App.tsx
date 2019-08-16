import React, { Suspense, lazy, useReducer } from "react";
import { Switch, Route, useLocation } from "wouter";

import { StoreContext } from "./store/contexts";
import { reducer, initialState } from "./store/reducers";

import Home from "./pages/Home";
import Context from "./pages/Context";
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));

import NavigationBar from "./components/NavigationBar";
import Loading from "./components/Loading";

import "./styles/global.scss";
import styles from "./styles/app.scss";

export default function App() {
    const [location] = useLocation();
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            <header>
                <NavigationBar />
            </header>
            <main className={styles.main}>
                <p>Current location: {location}</p>
                <Suspense fallback={<Loading />}>
                    <Switch>
                        <Route path="/about" component={About} />
                        <Route path="/context" component={Context} />
                        <Route path="/" component={Home} />
                        <Route path="/:rest*" component={NotFound} />
                    </Switch>
                </Suspense>
            </main>
        </StoreContext.Provider>
    );
}
