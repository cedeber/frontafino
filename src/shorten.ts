/**
 * Returns shorten text
 */
const shorten = (wordsNumber = 15, endChars = "…", splitter = " "): ((text: string) => string) => {
	return function (text: string): string {
		const textArray = text.split(splitter, wordsNumber);

		textArray.map((word) => word.trim());

		if (endChars && endChars.length > 0 && textArray.length > wordsNumber) {
			textArray.push(endChars);
		}

		return textArray.join(splitter);
	};
};

export { shorten };
