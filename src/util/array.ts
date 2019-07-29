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
export function arrRemove<T>(arr: T[], el: T) {
	var index = arr.indexOf(el);
	if (index > -1) {
		arr.splice(index, 1);
	}
}

/**
 * Return a new array with given element removed.
 *
 * Return a new array that is the copy of provided array,
 * but with the provided element removed, the element is only removed once.
 * An array with same content is returned if the element does not exist.
 * 
 * This is a pure version of `arrRemove` function.
 *
 * @param arr The array used to create returned array which the element to be removed from
 * @param el The element to be removed from the returned array.
 * @returns A new array that is the copy of provided array with the provided element removed.
 * 			It has the same content as provided array if the provided element does not exist.
 */
export function pureArrRemove<T>(arr: T[], el: T): T[] {
	let copy = [...arr];
	arrRemove(copy, el);
	return copy;
}

/**
 * Return a new array with provided value sorted in the correct position
 * using provided array, which is sorted using the provided sort compare function.
 * 
 * Inser a value in to a sorted array using an order compare function, which takes in two
 * parameters: left and right, and determines if they are in right order.
 * It is implemented with insertion sort.
 * The provided array is not effected, return a new array instead.
 * 
 * Please make sure that the array is sorted, and that the sort compare function used to 
 * insert the value is the same as the sort compare function used to sort the array.
 * 
 * This is a pure version of `sortedInsert` function.
 *
 * @param arr The sorted array that is used to create the new array with given value inserted.
 * @param val The value to be inserted in to the new sorted array.
 * @param isOrdered The order compare function, see the function description.
 * @returns A copy of given sorted array with given value insertedd in the correct position.
 */
export function pureSortedInsert<T>(arr: T[], val: T, isOrdered: IsOrderedCompare<T>): T[] {
	let copy = [...arr];
	sortedInsert(copy, val, isOrdered);
	return copy;
}

/**
 * Return a new sorted array using provided array, 
 * using provided order compare function.
 *
 * Takes in an array, and an order compare function, which takes in two
 * parameters: left and right, and determines if they are in right order.
 * A new sorted array is return, the parameter array is not effected.
 * The implementation is insertion sort.
 * 
 * This is a pure version of `sort` function.
 *
 * @param arr The array to be used to create the sorted array.
 * @param isOrdered The order compare function, see the function description.
 * @returns A new array copy that is sorted using provided order compare function. 
 */
export function pureSort<T>(arr: T[], isOrdered: IsOrderedCompare<T>): T[] {
	let copy = [...arr];
	sort(arr, isOrdered);
	return copy;
}
