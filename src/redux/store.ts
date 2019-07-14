import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension"; //* Dev only

import State from "./state";
import RootAction from "./action";
import reducer from "./reducer";

const store = createStore<State, RootAction, {}, {}>(reducer, devToolsEnhancer({}));
export default store;
