import { BusinessStatus } from "./Business";
import { NumberRange } from "../../util/type";

export default interface Filter {
	status: "all" | BusinessStatus;
	rating: "all" | NumberRange;
	ratingNum: "all" | NumberRange;
}
