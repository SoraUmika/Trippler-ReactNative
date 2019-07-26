import Business from "./state/Business";
import { IsOrderedCompare } from "../util";

export type SortMethod = "name" | "rating" | "avgRating";

export const BusinessCompareFunctions: { [index: string]: IsOrderedCompare<Business> } = {
	name: (l, r) => l.name < r.name,
	rating: (l, r) => l.rating > r.rating,
	avgRating: (l, r) => l.rating / l.ratingNum > r.rating / r.ratingNum
};

export default function getCompareFunc(
	sortMethod: SortMethod,
	businesses: { [index: string]: Business }
): IsOrderedCompare<string> {
	const compareFunc = BusinessCompareFunctions[sortMethod];
	return (l, r) => compareFunc(businesses[l], businesses[r]);
}
