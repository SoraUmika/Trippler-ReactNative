/**
 * Filter type.
 * Type of state 'collection.filter'.
 */
import { NumberRange } from "../../util/type";

export default interface Filter {
	status: "all" | "close" | "open";
	rating: "all" | NumberRange;
	ratingNum: "all" | NumberRange;
}
