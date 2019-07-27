import * as States from "../state";
import RootAction from "../action";
import initState from "../initState";
import theme from "./theme";
import businesses from "./businesses";
import collection from "./collection";
import recommendation from "./recommendation";

export default function reducer(
	state: States.default = initState,
	action: RootAction
): States.default {
	console.log(Object.entries(action).map((val: string[]) => val.join(" = ")).join(", "));
	return {
		theme: theme(state.theme, action),
		businesses: businesses(state.businesses, action),
		collection: collection(state.collection, action, state.businesses),
		recommendation: recommendation(state.recommendation, action)
	};
}
