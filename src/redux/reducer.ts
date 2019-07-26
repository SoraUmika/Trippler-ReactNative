import * as States from "./state";
import RootAction from "./action";
import initState from "./initState";
import { sort, sortedInsert, StrObj } from "../util";
import getCompareFunc from "./businessSortCompare";
import Business from "./state/Business";

export default function reducer(
	state: States.default = initState,
	action: RootAction
): States.default {
	return {
		theme: theme(state.theme, action),
		businesses: businesses(state.businesses, action),
		collection: collection(state.collection, action, state.businesses),
		recommendation: recommendation(state.recommendation, action)
	};
}

function theme(state: States.Theme, action: RootAction): States.Theme {
	switch (action.type) {
		case "theme/SET_ACCENT_COLOR":
			return update(state, { accentColor: action.payload });
	}
	return state;
}

function businesses(state: States.Businesses, action: RootAction): States.Businesses {
	return state;
}

function collection(
	state: States.Collection,
	action: RootAction,
	businesses: StrObj<Business>
): States.Collection {
	switch (action.type) {
		case "collection/SET_SORT_METHOD":
			return update(state, {
				sortMethod: action.payload
				// items: sort([...state.items])
			});
	}
	return state;
}

function recommendation(state: States.Recommendation, action: RootAction): States.Recommendation {
	switch (action.type) {
		case "recommendation/NEXT_RECOMMENDATION":
			return update(state, {
				currentIndex:
					state.currentIndex + (state.currentIndex < state.feeds.length - 1 ? 1 : 0)
			});
	}
	return state;
}

function update<T>(origin: T, src: Partial<T>): T {
	return Object.assign({}, origin, src);
}
