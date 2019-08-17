import React, { lazy } from "react";
import { Route, Switch } from "wouter";

import { ContextPage, HomePage } from "../editorial/views";

const NotFoundPage = lazy(() => import("./async/not_found"));

export default function Routes() {
    return (
        <Switch>
            <Route path="/context" component={ContextPage} />
            <Route path="/" component={HomePage} />
            <Route path="/:rest*" component={NotFoundPage} />
        </Switch>
    );
}
