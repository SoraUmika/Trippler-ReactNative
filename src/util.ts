export function objectsEqual(a: any = {}, b: any = {}) {
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

export type IsOrderedCompare<T> = (left: T, right: T) => any;

export function sort<T>(arr: T[], isOrdered: IsOrderedCompare<T>) {
	let copy = [...arr];
	for (let pass = 1; pass < copy.length; pass++) {
		sortPass(copy, isOrdered, pass);
	}
	return copy;
}

function sortPass<T>(arr: T[], isOrdered: IsOrderedCompare<T>, pass: number) {
	let holder = arr[pass];
	let i = pass;
	while (i > 0 && !isOrdered(arr[i - 1], holder)) {
		arr[i] = arr[i - 1];
		i--;
	}
	if (i != pass) {
		arr[i] = holder;
	}
}

export function sortedInsert<T>(arr: T[], val: T, isOrdered: IsOrderedCompare<T>) {
	let copy = [...arr];
	const length = copy.push(val);
	sortPass(copy, isOrdered, length - 1);
	return copy;
}

export type StrObj<T> = { [index: string]: T };

export function arrRemoved(arr: any[], el: any) {
	var index = arr.indexOf(el);
	if (index > -1) {
		arr.splice(index, 1);
	}
}
