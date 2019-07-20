import * as States from "./state";
import RootAction from "./action";
import initState from "./initState";

export default function reducer(
	state: States.default = initState,
	action: RootAction
): States.default {
	return {
		theme: theme(state.theme, action),
		businesses: businesses(state.businesses, action),
		collection: collection(state.collection, action),
		recommendation: recommendation(state.recommendation, action)
	};
}

function theme(state: States.Theme, action: RootAction): States.Theme {
	switch (action.type) {
		case "theme/accentColor/SET":
			return update(state, { accentColor: action.payload });
	}
	return state;
}

function businesses(state: States.Businesses, action: RootAction): States.Businesses {
	return state;
}

function collection(state: States.Collection, action: RootAction): States.Collection {
	return state;
}

function recommendation(state: States.Recommendation, action: RootAction): States.Recommendation {
	return state;
}

function update<T>(origin: T, src: Partial<T>): T {
	return Object.assign({}, origin, src);
}
