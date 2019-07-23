import React from "react";
import { RouteComponentProps } from "@reach/router";

interface Props extends RouteComponentProps {}

export default function NotFound(_props: Props) {
    return <div>Page not found</div>;
}
