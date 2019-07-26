import { Collection } from "../state";
import RootAction from "../action";
import { sort, sortedInsert, StrObj, arrRemoved, update } from "../../util";
import getCompareFunc from "../businessSortCompare";
import Business from "../state/Business";

export default function collection(
	state: Collection,
	action: RootAction,
	businesses: StrObj<Business>
): Collection {
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
