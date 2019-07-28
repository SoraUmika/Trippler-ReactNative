import { Recommendation } from "../state";
import RootAction from "../action";
import { update } from "../../util";

export default function recommendation(state: Recommendation, action: RootAction): Recommendation {
	switch (action.type) {
		case "recommendation/NEXT_RECOMMENDATION":
			return update(state, {
				currentIndex:
					(state.currentIndex < state.feeds.length - 1 ? state.currentIndex + 1 : 0)
			});
		default:
			return state;
	}
}
