import React, { lazy } from "react";
import { Route, Switch } from "wouter";

import { ContextPage, HomePage } from "../pages_app/views";

const NotFoundPage = lazy(() => import("./async/not_found"));

// TODO: What about configuring that in the project folder.
export default function Routes() {
    return (
        <Switch>
            <Route path="/app/context" component={ContextPage} />
            <Route path="/" component={HomePage} />
            <Route path="/:rest*" component={NotFoundPage} />
        </Switch>
    );
}
