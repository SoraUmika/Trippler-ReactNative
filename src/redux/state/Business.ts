import { TimeRange, WeekDayNum, Time } from "../../util/time";

export default interface Business {
	id: string;
	name: string;
	rating: number;
	ratingNum: number;
	address: string;
	hours: TimeRange[];
	days: WeekDayNum[];
	gallery: [
		{
			url: string;
			description: string;
		}
	];
}

export function isBusinessOpen(business: Business, currentTime: Time, currentWeekDay: WeekDayNum) {
	if (currentWeekDay in business.days) {
		for (const range of business.hours) {
			if (range.include(currentTime)) {
				return true;
			}
		}
	}
	return false;
}
