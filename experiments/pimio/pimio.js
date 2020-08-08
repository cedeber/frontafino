import { h, render } from "https://cdn.skypack.dev/preact";
import { useState, useEffect, useRef } from "https://cdn.skypack.dev/preact/hooks";
import htm from "https://cdn.skypack.dev/htm";
import { getImageData } from "./canvas.js";
import newWorker from "./worker-manager.js";

const html = htm.bind(h);

render(html`<${Main} />`, document.body);

function Main() {
    const [image, setImage] = useState(null);
    const [haldclut, setHaldclut] = useState("./haldclut/identity.png");
    const [effects, setEffects] = useState([]);
    const inputRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        fetch("./haldclut/haldclut.json")
            .then((data) => data.json())
            .then((cluts) => {
                const effects = [];
                for (const clut in cluts) {
                    let categories = cluts[clut];

                    for (let category in categories) {
                        let filters = categories[category];

                        for (let filter in filters) {
                            let src = "./haldclut/" + filters[filter];
                            let uid = `${category} ${filter}`;

                            effects.push({ uid, src, category, filter });
                        }
                    }
                }
                console.log(effects);
                setEffects(effects);
            });
    }, []);

    useEffect(() => {
        if (image == null) return;
        const ctx = canvasRef.current.getContext("2d");
        const task = newWorker("./pimio.worker.js");

        let width = image.width;
        let height = image.height;

        getImageData(haldclut).then((clut) => {
            task(
                (event, done) => {
                    let { type, percent, out } = event.data;

                    if (type === "out") {
                        canvasRef.current.width = out.width;
                        canvasRef.current.height = out.height;
                        ctx.putImageData(out, 0, 0);
                        done();
                    }
                },
                {
                    image,
                    clut,
                },
                [],
            );
        });
    }, [image, haldclut]);

    function loadFile(event) {
        const file = event.target.files[0];

        if (!file.type.startsWith("image/")) {
            alert("This file format is not supported.");
            return;
        }

        let reader = new FileReader();

        reader.addEventListener("load", () => {
            getImageData(reader.result).then((data) => {
                setImage(data);
            });
        });

        reader.readAsDataURL(file);
    }

    return html`<div class="row">
            <h1>Pimiö</h1>
            <button onclick=${() => inputRef.current.click()}>Open an Image</button>
        </div>
        <div class="row">
            ${image &&
            html`<div class="button-group">
                ${effects.map(
                    (effect) =>
                        html`<button onclick=${() => setHaldclut(effect.src)}>
                            ${effect.filter}
                        </button>`,
                )}
            </div>`}
            <input ref=${inputRef} type="file" hidden onchange=${loadFile} />
        </div>
        <canvas
            ref=${canvasRef}
            style=${{
                maxHeight: "calc(100vh - 128px)",
                maxWidth: "calc(100vw - 16px)",
                marginLeft: 8,
            }}
        />`;
}
