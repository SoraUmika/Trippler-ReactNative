import React from "react";
import { Provider } from "react-redux";
import { createStackNavigator, createAppContainer } from "react-navigation";
import store from "./src/redux/store";
import {StatusBar} from "react-native";

import LoginScreen from "./src/components/LoginScreen";
import SignupScreen from "./src/components/SignupScreen";
import MainScreen from "./src/components/MainScreen";
import transitionConfig from "./src/transition";

StatusBar.setHidden(true);

const MainNavigator = createAppContainer(
	createStackNavigator(
		{
			// Register screens here.
			Login: { screen: LoginScreen },
			Signup: { screen: SignupScreen },
			Main: { screen: MainScreen }
		},
		{
			initialRouteName: "Main",
			defaultNavigationOptions: {
				header: null
			},
			transitionConfig: transitionConfig
		}
	)
);

export default function App() {
	return (
		<Provider store={store}>
			<MainNavigator />
		</Provider>
	);
}
