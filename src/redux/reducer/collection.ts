import { Collection } from "../state";
import RootAction from "../action";
import { update } from "../../util/object";
import { arrRemoved } from "../../util/array";

export default function collection(state: Collection, action: RootAction): Collection {
	switch (action.type) {
		case "collection/SET_SORT_METHOD":
			return update(state, {
				sortMethod: action.payload
			});
		case "collection/PIN_ITEM":
			var itemsCopy = [...state.items];
			arrRemoved(itemsCopy, action.payload);
			return update(state, {
				pinnedItems: [...state.pinnedItems, action.payload],
				items: itemsCopy
			});
		case "collection/REMOVED_ITEM":
			var itemsCopy = [...state.items];
			var pinnedItemsCopy = [...state.pinnedItems];
			arrRemoved(itemsCopy, action.payload);
			arrRemoved(pinnedItemsCopy, action.payload);
			return update(state, {
				pinnedItems: pinnedItemsCopy,
				items: itemsCopy
			});
		case "collection/SAVE_BUSINESS":
			return update(state, {
				items: [...state.items, action.payload]
			});
		case "collection/UN_PIN_ITEM":
			var pinnedItemsCopy = [...state.pinnedItems];
			arrRemoved(pinnedItemsCopy, action.payload);
			return update(state, {
				items: [...state.items, action.payload],
				pinnedItems: pinnedItemsCopy
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
