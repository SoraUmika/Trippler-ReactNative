export function objectsEqual(a: any = {}, b: any = {}) {  //! this function is buggy.
	let aProps = Object.getOwnPropertyNames(a);
	let bProps = Object.getOwnPropertyNames(b);

	if (aProps.length != bProps.length) {
		return false;
	}

	for (let i = 0; i < aProps.length; i++) {
		let propName = aProps[i];
		let va = a[propName],
			vb = b[propName];
		let type = typeof va;

		if (type == "object") {
			if (!objectsEqual(va, vb)) {
				return false;
			}
		} else if (type != "function" && va != vb) {
			return false;
		}
	}
	return true;
}

/**
 * Return an updated original object.
 * 
 * Takes an origin object, which is the object to be updated, and a source object,
 * with is a partial of origin object, and has the new values.
 * returns a new object with updated values.
 * 
 * @param origin The object to be updated.
 * @param src The object with the new value, it is a partial of origin object.
 * @returns A new object with updated values.
 */
export function update<T>(origin: T, src: Partial<T>): T {
	return Object.assign({}, origin, src);
}