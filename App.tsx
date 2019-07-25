import React from "react";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { StatusBar, View } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

import RootNavigator from "./src/navigators/RootNavigator";

StatusBar.setHidden(false);

export default function App() {
	return (
		<Provider store={store}>
			<View style={{width: "100%", height: getStatusBarHeight(), backgroundColor: "black"}}/>
			<RootNavigator />
		</Provider>
	);
}
