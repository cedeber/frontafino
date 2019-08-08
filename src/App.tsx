import React, { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { Switch, Route, useLocation } from "wouter";

import store from "./redux/store";

import Home from "./pages/Home";
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));

import NavigationBar from "./components/NavigationBar";
import Loading from "./components/Loading";

import "./styles/global.scss";
import styles from "./styles/app.scss";

export default function App() {
    const [location] = useLocation();

    return (
        <Provider store={store}>
            <header>
                <NavigationBar />
            </header>
            <main className={styles.main}>
                <p>Current location: {location}</p>
                <Suspense fallback={<Loading />}>
                    <Switch>
                        <Route path="/about" component={About} />
                        <Route path="/" component={Home} />
                        <Route path="/:rest*" component={NotFound} />
                  </Switch>
                </Suspense>
            </main>
        </Provider>
    );
}
