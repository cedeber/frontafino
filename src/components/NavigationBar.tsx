import React from "react";
import { RouteChildrenProps } from "react-router";
import { Link, withRouter } from "react-router-dom";

import { navigation, list, link } from "../styles/components/navigation-bar.css";

function NavigationBar(props: RouteChildrenProps) {
    console.log(props);
    // TODO: Which one is active ?

    return (
        <nav className={navigation}>
            <ul className={list}>
                <li>
                    <Link to="/" className={link}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/about" className={link}>
                        About
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default withRouter(NavigationBar);
