interface FutchOptions {
	method?: string;
	responseType?: XMLHttpRequestResponseType;
	headers?: string[];
	body?: Document | XMLHttpRequestBodyInit | null;
}

/**
 * Fetch like function that supports upload progress callback
 */
export function futch(
	url: string | URL,
	options: FutchOptions = {},
	progressCallback: EventListener | undefined = undefined,
): Promise<string> {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest();

		request.open(options.method || "GET", url);

		if (options.hasOwnProperty("responseType")) {
			request.responseType = options.responseType || "";
		}

		for (const header in options.headers || {}) {
			if (options.headers?.hasOwnProperty(header)) {
				// @ts-ignore
				request.setRequestHeader(header, options.headers[header]);
			}
		}

		request.addEventListener("load", () => {
			if (request.status === 200) {
				resolve(request.response);
			} else {
				reject(
					new Error(
						`It didn't load successfully; error code:${request.statusText}`,
					),
				);
			}
		});

		request.addEventListener("error", () => reject(new Error("There was a network error.")));

		if (request.upload && progressCallback) {
			// => event.loaded / event.total * 100;
			// => event.lengthComputable
			request.upload.addEventListener("progress", progressCallback);
		}

		request.send(options.body);
	});
}
