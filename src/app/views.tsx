import React, { Suspense, useReducer } from "react";
import { useRoute, Link, useLocation } from "wouter";
import classNames from "classnames";

import Context, { initialState, reducer } from "./stores";
import Routes from "./urls";

import styles from "./styles.scss";

// === PAGES === //
/* --- Main Page --- */
export function MainPage() {
    const [location] = useLocation();
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Context.Provider value={{ state, dispatch }}>
            <header>
                <NavigationBar />
            </header>
            <main className={styles.main}>
                <p>Current location: {location}</p>
                <Suspense fallback={<Loading />}>
                    <Routes />
                </Suspense>
            </main>
        </Context.Provider>
    );
}

// === COMPONENTS === //
/* --- Loading --- */
export function Loading() {
    return (
        <div className={styles.loading}>
            Loading
            <span className={styles.loadingSpan}>...</span>
        </div>
    );
}

/* --- Active Link --- */
interface ActiveLinkProps {
    href: string;
    css?: string;
    children: any;
}

export function ActiveLink(props: ActiveLinkProps) {
    const [isActive] = useRoute(props.href);

    return (
        <Link {...props}>
            <a className={classNames(isActive ? styles.linkActive : styles.linkInactive, props.css)}>
                {props.children}
            </a>
        </Link>
    );
}

/* --- Navigation Bar --- */
export function NavigationBar() {
    return (
        <nav className={styles.navigation}>
            <ul className={styles.navigationList}>
                <li>
                    <ActiveLink href="/" css={styles.navigationLink}>
                        Home
                    </ActiveLink>
                </li>
                <li>
                    <ActiveLink href="/context" css={styles.navigationLink}>
                        Context
                    </ActiveLink>
                </li>
            </ul>
        </nav>
    );
}
