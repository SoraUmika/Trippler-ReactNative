/**
 * The index file for actions, provide the root action type.
 * Individual actions are defined in the actions.ts file.
 */
import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

type RootAction = ActionType<typeof actions>;
export default RootAction;
