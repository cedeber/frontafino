/** @type {Worker} */
let ctx = self;

ctx.onmessage = event => {
    let {
        /** @type ImageData */ image,
        /** @type ImageData */ clut
    } = event.data;

    /** @type ImageData */
    let out = applyClut(image, clut);

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
    let width = image.width;
    let height = image.height;
    // let out = new ImageData(new Uint8ClampedArray(image.data), width, height);
    let out = new ImageData(width, height);
    let outData = out.data;
    let imageData = image.data;
    let clutData = clut.data;

    let clutLength = Math.floor(Math.pow(clut.width, 1 / 3) + 0.001);
    let clutSize = clutLength * clutLength;
    // let clutSize = Math.floor(Math.pow(clutData.length / 4, 1 / 3) + 0.001);

    // Progress
    let max = width * height;
    let pc = 0;

    for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
            let i = (y * width + x) * 4,
                red = imageData[i] / 255 * (clutSize - 1),
                green = imageData[i + 1] / 255 * (clutSize - 1),
                blue = imageData[i + 2] / 255 * (clutSize - 1);

            let clutIndex = (dither(blue) * clutSize * clutSize + dither(green) * clutSize + dither(red)) * 4;

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
    let floorValue = Math.floor(value);
    let remainder = value - floorValue;

    return (Math.random() > remainder) ? floorValue : Math.ceil(value);
}
