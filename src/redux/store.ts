/**
 * Creates the store here.
 */
import { createStore, applyMiddleware } from "redux";
import thunkMiddelware from 'redux-thunk'
import { createLogger} from 'redux-logger'
import State from "./state";
import RootAction from "./action";
import reducer from "./reducer";

const loggerMiddleware = createLogger()
const store = createStore<State, RootAction, {}, {}>(
    reducer,
    applyMiddleware(
        thunkMiddelware,
        loggerMiddleware
    )
);
export default store;
