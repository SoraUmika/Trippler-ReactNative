import React from "react";
import { Provider } from "react-redux";
import { createStackNavigator, createAppContainer } from "react-navigation";
import store from "./src/redux/store";

import LoginScreen from "./src/components/LoginScreen";
import SignupScreen from "./src/components/SignupScreen";
import MainScreen from "./src/components/MainScreen";
import StatusBar from "./src/components/StatusBar";
import transitionConfig from "./src/transition";

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
			<StatusBar backgroundColor="#FFFFFF" barStyle="dark-content"/>
			<MainNavigator />
		</Provider>
	);
}
