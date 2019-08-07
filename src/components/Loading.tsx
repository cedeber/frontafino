import React from "react";
import styles from "../styles/components/loading.scss";

export default function Loading() {
    return <div className={styles.loading}>
        Loading
        <span className={styles.span}>...</span>
    </div>;
}
