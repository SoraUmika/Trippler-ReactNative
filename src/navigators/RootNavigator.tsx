import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";

const RootNavigator = createAppContainer(
	createSwitchNavigator(
		{
			Auth: AuthNavigator,
			Main: MainNavigator
		},
		{
			initialRouteName: "Main"
		}
	)
);

export default RootNavigator;
