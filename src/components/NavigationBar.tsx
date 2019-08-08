import React from "react";

import styles from "../styles/components/navigation-bar.scss";
import ActiveLink from "./ActiveLink";

export default function NavigationBar() {
    return (
        <nav className={styles.navigation}>
            <ul className={styles.list}>
                <li>
                    <ActiveLink href="/" css={styles.link}>
                        Home
                    </ActiveLink>
                </li>
                <li>
                    <ActiveLink href="/about" css={styles.link}>
                        About
                    </ActiveLink>
                </li>
            </ul>
        </nav>
    );
}
