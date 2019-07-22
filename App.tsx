import React from "react";
import { Provider } from "react-redux";
import { createStackNavigator, createAppContainer } from "react-navigation";
import store from "./src/redux/store";
import {StatusBar} from "react-native";

import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import MainScreen from "./src/screens/MainScreen";
import transitionConfig from "./src/transition";
import ScreenContainer from './src/components/ScreenContainer'

StatusBar.setHidden(false);

const MainNavigator = createAppContainer(
	createStackNavigator(
		{
			// Register screens here.
			Login: { screen: LoginScreen },
			Signup: { screen: SignupScreen },
			Main: { screen: MainScreen },
			SwipeScreen: { screen: ScreenContainer}
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
