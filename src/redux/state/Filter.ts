import { BusinessStatus } from "./Business";

export default interface Filter {
	status: "all" | BusinessStatus;
	rating: "all" | [number, number];
	ratingNum: "all" | [number, number];
}
