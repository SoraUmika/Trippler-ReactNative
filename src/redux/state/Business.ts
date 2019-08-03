/**
 * Business type, deine the structure of the business data.
 * used in state 'businesses'.
 * And also some methods.
 */
import { TimeRange, WeekDayNum, Time } from "../../util/time";

export default interface Business {
	id: string;
	name: string;
	rating: number;
	ratingNum: number;
	address: string;
	hours: TimeRange[];
	days: WeekDayNum[];
	description: string;
	gallery: GalleryImageData[];
}

export interface GalleryImageData {
	url: string;
	description: string;
}

/**
 * Determine if given business is open with current time and day of week.
 *
 * @param business The data of the business to be determined if it is open currently.
 * @param currentTime Time object that represent current time.
 * @param currentWeekDay A number 0-6 that represent current day of week.
 * @return True if the business is open currently, else false.
 */
export function isBusinessOpen(business: Business, currentTime: Time, currentWeekDay: WeekDayNum) {
	if (currentWeekDay in business.days) {
		// If today is open day.
		for (const range of business.hours) {
			// If the now is during an open hour interval.
			if (range.include(currentTime)) {
				return true;
			}
		}
	}
	return false;
}
