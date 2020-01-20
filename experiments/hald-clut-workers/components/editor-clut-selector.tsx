import React from "react";
import styled from "@emotion/styled";
import Thumbnail from "./editor-thumbnail";

import "isomorphic-unfetch";

interface ClutSelectorProps {
    setClut: (arg0: string) => void;
    src: string;
}

const StyledFilter = styled.div({
    position: "relative",
    cursor: "pointer",
    display: "block",
    padding: "0",
    borderRadius: "5px",
    overflow: "hidden",
    width: "90px",
    margin: "0 1.5px",
    transition: "350ms",
    willChange: "opacity",
    ".title": {
        textAlign: "center",
        padding: "7px 4px",
        fontSize: "11px",
        backgroundColor: "var(--base07)",
        color: "var(--blue)",
    },
    ":hover": {
        opacity: 0.85,
    },
    "&.is-selected": {
        ".title": {
            backgroundColor: "var(--blue)",
            color: "var(--base07)",
        },
    },
    "&.is-selected::before": {
        content: "''",
        position: "absolute",
        borderRadius: "5px",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        boxShadow: "inset 0 0 0 3px var(--blue)",
        zIndex: 1,
    },
});

const StyledSelector = styled.div({
    overflowX: "auto",
    paddingBottom: 10,
    gridArea: "selector",
    "ul": {
        display: "flex",
        margin: 0,
        padding: 0,
        "li": {
            display: "block",
        },
    },
});

export default class ClutSelector extends React.Component<ClutSelectorProps, any> {
    state = {
        cluts: {},
        selectedClut: "",
    };

    selectorRef: React.RefObject<HTMLDivElement> = React.createRef();

    componentDidMount() {
        window.addEventListener("wheel", /** @type {WheelEvent} */event => {
            const currentElement = this.selectorRef.current!;
            const x = event.deltaX;
            const y = event.deltaY;

            if (Math.abs(x) === 0 && Math.abs(y) > 0) {
                currentElement.scrollTo(currentElement.scrollLeft + y, 0);
            }
        });

        fetch("/static/haldclut/haldclut.json")
            .then(data => data.json())
            .then(response => this.setState({ cluts: response }));
    }

    handleFilter(uid: string, src: string) {
        this.props.setClut(src);
        this.state.selectedClut = uid;
    }

    render() {
        const filtersList = [];

        for (const packageName in this.state.cluts) {

            const categories = this.state.cluts.hasOwnProperty(packageName)
                ? this.state.cluts[packageName]
                : null;

            for (const category in categories) {
                const filters = categories.hasOwnProperty(category)
                    ? categories[category]
                    : null;

                for (const filterName in filters) {
                    const src = filters.hasOwnProperty(filterName)
                        ? "/static/haldclut/" + filters[filterName]
                        : null;

                    if (src) {
                        const uid = `${category} ${filterName}`;

                        filtersList.push(
                            <li key={uid}>
                                <StyledFilter onClick={() => this.handleFilter(uid, src)} role="button"
                                              className={this.state.selectedClut === uid ? "is-selected" : ""}>
                                    <Thumbnail src={this.props.src} clut={src} size={130}/>
                                    <div className="title"><strong>{category}</strong><br/>{filterName}</div>
                                </StyledFilter>
                            </li>,
                        );
                    }
                }
            }
        }

        return <StyledSelector ref={this.selectorRef}>
            <ul>{filtersList}</ul>
        </StyledSelector>;
    }
}
