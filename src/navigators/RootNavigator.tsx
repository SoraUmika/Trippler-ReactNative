import React from "react";
import {} from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";

import LoginScreen from "../entryScreens/LoginScreen";
import SignupScreen from "../entryScreens/SignupScreen";
import AlphaNavigator from "./MainNavigator";

const RootNavigator = createAppContainer(
	createStackNavigator(
		{
			Login: { screen: LoginScreen },
			Signup: { screen: SignupScreen },
			Main: { screen: AlphaNavigator }
		},
		{
            initialRouteName: "Login",
            defaultNavigationOptions: {
                header: null
            }
		}
	)
);

export default RootNavigator;
