import Business from "./Business";
import CollectionData from "./CollectionData"

export default interface State {
	theme: Theme;
	businesses: Businesses;
	collection: Collection;
}

export interface Theme {
	accentColor: string;
}

export type Businesses = { [index: string]: Business };

export interface Collection {
	appliedFilters: string[];
	items: { [index: string]: CollectionData };
}
