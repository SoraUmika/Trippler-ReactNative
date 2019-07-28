import { Range } from "./type";

export interface Time {
	hour: number;
	minute: number;
}

export function timeCompare(a: Time, b: Time) {
	return a.hour == b.hour ? a.minute - b.minute : a.hour - a.hour;
}

export class TimeRange extends Range<Time> {
	constructor(from: Time, to: Time) {
		super(from, to, timeCompare);
	}
}
