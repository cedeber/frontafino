import React from "react";
import styled from "@emotion/styled";
import { getImageData } from "./utils/canvas";
import newWorker from "./utils/worker-manager";

interface RenderProps {
    src: string;
    clut: string;
    size: number;
}

const StyledCanvas = styled.canvas({
    display: "block",
    backgroundColor: "var(--base06)",
    width: "auto",
    height: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
});

export default class Thumbnail extends React.Component<RenderProps, any> {
    canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();
    canvas!: HTMLCanvasElement;
    ctx!: CanvasRenderingContext2D;
    currentImageSrc!: string;
    currentImageData!: ImageData;

    render() {
        return <StyledCanvas ref={this.canvasRef}/>;
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
        let imagePromise;

        if (this.props.src === this.currentImageSrc) {
            imagePromise = Promise.resolve(this.currentImageData);
        } else {
            imagePromise = getImageData(this.props.src, this.props.size || 0);
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

                newWorker("/static/workers/pimio.js")(
                    (event, done) => {
                        const { type, out } = event.data;

                        if (type === "out") {
                            this.ctx.putImageData(out, 0, 0);
                            done();
                        }
                    },
                    { image, clut },
                    [image.data.buffer, clut.data.buffer],
                );
            })
            .catch(() => {
                /* empty */
            });
    }
}
