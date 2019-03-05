import React from "react";

interface AppProps {
    who?: string;
}

export default class App extends React.Component<AppProps, any> {
    state = {
        text: "Hello, world!",
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
                {`Hello, ${who}!`}<br/>
                {text}
            </div>
        );
    }
}
