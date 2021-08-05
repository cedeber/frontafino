const getImageData = (src: string, size?: number): Promise<ImageData> => {
    return new Promise((resolve, reject) => {
        let image = new Image();
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d")!;

        image.addEventListener("error", reject);
        image.addEventListener("load", () => {
            let width = image.naturalWidth;
            let height = image.naturalHeight;
            let finalWidth = size || width;
            let finalHeight = size ? size / (width / height) : height;

            canvas.width = finalWidth;
            canvas.height = finalHeight;

            context.drawImage(image, 0, 0, width, height, 0, 0, finalWidth, finalHeight);

            let data = context.getImageData(0, 0, finalWidth, finalHeight);

            resolve(data);
        });

        image.src = src;
    });
};

export { getImageData };
