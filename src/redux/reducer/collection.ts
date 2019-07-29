/**
 * Provide sub reducer for the 'collection' sub state.
 */
import { Collection } from "../state";
import RootAction from "../action";
import { update } from "../../util/object";
import { pureArrRemove } from "../../util/array";

export default function collection(state: Collection, action: RootAction): Collection {
	switch (action.type) {
		case "collection/SET_SORT_METHOD":
			return update(state, {
				sortMethod: action.payload
			});
		case "collection/PIN_ITEM":
			return update(state, {
				pinnedItems: [...state.pinnedItems, action.payload],
				items: pureArrRemove(state.items, action.payload)
			});
		case "collection/REMOVED_ITEM":
			return update(state, {
				pinnedItems: pureArrRemove(state.pinnedItems, action.payload),
				items: pureArrRemove(state.items, action.payload)
			});
		case "collection/SAVE_BUSINESS":
			return update(state, {
				items: [...state.items, action.payload]
			});
		case "collection/UN_PIN_ITEM":
			return update(state, {
				items: [...state.items, action.payload],
				pinnedItems: pureArrRemove(state.pinnedItems, action.payload)
			});
		case "collection/TOGGLE_SHOW_PIN":
			return update(state, {
				showPin: !state.showPin
			});
		case "collection/SET_SEARCH_INPUT":
			return update(state, {
				searchInput: action.payload
			});
		default:
			return state;
	}
}
