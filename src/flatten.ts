/**
 * Flatten an Array or a Set
 */
export function flatten(arr: any[] | Set<any> = []): any[] {
	let list: any[] = [];

	for (const v of arr) {
		list = list.concat(
			v instanceof Array || v instanceof Set ? flatten(v) : v,
		);
	}

	return list;
}
