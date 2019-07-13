import React from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import store from "./redux/store";

import LoginPage from "./components/LoginPage"

export default function App() {
	return (
		<Provider store={store}>
			<LoginPage/>
		</Provider>
	);
}
