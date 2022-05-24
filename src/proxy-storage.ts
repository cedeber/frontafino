import { readCookie, writeCookie } from "./cookie-portal.js";

const storage = getProxy(localStorage);
const session = getProxy(sessionStorage);

function getProxy(webStorage: Storage): Record<string, unknown> {
	const hasStorage = hasStorageSupport(webStorage);

	return new Proxy(
		{},
		{
			set(_obj, prop, value) {
				hasStorage
					? webStorage.setItem(prop.toString(), String(value))
					: writeCookie(prop.toString(), value);

				return true;
			},
			get(_obj, prop) {
				return hasStorage
					? webStorage.getItem(prop.toString())
					: readCookie(prop.toString());
			},
			has(obj, prop) {
				return typeof Reflect.get(obj, prop) === "string";
			},
			deleteProperty(_obj, prop) {
				hasStorage
					? webStorage.removeItem(prop.toString())
					: writeCookie(prop.toString(), "", { expires: -1 });

				return true;
			},
		},
	);
}

/**
 * Whether the current browser supports local storage as a way of storing data
 */
function hasStorageSupport(webStorage: Storage): boolean {
	try {
		webStorage.setItem("__storage__", "foo");
		webStorage.removeItem("__storage__");

		return true;
	} catch (e) {
		return false;
	}
}

export { storage, session };
