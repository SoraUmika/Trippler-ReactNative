/**
 * Define the structure of the store state.
 */
import Business from "./Business";
import { SortMethod } from "../businessSortCompare";
import { StrObj } from "../../util/type";
import Filter from "./Filter";

// The root state,
export default interface State {
	theme: Theme;
	businesses: Businesses;
	collection: Collection;
	recommendation: Recommendation;
}

// sub states below.

export interface Theme {
	accentColor: string;
	backgroundColor: string;
}

export type Businesses = StrObj<Business>;

export interface Collection {
	filter: Filter;
	sortMethod: SortMethod;
	showPin: boolean;
	items: string[];
	pinnedItems: string[];
	searchInput: string;
}

export interface Recommendation {
	feeds: string[];
	currentIndex: number;
}
