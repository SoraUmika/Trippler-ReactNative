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
	constructor(fromHour: number, fromMinute: number, toHour: number, toMinute: number) {
		super(
			{ hour: fromHour, minute: fromMinute },
			{ hour: toHour, minute: toMinute },
			timeCompare
		);
	}
	toString() {
		return timeToString(this.from) + " - " + timeToString(this.to);
	}
}

export type WeekDayNum = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export function getCurrentDate(): [Time, WeekDayNum] {
	let today = new Date();
	return [{ hour: today.getHours(), minute: today.getMinutes() }, today.getDay() as WeekDayNum];
}
