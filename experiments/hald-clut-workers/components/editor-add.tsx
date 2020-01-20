import React from "react";
import styled from "@emotion/styled";

interface ButtonProps {
    setSrc: Function;
}

const StyledButton = styled.button({
    position: "fixed",
    top: 6,
    right: 6,
    zIndex: 11,
    fontSize: 16,
    display: "block",
    textAlign: "center",
    color: "var(--base07)",
    background: "var(--blue)",
    borderRadius: 3,
    border: 0,
    cursor: "pointer",
    fontFamily: "inherit",
    padding: "6px 12px",
    letterSpacing: "-1px",
});

export default class AddButton extends React.Component<ButtonProps, any> {
    state = {
        loading: false,
    };

    fileInput: React.RefObject<HTMLInputElement> = React.createRef();

    openDialog() {
        this.fileInput.current!.click();
    }

    loadFile(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        this.setState({ loading: true });

        if (!file.type.startsWith("image/")) {
            alert("This file format is not supported.");
            this.setState({ loading: false });
            return;
        }

        reader.onload = () => {
            this.props.setSrc(reader.result);
            this.setState({ loading: false });
        };
        reader.readAsDataURL(file);
    }

    render() {
        return <>
            <StyledButton onClick={() => this.openDialog()}>
                {this.state.loading ? "Loading..." : "Open an image"}
            </StyledButton>
            <input ref={this.fileInput} type="file" hidden onChange={e => this.loadFile(e)}/>
        </>;
    }
}
