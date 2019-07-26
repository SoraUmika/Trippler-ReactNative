import Business from "./state/Business";
import { IsOrderedCompare, StrObj } from "../util";

export type SortMethod = "name" | "rating" | "avgRating";

export const BusinessCompareFunctions: StrObj<IsOrderedCompare<Business>> = {
	name: (l, r) => l.name < r.name,
	rating: (l, r) => l.rating > r.rating,
	avgRating: (l, r) => l.rating / l.ratingNum > r.rating / r.ratingNum
};

export default function getCompareFunc(
	sortMethod: SortMethod,
	businesses: StrObj<Business>,
	ignorePinned: boolean,
): IsOrderedCompare<string> {
    const compareFunc = BusinessCompareFunctions[sortMethod];
    if (ignorePinned){

    }
	return (l, r) =>
		compareFunc(businesses[l], businesses[r]);
}
