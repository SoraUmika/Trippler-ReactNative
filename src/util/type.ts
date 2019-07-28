export type StrObj<T> = { [index: string]: T };

export class Range<T> {
	constructor(public from: T, public to: T, public compare: (a: T, b: T) => number) {}
	include(val: T) {
		return this.compare(this.from, val) <= 0 && this.compare(val, this.to) <= 0;
	}
}

export class NumberRange extends Range<number> {
	constructor(from: number, to: number) {
		super(from, to, (a, b) => a - b);
	}
}
