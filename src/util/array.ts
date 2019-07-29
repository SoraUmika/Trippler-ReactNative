// A function that determind if left and right values are in order.
export type IsOrderedCompare<T> = (left: T, right: T) => any;

/**
 * sort an array with provided order compare function.
 *
 * Takes in an array, and an order compare function, which takes in two
 * parameters: left and right, and determines if they are in right order.
 * The provided array is directly modified.
 * The implementation is insertion sort.
 *
 * @param arr The array to be sorted.
 * @param isOrdered The order compare function, see the function description.
 */
export function sort<T>(arr: T[], isOrdered: IsOrderedCompare<T>) {
	for (let pass = 1; pass < arr.length; pass++) {
		sortPass(arr, isOrdered, pass);
	}
}

/**
 * This is used to implement `sort` and `sortedInsert`function, 
 * it is supposed to be used outside of it.
 * It implements a signle pass of insertion sort.
 * 
 * @access private
 * 
 * @param arr The array to be processed.
 * @param isOrdered The order compare function, see `sort` or `sortedInsert` function description.
 * @param pass The pass number.
 */
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

/**
 * Insert given value in to a sorted array using an order compare function.
 * 
 * Inser a value in to a sorted array using an order compare function, which takes in two
 * parameters: left and right, and determines if they are in right order.
 * It is implemented with insertion sort.
 * The array is directly modified.
 * 
 * @param arr The sorted array that the value to be inserted in.
 * @param val The value to be inserted in to the sorted array.
 * @param isOrdered The order compare function, see the function description.
 */
export function sortedInsert<T>(arr: T[], val: T, isOrdered: IsOrderedCompare<T>) {
	const length = arr.push(val);
	sortPass(arr, isOrdered, length - 1);
}

/**
 * Remove given element from the array.
 * 
 * Remove the given element from given array.
 * No effect if the element does not exist in the array.
 * The array is directly modified.
 * 
 * @param arr The array that the element to be removed from/
 * @param el The element to be removed from the array.
 */
export function arrRemoved(arr: any[], el: any) {
	var index = arr.indexOf(el);
	if (index > -1) {
		arr.splice(index, 1);
	}
}
