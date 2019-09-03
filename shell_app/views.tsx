import React, { Suspense, useCallback, useMemo, useReducer } from "react";
import { useLocation } from "wouter";
import classNames from "classnames";

import Context, { initialState, reducer } from "./stores";
import Routes from "./urls";

import {
    Navbar,
    NavbarGroup,
    Alignment,
    NavbarHeading,
    NavbarDivider,
    Classes,
    Tabs,
    Tab,
    TabId,
    InputGroup,
    Spinner,
    Icon,
    ButtonGroup,
    Popover,
    Button,
    Menu,
    MenuItem,
    MenuDivider,
    Position,
} from "@blueprintjs/core";
import styles from "./styles.scss";

import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

// === PAGES === //
/* --- Main Page --- */
export function PagesShell() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const client = useMemo(
        () =>
            new ApolloClient({
                cache: new InMemoryCache(),
                link: new HttpLink({
                    uri: "https://www.ma-cuvee.fr/api/shop/",
                }),
            }),
        [],
    );

    return (
        <Context.Provider value={{ state, dispatch }}>
            <ApolloProvider client={client}>
                <header>
                    <NavigationBar />
                </header>
                <main className={styles.main}>
                    <Suspense fallback={<Loading />}>
                        <Routes />
                    </Suspense>
                </main>
            </ApolloProvider>
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

/* --- Navigation Bar --- */
export function NavigationBar() {
    const [location, setLocation] = useLocation();

    const goto = useCallback(
        (newTabId: TabId) => {
            setLocation(String(newTabId));
        },
        [setLocation],
    );

    const searchSpinner = <Spinner size={Icon.SIZE_STANDARD} />;
    const navBarMenu = (
        <Menu className={Classes.ELEVATION_1}>
            <MenuItem icon="new-text-box" text="New text box" />
            <MenuItem icon="new-object" text="New object" />
            <MenuItem icon="new-link" text="New link" />
            <MenuDivider />
            <MenuItem icon="cog" labelElement={<Icon icon="share" />} text="Settings..." />
        </Menu>
    );

    return (
        <Navbar className={Classes.DARK}>
            <NavbarGroup align={Alignment.LEFT}>
                <NavbarHeading>
                    <strong>Boilerplate</strong>{" "}
                    <span className={classNames("bp3-monospace-text", "bp3-text-small", "bp3-text-disabled")}>
                        {location}
                    </span>
                </NavbarHeading>
                <NavbarDivider />
                <Tabs animate={true} id="navBar" large={true} onChange={goto} selectedTabId={location}>
                    <Tab id="/" title="Home" />
                    <Tab id="/app/context" title="Context" />
                </Tabs>
            </NavbarGroup>
            <NavbarGroup align={Alignment.RIGHT}>
                <InputGroup type="search" leftIcon="search" placeholder="Search..." rightElement={searchSpinner} />
                <NavbarDivider />
                <ButtonGroup minimal={true}>
                    <Popover content={navBarMenu} position={Position.BOTTOM_RIGHT}>
                        <Button icon="settings" />
                    </Popover>
                </ButtonGroup>
            </NavbarGroup>
        </Navbar>
    );
}
