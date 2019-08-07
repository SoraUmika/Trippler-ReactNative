/**
 * Provide sub reducer for the 'recommendation' sub state.
 */
import { Recommendation } from "../state";
import RootAction from "../action";
import { update } from "../../util/object";
import { pureArrRemove } from "../../util/array";

export default function recommendation(state: Recommendation, action: RootAction): Recommendation {
	switch (action.type) {
		case "recommendation/NEXT_RECOMMENDATION":
			return update(state, {
				currentIndex:
					state.currentIndex < state.feeds.length - 1 ? state.currentIndex + 1 : 0
			});
		case "collection/SAVE_BUSINESS":
			return update(state, {
				feeds: pureArrRemove(state.feeds, action.payload)
			});
		default:
			return state;
	}
}
