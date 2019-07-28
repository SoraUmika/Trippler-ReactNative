export type IsOrderedCompare<T> = (left: T, right: T) => any;

export function sort<T>(arr: T[], isOrdered: IsOrderedCompare<T>) {
	for (let pass = 1; pass < arr.length; pass++) {
		sortPass(arr, isOrdered, pass);
	}
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
	const length = arr.push(val);
	sortPass(arr, isOrdered, length - 1);
}

export function arrRemoved(arr: any[], el: any) {
	var index = arr.indexOf(el);
	if (index > -1) {
		arr.splice(index, 1);
	}
}
