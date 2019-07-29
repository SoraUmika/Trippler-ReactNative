import { TimeRange } from "../../util/time";

export type BusinessStatus = "open" | "close";

export default interface Business {
	id: string;
	name: string;
	status: BusinessStatus;
	rating: number;
	ratingNum: number;
	address: string;
	hours: TimeRange[];
	days: (1 | 2 | 3 | 4 | 5 | 6 | 7)[];
	gallery: [
		{
			url: string;
			description: string;
		}
	];
}
