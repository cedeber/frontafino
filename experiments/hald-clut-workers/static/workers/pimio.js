/** @type {Worker} */
const ctx = self;

ctx.onmessage = event => {
    const {
        /** @type ImageData */ image,
        /** @type ImageData */ clut
    } = event.data;

    /** @type ImageData */
    const out = applyClut(image, clut);

    ctx.postMessage({type: 'out', out}, [out.data.buffer]);
};

/**
 *
 * @param {ImageData} image
 * @param {ImageData} clut
 * @param {number} [mix=1]
 * @return {ImageData}
 */
function applyClut(image, clut, mix = 1) {
    const width = image.width;
    const height = image.height;
    // const out = new ImageData(new Uint8ClampedArray(image.data), width, height);
    const out = new ImageData(width, height);
    const outData = out.data;
    const imageData = image.data;
    const clutData = clut.data;

    const clutLength = Math.floor(Math.pow(clut.width, 1 / 3) + 0.001);
    const clutSize = clutLength * clutLength;

    // Progress
    const max = width * height;
    let pc = 0;

    for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
            let i = (y * width + x) * 4,
                red = imageData[i] / 255 * (clutSize - 1),
                green = imageData[i + 1] / 255 * (clutSize - 1),
                blue = imageData[i + 2] / 255 * (clutSize - 1);

            const clutIndex = (dither(blue) * clutSize * clutSize + dither(green) * clutSize + dither(red)) * 4;

            outData[i] = imageData[i] * (1 - mix) + clutData[clutIndex] * mix;
            outData[i + 1] = imageData[i + 1] * (1 - mix) + clutData[clutIndex + 1] * mix;
            outData[i + 2] = imageData[i + 2] * (1 - mix) + clutData[clutIndex + 2] * mix;
            outData[i + 3] = 255;  // alpha channel : opacity = 1

            // Progress
            let p = Math.ceil((x * y) / max * 100);
            if (p > pc) {
                if (p % 10 === 0 && p > 0 && p < 99) {
                    postMessage({type: 'percent', percent: p, out});
                }

                postMessage({type: 'percent', percent: p});
                pc = p;
            }
        }
    }

    return out;
}

/**
 * @param {number} value
 * @return {number}
 */
function dither(value) {
    const floorValue = Math.floor(value);
    const remainder = value - floorValue;

    return (Math.random() > remainder) ? floorValue : Math.ceil(value);
}
