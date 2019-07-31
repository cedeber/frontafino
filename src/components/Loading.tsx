import React from "react";
import { loading, span } from "../styles/components/loading.css";

export default function Loading() {
    return <div className={loading}>
        Loading
        <span className={span}>...</span>
    </div>;
}
