/**
 * @param {string} src
 * @param {number} [size]
 * @return {Promise<ImageData>}
 */
export function getImageData(src: string, size?: number): Promise<ImageData> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d")!;

        image.addEventListener("error", reject);
        image.addEventListener("load", () => {
            const width = image.naturalWidth;
            const height = image.naturalHeight;
            let finalWidth = size || width;
            let finalHeight = size ? size / (width / height) : height;

            canvas.width = finalWidth;
            canvas.height = finalHeight;

            if (size) {
                context.drawImage(image, 0, 0, width, height, 0, 0, finalWidth, finalHeight);
            } else {
                context.drawImage(image, 0, 0);
            }

            const data = context.getImageData(0, 0, finalWidth, finalHeight);

            resolve(data);
        });

        image.src = src;
    });
}
