import * as States from "./state";
import RootAction from "./action";
import initState from "./initState";

export default function reducer(
	state: States.default = initState,
	action: RootAction
): States.default {
	return {
		theme: theme(state.theme, action)
	};
}

function theme(state: States.Theme, action: RootAction): States.Theme {
	switch (action.type) {
		case "theme/accentColor/SET":
			return update(state, { accentColor: action.payload });
	}
	return state;
}

function update<T>(origin: T, src: Partial<T>): T {
	return Object.assign({}, origin, src);
}
