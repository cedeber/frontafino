import React from "react";
import { Link } from "@reach/router";
import styled from "@emotion/styled";

const BasicLink = props => {
    return (
        <Link to={props.to} className={props.className}>
            {props.children}
        </Link>
    );
};

const StyledLink = styled(BasicLink)`
    text-decoration: none;
    display: inline-block;
    padding: 11px 17px;
    color: white;
    font-size: 14px;
`;

export default function NavigationBar() {
    return (
        <Nav>
            <List>
                <li>
                    <StyledLink to="/">Home</StyledLink>
                </li>
                <li>
                    <StyledLink to="/about">About</StyledLink>
                </li>
            </List>
        </Nav>
    );
}

const Nav = styled.nav`
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: saturate(180%) blur(20px);
    position: fixed;
    top: 0;
    left: 0;
    height: 44px;
    padding: 0 3px;
    width: calc(100% - 6px);
    overflow: hidden;
`;

const List = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    list-style: none;
    padding: 0;
    max-width: 800px;
    margin: 0 auto;
`;
