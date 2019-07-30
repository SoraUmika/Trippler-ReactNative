import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { StatusBar } from "react-native";
import * as Font from "expo-font";

import RootNavigator from "./src/navigators/RootNavigator";
import { fontLoaded } from "./src/redux/action/actions";

StatusBar.setHidden(false);

export default class App extends Component {
	componentDidMount() {
		Font.loadAsync({
			FredokaOne: require("./assets/font/FredokaOne-Regular.ttf")
		}).then(() => store.dispatch(fontLoaded()));
	}

	render() {
		return (
			<Provider store={store}>
				<RootNavigator />
			</Provider>
		);
	}
}
