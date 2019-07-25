import React from "react";
import { Provider } from "react-redux";
import { createAppContainer, createBottomTabNavigator } from "react-navigation";
import store from "./src/redux/store";
import {StatusBar} from "react-native";

import MainScreen from "./src/majorScreens/MainScreen";
import transitionConfig from "./src/transition";
import SwipeScreen from './src/majorScreens/SwipeScreen'

StatusBar.setHidden(false);

const MainNavigator = createAppContainer(
	createBottomTabNavigator(
		{
			// Register screens here.
			SwipeScreen: { screen: SwipeScreen},	
			Main: { screen: MainScreen },
		},
		{
			initialRouteName: 'SwipeScreen'
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
