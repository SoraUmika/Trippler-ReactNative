import React from "react";
import { createAppContainer, createBottomTabNavigator } from "react-navigation";

import store from "../redux/store";
import CollectionScreen from "../majorScreens/CollectionScreen";
import AccountScreen from "../majorScreens/AccountScreen";
import SettingScreen from "../majorScreens/SettingScreen";
import BusinessScreen from "../majorScreens/BusinessScreen";
import Place from "../svg/Place";
import CollectionBookmark from "../svg/CollectionsBookmark";
import AccountCircle from "../svg/AccountCircle";
import Settings from "../svg/Settings";

const MainNavigator = createAppContainer(
	createBottomTabNavigator(
		{
			// Register screens here.
			Business: {
				screen: BusinessScreen,
				navigationOptions: {
					tabBarIcon: ({ tintColor }: any) => <Place fill={tintColor} />
				}
			},
			Collection: {
				screen: CollectionScreen,
				navigationOptions: {
					tabBarIcon: ({ tintColor }: any) => <CollectionBookmark fill={tintColor} />
				}
			},
			Account: {
				screen: AccountScreen,
				navigationOptions: {
					tabBarIcon: ({ tintColor }: any) => <AccountCircle fill={tintColor} />
				}
			},
			Setting: {
				screen: SettingScreen,
				navigationOptions: {
					tabBarIcon: ({ tintColor }: any) => <Settings fill={tintColor} />
				}
			}
		},
		{
			initialRouteName: "Business",
			backBehavior: "history",
			tabBarOptions: {
				activeTintColor: store.getState().theme.accentColor,
				labelStyle: {
					fontWeight: "bold"
				}
			}
		}
	)
);

export default MainNavigator;
