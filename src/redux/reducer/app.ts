/**
 * Provide sub reducer for the 'app' sub state.
 */
import { App } from "../state";
import RootAction from "../action";
import { update } from "../../util/object";

export default function app(state: App, action: RootAction): App {
	switch (action.type) {
		case "app/FONT_LOADED":
			return update(state, {
				fontLoaded: true
			});
		default:
			return state;
	}
}
