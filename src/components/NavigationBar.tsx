import React from "react";
import { RouteChildrenProps } from "react-router";
import { Link, withRouter } from "react-router-dom";

import { navigationBar, navigationBarLink } from "../styles/components.css";

function NavigationBar(props: RouteChildrenProps) {
    console.log(props);
    // TODO: Which one is active ?

    return (
        <nav className={navigationBar}>
            <ul>
                <li>
                    <Link to="/" className={navigationBarLink}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/about" className={navigationBarLink}>
                        About
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default withRouter(NavigationBar);
