import Business from "../Business";

export default interface State {
	theme: Theme;
	businesses: Businesses;
}

export interface Theme {
	accentColor: string;
}

export type Businesses = { [index: string]: Business };
