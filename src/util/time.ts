import { Range } from "./type";

export interface Time {
	hour: number;
	minute: number;
}

/**
 * Takes in two Time objects, and return a number.
 * Negative if a < b, 0 if a = b, positive if a > b.
 * 
 * @param a A Time object to be compared.
 * @param b A Time object to be compared.
 * @returns Negative if a < b, 0 if a = b, positive if a > b.
 */
export function timeCompare(a: Time, b: Time) {
	return a.hour == b.hour ? a.minute - b.minute : a.hour - b.hour;
}

/**
 * Return a string representation of given Time object.
 * format: 7:30AM
 * 
 * @param time The Time object to be representated.
 * @returns A string representation of given Time object.
 */
export function timeToString(time: Time) {
	const isAfternoon = time.hour > 12;
	const hourShifted = time.hour - (isAfternoon ? 12 : 0);
	const period = isAfternoon ? "PM" : "AM";
	return `${hourShifted}:${time.minute}${period}`;
}

/**
 * A time interval.
 * 
 * @extends Range<Time>
 */
export class TimeRange extends Range<Time> {
	/**
	 * Create a TimeRange object that represent a time interval.
	 * 
	 * @param fromHour The start hour, in 24 format.
	 * @param fromMinute The start minute.
	 * @param toHour The end hour, in 24 format.
	 * @param toMinute The end minute.
	 */
	constructor(fromHour: number, fromMinute: number, toHour: number, toMinute: number) {
		super(
			{ hour: fromHour, minute: fromMinute },
			{ hour: toHour, minute: toMinute },
			timeCompare
		);
	}
	/**
	 * Return a string representation of the time interval.
	 * format: 7:30AM - 3:15PM
	 * 
	 * @returns A string representation of the time interval.
	 */
	toString() {
		return timeToString(this.from) + " - " + timeToString(this.to);
	}
}

export type WeekDayNum = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Get the current time and day in week.
 * 
 * @returns A Time object of current time, and a WeekDayNum of current day in week.
 */
export function getCurrentDate(): [Time, WeekDayNum] {
	let today = new Date();
	return [{ hour: today.getHours(), minute: today.getMinutes() }, today.getDay() as WeekDayNum];
}
