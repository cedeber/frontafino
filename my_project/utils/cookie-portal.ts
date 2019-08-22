/** @see Based on https://github.com/js-cookie/js-cookie */

import { deepClone } from './tiny-tools';

/**
 * @param [name] The name of the property to read from this document's cookies
 * @returns The specified cookie property's value (or all if it has not been set)
 */
export function readCookie(name: string): string | {} {
    const jar: {[key: string]: any} = {};
    const cookies = document.cookie ? document.cookie.split('; ') : [];

    for (const c of cookies) {
        const parts = c.split('=');
        let cookie = parts.slice(1).join('=');

        if (cookie.charAt(0) === '"') {
            cookie = cookie.slice(1, -1);
        }

        try {
            const key = decode(parts[0]);
            cookie = decode(cookie);

            try {
                cookie = JSON.parse(cookie);
            } catch (e) {
                /* empty */
            }

            jar[key] = cookie;

            if (name === key) {
                break;
            }
        } catch (e) {
            /* empty */
        }
    }

    return name ? jar[name] : jar;
}

/**
 * @param name The name of the property to set by writing to a cookie
 * @param value The value to use when setting the specified property
 * @param [attributes = {}]
 */
export function writeCookie(name: string, value: string | number | {}, attributes = {}) {
    const clonedAttributes: {[key: string]: any} = Object.assign({ path: '/' }, deepClone(attributes));
    let clonedValue = deepClone(value);

    if (typeof clonedAttributes.expires === 'number') {
        clonedAttributes.expires = new Date(
            Number(new Date()) + clonedAttributes.expires * 864e5,
        );
    }

    // We're using "expires" because "max-age" is not supported by IE
    clonedAttributes.expires = clonedAttributes.expires
        ? clonedAttributes.expires.toUTCString()
        : '';

    if (typeof clonedValue !== 'string') {
        try {
            const result = JSON.stringify(clonedValue);

            if (/^[{[]/.test(result)) {
                clonedValue = result;
            }
        } catch (e) {
            /* empty */
        }
    }

    clonedValue = encodeURIComponent(String(clonedValue)).replace(
        /%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,
        decodeURIComponent,
    );

    name = encodeURIComponent(String(name))
        .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
        .replace(/[()]/g, escape);

    let stringifiedAttributes = '';

    for (const attributeName in clonedAttributes) {
        if (!clonedAttributes[attributeName]) {
            continue;
        }
        stringifiedAttributes += '; ' + attributeName;
        if (clonedAttributes[attributeName] === true) {
            continue;
        }

        // Considers RFC 6265 section 5.2:
        // ...
        // 3.  If the remaining unparsed-attributes contains a %x3B (";")
        //     character:
        // Consume the characters of the unparsed-attributes up to,
        // not including, the first %x3B (";") character.
        // ...
        stringifiedAttributes += '=' + clonedAttributes[attributeName].split(';')[0];
    }

    return (document.cookie = name + '=' + clonedValue + stringifiedAttributes);
}

export function deleteCookie(name: string, attributes = {}) {
    return writeCookie(name, '', Object.assign(attributes, { expires: -1 }));
}

function decode(s: string) {
    return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
}
