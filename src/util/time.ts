import { Range } from "./type";

export interface Time {
	hour: number;
	minute: number;
}

export function timeCompare(a: Time, b: Time) {
	return a.hour == b.hour ? a.minute - b.minute : a.hour - b.hour;
}

export function timeToString(time: Time) {
	const isAfternoon = time.hour > 12;
	const hourShifted = time.hour - (isAfternoon ? 12 : 0);
	const period = isAfternoon ? "PM" : "AM";
	return `${hourShifted}:${time.minute}${period}`;
}

export class TimeRange extends Range<Time> {
	constructor(from: Time, to: Time) {
		super(from, to, timeCompare);
	}
}
