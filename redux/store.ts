import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension"; //* Dev only

import State from "./state";

const init_state: State = {};

function reducer(state: State = init_state, action: any) {
	return state;
}

const store = createStore<State, any, {}, {}>(reducer, devToolsEnhancer({}));
export default store;
