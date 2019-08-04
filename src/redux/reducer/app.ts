/**
 * Provide sub reducer for the 'app' sub state.
 */
import State, { App } from "../state";
import RootAction from "../action";
import { update } from "../../util/object";
import { getOpenedData } from "../selectors";

export default function app(state: App, action: RootAction, all: State): App {
	switch (action.type) {
		case "app/FONT_LOADED":
			return update(state, {
				fontLoaded: true
			});
		case "app/NEXT_GALLERY_INDEX":
			const maxIndex = getOpenedData(all).gallery.length - 1;
			let nextIndex;
			if (action.payload == "forward" && state.galleryIndex == maxIndex) {
				nextIndex = 0;
			} else if (action.payload == "backward" && !state.galleryIndex) {
				nextIndex = maxIndex;
			} else {
				nextIndex = state.galleryIndex + (action.payload == "forward" ? 1 : -1);
			}
			return update(state, {
				galleryIndex: nextIndex
			});
		case "app/RESET_GALLERY_INDEX":
			return update(state, {
				galleryIndex: 0
			});
		case "app/OPEN_BUSINESS":
			return update(state, {
				openedBusinessId: action.payload
			});
		default:
			return state;
	}
}
