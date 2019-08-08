/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import { useRoute, Link } from "wouter";
import classNames from "classnames";

import styles from "../styles/components/active-link.scss";

interface ActiveLinkProps {
    href: string;
    css?: string;
    children: any;
}

export default function ActiveLink(props: ActiveLinkProps) {
    const [isActive] = useRoute(props.href);

    return (
        <Link {...props}>
            <a className={classNames(isActive ? styles.active : styles.inactive, props.css)}>{props.children}</a>
        </Link>
    );
}
