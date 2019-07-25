import React from "react";
import { Provider } from "react-redux";
import { createAppContainer, createBottomTabNavigator } from "react-navigation";
import store from "./src/redux/store";
import { StatusBar } from "react-native";

import RootNavigator from "./src/navigators/RootNavigator";

StatusBar.setHidden(false);

export default function App() {
	return (
		<Provider store={store}>
			<RootNavigator />
		</Provider>
	);
}
