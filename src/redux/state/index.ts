import Business from "./Business";
import CollectionData from "./CollectionData"

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
	items: { [index: string]: CollectionData };
}

export interface Recommendation {
	feeds: string[];
}
