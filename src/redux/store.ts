/**
 * Creates the store here.
 */
import { createStore } from "redux";

import State from "./state";
import RootAction from "./action";
import reducer from "./reducer";

const store = createStore<State, RootAction, {}, {}>(reducer);
export default store;
