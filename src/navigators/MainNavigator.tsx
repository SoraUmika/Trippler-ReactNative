import { createBottomTabNavigator } from "react-navigation";

import BusinessScreen from "../majorScreens/BusinessScreen";
import CollectionScreen from "../majorScreens/CollectionScreen";

const MainNavigator = createBottomTabNavigator(
	{
		Business: BusinessScreen,
		Collection: CollectionScreen
	},
	{
		initialRouteName: "Business",
		defaultNavigationOptions: {
			tabBarVisible: false
		}
	}
);

export default MainNavigator;
