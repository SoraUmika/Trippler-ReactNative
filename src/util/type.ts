export type StrObj<T> = { [index: string]: T };

/**
 * Represent a range between two values.
 */
export class Range<T> {
	/**
	 * Create a Range object that represent a range between the
	 * given from value and to value.
	 * It also takes in a compare function, which is used for the `include` method.
	 * A compare function is a function that takes in two values, a and b, and returns a number,
	 * negative if a < b, 0 if a = b, positive if a > b.
	 * 
	 * @param from The start value of the range.
	 * @param to The end value of the range.
	 * @param compare The compare function, see the constructor description.
	 */
	constructor(public from: T, public to: T, public compare: (a: T, b: T) => number) {}

	/**
	 * Determine if given value is included in the range.
	 * 
	 * @param val The value to test if included in the range.
	 * @returns True if the given value is included in the range, else false.
	 */
	include(val: T) {
		return this.compare(this.from, val) <= 0 && this.compare(val, this.to) <= 0;
	}
}

/**
 * A range between two numbers.
 * 
 * @extends Range<number>
 */
export class NumberRange extends Range<number> {
	/**
	 * Create a NumberRange object that represent a range between given
	 * from number and to number.
	 * 
	 * @param from The start number of the range.
	 * @param to The end number of the range.
	 */
	constructor(from: number, to: number) {
		super(from, to, (a, b) => a - b);
	}
}
