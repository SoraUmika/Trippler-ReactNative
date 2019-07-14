import React from "react";
import { Provider } from "react-redux";
import { createStackNavigator, createAppContainer } from "react-navigation";
import store from "./src/redux/store";

import LoginScreen from "./src/components/LoginScreen";

const Navigator = createAppContainer(
	createStackNavigator(
		{
			// Register screens here.
			Login: { screen: LoginScreen }
		},
		{
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
