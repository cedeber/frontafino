/**
 * All the loaded resources urls
 * @type Set<String>
 **/
const urlList = new Set();

/**
 * @param src
 * @param crossOrigin
 * @param isModule
 * @param integrity
 * @param id
 * @param dataset
 * @return {Promise<*>}
 */
export function loadJS(
    src,
    {
        crossOrigin = null,
        isModule = false,
        integrity = '',
        id = '',
        dataset = null,
    } = {},
) {
    if (urlList.has(src)) {
        return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
        /** @type HTMLScriptElement **/
        const script = document.createElement('script');

        script.addEventListener('load', event => resolve(event));
        script.addEventListener('error', event => reject(event));

        if (typeof crossOrigin === 'string') {
            script.crossOrigin = crossOrigin;
        }

        if (isModule) {
            script.type = 'module';
        } else {
            script.defer = true;
        }

        if (dataset) {
            for (const key in dataset) {
                script.dataset[key] = dataset[key];
            }
        }

        script.async = true;
        script.integrity = integrity;
        script.id = id;
        script.src = src;

        document.head.appendChild(script);
        urlList.add(src);
    });
}

/**
 * @param src
 * @param crossOrigin
 * @param integrity
 * @param media
 * @return {Promise<*>}
 */
export function loadCSS(
    src,
    {
        crossOrigin = null,
        integrity = '',
        media = 'screen',
    } = {},
) {
    if (urlList.has(src)) {
        return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
        /** @type HTMLLinkElement **/
        const link = document.createElement('link');

        link.addEventListener('load', event => resolve(event));
        link.addEventListener('error', event => reject(event));

        if (typeof crossOrigin === 'string') {
            link.setAttribute('crossorigin', crossOrigin);
        }

        link.rel = 'stylesheet';
        link.media = media;
        link.integrity = integrity;
        link.href = src;

        document.head.appendChild(link);
        urlList.add(src);
    });
}
