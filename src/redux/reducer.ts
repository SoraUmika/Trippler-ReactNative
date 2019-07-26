import * as States from "./state";
import RootAction from "./action";
import initState from "./initState";
import { sort, sortedInsert, StrObj, arrRemoved } from "../util";
import getCompareFunc, { SortMethod } from "./businessSortCompare";
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
		default:
			return state;
	}
}

function businesses(state: States.Businesses, action: RootAction): States.Businesses {
	switch (action.type) {
		default:
			return state;
	}
}

function collection(
	state: States.Collection,
	action: RootAction,
	businesses: StrObj<Business>
): States.Collection {
	const isOrdered = getCompareFunc(state.sortMethod, businesses);
	let itemsCopy = [...state.items];
	let pinnedItemsCopy = [...state.pinnedItems];
	switch (action.type) {
		case "collection/SET_SORT_METHOD":
			sort(itemsCopy, isOrdered);
			sort(pinnedItemsCopy, isOrdered);
			return update(state, {
				sortMethod: action.payload,
				items: itemsCopy,
				pinnedItems: pinnedItemsCopy
			});
		case "collection/PIN_ITEM":
			sortedInsert(pinnedItemsCopy, action.payload, isOrdered);
			arrRemoved(itemsCopy, action.payload);
			return update(state, {
				pinnedItems: pinnedItemsCopy,
				items: itemsCopy
			});
		case "collection/REMOVED_ITEM":
			arrRemoved(itemsCopy, action.payload);
			arrRemoved(pinnedItemsCopy, action.payload);
			return update(state, {
				pinnedItems: pinnedItemsCopy,
				items: itemsCopy
			});
		case "collection/SAVE_BUSINESS":
			sortedInsert(itemsCopy, action.payload, isOrdered);
			return update(state, {
				items: itemsCopy
			});
		case "collection/UN_PIN_ITEM":
			arrRemoved(pinnedItemsCopy, action.payload);
			sortedInsert(itemsCopy, action.payload, isOrdered);
			return update(state, {
				items: itemsCopy,
				pinnedItems: pinnedItemsCopy
			});
		default:
			return state;
	}
}

function recommendation(state: States.Recommendation, action: RootAction): States.Recommendation {
	switch (action.type) {
		case "recommendation/NEXT_RECOMMENDATION":
			return update(state, {
				currentIndex:
					state.currentIndex + (state.currentIndex < state.feeds.length - 1 ? 1 : 0)
			});
		default:
			return state;
	}
}

//* TOOLS

function update<T>(origin: T, src: Partial<T>): T {
	return Object.assign({}, origin, src);
}

function sortCollectionItems(state: States.Collection, businesses: StrObj<Business>) {
	const isOrdered = getCompareFunc(state.sortMethod, businesses);
	let itemsCopy = [...state.items];
	sort(itemsCopy, isOrdered);

	let pinnedItemsCopy;
	if (state.ignorePin) {
		pinnedItemsCopy = state.pinnedItems;
	} else {
		pinnedItemsCopy = [...state.pinnedItems];
		sort(pinnedItemsCopy, isOrdered);
	}

	return [itemsCopy, pinnedItemsCopy];
}
