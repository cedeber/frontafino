/**
  @typedef RequestOption
  @type {object}
  @property {string} [method]
  @property {XMLHttpRequestResponseType} [responseType]
  @property {string[]} [headers]
  @property {Document|BodyInit|null} [body]
 */

/**
 * Fetch like function that supports upload progress callback
 * @param {string} url The url
 * @param {RequestOption} options Headers options
 * @param {EventListener|undefined} [progressCallback=undefined] onProgress callback
 * @returns {Promise<string>} responseText
 */
export default function futch(url, options = {}, progressCallback = undefined) {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();

        request.open(options.method || 'GET', url);

        if (options.hasOwnProperty('responseType')) {
            request.responseType = options.responseType || '';
        }

        for (const header in options.headers || {}) {
            if (options.headers && options.headers.hasOwnProperty(header)) {
                request.setRequestHeader(header, options.headers[header]);
            }
        }

        request.addEventListener('load', () => {
            if (request.status === 200) {
                resolve(request.response);
            } else {
                reject(
                    new Error(
                        `It didn't load successfully; error code:${
                            request.statusText
                            }`,
                    ),
                );
            }
        });

        request.addEventListener('error', () =>
            reject(new Error('There was a network error.')),
        );

        if (request.upload && progressCallback) {
            // => event.loaded / event.total * 100;
            // => event.lengthComputable
            request.upload.addEventListener('progress', progressCallback);
        }

        request.send(options.body);
    });
}
