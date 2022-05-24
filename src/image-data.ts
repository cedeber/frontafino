const getImageData = (src: string, size?: number): Promise<ImageData> => {
	return new Promise((resolve, reject) => {
		const image = new Image();
		const canvas = document.createElement("canvas");
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const context = canvas.getContext("2d")!;

		image.addEventListener("error", reject);
		image.addEventListener("load", () => {
			const width = image.naturalWidth;
			const height = image.naturalHeight;
			const finalWidth = size || width;
			const finalHeight = size ? size / (width / height) : height;

			canvas.width = finalWidth;
			canvas.height = finalHeight;

			context.drawImage(image, 0, 0, width, height, 0, 0, finalWidth, finalHeight);

			const data = context.getImageData(0, 0, finalWidth, finalHeight);

			resolve(data);
		});

		image.src = src;
	});
};

export { getImageData };
