/**
 * Creates the store here.
 */
import { createStore, applyMiddleware } from "redux";
import thunkMiddelware from 'redux-thunk'
import State from "./state";
import RootAction from "./action";
import reducer from "./reducer";

const store = createStore<State, RootAction, {}, {}>(
    reducer,
    applyMiddleware(
        thunkMiddelware,
    )
);
export default store;
