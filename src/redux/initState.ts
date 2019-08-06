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
		items: ["hello", "test"],
		pinnedItems: [":)"],
		searchInput: ""
	},
	recommendation: {
		feeds: ["bbq", "joes", "dump", "loc2", "loc1"],
		currentIndex: 0
	},
	app: {
		fontLoaded: false,
		openedBusinessId: ":)",
		galleryIndex: 0
	},
	requests: {
		//for requests, all the following data can be considered "cache" where the informations remain unless otherwise fetched
		grab_random_bussiness: {
			isFetching: false,
			err: "None",
			data: {}
		},
		insert_new_user: {
			isFetching: false,
			email: "undefined",
			username: "undefined",
			password: "undefined",
			err: "None"
		},
		login_authentication: {
			isFetching: false,
			username: "undefined",
			password: "undefined",
			err: "None"
		}
	}
};

export default init_state;
