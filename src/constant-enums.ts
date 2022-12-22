type Obj = Record<string, unknown>;
type Data = string[] | Obj;
type Fn = (values: Data) => ProxyConstructor;

/**
 * Simulate an Enum data type
 */
export const Enum = (values: Data): ProxyConstructor => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handler: ProxyHandler<any> = {
		set() {
			throw new TypeError("Enum is read only");
		},
		get(obj, prop) {
			if (!(prop in obj)) {
				throw new ReferenceError(`Unknown enum key "${String(prop)}"`);
			}

			return Reflect.get(obj, prop);
		},
		deleteProperty() {
			throw new TypeError("Enum is read only");
		},
	};

	return new Proxy(transformToObject(values), handler);
};

/**
 * Convert the Enum to have Symbols as values
 */
export const toSymbol = (fn: Fn) => {
	return function (values: Data): ProxyConstructor {
		const convertedValues = transformToSymbol(transformToObject(values));

		return fn(convertedValues);
	};
};

/**
 * Convert the Enum to accept a list of String
 * @param {function(Object): Proxy} fn
 * @returns {function(Object): Proxy}
 */
export const asList = (fn: Fn) => {
	return function (...values: string[]): ProxyConstructor {
		return fn(values);
	};
};

/**
 * Convert the values of an object to Symbols
 */
const transformToSymbol = (obj: Obj): Obj => {
	const newObj = Object.create(null);

	for (const k of Object.keys(obj)) {
		newObj[k] = Symbol(String(obj[k]));
	}

	return newObj;
};

/**
 * Check and transform if needed an Array into Object
 */
const transformToObject = (data: Data): Obj => {
	const newObj = Object.create(null);

	if (Array.isArray(data)) {
		for (const value of data) {
			if (typeof value !== "string") {
				throw new TypeError(`Value "${value}" must be a String`);
			}

			newObj[String(value)] = value;
		}
	} else if (typeof data === "object") {
		Object.assign(newObj, data);
	}

	return newObj;
};
