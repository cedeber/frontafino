import React from "react";
import { LoadingContext, ILoadingContext } from "./context";
import styled from "@emotion/styled";

interface LoadingBarProps {
    ctx: ILoadingContext;
}

const StyledBar = styled.div({
    display: "block",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: 3,
    background: "var(--blue)",
    willChange: "opacity, transform",
    transformOrigin: "left center",
});

class LoadingBar extends React.Component<LoadingBarProps, any> {
    render() {
        return (
            <StyledBar
                style={{
                    transform: `scale(${this.props.ctx.loadingPercent / 100}, 1)`,
                }}
            />
        );
    }
}

export default function LoadingBarWithContext(props) {
    return (
        <LoadingContext.Consumer>
            {context => <LoadingBar {...props} ctx={context} />}
        </LoadingContext.Consumer>
    );
}
