import { createBottomTabNavigator } from "react-navigation";

import BusinessScreen from "../majorScreens/BusinessScreen";
import CollectionScreen from "../majorScreens/CollectionScreen";
import SettingScreen from "../majorScreens/SettingScreen/index";

const MainNavigator = createBottomTabNavigator(
	{
		Business: BusinessScreen,
		Collection: CollectionScreen,
		Setting: SettingScreen
	},
	{
		initialRouteName: "Business",
		defaultNavigationOptions: {
			tabBarVisible: false
		}
	}
);

export default MainNavigator;
