import React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";

import BusinessScreen from "../majorScreens/BusinessScreen";
import CollectionScreen from "../majorScreens/CollectionScreen";
import AlphaNavHeader from "../components/AlphaNavHeader";

const RootNavigator = createAppContainer(
	createStackNavigator(
		{
			Business: { screen: BusinessScreen },
			Collection: { screen: CollectionScreen }
		},
		{
			initialRouteName: "Business",
			defaultNavigationOptions: {
				header: () => <AlphaNavHeader />
			},
			headerMode: "float"
		}
	)
);

export default RootNavigator;
