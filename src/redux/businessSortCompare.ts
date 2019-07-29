/**
 * Provide the sort compare function used to sort an array of businesses
 * represented in their ids.
 * A sort compare or order compare function is a function that takes in a left and
 * right values, and determines if they are in right order.
 * 
 * See the `sort` and `sortedInsert` in util/array. 
 */
import Business from "./state/Business";
import { StrObj } from "../util/type";
import { IsOrderedCompare } from "../util/array";

export type SortMethod = "name" | "rating" | "avgRating";

/**
 * Stores the sort compare functions for Business objects.
 * A map between sort method and sort compare function.
 */
export const BusinessCompareFunctions: StrObj<IsOrderedCompare<Business>> = {
	name: (l, r) => l.name <= r.name,
	rating: (l, r) => l.rating >= r.rating,
	avgRating: (l, r) => l.rating / l.ratingNum >= r.rating / r.ratingNum
};

/**
 * Returns a sort compare function that is used to sort an array of
 * Business ids with given sorting method.
 * 
 * @param sortMethod The method of sorting. 
 * @param businesses The map between business id and Business object.
 * @returns A sort compare function that is used to sort an array of 
 * 			Business ids with given sorting method.
 */
export default function getCompareFunc(
	sortMethod: SortMethod,
	businesses: StrObj<Business>
): IsOrderedCompare<string> {
	const compareFunc = BusinessCompareFunctions[sortMethod];
	return (l, r) => compareFunc(businesses[l], businesses[r]);
}
