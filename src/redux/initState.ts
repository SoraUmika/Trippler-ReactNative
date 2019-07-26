import State from "./state";
import testData from "./testData";

const init_state: State = {
	theme: {
		accentColor: "#058ED9",
		backgroundColor: "white"
	},
	businesses: testData,
	collection: {
		appliedFilters: [],
		sortMethod: null,
		ignorePin: false,
		items: {
			test: {
				pinned: false
			},
			hello: {
				pinned: false
			},
			":)": {
				pinned: true
			}
		}
	},
	recommendation: {
		feeds: ["test", "hello", ":)"],
		currentIndex: 0
	}
};

export default init_state;
