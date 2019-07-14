import React from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import store from "./src/redux/store";

import LoginPage from "./src/components/LoginPage"

export default function App() {
	return (
		<Provider store={store}>
			<LoginPage/>
		</Provider>
	);
}
