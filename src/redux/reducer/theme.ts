/**
 * Provide sub reducer for the 'theme' sub state.
 */
import { Theme } from "../state";
import RootAction from "../action";
import { update } from "../../util/object";

export default function theme(state: Theme, action: RootAction): Theme {
	switch (action.type) {
		case "theme/SET_ACCENT_COLOR":
			return update(state, { accentColor: action.payload });
		default:
			return state;
	}
}
