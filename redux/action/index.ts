import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

type RootAction = ActionType<typeof actions>;
export default RootAction;
