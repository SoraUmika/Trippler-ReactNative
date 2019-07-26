import Business from "./Business";
import CollectionData from "./CollectionData";
import { SortMethod } from "../businessSortCompare";
import { StrObj } from "../../util";

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
	appliedFilters: string[];
	sortMethod: SortMethod | null;
	items: StrObj<CollectionData>;
}

export interface Recommendation {
	feeds: string[];
	currentIndex: number;
}
