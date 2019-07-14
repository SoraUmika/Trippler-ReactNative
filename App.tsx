import React from "react";
import { Provider } from "react-redux";
import { createStackNavigator, createAppContainer } from "react-navigation";
import store from "./src/redux/store";

import LoginPage from "./src/components/LoginPage";

const Navigator = createAppContainer(
	createStackNavigator(
		{
			Login: { screen: LoginPage }
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
