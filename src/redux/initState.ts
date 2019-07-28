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
		sortMethod: "name",
		showPin: true,
		items: ["hello", "test"],
		pinnedItems: [":)"],
		searchInput: ""
	},
	recommendation: {
		feeds: ["bqq", "joes", "dump", "loc2", "test", "hello", ":)", "loc1"],
		currentIndex: 0
	}
};

export default init_state;
