/**
 * Provide the reducer.
 *
 * This is the index file for the root reducer.
 * All sub reducers have their own individual files.
 */
import * as States from "../state";
import RootAction from "../action";
import initState from "../initState";
import theme from "./theme";
import businesses from "./businesses";
import collection from "./collection";
import recommendation from "./recommendation";
import app from "./app";
import requests from "./requests"

export default function reducer(
	state: States.default = initState,
	action: RootAction
): States.default {
	console.log(
		//! for debug.
		Object.entries(action)
			.map((val: string[]) => val.join(" = "))
			.join(", ")
	);
	return {
		theme: theme(state.theme, action),
		businesses: businesses(state.businesses, action),
		collection: collection(state.collection, action),
		recommendation: recommendation(state.recommendation, action),
		app: app(state.app, action, state),
		requests: requests(state.requests, action)
	};
}
