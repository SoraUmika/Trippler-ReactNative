import React from "react";
import { Provider } from "react-redux";
import { createAppContainer, createBottomTabNavigator } from "react-navigation";
import store from "./src/redux/store";
import { StatusBar } from "react-native";

import MainScreen from "./src/majorScreens/MainScreen";
import transitionConfig from "./src/transition";
import BusinessScreen from "./src/majorScreens/BusinessScreen";
import BookmarkBorder from "./src/svg/BookmarkBorder";

StatusBar.setHidden(false);

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
			Main: {
				screen: MainScreen,
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

export default function App() {
	return (
		<Provider store={store}>
			<MainNavigator />
		</Provider>
	);
}
