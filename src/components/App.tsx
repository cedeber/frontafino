import React from "react";
import styled from "@emotion/styled";

interface AppProps {
    who?: string;
}

const T = styled.span`
    color: red;
`;

export default class App extends React.Component<AppProps, any> {
    state = {
        text: "Hello, world!",
    };

    handleClick = () => {
        window.alert("Hello, world!");
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                text: `Hello, ${this.props.who}!`,
            });
        }, 2000);
    }

    render() {
        const { who } = this.props;
        const { text } = this.state;

        return (
            <div>
                {`Hello, ${who}!`}
                <br />
                <T onClick={this.handleClick}>{text}</T>
            </div>
        );
    }
}
