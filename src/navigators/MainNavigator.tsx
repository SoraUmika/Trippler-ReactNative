import React from "react";
import { createAppContainer, createBottomTabNavigator } from "react-navigation";

import BusinessScreen from "../majorScreens/BusinessScreen";
import CollectionScreen from "../majorScreens/CollectionScreen";
import AlphaNavHeader from "../components/NavHeader";

const RootNavigator = createAppContainer(
	createBottomTabNavigator(
		{
			Business: { screen: BusinessScreen },
			Collection: { screen: CollectionScreen }
		},
		{
			initialRouteName: "Business",
			defaultNavigationOptions: {
				// header: () => <AlphaNavHeader />
				// header: null
				tabBarVisible: false
			}
			// headerMode: "float"
		}
	)
);

export default RootNavigator;
