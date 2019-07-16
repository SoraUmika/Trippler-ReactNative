import React from "react";
import { Provider } from "react-redux";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { StatusBar } from "react-native";
import store from "./src/redux/store";

import LoginScreen from "./src/components/LoginScreen";
import SignupScreen from "./src/components/SignupScreen";
import transitionConfig from "./src/transition";

StatusBar.setBarStyle("dark-content");

const MainNavigator = createAppContainer(
	createStackNavigator(
		{
			// Register screens here.
			Login: { screen: LoginScreen },
			Signup: { screen: SignupScreen }
		},
		{
			initialRouteName: "Login",
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
