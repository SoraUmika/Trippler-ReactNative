import React from "react";
import { Provider } from "react-redux";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { StatusBar } from "react-native";
import store from "./src/redux/store";

import LoginScreen from "./src/components/LoginScreen";
import SignupScreen from "./src/components/SignupScreen";

StatusBar.setBarStyle("dark-content");

const Navigator = createAppContainer(
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
			}
		}
	)
);

export default function App() {
	return (
		<Provider store={store}>
			<Navigator />
		</Provider>
	);
}
