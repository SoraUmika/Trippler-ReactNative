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
	app: App;
	server: Server
}
// sub states below.

export interface Server{
	isFetching: false, 
	cache: {}
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

export interface App {
	fontLoaded: boolean;
	openedBusinessId: null | string;
	galleryIndex: number;
}
