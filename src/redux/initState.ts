/**
 * Stores the initial value of store state.
 */
import State from "./state";
import testData from "./testData";

const init_state: State = {
	theme: {
		accentColor: "#058ED9",
		backgroundColor: "white"
	},
	businesses: testData,
	collection: {
		filter: {
			status: "all",
			rating: "all",
			ratingNum: "all"
		},
		sortMethod: "name",
		showPin: false,
		items: ["hello", "test", "bqq", "joes", "dump", "loc2", "loc1"],
		pinnedItems: [":)"],
		searchInput: ""
	},
	recommendation: {
		feeds: ["bqq", "joes", "dump", "loc2", "test", "hello", ":)", "loc1"],
		currentIndex: 0
	},
	app: {
		fontLoaded: false,
		openedBusinessId: null,
		galleryIndex: 0
	},
	server: {
		grab_random_bussiness: {
			isFetching: false,
		},
		insert_new_user: {
			isFetching: false,
			email: "undefined",
			username: "undefined",
			password: "undefined"
		},
		login_authentication: {
			isFetching: false,
			username: "undefined",
			password: "undefined"
		}
		
	}
};

export default init_state;
