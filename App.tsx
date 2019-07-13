import React from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import store from "./redux/store";

import Button from "./components/Button";
import Input from "./components/Input";

export default function App() {
	return (
		<Provider store={store}>
			<View style={styles.container}>
				<Input placeholder="input" width={100}/>
			</View>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	}
});
