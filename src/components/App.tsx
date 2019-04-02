import React from "react";
import styled from "@emotion/styled";

interface AppProps {
    who?: string;
    path?: string;
}

const T = styled.span`
    color: red;
`;

export default class App extends React.Component<AppProps, any> {
    timeoutID: number;
    state = {
        text: "Hello, world!",
    };

    handleClick = () => {
        window.alert("Hello, world!");
    };

    componentDidMount() {
        this.timeoutID = window.setTimeout(() => {
            this.setState({
                text: `Hello, ${this.props.who}!`,
            });
        }, 2000);
    }

    componentWillUnmount(): void {
        window.clearTimeout(this.timeoutID);
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
