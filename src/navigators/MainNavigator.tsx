import { createBottomTabNavigator } from "react-navigation";

import BusinessScreen from "../majorScreens/BusinessScreen";
import CollectionScreen from "../majorScreens/CollectionScreen";
import SettingScreen from "../majorScreens/SettingScreen/index";
import WTF from "../majorScreens/MainScreen";

const MainNavigator = createBottomTabNavigator(
	{
		Business: BusinessScreen,
		Collection: CollectionScreen,
		Setting: WTF
	},
	{
		initialRouteName: "Business",
		defaultNavigationOptions: {
			tabBarVisible: false
		}
	}
);

export default MainNavigator;
