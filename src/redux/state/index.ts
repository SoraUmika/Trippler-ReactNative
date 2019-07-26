import Business from "./Business";
import CollectionData from "./CollectionData";
import { SortMethod } from "../businessSortCompare";

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

export type Businesses = { [index: string]: Business };

export interface Collection {
	appliedFilters: string[];
	sortMethod: SortMethod | null;
	items: { [index: string]: CollectionData };
}

export interface Recommendation {
	feeds: string[];
	currentIndex: number;
}
