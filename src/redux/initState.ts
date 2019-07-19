import State from "./state";
import Business from "../Business";

const init_state: State = {
	theme: {
		accentColor: "#058ED9"
	},
	businesses: {
		"test": new Business("test", "Egg", "open", 4.3, 123),
		"hello": new Business("hello", "Foo", "close", 3.1, 10),
		":)": new Business(":)", "Bar", "open", 4.7, 2031)
	},
	collection: {
		appliedFilters: [],
		items: {
			"test": false,
			"hello": false,
			":)": true
		}
	}
};

export default init_state;
