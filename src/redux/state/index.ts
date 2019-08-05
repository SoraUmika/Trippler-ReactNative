/**
 * Define the structure of the store state.
 */
import Business from "./Business";
import { SortMethod } from "../businessSortCompare";
import { StrObj } from "../../util/type";
import Filter from "./Filter";
import * as requestTypes from './requests'

// The root state,
export default interface State {
	theme: Theme;
	businesses: Businesses;
	collection: Collection;
	recommendation: Recommendation;
	app: App;
	requests: Requests;
}
// sub states below.

export interface Requests{
	grab_random_bussiness: requestTypes.RandomBussiness,
	insert_new_user: requestTypes.NewUser,
	login_authentication: requestTypes.LoginAuthentication
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
