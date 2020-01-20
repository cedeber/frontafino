import React from "react";
import RenderWidget from "./editor-render";
import ClutSelector from "./editor-clut-selector";
import styled from "@emotion/styled";
import AddButton from "./editor-add";

const StyledEditor = styled.div({
    display: "grid",
    gridTemplate: `
        "editor" 1fr
        "selector" auto
        / 1fr
    `,
    gridGap: "10px",
    width: "100vw",
    height: "100vh",
});

export default class Editor extends React.Component {
    state = {
        src: "",
        clut: "/static/haldclut/identity.png",
    };


    setClut = clut => {
        this.setState({ clut });
    };

    setSrc = src => {
        this.setState({ src });
    };

    render() {
        return (
            <React.Fragment>
                <AddButton setSrc={this.setSrc}/>
                <StyledEditor>
                    <RenderWidget src={this.state.src} clut={this.state.clut}/>
                    <ClutSelector src={this.state.src} setClut={this.setClut}/>
                </StyledEditor>
            </React.Fragment>
        );
    }
}
