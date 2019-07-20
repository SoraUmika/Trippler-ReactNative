type BusinessStatus = "open" | "close";

export default interface Business {
	id: string;
	name: string;
	status: BusinessStatus;
	rating: number;
	ratingNum: number
}