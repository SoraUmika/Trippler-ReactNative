import React from "react";
import { createAppContainer, createBottomTabNavigator } from "react-navigation";

import store from "../redux/store";
import CollectionScreen from "../majorScreens/CollectionScreen";
import AccountScreen from "../majorScreens/AccountScreen";
import SettingScreen from "../majorScreens/SettingScreen";
import BusinessScreen from "../majorScreens/BusinessScreen";
import BookmarkBorder from "../svg/BookmarkBorder";

const MainNavigator = createAppContainer(
	createBottomTabNavigator(
		{
			// Register screens here.
			Business: {
				screen: BusinessScreen,
				navigationOptions: {
					tabBarIcon: ({ tintColor }: any) => <BookmarkBorder fill={tintColor} />
				}
			},
			Collection: {
				screen: CollectionScreen,
				navigationOptions: {
					tabBarIcon: ({ tintColor }: any) => <BookmarkBorder fill={tintColor} />
				}
			},
			Account: {
				screen: AccountScreen,
				navigationOptions: {
					tabBarIcon: ({ tintColor }: any) => <BookmarkBorder fill={tintColor} />
				}
			},
			Setting: {
				screen: SettingScreen,
				navigationOptions: {
					tabBarIcon: ({ tintColor }: any) => <BookmarkBorder fill={tintColor} />
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
