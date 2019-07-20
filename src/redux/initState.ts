import State from "./state";

const init_state: State = {
	theme: {
		accentColor: "#058ED9"
	},
	businesses: {
		"test": {
			id: "test",
			name: "Egg",
			status: "open",
			rating: 4.3,
			ratingNum: 123
		},
		"hello": {
			id: "hello",
			name: "Foo",
			status: "close",
			rating: 3.1,
			ratingNum: 10
		},
		":)": {
			id: ":)",
			name: "Bar",
			status: "open",
			rating: 4.7,
			ratingNum: 2034
		}
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
