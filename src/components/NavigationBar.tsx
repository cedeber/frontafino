import React from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

import styles from "../styles/components/navigation-bar.scss";

function NavigationBar(props: RouteComponentProps) {
    console.log(props);
    // TODO: Which one is active ?

    return (
        <nav className={styles.navigation}>
            <ul className={styles.list}>
                <li>
                    <Link to="/" className={styles.link}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/about" className={styles.link}>
                        About
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default withRouter(NavigationBar);
