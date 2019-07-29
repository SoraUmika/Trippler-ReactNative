import React from "react";
import {} from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";

import BusinessScreen from "../majorScreens/BusinessScreen";
import CollectionScreen from "../majorScreens/CollectionScreen";

const RootNavigator = createAppContainer(
	createStackNavigator(
		{
            Business: { screen: BusinessScreen },
            Collection: { screen: CollectionScreen }
		},
		{
            initialRouteName: "Business",
            defaultNavigationOptions: {
                header: null
            }
		}
	)
);

export default RootNavigator;