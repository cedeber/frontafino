import React from "react";
import ActiveLink from "../components/ActiveLink";
import { navigation, list, link, linkActive } from "../styles/components/navigation-bar.css";

export default function NavigationBar() {
    // TODO: Which one is active ?

    return (
        <nav className={navigation}>
            <ul className={list}>
                <li>
                    <ActiveLink href="/" className={link} classActive={linkActive}>
                        Home
                    </ActiveLink>
                </li>
                <li>
                    <ActiveLink href="/about" className={link} classActive={linkActive}>
                        About
                    </ActiveLink>
                </li>
            </ul>
        </nav>
    );
}
