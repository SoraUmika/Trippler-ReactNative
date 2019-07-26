import { Businesses } from "../state";
import RootAction from "../action";

export default function businesses(state: Businesses, action: RootAction): Businesses {
	switch (action.type) {
		default:
			return state;
	}
}
