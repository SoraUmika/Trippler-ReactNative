import Business from "./Business";
import { SortMethod } from "../businessSortCompare";
import { StrObj } from "../../util";
import Filter from "./Filter";

export default interface State {
	theme: Theme;
	businesses: Businesses;
	collection: Collection;
	recommendation: Recommendation;
}

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
