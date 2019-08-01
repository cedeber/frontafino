/* eslint jsx-a11y/anchor-is-valid: "off" */

import React from "react";
import { useRoute, Link } from "wouter";

interface ActiveLinkProps {
    href: string;
    className?: string;
    classActive?: string;
    children: any;
}

export default function ActiveLink(props: ActiveLinkProps) {
    const [isActive] = useRoute(props.href);

    return (
        <Link {...props}>
            <a className={isActive ? props.classActive || props.className : props.className}>
                {props.children}
            </a>
        </Link>
    );
}
