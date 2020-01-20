/**
 * @todo Resive image for the preview and recalculate full resolution for the export
 */

import React from "react";
import { LoadingContext, ILoadingContext } from "./context";
import { getImageData } from "./utils/canvas";
import newWorker from "./utils/worker-manager";
import styled from "@emotion/styled";

interface RenderProps {
    src: string;
    clut: string;
    ctx: ILoadingContext;
}

const StyledEditor = styled.div({
    gridArea: "editor",
    position: "relative",
    "canvas": {
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        top: "10px",
        width: "auto",
        height: "auto",
        maxWidth: "calc(100% - 20px)",
        maxHeight: "calc(100% - 10px)",
        border: "1px solid var(--base07)",
        background: "var(--base01)",
    }
});

class RenderWidget extends React.Component<RenderProps, any> {
    newTask = newWorker("/static/workers/pimio.js");
    canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();
    canvas!: HTMLCanvasElement;
    ctx!: CanvasRenderingContext2D;
    currentImageSrc!: string;
    currentImageData!: ImageData;

    render() {
        return (
            <StyledEditor>
                <canvas ref={this.canvasRef}/>
            </StyledEditor>
        );
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.src !== nextProps.src) {
            return true;
        }

        if (this.props.clut !== nextProps.clut) {
            return true;
        }

        return false;
    }

    componentDidUpdate() {
        this.applyClut();
    }

    componentDidMount() {
        this.canvas = this.canvasRef.current!;
        this.ctx = this.canvas.getContext("2d")!;
    }

    applyClut() {
        let imagePromise: Promise<ImageData>;

        if (this.props.src === this.currentImageSrc) {
            imagePromise = Promise.resolve(this.currentImageData);
        } else {
            imagePromise = getImageData(this.props.src);
        }

        Promise.all([imagePromise, getImageData(this.props.clut)])
            .then(values => {
                const [image, clut] = values;
                const width = image.width;
                const height = image.height;

                // Keep a copy of the image data in memory on each iteration
                // because it is transferred and used into the worker.
                this.currentImageData = new ImageData(
                    new Uint8ClampedArray(image.data),
                    image.width,
                    image.height,
                );

                if (this.props.src !== this.currentImageSrc) {
                    this.currentImageSrc = this.props.src;
                }

                this.canvas.width = width;
                this.canvas.height = height;

                // TODO: Split the task in multiple tasks (4?)
                this.newTask(
                    (event, done) => {
                        const { type, percent, out } = event.data;

                        if (type === "percent") {
                            if (out) {
                                this.ctx.putImageData(out, 0, 0);
                            }

                            this.props.ctx.loadingChange(percent);
                        }

                        if (type === "out") {
                            this.ctx.putImageData(out, 0, 0);
                            this.props.ctx.loadingChange(0);
                            done();
                        }
                    },
                    { image, clut },
                    [image.data.buffer, clut.data.buffer],
                    3
                );
            })
            .catch(() => {
                /* empty */
            });
    }
}

export default function RenderWithContext(props) {
    return (
        <LoadingContext.Consumer>
            {context => <RenderWidget {...props} ctx={context}/>}
        </LoadingContext.Consumer>
    );
}
