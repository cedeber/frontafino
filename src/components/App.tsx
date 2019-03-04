import React from "react";

interface AppProps {
    who: String;
}

export default class App extends React.Component<AppProps, any> {
    state = {
        text: "Hello, world!",
    };

    constructor(props: AppProps) {
        super(props);
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                text: `Hello, ${this.props.who}!`,
            });
        }, 2000);
    }

    render() {
        const { who } = this.props;

        return (
            <div>
                {`Hello, ${who}!`}<br/>{this.state.text}
            </div>
        );
    }
}
